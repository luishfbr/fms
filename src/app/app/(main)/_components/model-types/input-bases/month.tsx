import { Input } from "@/components/ui/input";

export const Month = () => {
  return (
    <div>
      <div className="space-y-1">
        <Input
          className="text-center w-full"
          placeholder="Mês"
          type="text"
          id="month"
          autoComplete="off"
          required
        />
      </div>
    </div>
  );
};
