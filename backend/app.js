const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use("/uploads", express.static("uploads"));

app.use(express.json());
app.use(cookieParser());
app.use(cors());

const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const adminRoutes = require("./routes/admin");
const formDataRoutes = require("./routes/formDataRoutes");
const laboratoryRoutes = require("./routes/laboratoryRoutes");

app.use("/api/v1/", products);
app.use("/api/v1/", auth);
app.use("/api/v1/", order);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/formdata", formDataRoutes);
app.use("/formData/:labId", formDataRoutes);

app.use("/api", laboratoryRoutes);

app.use(errorMiddleware);

module.exports = app;
