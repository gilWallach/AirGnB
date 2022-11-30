<template>
  <header class="main-header flex align-center justify-between">
    <div class="logo">
      <router-link to="/">
        <span role="img" aria-label="logo" class="flex align-center">
          <airbnb />
          AirGnB
        </span>
      </router-link>
    </div>
    <div class="mini-search flex align-center">
      <button @click="isSearchOpen= !isSearchOpen">Anywhere</button>
      <button>Any Week</button>
      <button>Add guests</button>
      <div class="search flex align-center justify-center">
        <search />
      </div>
    </div>
    <!-- <router-link to="/">Stays</router-link>
      <router-link to="/review">Reviews</router-link>
      <router-link to="/chat">Chat</router-link>
      <router-link to="/login">Login / Signup</router-link> -->
    <nav class="main-nav flex align-center">
      <hamburger />
      <div class="profile-img flex align-center">
        <img
          src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3"
          alt=""
        />
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
    <header v-if="isSearchOpen" class="secondary-header big-search flex align-center justify-center">
    <label class="flex column">
      Where
      <input type="text" placeholder="Search destinations">
    </label>
    <label class="flex column">
      Check in
      <span>Add dates</span>
      <input type="date">
    </label>
    <label class="flex column">
      Check out
      <span>Add dates</span>
      <input type="date">
    </label>
    <label class="flex column">
      Who
      <span>Add guests</span>
    </label>
    </header>
  </transition>
</template>
<script>
import airbnb from '../assets/svg/airbnb.vue'
import search from '../assets/svg/search.vue'
import hamburger from '../assets/svg/hamburger.vue'

export default {
  data(){
    return {
      isSearchOpen:false
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
  components: {
    airbnb,
    search,
    hamburger,
  },
}
</script>
