import * as userService from "../services/userService.js";

export const getAllUserHandler = async (req, res, next) => {
  try {
    const response = await userService.getAllUser();

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await userService.getUserById(id);
    if (!response) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserHandler = async (req, res, next) => {
  try {
    const response = await userService.createUser(req.body);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await userService.updateUser(id, req.body);

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
