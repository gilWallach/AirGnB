<template>
  <section class="stay-details">
    <h1>THIS IS DETAILS</h1>
  </section>
</template>

<script>
export default {
  name: 'stay-details',
  props: {},
  data() {
    return {}
  },
  created() {
    const { id } = this.$route.params
    console.log(id)
  },
  methods: {},
  computed: {},
  components: {},
}
</script>
