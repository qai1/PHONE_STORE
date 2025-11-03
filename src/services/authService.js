export const register = async (req) => {
  const {
    fullname,
    username,
    email,
    role,
    address,
    password,
    phone_number,
    age,
  } = req;

  const [users] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role, address, phone_number, age) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [fullname, username, email, password, role, address, phone_number, age]
  );

  const newUser = {
    id: users.insertId,
    fullname,
    username,
    email,
    role,
    address,
    password,
    phone_number,
    age,
  };

  return newUser;
};
