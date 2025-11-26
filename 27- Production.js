// if not using vite or any build tool, make sure to use the production build (dist files that end in .prod.js) when deploying to production.
// Projects scaffolded via create-vue (based on Vite) or Vue CLI (based on webpack) are pre-configured for production builds.
// If using a custom setup, make sure- vue resolves to vue.runtime.esm-bundler.js, process.env.NODE_ENV is replaced with "production" during build.

// Vite Production Build:
// Simply run vite build, By default, it uses <root>/index.html as the build entry point
// By default, the production bundle assumes a modern browser- Chrome >=107, Edge >=107, Firefox >=104, Safari >=16
// You can specify custom targets via the build.target config option, where the lowest target is es2015.
// Legacy browsers can be supported via @vitejs/plugin-legacy, which will automatically generate legacy chunks and corresponding ES language feature polyfills.
// If you are deploying your project under a nested public path, simply specify the base config option and all asset paths will be rewritten accordingly.
// This option can also be specified as a command line flag, e.g. vite build --base=/my/public/path/.
// If you don't know the base path in advance, you may set a relative base path with "base": "./" or "base": "". This will make all generated URLs to be relative to each file.
// Make sure to set Cache-Control: no-cache on the HTML file, otherwise the old assets will be still referenced after solving an error and deploying.
export default defineConfig({
    build: {
        watch: {
            // With the --watch flag enabled, changes to the vite.config.js, as well as any files to be bundled, will trigger a rebuild.
        },
    },
})
// Vite provides experimental support for advanced base options during build, using experimental.renderBuiltUrl.
// We can set multiple assets base url there like window base and cdn base.
// experimental: {
//     renderBuiltUrl(filename, { hostId, hostType, type }) {
//         if (type === 'public') {
//             return 'https://www.domain.com/' + filename
//         } else if (path.extname(hostId) === '.js') {
//             return {
//                 runtime: `window.__assetsPath(${JSON.stringify(filename)})`
//             }
//         } else {
//             return 'https://cdn.domain.com/assets/' + filename
//         }
//     },
// },


// Vite Static Deployment:
// In package.json
// {
//     "scripts": {
//         "build": "vite build",
//             "preview": "vite preview"
//     }
// }
// vite preview is intended for previewing the build locally and not meant as a production server.
// You may run npm run build command to build the app.
// By default, the build output will be placed at dist. You may deploy this dist folder to any of your preferred platforms.
// Once you've built the app, you may test it locally by running npm run preview command.
// The vite preview command will boot up a local static web server that serves the files from dist at http://localhost:4173.
// It's an easy way to check if the production build looks OK in your local environment.
// Changing Port: "preview": "vite preview --port 8080"
// To deploy by github pages; update vite config, enable github pags, crate a deploy.yml workflow
// Also for others like git lab, azure, cloudfare also configuring- see documentation.

// Tracking Runtime Errors:
app.config.errorHandler = (err, instance, info) => {
    // report error to tracking services
}
// Or , use Sentry or Bugsnag third party package to handle errors

// Using Sentry:
// Sentry can be used for real time error detection, detailed context, actionable insights, session replay, performance checking, component tracking, end-t--end tracing
// Need a sentry acccount and pages, application up and running.
// Install the Sentry SDK -> Configure -> Configure for Pinia -> Add Readable Stack Traces With Source Maps (Optional) ->  Avoid Ad Blockers With Tunneling (Optional) -> Verify Your Setup
// Documentation: https://docs.sentry.io/platforms/javascript/guides/vue/#step-3-add-readable-stack-traces-with-source-maps-optional

// Also there is Bugsnag for the same purpose.