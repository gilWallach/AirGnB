<template>
  <section class="stay-reviews-summary">
    <div class="reviews-header">
      <div class="title">
        <div class="rating-reviews flex">
          <star /><span>&nbsp; {{ reviewsAvg }} </span
          ><span class="separator">&nbsp;·&nbsp;</span>
          <span class="reviews-amount"
            >{{ this.reviews?.length }} reviews
          </span>
        </div>
      </div>

      <div class="reviews-kpis-list">
        <div class="review-item flex justify-space-between">
          <div class="kpi-title">Cleanliness</div>
          <div class="rate-container flex align-center">
            <div class="kpis">
              <div
                class="cleanliness"
                :style="getWidth((this.reviewsAvg * 1.1).toFixed(2))"
              ></div>
            </div>
            <!-- <div class="rate-value">4.6</div> -->
            <div class="rate-value">
              {{
                this.reviewsAvg * 1.1 > 5
                  ? Number(5).toFixed(2)
                  : (this.reviewsAvg * 1.1).toFixed(2)
              }}
            </div>
          </div>
        </div>
        <div class="review-item flex justify-space-between">
          <div class="kpi-title">Communication</div>
          <div class="rate-container flex align-center">
            <div class="kpis">
              <div
                class="communication"
                :style="getWidth((this.reviewsAvg * 0.9).toFixed(2))"
              ></div>
            </div>
            <div class="rate-value">
              {{ (this.reviewsAvg * 0.9).toFixed(2) }}
            </div>
          </div>
        </div>
        <div class="review-item flex justify-space-between">
          <div class="kpi-title">Check-in</div>
          <div class="rate-container flex align-center">
            <div
              class="kpis"
              :style="getWidth((this.reviewsAvg * 1.2).toFixed(2))"
            >
              <div class="check-in"></div>
            </div>
            <div class="rate-value">
              {{
                this.reviewsAvg * 1.2 > 5
                  ? Number(5).toFixed(2)
                  : (this.reviewsAvg * 1.2).toFixed(2)
              }}
            </div>
          </div>
        </div>
        <div class="review-item flex justify-space-between">
          <div class="kpi-title">Accuracy</div>
          <div class="rate-container flex align-center">
            <div class="kpis">
              <div
                class="accuracy"
                :style="getWidth((this.reviewsAvg * 0.8).toFixed(2))"
              ></div>
            </div>
            <div class="rate-value">
              {{ (this.reviewsAvg * 0.8).toFixed(2) }}
            </div>
          </div>
        </div>
        <div class="review-item flex justify-space-between">
          <div class="kpi-title">Location</div>
          <div class="rate-container flex align-center">
            <div class="kpis">
              <div
                class="location"
                :style="getWidth((this.reviewsAvg * 1.25).toFixed(2))"
              ></div>
            </div>
            <div class="rate-value">
              {{
                this.reviewsAvg * 1.25 > 5
                  ? Number(5).toFixed(2)
                  : (this.reviewsAvg * 1.25).toFixed(2)
              }}
            </div>
          </div>
        </div>
        <div class="review-item flex justify-space-between">
          <div class="kpi-title">Value</div>
          <div class="rate-container flex align-center">
            <div class="kpis">
              <div
                class="value"
                :style="getWidth((this.reviewsAvg * 0.75).toFixed(2))"
              ></div>
            </div>
            <div class="rate-value">
              {{ (this.reviewsAvg * 0.75).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import star from '../assets/svg/star.vue'
export default {
  name: 'stay-reviews-summary',
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
  methods: {
    getWidth(rate) {
      const barWidth = (rate / 5) * 121.5 > 121.5 ? 121.5 : (rate / 5) * 121.5
      return { width: barWidth + 'px' }
    },
  },
  computed: {
    reviewsAvg() {
      let average =
        this.reviews.reduce((sum, review) => {
          return sum + +review.rate
        }, 0) / this.reviews.length

      return average.toFixed(2)
    },
  },
  components: {
    star,
  },
}
</script>
