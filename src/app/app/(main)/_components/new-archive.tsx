"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WorkContract } from "./model-types/work-contract";
import { PointArchive } from "./model-types/point-archive";
import { useEffect, useState } from "react";
import {
  getModelsBySectorId,
  getSectorByUserId,
  getSectors,
} from "../_actions/dashboard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectedSectorModels } from "./models-by-sector";

interface NewArchiveProps {
  id?: string;
}

export type Sector = {
  id: string;
  name: string;
};

export type Model = {
  id: string;
  name: string;
  url: string;
};

export type SelectedModel = Model;

export const NewArchive: React.FC<NewArchiveProps> = ({ id }) => {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [selectedModel, setSelectedModel] = useState<SelectedModel | null>(
    null
  );

  const handleSectorChange = (value: string) => {
    const sector = sectors.find((s) => s.id === value);
    setSelectedSector(sector || null);
    setModels([]);
    setSelectedModel(null);
  };

  const handleModelChange = (value: string) => {
    const model = models.find((m) => m.id === value);
    if (model) {
      setSelectedModel(model);
    } else {
      setSelectedModel(null);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const fetchedSectors = await getSectorByUserId(id);
        setSectors(fetchedSectors);
      };
      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (selectedSector) {
      const fetchData = async () => {
        const fetchedModels = await getModelsBySectorId(selectedSector.id);
        setModels(fetchedModels);
      };
      fetchData();
    }
  }, [selectedSector]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Criar Arquivo</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex items-center justify-center gap-4">
          <DialogHeader>
            <DialogDescription>Escolha o setor primeiro</DialogDescription>
          </DialogHeader>
          <Select onValueChange={handleSectorChange}>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Selecione um setor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {sectors.map((sector, index) => (
                  <SelectItem key={index} value={sector.id}>
                    {sector.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {selectedSector ? (
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground">
              Modelos Disponíveis:
            </span>
            <Select onValueChange={handleModelChange}>
              <SelectTrigger className="w-auto">
                <SelectValue placeholder="Selecione um modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {models.map((model, index) => (
                    <SelectItem key={index} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        ) : null}
        <SelectedSectorModels
          selectedSector={selectedSector}
          selectedModel={selectedModel}
        />
      </DialogContent>
    </Dialog>
  );
};
