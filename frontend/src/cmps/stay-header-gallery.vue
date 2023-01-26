<template>
  <section class="stay-header-gallery">
    <div class="gallery">
      <img
        v-for="(img, idx) in imgs"
        :src="img"
        alt="stay-image"
        :class="'gallery-img img' + idx"
      />
    </div>
  </section>
</template>
<script>
export default {
  name: 'stay-header-gallery',
  props: {
    stayImgs: {
      type: Array,
      required: true,
    },
    maxImgs: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      imgs: null,
    }
  },
  created() {
    const imgsToShow = this.maxImgs || this.stayImgs.length
    this.imgs =
      this.stayImgs.length > imgsToShow
        ? this.stayImgs.slice(0, imgsToShow)
        : this.stayImgs
  },
  methods: {},
  computed: {},
  components: {},
}
</script>
