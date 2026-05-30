"use client";

import { useUser, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroJoinButton() {
  const { isSignedIn, isLoaded } = useUser();

  if (isLoaded && isSignedIn) {
    return (
      <Link 
        href="/dashboard" 
        className="flex items-center gap-3 group/btn text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full border border-white/20 backdrop-blur-md transition-all"
      >
        <span className="text-[11px] font-bold tracking-widest uppercase">Join SIGNET</span>
        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
      </Link>
    );
  }

  return (
    <SignUpButton mode="modal">
      <button 
        className="flex items-center gap-3 group/btn text-white bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full border border-white/20 backdrop-blur-md transition-all"
      >
        <span className="text-[11px] font-bold tracking-widest uppercase">Join SIGNET</span>
        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
      </button>
    </SignUpButton>
  );
}
