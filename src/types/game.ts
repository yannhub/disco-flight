export enum GameState {
  MENU,
  PLAYING,
  GAME_OVER
}

export interface GameConfig {
  maxDetectionTime: number;
  discoDeactivationDelay: number;
  tiltThreshold: number;
  copilotSpeed: number;
  planeMaxTilt: number;
  planeTiltSpeed: number;
}

export interface AudioAssets {
  discoMusic: HTMLAudioElement;
  explosion: HTMLAudioElement;
  engineSound: AudioBufferSourceNode | null;
}

export interface GameElements {
  container: HTMLElement;
  detectionBar: HTMLElement;
  skyVideo: HTMLVideoElement;
  cockpit: HTMLElement;
  copilot: HTMLElement;
  discoEffects: HTMLElement;
  menuScreen: HTMLElement;
  gameOverScreen: HTMLElement;
  startButton: HTMLElement;
  restartButton: HTMLElement;
  orientationMessage: HTMLElement;
}
