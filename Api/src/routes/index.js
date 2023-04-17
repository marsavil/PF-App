const {Router} = require("express");

const products = require("./ProductsRoutes")
const user = require("./UserRoutes")
const shipping = require("./ShippingRoutes")
const shoppingCart = require("./ShoppingCartRoutes")
const router = Router()


router.use("/products", products)
router.use("/user", user)
router.use("/shipping", shipping)
router.use("/cart", shoppingCart )

module.exports = router;