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

  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);

  if (!fullname || !fullname.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "fullname is required",
    });
  }

  if (!username || !username.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "username is required",
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "email is required",
    });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "password is required",
    });
  }

  if (!role || !role.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "role is required",
    });
  }

  if (rows.length > 0) {
    return res.status(404).json({
      status: "fail",
      message: "User already exists",
    });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO users (fullname, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
      [fullname, username, email, password, role]
    );

    const newUser = {
      id: result.insertId,
      fullname,
      username,
      email,
      role,
    };

    res.status(201).json({
      status: "success",
      message: "User created succesfully",
      data: newUser.insertId,
    });
  } catch (error) {
    console.log(error);
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
