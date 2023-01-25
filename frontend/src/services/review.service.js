import { httpService } from './http.service'
import { storageService } from './async-storage.service'
import { userService } from './user.service'

import { store } from '../store/store'
import { socketService, SOCKET_EVENT_REVIEW_ADDED } from './socket.service'
;(() => {
  setTimeout(() => {
    // socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
    //   console.log('GOT from socket', review)
    //   store.commit({type: 'addReview', review})
    // })
    // socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
    //   showSuccessMsg(`New review about me ${review.txt}`)
    // })
  }, 0)
})()

export const reviewService = {
  add,
  query,
  remove,
}

function query(filterBy) {
  // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&sort=anaAref`
  // return httpService.get(`review${queryStr}`)
  return storageService.query('review')
}

async function remove(reviewId) {
  // await httpService.delete(`review/${reviewId}`)
  await storageService.delete('review', reviewId)
}
async function add(review) {
  // const addedReview = await httpService.post(`review`, review)

  review.byUser = userService.getLoggedinUser()
  review.aboutUser = await userService.getById(review.aboutUserId)
  const addedReview = await storageService.post('review', review)

  return addedReview
}
