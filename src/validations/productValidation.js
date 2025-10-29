import z from "zod";

export const createProductSchema = z.object({
  user_id: z.number({ invalid_type_error: "User ID harus berupa angka" }),
  name: z.string().min(3, "Nama produk minimal 3 karakter"),
  description: z.string().min(10, "Deskripsi produk minimal 10 karakter"),
  price: z
    .number({ invalid_type_error: "Harga harus berupa angka" })
    .min(0, "Harga tidak boleh negatif"),
  stock: z
    .number({ invalid_type_error: "Stok harus berupa angka" })
    .min(0, "Stok tidak boleh negatif"),
});

export const updateProductSchema = z.object({
  user_id: z
    .number({ invalid_type_error: "User ID harus berupa angka" })
    .optional(),
  name: z.string().min(3, "Nama produk minimal 3 karakter"),
  description: z
    .string()
    .min(10, "Deskripsi produk minimal 10 karakter")
    .optional(),
  price: z
    .number({ invalid_type_error: "Harga harus berupa angka" })
    .min(0, "Harga tidak boleh negatif")
    .optional(),
  stock: z
    .number({ invalid_type_error: "Stok harus berupa angka" })
    .min(0, "Stok tidak boleh negatif")
    .optional(),
});
