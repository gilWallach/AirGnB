<template>
  <div class="main-container-stay-details">
    <!-- HEADER -->
    <section v-if="getStay" class="stay-details">
      <div class="details-header">
        <h1>{{ getStay.name }}</h1>
      </div>

      <!-- STAY DETAILS AND RATINGS -->
      <div class="stay-details-container">
        <div class="details-ratings-container">
          <p class="rate">
            <star /><span> 4.82 </span><span class="separator">·</span>
          </p>
          <p>
            <span class="reviews-amount"
              >{{ getStay.reviews?.length }} reviews
            </span>
            <span class="separator">·</span>
          </p>
          <p class="address">
            {{ getStay.loc.city }}, {{ getStay.loc.country }}
          </p>
        </div>

        <!-- SHARE AND SAVE -->
        <div class="action-btns">
          <div class="share action-btn"><share /> <span>Share</span></div>
          <div class="save action-btn"><save /> <span>Save</span></div>
        </div>
      </div>

      <!-- IMAGE GALLERY -->
      <div class="gallery">
        <img
          v-for="(img, idx) in getStay.imgUrls.slice(0, 5)"
          :src="img"
          alt="stay-image"
          :class="'gallery-img img' + idx"
        />
      </div>

      <!-- STAY SUMMARY AND DETAILS -->
      <div class="details-reserve-container">
        <!-- START: summary and details should split 50-50 to contain reserve element AND more details -->
        <div class="summary-and-details">
          <div class="summary-container">
            <div class="summary-text-container">
              <div class="stay-summary-text">
                {{ getStay.type }} hosted by {{ getStay.host.fullname }}
              </div>
              <div class="capacity">
                {{ getStay.capacity }} beds ·
                {{ Math.ceil(getStay.capacity / 2) }} rooms ·
                {{ getStay.capacity + 3 }} guests
              </div>
            </div>
            <span
              ><img
                :src="getStay.host.imgUrl"
                alt="host-image"
                class="host-img"
            /></span>
          </div>

          <div class="stay-highlights">
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
                <div class="highlight-txt">
                  Check yourself in with the lockbox.
                </div>
              </div>
            </div>
            <div class="highlight-element">
              <div class="highlight-icon"><free-cxl /></div>
              <div class="highlight-feature">
                <div class="highlight-header">
                  Free cancellation before Sep 17.
                </div>
                <div class="highlight-txt"></div>
              </div>
            </div>
          </div>
          <div class="stay-summary-long">
            <p>{{ getStay.summary }}</p>
            <button class="show-more">Show more ></button>
          </div>
        </div>

        <!-- RESERVE MODAL -->
        <div class="reserve-section">
          <div class="reserve-modal-full flex column">
            <div class="modal-header flex justify-space-between">
              <div class="price">${{ getStay.price }} <span>night</span></div>
              <div class="rating-reviews flex">
                <star /><span> 4.82 </span><span class="separator">·</span>
                <span class="reviews-amount"
                  >{{ getStay.reviews?.length }} reviews
                </span>
              </div>
            </div>
            <div class="pax-dates-container">
              <div class="dates">
                <div class="check-in flex column">
                  <p>check-in</p>
                  <p>12/1/2022</p>
                </div>
                <div class="checkout flex column">
                  <p>checkout</p>
                  <p>12/8/2022</p>
                </div>
              </div>
              <div class="pax flex justify-space-between">
                <div>
                  <p>guests</p>
                  <p>1 guest</p>
                </div>
                <button><arrowDown /></button>
              </div>
            </div>
            <button class="btn btn-reserve">Reserve</button>
            <p>You won't be charged yet</p>
          </div>
        </div>

        <!--END: summary and details should split 50-50 to contain reserve element AND more details  -->
      </div>

      <pre>{{ getStay }}</pre>
    </section>
    <section v-else class="loading">Loading....</section>
  </div>
</template>

<script>
import star from '../assets/svg/star.vue'
import share from '../assets/svg/share.vue'
import save from '../assets/svg/save.vue'
import dedicatedWorkspace from '../assets/svg/dedicated-workspace.vue'
import selfCheckin from '../assets/svg/self-checkin.vue'
import freeCxl from '../assets/svg/free-cxl.vue'
import arrowDown from '../assets/svg/arrow-down.vue'
export default {
  name: 'stay-details',
  props: {},
  data() {
    return {}
  },
  async created() {
    this.$store.commit({ type: 'setDetails' })
    const { id } = this.$route.params
    try {
      await this.$store.dispatch({ type: 'loadStay', id })
    } catch (err) {
      throw new Error(err)
    }
  },
  methods: {},
  computed: {
    getStay() {
      return this.$store.getters.selectedStay
    },
  },
  components: {
    star,
    share,
    save,
    dedicatedWorkspace,
    selfCheckin,
    freeCxl,
    arrowDown,
  },
}
</script>
