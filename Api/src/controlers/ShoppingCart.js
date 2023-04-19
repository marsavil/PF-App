const { Product, User } = require("../db");

module.exports = {
  addProductToShoppingCart: async function (productId, userId) {
    try {
      let newQuantity = 1;
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      const product =  await Product.findByPk(productId)
      
      const productStock = product.stock
      console.log(productStock)
      const cart = await user.getShoppingCart()
      const cartProducts = await cart.getProducts({ where: { id: productId } })
      if (productStock > 0){
        
        if (cartProducts.length) { 
          if (cartProducts[0].ShoppingCart_Products.quantity < productStock){
            newQuantity = cartProducts[0].ShoppingCart_Products.quantity + 1;

            const productAdded = cart.addProduct(cartProducts[0], {
              through: { quantity: newQuantity },
            
            });
            return "Product added"
          }
          else{
            throw new Error
          }

        }
        const product = Product.findByPk(productId).then((product) => {
          cart.addProduct(product, {
            through: { quantity: newQuantity },
          })})
          return "Product added"
        
      
    }} catch (Error) {
      return "Stock limit reached" 
    }  
  },
  deleteProductFromShoppingCart: async function (productId, userId) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
 
      const cart = await user.getShoppingCart()
      console.log(cart)
      const cartProducts = await cart.getProducts({ where: { id: productId } });
      await cartProducts[0].ShoppingCart_Products.destroy()
     
      return "Product Deleted"

        
    } catch (error) {
      return error;
    }
  },

  getShoppingCart: async function(userId) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      const cart = await user.getShoppingCart();
      const cartProducts = await cart.getProducts();
      let totalPrice = 0;
      let totalQuantity = 0;
      for (let product of cartProducts) {
        totalPrice += product.ShoppingCart_Products.quantity * product.price;
      }
      for (let product of cartProducts) {
        totalQuantity += product.ShoppingCart_Products.quantity
      }
      return { cartProducts, totalPrice, totalQuantity };
    } catch (error) {
      return error;
    }
  },
};
