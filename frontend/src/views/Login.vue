<template>
  <el-form class="form" novalidate label-position="top" @submit.prevent="login">
    <h1 class="title">Sign in</h1>
    <el-form-item label="Email" :error="errors.email">
      <el-input
        v-model.trim="loginData.email"
        type="email"
        autocomplete="email"
        placeholder="email@domain.com"
      />
    </el-form-item>
    <el-form-item label="Password" :error="errors.password">
      <el-input
        v-model.trim="loginData.password"
        type="password"
        autocomplete="current-password"
        show-password
        placeholder="password..."
      />
    </el-form-item>
    <el-button class="button" native-type="submit" type="primary">
      Login
    </el-button>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { useTypedStore } from "../store";
import { useRouter } from "vue-router";
import { loginSchema, LoginData, LoginSchema } from "../schemas/login.schema";
import { useValidate } from "../hooks/useValidate";

const store = useTypedStore();
const router = useRouter();

const loginData = reactive<LoginData>({
  email: "",
  password: "",
});
const { errors, validate } = useValidate<LoginSchema>(loginSchema, loginData);

const handleNotFound = ({ code, error }) => {
  if (code === 404) {
    errors["email"] = " ";
    errors["password"] = "Wrong email or password";
    return;
  }
  // alert error
};

const login = async () => {
  const isValid = await validate();

  if (!isValid) return;

  store
    .dispatch("login", loginData)
    .then(() => router.push("/"))
    .catch(handleNotFound);
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

.button {
  margin-top: 0.5rem;
}
</style>
