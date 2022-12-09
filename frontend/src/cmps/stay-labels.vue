<template>
  <carousel :transition="600">
    <slide v-for="(label, idx) in labels" :key="idx">
      <div
        class="carousel__item flex"
        @click="setFilterBy(label.displayName, idx)"
        ref="labels"
      >
        <img :src="label.imageUrl" alt="label" />
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
    setFilterBy(type, idx) {
      this.$refs.labels.forEach((label) => label.classList.remove('selected'))
      this.$refs.labels[idx].classList.add('selected')

      this.$emit('filter-type', type)
      const { name, startDate, endDate, guests } = this.$route.query
      this.$router.push({
        path: '/s',
        query: { type, name, startDate, endDate, guests },
      })
    },
  },
}
</script>
