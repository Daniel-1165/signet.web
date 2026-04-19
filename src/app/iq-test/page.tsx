"use client";

import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft } from "lucide-react";

// ==========================================
// DATA & TYPES
// ==========================================

const G_TYPES = {
    Gf: { name: "Fluid Reasoning" },
    Gc: { name: "Crystallized Intelligence" },
    Gv: { name: "Visual-Spatial Processing" },
    Gw: { name: "Working Memory" },
    Gs: { name: "Processing Speed" },
    Gq: { name: "Quantitative Reasoning" }
} as const;

type Domain = keyof typeof G_TYPES;

interface Question {
    id: number;
    domain: Domain;
    diff: number;
    weight: number;
    type: 'visual' | 'text';
    timed?: boolean;
    q: string;
    func?: (props: any) => React.ReactNode;
    opts: string[];
    ans: number;
}

// ==========================================
// SVG VISUAL HELPERS (Monochrome Minimalist)
// ==========================================

const d3x3Matrix = () => (
    <svg viewBox="0 0 300 300" className="w-[80%] max-w-sm mx-auto h-auto">
        {[0, 1, 2].map(i => [0, 1, 2].map(j => {
            if (i === 2 && j === 2) return <text key="q" x={j * 100 + 50} y={i * 100 + 65} textAnchor="middle" fontSize="40" fill="#000" fontWeight="400" className="font-sans">?</text>;
            const strokeColor = "#000";
            if (j === 0) return <circle key={`${i}-${j}`} cx={j * 100 + 50} cy={i * 100 + 50} r={28} fill="none" stroke={strokeColor} strokeWidth={2} />;
            if (j === 1) return <rect key={`${i}-${j}`} x={j * 100 + 25} y={i * 100 + 25} width={50} height={50} fill="none" stroke={strokeColor} strokeWidth={2} />;
            return <path key={`${i}-${j}`} d={`M${j * 100 + 50} ${i * 100 + 22} L${j * 100 + 78} ${i * 100 + 78} L${j * 100 + 22} ${i * 100 + 78} Z`} fill="none" stroke={strokeColor} strokeWidth={2} />;
        }))}
    </svg>
);

const dShapeSeq = () => (
    <svg viewBox="0 0 500 100" className="w-full h-auto">
        {[0, 1, 2, 3, 4].map(i => (
            <circle key={i} cx={i * 100 + 50} cy={50} r={15 + (i * 4)} fill={i % 2 === 0 ? "#000" : "none"} stroke="#000" strokeWidth="2" />
        ))}
    </svg>
);

const dMirror = () => (
    <svg viewBox="0 0 400 200" className="w-[80%] max-w-sm mx-auto h-auto">
        <path d="M100 50 L100 150 L150 150 L150 120 L130 120 L130 50 Z" fill="none" stroke="#000" strokeWidth="2" />
        <line x1={200} y1={20} x2={200} y2={180} stroke="#000" strokeWidth="0.5" strokeDasharray="4" />
        <path d="M300 50 L300 150 L250 150 L250 120 L270 120 L270 50 Z" fill="#000" />
    </svg>
);

const dCountSquares = () => (
    <svg viewBox="0 0 300 300" className="w-[80%] max-w-sm mx-auto h-auto">
        <rect x={0} y={0} width={300} height={300} fill="none" stroke="#000" strokeWidth="2" />
        {[1, 2].map(i => (
            <g key={i}>
                <line x1={0} y1={i * 100} x2={300} y2={i * 100} stroke="#000" strokeWidth="1" />
                <line x1={i * 100} y1={0} x2={i * 100} y2={300} stroke="#000" strokeWidth="1" />
            </g>
        ))}
    </svg>
);

const dSymbolFreq = () => {
    const symbols = ['+', '○', '△', '□'];
    const items = [];
    for(let i=0; i<40; i++) {
        items.push({
            sym: symbols[Math.floor(Math.random() * symbols.length)],
            x: Math.random() * 280 + 10,
            y: Math.random() * 280 + 10
        });
    }
    return (
        <svg viewBox="0 0 300 300" className="w-[80%] max-w-sm mx-auto h-auto">
            {items.map((it, idx) => (
                <text key={idx} x={it.x} y={it.y} fontSize="14" fill="#000" fontWeight="400" className="font-sans">{it.sym}</text>
            ))}
        </svg>
    );
};

