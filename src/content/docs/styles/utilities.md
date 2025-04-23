---
title: "Utilities"
description: "Classes utilitaires pour appliquer rapidement des styles courants"
order: 13
section: "styles"
---

# Documentation Utilities

## Introduction

Le fichier `_utilities.scss` fournit un ensemble complet de classes utilitaires qui permettent d'appliquer rapidement des styles courants sans écrire de CSS personnalisé. Ces classes suivent une approche "atomic CSS" et permettent de construire des interfaces rapidement tout en maintenant la cohérence visuelle.

### Combinaison rapide

```html
<!-- Carte/Card avec flex -->
<div class="d-flex flex-column p-3 mb-4 border">
	<h3 class="mb-2">Titre</h3>
	<p class="mb-3">Description</p>
	<button class="mt-auto">Action</button>
</div>

<!-- Layout deux colonnes responsive -->
<div class="d-flex flex-wrap">
	<div class="w-100 w-tablet-50 p-2">Colonne 1</div>
	<div class="w-100 w-tablet-50 p-2">Colonne 2</div>
</div>
```

## Contenu principal

- Utilitaires d'espacement (margin, padding)
- Utilitaires d'affichage (display)
- Utilitaires flexbox
- Utilitaires de texte
- Utilitaires de dimensions (width/height)
- Utilitaires de position
- Utilitaires de bordure
- Utilitaires responsives

## Fonctionnalités

### Système d'Espacement

```scss
$spacer: 1rem;
$spacers: (
	0: 0,
	1: $spacer * 0.25,
	// 0.25rem
	2: $spacer * 0.5,
	// 0.5rem
	3: $spacer,
	// 1rem
	4: $spacer * 1.5,
	// 1.5rem
	5: $spacer * 3,
	// 3rem
);
```

Le système d'espacement est basé sur une variable `$spacer` (1rem) et génère des classes pour les marges et paddings avec différentes tailles.

### Utilitaires de Marge

```scss
@each $key, $value in $spacers {
	.m-#{$key} {
		margin: $value;
	}
	.mt-#{$key} {
		margin-top: $value;
	}
	.mr-#{$key} {
		margin-right: $value;
	}
	.mb-#{$key} {
		margin-bottom: $value;
	}
	.ml-#{$key} {
		margin-left: $value;
	}
	.mx-#{$key} {
		margin-left: $value;
		margin-right: $value;
	}
	.my-#{$key} {
		margin-top: $value;
		margin-bottom: $value;
	}
}
```

Génère des classes comme `.m-3`, `.mt-2`, `.mx-4`, etc. pour appliquer des marges de différentes tailles.

### Utilitaires de Padding

```scss
@each $key, $value in $spacers {
	.p-#{$key} {
		padding: $value;
	}
	.pt-#{$key} {
		padding-top: $value;
	}
	.pr-#{$key} {
		padding-right: $value;
	}
	.pb-#{$key} {
		padding-bottom: $value;
	}
	.pl-#{$key} {
		padding-left: $value;
	}
	.px-#{$key} {
		padding-left: $value;
		padding-right: $value;
	}
	.py-#{$key} {
		padding-top: $value;
		padding-bottom: $value;
	}
}
```

Génère des classes comme `.p-3`, `.pt-2`, `.px-4`, etc. pour appliquer des paddings de différentes tailles.

### Utilitaires d'Affichage

```scss
.d-none {
	display: none;
}
.d-inline {
	display: inline;
}
.d-inline-block {
	display: inline-block;
}
.d-block {
	display: block;
}
.d-flex {
	display: flex;
}
.d-grid {
	display: grid;
}
```

Classes pour contrôler la propriété `display` des éléments.

### Utilitaires Flexbox

```scss
.flex-row {
	flex-direction: row;
}
.flex-column {
	flex-direction: column;
}
.flex-wrap {
	flex-wrap: wrap;
}
.flex-nowrap {
	flex-wrap: nowrap;
}
.justify-content-start {
	justify-content: flex-start;
}
.justify-content-end {
	justify-content: flex-end;
}
.justify-content-center {
	justify-content: center;
}
.justify-content-between {
	justify-content: space-between;
}
.justify-content-around {
	justify-content: space-around;
}
.align-items-start {
	align-items: flex-start;
}
.align-items-end {
	align-items: flex-end;
}
.align-items-center {
	align-items: center;
}
.align-items-baseline {
	align-items: baseline;
}
.align-items-stretch {
	align-items: stretch;
}
```

