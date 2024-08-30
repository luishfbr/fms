"use client";

import { useToast } from "@/app/utils/ToastContext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getModels, getSectors } from "../_actions/dashboard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type Models = {
  id: string;
  name: string;
};

type Sectors = {
  id: string;
  name: string;
};
type SelectedSectors = {
  id: string;
};

export const MainTableAndModel = () => {
  const { showToast } = useToast();
  const [models, setModels] = useState<Models[]>([]);
  const [sectors, setSectors] = useState<Sectors[]>([]);
  const [selectedSector, setSelectedSector] = useState<SelectedSectors | null>(
    null
  );

  const setSector = (sector: SelectedSectors) => {
    const { id } = sector;
    handleGetModels(id);
  };

  const handleGetModels = async (id: string) => {
    if (id) {
      const response = await getModels(id);
      if (response) {
        setModels(response);
      }
    }
  };

  useEffect(() => {
    const getAllSectors = async () => {
      const response = await getSectors();
      if (response) {
        const { sectors } = response;
        setSectors(sectors);
      } else {
      }
    };
    getAllSectors();
  }, []);

  return (
    <div>
      <span>Clique no setor que deseja ver os modelos</span>
      <div className="flex gap-4">
        {sectors.map((sector) => (
          <Button
            key={sector.id}
            onClick={() => setSector(sector)}
            variant={"outline"}
          >
            {sector.name}
          </Button>
        ))}
      </div>
      <div>
        <span>Selecione o modelo que deseja ver os dados</span>
        <div className="flex gap-4">
          {models.map((model) => (
            <Button key={model.id} variant={"outline"}>
              {model.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
