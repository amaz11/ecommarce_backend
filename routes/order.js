const orderModel = require("../model/order");
const router = require("express").Router();
const roleMiddleware = require("../middleware/roleMiddleware");

router.route("/post/order").post(async (req, res) => {
  try {
    const order = await orderModel.create(req.body);
    return res.status(201).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "something wrong" });
  }
});
router.route("/get/order").get(roleMiddleware, async (req, res) => {
  try {
    const order = await orderModel.find();
    return res.status(200).json({ data: order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Somthing Wrong" });
  }
});
module.exports = router;
