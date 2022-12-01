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
  getLabels,
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

function getLabels() {
  return [
    {
      name: 'new',
      displayName: 'New',
      imageUrl:
        'https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg',
    },
    {
      name: 'top-of-the-world',
      displayName: 'Top of the world',
      imageUrl:
        'https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg',
    },
    {
      name: 'trending',
      displayName: 'Trending ',
      imageUrl:
        'https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg',
    },
    {
      name: 'adapted',
      displayName: 'Adapted',
      imageUrl:
        'https://a0.muscache.com/pictures/e22b0816-f0f3-42a0-a5db-e0f1fa93292b.jpg',
    },
    {
      name: 'play',
      displayName: 'Play',
      imageUrl:
        'https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg',
    },
    {
      name: 'hanoks',
      displayName: 'Hanoks',
      imageUrl:
        'https://a0.muscache.com/pictures/51f5cf64-5821-400c-8033-8a10c7787d69.jpg',
    },
    {
      name: 'private-rooms',
      displayName: 'Private rooms',
      imageUrl:
        'https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg',
    },
    {
      name: 'omg',
      displayName: 'OMG!',
      imageUrl:
        'https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg',
    },
  ]
}

async function _createStays() {
  await storageService.post(STORAGE_KEY, {
    _id: '10006546',
    name: "Gil's Amazing Private Island",
    type: 'Island',
    imgUrls: [
      'https://images.unsplash.com/photo-1589814976706-04cd504d0c71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
      'https://images.unsplash.com/photo-1466098672325-c9ddda4b7975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://i.ytimg.com/vi/jz2mL0ortEE/maxresdefault.jpg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg',
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
      imgUrl: 'https://robohash.org/O8V.png?set=set2&size=150x150',
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
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/priors-crescent-living-room-haus-interiors-show-home-1602462623.jpg?crop=0.668xw:1.00xh;0.0731xw,0&resize=640:*',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/interior-design-trends-2022-home-libraries-1653410954.jpg',
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
      imgUrl: 'https://robohash.org/O8V.png?set=set2&size=150x150',
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
    name: "Muki's Duplex",
    type: 'House',
    imgUrls: [
      'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      'https://images.unsplash.com/photo-1621045081424-97aa08903f76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://media.designcafe.com/wp-content/uploads/2021/11/22204726/living-room-designs-indian-style-middle-class.jpg',
      'https://adorable-home.com/wp-content/uploads/2016/10/Interior-Design-Style-Modern-defined.jpg',
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
      imgUrl: 'https://robohash.org/O8V.png?set=set2&size=150x150',
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
    name: 'Mister JavaScript Tent',
    type: 'House',
    imgUrls: [
      'https://images.unsplash.com/photo-1612031737124-28aeae3f2863?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1617104611622-d5f245d317f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1184&q=80',
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/edyta-and-co-layout-1549663065.jpg?crop=0.4445333333333333xw:1xh;center,top&resize=480:*',
      'https://images.unsplash.com/photo-1615874694520-474822394e73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1616593918824-4fef16054381?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
    ],
    price: 380.0,
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
      imgUrl: 'https://robohash.org/O8V.png?set=set2&size=150x150',
    },
    loc: {
      country: 'Israel',
      countryCode: 'IL',
      city: 'Tel Aviv',
      address: '17 Allenbi st',
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
    name: "Optimus Prime's Secret Galaxy",
    type: 'House',
    imgUrls: [
      'https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
      'https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1600494448850-6013c64ba722?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1616132205093-3158f3a65fb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
    ],
    price: 830.0,
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
      imgUrl: 'https://robohash.org/O8V.png?set=set2&size=150x150',
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
    name: "Lionel Messi's Appartment",
    type: 'House',
    imgUrls: [
      'https://images.unsplash.com/photo-1562368764-651b0bba96af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1533477579100-e9a9fdf5be71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://plus.unsplash.com/premium_photo-1661730410021-66154e6f7ca5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1613545325268-9265e1609167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1606074280798-2dabb75ce10c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
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
      imgUrl: 'https://robohash.org/O8V.png?set=set2&size=150x150',
    },
    loc: {
      country: 'Spain',
      countryCode: 'SP',
      city: 'Barcelona',
      address: '17 Messi st',
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
    name: "Doda's Private Apartment (with movie theater!)",
    type: 'House',
    imgUrls: [
      'https://images.unsplash.com/photo-1634822929331-ee4dc2c97fc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1616593871468-2a9452218369?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1597665863042-47e00964d899?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://plus.unsplash.com/premium_photo-1661721905869-03b9aacd68a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1560449752-3fd4bdbe7df0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
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
      imgUrl: 'https://robohash.org/O8V.png?set=set2&size=150x150',
    },
    loc: {
      country: 'Brazil',
      countryCode: 'BR',
      city: 'Morro de Sao Paolo',
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
    name: "Phistuk's (Adults Only) House",
    type: 'House',
    imgUrls: [
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://images.unsplash.com/photo-1611216212569-d739dbe9ed40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://plus.unsplash.com/premium_photo-1661698951100-064e4ae229fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://plus.unsplash.com/premium_photo-1668780538108-a097b10a918a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
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
      imgUrl: 'https://robohash.org/O8V.png?set=set2&size=150x150',
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
    name: 'Havana Cabana Banana',
    type: 'House',
    imgUrls: [
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://images.unsplash.com/photo-1602872030219-ad2b9a54315c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
      'https://images.unsplash.com/photo-1607809714110-e34f71c7b2ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
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
      imgUrl: 'https://robohash.org/O8V.png?set=set2&size=150x150',
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
