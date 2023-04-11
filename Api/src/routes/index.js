const {Router} = require("express");

const products = require ("./ProductsRoutes")
const router = Router()

router.use("/products", products)

module.exports = router;