<template>
  <div class="main-container-stay-details">
    <!-- SUB-HEADER floating element, appears when scrolling below gallery -->
    <header
      v-if="isShowSubHeader"
      style="
        position: fixed;
        top: 0;
        height: 78px;
        width: 100%;
        background-color: antiquewhite;
      "
    >
      HEADER
    </header>
    <!-- HEADER -->
    <section v-if="getStay" class="stay-details">
      <div class="details-header">
        <h1>{{ getStay.name }}</h1>
      </div>

      <!-- STAY DETAILS AND RATINGS -->
      <div class="stay-details-container">
        <div class="details-ratings-container">
          <p class="rate">
            <star /><span>&nbsp; {{getStay.reviews.length ? '4.82' : 'New' }} </span><span class="separator">·</span>
          </p>
          <p>
            <span class="reviews-amount">{{getStay.reviews.length +' '+ formatReviews }} </span>
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
      <div class="gallery" ref="elGallery">
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
                {{ getStay.roomType }} hosted by {{ getStay.host.fullname }}
              </div>
              <div class="capacity">
                {{ getStay.capacity }} beds · {{ getStay.bedrooms }} rooms ·
                {{ getStay.capacity + 3 }} guests
              </div>
            </div>
            <span
              ><img
                :src="getStay.host.thumbnailUrl"
                alt="host-image"
                class="host-img"
                onerror="this.src=`https://res.cloudinary.com/raz-mister-toy/image/upload/v1670229254/wbgnvdojxyealwsczvec.png`"
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
                  Free cancellation before {{ this.nextMonth }} 28.
                </div>
                <div class="highlight-txt"></div>
              </div>
            </div>
          </div>
          <div class="stay-summary-long">
            <p>{{ getStay.summary }}</p>
            <p>...</p>
            <button class="show-more">Show more ></button>
          </div>

          <!-- AMENITIES (WHAT THIS PALCE OFFERS) -->
          <div class="amenities-container">
            <h1 class="amenities-header">What this place offers</h1>
            <div class="amenities-list">
              <!-- STATIC AMENITIES LIST -->
              <div class="amenity-item">
                <div class="amenity-logo"><kitchen /></div>
                <div class="amenity-txt">Kitchen</div>
              </div>
              <div class="amenity-item">
                <div class="amenity-logo"><wifi /></div>
                <div class="amenity-txt">Wifi</div>
              </div>
              <div class="amenity-item">
                <div class="amenity-logo"><tv /></div>
                <div class="amenity-txt">TV</div>
              </div>
              <div class="amenity-item">
                <div class="amenity-logo"><smoking-allowed /></div>
                <div class="amenity-txt">Smoking alllowed</div>
              </div>
              <div class="amenity-item">
                <div class="amenity-logo"><cooking-basics /></div>
                <div class="amenity-txt cancelled">Cooking basics</div>
              </div>
              <div class="amenity-item">
                <div class="amenity-logo"><private-entrance /></div>
                <div class="amenity-txt">Private entrance</div>
              </div>
              <div class="amenity-item">
                <div class="amenity-logo"><pool /></div>
                <div class="amenity-txt">Pool</div>
              </div>
              <div class="amenity-item">
                <div class="amenity-logo"><stove /></div>
                <div class="amenity-txt">Stove</div>
              </div>
              <div class="amenity-item">
                <div class="amenity-logo"><heating /></div>
                <div class="amenity-txt">Heating</div>
              </div>
              <div class="amenity-item">
                <div class="amenity-logo"><free-parking /></div>
                <div class="amenity-txt cancelled">Free parking</div>
              </div>
              <!-- !understand how make this part dynamic while we have tens of amenities and we want to render the svgs... -->
              <!-- <div v-for="amenity in getStay.amenities.slice(0, 2)" :key="amenity" class="amenity">
            <component :is="amenity.toLowerCase()"></component>
            <div class="amenity-txt">{{ amenity }}</div>
          </div> -->
            </div>
            <div class="more-amenities">
              <div class="btn-show-amenities">
                Show all {{ getStay.amenities?.length }} amenities
              </div>
            </div>
          </div>
        </div>

        <!-- RESERVE MODAL -->
        <div class="reserve-section">
          <div class="reserve-modal-full flex column" ref="reserveModal">
            <div class="modal-header flex justify-space-between align-center">
              <div>
                <!-- <span class="modal-header-price">${{ getStay.price }}</span> -->
                <span class="modal-header-price">{{getStay.price.toLocaleString('en-IN', { style: 'currency', currency: 'USD',maximumSignificantDigits: 1 })}}</span>
                <span class="modal-header-text"> night</span>
              </div>
              <div class="rating-reviews flex" v-if="getStay.reviews.length">
                <star /><span>&nbsp; 4.82 </span
                ><span class="separator">&nbsp;·&nbsp;</span>
                <span class="reviews-amount" >{{getStay.reviews.length +' '+ formatReviews }} </span>
              </div>
            </div>
            <div class="pax-dates-container" >
              <div class="dates">
                <div class="check-in flex column">
                  <label for="i">
                    <p>CHECK-IN</p>
                    <p class="dates-txt">{{order.checkInDate || 'Add date'}}</p>
                  </label>
                </div>
                <div class="checkout flex column">
                  <label for="o">
                  <p>CHECKOUT</p>
                    <p class="dates-txt">{{order.checkOutDate || 'Add date'}}</p>
                  </label>
                </div>
                <div v-if="isDatesModalOpen" class="dates-modal flex column">
                    <date-picker :data="'Select dates'" @set-dates="setDates"/>
                </div>
              </div>
              <div class="pax flex justify-space-between">
                <div>
                  <p>GUESTS</p>
                  <p class="pax-txt">1 guest</p>
                </div>
                <div class="reserve-arrow"><arrowDown /></div>
              </div>
            </div>
            <!-- <button class="btn btn-reserve">Reserve</button> -->
            <gradient-button :data="'Reserve'" />
            <p class="reg-text">You won't be charged yet</p>
            <!-- modal rates -->
            <div class="modal-rates flex column align-center">
              <div class="nights-and-rate flex justify-space-between">
                <div class="underline">$215 x 7 nights</div>
                <div>$1,505</div>
              </div>
              <div class="fee-container flex justify-space-between">
                <div class="underline">Cleaning fee</div>
                <div>$155</div>
              </div>
              <div class="fee-container flex justify-space-between">
                <div class="underline">Service fee</div>
                <div>$228</div>
              </div>
            </div>
            <!-- modal total -->
            <div class="modal-total flex justify-space-between">
              <div>Total</div>
              <div>$1,888</div>
            </div>
          </div>
        </div>

        <!--END: summary and details should split 50-50 to contain reserve element AND more details  -->
      </div>

      <!-- REVIEWS -->
      <div class="reviews-container">
        <!-- REVIEWS HEADER - KPIS SUMMARY -->
        <div class="reviews-header">
          <div class="title">
            <div class="rating-reviews flex">
              <star /><span>&nbsp; 4.82 </span
              ><span class="separator">&nbsp;·&nbsp;</span>
              <span class="reviews-amount">{{ getStay.reviews?.length }} </span>
            </div>
          </div>

          <div class="reviews-kpis-list">
            <div class="review-item flex justify-space-between">
              <div class="kpi-title">Cleanliness</div>
              <div class="rate-container flex align-center">
                <div class="kpis">
                  <div class="cleanliness"></div>
                </div>
                <div class="rate-value">4.6</div>
              </div>
            </div>
            <div class="review-item flex justify-space-between">
              <div class="kpi-title">Communication</div>
              <div class="rate-container flex align-center">
                <div class="kpis">
                  <div class="communication"></div>
                </div>
                <div class="rate-value">5.0</div>
              </div>
            </div>
            <div class="review-item flex justify-space-between">
              <div class="kpi-title">Check-in</div>
              <div class="rate-container flex align-center">
                <div class="kpis">
                  <div class="check-in"></div>
                </div>
                <div class="rate-value">4.8</div>
              </div>
            </div>
            <div class="review-item flex justify-space-between">
              <div class="kpi-title">Accuracy</div>
              <div class="rate-container flex align-center">
                <div class="kpis">
                  <div class="accuracy"></div>
                </div>
                <div class="rate-value">4.9</div>
              </div>
            </div>
            <div class="review-item flex justify-space-between">
              <div class="kpi-title">Location</div>
              <div class="rate-container flex align-center">
                <div class="kpis">
                  <div class="location"></div>
                </div>
                <div class="rate-value">4.8</div>
              </div>
            </div>
            <div class="review-item flex justify-space-between">
              <div class="kpi-title">Value</div>
              <div class="rate-container flex align-center">
                <div class="kpis">
                  <div class="location"></div>
                </div>
                <div class="rate-value">4.8</div>
              </div>
            </div>
          </div>
        </div>
        <!-- REVIEWS DETAILS -->
        <div class="reviews-details" ref="reviewTest">
          <review
            v-for="review in getStay.reviews"
            :review="review"
            :key="review.id"
          />
          <div class="more-reviews">
            <div class="btn-show-reviews">
              Show all {{ getStay.reviews?.length }} reviews
            </div>
          </div>
        </div>
      </div>

      <!--!COMMENT OUT PRE BEFORE PUSH  -->
      <!-- <pre>{{ getStay }}</pre> -->
      <!--!COMMENT OUT PRE BEFORE PUSH  -->
    </section>

    <section v-else class="loading">Loading....</section>
  </div>
