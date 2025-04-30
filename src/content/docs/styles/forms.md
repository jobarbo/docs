---
title: "Forms"
description: "Styles pour les éléments de formulaire"
order: 12
section: "styles"
---

# Documentation Forms

## Introduction

Le fichier `_forms.scss` établit des styles de base cohérents pour tous les éléments de formulaire du site. Ces styles assurent une expérience utilisateur fluide et accessible tout en maintenant une apparence uniforme à travers les différents types d'entrées.

## Sommaire

1. [Introduction](#introduction)
2. [Structure HTML type](#structure-html-type)
3. [Styles de Base pour Éléments de Formulaire](#styles-de-base-pour-éléments-de-formulaire)
4. [Champs de Texte](#champs-de-texte)
5. [Zone de Texte (Textarea)](#zone-de-texte-textarea)
6. [Sélecteurs (Select)](#sélecteurs-select)
7. [Cases à Cocher et Boutons Radio](#cases-à-cocher-et-boutons-radio)
8. [Groupes de Formulaire](#groupes-de-formulaire)
9. [Étiquettes](#étiquettes)
10. [Messages d'Erreur](#messages-derreur)
11. [Indicateur de Champ Obligatoire](#indicateur-de-champ-obligatoire)
12. [Formulaire de Contact](#formulaire-de-contact)
13. [Sélecteur Personnalisé](#sélecteur-personnalisé)
14. [Cases à Cocher](#cases-à-cocher)
15. [Tableau de références](#tableau-de-références)
16. [Bonnes pratiques](#bonnes-pratiques)
17. [Compatibilité](#compatibilité)
18. [Références](#références)

## Structure HTML type

```html
<div class="form-group">
	<label for="field" class="required">Label</label>
	<input type="text" id="field" required />
	<div class="form-error">Message d'erreur</div>
</div>
```

## Styles de Base pour Éléments de Formulaire

```scss
input,
textarea,
select,
button {
	font-family: inherit;
	font-size: inherit;
	color: inherit;
	max-width: 100%;
	border: 1px solid #ddd;
	border-radius: 4px;
	background-color: #fff;
	transition: all 0.3s ease;

	&:focus {
		outline: none;
		border-color: #999;
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
	}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background-color: #f5f5f5;
	}
}
```

Ces styles de base s'appliquent à tous les éléments de formulaire, garantissant cohérence et accessibilité. Ils incluent la gestion des états de focus et désactivé.

## Champs de Texte

```scss
input[type="text"],
input[type="email"],
input[type="password"],
input[type="search"],
input[type="tel"],
input[type="url"],
input[type="number"],
textarea {
	padding: 0.75em 1em;
	width: 100%;

	&::placeholder {
		color: #999;
		opacity: 1;
	}
}
```

Styles spécifiques pour les champs de texte avec mise en forme des placeholders.

## Zone de Texte (Textarea)

```scss
textarea {
	resize: vertical;
	min-height: 100px;
}
```

Configuration spécifique pour les zones de texte multi-lignes.

## Sélecteurs (Select)

```scss
select {
	padding: 0.75em 2.5em 0.75em 1em;
	appearance: none;
	background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='5'><path fill='%23333' d='M0 0l5 5 5-5z'/></svg>");
	background-repeat: no-repeat;
	background-position: right 1em center;

	&::-ms-expand {
		display: none;
	}
}
```

Personnalisation des menus déroulants avec une flèche personnalisée et suppression de l'apparence native.

## Cases à Cocher et Boutons Radio

```scss
input[type="checkbox"],
input[type="radio"] {
	margin-right: 0.5em;
	cursor: pointer;
}
```

Styles de base pour les cases à cocher et boutons radio.

## Groupes de Formulaire

```scss
.form-group {
	margin-bottom: 1.5em;
}
```

Espacement standard pour les groupes de formulaire.

## Étiquettes

```scss
label {
	display: block;
	margin-bottom: 0.5em;
	font-weight: 500;
}
```

Mise en forme des étiquettes de formulaire.

## Messages d'Erreur

```scss
.form-error {
	color: #d32f2f;
	font-size: 0.875em;
	margin-top: 0.25em;
}
```

Style pour les messages d'erreur de validation.

## Indicateur de Champ Obligatoire

```scss
.required::after {
	content: "*";
	color: #d32f2f;
	margin-left: 0.25em;
}
```

Ajout d'un astérisque pour indiquer les champs obligatoires.

## Formulaire de Contact

```html
<form class="contact-form">
	<div class="form-group">
		<label for="name" class="required">Nom</label>
		<input type="text" id="name" placeholder="Votre nom" required />
	</div>

	<div class="form-group">
		<label for="email" class="required">Email</label>
		<input type="email" id="email" placeholder="votre@email.com" required />
		<div class="form-error">Veuillez entrer une adresse email valide.</div>
	</div>

	<div class="form-group">
		<label for="message">Message</label>
		<textarea id="message" placeholder="Votre message"></textarea>
	</div>

	<button type="submit">Envoyer</button>
</form>
```

## Sélecteur Personnalisé

```html
<div class="form-group">
	<label for="category">Catégorie</label>
	<select id="category">
		<option value="">Choisir une catégorie</option>
		<option value="1">Option 1</option>
		<option value="2">Option 2</option>
	</select>
</div>
```

## Cases à Cocher

```html
<div class="form-group">
	<label>
		<input type="checkbox" name="terms" />
		J'accepte les conditions d'utilisation
	</label>
</div>
```

## Tableau de références

| Élément/Classe           | Description                             | Exemple                                          |
| ------------------------ | --------------------------------------- | ------------------------------------------------ |
| `.form-group`            | Groupe un champ et son label            | `<div class="form-group">...</div>`              |
| `.required`              | Marque un champ comme obligatoire       | `<label class="required">Nom</label>`            |
| `.form-error`            | Message d'erreur pour un champ          | `<div class="form-error">Format incorrect</div>` |
| `input[type="text"]`     | Champ texte simple                      | `<input type="text">`                            |
| `input[type="email"]`    | Champ email                             | `<input type="email">`                           |
| `input[type="password"]` | Champ mot de passe                      | `<input type="password">`                        |
| `input[type="checkbox"]` | Case à cocher                           | `<input type="checkbox">`                        |
| `input[type="radio"]`    | Bouton radio                            | `<input type="radio">`                           |
| `select`                 | Menu déroulant stylisé                  | `<select><option>...</option></select>`          |
| `textarea`               | Zone de texte multi-lignes              | `<textarea>...</textarea>`                       |
| `input:disabled`         | Style des champs désactivés             | `<input disabled />`                             |
| `::placeholder`          | Style des textes d'aide dans les champs | CSS seulement                                    |

## Bonnes pratiques

- Toujours associer les champs à leurs étiquettes avec les attributs `for` et `id`
- Utiliser la classe `.required` pour les champs obligatoires
- Fournir des messages d'erreur explicites avec la classe `.form-error`
- Regrouper les champs connexes dans des `.form-group`
- Utiliser l'attribut `placeholder` pour donner des exemples ou des indications
- Tester l'accessibilité des formulaires avec des lecteurs d'écran

## Compatibilité

Les styles sont conçus pour fonctionner sur tous les navigateurs modernes. Des ajustements spécifiques sont inclus pour assurer la compatibilité avec:

- Chrome, Firefox, Safari, Edge
- Internet Explorer 11 (support de base)
- iOS et Android (appareils mobiles)

## Références

- [MDN - Formulaires HTML](https://developer.mozilla.org/fr/docs/Web/HTML/Element/form)
- [Web Content Accessibility Guidelines (WCAG) - Forms](https://www.w3.org/WAI/tutorials/forms/)
- [ARIA - Pratiques pour les formulaires](https://www.w3.org/TR/wai-aria-practices/#forms)
