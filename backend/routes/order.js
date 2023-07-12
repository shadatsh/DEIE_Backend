const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

const { newOrder,
    getSingleOrder,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder,
    lecturerOrders,
    acceptORrejectOrder
} = require('../controllers/orderController');



router.route('/order/new').post(newOrder);
router.route('/order/:id').get(getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser, myOrders);
router.route('/lecturerOrders/:id').get(lecturerOrders);
router.route('/acceptorreject/:id').post(acceptORrejectOrder);

//Admin Routes
router.route('/orders').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);
router.route('/order/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder);
router.route('/order/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);



module.exports = router;