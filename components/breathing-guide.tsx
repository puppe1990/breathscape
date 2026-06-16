"use client"

import type React from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { translations } from "@/lib/translations/index"
import { Heart, Target, Brain, Leaf, BookOpen } from "lucide-react"

interface BreathingGuideProps {
  language: string
}

export function BreathingGuide({ language }: BreathingGuideProps) {
  const t = translations[language] || translations["en"]
  const guide = t.guide

  return (
    <div className="surface-card overflow-hidden">
      <Accordion type="single" collapsible className="w-full">
        {Object.entries(guide.techniques).map(([key, technique]) => (
          <AccordionItem
            key={key}
            value={key}
            className="border-b border-border/50 px-5 last:border-0 sm:px-6"
          >
            <AccordionTrigger className="py-4 text-left hover:no-underline sm:py-5">
              <span className="font-display text-base font-medium text-foreground sm:text-lg">
                {technique.title}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pb-5 sm:pb-6">
              <div className="space-y-5">
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {technique.description}
                </p>

                {technique.howItWorks && (
                  <GuideSection
                    icon={<Target className="h-4 w-4 text-primary" />}
                    title={technique.howItWorks.title}
                    items={technique.howItWorks.steps}
                  />
                )}

                {technique.benefits && (
                  <GuideSection
                    icon={<Heart className="h-4 w-4 text-rose-500" />}
                    title={technique.benefits.title}
                    items={technique.benefits.items}
                  />
                )}

                {technique.physical && (
                  <GuideSection
                    icon={<Leaf className="h-4 w-4 text-emerald-600" />}
                    title={technique.physical.title}
                    items={technique.physical.items}
                  />
                )}

                {technique.mental && (
                  <GuideSection
                    icon={<Brain className="h-4 w-4 text-violet-500" />}
                    title={technique.mental.title}
                    items={technique.mental.items}
                  />
                )}

                {technique.practices && (
                  <GuideSection
                    icon={<BookOpen className="h-4 w-4 text-amber-600" />}
                    title={technique.practices.title}
                    items={technique.practices.items}
                  />
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

function GuideSection({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode
  title: string
  items: string[]
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        {icon}
        <h4 className="text-sm font-medium text-foreground">{title}</h4>
      </div>
      <ul className="space-y-1.5 pl-6">
        {items.map((item, index) => (
          <li key={index} className="list-disc text-sm leading-relaxed text-muted-foreground marker:text-border">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
