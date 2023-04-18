const { ShoppingCart,Product , User } = require("../db");

module.exports = {

   addProduct: async function(product, userId){
      const user = await User.findByPk(userId);
      const product = await Product.findByPk(product.id);
      const shoppingCart = await ShoppingCart.create({
         quantity: 1,
         price: product.price,
         userId: user.id,
         productId: product.id
      })
      return shoppingCart;
   }
}