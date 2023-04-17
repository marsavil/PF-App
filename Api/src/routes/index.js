const {Router} = require("express");

const products = require("./ProductsRoutes")
const user = require("./UserRoutes")
const shipping = require("./ShippingRoutes")
const router = Router()


router.use("/products", products)
router.use("/user", user)
router.use("/shipping", shipping)

module.exports = router;