const {Product, User } = require("../db");

module.exports = {
  addProductToShoppingCart: async function (productId, userId) {
    try {
      let newQuantity = 1;
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });

    /*const cart = await user.getShoppingCart()
      console.log(cart)
      const cartProducts = await cart.getProducts({ where: { id: productId } })
      if (cartProducts.length) {
        newQuantity = cartProducts[0].ShoppingCart_Products.quantity + 1;
        await cart.addProduct(cartProducts[0], {
          through: { quantity: newQuantity },});
      }
      else{
        const productToAdd = await Product.findByPk(productId)
        console.log(productToAdd)
        await cart.addProduct(productToAdd, {
          through: { quantity: newQuantity },});
      }*/
      
      await user.getShoppingCart().then(async(cart) => {
        fetchedCart = cart;
        await cart.getProducts({ where: { id: productId } })
          .then((products) =>  {
            if (products.length) {
              newQuantity = products[0].ShoppingCart_Products.quantity + 1;
              return products[0];
            }
            return Product.findByPk(productId);
          })
          .then(async (product) => {
            return  await fetchedCart.addProduct(product, {
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
    
      /*const cartProducts = await cart.getProducts({ where: { id: productId } });
      cartProducts[0].destroy()*/
      await user.getShoppingCart().then((cart) => {
          return cart.destroy({where: {productId: productId}})
        })
        
    } catch (error) {
      return error;
    }
  },

  getShoppingCart: async function (userId) {
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      const cart = await user.getShoppingCart();
      const cartProducts = await cart.getProducts();
      let totalPrice = 0;

      for (let product of cartProducts) {
        totalPrice += product.ShoppingCart_Products.quantity * product.price;
      }
      return { cartProducts, totalPrice };
    } catch (error) {
      return error;
    }
  },
};
