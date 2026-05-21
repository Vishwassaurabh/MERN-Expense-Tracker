const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

//! connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("mongodb are connected"))
  .catch((error) => console.log(error));

//! Cors config
const corsOptions = {
  origin: ["https://saurabh-expense-tracker-website.netlify.app"],
};
app.use(cors(corsOptions));

//! Middlewares
app.use(express.json());    //pass incoming json

//! Routes
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", transactionRouter);

// ! Error
app.use(errorHandler);

//Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is runing ${PORT}`);
});
