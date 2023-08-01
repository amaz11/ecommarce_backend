const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 16,
    },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, minlength: 11, required: true, unique: true },
    role: { type: String, enum: ["admin", "user"], default: "admin" },
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);

module.exports = userModel;
