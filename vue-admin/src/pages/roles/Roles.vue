<template>
    <div class="pt-3 pb-2 mb-3 border-bottom">
      <router-link to="/roles/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
    </div>
    <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id">
            <td>{{ role.id }}</td>
            <td>{{ role.name }}</td>
            <td>
                <div class="btn-group mr-2">
                    <router-link :to="`/roles/${role.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
                    <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(role.id)">Delete</a>
                </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  import {Role} from '@/models/role'
  export default {
    name: 'RolesPage',
    data() {
      return {
        roles: [] as Array<any>,
      }
    },
    async mounted() {
      const {data} = await axios.get('roles');
      this.roles =  data
    },
    methods: {
        async del(id: number) {
            if(confirm('Are you sure?')) {
                await axios.delete(`roles/${id}`)
                this.roles = this.roles.filter((r: Role) => r.id !== id)
            }
        }
    }
  };
  </script>
  
  <style scoped></style>
  