---
title: "Variables"
description: "Les variables fondamentales du framework SCSS"
order: 2
section: "styles"
---

# Wiki du Système de Variables SCSS

Ce guide détaille le système de variables disponible dans notre framework SCSS (`_variables.scss`), son rôle central dans le design system, et comment personnaliser ces variables pour adapter rapidement l'apparence et le comportement de votre site.

## Sommaire

1. [Principe fondamental](#principe-fondamental)
2. [Structure du fichier](#structure-du-fichier)
3. [Variables de couleurs](#variables-de-couleurs)
4. [Variables de dimensions](#variables-de-dimensions)
5. [Variables d'espacement](#variables-despacement)
6. [Variables de transitions](#variables-de-transitions)
7. [Variables de breakpoints](#variables-de-breakpoints)
8. [Bonnes pratiques](#bonnes-pratiques)
9. [Exemples d'utilisation](#exemples-dutilisation)

## Principe fondamental

Le fichier `_variables.scss` constitue la base fondamentale de notre design system. Il centralise toutes les valeurs qui définissent l'apparence, la taille et le comportement des éléments de l'interface. Cette approche offre plusieurs avantages majeurs :

- **Cohérence** : Des valeurs standardisées utilisées dans tout le code
- **Maintenabilité** : Modification globale par simple changement des variables
- **Flexibilité** : Adaptation rapide à différentes exigences de design
- **Efficacité** : Réduction des duplications de valeurs dans le code

Toutes les variables définies dans ce fichier sont accessibles dans l'ensemble de votre système SCSS, et peuvent être utilisées pour créer de nouveaux composants, modifier des styles existants, ou créer des thèmes personnalisés.

## Structure du fichier

Le fichier `_variables.scss` est organisé en sections logiques, chacune regroupant un type spécifique de variables :

```scss
// ==========================================================================
//  VARIABLES
// ==========================================================================

// Colors
// ==========================================================================
// ... variables de couleurs ...

// Dimensions
// ==========================================================================
// ... variables de dimensions ...

// Transitions
// ==========================================================================
// ... variables de transitions ...

// Etc.
```

Cette structure facilite la navigation et la maintenance du fichier, même quand il devient volumineux.

## Variables de couleurs

### Palette de couleurs principale

```scss
$white: #fff;
$ghost: #f3f3f3;
$pearl: #f2efef;
$alpine: #fdfbf5;
$silver: #a0a0a0;
$gray: #808080;
$charcoal: #2d2d2d;
$black: #000;
$sage: #76ad34;
$lime: #7ebe31;
$lime2: #40c07b;
$azure: #2fabd8;
$ocean: #1a78cc;
$cobalt: #24a3eb;
$cobalt2: #1664a4;
```

### Couleurs d'état et d'interaction

```scss
$lime-hover: #33995d;
$lime-hover2: #143f26;
$cobalt-hover: #1664a4;
$cobalt-hover2: #0b3c64;
```

### Dégradés

```scss
$gradient-lime: radial-gradient(circle at right, $lime, $lime2);
$gradient-lime-reverse: radial-gradient(circle at right, $lime-hover, $lime-hover2);
$gradient-cobalt: radial-gradient(circle at right, $cobalt, $cobalt2);
$gradient-cobalt-reverse: radial-gradient(circle at right, $cobalt-hover, $cobalt-hover2);
```

### Personnalisation des couleurs

Pour adapter la palette de couleurs à votre marque ou projet, modifiez simplement les valeurs hexadécimales. Tous les composants qui utilisent ces variables seront automatiquement mis à jour.

```scss
// Exemple de personnalisation pour une marque différente
$sage: #58b847; // Nouvelle couleur verte
$lime: #64c444; // Nouvelle couleur lime
$azure: #0099cc; // Nouvelle couleur bleue
```

## Variables de dimensions

### Dimensions de base

```scss
// Max width
$design-width: 1920px; // Largeur de référence pour le design
$design-width-stripped: 1920; // Version sans unité pour les calculs
$max-width: 1920px; // Largeur maximale du site
$max-width-stripped: 1920; // Version sans unité pour les calculs

// Max height
$design-height: 1080px; // Hauteur de référence pour le design
$design-height-stripped: 1080; // Version sans unité pour les calculs
$max-height: 1080px; // Hauteur maximale du contenu
$max-height-stripped: 1080; // Version sans unité pour les calculs
```

> **Note importante**: Les variables `$design-width` et `$design-height` sont utilisées comme références pour les calculs de dimensions proportionnelles. Tous les fichiers qui utilisaient auparavant des valeurs codées en dur (1920px pour la largeur et 1080px pour la hauteur) ont été mis à jour pour utiliser ces variables, garantissant ainsi une cohérence dans tout le site.

### Hauteurs d'en-tête

```scss
$header-heights: (
	mobile: (
		full: 80px,
		stripped: 80,
	),
	tablet: (
		full: 90px,
		stripped: 90,
	),
	desktop: (
		full: 160px,
		stripped: 160,
	),
);
```

### Personnalisation des dimensions

Pour adapter les dimensions à votre design, modifiez ces valeurs en fonction de votre maquette :

```scss
// Exemple pour un design basé sur une maquette de 1440px de large
$design-width: 1440px;
$design-width-stripped: 1440;
$max-width: 1440px;
$max-width-stripped: 1440;

// Hauteur d'en-tête personnalisée
$header-heights: (
	mobile: (
		full: 60px,
		// En-tête plus petit sur mobile
		stripped: 60,
	),
	// ... autres breakpoints ...
);
```

## Variables de transitions

```scss
$transitions: (
	short: 0.2s,
	default: 0.3s ease-in-out,
);
```

Ces variables définissent les durées et les fonctions de temporisation (easing) standard pour les animations et transitions CSS.

## Variables de breakpoints

```scss
$breakpoints: (
	tiny: (
		full: 320px,
		stripped: 320,
	),
	mobile: (
		full: 720px,
		stripped: 720,
	),
	tablet: (
		full: 1024px,
		stripped: 1024,
	),
	xlarge: (
		full: 1920px,
		stripped: 1920,
	),
);
```

Ces breakpoints définissent les points de rupture pour le design responsive. Chaque entrée comprend :

- Une version avec unité (`full`)
- Une version sans unité (`stripped`) pour les calculs

### Accès aux breakpoints dans le code

```scss
// Utilisation dans les media queries
@media (max-width: map-get(map-get($breakpoints, tablet), full)) {
	// Styles pour tablette et moins
}

// Utilisation avec le mixin dédié
@include tablet-only {
	// Styles pour tablette uniquement
}
```

## Variables d'espacement

```scss
$padding: (
	mobile: (
		small: 10px,
		base: 15px,
		medium: 25px,
		large: 40px,
		xl: 80px,
	),
	tablet: (
		small: 15px,
		base: 30px,
		medium: 40px,
		large: 50px,
		xl: 100px,
	),
	desktop: (
		xsmall: 40px,
		small: 70px,
		base: 90px,
		medium: 130px,
		large: 190px,
		xl: 220px,
	),
	xlarge: (
		xsmall: 40px,
		small: 70px,
		base: 90px,
		medium: 130px,
		large: 190px,
		xl: 220px,
	),
	vertical: (
		xsmall: 10px,
		base: 100px,
		medium: 120px,
		large: 150px,
		xl: 175px,
	),
);
```

Cette map définit un système d'espacement cohérent pour différentes tailles d'écran, permettant une mise en page harmonieuse et responsive.

### Accès aux valeurs de padding

```scss
// Obtenir le padding de base pour mobile
$mobile-base-padding: map-get(map-get($padding, mobile), base);

// Utilisation dans un élément
.element {
	padding: map-get(map-get($padding, desktop), medium);

	@include tablet-only {
		padding: map-get(map-get($padding, tablet), medium);
	}

	@include mobile-only {
		padding: map-get(map-get($padding, mobile), medium);
	}
}
```

## Bonnes pratiques

### Modification des variables

1. **Respectez la structure existante**: Conservez l'organisation du fichier pour faciliter la maintenance
2. **Commentez les changements**: Ajoutez des commentaires pour expliquer les modifications importantes
3. **Testez sur tous les breakpoints**: Assurez-vous que vos modifications fonctionnent sur tous les appareils
4. **Évitez les valeurs codées en dur**: Utilisez toujours des variables pour les valeurs répétées

### Extension du système

Pour ajouter de nouvelles variables :

```scss
// Ajout d'une nouvelle palette de couleurs secondaires
$secondary-colors: (
	purple: #8a2be2,
	teal: #008080,
	coral: #ff7f50,
);

// Ajout d'une nouvelle catégorie de variables
// ==========================================================================
// Animations
// ==========================================================================
$animations: (
	fade-in: 0.5s ease-in,
	slide-in: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275),
);
```

## Exemples d'utilisation

### Personnalisation d'un thème

```scss
// Fichier theme-corporate.scss
@import "variables";

// Surcharger les variables pour le thème corporate
$white: #ffffff;
$black: #222222;
$primary: #003366;
$secondary: #ff9900;

// Nouvelles dimensions adaptées au thème
$design-width: 1600px;
$design-width-stripped: 1600;
$max-width: 1600px;
$max-width-stripped: 1600;

// Continuer avec l'importation du reste du framework
@import "base";
```

### Utilisation dans les composants

```scss
.button {
	background-color: $lime;
	color: $white;
	padding: map-get(map-get($padding, mobile), small);
	transition: all map-get($transitions, default);

	&:hover {
		background-color: $lime-hover;
	}

	@include tablet-only {
		padding: map-get(map-get($padding, tablet), small);
	}
}

.hero-section {
	height: 80vh;
	max-height: $design-height * 0.5; // 50% de la hauteur de référence
	background: $gradient-cobalt;
}

.main-content {
	max-width: $design-width * 0.8; // 80% de la largeur de référence
	margin: 0 auto;
}
```

### Création d'un système de grille personnalisé

```scss
$grid-columns: 12;
$grid-gutter: 20px;

@for $i from 1 through $grid-columns {
	.col-#{$i} {
		width: ($i / $grid-columns) * 100%;
		padding: 0 ($grid-gutter / 2);
	}
}

@include tablet-only {
	$grid-columns: 8; // Moins de colonnes sur tablette

	// Redéfinition des classes pour tablette
	@for $i from 1 through $grid-columns {
		.col-#{$i} {
			width: ($i / $grid-columns) * 100%;
		}
	}
}
```

---

Le fichier `_variables.scss` est la pierre angulaire de votre design system. En comprenant et en utilisant efficacement ces variables, vous pouvez garantir la cohérence visuelle de votre site tout en simplifiant considérablement la maintenance et les mises à jour futures. Rappelons que toute modification de ces variables aura un impact global sur l'ensemble du site, permettant une personnalisation rapide et efficace.
