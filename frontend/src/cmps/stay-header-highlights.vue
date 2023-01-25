<template>
  <section class="stay-header-highlights">
    <div class="stay-summary-container">
      <div class="stay-summary-text-container">
        <div class="stay-summary-text">
          {{ this.stay.roomType }} hosted by {{ this.stay.host.fullname }}
        </div>
        <div class="capacity">
          {{ this.stay.capacity }} beds ·
          {{ this.stay.bedrooms ? this.stay.bedrooms + ' rooms · ' : '' }}
          {{ this.stay.capacity + 2 }} guests
        </div>
      </div>
      <span
        ><img
          :src="this.stay.host.thumbnailUrl"
          alt="host-image"
          class="host-img"
          onerror="this.src=`https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png`"
      /></span>
    </div>
  </section>
</template>
<script>
export default {
  name: 'stay-header-highlights',
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
  computed: {},
  components: {},
}
</script>
