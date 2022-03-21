<template>
  <div class="common-layout">
    <el-container class="container" direction="vertical">
      <Header />
      <el-main>
        <router-view />
      </el-main>
      <Footer />
    </el-container>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", Arial, sans-serif;
}

.container {
  height: 100vh;
  margin: 0 auto;
}
</style>
