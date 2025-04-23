---
title: "Responsive Design"
description: "Les techniques de responsive design du framework SCSS"
order: 10
section: "styles"
---

# Wiki du développement responsive proportionnel

Ce guide explique en détail comment utiliser le système de développement responsive proportionnel basé sur les unités viewport (vw/vh) dans notre framework SCSS.

## Sommaire

1. [Principe fondamental](#principe-fondamental)
2. [Fonctions de conversion](#fonctions-de-conversion)
3. [Mixins responsives](#mixins-responsives)
4. [Application aux textes et titres](#application-aux-textes-et-titres)
5. [Application aux conteneurs et espacements](#application-aux-conteneurs-et-espacements)
6. [Techniques avancées](#techniques-avancées)
7. [Cas d'utilisation réels](#cas-dutilisation-réels)

## Principe fondamental

Le système responsive proportionnel repose sur une idée simple mais puissante : **les éléments doivent s'adapter proportionnellement à la taille de l'écran**. Plutôt que d'utiliser des tailles fixes avec des points de rupture arbitraires, nous utilisons des unités relatives à la taille de la fenêtre.

Notre système est basé sur une largeur de design de référence de `1920px` (définie dans `$max-width-stripped`). Toutes les conversions en unités vw/vh sont calculées par rapport à cette valeur, garantissant une mise à l'échelle cohérente sur tous les écrans.

```scss
// Base de référence pour les calculs
$design-width: 1920px;
$design-width-stripped: 1920;
$max-width: 1920px;
$max-width-stripped: 1920;

// Pour les hauteurs
$design-height: 1080px;
$design-height-stripped: 1080;
$max-height: 1080px;
$max-height-stripped: 1080;
```

## Fonctions de conversion

### to-vw()

La fonction `to-vw()` est la pierre angulaire du système. Elle convertit une valeur en pixels en unités vw (viewport width).

```scss
@function to-vw($px, $clamp: false, $clamp-min: null, $clamp-max: null) {
	// Implémentation...
}
```

#### Paramètres

- `$px` : La valeur en pixels à convertir (sans unité)
- `$clamp` : Activer/désactiver la fonction CSS `clamp()` (par défaut: false)
- `$clamp-min` : Valeur minimale en pixels (par défaut: la valeur $px)
- `$clamp-max` : Valeur maximale en pixels (par défaut: $px \* 2)

#### Mode simple

```scss
width: to-vw(300); // Résultat: 15.625vw (300/1920*100)
```

Cela crée une valeur qui s'adapte toujours proportionnellement à la largeur de l'écran.

#### Mode clamp

```scss
font-size: to-vw(18, true, 16, 24); // Résultat: clamp(16px, 0.9375vw, 24px)
```

Le mode clamp est essentiel pour éviter que les éléments ne deviennent trop petits sur mobile ou trop grands sur grands écrans. Il utilise la fonction CSS `clamp()` qui définit :

- Une valeur minimale (16px)
- Une valeur fluide (0.9375vw)
- Une valeur maximale (24px)

### to-vh()

Fonctionne comme `to-vw()` mais pour la hauteur de la fenêtre.

```scss
height: to-vh(400, true, 300, 500); // Résultat: clamp(300px, 37.037vh, 500px)
```

### Autres fonctions utiles

```scss
// Conversion de rem vers vw
margin-top: rem-to-vw(2); // Convertit 2rem en vw

// Conversion d'em vers vw
padding: em-to-vw(1.5); // Convertit 1.5em en vw
```

## Mixins responsives

Les fonctions ci-dessus sont efficaces, mais il manque une considération importante : sur des écrans petits (< 1024px), les valeurs en vw peuvent devenir trop petites.

Pour résoudre ce problème, nous utilisons des mixins qui appliquent des valeurs proportionnelles sur grands écrans et des valeurs fixes sur petits écrans.

### responsive-to-vw()

```scss
@mixin responsive-to-vw($property, $px, $stripped: false) {
	#{$property}: to-vw($px, $stripped);

	@media all and (max-width: 1024px) {
		#{$property}: $px + px;
	}
}
```

#### Exemple d'utilisation

```scss
.element {
	@include responsive-to-vw(margin-top, 30);
	// Résultat:
	// margin-top: 1.5625vw;
	// @media all and (max-width: 1024px) { margin-top: 30px; }
}
```

### responsive-to-vh()

Fonctionne comme `responsive-to-vw()` mais pour la hauteur.

```scss
.element {
	@include responsive-to-vh(height, 200);
	// Crée une hauteur en vh sur grands écrans, 200px sur petits écrans
}
```

### responsive-rem-vw()

Convertit des valeurs rem en vw avec fallback en pixels pour les petits écrans.

```scss
.element {
	@include responsive-rem-vw(padding, 2);
	// Convertit 2rem (32px) en vw, avec fallback en pixels
}
```

## Application aux textes et titres

Notre système typographique utilise les fonctions vw pour créer des tailles de texte fluides.

### Mixin title

```scss
@mixin title($level, $color: null, /* autres paramètres */, $relative_fs: true) {
	// ... autres propriétés ...

	// Si $relative_fs est true, on utilise to-vw pour les tailles
	@if $relative_fs {
		@if ($mw != null) {
			$mw: to-vw(strip-unit($mw));
		}
		$font-size: to-vw(strip-unit($font-size));
	} @else {
		$font-size: rem($font-size);
	}

	// Utilisation de clamp pour limiter les tailles
	$font-size: clamp(#{$fs_min}px, #{$font-size}, #{$fs_max}px);

	// ... autres propriétés ...
}
```

#### Configuration des titres

Les titres sont configurés avec des tailles de base, des valeurs minimales et maximales :

```scss
$titles: (
	1: (
		// ...
		size: 60,
		// Taille de référence en px
		fs_min: 40,
		// Taille minimale
		fs_max: 120,
		// Taille maximale
		// ...,,,,,,
	),
	// ... autres niveaux de titre
);
```

#### Exemple d'utilisation

```scss
h1,
.h1 {
	@include title(1);
	// Crée un titre fluide qui s'adapte proportionnellement
	// tout en restant entre 40px et 120px
}

.hero-title {
	@include title(1, $color: $white, $fs_max: 80);
	// Titre de héros avec couleur personnalisée et taille max de 80px
}
```

### Mixin text

Le même principe s'applique aux textes courants :

```scss
@mixin text($fs: 16, /* autres paramètres */, $relative_fs: true) {
	// Si $relative_fs est true, on utilise to-vw
	@if $relative_fs {
		$font-size: to-vw(strip-unit($font-size));
	} @else {
		$font-size: rem($font-size);
	}

	// ... autres propriétés ...
}
```

#### Exemple d'utilisation

```scss
p {
	@include text; // Texte par défaut fluide
}

.large-text {
	@include text($fs: 20, $fs_min: 18, $fs_max: 26);
	// Texte plus grand avec limites min/max
}
```

## Application aux conteneurs et espacements

### Conteneurs fluides

Le mixin `container` utilise notre système de padding responsive :

```scss
.container {
	@include container;
	// Applique des paddings latéraux qui s'adaptent aux breakpoints
}

.hero-section {
	padding-top: to-vw(80);
	padding-bottom: to-vw(80);

	@media (max-width: 1024px) {
		padding-top: 60px;
		padding-bottom: 60px;
	}
}
```

### Système de padding

Notre système de padding définit des valeurs par breakpoint :

```scss
$padding: (
	mobile: (
		small: 10px,
		base: 15px,
		// ...
	),
	// ... autres breakpoints
);
```

Vous pouvez obtenir ces valeurs via la fonction `get-padding()` :

```scss
.element {
	padding: get-padding(desktop, medium);
	// Récupère la valeur de padding 'medium' pour le breakpoint 'desktop'
}
```

### Paddings fluides personnalisés

Le mixin `container` peut recevoir des valeurs de padding hautement personnalisées par breakpoint, combinant des valeurs fluides (vw) et fixes (px).

```scss
.container {
	@include container(
		$padding: (
			desktop: to-vw(170) to-vw(strip-unit(map-get($padding, "desktop", "base"))),
			tablet: 60px map-get($padding, "tablet", "base"),
			mobile: 50px map-get($padding, "mobile", "base"),
		)
	);
}
```

#### Explication détaillée

Dans cet exemple, nous créons un container avec des paddings différents selon les breakpoints:

1. **Pour desktop (écrans > 1024px)**:

   - Padding vertical: `to-vw(170)` - convertit 170px en unités vw (8.85vw)
   - Padding horizontal: `to-vw(strip-unit(map-get($padding, "desktop", "base")))` - récupère la valeur "base" du padding desktop (généralement 90px), retire l'unité avec `strip-unit()`, puis convertit cette valeur en vw
   - Résultat: `8.85vw 4.69vw` (en supposant que le padding base est 90px)

2. **Pour tablet (écrans entre 700px et 1024px)**:

   - Padding vertical: `60px` - valeur fixe
   - Padding horizontal: `map-get($padding, "tablet", "base")` - récupère la valeur "base" du padding tablet (environ 30px)
   - Résultat: `60px 30px`

3. **Pour mobile (écrans < 700px)**:
   - Padding vertical: `50px` - valeur fixe
   - Padding horizontal: `map-get($padding, "mobile", "base")` - récupère la valeur "base" du padding mobile (environ 15px)
   - Résultat: `50px 15px`

Cette approche combine:

- Des valeurs fluides (vw) sur grands écrans pour un rendu proportionnel
- Des valeurs fixes (px) sur plus petits écrans pour éviter des paddings trop minuscules
- L'utilisation du système de padding global via `map-get()` pour maintenir la cohérence

#### Usage avancé

Vous pouvez créer des configurations de padding complexes et spécifiques:

```scss
.custom-section {
	@include container(
		$padding: (
			desktop: to-vw(120) to-vw(200),
			// Padding vertical/horizontal en vw pour desktop
			tablet: 80px 60px,
			// Valeurs fixes pour tablet
			mobile: 40px 20px,
			// Valeurs fixes pour mobile
		)
	);
}

.asymmetric-container {
	@include container(
		$padding: (
			// Format: top right bottom left
			desktop: to-vw(80) to-vw(120) to-vw(100) to-vw(120),
			tablet: 50px 50px 60px 50px,
			mobile: 30px 20px 40px 20px,
		)
	);
}
```

Vous pouvez également combiner cette approche avec la fonction `clamp()` pour des limites:

```scss
.bounded-container {
	@include container(
		$padding: (
			desktop: to-vw(100, true, 60, 120) to-vw(150, true, 80, 180),
			tablet: 50px 40px,
			mobile: 30px 20px,
		)
	);
}
```

## Techniques avancées

### Combinaison avec CSS Grid

```scss
.grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: to-vw(30, true, 15, 40);
	// Crée un espacement proportionnel mais limité entre 15px et 40px
}
```

### Gestion des images

```scss
.hero-image {
	height: to-vh(500, true, 300, 600);
	// Hauteur proportionnelle entre 300px et 600px

	@include responsive-to-vw(margin-bottom, 40);
	// Marge qui s'adapte proportionnellement sur grands écrans
}
```

### Composants complexes

```scss
.card {
	border-radius: to-vw(8, true, 4, 8);
	// Rayon de bordure proportionnel mais avec un minimum et maximum

	&__content {
		@include responsive-to-vw(padding, 20);
		// Padding intérieur qui s'adapte proportionnellement
	}
}
```

## Cas d'utilisation réels

### Header responsive

```scss
.site-header {
	height: to-vh(80, true, 60, 100);
	padding: 0 to-vw(30);

	&__logo {
		width: to-vw(150, true, 100, 180);
		// Logo qui s'adapte à la taille de l'écran
	}

	&__menu {
		@include responsive-to-vw(gap, 20);
		// Espacement entre les éléments du menu
	}
}
```

### Section hero

```scss
.hero {
	min-height: to-vh(600, true, 400, 800);
	padding: to-vw(80) 0;

	@media (max-width: 1024px) {
		padding: 60px 0;
	}

	&__title {
		@include title(1);
		// Titre fluide qui utilise la configuration des titres
	}

	&__subtitle {
		@include text($fs: 22, $fs_min: 18, $fs_max: 28);
		@include responsive-to-vw(margin-top, 20);
		// Sous-titre fluide avec marge proportionnelle
	}

	&__cta {
		@include responsive-to-vw(margin-top, 40);
		// Marge avant le bouton CTA
	}
}
```

### Grille de cartes

```scss
.card-grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(to-vw(350, true, 300, 400), 1fr));
	gap: to-vw(30, true, 20, 40);
	// Grille responsive avec largeur de carte et espacement proportionnels

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		// Passage à une colonne sur mobile
	}
}
```

### Formulaires

```scss
.form-field {
	@include responsive-to-vw(margin-bottom, 20);

	input,
	textarea {
		border-radius: to-vw(4, true, 4, 8);
		@include responsive-to-vw(padding, 15);
		// Champs de formulaire avec dimensions proportionnelles
	}
}
```

## Bonnes pratiques

1. **Utilisez `clamp()` pour les textes** : Toujours définir des limites min/max pour éviter des tailles illisibles.

2. **Méfiez-vous des très petites valeurs** : Une valeur comme `2px` convertie en vw sera pratiquement invisible sur mobile. Utilisez `clamp()` ou les mixins responsives.

3. **Combinez avec les média queries** : Le système proportionnel ne remplace pas les media queries pour les changements radicaux de mise en page.

4. **Préférez les mixins responsives** pour les éléments qui ne doivent pas devenir trop petits sur mobile.

5. **Soyez cohérent** : Utilisez le système proportionnel de manière cohérente sur tout le site pour une expérience fluide.

---

Ce système permet de créer des designs vraiment fluides et proportionnels qui s'adaptent élégamment à toutes les tailles d'écran, tout en évitant les pièges habituels des unités relatives.
