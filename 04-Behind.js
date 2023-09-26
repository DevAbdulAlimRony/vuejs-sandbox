//Reactivity(automatic updating data): Vue keeps track. Take data objects and merge all properties into a global behind the scene managed object, this points at this global object. Reactive data objects using javascript proxy. vue got notified if changes happen.

//When we change something, vue detects that change. It creates a new virtual DOM, compares it to the old virtual DOM and detects the differences, then update the parts in the real DOM where differences in the DOM detected.

//Vue instance lifecycle: There are various steps for bringing something on screen. sometimes we need to run code during those steps. That's why we have lifecycle  where we can step in at any time to execute code we need to execute.

//Lifecycle hooks are pre-defined methods that get executed in a certain order, starting from the initialization of the Vue instance to its destruction. Below is a diagram that indicates the Vue JS lifecycle hooks sequence:-

    //First life cycle phase or hook is 'beforeCreate()' followed by 'created()' phase. Before the app is fully initialized and after initialized. At this time, we have nothing on the screen. After created, vue just knows its data properties and general configuration. created() is the time where template is being compiled. All the dynamic placeholder removes and replace with concrete value what a user will see.

    //Thereafter, the 'beforeMount()' hook is reached. It means that this is right before vue is actually going to bring something to the screen. After, we reached 'mounted()'. Now, we see something on the screen. Now, we have our mounted vue instances

    //If data changes, that trigger a new life cycle- 'beforeUpdate()' and 'updated()'

    //unMounted: All the content of the app is removed from the screen and the app is dead. and we got two phases= 'beforeUnmount()' and 'unMounted()' 

    //See the diagram from documentation

//Template refs: ref is a special attribute. It allows us to obtain a direct reference to a specific DOM element or child component instance after it's mounted.

//ou might use the ref property when you need to interact with a specific child component or DOM element, such as focusing an input field, triggering methods on a child component, or accessing the underlying DOM for custom operations.

//'Extra Topics' from documentation