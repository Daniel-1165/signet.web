'use client';

import { useUser } from "@clerk/nextjs";
import { useState, useRef } from "react";
import { Image as ImageIcon, Paperclip } from "lucide-react";
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
    <div className="bg-white rounded-[1rem] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#f2f4f5]">
      <div className="flex gap-4">
        <div className="w-10 h-10 rounded-full bg-[#e1e3e4] shrink-0 overflow-hidden">
          {user.imageUrl && <img src={user.imageUrl} className="w-full h-full object-cover" />}
        </div>
        <div className="flex-1">
          <textarea
            placeholder="Share a growth insight or resource..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-[#f8fafb] border border-[#e1e3e4] rounded-[0.5rem] p-4 text-[14px] text-[#191c1d] placeholder:text-[#6e7975] focus:outline-none focus:border-[#83fba5] resize-none min-h-[100px] mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <button className="text-[#6e7975] hover:text-[#005746] transition-colors">
                <ImageIcon size={18} />
              </button>
              <button className="text-[#6e7975] hover:text-[#005746] transition-colors">
                <Paperclip size={18} />
              </button>
            </div>
            <button 
              onClick={handleSubmit}
              disabled={!content.trim() || isLoading}
              className="px-6 py-2 rounded-full bg-[#005746] text-white font-bold text-[14px] disabled:opacity-50 hover:bg-[#006d36] transition-colors"
            >
              Post Insight
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
