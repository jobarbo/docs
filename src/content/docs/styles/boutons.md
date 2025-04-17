---
title: "Boutons"
description: "Le système de boutons du framework SCSS"
order: 9
section: "styles"
---

# Wiki du système de boutons

Ce guide détaille le système de boutons dans notre framework SCSS, comment il fonctionne et comment l'utiliser pour créer différentes variantes de boutons cohérentes à travers votre site.

## Sommaire

1. [Architecture du système](#architecture-du-système)
2. [Configuration de base](#configuration-de-base)
3. [Le mixin `button`](#le-mixin-button)
4. [Liste des paramètres](#liste-des-paramètres)
5. [Boutons basiques](#boutons-basiques)
6. [Variantes de boutons](#variantes-de-boutons)
7. [Utiliser les fonctionnalités responsive](#utiliser-les-fonctionnalités-responsive)
8. [États des boutons](#états-des-boutons)
9. [Animations et transitions](#animations-et-transitions)
10. [Boutons avec icônes](#boutons-avec-icônes)
11. [Exemples concrets](#exemples-concrets)

## Architecture du système

Notre système de boutons est organisé en trois couches :

1. **Configuration** : Map SCSS qui définit les valeurs par défaut.
2. **Placeholders** : Styles de base partagés (`%button-base`, `%button-transitions`).
3. **Mixin `button`** : Point d'entrée principal pour créer des boutons avec des options personnalisées.

Ce système garantit une cohérence visuelle tout en offrant une grande flexibilité.

## Configuration de base

La carte de configuration `$button-config` définit toutes les propriétés par défaut des boutons :

```scss
$button-config: (
	base: (
		font-size: 15,
		font-weight: 700,
		font-size-desktop: 15,
		padding-vertical: 1em,
		padding-horizontal: 1.35em,
		border-radius: 50px,
		hover-radius: 50px,
		line-height: 1.5em,
		letter-spacing: -0.01em,
		gap: 1.5em,
		z-index: 1,
	),
	transitions: (
		default: 0.3s ease-in-out,
		delayed: 0.3s ease-in-out 0.15s,
		bg-delayed: 0.2s ease-in-out 0.4s,
	),
);
```

Cette configuration permet de :

- Ajuster globalement le style des boutons en modifiant un seul fichier
- Maintenir la cohérence à travers tout le site
- Éviter la répétition de code

### Comment accéder aux valeurs de configuration

Pour accéder à une valeur spécifique :

```scss
// Obtenir la taille de police de base
$font-size: map-get(map-get($button-config, base), font-size);

// Obtenir la transition par défaut
$transition: map-get(map-get($button-config, transitions), default);
```

## Le mixin `button`

Le mixin `button` est le cœur du système. Il prend de nombreux paramètres pour personnaliser le bouton tout en conservant la cohérence globale.

### Syntaxe complète

```scss
@mixin button(
	$color: $white,
	// Couleur du texte
	$hover_color: $black,
	// Couleur du texte au survol
	$bg: $black,
	// Couleur de fond
	$hover_bg: $white,
	// Couleur de fond au survol
	$border: $bg,
	// Couleur de bordure (par défaut = couleur de fond)
	$hover_border: $hover_color,
	// Couleur de bordure au survol
	$bg_gradient: null,
	// Gradient de fond (optionnel)
	$hover_bg_gradient: null,
	// Gradient de fond au survol
	$fw: 700,
	// Font-weight
	$pv: null,
	// Padding vertical (null = défaut de la config)
	$ph: null,
	// Padding horizontal
	$br: null,
	// Border-radius
	$bw: null,
	// Border-width
	$fs: null,
	// Font-size
	$fs_min: 14,
	// Font-size minimum (pour responsive)
	$fs_max: 22,
	// Font-size maximum
	$relative_fs: true // Utiliser vw pour la taille de police
) {
	// Implémentation...
}
```

## Liste des paramètres

Voici une description détaillée de tous les paramètres disponibles pour le mixin `button` :

| Paramètre            | Type      | Valeur par défaut | Description                                                                                                                                          |
| -------------------- | --------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `$color`             | Couleur   | `$white`          | Couleur du texte à l'état normal. Définit la couleur principale du texte et des icônes du bouton.                                                    |
| `$hover_color`       | Couleur   | `$black`          | Couleur du texte au survol. S'applique également aux icônes SVG contenues dans le bouton.                                                            |
| `$bg`                | Couleur   | `$black`          | Couleur de fond à l'état normal. Peut être remplacée par un gradient si `$bg_gradient` est spécifié.                                                 |
| `$hover_bg`          | Couleur   | `$white`          | Couleur de fond au survol. Peut être remplacée par un gradient si `$hover_bg_gradient` est spécifié.                                                 |
| `$border`            | Couleur   | `$bg`             | Couleur de la bordure à l'état normal. Par défaut, utilise la même couleur que le fond.                                                              |
| `$hover_border`      | Couleur   | `$hover_color`    | Couleur de la bordure au survol. Par défaut, utilise la même couleur que le texte au survol.                                                         |
| `$bg_gradient`       | Gradient  | `null`            | Gradient de fond à l'état normal. Si spécifié, remplace la couleur `$bg`. Format: `linear-gradient(...)`                                             |
| `$hover_bg_gradient` | Gradient  | `null`            | Gradient de fond au survol. Si spécifié, remplace la couleur `$hover_bg`.                                                                            |
| `$fw`                | Nombre    | `700`             | Graisse de la police (font-weight). Valeurs standards: 400 (normal), 500 (medium), 600 (semi-bold), 700 (bold), etc.                                 |
| `$pv`                | Dimension | `null`            | Padding vertical. Si `null`, utilise la valeur de `padding-vertical` de la configuration. Accepte des valeurs en em, rem, px, etc.                   |
| `$ph`                | Dimension | `null`            | Padding horizontal. Si `null`, utilise la valeur de `padding-horizontal` de la configuration.                                                        |
| `$br`                | Dimension | `null`            | Rayon de bordure (border-radius). Si `null`, utilise la valeur de `border-radius` de la configuration.                                               |
| `$bw`                | Dimension | `null`            | Épaisseur de la bordure (border-width). Si `null`, utilise 1px par défaut.                                                                           |
| `$fs`                | Nombre    | `null`            | Taille de police en pixels (sans unité). Si `null`, utilise la valeur de `font-size` de la configuration.                                            |
| `$fs_min`            | Nombre    | `14`              | Taille de police minimale en pixels pour le responsive. Utilisé avec la fonction `clamp()` quand `$relative_fs` est `true`.                          |
| `$fs_max`            | Nombre    | `22`              | Taille de police maximale en pixels pour le responsive. Utilisé avec la fonction `clamp()` quand `$relative_fs` est `true`.                          |
| `$relative_fs`       | Booléen   | `true`            | Active/désactive la conversion de la taille de police en unités vw. Si `true`, la taille sera responsive et proportionnelle à la largeur de l'écran. |

### Comportements spécifiques

- **Transparence** : Pour créer un bouton sans fond (transparent), utilisez `$bg: transparent`.
- **Sans bordure** : Pour supprimer la bordure, utilisez `$border: transparent`.
- **Désactivation du responsive** : Pour un bouton avec une taille fixe, utilisez `$relative_fs: false`.
- **Bouton texte** : Pour un bouton sans fond ni bordure, combinez `$bg: transparent`, `$hover_bg: transparent`, `$border: transparent` et `$hover_border: transparent`.
- **Animation de l'effet hover** : L'effet de survol utilise des pseudo-éléments `::before` et `::after` avec des transformations CSS pour créer une animation fluide.

### Paramètres derivés

Le mixin utilise également des valeurs dérivées des paramètres principaux :

- La taille responsive est calculée avec `to-vw($fs)` et limitée par `clamp()` entre `$fs_min` et `$fs_max`.
- Les transitions sont appliquées via le placeholder `%button-transitions` qui utilise les valeurs de `$button-config`.
- Les styles de base comme `display: flex` et `cursor: pointer` sont hérités du placeholder `%button-base`.

### Exemple d'utilisation basique

```scss
.btn-primary {
	@include button(); // Utilise toutes les valeurs par défaut
}

.btn-secondary {
	@include button($color: $black, $hover_color: $white, $bg: $white, $hover_bg: $black);
}
```

## Boutons basiques

### Bouton par défaut

```scss
.button {
	@include button($white, $black, $black, $white, $black, $black);
}
```

Cela crée un bouton noir avec texte blanc qui devient blanc avec texte noir au survol.

### Bouton de couleur primaire

```scss
.btn-primary {
	@include button($white, $black, $lime, $white, $lime, $black);
}
```

### Bouton contour (outline)

```scss
.btn-outline {
	@include button($lime, $white, transparent, $lime, $lime, $lime);
}
```

### Bouton texte (sans fond)

```scss
.btn-text {
	@include button($color: $lime, $hover_color: darken($lime, 10%), $bg: transparent, $hover_bg: transparent, $border: transparent, $hover_border: transparent, $pv: 0.5em, $ph: 0);
}
```

## Variantes de boutons

### Bouton avec gradient

```scss
.btn-gradient {
	@include button(
		$color: $white,
		$hover_color: $white,
		$bg: transparent,
		$hover_bg: transparent,
		$border: transparent,
		$hover_border: transparent,
		$bg_gradient: linear-gradient(45deg, $lime, $blue),
		$hover_bg_gradient: linear-gradient(45deg, $blue, $lime)
	);
}
```

### Bouton avec bordure personnalisée

```scss
.btn-border-large {
	@include button(
		$color: $white,
		$hover_color: $lime,
		$bg: transparent,
		$hover_bg: $black,
		$border: $white,
		$hover_border: $lime,
		$bw: 3px // Bordure plus épaisse
	);
}
```

### Bouton avec coins arrondis personnalisés

```scss
.btn-rounded {
	@include button($br: 4px); // Coins légèrement arrondis
}

.btn-pill {
	@include button($br: 50px); // Forme pilule
}

.btn-square {
	@include button($br: 0); // Coins carrés
}
```

## Utiliser les fonctionnalités responsive

Le mixin `button` intègre des fonctionnalités responsive, notamment pour la taille de police.

### Taille de police responsive avec `to-vw()`

```scss
.btn-responsive {
	@include button(
		$fs: 20,
		// Taille de base en pixels
		$fs_min: 16,
		// Taille minimale
		$fs_max: 28,
		// Taille maximale
		$relative_fs: true // Activer la conversion en vw
	);
}
```

Cela crée un bouton dont la taille de police sera :

- Convertie en unités vw pour s'adapter proportionnellement à la largeur de l'écran
- Limitée à 16px minimum et 28px maximum grâce à la fonction `clamp()`

### Désactiver la taille responsive

```scss
.btn-fixed-size {
	@include button(
		$fs: 16,
		$relative_fs: false // Utiliser des px fixes au lieu de vw
	);
}
```

### Adapter les éléments internes

Les éléments SVG à l'intérieur des boutons s'adaptent également proportionnellement :

```scss
.btn-with-icon {
	@include button($relative_fs: true);

	// La hauteur du SVG à l'intérieur du span sera proportionnelle
	// et s'adaptera automatiquement pour les petits écrans
}
```

## États des boutons

Le mixin gère automatiquement plusieurs états.

### État normal

Styles de base définis par les paramètres principaux.

### État survol (hover)

```scss
&:hover {
	color: $hover_color;
	border-radius: map-get($base, hover-radius);
	border: if($bw, $bw, 1px solid $hover_border);
	background-color: transparent;
	opacity: 1;

	// Et d'autres propriétés...
}
```

### État désactivé (disabled)

```scss
&[disabled] {
	background-color: if($bg_gradient, $bg_gradient, $bg);
	color: $color;
	opacity: 0.2;
	cursor: not-allowed;
	pointer-events: none;
}
```

Exemple d'utilisation :

```scss
<button class="btn-primary" disabled>Bouton désactivé</button>
```

### État ouvert (pour les boutons de menu)

```scss
&--open {
	// Styles de l'état ouvert
}
```

Exemple d'utilisation :

```scss
<button class="btn-menu btn-menu--open">Menu</button>
```

## Animations et transitions

Le système inclut des transitions avancées pour les changements d'état.

### Transitions de base

```scss
%button-transitions {
	transition: opacity map-get(map-get($button-config, transitions), default), color map-get(map-get($button-config, transitions), default),
		background-color map-get(map-get($button-config, transitions), default), border-color map-get(map-get($button-config, transitions), default),
		border-radius map-get(map-get($button-config, transitions), default);
}
```

### Animation de survol avancée

Le système utilise des pseudo-éléments pour créer une animation de "slide" au survol :

```scss
&::before {
	@extend %pseudo-element-base;
	background: if($hover_bg_gradient, $hover_bg_gradient, $hover_bg);
	border-radius: 10px;
	transform: translateX(-101%);
}

&::after {
	@extend %pseudo-element-base;
	background: if($bg_gradient, $bg_gradient, $bg);
	border-radius: 10px;
	transform: translateX(0) scale(1);
}

&:hover {
	&::before {
		transform: translateX(0) scale(1);
	}
	&::after {
		transform: translateX(101%) scale(1);
	}
}
```

Cette technique permet une animation fluide de changement de couleur de fond, du bord vers le centre du bouton.

## Boutons avec icônes

Le mixin prend en charge les icônes SVG à l'intérieur des boutons.

### Structure HTML recommandée

```html
<button class="btn-with-icon">
	Texte du bouton
	<span>
		<svg><!-- Icône SVG --></svg>
	</span>
</button>
```

### Styles appliqués aux icônes

```scss
span {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	transition: transform map-get(map-get($button-config, transitions), default);

	// Hauteur responsive ou fixe selon $relative_fs
	@if ($relative_fs) {
		height: to-vw(11);
		@media all and (max-width: 1024px) {
			height: 11px;
		}
	} @else {
		height: 11px;
	}

	svg {
		height: 100%;
		width: auto;
	}

	path {
		fill: $color;
		transition: fill map-get(map-get($button-config, transitions), default);
	}
}
```

### Animation des icônes au survol

```scss
&:hover {
	span {
		path {
			fill: $hover_color;
			transition: fill map-get(map-get($button-config, transitions), delayed);
		}
	}
}
```

### Exemple de bouton avec icône

```scss
.btn-arrow {
	@include button($white, $lime, $black, $white);

	// Animation supplémentaire sur l'icône
	&:hover span {
		transform: translateX(0.5em); // Déplace l'icône vers la droite
	}
}
```

## Exemples concrets

### Système complet de boutons

```scss
// Bouton primaire
.btn-primary {
	@include button($white, $black, $lime, $white, $lime, $black);
}

// Bouton secondaire
.btn-secondary {
	@include button($lime, $white, transparent, $lime, $lime, $lime);
}

// Bouton tertiaire
.btn-tertiary {
	@include button($color: $lime, $hover_color: $black, $bg: transparent, $hover_bg: transparent, $border: transparent, $hover_border: transparent, $pv: 0.5em, $ph: 0);
}

// Bouton petit
.btn-small {
	@include button($fs: 12, $fs_min: 11, $fs_max: 14, $pv: 0.75em, $ph: 1em);
}

// Bouton large
.btn-large {
	@include button($fs: 18, $fs_min: 16, $fs_max: 24, $pv: 1.25em, $ph: 2em);
}

// Bouton avec icône flèche
.btn-arrow {
	@include button();

	span {
		margin-left: 0.5em;
	}

	&:hover span {
		transform: translateX(0.25em);
	}
}

// Bouton de soumission de formulaire
.btn-submit {
	@include button($color: $white, $hover_color: $black, $bg: $green, $hover_bg: $lime, $border: $green, $hover_border: $lime);
}
```

### Utilisation avec des variables dynamiques

```scss
// Définir des variables pour les couleurs du bouton
$button-primary-bg: $lime;
$button-primary-text: $white;

// Bouton qui utilise les variables
.btn-theme {
	@include button($color: $button-primary-text, $hover_color: $button-primary-bg, $bg: $button-primary-bg, $hover_bg: $button-primary-text);
}
```

### Bouton avec dégradé et animation personnalisée

```scss
.btn-gradient-animated {
	@include button(
		$color: $white,
		$hover_color: $white,
		$bg_gradient: linear-gradient(45deg, $lime, $blue),
		$hover_bg_gradient: linear-gradient(45deg, $blue, $lime),
		$border: transparent,
		$hover_border: transparent
	);

	transition: transform 0.3s $easeOutBack;

	&:hover {
		transform: scale(1.05);
	}
}
```

---

Ce système de boutons permet de créer des interfaces cohérentes tout en offrant une grande flexibilité. En utilisant le mixin `button` et en comprenant ses options, vous pouvez rapidement créer de nouveaux styles de boutons tout en maintenant l'identité visuelle du site.
