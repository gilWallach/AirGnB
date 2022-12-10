<template>
  <section class="user-actions" ref="userActions">
    <div>
      <ul v-if="!loggedinUser" class="list-items clean-list fs14">
        <li @click.stop="openModal(false)" class="bold">Sign up</li>
        <li @click.stop="openModal(true)">Log in</li>
      </ul>
      <ul v-else class="list-items clean-list fs14 bold">
        <li><router-link to="/order-confirm">Pending Orders</router-link></li>
        <li @click="myDashboard">My Dashboard</li>
      </ul>
      <ul class="list-items clean-list bottom-group fs14">
        <li>Airgnb your home</li>
        <li>Host an experience</li>
        <li>Help</li>
        <li v-if="loggedinUser" @click="doLogout">Log out</li>
      </ul>
    </div>
  </section>

  <transition name="fade">
    <loginSignupModal
      v-if="isModalOpen"
      @closeModal="closeModal"
      :isLogin="isLogin"
    />
  </transition>

  <transition name="fade">
    <div
      class="main-screen"
      v-if="isModalOpen"
      @click="isModalOpen = false"
    ></div>
  </transition>
</template>

<script>
import loginSignupModal from './login-signup-modal.vue'
import listModal from './list-modal.vue'
import {
  showErrorMsg,
  showSuccessMsg,
  eventBus,
} from '../services/event-bus.service'
export default {
  name: 'user-actions',
  props: {},
  emits: ['closeUserActions'],
  data() {
    return {
      isModalOpen: false,
      isLogin: true,
    }
  },
  created() {},
  methods: {
    openModal(isLogin) {
      this.isLogin = isLogin
      this.isModalOpen = true
      this.$refs.userActions.style.opacity = '0'
    },
    closeModal() {
      this.isModalOpen = false
      this.$emit('closeUserActions')
      this.$refs.userActions.style.opacity = '1'
    },
    myDashboard() {
      //   const user = this.loggedinUser
      //   if (!user.orders.length) return
      let route = this.$router.resolve({ path: `/user/orders` })
      window.open(route.href)

      //   this.$router.push('/user/orders')
    },
    async doLogout() {
      try {
        await this.$store.dispatch({ type: 'logout' })
        // showSuccessMsg('logged out!')
        // location.reload()
      } catch (err) {
        // showErrorMsg("can't log out... please try again later")
        throw err
      }
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  components: {
    loginSignupModal,
    listModal,
  },
}
</script>
