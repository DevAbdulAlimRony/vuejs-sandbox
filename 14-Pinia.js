// Pinia is a store library for Vue, it allows you to share a state across components/pages.
// Though we can share state using composables,  but exposes your application to security vulnerabilities if it is server side rendered.
// Even in small single page applications, We get a lot from using Pinia
// Compared to Vuex, Pinia provides a simpler API with less ceremony, offers Composition-API-style APIs, and most importantly, has solid type inference support when used with TypeScript.
// Compared to Vuex, Mutations no longer exist. No more magic strings to inject, import the functions, call them, enjoy autocompletion. No need to dynamically add stores, they are all dynamic by default. Pinia offers a flat structuring by design while still enabling ways of cross composition among stores. No namespaced modules.
// Install: npm install pinia

// Registering in app.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')

// store.js
import { defineStore } from 'pinia'
export const useCounterStore = defineStore('counter', {
    state: () => {
        return { count: 0 }
    },
    // or, state: () => ({ count: 0 })
    actions: {
        increment() {
            this.count++
        },
    },
})

// Defining a store:
// Give a unique name for the store: export const useAlertsStore
// This name, also referred to as id, is necessary and is used by Pinia to connect the store to the devtools.
// defineStore() accepts two distinct values for its second argument: a Setup function or an Options object.
// Options object are state,m actions and getters properties.
// You can think of state as the data of the store, getters as the computed properties of the store, and actions as the methods.
// Rather than state, getetrs - we can pass reactive properties what we normally do in setup like const count = ref(0); function increment() and finally must return all state computed and methods: return { count, name, doubleCount, increment }
// ref()s become state properties, computed()s become getters, function()s become actions.
// We can use global thing like inject, useRoute() in setup store.
// Options stores are easier to work with while Setup stores are more flexible and powerful.
// If app.use(pinia) not called for store, we can import the store in local component:
import { useCounterStore } from '@/stores/counter'
const store = useCounterStore()
// If you are not using setup components yet, you can still use Pinia with map helpers.
// You can define as many stores as you want and you should define each store in a different file to get the most out of Pinia.
// We can deconstruct the store, then states will be local component's ref.  This is useful when you are only using state from the store but not calling any action.

// State: state: () => {count: 0; isAdmin: true;}
// Accessing in Template: const store = useStore(), store.count
// Resetting the state: store.$reset(), In Setup Stores, you need to create your own $reset() method.  function $reset() { count.value = 0 }
// If using option api, yse mapState() helper to access states. ...mapState(useCounterStore, ['count'])
//   ...mapState(useCounterStore, {
//       myOwnName: 'count',
//       // you can also write a function that gets access to the store
//       double: store => store.count * 2,
//       // it can have access to `this` but it won't be typed correctly...
//       magicValue(store) {
//           return store.someGetter + this.count + this.double
//       },
// Modifiable State: Access state: Use mapWritable
// computed: {
//     ...mapWritableState(useCounterStore, ['count']),
//     ...mapWritableState(useCounterStore, {
//     myOwnName: 'count',
// }),
// Mutating: Apart from directly mutating the store with store.count++, you can also call the $patch method. It allows you to apply multiple changes at the same time with a partial state object
store.$patch({ count: 24 })
store.$patch({
    count: store.count + 1,
    age: 120,
    name: 'DIO',
})
store.$patch((state) => {
    state.items.push({ name: 'shoes', quantity: 1 })
    state.hasChanged = true
})
// Can change initial state of whole application: pinia.state.value = {}

// Watching State: watch the state and its changes through the $subscribe() method of a store.
// cartStore.$subscribe((mutation, state) => {...}
// Under the hood, $subscribe() uses Vue's watch() function. You can pass the same options as you would with watch().cartStore.$subscribe((mutation, state) => {
// persist the whole state to the local storage whenever it changes
// localStorage.setItem('cart', JSON.stringify(state))}, { flush: 'sync' })- Immediaely Change
// But hey will be automatically removed when the component is unmounted.
// If you also want to keep them after the component is unmounted, pass { detached: true } as the second argument to detach the state subscription from the current component
// You can watch the whole state on the pinia instance with a single watch():
watch(
    pinia.state,
    (state) => {
        // persist the whole state to the local storage whenever it changes
        localStorage.setItem('piniaState', JSON.stringify(state))
    },
    { deep: true }
)

//* Getters:
// Getters are exactly the equivalent of computed values for the state of a Store.
// They can be defined with the getters property in defineStore().
// Rather than just state, getters can use other getter
export const useCounterStore2 = defineStore('counter', {
    state: () => ({
        count: 0,
    }),
    getters: {
        doubleCount: (state) => state.count * 2,
        /**
         * Returns the count value times two plus one.
         *
         * @returns {number}
         */
        doubleCountPlusOne() {
            return this.doubleCount + 1
        },

        // Passing Argument: Directly not possible.
        // , you can return a function from the getter to accept any arguments
        getUserById: (state) => {
            // return (userId) => state.users.find((user) => user.id === userId) // or, cache to make more performant
            const activeUsers = state.users.filter((user) => user.active)
            return (userId) => activeUsers.find((user) => user.id === userId)
        },
    },
})
// Access: store.doubleCount, const { getUserById } = storeToRefs(userList) getUserById(2)
// We can access a getter inside another getter.
// for options api, use mapState() inside computed.

//* Actions: Actions are the equivalent of methods in components
// They can be defined with the actions property in defineStore() and they are perfect to define business logic
// actions: {increment(){this.count++}}
// Like getters, actions get access to the whole store instance through this with full typing (and autocompletion ✨) support.
// actions can be asynchronous, you can await inside of actions any API call or even other actions
// We can use an action inside another action.
// In options api- use ...mapActions inside methods.
// It is possible to observe actions and their outcome with store.$onAction().

// If you need to use the store somewhere else, you need to pass the pinia instance that was passed to the app to the useStore() function call
const pinia2 = createPinia()
const app2 = createApp(App)

app.use(router)
app.use(pinia2)

router.beforeEach((to) => {
    // ✅ This will work make sure the correct store is used for the
    // current running app
    const main = useMainStore(pinia)

    if (to.meta.requiresAuth && !main.isLoggedIn) return '/login'
})

// Usage in NUxt...

// Pinia supports Hot Module replacement so you can edit your stores and interact with them directly in your app without reloading the page

//Testing...

// We can use this vs code snippet to make life easier: https://pinia.vuejs.org/cookbook/vscode-snippets.html

// Plugins:
