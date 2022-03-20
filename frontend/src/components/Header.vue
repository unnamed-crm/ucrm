<template>
  <header class="header">
    <Nav />
  </header>
</template>

<script>
import Nav from "./Nav.vue";

export default {
  components: {
    Nav,
  },
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
.header {
  width: 100%;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
