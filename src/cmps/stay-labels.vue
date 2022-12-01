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
import { stayService } from '../services/stay.service.local'

export default {
  name: 'stay-labels',
  props: {},
  data() {
    return {
      labels: stayService.getLabels(),
    }
  },
  created() {},
  methods: {},
  computed: {},
  components: {},
}
</script>
