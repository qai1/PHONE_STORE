import { pool } from "../config/db.js";
import { registerSchema } from "../validations/authValidation.js";
import validate from "../validations/validate.js";
import bcrypt from "bcrypt";

export const register = async (request) => {
  const validated = validate(registerSchema, request);
  const {
    fullname,
    username,
    email,
    password,
    role,
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
      address ? address : null,
      phone_number ? phone_number : null,
      age ? age : null,
    ]
  );

  const newUser = {
    id: users.insertId,
    fullname: fullname,
    username: username,
    email: email,
    password: hashedPassword,
    role: role,
    address: address ? address : null,
    phone_number: phone_number ? phone_number : null,
    age: age ? age : null,
  };

  return newUser;
};
