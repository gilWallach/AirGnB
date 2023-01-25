<template>
  <section class="user-review">
    <div class="review-header flex align-center">
      <img :src="review.by.imgUrl" alt="reviewer image" class="avatar" />
      <div class="details flex column">
        <h3 class="review-title">{{ review.by.fullname }}</h3>
        <p class="review-subtitle">{{ formatDate }}</p>
      </div>
    </div>
    <div class="review-details">
      <p class="review-txt">{{ review.txt }}</p>
    </div>
  </section>
</template>
<script>
export default {
  name: 'review',
  props: {
    review: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {
    formatDate() {
      const date = new Date(this.review.at)
      return date.toLocaleString('en-us', { year: 'numeric', month: 'long' })
    },
  },
  components: {},
}
</script>
