<template>
  <div class="container home">
    <stay-list :stays="stays" :labels="labels"/>
  </div>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { stayService } from '../services/stay.service.local'
import {
  getActionRemoveStay,
  getActionUpdateStay,
  getActionAddStayMsg,
} from '../store/stay.store'

import stayList from '../cmps/stay-list.vue'

export default {
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedinUser
    },
    stays() {
      return this.$store.getters.stays
    },
    labels() {
      return this.$store.getters.labels
    },
  },
  created() {
    this.$store.commit({type:'setList'})
    this.$store.dispatch({ type: 'loadStays' })
    this.$store.dispatch({ type: 'loadLabels' })
  },
  methods: {
    async addStay() {
      try {
        await this.$store.dispatch({ type: 'addStay', stay: this.stayToAdd })
        showSuccessMsg('Stay added')
        this.stayToAdd = stayService.getEmptyStay()
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add stay')
      }
    },
    async removeStay(stayId) {
      try {
        await this.$store.dispatch(getActionRemoveStay(stayId))
        showSuccessMsg('Stay removed')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot remove stay')
      }
    },
    async updateStay(stay) {
      try {
        stay = { ...stay }
        stay.price = +prompt('New price?', stay.price)
        await this.$store.dispatch(getActionUpdateStay(stay))
        showSuccessMsg('Stay updated')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot update stay')
      }
    },
    async addStayMsg(stayId) {
      try {
        await this.$store.dispatch(getActionAddStayMsg(stayId))
        showSuccessMsg('Stay msg added')
      } catch (err) {
        console.log(err)
        showErrorMsg('Cannot add stay msg')
      }
    },
    printStayToConsole(stay) {
      console.log('Stay msgs:', stay.msgs)
    },
  },
  components: {
    stayList,
  },
}
</script>
