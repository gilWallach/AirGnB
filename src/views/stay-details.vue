<template>
  <section v-if="stay" class="stay-details">
    <!-- <pre>{{ getStay[0].name }}</pre> -->
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
