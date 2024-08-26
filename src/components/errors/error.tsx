// components/errors/Error.tsx

"use client";

import React from "react";

export default function Error({
  message,
  reset,
}: {
  message: string;
  reset: () => void;
}) {
  return (
    <div className="p-4 bg-red-500 text-white rounded">
      <p>{message}</p>
    </div>
  );
}
