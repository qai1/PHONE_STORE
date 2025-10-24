import { pool } from "../config/db.js";

export const getAllUsersHandler = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, fullname, username, email, role, phone_number, age, address FROM users"
    );

    res.status(200).json({
      status: "success",
      data: users,
      message: "Get all users succesfully",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [users] = await pool.query(
      "SELECT id, fullname, username, email, role, phone_number, age, address FROM users WHERE id = ? ",
      [id]
    );

    if (users.length === 0) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: users[0],
      message: "Get user by id succesfully",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addUserHandler = async (req, res) => {
  const { fullname, username, email, password, role } = req.body;

  if (!fullname || !username || !email || !password || !role) {
    return res.status(400).json({
      status: "failed",
      message: "Please provide all required fields",
    });
  } else if (role !== "admin" && role !== "user") {
    return res.status(400).json({
      status: "failed",
      message: "Role must be either 'admin' or 'user'",
    });
  }

  try {
    const [users] = await pool.query(
      "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [fullname, username, email, password, role]
    );

    const newUser = {
      id: users.insertId,
      fullname,
      username,
      email,
      role,
      address: null,
      phone_number: null,
      age: null,
    };

    res.status(201).json({
      status: "success",
      message: "User added successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

export const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = req.body;
  try {
    await pool.query(
      "UPDATE users SET fullname=?, username=?, email=?, password=?, role=?, address=?, phone_number=?, age=? WHERE id=?",
      [
        fullname,
        username,
        email,
        password,
        role,
        address,
        phone_number,
        age,
        id,
      ]
    );

    const [userUpdate] = await pool.query(
      "SELECT id, fullname, username, email, role, phone_number, age, address FROM users WHERE id = ? ",
      [id]
    );

    res.status(200).json({
      status: "success",
      message: "User updated succesfully",
      data: userUpdate,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const [deleteUser] = await pool.query("DELETE FROM users WHERE id = ?", [
      id,
    ]);

    if (deleteUser.affectedRows === 0) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "User deleted succesfully",
    });
  } catch (error) {
    console.error(error);
  }
};
