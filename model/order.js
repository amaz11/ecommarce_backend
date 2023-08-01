const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;

const orderSchema = new Schema(
  {
    product_name: {
      type: String,
    },
    quatity: { type: String, required: true },
    price: { type: String, required: true },
    total_price: { type: String },
    order_id: { type: String },
    customer_name: {
      type: String,
    },
  },
  { timestamps: true }
);

const orderModel = model("Order", orderSchema);

module.exports = orderModel;
