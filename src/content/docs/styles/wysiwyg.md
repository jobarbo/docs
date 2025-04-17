---
title: "WYSIWYG"
description: "Les styles pour le contenu éditable et les éditeurs visuels dans WordPress"
order: 8
section: "styles"
---

# Wiki du Système WYSIWYG SCSS pour WordPress

Ce guide détaille le système d'édition visuelle (WYSIWYG - What You See Is What You Get) disponible dans notre framework SCSS (`_wysiwyg.scss`), expliquant comment il fonctionne et comment l'utiliser pour créer une expérience d'édition cohérente avec votre design dans l'éditeur TinyMCE de WordPress et d'ACF.

## Sommaire

1. [Principe fondamental](#principe-fondamental)
2. [Structure du fichier](#structure-du-fichier)
3. [Intégration des mixins typographiques](#intégration-des-mixins-typographiques)
4. [Personnalisation des styles d'éditeur](#personnalisation-des-styles-déditeur)
5. [Éléments pris en charge](#éléments-pris-en-charge)
6. [Utilisation avancée](#utilisation-avancée)
7. [Mixin wysiwyg](#mixin-wysiwyg)
8. [Exemples concrets](#exemples-concrets)

## Principe fondamental

Le fichier `_wysiwyg.scss` est spécifiquement conçu pour transposer les styles du front-end dans l'éditeur visuel TinyMCE de WordPress et d'ACF (Advanced Custom Fields). Cette intégration permet aux rédacteurs de contenu de voir exactement comment leur contenu apparaîtra sur le site web pendant qu'ils le créent. Le fichier remplit plusieurs fonctions essentielles :

- **Cohérence** : Garantit que le contenu dans l'éditeur WordPress ressemble au contenu publié
- **Accessibilité** : Facilite l'édition en rendant le contenu lisible et bien structuré dans TinyMCE
- **Maintenance** : Centralise les styles d'édition pour une mise à jour facile
- **Extensibilité** : Permet d'ajouter facilement de nouveaux éléments d'édition pour WordPress

Notre système WYSIWYG hérite des styles typographiques de base de notre framework, assurant ainsi une cohérence totale entre l'expérience d'édition dans WordPress et l'affichage final sur le site.

## Structure du fichier

Le fichier `_wysiwyg.scss` cible spécifiquement l'éditeur visuel TinyMCE de WordPress via le sélecteur `body#tinymce`. Cette approche isole les styles d'éditeur des styles frontend, tout en maintenant la cohérence visuelle entre l'interface d'édition et le site public.

La structure de base est :

```scss
body#tinymce {
  // Hérite des styles de base du texte
  @extend %base-text;
  margin: 0 auto;
  padding: 20px;

  // Styles pour les éléments spécifiques de l'éditeur WordPress
  h1, h2, h3, h4, h5, h6 { ... }
  p { ... }
  a { ... }
  // etc.
}
```

## Intégration des mixins typographiques

Le système WYSIWYG utilise les mêmes mixins que votre frontend pour garantir la cohérence entre l'éditeur WordPress et le site public :

```scss
// Exemple d'utilisation des mixins typographiques dans l'éditeur TinyMCE
body#tinymce {
	// Titres
	h1 {
		@include title(1, $mb: 1em, $mt: 1.25em);
	}
	h2 {
		@include title(2, $mb: 1em, $mt: 1.25em);
	}
	// etc.

	// Paragraphes
	p {
		@include text($mb: 1em, $fs: 16, $fs_min: 16, $fs_max: 16);
	}
}
```

Cette approche assure que tous les éléments dans l'éditeur WordPress correspondent visuellement à leur apparence finale sur le site.

## Personnalisation des styles d'éditeur

Vous pouvez personnaliser les styles de l'éditeur TinyMCE pour diverses raisons :

1. **Améliorer la lisibilité pendant l'édition dans WordPress**
2. **Adapter les styles au workflow de votre équipe de rédaction**
3. **Ajouter des styles spécifiques au CMS WordPress et ACF**

### Exemples de personnalisation

```scss
body#tinymce {
	// Augmenter l'espacement pour plus de lisibilité dans TinyMCE
	padding: 30px;

	// Limiter la largeur pour une meilleure expérience d'édition
	max-width: 800px;

	// Ajouter des styles spécifiques à l'éditeur WordPress
	.content-area {
		border: 1px dashed rgba(0, 0, 0, 0.1);
		padding: 10px;
		margin-bottom: 20px;
	}
}
```

## Éléments pris en charge

Notre système WYSIWYG prend en charge tous les éléments HTML courants que les rédacteurs peuvent utiliser dans WordPress :

### Typographie

- **Titres** : h1 à h6, avec hiérarchie visuelle claire
- **Paragraphes** : styles de base cohérents
- **Gras/Italique** : strong, b, em, i
- **Liens** : styles d'hyperlien avec états au survol

### Structures

- **Listes** : ol, ul avec styles personnalisables
- **Citations** : blockquote avec style distinct
- **Tableaux** : structure de tableau accessible et lisible

### Médias

- **Images** : redimensionnement automatique
- **Vidéos** : intégration responsive
- **Contenus embarqués** : styles pour iframes, embeds

### Styles spécifiques

```scss
// Styles pour les blockquotes dans TinyMCE
blockquote {
	border-left: 3px solid $sage;
	padding-left: 1em;
	margin: 1em 0;
	font-style: italic;
}

// Styles pour les tableaux dans l'éditeur WordPress
table {
	width: 100%;
	border-collapse: collapse;
	margin: 1em 0;

	th,
	td {
		border: 1px solid $ghost;
		padding: 0.5em;
	}

	th {
		background: $pearl;
		font-weight: 500;
	}
}

// Styles pour les images dans TinyMCE
img {
	max-width: 100%;
	height: auto;
	margin: 1em 0;
}
```

## Utilisation avancée

### Adaptation des styles selon le contexte dans WordPress

Vous pouvez créer différentes variantes de styles WYSIWYG selon le contexte d'édition dans WordPress :

```scss
// Style standard pour l'éditeur TinyMCE principal
body#tinymce {
	@extend %base-text;
	// Styles de base
}

// Style pour les zones de texte secondaires dans ACF
body#tinymce.sidebar-editor {
	font-size: 14px;
	line-height: 1.6;

	h1,
	h2,
	h3 {
		font-size: 90%;
	}
}
```

### Intégration de composants personnalisés dans l'éditeur WordPress

Vous pouvez ajouter des styles pour les composants personnalisés utilisés dans l'éditeur TinyMCE :

```scss
body#tinymce {
	// Composant de callout personnalisé pour WordPress
	.callout {
		border-radius: 4px;
		padding: 1.5em;
		margin: 2em 0;
		background-color: $pearl;

		&.is-warning {
			background-color: lighten($amber, 45%);
			border-left: 4px solid $amber;
		}

		&.is-info {
			background-color: lighten($azure, 45%);
			border-left: 4px solid $azure;
		}
	}
}
```

## Mixin wysiwyg

Notre framework inclut également un mixin `wysiwyg` qui peut être utilisé pour appliquer les styles d'édition à n'importe quel conteneur sur le frontend, reproduisant ainsi l'apparence du contenu édité via WordPress :

```scss
@mixin wysiwyg($color: $alpine) {
	h1 {
		@include title(1, $color: $color, $mb: 1em, $mt: 1.25em);
	}

	h2 {
		@include title(2, $color: $color, $mb: 1em, $mt: 1.25em);
	}

	// Autres éléments...

	p,
	span {
		@include text($fs: 16, $color: $color, $mb: 2em);

		@include tablet-only {
			margin-bottom: 1em;
		}
	}

	ul,
	ol {
		@include list-styles();
		li {
			@include text($fs: 16, $color: $color, $mb: 0.5em);
		}
	}
}
```

### Utilisation du mixin wysiwyg

Ce mixin est particulièrement utile pour styliser le contenu généré par l'utilisateur ou importé depuis l'API WordPress :

```scss
// Styliser le contenu d'un article de blog WordPress
.blog-content {
	@include wysiwyg();
}

// Styliser une section avec une couleur de texte spécifique
.dark-section .content {
	@include wysiwyg($color: $white);
}
```

## Exemples concrets

### Configuration basique d'éditeur WordPress TinyMCE

```scss
body#tinymce {
	@extend %base-text;
	margin: 0 auto;
	padding: 20px;
	max-width: 800px;

	// Appliquer les styles de titre
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-family: $font-family-title;
		clear: both;
	}

	h1 {
		@include title(1, $mb: 1em, $mt: 1.25em);
	}
	h2 {
		@include title(2, $mb: 1em, $mt: 1.25em);
	}
	h3 {
		@include title(3, $mb: 1em, $mt: 1.25em);
	}
	h4 {
		@include title(4, $mb: 1em, $mt: 1.25em);
	}
	h5 {
		@include title(5, $mb: 1em, $mt: 1.25em);
	}
	h6 {
		@include title(6, $mb: 1em, $mt: 1.25em);
	}

	// Paragraphes et texte
	p {
		@include text($mb: 1em, $fs: 16);
		max-width: 70ch; // Améliore la lisibilité
	}

	// Liens avec états
	a {
		color: $azure;
		text-decoration: none;
		transition: all map-get(map-get($button-config, transitions), default);

		&:hover {
			color: $ocean;
		}
	}
}
```

### Intégration avec TinyMCE dans ACF

```scss
// Styles spécifiques pour l'éditeur TinyMCE dans ACF
body#tinymce.acf-field {
	// Ajuster la largeur pour correspondre au frontend
	max-width: 100%;
	padding: 15px;

	// Réduire légèrement la taille des titres dans les champs ACF
	h1 {
		@include title(2); // Utiliser un niveau plus petit pour les éditeurs ACF
	}

	h2 {
		@include title(3);
	}

	// Réduire l'espacement pour les éditeurs ACF plus compacts
	p {
		margin-bottom: 0.75em;
	}
}
```

### Intégration avec Gutenberg et TinyMCE

```scss
// Styles spécifiques pour l'éditeur TinyMCE dans l'environnement Gutenberg
body#tinymce {
	// Ajuster la largeur pour correspondre au frontend
	.wp-block {
		max-width: 1200px;
	}

	// Styles pour les éléments de mise en page
	.wp-block-columns {
		display: flex;
		gap: 2em;
		margin-bottom: 2em;
	}

	// Styliser les boutons
	.wp-block-button {
		.wp-block-button__link {
			@include button();
		}

		&.is-style-outline .wp-block-button__link {
			@include button($style: "outline");
		}
	}

	// Styliser les citations
	.wp-block-quote {
		border-left: 4px solid $sage;
		margin-left: 0;
		padding-left: 1.5em;
		font-style: italic;

		cite {
			@include text($fs: 14, $color: $gray-600);
			margin-top: 1em;
			display: block;
		}
	}
}
```

### Styliser le contenu importé depuis WordPress

```scss
// Appliquer des styles WYSIWYG à du contenu importé de WordPress
.wordpress-content {
	@include wysiwyg();

	// Ajuster certains styles pour ce contexte spécifique
	h2 {
		border-bottom: 1px solid $ghost;
		padding-bottom: 0.5em;
	}

	img {
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	}

	// Ajouter des styles spécifiques aux tableaux importés
	table {
		font-size: 14px;

		th {
			background-color: $sage;
			color: white;
		}

		tr:nth-child(even) {
			background-color: rgba($sage, 0.1);
		}
	}
}
```

---

Le système WYSIWYG offre une solution complète pour assurer la cohérence entre l'expérience d'édition dans WordPress (via TinyMCE ou ACF) et l'affichage final du contenu sur le site. En utilisant efficacement le fichier `_wysiwyg.scss` et le mixin `wysiwyg()`, vous pouvez créer une expérience d'édition intuitive et fidèle au design de votre site.
