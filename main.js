// If we want to control any part of HTML, we need to create a vue app
// Vue is a Global Object, createApp() always take a function as argument
const app = Vue.createApp({
    //data is a property that can be used in html that part is connected here
    // data: function() {} or, data(){} - data always take function that returns as key-value pair
    data(){
        return{
            courseGoal: "Finish VueJs Quickly",
            courseGoalB: "<h2>Use of v-html directive</h2>",
            courseLink: "https://www.udemy.com/course/vuejs-2-the-complete-guide/",
            goal: 0,
           };
    },
    //Method takes function which do actions or events
    methods: {
        //Method Name/Key: function(){} or shortcut
            courseGoalMethod(){
                const num = Math.random();
                if(num < 0.5){
                    //this keyword in vue take all from data object and merge it with createApp() instance
                    return this.courseGoal;
                }
                else{
                    return "Walk Slowly through this course";
                }
            },
            reduceGoal(num){
                this.goal = this.goal - num;
            },
    }
});
//mount() connects vue with html
app.mount('#my-goal');