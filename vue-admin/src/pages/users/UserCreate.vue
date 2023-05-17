<template> 
    <form @submit.prevent="submit">
        <div class="mb-3">
            <label>First Name</label>
            <input v-model="form.first_name" class="form-control" name="first_name">
        </div>
        <div class="mb-3">
            <label>Last Name</label>
            <input v-model="form.last_name" class="form-control" name="last_name">
        </div>
        <div class="mb-3">
            <label>Email</label>
            <input v-model="form.email" class="form-control" name="email">
        </div>
        
        <div class="mb-3">
            <label>Role</label>
            <select v-model="form.role_id" class="form-control" name="role_id">
                <option v-for="role of roles" :key="role.id" :value="role.id">
                    {{ role.name }}
                </option>
            </select>
        </div>
        <button class="btn btn-outline-secondary">Save</button>
    </form>
</template>

<script lang="ts">
import axios from 'axios'
export default {
    name: "UserCreate",
    data() {
        return {
            form: {
                first_name: '',
                last_name: '',
                email: '',
                role_id: ''
            },
            roles: [] as Array<any>
        }
    },
    async mounted(){
        const {data} = await axios.get('roles')

        this.roles = data;
    },
    methods: {
        async submit() {
            await axios.post('users', this.form)
            await this.$router.push('/users')
        }
    }
}

</script>