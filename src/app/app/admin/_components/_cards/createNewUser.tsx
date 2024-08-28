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
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisterUser from "@/app/(auth)/_actions/register";

type RegisterFormData = z.infer<typeof registerSchema>;

export const CreateNewUser = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await RegisterUser(data);
      return response;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
              <p className="text-red-700 text-sm">{errors.password.message}</p>
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
  );
};
