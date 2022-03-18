<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>

      <span v-if="!isLoggedIn"> | <a @click="login">Login</a></span>

      <span v-if="!isLoggedIn"> | <a @click="register">Register</a></span>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn: () => {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout: () => {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    login: () => {
      this.$router.push("/login");
    },
    register: () => {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
