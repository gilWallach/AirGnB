<template>
  <carousel :items-to-show="2.5" class="labels-container">
    <slide v-for="label in labels" :key="label">
      <div @click="setFilterBy(label.displayName)" class="flex">
        <!-- <img :src="label.imageUrl" alt=""> -->
        <span class="label-name">
          {{ label.displayName }}
        </span>
      </div>
    </slide>

    <template #addons>
      <Navigation />
    </template>
  </carousel>
</template>

<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

export default {
  name: 'WrapAround',
  props: {
    labels: {
      type: Array,
    },
  },
  data() {
    return {
      filterBy: {
        label: ''
      },
    }
  },
  methods: {
    setFilterBy(label) {
      this.filterBy.label = label
      this.$router.push({ path: '/s', query: { label } })
    },
  },
  components: {
    Carousel,
    Slide,
    Navigation,
  },
}
</script>