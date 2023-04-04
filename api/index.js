import express from "express";
import postRoute from "./routes/posts.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client - Copy/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});
// app.use("/", (req, res) => {
//   res.send("App ready");
// });
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

// const port = process.env.PORT || 8000;

app.listen(8800, () => {
  console.log("connected");
});
