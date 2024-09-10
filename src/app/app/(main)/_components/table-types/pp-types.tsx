"use client";

import styles from "@/app/app/styles/main.module.css";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  deletePoint,
  getTablePoint,
  updatePoint,
} from "../../_actions/dashboard";
import React, { useEffect } from "react";
import { useToast } from "@/app/utils/ToastContext";
import { PointArchiveProps } from "@/app/types/types";
import { useForm } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Pencil, SlidersHorizontal, Trash } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const id = "cm0nw1uss000125u0gdtr3oos";

export const TablePointArchive = () => {
  const { showToast } = useToast();
  const [fields, SetFields] = React.useState<PointArchiveProps[]>([]);
  const { register, handleSubmit } = useForm<PointArchiveProps>();

  const onSubmit = async (data: PointArchiveProps) => {
    const response = await updatePoint(data);
    if (response) {
      showToast("Mudanças salvas com sucesso");
      getFieldsPoint();
    } else {
      showToast("Erro ao salvar o arquivo");
    }
  };

  const handleDeleteArchive = async (id: string) => {
    const response = await deletePoint(id);
    if (response) {
      showToast("Arquivo excluído com sucesso");
      getFieldsPoint();
    } else {
      showToast("Erro ao excluir o arquivo");
    }
  };

  const getFieldsPoint = async () => {
    const response = await getTablePoint(id);
    if (response) {
      const updatedResponse = response.map((item) => ({
        ...item,
        fileTemplateId: id,
        shelf: item.shelf || "",
        box: item.box || "",
        folder: item.folder || "",
        name: item.name || "",
        cpf: item.cpf || "",
        registration: item.registration || "",
        month: item.month || "",
        year: item.year || "",
      }));
      SetFields(updatedResponse);
    } else {
      showToast("Erro ao buscar os dados");
    }
  };

  useEffect(() => {
    getFieldsPoint();
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className={styles.tableHeader}>Nome Completo</TableHead>
          <TableHead className={styles.tableHeader}>Prateleira</TableHead>
          <TableHead className={styles.tableHeader}>Caixa</TableHead>
          <TableHead className={styles.tableHeader}>Pasta</TableHead>
          <TableHead className={styles.tableHeader}>CPF</TableHead>
          <TableHead className={styles.tableHeader}>Matrícula</TableHead>
          <TableHead className={styles.tableHeader}>Mês</TableHead>
          <TableHead className={styles.tableHeader}>Ano</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {fields.map((field) => (
          <TableRow key={field.id}>
            <TableCell className={styles.tableBody}>{field.name}</TableCell>
            <TableCell className={styles.tableBody}>{field.shelf}</TableCell>
            <TableCell className={styles.tableBody}>{field.box}</TableCell>
            <TableCell className={styles.tableBody}>{field.folder}</TableCell>
            <TableCell className={styles.tableBody}>{field.cpf}</TableCell>
            <TableCell className={styles.tableBody}>
              {field.registration}
            </TableCell>
            <TableCell className={styles.tableBody}>{field.month}</TableCell>
            <TableCell className={styles.tableBody}>{field.year}</TableCell>
            <TableCell className={styles.tableBody}>
              <Popover>
                <PopoverTrigger asChild>
                  <SlidersHorizontal className="hover:cursor-pointer h-5 w-5 hover:text-primary" />
                </PopoverTrigger>
                <PopoverContent className="w-auto flex flex-col items-center justify-center gap-2 text-center">
                  {/* Botão de Editar */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="flex gap-2 w-32">
                        <Pencil className="w-5 h-5" />
                        Editar
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[465px]">
                      <DialogHeader>
                        <DialogTitle>Edição de Arquivo</DialogTitle>
                        <DialogDescription>
                          Caso não queira mudar tudo, pode apenas alterar o
                          necessário. Os valores antigos continuarão.
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 items-center"
                      >
                        <div className="flex flex-col gap-4">
                          <div className="flex gap-4">
                            <Input
                              className="text-center"
                              placeholder="Prateleira"
                              defaultValue={field.shelf}
                              {...register("shelf")}
                            />
                            <Input
                              className="text-center"
                              placeholder="Caixa"
                              defaultValue={field.box}
                              {...register("box")}
                            />
                            <Input
                              className="text-center"
                              placeholder="Pasta"
                              defaultValue={field.folder}
                              {...register("folder")}
                            />
                            <Input
                              className="text-center"
                              placeholder="Matricula"
                              defaultValue={field.registration}
                              {...register("registration")}
                            />
                          </div>
                          <div className="flex flex-col gap-4">
                            <Input
                              className="text-center"
                              placeholder="Nome Completo"
                              defaultValue={field.name}
                              {...register("name")}
                            />
                            <Input
                              className="text-center"
                              placeholder="CPF"
                              defaultValue={field.cpf}
                              {...register("cpf")}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              className="text-center"
                              placeholder="Admissão"
                              defaultValue={field.year}
                              {...register("year")}
                            />
                            <Input
                              className="text-center"
                              placeholder="Rescisão"
                              defaultValue={field.month}
                              {...register("month")}
                            />
                          </div>
                          <Input
                            {...register("id")}
                            type="hidden"
                            value={field.id}
                          />
                        </div>
                        <DialogFooter>
                          <DialogClose>
                            <Button type="submit">Salvar Mudanças</Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant={"destructive"}
                        className="flex gap-2 w-32"
                      >
                        <Trash className="w-5 h-5" />
                        Excluir
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Você tem certeza que deseja excluir este arquivo?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita. Clique em continuar
                          para excluir o arquivo.
                          <br />
                          Nome: {field.name}.
                          <br />
                          Cpf: {field.cpf}.
                          <br />
                          Matrícula: {field.registration}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteArchive(field.id)}
                        >
                          Continuar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </PopoverContent>
              </Popover>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
