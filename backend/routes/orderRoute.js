const express = require('express')
const router = express.Router()
const { isAuthenticatedUser, authoriseRole} = require('../middleware/auth');
const { newOrder, getSingleOrder, myOrders, updateOrder, getAllOrders, deleteOrder } = require('../controllers/orderController');

router.route('/order/new').post(isAuthenticatedUser, newOrder)

router.route('/order/:id').get(isAuthenticatedUser, authoriseRole('admin'), getSingleOrder)

router.route('/orders/me').get(isAuthenticatedUser, myOrders)
 
router.route('/admin/orders').get(isAuthenticatedUser, authoriseRole('admin'), getAllOrders)

router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authoriseRole('admin'), updateOrder)
    .delete(isAuthenticatedUser, authoriseRole('admin'), deleteOrder)

module.exports = router;