<template>
  <el-menu
    :router="true"
    :default-active="$route.path"
    mode="horizontal"
    background-color="#1976d2"
    text-color="#fff"
    active-text-color="#7af581"
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
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useTypedStore } from "../store";

const store = useTypedStore();

const isLoggedIn = computed(() => store.getters.isLoggedIn);
</script>

<style lang="scss" scoped>
.el-menu {
  padding: 0 0.5rem;
  justify-content: flex-end;
}
</style>
