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
      
      await user.getShoppingCart().then((cart) => {

        fetchedCart = cart;
        cart
          .getProducts({ where: { id: productId } })
          .then((products) => {
            if (products.length) {
              newQuantity = products[0].ShoppingCart_Products.quantity + 1;
              return products[0];
            }
            return Product.findByPk(productId);
          })
          .then((product) => {
            return fetchedCart.addProduct(product, {
              through: { quantity: newQuantity },
            });
          });
      });
    } catch (error) {
      return error;
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
