// TypeScript offers all of JavaScript’s features, and an additional layer on top of these: TypeScript’s type system.
// JavaScript provides language primitives like string and number, but it doesn’t check that you’ve consistently assigned these. TypeScript does.
// The main benefit of TypeScript is that it can highlight unexpected behavior in your code, lowering the chance of bugs.

// Creating an Object (Normal Way):
const user = {
    name: 'Abdul',
    id: 0,
};

// Creating an Object (TS Way):
interface User {
    name: string;
    id: Number;
};
const user2: User = {
    name: 'Abdul',
    id: 0,
};

// We can use an interface declaration with classes with constructor also:
class UserAccount {
    name: string;
    id: number;

    constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
    }
}
const user3: User = new UserAccount("Murphy", 1);

// Can use interfaces to annotate parameters and return values to functions:
function deleteUser(user: User) { }

// Complex Types:
type MyBool = true | false;
type WindowStates = "open" | "closed" | "minimized";
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]) {
    return obj.length;
}

// Checking type of a variable:
typeof user === "string"
// Array.isArray(a)
// typeof f === "function"

// If two objects have the same shape, they are considered to be of the same type.
interface Point {
    x: number;
    y: number;
};
function logPoint(p: Point) {
    console.log(`${p.x}, ${p.y}`);
}
const point = { x: 12, y: 26 };
logPoint(point);
// The point variable is never declared to be a Point type. 
// However, TypeScript compares the shape of point to the shape of Point in the type-check. They have the same shape, so the code passes.

// Generics: Generics provide variables to types.
// For an example, An array without generics could contain anything. An array with generics can describe the values that the array contains.
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

//* Using typescript in Vue:
// Vue is written in TypeScript itself and provides first-class TypeScript support.
// With a Vite-based setup, the dev server and the bundler are transpilation-only and do not perform any type-checking.
// This ensures the Vite dev server stays blazing fast even when using TypeScript.
// If using SFCs, use the vue-tsc utility for command line type checking and type declaration generation.
// vue-tsc is a wrapper around tsc, TypeScript's own command line interface.
// Configuration file: tsconfig.json.
// import { defineComponent } from 'vue';
// export default defineComponent({
//     // type inference enabled
//     props: {
//         name: String,
//         msg: { type: String, required: true }
//     },
//     data() {
//         return {
//             count: 1
//         }
//     },
//     mounted() {
//         this.name // type: string | undefined
//         this.msg // type: string
//         this.count // type: number
//     }
// });

// In template:
{/* <script setup lang="ts">
    const count = ref<number>(0)
    let x: string | number = 1
</script> */}

// In Vue Router:
// const routes: Array<RouteRecordRaw> = [ ]

// In state - vuex or pinia:
// export const useUserStore = defineStore('user', {
//     state: () => ({
//         name: '' as string,
//         loggedIn: false as boolean
//     }),
//     actions: {
//         login(name: string) {
//             this.name = name
//             this.loggedIn = true
//         }
//     }
// });

// Vue also supports authoring components with JSX / TSX.

// To use in an existing project:
// npm install --save-dev typescript ts-loader @types/vue
// npm install vue-class-component vue-property-decorator
// Create a tsconfig.json file in the root of your project with the following:
// {
//     "compilerOptions": {
//         "target": "ESNext",
//             "module": "ESNext",
//                 "strict": true,
//                     "jsx": "preserve",
//                         "moduleResolution": "node",
//                             "esModuleInterop": true,
//                                 "skipLibCheck": true,
//                                     "forceConsistentCasingInFileNames": true,
//                                         "baseUrl": ".",
//                                             "paths": {
//             "@/*": ["src/*"]
//         },
//         "lib": ["esnext", "dom", "dom.iterable", "scripthost"]
//     },
//     "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
// }

// Common Use:
// import { Vue, Component, Prop } from 'vue-property-decorator';
// interface User {
//     name: string;
//     age: number;
// }
// export default class UserComponent extends Vue {
//     @Prop({ required: true })
//     user!: User;
// }