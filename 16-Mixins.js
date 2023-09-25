//Mixins and Custom Composition functions to reuse code

//Options API
//Organizing- src->mixins->anyName.js. Copy and Paste common code in those files in export default.
//Mixin can't take component configuration
//Use this mixin by importing in a component and in export default-

    mixins: [mixinName,]
    //we can add add others data, methods if need...It will be merged automatically
    //If same named data variable or other, component option wins , not the mixins

//Global Mixin (Ex. Logger checking if mounted): import mixin in main.js and
app.mixin(mixinName);

//In composition api, we have a nicer way to reuse code.
//organizing: src->hooks->name.js
//just use javascript function for the common code. function name should start with use.
export default function useAlert(){
  //...common code for components  
  //import if anything needed above the function
}

//In component, import this file and call the function.
//If hooks return anything as array in common code file, in component where we use that hook..in setup()
const [al1, al2] = useAlert();
return {al1, al2};

