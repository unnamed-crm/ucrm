<template>
  <el-row justify="center">
    <el-col :xs="20" :sm="12" :md="8" :lg="6" :xl="4">
      <el-form class="form" @submit.prevent="register" label-position="top">
        <h1 class="title">Register</h1>
        <el-form-item label="Email">
          <el-input v-model="email" type="email" />
        </el-form-item>
        <el-form-item label="Password">
          <el-input v-model="password" type="password" show-password />
        </el-form-item>
        <el-form-item label="Confirm Password">
          <el-input v-model="confirmPassword" type="password" show-password />
        </el-form-item>
        <el-button native-type="submit" type="primary">Register</el-button>
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
      confirmPassword: "",
      isAdmin: false,
    };
  },
  methods: {
    register() {
      const data = {
        email: this.email,
        password: this.password,
        isAdmin: this.isAdmin,
      };
      this.$store
        .dispatch("register", data)
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
