"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { useRouter } from "next/navigation";
import { ToastProvider } from "@/app/utils/ToastContext";
import { useEffect } from "react";
import { VerifySession } from "../_actions/login";

export const AuthForm = () => {
  const router = useRouter();
  const checkSession = async () => {
    const response = await VerifySession();
    if (response) {
      router.push("/app");
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <ToastProvider>
      <div className="flex items-center justify-center min-h-screen mx-auto bg-primary p-4">
        <Tabs defaultValue="login" className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Registrar</TabsTrigger>
          </TabsList>
          <LoginForm />
          <RegisterForm />
        </Tabs>
      </div>
    </ToastProvider>
  );
};
