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
    <form onSubmit={handleSubmit} className="bg-surface flex gap-3 font-sans items-start w-full">
      {/* Avatar on the left, outside the input box */}
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shrink-0 bg-green-50 flex items-center justify-center border border-gray-100">
        {user.imageUrl ? (
          <img src={user.imageUrl} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-150 text-gray-500 font-bold text-sm">
            {user.firstName ? user.firstName[0] : "U"}
          </div>
        )}
      </div>

      {/* Input box and actions column */}
      <div className="flex-1 flex flex-col gap-2.5 min-w-0">
        {/* White input box containing placeholder and Post button inline */}
        <div className="flex items-center bg-surface border border-gray-200 rounded-[1.2rem] pl-4 pr-2 py-1.5 shadow-sm focus-within:border-seal transition-all w-full min-w-0">
          <input 
            type="text"
            placeholder="Share your thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-[15px] text-ink placeholder-gray-400 py-1.5 mr-2 font-medium"
          />

          {/* Post button inside input box */}
          <button
            type="submit"
            disabled={!content.trim() || isLoading}
            className="h-8 px-5 bg-seal text-white rounded-full text-[14px] font-bold hover:bg-seal transition-all disabled:opacity-50 shrink-0 flex items-center justify-center"
          >
            {isLoading ? "Posting..." : "Post"}
          </button>
        </div>

        {/* Plus button outside / below the input box */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-seal hover:bg-mist/40 transition-colors"
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
