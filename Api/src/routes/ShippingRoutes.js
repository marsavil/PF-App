const express = require('express')
const router = express.Router();
const { addData, getAllData } = require ("../controlers/Shipping")
router.use(express.json());

router.post("/adddata", addData);
router.get("/alldata", getAllData);


module.exports = router;