<template>
  <el-form
    class="form"
    @submit.prevent="register()"
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
    <template v-if="!hasVerificationCode">
      <el-button class="button" native-type="button" @click="sendVerifyCode" type="primary">
        Send Verify Code
      </el-button>
    </template>
    <template v-else>
      <VerificationCode ref="verificationCodeRef" @resend="resendVerifyCode" />
      <el-button class="button" native-type="submit" type="primary"> Submit </el-button>
    </template>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { useTypedStore } from "../store";
import { useRouter } from "vue-router";
import VerificationCode from "../components/VerificationCode.vue";
import { registerSchema, RegisterSchema, RegisterData } from "../schemas/register.schema";
import { useValidate } from "../hooks/useValidate";

const store = useTypedStore();
const router = useRouter();

const registerData = reactive<RegisterData>({
  email: "",
  password: "",
  confirmPassword: "",
});

const { errors, validate } = useValidate<RegisterSchema>(registerSchema, registerData);

const verificationCodeRef = ref<InstanceType<typeof VerificationCode>>(null);
const hasVerificationCode = ref<boolean>(false);

const sendVerifyCode = async () => {
  const isRegisterDataValid = await validate();
  if (!isRegisterDataValid) return;

  store
    .dispatch("verificationCode", { email: registerData.email })
    .then(() => (hasVerificationCode.value = true));
};

const resendVerifyCode = () => store.dispatch("verificationCode", { email: registerData.email });

const register = async () => {
  const isRegisterDataValid = await validate();
  const isVerificationCodeValid = await verificationCodeRef.value.validate();
  if (!isRegisterDataValid || !isVerificationCodeValid || !verificationCodeRef.value.isTimerLeft)
    return;

  const data = {
    ...registerData,
    ...verificationCodeRef.value.verificationCodeData,
  };
  store.dispatch("register", data).then(() => router.push("/"));
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
