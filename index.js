require("dotenv").config();
const PORT = process.env.PORT || 4000;
const express = require("express");

const AuthenticationRouter = require("./routes/authentication.js");

const app = express();

app.use(express.json());
app.use("/accounts", AuthenticationRouter);

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }

  res.status(500).json({ message: error.message });
  next();
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
