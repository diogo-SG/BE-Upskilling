import express from "express";

const PORT = process.env.PORT || 8080;

const app = express();

/* ------------------------------ Set up routes ----------------------------- */

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

/* ------------------------------ Start server ------------------------------ */
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
