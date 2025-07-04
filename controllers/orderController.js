const Order = require("../models/orderModel");
const factoryHandler = require("./factoryHandler");

/*                 *******                 */
exports.getAllOrders = factoryHandler.getAll(Order);
exports.getOrder = factoryHandler.getOne(Order);
exports.updateOrder = factoryHandler.updateOne(Order);
exports.deleteOrder = factoryHandler.deleteOne(Order);

/*                 *******                 */
exports.processOrder = async (session) => {
  const { metadata } = session;
  const order = await Order.create({
    user: metadata.user_id,
    products: JSON.parse(metadata.products),
    status: "paid",
  });
  console.log("Order created:", order._id);
};
