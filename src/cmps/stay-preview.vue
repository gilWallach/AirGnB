<template>
  <section class="stay-preview">
    <router-link :to="`/stay/${stay._id}`">
      <li class="card">
        <div class="img-container">
          <img :src="stay.imgUrls[0]" alt="stay imgs" class="card-image">
        </div>
        <div class="stay-txt">
          <div class="title flex justify-space-between">
            <p>{{ stay.name }}</p>
            <div class="rating flex">
              <span>New</span>
              <span><star/></span>
            </div>
          </div>
          <p>{{ stay.capacity }} guests</p>
          <p>Dec 4-9</p>
          <p>${{ stay.price?.toLocaleString() }} night</p>
        </div>
      </li>
    </router-link>
  </section>
</template>

<script>
import star from '../assets/svg/star.vue'
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
    star
  },
}
</script>
