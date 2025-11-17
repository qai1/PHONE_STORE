import { pool } from "../config/db.js";
import { ResponseError } from "../error/responseError.js";
import validate from "../validations/validate.js";
import { createUserSchema } from "../validations/userValidation.js";
import { updateUserSchema } from "../validations/userValidation.js";
import bcrypt from "bcrypt";

export const getAllUser = async () => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users"
  );
  return users;
};

export const getUserById = async (id) => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",
    [id]
  );

  if (users.length === 0) {
    throw new ResponseError(404, "User not found");
  }

  return users[0];
};

export const createUser = async (req) => {
  const validated = validate(createUserSchema, req);

  const {
    fullname,
    username,
    email,
    role,
    password,
    address,
    phone_number,
    age,
  } = validated;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [users] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role, address, phone_number, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      fullname,
      username,
      email,
      hashedPassword,
      role,
      address,
      phone_number,
      age,
    ]
  );

  const newUser = {
    id: users.insertId,
    fullname,
    username,
    email,
    role,
    address,
    phone_number,
    age,
  };

  return newUser;
};

export const updateUser = async (id, req) => {
  const validated = validate(updateUserSchema, req);
  const {
    fullname,
    username,
    email,
    role,
    address,
    password,
    phone_number,
    age,
  } = validated;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    "UPDATE users SET fullname=?, username=?, email=?, role=?, address=?, password=?, phone_number=?, age=? WHERE id=?",
    [
      fullname,
      username,
      email,
      role,
      address,
      hashedPassword,
      phone_number,
      age,
      id,
    ]
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "Failed to update user");
  }

  const [userUpdate] = await pool.query(
    "SELECT fullname, username, email, role, address, phone_number, age FROM users WHERE id=?",
    [id]
  );

  return userUpdate[0];
};

export const deleteUser = async (id) => {
  await getUserById(id);

  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "Failed to delete user");
  }
  return { message: "User deleted successfully" };
};
