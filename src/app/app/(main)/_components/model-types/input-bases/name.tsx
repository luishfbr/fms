import { Input } from "@/components/ui/input";

export const Name = () => {
  return (
    <div>
      <div className="space-y-1">
        <Input
          className="text-center w-full"
          placeholder="Nome Completo"
          type="text"
          id="name"
          autoComplete="off"
          required
        />
      </div>
    </div>
  );
};
