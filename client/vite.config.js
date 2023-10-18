import { defineConfig } from "vite";
// const { resolve } = require('path')


export default defineConfig({
	root: './',
	base: '',
	build: {
		outDir: './dist', //  путь относительно root
		emptyOutDir: true,
	},
	publicDir: './public',
})
