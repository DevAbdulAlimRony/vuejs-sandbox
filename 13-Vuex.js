//Better State Management. State is simply an object that contains the properties that need to be shared within the application. Replacing provide and inject

//State can be managed by reactive api mainly.

//State is simply reactive data that affects what user sees on the screen. There are local state(affects single component) and global state(affects multiple component or entire app). Vuex is a library for managing global state. It needs for fat components, unpredictable data and accidental or missed state updates. Using vuex, we get outsourced, predictable and less errors state management.

//Install: npm install --save vuex

//Setup in main.js
import { createStore } from 'vuex';

//Organizing store with modules
const counterModule = {
    state() { },
    mutations: {},
    actions: {},
    getters: {},
    //move counter's code in this module and use it in main store

    //we can use namespace for different modules. because all modules are merged into createStore() finally. so, sam mutation or getters name in different modules can cause conflict
    namespaced: true
}


const store = createStore({
    //Organized by module
    modules: {
        //numbers is just an identifier. We can use it as namespace in component like numbers/getterMethodName
        numbers: counterModules
    },

    state() {
        return { counter: 0 };
    },
    //Mutations:Mutations are clearly defined methods which have the logic to update the state. In component, we just trigger those mutations instead of directly manipulating state.
    mutations: {
        methodName(state) {
            //state.counter...
            //We are getting current state here.
        },

        //Of we need argument- payload that can take anything like string, object etc.
        methodName2(state, payload) {
            //payload.value...
        }
    },
    //Problem: if same kind of data in different components arrive, we have duplication of same logic
    //Solution: getters (computed properties defined directly in store and use in any component)
    getters: {
        finalCounter(state) {
            return state.counter;
        },
        normalizedCounter(_, getters) {
            //accessing getter in another getter

            return getters.finalCounter;
        },
        //accessing from another module as fallback arguments
        getAnotherState(state, getters, rootState, rootGetters) { }
    },

    //writing asynchronous code in getter is bad practice. actions can take synchronous and asynchronous code.
    actions: {
        //same name from getters is allowed
        increment(context) {
            setTimeout(function () {
                context.commit('increment')
            }, 2000);
        }
        //can take payload argument also
    }
});
app.use(store);
//here, state() is like data in component. now, use 'counter' in component like that-
{ { $store.state.counter } }

//Using Mutation in component /method of computed
this.$store.commit('increment');

//Mutation with argument
this.$store.commit('increment', { value: 10 });
//Alternative way
this.$store.commit({
    type: increment,
    value: 10
});

//map getter: Shortest way for pointing getter from component
import { mapGetters } from 'vuex';
//...mapGetters(['finalCounter']);
//Now, we can use finalCounter in component instead of doing $store.commit

//Getting Computed Data from getters in component
return this.$store.getters.finalCounter;

//getting actions in component, use dispatch instead of commit
this.$store.dispatch('increment');
//Alternative way
this.$store.dispatch({ type: increment, });

//map action: Shortest way for pointing action from component
import { mapActions } from 'vuex';
//...mapActions(['increment', 'increase']);
//<button @click='increment(value: 10)'></button>
//Alternative for mapActions or mapGetters
//...mapActions({inc: 'increment', increase: 'increase'})
//<button @click='inc'></button>

//Accessing if namespaced: true in module
return this.$store.getters['numbers/finalCounter']; //or,
// ...mapGetters('numbers', ['finalCounter']);

//Organizing Vuex Code- store.js export and import it into main.js. Or, store folder(index.js, actions.js, mutations.js, getters.js and modules folder-> folders for that modules-> and same type files for modules) and just do exporting importing.


// From Documentation:
// We could have a single file component which has data or state, methods, its simple.
// The simplicity quickly breaks down when we have multiple components that share a common state.
// For problem one, passing props can be tedious for deeply nested components, and simply doesn't work for sibling components.
// Vuex helps us deal with shared state management with the cost of more concepts and boilerplate.
// Install: npm install vuex@next --save

// At the center of every Vuex application is the store. A "store" is basically a container that holds your application state.
// Vue components retrieve state from it, they will reactively and efficiently update if the store's state changes.
// The only way to change a store's state is by explicitly committing mutations, not directly.
import { createApp } from 'vue'
import { createStore } from 'vuex'

// Create a new store instance.
const store2 = createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state) {
            state.count++
        }
    }
})

