const router = require("express").Router();
const {
  getAllProducts,
  createrProduct,
  getProduct,
  searchProduct,
} = require("../controller/ProductRn");

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.get("/search/:key", searchProduct);
router.post("/", createrProduct);

module.exports = router;
