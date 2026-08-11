"use client";

import { useUser, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Signed-in members land in the dashboard; everyone else gets the sign-up
// modal. The label changes with the destination — a control should say what
// it actually does, not carry one name through two different outcomes.
export default function HeroJoinButton() {
  const { isSignedIn, isLoaded } = useUser();

  const className =
    "group/btn inline-flex items-center gap-3 text-ink bg-canvas hover:bg-mist px-7 py-3.5 rounded-full font-semibold text-sm transition-all hover:-translate-y-px";

  const arrow = (
    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform motion-reduce:transition-none" />
  );

  if (isLoaded && isSignedIn) {
    return (
      <Link href="/dashboard" className={className}>
        <span>Go to dashboard</span>
        {arrow}
      </Link>
    );
  }

  return (
    <SignUpButton mode="modal">
      <button className={className}>
        <span>Join SIGNET</span>
        {arrow}
      </button>
    </SignUpButton>
  );
}
