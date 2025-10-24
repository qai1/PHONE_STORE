import { pool } from "../config/db.js";
import { ResponseError } from "../error/responseError.js";

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
  const { fullname, username, email, password, role } = req;

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
  };

  return newUser;
};

export const updateUser = async (id, req) => {
  const { fullname, username, email, role, address, phone_number, age } = req;

  await getUserById(id);

  const [result] = await pool.query(
    "UPDATE users SET fullname=?, username=?, email=?, role=?, address=?, phone_number=?, age=? WHERE id=?",
    [fullname, username, email, role, address, phone_number, age, id]
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "Failed to update user");
  }

  return {
    id,
    fullname,
    username,
    email,
    role,
    address,
    phone_number,
    age,
  };
};

export const deleteUser = async (id) => {
  await getUserById(id);

  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "Failed to delete user");
  }

  return {
    message: "User deleted successfully",
  };
};
