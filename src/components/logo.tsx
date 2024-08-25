import { RocketIcon } from "@radix-ui/react-icons";

export function Logo() {
  return (
    <div className="flex justify-center items-center text-center gap-2">
      <div className="bg-primary h-8 w-8 flex items-center justify-center rounded-md">
        <RocketIcon className="w-6 h-6 text-primary-foreground" />
      </div>
      <p className="font-bold text-xl">DevFont FMS</p>
    </div>
  );
}
