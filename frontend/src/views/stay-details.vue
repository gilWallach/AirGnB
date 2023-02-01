<template>
  <div class="main-container-stay-details" @click="isGuestModalOpen = false">
    <!-- SUB-HEADER floating element, appears when scrolling below gallery -->
    <div v-if="isShowSubHeader" class="sticky-header-container">
      <div class="main-container-stay-details sticky-header">
        <header class="flex align-center justify-space-between">
          <div class="nav-btns">
            <button class="fs14 bold btn-sticky-nav">Photos</button>
            <button class="fs14 bold btn-sticky-nav">Amenities</button>
            <button class="fs14 bold btn-sticky-nav">Reviews</button>
            <button class="fs14 bold btn-sticky-nav">Location</button>
          </div>
          <div v-if="modalInSubHeader" class="reserve-container flex">
            <div class="mini-details flex column justify-center">
              <span class="full-price"
                ><span class="price">{{ formatPriceNight }}</span> night</span
              >
              <div class="rate-reviews-container flex">
                <p class="rate flex align-center">
                  <star /><span
                    >{{ getStay.reviews.length ? reviewsAvg : 'New' }} </span
                  ><span class="separator">·</span>
                </p>
                <p>
                  <span class="reviews-amount"
                    >{{ getStay.reviews.length + ' ' + formatReviews }}
                  </span>
                </p>
              </div>
            </div>
            <gradient-button :data="'Reserve'" @click="doReserve" />
          </div>
        </header>
      </div>
    </div>
    <section v-if="getStay" class="stay-details">
      <stay-header :stay="getStay" />
      <stay-header-gallery
        :stayImgs="this.getStay.imgUrls"
        :maxImgs="5"
        @onSetIsShowSubHeader="onGalleryObserved"
      />
      <div class="details-reserve-container flex justify-space-between">
        <div class="summary-and-details">
          <stay-header-highlights :stay="getStay" />
          <stay-top-amenities :stay="getStay" />
          <stay-summary-text :summary="getStay.summary" />
          <stay-amenities-list :stay="getStay" />
        </div>
        <div>
          <reserve-modal
            :stay="getStay"
            :order="this.order"
            @toggleModalInSubHeader="onModalObserved"
            @setIsGuestModalOpen="setIsGuestModalOpen"
          />
        </div>
      </div>
      <stay-reviews
        :reviews="this.getStay.reviews"
        :isModalOpen="this.isModalOpen"
        @showModal="isModalOpen = true"
        @closeModal="isModalOpen = false"
      />
    </section>
    <transition name="fade">
      <div
        class="main-screen"
        v-if="isModalOpen"
        @click="isModalOpen = false"
      ></div>
    </transition>
  </div>
</template>

<script>
import addGuests from '../cmps/add-guests.vue'
import datePicker from '../cmps/date-picker.vue'
import stayHeader from '../cmps/stay-header.vue'
import stayHeaderGallery from '../cmps/stay-header-gallery.vue'
import stayHeaderHighlights from '../cmps/stay-header-highlights.vue'
import stayTopAmenities from '../cmps/stay-top-amenities.vue'
import staySummaryText from '../cmps/stay-summary-text.vue'
import stayAmenitiesList from '../cmps/stay-amenities-list.vue'
import stayReviews from '../cmps/stay-reviews.vue'
import reserveModal from '../cmps/reserve-modal.vue'
import star from '../assets/svg/star.vue'
import gradientButton from '../cmps/gradient-button.vue'
export default {
  name: 'stay-details',
  props: {},
  data() {
    return {
      galleryObserver: null,
      modalObserver: null,
      isShowSubHeader: false,
      isGuestModalOpen: false,
      modalInSubHeader: false,
      isModalOpen: false,
      order: {
        checkInDate: new Date().toLocaleString().split(',')[0],
        checkOutDate: this.setDay().toLocaleString().split(',')[0],
        guests: {
          capacity: 1,
          adults: 1,
          children: 0,
          infants: 0,
        },
      },
    }
  },
  async created() {
    this.$store.commit({ type: 'setDetails' })
    const { id } = this.$route.params
    try {
      await this.$store.dispatch({ type: 'loadStay', id })
    } catch (err) {
      throw new Error(err)
    }
    const { startDate, endDate, guests } = this.$route.query
    if (startDate) {
      this.order.checkInDate = startDate
      this.order.checkOutDate = endDate
    }
    if (guests && JSON.parse(guests) && Object.keys(JSON.parse(guests)).length)
      this.order.guests = JSON.parse(guests)
  },
  methods: {
    onGalleryObserved(isShowSubHeader) {
      this.isShowSubHeader = isShowSubHeader
    },
    onModalObserved(isShowModalInSubHeader) {
      this.modalInSubHeader = isShowModalInSubHeader
    },
    doReserve() {
      if (!this.formatNights) {
        return
      }
      const { guests, checkInDate, checkOutDate } = this.order
      const { id } = this.$route.params
      this.$router.push({
        name: 'order-confirm',
        params: { id },
        query: {
          guests: JSON.stringify(guests),
          checkInDate,
          checkOutDate,
          totalNights: this.formatNights,
          price: this.formatTotalPrice,
          pricePerNight: this.formatPricePerNight,
          priceWithService: this.formatTotalPriceWithService,
        },
      })
    },
    setDay() {
      const date = new Date()
      const day = date.getDate()
      date.setDate(day + 3)
      return date
    },
    setIsGuestModalOpen(isGuestModalOpen) {
      this.isGuestModalOpen = isGuestModalOpen
    },
  },
  computed: {
    getStay() {
      return this.$store.getters.selectedStay
    },
    reviewsAvg() {
      const reviews = this.getStay.reviews
      let average =
        reviews.reduce((sum, review) => {
          return sum + +review.rate
        }, 0) / reviews.length

      return average.toFixed(2)
    },
    formatReviews() {
      return this.getStay.reviews.length > 1 ? 'reviews' : 'review'
    },
    formatPriceNight() {
      return this.getStay.price.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })
    },
    formatNights() {
      const inDate = new Date(this.order.checkInDate)
      const outDate = new Date(this.order.checkOutDate)
      const diffTime = Math.abs(outDate - inDate)
      const totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || ''
      return totalNights
    },
    formatPricePerNight() {
      const night = this.formatNights > 1 ? 'nights' : 'night'
      return this.formatPriceNight + ' x ' + this.formatNights + ' ' + night
    },
    formatTotalPrice() {
      return (this.getStay.price * this.formatNights).toLocaleString('en-IN', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      })
    },
    formatTotalPriceWithService() {
      return (this.getStay.price * this.formatNights + 383).toLocaleString(
        'en-IN',
        {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }
      )
    },
  },
  components: {
    addGuests,
    datePicker,
    stayHeader,
    stayHeaderGallery,
    stayHeaderHighlights,
    stayTopAmenities,
    staySummaryText,
    stayAmenitiesList,
    stayReviews,
    reserveModal,
    star,
    gradientButton,
  },
}
</script>
