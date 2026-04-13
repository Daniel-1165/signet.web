import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import VisionGuideContent from "@/components/sections/VisionGuideContent";
import { BookOpen, Lightbulb, Heart, CheckCircle2, Target, Compass } from "lucide-react";

const sectionIcons = {
  foundation: <BookOpen className="w-8 h-8" />,
  framework: <Lightbulb className="w-8 h-8" />,
  biblical: <Heart className="w-8 h-8" />,
  exercise: <CheckCircle2 className="w-8 h-8" />,
  reflection: <Target className="w-8 h-8" />,
  purpose: <Compass className="w-8 h-8" />,
};

export default function VisionGuidePage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#F7F8F5] to-white">
      <Navbar />

      <main className="pt-40 pb-24 px-8 max-w-6xl mx-auto">
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

        {/* Guide Sections */}
        <div className="space-y-16">
          <VisionGuideContent
            title="The Foundation of Vision"
            sectionType="foundation"
            icon={sectionIcons.foundation}
            index={0}
            description={[
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: 'A personal vision statement is more than a goal-setting exercise—it\'s a declaration of your divine purpose and the unique contribution you\'re called to make in this world. Research from Harvard Business School shows that individuals with clear personal visions are 3.6 times more likely to achieve their goals and experience greater life satisfaction.'
                  }
                ]
              }
            ]}
            keyPoints={[
              'Vision statements articulate your "why" - the deeper purpose behind your actions',
              'They serve as a compass during times of uncertainty and decision-making',
              'Well-crafted visions align personal goals with eternal values',
              'They provide motivation and direction for daily choices'
            ]}
            academicResources={[
              {
                title: 'The Power of Purpose',
                author: 'Dr. Richard Leider',
                source: 'Harvard Business Review',
                relevance: 'Research shows purpose-driven individuals are more resilient and achieve higher performance across all life domains.'
              },
              {
                title: 'Vision and Leadership',
                author: 'Warren Bennis & Burt Nanus',
                source: 'Leaders: The Strategies for Taking Charge',
                relevance: 'Pioneering research on how vision statements transform leadership effectiveness and organizational outcomes.'
              }
            ]}
          />

          <VisionGuideContent
            title="Biblical Framework for Vision"
            sectionType="biblical"
            icon={sectionIcons.biblical}
            index={1}
            description={[
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: 'The Bible provides the ultimate framework for personal vision. God\'s vision for humanity is revealed through Scripture, and He invites us to participate in His grand narrative. Your personal vision should align with His eternal purposes while reflecting your unique calling.'
                  }
                ]
              }
            ]}
            keyPoints={[
              'God has a specific purpose for each person (Jeremiah 29:11)',
              'Vision should glorify God and serve others (Matthew 5:16)',
              'True vision requires faith and obedience (Hebrews 11:1)',
              'Personal calling integrates with God\'s kingdom purposes'
            ]}
            biblicalReferences={[
              {
                verse: 'Jeremiah 29:11',
                text: '"For I know the plans I have for you," declares the Lord, "plans to prosper you and not to harm you, plans to give you hope and a future."',
                interpretation: 'Your vision should be rooted in God\'s good plans for your life, not just personal ambition.'
              },
              {
                verse: 'Proverbs 29:18',
                text: 'Where there is no vision, the people perish.',
                interpretation: 'A clear, God-directed vision is essential for personal and communal flourishing.'
              },
              {
                verse: 'Habakkuk 2:2-3',
                text: 'Write down the revelation and make it plain on tablets so that a herald may run with it. For the revelation awaits an appointed time.',
                interpretation: 'Vision should be written down clearly and pursued with patient faith.'
              }
            ]}
          />

          <VisionGuideContent
            title="Academic Vision Frameworks"
            sectionType="framework"
            icon={sectionIcons.framework}
            index={2}
            description={[
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: 'Modern research provides evidence-based frameworks for crafting effective vision statements. The most successful visions combine personal values, strengths, and aspirations with measurable outcomes and accountability structures.'
                  }
                ]
              }
            ]}
            keyPoints={[
              'SMART goals framework: Specific, Measurable, Achievable, Relevant, Time-bound',
              'BHAG (Big Hairy Audacious Goals) for inspiring long-term vision',
              'Personal SWOT analysis for self-awareness',
              'Stakeholder mapping for impact assessment'
            ]}
            academicResources={[
              {
                title: 'Building a Personal Leadership Brand',
                author: 'Dr. Susan Komives',
                source: 'Journal of Leadership Education',
                relevance: 'Research on how personal vision statements enhance leadership development and career progression.'
              },
              {
                title: 'The Psychology of Goals',
                author: 'Dr. Edwin Locke & Dr. Gary Latham',
                source: 'American Psychologist',
                relevance: 'Groundbreaking research on goal-setting theory that revolutionized personal development approaches.'
              },
              {
                title: 'Visionary Leadership',
                author: 'Dr. Burt Nanus',
                source: 'Visionary Leadership',
                relevance: 'Comprehensive framework for creating and implementing personal and organizational visions.'
              }
            ]}
          />

          <VisionGuideContent
            title="Core Values Assessment"
            sectionType="exercise"
            icon={sectionIcons.exercise}
            index={3}
            description={[
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: 'Your core values are the non-negotiable principles that guide your decisions and define your character. Research from the Barrett Values Centre shows that organizations and individuals with clearly defined values achieve 2.5 times higher performance.'
                  }
                ]
              }
            ]}
            keyPoints={[
              'Values provide decision-making filters during uncertainty',
              'They create consistency between beliefs and actions',
              'Strong values attract like-minded people and opportunities',
              'Values serve as guardrails for ethical decision-making'
            ]}
            reflectionPrompts={[
              {
                question: 'What are your top 5 core values?',
                guidance: 'Consider moments when you felt most alive, most proud, or most at peace. What principles were you honoring?',
                journalPlaceholder: 'List 5 values that define who you are at your core...'
              },
              {
                question: 'How do these values align with biblical principles?',
                guidance: 'Compare your values with Scripture. Are they consistent with God\'s character and commands?',
                journalPlaceholder: 'Which biblical principles resonate most with your personal values...'
              }
            ]}
          />

          <VisionGuideContent
            title="Strengths & Gifts Inventory"
            sectionType="reflection"
            icon={sectionIcons.reflection}
            index={4}
            description={[
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: 'Gallup research shows that individuals who focus on their strengths are 3 times more likely to report having an excellent quality of life. Your vision should leverage your God-given strengths and spiritual gifts.'
                  }
                ]
              }
            ]}
            keyPoints={[
              'Strengths are natural talents that energize you',
              'Spiritual gifts are supernatural abilities for kingdom work',
              'Combining strengths with calling creates sustainable impact',
              'Weaknesses should be managed, not eliminated'
            ]}
            reflectionPrompts={[
              {
                question: 'What activities make you lose track of time?',
                guidance: 'Think about work, hobbies, or volunteer activities where you excel naturally.',
                journalPlaceholder: 'List activities where you feel naturally gifted and energized...'
              },
              {
                question: 'How have others affirmed your strengths?',
                guidance: 'Recall compliments, feedback, or recognitions you\'ve received.',
                journalPlaceholder: 'Write down specific feedback you\'ve received about your strengths...'
              }
            ]}
          />

          <VisionGuideContent
            title="Life Purpose Integration"
            sectionType="purpose"
            icon={sectionIcons.purpose}
            index={5}
            description={[
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: 'Your life purpose integrates your calling, strengths, values, and vision into a cohesive whole. Research from Stanford University shows that purpose-driven individuals live longer and experience greater well-being.'
                  }
                ]
              }
            ]}
            keyPoints={[
              'Purpose answers "Why do I exist?" beyond survival',
              'It connects daily actions to eternal significance',
              'Purpose provides resilience during challenges',
              'It creates meaning in both success and failure'
            ]}
            reflectionPrompts={[
              {
                question: 'If you could only accomplish one thing in life, what would it be?',
                guidance: 'This reveals your deepest calling and most important contribution.',
                journalPlaceholder: 'Describe the one accomplishment that would make your life meaningful...'
              },
              {
                question: 'How does your vision serve others and glorify God?',
                guidance: 'Ensure your vision has eternal impact beyond personal success.',
                journalPlaceholder: 'Explain how your vision benefits others and honors God...'
              }
            ]}
          />

          <VisionGuideContent
            title="Crafting Your Vision Statement"
            sectionType="exercise"
            icon={sectionIcons.exercise}
            index={6}
            description={[
              {
                _type: 'block',
                children: [
                  {
                    _type: 'span',
                    text: 'A powerful vision statement combines inspiration with specificity. It should be memorable, aspirational, and aligned with your values and calling. Research shows that written goals are 42% more likely to be achieved.'
                  }
                ]
              }
            ]}
            keyPoints={[
              'Vision statements should be 1-2 sentences long',
              'They combine your "why" with your "what"',
              'Include measurable impact and eternal significance',
              'Make them inspiring yet achievable'
            ]}
            reflectionPrompts={[
              {
                question: 'Draft your vision statement',
                guidance: 'Combine your values, strengths, and purpose into a compelling declaration.',
                journalPlaceholder: 'I will [action] so that [impact] because [why/purpose]...'
              },
              {
                question: 'Test your vision against reality',
                guidance: 'Does this vision excite you? Is it aligned with your values? Can you see yourself pursuing it?',
                journalPlaceholder: 'How does this vision make you feel? What concerns do you have about it?'
              }
            ]}
          />
        </div>

        {/* Final CTA */}
        <div className="mt-32 rounded-3xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 p-12 text-center space-y-6">
          <h3 className="text-4xl font-black text-foreground">
            Your Vision Journey Begins Now
          </h3>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            You've explored the foundations, reflected on your values, and crafted your vision. Now it's time to live it out with courage and faith.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-accent text-white font-bold rounded-xl hover:bg-accent/90 transition-all">
              Print This Guide
            </button>
            <button className="px-8 py-3 border-2 border-accent text-accent font-bold rounded-xl hover:bg-accent hover:text-white transition-all">
              Share Your Vision
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}