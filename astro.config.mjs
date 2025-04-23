// @ts-check
import {defineConfig} from "astro/config";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import slugify from "slugify";
import {rehypeNormalizeIdsAndAnchors} from "./src/plugins/normalizeIdsAndAnchors.js";

// Fonction de slugification personnalisée
function customSlugify(text) {
	return slugify(text, {
		lower: true,
		strict: true,
		locale: "fr",
	});
}

// https://astro.build/config
export default defineConfig({
	site: "https://docs.example.com",
	trailingSlash: "never",
	integrations: [],
	markdown: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [[rehypeSlug, {slug: customSlugify}], rehypeNormalizeIdsAndAnchors],
		shikiConfig: {
			theme: "github-dark",
			wrap: true,
		},
	},
	vite: {
		ssr: {
			noExternal: [],
		},
	},
});
