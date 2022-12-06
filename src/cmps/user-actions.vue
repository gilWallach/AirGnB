<template>
  <section class="user-actions" ref="userActions">
    <ul class="list-items clean-list fs14">
      <li @click.stop="openModal">Sign up</li>
      <li>Log in</li>
    </ul>
  </section>

  <transition name="fade">
    <loginSignupModal v-if="isModalOpen" @closeModal="closeModal" />
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
  data() {
    return {
      isModalOpen: false,
    }
  },
  created() {},
  methods: {
    openModal() {
      this.isModalOpen = true
      this.$refs.userActions.style.opacity = '0'
    },
  },
  computed: {},
  components: {
    loginSignupModal,
    listModal,
  },
}
</script>
