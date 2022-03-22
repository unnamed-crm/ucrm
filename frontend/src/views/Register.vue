<template>
  <el-row justify="center">
    <el-col :xs="20" :sm="12" :md="8" :lg="6" :xl="4">
      <el-form
        class="form"
        :model="formData"
        @submit.prevent="register"
        label-position="top"
        novalidate
      >
        <h1 class="title">Register</h1>
        <el-form-item label="Email">
      <el-input
        v-model="formData.email"
        prop="email"
        type="email"
        placeholder="email@domain.com"
      />
        </el-form-item>
        <el-form-item label="Password">
      <el-input
        v-model="formData.password"
        prop="password"
        type="password"
        show-password
        placeholder="password..."
      />
        </el-form-item>
        <el-form-item label="Confirm Password">
      <el-input
        v-model="formData.confirmPassword"
        prop="confirmPassword"
        type="password"
        show-password
        placeholder="password..."
      />
        </el-form-item>
        <el-button native-type="submit" type="primary">Register</el-button>
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
  confirmPassword: "",
  isAdmin: false,
});

const register = () => {
  store
    .dispatch("register", formData)
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
}
</style>
