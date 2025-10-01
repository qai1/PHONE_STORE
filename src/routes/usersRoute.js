import express from "express";
import {
  addUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
} from "../handlers/usersHandler.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsersHandler);
userRouter.get("/users/:id", getUserByIdHandler);
userRouter.post("/users", addUserHandler);
userRouter.put("/users/:id", updateUserHandler);

export default userRouter;
