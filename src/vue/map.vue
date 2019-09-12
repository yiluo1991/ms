<template>
  <div>
    <el-dialog title="对话框" width="1000px" visible>
      <span slot="footer">
        <el-button>取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>

      <baiduMap
        ref="map"
        map-style="width:300px;height:300px;"
        @suggestSelect="s"
        @click="c"
        suggest-id="abc"
      >
        <input type="text" />
      </baiduMap>
    </el-dialog>
  </div>
</template>
<script>
import baiduMap from "./baidumap";
export default {
  data() {
    return {
      form: {
        v: ""
      }
    };
  },
  components: {
    baiduMap
  },
  methods: {
    c(event) {
      console.log(arguments);
      this.$refs.map.clearMarker();
      this.$refs.map.addMarker(event.point);
    },
    s() {
      console.log(arguments);
    }
  }
};
</script>