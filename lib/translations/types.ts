export type Translation = {
  title: string
  description: string
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

