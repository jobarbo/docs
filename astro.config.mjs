// @ts-check
import {defineConfig} from "astro/config";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
	site: "https://docs.example.com",
	trailingSlash: "never",
	integrations: [],
	markdown: {
		remarkPlugins: [remarkGfm],
		rehypePlugins: [rehypeSlug],
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
