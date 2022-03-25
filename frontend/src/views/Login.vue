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
        autocomplete="email"
        placeholder="email@domain.com"
      />
    </el-form-item>
    <el-form-item label="Password">
      <el-input
        v-model="formData.password"
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
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as yup from "yup";

const store = useStore();
const router = useRouter();

const formSchema = yup.object({
  email: yup
    .string()
    .required("This field is required")
    .email("Email is not valid"),
  password: yup.string().required("This field is required"),
});
type FormSchema = yup.InferType<typeof formSchema>;

const formData = reactive<FormSchema>({
  email: "",
  password: "",
});
const errors = reactive({ ...formData });

const handleValidationErrors = (e: yup.ValidationError) => {
  if (!e.inner.length) {
    errors[e.path] = e.message;
    return;
  }
  e.inner.forEach((el) => handleValidationErrors(el));
};

const resetErrors = () => Object.keys(errors).map((key) => (errors[key] = ""));

const checkIsFormValid = () => Object.values(errors).every((el) => !el);

const login = async () => {
  resetErrors();

  await formSchema
    .validate(formData, { abortEarly: false })
    .catch(handleValidationErrors);

  const isValid = checkIsFormValid();
  if (!isValid) return;

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

.button {
  margin-top: 0.5rem;
}
</style>
