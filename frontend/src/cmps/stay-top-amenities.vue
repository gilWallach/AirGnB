<template>
  <section class="stay-top-amenities">
    <div class="highlight-element">
      <div class="highlight-icon"><dedicated-workspace /></div>
      <div class="highlight-feature">
        <div class="highlight-header">Dedicated workspace</div>
        <div class="highlight-txt">
          A private room with wifi that's well-suited for working.
        </div>
      </div>
    </div>
    <div class="highlight-element">
      <div class="highlight-icon"><self-checkin /></div>
      <div class="highlight-feature">
        <div class="highlight-header">Self check-in</div>
        <div class="highlight-txt">Check yourself in with the lockbox.</div>
      </div>
    </div>
    <div class="highlight-element">
      <div class="highlight-icon"><free-cxl /></div>
      <div class="highlight-feature">
        <div class="highlight-header">
          Free cancellation before {{ this.nextMonth }} 28.
        </div>
        <div class="highlight-txt"></div>
      </div>
    </div>
  </section>
</template>
<script>
import dedicatedWorkspace from '../assets/svg/dedicated-workspace.vue'
import selfCheckin from '../assets/svg/self-checkin.vue'
import freeCxl from '../assets/svg/free-cxl.vue'

export default {
  name: 'stay-top-amenities',
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
  components: {
    dedicatedWorkspace,
    selfCheckin,
    freeCxl,
  },
}
</script>
