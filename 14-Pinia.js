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