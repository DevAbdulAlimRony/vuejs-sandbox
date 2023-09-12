const app9 = Vue.createApp({
    data() {
      return{
        userName: '',
        userAge: null,
        referrer: 'wom',
        interest: [],
        how: null,
        userNameValidity: 'pending',
      };
    },

    methods: {
      submitForm(){
        console.log(this.userName);
        userName = '';
      },
      validateInput(){
        if(this.userName === ''){
            this.userNameValidity = 'invalid';
        }
        else{
            this.userNameValidity = 'valid';
        }
      }
    }
  });
  
  app9.mount('#forms');

//   v-model on custom component: Pass this props and emits from custom component
/*
props: ['modelValue'];
emits: ['update:modelValue'];
*/