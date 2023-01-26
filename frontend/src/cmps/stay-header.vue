<template>
  <section class="stay-header">
    <div class="details-header">
      <h1>{{ this.stay.name }}</h1>
    </div>

    <!-- STAY DETAILS AND RATINGS -->
    <div class="stay-details-container">
      <div class="details-ratings-container">
        <p class="rate">
          <star /><span
            >&nbsp; {{ this.stay.reviews.length ? reviewsAvg : 'New' }} </span
          ><span class="separator">·</span>
        </p>
        <p>
          <span class="reviews-amount"
            >{{ this.stay.reviews.length + ' ' + formatReviews }}
          </span>
          <span class="separator">·</span>
        </p>
        <p class="address">
          {{ this.stay.loc.city }}, {{ this.stay.loc.country }}
        </p>
      </div>

      <!-- SHARE AND SAVE -->
      <div class="action-btns">
        <div class="share action-btn"><share /> <span>Share</span></div>
        <div class="save action-btn"><save /> <span>Save</span></div>
      </div>
    </div>
  </section>
</template>
<script>
import star from '../assets/svg/star.vue'
import share from '../assets/svg/share.vue'
import save from '../assets/svg/save.vue'

export default {
  name: 'stay-header',
  props: {
    stay: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {
    formatReviews() {
      return this.stay.reviews.length > 1 ? 'reviews' : 'review'
    },
    reviewsAvg() {
      let average =
        this.stay.reviews.reduce((sum, review) => {
          return sum + +review.rate
        }, 0) / this.stay.reviews.length

      return average.toFixed(2)
    },
  },
  components: {
    star,
    share,
    save,
  },
}
</script>
