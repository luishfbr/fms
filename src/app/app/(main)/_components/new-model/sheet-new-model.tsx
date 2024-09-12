import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getSectorByUserId } from "../../_actions/dashboard";

interface Sectors {
  id: string;
  name: string;
}

export function SheetNewModel({ id }: { id: string }) {
  const [sectors, setSectors] = useState<Sectors[]>([]);

  const getSectorsById = async (id: string) => {
    const response = await getSectorByUserId(id);
    if (response) {
      setSectors(response);
    }
  };

  useEffect(() => {
    getSectorsById(id);
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"edit"}>Criar Modelo</Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Crie um novo modelo</SheetTitle>
          <SheetDescription>Primeiro selecione o setor.</SheetDescription>
        </SheetHeader>

        <div className="flex items-center justify-center text-center m-4">
          <Select>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Selecione um Setor" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector.id} value={sector.id}>
                  {sector.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </SheetContent>
    </Sheet>
  );
}
