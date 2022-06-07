<template>
  <main class="form-signin">
    <form @submit.prevent="submit">
      <h1 class="h3 mb-3 fw-normal">Please register</h1>

      <input
        v-model="firstName"
        class="form-control"
        placeholder="First Name"
        required
      />

      <input
        v-model="lastName"
        class="form-control"
        placeholder="Last Name"
        required
      />

      <input
        v-model="email"
        type="email"
        class="form-control"
        placeholder="Email"
        required
      />

      <input
        v-model="password"
        type="password"
        class="form-control"
        placeholder="Password"
        required
      />

      <input
        v-model="passwordConfirm"
        type="password"
        class="form-control"
        placeholder="Password Confirm"
        required
      />

      <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
  </main>
</template>

<script lang="ts">
export default {
  name: 'RegisterPage',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },
  methods: {
    submit() {
      console.log({
        first_name: this.firstName,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        password_confirm: this.passwordConfirm,
      });
    },
  },
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type='email'] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type='password'] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
