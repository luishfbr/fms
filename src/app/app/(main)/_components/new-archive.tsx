"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WorkContract } from "./model-types/work-contract";
import { PointArchive } from "./model-types/point-archive";

export const NewArchive = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Criar Arquivo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Escolha o modelo</DialogTitle>
          <DialogDescription>
            Os modelos abaixo, estão inseridos nos padrões do seu setor.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Contrato de Trabalho</TabsTrigger>
              <TabsTrigger value="password">Folha de Ponto</TabsTrigger>
            </TabsList>
            <WorkContract />
            <PointArchive />
          </Tabs>
        </div>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
