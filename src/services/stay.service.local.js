import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'stay'

export const stayService = {
  query,
  getById,
  save,
  remove,
  getEmptyStay,
  addStayMsg,
}
window.cs = stayService

async function query(filterBy = { name: '', price: 0 }) {
  var stays = await storageService.query(STORAGE_KEY)
  if (!stays?.length) _createStays()
  if (filterBy.name) {
    const regex = new RegExp(filterBy.name, 'i')
    stays = stays.filter(
      (stay) => regex.test(stay.name) || regex.test(stay.description)
    )
  }
  if (filterBy.price) {
    stays = stays.filter((stay) => stay.price <= filterBy.price)
  }
  return stays
}

function getById(stayId) {
  return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
  await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
  var savedStay
  if (stay._id) {
    savedStay = await storageService.put(STORAGE_KEY, stay)
  } else {
    // Later, owner is set by the backend
    stay.owner = userService.getLoggedinUser()
    savedStay = await storageService.post(STORAGE_KEY, stay)
  }
  return savedStay
}

async function addStayMsg(stayId, txt) {
  // Later, this is all done by the backend
  const stay = await getById(stayId)
  if (!stay.msgs) stay.msgs = []

  const msg = {
    id: utilService.makeId(),
    by: userService.getLoggedinUser(),
    txt,
  }
  stay.msgs.push(msg)
  await storageService.put(STORAGE_KEY, stay)

  return msg
}

function getEmptyStay() {
  return {
    name: '',
    price: 0,
    summary: '',
  }
}

