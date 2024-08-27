"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  getUserById,
  loginWithCode,
  verifyOTP,
  verifySession,
} from "../_actions/qrcode";
import { useEffect, useState } from "react";
import qrcode from "qrcode";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

interface qrCode {
  code: string;
  id: string;
}

export function QrCodeForm() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<qrCode>({
    mode: "onChange", // Validação em tempo real
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState<string | null>(null);

  const handleOTPChange = (value: string) => {
    setValue("code", value, { shouldValidate: true });
  };

  const getUser = async () => {
    if (!id) {
      console.error("ID não fornecido.");
      return;
    }

    try {
      const user = await getUserById(id);
      if (!user) {
        console.error("Usuário não encontrado.");
        return;
      }

      const email = user.email;
      const otpSecret = user.otpSecret;
      const issuer = "FMS Dev Font";

      const username = email?.split("@")[0];

      if (user.totpIsEnable) {
        console.log("TOTP está ativado");
      } else {
        const generateOtpAuth = `otpauth://totp/${username}?secret=${otpSecret}&issuer=${issuer}`;
        const qrCodeUrl = await qrcode.toDataURL(generateOtpAuth);
        setQrCodeImage(qrCodeUrl);
      }
    } catch (error) {
      console.error("Erro ao obter o usuário", error);
    }
  };

  const onSubmit: SubmitHandler<qrCode> = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await verifyOTP(data.code, id as string);
      if (result) {
        await loginWithCode(id as string);
        await verifySession();
      } else {
        // Handle invalid OTP case
        console.error("OTP inválido");
      }
    } catch (error) {
      console.error("Erro ao verificar OTP:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (id) {
      getUser();
    }
  }, [id]);

  return (
    <div className="flex items-center justify-center h-screen mx-auto bg-primary">
      <Card className="max-w-[400px]">
        <CardHeader className="flex flex-col items-center justify-center text-center">
          {qrCodeImage && (
            <div className="flex flex-col items-center justify-center">
              <CardTitle className="m-2">
                Escaneie o QRCode com o Aplicativo Microsoft Authenticator!
              </CardTitle>
              <Image
                src={qrCodeImage}
                width={300}
                height={300}
                alt="QRCode do código de 6 dígitos"
              />
            </div>
          )}
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-2">
            <div className="space-y-1 flex items-center justify-center text-center flex-col gap-4">
              <Label htmlFor="code">Insira o Código de 6 dígitos</Label>
              <InputOTP maxLength={6} onChange={handleOTPChange}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              {errors.code && (
                <p className="text-red-700 text-sm">{errors.code.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex text-center items-center justify-center">
            <Button type="submit" disabled={isSubmitting || !isValid}>
              {isSubmitting ? "Carregando..." : "Enviar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Toaster />
    </div>
  );
}
