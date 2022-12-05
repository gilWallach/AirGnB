<template>
  <Carousel :items-to-show="12">
    <Slide v-for="label in labels" :key="label.displayName">
      <div @click="setFilterBy(label.displayName)" class="flex carousel__item">
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
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {
  name: 'WrapAround',
  props: {
    labels: {
      type: Array,
    },
  },
  created(){
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
}
</script>
