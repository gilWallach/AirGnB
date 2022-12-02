<template>
  <carousel :items-to-show="1.5" class="labels-container">
    <slide v-for="label in labels" :key="label" class="single-label-container">
      <img :src="label.imageUrl" alt="">
      <span class="label-name">
        {{ label.displayName }}
      </span>
    </slide>

    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

import {stayService} from '../services/stay.service.local.js'
export default {
  name: 'App',
  data(){
    return {
      labels: stayService.getLabels()
    }
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
}
</script>