import "./style.css";

// Types
type GameState = "welcome" | "playing" | "gameover";
type Screen =
  | "welcome-screen"
  | "orientation-screen"
  | "game-screen"
  | "gameover-screen";

// Constants
const MAX_TILT = 30;
const DETECTION_MAX_TIME = 30; // seconds
const DISCO_COOLDOWN = 5; // seconds
const COPILOT_BASE_SPEED = 0.5; // Base speed for copilot movement
const COPILOT_MOVEMENT_SPEED = 2;
const PLANE_TILT_CHANGE_INTERVAL = 3000; // ms
const TILT_SMOOTHING_FACTOR = 0.05; // Controls how smoothly the tilt changes

// Game variables
let gameState: GameState = "welcome";
let planeAssiette = 0;
let targetPlaneAssiette = 0; // New variable to store the target tilt
let detectionLevel = 0;
let isDiscoMode = false;
let discoTimeout: number | null = null;
let lastTiltChange = Date.now();

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
const app = document.querySelector<HTMLDivElement>("#app")!;
const welcomeScreen = document.getElementById("welcome-screen")!;
const orientationScreen = document.getElementById("orientation-screen")!;
const gameScreen = document.getElementById("game-screen")!;
const gameoverScreen = document.getElementById("gameover-screen")!;
const startButton = document.getElementById("start-button")!;
const restartButton = document.getElementById("restart-button")!;
const skyVideo = document.querySelector<HTMLVideoElement>("#sky-video")!;
const cockpit = document.querySelector<HTMLImageElement>("#cockpit")!;
const copilot = document.querySelector<HTMLImageElement>("#copilot")!;
const detectionBar = document.getElementById("detection-bar")!;

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
    showScreen("orientation-screen");
    if (gameState === "playing") {
      // Pause game elements
      skyVideo.pause();
      if (engineSound) {
        oscillator.stop();
      }
    }
    return false;
  } else {
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
  detectionBar.style.setProperty("width", `${percentage}%`);
}

function startDiscoMode() {
  if (isDiscoMode) return;

  isDiscoMode = true;
  gameScreen.classList.add("disco-mode");
  discoMusic.currentTime = 0;
  discoMusic.play();

  if (discoTimeout) {
    clearTimeout(discoTimeout);
  }
}

function stopDiscoMode() {
  if (!isDiscoMode) return;

  isDiscoMode = false;
  gameScreen.classList.remove("disco-mode");
  discoMusic.pause();
  discoMusic.currentTime = 0;
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
    // Reduce the maximum change amount to make transitions less abrupt
    const maxChange = MAX_TILT * 0.7;
    targetPlaneAssiette = Math.random() * maxChange * 2 - maxChange;
    lastTiltChange = now;
  }

  // Smoothly interpolate between current and target tilt
  planeAssiette +=
    (targetPlaneAssiette - planeAssiette) * TILT_SMOOTHING_FACTOR;
}

function updateCopilotPosition() {
  // Calculate copilot movement speed based on plane tilt
  // The further from 0, the faster it moves
  const tiltPercentage = Math.abs(planeAssiette) / MAX_TILT;
  const movementSpeed = COPILOT_BASE_SPEED * tiltPercentage;

  // Get current position as percentage (default to 50 if not set)
  const currentPosition = parseFloat(copilot.style.left) || 50;

  // Calculate new position
  let newPosition = currentPosition;
  if (planeAssiette !== 0) {
    // Move left or right based on tilt direction
    const direction = planeAssiette > 0 ? 1 : -1;
    newPosition += direction * movementSpeed;
  }

  // Limit position to screen bounds (10% to 90% to keep copilot visible)
  newPosition = Math.max(10, Math.min(90, newPosition));

  // Update copilot position
  copilot.style.left = `${newPosition}%`;

  // Check if copilot hits the edges
  if (newPosition <= 10 || newPosition >= 90) {
    startDiscoMode();
  } else {
    if (discoTimeout === null) {
      discoTimeout = window.setTimeout(stopDiscoMode, DISCO_COOLDOWN * 1000);
    }
  }
}

function updateGameState() {
  if (!checkOrientation()) return;

  if (gameState === "playing") {
    updatePlaneAssiette();
    updateCopilotPosition();
    updateEngineSound();

    if (isDiscoMode) {
      detectionLevel += 1 / 60; // Assuming 60 FPS
      updateDetectionBar();

      if (detectionLevel >= DETECTION_MAX_TIME) {
        gameState = "gameover";
        handleGameOver();
      }
    }

    // Update only sky video rotation, not the cockpit
    skyVideo.style.transform = `rotate(${-planeAssiette}deg)`;

    requestAnimationFrame(updateGameState);
  }
}

function handleDeviceOrientation(event: DeviceOrientationEvent) {
  if (gameState === "playing") {
    const tilt = event.gamma || 0; // Get device tilt
    planeAssiette = Math.max(-MAX_TILT, Math.min(MAX_TILT, tilt));
  }
}

function startGame() {
  if (!checkOrientation()) return;

  gameState = "playing";
  detectionLevel = 0;
  planeAssiette = 0;
  targetPlaneAssiette = 0;
  isDiscoMode = false;

  // Initialize audio context after user interaction
  engineSound = new AudioContext();
  oscillator = engineSound.createOscillator();
  gainNode = engineSound.createGain();
  oscillator.connect(gainNode);
  gainNode.connect(engineSound.destination);
  oscillator.type = "sawtooth";
  gainNode.gain.value = 0.1;

  showScreen("game-screen");
  skyVideo.play();
  oscillator.start();

  updateGameState();
}

function handleGameOver() {
  gameState = "gameover";
  showScreen("gameover-screen");
  stopDiscoMode();
  oscillator.stop();
  explosionSound.play();

  setTimeout(() => {
    restartButton.classList.remove("hidden");
  }, 5000);
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
  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    startButton.addEventListener("click", async () => {
      try {
        const permission = await DeviceOrientationEvent.requestPermission();
        if (permission === "granted") {
          startGame();
        }
      } catch (error) {
        console.error("Permission denied:", error);
      }
    });
  }
});