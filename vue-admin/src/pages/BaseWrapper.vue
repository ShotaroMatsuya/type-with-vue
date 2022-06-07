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

<script>
import HeaderNav from '@/components/HeaderNav.vue';
import HeaderMenu from '@/components/HeaderMenu.vue';

export default {
  name: 'BaseWrapper',
  components: {
    HeaderNav,
    HeaderMenu,
  },
};
</script>
