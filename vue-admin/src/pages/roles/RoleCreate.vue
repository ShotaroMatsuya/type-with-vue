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
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import { useRouter } from "vue-router";
import { Permission } from '@/models/permission'
export default {
  name: "RoleCreate",
  setup() {
    const { push } = useRouter();

    const formData = reactive({
      name: '',
      permissions: [] as number[]
    });
    const permissionList = ref<Permission[]>([]);

    onMounted(async () => {
      const { data } = await axios.get('permissions');

      permissionList.value = data;
    });

    const select = (id: number, e: Event) => {
      const { target } = e;
      if (!(target instanceof HTMLInputElement)) {
        return; // or throw new TypeError();
      }
      if (target.checked) {
        formData.permissions = [...formData.permissions, id]
        return
      }
      formData.permissions = formData.permissions.filter(p => p !== id)
    }

    const submit = async () => {
      await axios.post('roles', formData);

      await push('/roles');
    }

    return {
      formData,
      permissionList,
      select,
      submit
    }
  }
}

</script>

<style scoped></style>