<script setup>
definePageMeta({
  layout: "landing",
});
</script>

<template>
  <LandingContainer>
    <LandingSectionhead>
      <template v-slot:title>Kontakt</template>
      <template v-slot:desc>Vi er her for å hjelpe til.</template>
    </LandingSectionhead>

    <div class="grid md:grid-cols-2 gap-10 mx-auto max-w-4xl mt-16">
      <div>
        <h2 class="font-medium text-2xl">
          Kontakt BogenTech
        </h2>
        <p class="text-lg leading-relaxed mt-3">
          Har du spørsmål. Fyll ut skjemaet, <br>eller send oss en e-post.
        </p>
        <div class="mt-5">
          <div class="flex items-center mt-2 space-x-2">
            <Icon class="text-gray-400 w-4 h-4" name="uil:map-marker" />
            <span>Tønsberg</span>
          </div>
          <div class="flex items-center mt-2 space-x-2">
            <Icon class="text-gray-400 w-4 h-4" name="uil:envelope" /><a
              href="mailto:andre@bogentech.no"
              >andre@bogentech.no</a
            >
          </div>
          <!-- <div class="flex items-center mt-2 space-x-2 text-gray-600">
            <Icon class="text-gray-400 w-4 h-4" name="uil:phone" /><a
              href="tel:+1 (234) 5678 999"
              >+1 (234) 5678 999</a
            >
          </div> -->
        </div>
      </div>
      <div>
        <LandingContactform />
      </div>
    </div>
  </LandingContainer>
</template>
