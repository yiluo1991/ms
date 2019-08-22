<template>
    <div>
        <div>
             <router-link to="/manager/user">
                用户管理
            </router-link>
            <router-link to="/manager/order">
                订单管理
            </router-link>
            <button @click="logout">退出</button>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    mounted () {
        console.log("mounted")
    },
    methods: {
        logout:function(){
            document.cookie='auth=;Path=/;Expires='+(new Date(1999,0,1)).toUTCString();
            location.reload();
        }
    }
}
</script>
