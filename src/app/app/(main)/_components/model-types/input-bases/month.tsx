import { Input } from "@/components/ui/input";

export const Month = ({ register }: { register: any }) => {
  return (
    <div>
      <div className="space-y-1">
        <Input
          {...register("month")}
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
