const { PurchaseOrder, ShippingAddress, orderId } = require("../db");

module.exports = {

  createShippingAddress:async (orderId, street, number, postCode, apartment, floor, city, state, country) =>{
      
      const order = await PurchaseOrder.findOne({
        where:{
          id: orderId
        }
      })
      console.log(order)
      order.createShippingAddress({
        street,
        number, 
        postCode,
        apartment,
        floor,
        city, 
        state,
        country,
      })
      
  },
  getShippingAddressFromOrder:async(orderId) => {
    const order = await PurchaseOrder.findOne({
      where:{
        id: orderId
      }
    })
    const address = order.getShippingAddress()
    return address
  },

    
}