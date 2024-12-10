# DiscoFlight - Document de Game Design

## Écran d'accueil

Tant que le telephone est tenu en mode portrait un texte indique au joueur de changer d'orientation.

Quand l'oreientation est bien en paysage l'ecran d'introduction apparait.

### Histoire d'introduction

Sur l'écran d'accueil, un texte humoristique explique le contexte du jeu :

> Bienvenue, copilote d'élite ! Vous êtes à bord du tout dernier prototype furtif de l'armée, le DISCO (Dispositif Intelligent de Survol et de Camouflage Optimal).
>
> Mais... il y a un problème. L'ingénieur chargé du projet, un certain Maurice, a mal interprété l'acronyme et a intégré un 'Mode Disco'... avec lumières clignotantes et musique disco activable via deux gros boutons rouges.
>
> Pire encore, la chaise sur laquelle vous êtes assis est une chaise à roulettes, car Maurice pensait qu'un cockpit 'ergonomique' augmenterait vos performances.
>
> Votre mission : garder l'équilibre et ne pas activer le mode Disco, sinon les radars ennemis vous repèrent ! Si la barre de détection en haut de l’écran se remplit, c'est fini pour vous. Bonne chance, pilote !

L'ecran est sur un fond dégradé de bleu nuit.

En haut de l'ecran on a le titre du jeu en grand en blanc.
Puis vient le texte humouristique, qui doit être scrollable si besoin.

En dessous un bouton "Commencer la mission" permet de lancer le jeu.

## Description de la vue en jeu

La vue est composée tel quel :

- En arriere plan, on voit une vidéo de ciel qui tourne en boucle. (sky-view.mp4)
- Par dessus on voit le cockpit de l'avion. (cockpit.png)
- En avant plan, on voit le copilote intialement placé en bas de l'ecran et centré horizontalement. (copilot.png)
- En haut de l'ecran, se trouve la barre de detection verte.

## Mécanique de jeu

### Mouvements de l'avion et du copilote

L'avion penche automatiquement vers la gauche ou la droite de manière aleatoire.
Lorsque l'avion penche vers la gauche ou la droite, le ciel tourne vers la gauche ou la droite mais le cockpit reste immobile.
En fonction de l'angle de rotation une force de gravité est appliquée sur le copilote qui va glisser vers la gauche ou la droite.

#### Contrôles

Lorsque le joueur incline le téléphone à gauche ou à droite, il compense la force de gravité pour garder l'équilibre du copilot et éviter qu'il ne glisse vers la gauche ou la droite.

### Barre de détection

- Chaque seconde passée en mode Disco remplit la barre en rouge.
- Le maximum est de 30 secondes
- Une fois pleine, la vidéo de Game Over se lance.

### Musique de fond

- En arriere plan, un bruit de moteur est généré via une api javascript.

### Mode Disco

Lorsque le copilote touche les bords droite ou gauche de l'ecran, l'avion passe en mode Disco.

- Une musique disco entraînante démarre. (disco-music.mp3)
- Des effets de lumières multicolores clignotent sur le cockpit.
- Le mode disco se coupe quand le pilote ne touche plus les bords pendant 5 secondes.

### Game Over (vidéo et bouton recommencer)

Lorsque la barre de détection atteint son maximum :

- La musique disco s'arrête.
- Une musique d'explosion se joue. (explosion.mp3)
- Une image d'explosion se lance en plein écran. (explosion.jpg)
- 5 secondes après la fin de l'explosion, un bouton "Recommencer" apparaît pour relancer le jeu.
