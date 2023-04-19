const mercadopago = require("mercadopago");
const { Product }= require("../db");


mercadopago.configure({ access_token: process.env.MERCADOPAGO_KEY });

const payment = async (req, res) => {
  const products = req.body.items;
  const id = req.body.cartId
  const preference = await {
    items: products.map((p) => {

      const update = async () => {
        const prod = await Product.findOne({
        where :{
          id: p.id
        }
      })
      const quant = prod.stock - p.ShoppingCart_Products.quantity
      prod.stock = quant
      prod.save()
    }
    update()
      return {
        id: p.id,
        title: p.brand + " " + p.category,
        currency_id: "ARS",
        picture_url: p.image,
        description: p.name,
        category_id: p.category,
        quantity: p.ShoppingCart_Products.quantity,
        unit_price: p.price,
      };
    }),
    back_urls: {
      success: "http://localhost:3000/payment",
      //success: "/payment"
      failure: "",
      pending: "",
    },
    auto_return: "approved",
    binary_mode: true,
  };
  
  
  mercadopago.preferences
    .create(preference)
    .then((response) => res.status(200).send({ response }))
    .catch((error) => res.status(400).send({ error: error.message }));
};

module.exports = payment;
