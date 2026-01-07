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

// State: