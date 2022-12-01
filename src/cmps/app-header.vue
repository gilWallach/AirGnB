<template>
  <div :class="{ 'main-layout-list': isList, 'main-container-stay-details': !isList }">

    <header class="main-header flex align-center justify-between ">
      <div class="logo-container">
        <router-link to="/">
          <span role="img" aria-label="logo" class="logo flex align-center">
            <airbnb />
            <span>AirGnB</span>
          </span>
        </router-link>
      </div>
      <div class="mini-search flex align-center" @click="isSearchOpen = !isSearchOpen">
        <button>Anywhere</button>
        <div class="break-line"></div>
        <button>Any Week</button>
        <div class="break-line"></div>
        <button>Add guests</button>
        <div class="search flex align-center justify-center">
          <search />
        </div>
      </div>
      <!-- <router-link to="/">Stays</router-link>
      <router-link to="/review">Reviews</router-link>
      <router-link to="/chat">Chat</router-link>
      <router-link to="/login">Login / Signup</router-link> -->
      <nav class="main-nav flex align-center  justify-space-between">
        <hamburger />
        <div class="profile-img flex align-center">
          <img src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" alt="" />
        </div>
      </nav>
      <section class="loggedin-user" v-if="loggedInUser">
        <router-link :to="`/user/${loggedInUser._id}`">
          {{ loggedInUser.fullname }}
        </router-link>
        <span>{{ loggedInUser.score.toLocaleString() }}</span>
        <img :src="loggedInUser.imgUrl" />
      </section>
    </header>
    <transition name="fade">
      <secondary-header v-if="isSearchOpen" />
    </transition>
  </div>
</template>
<script>
import airbnb from '../assets/svg/airbnb.vue'
import search from '../assets/svg/search.vue'
import hamburger from '../assets/svg/hamburger.vue'
import secondaryHeader from './secondary-header.vue'

export default {
  data() {
    return {
      isSearchOpen: false,
    }
  },
  created() {

  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    isList() {
      return this.$store.getters.isList
    }
  },
  components: {
    airbnb,
    search,
    hamburger,
    secondaryHeader
  },
}
</script>
