import { nextTick } from 'q';
export default {
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: "login",
            component: () => import('./vue/login')
        },
        {
            path: '/manager',
        
            meta: { needAuth: true },
            name: "layout",
            component: () => import('./vue/layout'),
            children: [
                {
                   
                    path: 'user', // /manager/user
                    name: "user",
                    component: () => import("./vue/user")
                },
               
                {
                    path: 'order', // /manager/order
                    name: "order",
                    component: () => import("./vue/order")
                }
            ]
        }, {
            path: '*', redirect: '/login'
        }
    ]
}