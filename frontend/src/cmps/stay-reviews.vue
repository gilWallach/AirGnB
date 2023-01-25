<template>
  <section class="stay-reviews">
    <div class="reviews-container">
      <!-- REVIEWS HEADER - KPIS SUMMARY -->
      <stay-reviews-summary :reviews="this.reviews" />

      <!-- REVIEWS DETAILS -->
      <div class="reviews-details">
        <user-review
          v-for="review in this.reviews.slice(0, 6)"
          :review="review"
          :key="review.id"
        />
        <div class="more-reviews">
          <div class="btn-show-reviews">
            Show all {{ this.reviews?.length }} reviews
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import stayReviewsSummary from '../cmps/stay-reviews-summary.vue'
import userReview from '../cmps/user-review.vue'
export default {
  name: 'reviews-summary',
  props: {
    reviews: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  components: {
    stayReviewsSummary,
    userReview,
  },
}
</script>
