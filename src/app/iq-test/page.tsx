"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { ArrowLeft, ArrowRight, CheckCircle2, RotateCcw, Brain, Activity } from "lucide-react";
import Link from "next/link";

const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"], variable: "--font-dm-serif" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

// ==========================================
// SVG SVGS FOR visual IQ MATRICES
// ==========================================

const MatrixGrid = ({ cells }: { cells: (React.ReactNode | "missing")[] }) => (
  <div className="grid grid-cols-3 gap-2 p-2 bg-black/5 rounded-2xl w-fit mx-auto border border-black/10 shadow-inner">
    {cells.map((cell, i) => (
      <div key={i} className="w-20 h-20 md:w-28 md:h-28 bg-white rounded-xl shadow-sm border border-black/5 flex items-center justify-center overflow-hidden relative">
        {cell === "missing" ? (
          <span className="text-3xl font-serif text-black/20">?</span>
        ) : (
          cell
        )}
      </div>
    ))}
  </div>
);

const VisualOption = ({ children, isSelected, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl border-2 transition-all flex flex-col items-center justify-center relative group ${
      isSelected 
        ? "border-[#16a34a] bg-[#16a34a]/5 shadow-[0_0_20px_rgba(22,163,74,0.2)]" 
        : "border-black/10 bg-white hover:border-black/30 hover:bg-[#faf9f7]"
    }`}
  >
    <div className="absolute top-2 left-2 text-[10px] font-bold text-black/40">{label}</div>
    {children}
  </button>
);

// Shapes helper
const SvgShape = ({ type, fill="none", stroke="#1a1a2e", rotate=0 }: any) => {
  return (
    <svg width="40" height="40" viewBox="0 0 100 100" style={{ transform: `rotate(${rotate}deg)` }}>
      {type === "circle" && <circle cx="50" cy="50" r="40" fill={fill} stroke={stroke} strokeWidth="6" />}
      {type === "square" && <rect x="15" y="15" width="70" height="70" fill={fill} stroke={stroke} strokeWidth="6" />}
      {type === "triangle" && <polygon points="50,15 90,85 10,85" fill={fill} stroke={stroke} strokeWidth="6" strokeLinejoin="round" />}
      {type === "diamond" && <polygon points="50,10 90,50 50,90 10,50" fill={fill} stroke={stroke} strokeWidth="6" strokeLinejoin="round" />}
      {type === "plus" && (
         <g stroke={stroke} strokeWidth="8" strokeLinecap="round">
            <line x1="50" y1="20" x2="50" y2="80" />
            <line x1="20" y1="50" x2="80" y2="50" />
         </g>
      )}
      {type === "cross" && (
         <g stroke={stroke} strokeWidth="8" strokeLinecap="round">
            <line x1="25" y1="25" x2="75" y2="75" />
            <line x1="75" y1="25" x2="25" y2="75" />
         </g>
      )}
      {type === "arrow" && (
        <g stroke={stroke} fill={fill} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
           <path d="M50,15 L50,85 M25,40 L50,15 L75,40" />
        </g>
      )}
      {type === "half-circle-left" && <path d="M50,10 A40,40 0 0,0 50,90 Z" fill={fill} stroke={stroke} strokeWidth="6" />}
      {type === "half-circle-right" && <path d="M50,10 A40,40 0 0,1 50,90 Z" fill={fill} stroke={stroke} strokeWidth="6" />}
      {type === "half-sq-top" && <rect x="15" y="15" width="70" height="35" fill={fill} stroke={stroke} strokeWidth="6" />}
      {type === "half-sq-bottom" && <rect x="15" y="50" width="70" height="35" fill={fill} stroke={stroke} strokeWidth="6" />}
    </svg>
  )
}

// Draw multiple dots
const Dots = ({ count }: { count: number }) => {
  return (
    <div className={`grid gap-1 ${count > 4 ? 'grid-cols-3' : count > 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
      {Array.from({length: count}).map((_, i) => (
         <div key={i} className="w-3 h-3 bg-[#1a1a2e] rounded-full" />
      ))}
    </div>
  )
}

// Composite shapes
const Overlay = ({ layers }: { layers: React.ReactNode[] }) => (
  <div className="relative w-12 h-12 flex justify-center items-center">
    {layers.map((layer, i) => (
      <div key={i} className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {layer}
      </div>
    ))}
  </div>
);

// ==========================================
// DATA & TYPES
// ==========================================

const QUESTIONS = [
  {
    id: 1,
    type: "boolean-or",
    instruction: "Identify the pattern to find the missing visual block.",
    grid: [
      <SvgShape type="half-circle-left" fill="#1a1a2e" />, <SvgShape type="half-circle-right" fill="#1a1a2e" />, <SvgShape type="circle" fill="#1a1a2e" />,
      <SvgShape type="half-sq-top" fill="#16a34a" stroke="#16a34a" />, <SvgShape type="half-sq-bottom" fill="#16a34a" stroke="#16a34a" />, <SvgShape type="square" fill="#16a34a" stroke="#16a34a" />,
      <SvgShape type="half-circle-right" fill="none" stroke="#5c4fcf" />, <SvgShape type="half-circle-left" fill="none" stroke="#5c4fcf" />, "missing"
    ],
    options: [
      { id: "A", node: <SvgShape type="square" fill="none" stroke="#5c4fcf"/>, isCorrect: false },
      { id: "B", node: <SvgShape type="circle" fill="none" stroke="#5c4fcf"/>, isCorrect: true },
      { id: "C", node: <SvgShape type="circle" fill="#1a1a2e" />, isCorrect: false },
      { id: "D", node: <SvgShape type="half-circle-right" fill="none" stroke="#5c4fcf"/>, isCorrect: false }
    ],
    category: "Spatial Synthesis"
  },
  {
    id: 2,
    type: "rotation",
    instruction: "Observe the rotational logic and complete the sequence.",
    grid: [
      <SvgShape type="arrow" rotate={0} stroke="#1a1a2e" />, <SvgShape type="arrow" rotate={90} stroke="#1a1a2e" />, <SvgShape type="arrow" rotate={180} stroke="#1a1a2e" />,
      <SvgShape type="arrow" rotate={180} stroke="#16a34a" />, <SvgShape type="arrow" rotate={270} stroke="#16a34a" />, <SvgShape type="arrow" rotate={0} stroke="#16a34a" />,
      <SvgShape type="arrow" rotate={270} stroke="#5c4fcf" />, <SvgShape type="arrow" rotate={0} stroke="#5c4fcf" />, "missing"
    ],
    options: [
      { id: "A", node: <SvgShape type="arrow" rotate={0} stroke="#5c4fcf" />, isCorrect: false },
      { id: "B", node: <SvgShape type="arrow" rotate={180} stroke="#5c4fcf" />, isCorrect: false },
      { id: "C", node: <SvgShape type="arrow" rotate={90} stroke="#5c4fcf" />, isCorrect: true },
      { id: "D", node: <SvgShape type="arrow" rotate={270} stroke="#5c4fcf" />, isCorrect: false }
    ],
    category: "Rotational Tracking"
  },
  {
    id: 3,
    type: "xor-logic",
    instruction: "Which component correctly completes the matrix based on logical combination?",
    grid: [
      <Overlay layers={[<SvgShape type="square" />, <SvgShape type="plus" stroke="#16a34a" />]} />, 
      <Overlay layers={[<SvgShape type="plus" stroke="#16a34a" />, <SvgShape type="circle" />]} />, 
      <Overlay layers={[<SvgShape type="square" />, <SvgShape type="circle" />]} />,
      
      <Overlay layers={[<SvgShape type="triangle" />, <SvgShape type="cross" stroke="#5c4fcf" />]} />, 
      <Overlay layers={[<SvgShape type="cross" stroke="#5c4fcf" />, <SvgShape type="diamond" />]} />, 
      <Overlay layers={[<SvgShape type="triangle" />, <SvgShape type="diamond" />]} />,
      
      <Overlay layers={[<SvgShape type="circle" stroke="#1a1a2e" />, <SvgShape type="square" stroke="#16a34a" />]} />, 
      <Overlay layers={[<SvgShape type="square" stroke="#16a34a" />, <SvgShape type="arrow" stroke="#5c4fcf" />]} />, 
      "missing"
    ],
    options: [
      { id: "A", node: <Overlay layers={[<SvgShape type="circle" stroke="#1a1a2e" />, <SvgShape type="arrow" stroke="#5c4fcf" />]} />, isCorrect: true },
      { id: "B", node: <Overlay layers={[<SvgShape type="square" stroke="#16a34a" />, <SvgShape type="arrow" stroke="#5c4fcf" />]} />, isCorrect: false },
      { id: "C", node: <Overlay layers={[<SvgShape type="circle" stroke="#1a1a2e" />, <SvgShape type="square" stroke="#16a34a" />]} />, isCorrect: false },
      { id: "D", node: <Overlay layers={[<SvgShape type="square" stroke="#16a34a" />]} />, isCorrect: false }
    ],
    category: "Exclusive-OR Logic"
  },
  {
    id: 4,
    type: "quantitative",
    instruction: "Deduce the quantitative progression of the elements.",
    grid: [
      <Dots count={1} />, <Dots count={2} />, <Dots count={3} />,
      <Dots count={2} />, <Dots count={3} />, <Dots count={4} />,
      <Dots count={3} />, <Dots count={4} />, "missing"
    ],
    options: [
      { id: "A", node: <Dots count={4} />, isCorrect: false },
      { id: "B", node: <Dots count={5} />, isCorrect: true },
      { id: "C", node: <Dots count={6} />, isCorrect: false },
      { id: "D", node: <Dots count={3} />, isCorrect: false }
    ],
    category: "Quantitative Progression"
  },
  {
    id: 5,
    type: "pattern-shift",
    instruction: "Identify the shifting relationship.",
    grid: [
      <SvgShape type="triangle" fill="#1a1a2e" />, <SvgShape type="square" fill="none" />, <SvgShape type="pentagon" fill="#1a1a2e" />,
      <SvgShape type="triangle" fill="none" />, <SvgShape type="square" fill="#1a1a2e" />, <SvgShape type="pentagon" fill="none" />,
      <SvgShape type="triangle" fill="#1a1a2e" />, <SvgShape type="square" fill="none" />, "missing"
    ],
    options: [
      { id: "A", node: <SvgShape type="pentagon" fill="none" />, isCorrect: false },
      { id: "B", node: <SvgShape type="square" fill="#1a1a2e" />, isCorrect: false },
      { id: "C", node: <SvgShape type="circle" fill="#1a1a2e" />, isCorrect: false },
      { id: "D", node: <SvgShape type="pentagon" fill="#1a1a2e" />, isCorrect: true },
    ],
    // A pentagon SVG fallback
    category: "Alternating Sequences"
  },
  {
    id: 6,
    type: "complex-matrix",
    instruction: "Analyze row and column relationships to solve for the missing piece.",
    grid: [
      <Overlay layers={[<SvgShape type="square" fill="#1a1a2e"/>, <SvgShape type="circle" fill="white" stroke="none"/>]} />,
      <Overlay layers={[<SvgShape type="square" fill="none" stroke="#1a1a2e"/>, <SvgShape type="circle" fill="#1a1a2e" stroke="none"/>]} />,
      <SvgShape type="square" fill="#1a1a2e" />,

      <Overlay layers={[<SvgShape type="circle" fill="#16a34a"/>, <SvgShape type="triangle" fill="white" stroke="none"/>]} />,
      <Overlay layers={[<SvgShape type="circle" fill="none" stroke="#16a34a"/>, <SvgShape type="triangle" fill="#16a34a" stroke="none"/>]} />,
      <SvgShape type="circle" fill="#16a34a" />,

      <Overlay layers={[<SvgShape type="triangle" fill="#5c4fcf"/>, <SvgShape type="square" fill="white" stroke="none"/>]} />,
      <Overlay layers={[<SvgShape type="triangle" fill="none" stroke="#5c4fcf"/>, <SvgShape type="square" fill="#5c4fcf" stroke="none"/>]} />,
      "missing"
    ],
    options: [
      { id: "A", node: <SvgShape type="triangle" fill="#5c4fcf" />, isCorrect: true },
      { id: "B", node: <SvgShape type="square" fill="#5c4fcf" />, isCorrect: false },
      { id: "C", node: <Overlay layers={[<SvgShape type="triangle" fill="#5c4fcf"/>, <SvgShape type="square" fill="black"/>]} />, isCorrect: false },
      { id: "D", node: <SvgShape type="triangle" fill="none" stroke="#5c4fcf" />, isCorrect: false }
    ],
    category: "Inverted Overlay Abstraction"
  }
];

// Re-patching the pentagon manually since it doesn't exist in our standard shape renderer above 
// Updating questions data specifically for Q5
QUESTIONS[4].grid[2] = <svg width="40" height="40" viewBox="0 0 100 100"><polygon points="50,10 90,40 75,90 25,90 10,40" fill="#1a1a2e" stroke="#1a1a2e" strokeWidth="6" strokeLinejoin="round" /></svg>;
QUESTIONS[4].grid[5] = <svg width="40" height="40" viewBox="0 0 100 100"><polygon points="50,10 90,40 75,90 25,90 10,40" fill="none" stroke="#1a1a2e" strokeWidth="6" strokeLinejoin="round" /></svg>;
QUESTIONS[4].options[0].node = <svg width="40" height="40" viewBox="0 0 100 100"><polygon points="50,10 90,40 75,90 25,90 10,40" fill="none" stroke="#1a1a2e" strokeWidth="6" strokeLinejoin="round" /></svg>;
QUESTIONS[4].options[3].node = <svg width="40" height="40" viewBox="0 0 100 100"><polygon points="50,10 90,40 75,90 25,90 10,40" fill="#1a1a2e" stroke="#1a1a2e" strokeWidth="6" strokeLinejoin="round" /></svg>;

// ==========================================
// ENGINE & RESULTS
// ==========================================

export default function IQAssessment() {
  const [screen, setScreen] = useState<"welcome" | "test" | "results">("welcome");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const question = QUESTIONS[currentIdx];
  const progressPercent = ((currentIdx) / QUESTIONS.length) * 100;

  const handleSelect = (optionId: string) => {
    setAnswers({ ...answers, [question.id]: optionId });
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setScreen("results");
    }
  };

  const results = useMemo(() => {
    if (screen !== "results") return null;
    
    let score = 0;
    const catScores: Record<string, { correct: number, total: number }> = {};
    
    QUESTIONS.forEach(q => {
      const selected = answers[q.id];
      const correctOpt = q.options.find(o => o.isCorrect)?.id;
      
      if (!catScores[q.category]) {
        catScores[q.category] = { correct: 0, total: 0 };
      }
      catScores[q.category].total += 1;
      
      if (selected === correctOpt) {
        score += 1;
        catScores[q.category].correct += 1;
      }
    });

    const maxScore = QUESTIONS.length;
    let iqEstimate = 0;
    const percentage = score / maxScore;

    if (percentage === 1.0) iqEstimate = 135; // Perfect logic
    else if (percentage >= 0.8) iqEstimate = 125;
    else if (percentage >= 0.6) iqEstimate = 115;
    else if (percentage >= 0.4) iqEstimate = 105;
    else iqEstimate = 95; // Baseline floor for this short prototype

    let archetype = { name: "The Spatial Architect", essence: "You see the world in interlocking systems and precise geometric flow." };
    if (catScores["Exclusive-OR Logic"]?.correct === 1 && catScores["Inverted Overlay Abstraction"]?.correct === 1) {
      archetype = { name: "The Logic Engine", essence: "You rapidly dissect competing variables, ignoring noise to find absolute truth." };
    } else if (catScores["Quantitative Progression"]?.correct === 1 && catScores["Rotational Tracking"]?.correct === 1) {
      archetype = { name: "The Pattern Weaver", essence: "You excel at identifying sequential movement and predicting future states." };
    } else if (percentage < 0.6) {
      archetype = { name: "The Intuitive", essence: "Your processing relies less on strict mechanism and more on gestalt instinct." };
    }

    return { score, maxScore, iqEstimate, archetype, catScores };
  }, [answers, screen]);

  // Screen: Welcome
  if (screen === "welcome") {
    return (
      <div className={`min-h-screen bg-[#faf9f7] text-[#1a1a2e] ${dmSans.variable} ${dmSerif.variable} font-sans flex flex-col pt-16`}>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto z-10">
          <div className="w-16 h-16 rounded-full bg-[#16a34a] text-white flex items-center justify-center mb-8 shadow-xl">
            <Brain className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-[#1a1a2e] mb-6 leading-tight">
             Measure Your <br/><span className="text-[#16a34a] italic">Cognitive Load.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#1a1a2e]/60 font-medium max-w-3xl leading-relaxed mb-10">
            A high-signal, visual matrix assessment designed to test fluid intelligence, pattern recognition, and spatial mechanics. No language. No trivia. Pure processing power.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Pattern Shift", "Exclusive OR", "Matrix Syntheses", "Rotation Mechanics"].map(dim => (
              <span key={dim} className="px-4 py-2 bg-white border border-black/5 text-[#16a34a] text-xs font-bold uppercase tracking-widest rounded-full shadow-sm">{dim}</span>
            ))}
          </div>
          <button 
            onClick={() => setScreen("test")}
            className="px-10 py-5 bg-[#1a1a2e] text-white rounded-full font-bold tracking-wide hover:bg-[#16a34a] transition-all duration-300 shadow-2xl flex items-center gap-3"
          >
            Initiate Sequence <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // Screen: Results
  if (screen === "results" && results) {
    return (
      <div className={`min-h-screen bg-[#faf9f7] text-[#1a1a2e] ${dmSans.variable} ${dmSerif.variable} font-sans py-24`}>
        <div className="max-w-5xl mx-auto px-6">
          <header className="mb-16 text-center">
            <h1 className="text-4xl md:text-5xl font-serif text-[#1a1a2e] mb-4">Your Cognitive Baseline</h1>
            <p className="text-lg font-medium text-[#1a1a2e]/60">Based on purely visual inductive logic processing.</p>
          </header>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-[#1a1a2e]/5 flex flex-col items-center justify-center text-center">
               <div className="text-sm font-bold uppercase tracking-widest text-[#16a34a] mb-2 flex items-center gap-2"><Activity size={16} /> Estimated Processing Tier</div>
               <div className="text-[6rem] font-serif leading-none tracking-tighter text-[#1a1a2e] mb-4">{results.iqEstimate}</div>
               <div className="px-6 py-2 bg-[#f2f0ec] rounded-full text-sm font-bold tracking-wide text-[#1a1a2e]/70">
                 Raw Score: {results.score} / {results.maxScore} Accurate Matrices
               </div>
            </div>

            <div className="bg-[#1a1a2e] text-white p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-[#16a34a] mb-3">Processing Archetype</div>
                <h2 className="text-4xl font-serif mb-4 leading-tight">{results.archetype.name}</h2>
                <p className="text-lg text-white/80 leading-relaxed font-medium">{results.archetype.essence}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 border border-black/5 shadow-sm">
            <h3 className="font-serif text-3xl mb-8">Matrix Performance Analytics</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {Object.entries(results.catScores).map(([cat, data], i) => (
                  <div key={i} className="p-6 bg-[#faf9f7] rounded-2xl border border-black/5">
                     <h4 className="font-bold text-sm text-[#1a1a2e]/80 uppercase tracking-wide mb-4">{cat}</h4>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 h-3 bg-black/5 rounded-full overflow-hidden">
                           <div className="h-full bg-[#16a34a] transition-all" style={{ width: `${(data.correct / data.total) * 100}%` }} />
                        </div>
                        <span className="font-serif font-bold text-lg">{data.correct}/{data.total}</span>
                     </div>
                  </div>
               ))}
            </div>
          </div>

          <div className="mt-12 text-center">
             <Link href="/" className="px-8 py-4 bg-[#f2f0ec] hover:bg-[#1a1a2e] hover:text-white transition-colors rounded-full font-bold inline-flex items-center gap-2">
                <CheckCircle2 size={18} /> Return to Operations
             </Link>
          </div>

        </div>
      </div>
    );
  }

  // Active Question Screen
  return (
    <div className={`min-h-screen bg-[#faf9f7] text-[#1a1a2e] ${dmSans.variable} ${dmSerif.variable} font-sans flex flex-col pt-24`}>
       <div className="fixed top-[88px] left-0 right-0 h-1.5 bg-[#f2f0ec] z-20">
         <motion.div 
           className="h-full bg-[#16a34a]"
           initial={{ width: 0 }}
           animate={{ width: `${progressPercent}%` }}
           transition={{ duration: 0.3 }}
         />
       </div>

       <div className="max-w-4xl w-full mx-auto px-6 py-8 flex-1 flex flex-col justify-center">
          <div className="mb-8 flex items-center justify-between">
            <span className="px-4 py-1.5 bg-white shadow-sm border border-black/5 text-[#16a34a] text-xs font-bold uppercase tracking-widest rounded-full">
              Intelligence Logic | {question.category}
            </span>
            <span className="font-serif text-2xl text-[#1a1a2e]/30">
              {currentIdx + 1} <span className="text-sm">/ {QUESTIONS.length}</span>
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={question.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full flex flex-col items-center gap-12"
              >
                
                {/* The Logical Matrix UI */}
                <div className="w-full flex justify-center pb-6">
                   <MatrixGrid cells={question.grid} />
                </div>

                <div className="w-full max-w-2xl px-6 text-center">
                   <h2 className="text-2xl font-serif text-[#1a1a2e] mb-6">{question.instruction}</h2>
                   <div className="flex flex-wrap justify-center gap-4">
                     {question.options.map((opt) => (
                       <VisualOption 
                         key={opt.id}
                         label={opt.id}
                         isSelected={answers[question.id] === opt.id}
                         onClick={() => handleSelect(opt.id)}
                       >
                          {opt.node}
                       </VisualOption>
                     ))}
                   </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex justify-between items-center pt-6 border-t border-[#1a1a2e]/10">
            <button 
              onClick={() => setCurrentIdx(Math.max(0, currentIdx - 1))}
              className={`p-3 rounded-full border transition-all ${currentIdx === 0 ? 'opacity-0 pointer-events-none' : 'border-[#1a1a2e]/20 text-[#1a1a2e] hover:bg-[#1a1a2e] hover:text-white shadow-md'}`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <button 
              onClick={handleNext}
              disabled={answers[question.id] === undefined}
              className={`px-10 py-4 rounded-full font-bold flex items-center gap-3 transition-all ${
                answers[question.id] !== undefined 
                ? 'bg-[#16a34a] text-white hover:bg-[#1a1a2e] shadow-xl hover:-translate-y-1' 
                : 'bg-white border border-black/10 text-black/30 cursor-not-allowed'
              }`}
            >
              {currentIdx === QUESTIONS.length - 1 ? 'Calculate Baseline' : 'Submit & Continue'} <ArrowRight className="w-5 h-5" />
            </button>
          </div>

       </div>
    </div>
  );
}
