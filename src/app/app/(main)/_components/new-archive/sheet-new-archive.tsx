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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, useCallback } from "react";
import { getModelsBySectorId, getSectorsById } from "../../_actions/dashboard";
import { SelectedModelForm } from "../model-types/models-card/main";
import { useToast } from "@/app/utils/ToastContext";

interface Sector {
  id: string;
  name: string;
}

interface Model {
  id: string;
  modelName: string | null;
}

export function SheetNewArchive({ id }: { id: string }) {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { showToast } = useToast();

  const fetchSectors = useCallback(async () => {
    try {
      setIsLoading(true);
      const fetchedSectors = await getSectorsById(id);
      setSectors(fetchedSectors);
    } catch (err) {
      showToast("Erro ao carregar setores. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [id, showToast]);

  useEffect(() => {
    fetchSectors();
  }, [fetchSectors]);

  const handleChangeModel = useCallback((modelId: string) => {
    const selected = models.find((model) => model.id === modelId) || null;
    setSelectedModel(selected);
  }, [models]);

  const handleChangeSector = useCallback(async (sectorId: string) => {
    try {
      setIsLoading(true);
      const selected = sectors.find((sector) => sector.id === sectorId) || null;
      setSelectedSector(selected);
      if (selected) {
        const response = await getModelsBySectorId(selected.id);
        setModels(response.filter((model) => model.modelName !== null));
      }
    } catch (err) {
      showToast("Erro ao carregar modelos. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [sectors, showToast]);

  const resetSelections = useCallback(() => {
    setSelectedSector(null);
    setSelectedModel(null);
    setModels([]);
  }, []);

  const handleSheetOpenChange = useCallback((isOpen: boolean) => {
    setIsSheetOpen(isOpen);
    if (!isOpen) {
      resetSelections();
    }
  }, [resetSelections]);

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Button>Criar Arquivo</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Crie seu novo arquivo</SheetTitle>
          <SheetDescription>
            Selecione o setor e o modelo que deseja criar.
          </SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 my-4 gap-6">
          <Select onValueChange={handleChangeSector} disabled={isLoading}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={isLoading ? "Carregando..." : "Selecione um Setor"} />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector.id} value={sector.id}>
                  {sector.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedSector && (
            <Select onValueChange={handleChangeModel} disabled={isLoading}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={isLoading ? "Carregando..." : "Selecione um Modelo"} />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.modelName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {selectedModel && <SelectedModelForm modelId={selectedModel.id} />}
      </SheetContent>
    </Sheet>
  );
}
