'use client'

import { PortableText } from 'next-sanity'
import { ReactNode, useState } from 'react'

interface BiblicalReference {
  verse: string
  text: string
  interpretation: string
}

interface AcademicResource {
  title: string
  author: string
  source: string
  relevance: string
}

interface ReflectionPrompt {
  question: string
  guidance: string
  journalPlaceholder: string
}

interface Props {
  title: string
  sectionType: string
  icon: ReactNode
  index: number
  description: any[]
  keyPoints?: string[]
  biblicalReferences?: BiblicalReference[]
  academicResources?: AcademicResource[]
  reflectionPrompts?: ReflectionPrompt[]
}

export default function VisionGuideContent({
  title,
  sectionType,
  icon,
  index,
  description,
  keyPoints,
  biblicalReferences,
  academicResources,
  reflectionPrompts
}: Props) {
  const [expandedPrompts, setExpandedPrompts] = useState<Set<number>>(new Set())
  const [journalEntries, setJournalEntries] = useState<Record<number, string>>({})

  const togglePrompt = (index: number) => {
    const newExpanded = new Set(expandedPrompts)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedPrompts(newExpanded)
  }

  const updateJournalEntry = (promptIndex: number, value: string) => {
    setJournalEntries(prev => ({
      ...prev,
      [promptIndex]: value
    }))
  }

  return (
    <div className="py-8 space-y-12 transition-all">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-2xl bg-white border-2 border-accent/10`}>
          <div className="text-accent">{icon}</div>
        </div>
        <div>
          <h2 className="text-4xl font-black text-accent uppercase tracking-tight">
            {title}
          </h2>
          <p className="text-sm font-bold text-foreground/50 uppercase tracking-widest mt-1">
            {sectionType === 'biblical'
              ? 'Spiritual Foundation'
              : sectionType === 'framework'
              ? 'Evidence-Based Framework'
              : sectionType === 'exercise'
              ? 'Practical Application'
              : sectionType === 'reflection'
              ? 'Introspection Prompt'
              : sectionType === 'purpose'
              ? 'Life Integration'
              : 'Core Concepts'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="prose prose-lg max-w-none text-foreground/80">
        <PortableText value={description} />
      </div>

      {/* Key Points */}
      {keyPoints && keyPoints.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-black text-lg uppercase tracking-tight text-foreground">Key Takeaways</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {keyPoints.map((point, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <p className="text-base text-foreground/70">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

        <div className="space-y-6 pt-4">
          <h3 className="font-black text-xl uppercase tracking-tight text-accent border-b border-accent/10 pb-2">Biblical Grounding</h3>
          {biblicalReferences.map((ref, i) => (
            <div key={i} className="space-y-3">
              <p className="font-bold text-accent text-base">{ref.verse}</p>
              <p className="text-base italic text-foreground/70 mb-2 leading-relaxed">"{ref.text}"</p>
              <div className="pl-4 border-l-2 border-accent/20">
                <p className="text-xs font-black text-accent/50 uppercase mb-1">Application</p>
                <p className="text-base text-foreground/80">{ref.interpretation}</p>
              </div>
            </div>
          ))}
        </div>

      {/* Academic Resources */}
      {academicResources && academicResources.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-black text-lg uppercase tracking-tight text-foreground">Research & Academic Foundation</h3>
          {academicResources.map((resource, i) => (
            <div key={i} className="p-4 bg-white/60 rounded-lg border border-white/50 space-y-2">
              <p className="font-bold text-foreground/90">{resource.title}</p>
              <p className="text-xs text-foreground/60">
                {resource.author} • <em>{resource.source}</em>
              </p>
              <p className="text-sm text-foreground/70">{resource.relevance}</p>
            </div>
          ))}
        </div>
      )}

        <div className="space-y-8 pt-8">
          <h3 className="font-black text-xl uppercase tracking-tight text-accent border-b border-accent/10 pb-2">Reflection & Journal</h3>
          {reflectionPrompts.map((prompt, i) => (
            <div key={i} className="space-y-4">
              <div className="font-bold text-accent text-lg flex items-start gap-2">
                <span className="shrink-0 text-2xl">💭</span>
                <span>{prompt.question}</span>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-foreground/60 italic p-4 bg-black/[0.02] rounded-lg">
                  {prompt.guidance}
                </p>
                <textarea
                  value={journalEntries[i] || ''}
                  onChange={(e) => updateJournalEntry(i, e.target.value)}
                  placeholder={prompt.journalPlaceholder}
                  className="w-full p-6 bg-white rounded-xl border border-black/10 min-h-32 text-base text-foreground resize-y focus:border-accent focus:ring-1 focus:ring-accent/20 focus:outline-none transition-all shadow-sm"
                />
              </div>
            </div>
          ))}
        </div>

      {/* Progress Indicator */}
      <div className="flex justify-center pt-4">
        <div className="text-center">
          <div className="text-xs text-foreground/50 uppercase tracking-widest mb-2">
            Section {index + 1} of 7
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 7 }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i <= index ? 'bg-accent' : 'bg-foreground/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}