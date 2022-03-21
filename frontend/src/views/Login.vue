<template>
  <el-row justify="center">
    <el-col :xs="20" :sm="12" :md="8" :lg="6" :xl="4">
      <el-form class="form" @submit.prevent="login" label-position="top">
        <h1 class="title">Sign in</h1>
        <el-form-item label="Email">
          <el-input v-model="email" type="email" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="password" type="password" show-password />
        </el-form-item>
        <el-button native-type="submit" type="primary">Login</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      const email = this.email;
      const password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
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
