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


// Prop: A prop is a custom attribute for passing information from a parent component to a child component.
// props: ['foo'], -  array of strings
// props: {title: String, likes: Number, greetingMessage: String} - Objet Syntax
// <MyComponent greeting-message="hello" /> : when prop calling in child, we can use camel or kebab case, but kebab-case is more convenient to align with html attributes
// use PascalCase for component tags when possible because it improves template readability by differentiating Vue components from native elements.
// <BlogPost :title="post.title" />: Dynamic Prop. If concrete value then static prop.
// <BlogPost is-published />: no value means true
// Even though `false` is static, we need v-bind to tell Vue that, this is a JavaScript expression rather than a string:  <BlogPost :is-published="false" />

// v-bind instead of :prop-name: If you want to pass all the properties of an object as props, you can use v-bind without an argument
// <BlogPost v-bind="post" /> - here post is an object with multiple properties
// Will be equivalent to: <BlogPost :id="post.id" :title="post.title" />

// One Way data Flow: every time the parent component is updated, all props in the child component will be refreshed with the latest value. But not for Child.
// you should not attempt to mutate a prop inside a child component. props: ['foo'],  created() { this.foo = 'bar' } - will give warning, props are readonly!
// Because parent owns the value, child must not change it.
// If you need to mutate it, you can define a local data property that uses the prop as its initial value.
// props: ['initialCounter'], data() { return { counter: this.initialCounter }; }
// But we can initialize the prop and can use the prop as data in the child comp
export default {
  props: ['initialCounter'],
  data() {
    return {
      // counter only uses this.initialCounter as the initial value;
      // it is disconnected from future prop updates.
      counter: this.initialCounter
      // Now counter is safe to mutate inside the child without breaking props.
    }
  }
}
// If the prop is only used to derive a value (not change it),The prop is passed in as a raw value that needs to be transformed, in that case use computed using that prop rather than mutating or initializing in data.
// When objects and arrays are passed as props, while the child component cannot mutate the prop binding, it will be able to mutate the object or array's nested properties.
// This is because in JavaScript objects and arrays are passed by reference

// Prop Validation: propA: Number,  propB: [String, Number], propC: {type: String, required: true, default: 'default value', validator: function(value) { return value.length > 3; } },  default(rawProps) { ...
// All props are optional by default, unless required: true is specified.
// An absent optional prop other than Boolean will have undefined value.
// The Boolean absent props will be cast to false. setdefault: undefined to behave as a non-Boolean prop.
// If a default value is specified, it will be used if the resolved prop value is undefined - this includes both when the prop is absent, or an explicit undefined value is passed.


// Events: A child component can emit an event to its parent component using this.$emit('event-name', optionalPayload).
// The $emit() method is also available on the component instance as this.$emit()
// The parent can then listen to it using v-on: <MyComponent @some-event="callback" />
// The .once modifier is also supported on component event listeners: <MyComponent @some-event.once="callback" />
// Like components and props, event names provide an automatic case transformation, recommend using kebab-cased event listeners in templates
// Passing Arguments: @click="$emit('increaseBy', 1)", <MyButton @increase-by="(n) => count += n" />, <MyButton @increase-by="increaseCount" />, the value will be passed as the first parameter of that method
// Declaring Emitted Events: in export default- emits: ['inFocus', 'submit']
// Validation or return true false-  emits: { submit(payload: { email: string, password: string }) { }
// Although optional, it is recommended to define all emitted events in order to better document how a component should work.
//  an emitted event can be validated if it is defined with the object syntax instead of the array syntax.
//   emits: {
// No validation
//     click: null,

//     // Validate submit event
//     submit: ({ email, password }) => {
//       if (email && password) {
//         return true
//       } else {
//         console.warn('Invalid submit event payload!')
//         return false
//       }
//     }
//   },
//   methods: {
//     submitForm(email, password) {
//       this.$emit('submit', { email, password })
//     }
//   }
// }