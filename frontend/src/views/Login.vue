<template>
  <el-form
    class="form"
    novalidate
    :model="formData"
    label-position="top"
    @submit.prevent="login"
  >
    <h1 class="title">Sign in</h1>
    <el-form-item label="Email">
      <el-input
        v-model="formData.email"
        type="email"
        placeholder="email@domain.com"
      />
    </el-form-item>
    <el-form-item label="Password">
      <el-input
        v-model="formData.password"
        type="password"
        show-password
        placeholder="password..."
      />
    </el-form-item>
    <el-button native-type="submit" type="primary">Login</el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const formData = reactive({
  email: "",
  password: "",
});

const login = () => {
  store
    .dispatch("login", formData)
    .then(() => router.push("/"))
    .catch((err) => console.log(err));
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
  padding: 2rem;
  background-color: $background;
  border-radius: $border-radius;
}
</style>
