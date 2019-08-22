

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
            beforeEnter: function (to, from, next) {
                var arr, reg = new RegExp("(^| )" + 'auth' + "=([^;]*)(;|$)");
                arr = document.cookie.match(reg)
                if (arr ? unescape(arr[2]) : null) { 
                    next(); 
                } else {
                    next({ path: '/login', query: { returnUrl: to.fullPath } });//拦截
                }
            },
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