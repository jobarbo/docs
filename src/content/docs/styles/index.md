---
title: "Sommaire de la documentation"
description: "Documentation complète de notre framework SCSS"
order: 1
section: "styles"
lastUpdated: "16/08/2023"
---

# Sommaire de la documentation SCSS

## Introduction

Bienvenue dans la documentation complète de notre framework SCSS. Ce guide regroupe toutes les informations nécessaires pour comprendre et utiliser efficacement les différents composants, mixins, et fonctionnalités disponibles dans notre système de design.

Notre framework a été conçu avec plusieurs principes fondamentaux :

- **Cohérence** : Utilisation de variables et paramètres centralisés pour maintenir une apparence uniforme
- **Modularité** : Composants et fonctionnalités indépendants mais complémentaires
- **Responsive par défaut** : Adaptation fluide à toutes les tailles d'écran sans configuration supplémentaire
- **Proportionnalité** : Système basé sur les variables `$design-width` et `$design-height` pour des calculs précis et cohérents
- **Maintenabilité** : Structure claire et documentation détaillée pour faciliter l'évolution du système

Cette documentation est organisée en sections distinctes, chacune couvrant un aspect spécifique du framework. Vous pouvez naviguer directement vers la section qui vous intéresse ou explorer l'ensemble du système pour une compréhension globale.

## Sommaire

