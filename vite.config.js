import { defineConfig } from 'vite'
import createVuePlugin from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { fileURLToPath, URL } from 'node:url'

const path = (relativePath) => fileURLToPath(new URL(relativePath, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
		createVuePlugin(), 
  		svgLoader({
			defaultImport: "raw"
  		})
	],
  resolve: {
	"alias": {
		"v-hotkey": "v-hotkey3",
		"api": 	path("./src/api"),
		"assets": path("./src/assets"),
		"components": path("./src/components"),
		"router": path("./src/router"),
		"store": path("./src/store"),
		"styles": path("./src/styles"),
		"utils": path("./src/utils"),
	}
  },
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: `@import "${path("./src/styles/variables")}"`.replace(/\\/g, "/"),
      },
    },
  },
})
