"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/zod";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  getQRCode,
  getUserByEmail,
  verifyCredentials,
  verifyTotp,
} from "../_actions/login";
import { useState } from "react";
import { useToast } from "@/app/utils/ToastContext";
import { QrCodeForm } from "./qrcode-form";
import { NoQrCodeForm } from "./no-qrcode-form";

type LoginFormData = z.infer<typeof loginSchema>;

interface User {
  id: string;
}

export function LoginForm() {
  const { showToast } = useToast();
  const [infoUser, setInfoUser] = useState<User | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [isTotpEnable, setIsTotpEnable] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      setEmail(data.email);

      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      await verifyCredentials(formData);

      const totpEnabled = await verifyTotp(formData);

      if (!totpEnabled) {
        const qrCode = await getQRCode(formData);
        const userData = await getUserByEmail(data.email);
        setInfoUser(userData);
        setQrCode(qrCode);
      } else {
        setIsTotpEnable(true);
      }

      showToast(
        "Autenticação bem-sucedida. Verifique o código de autenticação!"
      );
    } catch (error) {
      showToast("Usuário ou senha incorretos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TabsContent value="login">
      <Card>
        {!infoUser && !isTotpEnable && (
          <div>
            <CardHeader>
              <CardTitle>Seja bem-vinda(o)!</CardTitle>
              <CardDescription>
                Insira as informações e acesse o gerenciador de arquivos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input {...register("email")} id="email" type="email" />
                  {errors.email && (
                    <p className="text-red-700 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                  />
                  {errors.password && (
                    <p className="text-red-700 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="flex text-center items-center justify-center mt-6">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Entrando..." : "Entrar"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </div>
        )}

        {infoUser && qrCode && !isTotpEnable && (
          <QrCodeForm qrcode={qrCode} id={infoUser?.id} />
        )}

        {isTotpEnable && email && <NoQrCodeForm email={email} />}
      </Card>
    </TabsContent>
  );
}
