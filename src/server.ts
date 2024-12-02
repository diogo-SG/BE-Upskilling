import express from "express";
import userRouter from "./routes/users/userRoutes";
import orderRouter from "./routes/orders/orderRoutes";
import logger from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";
import catchAllError from "./middleware/catchAllError";
import dbClient from "./database/config";

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

// Quick and dirty test route to create tables if they don't exist
// THESE ARE NOW CREATED VIA MIGRATION, but leaving this code here for now
// app.get("/api/createTables", async (req, res) => {
//   try {
//     await dbClient.query(
//       `CREATE TABLE "user" (id SERIAL PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), username VARCHAR(255))`
//     );
//     await dbClient.query(
//       `CREATE TABLE "order" (id SERIAL PRIMARY KEY, user_id INTEGER, product_id INTEGER, quantity INTEGER)`
//     );
//     res.send("Tables created");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Something went wrong");
//   }
// });

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

/* ------------------------------ Start server ------------------------------ */
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
