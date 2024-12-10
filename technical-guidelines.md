# Technical Guidelines

## Contexte

Le jeu doit se jouer sur un seul sur un smartphone ou tablette.

## Technologies

Le jeu doit utiliser les technologies suivantes :

- HTML5
- CSS3
- TypeScript

## Architecture Technique

### 1. Structure du Projet
```
/src
  /assets       # Assets de jeu
  /components   # Composants réutilisables
  /core         # Moteur de jeu
  /scenes       # Scènes de jeu
  /utils        # Utilitaires
  /types        # Types TypeScript
```

### Bundler
Vite 5

### 4. Moteur Physique
- Utilisation de `Matter.js` pour:
  - Détection de collisions
  - Gravité et forces
  - Vélocité et accélération
  - Hitboxes optimisées

### 5. Audio Engine
- Web Audio API pour:
  - Effets sonores avec spatial audio
  - Musique de fond avec fade in/out
  - Sound pooling pour performances
  - Compression dynamique du son

### 6. Effets Visuels
- Système de particules pour effets disco
- Shaders GLSL pour:
  - Effets de lumière dynamiques
  - Flou gaussien
  - Color grading
  - Bloom effect

### 7. Contrôles
- Gyroscope via `DeviceOrientation API`
- Touch events multi-touch
- Calibration automatique du gyroscope
- Fallback clavier pour debug

### 8. Performance
- RequestAnimationFrame pour boucle de jeu
- Garbage collection minimisé
- Asset pooling
- Lazy loading des ressources
- GPU acceleration forcée

### 9. Responsive Design
- Viewport meta tags optimisés
- Layout fluide avec CSS Grid/Flexbox
- Media queries pour différents devices
- Adaptation dynamique de la qualité

### 10. State Management
- Architecture ECS (Entity Component System)
- State machine pour gestion des scènes
- Observable pattern pour events
- Sauvegarde locale avec LocalStorage

## Optimisations Spécifiques

### 1. Gestion de la Mémoire
- Destruction propre des objets non utilisés
- Limitation du nombre de particules
- Texture atlas pour grouper les images
- Pooling des objets fréquents

### 2. Performances Graphiques
- Utilisation de `transform: translateZ(0)`
- Batch rendering pour les sprites
- Hardware acceleration via CSS
- Réduction des layer compositing

### 3. Optimisation Mobile
- Touch events avec debounce
- Gestion de la batterie
- Adaptation de la qualité selon device
- Préchargement intelligent

## Standards de Code

- ESLint avec règles strictes
- Prettier pour formatage
- Tests unitaires avec Jest
- Documentation TSDoc
- Semantic versioning