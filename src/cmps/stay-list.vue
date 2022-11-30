<template>
  <section>
    <ul class="stay-list">
      <stay-preview v-for="stay in stays" :key="stay._id" :stay="stay" />
    </ul>
  </section>
</template>

<script>
import stayPreview from './stay-preview.vue'
export default {
  name: 'stay-list',
  props: {
    stays: {
      type: Array,
    },
  },
  created() {},
  methods: {},
  computed: {},
  components: {
    stayPreview,
  },
}
</script>
