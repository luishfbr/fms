import { Input } from "@/components/ui/input";

export const EnterpriseName = () => {
  return (
    <div>
      <div className="space-y-1">
        <Input
          className="text-center w-full"
          placeholder="Nome da Empresa"
          type="text"
          id="name"
          autoComplete="off"
          required
        />
      </div>
    </div>
  );
};
