<template>
  <section class="list-modal filter">
    <div class="header flex justify-center align-center">
      <button class="close-btn custom">
        <close @click="$emit('closeModal')" />
      </button>
      <h2 class="center-heading">Filters</h2>
    </div>
    <main>
      <div class="price sec-padding">
        <h2 class="fs22">Price range</h2>
        <p>The average monthly price is ${{ priceAvg }}</p>
        <HistogramSlider
          :width="629"
          :barWidth="11.58"
          :bar-height="64"
          :data="prices"
          :force-edges="false"
          :primaryColor="'#b0b0b0'"
          @change="setMinMax"
          :holderColor="'#dddddd'"
          :handleSize="32"
          :histSliderGap="0"
          :barGap="0"
          :barRadius="1"
          :lineHeight="0"
          :label="false"
          :hideFromTo="true"
          :min="minPrice"
          :max="maxPrice"
        />
        <div class="prices-display flex justify-center align-center">
          <label class="flex column">
            <small>min price</small>
            <input v-model="filterBy.minPrice" type="number" min="0" />
          </label>
          -
          <label class="flex column">
            <small>max price</small>
            <input v-model="filterBy.maxPrice" type="number" />
          </label>
        </div>
      </div>
      <div class="type sec-padding">
        <h2>Type of place</h2>
        <el-checkbox-group v-model="filterBy.roomType">
          <el-checkbox class="fs18" :key="0" label="Any" />
          <el-checkbox class="fs18"
            v-for="option in roomOptions"
            :key="option"
            :label="option"
          />
        </el-checkbox-group>
      </div>
      <div class="rooms sec-padding">
        <h2>Rooms and beds</h2>
        <h3 class="fs16">Bedrooms</h3>
        <el-radio-group v-model="filterBy.bedrooms" size="medium">
          <el-radio-button :key="0" label="Any" />
          <el-radio-button v-for="num in 8" :key="num" :label="num" />
        </el-radio-group>
        <h3 class="fs16">Beds</h3>
        <el-radio-group v-model="filterBy.capacity" size="medium">
          <el-radio-button :key="0" label="Any" />
          <el-radio-button v-for="num in 8" :key="num" :label="num" />
        </el-radio-group>
        <h3 class="fs16">Bathrooms</h3>
        <el-radio-group v-model="filterBy.bathrooms" size="medium">
          <el-radio-button :key="0" label="Any" />
          <el-radio-button v-for="num in 8" :key="num" :label="num" />
        </el-radio-group>
      </div>
      <div class="amenities sec-padding">
        <h2>Amenities</h2>
        <el-checkbox-group v-model="filterBy.amenities">
          <el-checkbox
            v-if="isFullAmenities"
            v-for="amenity in amenities"
            :key="amenity"
            :label="amenity"
            >{{ amenity }}</el-checkbox
          >
          <div v-else class="small-amenity-container flex column">
            <div class="small-amenities grid">
              <el-checkbox
                v-for="smallAmenity in smallAmenities"
                :key="smallAmenity"
                :label="smallAmenity"
                >{{ smallAmenity }}</el-checkbox
              >
            </div>
            <button class="fs16" @click="isFullAmenities = true">Show More</button>
          </div>
        </el-checkbox-group>
      </div>
      <div class="super-host sec-padding">
        <h2>Top tier stays</h2>
        <div class="container flex justify-space-between align-center">
          <div class="description flex column">
            <p>Superhost</p>
            <small>Stay with recognized Hosts</small>
            <button class="bold">Learn more</button>
          </div>
          <el-switch v-model="filterBy.isSuperhost" size="large" />
        </div>
      </div>
    </main>
    <!-- <div class="filters-container">
        <form @submit.prevent="setFilterBy">
          <div>
                    <legend>Type of place</legend>
                    <input v-model="filterBy.roomType" type="checkbox" name="roomType" value="Entire place">Entire place<br>
                    <p>A place all to yourself</p>
                    <input v-model="filterBy.roomType" type="checkbox" name="roomType" value="Private room">Private room<br>
                    <p>Your own room in a home or a hotel, plus some shared common spaces</p>
                    <input v-model="filterBy.roomType" type="checkbox" name="roomType" value="Shared room">Shared room<br>
                    <p>A sleeping space and common areas that may be shared with others</p>
                    <br>
                    <input type="submit" value="Submit now">
                </div>
            </form>
        </div> -->
    <footer class="filter-modal footer flex justify-space-between align-center">
      <button @click="clearFilter">Clear all</button>
      <button @click="search">Show Homes</button>
    </footer>
  </section>
</template>

<script>
import close from '../assets/svg/close.vue'

export default {
  name: 'filter-modal',
  props: {},
  data() {
    return {
      filterBy: {
        minPrice: 0,
        maxPrice: this.maxPrice,
        roomType: '',
        bedrooms: 'Any',
        capacity: 'Any',
        bathrooms: 'Any',
        amenities: [],
        isSuperhost: false,
      },
      roomOptions: ['Entire place', 'Private room'],
      isFullAmenities: false,
    }
  },
  created() {
    this.filterBy.minPrice = this.minPrice
    this.filterBy.maxPrice = this.maxPrice

    const { filter } = this.$route.query
    if (!filter) return
    const {
      minPrice,
      maxPrice,
      roomType,
      bedrooms,
      capacity,
      bathrooms,
      amenities,
      isSuperhost,
    } = JSON.parse(filter)
    this.filterBy.minPrice = minPrice
    this.filterBy.maxPrice = maxPrice
    this.filterBy.roomType = roomType
    this.filterBy.bedrooms = bedrooms
    this.filterBy.capacity = capacity
    this.filterBy.bathrooms = bathrooms
    this.filterBy.amenities = amenities
    this.filterBy.isSuperhost = isSuperhost
  },
  methods: {
    setMinMax(slider) {
      this.filterBy.minPrice = slider.from
      this.filterBy.maxPrice = slider.to
    },
    formatPrice(price){
      return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    },
    search() {
      this.$emit('closeModal')
      this.$route.path === '/'
        ? this.$router.push({
            path: '/s',
            query: { filter: JSON.stringify({ ...this.filterBy }) },
          })
        : this.$emit('filter', { ...this.filterBy })
    },
    clearFilter() {
      this.filterBy = {
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        roomType: '',
        bedrooms: 'Any',
        capacity: 'Any',
        bathrooms: 'Any',
        amenities: [],
        isSuperhost: false,
      }
    },
  },
  computed: {
    prices() {
      return this.$store.getters.stays.map((stay) => stay.price)
    },
    minPrice() {
      return Math.min(...this.prices)
    },
    maxPrice() {
      return Math.max(...this.prices)
    },
    priceAvg() {
      const priceSum = this.prices.reduce((acc, price) => acc + price, 0)
      return Math.ceil(priceSum / this.prices.length)
    },
    amenities() {
      const amenities = this.$store.getters.stays.reduce(
        (acc, { amenities }) => acc.concat(amenities),
        []
      )
      return [...new Set([...amenities])]
    },
    smallAmenities() {
      return this.amenities.slice(0, 6)
    },
  },
  components: {
    close,
  },
}
</script>
