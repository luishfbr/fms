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
import { useEffect, useState } from "react";
import { getModelsBySectorId, getSectorsById } from "../../_actions/dashboard";
import { SelectedModelCard } from "../model-types/models-card/main";

interface Sector {
  id: string;
  name: string;
}

interface Model {
  id: string;
  modelName: string | null;
}

export function SheetNewModel({ id }: { id: string }) {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [loadingSectors, setLoadingSectors] = useState<boolean>(false);
  const [loadingModels, setLoadingModels] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Controla o estado de abertura do Sheet

  const handleChangeModel = async (modelId: string) => {
    try {
      setLoadingModels(true);
      const selected = models.find((model) => model.id === modelId) || null;
      setSelectedModel(selected);
      console.log(selected);
    } catch (err) {
      setError("Error fetching models. Please try again.");
    } finally {
      setLoadingModels(false);
    }
  };

  const handleChangeSector = async (sectorId: string) => {
    try {
      setLoadingModels(true);
      const selected = sectors.find((sector) => sector.id === sectorId) || null;
      setSelectedSector(selected);
      if (selected) {
        const response = await getModelsBySectorId(selected.id);
        setModels(response.filter((model) => model.modelName !== null));
      }
    } catch (err) {
      setError("Error fetching models. Please try again.");
    } finally {
      setLoadingModels(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingSectors(true);
        const fetchedSectors = await getSectorsById(id);
        setSectors(fetchedSectors);
      } catch (err) {
        setError("Error fetching sectors. Please try again.");
      } finally {
        setLoadingSectors(false);
      }
    };
    fetchData();
  }, [id]);

  const resetSelections = () => {
    setSelectedSector(null);
    setSelectedModel(null);
    setModels([]);
    setError(null);
  };

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={(isOpen) => {
        setIsSheetOpen(isOpen);
        if (!isOpen) {
          resetSelections();
        }
      }}
    >
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
          {/* Sector Selection */}
          <Select onValueChange={handleChangeSector}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  loadingSectors
                    ? "Carregando setores..."
                    : "Selecione um Setor"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {sectors.map((sector) => (
                <SelectItem key={sector.id} value={sector.id}>
                  {sector.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Model Selection */}
          {selectedSector && (
            <Select onValueChange={handleChangeModel}>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    loadingModels
                      ? "Carregando modelos..."
                      : "Selecione um Modelo"
                  }
                />
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
        {error && <p className="text-red-500">{error}</p>}
        {selectedModel && <SelectedModelCard selectedModel={selectedModel} />}
      </SheetContent>
    </Sheet>
  );
}
