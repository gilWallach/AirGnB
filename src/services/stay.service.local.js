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
  getOrders,
}
window.cs = stayService

async function query(filterBy = { name: '', label: '', capacity: 0 }) {
  var stays = await storageService.query(STORAGE_KEY)
  if (!stays?.length) _createStays()
  if (filterBy.name) {
    const regex = new RegExp(filterBy.name, 'i')
    stays = stays.filter(
      (stay) => regex.test(stay.loc.city) || regex.test(stay.loc.country)
    )
  }
  if (filterBy.label) {
    stays = stays.filter((stay) => {
      // return stay.labels.some(stay.label === filterBy.label)
      return stay.labels.includes(filterBy.label)
    })
  }
  if (filterBy.capacity) {
    stays = stays.filter((stay) => stay.capacity >= filterBy.capacity)
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

function getOrders() {
  return [
    {
      _id: 'o1225',
      hostId: '622f3401e36c59e6164fab4d',
      createdAt: 9898989,
      buyer: {
        _id: '622f3401e36c59e6164fab4e',
        fullname: 'Leo',
      },
      totalPrice: 160,
      startDate: '2025/10/15',
      endDate: '2025/10/17',
      guests: {
        adults: 2,
        kids: 1,
      },
      stay: {
        _id: '622f337a75c7d36e498aaaf8',
        name: 'Westin Kaanapali KORVN 2BR',
        price: 595,
      },
      msgs: [],
      status: 'pending', // pending, approved
    },
  ]
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
    // {
    //   name: 'a-frames',
    //   displayName: 'A-frames',
    //   imageUrl:
    //     'https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg',
    // },
    // {
    //   name: 'islands',
    //   displayName: 'Islands',
    //   imageUrl:
    //     'https://a0.muscache.com/pictures/8e507f16-4943-4be9-b707-59bd38d56309.jpg',
    // },
    // {
    //   name: 'countryside',
    //   displayName: 'Countryside',
    //   imageUrl:
    //     'https://a0.muscache.com/pictures/6ad4bd95-f086-437d-97e3-14d12155ddfe.jpg',
    // },
    // {
    //   name: 'boats',
    //   displayName: 'Boats',
    //   imageUrl:
    //     'https://a0.muscache.com/pictures/687a8682-68b3-4f21-8d71-3c3aef6c1110.jpg',
    // },
    // {
    //   name: 'beach',
    //   displayName: 'Beach',
    //   imageUrl:
    //     'https://a0.muscache.com/pictures/10ce1091-c854-40f3-a2fb-defc2995bcaf.jpg',
    // },
    // {
    //   name: 'national-parks',
    //   displayName: 'National parks',
    //   imageUrl:
    //     'https://a0.muscache.com/pictures/c0a24c04-ce1f-490c-833f-987613930eca.jpg',
    // },
    // {
    //   name: 'lake',
    //   displayName: 'Lake',
    //   imageUrl:
    //     'https://a0.muscache.com/pictures/a4634ca6-1407-4864-ab97-6e141967d782.jpg',
    // },
    // {
    //   name: 'houseboats',
    //   displayName: 'Houseboatds',
    //   imageUrl:
    //     'https://a0.muscache.com/pictures/c027ff1a-b89c-4331-ae04-f8dee1cdc287.jpg',
    // },
    // {
    //   name: 'camping',
    //   displayName: 'Camping',
    //   imageUrl:
    //     'https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg',
    // },
  ]
}

async function _createStays() {
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aaaf8',
    name: 'Westin Kaanapali KORVN 2BR',
    type: 'National parks',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436975/hx9ravtjop3uqv4giupt.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436496/ihozxprafjzuhil9qhh4.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436952/aef9ajipinpjhkley1e3.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg',
    ],
    price: 595,
    summary:
      'Westin Kaanapali Ocean Resort Villas North timeshare - Pay resort: $14-20/day, stays under 7 night $38/res - Inquire about availability, I review then offer/approve if available :) - READ "The Space" for cleaning/etc AND brief explanation about timeshare reservations - Want guaranteed view for additional cost? Must be weekly rental, other restrictions - Wheelchair accessible / ADA, call resort directly to ensure U receive. If U need ADA U MUST inform us BEFORE booking.',
    capacity: 8,
    amenities: [
      'TV',
      'Cable TV',
      'Internet',
      'Wifi',
      'Air conditioning',
      'Wheelchair accessible',
      'Pool',
      'Kitchen',
      'Free parking on premises',
      'Doorman',
      'Gym',
      'Elevator',
      'Hot tub',
      'Heating',
      'Family/kid friendly',
      'Suitable for events',
      'Washer',
      'Dryer',
      'Smoke detector',
      'Carbon monoxide detector',
      'First aid kit',
      'Safety card',
      'Fire extinguisher',
      'Essentials',
      'Shampoo',
      '24-hour check-in',
      'Hangers',
      'Hair dryer',
      'Iron',
      'Laptop friendly workspace',
      'Self check-in',
      'Building staff',
      'Private entrance',
      'Room-darkening shades',
      'Hot water',
      'Bed linens',
      'Extra pillows and blankets',
      'Ethernet connection',
      'Luggage dropoff allowed',
      'Long term stays allowed',
      'Ground floor access',
      'Wide hallway clearance',
      'Step-free access',
      'Wide doorway',
      'Flat path to front door',
      'Well-lit path to entrance',
      'Disabled parking spot',
      'Step-free access',
      'Wide doorway',
      'Wide clearance to bed',
      'Step-free access',
      'Wide doorway',
      'Step-free access',
      'Wide entryway',
      'Waterfront',
      'Beachfront',
    ],
    bathrooms: 2,
    bedrooms: 2,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3403e36c59e6164faf93',
      fullname: 'Patty And Beckett',
      location: 'Eureka, California, United States',
      about: 'Adventurous couple loves to travel :)',
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/542dba0c-eb1b-4ab3-85f3-94d3cc8f87a4.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/542dba0c-eb1b-4ab3-85f3-94d3cc8f87a4.jpg?aki_policy=profile_x_medium',
      isSuperhost: true,
      id: '36133410',
    },
    loc: {
      country: 'United States',
      countryCode: 'US',
      city: 'Maui',
      address: 'Lahaina, HI, United States',
      lat: -156.6917,
      lan: 20.93792,
    },
    reviews: [
      {
        at: '2016-06-12T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fc004',
          fullname: 'Kiesha',
          imgUrl: 'https://robohash.org/10711825?set=set1',
          id: '10711825',
        },
        txt: 'I had a great experience working with Patty and Peter.  Both were very attentive in sorting out the booking details and following up directly when I had questions.  I rented a 2 bedroom unit at the Westin Villas  in Maui and both the unit and property was absolutely amazing.  I think we had the best unit on the resort complete with 2 outdoor patios with direct access  to  the  beach.  I would HIGHLY recommend renting with Patty and Peter.',
      },
      {
        at: '2016-07-28T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb204',
          fullname: 'Chris',
          imgUrl: 'https://robohash.org/70072865?set=set1',
          id: '70072865',
        },
        txt: 'Peter quickly responded to any questions I had before, and during the trip. Will use again, highly recommend. ',
      },
      {
        at: '2016-09-11T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb703',
          fullname: 'Kim',
          imgUrl: 'https://robohash.org/71179725?set=set1',
          id: '71179725',
        },
        txt: 'We had the perfect location for a room, first floor right in front of the pool. The resort is beautiful, and the staff is so friendly! I enjoyed it so much, we talked about buying a timeshare ourselves.',
      },
      {
        at: '2017-01-07T05:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb37f',
          fullname: 'Tracy',
          imgUrl: 'https://robohash.org/65593239?set=set1',
          id: '65593239',
        },
        txt: 'Beautiful location. Patty & Peter were super helpful and easy to work with!',
      },
      {
        at: '2017-04-07T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb105',
          fullname: 'Duyen',
          imgUrl: 'https://robohash.org/26215688?set=set1',
          id: '26215688',
        },
        txt: 'Great spot for the kids and family and close to beach and everything at the resort. We will definitely be back.',
      },
      {
        at: '2017-05-09T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fabbe',
          fullname: 'Binh',
          imgUrl: 'https://robohash.org/117390236?set=set1',
          id: '117390236',
        },
        txt: 'The unit and the Westin offer variety of amenities you can possibly ask for. Sofa beds are very comfortable to sleep in. But there is charge for ocean view upgrade. Overall, I highly recommend to book with Patty and Peter. ',
      },
      {
        at: '2018-02-24T05:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb4af',
          fullname: 'Samy',
          imgUrl: 'https://robohash.org/15143517?set=set1',
          id: '15143517',
        },
        txt: "We spent a great week at Patty and Peter's place. The place was exactly as shown in the pictures, very comfortable, nice view, with all amenities. The resort is great with several pools, a long beach, many restaurants, and of course a lot of great activities all around.",
      },
      {
        at: '2018-06-16T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb87b',
          fullname: 'Breanne',
          imgUrl: 'https://robohash.org/78173091?set=set1',
          id: '78173091',
        },
        txt: 'This place was perfect for my family. We had plenty of room to spread out and the service could not have been any better',
      },
      {
        at: '2018-06-29T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb713',
          fullname: 'Kimberly',
          imgUrl: 'https://robohash.org/100535039?set=set1',
          id: '100535039',
        },
        txt: 'We love Westin Kaanapalli',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aaaf9',
    name: 'Belle chambre à côté Metro Papineau',
    type: 'Campers',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437045/dmquvficldi8ssfdlrrx.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437033/rhw6gycttaimzocc1poz.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437330/mmhkmfvg8o3freucyekc.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg',
    ],
    price: 30,
    summary:
      "Chambre dans un bel appartement moderne avec balcon, ascenseur et terrasse. Private room in a beautiful modern apartment  with balcony, elevator and patio. La chambre est fermée avec une lit double. Vous aurez accès à une salle de bain avec une douche, terrasse. L'appartement est climatisé.  Votre chambre est équipé d'une connexion Wi-Fi illimité. Vous serez proche du centre ville, au pied du pont Jacques Cartier et à distance de marche de toutes les commodités (métro, supermarché, pharmacie",
    capacity: 2,
    amenities: [
      'TV',
      'Wifi',
      'Air conditioning',
      'Kitchen',
      'Elevator',
      'Buzzer/wireless intercom',
      'Heating',
      'Family/kid friendly',
      'Washer',
      'Dryer',
      'Smoke detector',
      'Carbon monoxide detector',
      'Essentials',
      'Iron',
      'translation missing: en.hosting_amenity_50',
    ],
    bathrooms: 1,
    bedrooms: 1,
    roomType: 'Private room',
    host: {
      _id: '622f3401e36c59e6164fabab',
      fullname: 'Angel',
      location: 'Montreal, Québec, Canada',
      about: '',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/12be1141-74de-4f04-bf28-82c3ed589d11.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/12be1141-74de-4f04-bf28-82c3ed589d11.jpg?aki_policy=profile_x_medium',
      isSuperhost: false,
      id: '80344827',
    },
    loc: {
      country: 'Canada',
      countryCode: 'CA',
      city: 'Montreal',
      address: 'Montréal, QC, Canada',
      lat: -73.54985,
      lan: 45.52797,
    },
    reviews: [
      {
        at: '2016-07-07T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fc058',
          fullname: 'Rowan',
          imgUrl: 'https://robohash.org/81703602?set=set1',
          id: '81703602',
        },
        txt: 'The place was great, as was the host! I would recommend staying here.',
      },
      {
        at: '2016-07-08T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb274',
          fullname: 'Adriana',
          imgUrl: 'https://robohash.org/64310987?set=set1',
          id: '64310987',
        },
        txt: "J'ai adoré rester là. Très acceuillant.",
      },
      {
        at: '2016-07-12T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb87c',
          fullname: 'Emma',
          imgUrl: 'https://robohash.org/23709900?set=set1',
          id: '23709900',
        },
        txt: "Angel est un hôte très sympa et arrangeant ! L'appartement est agréable à vivre et propre. Proche du métro et du centre ville. Nous avons passé un très bon séjour !",
      },
      {
        at: '2016-08-02T04:00:00.000Z',
        by: {
          _id: '622f3408e36c59e6164fc082',
          fullname: 'Jeffery',
          imgUrl: 'https://robohash.org/44882622?set=set1',
          id: '44882622',
        },
        txt: "Angel was warm and welcoming and has a beautiful apartment. I'd recommend his place to anyone visiting downtown Montreal!",
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aaafa',
    name: 'M&M Space MM2  Apartamento no centro da cidade',
    type: 'Campers',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436861/xrxhgsif3ekhxgn8irlm.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437017/gjyzgdjngyrhfrj2loxz.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436556/mb70fifvvpvde8jub5cg.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437241/wt0seud4ot4cmdrztdzz.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437308/p80ndulkcghpcfsnvjdo.jpg',
    ],
    price: 65,
    summary:
      'O apartamento fica perto de arte e cultura e dos mais belos monumentos da cidade. Belos jardins e paisagens da cidade e do rio Douro ficam perto e podem ser apreciadas.  Existem restaurantes típicos e de comida internacional ao redor do apartamento.   O espaço fica numa rua típica da cidade, cheia da sua magia e magnetismo e é muito pratico e confortável. O espaço é excelente para quem pretende visitar e conhecer a zona histórica e turística do Porto. Transportes públicos ficam próximos.',
    capacity: 4,
    amenities: [
      'TV',
      'Cable TV',
      'Internet',
      'Wifi',
      'Air conditioning',
      'Kitchen',
      'Paid parking off premises',
      'Free street parking',
      'Buzzer/wireless intercom',
      'Family/kid friendly',
      'Washer',
      'Smoke detector',
      'First aid kit',
      'Fire extinguisher',
      'Essentials',
      'Shampoo',
      'Lock on bedroom door',
      '24-hour check-in',
      'Hangers',
      'Hair dryer',
      'Iron',
      'Laptop friendly workspace',
      'Private entrance',
      'Crib',
      'Room-darkening shades',
      'Hot water',
      'Bed linens',
      'Extra pillows and blankets',
      'Microwave',
      'Coffee maker',
      'Refrigerator',
      'Dishwasher',
      'Dishes and silverware',
      'Cooking basics',
      'Oven',
      'Stove',
      'Patio or balcony',
      'Luggage dropoff allowed',
      'Long term stays allowed',
      'Wide doorway',
      'Well-lit path to entrance',
      'Step-free access',
      'Wide doorway',
      'Accessible-height bed',
      'Step-free access',
      'Wide doorway',
      'Accessible-height toilet',
      'Step-free access',
      'Wide entryway',
      'Host greets you',
      'Handheld shower head',
      'Paid parking on premises',
      'Fixed grab bars for shower',
    ],
    bathrooms: 1,
    bedrooms: 2,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3403e36c59e6164fb266',
      fullname: 'Maria',
      location: 'Porto, Porto District, Portugal',
      about:
        'Simples, muito comunicativa, mas de elevado sentido de responsabilidade, de organização e de confiança.\r\nGosto muito de contacto humano, sem o qual não me sinto estável. Adoro conhecer pessoas de culturas diferentes.\r\nFaço várias viagens, mas de curta duração, pois tenho necessidade de sentir o lar e a família. Por ser assim, tento fazer tudo para que os meus hospedes se sintam confortáveis como em suas casas.',
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/c9b876fc-b30e-4951-8f88-af9add00939e.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/c9b876fc-b30e-4951-8f88-af9add00939e.jpg?aki_policy=profile_x_medium',
      isSuperhost: true,
      id: '78704763',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Porto',
      address: 'Porto, Porto, Portugal',
      lat: -8.60154,
      lan: 41.14834,
    },
    reviews: [
      {
        at: '2016-07-18T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb090',
          fullname: 'Lina & Alexis',
          imgUrl: 'https://robohash.org/19177194?set=set1',
          id: '19177194',
        },
        txt: "Mes parents ont passé un excellent séjour à Porto dans l'appartement de Maria qui est bien équipé, confortable et très propre. Il est situé au coeur du centre ville et tout est accessible à pied. Si vous venez en voiture, prévoir de se garer dans le parking souterrain payant juste à côté. Mes parents remercient chaudement Maria et son mari qui ont été adorables, notamment par leur accueil chaleureux.",
      },
      {
        at: '2016-08-10T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb4e7',
          fullname: 'Mario R.',
          imgUrl: 'https://robohash.org/81211152?set=set1',
          id: '81211152',
        },
        txt: 'El apartamento es perfecto para una  estancia, esta perfectamente dotado para cubrir las necesidades de un viaje de recreo, situado perfectamente para acceder a pie a las zonas más interesantes de Oporto. María una perfecta anfitriona que te facilitará una inolvidable estancia en Oporto. Ha sido una gran experiencia.',
      },
      {
        at: '2016-08-14T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb110',
          fullname: 'Patricia',
          imgUrl: 'https://robohash.org/16580426?set=set1',
          id: '16580426',
        },
        txt: "Thierry, Patricia, Anaïs et Manon,\r\nMaria et son mari nous attendaient avec gentillesse et sourires, Maria a toujours répondu à mes mails et SMS en cours de voyage.   Ils nous ont aidé à monter les valises, Il y avait une bouteille d'eau au frais, très appréciable ainsi que des petits gâteaux et une bouteille de vin dans le frigo...L'appartement était très propre rien ne manquait, conforme à la description, bien situé, nous avons tout fait à pieds ...Très à l'écoute de nos demandes Maria et son mari sont charmants, nous nous sommes sentis en famille, nous reviendrons et je recommande fortement ce logement ...Nous avons pu apprécier notre séjour sans tracas.  ",
      },
      {
        at: '2016-09-12T04:00:00.000Z',
        by: {
          _id: '622f3401e36c59e6164fab5b',
          fullname: 'Ingrid',
          imgUrl: 'https://robohash.org/40501338?set=set1',
          id: '40501338',
        },
        txt: 'Thanks Maria for your warm welcome. The appartement was really clean. It has everything that we needed for our stay and is really well located. It was easy to park for free near the appartement. Thanks!',
      },
      {
        at: '2017-05-13T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb27c',
          fullname: 'Marie Odile',
          imgUrl: 'https://robohash.org/110925120?set=set1',
          id: '110925120',
        },
        txt: 'L appartement de Maria est tres bien situe, propre et surtout tres calme. Il ne manque rien . Maria nous a tres bien recus . Je recommande cet appartement.',
      },
      {
        at: '2017-06-13T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbd3c',
          fullname: 'Anne',
          imgUrl: 'https://robohash.org/23040000?set=set1',
          id: '23040000',
        },
        txt: 'Maria is a great host and we loved this apartment! It was bright, clean, airy and well-equipped and Maria gave us a thorough introduction to how everything worked. The bed was comfortable (it is not made for tall people though) and nights were quiet as both living room and bedroom are facing the backyard, not the street. Only in the morning we could not sleep in as there was loud construction noise during the day. The metro station is only a few minutes walk away and the city center is at walking distance. We also got a sweet welcome with Portuguese wine.',
      },
      {
        at: '2017-06-30T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbd39',
          fullname: 'Armelle',
          imgUrl: 'https://robohash.org/113337848?set=set1',
          id: '113337848',
        },
        txt: "Appartement très bien situé, tout le vieux porto se fait à pied. Très propre, indépendant et fonctionnel. Metro au pied en venant de l'aéroport, ligne directe 15 minutes environ.\nRestaurants et épiceries typiques au pied de l'immeuble. Climatisation et télé dans toutes les pièces, calme et quartier pittoresque. À recommander pour 3 ou 4. Accueil simple, gentil et efficace comme Maria la propriétaire.\n",
      },
      {
        at: '2017-08-01T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbc52',
          fullname: 'Domingo',
          imgUrl: 'https://robohash.org/114367498?set=set1',
          id: '114367498',
        },
        txt: 'apartamento bien situado, agradable, bonito, muy limpio y con una anfitriona maravillosa dispuesta a resolver cualquier inconveniente que se pueda presentar. lo recomiendo sin lugar a dudas.\ngracias Mariapor su gentileza',
      },
      {
        at: '2017-08-11T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbb3f',
          fullname: 'Estelle',
          imgUrl: 'https://robohash.org/123999116?set=set1',
          id: '123999116',
        },
        txt: 'Appartement très propre et très bien situé, bien agencé. Quartier très vivant mais appartement calme car ne donne pas sur la rue. Nous avons passé un très bon séjour chez Maria qui nous a très bien accueilli.',
      },
      {
        at: '2017-09-21T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb06f',
          fullname: 'Alfredo Julio Leandro',
          imgUrl: 'https://robohash.org/148979666?set=set1',
          id: '148979666',
        },
        txt: 'Apartamento agradable, muy limpio y muy bien equipado, en zona tranquila pero accesible para llegar a todos lados de a pie. Maria y Arturo nos recibieron con un rico vino del Douro y galletitas y muy buenas recomendaciones para pasear y comer.',
      },
      {
        at: '2017-10-17T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb78f',
          fullname: 'Nataliia',
          imgUrl: 'https://robohash.org/137603514?set=set1',
          id: '137603514',
        },
        txt: 'Нам очень понравилась квартира,светлая,уютная,на 3-м этаже,с большим балконом,в квартире есть все самое необходимое,стиральная машина,утюг,кровати очень удобные,красивое постельное белье,вся обстановка в квартире сделана с душой,все время прибывания чувствовали себя как дома.\nМария по приезду подарила нам бутылку вина из долины реки Дору,из красивых бокалов мы его с удовольствием выпили,спасибо за презент.\nВ этой маленькой уютной квартире -3 телевизора!!!!Смотреть было некогда,наслаждались красивым городом и окрестностями Порту.',
      },
      {
        at: '2017-12-09T05:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fad62',
          fullname: 'Liz',
          imgUrl: 'https://robohash.org/144054479?set=set1',
          id: '144054479',
        },
        txt: 'Muy contentos con todo. El piso estaba bastante cerca del centro, Maria y su marido estaban incluso antes de la hora de nuestra llegada. El piso esta muy bien equipado: cafetera, botiquín, lavadora etc. Super super limpio todo y las camas muy comodas y acogedores. Y al ser un piso interior, no se oia nada de ruido. Recomendable!',
      },
      {
        at: '2018-01-09T05:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb1c3',
          fullname: 'Ariadne',
          imgUrl: 'https://robohash.org/151785573?set=set1',
          id: '151785573',
        },
        txt: 'Eu e minha amiga ficamos um mês no apartamento e foi uma otima experiencia!\nMuito bem localizado, perto de tudo! Não tivemos nenhuma dificuldade em encontrar o local, que fica a minutos da estação do metrô e é muito perto da região central.\nÓtima infraestrutura, limpeza e organização.\nFomos muito bem recebidas e bem auxiliadas pela Maria, que com certeza é uma ótima anfitriã!\nRecomendo muito a estadia, não poderia ter sido melhor!',
      },
      {
        at: '2018-02-27T05:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb5f5',
          fullname: 'Bruno',
          imgUrl: 'https://robohash.org/169584809?set=set1',
          id: '169584809',
        },
        txt: 'Respostas sempre rápidas; excelente recepção ; sempre simpática e disponível.',
      },
      {
        at: '2018-06-24T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fad10',
          fullname: 'João',
          imgUrl: 'https://robohash.org/43281546?set=set1',
          id: '43281546',
        },
        txt: 'Clean, quiet and centrally located. Very welcoming host as well.',
      },
      {
        at: '2018-07-18T04:00:00.000Z',
        by: {
          _id: '622f3408e36c59e6164fc075',
          fullname: 'Alcides',
          imgUrl: 'https://robohash.org/22956972?set=set1',
          id: '22956972',
        },
        txt: 'O Espaço de Maria é de extremo bom gosto. Tudo extremamente limpo, pratico e organizado nos mínimos detalhes.  Boa localização perto de tudo.  Sem falar na Simpatia e disponibilidade da Maria que com suas dicas tornou nossa estadia em Porto melhor do que esperávamos. Recomendadíssimo !',
      },
      {
        at: '2018-12-09T05:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbad8',
          fullname: 'Miguel Angel',
          imgUrl: 'https://robohash.org/3708225?set=set1',
          id: '3708225',
        },
        txt: 'Alojamiento coqueto y acogedor, muy limpio y bien ubicado, tiene 2 habitaciones y todo lo necesario para poder pasar unos días en Oporto, buena ubicación cerca de Sta Catarina. Nos ha gustado mucho la estancia, la atención de María inmejorable. Muchas gracias por su atención y amabilidad',
      },
      {
        at: '2018-12-29T05:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbede',
          fullname: 'Alessandro',
          imgUrl: 'https://robohash.org/38271990?set=set1',
          id: '38271990',
        },
        txt: 'buena ubicación, piso acogedor, reformado, excelente servicio y recomendaciones',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aaafb',
    name: 'Fresh and modern 1BR in Bed-Stuy',
    type: 'National parks',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436912/xle8ueqxjeazbs4bp09p.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436460/qi3vkpts37b4k0dedosc.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436481/tqwkxtbalipudzhivoag.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437250/o8uutj3t2bvfafvxkr9j.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436855/khyvb5q3yzcqaoscuppz.jpg',
    ],
    price: 79,
    summary:
      'A spacious, art-filled one-bedroom apartment near the express train (28 minutes to Times Square) and a Citibike station. Sample Bed-Stuy life at a nearby French restaurant,  a sunny Haitian cafe, a boutique grocery and more. We do NOT discriminate based on race, religion or sexual orientation.',
    capacity: 2,
    amenities: [
      'Internet',
      'Wifi',
      'Air conditioning',
      'Kitchen',
      'Heating',
      'Family/kid friendly',
      'Smoke detector',
      'Carbon monoxide detector',
      'Fire extinguisher',
      'Essentials',
      'Shampoo',
      '24-hour check-in',
      'Hangers',
      'Hair dryer',
      'Iron',
      'Laptop friendly workspace',
      'translation missing: en.hosting_amenity_49',
      'Self check-in',
      'Lockbox',
    ],
    bathrooms: 1,
    bedrooms: 1,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3402e36c59e6164fac46',
      fullname: 'Shaila & Alex',
      location: 'New York, New York, United States',
      about:
        "I'm a journalist from Texas and my husband is an artist from the Ukraine by way of Kansas City. We recently welcomed our son into the world. (Don't worry, he sleeps all night.)  We love exploring New York, especially Brooklyn, from the Brooklyn Flea to tiny taco joints to the Botanic Gardens to performance art in Bushwick storefronts (really). We've both spent a lot of time in the South, so hospitality is second nature to us. ",
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/users/6334250/profile_pic/1368287493/original.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/users/6334250/profile_pic/1368287493/original.jpg?aki_policy=profile_x_medium',
      isSuperhost: true,
      id: '6334250',
    },
    loc: {
      country: 'United States',
      countryCode: 'US',
      city: 'New York',
      address: 'Brooklyn, NY, United States',
      lat: -73.92922,
      lan: 40.68683,
    },
    reviews: [
      {
        at: '2013-05-27T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbfd2',
          fullname: 'Nicolas',
          imgUrl: 'https://robohash.org/4523027?set=set1',
          id: '4523027',
        },
        txt: "Shaila's place is amazing! It's new, it's clean and it's big! And Shaila is very accommodating, we found everything we needed (cooking, coffee) and more. Given that we were the first guests she hosted through airbnb I can say that she did an amazing job! \r\n",
      },
      {
        at: '2013-06-04T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb048',
          fullname: 'Jeff',
          imgUrl: 'https://robohash.org/6443424?set=set1',
          id: '6443424',
        },
        txt: 'Great, quiet place to stay. It is great having Shaila just upstairs to answer any questions, and especially to give great tips on places to go. ',
      },
      {
        at: '2013-06-13T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fba55',
          fullname: 'Carla',
          imgUrl: 'https://robohash.org/6121036?set=set1',
          id: '6121036',
        },
        txt: "Shaila and Alex are wonderful hosts really, they helped us every time we needed with directions, the internet, the supermarket, the post office !!! (thank you guys !!!).The place and the neighbord are great, 8 blocks far from the apartment you have the subway and 30 min. later you are in the island, we moved early in the morning, late at night (sometimes we came back at 2am) and everything turned out great.Definetly I would come back to their apartment, It's bigger than ours in Argentina !!! I look forward to stay there again and, next time, go out with you guys and have a beer or anything.\r\nBye !!! - Guido and Carla - ",
      },
      {
        at: '2013-06-20T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbf76',
          fullname: 'Dan',
          imgUrl: 'https://robohash.org/6460525?set=set1',
          id: '6460525',
        },
        txt: "Shaila and Alex were incredibly accommodating and me and my girlfriend enjoyed our stay thoroughly. Highly recommended. The place was very private and homely. I didn't really know anything about New York and was nervous about staying in bed stuy but it was safe and friendly everywhere I went. Very easy to get to the airport and manhattan by train.",
      },
      {
        at: '2013-06-25T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbe9d',
          fullname: 'Ariane',
          imgUrl: 'https://robohash.org/6825718?set=set1',
          id: '6825718',
        },
        txt: 'Great place to stay in Brooklyn! Alex gave us a really useful list of nice restaurants and coffee places near the place (We are very happy to have discovered, the restaurant "Saraghina", thanks to Alex\'s map!).  The apartment is vast, furnished with taste and very convenient. We highly recommend!',
      },
      {
        at: '2013-07-03T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fad91',
          fullname: 'Ilka',
          imgUrl: 'https://robohash.org/5823882?set=set1',
          id: '5823882',
        },
        txt: 'I can recommend to everyone to come to this beautiful apartment, Shaila and Alex are great hosts and the neighbourhood is very friendly everywhere we go.\r\nIt really felt like home.',
      },
      {
        at: '2013-07-12T04:00:00.000Z',
        by: {
          _id: '622f3401e36c59e6164fab81',
          fullname: 'Kristy',
          imgUrl: 'https://robohash.org/5729991?set=set1',
          id: '5729991',
        },
        txt: "My sister and I loved staying here! The apartment is very spacious and recently renovated so it looks amazing. The kitchen has everything you need with Alex and Shalia stocking it with a few basics. The neighbourhood is a little shabby, especially compared to the home we stayed in. We were told by some people in Manhattan that the neighbour of Bed-Stuy used to be very dangerous and just to be careful walking around at night. Walking from the subway after dark was a little daunting but we remained safe. We did catch a cab a few times from Manhattan as it was very late. Overall, it was a positive experience with Alex and Shalia being very helpful, even going out of their way to let us store our luggage at Shalia's work the day we were to fly out. They were great hosts.",
      },
      {
        at: '2013-07-24T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb785',
          fullname: 'Barbara',
          imgUrl: 'https://robohash.org/6063814?set=set1',
          id: '6063814',
        },
        txt: 'We just met Alex when we checked in, but anyhow he had been a very friendly and helpful host. He was reachable anytime and answered my mails prompt.\r\nThe apartment was great! It was really beautiful and big. It has a perfectly equipped kitchen and there are also a few basics for breakfast and cooking. The bed is very comfortable. It is not that soundproofed as we are accustomed to (the steps from upstairs waked me every day - my son slept well, he did not hear it), but I think that is normal for american houses. But apart from this it is very quiet.\r\nThe neighbourhood is great! It is very authentic, people are friendly and helpful if required, no problems even late at night. We loved staying there!\r\nIn any case: apartment, host and neighbourhood are high recommended! If we are in New York again, we certainly return to this place!',
      },
      {
        at: '2013-07-29T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb515',
          fullname: 'Gloria',
          imgUrl: 'https://robohash.org/97251?set=set1',
          id: '97251',
        },
        txt: 'Hello! \n\nWe just spent 5 days in the big apple and we drove in to this Brooklyn location.  The host where incredibly attentive and just wonderful, the apartment spotless, hip & modern and really comfortable. \n\nDo not be intimidated by the transitioning neighborhood as we encountered that many residents are very friendly and helpful (directions) and this particular street has a real interest in making a real change hence empowering their community.\n\nThe subway is a little ways (12 to 15 min.) walk. We would use our vehicle to drive to the subway station (there are two corresponding)  and park nearby to facilitate the to and from.  If you need quick access to the subway at all hours of the day and night this may not be the place for you.\n\nThe apt. is an excellent value  for the money (as per  many  manhattan locations offer around  the same nightly  $$ rate but have to share their apt ).\n\n\n\n',
      },
      {
        at: '2013-09-07T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb079',
          fullname: 'Javier',
          imgUrl: 'https://robohash.org/7055720?set=set1',
          id: '7055720',
        },
        txt: 'We really had a wonderful time in NYC thanks to Alex’s house. It’s just as big, beautiful and clean as it seems in the pictures. Alex has an incredible apartment in the basement that makes you feel like home after being out all day knowing the big city. All the furniture and the kitchen appliances are new.\r\n\r\nThe location is perfect for visiting Brooklyn and Manhattan (only 15-20 to Brooklyn Bridge and South Manhattan or 25-30 min to Times Square in the underground).\r\n\r\nAlso, Alex gave us some good advices the first day for having all we needed in the neighbourhood. Don’t miss Saraghina’s brunch (10 minutes walking from the house)! He even let us to keep our luggage in the house until we left to the airport in the evening on our last day in the city.',
      },
      {
        at: '2013-10-09T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fabc4',
          fullname: 'Ivan',
          imgUrl: 'https://robohash.org/8866660?set=set1',
          id: '8866660',
        },
        txt: 'The appartment was really clean, pretty spacious and kitchen was very well equipped! Its totally in line with all the information posted. \r\n\r\nAlex was very nice host, even allowed us to keep the luggage  after check out as we had a flight in the evening. Thank you once again for that! \r\n\r\nThe neighboorhood itself was safe, we had no issues at all, however I`d prefer staying   in Brooklyn districts closer to Manhattan area next time as  we were travelling to Midtown up to 1h. Being a citizen of the huge city too (Moscow, Russia) , underground is not our favorite place to be  :) \r\n\r\nOverall , it was a great stay. \r\n\r\n\r\n\r\n',
      },
      {
        at: '2013-11-01T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fada2',
          fullname: 'India',
          imgUrl: 'https://robohash.org/228580?set=set1',
          id: '228580',
        },
        txt: "Communication with Alex was spot on.  He happily answered any questions and made it easy for me to arrive late at night and went above and beyond to help me have a good stay. \r\nThe apartment has been tastefully refurbished.  Extremely clean, and with all you could need for cooking.  The bed is so comfy.  The apartment is peaceful at night and I slept so well.   Some noise travels from Alex' apartment upstairs but it is only a little during the day.\r\nThe area is a bit out of the main hub of Williamsburg and Bushwick but everything is easily accessible with a short walk or the subway about 8 mins walk away.\r\nAlex left me a list of great stores, cafes and restaurants in the immediate area.  \r\nSome people may be concerned about the area at face value as it is a white minority but I felt safe at all times.  People seemed friendly.\r\n\r\n",
      },
      {
        at: '2013-11-10T05:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fb9f9',
          fullname: 'Pamela',
          imgUrl: 'https://robohash.org/8145538?set=set1',
          id: '8145538',
        },
        txt: 'Was an amazing stay, we charm your apartment and were very friendly. Thank you for all your attentions.',
      },
      {
        at: '2013-11-14T05:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fae8c',
          fullname: 'Lindsay',
          imgUrl: 'https://robohash.org/979464?set=set1',
          id: '979464',
        },
        txt: "Shaila and Alex are wonderful hosts - very accommodating, friendly, and easy to communicate with. We found it fairly easy to get around the city from Bed-Stuy, even with the weekend subway schedule. The apartment is lovely, bright, and very clean, and overall it was a pleasure to stay for a few nights. It's been recently renovated and thoughtfully decorated - we felt quite comfortable during our stay and appreciated the art and other nice touches throughout. I'd highly recommend staying with Shaila and Alex.",
      },
      {
        at: '2013-12-01T05:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbf31',
          fullname: 'Nadia',
          imgUrl: 'https://robohash.org/1133198?set=set1',
          id: '1133198',
        },
        txt: 'Great apartment, really spacious & has a lovely homely feel to it. Alex & Shaila were very helpful & welcoming, bed was really comfortable, good transport links, only a 20 min subway ride into manhattan, the area is really nice & quiet, unlike manhattan.\r\n\r\nThanks Alex & Shaila for having us ! Enjoy the Gin !! ',
      },
      {
        at: '2014-01-04T05:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbdab',
          fullname: 'Barbara',
          imgUrl: 'https://robohash.org/8310069?set=set1',
          id: '8310069',
        },
        txt: 'The apartment is spacious and well furnished, the kitchen very well equipped and the bed very confortable. Sheila and alex were friendly and the comunication with them was easy.the neighborhood is very nice with typical town house, and very quite. Also the people Who lives there was very kind and helped us on many occasion. \nDefinitely raccommend you to spend your holidays in NY in the lovely apartment of sheila&alex! ',
      },
      {
        at: '2014-03-11T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb2c1',
          fullname: 'Chris',
          imgUrl: 'https://robohash.org/9935301?set=set1',
          id: '9935301',
        },
        txt: 'We had a great time staying with Alex & Shaila. The apartment is just as depicted in the photos. Lots of space and very comfortable.  The house is located really close to buses and subway which was very convenient. The neighbourhood is fine with a couple of nice places to eat nearby.\r\n\r\nShaila and alex were really friendly and easy to communicate with if needed.  \r\n\r\nWe stayed for 2 months and would recommend it to others who are looking for a place in Brooklyn.',
      },
      {
        at: '2014-03-26T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb8fc',
          fullname: 'Melody',
          imgUrl: 'https://robohash.org/11278447?set=set1',
          id: '11278447',
        },
        txt: 'Upon arriving, Alex was very helpful giving directions to the location. , he gave us a brief overview of everything, and let us settle in. It was a very cozy place to come back to after long days out exploring New York. The subways are very close. We preferred heading up to broadway to catch our trains (Depending where we were going) only because it was much more pleasant on sunny days to be above grounds if we could. It was great to have all amenities available, and at such a reasonable price.The only thing I will mention is that if you do plan on sleeping in- it might not happen as they do have a newborn who you can sometimes hear in the morning if you are a light sleeper.\r\nOverall,  I would recommend you stay at Alex & Shailas airbnb! It was a great and pleasant environment.',
      },
      {
        at: '2014-04-10T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb41e',
          fullname: 'Carlos',
          imgUrl: 'https://robohash.org/13281573?set=set1',
          id: '13281573',
        },
        txt: 'We felt very happy those days at the home of Alex and Shaila. It is a very warm and comfortable place, it was like being at home.',
      },
      {
        at: '2014-04-21T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb087',
          fullname: 'Sergei',
          imgUrl: 'https://robohash.org/13487808?set=set1',
          id: '13487808',
        },
        txt: 'Great host. Very clean, nice place and friendly people. Thanks again!',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aaafc',
    name: 'Habitación centro de Barcelona',
    type: 'Shared homes',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436983/pivldxmrxssnhyzixhes.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436394/kscsvxyn0uro9tjhefeb.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436281/doubvhbpwjfx81yfzpxq.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436571/fvqbazrysqpymjlhhdqu.jpg',
    ],
    price: 40,
    summary:
      'Mi piso está en el centro de Barcelona. Cerca del metro, las ramblas, los museos, el Portal del Ángel, Plaza Cataluña. Mi alojamiento es bueno para turistas, aventureros, y viajeros de negocios....y tiene ascensor.',
    capacity: 2,
    amenities: [
      'Wifi',
      'Kitchen',
      'Doorman',
      'Elevator',
      'Buzzer/wireless intercom',
      'Heating',
      'Essentials',
      'Hangers',
      'Hair dryer',
      'translation missing: en.hosting_amenity_49',
      'translation missing: en.hosting_amenity_50',
    ],
    bathrooms: 1,
    bedrooms: 1,
    roomType: 'Private room',
    host: {
      _id: '622f3407e36c59e6164fbdae',
      fullname: 'Marián',
      location: 'Barcelona, Catalonia, Spain',
      about: '',
      thumbnailUrl:
        'https://a0.muscache.com/im/users/31635864/profile_pic/1429604852/original.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/users/31635864/profile_pic/1429604852/original.jpg?aki_policy=profile_x_medium',
      isSuperhost: false,
      id: '31635864',
    },
    loc: {
      country: 'Spain',
      countryCode: 'ES',
      city: 'Barcelona',
      address: 'Barcelona, Catalunya, Spain',
      lat: 2.16685,
      lan: 41.38371,
    },
    reviews: [
      {
        at: '2016-07-12T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbebb',
          fullname: 'Rafaela',
          imgUrl: 'https://robohash.org/65117711?set=set1',
          id: '65117711',
        },
        txt: "Host: Marian gave us a warm welcome and treated us kindly from the very beginning. She offered us help, told us what to visit and even put water, milk and orange juice in the fridge! We could have breakfast at her place which was perfect because she has a little sweet balcony! \r\nLocation: calmly situated in a side street, very near to the Placa Catalunya, the Rambla and the gothic area of Barcelona (very beautiful:)) so you have the old cultural center as well as all the restaurants and bars just nearby.\r\nHouse/Room: the appartment is not a huge, but I think you have everything you need (beautiful sitting room, balcony, kitchen) in it. You have to share the appartment with Marian so pay attention and don't be too loud in the evening!!\r\ndisadvantage: the heat is terrible in summer and there is no air-condition..\r\n\r\nI would overall recommend it to everybody!! But if you want to party and stay up late, take a hostel or another appartment.",
      },
      {
        at: '2016-08-11T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164faf56',
          fullname: 'Pauline',
          imgUrl: 'https://robohash.org/50303773?set=set1',
          id: '50303773',
        },
        txt: "Nous avons passé un bon séjour, l'appartement est très bien situé. La chambre est agréable et plus grande que sur la photo. Seul point négatif pas de volets dans la chambre. ",
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aaafd',
    name: 'DOUBLE ROOM IN THE HEART OF BCN',
    type: 'Amazing views',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436793/httqod38otalkzp9kynq.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436236/ctnbnqazpqhotjcauqwp.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436852/y3scgbn8d6evumdpwdp4.jpg',
    ],
    price: 25,
    summary:
      'Lit room with balcony. The apartment is in the center, just meters from the Palau de la Musica Catalana. Well connected, a few minutes from Las Ramblas and the Born. Very close to the beach and Ciutadella Park',
    capacity: 2,
    amenities: [
      'Wifi',
      'Kitchen',
      'Paid parking off premises',
      'Smoking allowed',
      'Heating',
      'Washer',
      'Essentials',
      'Shampoo',
      'Lock on bedroom door',
      'Hangers',
      'Hair dryer',
      'Iron',
      'translation missing: en.hosting_amenity_49',
      'translation missing: en.hosting_amenity_50',
      'Hot water',
      'Bed linens',
      'Host greets you',
    ],
    bathrooms: 1,
    bedrooms: 1,
    roomType: 'Private room',
    host: {
      _id: '622f3404e36c59e6164fb63a',
      fullname: 'Isabel',
      location: 'Barcelona, Catalonia, Spain',
      about:
        'Mi nombre es Isabel, pero me llamo Isa. Nací en Vigo (Galicia). Con 20 años me fuí a vivir a Madrid con intención de ser actriz; ahora resido en Barcelona desde los 28. Soy una joven de 43 años, cantante de Jazz. Me gusta salir, pero también quedarme en casa a leer o ver alguna buena película.\r\nHe compartido piso muchos años, pero estas serán mis primeras experiencias como anfitriona.\r\n\r\n¡Sed bienvenidos!\r\n',
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/72a579ce-37d7-466e-9c25-9876ee8de037.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/72a579ce-37d7-466e-9c25-9876ee8de037.jpg?aki_policy=profile_x_medium',
      isSuperhost: false,
      id: '35858044',
    },
    loc: {
      country: 'Spain',
      countryCode: 'ES',
      city: 'Barcelona',
      address: 'Barcelona, Catalonia, Spain',
      lat: 2.17561,
      lan: 41.38701,
    },
    reviews: [
      {
        at: '2016-02-24T05:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb95e',
          fullname: 'Pierre',
          imgUrl: 'https://robohash.org/58999873?set=set1',
          id: '58999873',
        },
        txt: 'Una instancia muy céntrica en uno de estos edificios antiguos del Barri Gotic. No es poco haber conseguido estar en el centro de Barcelona en la misma semana del Mobile World Congress. Isabel es un encanto de anfitrión.',
      },
      {
        at: '2016-03-24T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fafa6',
          fullname: 'Isabelle',
          imgUrl: 'https://robohash.org/26247027?set=set1',
          id: '26247027',
        },
        txt: 'The host canceled this reservation 2 days before arrival. This is an automated posting.',
      },
      {
        at: '2016-04-07T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbaf2',
          fullname: 'Hélène',
          imgUrl: 'https://robohash.org/46103953?set=set1',
          id: '46103953',
        },
        txt: "Chambre très bien située et hôtesse très sympathique. Merci encore Isabel pour l'accueil !",
      },
      {
        at: '2016-04-13T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbdc3',
          fullname: 'Daniel',
          imgUrl: 'https://robohash.org/25801559?set=set1',
          id: '25801559',
        },
        txt: "Sheets weren't clean... Shower has very low water pressure. Room is only good for sleeping. It's in a good location but that's about it. Isabel could've provided more information about what's around the house during check in... Overall just decent enough to sleep",
      },
      {
        at: '2016-04-25T04:00:00.000Z',
        by: {
          _id: '622f3401e36c59e6164fabad',
          fullname: 'Maria Isabel',
          imgUrl: 'https://robohash.org/60712702?set=set1',
          id: '60712702',
        },
        txt: "Isabel est accueillante. L'appartement est charmant, correspond aux images. Très bien situé, à côté de Palau de la musica, dans un vieil immeuble plein de charme un peu désuet. Amateurs de confort et décor \"tendance\" s'abstenir. Chez Isabel on se trouve dans une authentique ambiance d'artiste. Merci beaucoup, je garderai le souvenir de cet accueil lié aux souvenirs de Barcelone.",
      },
      {
        at: '2016-05-04T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb967',
          fullname: 'Aitana',
          imgUrl: 'https://robohash.org/53206905?set=set1',
          id: '53206905',
        },
        txt: 'Es un piso con mucho encanto, muy tranquilo y en un lugar inmejorable. La anfitriona, Isabel, es amable y facilitadora. El piso es una construcción antigua, lo que le da un ambiente genial pero también hace que el agua de la ducha salga con poquísima presión y sea un poco incómodo a veces. A parte de esto, si tuviese que poner alguna queja sería la hora del chekout, ya que las diez de la mañana me parece un poco pronto. \r\nEn conjunto tuvimos una muy buena experiencia y repetiríamos sin duda.',
      },
      {
        at: '2016-05-12T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbb88',
          fullname: 'Valentina',
          imgUrl: 'https://robohash.org/69740054?set=set1',
          id: '69740054',
        },
        txt: "Isabel was a wonderful host even if she was not there. She was in touch with me by mobile constantly. Thank you so much!\r\nThe house it's nice and was very clean and quite in the night.Perfect location. All you need for few days in Barcelona!",
      },
      {
        at: '2016-05-16T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb715',
          fullname: 'Jeremy',
          imgUrl: 'https://robohash.org/53581405?set=set1',
          id: '53581405',
        },
        txt: "Isabel's place was perfect. It was cozy, clean and quiet. She was a very gracious host and was always there to answer my questions about getting around Barcelona. ",
      },
      {
        at: '2016-05-25T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb0b2',
          fullname: 'Mei-Lin',
          imgUrl: 'https://robohash.org/40994614?set=set1',
          id: '40994614',
        },
        txt: 'Great room with lots of sunlight in a charming apartment. Fantastic location.',
      },
      {
        at: '2016-06-10T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb1f7',
          fullname: 'Taneli',
          imgUrl: 'https://robohash.org/8010736?set=set1',
          id: '8010736',
        },
        txt: 'Isa was a kind and gracious host with a lovely appartment in a centric and vibrant area. We loved our stay and surely will visit again.',
      },
      {
        at: '2016-06-16T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb623',
          fullname: 'Natasha',
          imgUrl: 'https://robohash.org/25592253?set=set1',
          id: '25592253',
        },
        txt: 'SUPER cute place with lots of charm!! Perfect for my first trip to Barcelona:) Amazing location! Gracias Isabel for helping me find last minute accommodations! \r\n',
      },
      {
        at: '2016-06-23T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fc013',
          fullname: 'Elizabeth',
          imgUrl: 'https://robohash.org/78467282?set=set1',
          id: '78467282',
        },
        txt: "Isabel was a great host. She met me at the local bar where she worked and took me to her home a street away. The flight of stairs up to here place was a bit daunting but I can see why she lives up there.. It was beautiful! The room and whole place was clean, tidy and very welcoming. I saw Isabel twice, when I arrived and when I left, but it was perfect. \n\nThe facilities were great. The pressure in the shower was weak but it didn't bother me one bit. It is a bit noisy being in the heart of the city, but I can imagine it would be anywhere in this area. It was lovely to have a balcony, and the location was very convenient. Thanks.x",
      },
      {
        at: '2016-06-28T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb0af',
          fullname: 'Monika',
          imgUrl: 'https://robohash.org/11966400?set=set1',
          id: '11966400',
        },
        txt: 'Isabel was good host. Location is perfect.',
      },
      {
        at: '2016-07-03T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb23a',
          fullname: 'Margaux',
          imgUrl: 'https://robohash.org/78589438?set=set1',
          id: '78589438',
        },
        txt: 'Super piso, super barrio! \r\nThe guest welcomed us well.',
      },
      {
        at: '2016-07-11T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb21c',
          fullname: 'Elisabeth',
          imgUrl: 'https://robohash.org/4965921?set=set1',
          id: '4965921',
        },
        txt: 'It was really nice to stay at Isabels place. She is very uncomplicated and nice and the flat is super located for exploring bcn. For me it was perfect!:)',
      },
      {
        at: '2016-07-23T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbd7f',
          fullname: 'Ingrid',
          imgUrl: 'https://robohash.org/6058273?set=set1',
          id: '6058273',
        },
        txt: "IT was the perfect stay to Discover the city-a super location with sometimes noisy tourists (even we we're tourists but hopefully not so noisy) but that's part of the location i guess :-). We loved the colourful house and we Will Be go back for a next stay. thank you!",
      },
      {
        at: '2016-07-30T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb1ac',
          fullname: 'Liliane',
          imgUrl: 'https://robohash.org/27060110?set=set1',
          id: '27060110',
        },
        txt: "Isa is a very lovely, sensitive, artistic and gorgeous person. She is respectful of one's privacy but always ready to give support when asked upon. Be it in spoken or written form I always got my answers from her within no times. She also proofed to be very flexible in terms of arrival and departure times which I appreciated a great deal. If you are a fan of jazz music (like I am), make sure to double check ahead of time about her current concert dates so as not to miss your hostess on stage like I did (grumble ;-)).\n\nThe room I occupied was the smaller one of two that Isabel rents out. So if her flat is fully rented out there can be a maximum of 4 guests plus your hostess in the flat, which can cause some bathroom jam, especially during the hot and humid summer times, when the need for a cool shower is inherent to everyone's desire. \nMy room was as depicted. If you plan on using it for double occupancy, I recommend taking Isa's larger room (unless the two of you are very much in love and want to cuddle up close ;-)). Also, if you need a table for writing, ask for the larger room as well, which comes along with one.\nThe flat itself is absolutely enchanting and furnished with love and an artistic eye to details. It's location is a dream for touristic explorations with anything within walking distance. \nTherefore, I can easily recommend both Isabel and her flat to anyone wishing to immerge himself into the local customs and get a good doze of what it is like \"to live like a true Barcelonian\".  \n\nQuerida Isa, muchas gracias por tu hospedalid génial! Volveré a ciencia cierta!\nSaludos y besos\nLiliana",
      },
      {
        at: '2016-08-10T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb8e1',
          fullname: 'Murat',
          imgUrl: 'https://robohash.org/35246459?set=set1',
          id: '35246459',
        },
        txt: "The apartment is very centrally located, in the heart of the gothic part of the city and a couple of blocks from the Placa de Catalunya which makes transportation and sightseeing very easy. It's a 20 minute walk from the beach which is a plus. It's located in a very old building on the top floor, so it is rather stuffy and warm in the apartment. The room overlooks a very narrow street/alley so it's rather dark and it's easy to hear the noise coming from the street and the neighboring apartments. There are a few other rooms in the house that are being rented out, so other people will be staying in the house which makes it a necessity to lock the room when you leave the apartment. \n\nIt's important to note that this place has a very strict check out time. On our last day, we had an evening flight but had to check out in the morning. When we asked if we could check out late, Isa told us to take our stuff to the train station and use the lockers there, but the train station does not have lockers. We ended up renting a locker  at a place called \"Barcelona lockers\". That, I would say changed all the plans for the last day. \n\n",
      },
      {
        at: '2016-08-26T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbcb4',
          fullname: 'Mina',
          imgUrl: 'https://robohash.org/121053?set=set1',
          id: '121053',
        },
        txt: "I was happy to experience Isabels home as described here. It was spacious, bright and original, with lovely colours and beautiful artwork surrounding me in every room. Isabel is a creative, sensitive and respectful person, with an open mind- yet she has the necessary boundaries that are required to organize an environment where so many different people are going to stay and hopefully enjoy. \nThe street itself is very lively, but the noises didn't bother me at all as i could easily block them out with earplugs. The location could not have been more sentral, still it's on \"the right side\" of the Rambla, where you can find more independent shops, restaurants, cafes and bars compared to the same leveled streets towards Raval. It is an old and very charming building, so if you want an minimalistic experience with cold, stainless steel and elevators this is not the place for you! And perhaps you are not the right person for this place either ;) I had to leave earlier due to illness, and was so sorry i couldn't stay throughout the whole month as planned. Hope to be seeing Isabel and her welcoming surroundings again one day ",
      },
      {
        at: '2016-09-07T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb85f',
          fullname: 'Jessy',
          imgUrl: 'https://robohash.org/2935800?set=set1',
          id: '2935800',
        },
        txt: 'Isabel was an amazing host. She is incredible and super considerate. The apartment was by no means the best location in Barcelona, I walked everywhere and never needed a map or a taxi. Arriving late at night was always fine and there was never any disturbing street noise. The block is super cute with awesome little shops that are open during the day. Best neighborhood to be in and incredible city ! Muchísima gracias Isabel, estas invitada a visitar Los Ángeles, todo fue increíble !❤️',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aaafe',
    name: 'Home, Sweet, Harlem. Welcome!',
    type: 'Beach',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436390/om97cgufeacwlric2r5w.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436827/znh7gqzbwb4wm6bdziy7.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436334/nqgdwv3ljfkrbvynoetv.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436376/phpltehcr6uq9lh5jlax.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg',
    ],
    price: 110,
    summary:
      'Welcome! Upgrades Added as of January 2018 This listing is located in the Spanish Harlem Section of Manhattan. I offer a cozy apartment that has great transportation in and out the city! The area has a lot of ethnic restaurants and a lot of local, active residents. This residence is great for a quick, inexpensive stay in New York whether its for business, travel, or personal purposes. I am glad to welcome all guests!',
    capacity: 3,
    amenities: [
      'TV',
      'Wifi',
      'Air conditioning',
      'Kitchen',
      'Free street parking',
      'Heating',
      'Smoke detector',
      'Carbon monoxide detector',
      'Essentials',
      'Shampoo',
      'Lock on bedroom door',
      'Hangers',
      'Iron',
      'Laptop friendly workspace',
      'translation missing: en.hosting_amenity_49',
      'translation missing: en.hosting_amenity_50',
      'Private living room',
      'Hot water',
      'Bed linens',
      'Extra pillows and blankets',
      'Refrigerator',
      'Dishes and silverware',
      'Cooking basics',
      'Oven',
      'Stove',
      'Host greets you',
    ],
    bathrooms: 1,
    bedrooms: 1,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3405e36c59e6164fb914',
      fullname: 'Kevin',
      location: 'New York, New York, United States',
      about:
        'Welcome Everyone! Thank you for stopping by. \r\n\r\nI was born and raised in Manhattan and I am here to help  share the New York City Experience with others through Airbnb!  I am easy to connect with and very reachable and always willing to interact with people. \r\n\r\nI am big on cleanliness and hospitality. I strive on making Guests feel as comfortable as possible. \r\n\r\nI hope you would like to get a chance to visit my location and enjoy the hosting I provide. If you have any questions/ comments, feel free to contact me. \r\n',
      responseTime: 'within a few hours',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/61b62b90-e38b-4609-a3c4-ff5ff06b5c08.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/61b62b90-e38b-4609-a3c4-ff5ff06b5c08.jpg?aki_policy=profile_x_medium',
      isSuperhost: false,
      id: '24800102',
    },
    loc: {
      country: 'United States',
      countryCode: 'US',
      city: 'New York',
      address: 'New York, NY, United States',
      lat: -73.93955,
      lan: 40.79733,
    },
    reviews: [
      {
        at: '2016-03-26T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb8b4',
          fullname: 'Christine',
          imgUrl: 'https://robohash.org/47877926?set=set1',
          id: '47877926',
        },
        txt: "Kevin was very welcoming and thorough with all information. The description of the property was accurate. It's also near the MTA if you want to get to another part of the city. Kevin got in touch before I arrived, and his brother was there to meet me and show me where everything was, which was great. Last but not least, he had provided a great information on the local area with recommendations for places to eat, etc., which I found really useful.\r\n",
      },
      {
        at: '2016-04-17T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbdb9',
          fullname: 'Hector',
          imgUrl: 'https://robohash.org/36832696?set=set1',
          id: '36832696',
        },
        txt: "Kevin was nice. And he was very responsive via text, which I appreciate. The listing is in East Harlem, which isn't for everyone. The area is not very posh, but, for me, it feels like home, so I tend to stay there whenever I go to New York. The listing description was accurate enough, with respect to the way the apartment looks. If you can't deal with noise at night, however, this might not be the place for you. The neighbors were surprisingly noisy in the wee hours of the night and virtually silent during the day. This apartment is close to the subway, which was very useful.",
      },
      {
        at: '2016-04-23T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbdca',
          fullname: 'Jaime',
          imgUrl: 'https://robohash.org/37244180?set=set1',
          id: '37244180',
        },
        txt: 'Kevin was very helpful and communicative during the whole time. The apartment is very nice, and within walking distance to the subway. Would definitely stay there again.',
      },
      {
        at: '2016-04-24T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fae69',
          fullname: 'Anan',
          imgUrl: 'https://robohash.org/30380132?set=set1',
          id: '30380132',
        },
        txt: "I had a wonderful stay at Kevin's apartment. The apartment is very close to the six train line. Everything in the apartment was spotless clean. I definitely recommend this apartment to others. Thank you Kevin for hosting me!",
      },
      {
        at: '2016-05-04T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbf23',
          fullname: 'Yamilis',
          imgUrl: 'https://robohash.org/5684819?set=set1',
          id: '5684819',
        },
        txt: 'Kevin fue excelente anfitrión. Se mantuvo en contacto con nosotros y fue muy comprensivo aún cuando llegamos más tarde de la hora acordada para el check in porque nos perdimos en el subway. También fue muy comprensivo para acordar el check out de acuerdo a la hora que fue más conveniente para nosotros, aún cuando también se nos hizo tarde. Nos proveyó de un matress de aire para nuestra amiga que vino de M.A. y se quedó una noche con nosotros. El barrio nos pareció bien, no tuvimos ningún incidente. Muchos puertoriqueños y Dominicanos, así que nos sentimos como en casa. Todo fue muy cómodo y limpio. Los vecinos hicieron mucho ruido en las noches, pero no fue problema para nosotros. Una sugerencia sería poner un espejo de cuerpo completo en alguna parte del apartento. En resumen, el apartamento fue perfecto para nosotros, nos volveríamos a quedar y claro que lo recomendaría! Muchas Gracias Kevin por tu ayuda!',
      },
      {
        at: '2016-05-08T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb6a4',
          fullname: 'Leonam',
          imgUrl: 'https://robohash.org/44604680?set=set1',
          id: '44604680',
        },
        txt: 'Kevin was really thoughtful about everything. He gave me all information needed while staying on his house. The house was very clean.',
      },
      {
        at: '2016-05-11T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fc063',
          fullname: 'Amy',
          imgUrl: 'https://robohash.org/4923470?set=set1',
          id: '4923470',
        },
        txt: "Kevin is a really nice host, flexible and very responsive. The apartment is a 4th-floor walk up, well-maintained and exactly as advertised in the listing. The apartment has all the basic things--it's especially nice to have a kitchen and comfy sofa. There's no TV and wifi, but you probably don't need it anyway since you are here to see New York city! It is just a short 5-min walk from the subway station, so very convenient. Street noise is not a problem although you can hear the neighbors at times (the kids next door can be noisy). East Harlem is a bustling Latino neighborhood with many local eateries and shops. The food selection is supposed to be great (too bad we didn't get to try any). There is a grocery store right outside the building. There're always locals hanging out in front but we were never bothered. All and all, a good choice if you are looking to stay in this part of the city.",
      },
      {
        at: '2016-05-17T04:00:00.000Z',
        by: {
          _id: '622f3401e36c59e6164fab7d',
          fullname: 'Vlad',
          imgUrl: 'https://robohash.org/61270769?set=set1',
          id: '61270769',
        },
        txt: 'Kevin was an excellent host. Everything was absolutely as described. The apartment is lovely and very clean. There are numerous windows in every room and there is plenty of light! Would definitely stay again!',
      },
      {
        at: '2016-05-19T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbe7b',
          fullname: 'Derick',
          imgUrl: 'https://robohash.org/63351088?set=set1',
          id: '63351088',
        },
        txt: 'Great experience, we enjoyed ourselves for the night we stayed, only issue really were the neighbors being loud all night made it hard to sleep.',
      },
      {
        at: '2016-05-21T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbefb',
          fullname: 'Derek',
          imgUrl: 'https://robohash.org/794527?set=set1',
          id: '794527',
        },
        txt: "Kevin's place is exactly as other reviewers describe it:  nice and clean, spacious and very convenient as a base to explore and enjoy NYC. \r\n\r\nThe Neighborhood is definitely classic East Harlem.  Very real NYC vibe. Not a tourist area.  \r\n\r\nThe neighbors are noisy sometimes, so if you are a light sleeper, that could be a problem. But I didn't have any trouble. \r\n\r\nIt would have been nice to have wireless, but I didn't come to NYC to play online, so I didn't mind that too much.  \r\n\r\nKevin was a very nice, responsive host! ",
      },
      {
        at: '2016-05-22T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb484',
          fullname: 'Shiann',
          imgUrl: 'https://robohash.org/26290842?set=set1',
          id: '26290842',
        },
        txt: 'Kevin made my friend and I feel really welcomed. The apartment was very clean!',
      },
      {
        at: '2016-05-26T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb208',
          fullname: 'Stephanie',
          imgUrl: 'https://robohash.org/73751485?set=set1',
          id: '73751485',
        },
        txt: 'Me and my husband stayed in the apartment this was our first time using this site and Kevin made us feel like we are regulars. We stayed one night and it was wonderful. Kevin contacted us right away and was really good with getting us whatever we need to stay there. The area is the only bad thing but when we went in the apartment you really forget about the outside.',
      },
      {
        at: '2016-05-29T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb52c',
          fullname: 'Virginie',
          imgUrl: 'https://robohash.org/8842288?set=set1',
          id: '8842288',
        },
        txt: 'Kevin is easy to get in touch with and waited for us to arrive Even if it was already late in the evening. He even asked if everything was fine during our stay.\nThe appartment is perfectly situated to visit Manhattan island. Just note the neighbours are noisy if it is important to you.',
      },
      {
        at: '2016-06-06T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb803',
          fullname: 'Ada',
          imgUrl: 'https://robohash.org/65358522?set=set1',
          id: '65358522',
        },
        txt: "Kevin was absolutely wonderful. He was very responsive and communicative and I could tell he takes great pride in being an exceptional host. His place was exactly as described, as shown in the pictures and also very clean. The neighborhood is great and the room is a great price for someone looking to stay in the city and explore. It's right next to the trains, neighborhood gems but also commonly known stores for anyone who isn't familiar with the area. ",
      },
      {
        at: '2016-06-11T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbc21',
          fullname: 'Fernando',
          imgUrl: 'https://robohash.org/75294316?set=set1',
          id: '75294316',
        },
        txt: 'everything was correct , very good condition to this price',
      },
      {
        at: '2016-06-14T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbdfe',
          fullname: 'Francesca',
          imgUrl: 'https://robohash.org/56355386?set=set1',
          id: '56355386',
        },
        txt: 'This is my first time using Airbnb. Kevin responded quickly to my inquiry about booking his apartment. Once booked he was very easy to reach via phone or text if I needed to. His one bedroom apartment was very clean and nicely furnished. It is central to a lot of restaurants and neighborhood shopping should you need something and a couple blocks from the subway and buses. Kevin was a great host. He was there to greet me, show me around the apartment and tell me a bit about the area. He also has maps and booklets about what to visit while in New York City. There is wifi in the apartment which is great. Kevin checked in with me just to make sure everything was ok during my trip. I had a wonderful stay at his apartment and would book it again! ',
      },
      {
        at: '2016-06-20T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb4de',
          fullname: 'Alex',
          imgUrl: 'https://robohash.org/45975680?set=set1',
          id: '45975680',
        },
        txt: "Kevin was a phenomenal host, he was very accommodating about arrival and check out times and provided me with a ton of useful information to navigate the area and make my stay as pleasant as possible. The apartment is two blocks from the subway and easy to navigate from. I would definitely recommend staying at Kevin's for all those considering a trip to New York.",
      },
      {
        at: '2016-06-24T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbd08',
          fullname: 'Johanna',
          imgUrl: 'https://robohash.org/75777207?set=set1',
          id: '75777207',
        },
        txt: 'The apartment is as described. Kevin is very pleasant and was kind to helped me bring my belongings to the apartment. The apartment is cozy in a great location. I will definitely be using this apartment again',
      },
      {
        at: '2016-07-03T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb7a6',
          fullname: 'Bandele',
          imgUrl: 'https://robohash.org/5357325?set=set1',
          id: '5357325',
        },
        txt: "Kevin's a great guy, but if you're looking for a hotel-like experience, this is NOT it... This however, IS a genuine NYC experience. Noisy & inconsiderate neighbors, dirty streets, dangerous vibes... All in all your safe, and anyone you actually talk to will be cool... Kevin was also very considerate and did everything he could to add comfort to my stay, he even warned me of the noisy neighbors in advance... This place is good for people who already know NYC, and need an affordable, SHORT-TERM (like 1-2days), place to crash uptown...",
      },
      {
        at: '2016-07-13T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb80a',
          fullname: 'Bryan',
          imgUrl: 'https://robohash.org/73430217?set=set1',
          id: '73430217',
        },
        txt: 'This place was cozy, comfortable and very clean. The AC was very helpful during the heat waves. Good shower and great WiFi connection as well.',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aaaff',
    name: 'Heroísmo IV',
    type: 'Castles',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436823/af6elioxovkhvp6cg1un.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437327/epcnh2tzpafwmvi3srcp.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437310/tus71yfpnvgulenrli6a.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436453/ndl8odasqgnyquvsbalp.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg',
    ],
    price: 29,
    summary:
      'If the dates you wish are not available, we have other options in the same location. You can find them on my profile. My goal is for you to have your days with the most comfort i can propose. I want you to taste all the feelings in Porto, as our food, as our best places, our best pointviews. I just love to help you enjoying this beautiful city :)',
    capacity: 2,
    amenities: [
      'TV',
      'Cable TV',
      'Internet',
      'Wifi',
      'Kitchen',
      'Free street parking',
      'Heating',
      'First aid kit',
      'Safety card',
      'Fire extinguisher',
      'Essentials',
      'Shampoo',
      '24-hour check-in',
      'Hangers',
      'Hair dryer',
      'translation missing: en.hosting_amenity_49',
      'translation missing: en.hosting_amenity_50',
      'Room-darkening shades',
      'Hot water',
      'Bed linens',
      'Extra pillows and blankets',
      'Microwave',
      'Refrigerator',
      'Dishes and silverware',
      'Cooking basics',
      'Stove',
      'Single level home',
      'Long term stays allowed',
      'Host greets you',
      'Handheld shower head',
    ],
    bathrooms: 1,
    bedrooms: 0,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3401e36c59e6164fab5c',
      fullname: 'Apartments2Enjoy',
      location: 'Porto, Porto District, Portugal',
      about:
        "Welcome!\r\nThe apartments has all the things to provide you a perfect days in Porto. It is located in a very central area, inside a typical oporto building. \r\nI will give you lots of informations about Porto, my personal tips, and I'll always be available to help you with anything. All I want is for you to go home knowing Porto and inevitably loving the city! :)\r\n\r\n",
      responseTime: 'within a day',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/f3e85f0c-e28d-4698-9da9-2f203aea1f3d.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/f3e85f0c-e28d-4698-9da9-2f203aea1f3d.jpg?aki_policy=profile_x_medium',
      isSuperhost: true,
      id: '9320470',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Porto',
      address: 'Porto, Porto, Portugal',
      lat: -8.59275,
      lan: 41.1462,
    },
    reviews: [
      {
        at: '2016-02-06T05:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb449',
          fullname: 'Tejovra',
          imgUrl: 'https://robohash.org/41111599?set=set1',
          id: '41111599',
        },
        txt: 'Nuno and Francisca were extremely kind and helpful people. They made us feel very welcome and the house is surprisingly spacious. The wifi connection did struggle in our room but maybe we just had bad luck. They were even kind enough to extend our stay last minute. The service was top quality and the shower was amazing. Highly recommend staying here.',
      },
      {
        at: '2016-02-21T05:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fafcc',
          fullname: 'Sara',
          imgUrl: 'https://robohash.org/52749020?set=set1',
          id: '52749020',
        },
        txt: 'Muito simpáticos e atenciosos. O apartamento é muito confortável e com pequenos detalhes que fazem a diferença. Muito perto do metro, o que é óptimo para deslocações necessárias.',
      },
      {
        at: '2016-03-06T05:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164faf68',
          fullname: 'Jennifer',
          imgUrl: 'https://robohash.org/55700681?set=set1',
          id: '55700681',
        },
        txt: "Bonjour, Notre séjour a été très agréable. Nous avons été très bien accueillies. Nuno nous a donné de nombreux conseils, lieux de visites... Le logement était également très bien. Nous avons vraiment pu profiter de Porto. Le métro est tout proche du logement. C'était vraiment un très bon séjour. Merci encore. ",
      },
      {
        at: '2016-03-22T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb5b1',
          fullname: 'Irune',
          imgUrl: 'https://robohash.org/13478831?set=set1',
          id: '13478831',
        },
        txt: "Our stay at Heroísmo IV was the perfect Airbnb experience. When we got there, Francisca was waiting for us. She was extremely nice and accommodating, she showed us the apartment and gave us a map of the city and plenty of tips about what to visit, where to eat, etc. The apartment is really small but has absolutely everything you need. It's clean, new, has a really nice kitchen, a very comfortable bed and is near the city center (we walked everyday). I highly recommend staying at Nuno's place. ¡Gracias por todo, Francisca! Porto is a beautiful city, we hope to come back soon!",
      },
      {
        at: '2016-04-30T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb0c1',
          fullname: 'Marlene',
          imgUrl: 'https://robohash.org/61125497?set=set1',
          id: '61125497',
        },
        txt: 'A nice litte appartement. We arrived very late but were kindly greeted by the host. She showed us arround and gave us very useful tips (where to go/ where to eat/ etc.). The appartement is located directly to a metro station and has a Lidl and other grocery stores very near by.  It was a perfect stay!',
      },
      {
        at: '2016-05-11T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fae67',
          fullname: 'Елизавета',
          imgUrl: 'https://robohash.org/20996941?set=set1',
          id: '20996941',
        },
        txt: 'Квартира не большая и очень уютная. В ней есть все необходимое. Отличное расположение рядом с метро. Я получила много полезной информации при заселении. Во время сильного дождя в ней сыро, но это не испортило отдых.',
      },
      {
        at: '2016-08-05T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb3e7',
          fullname: 'Teresa',
          imgUrl: 'https://robohash.org/5868654?set=set1',
          id: '5868654',
        },
        txt: 'Desde o primeiro contacto, a comunicação foi muito fácil e clara. Colocaram à nossa disposição uma série de hipóteses de transporte a partir do aeroporto, bem como a possibilidade de termos em casa cabazes de alimentos. Assim que chegamos, com toda a sua simpatia, tinhamos a Mariana à nossa espera, recebeu-nos explicando os vários  pontos importantes para quem chega: locais a visitar, restaurantes, transportes...\r\nGostámos muito do espaço, do Porto, fazemos questão de voltar em breve. Local excelente!',
      },
      {
        at: '2016-08-11T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbf5b',
          fullname: 'Joyce',
          imgUrl: 'https://robohash.org/39810791?set=set1',
          id: '39810791',
        },
        txt: 'Francisca was very friendly and was waiting for us, she took the time to explain us everything about the flat, she even let us good adresses of restaurants, coffees and places to visit in Porto.\r\nThe flat is 10 minutes by foot from the center, with no stairs to climb, good for our heavy luggages! It is very calm and we even had a table outside where we took our breakfasts. The flat is tiny but very functional, clean, and well equipped.\r\nIt is perfect for a short time in Porto.',
      },
      {
        at: '2016-08-27T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbaad',
          fullname: 'Jess',
          imgUrl: 'https://robohash.org/35186577?set=set1',
          id: '35186577',
        },
        txt: 'The apartment is great value for money and the location is fantastic. We arrived before the check in time but were greeted promptly and could leave our luggage to explore the city straight away. Francisca gave us a lot of good advice and recommendations for the city, which was very helpful. ',
      },
      {
        at: '2016-09-27T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164faeed',
          fullname: 'Jennifer',
          imgUrl: 'https://robohash.org/34970659?set=set1',
          id: '34970659',
        },
        txt: 'Thank you for hosting us Nuno. Our trip was perfect. The host was very kind. And the apartment is beautiful, near the center and is well think : it has everything for a few days.',
      },
      {
        at: '2016-12-11T05:00:00.000Z',
        by: {
          _id: '622f3401e36c59e6164fab65',
          fullname: 'Joana',
          imgUrl: 'https://robohash.org/60496781?set=set1',
          id: '60496781',
        },
        txt: 'Estúdio muito simpático e limpo. Ideal para uma ou duas pessoas, para explorar o Porto durante um par de dias. Estação de metro à porta. Perto da zona histórica do Porto — faz-se bem a pé. Pastelaria ideal para pequeno almoço mesmo à porta.',
      },
      {
        at: '2017-01-01T05:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb749',
          fullname: 'Nicolas',
          imgUrl: 'https://robohash.org/106998486?set=set1',
          id: '106998486',
        },
        txt: "L'emplacement est parfait, dans un quartier calme et à proximité immédiate du métro et du centre-ville. Seul bémol: l'absence d'eau chaude à la douche (un seul ballon d'eau chaude disponible pour plusieurs appartements), franchement regrettable en plein coeur de l'hiver. Ce qui du coup entraîne un rapport qualité-prix un peu cher",
      },
      {
        at: '2017-03-17T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb10c',
          fullname: 'Marina',
          imgUrl: 'https://robohash.org/115887917?set=set1',
          id: '115887917',
        },
        txt: 'El apartamento esta genial, es pequeño pero tiene todo lo necesario, cama super grande y cómoda, el apartamento está en general como nuevo y se ve exactamente como las fotos, estaba todo suuuuper limpio y tienen un radiador que calienta el habitáculo en muy poco tiempo. Nos recibió Rita, y de maravilla, nos dio un montón de información sobre Porto en un momento y nos dejó un montón de mapas e info útil. la zona es tranquila y tiene un montos de aparcamiento seguro en la misma calle. Aun que no está en el mismo centro de la ciudad se llega a el en un paseo de poco más de 10 mins, además en la misma puerta hay una parada de metro. Ha sido una experiencia genial quedarnos aquí para visitar la ciudad. Muchas gracias por la amabilidad, si volvemos a la ciudad no dudaríamos en volver a quedarnos aquí.',
      },
      {
        at: '2017-04-13T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fad5b',
          fullname: 'Diogo',
          imgUrl: 'https://robohash.org/122269906?set=set1',
          id: '122269906',
        },
        txt: 'Gostamos muito do espaco, pequeno mas muito agradavel. Excelente para passar apenas uns dias. Obrigada ao Nuno que esperou por nos ate tarde e que ainda tirou um tempinho para nos explicar e dar umas dicas sobre a cidade! Aconselho!',
      },
      {
        at: '2017-06-02T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb79e',
          fullname: 'Anastasia',
          imgUrl: 'https://robohash.org/9456078?set=set1',
          id: '9456078',
        },
        txt: 'Небольшая, но очень уютная квартирка со всем необходимым! Завтракать на свежем воздухе очень приятно, в кухне можно приготовить все, что захочешь! Очень гостеприимная хозяйка, рассказала много интересного о местах поблизости и в городе!',
      },
      {
        at: '2017-06-18T04:00:00.000Z',
        by: {
          _id: '622f3401e36c59e6164fab70',
          fullname: 'Raphael',
          imgUrl: 'https://robohash.org/32418543?set=set1',
          id: '32418543',
        },
        txt: 'Excelente Studio, muito bem localizado e com todas as comodidades necessárias para uma pequena estadia.',
      },
      {
        at: '2017-06-30T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbc99',
          fullname: 'Judith',
          imgUrl: 'https://robohash.org/47537690?set=set1',
          id: '47537690',
        },
        txt: 'The flat is situated right next to a metro station. Also perfect, if you arrive by car - free parking just in front. 15 mins walk to downtown but lot of cheap cafes and restaurants full of locals around.\nThe check-in was perfect. We got lots of information, what to do/see/where to eat. Thanks for that. \nThe Apartement is very small but for a short city visit, big enough. If you stay for a week or so, I would recommend a larger Apartement.  ',
      },
      {
        at: '2017-07-11T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb694',
          fullname: 'Marta',
          imgUrl: 'https://robohash.org/20010340?set=set1',
          id: '20010340',
        },
        txt: 'Fantástica estancia en Oporto. Apartamento pequeño pero suficiente para pasar unos días en  Oporto una pareja. Situado un poco a las afueras pero muy buena comunicación  con el centro (parada de metro y autobús enfrente del apartamento).\nAtención inmejorable del anfitrión, respondiendo muy rápido a nuestras consultas y gestionando nuestra llegada. El único fallo es que la lavadora no se podía utilizar. Muy recomendable para pasar unos días en Oporto relación calidad-precio.\n',
      },
      {
        at: '2017-07-30T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fadc4',
          fullname: 'Aron',
          imgUrl: 'https://robohash.org/31601157?set=set1',
          id: '31601157',
        },
        txt: "We had a very nice welcome where we received tips about the neighbourhood. Those we tried turned out excellent. It's a 15 to 20 minute walk to the centre, the room is small but it has everything you need and is well maintained. Very close to the subway, a small outdoor area where you can sit. \nTip: sandwiches (pork with cheese) from casa guedes",
      },
      {
        at: '2017-11-15T05:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fba79',
          fullname: 'Márcio',
          imgUrl: 'https://robohash.org/50134628?set=set1',
          id: '50134628',
        },
        txt: 'Excelente relação preço qualidade, muito boa comodidade e excelentes acessos. Muitas opções para as refeições por perto e metro à porta. Recomendo.',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aab00',
    name: 'Monte dos Burgos - Cosy Room',
    type: 'Campers',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436329/cvylwkta0uannbxm3zns.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437168/vbmfmdmwrxt7xfwbsw7c.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436821/b4ejulqdhsvyseyfnfr0.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436553/hbkx9lwxjd0wabqk0bmo.jpg',
    ],
    price: 26,
    summary:
      'The neighbourhood is a quiet, family residential area, 20 minutes by bus from the historic center of Porto and 20 minutes from the beach (Matosinhos - where you may eat very GOOD fish!). You will love to stay in a very spacious, familiar and bright room, where you can enjoy a large and flowery garden, comfortable kitchen and laundry with washer and dryer machine. My space is good for couples, solo adventures, and business travelers!',
    capacity: 2,
    amenities: [
      'Wifi',
      'Kitchen',
      'Free parking on premises',
      'Pets live on this property',
      'Cat(s)',
      'Washer',
      'Dryer',
      'First aid kit',
      'Fire extinguisher',
      'Essentials',
      'Shampoo',
      'Lock on bedroom door',
      'Hangers',
      'Hair dryer',
      'Iron',
      'Laptop friendly workspace',
      'translation missing: en.hosting_amenity_49',
      'translation missing: en.hosting_amenity_50',
    ],
    bathrooms: 1,
    bedrooms: 1,
    roomType: 'Private room',
    host: {
      _id: '622f3404e36c59e6164fb54f',
      fullname: 'Patrícia Sousa Casimiro',
      location: 'Senhora da Hora, Porto, Portugal',
      about: '',
      responseTime: 'a few days or more',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/87b9ccba-154a-4546-8cbe-8bdb25ddb36c.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/87b9ccba-154a-4546-8cbe-8bdb25ddb36c.jpg?aki_policy=profile_x_medium',
      isSuperhost: false,
      id: '80558077',
    },
    loc: {
      country: 'Portugal',
      countryCode: 'PT',
      city: 'Porto',
      address: 'Porto, Porto District, Portugal',
      lat: -8.63082,
      lan: 41.18075,
    },
    reviews: [
      {
        at: '2016-08-11T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fad68',
          fullname: 'Celeste',
          imgUrl: 'https://robohash.org/38181630?set=set1',
          id: '38181630',
        },
        txt: 'We had a very nice stay in the house and felt at home. The room is big and light, we had a private bathroom, could use the kitchen and the nice garden. Patricia picked us up at the station of the metro, the bus is near. Patricia and Chris are very open and welcoming people, we talked about Portugal, Fado, Porto ... Also, they gave us several tips to see in Porto. When we are in Porto again we will come back!! We really recommand to stay here. Thanks Patricia and Casimiro!',
      },
      {
        at: '2016-08-14T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fadf0',
          fullname: 'Martin',
          imgUrl: 'https://robohash.org/32511082?set=set1',
          id: '32511082',
        },
        txt: 'Patricia and Chris has been wonderful hosts. They help us very much with all questions we had. We enjoyed our stay very much.',
      },
      {
        at: '2016-08-15T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164faedf',
          fullname: 'Sandra',
          imgUrl: 'https://robohash.org/66617047?set=set1',
          id: '66617047',
        },
        txt: 'Une chambre très spacieuse et une salle de bain privée : au top ! \r\nChristian et Patricia ont été très accueillants et nous nous sommes tout de suite sentis comme chez nous ! ',
      },
      {
        at: '2016-08-20T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb3ed',
          fullname: 'Erika',
          imgUrl: 'https://robohash.org/78636529?set=set1',
          id: '78636529',
        },
        txt: "Des hôtes très accueillant et à l'écoute de leurs invités! De supers adresses à conseiller. \r\nUne maison décorée avec goût et avec une sublime salle de bain privée.\r\nLe centre est très facile d'accès en bus car inaccessible en voiture. \r\nTrès facile de se garer dans la rue de nos hôtes.\r\nUn excellent rapport qualité prix!",
      },
      {
        at: '2016-08-22T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb9bd',
          fullname: 'Guy',
          imgUrl: 'https://robohash.org/88496638?set=set1',
          id: '88496638',
        },
        txt: 'Patricia et Casimir ont été très accueillants et nous ont donné toutes les informations pratiques pour se rendre au centre de Porto en bus. La chambre est spacieuse et la salle de bain privée est juste à coté. Le quartier est très calme et le séjour était très agréable.',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aab01',
    name: 'Nice Cosy Room In Taksim',
    type: 'Islands',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437241/wt0seud4ot4cmdrztdzz.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436460/qi3vkpts37b4k0dedosc.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436261/hwqt72njlhf9hkqou9ka.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437040/oarfkdxx7gyyvcynvwko.jpg',
    ],
    price: 105,
    summary:
      'Welcome if you want to stay at a cozy flat with local experience.:) It is in the center of Istanbul.The neighborhood is safe and close to attractions.Transportation is easy. I will help you always.',
    capacity: 2,
    amenities: [
      'TV',
      'Cable TV',
      'Internet',
      'Wifi',
      'Air conditioning',
      'Kitchen',
      'Heating',
      'Washer',
      'Essentials',
      'Shampoo',
    ],
    bathrooms: 1,
    bedrooms: 1,
    roomType: 'Private room',
    host: {
      _id: '622f3402e36c59e6164fae4d',
      fullname: 'Nihat',
      location: 'Istanbul',
      about:
        'I live alone in Taksim area and i work at bar.\r\nI like meet new friends from all of the world.\r\nI like to Travel a lot ofcourse if i have free time :) East Asia , Sun , Sea , Sand , Movie  :) ',
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/user/6bf03261-e7ac-4e0e-8121-3828612bbb6a.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/user/6bf03261-e7ac-4e0e-8121-3828612bbb6a.jpg?aki_policy=profile_x_medium',
      isSuperhost: true,
      id: '5823933',
    },
    loc: {
      country: 'Turkey',
      countryCode: 'TR',
      city: 'Istanbul',
      address: 'Taksim, Cihangir, Istanbul , Beyoğlu, Turkey',
      lat: 28.98648,
      lan: 41.03376,
    },
    reviews: [
      {
        at: '2014-04-06T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbcc7',
          fullname: 'Quentin',
          imgUrl: 'https://robohash.org/12424603?set=set1',
          id: '12424603',
        },
        txt: 'I greatly appreciated both the location of the place (very central) and the appartment per se (clean and comfortable, with a very cosy room and with Wi-Fi). \r\n\r\nNihat was perfect host, quite welcoming and helpful about places to go (or avoid) and things to do in town. \r\n\r\nHosça kal!\r\n\r\n\r\n',
      },
      {
        at: '2015-04-02T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb7f6',
          fullname: 'Steve',
          imgUrl: 'https://robohash.org/10300292?set=set1',
          id: '10300292',
        },
        txt: 'Nice room in a flat well located. Nihat is very nce and helpful. Good experience.',
      },
      {
        at: '2015-05-19T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb624',
          fullname: 'Jess',
          imgUrl: 'https://robohash.org/8641944?set=set1',
          id: '8641944',
        },
        txt: 'We had a fantastic stay in this charming apartment. The location was perfect and Nihat welcomed us even when we made a late reservation and arrived early. He works at a bar no far from there- a great place to have a drink after seeing the sites! I highly recommend this place!',
      },
      {
        at: '2015-08-25T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbcb6',
          fullname: 'Irina',
          imgUrl: 'https://robohash.org/42110174?set=set1',
          id: '42110174',
        },
        txt: 'The flat is clean and and very good located, 3 minutes walk to Taksim Square. The bedroom is quiet at night, even though there is a crowded area next to the flat. Nihat was always extremely quick in answering our emails and let us feel comfortable. He is really kind and discrete, we met him few times cause he works in the evening. ',
      },
      {
        at: '2015-09-21T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fae1a',
          fullname: 'Matthew',
          imgUrl: 'https://robohash.org/40562632?set=set1',
          id: '40562632',
        },
        txt: 'Nihat went out of his way to accommodate our very early arrival and some unforeseeable challenges.  A great host!',
      },
      {
        at: '2015-11-09T05:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fc03f',
          fullname: 'Valon',
          imgUrl: 'https://robohash.org/47981428?set=set1',
          id: '47981428',
        },
        txt: 'Nice place and host, very good location :)',
      },
      {
        at: '2015-12-28T05:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb7a0',
          fullname: 'Amanda',
          imgUrl: 'https://robohash.org/29625938?set=set1',
          id: '29625938',
        },
        txt: 'Everything was great about the room and the location.',
      },
      {
        at: '2016-01-09T05:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb3fe',
          fullname: 'Mathieu & Hilal',
          imgUrl: 'https://robohash.org/50390021?set=set1',
          id: '50390021',
        },
        txt: "The stay at Nihat's place was really pleasant. The apartment is very clean and confortable, and located in a very vibrant and animated neighborhood with many restaurants, cafes, bars, shops just nearby. Just a 5 min walk to the Taksim Metro station makes it easy to access any other parts of the city pretty quickly. Nihat was also a great and welcoming host. We totally recommend this place for your stay in Istanbul, especially if you want to experience the local life to the fullest ! ",
      },
      {
        at: '2016-03-20T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb225',
          fullname: 'Christie',
          imgUrl: 'https://robohash.org/48957037?set=set1',
          id: '48957037',
        },
        txt: 'The host canceled this reservation 30 days before arrival. This is an automated posting.',
      },
      {
        at: '2017-05-11T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fad81',
          fullname: 'Vanessa',
          imgUrl: 'https://robohash.org/551888?set=set1',
          id: '551888',
        },
        txt: "I stayed at Nihat's for a week. It was exactly as the pics, very nice room. A little bit cold but he offers heating and AC. The apt is cozy and central, close to nice restaurants and bars. Have in mind is on the 4th fl no elevator. Nihat is a very easygoing guy who's open to help with any question or tip about the city. Totally recommend! thanks Nihat! ",
      },
      {
        at: '2017-05-21T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb2d1',
          fullname: 'Florentin',
          imgUrl: 'https://robohash.org/75066050?set=set1',
          id: '75066050',
        },
        txt: 'Nihat is a very nice host, he is very helpful and creates an agreeable atmosphere inside the flat. Thank you :)',
      },
      {
        at: '2017-08-27T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fae29',
          fullname: 'Harshak',
          imgUrl: 'https://robohash.org/19784722?set=set1',
          id: '19784722',
        },
        txt: 'Nice cozy place very close to Taksim Square. Nihat is helpful and informative.',
      },
      {
        at: '2017-09-26T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbc70',
          fullname: 'Haytham',
          imgUrl: 'https://robohash.org/10741329?set=set1',
          id: '10741329',
        },
        txt: 'nice apartment with good location. the room was clean and neat. Nihat was helpful and supportive. totally recommend his accommodation',
      },
      {
        at: '2017-10-03T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb5fd',
          fullname: 'Vural',
          imgUrl: 'https://robohash.org/14053758?set=set1',
          id: '14053758',
        },
        txt: 'Nihat is a very friendly host and makes you really feel comfortable. I have had a great stay and recommend it to anyone who wants to stay very central (Cihangir), the hip and modern part of the city with cozy venues and great cafes just a 3min walk. The place is very close to Taksim Square, etc...everything as described in the prior conments. I will definitely come again! Cheers vural',
      },
      {
        at: '2017-12-03T05:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fba05',
          fullname: 'Wasseem',
          imgUrl: 'https://robohash.org/2072593?set=set1',
          id: '2072593',
        },
        txt: 'I totally recommend this place. Great experience staying at Nihat’s apartment. To start with, Nihat is a wonderful friendly person who I was happy to meet. He was very friendly at house, and we had the chance to spend time together outside. Staying with him reflects the true meaning of this website, which is living as a local with a local person. Thank you Nihat. \nRegarding the apartment, it is exactly as described. The room is nice and bed is comfortable. It was clean and well prepared for us. \nRegarding the neighborhood, it is very close to Taksim square and Istiklal Street with few minutes walk. As normal as it is in Istanbul, there is a short hill you need to walk to get to the square, which was totally fine with us. \n\nIn general, next time I visit Istanbul I would first check the availability with Nihat before searching others.',
      },
      {
        at: '2018-02-23T05:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fac4c',
          fullname: 'Mr Joseph',
          imgUrl: 'https://robohash.org/10668432?set=set1',
          id: '10668432',
        },
        txt: "Nihat was an amazing host. He picked me up from the bus stop, gave me some great tips on what to do in Istanbul and just an all round great guy. If you're looking for somewhere close to Taksim then Nihat's place is great. Highly recommend him! Thanks Nihat.",
      },
      {
        at: '2018-03-05T05:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb8b8',
          fullname: 'Gökçe',
          imgUrl: 'https://robohash.org/64172965?set=set1',
          id: '64172965',
        },
        txt: "Nihat is so hospitable person. Me and My boyfriend stayed 6 days in Nihat's place and everything was perfect. Nihat is so tactful person despite he was working so hard, he all the time asked us 'do we need anything?' he was so clean and his house is exactly same with the pictures.\nI'm highly recommend his place! \nthank you Nihat!",
      },
      {
        at: '2018-04-01T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb952',
          fullname: 'Bruno',
          imgUrl: 'https://robohash.org/6316350?set=set1',
          id: '6316350',
        },
        txt: 'Very helping and welcoming host. Perfect location for a few days in Istanbul.',
      },
      {
        at: '2018-04-04T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb73d',
          fullname: 'Vichapas',
          imgUrl: 'https://robohash.org/68234834?set=set1',
          id: '68234834',
        },
        txt: 'Nihat was very nice, polite and very helpful to us. He let us drop our baggages off in the morning and left them for a little longer when we checked out. The location is great as it is near Taksim Square. There are local grocery shops nearby if you want to buy some food or snacks.',
      },
      {
        at: '2018-04-23T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb0fe',
          fullname: 'Show',
          imgUrl: 'https://robohash.org/107816748?set=set1',
          id: '107816748',
        },
        txt: 'Nihat is very nice host, and came to wait for me in the shuttle bus station near Taksim squre, His house is very convenient for travel. He is very experirenced and warm host, the room super clean and warm, and house has everything, next time i will choose his house again in istanbul. miss you nihat. see you next time.',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aab02',
    name: 'Penthouse Sands of Kahana Sandy Swimmable Beach',
    type: 'Caves',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436917/mqkfjmfpmyqpqmzmqgau.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436204/wzbrvr4mcsuub6gvwbry.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436523/ptcgbydjsamgf67a0npw.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436597/l90ukcpzpv6yvv6vhsnd.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436368/noebywqae4x0u42srsv3.jpg',
    ],
    price: 800,
    summary:
      "Price includes nightly rate & 14.42% tax.  Our fully remodeled 9th floor Penthouse unit offers the most amazing views.  The entire front of the condo is windows offering you a fantastic view of beautiful Pacific Ocean, Molokai & Lana'i.  Perfect location for watching beautiful sunsets, see our resident sea turtles & an excellent place for spotting whales during the whale migration season. This spacious two level 3 bedroom and 3 full bath Penthouse unit has over 2,050 sq ft of living space w/ AC.",
    capacity: 9,
    amenities: [
      'TV',
      'Cable TV',
      'Internet',
      'Wifi',
      'Air conditioning',
      'Pool',
      'Kitchen',
      'Free parking on premises',
      'Gym',
      'Elevator',
      'Hot tub',
      'Family/kid friendly',
      'Washer',
      'Dryer',
      'Smoke detector',
      'Carbon monoxide detector',
      'First aid kit',
      'Safety card',
      'Fire extinguisher',
      'Essentials',
      'Shampoo',
      'Lock on bedroom door',
      '24-hour check-in',
      'Hangers',
      'Hair dryer',
      'Iron',
      'Laptop friendly workspace',
      'Self check-in',
      'Building staff',
      'Private entrance',
      'Bathtub',
      'Baby bath',
      'High chair',
      'Children’s books and toys',
      'Crib',
      'Pack ’n Play/travel crib',
      'Children’s dinnerware',
      'Hot water',
      'Bed linens',
      'Extra pillows and blankets',
      'Microwave',
      'Coffee maker',
      'Refrigerator',
      'Dishwasher',
      'Dishes and silverware',
      'Cooking basics',
      'Oven',
      'Stove',
      'BBQ grill',
      'Patio or balcony',
      'Beach essentials',
      'Step-free access',
      'Disabled parking spot',
      'Step-free access',
      'Step-free access',
      'Step-free access',
      'Beachfront',
      'Pool with pool hoist',
    ],
    bathrooms: 3,
    bedrooms: 3,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3405e36c59e6164fb6ba',
      fullname: 'Cynthia',
      location: 'California, United States',
      about:
        'My husband and I are Real Estate Investors.  We enjoy traveling and no matter where we go, we always find ourselves looking at properties.  Since we still have school age children I have found that a beach vacation is usually the most enjoyable for everyone.  Living on the West Coast, Hawaii continued to be a place that we would return to time and time again.',
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/07c98f2f-9ffe-4ed8-82ca-1e9cd00c673f.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/07c98f2f-9ffe-4ed8-82ca-1e9cd00c673f.jpg?aki_policy=profile_x_medium',
      isSuperhost: true,
      id: '82827178',
    },
    loc: {
      country: 'United States',
      countryCode: 'US',
      city: 'Maui',
      address: 'Lahaina, HI, United States',
      lat: -156.68034,
      lan: 20.97104,
    },
    reviews: [
      {
        at: '2016-12-08T05:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbfd3',
          fullname: 'Therese',
          imgUrl: 'https://robohash.org/5536819?set=set1',
          id: '5536819',
        },
        txt: "We have just returned from a fabulous holiday at Cynthia's condo on Maui. Everything was fantastic. From the moment we booked Cynthia could not have been more helpful with everything and was always ready and willing to answer all of our queries. Cynthia provided us with an extensive list of recommendations for our stay on Maui and we were not disappointed. The condo is located in a quiet but convenient neighbourhood and close to many amenities. We found the condo extremely spacious and it accommodated our party of 3 adults and two teenaged children with no problem at all. Cynthia's condo is the penthouse and is set right on the beach so we were treated to gorgeous Hawaiian sunsets every night, as well as being able to see turtles and whales from our balcony. The condo is beautifully presented and very well equipped - we could not have asked for anything more for our nine day stay. \r\nMahalo Cynthia ",
      },
      {
        at: '2017-03-23T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbb9b',
          fullname: 'Alexandra',
          imgUrl: 'https://robohash.org/29101218?set=set1',
          id: '29101218',
        },
        txt: 'The location was great and the view was incredible! You are right on the beach and it is a great place for families with kids. Highly recommend staying here!',
      },
      {
        at: '2017-04-28T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb19f',
          fullname: 'Daisy',
          imgUrl: 'https://robohash.org/111663869?set=set1',
          id: '111663869',
        },
        txt: 'This place was beyond my expectations. There were no hidden surprises. Knew exactly what to expect, and Cynthia was always there to answer any quesions. The view is spectacular. Beautiful location. I highly recommend this place.',
      },
      {
        at: '2017-07-29T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fac44',
          fullname: 'Peter',
          imgUrl: 'https://robohash.org/54509004?set=set1',
          id: '54509004',
        },
        txt: 'Very nice location with good beach. Penthouse is nice sized and comfortable. Amenities are good. Location is very good with close proximity to Lahaina and Kapalua.',
      },
      {
        at: '2017-11-03T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb70f',
          fullname: 'Megan',
          imgUrl: 'https://robohash.org/5818782?set=set1',
          id: '5818782',
        },
        txt: "If you want a one-stop, stress-free vacation, in a beautiful location with all the amenities you need....this is it!  We lucked out with perfect weather too.  Cynthia provides basic amenities, pool towels, bookie boards, snorkeling gear, and the comfort of being in a cozy home.  It was really easy to run up to the Condo for my 9-month old nap times or a quick snack, without being too separated from the family.  The onsite pools, restaurant and of course restaurant/bar became our home bases for the week.  Miso Phat Sushi (across the street) and Maui Brewing were awesome near-by/within walking distance restaurants.  My family and I can't stop bragging about our trip and what a wonderful family/group set-up this Condo is!  We recommend renting a car due to the distance from the airport, but the Condo/Resort has onsite parking.",
      },
      {
        at: '2018-01-30T05:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fae2f',
          fullname: 'Brenda',
          imgUrl: 'https://robohash.org/151153465?set=set1',
          id: '151153465',
        },
        txt: 'Such a beautiful location in Paradise! The amazing balconies provided us with gathering spots for our morning coffee to watch the whales and gorgeous sunsets each evening. During our week long stay, we decided to visit Costco, the local fish market and the farmers market and ate 4 dinners in the condo.  The kitchen has everything you need, and the barbques downstairs were perfect for grilling.  Cynthia left us plenty of information for dining in the vicinity, so we had 3 nice dinners out. The guide she sent us before our visit was very informative and helped us to plan our outings while in Maui. Cynthia also checked in with us during our visit, making sure we had everything we needed. We are already planning a return visit to #391 at the Sands of Kahana in the near future!',
      },
      {
        at: '2018-03-24T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb04f',
          fullname: 'Daria',
          imgUrl: 'https://robohash.org/38292402?set=set1',
          id: '38292402',
        },
        txt: "We had such a great time at Cynthia's condo.  Everything was sparkling clean. The check in and check out were seamless.  We loved that the condo came with some beach gear for our use (snorkels, boogie boards, water shoes...).  The views from the balconies are outstanding.  There is a nice and swimmable beach right downstairs, as well as a volleyball court and a casual restaurant. Great location with easy access to beach rentals, groceries, and anything else you might need during your stay.  Cynthia was very quick to respond to any questions we had. Loved the place! Would definitely stay again.",
      },
      {
        at: '2018-04-14T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164faec7',
          fullname: 'Amy',
          imgUrl: 'https://robohash.org/95449574?set=set1',
          id: '95449574',
        },
        txt: "This place was incredible. From the views to the thoughtfulness in everything in the condo. While climbing nine flights of stairs during an unexpected elevator renovation (that ends in May!) does not sound fun, it was actually not bad at all for the adults in our party, as well as the 3 sub-8 year old children, and allowed us to think we were earning all the delicious calories we ate and drank.\n\nI cannot rave enough about the amenities that are incredibly family friendly, including a full sized high chair, travel crib, toddler (and big kid) friendly toys for both indoors and at the beach. Cynthia is very quick to respond to communication and is clear as to what she can provide as a host, as well as her expectation of guests. She was as incredible as her Kahana home was and we'd highly recommend this place for anyone, including those with small children.",
      },
      {
        at: '2018-05-19T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fba90',
          fullname: 'Stacey',
          imgUrl: 'https://robohash.org/69659100?set=set1',
          id: '69659100',
        },
        txt: 'This place is amazing. We will be back!',
      },
      {
        at: '2018-06-03T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbb28',
          fullname: 'Rebekah',
          imgUrl: 'https://robohash.org/154101405?set=set1',
          id: '154101405',
        },
        txt: 'What an amazing place to stay with a spectacular view!! The beach out front is awesome and we saw turtles daily! Cynthia was great with communication and making our stay feel just like home. Hope to stay here again!!',
      },
      {
        at: '2018-08-25T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbda0',
          fullname: 'Chris',
          imgUrl: 'https://robohash.org/170664766?set=set1',
          id: '170664766',
        },
        txt: 'Fantastic unit. Amazing sunsets.',
      },
      {
        at: '2018-09-13T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbc74',
          fullname: 'Esther',
          imgUrl: 'https://robohash.org/4059349?set=set1',
          id: '4059349',
        },
        txt: 'Enjoyed our stay very much! The condo was clean, spacious and with all the amenities of a home away from home. Cynthia was very responsive, even checking up on us when the tropical storm warnings went out. Thankfully, the storm didn’t dampen our stay. Enjoyed many beautiful Maui sunsets from the home!',
      },
      {
        at: '2018-10-18T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb016',
          fullname: 'Elaine',
          imgUrl: 'https://robohash.org/73108150?set=set1',
          id: '73108150',
        },
        txt: 'The place has amazing ocean views!!! Cynthia provided beach chairs, gears, and toys for the kids. The entire condo is well organized and our family had such a great time. Appreciate all the little touches you provided for your guests. Will definitely stay there again when we return on Maui! :)',
      },
      {
        at: '2019-01-11T05:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb239',
          fullname: 'Dan',
          imgUrl: 'https://robohash.org/217281282?set=set1',
          id: '217281282',
        },
        txt: 'This condo was very spacious.  We had eight people (ages 5-85) and there was plenty of space for everyone.  Cynthia was readily accessible if we needed anything.  The view from the lanai was breathtaking and we watched whales every morning.  The condo was stocked with plenty of snorkel gear, boogie boards, beach chairs, sand toys for the kids, board games, puzzles, etc.  The kitchen had plenty of pots, pans, dishes, utensils, etc.  Thanks for the great stay!',
      },
      {
        at: '2019-01-22T05:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164faf7d',
          fullname: 'Jess',
          imgUrl: 'https://robohash.org/20450315?set=set1',
          id: '20450315',
        },
        txt: 'Very clean. Cleanest Airbnb we have stayed at. Beautiful home and beautiful view of the sunset from the apartment. Loved that they had binoculars to see the whales jumping out in the distance.',
      },
      {
        at: '2019-02-14T05:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb1af',
          fullname: 'Anna-Mae',
          imgUrl: 'https://robohash.org/76192807?set=set1',
          id: '76192807',
        },
        txt: "If you are wanting a beautiful place right on the beach when you visit Kaanapali with your family , then this is the place for you ! Gorgeous full ocean view from the large deck ,large spacious rooms, super clean, lots of extras and great communication with Cynthia! We came here with our 3 adult kids and their spouses and loved everything about this place .. well stocked kitchen , lots of towels, beach toys (boogie boards were a hit ) comfortable beds ..and then there is outside !  Beautiful clean beach right outfront, nice pool and grounds , very helpful staff and amenities close by ... we watched whales and turtles right from our beach and deck, amazing !! This condo made our trip to Maui a real treat ..chose Cynthia's condo , you will not be disappointed !!",
      },
      {
        at: '2019-02-27T05:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb766',
          fullname: 'Lj',
          imgUrl: 'https://robohash.org/69116372?set=set1',
          id: '69116372',
        },
        txt: "I cannot say enough good things about this condo. There was more than enough space for my friends and I to spread out. Each room was beautifully decorated. the bathrooms we're impeccably remodeled, I even took inspiration pictures! Cynthia thought of everything to make this a home away from home. AC was in every room, but with the trade winds, we never needed it. Don't hesitate, book this place now!!!",
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aab03',
    name: '+Spacious Studio&Kitchenette near Blue Mosque+',
    type: 'OMG!',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436321/g2cs1w7tkxsx58penq9j.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436542/e96nrbkjz8mecvsbzukk.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437250/o8uutj3t2bvfafvxkr9j.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436957/ehhcyscwtvxw55mptkok.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436294/mvhb3iazpiar6duvy9we.jpg',
    ],
    price: 264,
    summary:
      "A spacious, private studio with high speed Wi-Fi wireless internet. It is located in historical district of Sultanahmet oldcity center. It's Only 10 minutes (by walking) away from Sultanahmet  Blue Mosque, Hagia Sophia, Topkapı Palace, Underground Cistern and Hippodrome. This area is called Kadirga and it's famous with it's local restaurants. There are more gorcery stores and supermarkets in this are since it's not %100 touristic area. There is children playground right in front of the building.",
    capacity: 5,
    amenities: [
      'TV',
      'Wifi',
      'Air conditioning',
      'Kitchen',
      'Paid parking off premises',
      'Heating',
      'Family/kid friendly',
      'Fire extinguisher',
      'Essentials',
      'Shampoo',
      'Hangers',
      'Hair dryer',
      'Iron',
      'Hot water',
      'Microwave',
      'Refrigerator',
      'Host greets you',
    ],
    bathrooms: 1,
    bedrooms: 0,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3405e36c59e6164fb898',
      fullname: 'Kadirga',
      location: 'Istanbul, İstanbul, Turkey',
      about: '',
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/user/7620074d-86d6-49c3-b7fe-cafe084051dd.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/user/7620074d-86d6-49c3-b7fe-cafe084051dd.jpg?aki_policy=profile_x_medium',
      isSuperhost: false,
      id: '98780303',
    },
    loc: {
      country: 'Turkey',
      countryCode: 'TR',
      city: 'Istanbul',
      address: 'Fatih, İstanbul, Turkey',
      lat: 28.96755,
      lan: 41.00488,
    },
    reviews: [
      {
        at: '2016-11-06T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb5a5',
          fullname: 'Sime',
          imgUrl: 'https://robohash.org/65556580?set=set1',
          id: '65556580',
        },
        txt: '地点很方便,房间也很大,有好多张床,如果是家庭出游将是不错的选择｡',
      },
      {
        at: '2016-11-09T05:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbcdd',
          fullname: 'Liberato',
          imgUrl: 'https://robohash.org/77131064?set=set1',
          id: '77131064',
        },
        txt: "The room was great. I was able to get the much needed Rest and relaxation I was looking for. What stood out for me was Emre's concern for my piece of mind. I approached him with a few minor concerns and he went to great lengths to ensure that I would have a restful stay at his hotel. He was extremely helpful in helping me secure ground transportation to my next destination, as I had failed miserably ha in get attempted to do it on my own. Stay here, the neighborhood will give you a true taste of Istanbul, a healthy step away from the too touristy neighborhoods.",
      },
      {
        at: '2016-12-10T05:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbb72',
          fullname: 'Tash',
          imgUrl: 'https://robohash.org/3276660?set=set1',
          id: '3276660',
        },
        txt: 'Great place, very friendly host, I would recommend this place to anyone.',
      },
      {
        at: '2017-01-26T05:00:00.000Z',
        by: {
          _id: '622f3408e36c59e6164fc07f',
          fullname: 'Magdi',
          imgUrl: 'https://robohash.org/65666427?set=set1',
          id: '65666427',
        },
        txt: 'With a good honest people everything is great, thanks boys ',
      },
      {
        at: '2017-02-06T05:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb1d3',
          fullname: 'Daria',
          imgUrl: 'https://robohash.org/109484218?set=set1',
          id: '109484218',
        },
        txt: 'Thanks for your nice guest house',
      },
      {
        at: '2017-02-26T05:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb406',
          fullname: 'Ziying',
          imgUrl: 'https://robohash.org/40753110?set=set1',
          id: '40753110',
        },
        txt: '这个房间性价比真的很好呀!位置也ok,离景点不远｡但是离metro有点远,去交通点上坡好累｡洗手间还是有点脏,去的时候地上有小虫｡厕所马桶有点摇摇欲坠,厕所门锁不上｡但是看在这价钱,休息几晚能接受｡',
      },
      {
        at: '2017-03-12T05:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb0da',
          fullname: 'Florianne',
          imgUrl: 'https://robohash.org/117885577?set=set1',
          id: '117885577',
        },
        txt: 'The flat is perfect for preople who want to visit Istanbul! thanks',
      },
      {
        at: '2017-04-10T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb843',
          fullname: 'Zakiuddin',
          imgUrl: 'https://robohash.org/116676576?set=set1',
          id: '116676576',
        },
        txt: 'place is closer to main attractions and at the same time in quite locality. i recomend fellow travellers to try kadirga park when visiting istanbul. good for families.',
      },
      {
        at: '2017-04-26T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbebe',
          fullname: 'Kristy',
          imgUrl: 'https://robohash.org/66755882?set=set1',
          id: '66755882',
        },
        txt: 'Emre wad a great host. His communication before and during our stay had been absolutely top notch. He was very helpful and accommodating and we would stay with him again,  no question! ',
      },
      {
        at: '2017-06-14T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbfdf',
          fullname: 'Bas',
          imgUrl: 'https://robohash.org/4966099?set=set1',
          id: '4966099',
        },
        txt: "I had a great time staying here. Emre has a wealth of local useful information. Ask him anything and he'll basically plan your holiday for you :) I was greeted when I arrived by one of his staff and quickly shown to my room. The room was basic but spacious, clean and safe - great value for money. Istanbul is incredibly beautiful and very exciting. There's a supermarket literally across the road, as is the Istanbul photography museum. The Hagia Sophia and Blue Mosque are a stone throw away. Lots of restaurants and cafes in the area. Easy to walk everywhere and public transport is easy, cheap, mosern, safe and fast - speak to Emre and he'll quickly help you get your head around it. Stay here, you won't regret it. ",
      },
      {
        at: '2017-06-17T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb299',
          fullname: 'Mahgrine',
          imgUrl: 'https://robohash.org/6629816?set=set1',
          id: '6629816',
        },
        txt: "The place is near to the tram, around 8-10 mins walk. The room is clean, big, and comfy. The only drawback is that I didn't expect that I need to go uphill every time I'm going out from the house. Nevertheless, it's a great location. You can reach the Grand Bazar, Blue Mosque, Hagia Sophia and TopKapi Palace by walking, approx. 20mins.  ",
      },
      {
        at: '2017-08-17T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbd57',
          fullname: 'Tolga',
          imgUrl: 'https://robohash.org/48053238?set=set1',
          id: '48053238',
        },
        txt: "Nice apartment overall. Its located at the bottom of a hill so expect a hike whenever you want to go anywhere. There's a supermarket just down the road which stocks things you'll need on a daily basis which is very handy. The park across the road does get very loud and stays busy well after midnight so keep that in mind.",
      },
      {
        at: '2017-09-24T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb4ad',
          fullname: 'Öner',
          imgUrl: 'https://robohash.org/29635802?set=set1',
          id: '29635802',
        },
        txt: "+ :\nBien situé, je n'ai pas eu du mal à visiter les lieux proches. \n\n- : \n* Tous les équipements n'y étaient pas (sèche cheveux, lave linge...)\n\n* la porte d'entrée est juste au niveau de la porte d'entrée du bâtiment. On entend donc tous les gens qui passent avec le claquement de porte. Pas super la nuit. \n\n* wifi ne capte pas bien. \n\n* la lumière de salle de bain fonctionne avec un détecteur de mouvement qui ne capte pas si vous êtes dans la douche. Il faut donc utiliser le flash de son portable.",
      },
      {
        at: '2017-10-03T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb129',
          fullname: 'Med Zied',
          imgUrl: 'https://robohash.org/36523012?set=set1',
          id: '36523012',
        },
        txt: 'Good location',
      },
      {
        at: '2017-10-14T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbb01',
          fullname: 'Danielle',
          imgUrl: 'https://robohash.org/70117115?set=set1',
          id: '70117115',
        },
        txt: "Fantastic little apartment, ideal for a weekend break in Istanbul. Located on a road with lots of good cheap street food, only ten minutes walk from the main tourist spots of Sultanahmet including the blue mosque and Hagia Sophia. Great road of restaurants just three minutes away with great atmosphere and decent prices - although everyone will try and lure you in! It's a very steep climb up a hill to public transport but not a problem if you enjoy a walk!\n\nApartment has everything you need for a comfortable stay. Only problem is the noise. The doorbell is loud and people coming in and out kept us awake one night!",
      },
      {
        at: '2017-10-21T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fae6a',
          fullname: 'Arifur',
          imgUrl: 'https://robohash.org/154348770?set=set1',
          id: '154348770',
        },
        txt: 'Ganz bequem und guter Lage. Jederzeit kann ich Empfehlen. Emre ist nette man und freundlich. Die Zimmer ist preiswert. Blaue Moschee nur 6-7 min zu fuss.',
      },
      {
        at: '2017-10-30T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fad87',
          fullname: 'Nass',
          imgUrl: 'https://robohash.org/22615931?set=set1',
          id: '22615931',
        },
        txt: 'Appartement simple, des lits un frigo,\nLes - :  pas toujours le nécessaire de cuisine, plaque vieille..pas de machine a laver, assez froid (pas de chauffage, la clim chauffe mal) fortes odeurs dans la salle de bain, et les draps sont pas changé de la semaine...les serviette retiré mais pas rajouter...\n\nLes + : \nBon emplacement loin du tumulte de la ville mais dans le centre historique de Sulthanamey.Emre est réactif,plein de petits boui boui autour, restaurants, ménage fait durant le séjour, et quartier calme !',
      },
      {
        at: '2017-11-06T05:00:00.000Z',
        by: {
          _id: '622f3401e36c59e6164fab5f',
          fullname: 'Fadi',
          imgUrl: 'https://robohash.org/152749523?set=set1',
          id: '152749523',
        },
        txt: 'Mr Emre was very helpful and friendly with us help us showing around especially being Turkish interpter when needed.\nHighly recommended place to stay in Old Istanbul ',
      },
      {
        at: '2017-11-19T05:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb185',
          fullname: 'Igor',
          imgUrl: 'https://robohash.org/5445704?set=set1',
          id: '5445704',
        },
        txt: 'Удобное расположение до основных достопримечательностей (пешая доступность). Оперативные ответы и помощь от хозяина квартиры.',
      },
      {
        at: '2018-01-03T05:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164faca0',
          fullname: 'Sarah',
          imgUrl: 'https://robohash.org/103139094?set=set1',
          id: '103139094',
        },
        txt: "L'appartement d'Emre est davantage une petite chambre d’hôtel où l'on a les équipements attendus sauf la machine à laver. L'appartement est globalement assez propre.\nIl est très bien placé (à 10 min à pied de la mosquée bleue et de sainte Sophie) et dans un quartier authentique. Nous avons aussi apprécié qu'il y ait en face un supérette où nous avons pu faire des courses.\nEmre est très réactif et très sympa. Nous recommandons cet appartement.",
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aab04',
    name: 'Grand apartment Sagrada Familia',
    type: 'Lakefront',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436811/ym5nh1anownexsyzgbqq.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436772/nplkpwclhrdvvspkpmbg.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437033/rhw6gycttaimzocc1poz.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436897/iz1ik9nibj3sobzrqomf.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436353/wqah1dfim6hcosaq0ve3.jpg',
    ],
    price: 169,
    summary:
      '4 rooms apartment in the heart of the right “Eixample” broadening. Perfect location in the notorious area of Sagrada Familia that will ensure and unforgettable stay in Barcelona. HUTB-003275',
    capacity: 8,
    amenities: [
      'TV',
      'Internet',
      'Wifi',
      'Air conditioning',
      'Kitchen',
      'Paid parking off premises',
      'Smoking allowed',
      'Buzzer/wireless intercom',
      'Family/kid friendly',
      'Washer',
      'Dryer',
      'Essentials',
      'Shampoo',
      'Hangers',
      'Hair dryer',
      'Iron',
      'Laptop friendly workspace',
      'Hot water',
      'Host greets you',
    ],
    bathrooms: 2,
    bedrooms: 4,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3406e36c59e6164fbbf5',
      fullname: 'Alexandra Y Juan',
      location: 'Barcelona, Catalonia, Spain',
      about:
        'Hola, \r\n\r\nSomos Alexandra y Juan dos amigos que estamos enamorados de Barcelona, nuestras pasiones son viajar y conocer gente por lo que nos encantaría compartir con vosotros nuestros espacios  para que disfrutéis a vuestro gusto de toda la cultura, actualidad y diversidad de ofertas que la ciudad os ofrece.\r\nPara nosotros lo mas importante es que nuestros huéspedes puedan aprovechar al máximo su estancia en Barcelona,  que viváis vuestra historia  reflejada en  rincones únicos de la ciudad y por supuesto nuestra mayor satisfacción es que os sintáis como en casa según lo que busquéis.\r\n\r\nHello, \r\n\r\nWe are Alexandra and Juan two friends who are in love with Barcelona, our passion is to travel and meet new people so we would love to share our spaces with you and that you can enjoy the culture, the present and the diversity of offers that the city has to offer. \r\nFor us the most important thing is that our guests can make the most of their stay in Barcelona, that you live our history full of unique places and of course our greatest satisfaction is that you feel as if you where at home according to what you are looking for.',
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/user/3fceba9a-ce84-4841-88df-b699105119b4.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/user/3fceba9a-ce84-4841-88df-b699105119b4.jpg?aki_policy=profile_x_medium',
      isSuperhost: false,
      id: '54320669',
    },
    loc: {
      country: 'Spain',
      countryCode: 'ES',
      city: 'Barcelona',
      address: 'Barcelona, Catalunya, Spain',
      lat: 2.18146,
      lan: 41.39716,
    },
    reviews: [
      {
        at: '2016-03-30T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164faec0',
          fullname: 'Lenny',
          imgUrl: 'https://robohash.org/36457037?set=set1',
          id: '36457037',
        },
        txt: "L'accès au logement est pratique. Il y a un parking à 10 mètres (20€ par jour).\r\nLa résidence est bien tenue. Deux ascenseurs pour accéder au 6ème étage. L'appartement est parfaitement silencieux, pas de bruit sur la rue.\r\nLe logement est idéal pour les groupes, il est propre, en très bon état. Deux jeux de clés sont à disposition. Je recommande vivement ce logement.\r\nPour se rendre en ville, il est situé à 15 minutes de sites à voir, les taxis passent dans la rue, tout est pratique.\r\nEnfin la terrasse est superbe, avec vue sur la tour AGBAR.\r\n\r\nMerci pour votre accueil, on revient bientôt!",
      },
      {
        at: '2016-04-05T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb082',
          fullname: 'Albe Birio',
          imgUrl: 'https://robohash.org/33200324?set=set1',
          id: '33200324',
        },
        txt: 'The apartment is really amazing, in the city centre and with everything we needed. Regina was really helpful we our needs.',
      },
      {
        at: '2016-04-17T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164faeeb',
          fullname: 'Daniel',
          imgUrl: 'https://robohash.org/9256716?set=set1',
          id: '9256716',
        },
        txt: 'Great stay, very nice flat as described. Nice balcony and well located! Host was nice and easy to communicate to',
      },
      {
        at: '2016-04-30T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fad11',
          fullname: 'Bram',
          imgUrl: 'https://robohash.org/64345234?set=set1',
          id: '64345234',
        },
        txt: "Everything was fine.\r\nApartment was clean.\r\nA couple useful items weren't available, like a trash can or a drying rack fro the dishes. But obviously thats an easy thing to buy.\r\nOverall a nice place.\r\n\r\nNothing to do with the host, but the walls are paper thin. You can hear what the neighbours are doing on every side of the flat.",
      },
      {
        at: '2016-05-08T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbcec',
          fullname: 'Joel',
          imgUrl: 'https://robohash.org/16946925?set=set1',
          id: '16946925',
        },
        txt: 'Bon accueil et appartement propre et conforme à la description',
      },
      {
        at: '2016-05-16T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb73f',
          fullname: 'Paul',
          imgUrl: 'https://robohash.org/64496561?set=set1',
          id: '64496561',
        },
        txt: "Superbe appartement! Un parking à deux pas qui nous a été d'une grande utilité. Regina est très accueillante, je recommande cet appartement. ",
      },
      {
        at: '2016-05-23T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fba01',
          fullname: 'Daniel',
          imgUrl: 'https://robohash.org/29800397?set=set1',
          id: '29800397',
        },
        txt: "We has a great time at Regina's place. The flat is clean and as shown on the pictures.\r\n",
      },
      {
        at: '2016-07-10T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbb75',
          fullname: 'Guowei',
          imgUrl: 'https://robohash.org/45005783?set=set1',
          id: '45005783',
        },
        txt: "The apartment and the location is good, but the service is not as good as expect. \n\nI have booked a pick-up service from the householder, but there are some problems happened about the plane causing the flight delayed. I have informed the householder at once. When we arrived at the airport, we could not find the driver waiting for us at the arrival with our name. Then, I tried to ask for the help from the householder to meet the driver at the airport. After almost one-hour waiting, we are refused by the driver to meet at the airport and He asked us to find his car at the park. How ridiculous! This service costs 20 euro each person but we cannot even have the right to be picked up. We were so angry and chose to take the taxi. At the same time, I texted the householder that we were tired of waiting for the driver and we were on the way to ur apartment by taxi.\n\nThe householder didn't tell me that I should phone another guy to tell him that we were on the way to the apartment until We arrived. What all she talked about were the money of the pick-up service. We spent another 45 minutes to wait for the guy to send the key. Again, when he came, he talked about the money. We asked for the service, but u did not provide it with us. How dare u to ask for the payment? Besides, do u know what? We are totally seven people, so this service should cost 140 euro totally. But two taxis only cost us 70 euro. The driver knows the guy and the householder. I doubt that they are on the business to play trick with me.\n\nBarcelona is a really nice city to travel, but this experience does make a bad impression on me. \n ",
      },
      {
        at: '2016-07-16T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbf02',
          fullname: 'Glen',
          imgUrl: 'https://robohash.org/47750495?set=set1',
          id: '47750495',
        },
        txt: 'The apartment has a good location convenient to metro and walking distance to Sagrada Familia and many good eating options. Spacious with a nice balcony. Air conditioning units are in the main hallway and the dining/living room, but the rooms are hard to cool down (it was hot when we were there). ',
      },
      {
        at: '2016-07-23T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbd6b',
          fullname: 'Andrea',
          imgUrl: 'https://robohash.org/77802327?set=set1',
          id: '77802327',
        },
        txt: 'Hola todo muy bien, excelente ubicacion y el trato my amable. El unico comentario es el de reparar la ',
      },
      {
        at: '2016-07-29T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fad90',
          fullname: 'Jacob',
          imgUrl: 'https://robohash.org/12803690?set=set1',
          id: '12803690',
        },
        txt: 'What an amazing place to stay! It is a very roomy and comfortable place, that is in a great location. The deck area is amazing and we spent most of our time there just hanging out taking in the views. Reginan had great communication and made it very simple for us to arrive. If i ever go back to Barcelona, i would 100% stay here again! ',
      },
      {
        at: '2016-08-08T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb0e3',
          fullname: 'Yuri',
          imgUrl: 'https://robohash.org/67801763?set=set1',
          id: '67801763',
        },
        txt: "Tutto andava molto bene ,l'appartamento corrispondeva esattamente alle foto del sito. Le stanze ed i bagni erano puliti , come pure la cucina. La terrazza era molto bella e la vista era apprezzabile. Oltre ai vari letti vi era anche la possibilità di dormire su un divano letto particolarmente comodo. L'aria condizionata funzionava e rinfrescava bene tutto l'appartamento. L'unico problemino c'è stato con la porta del bagno che è stato facile chiudere, ma non più riaprire, ma c'è stato subito un pronto intervento da parte dei responsabili dell'appartamento, che hanno aiutato ad uscire la persona che era rimasta chiusa all'interno. Salvo questo però Il quartiere era tranquillo , c'erano vari baretti attorno e anche dei piccoli centri commerciali ( di tipo alimentare ). Era in oltre possibile raggiungere a piedi vari bar dove potersi divertire. I taxi per arrivare nel centro della movida variano con i prezzi dai 5 ai 7 euro a corsa. La fermata della metro era a 5 min a piedi dall'appartamento. Dal centro partiva una navetta che portava direttamente all'aeroporto per soli 4 euro e 90. ",
      },
      {
        at: '2016-08-28T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbc92',
          fullname: 'Anne-Sophie',
          imgUrl: 'https://robohash.org/11856961?set=set1',
          id: '11856961',
        },
        txt: 'Regina is a really nice host and the apartment is perfect for big group due to its perfect location, 5 min drive or 15 min walk for the beach and near the perfect tourist places !\nI recommend 100% this clean and well decorated apartment !\n',
      },
      {
        at: '2016-09-19T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb647',
          fullname: 'Julie',
          imgUrl: 'https://robohash.org/3087963?set=set1',
          id: '3087963',
        },
        txt: "Regina was a great host- first she replied very quickly to my booking inquiry, and was always very responsive with queries/ messages.\r\nThe flat is HUGE and very well located, very modern and nicely decorated. Regina had organised someone to meet us on arrival so check in was easy. Check out was easy  llew as we just had to leave the flat at the agreed time. I would only say that the check out time of 11am is a bit early, especially for a city when you can have dinner quite late... although upon our request, Regina allowed us nicely to stay until 12pm.\r\nThey were two sets of keys which was very convenient for a big group. \r\nI have suggested to regina that it would be great to have a few more amenities provided such as toilet paper and coffee/tea for example, but overall we were very pleased with our stay at Regina's place. Thank you Regina!\r\n\r\n",
      },
      {
        at: '2016-09-23T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb09e',
          fullname: 'Manuel',
          imgUrl: 'https://robohash.org/46225617?set=set1',
          id: '46225617',
        },
        txt: 'El departamento es fantástico y tiene una terraza bastante amplia para disfrutar. Tanto los anfitriones como Maks (el concierge) fueron muy amables y dispuestos a ayudar.',
      },
      {
        at: '2016-10-21T04:00:00.000Z',
        by: {
          _id: '622f3408e36c59e6164fc065',
          fullname: 'Maxim',
          imgUrl: 'https://robohash.org/6800997?set=set1',
          id: '6800997',
        },
        txt: "Very good location.\r\n\r\nReally close to all major attractions. Plenty of shops and restaurants nearby. ( BTW you can go to the sushi bar - 5 minutes walk - Kyoka II, with unlimited food. Menu in Spanish only :) )\r\n\r\nApartments are comfortable and clean. I think it should be really good for a family vacations.\r\n\r\nIMHO some minimal improvements must be made (broken shower hose support, etc) but it's truly minor. \r\n\r\nOverall - pleasant experience.",
      },
      {
        at: '2016-10-24T04:00:00.000Z',
        by: {
          _id: '622f3401e36c59e6164fab87',
          fullname: 'Rebecca',
          imgUrl: 'https://robohash.org/29589939?set=set1',
          id: '29589939',
        },
        txt: "Regina's apartment was as listed on her profile - there was sufficient space for all 8 of us, and had all of the amenities listed on the page. It was a very good area. I would recommend anyone in a bigger group looking to stay in a central location. ",
      },
      {
        at: '2016-10-31T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbfe5',
          fullname: 'Luke',
          imgUrl: 'https://robohash.org/44480371?set=set1',
          id: '44480371',
        },
        txt: 'Great apartment if you are a larger group and need more space. The bedrooms are all great and as described, plus having two bathrooms was good. The terrace is a fantastic bonus, with amazing views! ',
      },
      {
        at: '2016-11-02T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fafc3',
          fullname: 'Karla',
          imgUrl: 'https://robohash.org/22279916?set=set1',
          id: '22279916',
        },
        txt: 'El apartamento es incluso mejor a como aparece en las fotos. La ubicación excelente. Queda cerca de todo y se puede ir caminando a diferentes puntos de interes como la sagrada familia y la marina o para los que prefieren el metro tiene cerca varias paradas de metro lo que resulta muy conveniente.  Lo recomendamos cien por ciento. Si volvemos a Barcelona definitivamente nos quedariamos nuevamente aqui.',
      },
      {
        at: '2016-11-14T05:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164faf4f',
          fullname: 'Katherine',
          imgUrl: 'https://robohash.org/12265394?set=set1',
          id: '12265394',
        },
        txt: 'We stayed here with 8 people for a fun weekend in Barcelona and this apartment was a great home base for us. The apartment is exactly what the pictures showed and Regina and Juan were great hosts. Location is a little bit out of the way if you want to be central but proximity to la Sagrada Familia was nice!',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aab05',
    name: 'Spacious and quiet duplex apartment in Poble Sec',
    type: 'Islands',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436397/nde7l2hrwezdfzbvhczj.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436539/jy85me6y4bcsgfjvytwv.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436801/mcuu1w2188ndpd6hezzt.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436907/abikktroqknzhch6b9ly.jpg',
    ],
    price: 130,
    summary:
      'Spacious apartment in a peculiar building in the central neighbourhood of Poble Sec, with patio and terrace, ideal for families with children or groups. Walking distance from center, Montjuïc, Plaza España, Fira Montjuïc/Gran Vía, Sant Antoni, Raval.',
    capacity: 7,
    amenities: [
      'TV',
      'Cable TV',
      'Internet',
      'Wifi',
      'Air conditioning',
      'Kitchen',
      'Paid parking off premises',
      'Buzzer/wireless intercom',
      'Heating',
      'Family/kid friendly',
      'Washer',
      'Smoke detector',
      'Carbon monoxide detector',
      'First aid kit',
      'Safety card',
      'Fire extinguisher',
      'Essentials',
      'Shampoo',
      '24-hour check-in',
      'Hangers',
      'Hair dryer',
      'Iron',
      'Laptop friendly workspace',
      'Outlet covers',
      'Bathtub',
      'High chair',
      'Stair gates',
      'Children’s books and toys',
      'Crib',
      'Pack ’n Play/travel crib',
      'Room-darkening shades',
      'Children’s dinnerware',
      'Hot water',
      'Bed linens',
      'Extra pillows and blankets',
      'Ethernet connection',
      'Microwave',
      'Coffee maker',
      'Refrigerator',
      'Dishwasher',
      'Dishes and silverware',
      'Cooking basics',
      'Oven',
      'Stove',
      'Patio or balcony',
      'Luggage dropoff allowed',
      'Long term stays allowed',
      'Wide doorway',
      'Well-lit path to entrance',
      'Wide entryway',
      'Host greets you',
    ],
    bathrooms: 2,
    bedrooms: 3,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3403e36c59e6164fb08c',
      fullname: 'Cristina',
      location: 'Barcelona, Catalonia, Spain',
      about:
        '(ES) Soy mujer, mamá y traductora. Me gusta tener tiempo para pensar, viajar, jugar con mis hijas y descubrir algo nuevo cada día. A veces por trabajo tengo que viajar, y entonces mi amiga Yamila, gran mujer y fantástica anfitriona, amante del campo y fotógrafa de profesión, me ayuda con los huéspedes.\r\n\r\n(EN) I am a woman, a mother and a translator. I like having time to think, to travel, to play with my daughters and to discover something new every day. Sometimes I have to travel because of my job: in those occasions my friend Yamila, great woman and fantastic host, outdoor lover and photographer, helps me out with guests.',
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/users/6107595/profile_pic/1442432675/original.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/users/6107595/profile_pic/1442432675/original.jpg?aki_policy=profile_x_medium',
      isSuperhost: true,
      id: '6107595',
    },
    loc: {
      country: 'Spain',
      countryCode: 'ES',
      city: 'Barcelona',
      address: 'Barcelona, Catalunya, Spain',
      lat: 2.15566,
      lan: 41.37479,
    },
    reviews: [
      {
        at: '2013-05-12T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb132',
          fullname: 'Jean-Pierre',
          imgUrl: 'https://robohash.org/768849?set=set1',
          id: '768849',
        },
        txt: 'Yamila appartement was just perfect for us!\r\nThe location in Poble sec is very close to BCN city center and the neighborhood is so quiet without any traffic like everywhere else in the city\r\nThe appartement is very clean, well equipped with very recent furniture, 2 bathrooms, 3 bedrooms, 2 balconies, 1 terrace, large kitchen and lounge.\r\nYamila was a perfect host with us also.\r\nI fully recommend this appartment',
      },
      {
        at: '2013-06-17T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fadce',
          fullname: 'Ove M.',
          imgUrl: 'https://robohash.org/6146923?set=set1',
          id: '6146923',
        },
        txt: 'El piso esta muy guay, en una zona muy bien comunicada y con muchos restaurantes y bares cerca. Lo hemos pasado muy bien en este piso y volveriamos a alquilarlo.',
      },
      {
        at: '2013-07-12T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb078',
          fullname: 'Andrew',
          imgUrl: 'https://robohash.org/6597264?set=set1',
          id: '6597264',
        },
        txt: 'Awesome accommodations! Huge apartment that was obviously recently renovated and well maintained. The building is in a residential (read: non-touristy) part of Spain so if you are looking for a real taste of local culture this is the place to stay. 2 blocks from the subway and we were downtown in just a couple stops. The apartment is in building with a common courtyard (common for the style). The other people that live in the building were very friendly and helpful answering any questions we had. My son was even able to play with the other children (despite the language barrier). Awesome experience -- would definietly rent again.',
      },
      {
        at: '2013-08-06T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbce7',
          fullname: 'Juan Daniel',
          imgUrl: 'https://robohash.org/6259139?set=set1',
          id: '6259139',
        },
        txt: 'Experiencia bastante agradable, puntuales, el piso muy limpio, ordenado y esta genial, muy bien situado, muy recomendable.',
      },
      {
        at: '2013-08-09T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fba44',
          fullname: 'Carey',
          imgUrl: 'https://robohash.org/7317566?set=set1',
          id: '7317566',
        },
        txt: 'The apartment is exactly as pictured. Very spacious, comfortable, and clean with a well equipped kitchen and nice terraces on both levels. The neighborhood is well situated - it is not at all touristy but close to transportation at Plaza España and Poble Sec metro stops so you can easily get to all the places you want to visit. We stayed here for 3 nights with our two children and found it perfect. We were able to walk or take the metro everywhere we wanted to go, but have a quieter place to sleep and relax. There is a park down the street and a supermarket directly across. Xavi met us on arrival and was very nice and helpful throughout our stay. When my husband accidentally left a few things in the apartment, Xavi collected them and met us upon our return to Barcelona a few days later to return them. Thanks, Xavi! It was a great stay in Barcelona and I would definitely recommend the apartment to anyone looking for space and comfort in a close but quieter neighborhood. ',
      },
      {
        at: '2013-08-25T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbfa0',
          fullname: 'Julie',
          imgUrl: 'https://robohash.org/3129321?set=set1',
          id: '3129321',
        },
        txt: "Great flat in a very good location, very close from subway which brings you to wherever you want in a few minutes. Xabi has been really nice and we didn't miss anything in the flat. Thank you",
      },
      {
        at: '2013-09-16T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fae47',
          fullname: 'Ron',
          imgUrl: 'https://robohash.org/8464703?set=set1',
          id: '8464703',
        },
        txt: 'Yamila is a great hostess, the apartment is very comfortable.\r\nVery close to the metro. And a convenient store. A tv was missed, otherwise everything was great.',
      },
      {
        at: '2013-10-27T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fc002',
          fullname: 'Christine',
          imgUrl: 'https://robohash.org/3185553?set=set1',
          id: '3185553',
        },
        txt: 'Appartement conforme aux indications, très propre. Le quartier est calme mais tout de même assez proche de tout (2 stations de métro de la rambla et des plages...). Super Bon séjour !\r\n',
      },
      {
        at: '2013-11-05T05:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb814',
          fullname: 'Jeremie',
          imgUrl: 'https://robohash.org/9083747?set=set1',
          id: '9083747',
        },
        txt: 'Una estancia perfecta, el piso es muy grande y muy bien equipado. La descripción corresponde perfectamente a la casa. 100% recomendable.',
      },
      {
        at: '2014-02-27T05:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb306',
          fullname: 'Kirstin',
          imgUrl: 'https://robohash.org/10268141?set=set1',
          id: '10268141',
        },
        txt: 'Super apartement, clean, spacios, great located and pretty quiet. Yamila is very nice, polite and helpful. I strongly can recommend the apartement. ',
      },
      {
        at: '2014-03-04T05:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbbcc',
          fullname: 'Oliver',
          imgUrl: 'https://robohash.org/3385007?set=set1',
          id: '3385007',
        },
        txt: 'A very nice place and a great host!\r\nThe apartment is exactly as you can see in the pictures, everthing is clean and Yamila is just a call (or e-mail) away if you need help.',
      },
      {
        at: '2014-03-18T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb476',
          fullname: 'Okan',
          imgUrl: 'https://robohash.org/10270886?set=set1',
          id: '10270886',
        },
        txt: 'EVERYTHING WAS GREAT. Yamila is very hospitable, very helpful. You can find everything you need at home.We will rent this House again barcelona 2015 Marathon.',
      },
      {
        at: '2014-03-25T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb510',
          fullname: 'Lisa',
          imgUrl: 'https://robohash.org/13007630?set=set1',
          id: '13007630',
        },
        txt: "Cristina and her friend Yamilia did a wonderful job of making us feel at home and were also very helpful with other miscellaneous necessities (calling us a taxi to take us to the airport on departure).  The duplex was very nice and spacious, clean, charming, outfitted with everything we needed, with comfortable beds and a very nice kitchen (with an induction cooktop!).  The property is older and there was some remodeling noise for a few hours from the neighboring apartment, which we could hear through what seemed to be a shared skylight, but it was very brief and not a concern (unless noise privacy is a very high priority, which it wasn't for us).  We didn't even use the third bedroom with bunk beds, but it would be ideal for a family.  The metro was close enough, and the bakery just downstairs, together with the grocery store literally across the street, were a wonderful convenience.  We went nearly everywhere by metro, and the location was central enough that at the end of the day, if we were too tired to make our way back by metro, an easy cab ride back to the apartment never exceeded 8 euros (which would've been the cost of the metro for all four of us anyway).  Overall, the apartment was a nice, comfortable bargain for family travel - not the most modern, but charming and fully met our needs.",
      },
      {
        at: '2014-04-12T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb5a8',
          fullname: 'Danielle',
          imgUrl: 'https://robohash.org/10549520?set=set1',
          id: '10549520',
        },
        txt: "Appartement trés agréable et trés bien situé à 2 pas d'une station de métro et de la place d'Espagne.\r\nToutes les pièces sont très agréables et les terrasses aussi.\r\nSupermarché en face et excellente boulangerie au pied de l'immeuble.\r\nImmeuble très calme.\r\nPas de cafetière électrique ni d'essoreuse à salade mais l'électroménager est top.\r\nDéco soignée.\r\nMerci, nous avons passé une excellente semaine !  ",
      },
      {
        at: '2014-04-27T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbc22',
          fullname: 'Henrik',
          imgUrl: 'https://robohash.org/7244993?set=set1',
          id: '7244993',
        },
        txt: 'We stayed at Christina´s place for two weeks and were happy with the flat. The location is good: close to metro, and also bakery, convenience store etc is near.\r\nExcellent restaurants also nearby.  ',
      },
      {
        at: '2014-05-01T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb07b',
          fullname: 'Marie-Pierre',
          imgUrl: 'https://robohash.org/5115465?set=set1',
          id: '5115465',
        },
        txt: "Magnifique appartement, très calme dans un quartier sympathique. Boulangerie juste à côté, idéale le matin. Les enfants ont adoré!  Cristina et Yamila toujours à l'écoute par mail ou par tel. Nous gardons un excellent souvenir de ces vacances en famille à Barcelone. Un grand merci à nos hôtes. \r\nMarie-Pierre, Arnaud, Pierre et Benjamin",
      },
      {
        at: '2014-05-05T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbb13',
          fullname: 'Céline',
          imgUrl: 'https://robohash.org/4125966?set=set1',
          id: '4125966',
        },
        txt: 'Espectacular!\r\nEl piso era grande, confortable, limpio, y muy bien equipado, sobre todo en la cocina. Es un piso luminoso con terracitas perfectas para comer fuera, y un silencia muy apreciable durante la noche, una maravilla.\r\nEl piso está super bien situado, hay un supermercado en frente y una panadería muy buena justo al lado, la acogida fue perfecta y la logística (entrega y recogida de la llave...) muy sencilla. Muy recomendable.',
      },
      {
        at: '2014-05-08T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb401',
          fullname: 'Véronique',
          imgUrl: 'https://robohash.org/11540553?set=set1',
          id: '11540553',
        },
        txt: 'Réactive et bon contact téléphonique.',
      },
      {
        at: '2014-06-17T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164faf30',
          fullname: 'Thorsten',
          imgUrl: 'https://robohash.org/9056447?set=set1',
          id: '9056447',
        },
        txt: 'The Hous is great. It´s a super cosy place in a nice neighborhood. You find evrerything you need in the House, plus you got two terraces and a padio.\r\nIt is super located, everything you need is close, Supermarket, Bakery and Restaurants just in front of the Door. Metro station around the corner also the placa espanya Montjuïc a few minutes walk away.\r\nYamila (friend of Christina) is a great host, she was super nice and open for every question we had. She also called us a taxi to take us to the airport at 5! in the morning.\r\nWe will for sure come back and book that place again.\r\nWould totally recommend that House for a great stay in Barcelona.\r\nThank you.\r\n \r\n',
      },
      {
        at: '2014-06-21T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbf72',
          fullname: 'Birgit',
          imgUrl: 'https://robohash.org/16129927?set=set1',
          id: '16129927',
        },
        txt: 'GREAT!!! Christina and Yamila are very hospitable and very helpful. \r\nThe flat was very nice and spacious, clean and outfitted with everything we needed. The flat is super located (metro station, supermarket, bakery, ...).\r\n\r\nWe will come back : )\r\nThank you!',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aab06',
    name: '*CoZy Private Williamsburg Home*',
    type: 'Beachfront',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436394/kscsvxyn0uro9tjhefeb.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437269/u6wxkpazgvqdxiceky9l.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436978/mhqf1tttzqr33ecrrwb2.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436811/ym5nh1anownexsyzgbqq.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436453/ndl8odasqgnyquvsbalp.jpg',
    ],
    price: 225,
    summary:
      '*NO PARTIES OR EVENTS* **Minutes From MANHATTAN / NYC BY TRAIN* 1 BLOCK FROM GRAND ST. First Floor Newly Renovated And Furnished Williamsburg Apartment Duplex  Back yard access. Wood Floors. Wifi. Marble & Granite Bathroom. *NEW-CLEAN* *BAKYARD PATIO* *CABLE TV*',
    capacity: 4,
    amenities: [
      'TV',
      'Cable TV',
      'Internet',
      'Wifi',
      'Air conditioning',
      'Kitchen',
      'Smoking allowed',
      'Hot tub',
      'Buzzer/wireless intercom',
      'Heating',
      'Family/kid friendly',
      'Smoke detector',
      'Carbon monoxide detector',
      'First aid kit',
      'Safety card',
      'Fire extinguisher',
      'Essentials',
      'Shampoo',
      '24-hour check-in',
      'Hangers',
      'Hair dryer',
      'Iron',
      'Laptop friendly workspace',
    ],
    bathrooms: 1,
    bedrooms: 2,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3405e36c59e6164fb9ad',
      fullname: 'Sal',
      location: 'US',
      about: '',
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/217e78d8-bb65-46c5-af28-ecd1939e1945.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/217e78d8-bb65-46c5-af28-ecd1939e1945.jpg?aki_policy=profile_x_medium',
      isSuperhost: false,
      id: '62130666',
    },
    loc: {
      country: 'United States',
      countryCode: 'US',
      city: 'New York',
      address: 'Brooklyn, NY, United States',
      lat: -73.94854,
      lan: 40.70998,
    },
    reviews: [
      {
        at: '2016-03-23T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164facca',
          fullname: 'Franz',
          imgUrl: 'https://robohash.org/3010632?set=set1',
          id: '3010632',
        },
        txt: 'The host canceled this reservation the day before arrival. This is an automated posting.',
      },
      {
        at: '2016-05-09T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164faf76',
          fullname: 'Shanna',
          imgUrl: 'https://robohash.org/23181786?set=set1',
          id: '23181786',
        },
        txt: 'Fantastic place. Clean and convenient to all of Williamsburg. My parents actually stayed here and the host was great to them, checking in all the time and making sure they had everything they needed. ',
      },
      {
        at: '2016-05-15T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb2cc',
          fullname: 'Agustin',
          imgUrl: 'https://robohash.org/60482808?set=set1',
          id: '60482808',
        },
        txt: 'Todo perfecto, ningun problema. Departamento muy lindo en una zona muy buena.',
      },
      {
        at: '2016-05-20T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb2d9',
          fullname: 'Raymond',
          imgUrl: 'https://robohash.org/27629646?set=set1',
          id: '27629646',
        },
        txt: 'everything nice and easy and good neighborhood too.\r\nI enjoyed my trim to NYC.\r\nThanks!',
      },
      {
        at: '2016-05-24T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fac18',
          fullname: 'Robert',
          imgUrl: 'https://robohash.org/5008015?set=set1',
          id: '5008015',
        },
        txt: 'Great apartment and backyard patio in a great location!!\nWalk to anything you could want in Willimsburg or a short subway or uber ride to NYC for everything else. Nicely updated apartment with easy on street parking and wonderful hosts and recommendations. Highly recommend!!',
      },
      {
        at: '2016-06-09T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbe19',
          fullname: 'Jack',
          imgUrl: 'https://robohash.org/75277003?set=set1',
          id: '75277003',
        },
        txt: 'This place was awesome. Huge space in a perfect location close to bars and restaurants etc. The owner was very nice and accommodating. Took me a while to pick out an Air bnb in NYC because they were all too "lived in" this one didnt feel like i was invading somebody\'s home. Kind of like a two story hotel- i loved it. Also great backyard',
      },
      {
        at: '2016-06-11T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fad2e',
          fullname: 'Nick',
          imgUrl: 'https://robohash.org/14272400?set=set1',
          id: '14272400',
        },
        txt: "Everything was wonderful! Sal was very easy to work with and made sure that we had a great stay. We had a great stay; I'll definitely be back soon!",
      },
      {
        at: '2016-07-29T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb6dc',
          fullname: 'Rocio',
          imgUrl: 'https://robohash.org/76415018?set=set1',
          id: '76415018',
        },
        txt: 'neighborhood is pleasant and host was excellent',
      },
      {
        at: '2016-09-12T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbf07',
          fullname: 'Marek',
          imgUrl: 'https://robohash.org/2752452?set=set1',
          id: '2752452',
        },
        txt: 'Great place for NY trip. Subway nearby. The host is on every call, very helpful. There was a plumbing problem during our stay, fixed immidetly by Sal. \nDefinitly can recomend the place',
      },
      {
        at: '2016-09-20T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb092',
          fullname: 'Eric',
          imgUrl: 'https://robohash.org/74173817?set=set1',
          id: '74173817',
        },
        txt: 'The hosting was taken care of by Luis, who was fantastic and went out of his way to make me feel welcome.  He was terrific.  \r\n\r\nNeighborhood was good and the L train was easy to get to and the place was super clean.',
      },
      {
        at: '2016-09-23T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb12b',
          fullname: 'Micheal',
          imgUrl: 'https://robohash.org/51661745?set=set1',
          id: '51661745',
        },
        txt: "The apartment is on the ground floor it's a 2BR-1B with a living room kitchen combo. One bedroom downstairs. It was very comfortable, newly remodeled, modern and Luis is a jewel (he even went so far as to go get us some canoli and sfoglitella from the best Italian bakery in Williamsbug when my Italian wife asked him about them). Fairly close to the L & M subway lines. Maybe 10 minutes to Union Square hub in Manhattan. \r\n\r\nHighly recommended. ",
      },
      {
        at: '2016-09-25T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fae81',
          fullname: 'Carolyn',
          imgUrl: 'https://robohash.org/91512091?set=set1',
          id: '91512091',
        },
        txt: "We had a great stay! The host was very flexible about check-in and check-out time, and made it clear he was available if we needed anything (we didn't.) Location was perfect, 5 minutes to L train into Manhattan, but on a quiet street. Spacious enough to sleep four friends very comfortably (two beds + two futon-style couches). We really enjoyed sitting out on the back patio as well. ",
      },
      {
        at: '2016-10-03T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb40c',
          fullname: 'Stuart',
          imgUrl: 'https://robohash.org/35311290?set=set1',
          id: '35311290',
        },
        txt: 'Sal was most helpful and reafy to help with anything.  The apartment is in a super location close to all Williamsburg smenities and the L line. I would recommrnd jt to anyone and would certainly stay there again if I had the chance.',
      },
      {
        at: '2016-10-06T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb327',
          fullname: 'Martin',
          imgUrl: 'https://robohash.org/12765279?set=set1',
          id: '12765279',
        },
        txt: 'The host was Great! Very helpful, even with my elderly father. My son lives nearby, so I knew it was a great neighborhood! Free bottled water and coffee was nice. Beautiful patio and the apartment was clean, beautifully furnished and so comfortable. I would definitely stay there again!,',
      },
      {
        at: '2016-10-14T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb779',
          fullname: 'Gianna',
          imgUrl: 'https://robohash.org/4143463?set=set1',
          id: '4143463',
        },
        txt: "Really good experience. We didn't spend much time hanging out in the apartment (though the patio was tempting) but it was close to friends, train, and plenty of good food. Will certainly book again!",
      },
      {
        at: '2016-10-23T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb762',
          fullname: 'Lene',
          imgUrl: 'https://robohash.org/12285705?set=set1',
          id: '12285705',
        },
        txt: 'We arrived late at night, but Louis was waiting for us. He even showed us a place to buy dinner, although it was after midnight.\r\nThe neighbourhood is great and you can be in Manhattan in 20 minutes.\r\nThe appartemt was really nice and suited us well (2 adults and 2 teenagers). Louis was only a phone call away if we had questions and he popped by a few times to chek on us.\r\nWould definitely stay again.',
      },
      {
        at: '2016-11-02T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbffb',
          fullname: 'Jacques',
          imgUrl: 'https://robohash.org/51298937?set=set1',
          id: '51298937',
        },
        txt: "Le duplex est parfaitement situé dans Brooklyn, à 5 minutes à pied du métro et du centre de Williamsburg, quartier le plus en vogue de Brooklyn. L'appartment n'est qu'à 15 minutes en métro du cœur de Manhattan.\nNous remercions tout particulièrement Luis pour son accueil et ses conseils.",
      },
      {
        at: '2016-11-05T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb378',
          fullname: 'Erin',
          imgUrl: 'https://robohash.org/5143901?set=set1',
          id: '5143901',
        },
        txt: 'Sal was an excellent host. The apartment was really great and also he was really responsive and accommodating!',
      },
      {
        at: '2016-11-14T05:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbfc7',
          fullname: 'Barry',
          imgUrl: 'https://robohash.org/30950396?set=set1',
          id: '30950396',
        },
        txt: "We had a great time staying here. Host was waiting for us upon arrival. Super friendly guy, real NYer. Apartment was spotless when we arrived and had everything you would need. Truth be told the pictures on the site don't do it justice. Great location walking distance to nice bars, restaurants etc. I'll be staying here next time i'm back in NY for sure. 10/10",
      },
      {
        at: '2016-12-12T05:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb439',
          fullname: 'Adam',
          imgUrl: 'https://robohash.org/48672348?set=set1',
          id: '48672348',
        },
        txt: 'Sal was great! I booked his place to house two trainees coming in to nyc from las vegas for work and he was super helpful with meeting up with them to get the keys to the place. The apartment was great, located in a safe part of williamsburg, very convenient to trains, restaurant and bars! He checked in with the two ladies during their stay to ensure that everything was going well. I would recommend this place to anyone who is looking for a friendly host and a nice place to stay in williamsburg brooklyn! ',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aab07',
    name: 'Newly and comfortable apt',
    type: 'OMG!',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436867/yocip4igdbruuh2grzpf.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437017/gjyzgdjngyrhfrj2loxz.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437330/mmhkmfvg8o3freucyekc.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437025/haliwehueqfkmxo1tv7j.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436978/mhqf1tttzqr33ecrrwb2.jpg',
    ],
    price: 463,
    summary:
      'The comfortable apartment at the heart of busy Tsim Sha Tsui.2minutes walk to the MTR/Subway station.There are many biggest shopping mall around here:K-11,The One,Harbour city ect.',
    capacity: 2,
    amenities: [
      'TV',
      'Cable TV',
      'Internet',
      'Wifi',
      'Air conditioning',
      'Wheelchair accessible',
      'Kitchen',
      'Doorman',
      'Elevator',
      'First aid kit',
      'Essentials',
      'Shampoo',
      'Hair dryer',
      'Iron',
    ],
    bathrooms: 1,
    bedrooms: 0,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3405e36c59e6164fb911',
      fullname: 'Michelle&May',
      location: 'Hong Kong',
      about: '',
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/users/37031267/profile_pic/1441373303/original.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/users/37031267/profile_pic/1441373303/original.jpg?aki_policy=profile_x_medium',
      isSuperhost: false,
      id: '37031267',
    },
    loc: {
      country: 'Hong Kong',
      countryCode: 'HK',
      city: 'Hong Kong',
      address: '香港, 九龍, Hong Kong',
      lat: 114.17545,
      lan: 22.29643,
    },
    reviews: [
      {
        at: '2016-03-26T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbf0f',
          fullname: 'Sindy',
          imgUrl: 'https://robohash.org/43746884?set=set1',
          id: '43746884',
        },
        txt: 'It\'s a very warm and cosy room, where gives me some "home feeling"! There has very convenient transportation around, for going everywhere you want to go in Hong Kong.Most importantly, the owner Michelle is a nice person, who prepared everything of daily use for me. It was a great experience to live here.',
      },
      {
        at: '2016-04-03T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb4da',
          fullname: 'William',
          imgUrl: 'https://robohash.org/24502983?set=set1',
          id: '24502983',
        },
        txt: 'The room is as picture posted, not roomy at all, with compact washroom and kitchen and sofa and everything (but all works well). Although it is not quite spacious, that is how a typical simple Hong Kong apartment for 2 looks like. \r\nThe location of the room is at the heart of TST, easy to get around to everywhere, so convenient to shopping and everything. Michelle is reasonable, helpful and resourceful. She is with much hospitality and send us some local pastry as gift on leaving.',
      },
      {
        at: '2016-04-05T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb903',
          fullname: 'Molinta',
          imgUrl: 'https://robohash.org/64694281?set=set1',
          id: '64694281',
        },
        txt: '這是一段非常完美的民俗體驗｡Michelle非常的和善真誠｡APT在尖沙咀的中心,離最近的地鐵站不到五分鐘｡交通非常的便利,所以購物和遊玩都有很好的體驗｡Michelle非常熱情的為我們介紹了附近一些很好的購物點和回答了我們一些問題｡APT裡的家具陳設都很有家的感覺,這是一個很適合兩個人居住的公寓｡',
      },
      {
        at: '2016-04-11T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbda8',
          fullname: '丹琳',
          imgUrl: 'https://robohash.org/66007064?set=set1',
          id: '66007064',
        },
        txt: '帮老爸老妈订的住宿｡他们第一次去香港 什么都不通 老板担心他们找不到 在地铁站去接应 并且给了很多帮助｡游玩两天要离开的时候得知他俩未去太平山 又主动提出免费帮忙管理行李 建议他们去游玩 晚上两个人开心地回到了深圳｡感谢Michelle的服务 让他们的行程更加完美｡',
      },
      {
        at: '2016-04-11T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb1b4',
          fullname: 'Daniel',
          imgUrl: 'https://robohash.org/10915734?set=set1',
          id: '10915734',
        },
        txt: 'Cozy and clean. Everything was provided, including towels and drinks. A++',
      },
      {
        at: '2016-04-15T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb68f',
          fullname: 'Kally',
          imgUrl: 'https://robohash.org/14973175?set=set1',
          id: '14973175',
        },
        txt: "麻雀虽小,五脏俱全!很干净也很舒适,感觉有如在自己家似的｡下次如果想尝试在九龍岛住还会想要和 Michelle&May 定香港住宿｡谢谢她的亲切友善与小礼物｡(Hope I'm using the appropriate chinese words!)\r\n\r\nIt was a very pleasant first experience with Airbnb with Michelle&May. Before the trip, we were given immediate and friendly response from host and on the day of our arrival, she came to pick us up at the nearest bus stop, where we took a direct cityflyer bus from the Airport as per our host's guidance.\r\n\r\nApt was tidy, clean, cosy and comfortable for our three nights stay. Host even provided snacks/tidbits and several drink mix. There were bedroom slippers, electric kettle, microwave, cups, bowls and utensils, TV, basic toiletries and hairdryer. We were told that the temperature of the aircon could not be adjusted but that did not affect us at all because the temperature was just right throughout our stay during the rainy season period. \r\n\r\nWe were also given a precise mini tour of what was in the apt and how we could use the very convenient sofa bed (which we didn't use in the end because the third person did not stay with us). There's wifi in the apt as well. However, we did experience some connection issues with the TV on one night which we gave up after awhile when we couldn't watch the few channels we wanted to. \r\n\r\nIt's a very quiet building located extremely convenient to the MTR, just 2 minutes walk to the nearest exit (and probably another 5-8 mins walk before you reach the MTR gantry). Right across the building on the ground floor there are two popular cafes and one ice cream shop that I would highly recommend and they need no introduction, just (Hidden by Airbnb) it if you're a fellow cafehopper/dessert person. \r\n\r\nIt is also very near the k11 mall, an art mall that I loved a lot and even managed to check out the Urban Sense art exhibition for free! (Because we snapped a photo of the exhibition board and posted it on our social media accounts but thankfully we went in for free as there were nothing much in there and we were basically out in 15 minutes. But still, do check it out if you happen to be there and follow the instructions to get the free entrance!)\r\n\r\nAt the end of our stay, our host even surprised with a little gift - a box of Jenny Bakery cookies, which we really appreciated a lot :)\r\n\r\nOverall, it's a nice, cosy little apt for 2-3 pax accommodation in Hong Kong and definitely cheaper but value-for-money alternative compared to hotel stay. It was smaller than I had imagined since I have only stayed in hotel during all my trips to HK located on the Hong Kong island but truth be told, I wouldn't mind heading back to book my stay with Michelle&May, probably check out their other listings which are all also located on Kowloon :)",
      },
      {
        at: '2016-04-28T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbc83',
          fullname: 'Phan',
          imgUrl: 'https://robohash.org/30073582?set=set1',
          id: '30073582',
        },
        txt: 'The location is great. 7eleven and Wellcome are just in front of your flat. The french cafe across the street serves tasty breakfasts with reasonable prices. The TST MTR station is just around the corner. The host responded  swiftly and was very helpful.',
      },
      {
        at: '2016-05-03T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb653',
          fullname: 'J',
          imgUrl: 'https://robohash.org/63877505?set=set1',
          id: '63877505',
        },
        txt: "Although the room is small, which is a norm in HK, this place was not claustrophobic at all. The water heater wasn't really working well and the wifi had issue but Michelle went out of her way to solve the problems. Pantry was well stocked with fruits & snacks which was a pleasant touch. \r\n\r\nThanks for being a wonderful host and making our short stay enjoyable. Definitely recommended.",
      },
      {
        at: '2016-05-18T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fae4b',
          fullname: 'Mengdi',
          imgUrl: 'https://robohash.org/68860932?set=set1',
          id: '68860932',
        },
        txt: '所在位置很方便,离地铁站离机场往返的A21大巴都很近,步行两分钟左右｡ 房间很小,浴室更小,不过房东人很好,感觉很斯文,房间也布置得很温馨｡ 虽然4个人也能睡,但是建议还是别超过2个人吧｡',
      },
      {
        at: '2016-05-22T04:00:00.000Z',
        by: {
          _id: '622f3402e36c59e6164fae1d',
          fullname: 'Cat',
          imgUrl: 'https://robohash.org/66711682?set=set1',
          id: '66711682',
        },
        txt: "Great experience! Michelle was a wonderful host, told us what station exit to use, and met us in the rain to walk us to the unit. She assured us we could contact her anytime for additional questions (we didn't end up having any). She even had some basic drinks and snacks available in the fridge. \r\n\r\nThe place is exactly as advertised. A tiny but comfortable place to stay in a great part of town. It's super close to Tsim Sha Tsui Station/East Tsim Sha Tsui Station, which gets you anywhere else you want to go. ",
      },
      {
        at: '2016-06-01T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb701',
          fullname: '小芳',
          imgUrl: 'https://robohash.org/29140869?set=set1',
          id: '29140869',
        },
        txt: 'hk房间都很小,这次住的算大的了｡房东每天都会来做卫生,房间干净整理的宜家风格｡住处离地铁站很近,两分钟就到｡周边步行就可以购物了｡房东人很nice,那天到的时候hk很热,房东已经先把房间的空调打开了｡还准备了零食水果｡离开的时候,还为我们准备了水｡',
      },
      {
        at: '2016-06-03T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb4bf',
          fullname: 'Yan',
          imgUrl: 'https://robohash.org/64015503?set=set1',
          id: '64015503',
        },
        txt: '龙小姐人超级好,到巴士站接我们去公寓,而且还贴心的准备了纯净水小食还有水果｡公寓小巧而干净,地理位置非常好,走路几分钟就是尖东尖沙咀地铁站｡走的时候还送了小熊饼干作为礼物,下次来HK还会选择入住,多谢',
      },
      {
        at: '2016-06-13T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb009',
          fullname: 'Sally',
          imgUrl: 'https://robohash.org/74979918?set=set1',
          id: '74979918',
        },
        txt: 'Chic but clean. Water, snacks prepared. Max two ppl. Very near to MRT. ',
      },
      {
        at: '2016-06-16T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb33d',
          fullname: 'Maggie',
          imgUrl: 'https://robohash.org/26939502?set=set1',
          id: '26939502',
        },
        txt: "Michelle was an awesome host. She was easy to communicate with and always replied to messages promptly. She was there to meet us both times that we stayed with her and went above and beyond to make our stays comfortable. The apartment is smallish but is to be expected in HK. Plus with so much to do in HK, you'll hardly be home anyway! The location is great and close to East TST and TST MTR stations, making it easy to get around to other areas. It is close to the heart of TST with great food and shopping options within walking distance. I would definitely recommend Michelle's apartment!",
      },
      {
        at: '2016-06-17T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164faff9',
          fullname: '萌',
          imgUrl: 'https://robohash.org/76027622?set=set1',
          id: '76027622',
        },
        txt: 'Michelle人超级好,特别幸运可以连着两天都选到这个房子!房子地理位置很好,就在尖沙咀地铁站对面,市中心的位置｡房子很棒的就是干净又舒适,各种设备都很齐全,而且Michelle为我们准备了水果还有一些零食｡很棒的一次住宿,如果有机会,下次还要选这里!',
      },
      {
        at: '2016-06-24T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb719',
          fullname: 'Miaoqi',
          imgUrl: 'https://robohash.org/30519401?set=set1',
          id: '30519401',
        },
        txt: 'Small but cozy apartment:) the host is so nice!! She prepared fruits and tidbits for us which makes us feel like at home:) location is also great! 1min walk to TST MTR with a lot good food nearby.',
      },
      {
        at: '2016-06-26T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb1e6',
          fullname: 'Rosa',
          imgUrl: 'https://robohash.org/74309040?set=set1',
          id: '74309040',
        },
        txt: 'Michelle的回覆很快速,我們抵達時找不到地方,她馬上過來接我們,很親切｡到了房間,她已經將冷氣打開,冰箱也準備了飲料｡雖然我們中間有一天去其他地方玩,沒有住在她那裡,但她把鑰匙交給我們,還讓我們把行李放在房內,隔天回來冰箱裡有好吃的櫻桃,感覺很窩心｡房間靠近地鐵站,很方便｡',
      },
      {
        at: '2016-07-07T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb16f',
          fullname: 'Kaye',
          imgUrl: 'https://robohash.org/69583573?set=set1',
          id: '69583573',
        },
        txt: 'I traveled with my family, 3 adults and a toddler. Our stay with Michelle & May was enjoyable and hassle-free. Michelle assisted us in every way, from fetching us from Hyatt Regency Hotel (since we took the free ride from Airport Express), printing out vouchers, answering all our requests and queries and providing us complimentary fruits and drinks. She also gave my 3-year old daughter Mrs. Fields cookies as an advanced birthday gift! The location is accessible to TST MTR, 7 eleven, restos and shopping centers. We will definitely go back! \n❤',
      },
      {
        at: '2016-07-12T04:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fbac7',
          fullname: 'Lilia',
          imgUrl: 'https://robohash.org/13023286?set=set1',
          id: '13023286',
        },
        txt: 'We had a wonderful stay and Michelle was a great host!',
      },
      {
        at: '2016-07-23T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb404',
          fullname: 'Weiwei',
          imgUrl: 'https://robohash.org/78390668?set=set1',
          id: '78390668',
        },
        txt: '因为看BigBang演唱会所以有缘住进姐姐的房子 虽然只住了一晚但是感觉很温馨 房子虽小 但是五脏俱全 姐姐非常贴心 来地铁口接我们 又教我们怎么坐车去亚洲博览馆 还为我们准备了饮料和水果 房子很干净 床也很舒服 下次来香港旅游还会住姐姐的房子哈',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aab09',
    name: 'Spacious, Sunny Room in Park Slope',
    type: 'Amazing pools',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436380/ez5caladc00mgsssl6ws.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436597/l90ukcpzpv6yvv6vhsnd.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436937/mkbcjfockxezgrvimska.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436266/num9wnb6uzdsvqr6nyuu.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437358/cy8kzj8jeofwkev6tlq9.jpg',
    ],
    price: 85,
    summary:
      'Spacious, sunny room in owner occupied house in the heart of Park Slope. Shared  bathroom with shower/bath tub. Steps away from restaurants/bars and shopping. Within walking distance of major subway lines, Prospect Park, BAM and Barclay Center.',
    capacity: 2,
    amenities: [
      'Internet',
      'Wifi',
      'Air conditioning',
      'Heating',
      'Smoke detector',
      'Carbon monoxide detector',
      'First aid kit',
      'Fire extinguisher',
      'Shampoo',
      'Lock on bedroom door',
      'Hangers',
      'Hair dryer',
      'Iron',
    ],
    bathrooms: 1,
    bedrooms: 1,
    roomType: 'Private room',
    host: {
      _id: '622f3407e36c59e6164fbe18',
      fullname: 'Lisah',
      location: 'New York, New York, United States',
      about: '',
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/users/24253453/profile_pic/1434065920/original.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/users/24253453/profile_pic/1434065920/original.jpg?aki_policy=profile_x_medium',
      isSuperhost: false,
      id: '24253453',
    },
    loc: {
      country: 'United States',
      countryCode: 'US',
      city: 'New York',
      address: 'Brooklyn, NY, United States',
      lat: -73.98057,
      lan: 40.67549,
    },
    reviews: [
      {
        at: '2016-06-24T04:00:00.000Z',
        by: {
          _id: '622f3405e36c59e6164fb74c',
          fullname: 'Francesca',
          imgUrl: 'https://robohash.org/66322625?set=set1',
          id: '66322625',
        },
        txt: "Lisa's house was beautiful and in an incredible location. The room was comfortable and immaculate. Lisa was a very relaxed and gracious host with lots of useful local knowledge.  I recommend her highly.",
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aab0a',
    name: 'Apartamento en casco antiguo',
    type: 'Islands',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436509/rii32aibnhkoeejsohie.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437006/kcsenznwf3pnka6hjwoh.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436801/mcuu1w2188ndpd6hezzt.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436385/sorbz7rdtxacu1ds9vel.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436993/yzxnnw83e9qyas022au4.jpg',
    ],
    price: 55,
    summary:
      'Apartamento en el centro del casco antiguo de Barcelona, a 50 mts del mar, a 1 minuto de Las Ramblas, Borne, Plaza Real y Barceloneta.',
    capacity: 4,
    amenities: [
      'TV',
      'Internet',
      'Wifi',
      'Air conditioning',
      'Kitchen',
      'Paid parking off premises',
      'Buzzer/wireless intercom',
      'Heating',
      'Family/kid friendly',
      'Washer',
      'Dryer',
      'Smoke detector',
      'Carbon monoxide detector',
      'First aid kit',
      'Safety card',
      'Fire extinguisher',
      'Essentials',
      'Shampoo',
      '24-hour check-in',
      'Hangers',
      'Hair dryer',
      'Iron',
      'Laptop friendly workspace',
      'High chair',
      'Crib',
      'Room-darkening shades',
      'Hot water',
      'Bed linens',
      'Extra pillows and blankets',
      'Microwave',
      'Coffee maker',
      'Refrigerator',
      'Dishwasher',
      'Dishes and silverware',
      'Cooking basics',
      'Oven',
      'Stove',
      'Luggage dropoff allowed',
      'Long term stays allowed',
      'Cleaning before checkout',
      'Wide doorway',
      'Step-free access',
      'Wide clearance to bed',
      'Step-free access',
      'Host greets you',
      'Handheld shower head',
    ],
    bathrooms: 1,
    bedrooms: 3,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3404e36c59e6164fb4b4',
      fullname: 'Luis',
      location: 'Barcelona, Catalonia, Spain',
      about: '',
      responseTime: 'within a few hours',
      thumbnailUrl:
        'https://a0.muscache.com/im/users/22076771/profile_pic/1415724202/original.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/users/22076771/profile_pic/1415724202/original.jpg?aki_policy=profile_x_medium',
      isSuperhost: false,
      id: '22076771',
    },
    loc: {
      country: 'Spain',
      countryCode: 'ES',
      city: 'Barcelona',
      address: 'Barcelona, Catalunya, Spain',
      lat: 2.17877,
      lan: 41.37903,
    },
    reviews: [
      {
        at: '2016-06-01T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb3db',
          fullname: 'Tim',
          imgUrl: 'https://robohash.org/65247543?set=set1',
          id: '65247543',
        },
        txt: 'Amazing condo, great host. The perfect air BnB experience ',
      },
      {
        at: '2016-07-31T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbeae',
          fullname: 'Danny',
          imgUrl: 'https://robohash.org/61819754?set=set1',
          id: '61819754',
        },
        txt: "We had a phenomenal time and full experience at this apartment. Luis is a wonderful host, an excellent guy and was overly helpful whenever he could lend a recommendation or helpful hand. The apartment itself is spacious, clean, a great place to live in a perfect location. You're in the heart of the Gothic neighborhood close to culture, architecture, supermarkets and restaurants. We spent two months here and enjoyed every minute of it. ",
      },
      {
        at: '2017-02-19T05:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbe8c',
          fullname: 'Artea',
          imgUrl: 'https://robohash.org/99456012?set=set1',
          id: '99456012',
        },
        txt: 'Muy buen piso, muy recomendable. El piso esta muy bien equipado y es muy acogedor. Bien situado. El dueño Luis es encantador, nos ha ayudado mucho y ha estado disponible todo el rato. Muy atento con nosotras.',
      },
      {
        at: '2017-09-01T04:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb058',
          fullname: 'Andrew',
          imgUrl: 'https://robohash.org/21779441?set=set1',
          id: '21779441',
        },
        txt: 'Great friendly Host in a clean and very spacious apartment. Good location - great stay.',
      },
      {
        at: '2017-10-27T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb4c6',
          fullname: 'Kar',
          imgUrl: 'https://robohash.org/3254062?set=set1',
          id: '3254062',
        },
        txt: 'The Apartment is centrally located.  Its close to Las Ramblas and the beach.  The unit is updated and clean.  The bathroom and the kitchen have a small window opening to the outside.  The windows in the Living room open into the stairwell.  Two bedrooms have a small balcony opening up into the alleyway.  Mariatchi Bar is downstairs.  Its great to get a drink just downstairs but it can get a bit noisy at night on the weekends.  (Because the buildings are so close together, any normal conversation seems loud as the sound bounces off the buildings)  Overall, Luis has an awesome place and I would definitely come back next year when I visit Barcelona.',
      },
      {
        at: '2018-01-13T05:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb3d0',
          fullname: 'Rosario',
          imgUrl: 'https://robohash.org/39147990?set=set1',
          id: '39147990',
        },
        txt: 'Sobre todo q hay mucho ruido de noche y los colchones (Website hidden by Airbnb) calle de noche está muy fea pero no se mete nadie contigo pero si da miedo y hay mucho escándalo y gente bebida en la calle',
      },
      {
        at: '2018-02-06T05:00:00.000Z',
        by: {
          _id: '622f3406e36c59e6164fba64',
          fullname: 'Александр',
          imgUrl: 'https://robohash.org/146599846?set=set1',
          id: '146599846',
        },
        txt: 'The host canceled this reservation 174 days before arrival. This is an automated posting.',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aab0b',
    name: 'Elegant Flat in the Center',
    type: 'Islands',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437330/mmhkmfvg8o3freucyekc.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436453/ndl8odasqgnyquvsbalp.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436402/jtsg0m0t0x0ciyuzvbun.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436306/be2v9wssznxs4hebudb4.jpg',
    ],
    price: 190,
    summary:
      "A part of a famous Poet Orhan Veli Kanık's poem: I am listening to Istanbul, intent, my eyes closed.  The Grand Bazaar is serene and cool,  A hubbub at the hub of the market,  Mosque yards are brimful of pigeons,  At the docks while hammers bang and clang  I am listening to Istanbul, intent, my eyes closed.  In the heart of Istanbul, and a step back from Bosphorus, our flat is ideal for a guest looking for to visit magical corners to listen epic Istanbul.",
    capacity: 2,
    amenities: [
      'TV',
      'Cable TV',
      'Wifi',
      'Kitchen',
      'Paid parking off premises',
      'Smoking allowed',
      'Heating',
      'Family/kid friendly',
      'Washer',
      'Essentials',
      'Shampoo',
      'Hangers',
      'Hair dryer',
      'Iron',
      'Laptop friendly workspace',
      'translation missing: en.hosting_amenity_50',
      'Hot water',
      'Bed linens',
      'Extra pillows and blankets',
      'Refrigerator',
      'Dishwasher',
      'Dishes and silverware',
      'Cooking basics',
      'Oven',
      'Host greets you',
    ],
    bathrooms: 1,
    bedrooms: 1,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3402e36c59e6164facbf',
      fullname: 'Pelin',
      location: 'Çalışıyorum',
      about:
        'I live in Cihangir and love to meet people and share our lively neighbourhood with them.',
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/d741db02-7680-4a52-940e-52dae808cd1f.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/d741db02-7680-4a52-940e-52dae808cd1f.jpg?aki_policy=profile_x_medium',
      isSuperhost: true,
      id: '2769925',
    },
    loc: {
      country: 'Turkey',
      countryCode: 'TR',
      city: 'Istanbul',
      address: 'Istanbul, Istanbul, Turkey',
      lat: 28.98158,
      lan: 41.0314,
    },
    reviews: [
      {
        at: '2017-01-08T05:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fc04e',
          fullname: 'Jorge',
          imgUrl: 'https://robohash.org/29441821?set=set1',
          id: '29441821',
        },
        txt: 'The apartment is as shown in the pictures, it is very clean and in a nice location. The host is superb! ',
      },
      {
        at: '2017-10-16T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbf34',
          fullname: 'Rene',
          imgUrl: 'https://robohash.org/83313833?set=set1',
          id: '83313833',
        },
        txt: 'Pelin’s cosy apartment lies in a quiet street in a vivid part of Istanbul. It has all the amenities to make you feel at home. The bed was good. And the apartment was very clean. T1 to the airport is 5 min walk. Pelin is a wonderful host too.',
      },
      {
        at: '2017-11-17T05:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fb0e7',
          fullname: 'Elizabeth',
          imgUrl: 'https://robohash.org/49307542?set=set1',
          id: '49307542',
        },
        txt: 'Comfy and charming apartment with 20+ foot high ceilings. The flat is in a great neighborhood. There are hip cafes and restaurants, and little markets all around, and a terrific bakery right across the street sells some of the best simit and other small breads in town. It is also easy to walk to the center of Cihangir, Karikoy, or Taxsim. Pelin is an attentive and helpful host. Great stay in my favorite Istanbul neighborhood!',
      },
    ],
    likedByUsers: [],
  })
  await storageService.post(STORAGE_KEY, {
    _id: '622f337a75c7d36e498aab0c',
    name: 'Westin Kaanapali KORVS 2BR OCEAN VIEW',
    type: 'Amazing views',
    imgUrls: [
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663437349/thl7eoxar7dc7kpbahhj.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436236/ctnbnqazpqhotjcauqwp.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436571/fvqbazrysqpymjlhhdqu.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436811/ym5nh1anownexsyzgbqq.jpg',
      'http://res.cloudinary.com/dmtlr2viw/image/upload/v1663436948/vgfxpvmcpd2q40qxtuv3.jpg',
    ],
    price: 799,
    summary:
      'Westin Kaanapali Ocean Resort Villas South timeshare - Pay resort: $14-20/day, stays under 7 night $38/res - Inquire about availability, I review then offer/approve if available :) - READ "The Space" for cleaning/etc AND brief explanation about timeshare reservations - Guaranteed view MUST BE 7 nights (mult weeks avail), check-in Fri/Sat/Sun. More/Less nights @ higher cost - Wheelchair accessible / ADA, call resort directly to ensure U receive. If U need ADA U MUST inform us BEFORE booking.',
    capacity: 8,
    amenities: [
      'TV',
      'Cable TV',
      'Internet',
      'Wifi',
      'Air conditioning',
      'Wheelchair accessible',
      'Pool',
      'Kitchen',
      'Free parking on premises',
      'Doorman',
      'Gym',
      'Elevator',
      'Hot tub',
      'Heating',
      'Family/kid friendly',
      'Suitable for events',
      'Washer',
      'Dryer',
      'Smoke detector',
      'Carbon monoxide detector',
      'First aid kit',
      'Safety card',
      'Fire extinguisher',
      'Essentials',
      'Shampoo',
      '24-hour check-in',
      'Hangers',
      'Hair dryer',
      'Iron',
      'Laptop friendly workspace',
      'Self check-in',
      'Building staff',
      'Private entrance',
      'Room-darkening shades',
      'Hot water',
      'Bed linens',
      'Extra pillows and blankets',
      'Ethernet connection',
      'Microwave',
      'Coffee maker',
      'Refrigerator',
      'Dishwasher',
      'Dishes and silverware',
      'Cooking basics',
      'Oven',
      'Stove',
      'Single level home',
      'BBQ grill',
      'Patio or balcony',
      'Garden or backyard',
      'Luggage dropoff allowed',
      'Long term stays allowed',
      'Wide hallway clearance',
      'Step-free access',
      'Wide doorway',
      'Flat path to front door',
      'Well-lit path to entrance',
      'Disabled parking spot',
      'Step-free access',
      'Wide doorway',
      'Wide clearance to bed',
      'Step-free access',
      'Wide doorway',
      'Step-free access',
      'Wide entryway',
      'Waterfront',
      'Beachfront',
    ],
    bathrooms: 2,
    bedrooms: 2,
    roomType: 'Entire home/apt',
    host: {
      _id: '622f3403e36c59e6164faf93',
      fullname: 'Patty And Beckett',
      location: 'Eureka, California, United States',
      about: 'Adventurous couple loves to travel :)',
      responseTime: 'within an hour',
      thumbnailUrl:
        'https://a0.muscache.com/im/pictures/542dba0c-eb1b-4ab3-85f3-94d3cc8f87a4.jpg?aki_policy=profile_small',
      pictureUrl:
        'https://a0.muscache.com/im/pictures/542dba0c-eb1b-4ab3-85f3-94d3cc8f87a4.jpg?aki_policy=profile_x_medium',
      isSuperhost: true,
      id: '36133410',
    },
    loc: {
      country: 'United States',
      countryCode: 'US',
      city: 'Maui',
      address: 'Lahaina, HI, United States',
      lat: -156.69171,
      lan: 20.936890000000002,
    },
    reviews: [
      {
        at: '2016-12-31T05:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb43d',
          fullname: 'Darren',
          imgUrl: 'https://robohash.org/48633690?set=set1',
          id: '48633690',
        },
        txt: "Wonderful hotel in a great location. Very family friendly and responsive.  We have traveled much through our life and always enjoy a hotel room that feels more day-to-day livable and  offers more of a home away from home feeling.   If you're looking for more than just a hotel room this is a great choice.",
      },
      {
        at: '2017-04-01T04:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb506',
          fullname: 'Charles',
          imgUrl: 'https://robohash.org/90247377?set=set1',
          id: '90247377',
        },
        txt: 'The beach and snorkeling directly out from the resort are fabulous!  We saw more sea turtles in front of the resort than on snorkeling tours.',
      },
      {
        at: '2017-12-30T05:00:00.000Z',
        by: {
          _id: '622f3404e36c59e6164fb32c',
          fullname: 'Kerrin (Kerri)',
          imgUrl: 'https://robohash.org/33758490?set=set1',
          id: '33758490',
        },
        txt: 'Great location, excellent property, fun vacation!',
      },
      {
        at: '2018-03-31T04:00:00.000Z',
        by: {
          _id: '622f3407e36c59e6164fbf6d',
          fullname: 'Stacy',
          imgUrl: 'https://robohash.org/63107049?set=set1',
          id: '63107049',
        },
        txt: 'We were very happy with our stay.  The place is a great location on Maui with awesome snorkeling right out in front. We also enjoyed the pools and restaurants on the property.',
      },
      {
        at: '2019-02-23T05:00:00.000Z',
        by: {
          _id: '622f3403e36c59e6164fafc0',
          fullname: 'Kyle',
          imgUrl: 'https://robohash.org/101675353?set=set1',
          id: '101675353',
        },
        txt: 'Lovely space! Cozy, clean with everything you need to relax and settle in quick. Very safe for kids and great resources to explore the surrounding area. Walking distance to the lodge and shuttle which is great!',
      },
    ],
    likedByUsers: [],
  })
}

