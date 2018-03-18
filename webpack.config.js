var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var PrerenderSpaPlugin = require("prerender-spa-plugin");
var pretty = require("pretty");

module.exports = {
	entry: "./src/main.js",
	output: {
		path: path.resolve(__dirname, "./dist"),
		publicPath: "/dist/",
		filename: "build.js"
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					loaders: {
					}
					// other vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: "file-loader",
				options: {
					name: "[name].[ext]?[hash]"
				}
			},
			{
				test: /\.(css)$/,
				use: [
					"style-loader",
					"css-loader"
				]
			}
		]
	},
	resolve: {
		modules: [
			path.resolve("./src"),
			path.resolve("./node_modules")
		]
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	performance: {
		hints: false
	},
	devtool: "#eval-source-map",
	plugins: [
		new webpack.NamedModulesPlugin()
	]
};

if (process.env.NODE_ENV === "production") {
	module.exports.devtool = "#source-map";
	// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.module.rules[0].options.extractCSS = true;
	module.exports.plugins = [
		new ExtractTextPlugin("app.css"),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: "\"production\""
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			filename: "vendor.js",
			minChunks: function (module) {
				return module.context && module.context.indexOf("node_modules") !== -1;
			}
		}),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		}),
		new PrerenderSpaPlugin(path.join(__dirname), ["/"], {
			postProcessHtml ({ html }) {
				return pretty(html.replace(/\s*<!--\s*-->\s*/g, ""), {
					ocd: true,
					"indent_with_tabs": true,
					"indent_inner_html": false
				});
			}
		})
	];
}
