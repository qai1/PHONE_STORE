import express from "express";
import {
  addProductHandler,
  getAllProductsHandler,
  getProductsByIdHandler,
  updateProductHandler,
  deleteProductHandler,
} from "../handlers/productHandler.js";

const productRouter = express.Router();

productRouter.get("/products", getAllProductsHandler);
productRouter.get("/products/:id", getProductsByIdHandler);
productRouter.post("/products", addProductHandler);
productRouter.put("/products/:id", updateProductHandler);
productRouter.delete("/products/:id", deleteProductHandler);

export default productRouter;
