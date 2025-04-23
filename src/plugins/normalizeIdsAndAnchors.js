import slugify from "slugify";
import {visit} from "unist-util-visit";

// Options de slugification
const slugifyOptions = {
	lower: true,
	strict: true,
	locale: "fr",
	remove: /[*+~.()'"!:@]/g, // Supprimer certains caractères spéciaux
};

// Fonction personnalisée de slugification
export function customSlugify(text) {
	// Décoder les caractères URL-encodés avant la slugification
	try {
		const decoded = decodeURIComponent(text);
		return slugify(decoded, slugifyOptions);
	} catch (e) {
		// En cas d'erreur de décodage, slugify directement
		return slugify(text, slugifyOptions);
	}
}

// Plugin Rehype pour normaliser les IDs et les liens
export function rehypeNormalizeIdsAndAnchors() {
	return (tree) => {
		// 1. Normaliser tous les IDs
		visit(tree, "element", (node) => {
			if (node.properties && node.properties.id) {
				// Slugifier l'ID
				node.properties.id = customSlugify(node.properties.id);
			}
		});

		// 2. Normaliser tous les liens d'ancrage
		visit(tree, "element", (node) => {
			if (node.tagName === "a" && node.properties && node.properties.href && node.properties.href.startsWith("#")) {
				// Récupérer l'ancre sans le #
				const anchor = node.properties.href.substring(1);

				// Slugifier l'ancre et mettre à jour l'URL
				const normalizedAnchor = customSlugify(anchor);
				node.properties.href = `#${normalizedAnchor}`;
			}
		});
	};
}
