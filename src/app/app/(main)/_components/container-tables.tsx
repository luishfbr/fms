"use client";

import { Input } from "@/components/ui/input";
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
import { TableWorkContract } from "./table-types/wc-table";
import { TablePointArchive } from "./table-types/pp-types";

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
          className="w-80 text-center"
          placeholder="Pesquise pelo arquivo desejado"
        />
      </div>

      <div>
        {selectedModel?.modelName === "Contrato de Trabalho" && (
          <TableWorkContract />
        )}
        {selectedModel?.modelName === "Folha de Ponto" && <TablePointArchive />}
      </div>
    </div>
  );
};
