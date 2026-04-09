'use client';

import { useSupabaseClient } from "@/lib/supabase/client";
import { useUser } from "@clerk/nextjs";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Image as ImageIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreatePost() {
  const { user } = useUser();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', content.trim());
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await fetch('/api/community/posts', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setContent("");
        setIsFocused(false);
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        router.refresh();
      } else {
        console.error('Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) return null;

  return (
    <motion.div 
      layout
      className={`bg-[#121812] border border-white/5 rounded-2xl p-6 transition-all duration-300 ${isFocused ? 'border-[#4ade80]/20 ring-1 ring-[#4ade80]/10 shadow-2xl shadow-[#4ade80]/5' : ''}`}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/10">
          <img src={user.imageUrl} alt={user.firstName || "Me"} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              placeholder="What's your growth vision today?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-white/20 resize-none min-h-[60px] max-h-[300px] py-1 text-lg font-medium leading-relaxed overflow-hidden scrollbar-hide"
              style={{ height: 'auto' }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
            
            {imagePreview && (
              <div className="mt-4 relative">
                <img src={imagePreview} alt="Preview" className="w-full max-h-64 object-cover rounded-xl" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
            
            <AnimatePresence>
              {isFocused && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: 'auto' }}
                  exit={{ opacity: 0, y: 10, height: 0 }}
                  className="flex items-center justify-between mt-4 overflow-hidden"
                >
                  <div className="flex items-center gap-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      className="hidden"
                    />
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2.5 rounded-full bg-[#1a201a] text-white/40 hover:text-[#4ade80] transition-colors"
                    >
                      <ImageIcon size={18} />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsFocused(false)}
                      className="text-xs font-semibold uppercase tracking-wider text-white/20 hover:text-white transition-colors p-2"
                    >
                      Cancel
                    </button>
                  </div>
                  <button 
                    disabled={!content.trim() || isLoading}
                    className="flex items-center gap-2 px-6 h-10 rounded-full bg-[#4ade80] text-[#0a0f0a] font-bold text-sm tracking-wide disabled:opacity-30 disabled:grayscale transition-all active:scale-95 group"
                  >
                    <span>Growth Spark</span>
                    <Send size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
