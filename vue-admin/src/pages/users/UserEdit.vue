<template> 
    <form @submit.prevent="submit">
        <div class="mb-3">
            <label>First Name</label>
            <input v-model="data.first_name" class="form-control" name="first_name">
        </div>
        <div class="mb-3">
            <label>Last Name</label>
            <input v-model="data.last_name" class="form-control" name="last_name">
        </div>
        <div class="mb-3">
            <label>Email</label>
            <input v-model="data.email" class="form-control" name="email">
        </div>
        
        <div class="mb-3">
            <label>Role</label>
            <select v-model="data.role_id" class="form-control" name="role_id">
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
    name: "UserEditPage",
    data() {
        return {
            data: {
                first_name: '',
                last_name: '',
                email: '',
                role_id: ''
            },
            roles: [] as Array<any>
        }
    },
    async mounted(){
        const rolesResponse = await axios.get('roles')

        this.roles = rolesResponse.data;
        const response = await axios.get(`users/${this.$route.params.id}`);
        this.data.first_name = response.data.first_name;
        this.data.last_name = response.data.last_name;
        this.data.email = response.data.email;
        this.data.role_id = response.data.role.id;
    },
    methods: {
        async submit() {
            await axios.put(`users/${this.$route.params.id}`, this.data)
            await this.$router.push('/users')
        }
    }
}

</script>