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
import { onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: 'BaseWrapper',
  components: {
    HeaderNav,
    HeaderMenu,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    onMounted(async () => {
      try {
        const { data } = await axios.get('user');

        await store.dispatch('User/setUser', data);
      } catch (e) {
        await router.push('/login');
      }
    });
  }
};
</script>
