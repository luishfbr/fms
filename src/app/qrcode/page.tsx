"use client";

import { ToastProvider } from "../utils/ToastContext";
import { QrCodeForm } from "./_components/qrcode-form";

export default function QrCodePage() {
  return (
    <ToastProvider>
      <QrCodeForm />
    </ToastProvider>
  );
}
