"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type EventStatus = "draft" | "published" | "closed";

export function EventStatusSelect({
  id,
  published,
  closed,
  title,
}: {
  id: string;
  published: boolean;
  closed: boolean;
  title: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const status: EventStatus = closed ? "closed" : published ? "published" : "draft";

  async function handleChange(nextStatus: EventStatus) {
    setLoading(true);
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          published: nextStatus === "published",
          closed: nextStatus === "closed",
        }),
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
    <select
      value={status}
      onChange={(event) => handleChange(event.currentTarget.value as EventStatus)}
      disabled={loading}
      aria-label={`Change status for ${title}`}
      className="rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-600/20 disabled:opacity-50"
    >
      <option value="draft">Draft</option>
      <option value="published">Published</option>
      <option value="closed">Closed</option>
    </select>
  );
}