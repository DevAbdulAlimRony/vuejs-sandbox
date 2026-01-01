// Vue Router is the official client-side routing solution for Vue.
// Client-side routing is used by single-page applications (SPAs) to tie the browser URL to the content seen by the user.
// npm install vue-router@4

// Creating router instance:
import { createMemoryHistory, createRouter } from 'vue-router'
const routes = [
    { path: '/', component: HomeView },
]
export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

// The history option controls how routes are mapped onto URLs and vice versa.
// createMemoryHistory(), which ignores the browser URL entirely and uses its own internal URL instead.

// Register the Route Plugin Globally
createApp(App).use(router).mount('#app')

// If we're using the Options API, we can access these same two properties as this.$router and this.$route in our JavaScript code.
// goToAbout() {this.$router.push('/about')}
// In composition api: import { useRoute, useRouter } from 'vue-router'

// The components RouterView and RouterLink are both registered globally, so they don't need to be imported before using them in component templates.

// Dynamic Route Matching:
// path: '/users/:id', component: User }
// {{ $route.params.id }}
// /users/:username, /users/:username/posts/:postId
// Reacting to Params Changes: watch the params.id or use beforeRouteUpdate
import { onBeforeRouteUpdate } from 'vue-router'
onBeforeRouteUpdate(async (to, from) => {
    userData.value = await fetchUser(to.params.id)
})

// 404 Not Found:
// All Paths: { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
// Match /user- : { path: '/user-:afterUser(.*)', component: UserGeneric }

// { path: '/:orderId(\\d+)' } : Only matches numbers for that regex.
// { path: '/:chapters+' }: matches /one, /one/two, /one/two/three, etc
// { path: '/:chapters*' }: matches /, /one, /one/two, /one/two/three, etc
// { path: '/:chapters(\\d+)+' }: matches /1, /1/2, etc
// { path: '/:chapters(\\d+)*' }

// By default, all routes are case-insensitive and match routes with or without a trailing slash.
// a route /users matches /users, /users/, and even /Users/.
// But can be configured by strict and sensitive options.
//  { path: '/users/:id', sensitive: true }:
// users/posva/ because of strict: true
// /Users/posva because of sensitive: true
// { path: '/users/:id?' }: will match /users, /Users, and /users/42 but not /users/ or /users/42/
// const router = (routes: [], strict: true)
// Optional Parameters: { path: '/users/:userId?' }
// When using custom regex, make sure to avoid using slow regex patterns. like .*!SECTION

// Named Routes:
const routes2 = [
    {
        path: '/user/:username',
        name: 'profile',
        component: User
    }
]

// Access: <router-link :to="{ name: 'profile', params: { username: 'erina' } }">
// router.push({ name: 'profile', params: { username: 'erina' } })

// Nested Routes:
const routes3 = -[
    {
        path: '/user/:id',
        component: User,
        children: [
            {
                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                path: 'profile',
                component: UserProfile,
            },
        ],
    },
]

// To navigate to a different URL, use router.push.
// This method pushes a new entry into the history stack, so when the user clicks the browser back button they will be taken to the previous URL.
// router.push('/users/eduardo')
// router.push({ name: 'user', params: { username: 'eduardo' } })
// router.push({ path: '/register', query: { plan: 'private' } })
// router.push({ path: '/about', hash: '#team' }) , /about#item.
// router.push(`/user/${username}`)
// objects, booleans, etc) will be automatically stringified. for params value
// you can provide an empty string ("") or null as the value to remove it.
// router.push({ path: '/home', replace: true }) or router.replace({ path: '/home' }): Navigates without pushing a new history entry, replaces the current entry.

// Traverse History: a single integer as parameter that indicates by how many steps to go forward or go backward in the history stack, similar to window.history.go(n)
// go forward by one record, the same as router.forward()
router.go(1)
// go back by one record, the same as router.back()
router.go(-1)
// fails silently if there aren't that many records
router.go(-100)
router.go(100);

// They actually came from  window.history.pushState, window.history.replaceState and window.history.go, and they do imitate the window.history APIs.

