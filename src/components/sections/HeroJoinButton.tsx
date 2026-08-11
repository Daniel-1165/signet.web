"use client";

import { useUser, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Signed-in members land in the dashboard; everyone else gets the sign-up
// modal. The label changes with the destination — a control should say what
// it actually does, not carry one name through two different outcomes.
//
// This is the site's one warm accent, following the reference heroes where a
// single hot pill is the only saturated thing on the page.
export default function HeroJoinButton() {
  const { isSignedIn, isLoaded } = useUser();

  const className =
 "group/btn inline-flex items-center gap-2.5 bg-wax hover:bg-[#75492C] text-canvas px-6 py-3 rounded-full font-medium text-sm transition-colors touch-manipulation";

  const arrow = (
    <ArrowRight
      className="w-4 h-4 group-hover/btn:translate-x-0.5 motion-reduce:group-hover/btn:translate-x-0"
      style={{ transition: "transform var(--dur-fast) var(--ease)" }}
      aria-hidden="true"
    />
  );

  if (isLoaded && isSignedIn) {
    return (
      <Link href="/dashboard" className={className}>
        <span>Go to Dashboard</span>
        {arrow}
      </Link>
    );
  }

  return (
    <SignUpButton mode="modal">
      <button type="button" className={className}>
        <span>Join SIGNET</span>
        {arrow}
      </button>
    </SignUpButton>
  );
}
