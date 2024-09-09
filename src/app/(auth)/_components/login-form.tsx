"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginWithCredentials, VerifySession } from "../_actions/login";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/app/utils/ToastContext";

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { showToast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const response = await LoginWithCredentials(formData);

      if (response.status === 200) {
        showToast("Login efetuado com sucesso!");
        router.push(`/qrcode?id=${response.id}`);
      } else if (response.status === 404) {
        showToast("Usuário não encontrado");
      } else if (response.status === 401) {
        showToast("Senha incorreta");
      } else {
        showToast("Erro inesperado. Tente novamente.");
      }
    } catch (error) {
      console.log(error);
      showToast("Falha ao processar o login. Verifique sua conexão.");
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input {...register("email")} id="email" type="email" />
                {errors.email && (
                  <p className="text-red-700 text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                />
                {errors.password && (
                  <p className="text-red-700 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex text-center items-center justify-center mt-6">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
              </div>
            </form>
          </CardContent>
        </div>
      </Card>
    </TabsContent>
  );
}
