const app3 = Vue.createApp({
    data() {
      return {
        goalEntered: '',
         goals: [], 
    };
    },

    methods: {
      addGoal(){
        this.goals.push(this.goalEntered);
      },
      removeGoal(idx){
        this.goals.splice(idx, 1);
      },
    }
  });
  
  app3.mount('#conditional');