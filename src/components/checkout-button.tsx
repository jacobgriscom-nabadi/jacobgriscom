"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CheckoutButton() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function checkout() {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/checkout/crypto-sovereignty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        setError(data.error ?? "Checkout is unavailable right now.");
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Checkout is unavailable right now.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <Button onClick={checkout} disabled={pending} className="h-11 px-5" data-testid="button-checkout">
        {pending ? "Processing..." : "Begin Checkout"}
      </Button>
      {error ? <p className="mt-3 text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
