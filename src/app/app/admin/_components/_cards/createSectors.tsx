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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSector } from "./_actions/users";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { revalidatePath } from "next/cache";

type FormData = {
  name: string;
};

export function CreateNewSector() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);

      const createSectorResponse = await createSector(formData);
      
      if (createSectorResponse === true) {        
        redirect("/app");
      }
      setIsSubmitting(false);
    } catch (error) {}
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Crie um Novo Setor</CardTitle>
        <CardDescription>
          Insira o nome do setor que deseja criar.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Label htmlFor="">Nome do Setor</Label>
          <Input type="text" required {...register("name")} />
        </CardContent>
        <CardFooter className="flex text-center justify-center">
          <Button type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting ? "Criando..." : "Criar Setor"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
