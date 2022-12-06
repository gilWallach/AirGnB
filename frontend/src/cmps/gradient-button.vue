<template>
  <section class="gradient-button ">
    <div class="btn-container">
      <div class="cell" v-for="num in 100" :key="num"></div>
      <div class="content">
        <button class="action-btn flex align-center justify-center">
          <search-big v-if="searchCmp"/>
          <span>{{ data }}</span>
        </button>
      </div>
    </div>
  </section>
</template>
<script>
import searchBig from '../assets/svg/search-big.vue';

export default {
  name: 'gradient-button',
  props: {
    data: {
      type: String,
    },
    searchCmp: {
      type: Boolean,
    }
  },
  data() {
    return {}
  },
  created() { },
  methods: {},
  computed: {},
  components: {
    searchBig
  },
}
</script>
