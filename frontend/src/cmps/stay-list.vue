<template>
  <section class="main-layout-list">
    <div class="placeholder" ref="placeholder"></div>
    <div class="list-header-container main-layout-list" :class="{ 'scroll-shadow': scrollShadow }">
      <div class="list-header flex align-center justify-space-between">
        <stay-labels v-if="labels" :labels="labels" />

        <button @click="openFilterModal" class="filter-btn flex align-center justify-center">
          <filter-icon />
          <span>Filters</span>
        </button>
      </div>
    </div>
    <div v-if="(isSearch)" class="serch-results-number">
      IS SERCH
    </div>
    <ul class="stay-list">
      <stay-preview v-for="stay in stays" :key="stay._id" :stay="stay" :date="date" @addToWishlist="addToWishlist" />
    </ul>

  </section>
  <transition name="fade">
    <list-modal v-if="isModalOpen" @closeModal="closeModal" :isWishlist="isWishlist" />
  </transition>

  <transition name="fade">
    <div class="main-screen" v-if="isModalOpen" @click="isModalOpen = false"></div>
  </transition>
</template>

<script>
import stayLabels from './stay-labels.vue'
import stayPreview from './stay-preview.vue'
import listModal from './list-modal.vue'

import filterIcon from '../assets/svg/filter.vue'

export default {
  name: 'stay-list',
  props: {
    stays: {
      type: Array,
    },
    labels: {
      type: Array,
    },
    date: {
      type: Object
    }
  },
  data() {
    return {
      listObserver: null,
      scrollShadow: false,

      isModalOpen: false,
      iswishList: null,

      isSearch: false
    }
  },
  created() {
    console.log(typeof(this.$route.query))
    // if (this.$route.query !== {} ) this.isSearch = true
  },
  mounted() {
    this.listObserver = new IntersectionObserver(this.onListObserved, {

    })
    this.listObserver.observe(this.$refs.placeholder)
  },
  methods: {
    onListObserved(entries) {
      entries.forEach((entry) => {
        this.scrollShadow = entry.isIntersecting ? false : true
      })
    },
    addToWishlist(stayId) {
      this.isWishlist = true
      this.isModalOpen = true
    },
    openFilterModal() {
      this.isWishlist = false
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
      this.isWishlist = null
    },
  },
  computed: {},
  components: {
    stayLabels,
    filterIcon,
    stayPreview,
    listModal,
  },
}
</script>