const app = createApp({ /* your root component */ })

// Install the store instance as a plugin
app.use(store2)

// Now in component we can access them:
store.commit('increment')
console.log(store.state.count)

// In Js:
this.$store.commit('increment')
console.log(this.$store.state.count)

// State: Vuex uses a single state tree - that is, this single object contains all your application level state and serves as the "single source of truth."
// Usually you will have only one store for each application.
// The data you store in Vuex follows the same rules as the data in a Vue instance
// Vuex "injects" the store into all child components from the root component through Vue's plugin system, and will be available on them as this.$store.
// Accessing state in any component in computed property: computed: { count () {   return this.$store.state.count } }
// Whenever store.state.count changes, it will cause the computed property to re-evaluate, and trigger associated DOM updates.
// When a component needs to make use of multiple store state properties or getters, declaring all these computed properties can get repetitive and verbose.
// We can use mapState helper which generates computed getter functions for us.
computed: mapState({
    // arrow functions can make the code very succinct!
    count: state => state.count,

    // passing the string value 'count' is same as `state => state.count`
    countAlias: 'count',

    // to access local state with `this`, a normal function must be used
    countPlusLocalState(state) {
        return state.count + this.localCount
    },

    // when the name of a mapped computed property is the same as a state sub tree name
    count,
})

// Local computed and mapSate with spread operator
// computed: {
//     localComputed() { },
//      ...mapState({})
// }

// Getters: Sometimes we may need to compute derived state based on store state.
// computed: {
//     doneTodosCount() {
//         return this.$store.state.todos.filter(todo => todo.done).length
//     }
// }
// If more than one component needs to make use of this, we have to either duplicate the function, or extract it into a shared helper and import it in multiple places - both are less than ideal.
// Vuex allows us to define "getters" in the store to solve this problem.
// Getters will receive the state as their 1st argument
const store3 = createStore({
    state: {
        todos: [
            { id: 1, text: '...', done: true },
            { id: 2, text: '...', done: false }
        ]
    },
    getters: {
        doneTodos(state) {
            return state.todos.filter(todo => todo.done)
        },

        // Getters will also receive other getters as the 2nd argument
        doneTodosCount(state, getters) {
            return getters.doneTodos.length
        },

        // Pass arguments to getters by returning a function.
        // Useful when you want to query an array in the store.
        getTodoById: (state) => (id) => {
            return state.todos.find(todo => todo.id === id)
        }
    }
})
// Access it: store.getters.doneTodos. or return it from a normal computed.
// as like as mapState, we have mapGetters helper to generate computed getter functions for us.
// computed: {
//     ...mapGetters([
//     'doneCount: 'doneTodosCount'
//     'anotherGetter',
//     // ...
// ])

// Mutations:
// The only way to actually change state in a Vuex store is by committing a mutation.
// Vuex mutations are very similar to events: each mutation has a string type and a handler.
const store4 = createStore({
    state() {
        return {
            count: 0
        }
    },
    mutations: {
        increment(state) {
            state.count++
        },

        // You can pass an additional argument to store.commit, which is called the payload for the mutation
        increment2(state, n) {
            state.count += n
        },

        // In most cases, the payload should be an object so that it can contain multiple fields
        increment3(state, payload) {
            state.count += payload.amount
        } // Accessing: store.commit('increment3', { amount: 10 });

        // We can use constants for mutation.
        // Let's say we have common farmerTypeConstants.js which will be used in so many components- export const SOME_MUTATION = 'SOME_MUTATION'
        // Import that cointstant.js import { SOME_MUTATION } from './mutation-types', then,
        // [SOME_MUTATION](state) { }

        // Mutation handler functions must be synchronous. 
    }
})
// An alternative way to commit a mutation is by directly using an object that has a type property
store.commit({ type: 'increment', amount: 10 })
// We also have mapMutations helper to generate methods that dispatch mutations for us.
// methods: {
//     ...mapMutations([
//         'increment', // map this.increment() to this.$store.commit('increment')
//         'decrement'
// ]),

// Actoions:
// Actions are similar to mutations, the differences being that:
// Instead of mutating the state, actions commit mutations. 
const store7 = createStore({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    actions: {
        increment(context) {
            context.commit('increment')
        }
    }
})

