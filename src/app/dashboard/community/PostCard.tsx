'use client';

import { Heart, MessageSquare, Share2, MoreHorizontal, FileText, Download, Bookmark } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/nextjs";

export function PostCard({ post, profile }: { post: any; profile: any }) {
  const { user } = useUser();
  const authorName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Growth Member";
  const authorImage = profile?.image_url || "/placeholder-avatar.png";

  const isResourcePost = post.content?.includes("PDF") || post.content?.includes("Resource");

  return (
    <div className="bg-white rounded-[2rem] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-[#D8CEBE]/30 hover:border-[#6E7A67]/30 transition-all group">
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-5">
          <div className="relative">
             <img src={authorImage} alt={authorName} className="w-14 h-14 rounded-2xl object-cover bg-slate-100 ring-2 ring-[#D8CEBE]/10" />
             <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#6E7A67] rounded-full border-2 border-white" />
          </div>
          <div>
            <h4 className="font-bold text-[17px] text-[#1D1914]" style={{ fontFamily: "'Inter', sans-serif" }}>{authorName}</h4>
            <div className="text-[13px] text-[#6E7A67]/60 font-medium">
              Editorial Contributor &bull; {formatDistanceToNow(new Date(post.created_at))} ago
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
           {isResourcePost && (
              <span className="px-4 py-1.5 rounded-full bg-[#6E7A67]/5 text-[#6E7A67] text-[11px] font-bold tracking-widest uppercase" style={{ fontFamily: "'Inter', sans-serif" }}>
                 Knowledge Asset
              </span>
           )}
           <button className="text-[#6E7A67]/40 hover:text-[#1D1914] transition-colors p-1">
             <MoreHorizontal size={20} />
           </button>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-[#1D1914] leading-[1.6] text-[16px] whitespace-pre-wrap" style={{ fontFamily: "'Inter', sans-serif" }}>
          {post.content}
        </p>

        {isResourcePost && (
          <div className="mt-6 flex items-center justify-between p-5 rounded-2xl bg-[#FDFCFB] border border-[#D8CEBE]/40 group/asset hover:border-[#6E7A67]/30 transition-all">
             <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#8B4513] shadow-sm border border-[#D8CEBE]/20 group-hover/asset:scale-110 transition-transform">
                   <FileText size={24} />
                </div>
                <div>
                   <p className="text-[15px] font-bold text-[#1D1914]">Growth_Framework_v2.pdf</p>
                   <p className="text-[12px] text-[#6E7A67]/60 font-medium tracking-wide">1.2 MB &bull; PDF DOCUMENT</p>
                </div>
             </div>
             <button className="w-10 h-10 rounded-full bg-white text-[#6E7A67] border border-[#D8CEBE]/40 flex items-center justify-center hover:bg-[#1D1914] hover:text-white hover:border-[#1D1914] transition-all">
                <Download size={18} />
             </button>
          </div>
        )}

        {post.image_url && !isResourcePost && (
          <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-[#D8CEBE]/30">
            <img 
              src={post.image_url} 
              alt="Contextual Insight" 
              className="w-full max-h-[500px] object-cover group-hover:scale-[1.02] transition-transform duration-700" 
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-[#D8CEBE]/20">
        <div className="flex items-center gap-8">
          <button className="flex items-center gap-2.5 text-[#6E7A67]/60 hover:text-[#1D1914] transition-all group/stat">
            <Heart size={20} className="group-hover/stat:fill-[#1D1914] transition-all" />
            <span className="text-[14px] font-bold tracking-tight">{post.post_reactions?.length || 24}</span>
          </button>
          <button className="flex items-center gap-2.5 text-[#6E7A67]/60 hover:text-[#1D1914] transition-all group/stat">
            <MessageSquare size={20} className="group-hover/stat:scale-110 transition-all" />
            <span className="text-[14px] font-bold tracking-tight">{post.post_comments?.length || 8}</span>
          </button>
        </div>
        <div className="flex items-center gap-6">
           <button className="text-[#6E7A67]/40 hover:text-[#1D1914] transition-colors"><Bookmark size={20} /></button>
           <button className="text-[#6E7A67]/40 hover:text-[#1D1914] transition-colors"><Share2 size={20} /></button>
        </div>
      </div>
    </div>
  );
}
