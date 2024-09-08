"use client";

import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/lib/zod";
import { githubLogin, loginWithCredentials } from "../_actions/auth";
import { useToast } from "@/app/utils/ToastContext";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const returnedUser = await loginWithCredentials(formData);
      if (returnedUser) {
        showToast(
          "Usuário verificado com sucesso, insira o código de autenticação"
        );
        router.push(`/qrcode?id=${returnedUser.id}`);
      } else {
        showToast("Email ou senha inválidos");
      }
    } catch (error) {
      showToast("Erro ao fazer login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TabsContent value="login">
      <Card>
        <div>
          <CardHeader>
            <CardTitle>Seja bem-vinda(o)!</CardTitle>
            <CardDescription>
              Insira as informações e acesse o gerenciador de arquivos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-center gap-4">
              <form action={githubLogin}>
                <Button className="flex gap-4">
                  <FaGithub className="w-5 h-5" />
                  Entrar com GitHub
                </Button>
              </form>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" {...register("email")} type="email" />
                {errors.email && (
                  <p className="text-red-700 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  {...register("password")}
                  type="password"
                />
                {errors.password && (
                  <p className="text-red-700 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex text-center items-center justify-center mt-6">
                <Button type="submit" disabled={isSubmitting || !isValid}>
                  {isSubmitting ? "Carregando..." : "Entrar"}
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </TabsContent>
  );
}
