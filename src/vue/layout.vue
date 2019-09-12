<template>

  <div>
     <el-backtop :visibility-height="100"></el-backtop>
    <div id="nav">
      <el-scrollbar ref="scrollbar"  style="height:100%;" :noresize="false">
      
        <el-menu 
          :router="true"
          :default-active="defaultIndex"
          background-color="#172039"
          text-color="#eee"
          active-text-color="#ffba3a"
        >
          <el-menu-item index="/manager/admin">
            <i class="el-icon-setting"></i>
            <span>后台账号管理</span>
          </el-menu-item>
          <el-menu-item index="/manager/ads">
            <i class="el-icon-picture"></i>
            <span>轮播图管理</span>
          </el-menu-item>

          <el-menu-item index="/manager/user">
            <i class="el-icon-user"></i>
            <span>客户信息</span>
          </el-menu-item>
          <el-menu-item index="/manager/category">
            <i class="el-icon-star-on"></i>
            <span>门票分类管理</span>
          </el-menu-item>
          <el-menu-item index="/manager/ticket">
            <i class="el-icon-s-ticket"></i>
            <span>门票管理</span>
          </el-menu-item>
          <el-menu-item index="/manager/order" >
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
          </el-menu-item>
        </el-menu>
      </el-scrollbar>
      <!-- <router-link to="/manager/user">
                用户管理
            </router-link>
            <router-link to="/manager/order">
                订单管理
            </router-link>
      <button @click="logout">退出</button>-->
    </div>
    <div id="main">
      <div id="topbar">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item id="sub">{{$root.subTitle}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-dropdown trigger="click">
          <span>
            <el-image src="/head.jpg"></el-image>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="changepassword">
              <i class="el-icon-lock"></i> 修改密码
            </el-dropdown-item>
            <el-dropdown-item divided command="exit">
              <span @click="logout">
                <i class="el-icon-circle-close"></i> 安全退出
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
   

      <router-view></router-view>
   
    </div>
  </div>
</template>

<script>
import "../a.less";
export default {
  data () {
        return {
            subTitle:'订单管理',
            defaultIndex:''
        }
    },
  mounted() {
    window.addEventListener('resize',()=>{
         this.$refs.scrollbar.update()
    })
    this.defaultIndex=this.$route.path;
  },
  methods: {
    logout: function() {
      document.cookie =
        "node_auth=;Path=/;Expires=" + new Date(1999, 0, 1).toUTCString();
      location.reload();
    }
  }
};
</script>
