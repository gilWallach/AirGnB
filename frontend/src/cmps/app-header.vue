<template>
  <div @click="unSelectElements" class="header-container" :class="{
    'main-layout-list': isList,
    'main-container-stay-details': !isList,
    'search-open': isSearchOpen,
  }">
    <header class="main-header flex align-center justify-between">
      <div class="logo-container">
        <router-link to="/">
          <span role="img" aria-label="logo" class="logo flex align-center">
            <airbnb />
            <span>AirGnB</span>
          </span>
        </router-link>
      </div>
      <div v-if="!isSearchOpen" class="mini-search flex align-center" @click.stop="isSearchOpen = !isSearchOpen">
        <button @click="selected('where')">Start your search</button>
        <button @click="selected('where')">{{ where }}</button>
        <button @click="selected('when')">{{ when }}</button>
        <!-- <button>{{ guests }}</button> -->
        <div @click="selected('who')">
          <input :value="guests" type="text" placeholder="Add guests" disabled />
        </div>
        <div class="search flex align-center justify-center">
          <search />
        </div>
      </div>
      <nav class="main-nav flex align-center justify-space-between" @click="onToggleUserActions">
        <hamburger />
        <div class="profile-img flex align-center">
          <img src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" alt="" />
        </div>
        <user-actions v-if="showUserActions" @closeUserActions="closeUserActions" />
      </nav>
    </header>
    <transition name="fade">
      <secondary-header v-if="isSearchOpen" @close-search="isSearchOpen = false" />
    </transition>
  </div>
  <transition name="fade">
    <div class="main-screen" v-if="isSearchOpen" @click="isSearchOpen = false"></div>
  </transition>
  <transition name="fade">
    <div class="main-screen-transparent" v-if="isShowWhiteScreen" @click="closeUserActions"></div>
  </transition>
</template>
<script>
import airbnb from '../assets/svg/airbnb.vue'
import search from '../assets/svg/search.vue'
import hamburger from '../assets/svg/hamburger.vue'
import secondaryHeader from './secondary-header.vue'
import userActions from './user-actions.vue'

export default {
  data() {
    return {
      isSearchOpen: false,
      isShowUserActions: false,
      isShowWhiteScreen: false,
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    isList() {
      return this.$store.getters.isList
    },
    where() {
      const { name } = this.$route.query
      return name
        ? name.charAt(0).toUpperCase() + name.substring(1).toLowerCase()
        : 'Anywhere'
    },
    when() {
      const { startDate, endDate } = this.$route.query
      if (!startDate) return 'Any week'
      const inDate = new Date(startDate)
      const outDate = new Date(endDate)
      const inMonth = new Intl.DateTimeFormat('en', { month: 'short' }).format(inDate)
      const outMonth = new Intl.DateTimeFormat('en', { month: 'short' }).format(outDate)
      console.log(inMonth, outMonth);
      const inDay = inDate.getDate()
      const outDay = outDate.getDate()
      const strDates = inMonth === outMonth ?
        inMonth + ' ' + inDay + " - " + outDay : `${inMonth} ${inDay} - ${outMonth} ${outDay}`
      return strDates
    },
    guests() {
      const { guests } = this.$route.query
      if (!guests || !JSON.parse(guests) || !Object.keys(JSON.parse(guests))) return ''
      const guestsObject = JSON.parse(guests)
      return `${guestsObject.capacity} guests`
    },
    showUserActions() {
      return this.isShowUserActions
    },
  },
  methods: {
    handleScroll() {
      this.isSearchOpen = false
    },
    unSelectElements() {
      this.$store.commit({ type: 'unSelectElements' })
    },
    selected(el) {
      let select
      if (el === 'who') select = 'isGuestsSelected'
      else if (el === 'where') select = 'isWhereSelected'
      else select = 'isDateSelected'
      this.$store.commit({ type: 'selectElement', select })
    },
    onToggleUserActions() {
      this.isShowUserActions = !this.isShowUserActions
      this.isShowWhiteScreen = !this.isShowWhiteScreen
    },
    // onCloseUserActions() {
    //   this.isShowUserActions = false
    // },
    closeUserActions() {
      this.isShowUserActions = false
      this.isShowWhiteScreen = false
    },
  },
  components: {
    airbnb,
    search,
    hamburger,
    secondaryHeader,
    userActions,
  },
}
</script>
