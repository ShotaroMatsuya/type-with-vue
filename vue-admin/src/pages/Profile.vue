<template>
  <h3>Account Information</h3>
  <form @submit.prevent="infoSubmit">
    <div class="mb-3">
      <label>First name</label>
      <input v-model="infoData.first_name" name="first_name" class="form-control">
    </div>
    <div class="mb-3">
      <label>Last Name</label>
      <input v-model="infoData.last_name" name="last_name" class="form-control">
    </div>
    <div class="mb-3">
      <label>Email</label>
      <input v-model="infoData.email" class="form-control" name="email">
    </div>
    <button class="btn btn-outline-secondary">Save</button>
  </form>
  <h3 class="mt-4">Change Password</h3>
  <form @submit.prevent="passwordSubmit">
    <div class="mb-3">
      <label>Password</label>
      <input v-model="passwordData.password" type="password" class="form-control" name="password">
    </div>
    <div class="mb-3">
      <label>Password Confirm</label>
      <input v-model="passwordData.password_confirm" type="password" class="form-control" name="password_confirm">
    </div>

    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import { reactive, computed, watchEffect } from 'vue';
import axios from 'axios';
import { useStore } from "vuex";

export default {
  name: "Profile",
  setup() {
    const infoData = reactive({
      first_name: '',
      last_name: '',
      email: ''
    });
    const passwordData = reactive({
      password: '',
      password_confirm: ''
    })

    const store = useStore();
    const user = computed(() => store.getters['User/getCurrentUser']);
    console.log(user.value)

    watchEffect(() => {
      infoData.first_name = user.value.first_name;
      infoData.last_name = user.value.last_name;
      infoData.email = user.value.email;
    });


    const infoSubmit = async () => {
      const { data } = await axios.put('users/info', infoData);

      await store.dispatch('User/setUser', data);
    }

    const passwordSubmit = async () => {
      await axios.put('users/password', passwordData);
    }

    return {
      infoData,
      passwordData,
      infoSubmit,
      passwordSubmit
    }
  }
}
</script>