<template>
  <section class="stay-labels">
    <ul class="labels-container">
      <li
        v-for="(label, idx) in labels"
        :key="label.name"
        class="single-label-container"
      >
        <div>
          <img :src="label.imageUrl" alt="label-img" />
        </div>
        <div>
          {{ label.displayName }}
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
import { labelService } from '../services/label.service.local'

export default {
  name: 'stay-labels',
  props: {},
  data() {
    return {
      labels: null,
    }
  },
  async created() {
    try {
      const labels = await labelService.query()
      this.labels = labels
      console.log('labels: ', labels)
    } catch (err) {
      throw new Error(err)
    }
  },
  methods: {},
  computed: {},
  components: {},
}
</script>
