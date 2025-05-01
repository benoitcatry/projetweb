Contenu du Dépôt

    mini-projet-1-passport-local-session

    mini-projet-2-jwt

    mini-projet-3-oauth2-chat

⚙ Prérequis

    Node.js ≥ 16.x

    npm ≥ 8.x ou yarn

    PostgreSQL / MySQL / MongoDB selon le projet

    Redis (pour le mini-projet 3)

    .env pour chaque projet (exemples fournis)

 Instructions Générales d'Initialisation

Pour chaque mini-projet :

cd mini-projet-X # Remplacez par le dossier correspondant
cd backend
npm install
cp .env.example .env # et configurez les variables

cd ../frontend
npm install
npm run dev # ou npm run serve selon votre config Vue

 Mini-projet 1 : Authentification avec Passport-Local et Session
 Voir la démo vidéo (à compléter)

    Authentification par email/mot de passe avec sessions via cookies

    Sécurité côté serveur avec express-session et passport-local

Stack technique :

    Backend : Express.js + Passport.js + Sequelize (PostgreSQL ou MySQL)

    Frontend : Vue.js

    Sessions stockées dans les cookies

Fonctionnalités :

    Inscription

    Connexion

    Page protégée après authentification

    Déconnexion avec suppression de session

 Mini-projet 2 : Authentification avec JWT
 Voir la démo vidéo (à compléter)

    Authentification stateless avec génération de JWT

    Le client gère le token (LocalStorage ou SessionStorage)

Stack technique :

    Backend : Express.js + JWT + Sequelize

    Frontend : Vue.js

Fonctionnalités :

    Inscription & connexion

    Génération, validation et décodage du JWT

    Page d’accueil sécurisée

    Gestion du token côté client (auto-login, expiration, etc.)

 Mini-projet 3 : OAuth2 avec Google & Chat en temps réel
 Voir la démo vidéo (à compléter)

    Connexion via Google OAuth2

    Système de chat en temps réel entre utilisateurs authentifiés

Stack technique :

    Backend : Express.js + Passport.js (Google Strategy) + Mongoose

    Frontend : Vue.js

    Websocket : Socket.io


    Base de données : MongoDB

Fonctionnalités :

    Authentification OAuth2 avec Google

    Interface de chat en temps réel

    Historique des messages enregistré dans MongoDB

Video : 
[ Voir la vidéo du mini Projet 2 sur Google Drive]([https://drive.google.com/file/d/1AbcD1234EfGhIjKlmNOPQR5678/view?usp=sharing](https://drive.google.com/file/d/1A1pm4QdJu893rS4ZLy9Vr-RPUCl59GQX/view?usp=drive_link))





