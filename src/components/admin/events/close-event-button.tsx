"use client";

import { Lock, LockOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CloseEventButton({
  id,
  closed,
}: {
  id: string;
  closed: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ closed: !closed }),
      });

      if (!response.ok) throw new Error("Failed to update event status");
      router.refresh();
    } catch {
      window.alert("Unable to update the event status. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50 ${closed ? "text-green-700 hover:bg-green-50" : "text-amber-700 hover:bg-amber-50"}`}
    >
      {closed ? <LockOpen size={15} /> : <Lock size={15} />}
      {closed ? "Reopen" : "Close"}
    </button>
  );
}