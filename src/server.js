import express from "express";
import { testConnection } from "./config/db.js";
import userRouter from "./routes/usersRoute.js";
import productRouter from "./routes/productRoute.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());

const PORT = 3000;

app.use(userRouter);
app.use(productRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server runnin at http://localhost:${PORT}`);
  testConnection();
});
