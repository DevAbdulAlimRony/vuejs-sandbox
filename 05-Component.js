//Components are reusable piece of HTML with connected data and logic
//Custom tag with dash to avoid collision with html element
//A Vue Component is just another vue app or can be called as mini app that is connected to our main app
//We mount html part with the component using template:{}
//Custom Element must be defined in parent app's template

const app5 = Vue.createApp({
    data() {
      return {
        friends: [
          {
            id: '1',
            name: 'Abdul Alim',
            phone: '01878346893',
            email: 'abdul@localhost.com',
          },
          {
            id: '2',
            name: 'Mun',
            phone: '09876 543 221',
            email: 'mun@localhost.com',
          },
        ],
      };
    },
  });
  
  app.component('friend-contact', {
    template: `
    <li>
      <h2>{{ friend.name }}</h2>
      <button @click="toggleDetails()">
        {{ detailsAreVisible ? 'Hide' : 'Show' }} Details
      </button>
      <ul v-if="detailsAreVisible">
        <li><strong>Phone:</strong> {{ friend.phone }}</li>
        <li><strong>Email:</strong> {{ friend.email }}</li>
      </ul>
    </li>
    `,
    data() {
      return {
        detailsAreVisible: false,
        friend: {
          id: '3',
          name: 'Moon Mollika',
          phone: '01234 5678 991',
          email: 'moon@gmail.com',
        },
      };
    },
    methods: {
      toggleDetails() {
        this.detailsAreVisible = !this.detailsAreVisible;
      },
    },
  });
  
  app5.mount('#component');
  