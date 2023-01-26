<template>
  <section class="stay-summary-text">
    <longText :txt="summary" :maxLength="300" />
  </section>
</template>
<script>
import longText from './long-text.vue'
export default {
  name: 'stay-summary-text',
  props: {
    summary: {
      type: String,
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
    longText,
  },
}
</script>
