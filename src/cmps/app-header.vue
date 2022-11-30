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
      <button>Anywhere</button>
      <button>Any Week</button>
      <button>Add guests</button>
      <div class="search">
        <search />
      </div>
    </div>
    <!-- <router-link to="/">Stays</router-link>
      <router-link to="/review">Reviews</router-link>
      <router-link to="/chat">Chat</router-link>
      <router-link to="/login">Login / Signup</router-link> -->
    <nav class="main-nav flex align-center">
      <hamburger/>
      <div class="profile-img flex align-center">
        <img src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" alt="">
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
</template>
<script>
import airbnb from '../assets/svg/airbnb.vue'
import search from '../assets/svg/search.vue'
import hamburger from '../assets/svg/hamburger.vue'

export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
  },
  components: {
    airbnb,
    search,
    hamburger
  }
}
</script>