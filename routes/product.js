const productModel = require("../model/product");

const router = require("express").Router();
const authorization = require("../middleware/authorization");
const roleMiddleware = require("../middleware/roleMiddleware");

router
  .route("/post/product")
  .post(authorization, roleMiddleware, async (req, res) => {
    try {
      const product = await productModel.create(req.body);
      return res.status(201).json(product);
    } catch (error) {
      return res.status(200).json({ error: error });
    }
  });

router.route("/get/product").get(authorization, async (req, res) => {
  try {
    const product = await productModel.find();
    return res.status(200).json(product);
  } catch (error) {
    return res.status(200).json({ error: "Somthing Wrong" });
  }
});
module.exports = router;