Classes pour configurer facilement les conteneurs flexbox.

### Utilitaires de Texte

```scss
.text-left {
	text-align: left;
}
.text-center {
	text-align: center;
}
.text-right {
	text-align: right;
}
.text-uppercase {
	text-transform: uppercase;
}
.text-lowercase {
	text-transform: lowercase;
}
.text-capitalize {
	text-transform: capitalize;
}
.text-nowrap {
	white-space: nowrap;
}
.text-truncate {
	@include text-truncate;
}
```

Classes pour modifier l'apparence et l'alignement du texte.

### Utilitaires de Dimensions

```scss
.w-100 {
	width: 100%;
}
.w-75 {
	width: 75%;
}
.w-50 {
	width: 50%;
}
.w-25 {
	width: 25%;
}
.h-100 {
	height: 100%;
}
.h-75 {
	height: 75%;
}
.h-50 {
	height: 50%;
}
.h-25 {
	height: 25%;
}
```

Classes pour définir rapidement la largeur et la hauteur des éléments.

### Utilitaires de Position

```scss
.position-relative {
	position: relative;
}
.position-absolute {
	position: absolute;
}
.position-fixed {
	position: fixed;
}
.position-sticky {
	position: sticky;
}
```

Classes pour contrôler le positionnement des éléments.

### Utilitaires de Bordure

```scss
.border {
	border: 1px solid #ddd;
}
.border-top {
	border-top: 1px solid #ddd;
}
.border-right {
	border-right: 1px solid #ddd;
}
.border-bottom {
	border-bottom: 1px solid #ddd;
}
.border-left {
	border-left: 1px solid #ddd;
}
.border-0 {
	border: 0;
}
```

Classes pour ajouter ou supprimer des bordures.

### Utilitaires Responsives

```scss
@include mobile-only {
	.d-mobile-none {
		display: none;
	}
	.d-mobile-block {
		display: block;
	}
	.d-mobile-flex {
		display: flex;
	}
}

@include tablet-only {
	.d-tablet-none {
		display: none;
	}
	.d-tablet-block {
		display: block;
	}
	.d-tablet-flex {
		display: flex;
	}
}

@include desktop-only {
	.d-desktop-none {
		display: none;
	}
	.d-desktop-block {
		display: block;
	}
	.d-desktop-flex {
		display: flex;
	}
}
```

Classes spécifiques aux breakpoints pour un contrôle responsive de l'affichage.

## Utilisation type

### Espacement

```html
<div class="mt-3 mb-4">
	<!-- Élément avec marge supérieure de 1rem et marge inférieure de 1.5rem -->
</div>

<div class="p-3">
	<!-- Élément avec padding de 1rem sur tous les côtés -->
</div>

<div class="py-2 px-3">
	<!-- Élément avec padding vertical de 0.5rem et horizontal de 1rem -->
</div>
```

### Mise en page Flexbox

```html
<div class="d-flex justify-content-between align-items-center">
	<!-- Conteneur flex avec éléments espacés et centrés verticalement -->
	<div>Élément 1</div>
	<div>Élément 2</div>
</div>
```

### Formatage de Texte

```html
<p class="text-center text-uppercase">
	<!-- Texte centré et en majuscules -->
	Information importante
</p>
```

### Responsive

```html
<div class="d-mobile-none d-tablet-block">
	<!-- Élément caché sur mobile, visible à partir de la tablette -->
</div>
```

### Combinaison d'Utilitaires

```html
<div class="d-flex flex-column p-3 border mb-4">
	<!-- Card avec flex column, padding, bordure et marge inférieure -->
	<h3 class="mb-2">Titre</h3>
	<p class="mb-3">Description</p>
	<button class="mt-auto">Action</button>
</div>
```

## Bonnes pratiques

