<template>
  <header-nav />

  <div class="container-fluid">
    <div class="row">
      <header-menu />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import HeaderNav from '@/components/HeaderNav.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';
import axios from 'axios';

export default {
  name: 'BaseWrapper',
  components: {
    HeaderNav,
    HeaderMenu,
  },
  data() {
    return {};
  },
  async mounted() {
    try {
      const { data } = await axios.get('user');
      await this.$store.dispatch('setUser', data)
    } catch (e) {
      this.$router.push('/login');
    }
  },
};
</script>
