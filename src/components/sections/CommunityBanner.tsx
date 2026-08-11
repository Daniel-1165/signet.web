"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUser, SignUpButton } from "@clerk/nextjs";

export default function CommunityBanner() {
  const { isSignedIn, isLoaded } = useUser();

  const buttonContent = (
    <span className="group/btn inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full border border-verdant/30 hover:border-verdant text-canvas font-semibold text-xs sm:text-sm hover:bg-verdant/10 transition-colors cursor-pointer whitespace-nowrap">
      <span>Join the community</span>
      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300 motion-reduce:transition-none" />
    </span>
  );

  return (
    <section className="relative py-8 md:py-12 overflow-hidden">
      <div className="relative w-full rounded-[2.5rem] bg-ink on-ink p-7 sm:p-10 md:p-14 overflow-hidden border border-verdant/12 flex flex-col justify-between">
        {/* A single low-alpha wash keeps the large flat panel from going dead */}
        <div className="absolute top-0 right-0 w-full md:w-[600px] h-full bg-verdant/[0.04] blur-[80px] -rotate-12 translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 w-full mb-6 md:mb-8">
          <span className="eyebrow eyebrow-on-ink mb-4">Community</span>
          <h3 className="font-display text-xl sm:text-3xl md:text-4xl font-semibold tracking-[-0.025em] leading-[1.15] text-canvas max-w-2xl">
            Real stories from our{" "}
            <span className="text-verdant">community</span>.
          </h3>
        </div>

        <div className="relative z-10 w-full flex items-center justify-between gap-5 md:gap-8">
          <div className="flex-grow border-t border-dashed border-verdant/20" />
          <div className="shrink-0">
            {isLoaded && isSignedIn ? (
              <Link href="/dashboard/community">{buttonContent}</Link>
            ) : (
              <SignUpButton mode="modal">{buttonContent}</SignUpButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
