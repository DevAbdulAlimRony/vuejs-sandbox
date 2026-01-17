// Vite is a build tool to provide afaster and leaner development experince.
// Two major parts: A dev server, a build command that bundles your code.
// Vite injects some runtime code to make the development server work.
// Vite pre-bundles dependencies using esbuild. esbuild is written in Go and pre-bundles dependencies 10-100x faster than JavaScript-based bundlers.

// Project: npm create vite@latest
// Manual Install: npm install -D vite
// During development Vite is a server, and index.html is the entry point to your application.
// Defining command line interface in package.jso:
// {
//     "scripts": {
//         "dev": "vite", // start dev server, aliases: `vite dev`, `vite serve`
//         "build": "vite build", // build for production
//         "preview": "vite preview" // locally preview production build
//   There are other cli options like ssr, port, host etc.
//     }
// }

// Features:
// npm dependency resolving and pre-bundling.
// Hot Module Replacement
// Typescript support and Compiler options.
// Simple to build single-page and multi-page applications.
// All modern frameworks maintain integrations with Vite.
// .jsx and .tsx files are also supported out of the box.
// Importing .css files will inject its content to the page via a <style> tag with HMR support.
// If the project contains valid PostCSS config (any format supported by postcss-load-config, e.g. postcss.config.js), it will be automatically applied to all imported CSS.
// Any CSS file ending with .module.css is considered a CSS modules file.
// Vite targets modern browsers only, it is recommended to use native CSS variables with PostCSS plugins that implement CSSWG drafts (e.g. postcss-nesting) and author plain, future-standards-compliant CSS.
// If using Vue single file components, this also automatically enables <style lang="sass"> et al.
// Vite improves @import resolving for Sass and Less so that Vite aliases are also respected.
// Can also use CSS modules combined with pre-processors by prepending .module to the file extension, for example style.module.scss.
// Insteda of postcss, we can use lightning css also.
// Vite automatically extracts the CSS used by modules in an async chunk and generates a separate file for it.
//  The CSS file is automatically loaded via a <link> tag when the associated async chunk is loaded,
// When you install a modern Laravel project (especially using Laravel Vite, which is the current standard), PostCSS support is included automatically.
// npx tailwindcss init -p, which creates the PostCSS configuration for tailwind.

// If we don't want any css to inject into a page: Use ?inline
import otherStyles from './bar.css?inline'

// Static Assets:
import imgUrl from './img.png'

// Importing json files:
import json from './example.json' // Entire object
import { field } from './example.json' // import a root field as named exports - helps with tree-shaking!

// Importing multiple modules:
const modules = import.meta.glob('./dir/*.js')
// Matched files are by default lazy-loaded via dynamic import and will be split into separate chunks during build.
// Can pass eager if imported all modules directly:
const modules2 = import.meta.glob('./dir/*.js', { eager: true })
const modules3 = import.meta.glob(['./dir/*.js', './another/*.js'])

// Named Imports:
const modules4 = import.meta.glob('./dir/*.js', { import: 'setup', eager: true });
// set  import : 'default': It will import the default export

// Also can import custom query by option:  query : '?raw',
// Can give base: options to use base path.

// Dynamic Import:
const module5 = await import(`./dir/${file}.js`)

// Importing Web Worker:
const worker = new Worker(new URL('./worker.js', import.meta.url))

// Adding a Plugin: To use a plugin:
// needs to be added to the devDependencies of the project. Exmp: laravel-vite-plugin, @vitejs/plugin-vue for a laravel vue application.
// Include in the plugins array in the vite.config.js file.
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                "resources/css/preloader.css",
                "resources/js/admin/js/app.js",
                "resources/js/user/js/app.js"
            ],
            refresh: true,

            // If need pre build: enforce: 'pre'
            // If only use during build or serve: apply: 'build'
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
});

// Vite caches the pre-bundled dependencies in node_modules/.vite
// Resolved dependency requests are strongly cached with HTTP headers max-age=31536000,immutable to improve page reload performance during dev.

// Vite emits vite:preloadError event when it fails to load dynamic imports.
// Enable rollup watcher with vite build --watch, or use build: {watch: {}} options in defineConfig({})

//* ENV Variables:
// Vite exposes certain constants under the special import.meta.env object.
// import.meta.env.MODE
// import.meta.env.BASE_URL, .PROD, .DEV, .SSR
// import.meta.enc.CUTOM_KEY
// Now Access in HTML: <h2>Using data from %VITE_API_URL%</h2>
// vite build --mode development

//* Server Side Rendering:
// The index.html will need to reference entry-client.js and include a placeholder where the server-rendered markup should be injected
// Maybe we can check logic if SSR enabled then import the entry-client in index.html: if (import.meta.env.SSR) {
// To ship an SSR project for production: in json scripts:  "build:client": "vite build --outDir dist/client", "build:server": "vite build --outDir dist/server --ssr src/entry-server.js"
// SSG: If the routes and the data needed for certain routes are known ahead of time, we can pre-render these routes into static HTML using the same logic as production SSR.
// For vue reat type plugin, To support conditional transforms, Vite passes an additional ssr property in the options object of the following plugin hooks: resolveId, load, transform.

//* Backend Integration:
// export default defineConfig({
//     server: {
//         cors: {
// the origin you will be accessing via browser
//             origin: 'http://my-backend.example.com',
//         },
//     },
//     build: {
//         generate .vite/manifest.json in outDir
//         manifest: true,
//         rollupOptions: {
//  overwrite default .html entry
//             input: '/path/to/main.js',
//         },
//     },
// })
// Import app.js below in your main entry point like index.html.
