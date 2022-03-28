<template>
  <root />
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import { ElMessage } from "element-plus";
import { StateStatus } from "../store/types";
import { useTypedStore } from "../store";

const store = useTypedStore();

const authStatus = computed(() => store.getters.authStatus);
const authError = computed(() => store.getters.authError);

const dashboardStatus = computed(() => store.getters.dashboardStatus);
const dashboardError = computed(() => store.getters.dashboardError);

watch([authStatus, authError], ([status, { error, code }]) => {
  if (status === StateStatus.Error) {
    const message = error || "Something went wrong";
    if (code === 404) return;
    ElMessage.error({ message });
  }
});

watch([dashboardStatus, dashboardError], ([status, { error, code }]) => {
  if (status === StateStatus.Error) {
    const message = error || "Something went wrong";
    ElMessage.error({ message });
  }
});

const root = () => null;
</script>