// We can call context.commit to commit a mutation, or access the state and getters via context.state and context.getters.
// We can even call other actions with context.dispatch.
// can use  argument destructuring to simplify the code a bit (especially when we need to call commit multiple times):
//  increment ({ commit }) {  commit('increment') }

// Accessing Action: store.dispatch('increment') or by mapActions()
// We can perform asynchronous operations inside an action
// Actions support the same payload format and object-style dispatch: store.dispatch('incrementAsync', { amount: 10 }), store.dispatch({ type: 'incrementAsync', amount: 10 })
// Practical Example: Checkout a Shopping Cart.
//  actionA ({ commit }) {return new Promise((resolve, reject) => {}, store.dispatch('actionA').then(() => {}
// actionB ({ dispatch, commit }) {    return dispatch('actionA').then(() => {  commit('someOtherMutation')
// commit('gotData', await getData())
//  async actionB ({ dispatch, commit }) { await dispatch('actionA') commit('gotOtherData', await getOtherData())

// Modules: In large applications, the store can get really big, and managing it in a single file can be difficult.
// Vuex allows us to divide our store into modules. Each module can contain its own state, mutations, actions, getters, and even nested modules.
// const moduleA = {
//     state: () => ({ ... }),
//     mutations: { ... },
//     actions: { ... },
//     getters: { ... }
// }
// const moduleB = {
//     state: () => ({ ... }),
//     mutations: { ... },
//     actions: { ... }
// }
const store8 = createStore({
    modules: {
        a: moduleA,
        b: moduleB
    }
})
// Access: store.state.a // -> `moduleA`'s state
// For local module root state will be exposed as context.rootState
// Inside module getters, the root state will be exposed as their 3rd argument.
// If you want your modules to be more self-contained or reusable, you can mark it as namespaced with namespaced: true.
// When the module is registered, all of its getters, actions and mutations will be automatically namespaced based on the path the module is registered at.
// If you want to use global state and getters, rootState and rootGetters are passed as the 3rd and 4th arguments to getter functions, and also exposed as properties on the context object passed to action functions.
// To dispatch actions or commit mutations in the global namespace, pass { root: true } as the 3rd argument to dispatch and commit.
// If you want to register global actions in namespaced modules, you can mark it with root: true and place the action definition to function handler
// computed: {
//   ...mapState('some/nested/module', {
//     a: state => state.a,
//     b: state => state.b
// }),
//   ...mapGetters('some/nested/module', [
//     'someGetter', // -> this.someGetter
//     'someOtherGetter', // -> this.someOtherGetter
// ])
// },
// methods: {
//   ...mapActions('some/nested/module', [
//     'foo', // -> this.foo()
//     'bar' // -> this.bar()
// ])
// }

// or can use namespaced helper: const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')
// You can register a module after the store has been created with the store.registerModule method.

// Follow Three rules:
// 1. Application-level state is centralized in the store.
// 2. The only way to change state is by committing mutations.
// 3. To handle asynchronous operations, use actions

// For composition api:
// To access the store within the setup hook, you can call the useStore function. Then - count: computed(() => store.state.count); double: computed(() => store.getters.double);  increment: () => store.commit('increment'), asyncIncrement: () => store.dispatch('asyncIncrement')

// Vuex stores accept the plugins option that exposes hooks for each mutation.
// plugins: [myPlugin]. in myPlugin.js: const myPlugin = (store) => { store.subscribe((mutation, state) => { // called after every mutation. The mutation comes in the format of { type, payload } console.log(mutation.type) console.log(mutation.payload) }) }
// Can commit mutations inside plugins.
// Vuex comes with a built in logger plugin for common debugging usage
import { createLogger } from 'vuex'

const store9 = createStore({
    plugins: [createLogger()] // Now impmplement the createLogger with defined functionalities.
})

// To enable strict mode, simply pass in strict: true when creating a Vuex store
// In strict mode, whenever Vuex state is mutated outside of mutation handlers, an error will be thrown.
// Do not enable strict mode when deploying for production, its only for debugging.

// Form Handling in strict mode
// Testing
// Typescript Support

// Vuex supports hot-reloading mutations, modules, actions and getters during development, using webpack's Hot Module Replacement API.
// Hot reloading is
// Hot reloading a developer feature that injects code changes directly into a running application, allowing you to see updates instantly without a full restart, preserving the app's state
