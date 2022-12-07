// import { stayService } from '../services/stay.service.local'
import { stayService } from '../services/stay.service'

export function getActionRemoveStay(stayId) {
  return {
    type: 'removeStay',
    stayId,
  }
}
export function getActionAddStay(stay) {
  return {
    type: 'addStay',
    stay,
  }
}
export function getActionUpdateStay(stay) {
  return {
    type: 'updateStay',
    stay,
  }
}

export function getActionAddStayMsg(stayId) {
  return {
    type: 'addStayMsg',
    stayId,
    txt: 'Stam txt',
  }
}

export const stayStore = {
  state: {
    stays: [],
    labels: [],
    selectedStay: null,
  },
  getters: {
    stays({ stays }) {
      return stays
    },
    labels({ labels }) {
      return labels
    },
    selectedStay(state) {
      return state.selectedStay
    },
  },
  mutations: {
    setStays(state, { stays }) {
      state.stays = stays
    },
    setLabels(state, { labels }) {
      state.labels = labels
    },
    addStay(state, { stay }) {
      state.stays.push(stay)
    },
    updateStay(state, { stay }) {
      const idx = state.stays.findIndex((c) => c.id === stay._id)
      state.stays.splice(idx, 1, stay)
    },
    removeStay(state, { stayId }) {
      state.stays = state.stays.filter((stay) => stay._id !== stayId)
    },
    addStayMsg(state, { stayId, msg }) {
      const stay = state.stays.find((stay) => stay._id === stayId)
      if (!stay.msgs) stay.msgs = []
      stay.msgs.push(msg)
    },
    setFilterBy(state, { filterBy }) {
      state.filterBy = filterBy
    },
    setSelectedStay(state, { stay }) {
      state.selectedStay = stay
    },
  },
  actions: {
    async addStay(context, { stay }) {
      try {
        stay = await stayService.save(stay)
        context.commit(getActionAddStay(stay))
        return stay
      } catch (err) {
        console.log('stayStore: Error in addStay', err)
        throw err
      }
    },
    async updateStay(context, { stay }) {
      try {
        stay = await stayService.save(stay)
        context.commit(getActionUpdateStay(stay))
        return stay
      } catch (err) {
        console.log('stayStore: Error in updateStay', err)
        throw err
      }
    },
    async loadStays(context, { filterBy }) {
      try {
        const stays = await stayService.query(filterBy)
        context.commit({ type: 'setStays', stays })
      } catch (err) {
        console.log('stayStore: Error in loadStays', err)
        throw err
      }
    },
    async loadLabels(context) {
      try {
        const labels = await stayService.getLabels()
        context.commit({ type: 'setLabels', labels })
      } catch (err) {
        console.log('stayStore: Error in loadLabels', err)
        throw err
      }
    },
    async removeStay(context, { stayId }) {
      try {
        await stayService.remove(stayId)
        context.commit(getActionRemoveStay(stayId))
      } catch (err) {
        console.log('stayStore: Error in removeStay', err)
        throw err
      }
    },
    async addStayMsg(context, { stayId, txt }) {
      try {
        const msg = await stayService.addStayMsg(stayId, txt)
        context.commit({ type: 'addStayMsg', stayId, msg })
      } catch (err) {
        console.log('stayStore: Error in addStayMsg', err)
        throw err
      }
    },
    async loadStay({ commit }, { id }) {
      try {
        const stay = await stayService.getById(id)
        commit({ type: 'setSelectedStay', stay })
      } catch (err) {
        throw new Error(err)
      }
    },
  },
}