- Privilégiez l'utilisation des classes utilitaires pour les ajustements mineurs et spécifiques
- Combinez les utilitaires pour créer des mises en page complexes sans écrire de CSS personnalisé
- Utilisez les utilitaires responsives pour adapter l'interface à différentes tailles d'écran
- Évitez de surcharger les éléments avec trop de classes utilitaires; créez plutôt un composant lorsque les motifs se répètent
- Maintenez la cohérence en utilisant le même ensemble d'utilitaires à travers le projet

## Extension

Si vous avez besoin d'utilitaires supplémentaires, vous pouvez étendre le fichier `_utilities.scss` en suivant le même modèle:

```scss
// Exemple d'ajout d'utilitaires de couleur de texte
.text-primary {
	color: $primary;
}
.text-secondary {
	color: $secondary;
}
.text-success {
	color: $success;
}
.text-danger {
	color: $danger;
}

// Exemple d'ajout d'utilitaires de couleur de fond
.bg-primary {
	background-color: $primary;
}
.bg-secondary {
	background-color: $secondary;
}
.bg-light {
	background-color: $light;
}
.bg-dark {
	background-color: $dark;
}
```

## Tableau de références

### Espacement

| Préfixe | Description    | Valeur d'espacement                                            |
| ------- | -------------- | -------------------------------------------------------------- |
| `m-`    | Margin         | 0 (0), 1 (0.25rem), 2 (0.5rem), 3 (1rem), 4 (1.5rem), 5 (3rem) |
| `mt-`   | Margin top     | 0 → 5                                                          |
| `mr-`   | Margin right   | 0 → 5                                                          |
| `mb-`   | Margin bottom  | 0 → 5                                                          |
| `ml-`   | Margin left    | 0 → 5                                                          |
| `mx-`   | Margin x-axis  | 0 → 5                                                          |
| `my-`   | Margin y-axis  | 0 → 5                                                          |
| `p-`    | Padding        | 0 → 5                                                          |
| `pt-`   | Padding top    | 0 → 5                                                          |
| `pr-`   | Padding right  | 0 → 5                                                          |
| `pb-`   | Padding bottom | 0 → 5                                                          |
| `pl-`   | Padding left   | 0 → 5                                                          |
| `px-`   | Padding x-axis | 0 → 5                                                          |
| `py-`   | Padding y-axis | 0 → 5                                                          |

### Display & Layout

| Classe                    | Effet                       |
| ------------------------- | --------------------------- |
| `d-none`                  | `display: none`             |
| `d-block`                 | `display: block`            |
| `d-inline`                | `display: inline`           |
| `d-inline-block`          | `display: inline-block`     |
| `d-flex`                  | `display: flex`             |
| `d-grid`                  | `display: grid`             |
| `flex-row`                | Direction horizontale       |
| `flex-column`             | Direction verticale         |
| `flex-wrap`               | Permet le retour à la ligne |
| `justify-content-start`   | Aligne au début             |
| `justify-content-center`  | Centre horizontalement      |
| `justify-content-between` | Espace entre les éléments   |
| `align-items-center`      | Centre verticalement        |

### Dimensions & Positions

| Classe              | Effet             |
| ------------------- | ----------------- |
| `w-100`             | Largeur 100%      |
| `w-75`              | Largeur 75%       |
| `w-50`              | Largeur 50%       |
| `w-25`              | Largeur 25%       |
| `h-100`             | Hauteur 100%      |
| `position-relative` | Position relative |
| `position-absolute` | Position absolue  |
| `position-fixed`    | Position fixe     |
| `position-sticky`   | Position collante |

### Responsive

| Classe           | Effet                        |
| ---------------- | ---------------------------- |
| `d-mobile-none`  | Caché sur mobile             |
| `d-tablet-block` | Visible en bloc sur tablette |
| `d-desktop-flex` | Affichage flex sur desktop   |

## Références

- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire populaire
- [Bootstrap Utilities](https://getbootstrap.com/docs/5.0/utilities/api/) - Documentation des utilitaires Bootstrap
- [Atomic CSS](https://acss.io/) - Approche de CSS atomique
