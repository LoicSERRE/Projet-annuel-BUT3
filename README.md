# S5.A.01 - Développement avancé

Loïc SERRE - Étudiants BUT Informatique site d'Arles en Alternance chez MGPS, Manutention Gérée Par Satellite à Port-Saint-Louis-du-Rhône

## Description du projet

Ce projet est un proof of concept (POC) pour la mise en place d'une application multi-plateforme (web et desktop dans mon cas, mais peut être mobile, embarqué, etc...).
Le but de mon application est de permettre à un utilisateur de gérer une cartographie de port commercial.
L'utilisateur pourra alors modifier les emplacements des conteneurs, les déplacer, les supprimer, les ajouter, etc...

# Tâche à réaliser

###### Début du projet

- [X] Initialisation du projet
  - [X] Initialisation du projet avec npm
  - [X] Création des documents de gestion de projet
  - [X] Préparation pour la génération de la documentation
  - [X] Préparation pour les jeux de test
  - [X] Préparation des tests d'intégrations dans PostMan
  - [X] Création du fichier Dockerfile

###### Base de données

- [X] Création de la base de données
  - [X] Création d'une fonction JavaScript permettant de créer la base de données
  - [X] Insertion de données de test dans la base de données

###### Développement de l'API

- [ ] Création de l'API
  - [X] Création des entitées
  - [X] Création des DAO
  - [X] Création des Factory
  - [X] Création des routes
    - [X] Mise en place de PostMan pour tester les routes
  - [X] Création des contrôleurs
  - [X] Créations des services
  - [ ] Création des tests unitaires
- [X] Génération de la documentation de l'API avec mocha
- [ ] Gestion de la connexion
  - [X] Chiffrement des mots de passe
  - [X] Token de connexion
  - [X] Refresh Token
  - [ ] Gestion des autorisations

###### Développement de l'application web

- [ ] Création de l'application web
  - [ ] Choix du framework
  - [ ] Initialisation du projet
  - [ ] Création de la page de connexion
  - [ ] Génération de la cartographie par rapport à la base de données
  - [ ] Développement des fonctionnalités de la cartographie
    - [ ] Déplacement des conteneurs
    - [ ] Suppression des conteneurs
    - [ ] Ajout de conteneurs
    - [ ] Modification des conteneurs
  - [ ] Génération de la documentation de l'application web

###### Développement de l'application desktop

- [ ] Création de l'application desktop
  - [ ] Choix du framework
  - [ ] Initialisation du projet
  - [ ] Création de la page de connexion
  - [ ] Génération de la cartographie par rapport à la base de données
  - [ ] Développement des fonctionnalités de la cartographie
    - [ ] Déplacement des conteneurs
    - [ ] Suppression des conteneurs
    - [ ] Ajout de conteneurs
    - [ ] Modification des conteneurs
  - [ ] Génération de la documentation de l'application desktop

###### Revue de projet

- [ ] Réalisation du diaporama de présentation

# Guide d'utilisation

## Guide d'utilisation de l'API

## Guide d'utilisation de l'application web

## Guide d'utilisation de l'application desktop

# Analyse et conception

# Suivis de projet

| Tâche                                          | Description                                                                                                                                                                                 | Date de début | Date de fin | Nombre d'heures |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ----------- | --------------- |
| Initialisation du projet                        | Configuration du projet (npm init,<br />ajout des différents fichiers qui seront utiles, document de gestion de projet...)                                                                 | 14/12/2023     | 14/12/2023  | 2               |
| Création de la base de données                | Création d'une fonction JavaScript permettant<br />de gérer les différentes tables de la base de données et également d'y mettre des données de test pour le développement de l'API. | 14/12/2023     | 15/12/2023  | 1.5             |
| Création du dockerfile                         | Fichier Dockerfile pour pouvoir virtualiser l'api et l'utiliser plus facilement quand elle sera finis                                                                                       | 15/12/2023     | 15/12/2023  | 0.5             |
| Mise à jour du documents de suivis de projet   | Cette case dénombre le temps que je passe à éditer les documents de suivis de projet                                                                                                     | 14/12/2023     | 15/12/2023  | 0.5             |
| Création des entitiées                        | Création des différentes entitées représentant un éléments de chaque table de la base de données                                                                                     | 15/12/2023     | 15/12/2023  | 0.75            |
| Création des DAO                               | Création des DAO et création de la structure des DAOSqlite                                                                                                                                | 15/12/2023     | 16/12/2023  | 1.5             |
| Création des Factory                           | Création complete des factory                                                                                                                                                              | 16/12/2023     | 16/12/2023  | 0.75            |
| Mise à jour du documents de suivis de projet   | Cette case dénombre le temps que je passe à éditer les documents de suivis de projet                                                                                                     | 16/12/2023     | 16/12/2023  | 0.5             |
| Création des routes                            | Création des parametres de routes pour chaque services de l'API                                                                                                                            | 16/12//2023    | 16/12/2023  | 0.5             |
| Mise en place de PostMan pour tester les routes | Configuration de POSTMAN pour                                                                                                                                                               | 17/12/2023     | 17/12/2023  | 0.5             |
| Création des contrôleurs                      | Finalisation des controleurs pour chaque services de l'api                                                                                                                                  | 16/12/2023     | 16/12/2023  | 3               |
| Finalisation des DAO                            | Finsaliation des DAO pour Sqlite                                                                                                                                                            | 17/12/2023     | 17/12/2023  | 2               |
| Création des services                          | Création complete des services                                                                                                                                                             | 16/12/2023     | 16/12/2023  | 0.75            |
| Mise à jour du documents de suivis de projet   | Cette case dénombre le temps que je passe à éditer les documents de suivis de projet                                                                                                     | 17/12/2023     | 17/12/2023  | 0.5             |
| Chiffrement des mots de passe                   | Ajout du chiffrement des mots de passe dans la base de données et à l'ajout d'un utilisateurs                                                                                             | 17/12/2023     | 17/12/2023  | 0.5             |
| Token de connexion                              | Ajout d'un middle ware pour verifier la connexion                                                                                                                                           | 17/12/2023     | 17/12/2023  | 1.5             |
| Mise à jour du documents de suivis de projet   | Cette case dénombre le temps que je passe à éditer les documents de suivis de projet                                                                                                     | 17/12/2023     | 17/12/2023  | 0.25            |
| Ajout de la déconnexion                        | Création d'une table de token revoquer pour stocker les tokens qui ont été retirer                                                                                                       | 21/12/2023     | 27/12/2023  | 1               |
| Ajout d'un refresh token                        | Création d'un refresh token, pour améliorer la sécurité de l'API ainsi que sa praticité                                                                                                | 22/12/2023     | 27/12/2023  | 4               |
| Mise à jour des test d'intégration de postman | Mise à jour de toutes les routes présente sur postman pour rajouter le refresh token                                                                                                      | 26/12/2023     | 26/12/2023  | 0.25            |
| Mise à jour du documents de suivis de projet   | Cette case dénombre le temps que je passe à éditer les documents de suivis de projet                                                                                                     | 27/12/2023     | 27/12/2023  | 0.25            |
| Création des tests unitaires                   |                                                                                                                                                                                             |                |             |                 |

## Total des heures

| Total des heures                        | 23    |
| --------------------------------------- | ----- |
| Initialisation du projet                | 2.5   |
| Documents de suivis de projet           | 1.75  |
| Base de données                        | 1.5   |
| Développement de l'API                 | 17.25 |
| Développement de l'application web     | 0     |
| Développement de l'application desktop | 0     |
| Revue de projet                         | 0     |
