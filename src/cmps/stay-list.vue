<template>
  <section class="main-layout-list">
    <div class="list-top-container flex align-center justify-space-between">
      <stay-labels />
        <button class="filter-btn flex align-center justify-center">
          <filter-icon/>
          <span>Filters</span>
        </button>        
    </div>
    <ul class="stay-list">
      <stay-preview v-for="stay in stays" :key="stay._id" :stay="stay" />
    </ul>
  </section>
</template>

<script>
import stayLabels from './stay-labels.vue'
import filterIcon from '../assets/svg/filter.vue'
import stayPreview from './stay-preview.vue'

export default {
  name: 'stay-list',
  props: {
    stays: {
      type: Array,
    },
  },
  created() {},
  methods: {},
  computed: {},
  components: {
    stayLabels,
    filterIcon,
    stayPreview,
  },
}
</script>
