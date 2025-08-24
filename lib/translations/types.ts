export type Translation = {
  title: string
  description: string
  footer: {
    mindfulBreathing: string
    relaxation: string
    relaxationDescription: string
    focus: string
    focusDescription: string
    wellness: string
    wellnessDescription: string
    about: string
    contact: string
    privacy: string
    terms: string
    madeWith: string
    forMindfulBreathing: string
  }
  mainPage: {
    breathingTechniques: string
    breathingTechniquesDescription: string
    breathingGuideDescription: string
  }
  breathingTechniques: {
    [key: string]: {
      name: string
      steps: string[]
      description: string
      benefits: string[]
      howItWorks: string[]
    }
  }
  ui: {
    sessionTime: string
    cycles: string
    breatheIn: string
    breatheOut: string
    hold: string
    reset: string
    settings: string
    apply: string
    presets: {
      [key: string]: string
    }
    duration: {
      breatheIn: string
      breatheOut: string
      hold: string
      seconds: string
    }
  }
  guide: {
    title: string
    techniques: {
      [key: string]: {
        title: string
        description: string
        howItWorks?: {
          title: string
          steps: string[]
        }
        benefits?: {
          title: string
          items: string[]
        }
        physical?: {
          title: string
          items: string[]
        }
        mental?: {
          title: string
          items: string[]
        }
        practices?: {
          title: string
          items: string[]
        }
      }
    }
  }
}

