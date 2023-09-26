//Better State Management. State is simply an object that contains the properties that need to be shared within the application. Replacing provide and inject

//State can be managed by reactive api mainly.

//State is simply reactive data that affects what user sees on the screen. There are local state(affects single component) and global state(affects multiple component or entire app). Vuex is a library for managing global state. It needs for fat components, unpredictable data and accidental or missed state updates. Using vuex, we get outsourced, predictable and less errors state management.

//Install: npm install --save vuex

//Setup in main.js
import {createStore} from 'vuex';

//Organizing store with modules
const counterModule = {
    state(){},
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
        return {counter: 0};
    },
    //Mutations:Mutations are clearly defined methods which have the logic to update the state. In component, we just trigger those mutations instead of directly manipulating state.
    mutations: {
        methodName(state){
            //state.counter...
            //We are getting current state here.
        },

        //Of we need argument- payload that can take anything like string, object etc.
        methodName2(state, payload){
            //payload.value...
        }
    },
    //Problem: if same kind of data in different components arrive, we have duplication of same logic
    //Solution: getters (computed properties defined directly in store and use in any component)
    getters: {
        finalCounter(state) {
            return state.counter;
        },
        normalizedCounter(_, getters){
            //accessing getter in another getter
            
            return getters.finalCounter;
        },
        //accessing from another module as fallback arguments
        getAnotherState(state, getters, rootState, rootGetters){}
    },

    //writing asynchronous code in getter is bad practice. actions can take synchronous and asynchronous code.
    actions: {
        //same name from getters is allowed
        increment(context){
            setTimeout(function(){
                context.commit('increment')
            }, 2000);
        }
        //can take payload argument also
    }
});
 app.use(store);
//here, state() is like data in component. now, use 'counter' in component like that-
{{ $store.state.counter }}

//Using Mutation in component /method of computed
this.$store.commit('increment');

//Mutation with argument
this.$store.commit('increment', { value:10 });
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
this.$store.dispatch({type: increment,});

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


