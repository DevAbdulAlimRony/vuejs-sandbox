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
        const userName = ref('Abdul');
        const fName = ref('');
         // userName.value

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

//In component
{{ userName }}
{{ user.age }}
//v-model='fName'

