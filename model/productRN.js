const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: { type: String, required: true },
    supplier: { type: String, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
    product_location: { type: String, required: true },
  },
  { timestamps: true }
);

const productModelRN = model("ProductRn", productSchema);

module.exports = productModelRN;
