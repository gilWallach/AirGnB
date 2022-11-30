<template>
  <section v-if="stay" class="stay-details">
    <h1>{{ getStay.name }}</h1>
    <p class="rate">4.82</p>
    <p class="reviews-amount">{{ getStay.reviews?.length }} reviews</p>
    <p class="address">{{ getStay.loc.city }}, {{ getStay.loc.country }}</p>
    <div class="gallery">
      <img v-for="(img, idx) in getStay.imgUrls" :src="img" alt="stay-image" />
    </div>
    <pre>{{ getStay }}</pre>
  </section>
  <section v-else class="loading">Loading....</section>
</template>

<script>
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
  components: {},
}
</script>
