import express from "express";
import cookieParser from "cookie-parser";
import UserRouter from "./routes/users/UserRoutes";
import OrderRouter from "./routes/orders/OrderRoutes";
import ProductRouter from "./routes/products/ProductRoutes";
import AuthRouter from "./routes/auth/AuthRoutes";
import logger from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";
import catchAllError from "./middleware/catchAllError";
import dataSource from "./database/dataSource";
import deserializeUser from "./middleware/deserializeUser";

const PORT = process.env.PORT || 8080;

const app = express();

/* -------------------------------------------------------------------------- */
/*                                 Middleware                                 */
/* -------------------------------------------------------------------------- */

// Enable body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(deserializeUser);

// Enable logging
app.use(logger);

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
app.use("/auth", AuthRouter);
app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);
app.use("/api/products", ProductRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// Error handling
app.use(errorHandler);
app.use(catchAllError);
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
