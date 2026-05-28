'use client';

import { useUser } from "@clerk/nextjs";
import { useState, useRef } from "react";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreatePost({ onPostCreated }: { onPostCreated?: () => void }) {
  const { user } = useUser();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        setSelectedImage(null);
        if (onPostCreated) {
          onPostCreated();
        } else {
          router.refresh();
        }
      } else {
        alert("Failed to publish post");
      }
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsLoading(false);
    }
  }

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-[#FFFFFF] border border-gray-200 rounded-[1.2rem] p-4 flex flex-col gap-4 font-dm-sans">
      <div className="flex gap-3 items-center">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-green-50 flex items-center justify-center ring-2 ring-gray-100">
          {user.imageUrl ? (
            <img src={user.imageUrl} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-150 text-gray-500 font-bold text-sm">
              {user.firstName ? user.firstName[0] : "U"}
            </div>
          )}
        </div>

        {/* Input area */}
        <input 
          type="text"
          placeholder="Share your thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-[15px] text-[#0F1419] placeholder-gray-400 py-2 font-medium"
        />

        {/* Post button */}
        <button
          type="submit"
          disabled={!content.trim() || isLoading}
          className="px-5 py-1.5 bg-[#1E6B3A] text-white rounded-full text-[14px] font-bold hover:bg-[#114B2A] transition-all disabled:opacity-50 shrink-0"
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>

      {/* Plus selector */}
      <div className="flex items-center justify-between border-t border-gray-50 pt-3">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-[#1E6B3A] hover:bg-[#EAF4EC]/40 transition-colors"
          >
            <Plus size={18} />
          </button>
          
          {selectedImage && (
            <div className="ml-3 flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
              <span className="truncate max-w-[150px]">{selectedImage.name}</span>
              <button 
                type="button" 
                onClick={() => setSelectedImage(null)} 
                className="text-red-500 hover:text-red-700"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setSelectedImage(e.target.files[0]);
          }
        }}
      />
    </form>
  );
}
