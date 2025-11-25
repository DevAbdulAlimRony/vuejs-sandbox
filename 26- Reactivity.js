// When your data changes → the UI automatically updates. You do NOT manually update the DOM.
// You click → count changes → UI updates automatically. This is reactivity.

// Vue wraps your data using Proxies (Vue 3) or getters/setters (Vue 2).
// When a property is read, Vue tracks it.
// When the property is changed, Vue knows which components depend on it → and re-renders those parts.

// Reactive in vue: data(), props, reactive(), ref(), computed(), arrays, nested objects

// When Reactivity Breaks:
// 1) Copying a reactive property to a local variable
const Ex1 = {
    name: 'UserExample',
    data() {
        return {
            user: {
                name: 'Mahbubul',
            },
        };
    },

    created() {
        const name = this.user.name; // ❌ Just a value copy, not reactive

        setTimeout(() => {
            this.user.name = 'Alim';
            console.log('user.name =', this.user.name); // "Alim"
            console.log('local name =', name);          // "Mahbubul" → DOES NOT UPDATE
        }, 2000);
    },
};

// 2) Destructuring a reactive object
const E2 = {
    name: 'DestructureExample',

    data() {
        return {
            user: {
                name: 'Mahbubul',
                age: 26,
            },
        };
    },

    created() {
        const { name, age } = this.user; // ❌ breaks reactivity

        this.user.name = 'Alim';

        console.log('user.name =', this.user.name); // "Alim"
        console.log('local name =', name);          // "Mahbubul" → NOT reactive
    },
};

// 3) Destructuring props
// 4) Adding NEW properties to a reactive object (Vue 2 issue)
// 5) Reassigning the whole reactive object
const ex3 = {
    name: 'ReassignExample',

    data() {
        return {
            user: {
                name: 'Mahbubul',
                age: 26,
            },
        };
    },

    methods: {
        replaceUser() {
            // ❌ BAD: replaces the tracked object with a plain one
            this.user = {
                name: 'Alim',
                age: 30,
            };
        },
    },
};

// JSON stringify / parse breaks reactivity

// We can debug what dependencies are used during a component's render and which dependency is triggering an update using the renderTracked and renderTriggered lifecycle hooks.


// 👇 Debug reactivity tracking
// renderTracked(e) {
//     console.log("🟦 Dependency Tracked:");
//     console.log(e);
// },

// renderTriggered(e) {
//     console.log("🟥 Render Triggered By:");
//     console.log(e);
// },
