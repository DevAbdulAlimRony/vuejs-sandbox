// setup after installing
import {createRouter, createWebHistory} from 'vue-router';
const router = createRouter({
    history: createWebHistory(), //getting browser's default history support
    routes: [
        //Every object represents one route and its configuration
        { path: '/teams', component: componentName},
        { path: '/users', component: componentName},

        //Route Params
        { path: '/users/:id', component: componentName, props: true},

        //Redirect Property: URL will change after redirecting
         { path: '/', redirect: '/teams'},
        
         //Alternative of Redirect: URL won't change
          { path: '/teams', component: componentName, alias: '/'},

         //Page Not Found by Regular Expression _Catch_All_Routes
         {path: '/:anyWord(.*)', component: notFound},

         //Nested Route
         { path: '/teams', component: componentName, children: []},

         //Named Route
         { name: 'teams', path: '/teams', component: componentName },

         //Rendering Multiple Routes with Named Router Views: <router-view name='footer'></router-view>
         { path: '/teams', components: {
            default: defaultComponentName,
            footer: TeamsFooter,
         }},

         //For Single component guard
         { name: 'teams', path: '/teams', component: componentName, beforeEnter: {to, from, next} },

         //Guard in Component as Method: beforeRouteEnter(){}, beforeRouteUpdate(){}4

         //Route metadata: Pass Anything to use it like if(to.meta.needAuth)
         { name: 'teams', path: '/teams', component: componentName,  meta: {
            needAuth: true
         }},
    ],
    //changing router link default active class
    linkActiveClass: 'className',
    linkExactActiveClass: 'className',

    //Controlling Scroll Behavior
    //scrollBehavior(to, from, savedPosition): _ means we have arguments there, but we didn't use it yet
    scrollBehavior(_, _2, savedPosition) {
        if(savedPosition){
            return savedPosition;
        }
        return {left: 0, top: 0};
    },
});

//use() are usable for registering third party package
app.use(router);

//use router view in any template <router-view>
//Navigation: use <router-link to="/teams"></router-link>
//router-link under the hood will be rendered as anchor tag
//styling active router-link with nested route: a.router-link-active{..css}
//Only Navigating Single Item: a.router-link-exact-active
//Programmatic Navigation: We got special property in vue component object- $router
//In any methods- this.$router.push(). back(), forward() etc.
//$route.params
//Dynamic Link with props: :to="'/teams/' + id"

//Updating Params data with watcher: Load when route change though it is same route
watch: {
    $route(newRoute)
}

//Using Query Parameters
return { 
    name: 'teams',
    params: { teamId: this.id },
    query: {sort: asc}
}

//$route.query

//Navigating Guards
router.beforeEach(function(to, from, next){
});

//Sending analytics data guard, not for what user sees
router.afterEach(function(to, from){
});

//Entering Route Leave guards- Ex. if user navigate page before saving data, warn them data will be lost
beforeRouteLeave(to, from, next)

//Organizing Route Files: create separate file as router.js and export it
export default router;




