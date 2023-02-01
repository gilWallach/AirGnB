<template>
  <section class="stay-reviews" @click="onCloseReviewsModal">
    <transition name="fade">
      <reviews-modal
        v-if="isShowReviewsModal && isModalOpen"
        :reviews="this.reviews"
        @closeModal="onCloseReviewsModal"
      />
    </transition>
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
          <div
            v-if="this.reviews.length > 6"
            @click.stop="onShowReviewsModal"
            class="btn-show-reviews"
          >
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
import reviewsModal from '../cmps/reviews-modal.vue'
export default {
  name: 'reviews-summary',
  props: {
    reviews: {
      type: Array,
      required: true,
    },
    isModalOpen: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      isShowReviewsModal: false,
    }
  },
  created() {},
  methods: {
    onShowReviewsModal() {
      this.isShowReviewsModal = true
      this.$emit('showModal')
    },
    onCloseReviewsModal() {
      this.isShowReviewsModal = false
      this.$emit('closeModal')
    },
  },
  computed: {},
  components: {
    stayReviewsSummary,
    userReview,
    reviewsModal,
  },
}
</script>
