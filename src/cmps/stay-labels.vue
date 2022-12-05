<template>
  <Carousel :items-to-show="2.5">
    <Slide v-for="label in labels" :key="label.displayName">
      <div @click="setFilterBy(label.displayName)" class="flex">
        <img :src="label.imageUrl" alt="">
        <span class="label-name">
          {{ label.displayName }}
        </span>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  name: 'Breakpoints',
  props: {
    labels: {
      type: Array,
    },
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
})
</script>