// Named Views
routes4: [
    {
        path: '/',
        components: {
            default: Home,
            // short for LeftSidebar: LeftSidebar
            LeftSidebar,
            // they match the `name` attribute on `<router-view>`
            RightSidebar,
        },

        children: [
            {
                path: 'profile',
                components: {
                    default: UserProfile,
                    helper: UserProfilePreview
                }
            }
        ]
    }]
// < router - view class="view left-sidebar" name = "LeftSidebar" />

// Redirecting: A redirect means when the user visits /home, the URL will be replaced by /, and then matched as /
// const routes = [{ path: '/home', redirect: '/' }]
// const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
// Can also use function: redirect: to => {}

// Alias: An alias of / as /home means when the user visits /home, the URL remains /home, but it will be matched as if the user is visiting /.
// const routes = [{ path: '/', component: Homepage, alias: '/home' }]
// { path: '', component: UserList, alias: ['/people', 'list'] }: Render lists for /users, /users/list, /people
// { path: 'profile', component: UserDetails, alias: ['/:id', ''] }:  /users/24, /users/24/profile, /24

// $route.params.id This makes tight coupling, can use props binding.
// { path: '/user/:id', component: User, props: true }: id the props of the component
// When props is set to true, the route.params will be set as the component props
// { path: '/user/:id', components: { default: User, sidebar: Sidebar }, props: { default: true, sidebar: false }}
// props: { newsletterPopup: false }: If props is object, it will be set as the component props, useful when props are static.
// props: route => ({ query: route.query.q })
// <RouterView v-slot="{ Component }"> <component  :is="Component"  view-prop="value"/>...


// The RouterLink component adds two CSS classes to active links, router-link-active and router-link-exact-active.
// An exact match does not include ancestor routes. Like /user and /user/id both will be active.
// <RouterLink activeClass="" exactActiveClass="" />
// Default class can be overriden when create instance of the router: const router = createRouter({   linkActiveClass: 'border-indigo-500',...

// History Modes:
// HTML5 history mode: history: createWebHistory():
// Has History Mode:  history: createWebHashHistory()- It uses a hash character (#) before the actual URL that is internally passed.
// Memory Mode:  doesn't interact with the URL nor automatically triggers the initial navigation.
// For memory mode, there will be no history, meaning you won't be able to go back or forward.

// Navigation Guards: Like a Middleware to redirect or cancel the route.
// Global Before Guard- for each route:
router.beforeEach((to, from, next) => {
    // to is target route location
    // from is the currect route location
    // can be async (to, from) if we have any asynchronous method inside.
    // next is the optional third argument
    // optional return false: cancel the current navigation.
    if (
        !isAuthenticated &&
        to.name !== 'Login'
    ) {
        return { name: 'Login' }
    }

    // Or,
    if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
    else next()
})

// beforeResolve: same as beforeEach, will work for every navigation. But
// Resolve guards are called right before the navigation is confirmed, after all in-component guards and async route components are resolved.
router.beforeResolve(async to => { })

// Also global afterEach(): useful for analytics, changing the title of the page, accessibility features like announcing the page and many other things.
// We can use inject inside them , useful for injecting global properties from store like vuex or pinia or from app.js.

// Defiing beforeEnter guards directly on route's configuration object.
function removeQueryParams(to) {
    if (Object.keys(to.query).length)
        return { path: to.path, query: {}, hash: to.hash }
}

function removeHash(to) {
    if (to.hash) return { path: to.path, query: to.query, hash: '' }
}
const routes5 = [
    {
        path: '/users/:id',
        component: UserDetails,
        beforeEnter: (to, from) => {
            // reject the navigation
            return false
            // or, call array of functions
            //  beforeEnter: [removeQueryParams, removeHash],
        },
    },
];
// beforeEnter guards only trigger when entering the route, they don't trigger when the params, query or hash change e.g. going from /users/2 to /users/3 or going from /users/2#info to /users/2#projects.
// When working with nested routes, both parent and child routes can use beforeEnter.
// When placed on a parent route, it won't be triggered when moving between children with that same parent.

