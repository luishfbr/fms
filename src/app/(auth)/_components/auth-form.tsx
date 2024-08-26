import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { auth } from "@/services/auth";
import { redirect } from "next/navigation";

export default async function AuthForm() {
  const session = await auth();
  if (session?.user) {
    redirect("/app");
  }

  return (
    <div className="flex items-center justify-center h-screen mx-auto bg-primary">
      <Tabs defaultValue="login" className="w-[500px] ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Entrar</TabsTrigger>
          <TabsTrigger value="register">Registrar</TabsTrigger>
        </TabsList>
        <LoginForm />
        <RegisterForm />
      </Tabs>
    </div>
  );
}
