<template>
  <section @click.stop class="login-signup-modal">
    <div>
      <div class="header flex align-center">
        <button
          @click.stop="$emit('closeModal')"
          class="close-btn flex align-center custom"
        >
          <close />
        </button>
        <div class="center-heading">Log in or sign up</div>
      </div>

      <main>
        <h3 class="welcome-header header fs18">Welcome to AirGnB</h3>

        <p>{{ msg }}</p>

        <section v-if="isLogin" className="login-form">
          <form @submit.prevent="doLogin" class="login-signup-form">
            <legend>Login</legend>
            <input
              v-model="loginCred.username"
              type="text"
              placeholder="Username"
            />
            <input
              v-model="loginCred.password"
              type="text"
              placeholder="Password"
            />
            <button>LOGIN</button>
          </form>
        </section>
        <section v-else className="signup-form">
          <form @submit.prevent="doSignup" class="login-signup-form">
            <legend>Sign-Up</legend>
            <input
              v-model="signupCred.fullname"
              type="text"
              placeholder="Full Name"
            />
            <input
              v-model="signupCred.username"
              type="text"
              placeholder="Username"
            />
            <input
              v-model="signupCred.password"
              type="text"
              placeholder="Password"
            />
            <button>SIGN UP</button>
          </form>
        </section>
      </main>
    </div>
  </section>
</template>
<script>
import close from '../assets/svg/close.vue'
export default {
  name: 'login-signup-modal',
  props: {
    isLogin: {
      type: Boolean,
    },
  },
  data() {
    return {
      loginCred: {
        username: '',
        password: '',
      },
      signupCred: {
        fullname: '',
        username: '',
        password: '',
      },
      msg: '',
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  created() {
    this.loadUsers()
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      try {
        await this.$store.dispatch({ type: 'login', userCred: this.loginCred })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username
      ) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      this.$emit('closeModal')
    },
    loadUsers() {
      this.$store.dispatch({ type: 'loadUsers' })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: 'removeUser', userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl
    },
  },
  computed: {},
  components: {
    close,
  },
}
</script>