// In Component Guards: We can call these in the components' export default:
// beforeRouteEnter(to, from) { }: called before the route that renders this component is confirmed.
// beforeRouteUpdate(to, from) {}:  component has changed, but this component is reused in the new route.
// beforeRouteLeave(to, from) {}: called when the route that renders this component is about to be navigated away from.
// The beforeRouteEnter guard does NOT have access to this, because the guard is called before the navigation is confirmed
// beforeRouteEnter is the only guard that supports passing a callback to next.
// onBeforeRouteUpdate and onBeforeRouteLeave for composition API

// Route Meta Fields:
const routes6 = [
    {
        path: '/posts',
        meta: { requiresAuth: true }
    },
]
// router.beforeEach((to, from) => { to.matched.some(record => record.meta.requiresAuth) or if (to.meta.requiresAuth && !auth.isLoggedIn()) {...

// Data Fetching: Sometimes you need to fetch data from the server when a route is activated.
// For example, before rendering a user profile, you need to fetch the user's data from the server.
// We have two options: fetching after navigation, fetching before navigation
watch(() => route.params.id, fetchData, { immediate: true }) // After
// If want to fetch before, use beforeRouteEnter.

// The RouterView component exposes a slot that can be used to render the route component
// <router-view v-slot="{ Component }">  <component :is="Component" />...
// Usage Case: We can wrap <component> inside keep-alive. So rather than router-view itself, we are keep aliving the route component only.
// Also for Transition
//     <router-view v-slot="{ Component }" >
//         <transition>
//             <keep-alive>
//                 <component :is="Component" />
//             </keep-alive>
//         </transition>
// </router-view >
// We can also pass any prop using that component.
// Also can use template ref on that compoent.

// WE can use transition in router-view. or into routes meta.
// It is also possible to determine the transition to use dynamically based on the relationship between the target route and current route.
// <router-view v-slot="{ Component, route }"><transition :name="route.meta.transition"><component :is="Component" />...
// or in afterEach:  to.meta.transition = toDepth < fromDepth ? 'slide-right' : 'slide-left'
//  <component :is="Component" :key="route.path" />: Force transition between reused views using the key.

// Scroll Behaviour:
// we may want to scroll to top when navigating to a new route, or preserve the scrolling position of history entries just like real page reload does.
const router7 = createRouter({
    scrollBehavior(to, from, savedPosition) {
        // return desired position
        return { top: 0 }
        return {
            el: '#main',
            top: 10,
        }
        if (savedPosition) {
            return savedPosition
        }
        if (to.hash) {
            return {
                el: to.hash,
                behavior: 'smooth',
            }
        }
        // Sometimes we need to wait a bit before scrolling in the page. Use promise and setTimeOut.
        // Custom like marginTop etc.
    }
})

// Lazy Routes
const UserDetails = () => import('./views/UserDetails.vue')
const router8 = createRouter({
    routes: [
        { path: '/users/:id', component: UserDetails },
        { path: '/users/:id', component: () => import('./views/UserDetails.vue') },
    ],
})

// Grouping Components in the Same Chunk: (If different comp has same route)
// Define Chunks in Vite under rollupOPtions -> output -> manualChunks

// Extending RouterLink:
// import { RouterLink } from 'vue-router'
// export default {
//     props: {
//         ...RouterLink.props,
//         inactiveClass: String,
//     },
//     computed: {
//         isExternalLink() {
//             return typeof this.to === 'string' && this.to.startsWith('http')
//         },

// Navigation using push: await router.push('/my-profile')
// Navigation Failures:
import { NavigationFailureType, isNavigationFailure } from 'vue-router'
const failure = await router.push('/articles/2')
if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
    showToast('You have unsaved changes, discard and leave anyway?')
}

// Checking Global Failure:
router.afterEach((to, from, failure) => {
    if (failure) {
        sendToAnalytics(to, from, failure)
    }
})
// if (router.push('/my-profile').currentRoute.value.redirectedFrom)

// in some situations, you might want to add or remove routes while the application is already running. 
router.addRoute({ path: '/about', component: About })
router.replace(router.currentRoute.value.fullPath)

removeRoute() // This is useful when the routes do not have a name
router.removeRoute('about') // When route has a name