<template>
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
          <td>{{user.id}}</td>
          <td>{{user.first_name}} {{user.last_name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.role.name}}</td>
          <td>
            <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(user.id)">Delete</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a href="javascript:void(0)" class="page-link" @click="prev">Previous</a>
      </li>
      <li class="page-item">
        <a href="javascript:void(0)" class="page-link" @click="next">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import axios from 'axios';
import {User} from '@/models/user'

export default {
  name: 'UsersPage',
  data() {
    return {
      users: [] as Array<any>,
      page: 1,
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
    async load() {
      const {data} = await axios.get(`users?page=${this.page}`);
      this.users = data.data;
      this.lastPage = data.meta.last_page;
    },
    async next() {
      if(this.page < this.lastPage) {
        this.page++
      }
    },
    async prev() {
      if(this.page > 1){
        this.page--
      }
    },
    async del(id: number) {
      if(confirm('Ar you sure ?')) {
        await axios.delete(`users/${id}`)

        this.users = this.users.filter((u: User) => u.id !== id)
      }
    }
  }
};
</script>

<style scoped></style>
