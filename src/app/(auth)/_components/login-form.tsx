"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import { login, loginWithCredentials } from "../_actions/login";
import { loginSchema } from "@/lib/zod";

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

      await loginWithCredentials(formData);
    } catch (error) {
      console.error("Erro ao fazer login", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TabsContent value="login">
      <Card>
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
              <Input id="email" {...register("email")} type="email" />
              {errors.email && (
                <p className="text-red-700 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" {...register("password")} type="password" />
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
      </Card>
      <Toaster />
    </TabsContent>
  );
}
