import z from "zod";

export const createUserSchema = z.object({
  fullname: z.string().min(3, "Fullname minimal 3 karakter"),
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .refine((s) => !s.includes(" "), "Username tidak boleh mengandung spasi"),
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  role: z.enum(["admin", "user"], "Role harus admin atau user"),
});

export const updateUserSchema = z.object({
  fullname: z.string().min(3, "Fullname minimal 3 karakter").optional(),
  username: z
    .string()
    .min(3, "Username minimal 3 karakter")
    .refine((s) => !s.includes(" "), "Username tidak boleh mengandung spasi")
    .optional(),
  email: z.email("Email tidak valid").optional(),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .refine((s) => !s.includes(" "), "Username tidak boleh mengandung spasi")
    .optional(),
  role: z
    .enum(["admin", "user"], {
      message: "Role harus admin atau user",
    })
    .optional(),
  address: z.string().min(5, "Alamat minimal 5 karakter").optional(),
  phone_number: z
    .string()
    .regex(/^0\d{9,14}$/, "Nomor telepon tidak valid")
    .optional(),
  age: z
    .number({ invalid_type_error: "Umur harus berupa angka" })
    .min(10, "Umur minimal 10 tahun")
    .max(100, "Umur maksimal 100 tahun")
    .optional(),
});
