import * as productService from "../services/productService.js";

export const getAllProductHandler = async (req, res, next) => {
  try {
    const response = await productService.getAllProducts();
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductByIdHandler = async (req, res, next) => {
  const { id } = req.params;
  try {
    const response = await productService.getProductById(id);
    if (!response) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createProductHandler = async (req, res, next) => {
  try {
    const response = await productService.createProduct(req.body);

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await productService.updateProduct(id, req.body);

    res.status(200).json({
      status: "success",
      message: "Product updated successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
