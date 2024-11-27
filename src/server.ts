import express from "express";
import userRouter from "./routes/userRoutes";
import logger from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";

const PORT = process.env.PORT || 8080;

const app = express();

// Enable body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

/* -------------------------------------------------------------------------- */
/*                                 Middleware                                 */
/* -------------------------------------------------------------------------- */

// Enable logging
app.use(logger);

// Error handling
app.use(errorHandler);

/* ------------------------------ Start server ------------------------------ */
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
