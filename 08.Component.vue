Component Registering:
    1. Global Component: When we register component in main.js.
    2. Import locally where you will use like in App.vue defining components property
       - can define component like component-name or ComponentName
       - can use component in template like <component-name></component-name> or, <ComponentName />
       - components{component-name:ComponentName} or, components{ComponentName:ComponentName} or, components{ComponentName} - vue detects all as same.

Scoped Styles:
    1. If we write styling in any component, it affects all other components' template.
    2. <style scoped></style> : Scoped affects only that component's template.

Slot: 
    - Component have same markup structure and same style, the why duplicating code? use slot
    - We can give name the slot, if one unnamed slot that will be default slot. <slot></slot>
    - Now use slot- <template v-slot="slotName"></template> , v-slot:default
    - Vue give us a $slot property
    - Shorthand for v-slot: #
    - scoped slot: passing data from where you use the slot to where you pass the markup for the slot.

Dynamic Component
    - which component to show?
    - <componet :is="method"></componet>
    - keep alive component allows you to not remove the component entirely, but cached

- <teleport to="body"></teleport> : Render it in the body element. Useful when we make modal with dialog.

- $ref attribute