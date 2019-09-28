require("dotenv").config();
const PORT = process.env.PORT || 4000;
const express = require("express");
const cors = require("cors");

const AuthenticationRouter = require("./routes/authentication.js");
const RequestRouter = require("./routes/requests.js");
const CommentRouter = require("./routes/comments.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/accounts", AuthenticationRouter);
app.use("/requests", RequestRouter);
app.use("/comments", CommentRouter);

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    console.log({ error });
  }

  res.status(error.status || 500).json({ error: error.message });
  next();
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
