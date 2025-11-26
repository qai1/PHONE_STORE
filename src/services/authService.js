import { pool } from "../config/db.js";
import { ResponseError } from "../error/responseError.js";
import { registerSchema } from "../validations/authValidation.js";
import { loginSchema } from "../validations/authValidation.js";
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

export const login = async (req) => {
  // Validasi input menggunakan validate util yang sama seperti register
  const { email, password } = validate(loginSchema, req);

  // Ambil user berdasarkan email
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  if (rows.length === 0) {
    // Email tidak ditemukan -> jangen beri tahu mana yang salah (email/password)
    throw new ResponseError("Email atau password salah");
  }

  const user = rows[0];

  // Bandingkan password plain (input) dengan hasil di DB
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new ResponseError("Email atau password salah");
  }

  // Kembalikan data user tanpa password
  return {
    id: user.id,
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    password: user.hashedPassword,
    role: user.role,
    address: user.address,
    phone_number: user.phone_number,
    age: user.age,
  };
};
