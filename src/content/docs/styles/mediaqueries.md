---
title: "Media Queries"
description: "Les media queries pour le responsive design"
order: 4
section: "styles"
---

# Wiki des Media Queries SCSS

Ce guide détaille les mixins de Media Queries disponibles dans notre framework SCSS (`_mediaqueries.scss`), comment ils fonctionnent et comment les utiliser efficacement pour créer un design responsive cohérent.

## Sommaire

1. [Principe fondamental](#principe-fondamental)
2. [Mixins génériques](#mixins-génériques)
3. [Mixins par appareil](#mixins-par-appareil)
4. [Mixins spécifiques](#mixins-spécifiques)
5. [Combinaison avec le système fluid](#combinaison-avec-le-système-fluid)
6. [Cas d'utilisation réels](#cas-dutilisation-réels)
7. [Référence complète des mixins](#référence-complète-des-mixins)

## Principe fondamental

Les media queries sont essentielles au design responsive moderne. Notre système de media queries est conçu pour:

- Simplifier l'écriture des media queries avec une syntaxe cohérente
- Centraliser les points de rupture (breakpoints) pour garantir la cohérence
- Faciliter la maintenance en évitant de répéter les mêmes valeurs de breakpoints
- Offrir une sémantique claire avec des noms descriptifs pour les appareils

Le fichier `_mediaqueries.scss` fournit une collection de mixins qui encapsulent les media queries CSS les plus courantes, rendant votre code plus lisible et plus facile à maintenir.

## Mixins génériques

Ces mixins offrent un contrôle flexible sur les media queries en permettant de spécifier des valeurs personnalisées.

### Mixin `screen`

Le mixin le plus générique, permettant de définir `min-width` ou `max-width`:

```scss
// Utilisation avec max-width (par défaut)
.element {
	@include screen(max, 1024px) {
		font-size: 18px;
	}
}

// Utilisation avec min-width
.element {
	@include screen(min, 768px) {
		display: flex;
	}
}
```

### Mixins pour la largeur

Mixins dédiés aux media queries basées sur la largeur:

```scss
// Pour les écrans plus larges qu'une valeur spécifique
.element {
	@include min-width(768px) {
		margin: 2rem;
	}
}

// Pour les écrans plus étroits qu'une valeur spécifique
.element {
	@include max-width(480px) {
		padding: 1rem;
	}
}

// Pour les écrans compris entre deux valeurs
.element {
	@include between-width(480px, 768px) {
		font-size: 16px;
	}
}
```

### Mixins pour la hauteur

Similaires aux mixins de largeur, mais pour la hauteur de l'écran:

```scss
// Pour les écrans plus hauts qu'une valeur spécifique
.element {
	@include min-height(800px) {
		margin-bottom: 3rem;
	}
}

// Pour les écrans moins hauts qu'une valeur spécifique
.element {
	@include max-height(600px) {
		margin-bottom: 1rem;
	}
}
```

## Mixins par appareil

Ces mixins utilisent des breakpoints prédéfinis pour cibler des catégories d'appareils, ce qui simplifie grandement votre code.

```scss
// Styles uniquement pour desktop
.element {
	@include desktop-only {
		display: flex;
		gap: 30px;
	}
}

// Styles uniquement pour tablettes et mobiles
.element {
	@include tablet-only {
		flex-direction: column;
		gap: 20px;
	}
}

// Styles uniquement pour mobiles
.element {
	@include mobile-only {
		gap: 10px;
	}
}

// Styles pour très petits écrans
.element {
	@include tiny-only {
		font-size: 14px;
	}
}
```

Ces mixins utilisent la fonction `breakpoint()` pour récupérer les valeurs des breakpoints depuis la configuration globale, garantissant ainsi la cohérence à travers votre site.

## Mixins spécifiques

### Print

Pour définir des styles spécifiques à l'impression:

```scss
.element {
	@include print {
		background: none;
		color: black;
		margin: 0;
	}
}
```

### Retina

Pour cibler les écrans haute densité (retina):

```scss
.element {
	@include retina {
		background-image: url("image@2x.png");
	}
}

// Avec un ratio spécifique
.element {
	@include retina(3) {
		background-image: url("image@3x.png");
	}
}
```

## Combinaison avec le système fluid

Les media queries peuvent être combinées efficacement avec notre système de design proportionnel pour créer des interfaces parfaitement adaptatives:

```scss
.hero {
	padding: to-vw(80);
	font-size: to-vw(20, true, 16, 24);

	@include tablet-only {
		padding: 40px;
	}

	@include mobile-only {
		padding: 20px;
		font-size: 16px;
	}
}
```

Cette approche utilise:

- Des valeurs proportionnelles (vw) pour les grands écrans
- Des valeurs fixes (px) pour les appareils plus petits

## Cas d'utilisation réels

### Navigation responsive

```scss
.main-nav {
	display: flex;

	@include mobile-only {
		display: none; // Caché sur mobile

		&.is-open {
			display: flex;
			flex-direction: column;
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0, 0, 0, 0.9);
		}
	}

	// Version desktop
	&__item {
		margin: 0 1rem;

		@include tablet-only {
			margin: 0 0.5rem;
		}

		@include mobile-only {
			margin: 1rem 0;
			font-size: 1.5rem;
		}
	}
}
```

### Grille adaptative

```scss
.grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: to-vw(30, true, 20, 40);

	@include tablet-only {
		grid-template-columns: repeat(2, 1fr);
	}

	@include mobile-only {
		grid-template-columns: 1fr;
	}
}
```

### Typographie responsive

```scss
.heading {
	font-size: to-vw(60, true, 40, 80);

	@include tablet-only {
		font-size: 36px;
		margin-bottom: 1.5rem;
	}

	@include mobile-only {
		font-size: 28px;
		margin-bottom: 1rem;
	}

	// Version imprimable
	@include print {
		font-size: 24pt;
		color: black;
	}
}
```

### Images haute résolution

```scss
.logo {
	background: url("../images/logo.png");
	width: 200px;
	height: 60px;

	@include retina {
		background: url("../images/logo@2x.png");
		background-size: 200px 60px; // Garder la même taille visuelle
	}
}
```

## Référence complète des mixins

### Mixins de taille générique

| Mixin                       | Description                                | Paramètres                                                   | Exemple                                        |
| --------------------------- | ------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------- |
| `screen($minmax, $width)`   | Media query générique pour la largeur      | `$minmax`: 'min' ou 'max'<br>`$width`: Largeur de breakpoint | `@include screen(max, 1024px) { ... }`         |
| `min-width($width)`         | Pour les écrans plus larges qu'une valeur  | `$width`: Largeur minimum                                    | `@include min-width(768px) { ... }`            |
| `max-width($width)`         | Pour les écrans plus étroits qu'une valeur | `$width`: Largeur maximum                                    | `@include max-width(480px) { ... }`            |
| `between-width($min, $max)` | Pour les écrans entre deux largeurs        | `$min`: Largeur minimum<br>`$max`: Largeur maximum           | `@include between-width(480px, 768px) { ... }` |
| `min-height($height)`       | Pour les écrans plus hauts qu'une valeur   | `$height`: Hauteur minimum                                   | `@include min-height(800px) { ... }`           |
| `max-height($height)`       | Pour les écrans moins hauts qu'une valeur  | `$height`: Hauteur maximum                                   | `@include max-height(600px) { ... }`           |

### Mixins sémantiques

| Mixin          | Description                                    | Utilisation                     | Equivalent approximatif                          |
| -------------- | ---------------------------------------------- | ------------------------------- | ------------------------------------------------ |
| `desktop-only` | Pour les écrans de type desktop et plus larges | `@include desktop-only { ... }` | `@media (min-width: breakpoint(tablet)) { ... }` |
| `tablet-only`  | Pour les tablettes et plus petits              | `@include tablet-only { ... }`  | `@media (max-width: breakpoint(tablet)) { ... }` |
| `mobile-only`  | Pour les mobiles                               | `@include mobile-only { ... }`  | `@media (max-width: breakpoint(mobile)) { ... }` |
| `tiny-only`    | Pour les très petits écrans mobiles            | `@include tiny-only { ... }`    | `@media (max-width: breakpoint(tiny)) { ... }`   |

### Mixins spéciaux

| Mixin            | Description                   | Paramètres                           | Exemple                                                   |
| ---------------- | ----------------------------- | ------------------------------------ | --------------------------------------------------------- |
| `print`          | Pour les styles d'impression  | aucun                                | `@include print { ... }`                                  |
| `retina($ratio)` | Pour les écrans haute densité | `$ratio`: Ratio de pixel (défaut: 2) | `@include retina { ... }`<br>`@include retina(3) { ... }` |

### Valeurs de breakpoints courantes

Ces valeurs sont généralement définies dans votre fichier de configuration et accessibles via la fonction `breakpoint()`:

```scss
$breakpoints: (
	tiny: {full: 375px},
	mobile: {full: 576px},
	tablet: {full: 1024px},
);
```

---

En utilisant ces mixins de media queries de manière cohérente dans votre projet, vous pouvez créer des designs responsives élégants et maintenables, avec un code plus lisible et moins de répétition. La combinaison avec notre système fluid de valeurs proportionnelles crée une expérience utilisateur optimale sur tous les appareils.
