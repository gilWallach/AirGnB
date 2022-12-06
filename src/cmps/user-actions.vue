<template>
  <section class="user-actions" ref="userActions">
    <ul class="list-items clean-list fs14">
      <li v-if="!loggedinUser" @click.stop="openModal(false)">Sign up</li>
      <li v-if="!loggedinUser" @click.stop="openModal(true)">Log in</li>
      <li v-else @click="myDashboard">My Dashboard</li>
    </ul>
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
