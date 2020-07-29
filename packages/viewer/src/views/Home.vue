<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <Viewer msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Viewer from "@/components/viewer.vue";

export default {
  name: "Home",
  components: {
    Viewer
  }
};
</script>
