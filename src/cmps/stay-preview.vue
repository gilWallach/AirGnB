<template>
  <section class="stay-preview" @click="goToDetails(stay._id)">
    <li class="card">
      <div class="img-container">
        <div class="wishlist">
          <heart @click.stop="$emit('addToWishlist', stay._id)"/>
        </div>
        <stay-carousel :stay="stay" />
      </div>
      <div class="stay-txt">
        <div class="title flex justify-space-between align-center">
          <p><span>{{ stay.loc.city + ', ' + stay.loc.country }}</span></p>
          <div class="rating flex align-center">
            <span>
              <star />
            </span>
            <span>4.47 (254)</span>
          </div>
        </div>
        <p>{{ stay.name }}</p>
        <p>{{ stay.capacity }} beds</p>
        <p>Dec 4-9</p>
        <p class="price">
          <span>${{ stay.price?.toLocaleString() }}</span> night
        </p>
      </div>
    </li>
  </section>
</template>

<script>
import star from '../assets/svg/star.vue'
import heart from '../assets/svg/heart.vue'
import stayCarousel from './stay-carousel.vue'

export default {
  name: 'stay-preview',
  emits: [ 'addToWishlist'],
  props: {
    stay: {
      type: Object,
    },
  },
  data() {
    return {
    }
  },
  created() { },
  methods: {
    goToDetails(stayId) {
      let route = this.$router.resolve({ path: `/stay/${stayId}` })
      window.open(route.href);
    },
  },
  computed: {

  },
  components: {
    star,
    heart,
    stayCarousel,
  },
}
</script>
