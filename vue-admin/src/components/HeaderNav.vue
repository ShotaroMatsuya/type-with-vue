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
import { ref, computed, watch } from "vue";
import axios from "axios";
import { useStore } from "vuex";

export default {
  name: 'HeaderNav',
  setup() {
    const name = ref('');
    const store = useStore();

    const user = computed(() => store.state.User.user);

    watch(user, () => {
      name.value = user.value.first_name + ' ' + user.value.last_name;
    });

    const logout = async () => {
      await axios.post('logout');
    }

    return {
      name,
      logout
    }
  }
};
</script>
