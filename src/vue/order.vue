<template>
  <div>
    <el-form  @submit.native="submit" :model="form" ref="form" label-width="80px">
      <el-form-item label="name">
        <el-input name="name" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="score">
        <el-input name="scroe" v-model="form.score"></el-input>
      </el-form-item>
      <el-form-item label="file">
        <el-input id="file" ref="file" type="file" name="file" v-model="form.file"></el-input>
      </el-form-item>
      <el-form-item label>
        <button type="submit">提交</button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        score: "",
        file: ""
      }
    };
  },
  mounted() {
    this.$root.subTitle = "订单管理";
  },
  methods: {
    submit: function(e) {
      //ajax数据提交
      console.log(this.form);
      //根据当前表单状态生成表单数据对象，这种情况下，表单输入控件上要有name才会生成该数据
      var formData = new FormData(this.$refs.form.$el); 
     formData.append("aaa",'1234')
      this.axios.post("/api/category/add", formData).then(result => {
        console.log(result);
      });
      e.preventDefault(); //屏蔽浏览器默认表单提交
    }
  }
};
</script>
