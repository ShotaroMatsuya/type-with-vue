<template>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link to="/users/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
  </div>
  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.first_name }} {{ user.last_name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.role.name }}</td>
          <td>
            <div class="btn-group mr-2">
              <router-link :to="`/users/${user.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
              <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(user.id)">Delete</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ButtonPaginator :last-page="lastPage" @page-changed="load($event)" />
</template>

<script lang="ts">
import axios from 'axios';
import { User } from '@/models/user'
import ButtonPaginator from '@/components/ButtonPaginator.vue'
export default {
  name: 'UsersPage',
  components: { ButtonPaginator },
  data() {
    return {
      users: [] as Array<any>,
      lastPage: 0
    }
  },
  watch: {
    page() {
      this.load()
    }
  },
  async mounted() {
    await this.load()
  },
  methods: {
    async load(page = 1) {
      const { data } = await axios.get(`users?page=${page}`);
      this.users = data.data;
      this.lastPage = data.meta.last_page;
    },
    async del(id: number) {
      if (confirm('Ar you sure ?')) {
        await axios.delete(`users/${id}`)

        this.users = this.users.filter((u: User) => u.id !== id)
      }
    }
  }
};
</script>

<style scoped></style>
