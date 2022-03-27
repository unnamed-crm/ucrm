<template>
  <el-form
    class="form"
    @submit.prevent="register(formRef)"
    label-position="top"
    hide-required-asterisk
    novalidate
  >
    <h1 class="title">Register</h1>

    <el-form-item label="Email" prop="email" :error="errors.email">
      <el-input
        v-model.trim="registerData.email"
        error="errors.email"
        type="text"
        placeholder="email@domain.com"
      />
    </el-form-item>
    <el-form-item label="Password" :error="errors.password">
      <el-input
        v-model.trim="registerData.password"
        type="password"
        show-password
        placeholder="password..."
      />
    </el-form-item>
    <el-form-item label="Confirm Password" :error="errors.confirmPassword">
      <el-input
        v-model.trim="registerData.confirmPassword"
        type="password"
        show-password
        placeholder="password..."
      />
    </el-form-item>

    <!-- <template v-if="!receivedVerificationCode.length">
      <VerificationCode />
      <el-button
        class="button"
        native-type="button"
        @click="sendVerifyCode"
        type="primary"
      >
        Send Verify Code
      </el-button>
    </template> -->
    <!-- <template v-else> -->
    <el-button class="button" native-type="submit" type="primary">
      Submit
    </el-button>
    <!-- </template> -->
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import * as yup from "yup";
import VerificationCode from "../components/VerificationCode.vue";
import {
  registerSchema,
  RegisterSchema,
  RegisterData,
} from "../schemas/register.schema";
import { useValidate } from "../hooks/useValidate";

const store = useStore();
const router = useRouter();

const registerData = reactive<RegisterData>({
  email: "",
  password: "",
  confirmPassword: "",
  // verificationCode: "",
});

const { errors, validate } = useValidate<RegisterSchema>(
  registerSchema,
  registerData
);

const receivedVerificationCode = reactive([]);

// const sendVerifyCode = async () => {
//  const isValid = await validate();
//
//  if (!isValid) return;
//
//  // get verification code
//  // receivedVerificationCode = code.split('');
// };

const register = async () => {
  const isValid = await validate();

  if (!isValid) return;

  store
    .dispatch("register", registerData)
    .then(() => router.push("/"))
    .catch(console.log);
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