const dNumMatrix = () => (
    <svg viewBox="0 0 300 300" className="w-[80%] max-w-sm mx-auto h-auto">
        {[ [3,6,9], [4,8,12], [5,10,"?"] ].map((row, i) => row.map((num, j) => (
            <text key={`${i}-${j}`} x={j * 100 + 50} y={i * 100 + 60} textAnchor="middle" fontSize="24" fill="#000" fontWeight="400" className="font-sans">{num}</text>
        )))}
    </svg>
);

const QUESTIONS: Question[] = [
    { id: 1, domain: 'Gf', diff: 1, weight: 1.0, type: 'visual', q: "Identify the missing element in the 3×3 logic grid.", func: d3x3Matrix, opts: ["Circle", "Square", "Triangle", "Star"], ans: 1 },
    { id: 7, domain: 'Gf', diff: 1, weight: 1.0, type: 'text', q: "If all Zaps are Bops, and some Bops are Clips, which statement must logically be true?", opts: ["All Clips are Zaps", "Some Zaps are Clips", "Some Clips are Bops", "No Zaps are Clips"], ans: 2 },
    { id: 13, domain: 'Gf', diff: 2, weight: 1.5, type: 'text', q: "What letter comes next in the sequence: O, T, T, F, F, S, S, E, __ ?", opts: ["N", "T", "E", "M"], ans: 0 },
    { id: 2, domain: 'Gc', diff: 1, weight: 1.0, type: 'text', q: "EPHEMERAL is to PERMANENT as NOVICE is to:", opts: ["Beginner", "Expert", "Transient", "Legacy"], ans: 1 },
    { id: 8, domain: 'Gc', diff: 1, weight: 1.0, type: 'text', q: "Which word is most nearly the opposite of GARRULOUS?", opts: ["Chatty", "Loud", "Taciturn", "Erudite"], ans: 2 },
    { id: 14, domain: 'Gc', diff: 2, weight: 1.5, type: 'text', q: "ARCHIPELAGO is to ISLAND as GALAXY is to:", opts: ["Nebula", "Star", "Orbit", "Universe"], ans: 1 },
    { id: 3, domain: 'Gv', diff: 1, weight: 1.0, type: 'visual', q: "Select the correct horizontal mirror reflection of the L-shape.", func: dMirror, opts: ["Shape A", "Shape B", "Shape C", "Shape D"], ans: 0 },
    { id: 9, domain: 'Gv', diff: 1, weight: 1.0, type: 'text', q: "You face North. You turn 90° right, walk 10 paces, turn 180°, and walk 5 paces. Which direction are you facing?", opts: ["North", "East", "South", "West"], ans: 3 },
    { id: 4, domain: 'Gw', diff: 1, weight: 1.0, type: 'text', q: "Remember the sequence: 4 - 9 - 1 - 7. Reverse it and add 2 to the second number.", opts: ["7 - 3 - 9 - 4", "7 - 1 - 9 - 4", "7 - 5 - 9 - 4", "4 - 3 - 1 - 7"], ans: 0 },
    { id: 10, domain: 'Gw', diff: 1, weight: 1.0, type: 'text', q: "Which word comes second alphabetically: Apple, Zebra, Mango, Kilo?", opts: ["Apple", "Mango", "Kilo", "Zebra"], ans: 2 },
    { id: 5, domain: 'Gs', diff: 1, weight: 1.0, type: 'text', timed: true, q: "Speed Logic: Identify the word that does NOT belong as quickly as possible.", opts: ["Guitar", "Flute", "Piano", "Painting"], ans: 3 },
    { id: 6, domain: 'Gq', diff: 1, weight: 1.0, type: 'text', q: "What comes next in the sequence: 2, 5, 11, 23, __ ?", opts: ["45", "46", "47", "49"], ans: 2 },
    { id: 12, domain: 'Gq', diff: 1, weight: 1.0, type: 'text', q: "A train travels 60 miles in 45 minutes. What is its speed in mph?", opts: ["45 mph", "60 mph", "75 mph", "80 mph"], ans: 3 },
    { id: 15, domain: 'Gv', diff: 2, weight: 1.5, type: 'text', q: "Imagine a 3x3x3 wooden cube painted red on the outside. How many small cubes have exactly ONE red face?", opts: ["4", "6", "8", "9"], ans: 1 }
];

