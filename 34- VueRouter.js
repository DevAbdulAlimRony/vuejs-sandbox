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