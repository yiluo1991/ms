<template>
    <div>
        登录页
        <button @click="login">登录</button>
        <router-link to="/manager/user">
            进入管理页面
        </router-link>

    </div>

</template>
<script>
export default {
    methods: {
        login:function(){
            document.cookie='auth=user1;Path=/;';
            var to=this.$route.query.returnUrl;
    
            this.$router.push('/manager/user');
        }
    }
}
</script>
