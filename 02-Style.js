//Dynamically Binding Multiple Attributes by v-bind
const objectOfAttrs = {
    id: 'container',
    class: 'wrapper'
}
// <h2 v-bind="objectOfAttrs"></h2>

const app2 = Vue.createApp({
    //With the Options API, we use the data option to declare reactive state of a component. 
    data(){
        return{
            boxASelected: false,
            boxBSelected: false,
            boxCSelected: false,
            boxDSelected: false,

            //multiple classes together
            classObject: {
                active: true,
                'text-danger': false
            },
            //Use in component: <div :class="classObject"></div>
        };
    },

    methods: {
        boxSelected(box){
            if(box === 'A'){
                //Vue automatically binds the this value for methods so that it always refers to the component instance. 
                //We should avoid using arrow functions when defining methods, as that prevents Vue from binding the appropriate this value
                this.boxASelected = true;
            }
            else if(box === 'B'){
                this.boxBSelected = !this.boxBSelected;
                 //toggling select and deselect
            }
            else if(box === 'C'){
                this.boxCSelected = !this.boxCSelected;
            }
            else if(box === 'D'){
                this.boxDSelected = !this.boxDSelected;
            }
        },
    },

    //For complex logic that includes reactive data, it is recommended to use a computed property.
    //we can achieve the same result by invoking a method. the two approaches are indeed exactly the same. However, the difference is that computed properties are cached based on their reactive dependencies. A computed property will only re-evaluate when some of its reactive dependencies have changed. In comparison, a method invocation will always run the function whenever a re-render happens.
    //don't make async requests or mutate the DOM inside a computed getter and avoid mutating computed values! Think of a computed property as declaratively describing how to derive a value based on other values - its only responsibility should be computing and returning that value.
    computed: {
        boxCClasses(){
            return {active: this.boxCSelected};
        },

        //we can bind multiple class in computed property also
        classObject() {
            return {
              active: this.isActive && !this.error,
              'text-danger': this.error && this.error.type === 'fatal'
            }
          },
    },
});

app2.mount('#styling');

//To wait for the DOM update to complete after a state change, we can use the nextTick() global API
//In some cases, we may need to dynamically create a method function, for example creating a debounced event handler
//A debounced event handler in JavaScript is a function that delays the execution of a particular action or code block in response to an event, such as user input or some other trigger. The purpose of debouncing is to ensure that the action is only performed after a specified period of inactivity following the event. Use Cases ex. autocomplete search, infinite scroll, windows resize event etc.

//In JavaScript, stateful methods are functions or methods that have an internal state that persists between calls. Stateful methods are commonly used in scenarios where you need to maintain context or keep track of some information across multiple function calls. 
