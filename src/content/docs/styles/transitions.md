---
title: "Transitions"
description: "Les courbes d'accélération pour les animations et transitions"
order: 7
section: "styles"
---

# Wiki des Transitions et Easings SCSS

Ce guide détaille les variables d'easing et les courbes de Bézier disponibles dans notre framework SCSS (`_transitions.scss`), comment elles fonctionnent et comment les utiliser pour créer des animations élégantes et professionnelles.

## Sommaire

1. [Principe fondamental](#principe-fondamental)
2. [Types de courbes d'easing](#types-de-courbes-deasing)
3. [Utilisation des easings](#utilisation-des-easings)
4. [Combinaison avec d'autres propriétés](#combinaison-avec-dautres-propriétés)
5. [Cas d'utilisation réels](#cas-dutilisation-réels)
6. [Référence complète des variables](#référence-complète-des-variables)

## Principe fondamental

Les transitions et animations CSS sont essentielles pour créer une expérience utilisateur fluide et agréable. Cependant, les mouvements linéaires (vitesse constante) paraissent souvent artificiels et peu naturels.

Les courbes de Bézier, définies via la fonction `cubic-bezier()` en CSS, permettent de créer des transitions qui accélèrent, décélèrent ou combinent différents rythmes, imitant ainsi les mouvements du monde réel.

Notre fichier `_transitions.scss` fournit un ensemble complet de variables d'easing prédéfinies et optimisées qui :

- Apportent un mouvement naturel et subtil à vos interfaces
- Offrent une cohérence visuelle à travers votre site
- Éliminent la nécessité de se souvenir des valeurs complexes des courbes de Bézier
- Permettent de choisir précisément le type de mouvement souhaité pour chaque situation

## Types de courbes d'easing

Les courbes d'easing sont regroupées en plusieurs familles, chacune offrant un style de mouvement distinct :

### Ease In (entrée progressive)

Ces courbes commencent lentement puis accélèrent. Idéales pour les éléments qui quittent l'écran ou disparaissent.

```scss
// Exemple
.element {
	transition: opacity 0.3s $easeInCubic;
}
```

### Ease Out (sortie progressive)

Ces courbes commencent rapidement puis ralentissent vers la fin. Parfaites pour les éléments qui apparaissent ou entrent dans l'écran.

```scss
// Exemple
.element {
	transition: transform 0.4s $easeOutQuart;
}
```

### Ease In-Out (entrée-sortie progressive)

Ces courbes combinent les deux approches : elles commencent lentement, accélèrent au milieu, puis ralentissent à la fin. Idéales pour les animations qui restent visibles pendant toute leur durée.

```scss
// Exemple
.element {
	transition: all 0.5s $easeInOutSine;
}
```

### Familles spéciales

Certaines familles comme "Back" ajoutent des effets plus dramatiques, comme un léger dépassement avant d'atteindre la position finale.

```scss
// Exemple avec dépassement
.button:hover {
	transform: scale(1.05);
	transition: transform 0.3s $easeOutBack;
}
```

## Utilisation des easings

### Syntaxe de base

```scss
.element {
	// Propriété, durée, fonction d'easing
	transition: opacity 0.3s $easeOutQuint;
}
```

### Pour les transitions au survol

```scss
.button {
	background-color: $blue;
	transition: background-color 0.3s $easeInOutQuad;

	&:hover {
		background-color: darken($blue, 10%);
	}
}
```

### Pour les animations keyframes

```scss
@keyframes fadeIn {
	0% {
		opacity: 0;
		transform: translateY(20px);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

.element {
	animation: fadeIn 0.5s $easeOutCubic forwards;
}
```

## Combinaison avec d'autres propriétés

### Délais de transition

Vous pouvez ajouter un délai avant le démarrage de la transition :

```scss
.element {
	transition: opacity 0.3s $easeOutQuint 0s, // Pas de délai
		transform 0.4s $easeOutBack 0.1s; // Délai de 0.1s
}
```

### Transitions multiples

Pour animer plusieurs propriétés avec différentes durées et courbes d'easing :

```scss
.card {
	transition: transform 0.4s $easeOutBack, box-shadow 0.3s $easeOutSine, background-color 0.2s $easeInOutQuad;

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
		background-color: lighten($card-bg, 5%);
	}
}
```

### Avec les media queries

Adaptez vos transitions en fonction des appareils :

```scss
.element {
	transition: transform 0.4s $easeOutQuint;

	@include mobile-only {
		// Transitions plus rapides sur mobile pour une réactivité accrue
		transition: transform 0.2s $easeOutQuint;
	}
}
```

## Cas d'utilisation réels

### Bouton interactif

```scss
.btn {
	padding: 12px 24px;
	background: $primary;
	color: $white;
	border-radius: 4px;
	transition: transform 0.3s $easeOutBack, background-color 0.3s $easeInOutQuad;

	&:hover {
		transform: scale(1.05);
		background-color: darken($primary, 10%);
	}

	&:active {
		transform: scale(0.98);
		transition: transform 0.1s $easeOutQuad; // Transition plus rapide pour feedback immédiat
	}
}
```

### Navigation avec slide-in

```scss
.nav-item {
	opacity: 0;
	transform: translateX(-20px);
	transition: opacity 0.5s $easeOutQuint, transform 0.5s $easeOutBack;

	// Ajouter un délai incrémental à chaque élément
	@for $i from 1 through 5 {
		&:nth-child(#{$i}) {
			transition-delay: 0.1s * $i;
		}
	}

	&.is-visible {
		opacity: 1;
		transform: translateX(0);
	}
}
```

### Accordéon

```scss
.accordion {
	&__content {
		max-height: 0;
		overflow: hidden;
		transition: max-height 0.5s $easeOutQuart;
	}

	&.is-open &__content {
		max-height: 500px; // Valeur suffisamment grande
	}

	&__icon {
		transform: rotate(0deg);
		transition: transform 0.3s $easeInOutBack;
	}

	&.is-open &__icon {
		transform: rotate(180deg);
	}
}
```

### Galerie d'images avec fade

```scss
.gallery-item {
	opacity: 0;
	transform: scale(0.9);

	&.is-loaded {
		opacity: 1;
		transform: scale(1);
		transition: opacity 0.5s $easeOutQuint, transform 0.5s $easeOutBack;
	}

	&:hover {
		transform: scale(1.03);
		transition: transform 0.3s $easeOutBack;
	}
}
```

## Référence complète des variables

### Cubic

| Variable          | Description                       | Courbe de Bézier                       | Visuel du mouvement                                |
| ----------------- | --------------------------------- | -------------------------------------- | -------------------------------------------------- |
| `$easeInCubic`    | Accélération cubique en entrée    | cubic-bezier(0.55, 0.055, 0.675, 0.19) | Commence doucement, puis accélère de façon marquée |
| `$easeOutCubic`   | Décélération cubique en sortie    | cubic-bezier(0.215, 0.61, 0.355, 1)    | Commence rapidement, puis ralentit progressivement |
| `$easeInOutCubic` | Accélération/décélération cubique | cubic-bezier(0.645, 0.045, 0.355, 1)   | Entrée douce, vitesse au milieu, sortie douce      |

### Circ

| Variable         | Description                          | Courbe de Bézier                       | Visuel du mouvement                                     |
| ---------------- | ------------------------------------ | -------------------------------------- | ------------------------------------------------------- |
| `$easeInCirc`    | Accélération circulaire en entrée    | cubic-bezier(0.6, 0.04, 0.98, 0.335)   | Départ très lent, puis accélération abrupte             |
| `$easeOutCirc`   | Décélération circulaire en sortie    | cubic-bezier(0.075, 0.82, 0.165, 1)    | Très rapide au début, puis décélération douce et longue |
| `$easeInOutCirc` | Accélération/décélération circulaire | cubic-bezier(0.785, 0.135, 0.15, 0.86) | Transition douce et arrondie                            |

### Expo

| Variable         | Description                             | Courbe de Bézier                       | Visuel du mouvement                                             |
| ---------------- | --------------------------------------- | -------------------------------------- | --------------------------------------------------------------- |
| `$easeInExpo`    | Accélération exponentielle en entrée    | cubic-bezier(0.95, 0.05, 0.795, 0.035) | Très lent au début, puis accélération extrême                   |
| `$easeOutExpo`   | Décélération exponentielle en sortie    | cubic-bezier(0.19, 1, 0.22, 1)         | Extrêmement rapide au début, puis décélération très progressive |
| `$easeInOutExpo` | Accélération/décélération exponentielle | cubic-bezier(1, 0, 0, 1)               | Changement de vitesse drastique, effet dramatique               |

### Quad

| Variable         | Description                           | Courbe de Bézier                        | Visuel du mouvement             |
| ---------------- | ------------------------------------- | --------------------------------------- | ------------------------------- |
| `$easeInQuad`    | Accélération quadratique en entrée    | cubic-bezier(0.55, 0.085, 0.68, 0.53)   | Accélération douce et naturelle |
| `$easeOutQuad`   | Décélération quadratique en sortie    | cubic-bezier(0.25, 0.46, 0.45, 0.94)    | Décélération douce et naturelle |
| `$easeInOutQuad` | Accélération/décélération quadratique | cubic-bezier(0.455, 0.03, 0.515, 0.955) | Mouvement équilibré et subtil   |

### Quart

| Variable          | Description                         | Courbe de Bézier                       | Visuel du mouvement                       |
| ----------------- | ----------------------------------- | -------------------------------------- | ----------------------------------------- |
| `$easeInQuart`    | Accélération quartique en entrée    | cubic-bezier(0.895, 0.03, 0.685, 0.22) | Départ très lent, puis forte accélération |
| `$easeOutQuart`   | Décélération quartique en sortie    | cubic-bezier(0.165, 0.84, 0.44, 1)     | Départ rapide, puis longue décélération   |
| `$easeInOutQuart` | Accélération/décélération quartique | cubic-bezier(0.77, 0, 0.175, 1)        | Mouvement prononcé avec forte amplitude   |

### Quint

| Variable          | Description                         | Courbe de Bézier                       | Visuel du mouvement                                     |
| ----------------- | ----------------------------------- | -------------------------------------- | ------------------------------------------------------- |
| `$easeInQuint`    | Accélération quintique en entrée    | cubic-bezier(0.755, 0.05, 0.855, 0.06) | Départ extrêmement lent, puis accélération très forte   |
| `$easeOutQuint`   | Décélération quintique en sortie    | cubic-bezier(0.23, 1, 0.32, 1)         | Départ très rapide, puis décélération extrêmement douce |
| `$easeInOutQuint` | Accélération/décélération quintique | cubic-bezier(0.86, 0, 0.07, 1)         | Effet dramatique avec fort contraste de vitesse         |

### Sine

| Variable         | Description                           | Courbe de Bézier                      | Visuel du mouvement                   |
| ---------------- | ------------------------------------- | ------------------------------------- | ------------------------------------- |
| `$easeInSine`    | Accélération sinusoïdale en entrée    | cubic-bezier(0.47, 0, 0.745, 0.715)   | Accélération très douce et subtile    |
| `$easeOutSine`   | Décélération sinusoïdale en sortie    | cubic-bezier(0.39, 0.575, 0.565, 1)   | Décélération très douce et subtile    |
| `$easeInOutSine` | Accélération/décélération sinusoïdale | cubic-bezier(0.445, 0.05, 0.55, 0.95) | Transition la plus douce et naturelle |

### Back

| Variable         | Description                        | Courbe de Bézier                        | Visuel du mouvement                         |
| ---------------- | ---------------------------------- | --------------------------------------- | ------------------------------------------- |
| `$easeInBack`    | Mouvement de recul en entrée       | cubic-bezier(0.6, -0.28, 0.735, 0.045)  | Recule légèrement avant de commencer        |
| `$easeOutBack`   | Mouvement de dépassement en sortie | cubic-bezier(0.175, 0.885, 0.32, 1.275) | Dépasse sa position finale avant de revenir |
| `$easeInOutBack` | Recul et dépassement               | cubic-bezier(0.68, -0.55, 0.265, 1.55)  | Recule au début et dépasse à la fin         |

## Recommandations d'utilisation

Pour choisir la courbe d'easing appropriée, voici quelques règles générales :

1. **Pour les éléments qui apparaissent**

   - Préférez les versions `easeOut` (décélération)
   - Exemple : `$easeOutQuint`, `$easeOutCubic`

2. **Pour les éléments qui disparaissent**

   - Préférez les versions `easeIn` (accélération)
   - Exemple : `$easeInCubic`, `$easeInQuad`

3. **Pour les transformations visibles durant toute l'animation**

   - Préférez les versions `easeInOut`
   - Exemple : `$easeInOutQuad`, `$easeInOutSine`

4. **Pour les effets ludiques ou avec caractère**

   - Utilisez les courbes `Back` pour un effet de rebond
   - Utilisez les courbes `Expo` ou `Quint` pour des effets dramatiques

5. **Pour les microinteractions subtiles**
   - Préférez les courbes douces comme `Sine` ou `Quad`
   - Durée recommandée : 200-300ms

---

En utilisant ces courbes d'easing de manière cohérente dans votre projet, vous créerez des interfaces avec des animations naturelles et élégantes qui améliorent l'expérience utilisateur sans être distrayantes.
