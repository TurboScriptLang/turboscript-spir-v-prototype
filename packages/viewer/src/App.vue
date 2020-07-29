<template>
  <div id="app">
    <div class="header">
      <div class="title">SPIR-V Viewer</div>
      <el-button size="medium" class="select-btn">Select SPIR-V</el-button>
    </div>
    <Viewer msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Viewer from "@/components/viewer.vue";

export default {
  name: "app",
  components: {
    Viewer,
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 10px;
}
.header {
  height: 30px;
  width: 100vw;
  font-weight: 600;
  padding: 10px;
}
.title {
  height: 30px;
  font-weight: 600;
  display: inline-flex;
}
.select-btn {
  display: inline;
  right: 10px;
  position: absolute;
}
</style>