// async function _createStays_old() {
//   await storageService.post(STORAGE_KEY, {
//     _id: '10006546',
//     name: "Gil's Amazing Private Island",
//     type: 'Island',
//     imgUrls: [
//       'https://images.unsplash.com/photo-1589814976706-04cd504d0c71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
//       'https://images.unsplash.com/photo-1466098672325-c9ddda4b7975?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
//       'https://i.ytimg.com/vi/jz2mL0ortEE/maxresdefault.jpg',
//       'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?cs=srgb&dl=pexels-vecislavas-popa-1571460.jpg&fm=jpg',
//       'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
//     ],
//     price: 555.0,
//     summary:
//       'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
//     capacity: 8,
//     amenities: [
//       'TV',
//       'Wifi',
//       'Kitchen',
//       'Smoking allowed',
//       'Pets allowed',
//       'Cooking basics',
//     ],
//     labels: ['Trending', 'Play', 'Adapted'],
//     host: {
//       _id: 'u101',
//       fullname: 'Mister Javascript',
//       imgUrl: 'https://robohash.org/O8V.png?set=set2&size=150x150',
//     },
//     loc: {
//       country: 'Portugal',
//       countryCode: 'PT',
//       city: 'Porto',
//       address: '17 Kombo st',
//       lat: -8.61308,
//       lng: 41.1413,
//     },
//     reviews: [
//       {
//         id: 'madeId',
//         txt: 'The place of Emin is great and amidst of fruit trees. In a small village close to Düzce! Emin is very helpfull and the place is really cozy and has everything!',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Sanne',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'We had a great time staying here. If you are fine with a simple accommodation without luxury the you will love it. Don’t expect a hotel room 😉',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Ulrich',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'friendly hosting, peaceful environment.. surely will come back for more',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Levent Sami',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'It was a very nice stay.. The place is clean.. The owner of the property was Emin.. Very nice and keen on your stay and your requirements.. I rate the property 5 stars.. Thank you Emin',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Samuel J. Lackson',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Emin is great and so is his place, really great location, his directions were super helpful and the house itself was better than the pictures. Highly recommend.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sven',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Landscape and the nature is beautiful.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sanjeev Sharma',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//     ],
//     likedByUsers: ['mini-user'], // for user-wishlist : use $in
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: '1000623423',
//     name: 'Yaron Charming Villa',
//     type: 'House',
//     imgUrls: [
//       'https://images.unsplash.com/photo-1462530260150-162092dbf011?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1086&q=80',
//       'https://images.unsplash.com/photo-1589459072535-550f4fae08d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
//       'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/priors-crescent-living-room-haus-interiors-show-home-1602462623.jpg?crop=0.668xw:1.00xh;0.0731xw,0&resize=640:*',
//       'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/interior-design-trends-2022-home-libraries-1653410954.jpg',
//       'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
//     ],
//     price: 130.0,
//     summary:
//       'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
//     capacity: 8,
//     amenities: [
//       'TV',
//       'Wifi',
//       'Kitchen',
//       'Smoking allowed',
//       'Pets allowed',
//       'Cooking basics',
//     ],
//     labels: ['Trending', 'Play', 'Tropical'],
//     host: {
//       _id: 'u101',
//       fullname: 'Gambit ',
//       imgUrl: 'https://robohash.org/E99.png?set=set2&size=150x150',
//     },
//     loc: {
//       country: 'Portugal',
//       countryCode: 'PT',
//       city: 'Porto',
//       address: '17 Kombo st',
//       lat: -8.61308,
//       lng: 41.1413,
//     },
//     reviews: [
//       {
//         id: 'madeId',
//         txt: 'The place of Emin is great and amidst of fruit trees. In a small village close to Düzce! Emin is very helpfull and the place is really cozy and has everything!',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Sanne',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'We had a great time staying here. If you are fine with a simple accommodation without luxury the you will love it. Don’t expect a hotel room 😉',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Ulrich',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'friendly hosting, peaceful environment.. surely will come back for more',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Levent Sami',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'It was a very nice stay.. The place is clean.. The owner of the property was Emin.. Very nice and keen on your stay and your requirements.. I rate the property 5 stars.. Thank you Emin',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Samuel J. Lackson',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Emin is great and so is his place, really great location, his directions were super helpful and the house itself was better than the pictures. Highly recommend.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sven',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Landscape and the nature is beautiful.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sanjeev Sharma',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//     ],
//     likedByUsers: ['mini-user'], // for user-wishlist : use $in
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: '10006521346',
//     name: "Muki's Duplex",
//     type: 'House',
//     imgUrls: [
//       'https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
//       'https://images.unsplash.com/photo-1621045081424-97aa08903f76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
//       'https://media.designcafe.com/wp-content/uploads/2021/11/22204726/living-room-designs-indian-style-middle-class.jpg',
//       'https://adorable-home.com/wp-content/uploads/2016/10/Interior-Design-Style-Modern-defined.jpg',
//       'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
//     ],
//     price: 120.0,
//     summary:
//       'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
//     capacity: 8,
//     amenities: [
//       'TV',
//       'Wifi',
//       'Kitchen',
//       'Smoking allowed',
//       'Pets allowed',
//       'Cooking basics',
//     ],
//     labels: ['Top of the world', 'Play', 'Adapted'],
//     host: {
//       _id: 'u101',
//       fullname: 'Lebron James',
//       imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//     },
//     loc: {
//       country: 'Portugal',
//       countryCode: 'PT',
//       city: 'Porto',
//       address: '17 Kombo st',
//       lat: -8.61308,
//       lng: 41.1413,
//     },
//     reviews: [
//       {
//         id: 'madeId',
//         txt: 'The place of Emin is great and amidst of fruit trees. In a small village close to Düzce! Emin is very helpfull and the place is really cozy and has everything!',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Sanne',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'We had a great time staying here. If you are fine with a simple accommodation without luxury the you will love it. Don’t expect a hotel room 😉',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Ulrich',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'friendly hosting, peaceful environment.. surely will come back for more',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Levent Sami',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'It was a very nice stay.. The place is clean.. The owner of the property was Emin.. Very nice and keen on your stay and your requirements.. I rate the property 5 stars.. Thank you Emin',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Samuel J. Lackson',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Emin is great and so is his place, really great location, his directions were super helpful and the house itself was better than the pictures. Highly recommend.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sven',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Landscape and the nature is beautiful.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sanjeev Sharma',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//     ],
//     likedByUsers: ['mini-user'], // for user-wishlist : use $in
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: '1000623423',
//     name: 'Mister JavaScript Tent',
//     type: 'House',
//     imgUrls: [
//       'https://images.unsplash.com/photo-1612031737124-28aeae3f2863?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
//       'https://images.unsplash.com/photo-1617104611622-d5f245d317f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1184&q=80',
//       'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/edyta-and-co-layout-1549663065.jpg?crop=0.4445333333333333xw:1xh;center,top&resize=480:*',
//       'https://images.unsplash.com/photo-1615874694520-474822394e73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://images.unsplash.com/photo-1616593918824-4fef16054381?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
//     ],
//     price: 380.0,
//     summary:
//       'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
//     capacity: 8,
//     amenities: [
//       'TV',
//       'Wifi',
//       'Kitchen',
//       'Smoking allowed',
//       'Pets allowed',
//       'Cooking basics',
//     ],
//     labels: ['Top of the world', 'Play', 'New'],
//     host: {
//       _id: 'u101',
//       fullname: 'Miss Lucy',
//       imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//     },
//     loc: {
//       country: 'Israel',
//       countryCode: 'IL',
//       city: 'Tel Aviv',
//       address: '17 Allenbi st',
//       lat: -8.61308,
//       lng: 41.1413,
//     },
//     reviews: [
//       {
//         id: 'madeId',
//         txt: 'The place of Emin is great and amidst of fruit trees. In a small village close to Düzce! Emin is very helpfull and the place is really cozy and has everything!',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Sanne',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'We had a great time staying here. If you are fine with a simple accommodation without luxury the you will love it. Don’t expect a hotel room 😉',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Ulrich',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'friendly hosting, peaceful environment.. surely will come back for more',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Levent Sami',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'It was a very nice stay.. The place is clean.. The owner of the property was Emin.. Very nice and keen on your stay and your requirements.. I rate the property 5 stars.. Thank you Emin',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Samuel J. Lackson',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Emin is great and so is his place, really great location, his directions were super helpful and the house itself was better than the pictures. Highly recommend.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sven',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Landscape and the nature is beautiful.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sanjeev Sharma',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//     ],
//     likedByUsers: ['mini-user'], // for user-wishlist : use $in
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: '1000623423',
//     name: "Optimus Prime's Secret Galaxy",
//     type: 'House',
//     imgUrls: [
//       'https://images.unsplash.com/photo-1574643156929-51fa098b0394?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
//       'https://images.unsplash.com/photo-1618220252344-8ec99ec624b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
//       'https://images.unsplash.com/photo-1481277542470-605612bd2d61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjJ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://images.unsplash.com/photo-1600494448850-6013c64ba722?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjN8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://images.unsplash.com/photo-1616132205093-3158f3a65fb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzB8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
//     ],
//     price: 830.0,
//     summary:
//       'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
//     capacity: 8,
//     amenities: [
//       'TV',
//       'Wifi',
//       'Kitchen',
//       'Smoking allowed',
//       'Pets allowed',
//       'Cooking basics',
//     ],
//     labels: ['Top of the world', 'New'],
//     host: {
//       _id: 'u101',
//       fullname: 'Aviv Ketter',
//       imgUrl: 'https://robohash.org/E99.png?set=set2&size=150x150',
//     },
//     loc: {
//       country: 'Portugal',
//       countryCode: 'PT',
//       city: 'Porto',
//       address: '17 Kombo st',
//       lat: -8.61308,
//       lng: 41.1413,
//     },
//     reviews: [
//       {
//         id: 'madeId',
//         txt: 'The place of Emin is great and amidst of fruit trees. In a small village close to Düzce! Emin is very helpfull and the place is really cozy and has everything!',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Sanne',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'We had a great time staying here. If you are fine with a simple accommodation without luxury the you will love it. Don’t expect a hotel room 😉',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Ulrich',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'friendly hosting, peaceful environment.. surely will come back for more',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Levent Sami',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'It was a very nice stay.. The place is clean.. The owner of the property was Emin.. Very nice and keen on your stay and your requirements.. I rate the property 5 stars.. Thank you Emin',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Samuel J. Lackson',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Emin is great and so is his place, really great location, his directions were super helpful and the house itself was better than the pictures. Highly recommend.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sven',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Landscape and the nature is beautiful.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sanjeev Sharma',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//     ],
//     likedByUsers: ['mini-user'], // for user-wishlist : use $in
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: '1000623423',
//     name: "Lionel Messi's Apartment",
//     type: 'House',
//     imgUrls: [
//       'https://images.unsplash.com/photo-1562368764-651b0bba96af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTN8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://images.unsplash.com/photo-1533477579100-e9a9fdf5be71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://plus.unsplash.com/premium_photo-1661730410021-66154e6f7ca5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTV8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://images.unsplash.com/photo-1613545325268-9265e1609167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://images.unsplash.com/photo-1606074280798-2dabb75ce10c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjB8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
//     ],
//     price: 130.0,
//     summary:
//       'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
//     capacity: 8,
//     amenities: [
//       'TV',
//       'Wifi',
//       'Kitchen',
//       'Smoking allowed',
//       'Pets allowed',
//       'Cooking basics',
//     ],
//     labels: ['Top of the world', 'Trending', 'Tropical'],
//     host: {
//       _id: 'u101',
//       fullname: 'Bar Ben Shimol',
//       imgUrl: 'https://robohash.org/O8V.png?set=set2&size=150x150',
//     },
//     loc: {
//       country: 'Spain',
//       countryCode: 'SP',
//       city: 'Barcelona',
//       address: '17 Messi st',
//       lat: -8.61308,
//       lng: 41.1413,
//     },
//     reviews: [
//       {
//         id: 'madeId',
//         txt: 'The place of Emin is great and amidst of fruit trees. In a small village close to Düzce! Emin is very helpfull and the place is really cozy and has everything!',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Sanne',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'We had a great time staying here. If you are fine with a simple accommodation without luxury the you will love it. Don’t expect a hotel room 😉',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Ulrich',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'friendly hosting, peaceful environment.. surely will come back for more',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Levent Sami',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'It was a very nice stay.. The place is clean.. The owner of the property was Emin.. Very nice and keen on your stay and your requirements.. I rate the property 5 stars.. Thank you Emin',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Samuel J. Lackson',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Emin is great and so is his place, really great location, his directions were super helpful and the house itself was better than the pictures. Highly recommend.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sven',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Landscape and the nature is beautiful.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sanjeev Sharma',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//     ],
//     likedByUsers: ['mini-user'], // for user-wishlist : use $in
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: '1000623423',
//     name: "Doda's Private Apartment (with movie theater!)",
//     type: 'House',
//     imgUrls: [
//       'https://images.unsplash.com/photo-1634822929331-ee4dc2c97fc4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDF8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://images.unsplash.com/photo-1616593871468-2a9452218369?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://images.unsplash.com/photo-1597665863042-47e00964d899?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDZ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://plus.unsplash.com/premium_photo-1661721905869-03b9aacd68a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDl8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://images.unsplash.com/photo-1560449752-3fd4bdbe7df0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTR8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
//     ],
//     price: 130.0,
//     summary:
//       'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
//     capacity: 8,
//     amenities: [
//       'TV',
//       'Wifi',
//       'Kitchen',
//       'Smoking allowed',
//       'Pets allowed',
//       'Cooking basics',
//     ],
//     labels: ['Top of the world', 'Play', 'Tropical'],
//     host: {
//       _id: 'u101',
//       fullname: 'Gil Wallach',
//       imgUrl: 'https://robohash.org/E99.png?set=set2&size=150x150',
//     },
//     loc: {
//       country: 'Brazil',
//       countryCode: 'BR',
//       city: 'Morro de Sao Paolo',
//       address: '17 Kombo st',
//       lat: -8.61308,
//       lng: 41.1413,
//     },
//     reviews: [
//       {
//         id: 'madeId',
//         txt: 'The place of Emin is great and amidst of fruit trees. In a small village close to Düzce! Emin is very helpfull and the place is really cozy and has everything!',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Sanne',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'We had a great time staying here. If you are fine with a simple accommodation without luxury the you will love it. Don’t expect a hotel room 😉',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Ulrich',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'friendly hosting, peaceful environment.. surely will come back for more',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Levent Sami',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'It was a very nice stay.. The place is clean.. The owner of the property was Emin.. Very nice and keen on your stay and your requirements.. I rate the property 5 stars.. Thank you Emin',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Samuel J. Lackson',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Emin is great and so is his place, really great location, his directions were super helpful and the house itself was better than the pictures. Highly recommend.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sven',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Landscape and the nature is beautiful.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sanjeev Sharma',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//     ],
//     likedByUsers: ['mini-user'], // for user-wishlist : use $in
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: '1000623423',
//     name: "Phistuk's (Adults Only) House",
//     type: 'House',
//     imgUrls: [
//       'https://images.unsplash.com/photo-1611216212569-d739dbe9ed40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://plus.unsplash.com/premium_photo-1661698951100-064e4ae229fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
//       'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
//       'https://plus.unsplash.com/premium_photo-1668780538108-a097b10a918a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//     ],
//     price: 130.0,
//     summary:
//       'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
//     capacity: 8,
//     amenities: [
//       'TV',
//       'Wifi',
//       'Kitchen',
//       'Smoking allowed',
//       'Pets allowed',
//       'Cooking basics',
//     ],
//     labels: ['Top of the world', 'Play', 'Tropical'],
//     host: {
//       _id: 'u101',
//       fullname: 'Raz Israeli',
//       imgUrl: 'https://robohash.org/O8V.png?set=set2&size=150x150',
//     },
//     loc: {
//       country: 'Portugal',
//       countryCode: 'PT',
//       city: 'Porto',
//       address: '17 Kombo st',
//       lat: -8.61308,
//       lng: 41.1413,
//     },
//     reviews: [
//       {
//         id: 'madeId',
//         txt: 'The place of Emin is great and amidst of fruit trees. In a small village close to Düzce! Emin is very helpfull and the place is really cozy and has everything!',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Sanne',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'We had a great time staying here. If you are fine with a simple accommodation without luxury the you will love it. Don’t expect a hotel room 😉',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Ulrich',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'friendly hosting, peaceful environment.. surely will come back for more',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Levent Sami',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'It was a very nice stay.. The place is clean.. The owner of the property was Emin.. Very nice and keen on your stay and your requirements.. I rate the property 5 stars.. Thank you Emin',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Samuel J. Lackson',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Emin is great and so is his place, really great location, his directions were super helpful and the house itself was better than the pictures. Highly recommend.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sven',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Landscape and the nature is beautiful.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sanjeev Sharma',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//     ],
//     likedByUsers: ['mini-user'], // for user-wishlist : use $in
//   })
//   await storageService.post(STORAGE_KEY, {
//     _id: '1000623423',
//     name: 'Havana Cabana Banana',
//     type: 'House',
//     imgUrls: [
//       'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://images.unsplash.com/photo-1602872030219-ad2b9a54315c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
//       'https://a0.muscache.com/im/pictures/e83e702f-ef49-40fb-8fa0-6512d7e26e9b.jpg?aki_policy=large',
//       'https://images.unsplash.com/photo-1607809714110-e34f71c7b2ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//     ],
//     price: 130.0,
//     summary:
//       'Fantastic duplex apartment with three bedrooms, located in the historic area of Porto, Ribeira (Cube)...',
//     capacity: 8,
//     amenities: [
//       'TV',
//       'Wifi',
//       'Kitchen',
//       'Smoking allowed',
//       'Pets allowed',
//       'Cooking basics',
//     ],
//     labels: ['Top of the world', 'Play', 'Tropical'],
//     host: {
//       _id: 'u101',
//       fullname: 'Leo Messi',
//       imgUrl: 'https://robohash.org/E99.png?set=set2&size=150x150',
//     },
//     loc: {
//       country: 'Portugal',
//       countryCode: 'PT',
//       city: 'Porto',
//       address: '17 Kombo st',
//       lat: -8.61308,
//       lng: 41.1413,
//     },
//     reviews: [
//       {
//         id: 'madeId',
//         txt: 'The place of Emin is great and amidst of fruit trees. In a small village close to Düzce! Emin is very helpfull and the place is really cozy and has everything!',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Sanne',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'We had a great time staying here. If you are fine with a simple accommodation without luxury the you will love it. Don’t expect a hotel room 😉',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Ulrich',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'friendly hosting, peaceful environment.. surely will come back for more',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Levent Sami',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'It was a very nice stay.. The place is clean.. The owner of the property was Emin.. Very nice and keen on your stay and your requirements.. I rate the property 5 stars.. Thank you Emin',
//         rate: 4,
//         by: {
//           _id: 'u101',
//           fullname: 'Samuel J. Lackson',
//           imgUrl: 'https://robohash.org/8N2.png?set=set1&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Emin is great and so is his place, really great location, his directions were super helpful and the house itself was better than the pictures. Highly recommend.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sven',
//           imgUrl: 'https://robohash.org/KBA.png?set=set3&size=150x150',
//         },
//       },
//       {
//         id: 'madeId',
//         txt: 'Landscape and the nature is beautiful.',
//         rate: 4,
//         by: {
//           _id: 'u102',
//           fullname: 'Sanjeev Sharma',
//           imgUrl: 'https://robohash.org/XUR.png?set=set2&size=150x150',
//         },
//       },
//     ],
//     likedByUsers: ['mini-user'], // for user-wishlist : use $in
//   })
// }

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
