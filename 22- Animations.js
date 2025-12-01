// Vue provides the < Transition > and < TransitionGroup > components for handling enter / leave and list transitions

// <Transition> is a built in component for applying animations when an element or component is entering and leaving the DOM. This is covered on this page.
// Conditional rendering via v-if, Conditional display via v-show, Dynamic components toggling via the <component> special element, Changing the special key attribute
// <Transition>....</Transition>, 6 classes will work behind the scene- .v-enter-active, .v-leave-active, .v-enter-from, .v-leave-to, v-leave-from, v-enter-to.
// A transition can be named via the name prop
// name: fade, slide-fade(.slide-fade-enter-active..), bounce,
// ou can also specify custom transition classes by passing the following props to <Transition>: enter-from-class, enter-active-class, enter-to-class, leave-from-class, leave-active-class, leave-to-class. This will override the conventional class name.
// Both Transition and Animation: <Transition type="animation">...</Transition>
// Although the transition classes are only applied to the direct child element in <Transition>, we can transition nested elements using nested CSS selectors
// <Transition :duration="550">...</Transition>
// <Transition :duration="{ enter: 500, leave: 800 }">...</Transition>
// Vue use transform and opacity for transition, They do not affect the document layout during the animation, so they do not trigger expensive CSS layout calculation on every animation frame, no performance cost.
// In comparison, properties like height or margin will trigger CSS layout, so they are much more expensive to animate, and should be used with caution.
// Can use Javascript hooks rather than css class: <Transition @before-enter="onBeforeEnter"...  /> onBeforeEnter(el) {},   onEnter(el, done) { done() }
// When using JavaScript-only transitions, it is usually a good idea to add the :css="false" prop.
// If you also want to apply a transition on the initial render of a node, you can add the appear prop: <Transition appear>
// We may want the leaving element to be animated out first, and for the entering element to only be inserted after the leaving animation has finished-<Transition mode="out-in">
// <Transition> props like name can also be dynamic! It allows us to dynamically apply different transitions based on state change: <Transition :name="transitionName">


/// <TransitionGroup> for applying animations when an element or component is inserted into, removed from, or moved within a v-for list. <Transition name="nested">
// <TransitionGroup> supports the same props, CSS transition classes, and JavaScript hook listeners as <Transition>
// By default, it doesn't render a wrapper element. But you can specify an element to be rendered with the tag prop.
// Transition modes are not available, because we are no longer alternating between mutually exclusive elements.
// Elements inside are always required to have a unique key attribute.
// CSS transition classes will be applied to individual elements in the list, not to the group / container itself.
// <TransitionGroup name="list" tag="ul">  <li v-for="item in items" :key="item">....
// Got an extra class .list-move while a list is moving in the transition group tag.
//

// There are many other ways of using animations on the web even in vue:
// Using Custom CSS Class with Condition- <div:class="{ animationClass: ifDisabled }" >

// State Driven Animation: Ex- A “Show Details” card that smoothly expands/collapses when you click a button.
// showDetails is reactive state in data(), When you click the button, toggleDetails() flips the state.
// You can use mousemove, drag events with custom state changing options.

// Animating with Watchers: Ex- We can watch a number input, if user input 9, then animation will show 1 to 9 going. See Vue documenation here- https://vuejs.org/guide/extras/animation.html
// We can use gsap to animate things in advanced way: import gsap from 'gsap'