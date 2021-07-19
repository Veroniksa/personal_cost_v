import Vue from 'vue';
import Router from 'vue-router';

/* import Dashboard from '../views/Dashboard.vue';
import About from '../views/About.vue';
import NotFound from '../views/NotFound.vue';
import AddPayment from '../components/AddPayment.vue';
 */
Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes: [
        {
            path:'/dashboard',//url
            component: ()=>import(/* webpackChunkName: 'dashboard'*/'../views/Dashboard.vue'),//quello componente che si apre
            name: 'dashboard' //nome del url === nome del componente
        },
        {
            path:'/dashboard/:page',
            component: ()=>import(/* webpackChunkName: 'Dashboard'*/'../views/Dashboard.vue'),
            name: 'dashboard'
        },
        
        {
            path:'/add/payment/:selected',
            component: ()=>import(/* webpackChunkName: 'AddPayment'*/'../components/AddPayment.vue'),
            name: 'about' 
        },
        {
            path:'/about',
            component: ()=>import(/* webpackChunkName: 'About'*/'../views/About.vue'),
            name: 'about' 
        },
        {
            path:'/about*',
            component: ()=>import(/* webpackChunkName: 'About'*/'../views/NotFound.vue'),
            name: 'about' 
        },
/*         {
            path:'/notfound',//url
            component: NotFound,//quello che si apre
            name: 'NotFound' //nome del url === nome del componente
        }, */
        {
            path: '*',
            component: ()=>import(/* webpackChunkName: 'NotFound' */'../views/NotFound.vue')
        }
    ]

});

const userAuth = true;
router.beforeEach((to, from, next) => {
    if(to.name !== 'NotFound' && !userAuth){
        next({path: '/notFound'});
    } else {
        next();
    }
    console.log(to, from, next);
});

const getTitle = routName => {
    return {
        'dashboard': 'Take a look on your payments and add more!',
        'about': 'Anything about our awesome application!',
        'NotFound': 'Oops! Seems like we lost this page :('
        }[routName];
    };

router.afterEach((to) => {
    document.title = getTitle(to.name);
});

export default router;