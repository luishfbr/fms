import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Carregando..." : "Registrar"}
    </Button>
  );
};

export default RegisterButton;
