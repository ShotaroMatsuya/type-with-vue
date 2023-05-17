<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>

    <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
      <router-link to="/profile" class="nav-link px-3 text-white text-decoration-none">{{ name }}</router-link>
      <router-link to="/login" class="nav-link px-3 text-white text-decoration-none" @click="logout">Sign
        out</router-link>
    </nav>
  </header>
</template>

<script lang="ts">
import axios from 'axios';

export default {
  name: 'HeaderNav',
  data() {
    return {
      name: '',
    };
  },
  watch: {
    user(val) {
      this.name = val.first_name + ' ' + val.last_name;
    }
  },
  computed: {
    user() {
      return this.$store.state.User.user;
    }
  },
  methods: {
    async logout() {
      await axios.post('logout');
    },
  },
};
</script>
