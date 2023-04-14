const express = require('express');
const router = express.Router();
const {isAuthenticatedUser, authorizeRoles } = require('../middlewares/authenticate');

const { newOrder,
        getSingleOrder,
        myOrders,
        getAllOrders,
        updateOrder,
        deleteOrder
    } = require('../controllers/orderController');



router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
router.route('/myorders').get(isAuthenticatedUser, myOrders );

//Admin Routes
router.route('/orders').get(isAuthenticatedUser,authorizeRoles('admin'), getAllOrders);
router.route('/order/:id').put(isAuthenticatedUser,authorizeRoles('admin'), updateOrder);
router.route('/order/:id').delete(isAuthenticatedUser,authorizeRoles('admin'), deleteOrder);



module.exports = router;