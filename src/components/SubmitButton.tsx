"use client";

import Button from "@/components/Button";
export function SubmitButton({ isPending }: { isPending: boolean }) {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending ? "Cargando ..." : "Agregar miembro"}
    </Button>
  );
}
