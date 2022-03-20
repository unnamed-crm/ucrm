<template>
  <header class="header">
    <nav class="nav">
      <span v-if="isLoggedIn"><router-link to="/">Home</router-link></span>
      <span v-if="isLoggedIn"><a @click="logout">Logout</a></span>
      <span v-if="!isLoggedIn"><a @click="login">Login</a></span>
      <span v-if="!isLoggedIn"><a @click="register">Register</a></span>
    </nav>
  </header>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
a {
  list-style: none;
}

.nav > span {
  font-weight: bold;
  color: #2c3e50;
  position: relative;
  padding: 0 10px;
}

.nav > *:not(:last-child)::after {
  content: "";
  background-color: #000;
  position: absolute;
  width: 1px;
  top: 0;
  bottom: 0;
  right: 0;
}

a:hover {
  cursor: pointer;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>
