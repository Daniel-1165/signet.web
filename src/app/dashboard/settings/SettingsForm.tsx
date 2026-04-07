'use client';

import { useState } from "react";
import { useSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Check, Loader2 } from "lucide-react";
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
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-[#4ade80]">Growth Bio</label>
          <textarea
            placeholder="Tell us about your mission..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full h-32 bg-[#121812] border border-white/5 rounded-2xl p-5 text-white/80 focus:border-[#4ade80]/40 transition-colors focus:ring-0 focus:outline-none resize-none font-medium leading-relaxed"
          />
        </div>
        
        <div className="space-y-8">
          <div className="space-y-2 text-white">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Twitter Profile</label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 font-bold">@</span>
              <input
                type="text"
                placeholder="growth_leader"
                value={formData.twitter_handle}
                onChange={(e) => setFormData({ ...formData, twitter_handle: e.target.value })}
                className="w-full h-14 bg-[#121812] border border-white/5 rounded-2xl pl-10 pr-5 text-white/80 focus:border-[#4ade80]/40 transition-colors focus:ring-0 focus:outline-none font-medium"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40">Portfolio / Academy URL</label>
            <input
              type="text"
              placeholder="https://signet.xyz"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              className="w-full h-14 bg-[#121812] border border-white/5 rounded-2xl px-5 text-white/80 focus:border-[#4ade80]/40 transition-colors focus:ring-0 focus:outline-none font-medium"
            />
          </div>
        </div>
      </div>

      <div className="pt-4 flex items-center gap-6">
        <button
          disabled={isLoading}
          className="relative px-12 h-14 rounded-2xl bg-[#4ade80] text-[#0a0f0a] font-bold text-sm tracking-wide transition-all active:scale-95 disabled:opacity-50 overflow-hidden group min-w-[180px]"
        >
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center">
                <Loader2 className="animate-spin" size={20} />
              </motion.div>
            ) : showSuccess ? (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                <Check size={20} />
                <span>Updated</span>
              </motion.div>
            ) : (
              <motion.span key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Save Profile
              </motion.span>
            )}
          </AnimatePresence>
        </button>
        {showSuccess && (
          <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-xs font-bold text-[#4ade80] uppercase tracking-widest">
            Profile sync complete.
          </motion.p>
        )}
      </div>
    </form>
  );
}
