<template>
  <!-- HEADER -->
  <section v-if="stay" class="stay-details">
    <div class="details-header">
      <h1>{{ getStay.name }}</h1>
    </div>

    <!-- STAY DETAILS AND RATINGS -->
    <div class="stay-details-container">
      <div class="details-ratings-container">
        <p class="rate">
          <star /><span> 4.82 </span><span class="separator">·</span>
        </p>
        <p>
          <span class="reviews-amount"
            >{{ getStay.reviews?.length }} reviews
          </span>
          <span class="separator">·</span>
        </p>
        <p class="address">{{ getStay.loc.city }}, {{ getStay.loc.country }}</p>
      </div>

      <!-- SHARE AND SAVE -->
      <div class="action-btns">
        <div class="share action-btn"><share /> <span>Share</span></div>
        <div class="save action-btn"><save /> <span>Save</span></div>
      </div>
    </div>

    <!-- IMAGE GALLERY -->
    <div class="gallery">
      <img v-for="(img, idx) in getStay.imgUrls" :src="img" alt="stay-image" />
    </div>

    <pre>{{ getStay }}</pre>
  </section>
  <section v-else class="loading">Loading....</section>
</template>

<script>
import star from '../assets/svg/star.vue'
import share from '../assets/svg/share.vue'
import save from '../assets/svg/save.vue'
export default {
  name: 'stay-details',
  props: {},
  data() {
    return {
      stay: null,
    }
  },
  created() {
    const { id } = this.$route.params
    const stays = this.$store.getters.stays
    this.stay = stays.find((stay) => stay._id === id)
    console.log('this.stay: ', this.stay)
  },
  methods: {},
  computed: {
    getStay() {
      return this.stay
    },
  },
  components: {
    star,
    share,
    save,
  },
}
</script>
