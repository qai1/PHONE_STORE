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
  username: z.string().min(3, "Username minimal 3 karakter").optional(),
  email: z.email("Email tidak valid").optional(),
  role: z.enum(["admin", "user"], "Role harus admin atau user").optional(),
  address: z.string().optional(),
  phone_number: z.string().optional(),
  age: z.number().min(0, "Umur harus angka Positif").optional(),
});
