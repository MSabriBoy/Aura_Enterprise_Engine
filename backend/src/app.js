const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const inventoryRoutes = require(
  "./routes/inventoryRoutes"
);

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_, res) => {
  res.status(200).json({
    status: "ok",
    service: "Aura Enterprise Engine",
  });
});

app.use(
  "/api/inventory",
  inventoryRoutes
);

app.use(errorHandler);

module.exports = app;