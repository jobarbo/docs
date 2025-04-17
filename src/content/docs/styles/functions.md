---
title: "Fonctions"
description: "Les fonctions utilitaires du framework SCSS"
order: 3
section: "styles"
---

# Wiki des Fonctions et Mixins SCSS

Ce guide détaille les fonctions et mixins disponibles dans notre framework SCSS (`_functions.scss`), leur fonctionnement et comment les utiliser efficacement pour créer un design responsive cohérent et proportionnel.

## Sommaire

1. [Principe fondamental](#principe-fondamental)
2. [Convertisseurs d'unités](#convertisseurs-dunités)
3. [Fonctions de dimensions proportionnelles](#fonctions-de-dimensions-proportionnelles)
4. [Fonctions d'accès aux configurations](#fonctions-daccès-aux-configurations)
5. [Mixins responsives](#mixins-responsives)
6. [Cas d'utilisation](#cas-dutilisation)
7. [Tableau de référence](#tableau-de-référence)

## Principe fondamental

Le fichier `_functions.scss` contient un ensemble de fonctions et mixins utilitaires qui facilitent :

- La conversion entre différentes unités (px, em, rem, vw, vh)
- La création de designs fluides et proportionnels
- L'adaptation du contenu aux différentes tailles d'écran
- L'accès simplifié aux données de configuration

> **Mise à jour importante** : Les fonctions utilisant des dimensions proportionnelles (comme `to-vw`, `to-vh`, etc.) se basent maintenant sur les variables `$design-width` et `$design-height` au lieu de valeurs codées en dur (1920px et 1080px). Cela permet une meilleure cohérence et facilite le changement des dimensions de référence pour l'ensemble du système.

## Convertisseurs d'unités

### Fonctions de base

```scss
// Retirer l'unité d'une valeur
@function strip-unit($value) {
	@if type-of($value) == "number" and unit($value) != "" {
		@return math.div($value, ($value * 0 + 1));
	}
	@return $value;
}

// Convertir px en em
@function em($px) {
	@return #{strip-unit(math.div($px, $function-size-default))}em;
}

// Convertir px en rem
@function rem($px) {
	$px: strip-unit($px);
	@return calc($px / $function-size-default) + rem;
}
```

Ces fonctions permettent de convertir facilement entre différentes unités de mesure, ce qui est essentiel pour un design responsive cohérent.

### Exemple d'utilisation

```scss
.element {
	font-size: em(16); // Résultat: 1em
	margin-bottom: rem(24); // Résultat: 1.5rem
	width: strip-unit(50%); // Résultat: 50 (sans unité)
}
```

## Fonctions de dimensions proportionnelles

### Conversion en unités viewport

```scss
// Convertir px en vw (viewport width)
@function to-vw($px, $clamp: false, $clamp-min: null, $clamp-max: null) {
	$initial-value: $px;
	@if $clamp {
		// Configuration des valeurs min/max si fournies
		$clamp-min: if($clamp-min, $clamp-min, $initial-value);
		$clamp-max: if($clamp-max, $clamp-max, $initial-value * 2);

		// Calcule la valeur en vw basée sur $design-width
		$vw-value: math.div($px, $design-width-stripped) * 100;
		@return clamp(#{$clamp-min}px, #{$vw-value}vw, #{$clamp-max}px);
	} @else {
		@return math.div($px, $design-width-stripped) * 100 + vw;
	}
}

// Convertir px en vh (viewport height)
@function to-vh($px, $clamp: false, $clamp-min: null, $clamp-max: null, $stripped: false) {
	// Implémentation similaire à to-vw mais basée sur $design-height
	// ...
}
```

> **Changement important** : Ces fonctions utilisent désormais les variables `$design-width-stripped` et `$design-height-stripped` comme références pour les calculs de dimensions proportionnelles, au lieu des valeurs codées en dur (1920 pour la largeur et 1080 pour la hauteur).

### Fonctions de conversion avancées

```scss
// Convertir vw en px
@function vw-to-px($vw) {
	@return $vw * math.div($design-width-stripped, 100);
}

// Convertir rem en vw
@function rem-to-vw($rem) {
	$px: $rem * $function-size-default;
	@return math.div($px, $design-width-stripped) * 100 + vw;
}

// Convertir em en vw
@function em-to-vw($em, $context: $function-size-default) {
	$px: $em * $context;
	@return math.div($px, $design-width-stripped) * 100 + vw;
}
```

### Exemple d'utilisation

```scss
.hero-title {
	// Taille de police proportionnelle qui s'adapte à la largeur de l'écran
	font-size: to-vw(60); // Sur un écran de 1920px (design-width), ce sera 3.125vw

	// Avec limites min/max pour éviter les tailles extrêmes
	margin-bottom: to-vw(40, true, 20, 60); // clamp(20px, 2.08vw, 60px)
}

.vertical-spacing {
	// Hauteur proportionnelle à la hauteur de l'écran
	height: to-vh(200); // Sur un écran de 1080px (design-height), ce sera 18.52vh
}
```

## Fonctions d'accès aux configurations

Ces fonctions facilitent l'accès aux données de configuration stockées dans des maps complexes :

```scss
// Récupérer une valeur de padding
@function get-padding($breakpoint, $size: "base") {
	@return map-get(map-get($padding, $breakpoint), $size);
}

// Récupérer une valeur de breakpoint
@function breakpoint($device, $type: "full") {
	@return map-get(map-get($breakpoints, $device), $type);
}

// Récupérer une valeur de transition
@function transition($type: "default") {
	@return map-get($transitions, $type);
}

// Récupérer une hauteur d'en-tête
@function header-height($device, $type: "full") {
	@return map-get(map-get($header-heights, $device), $type);
}
```

### Exemple d'utilisation

```scss
.section {
	// Utilise les valeurs de configuration centralisées
	padding: get-padding("desktop", "medium");
	transition: all transition("default");

	@media (max-width: breakpoint("tablet")) {
		padding: get-padding("tablet", "medium");
	}
}

.header {
	height: header-height("desktop");

	@media (max-width: breakpoint("mobile")) {
		height: header-height("mobile");
	}
}
```

## Mixins responsives

Ces mixins appliquent automatiquement des media queries pour adapter les valeurs aux différentes tailles d'écran :

```scss
// Appliquer une valeur rem qui se convertit en vw
@mixin responsive-rem-vw($property, $rem) {
	$px: $rem * $function-size-default;
	#{$property}: math.div($px, $design-width-stripped) * 100 + vw;

	@media all and (max-width: 1024px) {
		#{$property}: $px + px;
	}
}

// Appliquer une valeur px qui se convertit en vw
@mixin responsive-to-vw($property, $px, $stripped: false) {
	#{$property}: to-vw($px, $stripped);

	@media all and (max-width: 1024px) {
		#{$property}: $px + px;
	}
}
```

Ces mixins simplifient l'application de valeurs fluides avec fallback pour les petits écrans.

### Exemple d'utilisation

```scss
.element {
	// Taille de police fluide sur les grands écrans, fixe sur les petits
	@include responsive-to-vw(font-size, 20);

	// Marge proportionnelle sur les grands écrans, fixe sur les petits
	@include responsive-to-vw(margin-bottom, 40);
}

.title {
	// Utilisation avec des valeurs rem
	@include responsive-rem-vw(font-size, 2); // 2rem sur grands écrans, 32px sur petits
}
```

## Cas d'utilisation

### Typographie fluide

```scss
.title {
	// Taille fluide avec limites pour garantir la lisibilité
	font-size: to-vw(60, true, 32, 80); // clamp(32px, 3.125vw, 80px)
	line-height: 1.2;
	margin-bottom: to-vw(30, true, 20, 40);
}

.paragraph {
	font-size: to-vw(16, true, 14, 20); // clamp(14px, 0.833vw, 20px)
	line-height: 1.5;
	margin-bottom: to-vw(24, true, 16, 32);
}
```

### Grille responsive proportionnelle

```scss
.grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: to-vw(30, true, 15, 40);

	@media (max-width: breakpoint("tablet")) {
		grid-template-columns: repeat(2, 1fr);
		gap: 20px; // Valeur fixe pour tablette
	}

	@media (max-width: breakpoint("mobile")) {
		grid-template-columns: 1fr;
		gap: 15px; // Valeur fixe pour mobile
	}

	&__item {
		padding: to-vw(20, true, 10, 30);
		border-radius: 4px;
	}
}
```

### Interface proportionnelle

```scss
.card {
	padding: to-vw(30, true, 15, 40);
	border-radius: 8px;
	margin-bottom: to-vw(40, true, 20, 60);

	&__title {
		font-size: to-vw(24, true, 18, 30);
		margin-bottom: to-vw(15, true, 10, 20);
	}

	&__image {
		aspect-ratio: 16/9;
		height: to-vw(200, true, 150, 250);
		object-fit: cover;
	}

	&__content {
		margin-top: to-vw(20, true, 15, 30);
	}
}
```

### Section avec hauteur proportionnelle

```scss
.hero {
	height: to-vh(600, true, 400, 800);
	display: flex;
	align-items: center;
	justify-content: center;
	background-size: cover;

	&__content {
		padding: to-vw(40) to-vw(60);
		max-width: to-vw(800, true, 300, 800);
		text-align: center;
	}
}
```

## Tableau de référence

### Convertisseurs d'unités de base

| Fonction             | Description                 | Paramètres                  | Exemple d'utilisation | Résultat |
| -------------------- | --------------------------- | --------------------------- | --------------------- | -------- |
| `strip-unit($value)` | Retire l'unité d'une valeur | `$value`: Valeur avec unité | `strip-unit(16px)`    | `16`     |
| `em($px)`            | Convertit px en em          | `$px`: Valeur en px         | `em(16)`              | `1em`    |
| `rem($px)`           | Convertit px en rem         | `$px`: Valeur en px         | `rem(16)`             | `1rem`   |

### Fonctions de dimensions proportionnelles

| Fonction                         | Description         | Paramètres                                                                                           | Exemple d'utilisation | Résultat sur design-width=1920px  |
| -------------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------- | --------------------- | --------------------------------- |
| `to-vw($px, $clamp, $min, $max)` | Convertit px en vw  | `$px`: Valeur en px<br>`$clamp`: Activer clamp<br>`$min`: Valeur minimale<br>`$max`: Valeur maximale | `to-vw(100)`          | `5.21vw`                          |
| `to-vh($px, $clamp, $min, $max)` | Convertit px en vh  | Similaire à to-vw                                                                                    | `to-vh(100)`          | `9.26vh` sur design-height=1080px |
| `vw-to-px($vw)`                  | Convertit vw en px  | `$vw`: Valeur en vw                                                                                  | `vw-to-px(5)`         | `96px`                            |
| `rem-to-vw($rem)`                | Convertit rem en vw | `$rem`: Valeur en rem                                                                                | `rem-to-vw(1)`        | `0.83vw`                          |
| `em-to-vw($em, $context)`        | Convertit em en vw  | `$em`: Valeur en em<br>`$context`: Contexte en px                                                    | `em-to-vw(1)`         | `0.83vw`                          |

### Fonctions d'accès aux configurations

| Fonction                          | Description                    | Paramètres                                                    | Exemple d'utilisation              |
| --------------------------------- | ------------------------------ | ------------------------------------------------------------- | ---------------------------------- |
| `get-padding($breakpoint, $size)` | Récupère une valeur de padding | `$breakpoint`: Point de rupture<br>`$size`: Taille du padding | `get-padding("desktop", "medium")` |
| `breakpoint($device, $type)`      | Récupère un point de rupture   | `$device`: Appareil<br>`$type`: Type de valeur                | `breakpoint("tablet")`             |
| `transition($type)`               | Récupère une transition        | `$type`: Type de transition                                   | `transition("default")`            |
| `header-height($device, $type)`   | Récupère une hauteur d'en-tête | `$device`: Appareil<br>`$type`: Type de valeur                | `header-height("desktop")`         |

### Mixins responsives

| Mixin                                         | Description                                    | Paramètres                                                                            | Exemple d'utilisation                        |
| --------------------------------------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------- |
| `responsive-to-vw($property, $px, $stripped)` | Applique une propriété en vw avec fallback     | `$property`: Propriété CSS<br>`$px`: Valeur en px<br>`$stripped`: Option de formatage | `@include responsive-to-vw(font-size, 20)`   |
| `responsive-rem-vw($property, $rem)`          | Applique une propriété rem en vw avec fallback | `$property`: Propriété CSS<br>`$rem`: Valeur en rem                                   | `@include responsive-rem-vw(font-size, 1.5)` |
| `responsive-to-vh($property, $px, $stripped)` | Applique une propriété en vh avec fallback     | `$property`: Propriété CSS<br>`$px`: Valeur en px<br>`$stripped`: Option de formatage | `@include responsive-to-vh(height, 200)`     |

---

Ce système de fonctions et mixins offre une base solide pour créer des designs fluides et proportionnels qui s'adaptent élégamment à toutes les tailles d'écran. Grâce à l'utilisation des variables `$design-width` et `$design-height` comme références pour les calculs, vous pouvez facilement adapter l'ensemble du système à différentes bases de design tout en maintenant une cohérence parfaite.