async function _createStays() {
  await storageService.post(STORAGE_KEY, {
    _id: '10006546',
    name: "Gil's Amazing Private Island",
    type: 'Island',
    imgUrls: [
      'https://images.unsplash.com/photo-1589814976706-04cd504d0c71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
      'https://images.unsplash.com/photo-1466098672325-c9ddda4b7975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
    ],
    price: 555.0,
    summary:
      'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
    capacity: 8,
    amenities: [
      'TV',
      'Wifi',
      'Kitchen',
      'Smoking allowed',
      'Pets allowed',
      'Cooking basics',
    ],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: 'u101',
      fullname: 'Davit Pok',
      imgUrl:
        'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Porto',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 'madeId',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user'], // for user-wishlist : use $in
  })
  await storageService.post(STORAGE_KEY, {
    _id: '1000623423',
    name: 'Yaron Charming Villa',
    type: 'House',
    imgUrls: [
      'https://images.unsplash.com/photo-1462530260150-162092dbf011?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1086&q=80',
      'https://images.unsplash.com/photo-1589459072535-550f4fae08d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
    ],
    price: 130.0,
    summary:
      'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
    capacity: 8,
    amenities: [
      'TV',
      'Wifi',
      'Kitchen',
      'Smoking allowed',
      'Pets allowed',
      'Cooking basics',
    ],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: 'u101',
      fullname: 'Davit Pok',
      imgUrl:
        'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Porto',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 'madeId',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user'], // for user-wishlist : use $in
  })
  await storageService.post(STORAGE_KEY, {
    _id: '10006521346',
    name: 'Muki Charming Duplex',
    type: 'House',
    imgUrls: [
      'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      'https://images.unsplash.com/photo-1621045081424-97aa08903f76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
    ],
    price: 120.0,
    summary:
      'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
    capacity: 8,
    amenities: [
      'TV',
      'Wifi',
      'Kitchen',
      'Smoking allowed',
      'Pets allowed',
      'Cooking basics',
    ],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: 'u101',
      fullname: 'Davit Pok',
      imgUrl:
        'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Porto',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 'madeId',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user'], // for user-wishlist : use $in
  })
  await storageService.post(STORAGE_KEY, {
    _id: '1000623423',
    name: 'Yaron Charming Villa',
    type: 'House',
    imgUrls: [
      'https://images.unsplash.com/photo-1612031737124-28aeae3f2863?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1617104611622-d5f245d317f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1184&q=80',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
    ],
    price: 130.0,
    summary:
      'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
    capacity: 8,
    amenities: [
      'TV',
      'Wifi',
      'Kitchen',
      'Smoking allowed',
      'Pets allowed',
      'Cooking basics',
    ],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: 'u101',
      fullname: 'Davit Pok',
      imgUrl:
        'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Porto',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 'madeId',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user'], // for user-wishlist : use $in
  })
  await storageService.post(STORAGE_KEY, {
    _id: '1000623423',
    name: 'Yaron Charming Villa',
    type: 'House',
    imgUrls: [
      'https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
    ],
    price: 130.0,
    summary:
      'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
    capacity: 8,
    amenities: [
      'TV',
      'Wifi',
      'Kitchen',
      'Smoking allowed',
      'Pets allowed',
      'Cooking basics',
    ],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: 'u101',
      fullname: 'Davit Pok',
      imgUrl:
        'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Porto',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 'madeId',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user'], // for user-wishlist : use $in
  })
  await storageService.post(STORAGE_KEY, {
    _id: '1000623423',
    name: 'Yaron Charming Villa',
    type: 'House',
    imgUrls: [
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
    ],
    price: 130.0,
    summary:
      'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
    capacity: 8,
    amenities: [
      'TV',
      'Wifi',
      'Kitchen',
      'Smoking allowed',
      'Pets allowed',
      'Cooking basics',
    ],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: 'u101',
      fullname: 'Davit Pok',
      imgUrl:
        'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Porto',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 'madeId',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user'], // for user-wishlist : use $in
  })
  await storageService.post(STORAGE_KEY, {
    _id: '1000623423',
    name: 'Yaron Charming Villa',
    type: 'House',
    imgUrls: [
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
    ],
    price: 130.0,
    summary:
      'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
    capacity: 8,
    amenities: [
      'TV',
      'Wifi',
      'Kitchen',
      'Smoking allowed',
      'Pets allowed',
      'Cooking basics',
    ],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: 'u101',
      fullname: 'Davit Pok',
      imgUrl:
        'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Porto',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 'madeId',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user'], // for user-wishlist : use $in
  })
  await storageService.post(STORAGE_KEY, {
    _id: '1000623423',
    name: 'Yaron Charming Villa',
    type: 'House',
    imgUrls: [
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
    ],
    price: 130.0,
    summary:
      'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
    capacity: 8,
    amenities: [
      'TV',
      'Wifi',
      'Kitchen',
      'Smoking allowed',
      'Pets allowed',
      'Cooking basics',
    ],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: 'u101',
      fullname: 'Davit Pok',
      imgUrl:
        'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Porto',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 'madeId',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user'], // for user-wishlist : use $in
  })
  await storageService.post(STORAGE_KEY, {
    _id: '1000623423',
    name: 'Yaron Charming Villa',
    type: 'House',
    imgUrls: [
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
    ],
    price: 130.0,
    summary:
      'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
    capacity: 8,
    amenities: [
      'TV',
      'Wifi',
      'Kitchen',
      'Smoking allowed',
      'Pets allowed',
      'Cooking basics',
    ],
    labels: ['Top of the world', 'Trending', 'Play', 'Tropical'],
    host: {
      _id: 'u101',
      fullname: 'Davit Pok',
      imgUrl:
        'https://a0.muscache.com/im/pictures/fab79f25-2e10-4f0f-9711-663cb69dc7d8.jpg?aki_policy=profile_small',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Porto',
      address: '17 Kombo st',
      lat: -8.61308,
      lng: 41.1413,
    },
    reviews: [
      {
        id: 'madeId',
        txt: 'Very helpful hosts. Cooked traditional...',
        rate: 4,
        by: {
          _id: 'u102',
          fullname: 'user2',
          imgUrl: '/img/img2.jpg',
        },
      },
    ],
    likedByUsers: ['mini-user'], // for user-wishlist : use $in
  })
}

// TEST DATA
// ;(async ()=>{
//     await storageService.post(STORAGE_KEY, {"name": "Gil's Amazing Private Island",
//     "type": "Island",
//     "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
//     "price": 555.00,
//     "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",})
//     await storageService.post(STORAGE_KEY, {"name": "Yaron Charming Villa",
//     "type": "House",
//     "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
//     "price": 130.00,
//     "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",})
//     await storageService.post(STORAGE_KEY, { "name": "Muki Charming Duplex",
//     "type": "House",
//     "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
//     "price": 120.00,
//     "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...",})
//     await storageService.post(STORAGE_KEY, {"name": "Puki Charming Duplex",
//     "type": "House",
//     "imgUrls": ["https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large", "otherImg.jpg"],
//     "price": 80.00,
//     "summary": "Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)..."})
// })()
