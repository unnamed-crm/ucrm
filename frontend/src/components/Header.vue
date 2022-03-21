<template>
  <el-header>
    <Nav />
  </el-header>
</template>

<script>
import Nav from "./Nav.vue";

export default {
  components: {
    Nav,
  },
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.el-header {
  padding: 0;
}
</style>
