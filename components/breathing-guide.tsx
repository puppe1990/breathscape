"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { translations } from "@/lib/translations/index"
import { BookOpen, Lightbulb, Heart, Target, Brain, Leaf } from "lucide-react"

interface BreathingGuideProps {
  language: string
}

export function BreathingGuide({ language }: BreathingGuideProps) {
  const t = translations[language] || translations["en"]
  const guide = t.guide

  return (
    <Card className="overflow-hidden border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
      <CardContent className="p-6 sm:p-8">
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {guide.title}
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {t.mainPage.breathingGuideDescription}
          </p>
        </div>
        
        <ScrollArea className="h-[350px] sm:h-[400px] md:h-[500px] pr-3 sm:pr-4">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {Object.entries(guide.techniques).map(([key, technique]) => (
              <AccordionItem key={key} value={key} className="border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 sm:px-5 hover:shadow-lg transition-all duration-200 bg-white/50 dark:bg-slate-800/50 hover:bg-white/70 dark:hover:bg-slate-800/70">
                <AccordionTrigger className="text-left hover:no-underline py-4 sm:py-5">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                      <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-slate-100 text-base sm:text-lg">{technique.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4 sm:pb-5">
                  <div className="space-y-5 sm:space-y-6 pl-10 sm:pl-12">
                    <div className="space-y-3 sm:space-y-4">
                      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">{technique.description}</p>
                    </div>
                    
                    {technique.howItWorks && (
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-3">
                          <Target className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-base sm:text-lg">{technique.howItWorks.title}</h4>
                        </div>
                        <ul className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-400">
                          {technique.howItWorks.steps.map((step, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-500 rounded-full mt-2.5 flex-shrink-0"></span>
                              <span className="leading-relaxed text-base sm:text-lg">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {technique.benefits && (
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-3">
                          <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500" />
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-base sm:text-lg">{technique.benefits.title}</h4>
                        </div>
                        <ul className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-400">
                          {technique.benefits.items.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-rose-500 rounded-full mt-2.5 flex-shrink-0"></span>
                              <span className="leading-relaxed text-base sm:text-lg">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {technique.physical && (
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-3">
                          <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-base sm:text-lg">{technique.physical.title}</h4>
                        </div>
                        <ul className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-400">
                          {technique.physical.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-500 rounded-full mt-2.5 flex-shrink-0"></span>
                              <span className="leading-relaxed text-base sm:text-lg">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {technique.mental && (
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-3">
                          <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-base sm:text-lg">{technique.mental.title}</h4>
                        </div>
                        <ul className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-400">
                          {technique.mental.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-purple-500 rounded-full mt-2.5 flex-shrink-0"></span>
                              <span className="leading-relaxed text-base sm:text-lg">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {technique.practices && (
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                          <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-base sm:text-lg">{technique.practices.title}</h4>
                        </div>
                        <ul className="space-y-2 sm:space-y-3 text-slate-600 dark:text-slate-400">
                          {technique.practices.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-amber-500 rounded-full mt-2.5 flex-shrink-0"></span>
                              <span className="leading-relaxed text-base sm:text-lg">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

