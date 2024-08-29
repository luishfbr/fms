import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ required_error: "Nome obrigatório!" })
      .min(1, "Nome obrigatório"),
    email: z
      .string({ required_error: "Email obrigatório!" })
      .min(1, "Email obrigatório!")
      .email("Email inválido"),
    password: z
      .string({ required_error: "Senha obrigatória!" })
      .min(8, "Necessário ter no mínimo 8 caracteres")
      .regex(/[a-z]/, "Necessário ter pelo menos uma letra minúscula")
      .regex(/[A-Z]/, "Necessário ter pelo menos uma letra maiúscula")
      .regex(/[0-9]/, "Necessário ter pelo menos um número")
      .regex(/[\W_]/, "Necessário ter pelo menos um caractere especial"),
    passwordAgain: z
      .string({ required_error: "Campo obrigatório!" })
      .min(1, "Campo obrigatório!"),
    role: z.string().default("user"),
  })
  .refine((data) => data.password === data.passwordAgain, {
    message: "As senhas não coincidem",
    path: ["passwordAgain"],
  });

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email obrigatório!" })
    .min(1, "Email obrigatório!")
    .email("Email inválido"),
  password: z
    .string({ required_error: "Senha obrigatória!" })
    .min(8, "Necessário ter no mínimo 8 caracteres")
    .regex(/[a-z]/, "Necessário ter pelo menos uma letra minúscula")
    .regex(/[A-Z]/, "Necessário ter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "Necessário ter pelo menos um número")
    .regex(/[\W_]/, "Necessário ter pelo menos um caractere especial"),
});

export const updatePasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Senha obrigatória!" })
      .min(8, "Necessário ter no mínimo 8 caracteres")
      .regex(/[a-z]/, "Necessário ter pelo menos uma letra minúscula")
      .regex(/[A-Z]/, "Necessário ter pelo menos uma letra maiúscula")
      .regex(/[0-9]/, "Necessário ter pelo menos um número")
      .regex(/[\W_]/, "Necessário ter pelo menos um caractere especial"),
    passwordAgain: z
      .string({ required_error: "Campo obrigatório!" })
      .min(1, "Campo obrigatório!"),
  })
  .refine((data) => data.password === data.passwordAgain, {
    message: "As senhas não coincidem",
    path: ["passwordAgain"],
  });
