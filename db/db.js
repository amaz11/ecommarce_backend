const { default: mongoose } = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.DATABASE)
    .then(() => {
      console.log("DB Connected SuccsesFull");
    })
    .catch((err) => {
      console.log("DB Connect Fail: ", err);
    });
};

module.exports = connectDB;
