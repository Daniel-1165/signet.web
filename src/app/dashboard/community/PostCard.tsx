'use client';

import { motion } from "framer-motion";
import { MessageSquare, Heart, Share2, MoreHorizontal, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function PostCard({ post, profile }: { post: any; profile: any }) {
  const authorName = profile ? `${profile.first_name || ''} ${profile.last_name || ''}`.trim() : "Growth Member";
  const authorImage = profile?.image_url || "/placeholder-avatar.png";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[#121812] border border-white/5 rounded-2xl p-6 group hover:border-[#4ade80]/15 hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-white/10 ring-2 ring-[#4ade80]/0 group-hover:ring-[#4ade80]/20 transition-all">
            <img src={authorImage} alt={authorName} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-bold text-lg tracking-tight group-hover:text-[#4ade80] transition-colors">{authorName}</h4>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/20">
              <Clock size={12} className="shrink-0" />
              <span>{formatDistanceToNow(new Date(post.created_at))} ago</span>
            </div>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-[#1a201a] text-white/40 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="mb-6">
        <p className="text-[#a5b0a5] leading-relaxed text-lg font-medium whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      <div className="flex items-center gap-6 pt-6 border-t border-white/5">
        <ActionButton icon={<Heart size={18} />} count={0} label="Applaud" />
        <ActionButton icon={<MessageSquare size={18} />} count={0} label="Insight" />
        <ActionButton icon={<Share2 size={18} />} count={0} label="Circulate" />
      </div>
    </motion.div>
  );
}

function ActionButton({ icon, count, label }: { icon: React.ReactNode; count: number; label: string }) {
  return (
    <button className="flex items-center gap-2.5 text-white/40 hover:text-white transition-all group/btn">
      <div className="p-2 rounded-xl group-hover/btn:bg-[#1a201a] transition-colors">
        {icon}
      </div>
      <span className="text-xs font-bold uppercase tracking-widest group-hover/btn:opacity-100 opacity-60 transition-opacity">
        {label}
      </span>
      {count > 0 && <span className="text-sm font-mono">{count}</span>}
    </button>
  );
}
