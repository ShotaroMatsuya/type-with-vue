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
import { ref, watch } from "vue";

export default {
  name: 'ButtonPaginator',
  props: {
    lastPage: {
      type: Number,
      required: true
    }
  },
  emits: ['page-changed'],
  setup(props: { lastPage: number }, context) {
    const page = ref(1);

    watch(page, () => {
      context.emit('page-changed', page.value);
    });

    const next = () => {
      if (page.value < props.lastPage) {
        page.value++;
      }
    }

    const prev = () => {
      if (page.value > 1) {
        page.value--;
      }
    }
    return {
      next,
      prev
    }
  }
}
</script>