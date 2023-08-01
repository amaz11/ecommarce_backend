const productModelRN = require("../model/productRN");

module.exports = {
  createrProduct: async (req, res) => {
    const newProduct = new productModelRN(req.body);
    try {
      await newProduct.save();
      res.status(201).json("product create Succesfully");
    } catch (error) {
      res.status(500).json("Something went wrong");
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const data = await productModelRN.find().sort({ createdAt: -1 });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Something went wrong");
    }
  },
  getProduct: async (req, res) => {
    try {
      const data = await productModelRN.findById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Something went wrong");
    }
  },
  searchProduct: async (req, res) => {
    try {
      const data = await productModelRN.aggregate([
        {
          $search: {
            index: "furniture",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json("Something went wrong");
    }
  },
};
