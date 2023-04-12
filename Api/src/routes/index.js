const {Router} = require("express");

const products = require("./ProductsRoutes")
const user= require("./UserRoutes")
const router = Router()


router.use("/products", products)
router.use("/user", user)

module.exports = router;