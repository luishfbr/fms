"use client";

import * as React from "react";

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
import { createSector } from "./_actions/users";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "../../../../utils/ToastContext";

type FormData = {
  name: string;
};

interface CreateButtonProps {
  onCreateSuccess: () => void;
}

export const CreateNewSector: React.FC<CreateButtonProps> = ({
  onCreateSuccess,
}) => {
  const { showToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);

      const createSectorResponse = await createSector(formData);

      if (createSectorResponse === true) {
        onCreateSuccess();
        reset();
        showToast("Setor criado com sucesso!Atualize a página...");
      }
      setIsSubmitting(false);
    } catch (error) {
      setIsSubmitting(false);
      showToast("Erro ao criar setor!");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Criar novo setor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <Label htmlFor="name">Nome do Setor</Label>
            <Input type="text" required {...register("name")} />
          </div>
          <DialogFooter>
            <DialogClose>
              <Button type="submit" disabled={isSubmitting || !isValid}>
                {isSubmitting ? "Criando..." : "Criar Setor"}
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
