"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sent");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-[#1D1914]/85">
          <span>Name</span>
          <input
            required
            type="text"
            name="name"
            placeholder="Your name"
            className="w-full rounded-3xl border border-[#D8CEBE] bg-[#F8F4EE] px-5 py-4 text-sm text-[#1D1914] outline-none transition focus:border-[#8A5A37] focus:ring-2 focus:ring-[#D8CEBF]/50"
          />
        </label>
        <label className="space-y-2 text-sm text-[#1D1914]/85">
          <span>Email</span>
          <input
            required
            type="email"
            name="email"
            placeholder="you@example.com"
            className="w-full rounded-3xl border border-[#D8CEBE] bg-[#F8F4EE] px-5 py-4 text-sm text-[#1D1914] outline-none transition focus:border-[#8A5A37] focus:ring-2 focus:ring-[#D8CEBF]/50"
          />
        </label>
        <label className="sm:col-span-2 space-y-2 text-sm text-[#1D1914]/85">
          <span>Project details</span>
          <textarea
            required
            name="message"
            rows={6}
            placeholder="Tell me about your idea, goals or timeline."
            className="w-full rounded-[1.75rem] border border-[#D8CEBE] bg-[#F8F4EE] px-5 py-4 text-sm text-[#1D1914] outline-none transition focus:border-[#8A5A37] focus:ring-2 focus:ring-[#D8CEBF]/50"
          />
        </label>
        <div className="sm:col-span-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <button
            type="submit"
            className="inline-flex h-14 items-center justify-center rounded-full bg-[#1D1914] px-8 text-sm font-semibold text-white transition hover:bg-[#37312b]"
          >
            Send message
          </button>
          {status === "sent" && (
            <p className="text-sm text-[#8A5A37]">Thanks — I’ll get back to you soon.</p>
          )}
        </div>
      </form>
    </div>
  );
}
