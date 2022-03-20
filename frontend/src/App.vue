<template>
  <div id="app">
    <div id="nav">
      <div id="menu">
        <span v-if="isLoggedIn"><router-link to="/">Home</router-link></span>
        <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>

        <span v-if="!isLoggedIn"> <a @click="login">Login</a></span>

        <span v-if="!isLoggedIn"> | <a @click="register">Register</a></span>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    logout: function () {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    login: function () {
      this.$router.push("/login");
    },
    register: function () {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}


#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#menu {
  background-color:#2c3e50;
  padding: 2rem;
  
}
</style>
