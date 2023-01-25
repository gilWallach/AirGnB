<template>
  <section class="long-text">
    <p>{{ displayTxt }}</p>
    <button v-if="isTxtLong" @click="toggleReadMore" class="show-more">
      Show {{ buttonTxt }} >
    </button>
  </section>
</template>
<script>
export default {
  name: 'long-text',
  props: {
    txt: {
      type: String,
    },
    maxLength: {
      type: Number,
    },
  },
  data() {
    return {
      isReadMore: false,
    }
  },
  created() {},
  methods: {
    toggleReadMore() {
      this.isReadMore = !this.isReadMore
    },
  },
  computed: {
    displayTxt() {
      if (this.isReadMore || !this.isTxtLong) return this.txt
      return this.txt.slice(0, this.maxLength) + '...'
    },
    buttonTxt() {
      return this.isReadMore ? 'less' : 'more'
    },
    isTxtLong() {
      return this.txt.length > this.maxLength
    },
  },
  components: {},
}
</script>
