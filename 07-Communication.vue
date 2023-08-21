//Reusable and Configurable HTML Elements
//props: Being able to configure same component with different data. Parent Child Communication.
//props - shortcut for properties, you can think of as a custom html attribute
//props can be defined as camel case like friendName and accessed as kebab case like friend-name in the friend-contact tag
//prop name and other data or method name must not be same
//We can perform any operation on prop after defining it like data, method, computed
// <friend-contact "props with value here.... like friend-name = 'abdul'"></friend-contact>
//We can access this props in template {{ friendName }}

//Unidirectional Data Flow- Props Behavior and Changing prop
//props typically should not be mutated
//Two ways to change prop/mutate: 1. Let the parent know that we wanna change that
                                //2. Set New Data property set as that changeable prop
//prop can be defined as array or object. If use object, we can provide more information like data type, object, default, required, validator
//We can use v-bind on props
//We can use props dynamically using loop and condition.


//Child to Parent Communication- Opposite to props
//Custom Event: this.$emit('event-name') - kebab case
//Custom Event Validation using emit[] or emit{ function() {}}
//age: +age here + sign converts age string to number

//Pass Through Component Problems- Save Writing extra code
//Provide and Inject: Provide data in one place and inject it in another place.
//Provide and Injects need parent child relation, we can't do it between neighbors
//If data needs to pass through multiple components, then use it.