//Advantages of Server Side Rendering:
    //1. Faster Time to Content
    //2. Unified Mental Model
    //3. Better SEO

//Static Site Generation (SSG), also referred to as pre-rendering, is another popular technique for building fast websites. If the data needed to server-render a page is the same for every user, then instead of rendering the page every time a request comes in, we can render it only once, ahead of time, during the build process. Pre-rendered pages are generated and served as static HTML files.

import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'

//To make the client-side app interactive, Vue needs to perform the hydration step. To mount an app in hydration mode, we need to use createSSRApp() instead of createApp()

//Frameworks: Nuxt, Quasar, Vite SSR: Vite provides built-in support for Vue server-side rendering, but it is intentionally low-level.

//There is no user interaction and no DOM updates, so reactivity is unnecessary on the server. By default, reactivity is disabled during SSR for better performance.

//lifecycle hooks such as onMounted or onUpdated will NOT be called during SSR and will only be executed on the client.

//