---
title: "Typographie"
description: "Le système typographique du framework SCSS"
order: 5
section: "styles"
---

# Wiki du Système Typographique SCSS

Ce guide détaille le système typographique disponible dans notre framework SCSS (`_typography.scss`), son fonctionnement et comment l'utiliser efficacement pour créer une typographie cohérente et responsive.

## Sommaire

1. [Principe fondamental](#principe-fondamental)
2. [Composants du système](#composants-du-système)
3. [Variables et configuration](#variables-et-configuration)
4. [Mixins typographiques](#mixins-typographiques)
5. [Utilisation des titres](#utilisation-des-titres)
6. [Utilisation du texte courant](#utilisation-du-texte-courant)
7. [Listes et styles spécifiques](#listes-et-styles-spécifiques)
8. [Cas d'utilisation réels](#cas-dutilisation-réels)

## Principe fondamental

Le système typographique est conçu pour offrir une expérience de lecture optimale et cohérente sur tous les appareils, avec des principes clés:

- **Responsive par défaut**: Taille de texte adaptative pour tous les écrans
- **Configuration centralisée**: Variables et maps pour des ajustements rapides et cohérents
- **Modularité**: Mixins réutilisables pour créer différents styles textuels
- **Accessibilité**: Hiérarchie visuelle claire et lisibilité optimisée

> **Mise à jour importante** : Le système utilise désormais les variables `$design-width` et `$design-height` pour les calculs de dimensions proportionnelles, au lieu des valeurs codées en dur. Cela permet une cohérence dans tout le système et facilite l'adaptation à différentes bases de design.

Notre système permet une gestion fine de la typographie, avec:

- Gestion automatique des tailles de texte responsives
- Contrôle précis des hauteurs de ligne et espacements
- Adaptation automatique aux points de rupture (breakpoints)
- Intégration fluide avec le système de design proportionnel

## Composants du système

Le fichier `_typography.scss` comprend:

1. **Variables de base**: Familles de polices, tailles par défaut, couleurs
2. **Configuration des titres**: Map détaillant les styles pour chaque niveau de titre (H1-H6)
3. **Mixins principaux**:
   - `font-face`: Pour déclarer de nouvelles polices
   - `title`: Pour styliser les titres
   - `text`: Pour styliser le texte courant
4. **Placeholders**: Styles de base réutilisables
5. **Styles de base des éléments**: Styles par défaut pour les balises HTML
6. **Classes utilitaires**: Classes prêtes à l'emploi pour les styles texte courants

## Variables et configuration

### Variables de base

```scss
$font-family-default: "Inter", Helvetica, Arial, sans-serif;
$font-family-title: $font-family-default;
$function-size-default: 16; // Taille de base pour les calculs (sans unité)
$font-size-default: 16px; // Taille par défaut (avec unité)
$line-height-default: 1.8;
$text-color-default: $black;
```

### Configuration des titres

La map `$titles` centralise tous les styles pour chaque niveau de titre (1 à 6):

```scss
$titles: (
	1: (
		color: $black,
		size: 60,
		// Taille de base en px (sans unité)
		weight: 800,
		line-height: 1.33,
		fs_min: 40,
		// Taille minimale (responsive)
		fs_max: 60 * 2,
		// Taille maximale (responsive)
		scale:
			(
				// Facteurs de réduction par breakpoint
				map-get($breakpoints, tablet, stripped): 0.75,
				map-get($breakpoints, mobile, stripped): 0.5,
				map-get($breakpoints, tiny, stripped): 0.5,
			),
	),
	// ... autres niveaux de titres (2 à 6)
);
```

Chaque entrée contient:

- `color`: Couleur du texte
- `size`: Taille de base (en px, sans unité)
- `weight`: Graisse de la police
- `line-height`: Hauteur de ligne
- `fs_min`: Taille minimale pour le responsive (clamp)
- `fs_max`: Taille maximale pour le responsive (clamp)
- `scale`: Facteurs d'échelle pour différents breakpoints

## Mixins typographiques

### Mixin `font-face`

Pour déclarer de nouvelles polices:

```scss
@include font-face("NomDeLaPolice", "../fonts/nom-fichier", 400, normal);
```

| Paramètre | Description                                         | Valeur par défaut |
| --------- | --------------------------------------------------- | ----------------- |
| `$family` | Nom de la famille de police                         | -                 |
| `$path`   | Chemin vers les fichiers de police (sans extension) | -                 |
| `$weight` | Graisse de la police                                | `normal`          |
| `$style`  | Style de la police (normal, italic)                 | `normal`          |

### Mixin `title`

Le cœur du système pour les titres:

```scss
@include title(
	1,
	// Niveau du titre (1 à 6)
	$color: $primary,
	// Couleur personnalisée (optionnel)
	$mb: 1em // Marge inférieure (optionnel)
);
```

#### Paramètres principaux

| Paramètre | Description                                       | Valeur par défaut          |
| --------- | ------------------------------------------------- | -------------------------- |
| `$level`  | Niveau du titre (1-6)                             | -                          |
| `$color`  | Couleur du texte                                  | Valeur de la map `$titles` |
| `$fs_min` | Taille minimale en px                             | Valeur de la map `$titles` |
| `$fs_max` | Taille maximale en px                             | Valeur de la map `$titles` |
| `$fs`     | Taille spécifique (remplace la valeur par défaut) | `null`                     |
| `$fw`     | Graisse de la police                              | Valeur de la map `$titles` |

#### Paramètres secondaires

| Paramètre      | Description                        | Valeur par défaut          |
| -------------- | ---------------------------------- | -------------------------- |
| `$lh`          | Hauteur de ligne                   | Valeur de la map `$titles` |
| `$ls`          | Espacement des lettres             | `0em`                      |
| `$mt`          | Marge supérieure                   | `0`                        |
| `$mb`          | Marge inférieure                   | `0`                        |
| `$ta`          | Alignement du texte                | `null`                     |
| `$mw`          | Largeur maximale                   | `null`                     |
| `$relative_fs` | Utiliser des unités relatives (vw) | `true`                     |
| `$style`       | Style de la police                 | `normal`                   |
| `$variant`     | Variante de la police              | `normal`                   |

> **Mise à jour importante** : Le mixin `title` utilise maintenant la fonction `to-vw()` qui se base sur la variable `$design-width` pour les conversions en unités viewport, assurant ainsi une cohérence avec le reste du système.

### Mixin `text`

Pour le texte courant et les paragraphes:

```scss
@include text(
	$fs: 16,
	// Taille en px (sans unité)
	$fw: 400,
	// Graisse
	$color: $black,
	// Couleur
	$mb: 1em // Marge inférieure
);
```

#### Paramètres principaux

| Paramètre | Description                            | Valeur par défaut        |
| --------- | -------------------------------------- | ------------------------ |
| `$fs`     | Taille de la police en px (sans unité) | `$function-size-default` |
| `$fw`     | Graisse de la police                   | `400`                    |
| `$color`  | Couleur du texte                       | `$text-color-default`    |
| `$lh`     | Hauteur de ligne                       | `$line-height-default`   |

#### Paramètres secondaires

| Paramètre      | Description                        | Valeur par défaut |
| -------------- | ---------------------------------- | ----------------- |
| `$ls`          | Espacement des lettres             | `0em`             |
| `$ta`          | Alignement du texte                | `null`            |
| `$mb`          | Marge inférieure                   | `0`               |
| `$mw`          | Largeur maximale                   | `null`            |
| `$relative_fs` | Utiliser des unités relatives (vw) | `true`            |
| `$fs_min`      | Taille minimale en px              | `14`              |
| `$fs_max`      | Taille maximale en px              | `16 * 2`          |

> **Note** : Tout comme le mixin `title`, le mixin `text` utilise également la fonction `to-vw()` basée sur `$design-width` lorsque `$relative_fs` est à `true`.

## Utilisation des titres

### Utilisation basique

```scss
// Dans un élément spécifique
.section-heading {
	@include title(2);
}

// Avec des options personnalisées
.custom-title {
	@include title(
		1,
		$color: $primary,
		$fs: 70,
		// Taille personnalisée
		$mb: 1.5em,
		// Marge inférieure
		$fw: 700 // Graisse personnalisée
	);
}
```

### Variantes responsive

```scss
.adaptive-title {
	@include title(
		1,
		$fs_min: 28,
		// Taille minimale pour petits écrans
		$fs_max: 80 // Taille maximale pour grands écrans
	);
}
```

### Avec contrôle de largeur

```scss
.contained-title {
	@include title(
		2,
		$mw: 800,
		// Largeur maximale en px
		$ta: center // Alignement centré
	);
}
```

## Utilisation du texte courant

### Paragraphes basiques

```scss
.paragraph {
	@include text(); // Style de texte par défaut
}

.large-text {
	@include text($fs: 20, $fw: 500, $lh: 1.6, $mb: 1.5em);
}
```

### Texte avec style spécifique

```scss
.intro-text {
	@include text(
		$fs: 18,
		$fw: 500,
		$color: $gray-600,
		$ls: 0.01em,
		// Léger espacement des lettres
		$mb: 2em
	);
}

.footnote {
	@include text(
		$fs: 14,
		$relative_fs: false,
		// Taille fixe (non responsive)
		$fw: 400,
		$color: $gray-500,
		$lh: 1.4
	);
}
```

## Listes et styles spécifiques

### Mixin pour les listes

```scss
@mixin list-styles($margin-bottom: 0.5em, $content: "— ", $margin-right: 0.5em, $fs: 16, $fs_min: 14, $fs_max: 16);
```

### Utilisation pour les listes personnalisées

```scss
.custom-list {
	@include list-styles($margin-bottom: 0.8em, $content: "→ ", $fs: 16);
}

.feature-list {
	@include list-styles($content: "✓ ", $fs: 18, $fs_min: 16, $fs_max: 20);
}
```

## Cas d'utilisation réels

### Contenu d'un article de blog

```scss
.blog-post {
	.post-title {
		@include title(1, $mb: 0.5em);
	}

	.post-subtitle {
		@include title(3, $mb: 1.5em, $fw: 600, $color: $gray-700);
	}

	.post-meta {
		@include text($fs: 14, $color: $gray-500, $mb: 2em);
	}

	.post-content {
		h2 {
			@include title(2, $mt: 1.5em, $mb: 0.8em);
		}

		h3 {
			@include title(3, $mt: 1.2em, $mb: 0.6em);
		}

		p {
			@include text($mb: 1em);
		}

		ul {
			@include list-styles();
			margin-bottom: 1.5em;
		}
	}
}
```

### Interface utilisateur proportionnelle

```scss
.card {
	padding: to-vw(30);

	&__title {
		@include title(4, $mb: 0.5em);
	}

	&__subtitle {
		@include text($fs: 18, $fw: 500, $color: $gray-600, $mb: 1em);
	}

	&__content {
		@include text($mb: 1.5em);
	}

	&__footnote {
		@include text($fs: 14, $color: $gray-500, $lh: 1.4);
	}
}
```

### Page d'atterrissage responsive

```scss
.hero {
	text-align: center;
	padding: to-vw(80) to-vw(40);

	&__title {
		@include title(1, $fs: 80, $color: $primary, $ls: -0.02em, $mb: 0.5em);
	}

	&__subtitle {
		@include text($fs: 24, $fw: 400, $color: $gray-700, $mb: 2em, $mw: 800);
	}
}

.features {
	&__title {
		@include title(2, $ta: center, $mb: 2em);
	}

	&__item-title {
		@include title(4, $mb: 0.5em);
	}

	&__item-text {
		@include text($mb: 1.5em);
	}
}
```

### Intégration avec le système proportionnel

```scss
.responsive-section {
	padding: to-vw(60);

	&__headline {
		@include title(1, $fs_min: 32, $fs_max: 80);
		margin-bottom: to-vw(40, true, 20, 60);
	}

	&__description {
		@include text($fs: 18, $fs_min: 16, $fs_max: 24);
		margin-bottom: to-vw(30);
		max-width: to-vw(800, true, 300, 900);
	}
}
```

---

Ce système typographique offre un contrôle précis et cohérent sur tous les éléments textuels de votre projet, tout en garantissant une adaptation responsive fluide sur tous les appareils. Grâce à l'intégration avec les variables `$design-width` et `$design-height`, vous bénéficiez d'une cohérence parfaite entre la typographie et les autres aspects de votre design. En suivant cette documentation, vous pourrez exploiter pleinement les capacités du fichier `_typography.scss` pour créer une expérience typographique professionnelle.
