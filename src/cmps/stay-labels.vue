<template>
  <section class="stay-labels">

<!-- <labels-carousel/> -->

    <ul class="labels-container">
      <li v-for="(label, idx) in labels" :key="label.name" class="single-label-container flex">
        <div>
          <img :src="label.imageUrl" alt="label-img" />
        </div>
        <div class="label-name">
          {{ label.displayName }}
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { stayService } from '../services/stay.service.local'
// import labelsCarousel from './carousel-test.vue'
export default {
  name: 'stay-labels',
  props: {},
  data() {
    return {
      labels: stayService.getLabels(),
      settings: {
        "dots": true,
        "focusOnSelect": true,
        "infinite": true,
        "speed": 500,
        "slidesToShow": 3,
        "slidesToScroll": 3,
        "touchThreshold": 5
      }
    }
  },
  created() { },
  methods: {},
  computed: {},
  components: {
    // labelsCarousel,
  },
}
</script>
