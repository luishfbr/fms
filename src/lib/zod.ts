import { z } from "zod";

const passwordSchema = z
  .string({ required_error: "Senha obrigatória!" })
  .min(8, "Necessário ter no mínimo 8 caracteres")
  .regex(/[a-z]/, "Necessário ter pelo menos uma letra minúscula")
  .regex(/[A-Z]/, "Necessário ter pelo menos uma letra maiúscula")
  .regex(/[0-9]/, "Necessário ter pelo menos um número")
  .regex(/[\W_]/, "Necessário ter pelo menos um caractere especial");

const emailSchema = z
  .string({ required_error: "Email obrigatório!" })
  .min(1, "Email obrigatório!")
  .email("Email inválido");

const nameSchema = z
  .string({ required_error: "Nome obrigatório!" })
  .min(1, "Nome obrigatório");

const passwordAgainSchema = z
  .string({ required_error: "Campo obrigatório!" })
  .min(1, "Campo obrigatório!");

export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordAgain: passwordAgainSchema,
    role: z.string().default("user"),
  })
  .refine((data) => data.password === data.passwordAgain, {
    message: "As senhas não coincidem",
    path: ["passwordAgain"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const updatePasswordSchema = z
  .object({
    password: passwordSchema,
    passwordAgain: passwordAgainSchema,
  })
  .refine((data) => data.password === data.passwordAgain, {
    message: "As senhas não coincidem",
    path: ["passwordAgain"],
  });

export const createModelSchema = z.object({
  name: nameSchema,
  description: z.string().min(1, "Descrição obrigatória"),
  fileTemplateId: z.string().min(1, "Id do modelo obrigatório"),
});

export const qrcodeSchema = z.object({
  code: z.string().min(6, "Código inválido").max(6, "Código inválido"),
});
