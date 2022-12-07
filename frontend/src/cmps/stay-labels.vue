<template>
  <carousel :transition="600">
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
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

export default {
  name: 'WrapAround',
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
  data() {
    return {
      filterBy: {
        label: '',
      },
    }
  },
  methods: {
    setFilterBy(label) {
      this.filterBy.label = label
      this.$router.push({ path: '/s', query: { label } })
    },
  },
}
</script>