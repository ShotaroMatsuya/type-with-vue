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
import axios from 'axios'
export default {
  name: "Profile",
  data() {
    return {
      infoData: {
        first_name: '',
        last_name: '',
        email: ''
      },
      passwordData: {
        password: '',
        password_confirm: ''
      }
    }
  },
  async mounted() {
    const { data } = await axios.get('user');

    this.infoData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email
    }
  },
  methods: {
    async infoSubmit() {
      await axios.put('users/info', this.infoData)
    },
    async passwordSubmit() {
      await axios.put('users/password', this.passwordData)
    }
  }

}
</script>