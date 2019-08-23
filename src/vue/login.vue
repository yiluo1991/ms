<template>
  <div >
    {{form}}
   
    <el-dialog title="登录"  :visible="visiable" width="400px">
      <el-form ref="form" :model="form"  label-width="80px"  :rules="rulesObj">
        <el-form-item  label="用户名"  prop="username"  >
            <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="form.username" >

            </el-input>
        </el-form-item> 
         <el-form-item label="密码" prop="password" >
          <el-input type="password" prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item  style="margin-bottom:0;"  prop="accept" >
         <el-checkbox  v-model="form.accept"  >
               <span style="vertical-align: middle;">同意</span><el-link href="#" type="primary" >《用户协议》</el-link>
            </el-checkbox>
        </el-form-item>
        
      </el-form>

      <span slot="footer">
        <el-button type="primary" @click="login">登录</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
   
  data: function() {
    return {
      visiable: true,
      rulesObj:{
          username:[{required:true,message:'用户名必填'},{min:5,max:10,message:'用户名长度5-10位'}],
          password:[{required:true,message:'密码必填'},{min:6,max:16,message:'密码长度6-16位'}],
          accept:[{pattern:/true/,message:'请同意用户协议'}]
      },
      form: {
        username: "",
        password: "",
        accept:false
      }
    };
  },
  methods: {
    login: function() {
       console.log(this.$refs);
       this.$refs.form.validate((result)=>{
           if(result){
                   document.cookie = "auth=user1;Path=/;";
                  var to = this.$route.query.returnUrl;
                   this.$router.push("/manager/user");
           }
       })
  
    }
  }
};
</script>
