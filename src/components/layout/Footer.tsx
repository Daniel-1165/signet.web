import Link from "next/link";
import { Mail, Instagram, Twitter, Linkedin, ArrowRight, MapPin, Phone } from "lucide-react";

const Footer = () => {
    return (
6:         <footer className="bg-[#F5F7F4] border-t border-[#D8CEBE]/40 pt-12 pb-8">
7:             <div className="max-w-7xl mx-auto px-6 lg:px-12">
8:                 {/* Upper Section with Newsletter */}
9:                 <div className="grid lg:grid-cols-2 gap-10 pb-12 border-b border-[#D8CEBE]/20">
10:                     <div>
11:                         <h3 className="text-[28px] md:text-[32px] font-bold text-[#1D1914] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
12:                             Stay in the <span className="italic font-normal text-[#6E7A67]">Silent Loop.</span>
13:                         </h3>
14:                         <p className="text-[#6E7A67] text-[15px] leading-relaxed max-w-md font-medium">
15:                             Join our monthly brief on architectural action and intentional growth strategies.
16:                         </p>
17:                     </div>
18:                     <div className="flex flex-col gap-3 justify-center">
19:                         <div className="flex bg-white rounded-2xl p-1.5 border border-[#D8CEBE]/40 shadow-sm focus-within:border-[#6E7A67] transition-all">
20:                             <input 
21:                                 type="email" 
22:                                 placeholder="Enter your email" 
23:                                 className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none text-[#1D1914] font-medium"
24:                             />
25:                             <button className="bg-[#1D1914] text-white px-6 py-2.5 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest hover:bg-[#6E7A67] transition-all flex items-center gap-2">
26:                                 Subscribe <ArrowRight size={14} />
27:                             </button>
28:                         </div>
29:                         <p className="text-[9px] text-[#6E7A67]/40 uppercase tracking-[0.2em] font-bold ml-2">
30:                             No noise. Just substance.
31:                         </p>
32:                     </div>
33:                 </div>
34: 
35:                 {/* Middle Section with Links - More Compact */}
36:                 <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 py-12">
37:                     {/* Brand Column */}
38:                     <div className="col-span-2 lg:col-span-1 space-y-6">
39:                         <Link href="/" className="block">
40:                             <img src="/signet-brand-logo.svg" alt="Signet Logo" className="h-8 w-auto object-contain" />
41:                         </Link>
42:                         <p className="text-[13px] text-[#6E7A67] leading-relaxed font-medium max-w-xs">
43:                             The curated ecosystem for high-performers seeking impact over volume.
44:                         </p>
45:                         <div className="flex gap-3">
46:                             {[Instagram, Twitter, Linkedin].map((Icon, i) => (
47:                                 <Link key={i} href="#" className="w-8 h-8 rounded-full border border-[#D8CEBE]/40 flex items-center justify-center text-[#6E7A67] hover:bg-[#1D1914] hover:text-white transition-all">
48:                                     <Icon size={16} />
49:                                 </Link>
50:                             ))}
51:                         </div>
52:                     </div>
53: 
54:                     {/* Platform Links */}
55:                     <div>
56:                         <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1D1914] mb-6">Platform</h4>
57:                         <ul className="space-y-3">
58:                             {[
59:                                 { name: "Dashboard", href: "/dashboard" },
60:                                 { name: "Resources", href: "/resources" },
61:                                 { name: "Exercises", href: "/dashboard/exercises" }
62:                             ].map(link => (
63:                                 <li key={link.name}>
64:                                     <Link href={link.href} className="text-[13px] text-[#6E7A67] hover:text-[#1D1914] transition-colors font-medium">
65:                                         {link.name}
66:                                     </Link>
67:                                 </li>
68:                             ))}
69:                         </ul>
70:                     </div>
71: 
72:                     {/* Support & Legal */}
73:                     <div>
74:                         <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#1D1914] mb-6">Collective</h4>
75:                         <ul className="space-y-3">
76:                             {[
77:                                 { name: "About Us", href: "/features" },
78:                                 { name: "Community Hub", href: "/dashboard/community" },
79:                                 { name: "Mentorship", href: "/join" }
80:                             ].map(link => (
81:                                 <li key={link.name}>
82:                                     <Link href={link.href} className="text-[13px] text-[#6E7A67] hover:text-[#1D1914] transition-colors font-medium">
83:                                         {link.name}
84:                                     </Link>
85:                                 </li>
86:                             ))}
87:                         </ul>
88:                     </div>
89:                 </div>
90: 
91:                 {/* Bottom Bar */}
92:                 <div className="pt-8 border-t border-[#D8CEBE]/20 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
93:                     <p className="text-[10px] font-bold text-[#6E7A67]/40 uppercase tracking-[0.2em]">
94:                         © {new Date().getFullYear()} Silent Growth Network.
95:                     </p>
96:                     <div className="flex items-center gap-4 text-[10px] font-black text-[#1D1914] uppercase tracking-widest">
97:                         <span>Established in Silence</span>
98:                         <div className="w-1 h-1 rounded-full bg-[#6E7A67]" />
99:                         <span>Architected for Growth</span>
100:                     </div>
101:                 </div>
102:             </div>
103:         </footer>
    );
};

export default Footer;
