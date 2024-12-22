import '@/db/connect';
import express, {ErrorRequestHandler} from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth";

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

app.use("/auth", authRouter);

app.post("/test", (req, res) => {
  console.log(req.body);
  res.json({});
});

app.use(((error,req,res,next)=>{
  res.status(500).json({error:error.message})
}) as ErrorRequestHandler )

const port = process.env.PORT || 8989;

app.listen(port, () => {
  console.log(`The apps is running on ${port}`);
});

