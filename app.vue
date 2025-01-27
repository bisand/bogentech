<script setup lang="ts">
const colorMode = useColorMode()
console.log(colorMode.preference)
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}

.dark-mode body {
  background-color: rgb(38 38 38);
  color: #ebf4f1;
}

.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>