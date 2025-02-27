export const ptBR = {
  title: "Breathscape",
  description:
    "Selecione uma técnica de respiração para começar seu exercício de respiração consciente. Cada técnica oferece benefícios únicos para relaxamento e alívio do estresse.",
  breathingTechniques: {
    circle: {
      name: "Respiração Circular",
      steps: ["Inspire", "Segure", "Expire"],
      description: "Uma técnica simples mas eficaz para relaxamento e foco.",
      benefits: ["Reduz estresse e ansiedade", "Melhora o foco", "Promove relaxamento"],
      howItWorks: ["Inspire por 4 segundos", "Segure por 4 segundos", "Expire por 4 segundos"],
    },
    square: {
      name: "Respiração Quadrada",
      steps: ["Inspire", "Segure", "Expire", "Segure"],
      description: "Uma técnica poderosa para alívio do estresse e melhoria do foco.",
      benefits: [
        "Reduz estresse e ansiedade",
        "Melhora a concentração e o foco",
        "Ajuda a regular o sistema nervoso autônomo",
        "Pode baixar a pressão arterial",
        "Perfeito para alívio rápido do estresse durante o trabalho",
      ],
      howItWorks: ["Inspire por 4 segundos", "Segure por 4 segundos", "Expire por 4 segundos", "Segure por 4 segundos"],
    },
    hexagon: {
      name: "Respiração Hexagonal",
      steps: ["Inspire", "Segure", "Expire", "Segure", "Inspire", "Segure"],
      description: "Uma técnica avançada para meditação e relaxamento mais profundos.",
      benefits: [
        "Relaxamento profundo e alívio do estresse",
        "Prática aprimorada de mindfulness",
        "Melhor controle da respiração",
        "Melhor regulação emocional",
        "Ideal para preparação para meditação",
      ],
      howItWorks: [
        "Seis fases distintas de respiração",
        "Alterna entre respirar, segurar e soltar",
        "Cria um ciclo completo de relaxamento",
      ],
    },
    triangle: {
      name: "Respiração Triangular",
      steps: ["Inspire", "Segure", "Expire"],
      description: "Uma técnica calmante para clareza mental e equilíbrio.",
      benefits: [
        "Promove equilíbrio emocional",
        "Ajuda no controle da ansiedade",
        "Melhora a qualidade do sono",
        "Aumenta a clareza mental",
        "Bom para iniciantes em exercícios respiratórios",
      ],
      howItWorks: ["Inspire por 5 segundos", "Segure por 5 segundos", "Expire por 5 segundos"],
    },
    star: {
      name: "Respiração Estrela",
      steps: ["Inspire", "Segure", "Expire", "Segure", "Inspire"],
      description: "Uma técnica visual perfeita para prática de mindfulness.",
      benefits: [
        "Excelente para meditação visual",
        "Ajuda com foco e concentração",
        "Ótimo para prática de mindfulness infantil",
        "Combina visualização com respiração",
        "Pode ajudar com ansiedade em situações sociais",
      ],
      howItWorks: [
        "Siga o padrão da estrela com cinco ciclos respiratórios",
        "Cada ponta representa uma fase diferente da respiração",
        "Complete a forma da estrela com sua respiração",
      ],
    },
    infinity: {
      name: "Respiração Infinita",
      steps: ["Inspire", "Expire"],
      description: "Uma técnica de fluxo contínuo para relaxamento sustentado.",
      benefits: [
        "Promove ritmo natural de respiração",
        "Reduz ansiedade e estresse",
        "Ajuda com foco contínuo",
        "Bom para preparação de exercícios físicos",
        "Melhora a conexão mente-corpo",
      ],
      howItWorks: [
        "Padrão de respiração contínuo",
        "Sem fases de retenção",
        "Transições suaves entre inspiração e expiração",
      ],
    },
    heart: {
      name: "Respiração do Coração",
      steps: ["Inspire", "Segure", "Expire"],
      description: "Uma técnica focada na compaixão para bem-estar emocional.",
      benefits: [
        "Aumenta a consciência emocional",
        "Promove sentimentos de compaixão",
        "Reduz o estresse emocional",
        "Melhora a variabilidade da frequência cardíaca",
        "Ajuda na cura emocional",
      ],
      howItWorks: [
        "Foque na área do coração enquanto respira",
        "Padrão de respiração suave e rítmico",
        "Combina visualização com respiração",
      ],
    },
    flower: {
      name: "Respiração da Flor",
      steps: ["Inspire", "Segure", "Expire", "Segure", "Inspire"],
      description: "Uma técnica suave perfeita para iniciantes e crianças.",
      benefits: [
        "Perfeito para iniciantes",
        "Aumenta criatividade e imaginação",
        "Reduz ansiedade em crianças",
        "Promove pensamentos pacíficos",
        "Ajuda na prática de mindfulness",
      ],
      howItWorks: [
        "Imagine uma flor desabrochando enquanto respira",
        "Inspiração e expiração suaves",
        "Foque no movimento de expansão e contração",
      ],
    },
    lungs: {
      name: "Respiração Pulmonar",
      steps: ["Inspire", "Segure", "Expire"],
      description: "Uma técnica focada na capacidade pulmonar total e fluxo de oxigênio.",
      benefits: [
        "Melhora a capacidade pulmonar",
        "Aumenta a ingestão de oxigênio",
        "Melhora a função respiratória",
        "Promove relaxamento",
        "Melhora a saúde geral",
      ],
      howItWorks: [
        "Inspire profundamente, enchendo seus pulmões completamente",
        "Segure a respiração brevemente",
        "Expire lenta e completamente",
      ],
    },
    stop: {
      name: "Respiração do Pare",
      steps: ["Inspire", "Segure", "Expire", "Segure", "Inspire", "Segure", "Expire", "Segure"],
      description: "Um padrão octogonal para consciência completa da respiração.",
      benefits: [
        "Relaxamento profundo",
        "Foco aprimorado",
        "Redução do estresse",
        "Maior autoconsciência",
        "Mindfulness aprimorado",
      ],
      howItWorks: [
        "Siga o padrão octogonal, segurando após cada inspiração e expiração",
        "Concentre-se na sensação da sua respiração",
        "Mantenha um ritmo constante",
      ],
    },
  },
  ui: {
    sessionTime: "Tempo da Sessão",
    cycles: "Ciclos",
    breatheIn: "Inspire",
    breatheOut: "Expire",
    hold: "Segure",
    reset: "Reiniciar",
    settings: "Configurações de Respiração",
    apply: "Aplicar Mudanças",
    presets: {
      custom: "Personalizado",
      "4-7-8": "Respiração 4-7-8",
      box: "Respiração Quadrada",
      relaxing: "Respiração Relaxante",
      energizing: "Respiração Energizante",
      coherent: "Respiração Coerente",
      alternate: "Respiração Alternada",
    },
    duration: {
      breatheIn: "Duração da Inspiração",
      breatheOut: "Duração da Expiração",
      hold: "Duração da Pausa",
      seconds: "segundos",
    },
  },
  guide: {
    title: "Guia de Técnicas de Respiração",
    techniques: {
      square: {
        title: "Respiração Quadrada (Respiração em Caixa)",
        description:
          "A respiração quadrada, também conhecida como respiração em caixa, é uma técnica simples mas poderosa usada por atletas e SEALs da Marinha para alívio do estresse e melhoria do foco.",
        howItWorks: {
          title: "Como funciona:",
          steps: ["Inspire por 4 segundos", "Segure por 4 segundos", "Expire por 4 segundos", "Segure por 4 segundos"],
        },
        benefits: {
          title: "Benefícios:",
          items: [
            "Reduz estresse e ansiedade",
            "Melhora a concentração e o foco",
            "Ajuda a regular o sistema nervoso autônomo",
            "Pode baixar a pressão arterial",
            "Perfeito para alívio rápido do estresse durante o trabalho",
          ],
        },
      },
      triangle: {
        title: "Respiração Triangular",
        description:
          "A respiração triangular é uma técnica calmante que usa um padrão de respiração em três partes para promover relaxamento e clareza mental.",
        howItWorks: {
          title: "Como funciona:",
          steps: ["Inspire por 5 segundos", "Segure por 5 segundos", "Expire por 5 segundos"],
        },
        benefits: {
          title: "Benefícios:",
          items: [
            "Promove equilíbrio emocional",
            "Ajuda no controle da ansiedade",
            "Melhora a qualidade do sono",
            "Aumenta a clareza mental",
            "Bom para iniciantes em exercícios respiratórios",
          ],
        },
      },
      star: {
        title: "Respiração Estrela",
        description:
          "A respiração estrela é uma técnica envolvente de cinco pontas que combina visualização com controle da respiração, sendo especialmente eficaz para crianças e aprendizes visuais.",
        howItWorks: {
          title: "Como funciona:",
          steps: [
            "Siga o padrão da estrela com cinco ciclos respiratórios",
            "Cada ponta representa uma fase diferente da respiração",
            "Complete a forma da estrela com sua respiração",
          ],
        },
        benefits: {
          title: "Benefícios:",
          items: [
            "Excelente para meditação visual",
            "Ajuda com foco e concentração",
            "Ótimo para prática de mindfulness infantil",
            "Combina visualização com respiração",
            "Pode ajudar com ansiedade em situações sociais",
          ],
        },
      },
      hexagon: {
        title: "Respiração Hexagonal",
        description:
          "A respiração hexagonal é uma técnica avançada que cria um estado mais profundo de calma através de seu padrão de seis lados, perfeita para sessões mais longas de meditação.",
        howItWorks: {
          title: "Como funciona:",
          steps: [
            "Seis fases distintas de respiração",
            "Alterna entre respirar, segurar e soltar",
            "Cria um ciclo completo de relaxamento",
          ],
        },
        benefits: {
          title: "Benefícios:",
          items: [
            "Relaxamento profundo e alívio do estresse",
            "Prática aprimorada de mindfulness",
            "Melhor controle da respiração",
            "Melhor regulação emocional",
            "Ideal para preparação para meditação",
          ],
        },
      },
      infinity: {
        title: "Respiração Infinita",
        description:
          "A respiração infinita usa um padrão de fluxo contínuo que imita o símbolo do infinito, criando uma experiência respiratória suave e rítmica.",
        howItWorks: {
          title: "Como funciona:",
          steps: [
            "Padrão de respiração contínuo",
            "Sem fases de retenção",
            "Transições suaves entre inspiração e expiração",
          ],
        },
        benefits: {
          title: "Benefícios:",
          items: [
            "Promove ritmo natural de respiração",
            "Reduz ansiedade e estresse",
            "Ajuda com foco contínuo",
            "Bom para preparação de exercícios físicos",
            "Melhora a conexão mente-corpo",
          ],
        },
      },
      heart: {
        title: "Respiração do Coração",
        description:
          "A respiração do coração combina consciência respiratória com meditação centrada no coração, promovendo bem-estar emocional e compaixão.",
        howItWorks: {
          title: "Como funciona:",
          steps: [
            "Foque na área do coração enquanto respira",
            "Padrão de respiração suave e rítmico",
            "Combina visualização com respiração",
          ],
        },
        benefits: {
          title: "Benefícios:",
          items: [
            "Aumenta a consciência emocional",
            "Promove sentimentos de compaixão",
            "Reduz o estresse emocional",
            "Melhora a variabilidade da frequência cardíaca",
            "Ajuda na cura emocional",
          ],
        },
      },
      flower: {
        title: "Respiração da Flor",
        description:
          "A respiração da flor é uma técnica suave que usa a visualização de uma flor desabrochando para guiar a respiração, sendo especialmente adequada para iniciantes e crianças.",
        howItWorks: {
          title: "Como funciona:",
          steps: [
            "Imagine uma flor desabrochando enquanto respira",
            "Inspiração e expiração suaves",
            "Foque no movimento de expansão e contração",
          ],
        },
        benefits: {
          title: "Benefícios:",
          items: [
            "Perfeito para iniciantes",
            "Aumenta criatividade e imaginação",
            "Reduz ansiedade em crianças",
            "Promove pensamentos pacíficos",
            "Ajuda na prática de mindfulness",
          ],
        },
      },
      general: {
        title: "Benefícios Gerais dos Exercícios Respiratórios",
        description:
          "A prática regular de exercícios respiratórios pode proporcionar numerosos benefícios para a saúde física e mental, independentemente da técnica específica utilizada.",
        physical: {
          title: "Benefícios Físicos:",
          items: [
            "Diminui a pressão arterial",
            "Reduz a tensão muscular",
            "Melhora a função do sistema imunológico",
            "Aumenta os níveis de energia",
            "Melhora a função respiratória",
          ],
        },
        mental: {
          title: "Benefícios Mentais:",
          items: [
            "Reduz estresse e ansiedade",
            "Melhora foco e concentração",
            "Aumenta regulação emocional",
            "Promove melhor sono",
            "Aumenta mindfulness",
          ],
        },
        practices: {
          title: "Melhores Práticas:",
          items: [
            "Pratique em um ambiente quieto e confortável",
            "Comece com sessões curtas (5-10 minutos)",
            "Mantenha uma boa postura",
            "Seja consistente com a prática diária",
            "Escute seu corpo e ajuste conforme necessário",
          ],
        },
      },
    },
  },
}

