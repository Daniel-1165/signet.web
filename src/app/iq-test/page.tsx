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

// QUESTIONS DATA
const QUESTIONS: Question[] = [
    { id: 1, domain: 'Gf', diff: 1, weight: 1.0, type: 'visual', q: "Identify the missing element in the 3×3 logic grid.", func: d3x3Matrix, opts: ["Circle", "Square", "Triangle", "Star"], ans: 1 },
    { id: 7, domain: 'Gf', diff: 1, weight: 1.0, type: 'visual', q: "Which shape logically follows the sequence? (Alternating Fill Rule)", func: dShapeSeq, opts: ["Small Solid", "Large Hollow", "Medium Solid", "Large Solid"], ans: 1 },
    { id: 13, domain: 'Gf', diff: 2, weight: 1.5, type: 'visual', q: "Identify the pattern completion for this spatial matrix.", func: d3x3Matrix, opts: ["Double Circle", "Rotating Square", "X-Cross", "Dot Grid"], ans: 2 },
    { id: 2, domain: 'Gc', diff: 1, weight: 1.0, type: 'text', q: "EPHEMERAL is to PERMANENT as NOVICE is to:", opts: ["Beginner", "Expert", "Transient", "Legacy"], ans: 1 },
    { id: 8, domain: 'Gc', diff: 1, weight: 1.0, type: 'text', q: "Which word is most nearly the opposite of GARRULOUS?", opts: ["Chatty", "Loud", "Taciturn", "Erudite"], ans: 2 },
    { id: 14, domain: 'Gc', diff: 2, weight: 1.5, type: 'text', q: "ARCHIPELAGO is to ISLAND as GALAXY is to:", opts: ["Nebula", "Star", "Orbit", "Universe"], ans: 1 },
    { id: 3, domain: 'Gv', diff: 1, weight: 1.0, type: 'visual', q: "Select the correct horizontal mirror reflection of the L-shape.", func: dMirror, opts: ["Shape A", "Shape B", "Shape C", "Shape D"], ans: 0 },
    { id: 9, domain: 'Gv', diff: 1, weight: 1.0, type: 'visual', q: "How many total squares of all sizes exist in this 3×3 grid?", func: dCountSquares, opts: ["9", "10", "14", "16"], ans: 2 },
    { id: 4, domain: 'Gw', diff: 1, weight: 1.0, type: 'text', q: "Remember the sequence: 4 - 9 - 1 - 7. Reverse it and add 2 to the second number.", opts: ["7 - 3 - 9 - 4", "7 - 1 - 9 - 4", "7 - 5 - 9 - 4", "4 - 3 - 1 - 7"], ans: 0 },
    { id: 10, domain: 'Gw', diff: 1, weight: 1.0, type: 'text', q: "Which word comes second alphabetically: Apple, Zebra, Mango, Kilo?", opts: ["Apple", "Mango", "Kilo", "Zebra"], ans: 2 },
    { id: 5, domain: 'Gs', diff: 1, weight: 1.0, type: 'visual', timed: true, q: "Identify the most frequent symbol in the field.", func: dSymbolFreq, opts: ["+", "○", "△", "□"], ans: 0 },
    { id: 6, domain: 'Gq', diff: 1, weight: 1.0, type: 'visual', q: "Identify the missing number in this matrix sequence.", func: dNumMatrix, opts: ["12", "14", "15", "18"], ans: 2 },
    { id: 12, domain: 'Gq', diff: 1, weight: 1.0, type: 'text', q: "A train travels 60 miles in 45 minutes. What is its speed in mph?", opts: ["45 mph", "60 mph", "75 mph", "80 mph"], ans: 3 },
    { id: 15, domain: 'Gv', diff: 2, weight: 1.5, type: 'visual', q: "Match the rotation: 90 degrees clockwise.", func: dMirror, opts: ["Opt A", "Opt B", "Opt C", "Opt D"], ans: 1 }
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
            <div className="min-h-screen bg-white text-black font-sans flex flex-col justify-center px-6 py-20 mx-auto max-w-5xl">
                <div className="mb-4">
                    <span className="text-[10px] tracking-[0.2em] font-medium uppercase border border-black px-3 py-1">SIGNET ASSESSMENT</span>
                </div>
                <h1 className="text-5xl md:text-8xl tracking-tight leading-none mb-8 font-syne font-bold">
                    Cognitive <br />
                    Evaluation
                </h1>
                <p className="text-lg md:text-2xl text-black/60 max-w-2xl mb-16 leading-relaxed font-outfit font-light">
                    A rigorous examination of primary cognitive factors. Minimalist by design. Melbourne-inspired typographical approach.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 mb-20 border-t border-black pt-12">
                     {[
                         { label: "DURATION", val: "15 MIN" },
                         { label: "FORMAT", val: "ADAPTIVE" },
                         { label: "DOMAINS", val: "SIX FACTORS" },
                         { label: "THEORY", val: "C-H-C" }
                     ].map(it => (
                         <div key={it.label} className="flex flex-col">
                             <span className="text-[10px] tracking-[0.15em] font-medium text-black/50 mb-2">{it.label}</span>
                             <span className="text-xl tracking-tight font-medium">{it.val}</span>
                         </div>
                     ))}
                </div>
                <button 
                    onClick={startAssessment}
                    className="self-start group flex items-center gap-4 border-b-2 border-black pb-2 text-xl tracking-tight transition-all hover:opacity-60"
                >
                    Begin Process <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
            </div>
        );
    }

    if (view === "results" && results) {
        return (
            <div className="min-h-screen bg-white text-black font-sans px-6 py-20 mx-auto max-w-5xl">
                <header className="mb-24 flex flex-col md:flex-row justify-between items-baseline border-b border-black pb-8">
                    <h2 className="text-3xl md:text-5xl tracking-tight font-syne font-bold">Evaluation Complete</h2>
                    <p className="text-[10px] tracking-[0.2em] uppercase mt-4 md:mt-0 font-medium">Data Sync Verified</p>
                </header>

                <div className="grid lg:grid-cols-12 gap-16 mb-24">
                    <div className="lg:col-span-4 flex flex-col justify-between">
                        <div>
                            <div className="text-[10px] tracking-[0.15em] font-medium text-black/50 mb-2">INTELLIGENCE QUOTIENT</div>
                            <div className="text-[8rem] md:text-[10rem] leading-none tracking-tighter mb-4 font-syne">{results.iq}</div>
                            <div className="text-sm tracking-widest uppercase mb-12">Percentile: Top {Math.round((1 - results.iq/200) * 100)}%</div>
                        </div>
                        <p className="text-[10px] text-black/50 max-w-xs leading-relaxed uppercase tracking-wider">
                            This metric represents a personal baseline estimation, not a formal diagnostic credential.
                        </p>
                    </div>

                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <div className="text-[10px] tracking-[0.15em] font-medium text-black/50 mb-2">PRIMARY ARCHETYPE</div>
                        <h3 className="text-4xl md:text-6xl tracking-tight mb-4 font-syne font-bold">{results.archetype.name}</h3>
                        <p className="text-xl md:text-2xl text-black/50 mb-12 font-outfit font-light">{results.archetype.sig}</p>
                        
                        <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-8 mt-auto">
                            {Object.entries(results.domainScores).map(([key, score]) => (
                                <div key={key} className="flex flex-col">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] tracking-[0.15em] font-medium uppercase text-black/70">{G_TYPES[key as Domain].name}</span>
                                        <span className="text-[10px] font-medium">{Math.round(score)}</span>
                                    </div>
                                    <div className="w-full h-[1px] bg-black/10 relative">
                                        <motion.div 
                                            className="absolute top-0 left-0 border-b border-black h-[1px]"
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

                <div className="flex justify-center pt-12 border-t border-black/10">
                    <button 
                         onClick={() => window.location.reload()} 
                         className="group flex items-center gap-4 text-xs tracking-[0.2em] font-medium uppercase transition-all hover:opacity-60"
                    >
                         <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" /> Re-evaluate
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-black font-sans flex flex-col max-w-4xl mx-auto px-6">
            <header className="py-8 flex items-center justify-between border-b border-black/10">
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-medium uppercase tracking-[0.15em]">{G_TYPES[question.domain].name}</span>
                </div>
                <div className="flex items-center gap-8">
                    <span className="text-[10px] font-medium tracking-wide text-black/50">{curIdx + 1} / {QUESTIONS.length}</span>
                    {question.timed && (
                        <span className="text-[10px] font-medium tracking-widest uppercase text-red-600">{Math.ceil(gsTimer)}S</span>
                    )}
                </div>
            </header>

            <main className="flex-1 flex flex-col justify-center py-12">
                 <AnimatePresence mode="wait">
                    <motion.div 
                        key={curIdx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 flex flex-col justify-center max-w-2xl"
                    >
                        <h2 className="text-2xl md:text-3xl tracking-tight leading-relaxed mb-16 font-outfit font-light">{question.q}</h2>

                        {question.type === 'visual' && question.func && (
                            <div className="mb-16 flex justify-start">
                                {question.func({})}
                            </div>
                        )}

                        <div className="flex flex-col gap-1 w-full max-w-md">
                            {question.opts.map((opt, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handleSelect(i)}
                                    className={`py-4 border-b text-left text-lg tracking-tight transition-all duration-200 flex items-center justify-between group ${
                                        userAns[question.id] === i 
                                            ? 'border-black text-black' 
                                            : 'border-black/10 text-black/60 hover:text-black hover:border-black/40'
                                    }`}
                                >
                                    <span>{opt}</span>
                                    <span className={`text-[10px] font-medium ${userAns[question.id] === i ? 'opacity-100' : 'opacity-0'} transition-opacity`}>SELECTED</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                 </AnimatePresence>
            </main>

            <footer className="py-8 border-t border-black/10 flex items-center justify-between">
                <button 
                    onClick={() => setCurIdx(Math.max(0, curIdx - 1))}
                    disabled={curIdx === 0}
                    className="text-[10px] tracking-[0.2em] font-medium uppercase hover:opacity-60 disabled:opacity-0 transition-opacity flex items-center gap-2"
                >
                    <ArrowLeft className="w-3 h-3" /> Back
                </button>
                <button 
                    onClick={handleNext}
                    disabled={userAns[question.id] === undefined}
                    className="group text-sm tracking-tight font-medium flex items-center gap-3 disabled:opacity-30 transition-all hover:opacity-60"
                >
                    {curIdx === QUESTIONS.length - 1 ? "FINISH" : "NEXT"} <ArrowRight className="w-4 h-4 group-enabled:group-hover:translate-x-1 transition-transform" />
                </button>
            </footer>
        </div>
    );
}
