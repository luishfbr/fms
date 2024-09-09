"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { QrCode, Verify } from "../_actions/qrcode";
import Image from "next/image";
import styles from "@/app/app/styles/main.module.css";
import { Button } from "@/components/ui/button";
import ReactInputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/app/utils/ToastContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { signIn } from "@/services/auth";

interface QrCodeFormProps {
  code: string;
}

export const QrCodeForm = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  const [qrCode, setQrCode] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QrCodeFormProps>({
    resolver: zodResolver(
      z.object({ code: z.string().min(6, "Código inválido") })
    ),
  });

  const getQrCode = async () => {
    const response = await QrCode(id as string);
    setQrCode(response);
  };

  getQrCode();

  const onSubmit = async (formData: QrCodeFormProps) => {
    setIsSubmitting(true);
    try {
      const response = await Verify(formData.code, id as string);
      if (response) {
        showToast("Código de autenticação verificado com sucesso!");
        const email = response.email as string;

        router.push("/app");
      } else {
        showToast("Código de autenticação incorreto.");
      }
    } catch (error) {
      showToast("Falha ao verificar o código de autenticação.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      {qrCode ? (
        <>
          <CardHeader>
            <CardTitle>Leia o QRCode</CardTitle>
            <CardDescription>
              Acesse o aplicativo Microsoft Authenticator em seu telefone.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6 items-center justify-center">
              <Image src={qrCode} alt="QRCode" width={300} height={300} />
              <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  className="text-center"
                  type="text"
                  placeholder="Código de verificação"
                  {...register("code")}
                />
                {errors.code && (
                  <p className="text-red-700 text-sm">{errors.code.message}</p>
                )}
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Verificando..." : "Verificar"}
                </Button>
              </form>
            </div>
          </CardContent>
        </>
      ) : (
        <CardContent>
          <div className="flex items-center justify-center">
            <p>Aguarde enquanto o QRCode é gerado...</p>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
