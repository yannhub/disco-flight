import { Engine, World, Bodies, Body, Vector } from 'matter-js';
import { GameState, GameConfig, GameElements } from '../types/game';
import { AudioManager } from './AudioManager';

export class Game {
  private state: GameState = GameState.MENU;
  private config: GameConfig = {
    maxDetectionTime: 30,
    discoDeactivationDelay: 5000,
    tiltThreshold: 15,
    copilotSpeed: 0.5,
    planeMaxTilt: 30,
    planeTiltSpeed: 0.1
  };

  private elements: GameElements;
  private audioManager: AudioManager;
  private engine: Engine;
  private copilotBody: Body;
  private detectionLevel: number = 0;
  private isDiscoMode: boolean = false;
  private discoTimeout: number | null = null;
  private planeTilt: number = 0;
  private tiltDirection: number = 1;

  constructor() {
    this.elements = this.getGameElements();
    this.audioManager = new AudioManager();
    this.engine = Engine.create({
      gravity: { x: 0, y: 0, scale: 0.001 }
    });
    
    this.copilotBody = Bodies.rectangle(
      window.innerWidth / 2,
      window.innerHeight * 0.9,
      50,
      100,
      { friction: 0.1, restitution: 0.6 }
    );
    
    World.add(this.engine.world, [this.copilotBody]);
    
    this.setupEventListeners();
    this.initializeGame();
  }

  private getGameElements(): GameElements {
    return {
      container: document.getElementById('game-container') as HTMLElement,
      detectionBar: document.getElementById('detection-bar') as HTMLElement,
      skyVideo: document.getElementById('sky-video') as HTMLVideoElement,
      cockpit: document.getElementById('cockpit') as HTMLElement,
      copilot: document.getElementById('copilot') as HTMLElement,
      discoEffects: document.getElementById('disco-effects') as HTMLElement,
      menuScreen: document.getElementById('menu-screen') as HTMLElement,
      gameOverScreen: document.getElementById('game-over') as HTMLElement,
      startButton: document.getElementById('start-button') as HTMLElement,
      restartButton: document.getElementById('restart-button') as HTMLElement,
      orientationMessage: document.getElementById('orientation-message') as HTMLElement
    };
  }

  private setupEventListeners() {
    window.addEventListener('deviceorientation', this.handleDeviceOrientation.bind(this));
    this.elements.startButton.addEventListener('click', this.startGame.bind(this));
    this.elements.restartButton.addEventListener('click', this.restartGame.bind(this));
    window.addEventListener('orientationchange', this.checkOrientation.bind(this));
  }

  private async initializeGame() {
    this.elements.skyVideo.src = '/src/assets/sky-view.mp4';
    await this.audioManager.initializeEngine();
    this.checkOrientation();
    this.showStory();
  }

  private showStory() {
    const storyText = document.getElementById('story-text');
    if (storyText) {
      storyText.innerHTML = `
        <p>Bienvenue, copilote d'élite ! Vous êtes à bord du tout dernier prototype furtif de l'armée, le DISCO (Dispositif Intelligent de Survol et de Camouflage Optimal).</p>
        <p>Mais... il y a un problème. L'ingénieur chargé du projet, un certain Maurice, a mal interprété l'acronyme et a intégré un 'Mode Disco'... avec lumières clignotantes et musique disco activable via deux gros boutons rouges.</p>
        <p>Pire encore, la chaise sur laquelle vous êtes assis est une chaise à roulettes, car Maurice pensait qu'un cockpit 'ergonomique' augmenterait vos performances.</p>
        <p>Votre mission : garder l'équilibre et ne pas activer le mode Disco, sinon les radars ennemis vous repèrent ! Si la barre de détection en haut de l'écran se remplit, c'est fini pour vous. Bonne chance, pilote !</p>
      `;
    }
  }

  private checkOrientation() {
    if (window.orientation === undefined || window.orientation === 90 || window.orientation === -90) {
      this.elements.orientationMessage.classList.add('hidden');
      this.elements.menuScreen.classList.remove('hidden');
    } else {
      this.elements.orientationMessage.classList.remove('hidden');
      this.elements.menuScreen.classList.add('hidden');
    }
  }

