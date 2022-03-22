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

<script lang="ts" setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}

.container {
  height: 100vh;
  background-color: $background;
}
</style>
