"use client";

import { motion } from "framer-motion";
import { 
    MessageCircle, 
    Repeat2, 
    Heart, 
    BarChart3,
    Share,
    Bookmark,
    MoreHorizontal,
    Search,
    Settings,
    Image as ImageIcon,
    Smile,
    CalendarDays,
    MapPin,
    Sparkles,
    BadgeCheck,
    Home,
    Bell,
    Mail,
    Users,
    Hash,
    Flame,
    TrendingUp,
    Verified
} from "lucide-react";

const Community = () => {
    const posts = [
        {
            id: 1,
            author: "Astraeus",
            handle: "@astraeus_",
            verified: true,
            avatar: "AS",
            avatarColor: "bg-foreground text-background",
            content: "The roots of sustained growth are often invisible. Focus on the 1% compound daily.\n\nWho else is hitting their deep work target today? 🌲",
            image: "/community_roots.png",
            time: "2h",
            replies: 42,
            reposts: 18,
            likes: 247,
            views: "12.4K",
            bookmarked: false,
        },
        {
            id: 2,
            author: "Valerius",
            handle: "@val_strategist",
            verified: true,
            avatar: "VA",
            avatarColor: "bg-accent text-white",
            content: "Just finished the 'Iron Sustainability' module. The mental framework for decision-making under pressure is genuinely a game changer.\n\nMorning routine has never been this dialed in. Highly recommend to anyone in the current cohort.",
            time: "4h",
            replies: 13,
            reposts: 7,
            likes: 89,
            views: "3.2K",
            bookmarked: true,
        },
        {
            id: 3,
            author: "Zenith",
            handle: "@zenith_hq",
            verified: false,
            avatar: "ZN",
            avatarColor: "bg-foreground text-background",
            content: "3 hours of deep focus done before 9am. The flow state is real today.\n\nAnyone else notice that consistency compounds faster than intensity? The data from my last 30 days is wild 📈",
            time: "5h",
            replies: 8,
            reposts: 3,
            likes: 64,
            views: "1.8K",
            bookmarked: false,
        },
    ];

    const trends = [
        { category: "Growth", topic: "#DeepWorkNetwork", posts: "2,847" },
        { category: "Sustainability", topic: "Iron Sustainability Cohort", posts: "1,204" },
        { category: "Wellness", topic: "#DigitalFasting", posts: "943" },
        { category: "Mindset", topic: "Morning Routines", posts: "5,621" },
    ];

    const whoToFollow = [
        { name: "Marcus Aurelius", handle: "@stoic_arch", avatar: "MA", color: "bg-foreground", verified: true },
        { name: "Eleanor", handle: "@el_growth", avatar: "EL", color: "bg-accent", verified: false },
        { name: "Rhys James", handle: "@rhys_j", avatar: "RJ", color: "bg-foreground", verified: true },
    ];

    const navItems = [
        { icon: Home, label: "Home", active: true },
        { icon: Search, label: "Explore", active: false },
        { icon: Bell, label: "Notifications", active: false },
        { icon: Mail, label: "Messages", active: false },
        { icon: Users, label: "Community", active: false },
    ];

    const formatNumber = (num: number) => {
        if (num >= 1000) return (num / 1000).toFixed(1) + "K";
        return num.toString();
    };

    return (
        <section id="community" className="py-24 bg-background">
            <div className="mx-auto max-w-7xl px-6 lg:px-12">
                {/* Section Header */}
                <motion.div
                    className="mb-12 text-left"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-accent/80 mb-4">The Network</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground leading-[1.1]">
                        Where Growth Happens<br />
                        <span className="text-foreground/30">in Real Time.</span>
                    </h2>
                    <p className="mt-5 text-base text-foreground/50 max-w-lg">
                        A private feed of ideas, breakthroughs, and accountability from high-performers building in public.
                    </p>
                </motion.div>

                {/* Twitter/X Clone Container */}
                <motion.div 
                    className="rounded-2xl border border-black/[0.08] bg-white shadow-[0_20px_60px_rgb(0,0,0,0.06)] overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-[68px_1fr_350px] h-[720px]">
                        
                        {/* Left Sidebar — Icon Nav (X-style compact) */}
                        <div className="hidden lg:flex flex-col items-center py-4 border-r border-black/[0.06]">
                            {/* Logo */}
                            <div className="mb-6 mt-2">
                                <div className="h-8 w-8 rounded-full bg-foreground flex items-center justify-center">
                                    <Sparkles className="h-4 w-4 text-white" />
                                </div>
                            </div>

                            {/* Nav Icons */}
                            <nav className="flex-1 flex flex-col items-center gap-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.label}
                                            className={`h-12 w-12 flex items-center justify-center rounded-full transition-all duration-200 ${
                                                item.active 
                                                    ? "text-foreground bg-black/[0.04]" 
                                                    : "text-foreground/40 hover:bg-black/[0.03] hover:text-foreground/70"
                                            }`}
                                            title={item.label}
                                        >
                                            <Icon className="h-[22px] w-[22px]" strokeWidth={item.active ? 2.5 : 1.8} />
                                        </button>
                                    );
                                })}
                            </nav>

                            {/* Profile Avatar at bottom */}
                            <div className="mt-auto mb-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-signet-green to-emerald-700 flex items-center justify-center text-[11px] font-bold text-white cursor-pointer hover:ring-2 hover:ring-signet-green/20 transition-all">
                                    DS
                                </div>
                            </div>
                        </div>

                        {/* Center — Main Feed */}
                        <div className="flex flex-col h-full border-r border-black/[0.06]">
                            {/* Feed Header */}
                            <div className="sticky top-0 z-10 border-b border-black/[0.06] bg-white/80 backdrop-blur-md">
                                <div className="flex items-center justify-between px-4 pt-3 pb-0">
                                    <h3 className="text-[17px] font-bold text-foreground">Home</h3>
                                    <button className="p-2 rounded-full hover:bg-black/[0.04] text-foreground/50 transition-colors">
                                        <Settings className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="flex">
                                    <button className="flex-1 py-3 text-sm font-bold text-foreground relative hover:bg-black/[0.02] transition-colors">
                                        For you
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-signet-green rounded-full" />
                                    </button>
                                    <button className="flex-1 py-3 text-sm font-medium text-foreground/40 hover:bg-black/[0.02] hover:text-foreground/60 transition-colors">
                                        Following
                                    </button>
                                </div>
                            </div>

                            {/* Compose Box */}
                            <div className="px-4 py-3 border-b border-black/[0.06]">
                                <div className="flex gap-3">
                                    <div className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-signet-green to-emerald-700 flex items-center justify-center text-[11px] font-bold text-white">
                                        DS
                                    </div>
                                    <div className="flex-1">
                                        <input 
                                            type="text"
                                            placeholder="What is happening?!"
                                            className="w-full text-xl text-foreground placeholder:text-foreground/25 py-2 outline-none bg-transparent font-light"
                                        />
                                        <div className="flex items-center justify-between mt-2 pt-3 border-t border-black/[0.04]">
                                            <div className="flex items-center gap-0.5">
                                                <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-signet-green/10 text-signet-green transition-colors">
                                                    <ImageIcon className="h-[18px] w-[18px]" />
                                                </button>
                                                <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-signet-green/10 text-signet-green transition-colors">
                                                    <Smile className="h-[18px] w-[18px]" />
                                                </button>
                                                <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-signet-green/10 text-signet-green transition-colors">
                                                    <CalendarDays className="h-[18px] w-[18px]" />
                                                </button>
                                                <button className="h-9 w-9 flex items-center justify-center rounded-full hover:bg-signet-green/10 text-signet-green transition-colors">
                                                    <MapPin className="h-[18px] w-[18px]" />
                                                </button>
                                            </div>
                                            <button className="h-9 px-5 bg-signet-green text-white text-sm font-bold rounded-full hover:bg-signet-green/90 transition-colors shadow-sm">
                                                Post
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Posts Feed */}
                            <div className="flex-1 overflow-y-auto">
                                {posts.map((post) => (
                                    <article 
                                        key={post.id} 
                                        className="px-4 py-3 border-b border-black/[0.06] hover:bg-black/[0.01] transition-colors cursor-pointer"
                                    >
                                        <div className="flex gap-3">
                                            {/* Avatar */}
                                            <div className={`h-10 w-10 shrink-0 rounded-full ${post.avatarColor} flex items-center justify-center text-[11px] font-bold text-white`}>
                                                {post.avatar}
                                            </div>

                                            {/* Post Content */}
                                            <div className="flex-1 min-w-0">
                                                {/* Author Line */}
                                                <div className="flex items-center gap-1 mb-0.5">
                                                    <span className="font-bold text-[15px] text-foreground hover:underline truncate">
                                                        {post.author}
                                                    </span>
                                                    {post.verified && (
                                                        <BadgeCheck className="h-[18px] w-[18px] text-signet-green fill-signet-green/10 shrink-0" />
                                                    )}
                                                    <span className="text-[15px] text-foreground/40 truncate">
                                                        {post.handle}
                                                    </span>
                                                    <span className="text-foreground/30">·</span>
                                                    <span className="text-[15px] text-foreground/40 shrink-0 hover:underline">
                                                        {post.time}
                                                    </span>
                                                    <button className="ml-auto p-1.5 rounded-full hover:bg-signet-green/10 text-foreground/30 hover:text-signet-green transition-colors shrink-0">
                                                        <MoreHorizontal className="h-[18px] w-[18px]" />
                                                    </button>
                                                </div>

                                                {/* Post Text */}
                                                <p className="text-[15px] leading-[1.45] text-foreground whitespace-pre-line mb-3">
                                                    {post.content}
                                                </p>

                                                {/* Post Image */}
                                                {post.image && (
                                                    <div className="mb-3 rounded-2xl overflow-hidden border border-black/[0.08]">
                                                        <img 
                                                            src={post.image} 
                                                            alt="" 
                                                            className="w-full max-h-[280px] object-cover"
                                                        />
                                                    </div>
                                                )}

                                                {/* Action Buttons — exactly like X */}
                                                <div className="flex items-center justify-between max-w-[425px] -ml-2 mt-1">
                                                    {/* Reply */}
                                                    <button className="group flex items-center gap-1.5">
                                                        <div className="h-[34px] w-[34px] flex items-center justify-center rounded-full group-hover:bg-sky-500/10 transition-colors">
                                                            <MessageCircle className="h-[18px] w-[18px] text-foreground/40 group-hover:text-sky-500 transition-colors" />
                                                        </div>
                                                        <span className="text-[13px] text-foreground/40 group-hover:text-sky-500 transition-colors">{post.replies}</span>
                                                    </button>

                                                    {/* Repost */}
                                                    <button className="group flex items-center gap-1.5">
                                                        <div className="h-[34px] w-[34px] flex items-center justify-center rounded-full group-hover:bg-green-500/10 transition-colors">
                                                            <Repeat2 className="h-[18px] w-[18px] text-foreground/40 group-hover:text-green-500 transition-colors" />
                                                        </div>
                                                        <span className="text-[13px] text-foreground/40 group-hover:text-green-500 transition-colors">{post.reposts}</span>
                                                    </button>

                                                    {/* Like */}
                                                    <button className="group flex items-center gap-1.5">
                                                        <div className="h-[34px] w-[34px] flex items-center justify-center rounded-full group-hover:bg-pink-500/10 transition-colors">
                                                            <Heart className={`h-[18px] w-[18px] transition-colors ${post.bookmarked ? "text-pink-500 fill-pink-500" : "text-foreground/40 group-hover:text-pink-500"}`} />
                                                        </div>
                                                        <span className={`text-[13px] transition-colors ${post.bookmarked ? "text-pink-500" : "text-foreground/40 group-hover:text-pink-500"}`}>{post.likes}</span>
                                                    </button>

                                                    {/* Views */}
                                                    <button className="group flex items-center gap-1.5">
                                                        <div className="h-[34px] w-[34px] flex items-center justify-center rounded-full group-hover:bg-sky-500/10 transition-colors">
                                                            <BarChart3 className="h-[18px] w-[18px] text-foreground/40 group-hover:text-sky-500 transition-colors" />
                                                        </div>
                                                        <span className="text-[13px] text-foreground/40 group-hover:text-sky-500 transition-colors">{post.views}</span>
                                                    </button>

                                                    {/* Bookmark + Share */}
                                                    <div className="flex items-center">
                                                        <button className="group">
                                                            <div className="h-[34px] w-[34px] flex items-center justify-center rounded-full group-hover:bg-sky-500/10 transition-colors">
                                                                <Bookmark className={`h-[18px] w-[18px] transition-colors ${post.bookmarked ? "text-sky-500 fill-sky-500" : "text-foreground/40 group-hover:text-sky-500"}`} />
                                                            </div>
                                                        </button>
                                                        <button className="group">
                                                            <div className="h-[34px] w-[34px] flex items-center justify-center rounded-full group-hover:bg-sky-500/10 transition-colors">
                                                                <Share className="h-[18px] w-[18px] text-foreground/40 group-hover:text-sky-500 transition-colors" />
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                ))}

                                {/* Show More */}
                                <div className="px-4 py-4">
                                    <button className="text-signet-green text-[15px] hover:underline">
                                        Show more
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar — Search, Trends, Who to Follow */}
                        <div className="hidden lg:flex flex-col h-full overflow-y-auto">
                            {/* Search */}
                            <div className="p-3 sticky top-0 bg-white z-10">
                                <div className="flex items-center gap-3 bg-[#F0F2EC] rounded-full px-4 py-2.5 focus-within:bg-white focus-within:ring-2 focus-within:ring-signet-green/30 focus-within:border-signet-green transition-all border border-transparent">
                                    <Search className="h-4 w-4 text-foreground/30 shrink-0" />
                                    <input 
                                        type="text"
                                        placeholder="Search"
                                        className="bg-transparent text-[15px] outline-none w-full placeholder:text-foreground/30"
                                    />
                                </div>
                            </div>

                            {/* Trending */}
                            <div className="mx-3 mt-1 rounded-2xl bg-[#F7F8F5] overflow-hidden">
                                <h3 className="text-[20px] font-extrabold text-foreground px-4 pt-3 pb-2">Trends for you</h3>
                                {trends.map((trend, i) => (
                                    <button key={i} className="w-full text-left px-4 py-3 hover:bg-black/[0.03] transition-colors">
                                        <div className="flex items-center justify-between">
                                            <p className="text-[13px] text-foreground/40">{trend.category} · Trending</p>
                                            <MoreHorizontal className="h-[18px] w-[18px] text-foreground/30" />
                                        </div>
                                        <p className="text-[15px] font-bold text-foreground mt-0.5">{trend.topic}</p>
                                        <p className="text-[13px] text-foreground/40 mt-0.5">{trend.posts} posts</p>
                                    </button>
                                ))}
                                <button className="w-full text-left px-4 py-3 text-signet-green text-[15px] hover:bg-black/[0.03] transition-colors">
                                    Show more
                                </button>
                            </div>

                            {/* Who to Follow */}
                            <div className="mx-3 mt-4 rounded-2xl bg-[#F7F8F5] overflow-hidden mb-4">
                                <h3 className="text-[20px] font-extrabold text-foreground px-4 pt-3 pb-2">Who to follow</h3>
                                {whoToFollow.map((user, i) => (
                                    <button key={i} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/[0.03] transition-colors">
                                        <div className={`h-10 w-10 shrink-0 rounded-full ${user.color} flex items-center justify-center text-[11px] font-bold text-white`}>
                                            {user.avatar}
                                        </div>
                                        <div className="flex-1 text-left min-w-0">
                                            <div className="flex items-center gap-1">
                                                <span className="text-[15px] font-bold text-foreground hover:underline truncate">{user.name}</span>
                                                {user.verified && (
                                                    <BadgeCheck className="h-[18px] w-[18px] text-signet-green fill-signet-green/10 shrink-0" />
                                                )}
                                            </div>
                                            <p className="text-[13px] text-foreground/40 truncate">{user.handle}</p>
                                        </div>
                                        <div className="shrink-0">
                                            <span className="inline-flex h-8 px-4 items-center justify-center rounded-full bg-foreground text-white text-[13px] font-bold hover:bg-foreground/80 transition-colors">
                                                Follow
                                            </span>
                                        </div>
                                    </button>
                                ))}
                                <button className="w-full text-left px-4 py-3 text-signet-green text-[15px] hover:bg-black/[0.03] transition-colors">
                                    Show more
                                </button>
                            </div>

                            {/* Footer Links */}
                            <div className="px-4 pb-4">
                                <p className="text-[13px] text-foreground/25 leading-relaxed">
                                    Terms of Service · Privacy Policy · Accessibility · © 2025 Signet Network
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Community;
