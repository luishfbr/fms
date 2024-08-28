"use client";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getUserByEmail, updateUser } from "../../_actions/users";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface EditButtonProps {
  email: string;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  passwordAgain: string;
  role: string;
}

export const EditButton: React.FC<EditButtonProps> = ({ email }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordAgain: "",
      role: "",
    },
  });

  const [dataUser, setDataUser] = useState<UserFormData | null>(null);
  const [roles] = useState(["admin", "user"]); // Assuming roles are static

  const getDataUser = async () => {
    const user = await getUserByEmail(email);
    if (user) {
      setDataUser({
        name: user.name ?? "",
        email: user.email ?? "",
        password: "",
        passwordAgain: "",
        role: user.role ?? "",
      });
      setValue("name", user.name ?? "");
      setValue("email", user.email ?? "");
      setValue("role", user.role ?? "");
    }
  };

  const onSubmit = async (data: UserFormData) => {
    if (data.password !== data.passwordAgain) {
      alert("Passwords do not match");
      return;
    }

    await updateUser(email, data); // Assuming you have an updateUser function
    alert("User updated successfully");
  };

  useEffect(() => {
    getDataUser();
  }, [email]);

  if (!dataUser) {
    return null; // You can also add a loading spinner or message here
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-40" variant={"edit"}>
          Editar Usuário
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Editar Usuário</AlertDialogTitle>
          <AlertDialogDescription>
            Preencha os dados do usuário abaixo:
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              type="text"
              placeholder="Nome"
              required
              {...register("name")}
            />
          </div>
          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              required
              {...register("email")}
            />
          </div>
          <div className="my-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              placeholder="Senha"
              required
              {...register("password")}
            />
          </div>
          <div className="my-2">
            <Label htmlFor="passwordAgain">Digite Novamente</Label>
            <Input
              type="password"
              placeholder="Confirme a senha"
              required
              {...register("passwordAgain")}
            />
          </div>
          <div className="my-4 flex flex-col items-center justify-center">
            <span className="text-sm">
              Mudar permissão. Atual: {dataUser.role}
            </span>
            <div className="flex gap-6 mt-2">
              <Select defaultValue={dataUser.role} {...register("role")}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma permissão" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <Button type="submit">Salvar</Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
