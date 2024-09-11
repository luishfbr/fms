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
import { Button } from "@/components/ui/button";
import { updateRoleUser } from "../../_actions/users";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/app/utils/ToastContext";

interface ChangeRoleProps {
  email: string;
  onChangeSuccess: () => void;
}

interface UserFormData {
  role: string;
}

export const ChangeRole: React.FC<ChangeRoleProps> = ({
  email,
  onChangeSuccess,
}) => {
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UserFormData>({
    defaultValues: {
      role: "user",
    },
  });

  const [roleSelected, setRoleSelected] = useState<string>("user");

  // Set roleSelected and update the form value
  const selectAdmin = () => {
    setRoleSelected("ADMIN");
    setValue("role", "ADMIN");
  };
  const selectUser = () => {
    setRoleSelected("USER");
    setValue("role", "USER");
  };
  const selectCreator = () => {
    setRoleSelected("CREATOR");
    setValue("role", "CREATOR");
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      await updateRoleUser(email, data);
      onChangeSuccess();
      showToast("Troca de permissão realizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a permissão do usuário:", error);
      showToast("Erro ao atualizar a permissão do usuário");
    }
  };

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
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction type="submit">Salvar</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
