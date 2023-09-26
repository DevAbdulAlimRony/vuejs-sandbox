//Vue is a JavaScript framework for building user interfaces.
//Declarative Rendering: Vue extends standard HTML with a template syntax that allows us to declaratively describe HTML output based on JavaScript state.
//Reactivity: Vue automatically tracks JavaScript state changes and efficiently updates the DOM when changes happen.
//Single-File Component(SFC): A Vue SFC, as the name suggests, encapsulates the component's logic (JavaScript), template (HTML), and styles (CSS) in a single file.

/*
 \-> If we want to control any part of HTML, we need to create a vue app
 /-> Vue is a Global Object, createApp() always take a function as argument
*/

import { createApp } from 'vue';
// import App from './App.vue'
// const app = createApp(App)

const app = Vue.createApp({
    
/*
  \-> data is a property that can be used in html which part is connected here
  /-> data: function() {} or, data(){} - data always take function that returns as key-value pair
*/
    data(){
        return{
            yourName: "Abdul Alim",
            courseGoal: "Finish VueJs Quickly",
            courseGoalB: "<h2>Use of v-html directive</h2>",
            courseLink: "https://www.udemy.com/course/vuejs-2-the-complete-guide/",
            goal: 0,
           };
    },
   
/*
  \-> Method takes function which do actions or events
  /-> Method Name/Key: function(){} or shortcut
*/
    methods: {
            setName(event){
                this.yourName =  event.target.value;
            },
            reduceGoal(num){
                this.goal = this.goal - num;
            },
            submitForm(){
                alert("Form Action taken without page refresh");
            },
            resetInput(){
                this.yourName = 'Abdul Alim';
            }
    }, 
    
/*
  \-> Preventing re-exucation for all methods, just execute method which is called
  /-> don't call courseGoalMethod() in html, just write courseGoalMethod to point the method
  \-> don't bind events in computed property, Bind in Method 
  /-> this keyword in vue take all from data object and merge it with createApp() instance
*/
    computed: {
        courseGoalMethod(){
            const num = Math.random();
            if(num < 0.5){
                return this.courseGoal;
            }
            else{
                return "Walk Slowly through this course";
            }
        }
    },

/*
  \-> watcher: can be used as the alternative of computed, but that is worse
  /-> If we wanna change any data or computed property if something happens, then use it
  \-> name(old value, new value)= old value will automatically point to this.name
  /-> goal(value) = goal is from data (must be same name) and value(old value) means this.goal
  /-> Use Case: Send http request when certain data changes
*/

//"side effects" in reaction to state changes - for example, mutating the DOM, or changing another piece of state based on the result of an async operation.
    watch: {
        goal(value){
            if(value < 0){
                this.goal = 0;
            }
        },
    },
});

//mount() connects vue with a part of html
//An application instance won't render anything until its .mount() method is called. It expects a "container" argument, which can either be an actual DOM element or a selector string
app.mount('#app');

app.component();

app.config.errorHandler = (err) => {
    /* handle error */
  }

app.use();

//app can be multiple for different parts of the html