// ==========================================
// SCORING ENGINE
// ==========================================

const ARCHETYPES = {
    "Gf+Gv": { name: "The Architect", sig: "Structural Intuition" },
    "Gq+Gc": { name: "The Scholar", sig: "Precision Recall" },
    "Gs+Gw": { name: "The Operator", sig: "Cognitive Throughput" },
    "Gf+Gc": { name: "The Synthesiser", sig: "Pattern-to-Meaning" },
    "Gq+Gv": { name: "The Engineer", sig: "Structural Calculus" },
    "Gc+Gw": { name: "The Connector", sig: "Verbal Memory Engine" },
    "Gq+Gs": { name: "The Tactician", sig: "Speed-Accuracy Matrix" },
    "Generalist": { name: "The Generalist", sig: "Cognitive Versatility" }
};

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================

export default function IQTestPage() {
    const [view, setView] = useState<"welcome" | "test" | "results">("welcome");
    const [curIdx, setCurIdx] = useState(0);
    const [userAns, setUserAns] = useState<Record<number, number>>({});
    const [times, setTimes] = useState<Record<number, number>>({});
    const [startTime, setStartTime] = useState<number>(0);
    const [gsTimer, setGsTimer] = useState<number>(15);
    const [isGSActive, setIsGSActive] = useState(false);

    const question = QUESTIONS[curIdx];

    useEffect(() => {
        let timer: any;
        if (isGSActive && gsTimer > 0) {
            timer = setInterval(() => {
                setGsTimer(prev => prev - 0.1);
            }, 100);
        } else if (gsTimer <= 0) {
            handleNext();
        }
        return () => clearInterval(timer);
    }, [isGSActive, gsTimer]);

    const startAssessment = () => {
        setView("test");
        setStartTime(Date.now());
    };

    const handleSelect = (idx: number) => {
        setUserAns({ ...userAns, [question.id]: idx });
    };

    const handleNext = () => {
        const duration = (Date.now() - startTime) / 1000;
        setTimes({ ...times, [question.id]: duration });

        if (curIdx < QUESTIONS.length - 1) {
            setCurIdx(curIdx + 1);
            setStartTime(Date.now());
            setGsTimer(15);
            setIsGSActive(QUESTIONS[curIdx + 1].timed || false);
        } else {
            setView("results");
        }
    };

    const results = useMemo(() => {
        if (view !== "results") return null;

        let rawScores: Record<string, number> = { Gf: 0, Gc: 0, Gv: 0, Gw: 0, Gs: 0, Gq: 0 };
        let maxScores: Record<string, number> = { Gf: 0, Gc: 0, Gv: 0, Gw: 0, Gs: 0, Gq: 0 };

        QUESTIONS.forEach(q => {
            const isCorrect = userAns[q.id] === q.ans;
            const weighted = q.weight * 10;
            maxScores[q.domain] += weighted;
            if (isCorrect) {
                let pts = weighted;
                if (q.domain === 'Gs') {
                    const t = times[q.id] || 15;
                    if (t < 5) pts += 3;
                    else if (t > 10) pts -= 2;
                }
                rawScores[q.domain] += Math.max(0, pts);
            }
        });

        const domainScores: Record<string, number> = {};
        let totalPct = 0;
        Object.keys(rawScores).forEach(d => {
            domainScores[d] = (rawScores[d] / (maxScores[d] || 1)) * 100;
            totalPct += domainScores[d];
        });

        const avgPct = totalPct / 600;
        let iq = avgPct <= 0.50 ? 70 + (avgPct / 0.50) * 30 : 100 + ((avgPct - 0.50) / 0.50) * 45;
        iq = Math.min(145, Math.max(70, Math.round(iq)));

        const sorted = Object.entries(domainScores).sort((a,b) => b[1] - a[1]);
        const top2 = sorted.slice(0, 2).map(x => x[0]).sort().join("+");
        const diff = Math.max(...Object.values(domainScores)) - Math.min(...Object.values(domainScores));
        
        const archetype = diff < 18 ? ARCHETYPES.Generalist : (ARCHETYPES[top2 as keyof typeof ARCHETYPES] || ARCHETYPES["Gf+Gc"]);

        return { iq, domainScores, archetype };
    }, [view, userAns, times]);

    if (view === "welcome") {
        return (
            <div className="min-h-[100dvh] relative overflow-hidden bg-gradient-to-tr from-[#F1F5F0] via-white to-[#F7F6F0] text-black font-sans flex flex-col justify-center px-6 py-20">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2"></div>
                
                <div className="max-w-5xl mx-auto w-full relative z-10">
                    <div className="mb-4">
                        <span className="text-[10px] tracking-[0.2em] font-medium uppercase border-l-2 border-accent pl-3 text-accent py-1">SIGNET ASSESSMENT</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl tracking-tight leading-none mb-8 font-syne font-black text-transparent bg-clip-text bg-gradient-to-r from-black to-accent/80">
                        Cognitive <br />
                        Evaluation
                    </h1>
                    <p className="text-lg md:text-2xl text-black/60 max-w-2xl mb-16 leading-relaxed font-outfit font-light">
                        A rigorous yet engaging examination of primary cognitive factors. Discover your archetype through dynamic intelligence profiling.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] rounded-3xl p-8 border border-black/5">
                         {[
                             { label: "DURATION", val: "15 MIN" },
                             { label: "FORMAT", val: "ADAPTIVE" },
                             { label: "DOMAINS", val: "SIX FACTORS" },
                             { label: "THEORY", val: "C-H-C" }
                         ].map(it => (
                             <div key={it.label} className="flex flex-col border-l border-black/5 pl-4">
                                 <span className="text-[10px] tracking-[0.15em] font-medium text-accent mb-2">{it.label}</span>
                                 <span className="text-xl tracking-tight font-bold">{it.val}</span>
                             </div>
                         ))}
                    </div>
                    <button 
                        onClick={startAssessment}
                        className="group flex items-center justify-center gap-4 bg-accent text-white px-8 py-4 rounded-full font-bold text-lg tracking-tight transition-all hover:bg-accent/90 shadow-[0_8px_30px_rgba(16,129,114,0.3)] hover:scale-105"
                    >
                        Begin Process <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>
        );
    }

    if (view === "results" && results) {
        return (
            <div className="min-h-[100dvh] relative overflow-hidden bg-gradient-to-b from-[#F1F5F0] to-white text-black font-sans px-6 py-20">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="max-w-5xl mx-auto w-full">
                    <header className="mb-24 flex flex-col md:flex-row justify-between items-baseline border-b border-black/10 pb-8">
                        <h2 className="text-4xl md:text-5xl tracking-tight font-syne font-black text-transparent bg-clip-text bg-gradient-to-r from-black to-accent">Evaluation Complete</h2>
                        <p className="text-[10px] tracking-[0.2em] text-accent uppercase mt-4 md:mt-0 font-bold bg-accent/10 px-4 py-2 rounded-full">Data Sync Verified</p>
                    </header>

                    <div className="grid lg:grid-cols-12 gap-12 mb-24">
                        <div className="lg:col-span-4 flex flex-col justify-between bg-white shadow-xl shadow-black/5 rounded-3xl p-10 border border-black/5 relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl"></div>
                            <div className="relative z-10">
                                <div className="text-[10px] tracking-[0.15em] font-bold text-accent mb-4">INTELLIGENCE QUOTIENT</div>
                                <div className="text-[7rem] md:text-[9rem] leading-none tracking-tighter mb-4 font-syne font-black text-black">{results.iq}</div>
                                <div className="text-sm tracking-widest uppercase mb-12 font-bold text-black/60 border-l-2 border-accent pl-3">Percentile: Top {Math.round((1 - results.iq/200) * 100)}%</div>
                            </div>
                            <p className="text-[10px] text-black/40 max-w-xs leading-relaxed uppercase tracking-wider relative z-10 font-bold">
                                This metric represents a personal baseline estimation, not a formal diagnostic credential.
                            </p>
                        </div>

                        <div className="lg:col-span-8 flex flex-col justify-center bg-white shadow-xl shadow-black/5 rounded-3xl p-10 border border-black/5">
                            <div className="text-[10px] tracking-[0.15em] font-bold text-accent mb-4">PRIMARY ARCHETYPE</div>
                            <h3 className="text-4xl md:text-6xl tracking-tight mb-4 font-syne font-black">{results.archetype.name}</h3>
                            <p className="text-xl md:text-2xl text-black/60 mb-12 font-outfit">{results.archetype.sig}</p>
                            
                            <div className="grid grid-cols-2 gap-x-12 gap-y-8 border-t border-black/5 pt-8 mt-auto">
                                {Object.entries(results.domainScores).map(([key, score]) => (
                                    <div key={key} className="flex flex-col">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[10px] tracking-[0.15em] font-bold uppercase text-black/70">{G_TYPES[key as Domain].name}</span>
                                            <span className="text-sm font-black text-accent">{Math.round(score)}</span>
                                        </div>
                                        <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden relative">
                                            <motion.div 
                                                className="absolute top-0 left-0 bg-accent h-full rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${score}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center pt-12">
                        <button 
                             onClick={() => window.location.reload()} 
                             className="group flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full text-xs tracking-[0.2em] font-bold uppercase transition-all hover:bg-black/80 hover:scale-105 shadow-xl"
                        >
                             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Re-evaluate
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] relative overflow-hidden bg-gradient-to-b from-[#F1F5F0] to-white text-black font-sans flex flex-col px-6">
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="max-w-4xl mx-auto w-full flex flex-col flex-1 relative z-10">
                <header className="py-8 flex items-center justify-between border-b border-black/10">
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold uppercase tracking-[0.15em] bg-accent/10 text-accent px-3 py-1 rounded-full">{G_TYPES[question.domain].name}</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <span className="text-[10px] font-bold tracking-wide text-black/50 bg-black/5 px-4 py-1.5 rounded-full">{curIdx + 1} / {QUESTIONS.length}</span>
                        {question.timed && (
                            <span className="text-xs font-black tracking-widest uppercase text-red-600 bg-red-50 px-3 py-1 rounded-full shadow-sm animate-pulse">{Math.ceil(gsTimer)}S</span>
                        )}
                    </div>
                </header>

                <main className="flex-1 flex flex-col justify-center py-12">
                     <AnimatePresence mode="wait">
                        <motion.div 
                            key={curIdx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full"
                        >
                            <h2 className="text-3xl md:text-4xl tracking-tight leading-relaxed mb-16 font-outfit font-medium text-center">{question.q}</h2>

                            {question.type === 'visual' && question.func && (
                                <div className="mb-16 flex justify-center bg-white shadow-xl shadow-black/5 p-8 rounded-3xl border border-black/5">
                                    {question.func({})}
                                </div>
                            )}

                            <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
                                {question.opts.map((opt, i) => (
                                    <button 
                                        key={i}
                                        onClick={() => handleSelect(i)}
                                        className={`py-5 px-6 rounded-2xl text-left text-lg font-medium tracking-tight transition-all duration-200 flex items-center justify-between group border ${
                                            userAns[question.id] === i 
                                                ? 'bg-accent border-accent text-white shadow-lg shadow-accent/20 scale-105' 
                                                : 'bg-white border-black/5 text-black hover:border-accent hover:bg-accent/5 hover:text-accent shadow-sm'
                                        }`}
                                    >
                                        <span>{opt}</span>
                                        <span className={`text-[10px] font-bold tracking-widest uppercase ${userAns[question.id] === i ? 'opacity-100' : 'opacity-0'} transition-opacity`}>SELECTED</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                     </AnimatePresence>
                </main>

                <footer className="py-8 border-t border-black/10 flex items-center justify-between mt-auto">
                    <button 
                        onClick={() => setCurIdx(Math.max(0, curIdx - 1))}
                        disabled={curIdx === 0}
                        className="text-[10px] tracking-[0.2em] font-bold uppercase text-black/50 hover:text-black disabled:opacity-0 transition-opacity flex items-center gap-2"
                    >
                        <ArrowLeft className="w-3 h-3" /> Back
                    </button>
                    <button 
                        onClick={handleNext}
                        disabled={userAns[question.id] === undefined}
                        className="group bg-black text-white px-8 py-3 rounded-full text-sm tracking-tight font-bold flex items-center gap-3 disabled:opacity-30 disabled:bg-black/10 disabled:text-black transition-all hover:bg-black/80 hover:scale-105 shadow-xl disabled:shadow-none"
                    >
                        {curIdx === QUESTIONS.length - 1 ? "FINISH" : "NEXT"} <ArrowRight className="w-4 h-4 group-enabled:group-hover:translate-x-1 transition-transform" />
                    </button>
                </footer>
            </div>
        </div>
    );
}
