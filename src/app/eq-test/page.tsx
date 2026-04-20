"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { ArrowLeft, ArrowRight, Share2, RotateCcw, CheckCircle2 } from "lucide-react";

// Initialize fonts
const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

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

const QUESTIONS: Question[] = [
  // SELF-AWARENESS
  { id: 1, dimension: "Self-Awareness", subDimension: "Emotional self-awareness", format: "likert", text: "I can easily identify the exact emotion I am feeling at any given moment.", options: [{ text: "Strongly Disagree", score: 20 }, { text: "Disagree", score: 40 }, { text: "Neutral", score: 60 }, { text: "Agree", score: 80 }, { text: "Strongly Agree", score: 100 }] },
  { id: 2, dimension: "Self-Awareness", subDimension: "Accurate self-assessment", format: "likert", text: "I instantly recognize when my emotions are negatively affecting my performance.", options: [{ text: "Never", score: 20 }, { text: "Rarely", score: 40 }, { text: "Sometimes", score: 60 }, { text: "Often", score: 80 }, { text: "Always", score: 100 }] },
  { id: 3, dimension: "Self-Awareness", subDimension: "Emotional self-awareness", format: "mcq", text: "You feel suddenly frustrated during a meeting. What is your internal response?", options: [{ text: "I push the feeling down and force myself to focus.", score: 25 }, { text: "I mentally pause to figure out exactly what triggered me.", score: 100 }, { text: "I let the frustration fuel my argument.", score: 50 }, { text: "I distract myself to avoid losing my temper.", score: 75 }] },
  { id: 4, dimension: "Self-Awareness", subDimension: "Accurate self-assessment", format: "mcq", text: "You receive harsh feedback on a project you spent weeks on. Your first internal reaction is:", options: [{ text: "\"They don't understand the work I put into this.\"", score: 25 }, { text: "\"I must have completely failed this assignment.\"", score: 50 }, { text: "\"It hurts, but let me extract what is actually useful here.\"", score: 100 }, { text: "\"I will nod along, then continue doing it my way.\"", score: 75 }] },
  { id: 5, dimension: "Self-Awareness", subDimension: "Emotional self-awareness", format: "forced", text: "Which feels more natural to you?", options: [{ text: "Analyzing why I feel a certain way.", score: 100 }, { text: "Acting quickly and reflecting on my feelings later.", score: 50 }] },
  { id: 6, dimension: "Self-Awareness", subDimension: "Accurate self-assessment", format: "forced", text: "When evaluating your own skills:", options: [{ text: "I tend to overestimate to project confidence.", score: 50 }, { text: "I am acutely aware of exactly where I lack competence.", score: 100 }] },

  // SELF-REGULATION
  { id: 7, dimension: "Self-Regulation", subDimension: "Impulse control", format: "likert", text: "When stressed, I can safely delay acting until I am completely calm.", options: [{ text: "Never", score: 20 }, { text: "Rarely", score: 40 }, { text: "Sometimes", score: 60 }, { text: "Often", score: 80 }, { text: "Always", score: 100 }] },
  { id: 8, dimension: "Self-Regulation", subDimension: "Adaptability", format: "likert", text: "I seamlessly adapt my plans when sudden, unexpected changes occur.", options: [{ text: "Strongly Disagree", score: 20 }, { text: "Disagree", score: 40 }, { text: "Neutral", score: 60 }, { text: "Agree", score: 80 }, { text: "Strongly Agree", score: 100 }] },
  { id: 9, dimension: "Self-Regulation", subDimension: "Impulse control", format: "mcq", text: "Someone cuts you off aggressively in traffic, almost causing a severe accident. You:", options: [{ text: "Instinctively speed up or lean on the horn.", score: 25 }, { text: "Breathe, acknowledge the adrenaline, and let them go.", score: 100 }, { text: "Shake your head and complain about it for the next hour.", score: 50 }, { text: "Feel panicked, pulling over immediately to calm down.", score: 75 }] },
  { id: 10, dimension: "Self-Regulation", subDimension: "Adaptability", format: "mcq", text: "A massive constraint is added to your project days before launch. You:", options: [{ text: "Resist the change, arguing it’s too late.", score: 25 }, { text: "Immediately start mapping out a pivot strategy.", score: 100 }, { text: "Wait to see if someone else can fix it.", score: 50 }, { text: "Try to force the original plan through anyway.", score: 75 }] },
  { id: 11, dimension: "Self-Regulation", subDimension: "Impulse control", format: "forced", text: "In heated moments, your default is:", options: [{ text: "Immediate reactivity or defense.", score: 50 }, { text: "A calculated, deliberate pause.", score: 100 }] },
  { id: 12, dimension: "Self-Regulation", subDimension: "Adaptability", format: "forced", text: "When facing a sudden disruption:", options: [{ text: "I find it deeply unsettling and frustrating.", score: 50 }, { text: "I immediately look for where the new leverage is.", score: 100 }] },

  // EMPATHY
  { id: 13, dimension: "Empathy", subDimension: "Perspective-taking", format: "likert", text: "I can easily imagine exactly what another person is thinking, even if I disagree.", options: [{ text: "Never", score: 20 }, { text: "Rarely", score: 40 }, { text: "Sometimes", score: 60 }, { text: "Often", score: 80 }, { text: "Always", score: 100 }] },
  { id: 14, dimension: "Empathy", subDimension: "Empathic concern", format: "likert", text: "I sense when someone in the room is silently upset without them saying a word.", options: [{ text: "Never", score: 20 }, { text: "Rarely", score: 40 }, { text: "Sometimes", score: 60 }, { text: "Often", score: 80 }, { text: "Always", score: 100 }] },
  { id: 15, dimension: "Empathy", subDimension: "Perspective-taking", format: "mcq", text: "A friend complains about an issue you think is trivial. You:", options: [{ text: "Tell them they are overreacting.", score: 25 }, { text: "Listen, trying to locate exactly why it matters to them.", score: 100 }, { text: "Offer an immediate solution to permanently fix it.", score: 75 }, { text: "Change the subject to lighten the mood.", score: 50 }] },
  { id: 16, dimension: "Empathy", subDimension: "Empathic concern", format: "mcq", text: "A colleague seems withdrawn and quiet. You:", options: [{ text: "Assume they are busy and leave them strictly alone.", score: 50 }, { text: "Gently ask privately if everything is alright.", score: 100 }, { text: "Call them out in a meeting to get them engaged.", score: 25 }, { text: "Watch them for a while to see if they snap out of it.", score: 75 }] },
  { id: 17, dimension: "Empathy", subDimension: "Perspective-taking", format: "forced", text: "During a disagreement, I usually:", options: [{ text: "Focus entirely on making sure my point is understood.", score: 50 }, { text: "Focus heavily on understanding how the other person arrived at their stance.", score: 100 }] },
  { id: 18, dimension: "Empathy", subDimension: "Empathic concern", format: "forced", text: "Which matters more to you?", options: [{ text: "Making sure things are fair and logical.", score: 50 }, { text: "Making sure people feel heard and respected.", score: 100 }] },

  // SOCIAL SKILLS
  { id: 19, dimension: "Social Skills", subDimension: "Conflict management", format: "likert", text: "I comfortably navigate tense confrontations without taking things personally.", options: [{ text: "Strongly Disagree", score: 20 }, { text: "Disagree", score: 40 }, { text: "Neutral", score: 60 }, { text: "Agree", score: 80 }, { text: "Strongly Agree", score: 100 }] },
  { id: 20, dimension: "Social Skills", subDimension: "Influence/communication", format: "likert", text: "I can smoothly guide a group's consensus without forcing my opinion.", options: [{ text: "Strongly Disagree", score: 20 }, { text: "Disagree", score: 40 }, { text: "Neutral", score: 60 }, { text: "Agree", score: 80 }, { text: "Strongly Agree", score: 100 }] },
  { id: 21, dimension: "Social Skills", subDimension: "Conflict management", format: "mcq", text: "Two team members are actively fighting over a strategy. You:", options: [{ text: "Let them figure it out; it's their problem.", score: 25 }, { text: "Intervene to find the underlying shared goal between them.", score: 100 }, { text: "Tell them both to stop wasting time and pick a side.", score: 50 }, { text: "Try to compromise by splitting the difference exactly down the middle.", score: 75 }] },
  { id: 22, dimension: "Social Skills", subDimension: "Influence/communication", format: "mcq", text: "You need support for a radical new initiative. How do you pitch it?", options: [{ text: "I list pure data and metrics; the facts speak for themselves.", score: 50 }, { text: "I weave a compelling narrative linking it to the group's deeper values.", score: 100 }, { text: "I demand compliance because it is undeniably optimal.", score: 25 }, { text: "I quietly ask people 1-on-1 and hope it gathers momentum.", score: 75 }] },
  { id: 23, dimension: "Social Skills", subDimension: "Conflict management", format: "forced", text: "When an argument begins, my instinct is to:", options: [{ text: "Avoid the friction or walk away.", score: 50 }, { text: "De-escalate the tone while tackling the core issue.", score: 100 }] },
  { id: 24, dimension: "Social Skills", subDimension: "Influence/communication", format: "forced", text: "When persuading others:", options: [{ text: "I rely on the strength of my logic.", score: 50 }, { text: "I adjust my approach dynamically based on my audience.", score: 100 }] },

  // MOTIVATION
  { id: 25, dimension: "Motivation", subDimension: "Achievement drive", format: "likert", text: "I operate with an overwhelming internal drive to improve, even absent rewards.", options: [{ text: "Strongly Disagree", score: 20 }, { text: "Disagree", score: 40 }, { text: "Neutral", score: 60 }, { text: "Agree", score: 80 }, { text: "Strongly Agree", score: 100 }] },
  { id: 26, dimension: "Motivation", subDimension: "Resilience/optimism", format: "likert", text: "When I experience a severe failure, I quickly reset and maintain forward momentum.", options: [{ text: "Strongly Disagree", score: 20 }, { text: "Disagree", score: 40 }, { text: "Neutral", score: 60 }, { text: "Agree", score: 80 }, { text: "Strongly Agree", score: 100 }] },
  { id: 27, dimension: "Motivation", subDimension: "Achievement drive", format: "mcq", text: "You successfully reach a massive milestone. What next?", options: [{ text: "I relax; the hard work is finally done.", score: 50 }, { text: "I briefly celebrate, then immediately construct the next summit.", score: 100 }, { text: "I feel empty and burnout hits immediately.", score: 25 }, { text: "I maintain the exact same routine.", score: 75 }] },
  { id: 28, dimension: "Motivation", subDimension: "Resilience/optimism", format: "mcq", text: "You are rejected for an opportunity you desperately wanted. Your reaction:", options: [{ text: "It's proof the system is rigged or I lack talent.", score: 25 }, { text: "I analyze the rejection data and iterate my approach.", score: 100 }, { text: "I quickly apply for a lower-tier fallback.", score: 50 }, { text: "I feel horrible, but eventually try again months later.", score: 75 }] },
  { id: 29, dimension: "Motivation", subDimension: "Achievement drive", format: "forced", text: "What drives you more?", options: [{ text: "Reaching a high status or obtaining external validation.", score: 50 }, { text: "The sheer thrill of proving I can execute the impossible.", score: 100 }] },
  { id: 30, dimension: "Motivation", subDimension: "Resilience/optimism", format: "forced", text: "When looking at the future, you naturally lean towards:", options: [{ text: "Protecting myself securely against potential risks.", score: 50 }, { text: "Identifying massive opportunities to capitalize on.", score: 100 }] }
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
      <div className={`min-h-screen bg-[#faf9f7] text-[#1a1a2e] ${dmSans.variable} ${dmSerif.variable} font-sans flex flex-col pt-16`}>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto z-10">
          <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center mb-8 shadow-xl">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#1a1a2e] mb-6 leading-tight">
             Define Your <br/><span className="text-[#16a34a] italic">Emotional Protocol.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#1a1a2e]/60 font-medium max-w-2xl leading-relaxed mb-10">
            A 30-question diagnostic grounded in advanced behavioral frameworks. Pinpoint your emotional blind spots, discover your archetype, and architect a highly-calibrated mind.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Self-Awareness", "Self-Regulation", "Empathy", "Social Skills", "Motivation"].map(dim => (
              <span key={dim} className="px-4 py-2 bg-[#f2f0ec] text-xs font-bold uppercase tracking-widest rounded-full">{dim}</span>
            ))}
          </div>
          <button 
            onClick={() => setScreen("test")}
            className="px-10 py-5 bg-[#1a1a2e] text-white rounded-full font-bold tracking-wide hover:bg-[#16a34a] transition-all duration-300 shadow-2xl flex items-center gap-3"
          >
            Start Assessment <ArrowRight className="w-5 h-5" />
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
      <div className={`min-h-screen bg-[#faf9f7] text-[#1a1a2e] ${dmSans.variable} ${dmSerif.variable} font-sans py-24`}>
        <div className="max-w-5xl mx-auto px-6">
          
          <header className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a2e] mb-4">Your Emotional Signature</h1>
            <p className="text-lg font-medium text-[#1a1a2e]/60">Based on the analytical processing of your 30 situational matrices.</p>
          </header>

          {/* Top Level Metric */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#1a1a2e]/5 flex flex-col items-center justify-center text-center">
               <div className="text-[6rem] font-serif leading-none tracking-tighter text-[#16a34a] mb-2">{results.totalScore}</div>
               <div className="text-sm font-bold uppercase tracking-widest text-[#1a1a2e]/40 mb-6">Aggregate EQ Score</div>
               <div className="px-6 py-2 bg-[#f2f0ec] rounded-full text-sm font-bold tracking-wide">{results.tier}</div>
            </div>

            <div className="bg-[#1a1a2e] text-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-3">Primary Archetype</div>
                <h2 className="text-4xl font-serif mb-4">{results.archetype.name}</h2>
                <p className="text-lg text-white/80 leading-relaxed font-medium mb-8">{results.archetype.essence}</p>
              </div>
              <div className="pt-6 border-t border-white/10 flex justify-between items-center text-sm font-medium">
                 <div><span className="text-[#0d9e7b]">Power:</span> {results.archetype.power}</div>
                 <div><span className="text-[#d45f43]">Blind Spot:</span> {results.archetype.blindSpot}</div>
              </div>
            </div>
          </div>

          {/* Radar & Heatmap Layer */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1a1a2e]/5 flex items-center justify-center relative">
               <svg width="300" height="300" viewBox="0 0 300 300" className="drop-shadow-xl">
                  {/* Web Background */}
                  {[20, 40, 60, 80, 100].map(val => (
                    <polygon 
                      key={val} 
                      points={dims.map((_, i) => getCoord(val, i, dims.length)).join(" ")} 
                      fill="none" 
                      stroke="#1a1a2e" 
                      strokeOpacity="0.05" 
                      strokeWidth="1" 
                    />
                  ))}
                  {/* Axis lines */}
                  {dims.map((_, i) => (
                    <line key={i} x1="150" y1="150" x2={getCoord(100, i, dims.length).split(',')[0]} y2={getCoord(100, i, dims.length).split(',')[1]} stroke="#1a1a2e" strokeOpacity="0.05" />
                  ))}
                  {/* Active Polygon */}
                  <polygon points={radarPoints} fill="rgba(92, 79, 207, 0.2)" stroke="#5c4fcf" strokeWidth="3" />
                  
                  {/* Points */}
                  {dims.map((d, i) => {
                     const [cx, cy] = getCoord(results.finalDimScores[d], i, dims.length).split(',');
                     return <circle key={'dot'+i} cx={cx} cy={cy} r="6" fill="#1a1a2e" />;
                  })}
               </svg>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#1a1a2e]/5">
              <h3 className="font-serif text-2xl mb-6">Dimension Heatmap</h3>
              <div className="space-y-4">
                {dims.map(d => (
                  <div key={d} className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#1a1a2e]/70">{d}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2.5 bg-[#f2f0ec] rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${
                            results.finalDimScores[d] >= 80 ? 'bg-[#0d9e7b]' : 
                            results.finalDimScores[d] >= 60 ? 'bg-[#5c4fcf]' : 
                            results.finalDimScores[d] >= 40 ? 'bg-[#c07a1a]' : 'bg-[#d45f43]'
                          }`}
                          style={{ width: `${results.finalDimScores[d]}%` }}
                        />
                      </div>
                      <span className="w-8 text-right font-bold font-serif text-lg">{results.finalDimScores[d]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Growth Plan Layer */}
          <div className="bg-[#f2f0ec] p-10 rounded-[2.5rem]">
             <h3 className="font-serif text-3xl mb-8">Personalized Execution Protocols</h3>
             <div className="grid md:grid-cols-2 gap-6">
                {lowestDims.map(dim => {
                  const plan = GROWTH_PLANS[dim];
                  return (
                    <div key={dim} className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                       <span className="text-xs font-bold uppercase tracking-widest text-[#d45f43] mb-2 block">{dim} Enhancement</span>
                       <h4 className="text-xl font-bold mb-4">{plan.title}</h4>
                       <p className="text-sm text-[#1a1a2e]/70 font-medium leading-relaxed mb-6">
                         {plan.practice}
                       </p>
                       <div className="pt-4 border-t border-black/5 text-xs font-bold text-black/40">
                         Recommended Reading: <span className="text-[#1a1a2e] block mt-1">{plan.book}</span>
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
    <div className={`min-h-screen bg-[#faf9f7] text-[#1a1a2e] ${dmSans.variable} ${dmSerif.variable} font-sans flex flex-col pt-6 px-6`}>
       <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col relative">
          
          <header className="pt-6 pb-2 w-full">
              <div className="flex items-center gap-2 mb-6">
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

          <main className="flex-1 flex flex-col pt-8 pb-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col w-full"
              >
                <h2 className="text-2xl md:text-3xl tracking-tight leading-snug mb-10 font-medium text-center max-w-lg mx-auto">
                  {question.text}
                </h2>

                <div className="flex flex-wrap justify-center gap-3 w-full max-w-md mx-auto">
                  {question.options.map((opt, i) => {
                    const isSelected = answers[question.id] === opt.score;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(opt.score)}
                        className={`py-3 px-6 rounded-full text-center text-[15px] font-medium transition-all duration-200 border ${
                          isSelected 
                            ? 'bg-[#1DA756] border-[#1DA756] text-white shadow-md' 
                            : 'bg-white border-[#1a1a2e]/10 text-[#1a1a2e] hover:border-[#1DA756] hover:text-[#1DA756]'
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

          <footer className="fixed bottom-0 left-0 right-0 p-6 flex justify-end z-20 pointer-events-none">
              <button 
                  onClick={handleNext}
                  disabled={answers[question.id] === undefined}
                  className="text-[#1DA756] font-bold uppercase tracking-widest text-sm flex items-center justify-center hover:bg-[#1DA756]/10 px-6 py-3 rounded-full transition-all disabled:opacity-30 pointer-events-auto bg-white/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-black/5"
              >
                  {currentIdx === QUESTIONS.length - 1 ? "FINISH" : "CONTINUE"} 
              </button>
          </footer>
       </div>
    </div>
  );
}
