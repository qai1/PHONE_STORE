import { pool } from "../config/db.js";

export const getAllProductsHandler = async (req, res) => {
  try {
    const [products] = await pool.query(
      "SELECT id, user_id, name, description, price, stock FROM products"
    );

    res.status(200).json({
      status: "success",
      data: products,
      message: "Get all products succesfully",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getProductsByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [products] = await pool.query(
      "SELECT id, user_id, name, description, price, stock FROM products WHERE id = ? ",
      [id]
    );

    if (products.length === 0) {
      res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: products[0],
      message: "Get products by id succesfully",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addProductHandler = async (req, res) => {
  const { user_id, name, description, price, stock } = req.body;

  // Validation
  if (!user_id || isNaN(user_id)) {
    return res.status(400).json({
      status: "fail",
      message: "user_id is required and must be a number",
    });
  }

  if (!name || !name.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "name is required",
    });
  }

  if (!description || !description.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "description is required",
    });
  }

  if (price == null || isNaN(price) || price <= 0) {
    return res.status(400).json({
      status: "fail",
      message: "price must be a positive number & cannot be empty",
    });
  }

  if (stock == null || isNaN(stock) || stock < 0) {
    return res.status(400).json({
      status: "fail",
      message: "stock must be a valid number",
    });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO products (user_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)",
      [user_id, name, description, price, stock]
    );

    const newProduct = {
      id: result.insertId,
      user_id,
      name,
      description,
      price,
      stock,
    };

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

export const updateProductHandler = async (req, res) => {
  const { id } = req.params;
  const { user_id, name, description, price, stock } = req.body;

  try {
    const [product] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    if (product.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    await pool.query(
      "UPDATE products SET user_id=?, name=?, description=?, price=?, stock=? WHERE id=?",
      [user_id, name, description, price, stock, id]
    );

    const [productUpdate] = await pool.query(
      "SELECT id, user_id, name, description, price, stock FROM products WHERE id = ?",
      [id]
    );

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: productUpdate[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const deleteProductHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
