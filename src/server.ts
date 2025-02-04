import express from "express";
import cookieParser from "cookie-parser";

import AuthRouter from "./routes/auth/AuthRoutes";
import logger from "./middleware/logger";
import errorHandler from "./middleware/errorHandler";
import catchAllError from "./middleware/catchAllError";
import dataSource, { dataSourceOpts } from "./database/dataSource";
import ApiRouter from "./routes/api/ApiRoutes";
import { createDatabase } from "typeorm-extension";

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

(async () => {
  await createDatabase({
    options: dataSourceOpts,
  });
  console.log(`Database ${dataSourceOpts.database} created or already exists`);

  await dataSource.initialize();

  console.log("Database connection established");
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
})().catch((error) => {
  console.error("Error connecting to the database: ", error);
});
