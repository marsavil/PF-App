const { ShippingAddress, User } = require("../db");

module.exports = {
  addData: async(req, res) => {
    
    const { street, number, postCode, apartment, floor, city, state, country, email } = req.body
    try {
      const address = await ShippingAddress.create({
        street,
        number,
        postCode,
        apartment,
        floor,
        city,
        state,
        country
      })
      const user = await User.findOne({
        where: {
          email
        }
      })
      if(!user) return res.status(400).send({message: `${email} no es un email válido`})
      address.UserId = user.id
      user.ShippingAddressId = address.id
      address.save()
      user.save()
      return res.status(200).send({ message: "Información agregada correctamente"})
    } catch (error) {
      res.status(400).send("oops")
    }
    },
    getAllData: async (req, res) => {
      const { email } = req.body
      try {
        if(email){
          const user = await User.findOne({
            where: {
              email
            }
          })
          const addresses = await ShippingAddress.findAll({
            where: {
              UserId: user.id
            }
          })
          return res.status(201).send(addresses)
        }else{
          const addresses = await ShippingAddress.findAll()
          return res.status(200).send(addresses)
        }
        
      } catch (error) {
        res.status(400).send("oops")
      }
    }
  }