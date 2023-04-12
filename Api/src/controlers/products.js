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
          category: e.category
        };
        return obj;
      });
      await Product.bulkCreate(filtrado);
    }
  },

  listProducts: async function () {
    const dbProducts = await Product.findAll();
    //console.log(dbProducts)
    return dbProducts;
  },
  productsByCategory: async function (category){
    const filtered = await Product.findAll({
      where:{
        category
      }
    })
    return filtered
  }
};
