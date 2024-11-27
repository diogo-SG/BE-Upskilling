import express from "express";
import userRouter from "./routes/userRoutes";

const PORT = process.env.PORT || 8080;

const app = express();

/* -------------------------------------------------------------------------- */
/*                                   Routes                                   */
/* -------------------------------------------------------------------------- */
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

/* ------------------------------ Start server ------------------------------ */
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