  private startGame() {
    this.state = GameState.PLAYING;
    this.elements.menuScreen.classList.add('hidden');
    this.elements.container.classList.remove('hidden');
    this.elements.skyVideo.play();
    this.audioManager.startEngine();
    this.gameLoop();
  }

  private restartGame() {
    this.detectionLevel = 0;
    this.isDiscoMode = false;
    this.elements.gameOverScreen.classList.add('hidden');
    this.elements.discoEffects.classList.add('hidden');
    this.elements.container.classList.remove('hidden');
    this.state = GameState.PLAYING;
    this.audioManager.startEngine();
    Body.setPosition(this.copilotBody, Vector.create(window.innerWidth / 2, window.innerHeight * 0.9));
    Body.setVelocity(this.copilotBody, Vector.create(0, 0));
  }

  private handleDeviceOrientation(event: DeviceOrientationEvent) {
    if (this.state !== GameState.PLAYING || !event.gamma) return;
    
    const tilt = event.gamma;
    const force = Vector.create(
      (tilt / 90) * this.config.copilotSpeed,
      0
    );
    
    Body.applyForce(this.copilotBody, this.copilotBody.position, force);
  }

  private updatePlaneTilt() {
    if (Math.abs(this.planeTilt) >= this.config.planeMaxTilt) {
      this.tiltDirection *= -1;
    }
    
    this.planeTilt += this.config.planeTiltSpeed * this.tiltDirection;
    this.elements.skyVideo.style.transform = `rotate(${this.planeTilt}deg)`;
    
    const gravity = Vector.create(
      Math.sin(this.planeTilt * Math.PI / 180) * 0.001,
      0
    );
    this.engine.world.gravity = gravity;
  }

  private checkDiscoMode() {
    const copilotX = this.copilotBody.position.x;
    const isAtEdge = copilotX < 50 || copilotX > window.innerWidth - 50;

    if (isAtEdge && !this.isDiscoMode) {
      this.activateDiscoMode();
    } else if (!isAtEdge && this.isDiscoMode) {
      if (this.discoTimeout === null) {
        this.discoTimeout = window.setTimeout(() => {
          this.deactivateDiscoMode();
        }, this.config.discoDeactivationDelay);
      }
    } else if (isAtEdge && this.isDiscoMode && this.discoTimeout !== null) {
      clearTimeout(this.discoTimeout);
      this.discoTimeout = null;
    }
  }

  private activateDiscoMode() {
    this.isDiscoMode = true;
    this.elements.discoEffects.classList.remove('hidden');
    this.audioManager.playDiscoMusic();
  }

  private deactivateDiscoMode() {
    this.isDiscoMode = false;
    this.elements.discoEffects.classList.add('hidden');
    this.audioManager.stopDiscoMusic();
    this.discoTimeout = null;
  }

  private updateDetectionBar() {
    if (this.isDiscoMode) {
      this.detectionLevel += 1 / 60; // Assuming 60 FPS
      if (this.detectionLevel >= this.config.maxDetectionTime) {
        this.gameOver();
      }
    }
    
    const percentage = (this.detectionLevel / this.config.maxDetectionTime) * 100;
    this.elements.detectionBar.style.width = `${percentage}%`;
    this.elements.detectionBar.style.backgroundColor = `rgb(${percentage * 2.55}, ${255 - percentage * 2.55}, 0)`;
  }

  private gameOver() {
    this.state = GameState.GAME_OVER;
    this.audioManager.stopEngine();
    this.audioManager.stopDiscoMusic();
    this.audioManager.playExplosion();
    this.elements.container.classList.add('hidden');
    this.elements.gameOverScreen.classList.remove('hidden');
    
    setTimeout(() => {
      this.elements.restartButton.classList.remove('hidden');
    }, 5000);
  }

  private updateCopilotPosition() {
    const pos = this.copilotBody.position;
    this.elements.copilot.style.transform = `translateX(${pos.x - 75}px)`;
  }

  private gameLoop() {
    if (this.state !== GameState.PLAYING) return;

    Engine.update(this.engine);
    this.updatePlaneTilt();
    this.updateCopilotPosition();
    this.checkDiscoMode();
    this.updateDetectionBar();

    requestAnimationFrame(this.gameLoop.bind(this));
  }
}
