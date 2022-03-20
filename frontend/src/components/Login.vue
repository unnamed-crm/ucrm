<template>
  <div id="login">
    <form class="login" id="form" @submit.prevent="login">
      <h1 id="title">Sign in</h1>
      <div id="inputs">
        <label>Email</label>
        <input
          required
          v-model="email"
          type="email"
          id="email"
          placeholder="Email"
        />
        <label>Password</label>
        <input
          id="password"
          required
          v-model="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <hr />
      <button type="submit" id="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    login: function () {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("login", { email, password })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
#inputs {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}
#submit {
  margin: 1rem;
  width: 10rem;
  height: 2.5rem;
  border: none;

  font-size: 1rem;
  border-radius: 10px;
}
#email {
  width: 15rem;
  padding: 1rem;
}
#password {
  width: 15rem;
  padding: 1rem;
}

#title {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  justify-content: center;
  background-color: #2c3e50;
  width: 100%;
  height: 5rem;
  font-weight: bold;
  color: #fff;

  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
#login {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
}
#form {
  margin: 5rem;
  height: 30rem;
  width: 20rem;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-color: #2c3e50;
  border-radius: 10px;
}
</style>
