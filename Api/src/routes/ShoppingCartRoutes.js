const {
    addProductToShoppingCart, getShoppingCart, deleteProductFromShoppingCart,
} = require("../controlers/ShoppingCart");
const express = require("express");
const router = express.Router();
router.use(express.json());
//
router.post("/add", async(req, res) =>{
    const { productId, userId} = req.body
    try {
      const addProduct = await addProductToShoppingCart(productId, userId);
     
        return   res.status(200).json(addProduct)
      
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    } 
})
router.post("/del", async(req, res) => {
    const {productId, userId} = req.body
    try {
        const deleteProduct = deleteProductFromShoppingCart(productId, userId);
        return res.status(200).json("Product successfully deleted from shopping cart")
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
}) 
router.get("/user/:userId", async(req, res) =>{
    const {userId} = req.params
    try {  
        getCart = await getShoppingCart(userId)
        res.status(200).json(getCart)
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})

//
module.exports = router; 