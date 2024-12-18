import "./style.css";

// Types
type GameState = "welcome" | "playing" | "gameover";
type Screen =
  | "welcome-screen"
  | "orientation-screen"
  | "game-screen"
  | "gameover-screen";

// Constants
const MAX_TILT = 40;
const DETECTION_MAX_TIME = 25; // seconds
const DISCO_COOLDOWN = 5; // seconds
const COPILOT_BASE_SPEED = 4; // Base speed for copilot movement
const PLANE_TILT_CHANGE_INTERVAL = 1500; // ms
const TILT_SMOOTHING_FACTOR = 0.03; // Controls how smoothly the tilt changes
const GYRO_COMPENSATION_FACTOR = -3.5; // Force de la compensation gyroscopique
const DEBUG_MODE = false; // Flag pour afficher/masquer la fenêtre de debug

// Game variables
let gameState: GameState = "welcome";
let landscapeMode = false;
let planeAssiette = 0;
let targetPlaneAssiette = 0; // New variable to store the target tilt
let detectionLevel = 0;
let isDiscoMode = false;
let discoTimeout: number | null = null;
let lastTiltChange = Date.now();
let playerTilt = 0; // Nouvelle variable pour stocker l'inclinaison du joueur
let discoMusicPosition = 0; // Store the music position when pausing
let lastFrameTime = 0; // Store last frame timestamp

// Audio elements
let engineSound: AudioContext;
let oscillator: OscillatorNode;
let gainNode: GainNode;

// Import assets
import discoMusicSrc from "./assets/disco-music.mp3";
import explosionSoundSrc from "./assets/explosion.mp3";

// Load audio files
const discoMusic = new Audio(discoMusicSrc);
const explosionSound = new Audio(explosionSoundSrc);

// DOM Elements
const welcomeScreen = document.getElementById("welcome-screen")!;
const orientationScreen = document.getElementById("orientation-screen")!;
const gameScreen = document.getElementById("game-screen")!;
const gameoverScreen = document.getElementById("gameover-screen")!;
const gameoverActions = document.getElementById("gameover-actions")!;
const startButton = document.getElementById("start-button")!;
const restartButton = document.getElementById("restart-button")!;
const installButton = document.getElementById("install-button")!;
const skyVideo = document.querySelector<HTMLVideoElement>("#sky-video")!;
const copilot = document.querySelector<HTMLImageElement>("#copilot")!;
const detectionBar = document.getElementById("detection-bar")!;

// Create debug window
const debugWindow = document.createElement("div");
debugWindow.id = "debug-window";
debugWindow.style.display = DEBUG_MODE ? "block" : "none";
document.body.appendChild(debugWindow);

// PWA Installation
let deferredPrompt: any;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installButton.style.display = "block";
});

installButton.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("Application installée");
    }
    deferredPrompt = null;
    installButton.style.display = "none";
  }
});

window.addEventListener("appinstalled", () => {
  console.log("Application installée avec succès");
  installButton.style.display = "none";
  deferredPrompt = null;
});

// Game functions
function showScreen(screenId: Screen) {
  [welcomeScreen, orientationScreen, gameScreen, gameoverScreen].forEach(
    (screen) => {
      screen.classList.add("hidden");
    }
  );
  document.getElementById(screenId)!.classList.remove("hidden");
}

function checkOrientation() {
  if (window.innerHeight > window.innerWidth) {
    landscapeMode = false;
    if (gameState === "playing") {
      showScreen("orientation-screen");
      // Pause game elements
      skyVideo.pause();
      if (engineSound) {
        oscillator.stop();
      }
    }
    return false;
  } else {
    landscapeMode = true;
    // If we were in orientation screen and now in correct orientation
    if (
      document
        .getElementById("orientation-screen")
        ?.classList.contains("hidden") === false
    ) {
      if (gameState === "playing") {
        // Resume game elements
        showScreen("game-screen");
        skyVideo.play();
        // Reinitialize audio context as it might have been stopped
        if (engineSound) {
          oscillator = engineSound.createOscillator();
          oscillator.connect(gainNode);
          oscillator.type = "sawtooth";
          oscillator.start();
        }
        updateGameState(performance.now());
      } else {
        showScreen(
          gameState === "welcome" ? "welcome-screen" : "gameover-screen"
        );
      }
    }
    return true;
  }
}

function updateDetectionBar() {
  const percentage = (detectionLevel / DETECTION_MAX_TIME) * 100;
  detectionBar.style.setProperty("--detection-percentage", `${percentage}%`);
}

function startDiscoMode() {
  if (isDiscoMode) {
    if (discoTimeout) {
      clearTimeout(discoTimeout);
    }
    discoTimeout = window.setTimeout(() => {
      stopDiscoMode();
    }, DISCO_COOLDOWN * 1000);
    return;
  }

  isDiscoMode = true;
  gameScreen.classList.add("disco-mode");
  discoMusic.currentTime = discoMusicPosition;
  discoMusic.play();
}

function stopDiscoMode() {
  if (!isDiscoMode) return;

  isDiscoMode = false;
  gameScreen.classList.remove("disco-mode");
  discoMusicPosition = discoMusic.currentTime;
  discoMusic.pause();

  if (discoTimeout) {
    clearTimeout(discoTimeout);
    discoTimeout = null;
  }
}

function updateEngineSound() {
  const baseFrequency = 100;
  const frequencyRange = 50;
  oscillator.frequency.value =
    baseFrequency + (planeAssiette / MAX_TILT) * frequencyRange;
}

