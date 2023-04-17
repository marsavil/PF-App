const express = require("express");
const router = express.Router();
const {
  getAllPurchaseOrders,
  createPurchaseOrder,
  updatePurchaseOrder,
} = require("../controlers/purchaseOder");

// Obtener todas las órdenes de compra
router.get("/", getAllPurchaseOrders);

// Crear una nueva orden de compra
router.post("/", createPurchaseOrder);

// Actualizar el estado de una orden de compra
router.put("/:id", updatePurchaseOrder);

module.exports = router;
