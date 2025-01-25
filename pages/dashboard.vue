<script lang="ts" setup>
definePageMeta({
  layout: "landing",
  middleware: ['auth-logged-in'],
})
const { data } = await useFetch('/api/hello')
</script>

<template>
  <div>
    Dashboard<pre>{{ data }}</pre>
  </div>
</template>

<style></style>