import 'express-async-errors';
import '@/db/connect';
import cookieParser from 'cookie-parser';
import { errorHandler } from './middlewares/error';
import express, {ErrorRequestHandler} from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import authorRouter from './routes/author';
import { fileParser } from './middlewares/file';

dotenv.config(); 
const app = express();

// app.use((req, res, next) => {
//   req.on("data", (chunk) => {
//     req.body = JSON.parse(chunk);
//     next();
//   });
// });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

app.use("/auth", authRouter);
app.use("/author", authorRouter);



app.post("/test",fileParser, (req, res) => {
  console.log(req.files);
  console.log(req.body);
  res.json({});
});

app.use(errorHandler)

const port = process.env.PORT || 8989;

app.listen(port, () => {
  console.log(`The apps is running on ${port}`);
});

