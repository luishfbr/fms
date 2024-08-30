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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/zod";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import RegisterUser from "@/app/(auth)/_actions/register";
import { useToast } from "../../../../utils/ToastContext";

type RegisterFormData = z.infer<typeof registerSchema>;

interface CreateButtonProps {
  onCreateSuccess: () => void;
}

export const CreateNewUser: React.FC<CreateButtonProps> = ({
  onCreateSuccess,
}) => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await RegisterUser(data);
      if (response === true) {
        onCreateSuccess();
        reset();
        showToast("Usuário registrado com sucesso!");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Criar novo usuário</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader></DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <DialogFooter className="mt-6">
            <DialogClose>
              <Button type="submit" disabled={isSubmitting || !isValid}>
                {isSubmitting ? "Carregando..." : "Registrar"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
