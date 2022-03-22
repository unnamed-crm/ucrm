<template>
  <el-menu
    :router="true"
    :default-active="$route.path"
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

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const isLoggedIn = computed(() => store.getters.isLoggedIn);

const logout = () => {
  store.dispatch("register");
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.el-menu {
  padding: 0 0.5rem;
  justify-content: flex-end;
}
</style>
