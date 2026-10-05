"use client";

import ParticipateDialogBox from "./participate";
import { useState } from "react";

export default function ParticipateButton({
  slug,
  eventId,
  eventTitle,
  participationOpen,
  participationClosedMessage,
}: {
  slug: string;
  eventId: string;
  eventTitle: string;
  participationOpen: boolean;
  participationClosedMessage: string;
}) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 border-2 border-[#f0a500]/60 text-white px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
      >
        Participate
      </button>

      <ParticipateDialogBox
        slug={slug}
        eventId={eventId}
        eventTitle={eventTitle}
        participationOpen={participationOpen}
        participationClosedMessage={participationClosedMessage}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
