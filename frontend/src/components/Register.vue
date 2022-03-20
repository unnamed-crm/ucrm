<template>
  <div id="login">

    <form @submit.prevent="register"  id="form">
    <h1 id="title">Register</h1>
      <label for="email" >E-Mail Address</label>
      <div>
          <input id="email" type="email" v-model="email" required>
      </div>
      <label for="password">Password</label>
      <div>
          <input id="password" type="password" v-model="password" required>
      </div>
      <label for="password-confirm">Confirm Password</label>
      <div>
          <input id="password-confirm" type="password" v-model="password_confirmation" required>
      </div>
      <div>
          <button type="submit" id="submit">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    methods: {
      register: function() {
        let data = {
          email: this.email,
          password: this.password,
          isAdmin: this.isAdmin
        }
        this.$store.dispatch('register', data)
       .then(() => this.$router.push('/'))
       .catch(err => console.log(err))
      }
    }
  }
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
