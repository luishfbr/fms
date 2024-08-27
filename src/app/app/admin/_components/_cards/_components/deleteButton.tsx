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
import { deleteUser } from "../_actions/users";

interface DeleteButtonProps {
  email: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ email }) => {
  const handleDelete = async () => {
    await deleteUser(email);
    // Optionally, you can add a function here to refresh the user list
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-40" variant={"destructive"}>
          Excluir Usuário
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao clicar em OK, você irá excluir o usuário permanentemente. Esta
            ação não pode ser desfeita. Apenas se criado novamente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