1. [Variables](#variables)
2. [Fonctions](#fonctions)
3. [Media Queries](#media-queries)
4. [Typographie](#typographie)
5. [Conteneurs](#conteneurs)
6. [Transitions](#transitions)
7. [WYSIWYG](#wysiwyg)
8. [Intégration des composants](#intégration-des-composants)

---

## Variables

**[Documentation complète](/docs/styles/variables)**

Le fichier `_variables.scss` est la pierre angulaire de notre framework, définissant toutes les valeurs fondamentales qui façonnent l'apparence et le comportement de l'interface.

### Contenu principal

- Palette de couleurs et leurs variantes
- Dimensions de référence (`$design-width` et `$design-height`)
- Points de rupture (breakpoints) pour le responsive
- Espacements et paddings standardisés
- Durées et courbes de transition

### Utilisation type

```scss
// Utilisation des couleurs
.element {
	color: $primary;
	background-color: $secondary;
}

// Conversion proportionnelle basée sur les dimensions de design
.responsive-element {
	width: to-vw(400); // Basé sur $design-width
}
```

[→ Voir la documentation détaillée des variables](/docs/styles/variables)

---

## Fonctions

**[Documentation complète](/docs/styles/functions)**

Le fichier `_functions.scss` contient un ensemble de fonctions et mixins utilitaires qui facilitent la création de designs responsives et proportionnels.

### Contenu principal

- Convertisseurs d'unités (px, em, rem, vw, vh)
- Fonctions de dimensions proportionnelles
- Fonctions d'accès aux configurations
- Mixins responsives

### Utilisation type

```scss
// Conversion en unités viewport
font-size: to-vw(24); // Sur un écran $design-width, équivaut à 1.25vw

// Avec limites min/max
padding: to-vw(40, true, 20, 60); // clamp(20px, 2.08vw, 60px)

// Accès aux données de configuration
margin: get-padding("desktop", "medium");
```

[→ Voir la documentation détaillée des fonctions](/docs/styles/functions)

---

## Media Queries

**[Documentation complète](/docs/styles/mediaqueries)**

Le fichier `_mediaqueries.scss` fournit des mixins pour gérer facilement les styles responsives à travers différentes tailles d'écran.

### Contenu principal

- Mixins génériques pour media queries
- Mixins spécifiques aux appareils (desktop, tablet, mobile)
- Mixins pour l'impression et les écrans haute résolution

### Utilisation type

```scss
.element {
	width: 100%;

	@include tablet-only {
		width: 80%;
	}

	@include mobile-only {
		width: 100%;
	}
}
```

[→ Voir la documentation détaillée des media queries](/docs/styles/mediaqueries)

---

## Typographie

**[Documentation complète](/docs/styles/typography)**

Le fichier `_typography.scss` offre un système complet pour gérer la typographie de manière cohérente et responsive.

### Contenu principal

- Variables typographiques de base
- Configuration des titres (H1-H6)
- Mixins pour les titres et le texte
- Styles de liste personnalisables
- Classes utilitaires pour la typographie

### Utilisation type

```scss
// Titre responsive avec options
.headline {
	@include title(1, $color: $primary, $mb: 1em);
}

// Texte avec style spécifique
.intro-text {
	@include text($fs: 18, $fw: 500, $color: $gray-600);
}
```

[→ Voir la documentation détaillée de la typographie](/docs/styles/typography)

---

## Conteneurs

**[Documentation complète](/docs/styles/container)**

Le fichier `_container.scss` fournit un système flexible pour créer des conteneurs avec des paddings et des largeurs cohérents.

### Contenu principal

- Mixin `container` pour créer des conteneurs personnalisables
- Adaptation automatique aux différentes tailles d'écran
- Options pour les largeurs maximales et les paddings

### Utilisation type

```scss
// Conteneur standard
.section {
	@include container();
}

// Conteneur avec largeur maximale
.narrow-section {
	@include container($is-max-width: true);
}

// Conteneur avec paddings personnalisés
.custom-section {
	@include container(
		(
			xlarge: 60px,
			desktop: 40px,
			tablet: 30px,
			mobile: 15px,
		)
	);
}
```

[→ Voir la documentation détaillée des conteneurs](/docs/styles/container)

---

## Transitions

**[Documentation complète](/docs/styles/transitions)**

Le fichier `_transitions.scss` contient une collection de courbes d'accélération (easing) pour les animations et transitions CSS.

### Contenu principal

- Courbes d'accélération préconfigurées
- Différentes familles d'easing (Cubic, Circ, Expo, etc.)
- Exemples d'application pour créer des animations fluides

### Utilisation type

```scss
.button {
	transition: all 0.3s $easeInOutCubic;

	&:hover {
		transform: scale(1.05);
	}
}
```

[→ Voir la documentation détaillée des transitions](/docs/styles/transitions)

---

## WYSIWYG

**[Documentation complète](/docs/styles/wysiwyg)**

Le fichier `_wysiwyg.scss` définit des styles pour le contenu éditable et les éditeurs visuels.

### Contenu principal

- Styles pour les éléments HTML dans les éditeurs
- Intégration avec le système typographique
- Personnalisation de l'apparence de l'éditeur
- Mixin pour appliquer les styles WYSIWYG à n'importe quel conteneur

### Utilisation type

```scss
// Appliquer les styles WYSIWYG à un conteneur spécifique
.blog-content {
	@include wysiwyg($color: $primary);
}
```

[→ Voir la documentation détaillée du WYSIWYG](/docs/styles/wysiwyg)

---

## Intégration des composants

Notre framework est conçu pour que tous ces éléments fonctionnent harmonieusement ensemble. Voici quelques exemples d'intégration de différents composants :

### Exemple de section responsive complète

```scss
.hero-section {
	@include container();
	padding-top: to-vw(100);
	padding-bottom: to-vw(80);
	background-color: $pearl;

	&__title {
		@include title(1, $color: $primary, $mb: to-vw(30));
	}

	&__subtitle {
		@include text($fs: 24, $color: $gray-700, $mb: to-vw(50));
		max-width: to-vw(800);
	}

	&__cta {
		@include button($size: "large", $variant: "primary");
		transition: transform 0.3s $easeOutBack;

		&:hover {
			transform: scale(1.05);
		}
	}

	@include tablet-only {
		padding-top: 60px;
		padding-bottom: 50px;
	}

	@include mobile-only {
		padding-top: 40px;
		padding-bottom: 30px;
	}
}
```

### Structure de projet recommandée

Pour une utilisation optimale du framework, nous recommandons d'organiser vos fichiers SCSS comme suit :

```
assets/
└── scss/
    ├── base/                  # Fichiers fondamentaux
    │   ├── _variables.scss    # Variables globales
    │   ├── _functions.scss    # Fonctions et mixins utilitaires
    │   ├── _mediaqueries.scss # Mixins pour media queries
    │   ├── _typography.scss   # Système typographique
    │   ├── _container.scss    # Système de conteneurs
    │   ├── _transitions.scss  # Courbes d'accélération
    │   └── _wysiwyg.scss      # Styles pour éditeurs
    ├── components/            # Composants réutilisables
    │   ├── _buttons.scss      # Styles de boutons
    │   ├── _forms.scss        # Styles de formulaires
    │   └── ...
    ├── layouts/               # Mises en page spécifiques
    │   ├── _header.scss       # En-tête du site
    │   ├── _footer.scss       # Pied de page du site
    │   └── ...
    ├── pages/                 # Styles spécifiques aux pages
    │   ├── _home.scss         # Page d'accueil
    │   ├── _about.scss        # Page à propos
    │   └── ...
    ├── vendors/               # Librairies externes
    │   └── ...
    └── main.scss              # Fichier principal qui importe tout
```

---

## Conclusion

Ce framework SCSS offre un système complet et cohérent pour la création d'interfaces web responsives et esthétiques. Grâce à sa structure modulaire et à sa documentation détaillée, il facilite le développement et la maintenance de projets de toutes tailles.

Pour toute question ou suggestion concernant cette documentation, veuillez contacter l'équipe de développement.

---

_Dernière mise à jour : [Date actuelle]_
