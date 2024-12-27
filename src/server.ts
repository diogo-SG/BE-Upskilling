import express from "express";
import userRouter from "./routes/users/UserRoutes";
import orderRouter from "./routes/orders/OrderRoutes";
import productRouter from "./routes/products/ProductRoutes";
import logger from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";
import catchAllError from "./middleware/catchAllError";
import dataSource from "./database/dataSource";

const PORT = process.env.PORT || 8080;

const app = express();

// Enable body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

/* -------------------------------------------------------------------------- */
/*                                 Middleware                                 */
/* -------------------------------------------------------------------------- */

// Enable logging
app.use(logger);

// Error handling
app.use(catchAllError);
app.use(errorHandler);

/* -------------------------------------------------------------------------- */
/*                       Start db connection and server                       */
/* -------------------------------------------------------------------------- */

dataSource
  .initialize()
  .then(() => {
    console.log("Database connection established");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database: ", error);
  });
