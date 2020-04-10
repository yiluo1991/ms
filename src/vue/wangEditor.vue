<template>
    <div>
          <div ref="editor" class="toolbar"></div>
      
      
    </div>

</template>

<script>
import E from "wangeditor";
export default {
  props: ["value"],
  data() {
    return {
      text: this.value
    };
  },
  mounted() {
    this.editor = new E(this.$refs.editor);
    this.editor.customConfig.menus=[  'bold','italic', 'underline', 'strikeThrough', 'link','quote', 'emoticon','image', 'table', 'video','head',  'fontSize', 'fontName','foreColor', 'backColor',  'list', 'justify']
    this.editor.customConfig.onchange = html => {
      this.text = html;
    };
    this.editor.create();
    this.editor.txt.html(this.text) 
  },
  watch: {
    value: function(value) {
      this.$nextTick(() => {
        if (this.editor.txt.html() != value) {
          this.editor.txt.html(value);
        }
      });
    },
    text: function(value) {
      this.$emit("input", value);
    }
  }
};
</script>
<style >
.w-e-toolbar{
    display: block;
    position:relative;
    z-index: 99999!important;
}
.w-e-menu{
    position: relative; 
    z-index: 1!important;
    display: inline-block;
}


.w-e-text-container{
    height:300px!important;
}
.w-e-panel-container{
    max-width: 100%;
}
.w-e-droplist{
    z-index: 99999!important;
}
</style>