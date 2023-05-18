<template>
  <form @submit.prevent="submit">
    <div class="mb-3">
      <label>Title</label>
      <input v-model="form.title" class="form-control" name="title">
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
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from "vue-router";
import ImageUpload from "@/components/ImageUpload.vue";

export default {
  name: "ProductEdit",
  components: { ImageUpload },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const form = reactive({
      title: '',
      description: '',
      image: '',
      price: ''
    });

    onMounted(async () => {
      const response = await axios.get(`products/${route.params.id}`);

      form.title = response.data.title;
      form.description = response.data.description;
      form.image = response.data.image;
      form.price = response.data.price;
    });

    const submit = async () => {
      await axios.put(`products/${route.params.id}`, form);

      await router.push('/products');
    }

    return {
      form,
      submit
    }
  }
}

</script>