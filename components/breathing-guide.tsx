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
  const t = translations[language]?.guide || translations["en"].guide

  return (
    <Card className="glass-effect card-hover border-0 shadow-2xl">
      <CardContent className="p-4 sm:p-6 md:p-8">
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {t.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
            Learn about different breathing techniques and their benefits
          </p>
        </div>
        
        <ScrollArea className="h-[300px] sm:h-[400px] md:h-[500px] pr-2 sm:pr-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {Object.entries(t.techniques).map(([key, technique]) => (
              <AccordionItem key={key} value={key} className="border rounded-lg px-3 sm:px-4 hover:shadow-md transition-all duration-200">
                <AccordionTrigger className="text-left hover:no-underline py-3 sm:py-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <span className="font-semibold text-foreground text-sm sm:text-base">{technique.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-3 sm:pb-4">
                  <div className="space-y-4 sm:space-y-6 pl-8 sm:pl-11">
                    <div className="space-y-2 sm:space-y-3">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{technique.description}</p>
                    </div>
                    
                    {technique.howItWorks && (
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <Target className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500" />
                          <h4 className="font-semibold text-foreground text-sm sm:text-base">{technique.howItWorks.title}</h4>
                        </div>
                        <ul className="space-y-1 sm:space-y-2 text-muted-foreground">
                          {technique.howItWorks.steps.map((step, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="leading-relaxed text-sm sm:text-base">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {technique.benefits && (
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-rose-500" />
                          <h4 className="font-semibold text-foreground text-sm sm:text-base">{technique.benefits.title}</h4>
                        </div>
                        <ul className="space-y-1 sm:space-y-2 text-muted-foreground">
                          {technique.benefits.items.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="leading-relaxed text-sm sm:text-base">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {technique.physical && (
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <Leaf className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-500" />
                          <h4 className="font-semibold text-foreground text-sm sm:text-base">{technique.physical.title}</h4>
                        </div>
                        <ul className="space-y-1 sm:space-y-2 text-muted-foreground">
                          {technique.physical.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="leading-relaxed text-sm sm:text-base">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {technique.mental && (
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-purple-500" />
                          <h4 className="font-semibold text-foreground text-sm sm:text-base">{technique.mental.title}</h4>
                        </div>
                        <ul className="space-y-1 sm:space-y-2 text-muted-foreground">
                          {technique.mental.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="leading-relaxed text-sm sm:text-base">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {technique.practices && (
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
                          <h4 className="font-semibold text-foreground text-sm sm:text-base">{technique.practices.title}</h4>
                        </div>
                        <ul className="space-y-1 sm:space-y-2 text-muted-foreground">
                          {technique.practices.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="leading-relaxed text-sm sm:text-base">{item}</span>
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

