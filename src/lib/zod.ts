import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string({ required_error: "Nome obrigatório!" })
    .min(1, "Nome obrigatório"),
  email: z
    .string({ required_error: "Email obrigatório!" })
    .min(1, "Email obrigatório!")
    .email("Email inválido"),
  username: z.string({ required_error: "Usuário obrigatório!" }),
  password: z
    .string({ required_error: "Senha obrigatória!" })
    .min(8, "Necessário ter no mínimo 8 caracteres")
    .regex(/[a-z]/, "Necessário ter pelo menos uma letra minúscula")
    .regex(/[A-Z]/, "Necessário ter pelo menos uma letra maiúscula")
    .regex(/[0-9]/, "Necessário ter pelo menos um número")
    .regex(/[\W_]/, "Necessário ter pelo menos um caractere especial"),
  passwordAgain: z.string({ required_error: "Campo obrigatório!" }),
  totpIsEnable: z.boolean(),
});
