import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { fileURLToPath, URL } from 'node:url'
import path from "node:path";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
	"alias": {
		"api": 	fileURLToPath(new URL("./src/api", import.meta.url)),
		"assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
		"components": fileURLToPath(new URL("./src/components", import.meta.url)),
		"router": fileURLToPath(new URL("./src/router", import.meta.url)),
		"store": fileURLToPath(new URL("./src/store", import.meta.url)),
		"styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
		"utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
	}
  },
  css: {
    preprocessorOptions: {
      stylus: {
        additionalData: `@import "${path.resolve(
          __dirname,
          './src/styles/variables'
        )}"`,
      },
    },
  },
})