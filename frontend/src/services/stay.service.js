// import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
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

async function query(filterBy = { name: '', capacity: 0 }) {
  return httpService.get(STORAGE_KEY, filterBy)

  // var stays = await storageService.query(STORAGE_KEY)
  // if (filterBy.txt) {
  //     const regex = new RegExp(filterBy.txt, 'i')
  //     stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
  // }
  // if (filterBy.price) {
  //     stays = stays.filter(stay => stay.price <= filterBy.price)
  // }
  // return stays
}
async function getById(stayId) {
  // return storageService.get(STORAGE_KEY, stayId)
  return await httpService.get(`stay/${stayId}`)
}

async function remove(stayId) {
  // await storageService.remove(STORAGE_KEY, stayId)
  return httpService.delete(`stay/${stayId}`)
}
async function save(stay) {
  var savedStay
  if (stay._id) {
    // savedStay = await storageService.put(STORAGE_KEY, stay)
    savedStay = await httpService.put(`stay/${stay._id}`, stay)
  } else {
    // Later, owner is set by the backend
    stay.owner = userService.getLoggedinUser()
    // savedStay = await storageService.post(STORAGE_KEY, stay)
    savedStay = await httpService.post('stay', stay)
  }
  return savedStay
}

async function addStayMsg(stayId, txt) {
  const savedMsg = await httpService.post(`stay/${stayId}/msg`, { txt })
  return savedMsg
}

function getEmptyStay() {
  return {
    name: '',
    capacity: 0,
    price: 0,
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
      displayName: 'Trending',
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
    {
      name: 'amazing-views',
      displayName: 'Amazing views',
      imageUrl:
        'https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg',
    },
    {
      name: 'castles',
      displayName: 'Castles',
      imageUrl:
        'https://a0.muscache.com/pictures/1b6a8b70-a3b6-48b5-88e1-2243d9172c06.jpg',
    },
    {
      name: 'cabins',
      displayName: 'Cabins',
      imageUrl:
        'https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg',
    },
    {
      name: 'mansions',
      displayName: 'Mansions',
      imageUrl:
        'https://a0.muscache.com/pictures/78ba8486-6ba6-4a43-a56d-f556189193da.jpg',
    },
    {
      name: 'luxe',
      displayName: 'Luxe',
      imageUrl:
        'https://a0.muscache.com/pictures/c8e2ed05-c666-47b6-99fc-4cb6edcde6b4.jpg',
    },
    {
      name: 'design',
      displayName: 'Design',
      imageUrl:
        'https://a0.muscache.com/pictures/50861fca-582c-4bcc-89d3-857fb7ca6528.jpg',
    },
    {
      name: 'tree-houses',
      displayName: 'Tree houses',
      imageUrl:
        'https://a0.muscache.com/pictures/4d4a4eba-c7e4-43eb-9ce2-95e1d200d10e.jpg',
    },
    {
      name: 'tropical',
      displayName: 'Tropical',
      imageUrl:
        'https://a0.muscache.com/pictures/ee9e2a40-ffac-4db9-9080-b351efc3cfc4.jpg',
    },
    {
      name: 'creative-spaces',
      displayName: 'Creative spaces',
      imageUrl:
        'https://a0.muscache.com/pictures/8a43b8c6-7eb4-421c-b3a9-1bd9fcb26622.jpg',
    },
    {
      name: 'lakefront',
      displayName: 'Lakefront',
      imageUrl:
        'https://a0.muscache.com/pictures/677a041d-7264-4c45-bb72-52bff21eb6e8.jpg',
    },
    {
      name: 'ski-in-out',
      displayName: 'Ski in/out',
      imageUrl:
        'https://a0.muscache.com/pictures/757deeaa-c78f-488f-992b-d3b1ecc06fc9.jpg',
    },
    {
      name: 'tiny-homes',
      displayName: 'Tiny homes',
      imageUrl:
        'https://a0.muscache.com/pictures/35919456-df89-4024-ad50-5fcb7a472df9.jpg',
    },
    {
      name: 'beachfront',
      displayName: 'Beachfront',
      imageUrl:
        'https://a0.muscache.com/pictures/bcd1adc0-5cee-4d7a-85ec-f6730b0f8d0c.jpg',
    },
    {
      name: 'off-the-grid',
      displayName: 'Off the grid',
      imageUrl:
        'https://a0.muscache.com/pictures/9a2ca4df-ee90-4063-b15d-0de7e4ce210a.jpg',
    },
    {
      name: 'skiing',
      displayName: 'Skiing',
      imageUrl:
        'https://a0.muscache.com/pictures/c8bba3ed-34c0-464a-8e6e-27574d20e4d2.jpg',
    },
    {
      name: 'amazing-pools',
      displayName: 'Amazing pools',
      imageUrl:
        'https://a0.muscache.com/pictures/3fb523a0-b622-4368-8142-b5e03df7549b.jpg',
    },
    {
      name: 'caves',
      displayName: 'Caves',
      imageUrl:
        'https://a0.muscache.com/pictures/4221e293-4770-4ea8-a4fa-9972158d4004.jpg',
    },
    {
      name: 'a-frames',
      displayName: 'A-frames',
      imageUrl:
        'https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg',
    },
    {
      name: 'islands',
      displayName: 'Islands',
      imageUrl:
        'https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg',
    },
    {
      name: 'countryside',
      displayName: 'Countryside',
      imageUrl:
        'https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg',
    },
    {
      name: 'boats',
      displayName: 'Boats',
      imageUrl:
        'https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg',
    },
    {
      name: 'beach',
      displayName: 'Beach',
      imageUrl:
        'https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg',
    },
    {
      name: 'national-parks',
      displayName: 'National parks',
      imageUrl:
        'https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg',
    },
    {
      name: 'lake',
      displayName: 'Lake',
      imageUrl:
        'https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg',
    },
    {
      name: 'houseboats',
      displayName: 'Houseboatds',
      imageUrl:
        'https://a0.muscache.com/pictures/c027ff1a-b89c-4331-ae04-f8dee1cdc287.jpg',
    },
    {
      name: 'camping',
      displayName: 'Camping',
      imageUrl:
        'https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg',
    },
  ]
}
