<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label>Title</label>
      <input v-model="form.title" class="form-control" name="first_name">
    </div>
    <div class="mb-3">
      <label>Description</label>
      <textarea v-model="form.description" class="form-control" name="description"></textarea>
    </div>
    <div class="mb-3">
      <label>Image</label>
      <div class="input-group">
        <input v-model="form.image" class="form-control" name="image">
        <ImageUpload @uploaded="form.image = $event" />
      </div>
    </div>
    <div class="mb-3">
      <label>Price</label>
      <input v-model="form.price" type="number" class="form-control" name="image">
    </div>
    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
import ImageUpload from '@/components/ImageUpload.vue'
export default {
  name: "ProductCreate",
  components: { ImageUpload },
  data() {
    return {
      form: {
        title: '',
        description: '',
        image: '',
        price: ''
      },
    }
  },
  methods: {
    async submit() {
      await axios.post('products', this.form)
      await this.$router.push('/products')
    }
  }
}

</script>