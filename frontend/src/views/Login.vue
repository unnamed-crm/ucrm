<template>
  <el-row justify="center">
    <el-col :xs="20" :sm="12" :md="8" :lg="6" :xl="4">
      <el-form
        class="form"
        novalidate
        :model="formData"
        label-position="top"
        @submit.prevent="login"
      >
        <h1 class="title">Sign in</h1>
        <el-form-item label="Email">
          <el-input v-model="formData.email" type="email" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="formData.password" type="password" show-password />
        </el-form-item>
        <el-button native-type="submit" type="primary">Login</el-button>
      </el-form>
    </el-col>
  </el-row>
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

<style scoped lang="scss" rel="stylesheet/scss">
.title {
  text-align: center;
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
}
</style>
