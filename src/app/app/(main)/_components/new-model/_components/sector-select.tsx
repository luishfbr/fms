import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sectors } from "../sheet-new-model";

export function SectorSelect({
  sectors,
  selectedSector,
  setSelectedSector,
}: {
  sectors: Sectors[];
  selectedSector: string | null;
  setSelectedSector: (sector: string) => void;
}) {
  return (
    <Select onValueChange={(value) => setSelectedSector(value)}>
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
  );
}
