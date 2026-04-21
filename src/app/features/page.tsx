import {
  Calendar, Award, BookOpen, Clock, Users,
  CheckCircle2, Target, Brain, Activity, Shield,
  Zap, Flame, Compass, Leaf, ArrowRight, TrendingUp, Quote
} from "lucide-react";
import Link from "next/link";

export default function FeaturesPage() {
  return (
    <div className="relative min-h-screen bg-[#F7F6F0] text-[#0D120E] selection:bg-[#D3F36B] selection:text-[#0D120E]"
      style={{ fontFamily: "'Melbourne', system-ui, sans-serif" }}>
      <main className="pt-28 md:pt-44 pb-20 px-6 md:px-12 max-w-7xl mx-auto">

        {/* ── HERO ─────────────────────────────────────────────────── */}
        <div className="flex flex-col items-start gap-8 max-w-4xl relative z-10 mb-24 md:mb-40">
          {/* Eyebrow */}
          <div className="flex items-center gap-2">
            <div className="w-6 h-[2px] bg-[#1DA756]" />
            <span style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 800, letterSpacing: "0.35em", fontSize: "0.65rem", textTransform: "uppercase" }} className="text-[#1DA756]">
              About Signet
            </span>
          </div>

          <h1 style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: "0.95" }}
            className="text-5xl md:text-[6.5rem] text-[#0D120E]">
            Growth <br />
            <span className="text-[#1DA756]">through</span> <br />
            mentorship.
          </h1>

          <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 400, lineHeight: "1.7" }}
            className="text-[#0D120E]/55 text-lg md:text-xl max-w-2xl">
            A comprehensive, structured transformational journey designed to equip you with the skills required to excel across all dimensions of your life.
          </p>

          <div className="flex items-center gap-4 pt-4">
            <Link href="/join"
              style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 700, letterSpacing: "0.02em" }}
              className="bg-[#1DA756] text-white px-8 py-4 rounded-full text-base hover:bg-[#158C45] transition-all hover:scale-[1.02] shadow-lg shadow-[#1DA756]/20 inline-flex items-center gap-2">
              Join the program <ArrowRight size={16} />
            </Link>
            <button
              style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 600 }}
              className="text-[#0D120E]/60 px-6 py-4 rounded-full text-base transition-all hover:bg-black/5">
              Learn more
            </button>
          </div>
        </div>

        {/* ── GET TO KNOW US — Image Section ───────────────────────── */}
        <div className="mb-24 md:mb-40 border-t border-[#0D120E]/5 pt-16">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="/get-to-know-us.png"
                alt="Get To Know Signet"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                onError={(e) => {
                  // Fallback if image not yet placed
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              {/* Fallback placeholder shown if image missing */}
              <div className="w-full aspect-square bg-gradient-to-br from-[#1DA756] to-[#0D120E] flex flex-col items-center justify-center rounded-3xl -mt-full relative">
                <div className="text-center text-white px-8">
                  <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 900, fontSize: "4rem", lineHeight: 1 }}>GET TO</p>
                  <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 900, fontSize: "4rem", lineHeight: 1 }}>KNOW</p>
                  <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 900, fontSize: "4rem", lineHeight: 1, color: "#D3F36B" }}>US!</p>
                </div>
              </div>
            </div>

            {/* Note */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 self-start">
                <Quote size={16} className="text-[#1DA756]" />
                <span style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 800, letterSpacing: "0.3em", fontSize: "0.65rem", textTransform: "uppercase" }}
                  className="text-[#1DA756]">
                  Our Story
                </span>
              </div>

              <h2 style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: "1.05" }}
                className="text-4xl md:text-5xl text-[#0D120E]">
                We grow <br />
                <span className="text-[#1DA756]">in silence.</span>
              </h2>

              <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 400, lineHeight: "1.8" }}
                className="text-[#0D120E]/55 text-base md:text-lg">
                Signet — the Silent Growth Network — was born from a simple belief: that the most profound transformations happen quietly, consistently, and with purpose. We don't celebrate noise. We celebrate results.
              </p>

              <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 400, lineHeight: "1.8" }}
                className="text-[#0D120E]/45 text-sm md:text-base">
                Our community of mentors and mentees operate with discipline, intentionality, and a shared hunger for excellence — across every sphere of life.
              </p>

              <div className="flex flex-col gap-3 mt-2">
                {[
                  "Community of driven, silent achievers",
                  "Structured weekly accountability sessions",
                  "Mentors who walk the talk",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#1DA756]/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={12} className="text-[#1DA756]" />
                    </div>
                    <span style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 500 }}
                      className="text-[#0D120E]/70 text-sm">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── BRAND IMAGE SHOWCASE — "Locked In" ────────────────────── */}
        <div className="mb-24 md:mb-40 border-t border-[#0D120E]/5 pt-16">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* Note first on desktop */}
            <div className="flex flex-col gap-6 md:order-first order-last">
              <div className="inline-flex items-center gap-2 self-start">
                <div className="w-6 h-[2px] bg-[#0D120E]" />
                <span style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 800, letterSpacing: "0.3em", fontSize: "0.65rem", textTransform: "uppercase" }}
                  className="text-[#0D120E]/50">
                  The Ethos
                </span>
              </div>

              <h2 style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: "1.05" }}
                className="text-4xl md:text-5xl text-[#0D120E]">
                Locked in. <br />
                <span className="text-[#1DA756]">Locked on.</span>
              </h2>

              <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 400, lineHeight: "1.8" }}
                className="text-[#0D120E]/55 text-base md:text-lg">
                Our members are locked in on their purpose. No noise, no distraction — just deliberate, compounding daily action that leads to extraordinary results.
              </p>

              <blockquote className="pl-4 border-l-2 border-[#1DA756]">
                <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 600, fontStyle: "italic" }}
                  className="text-[#0D120E]/70 text-lg">
                  "Now, we are Locked In... Let's Grow in Silence!"
                </p>
                <footer style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 700, letterSpacing: "0.1em", fontSize: "0.7rem", textTransform: "uppercase" }}
                  className="text-[#1DA756] mt-2">
                  — Signet Community
                </footer>
              </blockquote>
            </div>

            {/* Brand Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src="/locked-in.png"
                alt="Locked In — Let's Grow in Silence"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.parentElement!.style.background = "linear-gradient(135deg,#1DA756,#0D120E)";
                  el.style.display = "none";
                }}
              />
            </div>
          </div>
        </div>

        {/* ── QUOTE ─────────────────────────────────────────────────── */}
        <div className="flex justify-center items-center py-16 md:py-24 px-4 border-t border-[#0D120E]/5 mb-16 md:mb-24">
          <div className="max-w-3xl text-center space-y-6">
            <div className="flex justify-center">
              <Quote size={32} className="text-[#1DA756]/30" />
            </div>
            <h2 style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: "1.2" }}
              className="text-3xl md:text-5xl text-[#0D120E]">
              "Life is really simple, but we insist on making it complicated."
            </h2>
            <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 500 }}
              className="text-xl text-[#0D120E]/40">
              — Confucius
            </p>
          </div>
        </div>

        {/* ── PILLARS ───────────────────────────────────────────────── */}
        <div className="space-y-12 mb-24 md:mb-40 border-t border-[#0D120E]/5 pt-12">
          <div className="max-w-2xl">
            <span style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 800, letterSpacing: "0.3em", fontSize: "0.65rem", textTransform: "uppercase" }}
              className="text-[#1DA756] block mb-4">
              Core Pillars
            </span>
            <h2 style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 900, letterSpacing: "-0.03em" }}
              className="text-3xl md:text-5xl text-[#0D120E] mb-4">
              Master personal leadership
            </h2>
            <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 400, lineHeight: "1.7" }}
              className="text-[#0D120E]/55 text-lg">
              Our step-by-step program helps you build solid foundations, optimize productivity, and align passion with purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: "Clear Vision", desc: "Discover the distinction between passion and purpose, laying out a concrete vision for your life." },
              { icon: Activity, title: "Accelerate Productivity", desc: "Master time management, overcome fear, and implement systems that drive you to your potential." },
              { icon: Leaf, title: "Healthy Relationships", desc: "Gain emotional intelligence. Build and master relationships that fuel your growth journey." },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-8 shadow-sm border border-[#0D120E]/[0.04] hover:shadow-md transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-[#F7F6F0] flex items-center justify-center text-[#1DA756] mb-6 group-hover:bg-[#1DA756] group-hover:text-white transition-colors">
                  <item.icon strokeWidth={2} className="w-6 h-6" />
                </div>
                <h3 style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 800, letterSpacing: "-0.02em" }}
                  className="text-xl text-[#0D120E] mb-3">
                  {item.title}
                </h3>
                <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 400, lineHeight: "1.7" }}
                  className="text-[#0D120E]/55 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PROGRAM DETAILS ───────────────────────────────────────── */}
        <div className="py-16 md:py-20 border-t border-[#0D120E]/5 flex flex-col md:flex-row gap-12 md:gap-32 justify-between mb-24 md:mb-40">
          <div className="md:w-1/2">
            <span style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 800, letterSpacing: "0.3em", fontSize: "0.65rem", textTransform: "uppercase" }}
              className="text-[#1DA756] block mb-4">
              How it works
            </span>
            <h2 style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 900, letterSpacing: "-0.03em" }}
              className="text-3xl md:text-4xl text-[#0D120E] mb-5">
              Program Details
            </h2>
            <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 400, lineHeight: "1.7" }}
              className="text-[#0D120E]/55 text-base mb-10 max-w-sm">
              Signet empowers individuals to achieve goals while developing a rich internal foundation.
            </p>
            <div className="space-y-7">
              {[
                { icon: Calendar, title: "Every Monday", sub: "8:30 PM – 10:30 PM (General classes)" },
                { icon: Clock, title: "Interactive Sessions", sub: "Weekly team sessions at your chosen time." },
              ].map((d, i) => (
                <div key={i} className="flex gap-5 items-start">
                  <div className="p-3 bg-white shadow-sm rounded-xl text-[#1DA756] shrink-0 border border-black/[0.04]">
                    <d.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 700 }}
                      className="text-lg text-[#0D120E] mb-0.5">
                      {d.title}
                    </h4>
                    <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 400 }}
                      className="text-[#0D120E]/55 text-sm">
                      {d.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 bg-white rounded-[2rem] p-8 md:p-14 shadow-sm border border-[#0D120E]/[0.04] flex flex-col justify-center">
            <span style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 800, letterSpacing: "0.25em", fontSize: "0.65rem", textTransform: "uppercase" }}
              className="text-[#1DA756] block mb-4">
              Next Cohort
            </span>
            <h4 style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 900, letterSpacing: "-0.05em", lineHeight: "1" }}
              className="text-5xl md:text-6xl text-[#0D120E] mb-6">
              16th Mar<br />—<br />15th Jun
            </h4>
            <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 400, lineHeight: "1.7" }}
              className="text-[#0D120E]/55 text-base">
              Enrollment is open. Secure your spot in the upcoming transformational journey.
            </p>
            <Link href="/join"
              style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 700 }}
              className="mt-8 bg-[#0D120E] text-white px-7 py-4 rounded-full text-sm hover:bg-[#0D120E]/80 transition-all inline-flex items-center gap-2 self-start">
              Enroll now <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* ── CURRICULUM ────────────────────────────────────────────── */}
        <div className="pt-12 border-t border-[#0D120E]/5">
          <div className="mb-12">
            <span style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 800, letterSpacing: "0.3em", fontSize: "0.65rem", textTransform: "uppercase" }}
              className="text-[#1DA756] block mb-4">
              What you'll learn
            </span>
            <h2 style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 900, letterSpacing: "-0.04em" }}
              className="text-4xl md:text-5xl text-[#0D120E]">
              The Curriculum
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {curriculum.map((item, index) => (
              <div key={index} className="group">
                <div className="w-11 h-11 bg-white shadow-sm border border-black/[0.04] rounded-2xl flex items-center justify-center text-[#1DA756] mb-4 group-hover:bg-[#1DA756] group-hover:text-white transition-colors duration-300">
                  <item.icon size={18} strokeWidth={2} />
                </div>
                <h4 style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 700 }}
                  className="text-base text-[#0D120E] mb-1">
                  {item.title}
                </h4>
                <p style={{ fontFamily: "'Melbourne', sans-serif", fontWeight: 400 }}
                  className="text-[#0D120E]/45 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

const curriculum = [
  { title: "Mentorship", desc: "Why and How?", icon: BookOpen },
  { title: "Vision", desc: "Your ultimate aim", icon: Target },
  { title: "Self-Awareness", desc: "Understanding yourself", icon: Brain },
  { title: "Purpose vs Passion", desc: "The crucial difference", icon: Compass },
  { title: "Productivity", desc: "Time management", icon: Zap },
  { title: "Self-Confidence", desc: "Building core esteem", icon: Shield },
  { title: "Overcoming Fear", desc: "Action despite resistance", icon: Flame },
  { title: "Resilience", desc: "The growth mindset", icon: Activity },
  { title: "EQ", desc: "Leading self & others", icon: Brain },
  { title: "Relationships", desc: "Connection networks", icon: Users },
  { title: "Teamwork", desc: "Collaborative leadership", icon: Users },
  { title: "Communication", desc: "Translating thought", icon: BookOpen },
];
