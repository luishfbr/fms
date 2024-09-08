"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { LoginForm } from "./login-form";
import { RegisterForm } from "./register-form";
import { auth } from "@/services/auth";
import { redirect, useRouter } from "next/navigation";
import { ToastProvider } from "@/app/utils/ToastContext";
import { VerifySession } from "../_actions/auth";
import { useEffect } from "react";

export const AuthForm = () => {
  const router = useRouter();
  const ExistSession = async () => {
    const response = await VerifySession();
    if (response === true) {
      router.push("/app");
    }
  };
  useEffect(() => {
    ExistSession();
  }, []);
  return (
    <ToastProvider>
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
    </ToastProvider>
  );
};
