// npm install vue-progressbar
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import App from './App'

const options = {
    color: '#bffaf3', // color of the progress bar
    failedColor: '#874b4b', // color of the progress bar upon load fail
    thickness: '5px', // thickness of the progress bar
    transition: { // transition speed/opacity/termination of the progress bar
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true, // will temporary color changes automatically revert upon completion or fail
    location: 'left', // change the location of the progress bar
    inverse: false, // inverse the direction of the progress bar
    position: relative, // change the position of the progress bar
    autoFinish: true, // allow the progress bar to finish automatically when it is close to 100%
}

Vue.use(VueProgressBar, options)

new Vue({
    ...App
}).$mount('#app')

// In template:
//  <vue-progress-bar></vue-progress-bar>
//  this.$Progress.start()
//  this.$Progress.finish()
//  this.$router.beforeEach((to, from, next) => {  if (to.meta.progress !== undefined) ...this.$Progress.parseMeta(meta)

//  Vue router meta optionss
// const router = [{
//     path: '/achievement',
//         name: 'achievement',
//             component: './components/Achievement.vue'
//     meta: {
//         progress: {
//             func: [
//                 { call: 'color', modifier: 'temp', argument: '#ffb000' },
//                 { call: 'fail', modifier: 'temp', argument: '#6e0000' },
//                 { call: 'location', modifier: 'temp', argument: 'top' },
//                 { call: 'transition', modifier: 'temp', argument: { speed: '1.5s', opacity: '0.6s', termination: 400 } }
//             ]
//         }
//     }
// }]


// Methods: start, finish, fail, increase, decrease,
// set, setFailColor, setColor, setLocation, setTransition,
// tempFailColor, tempColor, tempLocation, tempTransition, revertColor,
// revertFailColor, revertTransition, revert, parseMeta

// Define in axios interceptor:
// instance.interceptors.request.use(config => {
//     app.$Progress.start(); // for every request start the progress
//     return config;
// });

// instance.interceptors.response.use(response => {
//     app.$Progress.finish(); // finish when a response is received
//     return response;
// });