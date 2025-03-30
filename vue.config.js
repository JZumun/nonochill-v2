const path = require("path");
const CircularDependencyPlugin = require("circular-dependency-plugin");
const PrerenderSpaPlugin = require("prerender-spa-plugin");
const pretty = require("pretty");

require("dotenv").config();

module.exports = {
	baseUrl: "/",
	lintOnSave: false,
	filenameHashing: false,
	configureWebpack: {
		resolve: {
			modules: [
				path.join(__dirname, "src"),
				"node_modules"
			]
		},
		plugins: [
			new CircularDependencyPlugin({
				exclude: /node_modules/,
				failOnError: true,
				cwd: process.cwd()
			}),
		]
	},
	chainWebpack: config => {
		const svgRule = config.module.rule("svg")
		svgRule.uses.clear();

		svgRule.use("svg-inline-loader")
			.loader("svg-inline-loader");

		if (process.env.NODE_ENV === "production") {
			config.plugin("prerender")
				.use(PrerenderSpaPlugin, [
					{
						staticDir: path.join(__dirname, "dist"),
						routes: ["/"],
						postProcess(route) {
							return {
								...route,
								html: pretty(route.html.replace(/\s*<!--\s*-->\s*/g, ""), {
									ocd: true,
									"indent_with_tabs": true,
									"indent_inner_html": false
								})
							}
						}
					}
				])
		}
	}
}