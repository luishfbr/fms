"use client";

import { useEffect, useState } from "react";
import { getModelsBySectorId, getSectors } from "../_actions/dashboard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableContainer } from "./table-container";
import { Input } from "@/components/ui/input";

interface Sector {
  id: string;
  name: string;
}

interface Model {
  id: string;
  modelName: string | null;
}

export const ContainerTables = () => {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchSectors = async () => {
    const response = await getSectors();
    setSectors(response ?? []);
  };

  const handleChangeSector = async (sectorId: string) => {
    const sector = sectors.find((sector) => sector.id === sectorId) || null;
    setSelectedSector(sector);
    const models = await getModelsBySectorId(sectorId);
    setModels(models.filter((model) => model.modelName !== null));
  };

  const handleChangeModel = (modelId: string) => {
    const model = models.find((model) => model.id === modelId) || null;
    setSelectedModel(model);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center items-center gap-6">
        <Select onValueChange={(value) => handleChangeSector(value)}>
          <SelectTrigger className="w-auto">
            <SelectValue placeholder="Selecione o Setor" />
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
          <Select onValueChange={(value) => handleChangeModel(value)}>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Selecione o Modelo" />
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

        <Input
          type="text"
          placeholder="Pesquisar..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-64"
        />
      </div>

      {selectedModel && <TableContainer modelId={selectedModel.id} searchTerm={searchTerm} />}
    </div>
  );
};
