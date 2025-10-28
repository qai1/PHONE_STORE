import { pool } from "../config/db.js";
import { ResponseError } from "../error/responseError.js";

export const getAllProducts = async () => {
  const [products] = await pool.query(
    "SELECT id, user_id, name, description, price, stock, created_at, updated_at FROM products"
  );
  return products;
};

export const getProductById = async (id) => {
  const [products] = await pool.query(
    "SELECT id, user_id, name, description, price, stock, created_at, updated_at FROM products WHERE id = ?",
    [id]
  );

  if (products.length === 0) {
    throw new ResponseError(404, "Product not found");
  }

  return products[0];
};

export const createProduct = async (req) => {
  const { user_id, name, description, price, stock } = req;

  const [result] = await pool.query(
    "INSERT INTO products (user_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)",
    [user_id, name, description, price, stock ?? 0]
  );

  const newProduct = {
    id: result.insertId,
    user_id,
    name,
    description,
    price,
    stock: stock ?? 0,
  };

  return newProduct;
};

export const updateProduct = async (id, req) => {
  const { user_id, name, description, price, stock } = req;

  await getProductById(id);

  const [result] = await pool.query(
    "UPDATE products SET user_id = ?, name = ?, description = ?, price = ?, stock = ? WHERE id = ?",
    [user_id, name, description, price, stock, id]
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "Failed to update product");
  }

  return {
    id,
    user_id,
    name,
    description,
    price,
    stock,
  };
};

export const deleteProduct = async (id) => {
  await getProductById(id);

  const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "Failed to delete product");
  }

  return {
    message: "Product deleted successfully",
  };
};
