import express from "express";
import { testConnection } from "./config/db.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/usersRoute.js";
import productRouter from "./routes/productRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 3000;

app.use(authRouter);
app.use(userRouter);
app.use(productRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server runnin at http://localhost:${PORT}`);
  testConnection();
});
