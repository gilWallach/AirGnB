<template>
  <section class="stay-preview" @click="goToDetails(stay._id)">
    <li class="card">
      <div class="img-container">
        <div class="wishlist">
          <heart />
        </div>
        <stay-carousel :stay="stay" />
      </div>
      <div class="stay-txt">
        <div class="title flex justify-space-between align-center">
          <p><span>{{ shortLoc(stay.loc.city + ', ' + stay.loc.country) }}</span></p>
          <div class="rating flex align-center">
            <span>
              <star />
            </span>
            <span>4.47 (254)</span>
          </div>
        </div>
        <p>{{ shortName(stay.name) }}</p>
        <p>{{ stay.capacity }} beds</p>
        <p>Dec 4-9</p>
        <p class="price">
          ${{ stay.price?.toLocaleString() }} night
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
  props: {
    stay: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  created() { },
  methods: {
    goToDetails(stayId) {
      let route = this.$router.resolve({ path: `/stay/${stayId}` });
      window.open(route.href);
    },
    shortLoc(txt) {
      if (txt.length > 17) {
        return txt.substring(0, 17) + '...'
      }
      else return txt
    },
    shortName(txt) {
      if (txt.length > 24) {
        return txt.substring(0, 24) + '...'
      }
      else return txt
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
