import { storageService } from './async-storage.service.js'
const LABEL_STORAGE_KEY = 'label'

export const labelService = {
  query,
  save,
  remove,
}

async function query() {
  return await storageService.query(LABEL_STORAGE_KEY)
}

async function remove(labelId) {
  await storageService.remove(LABEL_STORAGE_KEY, labelId)
}

async function save(label) {
  var savedLabel
  if (label._id) {
    savedLabel = await storageService.put(LABEL_STORAGE_KEY, label)
  } else {
    // Later, owner is set by the backend
    label.owner = userService.getLoggedinUser()
    savedLabel = await storageService.post(LABEL_STORAGE_KEY, label)
  }
  return savedLabel
}

// LOAD TEST LABELS
// ;(async () => {
//   await storageService.post(LABEL_STORAGE_KEY, {
//     name: 'new',
//     displayName: 'New',
//     imageUrl:
//       'https://a0.muscache.com/pictures/c0fa9598-4e37-40f3-b734-4bd0e2377add.jpg',
//   }),
//     await storageService.post(LABEL_STORAGE_KEY, {
//       name: 'top-of-the-world',
//       displayName: 'Top of the world',
//       imageUrl:
//         'https://a0.muscache.com/pictures/248f85bf-e35e-4dc3-a9a1-e1dbff9a3db4.jpg',
//     }),
//     await storageService.post(LABEL_STORAGE_KEY, {
//       name: 'trending',
//       displayName: 'Trending ',
//       imageUrl:
//         'https://a0.muscache.com/pictures/3726d94b-534a-42b8-bca0-a0304d912260.jpg',
//     }),
//     await storageService.post(LABEL_STORAGE_KEY, {
//       name: 'adapted',
//       displayName: 'Adapted',
//       imageUrl:
//         'https://a0.muscache.com/pictures/e22b0816-f0f3-42a0-a5db-e0f1fa93292b.jpg',
//     }),
//     await storageService.post(LABEL_STORAGE_KEY, {
//       name: 'play',
//       displayName: 'Play',
//       imageUrl:
//         'https://a0.muscache.com/pictures/f0c5ca0f-5aa0-4fe5-b38d-654264bacddf.jpg',
//     }),
//     await storageService.post(LABEL_STORAGE_KEY, {
//       name: 'hanoks',
//       displayName: 'Hanoks',
//       imageUrl:
//         'https://a0.muscache.com/pictures/51f5cf64-5821-400c-8033-8a10c7787d69.jpg',
//     }),
//     await storageService.post(LABEL_STORAGE_KEY, {
//       name: 'private-rooms',
//       displayName: 'Private rooms',
//       imageUrl:
//         'https://a0.muscache.com/pictures/eb7ba4c0-ea38-4cbb-9db6-bdcc8baad585.jpg',
//     }),
//     await storageService.post(LABEL_STORAGE_KEY, {
//       name: 'omg',
//       displayName: 'OMG!',
//       imageUrl:
//         'https://a0.muscache.com/pictures/c5a4f6fc-c92c-4ae8-87dd-57f1ff1b89a6.jpg',
//     })
// })()
