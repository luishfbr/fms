import { CardUsers } from "./_cards/users";

export const Main = () => {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="flex h-screen flex-col">
        <CardUsers />
      </div>
      <div className="flex h-screen flex-col">2</div>
    </div>
  );
};
