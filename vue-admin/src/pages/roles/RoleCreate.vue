<template>
  <form @submit.prevent="submit">
    <div class="mb-3 mt-3 row">
      <label for="name" class="col-sm-2 col-form-label">Name</label>
      <div class="col-sm-10">
        <input v-model="formData.name" name="name" class="form-control">
      </div>
    </div>
    <div class="mb-3 row">
      <label class="col-sm-2 col-form-label">Permissions</label>
      <div class="col-sm-10">
        <div class="form-check form-check-inline col-3" v-for="permission in permissionList" :key="permission.id">
          <input type="checkbox" class="form-check-input" :value="permission.id" @change="select(permission.id, $event)">
          <label class="form-check-label">{{ permission.name }}</label>
        </div>
      </div>
    </div>
    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
export default {
  name: "RoleCreate",
  data() {
    return {
      formData: {
        permissions: [] as Array<number>,
        name: ''
      },
      permissionList: [] as Array<any>
    }
  },
  async mounted() {
    const { data } = await axios.get('permissions')

    this.permissionList = data
  },
  methods: {
    select(id: number, e: Event) {
      const { target } = e;
      if (!(target instanceof HTMLInputElement)) {
        return; // or throw new TypeError();
      }
      if (target.checked) {
        this.formData.permissions = [...this.formData.permissions, id]
        return
      }
      this.formData.permissions = this.formData.permissions.filter(p => p !== id)
    },
    async submit() {
      await axios.post('roles', this.formData);
      await this.$router.push('/roles')
    }

  }
}

</script>

<style scoped></style>