"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Share2, RotateCcw, CheckCircle2 } from "lucide-react";

// Static mock font variables to prevent build-time Google Fonts downloads (loaded via globals.css)
const dmSerif = { variable: "font-dm-serif" };
const dmSans = { variable: "font-dm-sans" };

// ==========================================
// DATA & TYPES
// ==========================================

type Dimension = "Self-Awareness" | "Self-Regulation" | "Empathy" | "Social Skills" | "Motivation";
type Format = "likert" | "mcq" | "forced";

interface Option {
  text: string;
  score: number;
}

interface Question {
  id: number;
  dimension: Dimension;
  subDimension: string;
  format: Format;
  text: string;
  options: Option[];
}

const LIKERT_OPTIONS: Option[] = [
  { text: "Strongly Disagree", score: 20 },
  { text: "Disagree", score: 40 },
  { text: "Neutral", score: 60 },
  { text: "Agree", score: 80 },
  { text: "Strongly Agree", score: 100 }
];

const QUESTIONS: Question[] = [
  // SELF-AWARENESS
  { id: 1, dimension: "Self-Awareness", subDimension: "Emotional Self-Awareness", format: "likert", text: "I can identify the physical sensations (like heart rate or muscle tension) that accompany my emotions.", options: LIKERT_OPTIONS },
  { id: 2, dimension: "Self-Awareness", subDimension: "Emotional Self-Awareness", format: "likert", text: "I am aware of how my mood affects the way I communicate with others.", options: LIKERT_OPTIONS },
  { id: 3, dimension: "Self-Awareness", subDimension: "Emotional Self-Awareness", format: "likert", text: "I recognize when my confidence levels are temporary reactions to external praise or criticism.", options: LIKERT_OPTIONS },
  { id: 4, dimension: "Self-Awareness", subDimension: "Emotional Self-Awareness", format: "likert", text: "I can easily describe the exact mixture of emotions I am experiencing when I feel unsettled.", options: LIKERT_OPTIONS },
  { id: 5, dimension: "Self-Awareness", subDimension: "Accurate Self-Assessment", format: "likert", text: "I know which triggers are most likely to make me feel defensive or frustrated.", options: LIKERT_OPTIONS },
  { id: 6, dimension: "Self-Awareness", subDimension: "Accurate Self-Assessment", format: "likert", text: "I understand how my past experiences shape my current emotional reactions.", options: LIKERT_OPTIONS },
  { id: 7, dimension: "Self-Awareness", subDimension: "Accurate Self-Assessment", format: "likert", text: "I am clear about my personal values and how they guide my decision-making.", options: LIKERT_OPTIONS },
  { id: 8, dimension: "Self-Awareness", subDimension: "Accurate Self-Assessment", format: "likert", text: "I accurately assess my own strengths and limitations without being overly critical or boastful.", options: LIKERT_OPTIONS },

  // SELF-REGULATION
  { id: 9, dimension: "Self-Regulation", subDimension: "Emotional Self-Control", format: "likert", text: "When I feel a surge of anger or frustration, I wait for it to pass before responding.", options: LIKERT_OPTIONS },
  { id: 10, dimension: "Self-Regulation", subDimension: "Emotional Self-Control", format: "likert", text: "I remain calm and clear-headed under tight deadlines or high-pressure situations.", options: LIKERT_OPTIONS },
  { id: 11, dimension: "Self-Regulation", subDimension: "Emotional Self-Control", format: "likert", text: "I can adapt my strategy quickly when unexpected changes disrupt my original plans.", options: LIKERT_OPTIONS },
  { id: 12, dimension: "Self-Regulation", subDimension: "Emotional Self-Control", format: "likert", text: "I refrain from making impulsive promises or decisions when I am feeling highly enthusiastic.", options: LIKERT_OPTIONS },
  { id: 13, dimension: "Self-Regulation", subDimension: "Adaptability & Resilience", format: "likert", text: "I manage my stress levels effectively to prevent burnout or emotional outbursts.", options: LIKERT_OPTIONS },
  { id: 14, dimension: "Self-Regulation", subDimension: "Adaptability & Resilience", format: "likert", text: "I take responsibility for my mistakes and focus on finding solutions instead of blaming others.", options: LIKERT_OPTIONS },
  { id: 15, dimension: "Self-Regulation", subDimension: "Adaptability & Resilience", format: "likert", text: "I can maintain focus on my long-term goals even when faced with immediate distractions.", options: LIKERT_OPTIONS },
  { id: 16, dimension: "Self-Regulation", subDimension: "Adaptability & Resilience", format: "likert", text: "I handle constructive criticism constructively, without becoming defensive or hostile.", options: LIKERT_OPTIONS },

  // EMPATHY
  { id: 17, dimension: "Empathy", subDimension: "Cognitive Empathy", format: "likert", text: "I pay close attention to others' body language and facial expressions to understand their feelings.", options: LIKERT_OPTIONS },
  { id: 18, dimension: "Empathy", subDimension: "Cognitive Empathy", format: "likert", text: "I can see things from another person's point of view, even when I strongly disagree with them.", options: LIKERT_OPTIONS },
  { id: 19, dimension: "Empathy", subDimension: "Cognitive Empathy", format: "likert", text: "I sense when someone in a group feels excluded or uncomfortable, and try to include them.", options: LIKERT_OPTIONS },
  { id: 20, dimension: "Empathy", subDimension: "Cognitive Empathy", format: "likert", text: "I listen actively to others without immediately formulating my own response or interrupting.", options: LIKERT_OPTIONS },
  { id: 21, dimension: "Empathy", subDimension: "Emotional Empathy", format: "likert", text: "I am sensitive to the emotional needs of my friends and colleagues.", options: LIKERT_OPTIONS },
  { id: 22, dimension: "Empathy", subDimension: "Emotional Empathy", format: "likert", text: "I can accurately guess what someone is feeling based on the tone of their voice.", options: LIKERT_OPTIONS },
  { id: 23, dimension: "Empathy", subDimension: "Emotional Empathy", format: "likert", text: "I validate other people's feelings even if their emotional reactions seem different from mine.", options: LIKERT_OPTIONS },
  { id: 24, dimension: "Empathy", subDimension: "Emotional Empathy", format: "likert", text: "I am compassionate towards people who are dealing with personal challenges.", options: LIKERT_OPTIONS },

  // SOCIAL SKILLS
  { id: 25, dimension: "Social Skills", subDimension: "Relationship Management", format: "likert", text: "I resolve conflicts with others by seeking win-win compromises rather than just winning.", options: LIKERT_OPTIONS },
  { id: 26, dimension: "Social Skills", subDimension: "Relationship Management", format: "likert", text: "I communicate my thoughts and ideas clearly and persuasively to a group.", options: LIKERT_OPTIONS },
  { id: 27, dimension: "Social Skills", subDimension: "Relationship Management", format: "likert", text: "I build strong, supportive, and collaborative relationships with team members.", options: LIKERT_OPTIONS },
  { id: 28, dimension: "Social Skills", subDimension: "Relationship Management", format: "likert", text: "I adapt my communication style to suit different personalities and cultural backgrounds.", options: LIKERT_OPTIONS },
  { id: 29, dimension: "Social Skills", subDimension: "Collaboration & Leadership", format: "likert", text: "I encourage and motivate others to perform at their best and collaborate.", options: LIKERT_OPTIONS },
  { id: 30, dimension: "Social Skills", subDimension: "Collaboration & Leadership", format: "likert", text: "I handle difficult conversations with tact, diplomacy, and respect.", options: LIKERT_OPTIONS },
  { id: 31, dimension: "Social Skills", subDimension: "Collaboration & Leadership", format: "likert", text: "I am effective at networking and building rapport with new people.", options: LIKERT_OPTIONS },
  { id: 32, dimension: "Social Skills", subDimension: "Collaboration & Leadership", format: "likert", text: "I support and facilitate group consensus when working towards a common objective.", options: LIKERT_OPTIONS },

  // MOTIVATION
  { id: 33, dimension: "Motivation", subDimension: "Achievement Drive", format: "likert", text: "I set high standards of excellence for myself and strive to exceed them.", options: LIKERT_OPTIONS },
  { id: 34, dimension: "Motivation", subDimension: "Achievement Drive", format: "likert", text: "I am driven by a personal desire to learn, grow, and improve, rather than just external rewards.", options: LIKERT_OPTIONS },
  { id: 35, dimension: "Motivation", subDimension: "Achievement Drive", format: "likert", text: "I remain optimistic and persistent in pursuing my goals, even after facing major setbacks.", options: LIKERT_OPTIONS },
  { id: 36, dimension: "Motivation", subDimension: "Achievement Drive", format: "likert", text: "I actively seek out opportunities for professional and personal development.", options: LIKERT_OPTIONS },
  { id: 37, dimension: "Motivation", subDimension: "Optimism & Initiative", format: "likert", text: "I am willing to make personal sacrifices to achieve a meaningful long-term goal.", options: LIKERT_OPTIONS },
  { id: 38, dimension: "Motivation", subDimension: "Optimism & Initiative", format: "likert", text: "I take initiative to start new projects or suggest improvements without being asked.", options: LIKERT_OPTIONS },
  { id: 39, dimension: "Motivation", subDimension: "Optimism & Initiative", format: "likert", text: "I find satisfaction in the process of working towards a goal, not just achieving it.", options: LIKERT_OPTIONS },
  { id: 40, dimension: "Motivation", subDimension: "Optimism & Initiative", format: "likert", text: "I maintain a high level of energy and enthusiasm for my work and personal projects.", options: LIKERT_OPTIONS }
];


