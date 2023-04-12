const { listProducts } = require("../controlers/products");
const express = require("express");
const router = express.Router();
router.use(express.json());

router.get("/", (req, res) => {
  try {
    const listAllProducts = listProducts();
    console.log(listProducts);
    res.status(200).json(listAllProducts);
  } catch (error) {
    res.status(400).send("no ok");
  }
});

module.exports = router;
