'use client';

import { Heart, MessageSquare, Share2, MoreHorizontal, FileText, Download } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/nextjs";

export function PostCard({ post, profile }: { post: any; profile: any }) {
  const { user } = useUser();
  const authorName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Growth Member";
  const authorImage = profile?.image_url || "/placeholder-avatar.png";

  const isResourcePost = post.content?.includes("PDF") || post.content?.includes("Resource");

  return (
    <div className="bg-white rounded-[1rem] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-[#f2f4f5]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <img src={authorImage} alt={authorName} className="w-12 h-12 rounded-full object-cover bg-slate-200" />
          <div>
            <h4 className="font-bold text-[16px] text-[#191c1d]" style={{ fontFamily: "'Inter', sans-serif" }}>{authorName}</h4>
            <div className="text-[12px] text-[#6e7975] mt-0.5">
              Strategic Planning Expert &bull; {formatDistanceToNow(new Date(post.created_at))} ago
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
           {isResourcePost && (
              <span className="px-3 py-1 rounded-full bg-[#e6fcf2] text-[#006d36] text-[12px] font-bold tracking-wide" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                 Shared Resource
              </span>
           )}
           <button className="text-[#6e7975] hover:text-[#191c1d] transition-colors p-1">
             <MoreHorizontal size={20} />
           </button>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-[#3e4945] leading-relaxed text-[15px]" style={{ fontFamily: "'Inter', sans-serif" }}>
          {post.content}
        </p>

        {isResourcePost && (
          <div className="mt-4 flex items-center justify-between p-4 rounded-[0.5rem] bg-[#f8fafb] border border-[#e1e3e4]">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-[0.5rem] flex items-center justify-center text-[#ba1a1a] shadow-sm border border-[#eceeef]">
                   <FileText size={20} />
                </div>
                <div>
                   <p className="text-[14px] font-bold text-[#191c1d]">Deep_Work_Summary_SIGNET.pdf</p>
                   <p className="text-[12px] text-[#6e7975]">1.2 MB &bull; PDF Document</p>
                </div>
             </div>
             <button className="w-8 h-8 rounded-full bg-[#eceeef] text-[#6e7975] flex items-center justify-center hover:bg-[#e1e3e4] transition-colors">
                <Download size={16} />
             </button>
          </div>
        )}

        {post.image_url && !isResourcePost && (
          <div className="mt-4">
            <img 
              src={post.image_url} 
              alt="Post image" 
              className="w-full max-h-96 object-cover object-top rounded-[1rem] border border-[#e1e3e4]" 
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 mt-4">
        <button className="flex items-center gap-2 text-[#6e7975] hover:text-[#005746] transition-colors text-[14px] font-medium">
          <Heart size={18} />
          <span>{post.post_reactions?.length || 24}</span>
        </button>
        <button className="flex items-center gap-2 text-[#6e7975] hover:text-[#005746] transition-colors text-[14px] font-medium">
          <MessageSquare size={18} />
          <span>{post.post_comments?.length || 8}</span>
        </button>
        <button className="flex items-center gap-2 text-[#6e7975] hover:text-[#005746] transition-colors ml-2">
          <Share2 size={18} />
        </button>
      </div>
    </div>
  );
}
