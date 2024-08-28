"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  getUserByEmail,
  updateRoleUser,
  updateUser,
} from "../../_actions/users";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface ChangeRoleProps {
  email: string;
}

interface UserFormData {
  role: string;
}

export const ChangeRole: React.FC<ChangeRoleProps> = ({ email }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      role: "user",
    },
  });

  const [roleSelected, setRoleSelected] = useState<string>("user");
  const [dataUser, setDataUser] = useState<UserFormData | null>(null);

  const getDataUser = async () => {
    const user = await getUserByEmail(email);
    if (user) {
      setDataUser({
        role: user.role ?? "",
      });
      setValue("role", user.role ?? "");
    }
  };

  const selectAdmin = () => {
    setRoleSelected("admin");
  };
  const selectUser = () => {
    setRoleSelected("user");
  };
  const selectCreator = () => {
    setRoleSelected("creator");
  };

  const onSubmit = async (data: UserFormData) => {
    await updateRoleUser(email, data);
    console.log(data);
    alert("User updated successfully");
  };

  useEffect(() => {
    getDataUser();
  }, [email]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-40">Editar Permissão</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[450px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Usuário</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha os dados do usuário abaixo:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-3 gap-2">
          <Button variant={"outline"} onClick={selectAdmin}>
            Administrador
          </Button>
          <Button variant={"outline"} onClick={selectUser}>
            Usuário
          </Button>
          <Button variant={"outline"} onClick={selectCreator}>
            Criador
          </Button>
        </div>
        <div className="grid">
          <span className="text-center text-sm text-muted-foreground">
            Setor selecionado: {roleSelected}
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            value={roleSelected}
            {...register("role")}
            className="sr-only"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button type="submit">Salvar</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
