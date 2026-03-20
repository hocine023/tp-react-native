# 🗺️ Urban Explorer

**Urban Explorer** est une application mobile centralisée conçue comme le guide de poche ultime pour les Parisiens et les touristes. Elle permet de découvrir facilement des événements culturels à Paris, de les visualiser sur une carte interactive et de planifier ses visites directement depuis son smartphone.

Projet réalisé dans le cadre du **Master MIA (Expert en IA, Big Data et Développement) - IPSSI 2025-2027**.

---

## ✨ Fonctionnalités Principales

- 🔍 **Découverte & Recherche :** Flux dynamique des événements parisiens avec une barre de recherche optimisée en temps réel (système de *debounce* de 500ms pour préserver les performances de l'API).
- 🗺️ **Carte Interactive :** Géolocalisation et affichage dynamique des lieux sur une carte via leurs coordonnées GPS.
- 📅 **Planification Native :** Fiches détaillées pour chaque événement avec la possibilité d'ajouter la visite directement dans le **calendrier natif** du téléphone.
- 📸 **Profil Utilisateur :** Personnalisation de l'expérience avec la prise d'un selfie en direct via l'appareil photo du téléphone.
- 💾 **Mode Hors-ligne / Persistance :** Sauvegarde locale de la photo de profil et des visites planifiées (les données sont conservées même après la fermeture de l'application).
- 🎨 **UI/UX & Animations :** Interface soignée avec des composants réutilisables et des animations natives (apparitions en fondu `FadeInCard`, boutons animés `PulseButton`).

---

## 🛠️ Stack Technique

L'application repose sur une architecture moderne, typée et robuste :

- **Framework :** React Native (v0.81.x)
- **Environnement :** Expo (SDK 54.0.0)
- **Langage :** TypeScript (Typage strict pour une meilleure Developer Experience et la prévention des crashs)
- **Réseau :** Axios (Consommation de l'Open Data de la Ville de Paris)
- **Stockage Local :** AsyncStorage
- **Modules Natifs :** `expo-camera`, `react-native-maps`, API Calendrier native.

---

## 🏗️ Architecture du Projet

Le projet respecte les principes du **Clean Code**, avec une séparation stricte des responsabilités (du plus global au plus précis) :

```text
urban-explorer/
├── App.tsx                 # Point d'entrée de l'application
└── src/
    ├── navigation/         # Configuration des flux (AppTabs, DiscoveryStack)
    ├── screens/            # Vues principales de l'application
    │   ├── DiscoveryScreen.tsx
    │   ├── MapScreen.tsx
    │   ├── DetailScreen.tsx
    │   └── ProfileScreen.tsx
    ├── components/         # Briques UI réutilisables et indépendantes
    │   ├── LieuCard.tsx
    │   ├── SearchBar.tsx
    │   ├── Loader.tsx
    │   ├── ErrorState.tsx
    │   ├── FadeInCard.tsx
    │   └── PulseButton.tsx
    ├── services/           # Logique métier et communication externe
    │   ├── api.ts          # Appels HTTP avec Axios
    │   └── storage.ts      # Gestion de la persistance avec AsyncStorage
    └── types/              # Contrats de données et interfaces TypeScript