// ==========================================
// SCORING ENGINE & RESULTS MAP
// ==========================================

const analyzeResults = (answers: Record<number, number>) => {
  const dimScores: Record<Dimension, { total: number; count: number }> = {
    "Self-Awareness": { total: 0, count: 0 },
    "Self-Regulation": { total: 0, count: 0 },
    "Empathy": { total: 0, count: 0 },
    "Social Skills": { total: 0, count: 0 },
    "Motivation": { total: 0, count: 0 }
  };

  const subScores: Record<string, { total: number; count: number }> = {};

  QUESTIONS.forEach(q => {
    const score = answers[q.id];
    if (score === undefined) return;
    
    // Dimension tracking
    dimScores[q.dimension].total += score;
    dimScores[q.dimension].count += 1;

    // Sub-dimension tracking
    if (!subScores[q.subDimension]) subScores[q.subDimension] = { total: 0, count: 0 };
    subScores[q.subDimension].total += score;
    subScores[q.subDimension].count += 1;
  });

  // Averages
  const finalDimScores: Record<Dimension, number> = {
    "Self-Awareness": Math.round(dimScores["Self-Awareness"].total / dimScores["Self-Awareness"].count) || 0,
    "Self-Regulation": Math.round(dimScores["Self-Regulation"].total / dimScores["Self-Regulation"].count) || 0,
    "Empathy": Math.round(dimScores["Empathy"].total / dimScores["Empathy"].count) || 0,
    "Social Skills": Math.round(dimScores["Social Skills"].total / dimScores["Social Skills"].count) || 0,
    "Motivation": Math.round(dimScores["Motivation"].total / dimScores["Motivation"].count) || 0,
  };

  const finalSubScores: Record<string, number> = {};
  Object.keys(subScores).forEach(key => {
    finalSubScores[key] = Math.round(subScores[key].total / subScores[key].count);
  });

  const totalScore = Math.round(Object.values(finalDimScores).reduce((a,b)=>a+b,0) / 5);

  let tier = "";
  if (totalScore < 40) tier = "Emotionally Unaware";
  else if (totalScore < 55) tier = "Emotionally Emerging";
  else if (totalScore < 70) tier = "Emotionally Developing";
  else if (totalScore < 85) tier = "Emotionally Capable";
  else tier = "Emotionally Masterful";

  // Archetype logic simplified logic based on highest/lowest dimensions
  let archetype = { name: "The Navigator", essence: "Balanced across all dimensions", power: "Adaptability", blindSpot: "Can overthink" };
  const sa = finalDimScores["Self-Awareness"];
  const sr = finalDimScores["Self-Regulation"];
  const em = finalDimScores["Empathy"];
  const ss = finalDimScores["Social Skills"];
  const mo = finalDimScores["Motivation"];

  if (em > 80 && ss > 80 && sr < 60) archetype = { name: "The Empath", essence: "You absorb emotional frequencies rapidly, acting as a profound emotional mirror for others.", power: "Deep resonance", blindSpot: "Emotional exhaustion and taking things personally." };
  else if (mo > 80 && sa > 80 && em < 60) archetype = { name: "The Achiever", essence: "Laser-focused and self-aware, you optimize environments for success but miss emotional nuances.", power: "Relentless execution", blindSpot: "Dismissing others' emotional friction as weakness." };
  else if (sr > 80 && sa > 70 && ss < 60) archetype = { name: "The Anchor", essence: "Immensely stable and highly regulated, providing calm to chaos without getting involved.", power: "Unbreakable composure", blindSpot: "Appearing coldly detached from the human element." };
  else if (sa > 80 && mo < 60 && sr < 60) archetype = { name: "The Reflector", essence: "Brilliantly insightful regarding internal states, but struggling to convert that into action.", power: "Profound self-knowledge", blindSpot: "Action paralysis." };
  else if (ss > 80 && em > 70 && mo < 60) archetype = { name: "The Connector", essence: "Effortlessly binding networks and people together through sheer social magnetism.", power: "Influence", blindSpot: "Losing independent drive." };
  else if (totalScore > 80) archetype = { name: "The Master", essence: "Exceptional calibration across all domains. You architect emotional environments rather than reacting to them.", power: "Absolute Synthesis", blindSpot: "Assuming others have identical capacity." };
  else if (totalScore < 60) archetype = { name: "The Seeker", essence: "Currently possessing raw, uncalibrated potential ready for rigorous structural development.", power: "Blank slate for massive growth", blindSpot: "Operating in blind spots." };

  return { totalScore, tier, finalDimScores, finalSubScores, archetype };
};