</template>

<script>
import datePicker from '../cmps/date-picker.vue'
import review from '../cmps/review.vue'
import gradientButton from '../cmps/gradient-button.vue'
import longText from '../cmps/long-text.vue'
import star from '../assets/svg/star.vue'
import share from '../assets/svg/share.vue'
import save from '../assets/svg/save.vue'
import dedicatedWorkspace from '../assets/svg/dedicated-workspace.vue'
import selfCheckin from '../assets/svg/self-checkin.vue'
import freeCxl from '../assets/svg/free-cxl.vue'
import arrowDown from '../assets/svg/arrow-down.vue'
import wifi from '../assets/svg/wifi.vue'
import tv from '../assets/svg/tv.vue'
import kitchen from '../assets/svg/kitchen.vue'
import petsAllowed from '../assets/svg/pets-allowed.vue'
import cookingBasics from '../assets/svg/cooking-basics.vue'
import smokingAllowed from '../assets/svg/smoking-allowed.vue'
import privateEntrance from '../assets/svg/private-entrance.vue'
import pool from '../assets/svg/pool.vue'
import stove from '../assets/svg/stove.vue'
import heating from '../assets/svg/heating.vue'
import freeParking from '../assets/svg/free-parking.vue'
export default {
  name: 'stay-details',
  props: {},
  data() {
    return {
      galleryObserver: null,
      isShowSubHeader: false,
      isDatesModalOpen:false,
      order:{
        checkInDate:null,
        checkOutDate:null,
        guests:1
      }
    }
  },
  async created() {
    this.$store.commit({ type: 'setDetails' })
    const { id } = this.$route.params
    try {
      await this.$store.dispatch({ type: 'loadStay', id })
      this.galleryObserver = new IntersectionObserver(this.onGalleryObserved, {
        rootMargin: '0px 0px 0px 0px',
        // threshold: 0.5,
      })
      this.galleryObserver.observe(this.$refs.elGallery)

      const modalObserver = new IntersectionObserver(this.onModalObserved, {
        rootMargin: '-100px 0px 0px 0px',
      })
      modalObserver.observe(this.$refs.reserveModal)
    } catch (err) {
      throw new Error(err)
    }
  },
  mounted() {},
  methods: {
    onGalleryObserved(entries) {
      entries.forEach((entry) => {
        this.isShowSubHeader = entry.isIntersecting ? false : true
      })
    },
    onModalObserved(entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // this.modalInSubHeader = true
          //   this.$refs.reviewTest.style.transform = 'rotate(180deg)'
        }
      })
    },
    setDates(dates){
      this.order.checkInDate = dates[0].toLocaleString().split(',')[0]
      this.order.checkOutDate = dates[1]?.toLocaleString().split(',')[0] || null
    }
  },
  computed: {
    getStay() {
      return this.$store.getters.selectedStay
    },
    formatReviews(){
      return this.getStay.reviews.length >1 ? 'reviews' : 'review'
    },
    nextMonth() {
      const date = new Date()
      const month = date.getMonth()
      date.setMonth(month + 1)
      return date.toLocaleString('en-US', { month: 'short' })
    },
  },
  components: {
    datePicker,
    review,
    star,
    share,
    save,
    dedicatedWorkspace,
    selfCheckin,
    freeCxl,
    arrowDown,
    wifi,
    tv,
    kitchen,
    petsAllowed,
    cookingBasics,
    smokingAllowed,
    privateEntrance,
    pool,
    stove,
    heating,
    freeParking,
    gradientButton,
    longText,
  },
}
</script>
