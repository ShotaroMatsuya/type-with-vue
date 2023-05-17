<template>
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
export default {
  name: 'ButtonPaginator',
  props: {
    lastPage: Number
  },
  emits: ['page-changed'],
  data() {
    return {
      users: [] as Array<any>,
      page: 1
    }
  },
  watch: {
    page() {
      this.$emit('page-changed', this.page)
    }
  },
  methods: {
    async next() {
      if (this.lastPage !== undefined) {
        if (this.page < this.lastPage) {
          this.page++
        }
      }
    },
    async prev() {
      if (this.page > 1) {
        this.page--
      }
    }
  }
};
</script>