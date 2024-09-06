import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
import { getModelsBySectorId, getSectorsById } from "../../_actions/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Sector {
  id: string;
  name: string;
}

interface Model {
  id: string;
  modelName: string;
}

export function SheetNewArchive({ id }: { id: string }) {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [models, setModels] = useState<Model[]>([]);

  const ModelByIdSector = async (sectorId: string) => {
    const response = await getModelsBySectorId(sectorId);
    setModels(response);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedSectors = await getSectorsById(id);
      setSectors(fetchedSectors);
    };
    fetchData();
  }, []);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Criar Arquivo</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Crie seu novo arquivo</SheetTitle>
          <SheetDescription>
            Apenas selecione o setor e o modelo que deseja criar.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-2 my-4 gap-6">
          <Select onValueChange={ModelByIdSector}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um Setor" />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector, index) => (
                <SelectGroup key={index}>
                  <SelectItem value={sector.id}>{sector.name}</SelectItem>
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
          {selectedSector && (
            <Select onValueChange={ModelByIdSector}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um Modelo" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model, index) => (
                  <SelectGroup key={index}>
                    <SelectItem value={model.id}>{model.modelName}</SelectItem>
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
