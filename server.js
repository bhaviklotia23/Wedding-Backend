const express = require("express");
const app = express();
const { connectDb } = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const user = require("./modules/user/user.routes");
const content = require("./modules/content/content.routes");
const errorMiddleware = require("./middleware/errorMiddleware");
const wedding = require("./modules/register_wedding/wedding.route");
const contact = require("./modules/contact/contact.route");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(cors());

app.use(errorMiddleware);

app.get("/", (req, res) => {
  return res.status(200).json({
    status: 200,
    message: "Hello Api",
  });
});
app.use("/api/v1", user);
app.use("/api/v1", content);
app.use("/api/v1", wedding);
app.use("/api/v1", contact);

const startServer = async () => {
  try {
    connectDb(process.env.MONGO_URL);
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  } catch (error) {
    console.log(error);
  }
};

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

startServer();
