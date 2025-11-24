// Rendering Mechanism: How does Vue take a template and turn it into actual DOM nodes, How does Vue update those DOM nodes efficiently?
// Vue's rendering system is based on Virtual DOM. The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM.

const vnode = {
    type: 'div',
    props: {
        id: 'hello'
    },
    children: [
        /* more vnodes */
    ]
}

// vnode is a plain JavaScript object (a "virtual node") representing a <div> element. It contains all the information that we need to create the actual element.
// A runtime renderer can walk a virtual DOM tree and construct a real DOM tree from it. This process is called mount.
// If we have two copies of virtual DOM trees, the renderer can also walk and compare the two trees. This process is called patch.

// when a Vue component is mounted:
// 1. Compile: Vue templates are compiled into render functions: functions that return virtual DOM trees.
// 2. Mount: The runtime renderer invokes the render functions, walks the returned virtual DOM tree, and creates actual DOM nodes based on it.
// 3. Patch: When a dependency used during mount changes, the effect re-runs. This time, a new, updated Virtual DOM tree is created.Patch: When a dependency used during mount changes, the effect re-runs. This time, a new, updated Virtual DOM tree is created.

// Vue templates are compiled into virtual DOM render functions.
// Static Node like <div>nothing reactivity</div> The renderer creates these vnodes during the initial render, caches them, and reuses the same vnodes for every subsequent re-render.
// When this component needs to re-render, it only needs to traverse the flattened tree instead of the full tree. This is called Tree Flattening
// Patch Flag

// Render Functions:
//There are some cases we need to render html in js section, not into template.
// Vue provides an h() function for creating vnodes
// import { h } from 'vue'

// const vnode = h(
//     'div', // type
//     { id: 'foo', class: 'bar' }, // props
//     [
//         /* children */
//     ]
// )

// h() is short for hyperscript - which means "JavaScript that produces HTML
// h('div')
// h('div', { id: 'foo' })
// h('div', { class: 'bar', innerHTML: 'hello' })
// h('div', { '.name': 'some-name', '^width': '100' })
// h('div', { onClick: () => {} })

// We can declare render functions using the render option:
import { h } from 'vue'

export default {
    data() {
        return {
            msg: 'hello'
        }
    },
    render() {
        return h('div', this.msg)
    }
}

// The render() function has access to the component instance via this.
// In render, we can return single vnode, string, array, array to return multiple vnode,

// Rendering same vnode multiple times this way, because duplicating manually is not valid
function render() {
    return h(
        'div',
        Array.from({ length: 20 }).map(() => {
            return h('p', 'hi')
        })
    )
}

// JSX: JSX is just a nicer, HTML-like syntax that replaces writing h() manually
// render() {
//     return <h1>Hello {this.name}</h1>
// }
// JSX is NOT HTML — it converts to render functions.

// When Do You Actually Need Render Functions & JSX (Real Life):
// Dynamic Component Creation like create input box based on type from databse.
// Building Tree Views (Folders, Categories, Permission Trees)
// Complex Conditional DOM (Many IF/ELSE/SWITCH)
// Creating Wrappers / HOCs / Slot Manipulation
// Dynamic Table Columns

// create-vue and Vue CLI both have options for scaffolding projects with pre-configured JSX support.
// Rendering: h('div', [this.ok ? h('div', 'yes') : h('span', 'no')])
// JSX: <div>{this.ok ? <div>yes</div> : <span>no</span>}</div>

// Built-in components such as <KeepAlive>, <Transition>, <TransitionGroup>, <Teleport> and <Suspense> must be imported for use in render functions.
// The v-model directive is expanded to modelValue and onUpdate:modelValue props during template compilation—we will have to provide these props ourselves