const GROWTH_PLANS: Record<Dimension, any> = {
  "Self-Awareness": { title: "The 90-Second Pause Protocol", practice: "When physiological tension spikes, set a 90-second internal timer before speaking. Just label the emotion inwardly.", book: "Insight by Tasha Eurich" },
  "Self-Regulation": { title: "The Circuit Breaker", practice: "Introduce a deliberate physical micro-action (like breathing deep or closing eyes) instantly when a trigger occurs.", book: "Emotional Intelligence 2.0 by Bradberry & Greaves" },
  "Empathy": { title: "Contextual Interrogation", practice: "Force yourself to write down two alternative reasons why someone acted negatively before you respond.", book: "The Like Switch by Jack Schafer" },
  "Social Skills": { title: "Magnetic Synchronization", practice: "Focus 80% of your energy purely on active listening and mirroring physiology before contributing your point.", book: "Never Split the Difference by Chris Voss" },
  "Motivation": { title: "Micro-Traction Phasing", practice: "Break intimidating goals into laughably small increments. Execute the first one immediately.", book: "Atomic Habits by James Clear" }
};


// ==========================================
// COMPONENT
// ==========================================

export default function EQAssessment() {
  const [screen, setScreen] = useState<"welcome" | "test" | "results">("welcome");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  
  const question = QUESTIONS[currentIdx];
  const progressPercent = ((currentIdx) / QUESTIONS.length) * 100;

  const handleSelect = (score: number) => {
    setAnswers({ ...answers, [question.id]: score });
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setScreen("results");
    }
  };

  const results = useMemo(() => screen === "results" ? analyzeResults(answers) : null, [answers, screen]);

  // Welcome Screen
  if (screen === "welcome") {
    return (
      <div className={`min-h-[100dvh] bg-[#faf9f7] text-[#1a1a2e] ${dmSans.variable} ${dmSerif.variable} font-sans flex flex-col items-center justify-center p-6 pb-20 md:pb-6`}>
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto z-10 w-full">
          <div className="w-10 h-10 rounded-full bg-accent text-[#051F20] flex items-center justify-center mb-3 shadow-xl">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h1 className="text-3xl md:text-5xl font-serif text-[#1a1a2e] mb-3 leading-tight">
             Define Your <br/><span className="text-[#16a34a] italic">Emotional Protocol.</span>
          </h1>
          <p className="text-sm md:text-base text-[#1a1a2e]/60 font-medium max-w-2xl leading-relaxed mb-4">
            A 40-question diagnostic grounded in advanced behavioral frameworks. Pinpoint your emotional blind spots, discover your archetype, and architect a highly-calibrated mind.
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 mb-5 w-full">
            {["Self-Awareness", "Self-Regulation", "Empathy", "Social Skills", "Motivation"].map(dim => (
              <span key={dim} className="px-3 py-1.5 bg-[#f2f0ec] text-[10px] font-bold uppercase tracking-widest rounded-full">{dim}</span>
            ))}
          </div>
          <button 
            onClick={() => setScreen("test")}
            className="px-8 py-3 bg-[#163832] text-white rounded-full font-bold tracking-wide hover:bg-accent hover:text-[#051F20] transition-all duration-300 shadow-2xl flex items-center gap-3"
          >
            Start Assessment <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Results Screen
  if (screen === "results" && results) {
    // Generate simple SVG Radar points based on 5 dimensions
    const dims = ["Self-Awareness", "Self-Regulation", "Empathy", "Social Skills", "Motivation"] as Dimension[];
    const maxRadius = 100;
    const centerX = 150;
    const centerY = 150;

    const getCoord = (value: number, index: number, total: number) => {
      const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
      const radius = (value / 100) * maxRadius;
      return `${centerX + radius * Math.cos(angle)},${centerY + radius * Math.sin(angle)}`;
    };

    const radarPoints = dims.map((d, i) => getCoord(results.finalDimScores[d], i, dims.length)).join(" ");

    // Finding lowest 2 for growth plane
    const lowestDims = [...dims].sort((a,b) => results.finalDimScores[a] - results.finalDimScores[b]).slice(0, 2);

    return (
    return (
      <div className={`min-h-screen bg-gradient-to-tr from-[#ECFDF5]/30 via-white to-white text-[#022C22] ${dmSans.variable} ${dmSerif.variable} font-sans py-24`}>
        <div className="max-w-5xl mx-auto px-6">
          
          <header className="mb-16 text-center">
            <span className="inline-flex items-center px-4 py-1.5 bg-[#ECFDF5] text-[#064E3B] border border-[#A7F3D0] text-[10px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">
              Diagnostic Complete
            </span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#022C22] mb-4">Your Emotional Signature</h1>
            <p className="text-base md:text-lg font-medium text-[#064E3B]/70">Based on the analytical processing of your 40 diagnostic matrices.</p>
          </header>

          {/* Top Level Metric */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-xl shadow-emerald-950/[0.03] border border-white/40 flex flex-col items-center justify-center text-center">
               <div className="text-[6rem] font-serif leading-none tracking-tighter text-[#10B981] mb-2">{results.totalScore}</div>
               <div className="text-xs font-bold uppercase tracking-widest text-[#064E3B]/50 mb-6">Aggregate EQ Score</div>
               <div className="px-6 py-2 bg-[#ECFDF5] text-[#064E3B] border border-[#A7F3D0]/50 rounded-full text-xs font-bold tracking-wide">{results.tier}</div>
            </div>

            <div className="bg-[#022C22] text-white p-10 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#10B981]/10 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">Primary Archetype</div>
                <h2 className="text-4xl font-serif mb-4">{results.archetype.name}</h2>
                <p className="text-base text-white/80 leading-relaxed font-normal mb-8">{results.archetype.essence}</p>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center text-xs font-bold relative z-10">
                 <div><span className="text-[#10B981]">Power:</span> {results.archetype.power}</div>
                 <div><span className="text-[#8EB69B]">Blind Spot:</span> {results.archetype.blindSpot}</div>
              </div>
            </div>
          </div>

          {/* Radar & Heatmap Layer */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-emerald-950/[0.03] border border-white/40 flex items-center justify-center relative">
               <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-lg">
                  {/* Web Background */}
                  {[20, 40, 60, 80, 100].map(val => (
                    <polygon 
                      key={val} 
                      points={dims.map((_, i) => getCoord(val, i, dims.length)).join(" ")} 
                      fill="none" 
                      stroke="#022C22" 
                      strokeOpacity="0.05" 
                      strokeWidth="1" 
                    />
                  ))}
                  {/* Axis lines */}
                  {dims.map((_, i) => (
                    <line key={i} x1="150" y1="150" x2={getCoord(100, i, dims.length).split(',')[0]} y2={getCoord(100, i, dims.length).split(',')[1]} stroke="#022C22" strokeOpacity="0.05" />
                  ))}
                  {/* Active Polygon */}
                  <polygon points={radarPoints} fill="rgba(16, 185, 129, 0.15)" stroke="#10B981" strokeWidth="2.5" />
                  
                  {/* Points */}
                  {dims.map((d, i) => {
                     const [cx, cy] = getCoord(results.finalDimScores[d], i, dims.length).split(',');
                     return <circle key={'dot'+i} cx={cx} cy={cy} r="5" fill="#022C22" />;
                  })}
               </svg>
            </div>

            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-emerald-950/[0.03] border border-white/40">
              <h3 className="font-serif text-xl mb-6">Dimension Heatmap</h3>
              <div className="space-y-4">
                {dims.map(d => (
                  <div key={d} className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#064E3B]/70">{d}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-[#ECFDF5] border border-[#A7F3D0]/30 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-1000 bg-[#10B981]"
                          style={{ width: `${results.finalDimScores[d]}%` }}
                        />
                      </div>
                      <span className="w-8 text-right font-bold text-sm text-[#022C22]">{results.finalDimScores[d]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Growth Plan Layer */}
          <div className="bg-[#ECFDF5]/80 backdrop-blur-xl p-10 rounded-[2rem] border border-[#A7F3D0]/30">
             <h3 className="font-serif text-2xl text-[#022C22] mb-8">Personalized Execution Protocols</h3>
             <div className="grid md:grid-cols-2 gap-6">
                {lowestDims.map(dim => {
                  const plan = GROWTH_PLANS[dim];
                  return (
                    <div key={dim} className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-sm border border-white/80">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-[#064E3B]/60 mb-2 block">{dim} Enhancement</span>
                       <h4 className="text-lg font-bold text-[#022C22] mb-3">{plan.title}</h4>
                       <p className="text-sm text-[#064E3B]/80 font-normal leading-relaxed mb-6">
                         {plan.practice}
                       </p>
                       <div className="pt-4 border-t border-black/5 text-[10px] font-bold text-black/40">
                         Recommended Reading: <span className="text-[#022C22] block mt-1 text-xs">{plan.book}</span>
                       </div>
                    </div>
                  )
                })}
             </div>
          </div>
          
        </div>
      </div>
    );
  }

  // Active Question Screen
  return (
    <div className={`min-h-[100dvh] bg-[#faf9f7] text-[#1a1a2e] ${dmSans.variable} ${dmSerif.variable} font-sans flex flex-col pt-6 px-6`}>
       <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col relative justify-between">
          
          <header className="pt-2 pb-2 w-full shrink-0">
              <div className="flex items-center gap-2 mb-4">
                  <button onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))} disabled={currentIdx === 0} className="disabled:opacity-30">
                      <ArrowLeft className="w-5 h-5 text-[#1a1a2e]" />
                  </button>
                  <span className="text-lg font-bold text-[#1a1a2e]">Questionnaire</span>
              </div>
              <div className="flex items-center gap-4 w-full">
                  <div className="h-[2px] bg-[#1DA756] w-1/4 rounded-full" />
                  <span className="text-[10px] font-bold uppercase text-[#1DA756] tracking-[0.15em] whitespace-nowrap">
                      QUESTION {currentIdx + 1} OF {QUESTIONS.length}
                  </span>
                  <div className="h-[2px] bg-black/10 flex-1 rounded-full" />
              </div>
          </header>

          <main className="flex-1 flex flex-col pt-4 pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col w-full"
              >
                <h2 className="text-xl md:text-2xl tracking-tight leading-snug mb-6 font-medium text-center max-w-lg mx-auto">
                  {question.text}
                </h2>

                <div className="flex flex-wrap justify-center gap-3 w-full max-w-md mx-auto">
                  {question.options.map((opt, i) => {
                    const isSelected = answers[question.id] === opt.score;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(opt.score)}
                        className={`py-2 px-4 rounded-full text-center text-sm font-medium transition-all duration-200 border ${
                          isSelected 
                            ? 'bg-[#163832] border-[#163832] text-white shadow-md' 
                            : 'bg-white border-[#1a1a2e]/10 text-[#1a1a2e] hover:border-[#163832] hover:text-[#163832]'
                        }`}
                      >
                        {opt.text}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </main>

          <footer className="mt-8 mb-6 shrink-0 w-full flex justify-between items-center max-w-3xl mx-auto">
              <button 
                  onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
                  disabled={currentIdx === 0}
                  className="text-[#1a1a2e]/40 font-bold uppercase tracking-widest text-xs flex items-center justify-center hover:text-[#1a1a2e] px-4 py-2 rounded-full transition-all disabled:opacity-0"
              >
                  <ArrowLeft className="w-3 h-3 mr-2" /> Back
              </button>
              <button 
                  onClick={handleNext}
                  disabled={answers[question.id] === undefined}
                  className="bg-[#163832] text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center hover:bg-accent hover:text-[#051F20] px-6 py-3 rounded-full transition-all disabled:opacity-30 shadow-xl"
              >
                  {currentIdx === QUESTIONS.length - 1 ? "FINISH" : "CONTINUE"} <ArrowRight className="w-4 h-4 ml-2" />
              </button>
          </footer>
       </div>
    </div>
  );
}
