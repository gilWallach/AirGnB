import { emitToUser } from '..services/socketService.js'

async function addOrder(req, res) {
  const { loggedinUser } = req
  try {
    const order = req.body
    order.buyer = loggedinUser
    let addedOrder = await orderService.add(order)
    addedOrder.createdAt = ObjectId(addedOrder._id).getTimestamp()

    //Socket
    await emitToUser({
      type: 'order-added',
      data: addedOrder,
      userId: addedOrder.host._id,
    })
    res.json(addedOrder)
  } catch (err) {
    res.status(500).send({ err: 'Failed to add order' })
  }
}
