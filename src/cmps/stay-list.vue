<template>
  <section>
    <ul class="stay-list">
      <li v-for="stay in stays" :key="stay._id">
        <stay-preview :stay="stay" />
      </li>
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
      required: true,
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {},
  components: {
    stayPreview,
  },
}
</script>
