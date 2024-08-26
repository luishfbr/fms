import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const AuthButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Carregando..." : "Entrar"}
    </Button>
  );
};

export default AuthButton;
