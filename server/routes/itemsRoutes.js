const express = require('express');
const { create, getItems, decrementItem, deleteItem, getCartItems, addItemToCart, clearItems } = require('../controller/itemsController');

const router = express.Router();

router.post('/cart',create);
router.get('/items',getItems);
router.get('/cart', getCartItems);
router.post('/cart/:pid/decrement', decrementItem); 
router.delete('/cart/:pid', deleteItem);
router.post('/cart/add', addItemToCart);
router.delete("/items", clearItems);

module.exports = router;