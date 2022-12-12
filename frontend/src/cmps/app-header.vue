<template>
  <div
    @click="unSelectElements"
    class="header-container"
    :class="{
      'main-layout-list': isList,
      'main-container-stay-details': !isList,
      'search-open': isSearchOpen,
    }"
  >
    <header class="main-header flex align-center justify-between">
      <div class="logo-container">
        <router-link to="/">
          <span role="img" aria-label="logo" class="logo flex align-center">
            <airbnb />
            <span>airgnb</span>
          </span>
        </router-link>
      </div>
      <div
        v-if="!isSearchOpen"
        class="mini-search flex align-center"
        @click.stop="isSearchOpen = !isSearchOpen"
      >
        <button @click="selected('where')">Start your search</button>
        <button @click="selected('where')">{{ where }}</button>
        <button @click="selected('check-in')">{{ when }}</button>
        <!-- <button>{{ guests }}</button> -->
        <div @click="selected('who')">
          <input
            :value="guests"
            type="text"
            placeholder="Add guests"
            disabled
          />
        </div>
        <div
          @click="selected('where')"
          class="search flex align-center justify-center"
        >
          <search />
        </div>
      </div>
      <div
        class="mini-search-mobile hidden flex align-center justify-space-between"
      >
        <button @click="selected('where')" class="flex align-center search-btn">
          <!-- <search /> -->
          <div class="text-container flex column">
            <h2>Where to?</h2>
            <p>
              <span>Anywhere</span><span>Any week</span><span>Add guests</span>
            </p>
          </div>
          <button
            @click.stop="isModalOpen = true"
            class="filter-btn flex align-center justify-center"
          >
            <filter-icon />
          </button>
          <transition v-if="isModalOpen" name="fade">
            <div class="main-screen" @click="isModalOpen = false"></div>
          </transition>
          <transition v-if="isModalOpen" name="fade">
            <filter-modal @closeModal="isModalOpen = false" />
          </transition>
        </button>
      </div>
      <nav
        class="main-nav flex align-center justify-space-between"
        @click="onToggleUserActions"
      >
        <hamburger />
        <el-badge
          v-if="ShowNotification"
          :value="1"
          class="item"
          style="margin-top: '10px'; margin-right: '10px'"
        >
          <div v-if="$store.getters.loggedinUser" class="img-container">
            <img :src="$store.getters.loggedinUser.imgUrl" alt="user-image" />
          </div>
          <user-avatar-white v-else />
        </el-badge>
        <div v-else>
          <div v-if="$store.getters.loggedinUser" class="img-container">
            <img :src="$store.getters.loggedinUser.imgUrl" alt="user-image" />
          </div>
          <user-avatar-white v-else />
        </div>

        <user-actions
          v-if="showUserActions"
          @closeUserActions="closeUserActions"
          :isShowNotification="isShowNotification"
          @hideNotification="hideNotification"
        />
      </nav>
    </header>
    <transition name="fade">
      <secondary-header
        v-if="isSearchOpen"
        @close-search="isSearchOpen = false"
      />
    </transition>
  </div>
  <transition name="fade">
    <div
      class="main-screen"
      v-if="isSearchOpen"
      @click="isSearchOpen = false"
    ></div>
  </transition>
  <transition name="fade">
    <div
      class="main-screen-transparent"
      v-if="isShowWhiteScreen"
      @click="closeUserActions"
    ></div>
  </transition>
</template>
<script>
import airbnb from '../assets/svg/airbnb.vue'
import search from '../assets/svg/search.vue'
import hamburger from '../assets/svg/hamburger.vue'
import userAvatarWhite from '../assets/svg/user-avatar-white.vue'
import secondaryHeader from './secondary-header.vue'
import userActions from './user-actions.vue'
import star from '../assets/svg/star.vue'
import filterIcon from '../assets/svg/filter.vue'

import filterModal from '../cmps/filter-modal.vue'

export default {
  data() {
    return {
      isSearchOpen: false,
      isShowUserActions: false,
      isShowWhiteScreen: false,
      isShowNotification: false,
      isModalOpen: false,
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)

    socketService.on('order-added', (order) => {
      this.isShowNotification = true
      this.$store.commit({ type: 'addOrder', order })
      // this.$store.commit({ type: 'setSelectedOrder', order })
    })
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
      const inMonth = new Intl.DateTimeFormat('en', { month: 'short' }).format(
        inDate
      )
      const outMonth = new Intl.DateTimeFormat('en', { month: 'short' }).format(
        outDate
      )
      const inDay = inDate.getDate()
      const outDay = outDate.getDate()
      const strDates =
        inMonth === outMonth
          ? inMonth + ' ' + inDay + ' - ' + outDay
          : `${inMonth} ${inDay} - ${outMonth} ${outDay}`
      return strDates
    },
    guests() {
      const { guests } = this.$route.query
      if (!guests || !JSON.parse(guests) || !Object.keys(JSON.parse(guests)))
        return ''
      const guestsObject = JSON.parse(guests)
      return `${guestsObject.capacity} guests`
    },
    showUserActions() {
      return this.isShowUserActions
    },
    ShowNotification() {
      return this.isShowNotification
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
      else select = 'isCheckInSelected'
      this.unSelectElements()
      this.$store.commit({ type: 'selectElement', select })
    },
    onToggleUserActions() {
      this.isShowUserActions = !this.isShowUserActions
      this.isShowWhiteScreen = !this.isShowWhiteScreen
    },
    hideNotification() {
      console.log('lll')
      this.isShowNotification = false
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
    userAvatarWhite,
    secondaryHeader,
    userActions,
    filterIcon,
    filterModal,
  },
}
</script>
