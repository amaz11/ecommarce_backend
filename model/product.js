const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: { type: String, required: true },
    image: { type: String },
    quatity: { type: String, minlength: 2 },
    price: { type: String, minlength: 2 },
  },
  { timestamps: true }
);

const productModel = model("Product", productSchema);

module.exports = productModel;
