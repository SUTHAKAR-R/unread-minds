/** @type {import("snowpack").SnowpackUserConfig } */
export default {
	mount: {
		public: '/',
		src: '/dist'
	},
	plugins: [
		// sass/scss
	],
	routes: [
		/* Enable an SPA Fallback in development: */
		{"match": "routes", "src": ".*", "dest": "/index.html"},
	],
	optimize: {
		/* Example: Bundle your final build: */
		// "bundle": true,
	},
	packageOptions: {
		/* ... */
	},
	devOptions: {
		port: 3000
	},
	buildOptions: {
		/* ... */
	},
};
