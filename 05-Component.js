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


// v-model: By default, v-model on a component uses a prop named modelValue and emits an event named update:modelValue.
// <input :value = "searchText" @input="searchText = $event.target.value"/> Replace it by: <input v-model="searchText" />
// It expends to this: <input :modelValue="searchText" @update:modelValue="newValue => searchText = newValue" />
// For this to actually work though, the <CustomInput> component must do two things:
// 1. Declare a prop named modelValue to receive the value.
// 2. Emit an event named update:modelValue with the new value whenever it changes
// If you want to use a different prop name, you can use the model option in the component definition to specify the prop and event names to use with v-model.
// < script >
// export default {
//   props: ['modelValue'],
//   emits: ['update:modelValue']
// }
// </script >
// < input :value = "modelValue" @input="$emit('update:modelValue', $event.target.value)"/>
// <CustomInput v-model="searchText" />
// Another way is a getter and setter for value in computed hook.
// But, what if our componet need multiple inputs, one v-model cant solve it. We can do it like this:
// <CustomInput v-model:title="postTitle" v-model:content="postContent" />
// In the component definition, we need to declare two props title and content, and emit two events update:title and update:content when the respective values change.
// v-model has built in modifiers: .trim, .number, .lazy. We can also make custom modifier like .capitalize.
// Modifiers added to a component v-model will be provided to the component via the modelModifiers prop to make custom modifier on it, we can deifne modelModifier and write the logic of that modifier in emitValue(e) method.
// <MyComponent v-model:title.capitalize="myText">


// Fallthrough Attributes: By default, any attributes that are not recognized as props or emits will be automatically added to the root element of the component.
// Common examples of this include class, style, and id attributes.
// When a component renders a single root element, fallthrough attributes will be automatically added to the root element's attributes.
// MyButton Component with justone root level element: < button >Click Me</button > , Calling- <MyButton class="large" />
// Here, <MyButton> did not declare class as an accepted prop. Therefore, class is treated as a fallthrough attribute and automatically added to <MyButton>'s root element.
// If class or style or v-on listener already exists in child and parent, they will be merged.
// Forwarded Attribute: If a component renders another component as its root node, Then the fallthrough attributes received by <MyButton> will be automatically forwarded to <BaseButton>.
// If you do not want a component to automatically inherit attributes, you can set inheritAttrs: false in the component's options.
// <span>  {{ $attrs }} </span> - $attrs object includes all attributes that are not declared by the component's props or emits options.
// If we want to use fallthrough attribute in inner element- <div class="btn-wrapper"> <button class="btn" v-bind="$attrs">Click Me</button>
// components with multiple root nodes do not have an automatic attribute fallthrough behavior.
// We can access a components' fallthorugh in js like this- this.$attrs

// Slot:
// Besides prop, component can accept template content from parent using slots.
// In parent component template: <BaseLayout> <h1> Hello World </h1> <p> This is my app </p> </BaseLayout>
// In child component template: <div class="base-layout"> <slot></slot> </div>, slot element is a slot outlet where content should be place.
// Slot content does not have access to the child component's data, only parent's data.
// We can give fallback content to the slot- <slot> <p>This is default content</p> </slot>. If we dont provide content, it will show. if we provide content, default wont show.
// Named Slot: <slot name="header"></slot>, A <slot> outlet without name implicitly has the name "default". Callling: <template v-slot:header>
// v-slot has a dedicated shorthand #: <template #header>
// When a component accepts both a default slot and named slots, all top-level non-<template> nodes are implicitly treated as content for the default slot.
// Conditional Slot: Use $slots property Render if slot given- <div v-if="$slots.header" class="card-header"><slot name="header" /></div>
// Dynamic Slot Name: <template v-slot:[dynamicSlotName]>, <template #[dynamicSlotName]>
// Scoped Slot: A scoped slot is a special type of slot that allows a child component to pass data back to the parent component.
// In child component: <slot :user="userData"></slot>, Here user is the prop name, userData is data in child component
// In parent component: <ChildComponent> <template v-slot:default="slotProps"> <p>User Name: {{ slotProps.user.name }}</p> </template> </ChildComponent>
// Here slotProps is an object containing all the props passed from the child component's slot.
// We can destructure the slotProps object directly in the template: <template v-slot:default="{ user }"> <p>User Name: {{ user.name }}</p> </template>
// Renderless Component: A renderless component is a component that does not render any HTML markup of its own. Instead, it provides functionality or data to its child components through scoped slots.

// Provide and Inject:Parent gives (“provides”) a value, Deep children take (“inject”) it
// Usually, when we need to pass data from the parent to a child component, we use props., but if large component tree?
// With only props, we would have to pass the same prop across the entire parent chain, This is called "props drilling" and definitely isn't fun to deal with.
// Prop drilling is when you pass data through multiple layers of components that do not need the data themselves, just to get it to a deeply nested child component that does.
// Provide and inject is a pair of APIs that allow an ancestor component to provide data or methods that can be injected by all of its descendant components, no matter how deep in the component tree.
// In ancestor component: provide() { return { themeColor: 'blue', toggleTheme: this.toggleTheme }; }, methods: { toggleTheme() { ... } }
// For each property in the provide object, the key is used by child components to locate the correct value to inject, while the value is what ends up being injected.
// In descendant component: inject: ['themeColor', 'toggleTheme']
// We can provide function/methods, data, objects, reactive state, refs, computed properties etc.
// We can also provide at the app level: app.provide(/* key */ 'message', /* value */ 'hello!'), This is especially useful when writing plugins.
// If multiple parents provide data with the same key, inject will resolve to the value from the closest parent in component's parent chain.
// Injection Aliasing: inject: { localThemeColor: 'themeColor' }, now we can access it via this.localThemeColor. By default it was this.themeColor if we ddint specify local name.
// If Injected key not found in any parent, it will give runtime error. So, we can use default value: inject: { localThemeColor: { from: 'themeColor', default: 'red' } }
// In ORDER TO MAKE INJECTIONS REACTIVELY-  provide() {  return {  message: computed(() => this.message)...
// We can use symbol keys to avoid name collision when providing and injecting values.
// Take a keys.js with a Symbol() object and import an use. We should use Symbol() key in a team project or large application.

// Async Comp: A component that is loaded only when it is needed.
// import { defineAsyncComponent } from 'vue'
// defineAsyncComponent accepts a loader function that returns a Promise with resolve(retrieved component from the server) and reject(component load failed)
//  components: { AdminPage: defineAsyncComponent(() => import('./AdminPage.vue'))  }
// We can handle loading, delay and error, timeout state also. Can define loadingComponent and errorComponent.
// We can specify when to hydrate the component like hydrate on Idle(when the browser is not busy), Hydrate on Visible (only when the component scrolls into view), Hydrate on Media Query, Hydrate on Interaction
// Hydration makes page faster, more efficient, load js when needed, better core web vitals.
// Async components can be used with the <Suspense> built-in component. 