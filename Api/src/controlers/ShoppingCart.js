const { ShoppingCart,Product , User } = require("../db");


module.exports = {

   addProductToShoppingCart: async function(productId, userId){
      try {
        let newQuantity = 1;
        let fetchedCart;
        const user = await User.findOne({
        where: {
          id: userId
        },
        });
        user.getShoppingCart().then(cart => {
          fetchedCart = cart;
          cart.getProducts({where: {id: productId}}).then(
              products => {
                if (products.length){
                  newQuantity = products[0].ShoppingCart_Products.quantity + 1;
                  return products[0]
                }
                return Product.findByPk(productId);
              }
          ).then(product => {
              return fetchedCart.addProduct(product, {through: {quantity: newQuantity}})
  
          })
        })
      } catch (error) {
        return error
        
      }
      
   },
   deleteProductFromShoppingCart:async function(productId, userId){
      try {
         const user = await User.findOne({
         where: {
         id: userId
         },})
         user.getShoppingCart().then(
         cart => {
            return cart.getProducts({where: {id: productId}})}
         ).then (products => {
            return products[0].destroy()
          })
      } catch (error) {
         return error
      }
      
      
   },

   getShoppingCart: async function(userId){
      try {
         const user = await User.findOne({
         where: {
           id: userId
         },
         })
         const cart = await user.getShoppingCart()
         const cartProducts = await cart.getProducts()
         let totalPrice = 0

         for(let product of cartProducts){
            totalPrice += product.ShoppingCart_Products.quantity * product.price
         }
         return {cartProducts , totalPrice}
      } catch (error) {
         return error
      }
      
   }
}