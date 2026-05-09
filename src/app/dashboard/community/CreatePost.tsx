'use client';

import { useUser } from "@clerk/nextjs";
import { useState, useRef } from "react";
import { Image as ImageIcon, Paperclip, Send, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreatePost() {
  const { user } = useUser();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', content.trim());

      const response = await fetch('/api/community/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setContent("");
        router.refresh();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-4 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-[#D8CEBE]/40 group transition-all focus-within:border-[#6E7A67]/40">
      <div className="flex gap-4 md:gap-6">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full md:rounded-2xl bg-[#6E7A67]/10 shrink-0 overflow-hidden ring-2 ring-[#D8CEBE]/10">
          {user.imageUrl && <img src={user.imageUrl} className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1">
          <textarea
            placeholder="Contribute a growth insight..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[#FDFCFB] border border-[#D8CEBE]/30 rounded-[1.2rem] md:rounded-2xl p-4 md:p-5 text-[14px] md:text-[15px] text-[#1D1914] placeholder:text-[#6E7A67]/40 focus:outline-none focus:bg-white focus:border-[#6E7A67]/40 transition-all resize-none min-h-[100px] md:min-h-[120px] mb-4 md:mb-6 font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-4 md:gap-6">
              <button type="button" className="flex items-center gap-2 text-[#6E7A67]/60 hover:text-[#1D1914] transition-all text-[10px] md:text-xs font-bold uppercase tracking-widest group/icon">
                <ImageIcon size={16} className="md:w-[18px] md:h-[18px] group-hover/icon:scale-110 transition-transform" />
                <span>Media</span>
              </button>
              <button type="button" className="flex items-center gap-2 text-[#6E7A67]/60 hover:text-[#1D1914] transition-all text-xs font-bold uppercase tracking-widest group/icon">
                <Paperclip size={18} className="group-hover/icon:scale-110 transition-transform" />
                <span>Asset</span>
              </button>
            </div>
            <button 
              type="submit"
              disabled={!content.trim() || isLoading}
              className="flex items-center gap-3 px-8 py-3 rounded-xl bg-[#1D1914] text-white font-bold text-[13px] uppercase tracking-[0.15em] disabled:opacity-20 hover:bg-[#6E7A67] hover:shadow-[0_8px_20px_rgba(110,122,103,0.3)] transition-all disabled:pointer-events-none"
            >
              {isLoading ? "Publishing..." : "Publish Insight"}
              <Send size={14} className={isLoading ? "animate-pulse" : ""} />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
