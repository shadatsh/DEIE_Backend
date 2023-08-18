const catchAsyncError = require("../middlewares/catchAsyncError");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

//Create New Order - api/v1/order/new
exports.newOrder = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const { user, userName, orderItems, lecturerId } = req.body;

  const order = await Order.create({
    orderItems,
    user: user,
    lecturerId,
    userName,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//Get Single Order - api/v1/order/:id
exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get Loggedin User Orders - /api/v1/myorders
exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.lecturerOrders = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const orders = await Order.find({
    lecturerId: id,
    orderStatus: "Pending",
  }).populate("user");

  res.status(200).json({
    success: true,
    orders: orders,
  });
});

exports.acceptORrejectOrder = catchAsyncError(async (req, res, next) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, {
    orderStatus: status,
  });

  res.status(200).json({
    success: true,
  });
});

exports.handoverOrder = catchAsyncError(async (req, res, next) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, {
    orderStatus: status,
  });

  res.status(200).json({
    success: true,
  });
});

//Admin: Get All Orders - /api/v1/orders
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find().populate("user", "username").exec();
  res.status(200).json({
    success: true,
    orders,
  });
});

// Function to get pending orders
exports.getPendingOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ orderStatus: "accepted" }).exec();

  res.status(200).json({
    success: true,
    orders,
  });
});

// Function to get return orders
exports.getReturnOrders = catchAsyncError(async (req, res, next) => {
  const orders = await Order.find({ orderStatus: "Handover" }).exec();

  res.status(200).json({
    success: true,
    orders,
  });
});

//Admin: Update Order / Order Status - api/v1/order/:id
exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus == "Delivered") {
    return next(new ErrorHandler("Order has been already delivered!", 400));
  }
  //Updating the product stock of each order item
  order.orderItems.forEach(async (orderItem) => {
    await updateStock(orderItem.product, orderItem.quantity);
  });

  order.orderStatus = req.body.orderStatus;
  order.deliveredAt = Date.now();
  await order.save();

  res.status(200).json({
    success: true,
  });
});

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);
  product.stock = product.stock - quantity;
  product.save({ validateBeforeSave: false });
}

//Admin: Delete Order - api/v1/order/:id
exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(
      new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404)
    );
  }

  await order.deleteOne({ _id: order });
  res.status(200).json({
    success: true,
  });
});
