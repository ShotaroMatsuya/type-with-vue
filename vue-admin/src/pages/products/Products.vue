<template>
      <div class="table-responsive">
      <table class="table table-striped table-sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td><img :src="product.image" width="50" /></td>
            <td>{{ product.title }}</td>
            <td>{{ product.description }}</td>
            <td>{{ product.price }}</td>
            <td>
              <div class="btn-group mr-2">
                <router-link :to="`/products/${product.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit</router-link>
                <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(product.id)">Delete</a>
              </div>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
    <ButtonPaginator :last-page="lastPage" @page-changed="load($event)"/>
  </template>

<script lang="ts">
import axios from 'axios';
import {Product} from '@/models/product'
import ButtonPaginator from '@/components/ButtonPaginator.vue'
export default {
  name: 'ProductsPage',
  components: {ButtonPaginator},
  data() {
    return {
      products: [] as Array<any>,
      lastPage: 0
    }
  },
  async mounted() {
    await this.load()
  },
  watch: {
    page() {
      this.load()
    }
  },
  methods: {
    async load(page = 1) {
      const {data} = await axios.get(`products?page=${page}`);
      this.products = data.data;
      this.lastPage = data.meta.last_page;
    },
    async del(id: number) {
      if(confirm('Ar you sure ?')) {
        await axios.delete(`products/${id}`)

        this.products = this.products.filter((p: Product) => p.id !== id)
      }
    }
  }
}

</script>