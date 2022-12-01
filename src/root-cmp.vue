<template>
  <div class="main-app">
    <user-msg />
    <app-header />
    <router-view @setDetailsLayout="(isList = false)" @setListLayout="(isList = true)" />
  </div>
</template>

<script>
import { store } from './store/store'
import appHeader from './cmps/app-header.vue'
import userMsg from './cmps/user-msg.vue'
import { userService } from './services/user.service'

export default {
  created() {
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  components: {
    appHeader,
    userMsg,
  },
}
</script>
