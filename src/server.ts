import express from "express";
import cookieParser from "cookie-parser";

import AuthRouter from "./routes/auth/AuthRoutes";
import logger from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";
import catchAllError from "./middleware/catchAllError";
import dataSource from "./database/dataSource";
import ApiRouter from "./routes/api/ApiRoutes";

const PORT = process.env.PORT || 8080;

const app = express();

/* -------------------------------------------------------------------------- */
/*                                 Middleware                                 */
/* -------------------------------------------------------------------------- */

// Enable body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// Enable logging
app.use(logger);

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.use("/auth", AuthRouter);
app.use("/api", ApiRouter);

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
