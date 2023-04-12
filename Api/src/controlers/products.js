const api = require("../jsonProducts.js");
const { Product } = require("../db");
module.exports = {
  addProducts: async function () {
    const allProducts = await Product.count();
    if (allProducts < 1) {
      let obj = {};
      let filtrado = api.map((e) => {
        obj = {
          name: e.name,
          price: e.price,
          image: e.image,
          brand: e.brand,
          description: e.description,
          stock: e.stock,
        };
        return obj;
      });
      await Product.bulkCreate(filtrado);
    }
  },

  listProducts: {
    async function() {
      const dbProducts = await Product.findAll();
      const allProductsArray = await dbProducts.map((product) => {
        return {
          name: product.name,
          price: product.price,
          image: product.image,
          brand: product.brand,
          description: product.description,
          stock: product.stock,
        };
      });
      console.log(allProductsArray);
      return allProductsArray;
    },
  },
};
