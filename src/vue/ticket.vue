<template>
  <div>
    <div class="toolbar">
      <el-button
        size="medium"
        type="success"
        plain
        round
        icon="el-icon-plus"
        @click="showAddDialog"
      >添加</el-button>
      <div class="searchinput">
        <el-input
          @keypress.native.13="load"
          v-model="keyword"
          size="medium"
          placeholder="请输入要搜索的内容"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search" @click="load"></el-button>
        </el-input>
      </div>
      <el-button size="medium" @click="load" type="primary" plain round icon="el-icon-refresh">刷新</el-button>
    </div>
    <div style="padding:10px;">
      <el-table
        :data="list"
        row-key="Id"
        default-expand-all
        :tree-props="{children: 'children'}"
        :row-class-name="rowClass"
      >
        <el-table-column prop="Title" label="名称">
          <template slot-scope="scope">
            <el-image
              style="max-width:80px;height:40px;vertical-align: middle;"
              fit="contain"
               :preview-src-list="[scope.row.Src]"
              :src="scope.row.Src"
            ></el-image>
            {{scope.row.Title}}
          </template>
        </el-table-column>
        <el-table-column
          prop="Price"
          width="150"
          label="单价"
          :formatter="(row, column, cellValue, index)=> row.Id>0&&'￥'+cellValue"
        ></el-table-column>
        <el-table-column prop="Stock" label="库存" width="100"></el-table-column>
        <el-table-column label="商户信息" width="240">
          <template slot-scope="scope" v-if="scope.row.Id>0">
            <el-popover placement="left" title="店铺信息" width trigger="hover" content>
              <p>电话：{{scope.row.ShopPhone?scope.row.ShopPhone:"未填写"}}</p>
              <p>地址：{{scope.row.ShopAddress?scope.row.ShopAddress:"未填写"}}</p>
              <div style="float:left;" slot="reference">
                <el-tag type="danger" v-if="!scope.row.ShopName" size="small">-未填写-</el-tag>
                <el-tag type="success" v-if="scope.row.ShopName" size="small">{{scope.row.ShopName}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.Enable?'success':'danger'">{{scope.row.Enable?'启用':"禁用"}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="排序号" prop="SortNum" width="100"></el-table-column>
        <el-table-column label="操作" width="180">
          <template v-if="scope.row.Id>0" slot-scope="scope">
            <el-button
              @click="editRow(scope.row)"
              type="warning"
              size="small"
              round
              plain
              icon="el-icon-edit-outline"
            >修改</el-button>
            <el-button
              @click="deleteRow(scope.row)"
              type="danger"
              size="small"
              round
              plain
              icon="el-icon-delete"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="padding:10px;">
      <el-pagination
        @size-change="load"
        @current-change="load"
        :current-page.sync="page"
        :page-sizes="[10,20, 40, 80, 100]"
        :page-size.sync="size"
        layout=" total,sizes, prev, pager, next, jumper,slot"
        :total="total"
        background
      ></el-pagination>
    </div>

    <el-dialog top="40px" :title="title" :visible.sync="dialogShow" width="1000px">
      <el-form size="small" :model="form" ref="form" label-width="80px">
        <el-container>
          <el-container>
            <el-header height="auto">
              <el-form-item
                label="门票名"
                style="padding:0;margin:0"
                prop="Title"
                :rules="[{required:true,message:'门票名必填'}]"
              >
                <el-input v-model="form.Title" placeholder></el-input>
              </el-form-item>
              <!-- Header content -->
            </el-header>
            <el-main>
              <el-container>
                <el-aside style="width:50%;">
                  <!-- Aside content -->
                  <el-form-item
                    label="门票分类"
                    prop="CategoryId"
                    :rules="[{required:true,message:'门票名必选'}]"
                  >
                    <el-select v-model="form.CategoryId" style="width:100%" placeholder="请选择门票分类">
                      <el-option
                        v-for="item in options"
                        :key="item.Name"
                        :label="item.Name"
                        :value="item.Id"
                      ></el-option>
                    </el-select>
                  </el-form-item>

                  <el-form-item
                    label="单价"
                    prop="Price"
                    :rules="[{required:true,message:'单价必填'},{pattern :/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,message:'请输入数值'}]"
                  >
                    <el-input v-model="form.Price" placeholder></el-input>
                  </el-form-item>
                  <el-form-item
                    label="库存"
                    prop="Stock"
                    :rules="[{required:true,message:'库存必填'},{type:'number',min:0,max:99999999,message:'库存在0~99999999'}]"
                  >
                    <el-input v-model.number="form.Stock" placeholder></el-input>
                  </el-form-item>
                  <el-form-item
                    label="门票描述"
                    prop="Content"
                    :rules="[{required:true,message:'描述必填'}]"
                  >
                    <wangEditor ref="editor" v-model="form.Content"></wangEditor>
                  </el-form-item>
                </el-aside>
                <el-container>
                  <el-main style="padding:0;">
                    <el-form-item label="图片" prop="Src" :rules="[{required:true,message:'请选择文件'}]">
                      <el-input
                        id="file"
                        type="file"
                        @change="selectFile($event)"
                        style="opacity:0;position:absolute;width:100%;height:40px;z-index:999;"
                      ></el-input>
                      <el-input v-model="form.Src" placeholder="请选择要上传的文件"></el-input>
                    </el-form-item>
                    <el-form-item label="商户名">
                      <el-input v-model="form.ShopName" placeholder></el-input>
                    </el-form-item>
                    <el-form-item label="商户电话">
                      <el-input v-model="form.ShopPhone" placeholder></el-input>
                    </el-form-item>
                    <el-form-item label="商户地址">
                      <baiduMap
                        @click="onClick"
                        ref="map"
                        @suggestSelect="onSelect"
                        map-style="width:100%;height:200px;"
                        suggestId="abc"
                      >
                        <el-form-item>
                          <el-input id="abc" v-model="form.ShopAddress"></el-input>
                        </el-form-item>
                      </baiduMap>
                    </el-form-item>
                    <el-form-item
                      label="状态"
                      prop="Enable"
                      :rules="[{required:true,message:'状态必填'}]"
                    >
                      <el-select v-model="form.Enable" style="width:100%">
                        <el-option
                          v-for="item in [{label:'启用',value:1},{label:'禁用',value:0}]"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="排序号"
                      prop="SortNum"
                      :rules="[{required:true,message:'排序号必填'}]"
                    >
                      <el-input v-model="form.SortNum" placeholder="请输入排序号"></el-input>
                    </el-form-item>
                  </el-main>
                </el-container>
              </el-container>
            </el-main>
          </el-container>
        </el-container>
      </el-form>

      <span slot="footer">
        <el-button @click=" dialogShow= false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import baiduMap from "./baidumap";
import wangEditor from "./wangEditor";
export default {
  data() {
    return {
      options: [],
      form: {
        Long: undefined,
        Lat: undefined,
        Content: "",
        Src: ""
      },
      list: [],
      title: "添加",
      dialogShow: false,
      total: 0,
      size: 10,
      page: 1,
      keyword: ""
    };
  },
  methods: {
    editRow(row) {
      this.form = JSON.parse(JSON.stringify(row));
      console.log(this.form);
      this.dialogShow = true;

      setTimeout(() => {
        if (this.form.Long && this.form.Lat && this.form.Long != "0.000000") {
          var point = {
            lng: this.form.Long,
            lat: this.form.Lat,
            level: 18
          };
          this.$refs.map.clearMarker();
          this.$refs.map.center(point);
          this.$refs.map.addMarker(point);
        } else {
          this.$refs.map.clearMarker();
          this.$refs.map.center({ level: 12 });
        }
      }, 100);
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
         document.getElementById("file").value="";
      });
      
      var timer = setInterval(() => {
        try {
          document.getElementById("abc").value = this.form.ShopAddress;
          document.getElementsByClassName(
            "tangram-suggestion-main"
          )[0].style.display = "none";
        } catch (error) {}
      }, 0);
      setInterval(() => {
        clearInterval(timer);
      }, 200);
    },

    showAddDialog() {
      this.dialogShow = true;

      this.form = {
        Id: 0,
        Long: undefined,
        Lat: undefined,
        Content: "",
        Src: "",
        Title: "",
        CategoryId: undefined,
        Price: "",
        Stock: undefined,
        Content: "",
        Src: "",
        ShopName: "",
        ShopAddress: "",
        ShopPhone: "",
        Long: "",
        Lat: "",
        Enable: 1,
        SortNum: 100
      };
      this.$nextTick(() => {
        this.$refs.form.clearValidate();
         document.getElementById("file").value="";
      });
      setTimeout(() => {
        this.$refs.map.center({});
        this.$refs.map.clearMarker();
      }, 100);
    },
    selectFile: function(event) {
      if (event) {
        console.log(document.getElementById("file").files[0].name);
        this.form.Src = document.getElementById("file").files[0].name;
      } else {
        this.form.Src = "";
      }
    },
    onClick: function(event) {
      var point = event.point;
      this.form.Long = point.lng;
      this.form.Lat = point.lat;
      this.$refs.map.clearMarker();
      this.$refs.map.addMarker(point);
    },
    deleteRow: function(row) {
     
      //.get('url',{要post提交的数据},{配置对象})
      this.axios
        .post("/api/ticket/delete", {
          id: row.Id
        })
        .then(result => {
          if (!result.data.success) {
            this.$message({
              type: "error",
              message: result.data.message
            });
          }
          this.load();
        });
    },
    onSelect: function(address, addressObj) {
      this.form.ShopAddress = address;
      this.$refs.map.getSuggessPoint({
        address: address,
        success: point => {
          console.log(point);
          this.form.Long = point.lng;
          this.form.Lat = point.lat;
          this.$refs.map.clearMarker();
          point.level = 18;
          this.$refs.map.center(point);
          this.$refs.map.addMarker(point);
        }
      });
    },
    save() {
      this.$refs.form.validate(result => {
        if (result) {
          var formData = new FormData();
          for (const key in this.form) {
            formData.append(key.toLowerCase(), this.form[key] || "");
          }
          if (document.getElementById("file").files.length > 0) {
            formData.append("file", document.getElementById("file").files[0]);
          }
          var url = "";
          if (this.form.Id == 0) {
            //添加
            url = "/api/ticket/add";
          } else {
            url = "/api/ticket/edit";
          }
          this.axios.post(url, formData).then(result => {
            this.load(); //重新加载表格
            this.dialogShow = false; //关闭对话框
            if (!result.data.success) {
              //出错报错
              this.$message({
                type: "error",
                message: result.data.message
              });
            }
          });
        }
      });
    },
    load() {
      this.$loading({
        text: "加载中"
      });
      this.axios
        .get("/api/ticket/get", {
          params: {
            keyword: this.keyword,
            page: this.page,
            size: this.size
          }
        })
        .then(res => {
          setTimeout(() => {
            this.$loading().close();
          }, 100);
          this.list = res.data.rows;
          this.total = res.data.total;
        });
    },
    rowClass(obj) {
      if (obj.row.Id < 0) {
        return "gray";
      }
    }
  },
  mounted() {
    this.load();
    this.$root.subTitle = "门票管理";
    this.axios.get("/api/category/get").then(res => {
      this.options = res.data.rows;
    });
  },
  watch: {},
  components: {
    wangEditor: wangEditor,
    baiduMap: baiduMap
  }
};
</script>
<style>
tr.gray td {
  background: #fafafa !important;
}
.tangram-suggestion-main {
  z-index: 99999;
}
.el-dialog__body {
  padding-bottom: 0px;
}
</style>