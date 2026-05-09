'use client';

import { useState } from "react";
import { useSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Check, Loader2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SettingsForm({ initialData }: { initialData: any }) {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    bio: initialData?.bio || "",
    twitter_handle: initialData?.twitter_handle || "",
    website_url: initialData?.website_url || ""
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        bio: formData.bio,
        twitter_handle: formData.twitter_handle,
        website_url: formData.website_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', initialData.id);

    setIsLoading(false);
    if (!error) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      router.refresh();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-12">
      <div className="grid grid-cols-1 gap-12">
        <div className="space-y-3">
          <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6E7A67]">Growth Manifesto</label>
          <textarea
            placeholder="What is your mission within the network?"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full h-40 bg-[#FDFCFB] border border-[#D8CEBE]/40 rounded-2xl p-6 text-[#1D1914] placeholder:text-[#6E7A67]/30 focus:border-[#6E7A67]/60 transition-all focus:outline-none resize-none font-medium leading-relaxed"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6E7A67]/60">Twitter Identifier</label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6E7A67]/40 font-bold">@</span>
              <input
                type="text"
                placeholder="growth_leader"
                value={formData.twitter_handle}
                onChange={(e) => setFormData({ ...formData, twitter_handle: e.target.value })}
                className="w-full h-16 bg-[#FDFCFB] border border-[#D8CEBE]/40 rounded-2xl pl-12 pr-6 text-[#1D1914] font-medium focus:border-[#6E7A67]/60 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#6E7A67]/60">Digital Presence / URL</label>
            <input
              type="text"
              placeholder="https://signet.xyz"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              className="w-full h-16 bg-[#FDFCFB] border border-[#D8CEBE]/40 rounded-2xl px-6 text-[#1D1914] font-medium focus:border-[#6E7A67]/60 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="pt-6 flex flex-col md:flex-row md:items-center gap-8 border-t border-[#D8CEBE]/20">
        <button
          disabled={isLoading}
          className="relative px-12 h-14 rounded-xl bg-[#1D1914] text-white font-bold text-[13px] uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 overflow-hidden group min-w-[220px]"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center">
                <Loader2 className="animate-spin text-[#D8CEBF]" size={20} />
              </motion.div>
            ) : showSuccess ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-3">
                <Check size={18} className="text-[#D8CEBF]" />
                <span className="tracking-[0.1em]">Calibrated</span>
              </motion.div>
            ) : (
              <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-3">
                <span>Save Identity</span>
                <Sparkles size={16} className="text-[#D8CEBF]/40 group-hover:text-[#D8CEBF] transition-colors" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        {showSuccess && (
          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-[11px] font-bold text-[#6E7A67] uppercase tracking-[0.2em] italic">
            Your network profile has been synchronized.
          </motion.p>
        )}
      </div>
    </form>
  );
}
