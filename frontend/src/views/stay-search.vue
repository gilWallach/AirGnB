<template>
  <section class="stay-search main">
    <stay-list :stays="stays" :labels="labels" :date="date" @filter-type="filterByType" @filter="filter" />
  </section>
</template>

<script>
import stayList from '../cmps/stay-list.vue'

export default {
  name: 'stay-search',
  props: {},
  data() {
    return {
      date: {},
    }
  },
  created() {
    this.$store.commit({ type: 'setList' })
    this.loadStays()
    this.loadLabels()
    const { startDate, endDate } = this.$route.query
    this.date = { startDate, endDate }
  },
  methods: {
    async loadStays(typeFilter) {
      const { name, type, guests, startDate, endDate, filter } = this.$route.query
      const capacity =
        guests && JSON.parse(guests) && Object.keys(JSON.parse(guests))
          ? JSON.parse(guests).capacity
          : 0
      const filterBy = {
        name,
        type,
        capacity,
        startDate,
        endDate,
      }
      if (filter && Object.keys(filter).length) {
        const parsedFilter = JSON.parse(filter)
        const {
          minPrice,
          maxPrice,
          roomType,
          bedrooms,
          capacity,
          bathrooms,
          amenities,
          isSuperhost,
        } = parsedFilter
        if(minPrice) filterBy.minPrice = minPrice
        if(maxPrice) filterBy.maxPrice = maxPrice
        filterBy.roomType = roomType === 'Any' ? '' : roomType
        filterBy.bedrooms = bedrooms === 'Any' ? 0 : bedrooms
        filterBy.capacity = capacity === 'Any' ? 0 : capacity
        filterBy.bathrooms = bathrooms === 'Any' ? 0 : bathrooms
        if(amenities) filterBy.amenities = amenities
        filterBy.isSuperhost = isSuperhost
      }
      //Go to params and filter your stays
      // Talk to the store
      try {
        await this.$store.dispatch({ type: 'loadStays', filterBy })
      } catch (err) {
        console.log(err)
      }
    },
    async loadLabels() {
      try {
        await this.$store.dispatch({ type: 'loadLabels' })
      } catch (err) {
        throw err
      }
    },
    filterByType(type) {
      this.loadStays(type)
    },
    filter(filterBy) {
      const filter = JSON.stringify(filterBy)
      const oldQuery = this.$route.query
      this.$router.push({ path: '/s', query: { ...oldQuery, filter } })
    },
  },
  computed: {
    stays() {
      return this.$store.getters.stays
    },
    urlChange() {
      return this.$route.query
    },
    labels() {
      return this.$store.getters.labels
    },
  },
  watch: {
    urlChange() {
      if (Object.keys(this.$route.query).length) this.loadStays()
    },
  },
  components: {
    stayList,
  },
}
</script>
