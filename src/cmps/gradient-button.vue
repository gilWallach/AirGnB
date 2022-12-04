<template>
  <section class="gradient-button">
    <div class="btn-container">
      <div class="cell" v-for="num in 100" :key="num"></div>
      <div class="content">
        <button class="action-btn">
          <span>{{data}}</span>
        </button>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'gradient-button',
  props: {
    data: {
      type: String,
    }
  },
  data() {
    return {}
  },
  created() { },
  methods: {},
  computed: {},
  components: {},
}
</script>
