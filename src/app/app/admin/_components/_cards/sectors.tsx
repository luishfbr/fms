"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sectors } from "./_components/sectors-data-table";

export function CardSectors() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Lista de Setores Cadastrados</CardTitle>
        <CardDescription>
          Pesquise pelo nome do setor ou crie um novo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Sectors />
      </CardContent>
      <CardFooter className="flex text-center justify-center">
        <span>Crie um novo setor ao lado.</span>
      </CardFooter>
    </Card>
  );
}
