<template>
  <carousel :transition="600" :settings="settings" :breakpoints="breakpoints">
    <slide v-for="label in labels" :key="label">
      <div class="carousel__item flex" @click="setFilterBy(label.displayName)">
        <img :src="label.imageUrl" alt="" />
        <span class="label-name">{{ label.displayName }}</span>
      </div>
    </slide>
    <template #addons>
      <div style="width: 60px; height: 1px">
        <navigation />
      </div>
    </template>
  </carousel>
</template>
<script>
// If you are using PurgeCSS, make sure to whitelist the carousel CSS classes
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
export default {
  name: 'WrapAround',
  emits: ['filter-type'],
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  props: {
    labels: {
      type: Array,
    },
  },
  methods: {
    setFilterBy(type) {
      this.$emit('filter-type', type)
      const { name, startDate, endDate, guests } = this.$route.query
      this.$router.push({ path: '/s', query: { type, name, startDate, endDate, guests } })
    },
  },
  setup() {
    return {
      // carousel settings
      settings: {
        itemsToScroll: 3,
        itemsToShow: 3,
        snapAlign: 'center',
      },
      // breakpoints are mobile first
      // any settings not specified will fallback to the carousel settings
      breakpoints: {
        // 700px and up
        400: {
          itemsToScroll: 4,
          itemsToShow: 4,
          snapAlign: 'center',
        },
        500: {
          itemsToScroll: 5,
          itemsToShow: 5,
          snapAlign: 'center',
        },
        700: {
          itemsToShow: 7,
          snapAlign: 'center',
        },
        900: {
          itemsToShow: 9,
          snapAlign: 'center',
        },
        // 1024 and up
        1034: {
          itemsToScroll: 6,
          itemsToShow: 11,
          snapAlign: 'center',
        },
        1154: {
          itemsToShow: 12,
          snapAlign: 'center',
        },
        1254: {
          itemsToScroll: 9,
          itemsToShow: 14,
          snapAlign: 'center',
        },
        1400: {
          itemsToScroll: 9,
          itemsToShow: 14,
          snapAlign: 'center',
        },
        1600: {
          itemsToScroll: 9,
          itemsToShow: 18,
          snapAlign: 'center',
        },
      },
    }
  },
}
</script>