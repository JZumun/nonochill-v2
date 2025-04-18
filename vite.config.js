import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import svgLoader from 'vite-svg-loader'
import { fileURLToPath, URL } from 'node:url'

const path = (relativePath) => fileURLToPath(new URL(relativePath, import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader({
	defaultImport: "raw"
  })],
  resolve: {
	"alias": {
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
