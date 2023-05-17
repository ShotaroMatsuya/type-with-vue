<template>
    <label class="btn btn-primary">
        Upload <input type="file" hidden @change="upload($event)">
    </label>
</template>

<script lang="ts">
import axios from 'axios'
export default {
    name: "ImageUpload",
    emits: ['uploaded'],
    methods: {
        async upload (e: Event) {
            const { target } = e;
            if (!(target instanceof HTMLInputElement)) return;
            const files: FileList | null = target.files;
            if (files == null) return;
            const formData = new FormData();
            formData.append('image', files[0]);

            const { data } = await axios.post('upload', formData);

            this.$emit('uploaded', data.url)
        }
    }
}
</script>

<style scoped></style>