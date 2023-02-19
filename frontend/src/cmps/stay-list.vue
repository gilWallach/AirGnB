<template>
  <section v-if="stays" class="main-layout-list flex">
    <div class="placeholder" ref="placeholder"></div>
    <div
      class="list-header-container main-layout-list"
      :class="{ 'scroll-shadow': scrollShadow }"
    >
      <div  v-if="$store.getters.stays.length" class="list-header flex align-center justify-space-between">
        <stay-labels
          v-if="labels"
          :labels="labels"
          @filter-type="$emit('filter-type')"
        />

        <button
          @click="openFilterModal"
          class="filter-btn flex align-center justify-center"
        >
          <filter-icon />
          <span>Filters</span>
        </button>
      </div>
    </div>
    <p v-if="isSearch" class="search-results-number">
      {{ stays.length }} homes in {{ $route.query.name }}
    </p>
    <ul class="stay-list">
      <stay-preview
        v-for="stay in stays"
        :key="stay._id"
        :stay="stay"
        :date="date"
        @addToWishlist="addToWishlist"
      />
    </ul>
  </section>
  <transition name="fade">
    <list-modal
      v-if="isModalOpen"
      @closeModal="closeModal"
      :isWishlist="isWishlist"
      :stayId="newWishlistStayId"
      @filter="filter"
    />
  </transition>

  <transition name="fade">
    <div
      class="main-screen"
      v-if="isModalOpen"
      @click="isModalOpen = false"
    ></div>
  </transition>
</template>

<script>
import stayLabels from './stay-labels.vue'
import stayPreview from './stay-preview.vue'
import listModal from './list-modal.vue'

import filterIcon from '../assets/svg/filter.vue'

export default {
  name: 'stay-list',
  emits: ['filter-type'],
  props: {
    stays: {
      type: Array,
    },
    labels: {
      type: Array,
    },
    date: {
      type: Object,
    },
  },
  data() {
    return {
      newWishlistStayId: null,
      listObserver: null,
      scrollShadow: false,

      isModalOpen: false,
      iswishList: null,

      isSearch: false,
    }
  },
  created() {
    if (this.$route.query.name) this.isSearch = true
    // if (Object.values(this.$route.query).length) this.isSearch = true
  },
  mounted() {
    this.listObserver = new IntersectionObserver(this.onListObserved, {})
    this.listObserver.observe(this.$refs.placeholder)
  },
  methods: {
    onListObserved(entries) {
      entries.forEach((entry) => {
        this.scrollShadow = entry.isIntersecting ? false : true
      })
    },
    addToWishlist(stayId) {
      this.newWishlistStayId = stayId
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
    filter(filterBy) {
      this.$emit('filter', filterBy)
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
