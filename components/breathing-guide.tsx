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
      <CardContent className="p-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {t.title}
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            Learn about different breathing techniques and their benefits
          </p>
        </div>
        
        <ScrollArea className="h-[500px] pr-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {Object.entries(t.techniques).map(([key, technique]) => (
              <AccordionItem key={key} value={key} className="border rounded-lg px-4 hover:shadow-md transition-all duration-200">
                <AccordionTrigger className="text-left hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-foreground">{technique.title}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-6 pl-11">
                    <div className="space-y-3">
                      <p className="text-muted-foreground leading-relaxed">{technique.description}</p>
                    </div>
                    
                    {technique.howItWorks && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-blue-500" />
                          <h4 className="font-semibold text-foreground">{technique.howItWorks.title}</h4>
                        </div>
                        <ul className="space-y-2 text-muted-foreground">
                          {technique.howItWorks.steps.map((step, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="leading-relaxed">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {technique.benefits && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Heart className="w-4 h-4 text-rose-500" />
                          <h4 className="font-semibold text-foreground">{technique.benefits.title}</h4>
                        </div>
                        <ul className="space-y-2 text-muted-foreground">
                          {technique.benefits.items.map((benefit, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="leading-relaxed">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {technique.physical && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Leaf className="w-4 h-4 text-emerald-500" />
                          <h4 className="font-semibold text-foreground">{technique.physical.title}</h4>
                        </div>
                        <ul className="space-y-2 text-muted-foreground">
                          {technique.physical.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {technique.mental && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Brain className="w-4 h-4 text-purple-500" />
                          <h4 className="font-semibold text-foreground">{technique.mental.title}</h4>
                        </div>
                        <ul className="space-y-2 text-muted-foreground">
                          {technique.mental.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {technique.practices && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-amber-500" />
                          <h4 className="font-semibold text-foreground">{technique.practices.title}</h4>
                        </div>
                        <ul className="space-y-2 text-muted-foreground">
                          {technique.practices.items.map((item, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></span>
                              <span className="leading-relaxed">{item}</span>
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

