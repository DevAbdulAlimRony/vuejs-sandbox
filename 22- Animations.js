// Vue provides the < Transition > and < TransitionGroup > components for handling enter / leave and list transitions

// There are many other ways of using animations on the web even in vue:
// Using Custom CSS Class with Condition- <div:class="{ animationClass: ifDisabled }" >

// State Driven Animation: Ex- A “Show Details” card that smoothly expands/collapses when you click a button.
// showDetails is reactive state in data(), When you click the button, toggleDetails() flips the state.
// You can use mousemove, drag events with custom state changing options.

// Animating with Watchers: Ex- We can watch a number input, if user input 9, then animation will show 1 to 9 going. See Vue documenation here- https://vuejs.org/guide/extras/animation.html
// We can use gsap to animate things in advanced way: import gsap from 'gsap'