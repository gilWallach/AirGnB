<template>
  <section class="stay-header-gallery">
    <div class="gallery" ref="elGallery">
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
      galleryObserver: null,
      isShowSubHeader: false,
    }
  },
  created() {
    const imgsToShow = this.maxImgs || this.stayImgs.length
    this.imgs =
      this.stayImgs.length > imgsToShow
        ? this.stayImgs.slice(0, imgsToShow)
        : this.stayImgs
  },
  mounted() {
    this.galleryObserver = new IntersectionObserver(this.onGalleryObserved, {
      rootMargin: '0px 0px 0px 0px',
    })
    this.galleryObserver.observe(this.$refs.elGallery)
  },
  methods: {
    onGalleryObserved(entries) {
      entries.forEach((entry) => {
        this.isShowSubHeader = entry.isIntersecting ? false : true
        this.$emit('onSetIsShowSubHeader', this.isShowSubHeader)
      })
    },
  },
  computed: {},
  components: {},
}
</script>
