//Composition API is the alternative way of options api. We might face two problems when building bigger apps-
    //1. Code that belongs together logically is split up across multiple options(data, methods, computed)
    //2. Re-using logic across components can be tricky.
//You can absolutely mix the composition and options api

export default {
    props: ['fName'],
    // import { ref } from 'vue';
    // import { reactive } from 'vue';
    // import { computed } from 'vue';
    // import { watch } from 'vue';
    // import { provide, inject } from 'vue';
    // import { onBeforeMount, onMounted, onBeforeUpdate, onUpdated,  onBeforeUnmount, onUnmounted} from 'vue';
    setup(){

        //getting props- setup(props). props.fName
        //setup(props, context). context has fallback attr, emit and slot

        //don't use this here. because setup initialized before component. so, it not ref the object like props or anything.

        //Replacing data as ref, for using ref it will be a reactive value. ref function create a project
        //why need ref?- When you use a ref in a template, and change the ref's value later, Vue automatically detects the change and updates the DOM accordingly. This is made possible with a dependency-tracking based reactivity system. When a component is rendered for the first time, Vue tracks every ref that was used during the render. Later on, when a ref is mutated, it will trigger a re-render for components that are tracking it.

        const userName = ref('Abdul');
        const fName = ref('');
         // userName.value. Output: Abdul
          // userName. Output: {value: Abdul}

        const user = ref({
            name: 'Abdul',
            age: 0
        });
        // user.value = {}

        //alternative way: reactive is made just for object
        const user2 = reactive({
            name: 'Abdul',
            age: 0
        });

        //Use ref() when you want to create a reactive reference to a single value or a simple primitive (e.g., numbers, strings, booleans).
        //Use reactive() when you want to create a reactive object that contains multiple properties. This is useful for managing more complex data structures, such as objects or arrays, where you want all properties to be reactive.
        //It is important to note that the returned value from reactive() is a Proxy of the original object, which is not equal to the original object
        //The reactive() API has a few limitations- it only works for object, collection types- not for primitive types, Cannot replace entire object, Not destructure-friendly. So, ref is recommended.
        //Ref unwrapping only happens when nested inside a deep reactive object. It does not apply when it is accessed as a property of a shallow reactive object. 


        //Replacing Methods property
        function setNewData(){
            user.age =10;
        }

        function fName(event){
            fName.value = event.target.value;
        }

        //Replacing computed property by computed method
        const com = computed(function() {
            return fName.value + 'hi';
            //Computed properties are by default getter-only. If you attempt to assign a new value to a computed property, you will receive a runtime warning. In the rare cases where you need a "writable" computed property, you can create one by providing both a getter and a setter
            //Writable Computed: using getter and setter: get(), set(newValue)
        });

        //getting input data from ref template: input.value.value

        //Replacing Watch options from options api to composition api
        watch(fName, function(newValue, oldValue) {});
        watch([fName, ], function(newValues, oldValues) {
            // oldValues[0]
        });

        //provide and inject
        provide('uName', userName);
        inject('uName');

        return {
            name: userName,
            userAge: user.value.age,
            user2Age: user.age, //reactive: no need .value
            user: user, //if use same key value word, shorthand- user,
            ageFunc: setNewData,
            fName,
            com,
        };

        //LifeCycle Hooks
        //beforeCreate, created: Not Needed. setup() replaces these hooks
        //beforeMount, mounted: onBeforeMount, onMounted
        // beforeUpdate, updated: onBeforeUpdate, beforeUpdated
        //beforeUnmount, unmounted: on...
        onBeforeMount(function() {});
    }
}

//or, <script setup></script> when we use sfc or single file component. If not use sfc, then use setup()
//  Use the setup() function when you have a more complex component with multiple reactive properties, methods, or when you need access to the component instance (this).
//Use the <script setup> syntax for simpler components with straightforward logic, especially if you prefer a more concise and readable code style.

//In component
{{ userName }}
{{ user.age }}
//v-model='fName'