function updatePlaneAssiette() {
  const now = Date.now();
  if (now - lastTiltChange > PLANE_TILT_CHANGE_INTERVAL) {
    targetPlaneAssiette = Math.random() * MAX_TILT * 2 - MAX_TILT;
    lastTiltChange = now;
  }

  // Smoothly interpolate between current and target tilt
  planeAssiette +=
    (targetPlaneAssiette - planeAssiette) * TILT_SMOOTHING_FACTOR;
}

function updateCopilotPosition() {
  // Calculate copilot movement speed based on plane tilt
  const tiltPercentage = Math.abs(planeAssiette) / MAX_TILT;
  const movementSpeed = COPILOT_BASE_SPEED * tiltPercentage;

  // Get current position as percentage (default to 50 if not set)
  const currentPosition = parseFloat(copilot.style.left) || 50;

  // Calculate new position with both plane tilt and player compensation
  let newPosition = currentPosition;

  // 1. Mouvement dû à l'inclinaison de l'avion
  if (planeAssiette !== 0) {
    const planeTiltDirection = planeAssiette > 0 ? 1 : -1;
    newPosition += planeTiltDirection * movementSpeed;
  }

  // 2. Compensation du joueur (dans la direction opposée)
  // Si le joueur penche à gauche (négatif), on pousse le copilote vers la gauche
  if (playerTilt !== 0) {
    const compensationForce =
      (playerTilt / MAX_TILT) * GYRO_COMPENSATION_FACTOR;
    newPosition -= compensationForce; // On soustrait car on veut aller dans la direction du tilt
  }

  // Limit position to screen bounds (10% to 90% to keep copilot visible)
  newPosition = Math.max(10, Math.min(90, newPosition));

  // Update copilot position
  copilot.style.left = `${newPosition}%`;

  // Check if copilot hits the edges
  if (newPosition <= 10 || newPosition >= 90) {
    startDiscoMode();
  }
}

function updateDebugInfo() {
  if (!DEBUG_MODE) return;

  debugWindow.innerHTML = `
    <div class="debug-content">
      <h3>Debug Info</h3>
      <p>Gyroscope (beta): ${playerTilt.toFixed(2)}°</p>
      <p>Plane Tilt: ${planeAssiette.toFixed(2)}°</p>
      <p>Copilot Position: ${(parseFloat(copilot.style.left) || 50).toFixed(
        2
      )}%</p>
    </div>
  `;
}

function updateGameState(timestamp: number) {
  if (gameState === "playing" && landscapeMode) {
    // Calculate delta time in seconds
    const deltaTime = (timestamp - lastFrameTime) / 1000;
    if (deltaTime >= 1 / 60) {
      lastFrameTime = timestamp;
      updatePlaneAssiette();
      updateCopilotPosition();
      updateEngineSound();
      updateDebugInfo();

      if (isDiscoMode) {
        detectionLevel += deltaTime; // Use actual time elapsed instead of fixed 1/60
      }
      updateDetectionBar();
      if (detectionLevel >= DETECTION_MAX_TIME) {
        gameState = "gameover";
        handleGameOver();
      }

      // Update only sky video rotation, not the cockpit
      skyVideo.style.transform = `rotate(${-planeAssiette}deg)`;
    }

    requestAnimationFrame(updateGameState);
  }
}

function handleDeviceOrientation(event: DeviceOrientationEvent) {
  if (gameState === "playing") {
    // En mode paysage, beta contrôle l'inclinaison gauche/droite
    playerTilt = event.beta || 0;
  }
}

function requestFullscreen() {
  const element = document.documentElement;
  if (element.requestFullscreen) {
    element.requestFullscreen();
  }
}

function startGame() {
  gameState = "playing";
  detectionLevel = 0;
  planeAssiette = 0;
  targetPlaneAssiette = 0;
  isDiscoMode = false;
  lastFrameTime = performance.now(); // Initialize the last frame time

  // Initialize audio context after user interaction
  engineSound = new AudioContext();
  oscillator = engineSound.createOscillator();
  gainNode = engineSound.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(engineSound.destination);
  oscillator.type = "sawtooth";
  gainNode.gain.value = 0.1;

  gameoverActions.classList.add("hidden");
  copilot.style.left = "50%";

  showScreen("game-screen");
  skyVideo.play();
  oscillator.start();

  requestFullscreen();
  checkOrientation();

  requestAnimationFrame(updateGameState); // Start the game loop
}

function handleGameOver() {
  gameState = "gameover";
  showScreen("gameover-screen");
  stopDiscoMode();
  oscillator.stop();
  explosionSound.play();

  setTimeout(() => {
    gameoverActions.classList.remove("hidden");
  }, 2000);
}

// Event Listeners
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);
window.addEventListener("orientationchange", () => {
  // Wait for the orientation change to complete
  setTimeout(checkOrientation, 100);
});
window.addEventListener("resize", () => {
  // Wait for the resize to complete
  setTimeout(checkOrientation, 100);
});
window.addEventListener("deviceorientation", handleDeviceOrientation);

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  showScreen("welcome-screen");

  // Request device orientation permission on iOS
  if (typeof (DeviceOrientationEvent as any).requestPermission === "function") {
    startButton.addEventListener("click", async () => {
      try {
        const permission = await (
          DeviceOrientationEvent as any
        ).requestPermission();
        if (permission === "granted") {
          startGame();
        }
      } catch (error) {
        console.error("Permission denied:", error);
      }
    });
  }
});
