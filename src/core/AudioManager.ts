import { AudioAssets } from '../types/game';

export class AudioManager {
  private context: AudioContext;
  private assets: AudioAssets;

  constructor() {
    this.context = new AudioContext();
    this.assets = {
      discoMusic: new Audio('/src/assets/disco-music.mp3'),
      explosion: new Audio('/src/assets/explosion.mp3'),
      engineSound: null
    };
  }

  async initializeEngine() {
    try {
      const response = await fetch('/src/assets/engine-sound.mp3');
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.context.decodeAudioData(arrayBuffer);
      
      const source = this.context.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;
      
      const gainNode = this.context.createGain();
      gainNode.gain.value = 0.3;
      
      source.connect(gainNode);
      gainNode.connect(this.context.destination);
      
      this.assets.engineSound = source;
    } catch (error) {
      console.error('Failed to load engine sound:', error);
    }
  }

  startEngine() {
    if (this.assets.engineSound) {
      this.assets.engineSound.start();
    }
  }

  stopEngine() {
    if (this.assets.engineSound) {
      this.assets.engineSound.stop();
    }
  }

  playDiscoMusic() {
    this.assets.discoMusic.currentTime = 0;
    this.assets.discoMusic.play();
  }

  stopDiscoMusic() {
    this.assets.discoMusic.pause();
    this.assets.discoMusic.currentTime = 0;
  }

  playExplosion() {
    this.assets.explosion.currentTime = 0;
    this.assets.explosion.play();
  }
}
