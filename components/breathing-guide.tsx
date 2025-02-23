"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

export function BreathingGuide() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Breathing Techniques Guide</h2>
      <ScrollArea className="h-[400px] pr-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="square">
            <AccordionTrigger>Square Breathing (Box Breathing)</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Square breathing, also known as box breathing, is a simple yet powerful technique used by everyone
                  from athletes to Navy SEALs for stress relief and focus enhancement.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">How it works:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Breathe in for 4 seconds</li>
                    <li>Hold for 4 seconds</li>
                    <li>Breathe out for 4 seconds</li>
                    <li>Hold for 4 seconds</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Reduces stress and anxiety</li>
                    <li>Improves concentration and focus</li>
                    <li>Helps regulate the autonomic nervous system</li>
                    <li>Can lower blood pressure</li>
                    <li>Perfect for quick stress relief during work</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="triangle">
            <AccordionTrigger>Triangle Breathing</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Triangle breathing is a calming technique that uses a three-part breath pattern to promote relaxation
                  and mental clarity.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">How it works:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Breathe in for 5 seconds</li>
                    <li>Hold for 5 seconds</li>
                    <li>Breathe out for 5 seconds</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Promotes emotional balance</li>
                    <li>Helps with anxiety management</li>
                    <li>Improves sleep quality</li>
                    <li>Enhances mental clarity</li>
                    <li>Good for beginners in breathing exercises</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="star">
            <AccordionTrigger>Star Breathing</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Star breathing is an engaging five-pointed technique that combines visualization with breath control,
                  making it especially effective for children and visual learners.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">How it works:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Follow the star pattern with five breathing cycles</li>
                    <li>Each point represents a different breath phase</li>
                    <li>Complete the star shape with your breath</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Excellent for visual meditation</li>
                    <li>Helps with focus and concentration</li>
                    <li>Great for children's mindfulness practice</li>
                    <li>Combines visualization with breathing</li>
                    <li>Can help with anxiety in social situations</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="hexagon">
            <AccordionTrigger>Hexagon Breathing</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Hexagon breathing is an advanced technique that creates a deeper state of calm through its six-sided
                  pattern, perfect for longer meditation sessions.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">How it works:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Six distinct phases of breathing</li>
                    <li>Alternates between breathing, holding, and releasing</li>
                    <li>Creates a complete cycle of relaxation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Deep relaxation and stress relief</li>
                    <li>Enhanced mindfulness practice</li>
                    <li>Improved breath control</li>
                    <li>Better emotional regulation</li>
                    <li>Ideal for meditation preparation</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="infinity">
            <AccordionTrigger>Infinity Breathing</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Infinity breathing uses a continuous flow pattern that mimics the infinity symbol, creating a seamless
                  and rhythmic breathing experience.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">How it works:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Continuous breathing pattern</li>
                    <li>No holding phases</li>
                    <li>Smooth transitions between inhale and exhale</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Promotes natural breathing rhythm</li>
                    <li>Reduces anxiety and stress</li>
                    <li>Helps with continuous focus</li>
                    <li>Good for physical exercise preparation</li>
                    <li>Enhances mind-body connection</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="heart">
            <AccordionTrigger>Heart Breathing</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Heart breathing combines breath awareness with heart-centered meditation, promoting emotional
                  well-being and compassion.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">How it works:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Focus on the heart area while breathing</li>
                    <li>Gentle, rhythmic breathing pattern</li>
                    <li>Combines visualization with breath</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Enhances emotional awareness</li>
                    <li>Promotes feelings of compassion</li>
                    <li>Reduces emotional stress</li>
                    <li>Improves heart rate variability</li>
                    <li>Helps with emotional healing</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="flower">
            <AccordionTrigger>Flower Breathing</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Flower breathing is a gentle technique that uses the visualization of a blooming flower to guide the
                  breath, making it especially suitable for beginners and children.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">How it works:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Imagine a flower blooming as you breathe</li>
                    <li>Gentle inhalation and exhalation</li>
                    <li>Focus on the expanding and contracting movement</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Perfect for beginners</li>
                    <li>Enhances creativity and imagination</li>
                    <li>Reduces anxiety in children</li>
                    <li>Promotes peaceful thoughts</li>
                    <li>Helps with mindfulness practice</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="general">
            <AccordionTrigger>General Benefits of Breathing Exercises</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Regular practice of breathing exercises can provide numerous physical and mental health benefits,
                  regardless of the specific technique used.
                </p>
                <div>
                  <h4 className="font-semibold mb-2">Physical Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Lowers blood pressure</li>
                    <li>Reduces muscle tension</li>
                    <li>Improves immune system function</li>
                    <li>Increases energy levels</li>
                    <li>Enhances respiratory function</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Mental Benefits:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Reduces stress and anxiety</li>
                    <li>Improves focus and concentration</li>
                    <li>Enhances emotional regulation</li>
                    <li>Promotes better sleep</li>
                    <li>Increases mindfulness</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Best Practices:</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Practice in a quiet, comfortable environment</li>
                    <li>Start with shorter sessions (5-10 minutes)</li>
                    <li>Maintain good posture</li>
                    <li>Be consistent with daily practice</li>
                    <li>Listen to your body and adjust as needed</li>
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </Card>
  )
}

