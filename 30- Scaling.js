// SFC: Single File Component. We used html, css, js in a single file and use that component.

// Tooling:
// Vite is a lightweight and fast build tool with first - class Vue SFC support.
// The recommended IDE setup is VS Code + the Vue - Official extension (previously Volar).
// he extension provides syntax highlighting, TypeScript support, and intellisense for template expressions and component props.
// The Vue browser devtools extension allows you to explore a Vue app's component tree, inspect the state of individual components, track state management events, and profile performance.
// The Vue team maintains eslint-plugin-vue, an ESLint plugin that supports SFC-specific linting rules.

// Routing
// Server-Side Routing : Routing on the server side means the server is sending a response based on the URL path that the user is visiting.
// Client Side Routing: In such SPAs, the "routing" is done on the client side, in the browser. A client-side router is responsible for managing the application's rendered view using browser APIs such as History API or the hashchange event.

// State Management:
// Technically, every Vue component instance already "manages" its own reactive state.
// The state, the source of truth that drives our app;
// The view, a declarative mapping of the state;
// The actions, the possible ways the state could change in reaction to user inputs from the view.
// But, Multiple views may depend on the same piece of state. and  Actions from different views may need to mutate the same piece of state.
// If you have a piece of state that should be shared by multiple instances, you can use reactive() to create a reactive object, and then import it into multiple components
import { reactive } from 'vue'

export const store = reactive({
    count: 0
})

// Pinia is a state management library that implements all of the above. It is maintained by the Vue core team, and works with both Vue 2 and Vue 3.
// Vuex is now in maintenance mode. It still works, but will no longer receive new features. It is recommended to use Pinia for new applications.

// Testing: Unit Testing, Component Testing, End to End Testing(Cross Browser Testing, Faster Feedback Loops, First Class Debugging Experience, Visibility in Headless mode.).
// Plugins: Vitest, Jest, Cypress Component Testing, Playright (E2E testing), Cypress E2E Testing.

// SSR: Rather than client-side, it is also possible to render the same components into HTML strings on the server, send them directly to the browser, and finally "hydrate" the static markup into a fully interactive app on the client.
// Advantage: Faster Time To Content, s more prominent on slow internet or slow devices, Server-rendered markup doesn't need to wait until all JavaScript has been downloaded and executed to be displayed
// Data fetching is done on the server-side for the initial visit, which likely has a faster connection to your database than the client.
// his generally results in improved Core Web Vitals metrics, better user experience, and can be critical for applications where time-to-content is directly associated with conversion rate.
// Better SEO: the search engine crawlers will directly see the fully rendered page.
// a server-rendered app requires an environment where a Node.js server can run.
//  Rendering a full app in Node.js is going to be more CPU-intensive than just serving static files, so if you expect high traffic, be prepared for corresponding server load and wisely employ caching strategies.
// More involved build setup and deployment requirements.
//  in cases where time-to-content is absolutely critical, SSR can help you achieve the best possible initial load performance.


// SSG (Static Site Generation):
// If the data needed to server-render a page is the same for every user, then instead of rendering the page every time a request comes in, we can render it only once, ahead of time, during the build process.
// It provides great time-to-content performance.
// It is cheaper and easier to deploy than SSR apps because the output is static HTML and assets.
// The keyword here is static: SSG can only be applied to pages providing static data, i.e. data that is known at build time and can not change between requests. Every time the data changes, a new deployment is needed.
// If you're only investigating SSR to improve the SEO of a handful of marketing pages (e.g. /, /about, /contact, etc.), then you probably want SSG instead of SSR. SSG is also great for content-based websites such as documentation sites or blogs.

// Higher Level Solutions:
// Nuxt is a higher-level framework built on top of the Vue ecosystem which provides a streamlined development experience for writing universal Vue applications.
// Quasar is a complete Vue-based solution that allows you to target SPA, SSR, PWA, mobile app, desktop app, and browser extension all using one codebase, all provide material UI Components.

// How saas is working in vue, how to use it. and Why use saas?
