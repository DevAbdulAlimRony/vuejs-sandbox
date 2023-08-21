  // After Configuring Using Cli, we can make component file with .vue extension
  // Same code can be placed in App.vue though it is the main vue configuration file
  //Three Parts-Template, Script, Style
  //Imagine we have a folder components in src and a file named FriendContact.vue

  <template>
  <li>
    <h2>{{ friend.name }}</h2>
    <button @click="toggleDetails">Show Details</button>
    <ul v-if="detailsAreVisible">
      <li>
        <strong>Phone:</strong>
        {{ friend.phone }}
      </li>
      <li>
        <strong>Email:</strong>
        {{ friend.email }}
      </li>
    </ul>
  </li>
</template>

<script>
export default { //const app = data(){}
  data() {
    return {
      detailsAreVisible: false,
      friend: {
        id: "manuel",
        name: "Manuel Lorenz",
        phone: "0123 45678 90",
        email: "manuel@localhost.com",
      },
    };
  },
  methods: {
    toggleDetails() {
      this.detailsAreVisible = !this.detailsAreVisible;
    }
  }
};
</script>

<!-- We must import our main App.vue and any component in main.js -->

import { createApp } from 'vue'; //createApp method from vue framework

import App from './App.vue';
import FriendContact from './components/FriendContact.vue'; //FriendContact Naming can be anything here

const app = createApp(App);
app.component('friend-contact', FriendContact); //friend-contact is now a element to use in main app template
app.mount('#app');

