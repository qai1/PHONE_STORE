import * as userService from "../services/userService.js";

export const registerHandler = async (req, res, next) => {
  try {
    const response = await AuthService.register();

    res.status(201).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
