"use client";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const calendlyLink = "https://calendly.com/thenourishedgardens/calm-call";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 px-4 py-8">
      <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-background p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-background px-3 py-2 text-xl shadow transition-colors hover:bg-secondary"
          aria-label="Close booking popup"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mb-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm text-secondary-foreground">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Free Health Coaching Call
          </div>
          <h2 className="text-3xl font-bold text-foreground">
            Book your free call
          </h2>
          <p className="mt-3 text-secondary-foreground">
            Choose a time that works for you using the calendar below.
          </p>
        </div>
        <iframe
          title="Calendly booking calendar"
          src={calendlyLink}
          width="100%"
          height="700"
          frameBorder="0"
          className="rounded-2xl bg-background"
        />
      </div>
    </div>
  );
}
