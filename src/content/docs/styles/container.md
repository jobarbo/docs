---
title: "Conteneurs"
description: "Le système de conteneurs du framework SCSS"
order: 6
section: "styles"
---

# Wiki du Système de Conteneurs SCSS

Ce guide détaille le système de conteneurs disponible dans notre framework SCSS (`_container.scss`), son fonctionnement et comment l'utiliser efficacement pour créer des mises en page cohérentes et responsives.

## Sommaire

1. [Principe fondamental](#principe-fondamental)
2. [Mixin `container`](#mixin-container)
3. [Utilisation de base](#utilisation-de-base)
4. [Adaptation aux différentes tailles d'écran](#adaptation-aux-différentes-tailles-décran)
5. [Personnalisation des conteneurs](#personnalisation-des-conteneurs)
6. [Intégration avec les variables globales](#intégration-avec-les-variables-globales)
7. [Exemples concrets](#exemples-concrets)

## Principe fondamental

Le système de conteneurs permet de créer des éléments qui :

- Maintiennent une largeur et des marges cohérentes
- S'adaptent automatiquement aux différentes tailles d'écran
- Appliquent des espacements intérieurs (paddings) appropriés selon le contexte

Le fichier `_container.scss` fournit un mixin flexible et une classe prête à l'emploi pour implémenter rapidement ces comportements dans votre site.

## Mixin `container`

Le cœur du système est le mixin `container` qui permet de créer des conteneurs avec des propriétés personnalisables :

```scss
@mixin container(
	$padding: (
		xlarge: get-padding("xlarge"),
		desktop: get-padding("desktop"),
		tablet: get-padding("tablet"),
		mobile: get-padding("mobile"),
	),
	$is-max-width: false
) {
	// ... implémentation du mixin ...
}
```

### Paramètres

| Paramètre       | Description                                             | Valeur par défaut                |
| --------------- | ------------------------------------------------------- | -------------------------------- |
| `$padding`      | Map des paddings pour chaque taille d'écran             | Valeurs depuis `$padding` global |
| `$is-max-width` | Définit si le conteneur doit avoir une largeur maximale | `false`                          |

## Utilisation de base

### Classe prédéfinie

La façon la plus simple d'utiliser le conteneur est d'appliquer la classe `.container` qui est prédéfinie avec les valeurs par défaut :

```html
<div class="container">
	<!-- Contenu centré avec paddings responsives -->
</div>
```

### Utilisation du mixin

Pour plus de flexibilité, vous pouvez utiliser directement le mixin dans vos propres classes :

```scss
.section-container {
	@include container();
}

.narrow-container {
	@include container($is-max-width: true);
}
```

## Adaptation aux différentes tailles d'écran

Le mixin `container` s'adapte automatiquement à quatre points de rupture différents :

1. **Extra Large (XLarge)** : Pour les écrans plus larges que `$design-width`
2. **Desktop** : Pour les écrans standards (valeur par défaut)
3. **Tablet** : Pour les écrans de taille moyenne (max-width: 1024px)
4. **Mobile** : Pour les petits écrans (max-width: 700px)

> **Mise à jour importante** : Le système utilise désormais la variable `$design-width` au lieu d'une valeur codée en dur (1920px), ce qui permet une meilleure cohérence et personnalisation.

```scss
// Adaptation aux grands écrans
@media all and (min-width: $design-width) {
	$xlarge-value: map-get($padding, xlarge);
	padding: if(type-of($xlarge-value) == "list", $xlarge-value, 0 $xlarge-value);
}
```

## Personnalisation des conteneurs

### Personnalisation des paddings

Vous pouvez personnaliser les paddings pour chaque breakpoint en passant une map personnalisée :

```scss
.custom-container {
	@include container(
		(
			xlarge: 50px,
			desktop: 40px,
			tablet: 30px,
			mobile: 15px,
		)
	);
}
```

### Padding vertical et horizontal différents

Vous pouvez spécifier des paddings verticaux et horizontaux différents en utilisant des listes :

```scss
.vertical-padded-container {
	@include container(
		(
			xlarge: 50px 80px,
			// 50px en haut/bas, 80px à gauche/droite
			desktop: 40px 60px,
			tablet: 30px 40px,
			mobile: 20px 15px,
		)
	);
}
```

### Avec largeur maximale

Pour créer un conteneur avec une largeur maximale (définie par la variable `$max-width`), utilisez le paramètre `$is-max-width` :

```scss
.limited-container {
	@include container($is-max-width: true);
}
```

## Intégration avec les variables globales

Le système de conteneurs s'intègre parfaitement avec les variables globales définies dans `_variables.scss` :

- Il utilise `$design-width` pour déterminer le breakpoint des grands écrans
- Il utilise `$max-width` pour définir la largeur maximale (si activée)
- Il utilise la fonction `get-padding()` pour accéder aux valeurs de padding prédéfinies

## Exemples concrets

### Conteneur de base

```scss
.standard-section {
	@include container();
	background-color: $pearl;
	margin-bottom: 40px;
}
```

### Conteneur avec largeur maximale et padding personnalisé

```scss
.article-content {
	@include container(
		(
			xlarge: get-padding("xlarge", "medium"),
			desktop: get-padding("desktop", "medium"),
			tablet: get-padding("tablet", "medium"),
			mobile: get-padding("mobile", "base"),
		),
		true
	);

	background-color: $white;
	border-radius: 8px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}
```

### Conteneur fluide pour une section hero

```scss
.hero-section {
	@include container(
		(
			xlarge: get-padding("xlarge", "large"),
			desktop: get-padding("desktop", "large"),
			tablet: get-padding("tablet", "medium"),
			mobile: get-padding("mobile", "small"),
		)
	);

	min-height: 80vh;
	display: flex;
	align-items: center;
	background: $gradient-cobalt;
	color: $white;
}
```

### Combinaison avec d'autres composants

```scss
.testimonials-section {
	@include container();

	&__title {
		@include title(2, $ta: center, $mb: 2em);
	}

	&__grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 30px;

		@include tablet-only {
			grid-template-columns: repeat(2, 1fr);
		}

		@include mobile-only {
			grid-template-columns: 1fr;
		}
	}
}
```

---

Le système de conteneurs fournit une base solide et flexible pour construire des mises en page cohérentes à travers votre site. En utilisant ce système, vous garantissez une expérience utilisateur harmonieuse sur tous les appareils et vous simplifiez considérablement le développement de nouvelles sections et pages.
