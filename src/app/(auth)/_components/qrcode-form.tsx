import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { qrcodeSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { LoginWithId, updateTOTP, verifyOtpCode } from "../_actions/login";
import { useState } from "react";
import { useToast } from "@/app/utils/ToastContext";
import { useRouter } from "next/navigation";

type QrCodeFormData = z.infer<typeof qrcodeSchema>;

export const QrCodeForm: React.FC<{ qrcode: string; id: string }> = ({
  qrcode,
  id,
}) => {
  const { showToast } = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QrCodeFormData>({
    resolver: zodResolver(qrcodeSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: QrCodeFormData) => {
    setIsSubmitting(true);
    try {
      const response = await verifyOtpCode(data.code, id);
      if (response === true) {
        showToast("Código de autenticação verificado com sucesso!");
        await updateTOTP(id);
        await LoginWithId(id);
        router.push("/app");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <CardHeader>
        <CardTitle>Leia o Código Abaixo!</CardTitle>
        <CardDescription>
          Acesse o aplicativo de autenticação (Microsoft Authenticator) em seu
          telefone.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <Image src={qrcode} alt="QRCode" width={400} height={400} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-44 flex flex-col items-center justify-center gap-4"
        >
          <Input
            {...register("code")}
            className="text-center"
            id="code"
            placeholder="Código de verificação"
          />
          {errors.code && (
            <p className="text-red-700 text-sm">{errors.code.message}</p>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Verificando..." : "Verificar"}
          </Button>
        </form>
      </CardContent>
    </div>
  );
};
