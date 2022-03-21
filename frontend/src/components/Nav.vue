<template>
  <el-menu
    :router="true"
    :default-active="$route.path"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#42b983"
  >
    <!-- eslint-disable-next-line vue/no-v-for-template-key -->
    <template v-for="route in $router.options.routes" :key="route.path">
      <template v-if="route?.meta?.requiresAuth && isLoggedIn">
        <el-menu-item :index="route.path" :route="route.path">
          {{ route.name }}
        </el-menu-item>
      </template>
      <template v-else-if="!route?.meta?.requiresAuth && !isLoggedIn">
        <el-menu-item :index="route.path" :route="route.path">
          {{ route.name }}
        </el-menu-item>
      </template>
    </template>
    <el-menu-item v-if="isLoggedIn" index="logout" @click="logout">
      Logout
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.el-menu {
  padding: 0 0.5rem;
  justify-content: flex-end;
}
</style>
