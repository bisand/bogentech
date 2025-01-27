<script lang="ts" setup>
definePageMeta({
  layout: "landing",
  middleware: ['auth-logged-in'],
})
const { data } = await useFetch('/api/hello')
</script>

<template>
  <LandingContainer class="mt-32">
    Dashboard<pre>{{ data }}</pre>
  </LandingContainer>
</template>

<style></style>