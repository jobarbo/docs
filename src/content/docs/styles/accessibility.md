---
title: "Accessibility"
description: "Styles et utilitaires pour améliorer l'accessibilité du site web"
order: 11
section: "styles"
---

# Documentation Accessibility

## Introduction

Le fichier `_accessibility.scss` fournit un ensemble de styles et d'utilitaires pour améliorer l'accessibilité du site web. Ces styles assurent que le site est utilisable par tous, y compris les personnes utilisant des technologies d'assistance ou ayant des préférences d'affichage spécifiques.

## Sommaire

1. [Introduction](#introduction)
2. [Skip to Content](#skip-to-content)
3. [Focus Visible](#focus-visible)
4. [Mode Contraste Élevé](#mode-contraste-élevé)
5. [Préférence de Réduction de Mouvement](#préférence-de-réduction-de-mouvement)
6. [Texte pour Lecteurs d'Écran](#texte-pour-lecteurs-décran)
7. [Helpers ARIA](#helpers-aria)
8. [Styles de Focus pour Éléments Interactifs](#styles-de-focus-pour-éléments-interactifs)
9. [Utilisation type](#utilisation-type)
10. [Bonnes pratiques](#bonnes-pratiques)
11. [Tableau de références](#tableau-de-références)
12. [Références](#références)

## Skip to Content

```scss
.skip-to-content {
	@include visually-hidden;

	&:focus {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: auto;
		height: auto;
		padding: 1rem;
		margin: 1rem;
		background-color: #fff;
		color: #000;
		text-decoration: none;
		font-weight: 700;
		clip: auto;
		z-index: 1000;
		outline: 3px solid #4d90fe;
	}
}
```

Le lien "Skip to content" permet aux utilisateurs de clavier de contourner la navigation et d'accéder directement au contenu principal. Il est visuellement caché mais devient visible lorsqu'il reçoit le focus.

## Focus Visible

```scss
.js-focus-visible :focus:not(.focus-visible) {
	outline: none;
}

.js-focus-visible .focus-visible {
	@include focus-outline;
}
```

Ces classes fonctionnent avec la bibliothèque `focus-visible` pour afficher les contours de focus uniquement pour les utilisateurs de clavier, pas pour les clics de souris.

## Mode Contraste Élevé

```scss
@media (forced-colors: active) {
	.high-contrast-adjustment {
		border: 1px solid currentColor;
	}
}
```

Détecte automatiquement le mode contraste élevé et applique des ajustements pour améliorer la visibilité.

## Préférence de Réduction de Mouvement

```scss
@media (prefers-reduced-motion: reduce) {
	* {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
		transition-duration: 0.01ms !important;
		scroll-behavior: auto !important;
	}
}
```

Respecte la préférence utilisateur de réduction de mouvement en désactivant ou en réduisant considérablement les animations et transitions.

## Texte pour Lecteurs d'Écran

```scss
.sr-only {
	@include visually-hidden;
}
```

Classe utilitaire pour masquer visuellement du contenu tout en le rendant accessible aux technologies d'assistance.

## Helpers ARIA

```scss
[aria-hidden="true"] {
	display: none;
}
```

S'assure que les éléments marqués comme cachés via ARIA sont effectivement masqués visuellement.

## Styles de Focus pour Éléments Interactifs

```scss
a:focus,
button:focus,
input:focus,
select:focus,
textarea:focus {
	@include focus-outline;
}
```

Applique un style de focus cohérent à tous les éléments interactifs pour une meilleure accessibilité au clavier.

## Utilisation type

### Ajouter un texte accessible uniquement aux lecteurs d'écran

```html
<button>
	<span class="sr-only">Fermer la fenêtre</span>
	<svg>...</svg>
</button>
```

### Implémenter un lien "Skip to content"

```html
<a href="#main-content" class="skip-to-content">Aller au contenu principal</a>
```

### Ajuster les éléments pour le mode contraste élevé

```html
<div class="icon-container high-contrast-adjustment">
	<svg>...</svg>
</div>
```

## Bonnes pratiques

- Utilisez toujours la classe `.sr-only` pour fournir des descriptions textuelles pour les éléments visuels non-textuels
- Implémentez le lien "Skip to content" sur toutes les pages du site
- Testez toujours votre site avec un lecteur d'écran et en navigation clavier
- Respectez les préférences utilisateur en matière de réduction de mouvement et de contraste
- Utilisez `.focus-visible` pour un comportement de focus amélioré (nécessite la bibliothèque `focus-visible`)

## Tableau de références

| Classe/Élément              | Description                                                          | Exemple                                           |
| --------------------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| `.sr-only`                  | Masque visuellement, accessible aux lecteurs d'écran                 | `<span class="sr-only">Description</span>`        |
| `.skip-to-content`          | Lien qui permet de sauter aux contenus principaux                    | `<a href="#main" class="skip-to-content">...</a>` |
| `.js-focus-visible`         | Container pour améliorer le focus avec la bibliothèque focus-visible | `<div class="js-focus-visible">...</div>`         |
| `.focus-visible`            | Style de focus spécifique pour navigation clavier                    | _Ajouté automatiquement par JS_                   |
| `.high-contrast-adjustment` | Éléments adaptés pour le mode contraste élevé                        | `<div class="high-contrast-adjustment">...</div>` |
| `prefers-reduced-motion`    | Media query qui détecte la préférence utilisateur                    | _CSS uniquement_                                  |
| `[aria-hidden="true"]`      | Masque les éléments aux technologies d'assistance                    | `<div aria-hidden="true">...</div>`               |

## Références

- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [MDN - Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
