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
import { DataTableDemo } from "./_components/users-data-table";

export function CardUsers() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lista de Usuários Cadastrados</CardTitle>
        <CardDescription>
          Pesquise pelo email do colaborador ou crie um novo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTableDemo />
      </CardContent>
      <CardFooter className="flex text-center justify-center">
        <span>Acesse o cartão ao lado para registrar um novo usuário.</span>
      </CardFooter>
    </Card>
  );
}
