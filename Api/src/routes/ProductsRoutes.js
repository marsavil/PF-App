const { listProducts, productsByCategory, productsByBrand } = require("../controlers/products");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", async(req, res) => {
  try {
    const listAllProducts = await listProducts();
    res.status(200).json(listAllProducts);
  } catch (error) {
    res.status(400).json("no ok");
  }
});
router.get("/category", async(req, res) => {
  const {category} = req.query
  try {
    const filteredProducts = await productsByCategory(category);
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(400).send({error: error.message});
  }
});
router.get("/brand", async(req, res) => {
  const {brand} = req.query
  try {
    const filteredProducts = await productsByBrand(brand);
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(400).json("no ok");
  }
});

module.exports = router;
