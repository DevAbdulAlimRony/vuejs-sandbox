// If we want to control any part of HTML, we need to create a vue app
// Vue is a Global Object, createApp() always take a function as argument
const app = Vue.createApp({
    //data is a property that can be used in html that part is connected here
    // data: function() {} or, data(){} - data always take function that returns as key-value pair
    data(){
        return{
            courseGoal: "Finish VueJs"
        };
    }
});
//mount() connects vue with html
app.mount('#my-goal');