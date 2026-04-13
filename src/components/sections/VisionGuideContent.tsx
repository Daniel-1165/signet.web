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

  const bgColors = [
    'bg-blue-50',
    'bg-green-50',
    'bg-purple-50',
    'bg-amber-50',
    'bg-pink-50',
    'bg-indigo-50',
    'bg-teal-50',
  ]

  const borderColors = [
    'border-blue-200',
    'border-green-200',
    'border-purple-200',
    'border-amber-200',
    'border-pink-200',
    'border-indigo-200',
    'border-teal-200',
  ]

  const accentColors = [
    'text-blue-600',
    'text-green-600',
    'text-purple-600',
    'text-amber-600',
    'text-pink-600',
    'text-indigo-600',
    'text-teal-600',
  ]

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
    <div className={`rounded-3xl border-2 ${borderColors[index % 7]} ${bgColors[index % 7]} p-8 md:p-12 space-y-8`}>
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-2xl bg-white border-2 ${borderColors[index % 7]}`}>
          <div className={`${accentColors[index % 7]}`}>{icon}</div>
        </div>
        <div>
          <h2 className={`text-4xl font-black ${accentColors[index % 7]} uppercase tracking-tight`}>
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
          <h3 className="font-black text-lg uppercase tracking-tight">Key Takeaways</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {keyPoints.map((point, i) => (
              <div key={i} className="flex gap-3 items-start p-3 bg-white/60 rounded-lg">
                <div className={`w-1.5 h-1.5 rounded-full ${accentColors[index % 7]} mt-2 flex-shrink-0`} />
                <p className="text-sm text-foreground/70">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Biblical References */}
      {biblicalReferences && biblicalReferences.length > 0 && (
        <div className="space-y-4 p-6 bg-white/70 rounded-2xl border border-white/50">
          <h3 className="font-black text-lg uppercase tracking-tight text-purple-700">Biblical Grounding</h3>
          {biblicalReferences.map((ref, i) => (
            <div key={i} className="space-y-2 pb-4 border-b border-white/50 last:border-b-0">
              <p className="font-bold text-purple-600 text-sm">{ref.verse}</p>
              <p className="text-sm italic text-foreground/70 mb-2">"{ref.text}"</p>
              <div className="p-3 bg-purple-50 rounded-lg">
                <p className="text-xs font-semibold text-purple-700 mb-1">Application:</p>
                <p className="text-sm text-foreground/70">{ref.interpretation}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Academic Resources */}
      {academicResources && academicResources.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-black text-lg uppercase tracking-tight">Research & Academic Foundation</h3>
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

      {/* Reflection Prompts */}
      {reflectionPrompts && reflectionPrompts.length > 0 && (
        <div className="space-y-4 p-6 bg-white/70 rounded-2xl border-2 border-amber-200">
          <h3 className="font-black text-lg uppercase tracking-tight text-amber-700">Reflection & Journal Prompts</h3>
          {reflectionPrompts.map((prompt, i) => (
            <div key={i} className="space-y-3">
              <button
                onClick={() => togglePrompt(i)}
                className="w-full text-left font-bold text-amber-600 text-base hover:text-amber-700 transition-colors flex items-center justify-between"
              >
                <span>💭 {prompt.question}</span>
                <span className={`transform transition-transform ${expandedPrompts.has(i) ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              {expandedPrompts.has(i) && (
                <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                  <p className="text-sm text-foreground/70 mb-3 p-2 bg-amber-50 rounded pl-3 border-l-4 border-amber-300">
                    {prompt.guidance}
                  </p>
                  <textarea
                    value={journalEntries[i] || ''}
                    onChange={(e) => updateJournalEntry(i, e.target.value)}
                    placeholder={prompt.journalPlaceholder}
                    className="w-full p-4 bg-white rounded-lg border-2 border-amber-100 min-h-24 text-sm text-foreground resize-y focus:border-amber-300 focus:outline-none transition-colors"
                  />
                  <div className="flex justify-between items-center text-xs text-foreground/50">
                    <span>Characters: {journalEntries[i]?.length || 0}</span>
                    <button
                      onClick={() => navigator.clipboard.writeText(journalEntries[i] || '')}
                      className="text-amber-600 hover:text-amber-700 underline"
                    >
                      Copy to clipboard
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

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
                  i <= index ? accentColors[index % 7] : 'bg-foreground/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}