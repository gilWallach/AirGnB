<template>
  <section class="stay-preview">
    <router-link :to="`/stay/${stay._id}`">
      <li class="card">
        <div class="img-container">
          <div class="wishlist"><heart/></div>
          <stay-carousel :stay="stay"/>
          <!-- <img :src="stay.imgUrls[0]" alt="stay imgs" class="card-image"> -->
        </div>
        <div class="stay-txt">
          <div class="title flex justify-space-between align-center">
            <p>{{ stay.name }}</p>
            <div class="rating flex align-center">
              <span><star/></span>
              <span>New</span>
            </div>
          </div>
          <p>{{ stay.capacity }} guests</p>
          <p>Dec 4-9</p>
          <p class="price"><span>${{ stay.price?.toLocaleString() }}</span> night</p>
        </div>
      </li>
    </router-link>
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
  created() {},
  methods: {},
  computed: {},
  components: {
    star,
    heart,
    stayCarousel
  },
}
</script>
