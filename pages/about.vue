<script setup>
definePageMeta({
  layout: "landing",
});

const TeamImg1 = "https://source.unsplash.com/IF9TK5Uy-KI";
const TeamImg2 = "https://source.unsplash.com/iEEBWgY_6lA";
const TeamImg3 = "https://source.unsplash.com/ZHvM3XIOHoE";

const team = [
  // {
  //   name: "Janette Lynch",
  //   title: "Senior Director",
  //   avatar: {
  //     src: TeamImg1,
  //     width: 480,
  //     height: 560,
  //   },
  // },
  // {
  //   name: "Marcell Ziemann",
  //   title: "Principal Strategist",
  //   avatar: {
  //     src: TeamImg2,
  //     width: 580,
  //     height: 580,
  //   },
  // },
  // {
  //   name: "Robert Palmer",
  //   title: "Marketing Engineer",
  //   avatar: {
  //     src: TeamImg3,
  //     width: 580,
  //     height: 580,
  //   },
  // },
];
</script>

<template>
  <LandingContainer class="mt-32 px-10">
    <LandingSectionhead>
      <template v-slot:title>Om oss</template>
      <template v-slot:desc>Utvikling av teknologi basert på idéer og kompetanse...</template>
    </LandingSectionhead>

    <div class="flex flex-col gap-3 mx-auto max-w-4xl mt-16">
      <h2 class="font-bold text-3xl text-gray-800">

      </h2>
      <p class="text-lg leading-relaxed text-slate-500">

      </p>
    </div>
    <div class="grid md:grid-cols-3 gap-10 mx-auto max-w-4xl mt-12">
      <div v-for="item of team" class="group">
        <div class="w-full aspect-square">
          <img :src="item.avatar.src" :width="item.avatar.width" :height="item.avatar.height" format="avif" alt="Team"
            class="w-full h-full object-cover rounded transition group-hover:-translate-y-1 group-hover:shadow-xl" />
        </div>

        <div class="mt-4 text-center">
          <h2 class="text-lg text-gray-800">{{ item.name }}</h2>
          <h3 class="text-sm text-slate-500">{{ item.title }}</h3>
        </div>
      </div>
      <!-- {
        team.map((item) => (
          <div class="group">
            <div class="w-full aspect-square">
              <Image
                {...item.avatar}
                format="avif"
                alt="Team"
                class="w-full h-full object-cover rounded transition  group-hover:-translate-y-1 group-hover:shadow-xl"
              />
            </div>

            <div class="mt-4 text-center">
              <h2 class="text-lg text-gray-800"> {item.name}</h2>
              <h3 class="text-sm text-slate-500"> {item.title}</h3>
            </div>
          </div>
        ))
      } -->
    </div>
  </LandingContainer>
</template>
