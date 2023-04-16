const { PurchaseOrder, ShoppingCart } = require('../db');

// Obtener todas las órdenes de compra
async function getAllPurchaseOrders(req, res, next) {
  try {
    const purchaseOrders = await PurchaseOrder.findAll({
      include: ShoppingCart,
    });
    res.json(purchaseOrders);
  } catch (error) {
    next(error);
  }
}

// Crear una nueva orden de compra
async function createPurchaseOrder(req, res, next) {
  try {
    const { shoppingCartId, totalPrice } = req.body;
    const newPurchaseOrder = await PurchaseOrder.create({ totalPrice });
    const shoppingCart = await ShoppingCart.findByPk(shoppingCartId);
    await shoppingCart.setPurchaseOrder(newPurchaseOrder);
    res.json(newPurchaseOrder);
  } catch (error) {
    next(error);
  }
}

// Actualizar el estado de una orden de compra
async function updatePurchaseOrder(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const purchaseOrder = await PurchaseOrder.findByPk(id);
    purchaseOrder.status = status;
    await purchaseOrder.save();
    res.json(purchaseOrder);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllPurchaseOrders,
  createPurchaseOrder,
  updatePurchaseOrder,
};
