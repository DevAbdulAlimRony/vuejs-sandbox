// A "composable" is a function that leverages Vue's Composition API to encapsulate and reuse stateful logic.
// As like as mixin, if we want to extract the same functionality in a separate concern. Mixin is deprecated in vue3, though it works due to its popularity.
// Just make a .js file, and export function onMouse(){...return something..or just do something..}
// Core logic same, all we had to do was move it into an external function and return the state that should be exposed.
// one composable function can call one or more other composable functions.
// We can use parameter also in that composable function.
// Ex- Data Fetching Logic into a Composables
import { ref } from 'vue'

export function useFetch(url) {
    const data = ref(null)
    const error = ref(null)

    fetch(url)
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))

    return { data, error }
}
// Now in component:
// <script setup>
// import {useFetch} from './fetch.js'
// const { data, error } = useFetch('...')
//</script >

// useFetch() takes a static URL string as input - so it performs the fetch only once and is then done. What if we want it to re-fetch whenever the URL changes?
// Thats where reactive state helps us.
// We can make it reactive using watchEffect() and toValue() APIS
// toValue() for normalize refs or getters into values
// This version of useFetch() now accepts static URL strings, refs, and getters, making it much more flexible.
// It is a convention to name composable functions with camelCase names that start with "use".
import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
    const data = ref(null)
    const error = ref(null)

    const fetchData = () => {
        // reset state before fetching..
        data.value = null
        error.value = null

        fetch(toValue(url))
            .then((res) => res.json())
            .then((json) => (data.value = json))
            .catch((err) => (error.value = err))
    }

    watchEffect(() => {
        fetchData()
    })

    return { data, error }
}

// Maek parameters and refs always toValue(), its the best practice.
// If reactive state, then use watchEffect() to track changes.
// The recommended convention is for composables to always return a plain, non-reactive object containing multiple refs.
// This allows it to be destructured in components while retaining reactivity
// If working on SSR, then use side effect onMounted() and clear it in onUnmounted() hook.
// Composables should only be called in <script setup> or the setup() hook. They should also be called synchronously in these contexts. In some cases, you can also call them in lifecycle hooks like onMounted().
// Composables can be extracted not only for reuse, but also for code organization. 
import { useFeatureA } from './featureA.js'
import { useFeatureB } from './featureB.js'
import { useFeatureC } from './featureC.js'
//  component-scoped services that can talk to one another.

// If you are using Options API, composables must be called inside setup(), and the returned bindings must be returned from setup() so that they are exposed to this
import { useMouse } from './mouse.js'
import { useFetch } from './fetch.js'

export default {
    setup() {
        const { x, y } = useMouse()
        const { data, error } = useFetch('...')
        return { x, y, data, error }
    },
    mounted() {
        // setup() exposed properties can be accessed on `this`
        console.log(this.x)
    }
    // ...other options
}

// Directives: as like as v-model, v-show, we can alos make our own directives
// mainly intended for reusing logic that involves low-level DOM access on plain elements.
// A custom directive is defined as an object containing lifecycle hooks similar to those of a component.
const highlight = {
    mounted: (el) => el.classList.add('is-highlight')
}

// export default {
//     directives: {
//         // enables v-highlight in template
//         highlight
//     }
// }
// Now we can use: <p v-highlight>This sentence is important!</p>
// We can also register custom directive globally app.directive('highlight', {...logic here})
// It is possible to type global custom directives by extending the ComponentCustomProperties interface from vue
// Custom directives should only be used when the desired functionality can only be achieved via direct DOM manipulation.
// A common example of this is a v-focus custom directive that brings an element into focus.
// There are directive hook also:  created(el, binding, vnode),  beforeMount(el, binding, vnode), mounted(el, binding, vnode), beforeUpdate(el, binding, vnode, prevVnode),  updated(el, binding, vnode, prevVnode),  beforeUnmount(el, binding, vnode) , unmounted(el, binding, vnode)
// If your directive needs multiple values, you can also pass in a JavaScript object literal.
// directives can take any valid JavaScript expression
// app.directive('demo', (el, binding), <div v-demo="{ color: 'white', text: 'hello!' }"></div>
// When applied to a multi-root component, a directive will be ignored and a warning will be thrown

// Plugins: Plugins are self-contained code that usually add app-level functionality to Vue.
// A plugin is defined as either an object that exposes an install() method, or simply a function that acts as the install function itself.
// The install function receives the app instance along with additional options passed to app.use()
// Plugins used for: registering one or more global components or custom directives, make a resource injctable throughout the app by app.provide(), add some global instance properties by app.config.globalProperties etc.
// export default {
//     install: (app, options) => {
//        app.config.globalProperties.$translate = (key) => {...}
//     }
// }
// <h1>{{ $translate('greetings.hello') }}</h1>

// Frontend and Backend both can read json, so it can be a common way to communicate.
// As like the constants I have to use in both laravel and vue, I can make resources/shared/competitor_brands.jsonand use it in both. In laravel need json_decode(file_get_contents(resource_path('')))

// Structuring Large Vue Project:
// admin(router, store, views-> folder -> froms data index. ), user, shared(ui, components, directives, plugins, composables, constants[json], pages/layouts/views(folder wise data, form, index.vue), assets). More folders: helpers, docs, mixins etc. Class Name as convenient for saas standard.