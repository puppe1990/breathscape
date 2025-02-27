"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { translations } from "@/lib/translations/index"

interface BreathingGuideProps {
  language: string
}

export function BreathingGuide({ language }: BreathingGuideProps) {
  const t = translations[language]?.guide || translations["en"].guide

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{t.title}</h2>
      <ScrollArea className="h-[400px] pr-4">
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(t.techniques).map(([key, technique]) => (
            <AccordionItem key={key} value={key}>
              <AccordionTrigger>{technique.title}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{technique.description}</p>
                  {technique.howItWorks && (
                    <div>
                      <h4 className="font-semibold mb-2">{technique.howItWorks.title}</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {technique.howItWorks.steps.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {technique.benefits && (
                    <div>
                      <h4 className="font-semibold mb-2">{technique.benefits.title}</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {technique.benefits.items.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {technique.physical && (
                    <div>
                      <h4 className="font-semibold mb-2">{technique.physical.title}</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {technique.physical.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {technique.mental && (
                    <div>
                      <h4 className="font-semibold mb-2">{technique.mental.title}</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {technique.mental.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {technique.practices && (
                    <div>
                      <h4 className="font-semibold mb-2">{technique.practices.title}</h4>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                        {technique.practices.items.map((item, index) => (
                          <li key={index}>{item}</li>
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
    </Card>
  )
}

