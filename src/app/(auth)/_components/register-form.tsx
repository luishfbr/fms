"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import RegisterUser from "../_actions/register";
import { useRouter } from "next/navigation";
import { useToast } from "@/app/utils/ToastContext";

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await RegisterUser(data);
      if (response === true) {
        showToast("Usuário criado com sucesso!");
        reset();
      } else {
        showToast("Falha ao criar usuário, email já cadastrado!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TabsContent value="register">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Crie uma nova conta</CardTitle>
            <CardDescription>
              Insira as informações e registre-se em nosso gerenciador de
              arquivos.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Nome</Label>
              <Input
                {...register("name")}
                type="text"
                required
                autoComplete="off"
              />
              {errors.name && (
                <p className="text-red-700 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input
                {...register("email")}
                type="email"
                required
                autoComplete="off"
              />
              {errors.email && (
                <p className="text-red-700 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Senha</Label>
              <Input {...register("password")} type="password" required />
              {errors.password && (
                <p className="text-red-700 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="passwordAgain">Digite Novamente</Label>
              <Input {...register("passwordAgain")} type="password" required />
              {errors.passwordAgain && (
                <p className="text-red-700 text-sm">
                  {errors.passwordAgain.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex text-center items-center justify-center">
            <Button type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? "Carregando..." : "Registrar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </TabsContent>
  );
};
