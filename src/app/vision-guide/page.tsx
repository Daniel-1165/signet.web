"use client";

import VisionGuideContent from "@/components/sections/VisionGuideContent";
import { BookOpen, Lightbulb, Heart, CheckCircle2, Target, Compass, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sectionIcons = {
  foundation: <BookOpen className="w-8 h-8" />,
  framework: <Lightbulb className="w-8 h-8" />,
  biblical: <Heart className="w-8 h-8" />,
  exercise: <CheckCircle2 className="w-8 h-8" />,
  reflection: <Target className="w-8 h-8" />,
  purpose: <Compass className="w-8 h-8" />,
};

export default function VisionGuidePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#F7F8F5] to-white">
      <main className="pt-10 pb-24 px-8 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center space-y-12 mb-32">
          <div className="flex justify-center gap-1.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-accent shadow-sm" />
            <span className="w-2 h-2 rounded-full bg-foreground opacity-40" />
            <span className="w-2 h-2 rounded-full bg-foreground opacity-30" />
          </div>

          <div className="space-y-6">
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter text-foreground leading-tight">
              Craft Your <span className="text-accent">Personal Vision</span>
            </h1>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              A guided journey through academic frameworks, biblical principles, and intentional introspection to create a vision statement that aligns your purpose with eternal truth.
            </p>
          </div>

          <div className="h-1 w-24 bg-gradient-to-r from-accent to-accent/20 mx-auto rounded-full" />
        </div>

        {/* Guide Gallery / Carousel */}
        <div className="relative min-h-[600px] p-0 md:p-0 overflow-visible">
          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-12">
             {[0,1,2,3,4,5,6].map((i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentSlide(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-8 bg-accent' : 'w-2 bg-black/10 hover:bg-black/20'}`}
                />
             ))}
          </div>

          <AnimatePresence mode="wait">
             <motion.div
               key={currentSlide}
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -50 }}
               transition={{ duration: 0.3 }}
             >
                {currentSlide === 0 && (
                  <VisionGuideContent
                    title="The Foundation of Vision"
                    sectionType="foundation"
                    icon={sectionIcons.foundation}
                    index={0}
                    description={[{ _type: 'block', children: [{ _type: 'span', text: "A personal vision statement is more than a goal-setting exercise—it's a declaration of your divine purpose and the unique contribution you're called to make in this world." }]}]}
                    keyPoints={['Vision statements articulate your "why"', 'Serve as a compass during uncertainty', 'Align personal goals with eternal values']}
                    academicResources={[]}
                  />
                )}

                {currentSlide === 1 && (
                  <VisionGuideContent
                    title="Biblical Framework for Vision"
                    sectionType="biblical"
                    icon={sectionIcons.biblical}
                    index={1}
                    description={[{ _type: 'block', children: [{ _type: 'span', text: "The Bible provides the ultimate framework for personal vision. God's vision for humanity is revealed through Scripture, and He invites us to participate in His grand narrative." }]}]}
                    keyPoints={['God has a specific purpose for each person', 'Vision should glorify God and serve others']}
                    biblicalReferences={[
                      { verse: 'Jeremiah 29:11', text: '"For I know the plans I have for you," declares the Lord...', interpretation: 'Your vision should be rooted in God\'s good plans.' }
                    ]}
                  />
                )}

                {currentSlide === 2 && (
                  <VisionGuideContent
                    title="Academic Vision Frameworks"
                    sectionType="framework"
                    icon={sectionIcons.framework}
                    index={2}
                    description={[{ _type: 'block', children: [{ _type: 'span', text: "Modern research provides evidence-based frameworks for crafting effective vision statements. The most successful visions combine personal values, strengths, and aspirations with measurable outcomes and accountability structures." }]}]}
                    keyPoints={['SMART goals framework', 'BHAG (Big Hairy Audacious Goals)', 'Personal SWOT analysis']}
                    academicResources={[]}
                  />
                )}

                {currentSlide === 3 && (
                  <VisionGuideContent
                    title="Core Values Assessment"
                    sectionType="exercise"
                    icon={sectionIcons.exercise}
                    index={3}
                    description={[{ _type: 'block', children: [{ _type: 'span', text: "Your core values are the non-negotiable principles that guide your decisions and define your character." }]}]}
                    keyPoints={['Values provide decision-making filters', 'They create consistency between beliefs and actions']}
                    reflectionPrompts={[
                      { question: 'What are your top 5 core values?', guidance: 'Consider moments when you felt most alive.', journalPlaceholder: 'List 5 values...' }
                    ]}
                  />
                )}

                {currentSlide === 4 && (
                  <VisionGuideContent
                    title="Strengths & Gifts Inventory"
                    sectionType="reflection"
                    icon={sectionIcons.reflection}
                    index={4}
                    description={[{ _type: 'block', children: [{ _type: 'span', text: "Gallup research shows that individuals who focus on their strengths are 3 times more likely to report having an excellent quality of life." }]}]}
                    keyPoints={['Strengths are natural talents that energize you', 'Spiritual gifts are supernatural abilities']}
                    reflectionPrompts={[
                      { question: 'What activities make you lose track of time?', guidance: 'Think about work or hobbies where you excel naturally.', journalPlaceholder: 'List activities...' }
                    ]}
                  />
                )}

                {currentSlide === 5 && (
                  <VisionGuideContent
                    title="Life Purpose Integration"
                    sectionType="purpose"
                    icon={sectionIcons.purpose}
                    index={5}
                    description={[{ _type: 'block', children: [{ _type: 'span', text: "Your life purpose integrates your calling, strengths, values, and vision into a cohesive whole." }]}]}
                    keyPoints={['Purpose answers "Why do I exist?"', 'It connects daily actions to eternal significance']}
                    reflectionPrompts={[
                      { question: 'If you could only accomplish one thing in life, what would it be?', guidance: 'This reveals your deepest calling.', journalPlaceholder: 'Describe the one accomplishment...' }
                    ]}
                  />
                )}

                {currentSlide === 6 && (
                  <div className="flex flex-col text-center space-y-8 items-center py-12">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center text-accent mb-4">
                      {sectionIcons.exercise}
                    </div>
                    <h2 className="text-4xl font-black text-foreground">Crafting Your Vision Statement</h2>
                    <p className="text-lg text-foreground/70 max-w-xl text-center leading-relaxed">
                      A powerful vision statement combines inspiration with specificity. Combine your values, strengths, and purpose into a compelling declaration:
                    </p>
                    <div className="w-full max-w-2xl bg-black/5 p-8 rounded-2xl border border-black/10 mt-8">
                      <p className="text-xl font-medium italic text-black/60">"I will [action] so that [impact] because [why/purpose]..."</p>
                    </div>

                    {/* Final CTA */}
                    <div className="mt-16 w-full rounded-3xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 p-12 text-center space-y-6">
                      <h3 className="text-3xl font-black text-foreground">
                        Your Vision Journey Begins Now
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                        <button className="px-8 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all shadow-[0_8px_30px_rgba(16,129,114,0.3)]">
                          Print This Guide
                        </button>
                        <button onClick={() => setCurrentSlide(0)} className="px-8 py-3 border-2 border-accent text-accent font-bold rounded-xl hover:bg-accent hover:text-white transition-all">
                          Restart Journey
                        </button>
                      </div>
                    </div>
                  </div>
                )}
             </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-black/5">
             <button 
                onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                disabled={currentSlide === 0}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-foreground bg-black/5 hover:bg-black/10 disabled:opacity-30 transition-all"
             >
                <ArrowLeft className="w-5 h-5" /> Previous
             </button>
             <span className="text-sm font-medium text-black/40">{currentSlide + 1} / 7</span>
             <button 
                onClick={() => setCurrentSlide(prev => Math.min(6, prev + 1))}
                disabled={currentSlide === 6}
                className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white bg-accent hover:bg-accent/90 disabled:opacity-30 disabled:bg-black/10 disabled:text-black transition-all shadow-md"
             >
                Next Step <ArrowRight className="w-5 h-5" />
             </button>
          </div>
        </div>
      </main>
    </div>
  );
}