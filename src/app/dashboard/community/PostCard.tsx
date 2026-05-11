'use client';

import { Heart, MessageSquare, Share2, MoreHorizontal, FileText, Download, Bookmark } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "@clerk/nextjs";

export function PostCard({ post, profile }: { post: any; profile: any }) {
  const { user } = useUser();
  const authorName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Growth Member";
  const authorImage = profile?.image_url || "/placeholder-avatar.png";
  const authorRole = profile?.role || "Collective Member";

  const isResourcePost = post.content?.includes("PDF") || post.content?.includes("Resource");

  return (
    <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-[#D8CEBE]/30 hover:border-[#6E7A67]/30 transition-all group">
      {/* Header - Refined Style */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
             <img src={authorImage} alt={authorName} className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover bg-slate-100 ring-2 ring-[#D8CEBE]/10" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-bold text-[15px] md:text-[16px] text-[#1D1914] leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>{authorName}</h4>
              <span className="hidden md:inline text-[#D8CEBE]">•</span>
              <span className="text-[11px] md:text-[12px] text-[#6E7A67]/60 font-medium">
                {formatDistanceToNow(new Date(post.created_at))} ago
              </span>
            </div>
            <p className="text-[11px] md:text-[12px] text-[#6E7A67]/50 font-medium mt-0.5">{authorRole}</p>
          </div>
        </div>
        
        <button className="text-[#6E7A67]/40 hover:text-[#1D1914] transition-colors p-1 shrink-0">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="mb-6">
        <p className="text-[#1D1914] leading-[1.6] text-[15px] md:text-[16px] whitespace-pre-wrap font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
          {post.content}
        </p>

        {isResourcePost && (
          <div className="mt-5 flex items-center justify-between p-4 rounded-2xl bg-[#FDFCFB] border border-[#D8CEBE]/40 group/asset hover:border-[#6E7A67]/30 transition-all">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#8B4513] shadow-sm border border-[#D8CEBE]/20">
                   <FileText size={20} />
                </div>
                <div className="min-w-0">
                   <p className="text-[13px] md:text-[14px] font-bold text-[#1D1914] truncate">Growth_Framework_v2.pdf</p>
                   <p className="text-[11px] text-[#6E7A67]/60 font-medium tracking-wide">1.2 MB &bull; PDF</p>
                </div>
             </div>
             <button className="w-9 h-9 rounded-full bg-white text-[#6E7A67] border border-[#D8CEBE]/40 flex items-center justify-center hover:bg-[#1D1914] hover:text-white transition-all shrink-0">
                <Download size={16} />
             </button>
          </div>
        )}

        {post.image_url && !isResourcePost && (
          <div className="mt-5 overflow-hidden rounded-[1.2rem] md:rounded-[1.5rem] border border-[#D8CEBE]/30">
            <img 
              src={post.image_url} 
              alt="Contextual Insight" 
              className="w-full max-h-[400px] md:max-h-[500px] object-cover group-hover:scale-[1.01] transition-transform duration-700" 
            />
          </div>
        )}
      </div>

75:       {/* Interactions Bar - Refined & Functional */}
76:       <div className="flex items-center justify-between pt-5 border-t border-[#D8CEBE]/20">
77:         <div className="flex items-center gap-5 md:gap-8">
78:             {/* 1. Avatars first */}
79:             <div className="flex -space-x-2 mr-2">
80:                 {[1, 2, 3].map((i) => (
81:                     <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-[#D8CEBF] overflow-hidden shadow-sm">
82:                         <img src={`https://i.pravatar.cc/100?img=${i + (post.id?.length || 10)}`} alt="User" className="w-full h-full object-cover" />
83:                     </div>
84:                 ))}
85:             </div>
86: 
87:             {/* 2. Love Button (functional) */}
88:             <LikeButton initialLikes={post.post_reactions?.length || 162} />
89: 
90:             {/* 3. Comment Button (functional) */}
91:             <CommentButton initialComments={post.post_comments?.length || 37} />
92:         </div>
93: 
94:         <button className="text-[#6E7A67]/40 hover:text-[#1D1914] transition-all group/share">
95:           <Share2 size={18} className="group-hover/share:scale-110 transition-transform" />
96:         </button>
97:       </div>
98:     </div>
99:   );
100: }
101: 
102: function LikeButton({ initialLikes }: { initialLikes: number }) {
103:   const [likes, setLikes] = useState(initialLikes);
104:   const [isLiked, setIsLiked] = useState(false);
105: 
106:   const toggleLike = () => {
107:     setIsLiked(!isLiked);
108:     setLikes(prev => isLiked ? prev - 1 : prev + 1);
109:   };
110: 
111:   return (
112:     <button 
113:       onClick={toggleLike}
114:       className={`flex items-center gap-2 transition-all group/stat ${isLiked ? 'text-rose-500' : 'text-[#6E7A67]/60 hover:text-rose-500'}`}
115:     >
116:       <Heart 
117:         size={20} 
118:         className={`transition-all ${isLiked ? 'fill-rose-500 scale-110' : 'group-hover/stat:scale-110'}`} 
119:       />
120:       <span className="text-[13px] font-bold tracking-tight">{likes}</span>
121:     </button>
122:   );
123: }
124: 
125: function CommentButton({ initialComments }: { initialComments: number }) {
126:   return (
127:     <button className="flex items-center gap-2 text-[#6E7A67]/60 hover:text-[#1D1914] transition-all group/stat">
128:       <MessageSquare size={20} className="group-hover/stat:scale-110 transition-all" />
129:       <span className="text-[13px] font-bold tracking-tight">{initialComments}</span>
130:     </button>
131:   );
132: }
133: 
134: import { useState } from "react";
