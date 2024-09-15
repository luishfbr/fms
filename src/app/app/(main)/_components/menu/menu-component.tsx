import { Button } from "@/components/ui/button"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Edit, Menu, Trash } from "lucide-react"
import { deleteFile } from "../../_actions/dashboard";
import { useToast } from "@/app/utils/ToastContext";

export function MenuComponent({ fileId }: { fileId: string }) {
    const { showToast } = useToast();

    const handleDelete = async () => {
        if (fileId === '') {
            showToast("Erro ao deletar arquivo");
            return;
        }
        const response = await deleteFile(fileId);
        if (response) {
            showToast("Arquivo deletado com sucesso");
        } else {
            showToast("Erro ao deletar arquivo");
        }
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Menu className="cursor-pointer items-center" size={16} />
            </PopoverTrigger>
            <PopoverContent className="w-auto">
                <div className="grid gap-4">
                    <Button onClick={handleDelete} className="flex items-center gap-2">
                        <span>Excluir</span>
                        <Trash size={16} />
                    </Button>
                    <Button className="flex items-center gap-2">
                        <span>Editar</span>
                        <Edit size={16} />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
