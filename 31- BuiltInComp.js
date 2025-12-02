// Transition
// TransitionGroup

// KeepAlive: conditionally cache component instances when dynamically switching between multiple components.
// For dynamic component using <component :is /> ,
// By default, an active component instance will be unmounted when switching away from it. This will cause any changed state it holds to be lost. When this component is displayed again, a new instance will be created with only the initial state.
// To solve this problem, we can wrap our dynamic component with the <KeepAlive> built-in component
// <KeepAlive><component :is="activeComponent" /></KeepAlive>
// <KeepAlive include="a,b">,  :include="/a|b/", :include="['a', 'b']", or can use exclude also : a,b are the names of components that should be cached.
// :max='10', only 10 instances can be cached.
//  if the number of cached instances is about to exceed the specified max count, the least recently accessed cached instance will be destroyed to make room for the new one.
// Rather than mounted or unmounted, the component will go into the activated() and deactivated() lifecycly hook. We can use that hook as like as we use mounted() and unmounted().
// activated is also called on mount, and deactivated on unmount.
// Both hooks work for not only the root component cached by <KeepAlive>, but also the descendant components in the cached tree.


// Teleport: a built-in component that allows us to "teleport" a part of a component's template into a DOM node that exists outside the DOM hierarchy of that component.
// Sometimes a part of a component's template belongs to it logically, but from a visual standpoint, it should be displayed somewhere else in the DOM, perhaps even outside of the Vue application.
// Ex- Full Screen Modal. Wrap the modal into Teleport- <Teleport to="body">
// The to target of <Teleport> expects a CSS selector string or an actual DOM node.
// Here, we are essentially telling Vue to "teleport this template fragment to the body tag".
// We can combine Teleport with Transition to create animated modals.
// Teleported componet can be a separated component- no problem will occur.
// Disabling Teleport: ex- we may want to render a component as an overlay for desktop, but inline on mobile.
// <Teleport :disabled="isMobile">, we can dynamically update isMobile.
//  multiple <Teleport> components can mount their content to the same target element.
// <Teleport to="#modals"> <Teleport to="#modals">
// <Teleport defer to="#late-div">:  to defer the target resolving of a Teleport until other parts of the application have mounted.

// Suspense: It can render a loading state while waiting for multiple nested async dependencies down the component tree to be resolved.
// The <Suspense> component has two slots: #default and #fallback. Both slots only allow for one immediate child node.
// The node in the default slot is shown if possible. If not, the node in the fallback slot will be shown instead
// <Suspense>  <Dashboard />   <template #fallback> Loading...  </template> </Suspense>
//  When all encountered async dependencies have been resolved, <Suspense> enters a resolved state and the resolved default slot content is displayed.
// If no async dependencies were encountered during the initial render, <Suspense> will directly go into a resolved state.
// The <Suspense> component emits 3 events: pending, resolve and fallback.
// you can use the errorCaptured option or the onErrorCaptured() hook to capture and handle async errors in the parent component of <Suspense>
// <Suspense suspensible>: If you don't set the suspensible prop, the inner <Suspense> will be treated like a sync component by the parent <Suspense>
