const express = require('express');
const { addItemToDetails, clearDetails, reduceQuantity, getFinalDetails, deleteFromDetails } = require('../controller/detailsController');

const router = express.Router();

router.post('/add-to-details', addItemToDetails);
router.delete('/remove-details', clearDetails);
router.post('/decrement-details', reduceQuantity);
router.get('/pay-info', getFinalDetails);
router.post('/delete-from-details', deleteFromDetails);

module.exports = router;