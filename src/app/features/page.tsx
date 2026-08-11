import {
  Calendar, Award, Clock, ArrowRight,
  Target, Heart, Eye, Flag,
  MessageCircle, Mail, Facebook, Instagram
} from "lucide-react";
import Footer from "@/components/layout/Footer";
import Testimonials from "@/components/sections/Testimonials";
import Link from "next/link";
import { sanityFetch } from "@/lib/sanity/client";
import { GET_PAGE_BY_SLUG } from "@/lib/sanity/queries";
import { PortableText } from "next-sanity";

export default async function FeaturesPage() {
  const pageData = await sanityFetch({
    query: GET_PAGE_BY_SLUG,
    params: { slug: "features" }
  });

  const featuredImage = pageData?.featuredImage?.asset?.url || "/mentorship_new.png";

  return (
    <div className="relative min-h-screen bg-canvas text-ink font-sans selection:bg-mist selection:text-seal pb-20">
      <main>
        
        {/* ── HERO SECTION: LOCKED IN ─────────────────────────────── */}
        <section className="relative w-full h-[600px] md:h-[750px] overflow-hidden flex items-center">
            <img 
                src="/forest_hero_bg.png" 
                alt="Forest Background" 
                className="absolute inset-0 w-full h-full object-cover brightness-[0.6] grayscale-[0.2]"
                loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-canvas" />
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-20">
                <div className="max-w-4xl space-y-8">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-[1px] bg-mist/60" />
                        <span className="text-[11px] font-semibold tracking-[0.4em] uppercase text-mist" >
                            {pageData?.title || "EMPLOY. GROW. LEAD."}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-semibold leading-[0.95] tracking-tight text-white font-sans" >
                        Now, we are <br />
                        <span className="italic font-light text-mist">Locked In...</span>
                    </h1>
                    <p className="text-lg md:text-2xl text-white/80 max-w-2xl leading-relaxed italic font-light" >
                        True evolution doesn't announce itself. It grows in the quiet spaces between effort and reflection.
                    </p>
                </div>
            </div>
        </section>

        {/* ── THE SIGNET STORY ────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-16 md:gap-24 items-center">
                <div className="space-y-10">
                    <div>
                        <span className="text-[11px] font-semibold tracking-[0.3em] text-seal uppercase mb-4 block font-sans" >The Foundation</span>
                        <h2 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight text-ink font-sans" >
                            The <span className="italic font-light text-seal">SIGNET</span> Story
                        </h2>
                    </div>
                    <div className="space-y-6 text-[16px] md:text-[18px] text-ink/80 leading-relaxed font-normal font-sans" >
                        {pageData?.content ? (
                           <div className="prose prose-lg prose-signet text-ink/80 font-sans">
                              <PortableText value={pageData.content} />
                           </div>
                        ) : (
                          <>
                            <p>At SIGNET, we believe that the most significant transformations happen when the world is quiet. Our "Silent Growth" philosophy isn't about isolation; it's about intentional focus. In an era of constant noise and performative achievement, we provide a sanctuary for depth.</p>
                            <p>We measure impact by depth, not decibels. Our network was founded on the principle that true leadership and emotional intelligence are forged in quiet spaces—through rigorous self-reflection and organic mentorship that values substance over status.</p>
                          </>
                        )}
                    </div>
                    
                    {/* Vision & Mission Statements: Redesigned as Stacked on Mobile, Side-by-Side on Desktop */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-rule">
                        {/* Vision Card - Containerless */}
                        <div className="bg-transparent p-0 border-0  flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-full bg-mist flex items-center justify-center text-seal mb-6">
                                    <Eye size={22} />
                                </div>
                                <h4 className="text-[12px] font-semibold uppercase tracking-[0.25em] text-seal mb-3">OUR VISION</h4>
                                <p className="text-[15px] sm:text-[17px] md:text-[18px] font-semibold text-ink leading-relaxed" >
                                    To build a global network of trailblazers who <span className="italic font-medium text-seal">model and replicate excellence</span> in diverse spheres.
                                </p>
                            </div>
                        </div>

                        {/* Mission Card - Contained */}
                        <div className="bg-seal rounded-[var(--radius-lg)] p-6 md:p-8 border border-rule/10  flex flex-col justify-between  transition-shadow duration-300">
                            <div>
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white mb-6">
                                    <Flag size={20} />
                                </div>
                                <h4 className="text-[12px] font-semibold uppercase tracking-[0.25em] text-verdant mb-3">OUR MISSION</h4>
                                <p className="text-[15px] sm:text-[17px] md:text-[18px] font-semibold text-white leading-relaxed uppercase tracking-wide font-sans" >
                                    ORDINARY PERSONS ACHIEVING <span className="italic font-medium text-mist">EXTRAORDINARY RESULTS</span> SILENTLY AND SUSTAINABLY.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side Image with beautiful curved border container */}
                <div className="relative group">
                    <div className="bg-white rounded-[var(--radius-lg)] p-4  border border-rule overflow-hidden transform group-hover:scale-[1.01] transition-transform duration-500">
                        <img 
                            src={featuredImage} 
                            alt={pageData?.featuredImage?.alt || "SIGNET Mentorship"} 
                            className="w-full h-auto rounded-[var(--radius-lg)] object-cover aspect-square"
                            loading="lazy"
                        />
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-mist rounded-full blur-3xl -z-10" />
                </div>
            </div>
        </section>

        {/* ── MINIMAL CONTACT SECTION ──────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
            <div className="bg-white rounded-[var(--radius-lg)] p-8 md:p-12 border border-rule  flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-3 max-w-xl">
                    <span className="text-[10px] font-semibold tracking-[0.3em] text-seal uppercase block font-sans">Reach Out</span>
                    <h3 className="text-2xl md:text-3xl font-semibold text-ink font-sans">Get in <span className="italic font-light text-seal">Touch</span></h3>
                    <p className="text-sm md:text-base text-ink/70 leading-relaxed font-sans font-medium">
                        Have questions about our cohorts, curriculum, or membership? Select your preferred platform to start a conversation with our network support.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                    {[
                        { icon: MessageCircle, href: "https://wa.me/2349032387758?text=Hi%20Signet%20Network%2C%20I%20need%20help%20with...", label: "WhatsApp", color: "bg-seal hover:bg-seal text-white" },
                        { icon: Mail, href: "mailto:info@signet.org?subject=Support%20Request", label: "Email", color: "bg-ink hover:bg-black text-white" },
                        { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "bg-[#3B5998] hover:bg-[#2d4373] text-white" },
                        { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "bg-[#C13584] hover:bg-[#a62c70] text-white" },
                    ].map((item, i) => (
                        <a
                            key={i}
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-shadow  ${item.color}`}
                            aria-label={item.label}
                        >
                            <item.icon size={18} />
                        </a>
                    ))}
                </div>
            </div>
        </section>

        {/* ── COURSE CURRICULUM ────────────────────────────────────── */}
        <section className="bg-white py-16 md:py-24 border-y border-rule">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex items-center gap-4 mb-12">
                    <div className="h-0.5 w-12 bg-seal" />
                    <h3 className="text-[12px] font-semibold tracking-[0.3em] uppercase text-seal" >Course Curriculum</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6">
                    {[
 "Introduction to Mentorship: Why and How?",
 "The Power of Vision",
 "Self-Awareness: Understanding your Self",
 "Purpose vs Passion: The distinction",
 "Accelerating your Productivity: Time management",
 "Building Self-Confidence and Self-Esteem",
 "Overcoming Fear",
 "Mastering Resilience: The power of growth mindset",
 "Emotional Intelligence: How to lead yourself & others",
 "Building and Mastering Healthy Relationships",
 "Effective Team work and Leadership",
 "Effective Communication skills",
 "Conflict Resolution: How to resolve ANY conflict"
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-5 py-3 border-b border-rule group hover:border-seal/30 transition-colors">
                            <span className="text-[14px] font-semibold text-seal/40 group-hover:text-seal transition-colors">{i + 1})</span>
                            <p className="text-[16px] md:text-[17px] font-semibold text-ink group-hover:translate-x-2 transition-transform duration-500" >{item}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── ENROLLMENT & GAINS ────────────────────────────────────── */}
        <section className="bg-seal text-white py-16 md:py-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-full md:w-[600px] h-full bg-white/[0.02] blur-[120px] -rotate-12 translate-x-1/4" />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 md:gap-24 items-start relative z-10">
                <div className="space-y-16">
                    <div>
                        <h4 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-mist/75 mb-8" >Program Duration</h4>
                        <div className="space-y-8">
                            <div className="flex gap-6 items-center">
                                <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-white/5 border border-white/10 flex items-center justify-center text-mist">
                                    <Calendar size={20} />
                                </div>
                                <p className="text-[15px] md:text-[16px] text-white/90 leading-relaxed font-semibold">
                                    The mentoring program runs from 15th March - 15th June, 2025.
                                </p>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-white/5 border border-white/10 flex items-center justify-center text-mist">
                                    <Clock size={20} />
                                </div>
                                <p className="text-[15px] md:text-[16px] text-white/90 leading-relaxed font-semibold">
                                    General classes held every Monday by 8:30pm - 10:30pm.
                                </p>
                            </div>
                            <div className="flex gap-6 items-center">
                                <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-white/5 border border-white/10 flex items-center justify-center text-mist">
                                    <Target size={20} />
                                </div>
                                <p className="text-[15px] md:text-[16px] text-white/90 leading-relaxed font-semibold">
                                    Weekly team review/interactive sessions (Day/time selected by team).
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-[var(--radius-lg)] backdrop-blur-sm">
                        <p className="text-[14px] italic font-semibold leading-relaxed text-mist" >
 "ATTEND ALL THE CLASSES TO GET THE MOST OUT OF THIS PROGRAM. ATTENDANCE WILL BE TAKEN SERIOUSLY."
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-[var(--radius-lg)] p-8 md:p-12 text-ink  border border-rule space-y-8">
                    <div>
                        <h4 className="text-[11px] font-semibold tracking-[0.3em] uppercase text-seal mb-3" >Your Gains</h4>
                        <p className="text-[18px] md:text-[20px] font-semibold leading-tight text-ink" >
                            At the end of this program, you will have gained:
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-5">
                            <div className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-seal shrink-0 mt-1">
                                <Heart size={15} className="fill-seal/20" />
                            </div>
                            <div>
                                <h5 className="font-semibold text-[16px] mb-1 uppercase tracking-tight text-seal">Mastery of skills</h5>
                                <p className="text-[14px] text-ink/70 leading-relaxed">Requisite for success in academics, career, business, relationships, ministry, family, or leadership positions.</p>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="w-8 h-8 rounded-full bg-mist flex items-center justify-center text-seal shrink-0 mt-1">
                                <Award size={15} className="fill-seal/20" />
                            </div>
                            <div>
                                <h5 className="font-semibold text-[16px] mb-1 uppercase tracking-tight text-seal">A Certificate of Participation</h5>
                                <p className="text-[14px] text-ink/70 leading-relaxed mb-3">Subject to meeting the following criteria:</p>
                                <ul className="space-y-2">
                                    {['Attendance to classes', 'Participation in team activities', 'Passing the assessment tests'].map(li => (
                                        <li key={li} className="flex items-center gap-3 text-[11px] font-semibold text-ink/60 uppercase tracking-wider">
                                            <div className="w-1.5 h-1.5 bg-seal rounded-full" />
                                            {li}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <Link href="/join" className="group flex items-center justify-center gap-3 w-full h-14 rounded-full bg-seal text-white font-semibold text-[13px] uppercase tracking-widest hover:bg-seal transition ">
                        <span className="flex items-center">Apply for Next Cohort</span> <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>

        {/* ── TESTIMONIALS ────────────────────────────────────── */}
        <section className="py-16 md:py-24 bg-canvas border-t border-rule">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-16">
                <h3 className="text-[32px] md:text-[44px] font-semibold text-ink" >Member Experiences</h3>
                <p className="text-[16px] text-seal mt-3 font-semibold">Voices from the Silent Collective.</p>
            </div>
            <Testimonials />
        </section>

      </main>
      <Footer />
    </div>
  );
}
