import express from "express";
import {
  getAllUserHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUserHandler);
userRouter.get("/users/:id", getUserByIdHandler);
userRouter.post("/users", createUserHandler);
userRouter.put("/users/:id", updateUserHandler);
userRouter.delete("/users/:id", deleteUserHandler);

export default userRouter;
