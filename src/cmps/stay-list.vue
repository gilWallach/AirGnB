<template>
  <section class="main-layout-list">
    <div class="list-header-container main-layout-list" :class="{'scroll-shadow': scrollShadow}">
      <div class="list-list-header flex align-center justify-space-between">
        <stay-labels :labels="labels"/>
          <a href="#" class="filter-btn flex align-center justify-center">
            <filter-icon/>
            <span>Filters</span>
          </a>        
      </div>
    </div>
    <ul class="stay-list" ref="list" >
      <stay-preview v-for="stay in stays" :key="stay._id" :stay="stay" />
    </ul>
  </section>
</template>

<script>
import stayLabels from './stay-labels.vue'
import filterIcon from '../assets/svg/filter.vue'
import stayPreview from './stay-preview.vue'
import { entries } from 'lodash'

export default {
  name: 'stay-list',
  props: {
    stays: {
      type: Array,
    },
    labels: {
      type: Array,
    },
  },
  data(){
    return{
      listObserver: null,
      scrollShadow: false
    }
  },
  
  mounted() {
    this.listObserver = new IntersectionObserver(this.onListObserved, {
      rootMargin: "-260px 0px 0px",
      threshold: .5
    })
    console.log('this.$refs.list', this.$refs.list)
    this.listObserver.observe(this.$refs.list)
    console.log('this.listObserver.observe(this.$refs.list)', this.listObserver.observe(this.$refs.list))
  },
  methods: {
    onListObserved(entries) {
      entries.forEach((entry) => {
        this.scrollShadow = entry.isIntersecting ? true : false;
      })
    },
  },
  computed: {},
  components: {
    stayLabels,
    filterIcon,
    stayPreview,
  },
}
</script>
