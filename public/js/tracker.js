// ============================================================================
// GERENCIADOR DE PROGRESSO E CONTEÚDO (TRACKER.JS - REFATORADO)
// ============================================================================

// Definição de Habilidades (Skills)
const STATIC_SKILLS = [
  { id: "s_vector_rep", name: "Representação Vetorial", description: "Compreensão de direção, magnitude e representação de dados industriais em vetores cartesianos.", category: "algebra_linear" },
  { id: "s_vector_ops", name: "Operações Vetoriais", description: "Operações de soma de vetores e produto por escalar para estimativas de capacidade e recursos.", category: "algebra_linear" },
  { id: "s_dec_criteria", name: "Alternativas e Critérios", description: "Estruturação de matrizes de decisão e identificação de objetivos qualitativos e quantitativos no AMD.", category: "amd" },
  { id: "s_weighted_sum", name: "Soma Ponderada no AMD", description: "Cálculo de notas ponderadas e normalização matemática de critérios para tomada de decisões.", category: "amd" },
  { id: "s_num_error", name: "Análise de Erros Numéricos", description: "Compreensão e cálculo de erros absolutos e relativos em medições aproximadas.", category: "calculo_numerico" },
  { id: "s_truncation", name: "Erro de Truncamento", description: "Análise de erros decorrentes de arredondamentos e interrupção prematura de processos iterativos.", category: "calculo_numerico" },
  { id: "s_mat_bonds", name: "Ligações Químicas em Materiais", description: "Relação entre as ligações atômicas e as propriedades mecânicas/térmicas de metais, cerâmicas e polímeros.", category: "ciencia_materiais" },
  { id: "s_tensile_test", name: "Ensaios Mecânicos", description: "Interpretação da curva Tensão-Deformação, identificando os limites elástico, plástico e de escoamento.", category: "ciencia_materiais" },
  { id: "s_weld_visual", name: "Ensaio Visual", description: "Inspeção visual e detecção de descontinuidades em juntas soldadas.", category: "inspecao_soldagem" },
  { id: "s_weld_lp", name: "Líquido Penetrante", description: "Aplicação e interpretação do ensaio por Líquido Penetrante (LP).", category: "inspecao_soldagem" },
  { id: "s_weld_us", name: "Ultrassom", description: "Princípios e aplicação de ondas ultrassônicas em soldas.", category: "inspecao_soldagem" },
  { id: "s_weld_symb", name: "Simbologia", description: "Leitura e interpretação de simbologia de soldagem AWS A2.4.", category: "inspecao_soldagem" },
  { id: "s_weld_terms", name: "Terminologia", description: "Definições e termos técnicos aplicados à soldagem e suas descontinuidades.", category: "inspecao_soldagem" }
];

// Mapeamento de Lição para Skill
const LESSON_SKILLS_MAP = {
  "l_alg_1_1": ["s_vector_rep", "s_vector_ops"],
  "l_alg_2_1": ["s_matrix_ops"],
  "l_alg_3_1": ["s_matrix_ops"],
  "l_alg_4_1": ["s_vector_rep"],
  "l_alg_5_1": ["s_vector_ops"],
  "l_alg_6_1": ["s_vector_ops"],
  "l_amd_1_1": ["s_dec_criteria", "s_weighted_sum"],
  "l_amd_2_1": ["s_dec_criteria"],
  "l_amd_3_1": ["s_weighted_sum"],
  "l_amd_4_1": ["s_weighted_sum"],
  "l_amd_5_1": ["s_matrix_dec"],
  "l_amd_6_1": ["s_matrix_dec"],
  "l_amd_7_1": ["s_weighted_sum"],
  "l_num_1_1": ["s_num_error", "s_truncation"],
  "l_num_2_1": ["s_bisection"],
  "l_num_3_1": ["s_convergence"],
  "l_num_4_1": ["s_num_error"],
  "l_num_5_1": ["s_num_error"],
  "l_num_6_1": ["s_num_error"],
  "l_num_7_1": ["s_num_error"],
  "l_num_8_1": ["s_convergence"],
  "l_mat_1_1": ["s_mat_bonds", "s_tensile_test"],
  "l_mat_2_1": ["s_mat_bonds"],
  "l_mat_3_1": ["s_mat_bonds"],
  "l_mat_4_1": ["s_tensile_test"],
  "l_mat_5_1": ["s_tensile_test"],
  "l_mat_6_1": ["s_tensile_test"],
  "l_mat_7_1": ["s_class_materials"]
};

// Áreas do Catálogo (Explorar)
const EXPLORE_AREAS = [
  { id: "producao", name: "Engenharia de Produção", description: "Gestão de processos produtivos, modelagem matemática de fluxos de valor, pesquisa operacional e otimização de sistemas industriais.", status: "available", courses_count: 4, level: "Iniciante a Intermediário" }
];

// Lista de Cursos Cadastrados
const STATIC_COURSES = [
  { id: "c1111111-1111-1111-1111-111111111111", title: "Álgebra Linear", description: "Compreenda vetores, matrizes, sistemas lineares e transformações aplicadas a dados, modelagem e otimização.", difficulty: "beginner", estimated_hours: 12, is_published: true },
  { id: "c2222222-2222-2222-2222-222222222222", title: "Auxílio Multicritério à Decisão", description: "Aprenda a estruturar decisões complexas, comparar alternativas e analisar critérios conflitantes.", difficulty: "intermediate", estimated_hours: 15, is_published: true },
  { id: "c3333333-3333-3333-3333-333333333333", title: "Cálculo Numérico", description: "Resolva problemas de engenharia utilizando aproximações, algoritmos iterativos e métodos computacionais.", difficulty: "intermediate", estimated_hours: 18, is_published: true },
  { id: "c4444444-4444-4444-4444-444444444444", title: "Ciência dos Materiais", description: "Entenda como estrutura, processamento e composição determinam as propriedades e o desempenho dos materiais.", difficulty: "beginner", estimated_hours: 14, is_published: true }
];

// Lista de Módulos por Curso
const STATIC_MODULES = [
  // Álgebra Linear
  { id: "m_alg_1", course_id: "c1111111-1111-1111-1111-111111111111", title: "Módulo 1 — Vetores e linguagem vetorial", description: "Compreenda vetores, direção, sentido, plano cartesiano, soma, subtração, produto escalar e por escalar na produção.", position: 1, is_published: true },
  { id: "m_alg_2", course_id: "c1111111-1111-1111-1111-111111111111", title: "Módulo 2 — Matrizes", description: "Entenda conceito, ordem, adição, subtração, multiplicação e determinantes aplicados a dados de produção.", position: 2, is_published: true },
  { id: "m_alg_3", course_id: "c1111111-1111-1111-1111-111111111111", title: "Módulo 3 — Sistemas lineares", description: "Domine representação matricial, eliminação de Gauss e alocação de recursos industriais.", position: 3, is_published: true },
  { id: "m_alg_4", course_id: "c1111111-1111-1111-1111-111111111111", title: "Módulo 4 — Espaços vetoriais", description: "Aprenda sobre espaços, subespaços, dependência/independência linear, base e dimensão.", position: 4, is_published: true },
  { id: "m_alg_5", course_id: "c1111111-1111-1111-1111-111111111111", title: "Módulo 5 — Transformações lineares", description: "Defina operadores lineares, rotação, escala, projeção e composições computacionais.", position: 5, is_published: true },
  { id: "m_alg_6", course_id: "c1111111-1111-1111-1111-111111111111", title: "Módulo 6 — Autovalores e autovetores", description: "Calcule a diagonalização e compreenda a interpretação geométrica em sistemas dinâmicos.", position: 6, is_published: true },

  // AMD
  { id: "m_amd_1", course_id: "c2222222-2222-2222-2222-222222222222", title: "Módulo 1 — Fundamentos da decisão", description: "Diferencie alternativas, critérios, objetivos, preferências e limitações de modelos multicritério.", position: 1, is_published: true },
  { id: "m_amd_2", course_id: "c2222222-2222-2222-2222-222222222222", title: "Módulo 2 — Estruturação do problema", description: "Aprenda a selecionar critérios quantitativos e qualitativos e construir a matriz de decisão.", position: 2, is_published: true },
  { id: "m_amd_3", course_id: "c2222222-2222-2222-2222-222222222222", title: "Módulo 3 — Pesos e preferências", description: "Distribua importância de pesos, normalização de dados e verifique sensibilidade e vieses.", position: 3, is_published: true },
  { id: "m_amd_4", course_id: "c2222222-2222-2222-2222-222222222222", title: "Módulo 4 — Método AHP", description: "Comparações par a par, escalas de Saaty, análise de consistência e ranking de alternativas.", position: 4, is_published: true },
  { id: "m_amd_5", course_id: "c2222222-2222-2222-2222-222222222222", title: "Módulo 5 — Método TOPSIS", description: "Normalização vetorial, distâncias euclidianas às soluções ideais e coeficiente de proximidade.", position: 5, is_published: true },
  { id: "m_amd_6", course_id: "c2222222-2222-2222-2222-222222222222", title: "Módulo 6 — Método ELECTRE", description: "Relações de sobreclassificação, concordância, discordância e limites não compensatórios.", position: 6, is_published: true },
  { id: "m_amd_7", course_id: "c2222222-2222-2222-2222-222222222222", title: "Módulo 7 — Análise da decisão", description: "Avalie sensibilidade, robustez, incertezas e a comunicação de decisões complexas.", position: 7, is_published: true },

  // Cálculo Numérico
  { id: "m_num_1", course_id: "c3333333-3333-3333-3333-333333333333", title: "Módulo 1 — Erros e aproximações", description: "Erros absolutos e relativos, arredondamento, truncamento e estabilidade numérica.", position: 1, is_published: true },
  { id: "m_num_2", course_id: "c3333333-3333-3333-3333-333333333333", title: "Módulo 2 — Zeros de funções", description: "Métodos iterativos da bisseção, Newton-Raphson e secante para encontrar raízes de equações.", position: 2, is_published: true },
  { id: "m_num_3", course_id: "c3333333-3333-3333-3333-333333333333", title: "Módulo 3 — Sistemas lineares numéricos", description: "Resoluções numéricas de sistemas lineares por eliminação de Gauss, fatoração LU, Jacobi e Seidel.", position: 3, is_published: true },
  { id: "m_num_4", course_id: "c3333333-3333-3333-3333-333333333333", title: "Módulo 4 — Interpolação", description: "Polinômios de Lagrange e Newton, splines e estimativa do erro de interpolação.", position: 4, is_published: true },
  { id: "m_num_5", course_id: "c3333333-3333-3333-3333-333333333333", title: "Módulo 5 — Ajuste de curvas", description: "Regressão por mínimos quadrados linear e polinomial para aproximar dados de laboratório.", position: 5, is_published: true },
  { id: "m_num_6", course_id: "c3333333-3333-3333-3333-333333333333", title: "Módulo 6 — Diferenciação numérica", description: "Calcule taxas de variação usando diferenças finitas progressivas, regressivas e centrais.", position: 6, is_published: true },
  { id: "m_num_7", course_id: "c3333333-3333-3333-3333-333333333333", title: "Módulo 7 — Integração numérica", description: "Fórmulas dos trapézios e Simpson simples e compostas para cálculo aproximado de áreas.", position: 7, is_published: true },
  { id: "m_num_8", course_id: "c3333333-3333-3333-3333-333333333333", title: "Módulo 8 — Equações diferenciais", description: "Soluções numéricas de PVI por Euler e métodos de Runge-Kutta.", position: 8, is_published: true },

  // Ciência dos Materiais
  { id: "m_mat_1", course_id: "c4444444-4444-4444-4444-444444444444", title: "Módulo 1 — Introdução aos materiais", description: "Estude a relação entre processamento, estrutura, propriedades e desempenho em ligas, polímeros e cerâmicas.", position: 1, is_published: true },
  { id: "m_mat_2", course_id: "c4444444-4444-4444-4444-444444444444", title: "Módulo 2 — Estrutura atômica e ligações", description: "Identifique ligações iônicas, covalentes e metálicas e seu impacto nas propriedades dos materiais.", position: 2, is_published: true },
  { id: "m_mat_3", course_id: "c4444444-4444-4444-4444-444444444444", title: "Módulo 3 — Estruturas cristalinas e defeitos", description: "Células unitárias, direções e planos cristalográficos, discordâncias, vacâncias e difusão atômica.", position: 3, is_published: true },
  { id: "m_mat_4", course_id: "c4444444-4444-4444-4444-444444444444", title: "Módulo 4 — Propriedades mecânicas e térmicas", description: "Interprete ensaios mecânicos de tração, módulo elástico, limite de escoamento, tenacidade, impacto e expansão térmica.", position: 4, is_published: true },
  { id: "m_mat_5", course_id: "c4444444-4444-4444-4444-444444444444", title: "Módulo 5 — Diagramas de fase", description: "Equilíbrio termodinâmico, regra da alavanca, ligações ferro-carbono e resfriamento.", position: 5, is_published: true },
  { id: "m_mat_6", course_id: "c4444444-4444-4444-4444-444444444444", title: "Módulo 6 — Tratamentos térmicos", description: "Têmpera, normalização, recozimento e revenimento: modifique a dureza através da microestrutura.", position: 6, is_published: true },
  { id: "m_mat_7", course_id: "c4444444-4444-4444-4444-444444444444", title: "Módulo 7 — Seleção de materiais", description: "Aplicação industrial, custos, propriedades mecânicas e matriz de decisão para escolha estrutural.", position: 7, is_published: true }
];

// Lista de Aulas Disponíveis
const STATIC_LESSONS = [
  // Álgebra Linear
  { id: "l_alg_1_1", module_id: "m_alg_1", title: "Representando informações com vetores", description: "Entenda o que define um vetor (direção, magnitude e sentido) e manipule suas coordenadas dinamicamente.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_alg_2_1", module_id: "m_alg_2", title: "Conceito de matriz e representação", description: "Represente demandas, custos e produtos em tabelas e realize multiplicações matriciais.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_alg_3_1", module_id: "m_alg_3", title: "Equações lineares e eliminação de Gauss", description: "Resolva sistemas lineares pelo método de eliminação gaussiana e determine a alocação de insumos.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_alg_4_1", module_id: "m_alg_4", title: "Espaços vetoriais e base linear", description: "Entenda a dependência linear, subespaços e base de um espaço vetorial em dados.", estimated_minutes: 12, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_alg_5_1", module_id: "m_alg_5", title: "Definição de transformações lineares", description: "Gire, projete e altere a escala de vetores cartesianos usando operadores lineares.", estimated_minutes: 11, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_alg_6_1", module_id: "m_alg_6", title: "Conceito de autovalores e autovetores", description: "Compreenda a diagonalização e identifique componentes principais em sistemas dinâmicos.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },

  // AMD
  { id: "l_amd_1_1", module_id: "m_amd_1", title: "Alternativas, critérios e decisões", description: "Descubra a diferença de escopo entre alternativas e critérios conflitantes na engenharia de gestão.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_amd_2_1", module_id: "m_amd_2", title: "Matriz de decisão e seleção de critérios", description: "Construa a matriz de decisão básica e classifique critérios qualitativos e quantitativos.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_amd_3_1", module_id: "m_amd_3", title: "Pesos e preferências de decisão", description: "Distribua pesos nos critérios e examine vieses na normalização de dados complexos.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_amd_4_1", module_id: "m_amd_4", title: "Matriz de julgamento e método AHP", description: "Estruture hierarquias e execute comparações par a par usando a escala de Saaty.", estimated_minutes: 15, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_amd_5_1", module_id: "m_amd_5", title: "Ranking de proximidade pelo TOPSIS", description: "Calcule a proximidade das alternativas em relação às soluções ideais positiva e negativa.", estimated_minutes: 12, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_amd_6_1", module_id: "m_amd_6", title: "Sobreclassificação pelo método ELECTRE", description: "Aprenda relações de sobreclassificação, concordância e limites não compensatórios no ELECTRE.", estimated_minutes: 13, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_amd_7_1", module_id: "m_amd_7", title: "Análise de sensibilidade e robustez", description: "Estruture análises de sensibilidade para garantir robustez e comunicação clara dos resultados.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },

  // Cálculo Numérico
  { id: "l_num_1_1", module_id: "m_num_1", title: "Por que precisamos de aproximações?", description: "Compreenda a necessidade prática de estimar valores e o impacto dos limites de representação binária.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_num_2_1", module_id: "m_num_2", title: "Zeros de funções e método da bisseção", description: "Aprenda a aplicar o método da bisseção e Newton-Raphson para achar raízes de equações.", estimated_minutes: 12, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_num_3_1", module_id: "m_num_3", title: "Métodos iterativos para sistemas lineares", description: "Entenda os métodos Jacobi e Gauss-Seidel para resolver grandes sistemas de equações.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_num_4_1", module_id: "m_num_4", title: "Interpolação de Lagrange e Newton", description: "Estime valores intermediários utilizando polinômios de Lagrange ou Newton com facilidade.", estimated_minutes: 11, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_num_5_1", module_id: "m_num_5", title: "Ajuste de curvas por mínimos quadrados", description: "Utilize o método dos mínimos quadrados para aproximar dados de sensores de laboratório.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_num_6_1", module_id: "m_num_6", title: "Diferenciação numérica por diferenças finitas", description: "Calcule taxas de variação usando diferenças finitas progressivas, regressivas e centrais.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_num_7_1", module_id: "m_num_7", title: "Integração numérica por trapézios e Simpson", description: "Aproxime áreas sob curvas com a regra dos trapézios e fórmulas compostas de Simpson.", estimated_minutes: 12, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_num_8_1", module_id: "m_num_8", title: "Equações diferenciais e método de Euler", description: "Desenvolva soluções de PVI pelo método de Euler e métodos estáveis de Runge-Kutta.", estimated_minutes: 14, position: 1, lesson_type: "interactive", is_published: true },

  // Ciência dos Materiais
  { id: "l_mat_1_1", module_id: "m_mat_1", title: "Estrutura, propriedades, processamento e desempenho", description: "Classifique materiais e entenda a relação fundamental processamento-estrutura-propriedade.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_mat_2_1", module_id: "m_mat_2", title: "Estrutura atômica e ligações primárias", description: "Entenda como as ligações metálicas, iônicas e covalentes determinam o comportamento físico.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_mat_3_1", module_id: "m_mat_3", title: "Estruturas cristalinas e defeitos pontuais", description: "Estude as células unitárias (CCC, CFC, HC) e defeitos como vacâncias e discordâncias.", estimated_minutes: 12, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_mat_4_1", module_id: "m_mat_4", title: "Propriedades mecânicas e ensaio de tração", description: "Analise curvas tensão-deformação, limite elástico/plástico e o módulo de elasticidade.", estimated_minutes: 11, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_mat_5_1", module_id: "m_mat_5", title: "Diagramas de fase e regra da alavanca", description: "Analise o resfriamento de ligas metálicas e interprete frações no diagrama ferro-carbono.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_mat_6_1", module_id: "m_mat_6", title: "Tratamentos térmicos em ligas ferro-carbono", description: "Têmpera, recozimento e revenimento: altere a microestrutura para aumentar a dureza.", estimated_minutes: 12, position: 1, lesson_type: "interactive", is_published: true },
  { id: "l_mat_7_1", module_id: "m_mat_7", title: "Matriz de seleção técnica de materiais", description: "Construa matrizes de seleção técnica cruzando custos, peso e confiabilidade mecânica.", estimated_minutes: 10, position: 1, lesson_type: "interactive", is_published: true }
];

// Detalhe dos Passos e Exercícios de cada lição
const STATIC_LESSON_STEPS = {
  // Álgebra Linear
  "l_alg_1_1": [
    {
      id: "step_alg_1_1",
      step_type: "explanation",
      title: "Como somar vetores",
      content: "Pense em um vetor como uma seta ou como um par de informações. O primeiro número representa o eixo x e o segundo representa o eixo y. Para somar dois vetores, somamos x com x e y com y.",
      position: 1
    },
    {
      id: "step_alg_1_2",
      step_type: "example",
      title: "Exemplo resolvido",
      content: "Se A = (2, 3) e B = (4, -1), então A + B = (2 + 4, 3 + -1) = (6, 2).",
      position: 2
    },
    {
      id: "step_alg_1_3",
      step_type: "activity",
      title: "Teste seu entendimento",
      content: "Agora resolva uma questão semelhante.",
      position: 3,
      activity: {
        id: "a_alg_1",
        activity_type: "multiple_choice",
        statement: "Dados A = (2, 3) e B = (4, -1), qual é A + B?",
        options: [
          {
            id: "o1",
            text: "(6, 2)",
            is_correct: true,
            feedback: "Correto. Some x com x e y com y."
          },
          {
            id: "o2",
            text: "(2, 4)",
            is_correct: false,
            feedback: "Ainda não. Você misturou os componentes."
          },
          {
            id: "o3",
            text: "(-2, 4)",
            is_correct: false,
            feedback: "Revise a soma do primeiro componente."
          },
          {
            id: "o4",
            text: "(6, -2)",
            is_correct: false,
            feedback: "Revise a soma do segundo componente."
          }
        ],
        explanation: "Na soma vetorial, somamos componentes correspondentes: (2 + 4, 3 + -1) = (6, 2)."
      }
    },
    {
      id: "step_alg_1_4",
      step_type: "summary",
      title: "Resumo",
      content: "Excelente! Para somar vetores, basta somar componente a componente. Pratique mais se desejar usando o botão gerado na correção.",
      position: 4
    }
  ],

  // AMD
  "l_amd_1_1": [
    {
      id: "s_amd_1",
      step_type: "text",
      title: "A Complexidade das Decisões",
      content: "Na vida real, a maioria das decisões envolvem múltiplos objetivos. Raramente uma única opção é superior em tudo.<br><br>Por exemplo, ao comprar uma máquina:<br>* A opção mais barata pode ter baixa qualidade.<br>* A de melhor qualidade pode ter maior prazo de entrega.<br><br>O **Auxílio Multicritério à Decisão (AMD)** ajuda a estruturar esses problemas identificando **Alternativas** (opções disponíveis) e os **Critérios** (variáveis de avaliação).",
      position: 1
    },
    {
      id: "s_amd_2",
      step_type: "simulation",
      title: "Distribuição de Pesos Multicritério",
      content: "Use os sliders abaixo para ajustar os pesos de <strong>Preço</strong>, <strong>Qualidade</strong> e <strong>Prazo</strong> no processo de seleção. Observe como a nota geral ponderada de dois fornecedores concorrentes (Fornecedor A e Fornecedor B) muda em tempo real no gráfico de barras.",
      position: 2
    },
    {
      id: "s_amd_3",
      step_type: "activity",
      title: "Exercício 1: Alternativa versus Critério",
      content: "Determine a classificação dos termos de decisão.",
      position: 3,
      activity: {
        id: "a_amd_1",
        activity_type: "multiple_choice",
        statement: "Em um estudo de localização para uma nova fábrica, o que representam opções como 'Cidade A' ou 'Cidade B' no modelo de decisão?",
        explanation: "As cidades A e B são as possíveis opções de escolha sob julgamento, logo são classificadas como Alternativas.",
        points: 10,
        options: [
          { id: "o_amd_1_1", content: "Alternativas do problema", is_correct: true, feedback: "Correto! Cidades de escolha representam as alternativas." },
          { id: "o_amd_1_2", content: "Critérios de avaliação", is_correct: false, feedback: "Incorreto. Critérios seriam o custo do terreno ou proximidade das rodovias." },
          { id: "o_amd_1_3", content: "Partes interessadas do processo", is_correct: false, feedback: "Incorreto. Partes interessadas são os engenheiros, comunidade e diretores." }
        ]
      }
    },
    {
      id: "s_amd_4",
      step_type: "activity",
      title: "Exercício 2: Nota Ponderada",
      content: "Faça o cálculo matricial da nota global.",
      position: 4,
      activity: {
        id: "a_amd_2",
        activity_type: "numeric_input",
        statement: "O fornecedor A tem nota 10 em Preço (peso 0.4) e nota 5 em Qualidade (peso 0.6). Qual é a sua nota final global ponderada? (Média ponderada simples)",
        explanation: "Multiplicamos cada nota pelo respectivo peso e somamos: 10 * 0.4 + 5 * 0.6 = 4.0 + 3.0 = 7.0.",
        points: 10,
        configuration: { correct_answer: 7.0, tolerance: 0.05 }
      }
    },
    {
      id: "s_amd_5",
      step_type: "activity",
      title: "Exercício 3: Limitações de Modelos",
      content: "Entenda as premissas dos métodos de AMD.",
      position: 5,
      activity: {
        id: "a_amd_3",
        activity_type: "multiple_choice",
        statement: "Por que nenhum método multicritério garante encontrar uma decisão objetivamente ideal e perfeita?",
        explanation: "Métodos multicritério apoiam a decisão baseando-se em pesos, preferências subjetivas e critérios selecionados pelos decisores, não existindo uma decisão ideal universal.",
        points: 10,
        options: [
          { id: "o_amd_3_1", content: "Porque o resultado depende de pesos subjetivos e critérios escolhidos", is_correct: true, feedback: "Correto! Mudando os pesos ou os critérios, o fornecedor vencedor pode mudar completamente." },
          { id: "o_amd_3_2", content: "Porque os computadores erram as aproximações exatas das notas", is_correct: false, feedback: "Incorreto. O erro não é uma limitação de hardware computacional, mas conceitual do problema." },
          { id: "o_amd_3_3", content: "Porque critérios quantitativos nunca podem ser normalizados", is_correct: false, feedback: "Incorreto. Critérios quantitativos são os mais fáceis de normalizar numericamente." }
        ]
      }
    },
    {
      id: "s_amd_6",
      step_type: "summary",
      title: "Resumo de AMD",
      content: "Excelente! Você aprendeu que:<br>1. AMD estrutura decisões com múltiplos critérios.<br>2. Alternativas são as opções; critérios são os fatores de peso.<br>3. Não há decisão universal ideal; ela reflete a árvore de preferências dos tomadores de decisão.",
      position: 6
    }
  ],

  // Cálculo Numérico
  "l_num_1_1": [
    {
      id: "s_num_1",
      step_type: "text",
      title: "Aproximações Computacionais",
      content: "Na engenharia, muitos problemas matemáticos são insolúveis analiticamente. Por exemplo, equações que governam o fluxo de fluidos ou a vibração estrutural de uma asa de avião.<br><br>Os computadores resolvem esses problemas transformando-os em sequências de operações aritméticas básicas e executando iterações repetidas. No entanto, por representarem números com um número fixo de bits, as soluções são **aproximações** contendo erros inerentes.",
      position: 1
    },
    {
      id: "s_num_2",
      step_type: "simulation",
      title: "Truncamento e Erro Numérico",
      content: "Use o slider para definir a quantidade de casas decimais usadas na representação do valor real <code>1/3 = 0.33333...</code>. Observe como o <strong>Erro Absoluto</strong> e a perda de precisão variam conforme reduzimos a capacidade de representação do sistema.",
      position: 2
    },
    {
      id: "s_num_3",
      step_type: "activity",
      title: "Exercício 1: Erro Absoluto vs Relativo",
      content: "Entenda os dois indicadores fundamentais de erro.",
      position: 3,
      activity: {
        id: "a_num_1",
        activity_type: "multiple_choice",
        statement: "Qual a principal diferença entre erro absoluto e erro relativo?",
        explanation: "O erro absoluto é apenas a diferença bruta em magnitude. O erro relativo normaliza essa diferença dividindo-a pelo valor real, nos dando a proporção exata da falha.",
        points: 10,
        options: [
          { id: "o_num_1_1", content: "O absoluto é o desvio bruto, o relativo é o desvio dividido pelo valor real", is_correct: true, feedback: "Correto! O erro relativo é adimensional e nos ajuda a comparar a precisão de diferentes ordens de grandeza." },
          { id: "o_num_1_2", content: "O absoluto é sempre percentual, enquanto o relativo é expresso em milímetros", is_correct: false, feedback: "Incorreto. O erro relativo costuma ser expresso em porcentagem, e o absoluto na unidade da variável." },
          { id: "o_num_1_3", content: "O erro relativo só ocorre quando o algoritmo falha em convergir", is_correct: false, feedback: "Incorreto. O erro relativo existe em qualquer aproximação, mesmo em convergência estável." }
        ]
      }
    },
    {
      id: "s_num_4",
      step_type: "activity",
      title: "Exercício 2: Cálculo de Erro",
      content: "Pratique o cálculo do desvio de aproximação.",
      position: 4,
      activity: {
        id: "a_num_2",
        activity_type: "numeric_input",
        statement: "Se o valor real de uma constante física é 5.0 e a aproximação calculada pelo algoritmo é 4.8, qual é o erro absoluto?",
        explanation: "Erro Absoluto = |Valor Real - Valor Aproximado| = |5.0 - 4.8| = 0.2.",
        points: 10,
        configuration: { correct_answer: 0.2, tolerance: 0.01 }
      }
    },
    {
      id: "s_num_5",
      step_type: "activity",
      title: "Exercício 3: Erro de Truncamento",
      content: "Compreenda a causa do erro de truncamento.",
      position: 5,
      activity: {
        id: "a_num_3",
        activity_type: "multiple_choice",
        statement: "O que causa o erro de truncamento em algoritmos numéricos iterativos?",
        explanation: "O erro de truncamento ocorre quando encerramos uma série matemática infinita em um termo finito (por exemplo, parando uma soma infinita no décimo termo).",
        points: 10,
        options: [
          { id: "o_num_3_1", content: "Parar um processo de cálculo infinito após um número finito de passos", is_correct: true, feedback: "Correto! Truncamos a série infinita para que o computador termine o processamento." },
          { id: "o_num_3_2", content: "O ruído eletromagnético que afeta os cabos de rede", is_correct: false, feedback: "Incorreto. Ruído elétrico afeta transmissão, não a lógica do truncamento matemático." },
          { id: "o_num_3_3", content: "Um erro de digitação cometido pelo programador do algoritmo", is_correct: false, feedback: "Incorreto. Erros de digitação são bugs de código, enquanto truncamento é uma decisão de discretização." }
        ]
      }
    },
    {
      id: "s_num_6",
      step_type: "summary",
      title: "Resumo de Cálculo Numérico",
      content: "Excelente! Você completou a lição e aprendeu:<br>1. Computadores aproximam soluções porque trabalham de forma finita.<br>2. Erro absoluto mede a diferença direta; erro relativo mede a proporção.<br>3. Truncamento decorre de encerrar passos infinitos em termos finitos.",
      position: 6
    }
  ],

  // Ciência dos Materiais
  "l_mat_1_1": [
    {
      id: "s_mat_1",
      step_type: "text",
      title: "O Tetraedro de Materiais",
      content: "A Ciência dos Materiais baseia-se na forte correlação entre 4 vértices fundamentais:<br>1. **Processamento:** Como o material é fabricado (fundição, tratamentos térmicos).<br>2. **Estrutura:** O arranjo atômico interno (ligações, redes cristalinas).<br>3. **Propriedades:** O comportamento físico e mecânico (resistência, ductilidade).<br>4. **Desempenho:** Como a peça se comporta em operação real.<br><br>Para projetar estruturas seguras, precisamos compreender como submeter um corpo de prova a forças físicas e interpretar suas deformações.",
      position: 1
    },
    {
      id: "s_mat_2",
      step_type: "simulation",
      title: "Ensaio de Tração de Amostras",
      content: "Selecione o material (Aço ou Cerâmica) e deslize o slider para aplicar <strong>tensão (força)</strong> na peça. Acompanhe a curva de <strong>deformação</strong> resultante e veja onde a peça sofre escoamento e, por fim, ruptura na simulação física.",
      position: 2
    },
    {
      id: "s_mat_3",
      step_type: "activity",
      title: "Exercício 1: Ligações Químicas",
      content: "Mapeie o comportamento atômico.",
      position: 3,
      activity: {
        id: "a_mat_1",
        activity_type: "multiple_choice",
        statement: "Qual ligação atômica é caracterizada por uma 'nuvem' de elétrons deslocalizados e livres, que gera alta condutividade elétrica nos metais?",
        explanation: "A ligação metálica compartilha elétrons de valência livremente em um 'mar de elétrons', conferindo excelentes propriedades condutoras aos metais.",
        points: 10,
        options: [
          { id: "o_mat_1_1", content: "Ligação metálica", is_correct: true, feedback: "Correto! A mobilidade dos elétrons livres é responsável pela condutividade e ductilidade metálica." },
          { id: "o_mat_1_2", content: "Ligação iônica", is_correct: false, feedback: "Incorreto. Ligações iônicas prendem elétrons em íons fixos, sendo isolantes elétricos em estado sólido." },
          { id: "o_mat_1_3", content: "Ligação covalente", is_correct: false, feedback: "Incorreto. Ligações covalentes compartilham elétrons de forma altamente direcional e localizada." }
        ]
      }
    },
    {
      id: "s_mat_4",
      step_type: "activity",
      title: "Exercício 2: Cálculo de Tensão",
      content: "Pratique o cálculo da tensão mecânica.",
      position: 4,
      activity: {
        id: "a_mat_2",
        activity_type: "numeric_input",
        statement: "Um cabo metálico com área transversal de 10 mm² é submetido a uma carga de tração de 500 N. Qual é a tensão mecânica aplicada em megapascais (MPa)? (Dica: Tensão = Força / Área)",
        explanation: "Tensão = Força / Área = 500 N / 10 mm² = 50 N/mm² = 50 MPa.",
        points: 10,
        configuration: { correct_answer: 50, tolerance: 0.0 }
      }
    },
    {
      id: "s_mat_5",
      step_type: "activity",
      title: "Exercício 3: Região de Deformação",
      content: "Analise os limites de deformação do material.",
      position: 5,
      activity: {
        id: "a_mat_3",
        activity_type: "multiple_choice",
        statement: "No ensaio de tração, qual o nome do ponto que marca a transição entre a deformação elástica (reversível) e a deformação plástica (permanente)?",
        explanation: "O limite de escoamento é o ponto em que o material sofre tensão suficiente para começar a se deformar plasticamente (de forma irreversível).",
        points: 10,
        options: [
          { id: "o_mat_3_1", content: "Limite de escoamento", is_correct: true, feedback: "Correto! Acima do escoamento, o material sofre deformações permanentes irreversíveis." },
          { id: "o_mat_3_2", content: "Limite de resiliência", is_correct: false, feedback: "Incorreto. Resiliência é a capacidade de absorver energia na região elástica, não o ponto divisor." },
          { id: "o_mat_3_3", content: "Ponto de fratura final", is_correct: false, feedback: "Incorreto. A fratura é o ponto em que o corpo de prova se rompe completamente, muito após o início da fase plástica." }
        ]
      }
    },
    {
      id: "s_mat_6",
      step_type: "summary",
      title: "Resumo de Materiais",
      content: "Excelente! Você completou a lição e aprendeu:<br>1. O tetraedro correlaciona Processamento -> Estrutura -> Propriedades -> Desempenho.<br>2. A ligação metálica explica a alta condutividade dos metais.<br>3. Tensão é força sobre área (N/mm² ou MPa).<br>4. O escoamento delimita as deformações elástica e plástica.",
      position: 6
    }
  ],

  // ────────────────────────────────────────────────────────────────
  // ÁLGEBRA LINEAR — Módulos 2 a 6
  // ────────────────────────────────────────────────────────────────
  "l_alg_2_1": [
    {
      id: "s_alg2_1", step_type: "text", title: "O que é uma Matriz?", position: 1,
      content: "Uma <strong>matriz</strong> é uma tabela retangular de números organizada em linhas e colunas. Na engenharia, usamos matrizes para representar custos, fluxos e coeficientes de sistemas.<br><br>Notação: uma matriz A de dimensão <em>m × n</em> possui m linhas e n colunas. Cada elemento é designado por A<sub>ij</sub>, onde i é a linha e j é a coluna."
    },
    {
      id: "s_alg2_2", step_type: "example", title: "Caso Industrial: Tabela de Insumos", position: 2,
      content: "Uma fábrica produz 3 produtos usando 2 insumos. A matriz de consumo C = [[2, 1], [4, 3], [0, 5]] representa as quantidades de cada insumo por produto. Cada linha é um produto e cada coluna é um tipo de insumo."
    },
    {
      id: "s_alg2_3", step_type: "activity", title: "Exercício: Dimensão de Matrizes", position: 3,
      activity: {
        id: "a_alg2_1", activity_type: "multiple_choice",
        statement: "Uma matriz possui 3 linhas e 4 colunas. Qual é a dimensão correta dessa matriz?",
        explanation: "A dimensão de uma matriz é sempre expressa como (número de linhas) × (número de colunas). Portanto, 3 linhas e 4 colunas formam uma matriz 3×4.",
        points: 10,
        options: [
          { id: "o_alg2_1_1", content: "3 × 4", is_correct: true, feedback: "Correto! Linhas × Colunas = 3 × 4." },
          { id: "o_alg2_1_2", content: "4 × 3", is_correct: false, feedback: "Incorreto. A convenção é linhas × colunas, não o inverso." },
          { id: "o_alg2_1_3", content: "12 × 1", is_correct: false, feedback: "Incorreto. Isso seria um vetor coluna com 12 elementos." }
        ]
      }
    },
    {
      id: "s_alg2_4", step_type: "activity", title: "Exercício: Elemento de Matriz", position: 4,
      activity: {
        id: "a_alg2_2", activity_type: "numeric_input",
        statement: "Na matriz B = [[5, 2], [8, 3], [1, 7]], qual é o valor do elemento B₂₁ (linha 2, coluna 1)?",
        explanation: "B₂₁ corresponde à linha 2 (segunda linha) e coluna 1 (primeira coluna). Na segunda linha temos [8, 3], então B₂₁ = 8.",
        points: 10,
        configuration: { correct_answer: 8, tolerance: 0 }
      }
    },
    {
      id: "s_alg2_5", step_type: "summary", title: "Resumo: Matrizes", position: 5,
      content: "Você aprendeu que:<br>1. Matrizes são tabelas com m linhas e n colunas.<br>2. Cada elemento A<sub>ij</sub> é identificado pela linha i e coluna j.<br>3. Matrizes são essenciais para representar sistemas de equações e dados industriais."
    }
  ],

  "l_alg_3_1": [
    {
      id: "s_alg3_1", step_type: "text", title: "Sistemas Lineares e Eliminação de Gauss", position: 1,
      content: "Um <strong>sistema linear</strong> é um conjunto de equações do primeiro grau. A eliminação de Gauss é um método para resolver sistemas transformando a matriz aumentada em forma escalonada.<br><br>O processo:<br>1. Montar a matriz aumentada [A|b].<br>2. Usar operações de linha para criar zeros abaixo do pivô.<br>3. Substituição retroativa para encontrar as variáveis."
    },
    {
      id: "s_alg3_2", step_type: "example", title: "Exemplo: Alocação de Recursos", position: 2,
      content: "Para alocar dois tipos de máquinas (x e y) com restrições: 2x + y = 10 e x + 3y = 12. Montamos a matriz [[2,1|10],[1,3|12]] e eliminamos para encontrar x = 3.6, y = 2.8."
    },
    {
      id: "s_alg3_3", step_type: "activity", title: "Exercício: Operação de Linha", position: 3,
      activity: {
        id: "a_alg3_1", activity_type: "multiple_choice",
        statement: "Na eliminação de Gauss, qual operação de linha é permitida para criar zeros abaixo do pivô?",
        explanation: "Operações elementares de linha incluem: trocar linhas, multiplicar linha por escalar não-nulo, e somar múltiplo de uma linha em outra.",
        points: 10,
        options: [
          { id: "o_alg3_1_1", content: "Somar a uma linha um múltiplo de outra linha", is_correct: true, feedback: "Correto! Essa operação elementar preserva o conjunto solução." },
          { id: "o_alg3_1_2", content: "Multiplicar um elemento individual por um escalar", is_correct: false, feedback: "Incorreto. Devemos multiplicar a linha inteira, não apenas um elemento." },
          { id: "o_alg3_1_3", content: "Adicionar uma constante a todos os elementos", is_correct: false, feedback: "Incorreto. Isso altera o sistema de equações." }
        ]
      }
    },
    {
      id: "s_alg3_4", step_type: "activity", title: "Exercício: Solução de Sistema", position: 4,
      activity: {
        id: "a_alg3_2", activity_type: "numeric_input",
        statement: "No sistema: x + y = 7 e x - y = 3. Qual é o valor de x?",
        explanation: "Somando as equações: 2x = 10 → x = 5. Verificando: 5 + y = 7 → y = 2.",
        points: 10,
        configuration: { correct_answer: 5, tolerance: 0 }
      }
    },
    {
      id: "s_alg3_5", step_type: "summary", title: "Resumo: Sistemas Lineares", position: 5,
      content: "Você aprendeu que:<br>1. Sistemas lineares podem ser resolvidos pela eliminação de Gauss.<br>2. A matriz aumentada [A|b] representa o sistema completo.<br>3. Operações elementares de linha preservam o conjunto solução."
    }
  ],

  "l_alg_4_1": [
    {
      id: "s_alg4_1", step_type: "text", title: "Espaços Vetoriais e Dependência Linear", position: 1,
      content: "Um <strong>espaço vetorial</strong> é um conjunto de vetores que pode ser somado e multiplicado por escalares, obedecendo a axiomas algébricos.<br><br>Vetores são <strong>linearmente dependentes</strong> quando um pode ser escrito como combinação linear dos outros. São <strong>independentes</strong> quando nenhum pode."
    },
    {
      id: "s_alg4_2", step_type: "example", title: "Exemplo: Base de um Espaço", position: 2,
      content: "Os vetores e₁ = [1,0] e e₂ = [0,1] formam a base canônica do ℝ². Qualquer vetor [a,b] = a·e₁ + b·e₂. Dois vetores paralelos, como [1,2] e [2,4], são linearmente dependentes."
    },
    {
      id: "s_alg4_3", step_type: "activity", title: "Exercício: Dependência Linear", position: 3,
      activity: {
        id: "a_alg4_1", activity_type: "multiple_choice",
        statement: "Os vetores v₁ = [1, 2] e v₂ = [3, 6] são linearmente dependentes ou independentes?",
        explanation: "v₂ = 3·v₁ (basta multiplicar v₁ por 3). Portanto, v₂ é combinação linear de v₁: eles são linearmente dependentes.",
        points: 10,
        options: [
          { id: "o_alg4_1_1", content: "Linearmente dependentes, pois v₂ = 3·v₁", is_correct: true, feedback: "Correto! Um é múltiplo escalar do outro, logo são dependentes." },
          { id: "o_alg4_1_2", content: "Linearmente independentes, pois têm magnitudes diferentes", is_correct: false, feedback: "Incorreto. Independência não depende da magnitude, mas da direção." },
          { id: "o_alg4_1_3", content: "Não é possível determinar sem mais informações", is_correct: false, feedback: "Incorreto. Com os vetores explícitos é possível verificar diretamente." }
        ]
      }
    },
    {
      id: "s_alg4_4", step_type: "activity", title: "Exercício: Dimensão do Espaço", position: 4,
      activity: {
        id: "a_alg4_2", activity_type: "numeric_input",
        statement: "Qual é a dimensão do espaço ℝ³ (vetores de 3 componentes)?",
        explanation: "A dimensão de ℝ³ é 3, pois uma base mínima desse espaço possui 3 vetores linearmente independentes: e₁=[1,0,0], e₂=[0,1,0], e₃=[0,0,1].",
        points: 10,
        configuration: { correct_answer: 3, tolerance: 0 }
      }
    },
    {
      id: "s_alg4_5", step_type: "summary", title: "Resumo: Espaços Vetoriais", position: 5,
      content: "Você aprendeu que:<br>1. Espaços vetoriais seguem axiomas de soma e produto por escalar.<br>2. Vetores LI não podem ser escritos como combinação linear entre si.<br>3. A dimensão de um espaço é o número de vetores na sua base."
    }
  ],

  "l_alg_5_1": [
    {
      id: "s_alg5_1", step_type: "text", title: "Transformações Lineares", position: 1,
      content: "Uma <strong>transformação linear</strong> T: ℝⁿ → ℝᵐ é uma função que preserva soma e multiplicação escalar:<br>• T(u + v) = T(u) + T(v)<br>• T(c·v) = c·T(v)<br><br>Exemplos: rotação, escala, projeção e reflexão de vetores."
    },
    {
      id: "s_alg5_2", step_type: "example", title: "Exemplo: Rotação de 90°", position: 2,
      content: "A matriz de rotação de 90° em sentido anti-horário é R = [[0,-1],[1,0]]. Aplicando em v=[1,0]: R·v = [0,1]. O vetor foi girado 90° para cima."
    },
    {
      id: "s_alg5_3", step_type: "activity", title: "Exercício: Transformação Linear", position: 3,
      activity: {
        id: "a_alg5_1", activity_type: "multiple_choice",
        statement: "A transformação T(x,y) = (2x, 2y) representa qual operação geométrica?",
        explanation: "Multiplicar ambas as componentes por 2 equivale a dobrar o comprimento do vetor sem alterar sua direção, ou seja, é uma escala (homotetia) de fator 2.",
        points: 10,
        options: [
          { id: "o_alg5_1_1", content: "Escala uniforme por fator 2 (ampliação)", is_correct: true, feedback: "Correto! Cada componente é multiplicada pelo mesmo fator." },
          { id: "o_alg5_1_2", content: "Rotação de 90° em sentido horário", is_correct: false, feedback: "Incorreto. Uma rotação de 90° troca e nega componentes." },
          { id: "o_alg5_1_3", content: "Reflexão em relação ao eixo X", is_correct: false, feedback: "Incorreto. A reflexão em X seria T(x,y) = (x, -y)." }
        ]
      }
    },
    {
      id: "s_alg5_4", step_type: "activity", title: "Exercício: Aplicação de Transformação", position: 4,
      activity: {
        id: "a_alg5_2", activity_type: "numeric_input",
        statement: "Aplicando a transformação T(x,y) = (3x, 3y) ao vetor [2, 4], qual é a componente X do resultado?",
        explanation: "T(2, 4) = (3·2, 3·4) = (6, 12). A componente X é 6.",
        points: 10,
        configuration: { correct_answer: 6, tolerance: 0 }
      }
    },
    {
      id: "s_alg5_5", step_type: "summary", title: "Resumo: Transformações Lineares", position: 5,
      content: "Você aprendeu que:<br>1. Transformações lineares preservam soma e multiplicação por escalar.<br>2. São representadas por matrizes que atuam sobre vetores.<br>3. Exemplos: rotação, escala, projeção, reflexão."
    }
  ],

  "l_alg_6_1": [
    {
      id: "s_alg6_1", step_type: "text", title: "Autovalores e Autovetores", position: 1,
      content: "Um <strong>autovetor</strong> de uma matriz A é um vetor v ≠ 0 tal que A·v = λ·v, onde λ é o <strong>autovalor</strong> correspondente.<br><br>Geometricamente, aplicar A a um autovetor apenas escala o vetor por λ, sem mudar sua direção. Isso é fundamental em análise de componentes principais, vibração estrutural e estabilidade de sistemas."
    },
    {
      id: "s_alg6_2", step_type: "example", title: "Exemplo: Sistema Dinâmico", position: 2,
      content: "Para A = [[3,0],[0,2]], os autovetores são e₁=[1,0] com autovalor 3 e e₂=[0,1] com autovalor 2. A·e₁ = [3,0] = 3·[1,0]. A direção do vetor não muda, apenas sua magnitude."
    },
    {
      id: "s_alg6_3", step_type: "activity", title: "Exercício: Autovetor", position: 3,
      activity: {
        id: "a_alg6_1", activity_type: "multiple_choice",
        statement: "Se A·v = 5·v, o que podemos afirmar sobre o vetor v?",
        explanation: "Por definição, se A·v = λ·v com v ≠ 0, então v é um autovetor de A com autovalor λ = 5.",
        points: 10,
        options: [
          { id: "o_alg6_1_1", content: "v é autovetor de A com autovalor 5", is_correct: true, feedback: "Correto! Pela definição, A·v = 5·v → autovalor 5." },
          { id: "o_alg6_1_2", content: "v é perpendicular a A", is_correct: false, feedback: "Incorreto. Perpendicularidade envolve produto interno, não esta equação." },
          { id: "o_alg6_1_3", content: "v é a inversa da coluna de A", is_correct: false, feedback: "Incorreto. Inversa matricial é outro conceito." }
        ]
      }
    },
    {
      id: "s_alg6_4", step_type: "activity", title: "Exercício: Autovalor de Matriz Diagonal", position: 4,
      activity: {
        id: "a_alg6_2", activity_type: "numeric_input",
        statement: "Para a matriz diagonal D = [[4,0],[0,7]], qual é o maior autovalor?",
        explanation: "Para matrizes diagonais, os autovalores são os próprios elementos da diagonal. Os autovalores são 4 e 7. O maior é 7.",
        points: 10,
        configuration: { correct_answer: 7, tolerance: 0 }
      }
    },
    {
      id: "s_alg6_5", step_type: "summary", title: "Resumo: Autovalores e Autovetores", position: 5,
      content: "Você aprendeu que:<br>1. Autovetores mantêm sua direção ao ser transformados por A.<br>2. Autovalores indicam o fator de escala da transformação nessa direção.<br>3. Aplicações: PCA, vibração, estabilidade de sistemas dinâmicos."
    }
  ],

  // ────────────────────────────────────────────────────────────────
  // AMD — Módulos 2 a 7
  // ────────────────────────────────────────────────────────────────
  "l_amd_2_1": [
    {
      id: "s_amd2_1", step_type: "text", title: "Construindo a Matriz de Decisão", position: 1,
      content: "A <strong>matriz de decisão</strong> organiza as notas de cada alternativa em cada critério. Linhas são as alternativas; colunas são os critérios.<br><br>Para construí-la:<br>1. Liste as alternativas (opções disponíveis).<br>2. Defina os critérios de avaliação.<br>3. Atribua notas a cada alternativa em cada critério."
    },
    {
      id: "s_amd2_2", step_type: "example", title: "Exemplo: Seleção de Fornecedores", position: 2,
      content: "Critérios: Preço (benefício: menor é melhor), Qualidade (benefício: maior é melhor).<br>Fornecedor A: Preço=8, Qualidade=6. Fornecedor B: Preço=5, Qualidade=9.<br>Matriz = [[8,6],[5,9]]."
    },
    {
      id: "s_amd2_3", step_type: "activity", title: "Exercício: Critérios de Custo vs. Benefício", position: 3,
      activity: {
        id: "a_amd2_1", activity_type: "multiple_choice",
        statement: "No AMD, o critério 'Prazo de entrega em dias' é classificado como critério de custo ou de benefício?",
        explanation: "Um prazo menor é preferível (reduz lead time). Portanto, é critério de custo: quanto menor, melhor o desempenho da alternativa.",
        points: 10,
        options: [
          { id: "o_amd2_1_1", content: "Critério de custo (menor é melhor)", is_correct: true, feedback: "Correto! Prazos menores são preferíveis → critério de custo." },
          { id: "o_amd2_1_2", content: "Critério de benefício (maior é melhor)", is_correct: false, feedback: "Incorreto. Prazos maiores significam mais espera, o que é desvantajoso." },
          { id: "o_amd2_1_3", content: "Depende do decisor e não pode ser classificado", is_correct: false, feedback: "Incorreto. Pela natureza do atributo, prazos são critérios de custo." }
        ]
      }
    },
    {
      id: "s_amd2_4", step_type: "activity", title: "Exercício: Leitura da Matriz", position: 4,
      activity: {
        id: "a_amd2_2", activity_type: "numeric_input",
        statement: "Na matriz de decisão abaixo, qual a nota da Alternativa B no Critério 2?\n\nMatriz = [[7, 5], [4, 9]]\n(Linha 1 = Alt A, Linha 2 = Alt B; Coluna 1 = Critério 1, Coluna 2 = Critério 2)",
        explanation: "A Alternativa B é a linha 2: [4, 9]. O Critério 2 é a coluna 2. Portanto, a nota é 9.",
        points: 10,
        configuration: { correct_answer: 9, tolerance: 0 }
      }
    },
    {
      id: "s_amd2_5", step_type: "summary", title: "Resumo: Matriz de Decisão", position: 5,
      content: "Você aprendeu que:<br>1. A matriz de decisão organiza alternativas × critérios.<br>2. Critérios de custo: menor é melhor. Critérios de benefício: maior é melhor.<br>3. A matriz é a base de todos os métodos AMD."
    }
  ],

  "l_amd_3_1": [
    {
      id: "s_amd3_1", step_type: "text", title: "Pesos e Normalização de Critérios", position: 1,
      content: "Os <strong>pesos</strong> expressam a importância relativa de cada critério. Para que a média ponderada seja coerente, os pesos devem somar 1,0 (ou 100%).<br><br>Normalização: w₁ + w₂ + ... + wₙ = 1.<br>Nota ponderada: ΣᵢNᵢ·wᵢ"
    },
    {
      id: "s_amd3_2", step_type: "example", title: "Exemplo: Normalização de Pesos", position: 2,
      content: "Se atribuímos importância bruta: Preço=40, Qualidade=40, Prazo=20. Soma = 100. Pesos normalizados: w₁=0.4, w₂=0.4, w₃=0.2."
    },
    {
      id: "s_amd3_3", step_type: "activity", title: "Exercício: Normalização", position: 3,
      activity: {
        id: "a_amd3_1", activity_type: "multiple_choice",
        statement: "Os pesos brutos de três critérios são 3, 5 e 2. Qual é o peso normalizado do segundo critério?",
        explanation: "Soma total = 3+5+2 = 10. Peso normalizado do critério 2 = 5/10 = 0.5.",
        points: 10,
        options: [
          { id: "o_amd3_1_1", content: "0.5 (50%)", is_correct: true, feedback: "Correto! 5 ÷ 10 = 0.5." },
          { id: "o_amd3_1_2", content: "0.3 (30%)", is_correct: false, feedback: "Incorreto. 3/10 seria o peso do primeiro critério." },
          { id: "o_amd3_1_3", content: "5.0 sem normalização", is_correct: false, feedback: "Incorreto. Pesos não normalizados levam a médias fora da escala." }
        ]
      }
    },
    {
      id: "s_amd3_4", step_type: "activity", title: "Exercício: Nota Ponderada", position: 4,
      activity: {
        id: "a_amd3_2", activity_type: "numeric_input",
        statement: "Uma alternativa tem notas [6, 8, 7] nos critérios com pesos [0.3, 0.5, 0.2]. Qual é sua nota global ponderada?",
        explanation: "Nota = 6×0.3 + 8×0.5 + 7×0.2 = 1.8 + 4.0 + 1.4 = 7.2.",
        points: 10,
        configuration: { correct_answer: 7.2, tolerance: 0.05 }
      }
    },
    {
      id: "s_amd3_5", step_type: "summary", title: "Resumo: Pesos e Normalização", position: 5,
      content: "Você aprendeu que:<br>1. Pesos expressam a importância relativa dos critérios.<br>2. Pesos normalizados somam 1.0 para manter a escala da nota.<br>3. A nota global é a soma ponderada das notas individuais."
    }
  ],

  "l_amd_4_1": [
    {
      id: "s_amd4_1", step_type: "text", title: "Método AHP: Comparações Par a Par", position: 1,
      content: "O <strong>Analytic Hierarchy Process (AHP)</strong>, de Thomas Saaty, usa comparações par a par para derivar pesos de forma mais rigorosa. Usa uma escala de 1 a 9:<br>• 1 = igualmente importante<br>• 3 = moderadamente mais importante<br>• 5 = fortemente mais importante<br>• 9 = extremamente mais importante"
    },
    {
      id: "s_amd4_2", step_type: "example", title: "Exemplo: Matriz de Comparação", position: 2,
      content: "Comparando Preço (P) e Qualidade (Q): se P é moderadamente mais importante que Q, inserimos 3 na posição (P, Q) e 1/3 na posição (Q, P). A diagonal sempre é 1 (critério comparado consigo mesmo)."
    },
    {
      id: "s_amd4_3", step_type: "activity", title: "Exercício: Escala de Saaty", position: 3,
      activity: {
        id: "a_amd4_1", activity_type: "multiple_choice",
        statement: "Na escala de Saaty, se o critério A é 'fortemente mais importante' que o critério B, qual valor inserimos na posição (A, B) da matriz de comparação?",
        explanation: "Na escala de Saaty, 'fortemente mais importante' corresponde ao valor 5.",
        points: 10,
        options: [
          { id: "o_amd4_1_1", content: "5", is_correct: true, feedback: "Correto! Intensidade 5 = fortemente mais importante." },
          { id: "o_amd4_1_2", content: "3", is_correct: false, feedback: "Incorreto. Intensidade 3 = moderadamente mais importante." },
          { id: "o_amd4_1_3", content: "9", is_correct: false, feedback: "Incorreto. Intensidade 9 = extremamente mais importante." }
        ]
      }
    },
    {
      id: "s_amd4_4", step_type: "activity", title: "Exercício: Valor Recíproco", position: 4,
      activity: {
        id: "a_amd4_2", activity_type: "numeric_input",
        statement: "Na matriz AHP, se A(P,Q) = 4, qual é o valor de A(Q,P)?",
        explanation: "A propriedade de reciprocidade do AHP exige A(Q,P) = 1/A(P,Q) = 1/4 = 0.25.",
        points: 10,
        configuration: { correct_answer: 0.25, tolerance: 0.01 }
      }
    },
    {
      id: "s_amd4_5", step_type: "summary", title: "Resumo: Método AHP", position: 5,
      content: "Você aprendeu que:<br>1. O AHP usa comparações par a par com a escala de Saaty (1 a 9).<br>2. A matriz de comparação é recíproca: A(i,j) = 1/A(j,i).<br>3. A diagonal principal contém apenas 1s."
    }
  ],

  "l_amd_5_1": [
    {
      id: "s_amd5_1", step_type: "text", title: "Método TOPSIS: Proximidade à Solução Ideal", position: 1,
      content: "O <strong>TOPSIS</strong> (Technique for Order of Preference by Similarity to Ideal Solution) classifica alternativas por sua proximidade à solução ideal positiva (A+) e negativa (A-).<br><br>Quanto mais próxima de A+ e mais distante de A-, melhor é a alternativa."
    },
    {
      id: "s_amd5_2", step_type: "example", title: "Exemplo: Soluções Ideais", position: 2,
      content: "Para critérios de benefício, A+ é o maior valor em cada coluna. Para critérios de custo, A+ é o menor valor. O coeficiente de proximidade C = d⁻/(d+ + d⁻) varia de 0 a 1; quanto maior, melhor."
    },
    {
      id: "s_amd5_3", step_type: "activity", title: "Exercício: Solução Ideal TOPSIS", position: 3,
      activity: {
        id: "a_amd5_1", activity_type: "multiple_choice",
        statement: "No TOPSIS, para um critério de custo (menor é melhor), como é definida a solução ideal positiva A+?",
        explanation: "Para critérios de custo, a solução ideal positiva A+ corresponde ao menor valor na coluna desse critério, pois um valor menor de custo é o 'melhor' desempenho.",
        points: 10,
        options: [
          { id: "o_amd5_1_1", content: "O menor valor da coluna do critério", is_correct: true, feedback: "Correto! Para custo, menor = ideal positivo." },
          { id: "o_amd5_1_2", content: "O maior valor da coluna do critério", is_correct: false, feedback: "Incorreto. O maior custo seria a pior situação (ideal negativo)." },
          { id: "o_amd5_1_3", content: "A média dos valores da coluna do critério", is_correct: false, feedback: "Incorreto. O TOPSIS usa extremos, não médias." }
        ]
      }
    },
    {
      id: "s_amd5_4", step_type: "activity", title: "Exercício: Coeficiente de Proximidade", position: 4,
      activity: {
        id: "a_amd5_2", activity_type: "numeric_input",
        statement: "Uma alternativa tem distância d+ = 2 e d- = 8. Qual é seu coeficiente de proximidade C?",
        explanation: "C = d⁻/(d⁺ + d⁻) = 8/(2 + 8) = 8/10 = 0.8. Quanto mais próximo de 1, melhor.",
        points: 10,
        configuration: { correct_answer: 0.8, tolerance: 0.01 }
      }
    },
    {
      id: "s_amd5_5", step_type: "summary", title: "Resumo: Método TOPSIS", position: 5,
      content: "Você aprendeu que:<br>1. TOPSIS classifica alternativas pela proximidade à solução ideal.<br>2. A+ é a solução ideal positiva; A- é a solução ideal negativa.<br>3. O coeficiente C = d⁻/(d⁺+d⁻) é o ranking final."
    }
  ],

  "l_amd_6_1": [
    {
      id: "s_amd6_1", step_type: "text", title: "Método ELECTRE: Sobreclassificação", position: 1,
      content: "O <strong>ELECTRE</strong> usa relações de sobreclassificação: alternativa A sobreclassifica B se for ao menos tão boa em critérios suficientemente importantes e não muito pior nos demais.<br><br>Dois índices-chave:<br>• Índice de <strong>concordância</strong>: fração dos pesos em que A ≥ B.<br>• Índice de <strong>discordância</strong>: máxima desvantagem de A sobre B."
    },
    {
      id: "s_amd6_2", step_type: "example", title: "Exemplo: Concordância", position: 2,
      content: "Se A supera ou empata B em critérios com pesos [0.4, 0.4] e perde no critério com peso [0.2], o índice de concordância c(A,B) = 0.4+0.4 = 0.8. Se c(A,B) ≥ limiar de concordância, A sobreclassifica B nesses critérios."
    },
    {
      id: "s_amd6_3", step_type: "activity", title: "Exercício: Índice de Concordância", position: 3,
      activity: {
        id: "a_amd6_1", activity_type: "multiple_choice",
        statement: "O índice de concordância c(A,B) é alto quando:",
        explanation: "Alta concordância significa que A supera ou empata B na maioria dos critérios mais importantes, ou seja, há grande suporte à sobreclassificação.",
        points: 10,
        options: [
          { id: "o_amd6_1_1", content: "A supera B na maioria dos critérios com maior peso", is_correct: true, feedback: "Correto! Alta concordância = amplo suporte ponderado à superioridade de A." },
          { id: "o_amd6_1_2", content: "A perde para B em todos os critérios", is_correct: false, feedback: "Incorreto. Isso resultaria em baixíssima concordância." },
          { id: "o_amd6_1_3", content: "Os pesos de todos os critérios somam mais de 1", is_correct: false, feedback: "Incorreto. Os pesos devem somar exatamente 1 no modelo normalizado." }
        ]
      }
    },
    {
      id: "s_amd6_4", step_type: "activity", title: "Exercício: Cálculo de Concordância", position: 4,
      activity: {
        id: "a_amd6_2", activity_type: "numeric_input",
        statement: "A supera B nos critérios com pesos 0.35, 0.25 e empata no critério com peso 0.20. Perde no critério com peso 0.20. Qual é o índice de concordância c(A,B)?",
        explanation: "Soma os pesos onde A >= B: 0.35 + 0.25 + 0.20 = 0.80.",
        points: 10,
        configuration: { correct_answer: 0.80, tolerance: 0.01 }
      }
    },
    {
      id: "s_amd6_5", step_type: "summary", title: "Resumo: Método ELECTRE", position: 5,
      content: "Você aprendeu que:<br>1. ELECTRE é não-compensatório: uma vantagem não pode apagar uma grande desvantagem.<br>2. Concordância mede o suporte à superioridade de A sobre B.<br>3. Discordância mede a máxima desvantagem de A em relação a B."
    }
  ],

  "l_amd_7_1": [
    {
      id: "s_amd7_1", step_type: "text", title: "Análise de Sensibilidade em AMD", position: 1,
      content: "Uma decisão robusta mantém o mesmo ranking das alternativas mesmo quando os pesos dos critérios variam dentro de uma faixa razoável.<br><br>A análise de sensibilidade identifica:<br>• Quais critérios mais influenciam o resultado.<br>• Até onde um peso pode variar sem mudar a decisão final."
    },
    {
      id: "s_amd7_2", step_type: "example", title: "Exemplo: Robustez da Decisão", position: 2,
      content: "Se o Fornecedor A vence com pesos w₁=0.4, e continua vencendo com w₁ entre 0.3 e 0.6, a decisão é robusta nesse intervalo. Se mudar o resultado ao sair de 0.4 para 0.41, a decisão é frágil."
    },
    {
      id: "s_amd7_3", step_type: "activity", title: "Exercício: Sensibilidade", position: 3,
      activity: {
        id: "a_amd7_1", activity_type: "multiple_choice",
        statement: "Uma decisão AMD é considerada robusta quando:",
        explanation: "Robustez significa que a conclusão (ranking das alternativas) não muda significativamente com pequenas variações nos parâmetros de entrada.",
        points: 10,
        options: [
          { id: "o_amd7_1_1", content: "O ranking das alternativas se mantém mesmo com variações nos pesos", is_correct: true, feedback: "Correto! Robustez = estabilidade do resultado frente a perturbações." },
          { id: "o_amd7_1_2", content: "Todos os critérios têm o mesmo peso", is_correct: false, feedback: "Incorreto. Pesos iguais não garantem robustez, apenas uniformidade." },
          { id: "o_amd7_1_3", content: "Existe apenas uma alternativa no modelo", is_correct: false, feedback: "Incorreto. Com uma alternativa não há decisão a tomar." }
        ]
      }
    },
    {
      id: "s_amd7_4", step_type: "activity", title: "Exercício: Impacto do Peso", position: 4,
      activity: {
        id: "a_amd7_2", activity_type: "numeric_input",
        statement: "Se os pesos normalizados de 4 critérios são [0.4, 0.3, 0.2, 0.1] e o peso do critério 1 aumenta para 0.5, qual deve ser a soma dos outros 3 pesos?",
        explanation: "A soma de todos os pesos normalizados deve ser sempre 1.0. Se o critério 1 = 0.5, os outros somam 1.0 - 0.5 = 0.5.",
        points: 10,
        configuration: { correct_answer: 0.5, tolerance: 0.01 }
      }
    },
    {
      id: "s_amd7_5", step_type: "summary", title: "Resumo: Sensibilidade e Robustez", position: 5,
      content: "Você aprendeu que:<br>1. Análise de sensibilidade verifica a estabilidade da decisão.<br>2. Decisões robustas mantêm o ranking mesmo com variações nos pesos.<br>3. É essencial comunicar a faixa de robustez aos tomadores de decisão."
    }
  ],

  // ────────────────────────────────────────────────────────────────
  // CÁLCULO NUMÉRICO — Módulos 2 a 8
  // ────────────────────────────────────────────────────────────────
  "l_num_2_1": [
    {
      id: "s_num2_1", step_type: "text", title: "Método da Bisseção", position: 1,
      content: "O <strong>método da bisseção</strong> encontra a raiz de f(x) = 0 em um intervalo [a, b] onde f(a)·f(b) < 0 (sinais opostos).<br><br>Algoritmo:<br>1. Calcule o ponto médio: x_m = (a + b) / 2.<br>2. Se f(x_m) = 0, x_m é a raiz.<br>3. Se f(a)·f(x_m) < 0, a raiz está em [a, x_m]. Senão, em [x_m, b].<br>4. Repita até atingir precisão desejada."
    },
    {
      id: "s_num2_2", step_type: "example", title: "Exemplo: Encontrando a Raiz", position: 2,
      content: "f(x) = x² - 4 tem raiz em x=2. Intervalo inicial [1, 3]: f(1)=-3, f(3)=5 (sinais opostos). x_m=2.0 → f(2.0)=0. Raiz encontrada na primeira iteração!"
    },
    {
      id: "s_num2_3", step_type: "activity", title: "Exercício: Ponto Médio", position: 3,
      activity: {
        id: "a_num2_1", activity_type: "numeric_input",
        statement: "Para o intervalo [2, 6], qual é o ponto médio x_m calculado na primeira iteração da bisseção?",
        explanation: "x_m = (a + b) / 2 = (2 + 6) / 2 = 8 / 2 = 4.",
        points: 10,
        configuration: { correct_answer: 4, tolerance: 0 }
      }
    },
    {
      id: "s_num2_4", step_type: "activity", title: "Exercício: Condição de Bolzano", position: 4,
      activity: {
        id: "a_num2_2", activity_type: "multiple_choice",
        statement: "Para garantir que existe uma raiz no intervalo [a, b], qual condição deve ser satisfeita?",
        explanation: "O teorema de Bolzano exige que f(a)·f(b) < 0, ou seja, f(a) e f(b) tenham sinais opostos. Isso garante que a curva cruza o eixo x no intervalo.",
        points: 10,
        options: [
          { id: "o_num2_2_1", content: "f(a) · f(b) < 0 (sinais opostos)", is_correct: true, feedback: "Correto! Sinais opostos garantem que a função cruza zero no intervalo." },
          { id: "o_num2_2_2", content: "f(a) + f(b) = 0", is_correct: false, feedback: "Incorreto. A soma pode ser zero sem que haja cruzamento do eixo no intervalo." },
          { id: "o_num2_2_3", content: "f(a) = f(b)", is_correct: false, feedback: "Incorreto. Valores iguais indicam simetria, não necessariamente raiz." }
        ]
      }
    },
    {
      id: "s_num2_5", step_type: "summary", title: "Resumo: Método da Bisseção", position: 5,
      content: "Você aprendeu que:<br>1. A bisseção divide o intervalo pela metade a cada iteração.<br>2. Requer f(a)·f(b) < 0 pelo teorema de Bolzano.<br>3. Convergência lenta mas garantida para funções contínuas."
    }
  ],

  "l_num_3_1": [
    {
      id: "s_num3_1", step_type: "text", title: "Métodos Iterativos para Sistemas Lineares", position: 1,
      content: "Os métodos de <strong>Jacobi</strong> e <strong>Gauss-Seidel</strong> resolvem sistemas Ax = b iterativamente, partindo de uma estimativa inicial x⁰ e atualizando as variáveis até convergir.<br><br>Jacobi: atualiza todas as variáveis simultaneamente com os valores da iteração anterior.<br>Gauss-Seidel: usa os valores atualizados imediatamente."
    },
    {
      id: "s_num3_2", step_type: "example", title: "Exemplo: Iteração de Jacobi", position: 2,
      content: "Sistema: 4x₁ + x₂ = 9 e x₁ + 3x₂ = 7. Isolando: x₁ = (9 - x₂)/4 e x₂ = (7 - x₁)/3. Partindo de x⁰=[0,0]: x¹₁=(9-0)/4=2.25, x¹₂=(7-0)/3=2.33. Itera até convergir."
    },
    {
      id: "s_num3_3", step_type: "activity", title: "Exercício: Convergência de Jacobi vs Gauss-Seidel", position: 3,
      activity: {
        id: "a_num3_1", activity_type: "multiple_choice",
        statement: "Qual método iterativo geralmente converge mais rápido: Jacobi ou Gauss-Seidel?",
        explanation: "Gauss-Seidel converge mais rápido pois usa os valores mais recentes das variáveis em cada passo da iteração, acelerando o processo.",
        points: 10,
        options: [
          { id: "o_num3_1_1", content: "Gauss-Seidel, pois usa valores atualizados imediatamente", is_correct: true, feedback: "Correto! O uso imediato dos novos valores acelera a convergência." },
          { id: "o_num3_1_2", content: "Jacobi, pois é mais simples de implementar", is_correct: false, feedback: "Incorreto. Simplicidade não implica velocidade de convergência." },
          { id: "o_num3_1_3", content: "Ambos convergem na mesma velocidade", is_correct: false, feedback: "Incorreto. Gauss-Seidel tipicamente converge mais rápido." }
        ]
      }
    },
    {
      id: "s_num3_4", step_type: "activity", title: "Exercício: Critério de Parada", position: 4,
      activity: {
        id: "a_num3_2", activity_type: "numeric_input",
        statement: "Se nas iterações sucessivas x⁽ᵏ⁾ = 3.00 e x⁽ᵏ⁺¹⁾ = 3.05, qual é o erro absoluto entre as iterações?",
        explanation: "|x⁽ᵏ⁺¹⁾ - x⁽ᵏ⁾| = |3.05 - 3.00| = 0.05.",
        points: 10,
        configuration: { correct_answer: 0.05, tolerance: 0.001 }
      }
    },
    {
      id: "s_num3_5", step_type: "summary", title: "Resumo: Métodos Iterativos", position: 5,
      content: "Você aprendeu que:<br>1. Jacobi e Gauss-Seidel são métodos iterativos para sistemas lineares.<br>2. Gauss-Seidel converge mais rápido que Jacobi na maioria dos casos.<br>3. O critério de parada compara iterações consecutivas pelo erro absoluto."
    }
  ],

  "l_num_4_1": [
    {
      id: "s_num4_1", step_type: "text", title: "Interpolação de Lagrange e Newton", position: 1,
      content: "A <strong>interpolação</strong> estima valores intermediários a partir de um conjunto de pontos conhecidos.<br><br>Fórmula de Lagrange para n+1 pontos:<br>P(x) = Σᵢ yᵢ · Lᵢ(x)<br>onde Lᵢ(x) = ∏ⱼ≠ᵢ (x - xⱼ)/(xᵢ - xⱼ)"
    },
    {
      id: "s_num4_2", step_type: "example", title: "Exemplo: Interpolação Linear", position: 2,
      content: "Pontos: (0, 1) e (2, 5). Interpolando em x=1: P(1) = 1·(1-2)/(0-2) + 5·(1-0)/(2-0) = 1·(0.5) + 5·(0.5) = 0.5 + 2.5 = 3."
    },
    {
      id: "s_num4_3", step_type: "activity", title: "Exercício: Interpolação Linear", position: 3,
      activity: {
        id: "a_num4_1", activity_type: "numeric_input",
        statement: "Dados os pontos (1, 4) e (3, 10), use interpolação linear para estimar o valor de f(2).",
        explanation: "Interpolação linear: f(2) = 4 + (10-4)/(3-1) × (2-1) = 4 + 3 × 1 = 7.",
        points: 10,
        configuration: { correct_answer: 7, tolerance: 0 }
      }
    },
    {
      id: "s_num4_4", step_type: "activity", title: "Exercício: Limitação da Interpolação", position: 4,
      activity: {
        id: "a_num4_2", activity_type: "multiple_choice",
        statement: "Qual é o principal risco ao usar um polinômio interpolador de grau muito alto?",
        explanation: "O fenômeno de Runge: polinômios de grau elevado oscilam violentamente entre os pontos de interpolação, gerando grandes erros nas extremidades do intervalo.",
        points: 10,
        options: [
          { id: "o_num4_2_1", content: "Oscilações violentas (fenômeno de Runge) entre os pontos", is_correct: true, feedback: "Correto! Polinômios de alto grau sofrem com instabilidade numérica." },
          { id: "o_num4_2_2", content: "O polinômio se torna linear independentemente dos dados", is_correct: false, feedback: "Incorreto. Um grau maior implica mais flexibilidade, não linearidade." },
          { id: "o_num4_2_3", content: "Impossibilidade de calcular para valores inteiros", is_correct: false, feedback: "Incorreto. O grau do polinômio não restringe o domínio de avaliação." }
        ]
      }
    },
    {
      id: "s_num4_5", step_type: "summary", title: "Resumo: Interpolação", position: 5,
      content: "Você aprendeu que:<br>1. Interpolação estima valores entre pontos conhecidos.<br>2. Lagrange e Newton são os principais métodos polinomiais.<br>3. Polinômios de alto grau podem oscilar (fenômeno de Runge)."
    }
  ],

  "l_num_5_1": [
    {
      id: "s_num5_1", step_type: "text", title: "Ajuste de Curvas por Mínimos Quadrados", position: 1,
      content: "O <strong>método dos mínimos quadrados</strong> encontra a curva (reta, parábola, etc.) que minimiza a soma dos quadrados dos resíduos entre os dados e o modelo.<br><br>Para regressão linear y = a + bx:<br>b = (n·Σxy - Σx·Σy) / (n·Σx² - (Σx)²)<br>a = (Σy - b·Σx) / n"
    },
    {
      id: "s_num5_2", step_type: "example", title: "Exemplo: Regressão Linear de Sensores", position: 2,
      content: "Dados de um sensor de temperatura: x=[1,2,3] horas, y=[20,22,24]°C. Regressão: b=(3·128-6·66)/(3·14-36)=(384-396)/(42-36)=-12/6=-2... aguarde, aqui b=2 e a=18. A reta y=18+2x ajusta perfeitamente."
    },
    {
      id: "s_num5_3", step_type: "activity", title: "Exercício: Resíduo", position: 3,
      activity: {
        id: "a_num5_1", activity_type: "multiple_choice",
        statement: "O que é o resíduo no ajuste de curvas por mínimos quadrados?",
        explanation: "O resíduo é a diferença entre o valor observado (real) e o valor estimado pelo modelo: e_i = y_i - ŷ_i.",
        points: 10,
        options: [
          { id: "o_num5_1_1", content: "A diferença entre o valor real e o valor estimado pelo modelo", is_correct: true, feedback: "Correto! Resíduo = y_real - y_modelo." },
          { id: "o_num5_1_2", content: "A derivada da função de ajuste", is_correct: false, feedback: "Incorreto. A derivada é usada na otimização, mas não é o resíduo." },
          { id: "o_num5_1_3", content: "O erro de truncamento do algoritmo", is_correct: false, feedback: "Incorreto. Erro de truncamento é diferente de resíduo de ajuste." }
        ]
      }
    },
    {
      id: "s_num5_4", step_type: "activity", title: "Exercício: Previsão com Regressão", position: 4,
      activity: {
        id: "a_num5_2", activity_type: "numeric_input",
        statement: "A reta de regressão ajustada para dados de produção é y = 5 + 3x. Para x=4 horas, qual é a produção prevista y?",
        explanation: "y = 5 + 3×4 = 5 + 12 = 17.",
        points: 10,
        configuration: { correct_answer: 17, tolerance: 0 }
      }
    },
    {
      id: "s_num5_5", step_type: "summary", title: "Resumo: Ajuste de Curvas", position: 5,
      content: "Você aprendeu que:<br>1. Mínimos quadrados minimiza a soma dos quadrados dos resíduos.<br>2. A regressão linear encontra a melhor reta para os dados.<br>3. Resíduo = valor real − valor estimado."
    }
  ],

  "l_num_6_1": [
    {
      id: "s_num6_1", step_type: "text", title: "Diferenciação Numérica por Diferenças Finitas", position: 1,
      content: "Quando não temos a função analítica, estimamos derivadas por <strong>diferenças finitas</strong>:<br><br>• Progressiva: f'(x) ≈ [f(x+h) - f(x)] / h<br>• Regressiva: f'(x) ≈ [f(x) - f(x-h)] / h<br>• Central: f'(x) ≈ [f(x+h) - f(x-h)] / (2h)<br><br>A central tem erro de ordem O(h²), mais precisa que as outras O(h)."
    },
    {
      id: "s_num6_2", step_type: "example", title: "Exemplo: Taxa de Variação de Temperatura", position: 2,
      content: "Temperatura em um reator: T(1.0)=100°C, T(1.1)=103°C, T(1.2)=107°C. Diferença progressiva em x=1.0: dT/dt ≈ (103-100)/0.1 = 30°C/unidade. Diferença central em x=1.1: dT/dt ≈ (107-100)/0.2 = 35°C/unidade."
    },
    {
      id: "s_num6_3", step_type: "activity", title: "Exercício: Diferença Progressiva", position: 3,
      activity: {
        id: "a_num6_1", activity_type: "numeric_input",
        statement: "Dado f(2) = 8 e f(2.5) = 11, use a diferença progressiva (h=0.5) para estimar f'(2).",
        explanation: "f'(2) ≈ [f(2+h) - f(2)] / h = [11 - 8] / 0.5 = 3 / 0.5 = 6.",
        points: 10,
        configuration: { correct_answer: 6, tolerance: 0.01 }
      }
    },
    {
      id: "s_num6_4", step_type: "activity", title: "Exercício: Diferença Central vs. Progressiva", position: 4,
      activity: {
        id: "a_num6_2", activity_type: "multiple_choice",
        statement: "Por que a diferença central é mais precisa que a progressiva ou regressiva?",
        explanation: "A diferença central tem erro de truncamento de ordem O(h²), enquanto progressiva e regressiva têm erro O(h). Para h pequeno, O(h²) << O(h), tornando a central muito mais precisa.",
        points: 10,
        options: [
          { id: "o_num6_2_1", content: "Porque seu erro de truncamento é de ordem O(h²) versus O(h)", is_correct: true, feedback: "Correto! A ordem quadrática reduz o erro muito mais rapidamente." },
          { id: "o_num6_2_2", content: "Porque usa mais pontos e assim cancela erros maiores", is_correct: false, feedback: "Incorreto. A precisão vem da ordem do erro, não da quantidade de pontos." },
          { id: "o_num6_2_3", content: "Porque não depende do passo h", is_correct: false, feedback: "Incorreto. Todos os métodos de diferenças finitas dependem de h." }
        ]
      }
    },
    {
      id: "s_num6_5", step_type: "summary", title: "Resumo: Diferenciação Numérica", position: 5,
      content: "Você aprendeu que:<br>1. Diferenças finitas estimam derivadas numericamente.<br>2. Progressiva e regressiva têm erro O(h).<br>3. Central é mais precisa com erro O(h²)."
    }
  ],

  "l_num_7_1": [
    {
      id: "s_num7_1", step_type: "text", title: "Integração Numérica: Trapézios e Simpson", position: 1,
      content: "Quando a integral analítica é impossível ou complexa, usamos métodos numéricos:<br><br>• <strong>Regra dos Trapézios</strong>: aproxima a área por trapézios. Erro O(h²).<br>• <strong>Regra de Simpson 1/3</strong>: usa parábolas. Erro O(h⁴).<br><br>Trapézios: I ≈ (h/2)·[f(a) + 2Σf(xᵢ) + f(b)]"
    },
    {
      id: "s_num7_2", step_type: "example", title: "Exemplo: Área sob Curva de Produção", position: 2,
      content: "Produção horária em intervalos: f(0)=10, f(1)=14, f(2)=16 unidades/h. Regra dos trapézios com h=1: I = (1/2)·[10 + 2·14 + 16] = (1/2)·54 = 27 unidades no intervalo [0,2]."
    },
    {
      id: "s_num7_3", step_type: "activity", title: "Exercício: Regra dos Trapézios", position: 3,
      activity: {
        id: "a_num7_1", activity_type: "numeric_input",
        statement: "Usando a regra simples dos trapézios com f(0)=2 e f(1)=6 e h=1, qual é a estimativa da integral?",
        explanation: "I ≈ (h/2)·[f(a) + f(b)] = (1/2)·[2 + 6] = (1/2)·8 = 4.",
        points: 10,
        configuration: { correct_answer: 4, tolerance: 0 }
      }
    },
    {
      id: "s_num7_4", step_type: "activity", title: "Exercício: Simpson vs Trapézios", position: 4,
      activity: {
        id: "a_num7_2", activity_type: "multiple_choice",
        statement: "Qual método de integração numérica é geralmente mais preciso para o mesmo passo h?",
        explanation: "A regra de Simpson tem erro O(h⁴), muito menor que O(h²) dos Trapézios. Portanto, Simpson é mais preciso para o mesmo passo.",
        points: 10,
        options: [
          { id: "o_num7_2_1", content: "Simpson 1/3, com erro de ordem O(h⁴)", is_correct: true, feedback: "Correto! A ordem quártica do erro torna Simpson significativamente mais preciso." },
          { id: "o_num7_2_2", content: "Trapézios, por ser mais simples de calcular", is_correct: false, feedback: "Incorreto. Simplicidade não implica maior precisão." },
          { id: "o_num7_2_3", content: "Ambos têm precisão equivalente", is_correct: false, feedback: "Incorreto. Simpson tem erro de ordem muito menor que trapézios." }
        ]
      }
    },
    {
      id: "s_num7_5", step_type: "summary", title: "Resumo: Integração Numérica", position: 5,
      content: "Você aprendeu que:<br>1. Trapézios aproximam a área por figuras trapezoidais com erro O(h²).<br>2. Simpson usa parábolas com erro O(h⁴), mais preciso.<br>3. Métodos compostos repetem as regras em subintervalos para maior precisão."
    }
  ],

  "l_num_8_1": [
    {
      id: "s_num8_1", step_type: "text", title: "Equações Diferenciais: Método de Euler", position: 1,
      content: "O <strong>método de Euler</strong> resolve problemas de valor inicial (PVI): dy/dx = f(x,y), y(x₀) = y₀.<br><br>Fórmula: yₙ₊₁ = yₙ + h·f(xₙ, yₙ)<br><br>Avança a solução em passos h usando a derivada no ponto atual. É simples mas acumula erro O(h) por passo."
    },
    {
      id: "s_num8_2", step_type: "example", title: "Exemplo: Resfriamento de Componente", position: 2,
      content: "dT/dt = -0.2T, T(0)=100°C. Euler com h=0.5:<br>T(0.5) = 100 + 0.5·(-0.2·100) = 100 - 10 = 90°C.<br>T(1.0) = 90 + 0.5·(-0.2·90) = 90 - 9 = 81°C."
    },
    {
      id: "s_num8_3", step_type: "activity", title: "Exercício: Passo de Euler", position: 3,
      activity: {
        id: "a_num8_1", activity_type: "numeric_input",
        statement: "Para dy/dx = 2x com y(0)=0 e h=1, qual é o valor de y(1) pelo método de Euler?",
        explanation: "y(1) = y(0) + h·f(x₀, y₀) = 0 + 1·f(0,0) = 0 + 1·(2·0) = 0. Nota: Euler usa a derivada em x₀=0, que é f(0)=2·0=0.",
        points: 10,
        configuration: { correct_answer: 0, tolerance: 0 }
      }
    },
    {
      id: "s_num8_4", step_type: "activity", title: "Exercício: Euler vs Runge-Kutta", position: 4,
      activity: {
        id: "a_num8_2", activity_type: "multiple_choice",
        statement: "Qual a principal vantagem do método de Runge-Kutta (RK4) sobre o método de Euler?",
        explanation: "RK4 usa 4 avaliações da função por passo e tem erro de truncamento local O(h⁵), muito menor que O(h²) do Euler, resultando em muito maior precisão para o mesmo passo h.",
        points: 10,
        options: [
          { id: "o_num8_2_1", content: "RK4 tem erro O(h⁵) por passo, muito menor que O(h²) do Euler", is_correct: true, feedback: "Correto! RK4 é mais preciso ao custo de mais avaliações por passo." },
          { id: "o_num8_2_2", content: "RK4 requer menos cálculos por passo que Euler", is_correct: false, feedback: "Incorreto. RK4 requer 4 avaliações da função vs 1 do Euler." },
          { id: "o_num8_2_3", content: "Euler e RK4 têm a mesma precisão para passos pequenos", is_correct: false, feedback: "Incorreto. A diferença de ordem de erro é significativa mesmo para h pequeno." }
        ]
      }
    },
    {
      id: "s_num8_5", step_type: "summary", title: "Resumo: Equações Diferenciais Numéricas", position: 5,
      content: "Você aprendeu que:<br>1. O método de Euler avança PVIs em passos usando a derivada local.<br>2. Euler tem erro O(h) simples, acumulando imprecisão ao longo das iterações.<br>3. Runge-Kutta (RK4) é muito mais preciso com erro O(h⁵) por passo."
    }
  ],

  // ────────────────────────────────────────────────────────────────
  // CIÊNCIA DOS MATERIAIS — Módulos 2 a 7
  // ────────────────────────────────────────────────────────────────
  "l_mat_2_1": [
    {
      id: "s_mat2_1", step_type: "text", title: "Estrutura Atômica e Ligações Primárias", position: 1,
      content: "As <strong>ligações primárias</strong> determinam as propriedades fundamentais dos materiais:<br><br>• <strong>Metálica</strong>: mar de elétrons livres → condutividade, ductilidade.<br>• <strong>Iônica</strong>: atração entre íons + e - → cerâmicas duras e frágeis.<br>• <strong>Covalente</strong>: compartilhamento direcional → diamante, polímeros."
    },
    {
      id: "s_mat2_2", step_type: "example", title: "Exemplo: NaCl e Diamante", position: 2,
      content: "NaCl (sal de cozinha): ligação iônica. Na⁺ e Cl⁻ se atraem fortemente. Alta dureza mas frágil sob impacto, pois íons não deslizam facilmente.<br>Diamante: ligação covalente C-C extremamente forte e direcional → material mais duro da natureza."
    },
    {
      id: "s_mat2_3", step_type: "activity", title: "Exercício: Tipo de Ligação", position: 3,
      activity: {
        id: "a_mat2_1", activity_type: "multiple_choice",
        statement: "O cobre (Cu) conduz eletricidade com facilidade e pode ser deformado sem quebrar. Qual tipo de ligação atômica explica essas propriedades?",
        explanation: "A ligação metálica cria um mar de elétrons livres que conduzem eletricidade e permitem o deslizamento de planos atômicos, conferindo ductilidade.",
        points: 10,
        options: [
          { id: "o_mat2_1_1", content: "Ligação metálica", is_correct: true, feedback: "Correto! Elétrons livres = condutividade + ductilidade." },
          { id: "o_mat2_1_2", content: "Ligação covalente", is_correct: false, feedback: "Incorreto. Covalente é direcional e rígida, não condutora." },
          { id: "o_mat2_1_3", content: "Ligação iônica", is_correct: false, feedback: "Incorreto. Ligações iônicas resultam em materiais frágeis e maus condutores." }
        ]
      }
    },
    {
      id: "s_mat2_4", step_type: "activity", title: "Exercício: Dureza e Ligações", position: 4,
      activity: {
        id: "a_mat2_2", activity_type: "numeric_input",
        statement: "O diamante tem dureza 10 na escala de Mohs. O cobre tem dureza 3. Qual a diferença de dureza entre eles na escala de Mohs?",
        explanation: "Diferença = 10 - 3 = 7 na escala de Mohs.",
        points: 10,
        configuration: { correct_answer: 7, tolerance: 0 }
      }
    },
    {
      id: "s_mat2_5", step_type: "summary", title: "Resumo: Ligações Atômicas", position: 5,
      content: "Você aprendeu que:<br>1. Ligações metálicas: condutividade e ductilidade.<br>2. Ligações iônicas: cerâmicas duras e frágeis.<br>3. Ligações covalentes: alta dureza e resistência direcional."
    }
  ],

  "l_mat_3_1": [
    {
      id: "s_mat3_1", step_type: "text", title: "Estruturas Cristalinas: Célula Unitária", position: 1,
      content: "A <strong>célula unitária</strong> é a menor unidade repetitiva que representa a estrutura cristalina de um material.<br><br>Principais tipos cúbicos:<br>• <strong>CS (Cúbica Simples)</strong>: átomos apenas nos vértices.<br>• <strong>CCC (Corpo Centrado)</strong>: vértices + 1 átomo no centro.<br>• <strong>CFC (Face Centrada)</strong>: vértices + 1 átomo em cada face."
    },
    {
      id: "s_mat3_2", step_type: "example", title: "Exemplo: Átomos Efetivos na CCC", position: 2,
      content: "Na estrutura CCC: 8 átomos nos vértices × (1/8 por vértice) = 1 átomo. Mais 1 átomo no centro = 2 átomos efetivos por célula unitária. O ferro (Fe) e o cromo (Cr) são CCC à temperatura ambiente."
    },
    {
      id: "s_mat3_3", step_type: "activity", title: "Exercício: Átomos Efetivos na CFC", position: 3,
      activity: {
        id: "a_mat3_1", activity_type: "multiple_choice",
        statement: "Quantos átomos efetivos existem em uma célula unitária cúbica de face centrada (CFC)?",
        explanation: "CFC: 8 vértices × (1/8) = 1 átomo + 6 faces × (1/2) = 3 átomos. Total = 4 átomos efetivos. O alumínio e o cobre têm estrutura CFC.",
        points: 10,
        options: [
          { id: "o_mat3_1_1", content: "4 átomos efetivos", is_correct: true, feedback: "Correto! 1 (vértices) + 3 (faces) = 4 átomos por célula CFC." },
          { id: "o_mat3_1_2", content: "2 átomos efetivos", is_correct: false, feedback: "Incorreto. 2 é o número da estrutura CCC, não CFC." },
          { id: "o_mat3_1_3", content: "8 átomos efetivos", is_correct: false, feedback: "Incorreto. Os átomos dos vértices são compartilhados entre 8 células." }
        ]
      }
    },
    {
      id: "s_mat3_4", step_type: "activity", title: "Exercício: Átomos Efetivos na CCC", position: 4,
      activity: {
        id: "a_mat3_2", activity_type: "numeric_input",
        statement: "Quantos átomos efetivos existem em uma célula cúbica de corpo centrado (CCC)?",
        explanation: "CCC: 8 vértices × (1/8) = 1 átomo + 1 átomo no centro = 2 átomos efetivos.",
        points: 10,
        configuration: { correct_answer: 2, tolerance: 0 }
      }
    },
    {
      id: "s_mat3_5", step_type: "summary", title: "Resumo: Estruturas Cristalinas", position: 5,
      content: "Você aprendeu que:<br>1. CS tem 1 átomo efetivo, CCC tem 2, CFC tem 4 por célula.<br>2. A estrutura cristalina influencia densidade, ductilidade e resistência.<br>3. Fe é CCC à temperatura ambiente; Al e Cu são CFC."
    }
  ],

  "l_mat_4_1": [
    {
      id: "s_mat4_1", step_type: "text", title: "Propriedades Mecânicas: Ensaio de Tração", position: 1,
      content: "O <strong>ensaio de tração</strong> submete um corpo de prova a uma força crescente e mede a deformação resultante. A curva Tensão × Deformação revela:<br>• <strong>Limite de proporcionalidade</strong>: início do comportamento linear.<br>• <strong>Limite de escoamento</strong>: fim da região elástica (deformação permanente começa).<br>• <strong>Resistência à tração</strong>: tensão máxima suportada.<br>• <strong>Ruptura</strong>: fratura do corpo de prova."
    },
    {
      id: "s_mat4_2", step_type: "example", title: "Exemplo: Leitura da Curva", position: 2,
      content: "Aço AISI 1020: limite de escoamento ≈ 210 MPa, resistência à tração ≈ 380 MPa. Ao aplicar tensão abaixo de 210 MPa, o material se deforma elasticamente e recupera ao retirar a carga."
    },
    {
      id: "s_mat4_3", step_type: "activity", title: "Exercício: Módulo de Elasticidade", position: 3,
      activity: {
        id: "a_mat4_1", activity_type: "multiple_choice",
        statement: "O módulo de elasticidade (Módulo de Young) é calculado na região elástica da curva tensão-deformação. O que ele representa fisicamente?",
        explanation: "O módulo de Young E = σ/ε é a rigidez do material: quanto de tensão é necessário para produzir uma unidade de deformação na região elástica.",
        points: 10,
        options: [
          { id: "o_mat4_1_1", content: "A rigidez do material na região elástica (razão σ/ε)", is_correct: true, feedback: "Correto! E = σ/ε mede a resistência à deformação elástica." },
          { id: "o_mat4_1_2", content: "A tensão máxima antes da fratura", is_correct: false, feedback: "Incorreto. Isso é a resistência à tração, não o módulo de Young." },
          { id: "o_mat4_1_3", content: "A energia absorvida até a fratura", is_correct: false, feedback: "Incorreto. Isso seria a tenacidade do material." }
        ]
      }
    },
    {
      id: "s_mat4_4", step_type: "activity", title: "Exercício: Cálculo de Deformação", position: 4,
      activity: {
        id: "a_mat4_2", activity_type: "numeric_input",
        statement: "Um material com E = 200 GPa é submetido a uma tensão de 100 MPa (na região elástica). Qual é a deformação elástica ε resultante? (Use: ε = σ/E, com unidades consistentes)",
        explanation: "ε = σ/E = 100 MPa / 200 000 MPa = 0.0005.",
        points: 10,
        configuration: { correct_answer: 0.0005, tolerance: 0.00005 }
      }
    },
    {
      id: "s_mat4_5", step_type: "summary", title: "Resumo: Propriedades Mecânicas", position: 5,
      content: "Você aprendeu que:<br>1. O ensaio de tração revela escoamento, resistência e deformação.<br>2. Módulo de Young E = σ/ε define a rigidez na região elástica.<br>3. Após o escoamento, a deformação é permanente (plástica)."
    }
  ],

  "l_mat_5_1": [
    {
      id: "s_mat5_1", step_type: "text", title: "Diagramas de Fase e Regra da Alavanca", position: 1,
      content: "Um <strong>diagrama de fase</strong> mostra as fases de equilíbrio de um sistema em função de temperatura e composição.<br><br>A <strong>regra da alavanca</strong> determina a fração de cada fase em uma liga:<br>• Fração da fase α = (C_β - C₀)/(C_β - C_α)<br>• Fração da fase β = (C₀ - C_α)/(C_β - C_α)"
    },
    {
      id: "s_mat5_2", step_type: "example", title: "Exemplo: Liga Ferro-Carbono", position: 2,
      content: "No diagrama Fe-C, a 0.8% C e 727°C está o ponto eutetóide. Acima: austenita (fase γ). Abaixo: perlita (ferrita + cementita). Conhecer o diagrama permite projetar tratamentos térmicos."
    },
    {
      id: "s_mat5_3", step_type: "activity", title: "Exercício: Interpretação de Fase", position: 3,
      activity: {
        id: "a_mat5_1", activity_type: "multiple_choice",
        statement: "No diagrama de fases, o ponto eutetóide do aço representa:",
        explanation: "O ponto eutetóide do sistema Fe-C ocorre a 0.76% C e 727°C. Nesse ponto, a austenita (fase sólida γ) se transforma em perlita (mistura de ferrita + cementita) ao resfriamento.",
        points: 10,
        options: [
          { id: "o_mat5_1_1", content: "A composição e temperatura em que austenita → perlita (ferrita + cementita)", is_correct: true, feedback: "Correto! O eutetóide Fe-C é a 0.76%C e 727°C." },
          { id: "o_mat5_1_2", content: "O ponto de fusão do ferro puro", is_correct: false, feedback: "Incorreto. O ferro puro funde a 1538°C, longe do eutetóide." },
          { id: "o_mat5_1_3", content: "A fronteira entre aço e ferro fundido", is_correct: false, feedback: "Incorreto. Essa fronteira fica em torno de 2.14% C (ponto eutetético)." }
        ]
      }
    },
    {
      id: "s_mat5_4", step_type: "activity", title: "Exercício: Regra da Alavanca", position: 4,
      activity: {
        id: "a_mat5_2", activity_type: "numeric_input",
        statement: "Em uma liga com composição C₀=0.4%C a uma temperatura em que C_α=0.02%C e C_β=0.76%C, qual é a fração da fase β (cementita/austenita de carbono alto)?",
        explanation: "Fração β = (C₀ - C_α)/(C_β - C_α) = (0.4 - 0.02)/(0.76 - 0.02) = 0.38/0.74 ≈ 0.514.",
        points: 10,
        configuration: { correct_answer: 0.514, tolerance: 0.01 }
      }
    },
    {
      id: "s_mat5_5", step_type: "summary", title: "Resumo: Diagramas de Fase", position: 5,
      content: "Você aprendeu que:<br>1. Diagramas de fase mostram fases de equilíbrio em função de T e composição.<br>2. A regra da alavanca calcula frações de cada fase.<br>3. O ponto eutetóide Fe-C está a 0.76%C e 727°C."
    }
  ],

  "l_mat_6_1": [
    {
      id: "s_mat6_1", step_type: "text", title: "Tratamentos Térmicos em Ligas Ferro-Carbono", position: 1,
      content: "Os <strong>tratamentos térmicos</strong> modificam a microestrutura e propriedades mecânicas do aço:<br><br>• <strong>Recozimento</strong>: aquecimento lento e resfriamento lento → material mole e dúctil.<br>• <strong>Normalização</strong>: resfriamento ao ar → dureza intermediária.<br>• <strong>Têmpera</strong>: resfriamento rápido (em água ou óleo) → martensite, muito duro e frágil.<br>• <strong>Revenimento</strong>: após têmpera, aquecimento moderado → reduz fragilidade."
    },
    {
      id: "s_mat6_2", step_type: "example", title: "Exemplo: Têmpera e Revenimento", position: 2,
      content: "Aço 1045 temperado em água: dureza ≈ 60 HRC, fragilidade alta. Após revenimento a 400°C: dureza ≈ 45 HRC, tenacidade muito melhorada. O conjunto é chamado de aço beneficiado."
    },
    {
      id: "s_mat6_3", step_type: "activity", title: "Exercício: Identificar o Tratamento", position: 3,
      activity: {
        id: "a_mat6_1", activity_type: "multiple_choice",
        statement: "Um aço é aquecido acima da temperatura de austenitização e então resfriado rapidamente em água. Qual tratamento térmico é esse e qual microestrutura é formada?",
        explanation: "O resfriamento rápido (quenching) impede a difusão do carbono, formando martensite, uma fase extremamente dura e metaestável.",
        points: 10,
        options: [
          { id: "o_mat6_1_1", content: "Têmpera → formação de martensite (dura e frágil)", is_correct: true, feedback: "Correto! Resfriamento brusco = têmpera = martensite." },
          { id: "o_mat6_1_2", content: "Recozimento → formação de ferrita e perlita (moles)", is_correct: false, feedback: "Incorreto. Recozimento é resfriamento lento, não rápido." },
          { id: "o_mat6_1_3", content: "Revenimento → redução de fragilidade da martensite", is_correct: false, feedback: "Incorreto. Revenimento é feito após a têmpera, não substitui ela." }
        ]
      }
    },
    {
      id: "s_mat6_4", step_type: "activity", title: "Exercício: Efeito do Revenimento", position: 4,
      activity: {
        id: "a_mat6_2", activity_type: "multiple_choice",
        statement: "Qual é o principal objetivo do processo de revenimento (tempering) realizado após a têmpera?",
        explanation: "A martensite formada na têmpera é muito dura mas também muito frágil. O revenimento aquece o aço a temperatura moderada, permitindo alívio de tensões e alguma difusão de carbono, aumentando a tenacidade sem perder muita dureza.",
        points: 10,
        options: [
          { id: "o_mat6_2_1", content: "Reduzir a fragilidade da martensite melhorando a tenacidade", is_correct: true, feedback: "Correto! O revenimento equilibra dureza e tenacidade." },
          { id: "o_mat6_2_2", content: "Aumentar a dureza além do valor obtido na têmpera", is_correct: false, feedback: "Incorreto. O revenimento geralmente reduz levemente a dureza." },
          { id: "o_mat6_2_3", content: "Reverter completamente a martensite para austenita", is_correct: false, feedback: "Incorreto. Isso exigiria temperaturas muito mais altas (austenitização completa)." }
        ]
      }
    },
    {
      id: "s_mat6_5", step_type: "summary", title: "Resumo: Tratamentos Térmicos", position: 5,
      content: "Você aprendeu que:<br>1. Têmpera: resfriamento rápido → martensite dura/frágil.<br>2. Revenimento: após têmpera → reduz fragilidade, melhora tenacidade.<br>3. Recozimento: resfriamento lento → estrutura mole e dúctil."
    }
  ],

  "l_mat_7_1": [
    {
      id: "s_mat7_1", step_type: "text", title: "Seleção Técnica de Materiais", position: 1,
      content: "A <strong>seleção de materiais</strong> é uma decisão multicritério onde equilibramos propriedades mecânicas, térmicas, custo, peso e processabilidade.<br><br>Abordagem sistemática:<br>1. Definir requisitos da aplicação.<br>2. Identificar propriedades críticas.<br>3. Filtrar materiais candidatos.<br>4. Classificar por mérito usando índices de desempenho."
    },
    {
      id: "s_mat7_2", step_type: "example", title: "Exemplo: Seleção para Estrutura Aeronáutica", position: 2,
      content: "Requisito: máxima rigidez com mínimo peso. Índice de mérito: E/ρ (módulo de Young / densidade). Materiais ranqueados: CFRP (E/ρ alto) > Ti6Al4V > Aço. O CFRP domina em aplicações aeronáuticas onde peso é crítico."
    },
    {
      id: "s_mat7_3", step_type: "activity", title: "Exercício: Seleção de Material", position: 3,
      activity: {
        id: "a_mat7_1", activity_type: "multiple_choice",
        statement: "Para uma aplicação que requer alta resistência mecânica a temperatura de 800°C com baixo estresse de impacto, qual classe de material é mais indicada?",
        explanation: "Superligas de níquel são projetadas para operar em altas temperaturas mantendo resistência mecânica. Cerâmicas funcionam mas são frágeis sob impacto. Polímeros degradam a essas temperaturas.",
        points: 10,
        options: [
          { id: "o_mat7_1_1", content: "Superligas de níquel (alta resistência a elevadas temperaturas)", is_correct: true, feedback: "Correto! Superligas Ni são o padrão para componentes de turbinas a gás." },
          { id: "o_mat7_1_2", content: "Polímero de engenharia PEEK", is_correct: false, feedback: "Incorreto. PEEK degrada bem abaixo de 800°C (limite ~250°C)." },
          { id: "o_mat7_1_3", content: "Alumínio 7075", is_correct: false, feedback: "Incorreto. Al funde a 660°C, muito abaixo da temperatura exigida." }
        ]
      }
    },
    {
      id: "s_mat7_4", step_type: "activity", title: "Exercício: Índice de Mérito", position: 4,
      activity: {
        id: "a_mat7_2", activity_type: "numeric_input",
        statement: "Material A: E=70 GPa, ρ=2.7 g/cm³. Material B: E=200 GPa, ρ=7.9 g/cm³. Qual é o índice E/ρ do material A (em GPa·cm³/g)?",
        explanation: "E/ρ (A) = 70/2.7 ≈ 25.9 GPa·cm³/g. E/ρ (B) = 200/7.9 ≈ 25.3 GPa·cm³/g. Ambos muito próximos, mas A (alumínio) supera B (aço) levemente neste índice.",
        points: 10,
        configuration: { correct_answer: 25.9, tolerance: 0.5 }
      }
    },
    {
      id: "s_mat7_5", step_type: "summary", title: "Resumo: Seleção de Materiais", position: 5,
      content: "Você aprendeu que:<br>1. Seleção de materiais é uma decisão multicritério estruturada.<br>2. Índices de mérito (ex: E/ρ) ajudam a comparar candidatos objetivamente.<br>3. Superligas para alta temperatura; CFRP para leveza e rigidez."
    }
  ]
};

class TrackerManager {
  // Retorna áreas de catálogo para o Explorar
  getExploreAreas() {
    return EXPLORE_AREAS;
  }

  // Obter lista de cursos (antigo getTracks)
  async getTracks() {
    if (window.CONFIG.isDemoMode) {
      const user = window.Auth.getCurrentUser();
      const progress = this._getDemoProgress(user?.id);

      return STATIC_COURSES.map(c => {
        const courseProgress = progress.courses[c.id] || { percentage: 0, score: 0 };
        return {
          ...c,
          progress_percentage: courseProgress.percentage,
          total_score: courseProgress.score
        };
      });
    } else {
      const user = window.Auth.getCurrentUser();
      try {
        const courses = user
          ? await axionApiRequest("/api/progress/courses")
          : await axionApiRequest("/api/courses");
        if (!courses || courses.length === 0) {
          return STATIC_COURSES.map(c => ({ ...c, progress_percentage: 0, total_score: 0 }));
        }
        return courses.map(c => ({
          ...c,
          progress_percentage: c.progress_percentage || 0,
          total_score: c.total_score || 0
        }));
      } catch (e) {
        console.error("[Axion] Falha ao buscar cursos do backend, usando fallback local.", e);
        return STATIC_COURSES.map(c => ({ ...c, progress_percentage: 0, total_score: 0 }));
      }
    }
  }

  // Obter detalhes do Curso (módulos e aulas com status de progresso)
  async getTrackDetails(courseId) {
    if (window.CONFIG.isDemoMode) {
      const user = window.Auth.getCurrentUser();
      const progress = this._getDemoProgress(user?.id);

      const modules = STATIC_MODULES.filter(m => m.course_id === courseId && m.is_published);

      // Encontrar a primeira lição que não está completada para marcar como recomendada
      let recommendedLessonId = null;
      for (const m of modules) {
        const lessons = STATIC_LESSONS.filter(l => l.module_id === m.id && l.is_published);
        const uncompleted = lessons.find(l => !progress.lessons[l.id] || progress.lessons[l.id].status !== "completed");
        if (uncompleted) {
          recommendedLessonId = uncompleted.id;
          break;
        }
      }

      const modulesWithLessons = modules.map((m, index) => {
        const lessons = STATIC_LESSONS.filter(l => l.module_id === m.id && l.is_published);

        const lessonsWithStatus = lessons.map(l => {
          const lessonProgress = progress.lessons[l.id] || { status: "available", percentage: 0 };
          let status = lessonProgress.status === "locked" ? "available" : lessonProgress.status;

          if (l.id === recommendedLessonId) {
            status = lessonProgress.status === "completed" ? "completed" : "available";
          }

          return {
            ...l,
            status,
            is_recommended: l.id === recommendedLessonId,
            progress_percentage: lessonProgress.percentage || 0
          };
        });

        // Calcular estado do módulo
        let modStatus = "não_iniciado"; // não iniciado, disponível, em andamento, concluído
        const completedCount = lessonsWithStatus.filter(l => l.status === "completed").length;
        const startedCount = lessonsWithStatus.filter(l => l.progress_percentage > 0).length;

        if (lessonsWithStatus.length === 0) {
          modStatus = "disponível";
        } else if (completedCount === lessonsWithStatus.length) {
          modStatus = "concluído";
        } else if (startedCount > 0) {
          modStatus = "em_andamento";
        } else {
          // Se for o primeiro módulo não concluído, marca como disponível, outros não iniciados
          const isFirstUncompletedModule = recommendedLessonId && lessonsWithStatus.some(l => l.id === recommendedLessonId);
          if (isFirstUncompletedModule || index === 0) {
            modStatus = "disponível";
          } else {
            modStatus = "não_iniciado";
          }
        }

        return {
          ...m,
          status: modStatus,
          lessons: lessonsWithStatus
        };
      });

      return {
        track: STATIC_COURSES.find(c => c.id === courseId),
        modules: modulesWithLessons
      };
    } else {
      const user = window.Auth.getCurrentUser();
      let course = null;
      let progressMap = {};
      try {
        course = await axionApiRequest(`/api/courses/${courseId}`);
        if (user) {
          const summary = await axionApiRequest("/api/progress/summary");
          (summary.lesson_progress || []).forEach(lp => {
            progressMap[lp.lesson_id] = { status: lp.status, percentage: lp.status === "completed" ? 100 : 0 };
          });
        }
      } catch (e) {
        console.error("[Axion] Falha ao buscar detalhes do curso no backend, usando fallback local.", e);
      }

      const activeCourse = course || STATIC_COURSES.find(c => c.id === courseId);
      const activeModules = (course && course.modules) ? course.modules : STATIC_MODULES.filter(m => m.course_id === courseId && m.is_published);

      // Encontrar a primeira lição que não está completada para marcar como recomendada
      let recommendedLessonId = null;
      for (const m of activeModules) {
        const modLessons = course ? (m.lessons || []) : STATIC_LESSONS.filter(l => l.module_id === m.id && l.is_published);
        const uncompleted = modLessons.find(l => !progressMap[l.id] || progressMap[l.id].status !== "completed");
        if (uncompleted) {
          recommendedLessonId = uncompleted.id;
          break;
        }
      }

      const processedModules = activeModules.map((m, index) => {
        const moduleLessons = course ? (m.lessons || []) : STATIC_LESSONS.filter(l => l.module_id === m.id && l.is_published);

        const lessonsWithStatus = moduleLessons.map(l => {
          const ulp = progressMap[l.id];
          let status = "available";
          let percentage = 0;

          if (ulp) {
            status = ulp.status;
            percentage = ulp.percentage;
          }

          return {
            ...l,
            status: status === "locked" ? "available" : status,
            is_recommended: l.id === recommendedLessonId,
            progress_percentage: percentage
          };
        });

        // Calcular estado do módulo
        let modStatus = "não_iniciado";
        const completedCount = lessonsWithStatus.filter(l => l.status === "completed").length;
        const startedCount = lessonsWithStatus.filter(l => l.progress_percentage > 0).length;

        if (lessonsWithStatus.length === 0) {
          modStatus = "disponível";
        } else if (completedCount === lessonsWithStatus.length) {
          modStatus = "concluído";
        } else if (startedCount > 0) {
          modStatus = "em_andamento";
        } else {
          const isFirstUncompletedModule = recommendedLessonId && lessonsWithStatus.some(l => l.id === recommendedLessonId);
          if (isFirstUncompletedModule || index === 0) {
            modStatus = "disponível";
          } else {
            modStatus = "não_iniciado";
          }
        }

        return {
          ...m,
          status: modStatus,
          lessons: lessonsWithStatus
        };
      });

      return {
        track: activeCourse,
        modules: processedModules
      };
    }
  }

  // Buscar passos e atividades de uma Aula específica
  async getLessonDetails(lessonId) {
    const getLocalLesson = async () => {
      const lesson = STATIC_LESSONS.find(l => l.id === lessonId);
      let steps = STATIC_LESSON_STEPS[lessonId] || [];

      // DYNAMIC FETCH se for da trilha de soldagem
      if (lesson) {
        const mod = STATIC_MODULES.find(m => m.id === lesson.module_id);
        if (mod && mod.course_id === "c5555555-5555-5555-5555-555555555555") {
          try {
            const resp = await fetch(`http://localhost:8000/api/questions/${mod.course_id}`);
            if (resp.ok) {
              const dbQuestions = await resp.json();
              steps = dbQuestions.map((q, idx) => {
                const optionsFormatted = q.options.map((optTxt, oIdx) => ({
                  id: `opt-${q.id}-${oIdx}`,
                  content: optTxt,
                  is_correct: oIdx === q.correct_index,
                  feedback: q.explanation,
                  position: oIdx + 1
                }));
                return {
                  id: `step-${q.id}`,
                  lesson_id: lessonId,
                  step_type: "activity",
                  title: `Questão ${idx + 1}`,
                  content: "Resolva a questão abaixo.",
                  position: idx + 1,
                  activity: {
                    id: q.id,
                    skill_id: q.skill_id,
                    activity_type: "multiple_choice",
                    statement: q.question_text,
                    explanation: q.explanation,
                    options: optionsFormatted
                  }
                };
              });
            }
          } catch (e) {
            console.error("Falha ao buscar questoes dinâmicas:", e);
          }
        }
      }


      steps.forEach(s => {
        if (s.step_type === "activity" && s.activity) {
          if (!this.generatedActivitiesCache) this.generatedActivitiesCache = {};

          this.generatedActivitiesCache[s.activity.id] = {
            id: s.activity.id,
            lesson_id: lessonId,
            skill_id:
              s.activity.skill_id ||
              window.AdaptiveEngine.getSkillForLesson(lessonId) ||
              "s_vector_rep",
            activity_type: s.activity.activity_type,
            statement: s.activity.statement,
            options_json: s.activity.options || s.activity.options_json,
            correct_answer_json:
              s.activity.activity_type === "numeric_input" &&
                s.activity.configuration
                ? s.activity.configuration.correct_answer
                : s.activity.correct_answer_json || "",
            explanation: s.activity.explanation,
            hints_json: s.activity.hints || []
          };
        }
      });

      return { lesson, steps };
    };

    if (window.CONFIG.isDemoMode) {
      return getLocalLesson();
    }

    // No banco real, uma aula é uma referência de páginas de um documento-fonte
    // (não existem "lesson_steps"/"activities" autorais). Montamos os passos
    // de exercício reaproveitando o banco de questões do módulo, do mesmo
    // jeito que o modo demo já faz para a trilha de Soldagem.
    try {
      const lesson = await axionApiRequest(`/api/lessons/${lessonId}`);
      if (!lesson) {
        console.warn("[Axion] Aula não encontrada no backend, usando fallback local.");
        return getLocalLesson();
      }

      let steps = [];
      if (lesson.steps && lesson.steps.length > 0) {
        steps = lesson.steps;
      } else {
        try {
          const dbQuestions = await axionApiRequest(`/api/questions/${lesson.module_id}?limit=10`);
          steps = (dbQuestions || []).map((q, idx) => {
            const optionsFormatted = q.options.map((optTxt, oIdx) => ({
              id: `opt-${q.id}-${oIdx}`,
              content: optTxt,
              is_correct: oIdx === q.correct_index,
              feedback: q.explanation,
              position: oIdx + 1
            }));
            return {
              id: `step-${q.id}`,
              lesson_id: lesson.id,
              step_type: "activity",
              title: `Questão ${idx + 1}`,
              content: "Resolva a questão abaixo.",
              position: idx + 1,
              activity: {
                id: q.id,
                skill_id: q.skill_id,
                activity_type: "multiple_choice",
                statement: q.question_text,
                image_path: q.image_path,
                explanation: q.explanation,
                options: optionsFormatted
              }
            };
          });
        } catch (e) {
          console.warn("[Axion] Falha ao buscar questões do módulo.", e);
        }
      }

      if (!this.generatedActivitiesCache) this.generatedActivitiesCache = {};
      steps.forEach(s => {
        if (s.activity) {
          this.generatedActivitiesCache[s.activity.id] = {
            id: s.activity.id,
            lesson_id: lesson.id,
            skill_id: s.activity.skill_id || "s_weld_general",
            activity_type: s.activity.activity_type,
            statement: s.activity.statement,
            image_path: s.activity.image_path,
            options_json: s.activity.options,
            options: s.activity.options,
            correct_answer_json: "",
            explanation: s.activity.explanation,
            hints_json: []
          };
        }
      });

      return { lesson, steps };
    } catch (error) {
      console.error("[Axion] Falha geral ao carregar aula do backend, usando fallback local.", error);
      return getLocalLesson();
    }
  }
  // Submeter resposta de exercício. Corrigido e rastreado inteiramente no
  // cliente (localStorage) — não existe uma tabela "activities/attempts" no
  // banco real; a avaliação persistida de verdade acontece via as provas
  // (ver startExamAttempt/answerExamQuestion/finishExamAttempt).
  async submitAnswer(activityId, optionId = null, numericAnswer = null, hintsCount = 0) {
    const user = window.Auth.getCurrentUser();
    const progress = this._getDemoProgress(user?.id);

    // Achar a atividade correspondente nos dados estáticos ou no cache dinâmico
    let foundActivity = null;
    let lessonId = null;
    let isDynamic = false;

    if (this.generatedActivitiesCache && this.generatedActivitiesCache[activityId]) {
      foundActivity = this.generatedActivitiesCache[activityId];
      lessonId = foundActivity.lesson_id;
      isDynamic = true;
    } else {
      for (const lesId in STATIC_LESSON_STEPS) {
        const steps = STATIC_LESSON_STEPS[lesId];
        const step = steps.find(s => s.activity && s.activity.id === activityId);
        if (step) {
          foundActivity = step.activity;
          lessonId = lesId;
          break;
        }
      }
    }

    if (!foundActivity) throw new Error("Atividade não encontrada no Modo Demo.");

    const attemptNum = progress.attempts.filter(a => a.activity_id === activityId).length + 1;
    let isCorrect = false;
    let feedback = isDynamic ? foundActivity.explanation : foundActivity.explanation;
    let pointsEarned = 0;

    if (isDynamic) {
      if (foundActivity.activity_type === "multiple_choice") {
        const opt = foundActivity.options_json.find(o => o.id === optionId);
        if (opt) {
          isCorrect = opt.is_correct;
          feedback = opt.feedback || feedback;
        }
      } else if (foundActivity.activity_type === "numeric_input") {
        const correctVal = parseFloat(foundActivity.correct_answer_json);
        isCorrect = Math.abs(parseFloat(numericAnswer) - correctVal) <= 0.05;
      }
    } else {
      if (foundActivity.activity_type === "multiple_choice") {
        const opt = foundActivity.options.find(o => o.id === optionId);
        if (opt) {
          isCorrect = opt.is_correct;
          feedback = opt.feedback || feedback;
        }
      } else if (foundActivity.activity_type === "numeric_input") {
        const correctVal = foundActivity.configuration.correct_answer;
        const tolerance = foundActivity.configuration.tolerance || 0;
        isCorrect = Math.abs(parseFloat(numericAnswer) - correctVal) <= tolerance;
      }
    }

    // 1. ATUALIZAÇÃO DA FILA DE REVISÃO E ERROS (AI MEMORY)
    let errorObj = null;
    if (!isCorrect) {
      if (isDynamic) {
        // Classificar erro de forma adaptativa
        errorObj = window.AdaptiveEngine.classifyError(foundActivity, numericAnswer, optionId);
      } else {
        // Classificar erro estático
        let type = "interpretação";
        let desc = "Dificuldade em visualizar fluxos e diagramas de engenharia.";
        if (activityId === "a_alg_1" || activityId === "a_alg_2") {
          type = "confusao_vetores";
          desc = "Acha que a magnitude não reflete a força bruta ou erra componentes cartesianas.";
        } else if (activityId === "a_amd_2") {
          type = "erro_soma_ponderada";
          desc = "Erro no cálculo matemático de pesos e normalizações de critérios.";
        } else if (activityId === "a_num_2") {
          type = "erro_calculo_erros";
          desc = "Erro de cálculo do módulo da diferença de valor absoluto.";
        } else if (activityId === "a_mat_2") {
          type = "erro_calculo_tensao";
          desc = "Erro na divisão de Força por Área para calcular a tensão em MPa.";
        }
        errorObj = { type, description: desc };
      }

      // Registrar Concepção Errônea (Misconception)
      if (errorObj) {
        const existingMiscon = progress.misconceptions.find(m => m.misconception_type === errorObj.type);
        if (existingMiscon) {
          existingMiscon.occurrence_count++;
          existingMiscon.last_detected_at = new Date().toISOString();
        } else {
          progress.misconceptions.push({
            id: window.Auth._generateUUID(),
            activity_id: activityId,
            misconception_type: errorObj.type,
            description: errorObj.description,
            occurrence_count: 1,
            last_detected_at: new Date().toISOString()
          });
        }
      }

      // Adiciona à fila de revisão do usuário se falhar com base na repetição espaçada
      const existsInQueue = progress.review_queue.some(r => r.activity_id === activityId && r.is_active);
      if (!existsInQueue) {
        const nextReview = window.AdaptiveEngine.calculateNextReview(false, 1);
        progress.review_queue.push({
          id: window.Auth._generateUUID(),
          activity_id: activityId,
          skill_id: foundActivity.skill_id || null,
          reason: errorObj ? errorObj.description : "Dificuldade no exercício interativo",
          is_active: true,
          scheduled_at: nextReview.next_review_at,
          last_result: false,
          interval_days: nextReview.interval_days,
          created_at: new Date().toISOString()
        });
      }
    } else {
      // Se acertou, remove da fila de revisão ativa
      progress.review_queue = progress.review_queue.filter(r => r.activity_id !== activityId);
    }

    // Ganha pontos apenas no primeiro acerto
    const alreadyCleared = progress.attempts.some(a => a.activity_id === activityId && a.is_correct);
    if (isCorrect && !alreadyCleared) {
      pointsEarned = isDynamic ? (foundActivity.points || 10) : foundActivity.points;
    }

    // Salva tentativa
    progress.attempts.push({
      activity_id: activityId,
      selected_option_id: optionId,
      numeric_answer: numericAnswer,
      is_correct: isCorrect,
      points_earned: pointsEarned,
      attempt_number: attemptNum,
      created_at: new Date().toISOString()
    });

    // 2. ATUALIZAR MESTRIA POR SKILLS (user_skill_mastery)
    const mappedSkills = isDynamic ? [foundActivity.skill_id] : (LESSON_SKILLS_MAP[lessonId] || []);
    mappedSkills.forEach(skillId => {
      let skillMastery = progress.skills_mastery[skillId];
      if (!skillMastery) {
        skillMastery = { mastery_score: 0, confidence_score: 0, correct_attempts: 0, incorrect_attempts: 0, hints_used: 0 };
      }
      const updatedMastery = window.AdaptiveEngine.updateStudentMastery(skillMastery, isCorrect, hintsCount);
      progress.skills_mastery[skillId] = updatedMastery;
    });

    // Recalcular progresso da Aula
    let lessonActivities = [];
    if (isDynamic && this.generatedActivitiesCache) {
      lessonActivities = Object.values(this.generatedActivitiesCache).filter(act => act.lesson_id === lessonId);
    } else {
      const lessonSteps = STATIC_LESSON_STEPS[lessonId] || [];
      lessonActivities = lessonSteps.filter(s => s.activity).map(s => s.activity);
    }

    const completedCount = lessonActivities.filter(act => {
      return progress.attempts.some(att => att.activity_id === act.id && att.is_correct);
    }).length;

    const lessonPct = Math.round((completedCount / lessonActivities.length) * 100);

    let lessonScore = 0;
    lessonActivities.forEach(act => {
      const bestAttempt = progress.attempts.find(att => att.activity_id === act.id && att.is_correct);
      if (bestAttempt) {
        lessonScore += bestAttempt.points_earned;
      }
    });

    const currentStatus = lessonPct === 100 ? "completed" : "in_progress";
    const oldStatus = progress.lessons[lessonId]?.status || "available";

    progress.lessons[lessonId] = {
      status: currentStatus,
      percentage: lessonPct,
      score: lessonScore
    };

    // Se completou a aula, desbloqueia as subsequentes de outros cursos ou da árvore
    if (currentStatus === "completed" && oldStatus !== "completed") {
      // Logica simplificada de cascade desbloqueio
      const allLessons = STATIC_LESSONS;
      const curIndex = allLessons.findIndex(l => l.id === lessonId);
      if (curIndex !== -1 && curIndex < allLessons.length - 1) {
        const nextLesson = allLessons[curIndex + 1];
        if (progress.lessons[nextLesson.id]?.status === "locked") {
          progress.lessons[nextLesson.id].status = "available";
        }
      }
    }

    // Recalcular progresso dos cursos individuais
    STATIC_COURSES.forEach(c => {
      const courseModules = STATIC_MODULES.filter(m => m.course_id === c.id);
      const courseLessons = STATIC_LESSONS.filter(l => courseModules.some(m => m.id === l.module_id));

      const completedCourseLessons = courseLessons.filter(l => progress.lessons[l.id]?.status === "completed").length;
      const pct = courseLessons.length > 0 ? Math.round((completedCourseLessons / courseLessons.length) * 100) : 0;

      const courseScore = courseLessons.reduce((sum, l) => sum + (progress.lessons[l.id]?.score || 0), 0);

      progress.courses[c.id] = {
        percentage: pct,
        score: courseScore
      };
    });

    // Somar pontuação total do usuário
    progress.score = Object.values(progress.courses).reduce((sum, c) => sum + c.score, 0);

    // Persistir no localStorage
    this._saveDemoProgress(user?.id, progress);

    this.registerStudyDay();

    return {
      is_correct: isCorrect,
      feedback: feedback,
      points_earned: pointsEarned,
      attempt_number: attemptNum,
      lesson_progress: lessonPct
    };
  }

  // Estatísticas completas de progresso para a tela de Perfil
  async getStudentProgress() {
  const user = window.Auth.getCurrentUser();

  if (window.CONFIG.isDemoMode) {
    const progress = this._getDemoProgress(user?.id);

    const attemptsDetailed = progress.attempts.map(att => {
      let actStatement = "Exercício de Engenharia";
      let actType = att.selected_option_id ? "Múltipla Escolha" : "Entrada Numérica";

      if (this.generatedActivitiesCache && this.generatedActivitiesCache[att.activity_id]) {
        const cached = this.generatedActivitiesCache[att.activity_id];
        actStatement = cached.statement || "Exercício Adaptativo";
        actType = cached.activity_type === "multiple_choice" ? "Múltipla Escolha" : "Entrada Numérica";
      } else {
        for (const lesId in STATIC_LESSON_STEPS) {
          const step = STATIC_LESSON_STEPS[lesId].find(s => s.activity && s.activity.id === att.activity_id);
          if (step) {
            actStatement = step.activity.statement;
            actType = step.activity.activity_type === "multiple_choice" ? "Múltipla Escolha" : "Entrada Numérica";
            break;
          }
        }
      }

      return {
        statement: actStatement,
        is_correct: att.is_correct,
        points_earned: att.points_earned,
        created_at: att.created_at,
        type: actType
      };
    }).reverse();

    const completedLessons = Object.values(progress.lessons).filter(l => l.status === "completed").length;

    // Montar lista de competências (skills) para exibir no perfil
    const skillsList = STATIC_SKILLS.filter(s => s).map(skill => {
      const mastery = progress.skills_mastery[skill.id] || { mastery_score: 0, confidence_score: 0 };
      return {
        ...skill,
        mastery_score: mastery.mastery_score,
        confidence_score: mastery.confidence_score
      };
    });

    // Lista de erros ativos para a fila de revisão
    const wrongActivities = [];
    progress.review_queue.forEach(item => {
      if (this.generatedActivitiesCache && this.generatedActivitiesCache[item.activity_id]) {
        const cached = this.generatedActivitiesCache[item.activity_id];
        const lesson = STATIC_LESSONS.find(l => l && l.id === cached.lesson_id);
        wrongActivities.push({
          activity_id: item.activity_id,
          lesson_id: cached.lesson_id,
          title: cached.statement,
          lesson_title: lesson ? lesson.title : "Aula Adaptativa"
        });
      } else {
        for (const lesId in STATIC_LESSON_STEPS) {
          const step = STATIC_LESSON_STEPS[lesId].find(s => s && s.activity && s.activity.id === item.activity_id);
          if (step) {
            const lessonMatch = STATIC_LESSONS.find(l => l && l.id === lesId);
            wrongActivities.push({
              activity_id: item.activity_id,
              lesson_id: lesId,
              title: step.activity.statement,
              lesson_title: lessonMatch ? lessonMatch.title : "Desconhecido"
            });
            break;
          }
        }
      }
    });

    // Calcular o progresso médio ponderado da área (média dos 4 cursos)
    const coursesPctArray = Object.values(progress.courses).map(c => c.percentage);
    const totalAreaPct = coursesPctArray.length > 0 ? Math.round(coursesPctArray.reduce((s, v) => s + v, 0) / coursesPctArray.length) : 0;

    return {
      score: progress.score,
      completed_lessons_count: completedLessons,
      track_percentage: totalAreaPct, // Usado como o progresso global da área
      attempts: attemptsDetailed,
      skills: skillsList,
      streak: progress.streak,
      studied_dates: progress.studied_dates || [],
      review_items: wrongActivities,
      misconceptions: progress.misconceptions,
      courses: progress.courses
    };
  } else {
    // Progresso real, vindo do backend FastAPI (solda_inspecao)
    let summary = { lesson_progress: [], exam_attempts: [], answers_summary: { total: 0, correct: 0 } };
    try {
      summary = await axionApiRequest("/api/progress/summary");
    } catch (e) {
      console.error("[Axion] Falha ao buscar progresso do backend.", e);
    }

    const answersCorrect = summary.answers_summary?.correct || 0;
    let score = answersCorrect * 10;

    // Progresso real só existe para o curso de Soldagem; os outros seguem via demo local.
    const progressMap = {};
    STATIC_COURSES.forEach(c => {
      progressMap[c.id] = { percentage: 0, score: 0 };
    });

    const completedCount = (summary.lesson_progress || []).filter(x => x.status === 'completed').length;

    const formattedAttempts = (summary.exam_attempts || []).map(att => ({
      statement: att.exam_title,
      type: "Prova",
      is_correct: (att.score || 0) >= 50,
      points_earned: att.score || 0,
      created_at: att.started_at
    }));

    const skillsList = STATIC_SKILLS.map(s => ({
      ...s,
      mastery_score: completedCount > 0 ? (completedCount * 25) : 0,
      confidence_score: completedCount > 0 ? (completedCount * 20) : 0
    }));

    const coursesPctArray = Object.values(progressMap).map(c => c.percentage);
    const totalAreaPct = coursesPctArray.length > 0 ? Math.round(coursesPctArray.reduce((s, v) => s + v, 0) / coursesPctArray.length) : 0;

    return {
      score: score,
      completed_lessons_count: completedCount,
      track_percentage: totalAreaPct,
      attempts: formattedAttempts,
      skills: skillsList,
      streak: 1,
      review_items: [],
      misconceptions: [],
      courses: progressMap
    };
  }
}

// Helpers internos para ler/gravar progresso demo
_getDemoProgress(userId) {
  const key = `axion_demo_progress_${userId}`;
  const cached = localStorage.getItem(key);

  const defaultProgress = {
    score: 0,
    streak: 1,
    attempts: [],
    lessons: {
      "l_alg_1_1": { status: "available", percentage: 0, score: 0 },
      "l_amd_1_1": { status: "available", percentage: 0, score: 0 },
      "l_num_1_1": { status: "available", percentage: 0, score: 0 },
      "l_mat_1_1": { status: "available", percentage: 0, score: 0 }
    },
    courses: {
      "c1111111-1111-1111-1111-111111111111": { percentage: 0, score: 0 },
      "c2222222-2222-2222-2222-222222222222": { percentage: 0, score: 0 },
      "c3333333-3333-3333-3333-333333333333": { percentage: 0, score: 0 },
      "c4444444-4444-4444-4444-444444444444": { percentage: 0, score: 0 }
    },
    skills_mastery: {},
    misconceptions: [],
    review_queue: [],
    track_percentage: 0,
    studied_dates: [],
    last_lab_date: null
  };

  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      return {
        ...defaultProgress,
        ...parsed,
        lessons: { ...defaultProgress.lessons, ...parsed.lessons },
        courses: { ...defaultProgress.courses, ...parsed.courses },
        skills_mastery: { ...defaultProgress.skills_mastery, ...parsed.skills_mastery || {} }
      };
    } catch (e) {
      console.error("Error parsing demo progress, resetting:", e);
    }
  }

  localStorage.setItem(key, JSON.stringify(defaultProgress));
  return defaultProgress;
}

_saveDemoProgress(userId, progress) {
  const key = `axion_demo_progress_${userId}`;
  localStorage.setItem(key, JSON.stringify(progress));
}

  registerStudyDay() {
    if (!window.CONFIG.isDemoMode) return;
    const user = window.Auth.getCurrentUser();
    const progress = this._getDemoProgress(user?.id);
    const today = new Date().toDateString();
    
    if (!progress.studied_dates) progress.studied_dates = [];
    if (!progress.studied_dates.includes(today)) {
      progress.studied_dates.push(today);
      this._saveDemoProgress(user?.id, progress);
    }
  }

  completeLabExercise() {
    if (!window.CONFIG.isDemoMode) return;
    const user = window.Auth.getCurrentUser();
    const progress = this._getDemoProgress(user?.id);
    const today = new Date().toDateString();
    
    if (progress.last_lab_date !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (progress.last_lab_date === yesterday) {
        progress.streak = (progress.streak || 0) + 1;
      } else {
        progress.streak = 1;
      }
      progress.last_lab_date = today;
      this._saveDemoProgress(user?.id, progress);
    }
    
    this.registerStudyDay();
  }
}

window.Tracker = new TrackerManager();

// ==========================================
// OFFLINE WELDING DATA INJECTION (AUTO-GENERATED)
// ==========================================
if (window.CONFIG && window.CONFIG.isDemoMode) {
    console.log("[Axion] Injetando Banco de Questões de Soldagem no modo Demo...");

    STATIC_COURSES.push({
        id: "c5555555-5555-5555-5555-555555555555",
        title: "Inspetor de Soldagem e Qualidade",
        description: "Curso completo baseado no Banco de Questões de Soldagem e Ensaios Não Destrutivos.",
        difficulty: "advanced",
        estimated_hours: 40,
        is_published: true
    });

    STATIC_MODULES.push({
        id: "2cf2f5d1-97de-4021-a35f-f852331543c1",
        course_id: "c5555555-5555-5555-5555-555555555555",
        title: "Consumíveis de Soldagem",
        description: "Questões e atividades sobre Consumíveis de Soldagem",
        position: 1,
        is_published: true
    });

    STATIC_LESSONS.push({
        id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        module_id: "2cf2f5d1-97de-4021-a35f-f852331543c1",
        title: "Prática - Consumíveis de Soldagem",
        description: "Exercícios do banco.",
        estimated_minutes: 60,
        position: 1,
        lesson_type: "interactive",
        is_published: true
    });
    
    if (!STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"]) {
        STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"] = [];
    }

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "c7d7a1d5-9d53-4d76-aaa3-92f6fabde47f",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 1,
        activity: {
            id: "b11faec2-d1b0-4fcd-a63d-10a7c05beb22",
            activity_type: "multiple_choice",
            statement: "Foi solicitada ao fabricante de gás para soldagem a compra de um cilindro contendo a seguinte mistura gasosa: 80,0% Argônio + 15,0% CO2 + 5,0% O2. Qual composição química, abaixo informada, não pode ser aceita pelo Inspetor de Soldagem ao receber a mistura gasosa? ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "2572fe87-eada-4d5f-ae20-6a7f3786f373", content: "F) 81,5% Argônio + 13,5% CO2 + 5,0% O2", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "fa2505b2-71d5-4f74-8f8f-72310e26ecb2", content: "G) 81,5% Argônio + 13,0% CO2 + 5,5% O2", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "cdbfa02a-0cbc-42a5-a829-ebc0c743e9d8", content: "H) 81,5% Argônio + 14,0% CO2 + 4,5% O2", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "dc343e31-5f33-43a8-99cd-35603dbfc807", content: "I) 79,0% Argônio + 16,5% CO2 + 4,5% O2", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "79e63b1a-81a5-42f5-b8cb-2183b3af108a", content: "J) 80,0% Argônio + 15,5% CO2 + 4,5% O2", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "af07a68f-8935-4309-a43c-9e353688710f",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 2,
        activity: {
            id: "51efb362-dcc2-4866-a3b1-dffb4e4795c0",
            activity_type: "multiple_choice",
            statement: "As letras B, E, ER, F e SG representam diferentes consumíveis de soldagem. Marque abaixo a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "f598985f-de98-4d8a-aefa-fb08b3692281", content: "F) B - Brasagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "0469a58b-67df-4244-b192-64ccc66bf9c0", content: "G) E - Eletrodo para soldagem a arco elétrico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "00861cb6-ba53-49fd-ab6d-5097d162af29", content: "H) ER - Eletrodo Revestido;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 3 },
            { id: "c2f94471-2d65-4804-bdf3-4fff1c138db9", content: "I) F - Fluxo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "fe6eb761-b2c5-4eff-b79f-025b5c68058c", content: "J) SG - Gás de proteção.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "cc941ff4-c6b5-41ba-bbdd-53eb19c6fde4",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 4",
        content: "Resolva a questão abaixo.",
        position: 3,
        activity: {
            id: "63d97c94-3a98-4d67-8334-e42e281763ec",
            activity_type: "multiple_choice",
            statement: "Dos eletrodos revestidos apresentados abaixo, marque aquele que foi desenvolvido especificamente para ser usado na posição Vertical, progressão Descendente. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "8a89cbae-a483-4034-9e00-47a8e7c77069", content: "A) E7048", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "33229e90-b85d-43e0-acb4-c2ae583fa302", content: "B) E7028", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "4e33538b-599f-4c70-acfe-81dc2be9f1d4", content: "C) E7018", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "5ec299a8-d0b0-4f4b-a590-a8945b163d26", content: "D) E6011", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "aa20da3b-fd3f-4a3d-a8c6-e41afee19d72", content: "E) E7024", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "0a21ac31-d69a-4a56-88da-4679fc4dbc67",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 5",
        content: "Resolva a questão abaixo.",
        position: 4,
        activity: {
            id: "fe0f88b1-df3c-4c55-9518-70feb5a3ef9f",
            activity_type: "multiple_choice",
            statement: "Qual consumível de soldagem, analisando por sua classificação AWS, é indicado para ser usado no processo de soldagem oxi-acetilênica? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "551afebc-6b36-4eef-8ea0-038ca0942f61", content: "A) ER316MoL", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "283f8309-0575-4a5f-9a7e-6626522d8f42", content: "B) ER6013", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "1b5586c9-5c23-4e2d-9c03-5abdbb772b88", content: "C) EL8", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "4bc57642-653f-4319-a251-dca512a02b31", content: "D) SG-100", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "a1e91f35-e0dc-43b0-91c4-86c783e276eb", content: "E) R65", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "0c2f481b-60df-4f2e-861a-b484433f9eb6",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 6",
        content: "Resolva a questão abaixo.",
        position: 5,
        activity: {
            id: "0b255732-1867-4c3d-a5da-f15f2b73f8c3",
            activity_type: "multiple_choice",
            statement: "Das classificações AWS apresentadas abaixo, indique o único consumível que só pode ser usado na posição de soldagem Sobre-cabeça. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "b9ee53f9-857c-46bf-9239-ca045c562157", content: "A) ER308Si-25", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "d9c46c98-88e1-4338-9c0a-4a3e414ba59d", content: "B) E6020", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "7d5d2b09-5d93-463f-9e11-35c746f2005f", content: "C) ER80S-Ni1", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "30bd4e76-1861-4d2e-9da6-e8cd76122023", content: "D) E70T-2", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "66764ef1-bd63-4ca3-9821-deb95401ff78", content: "E) EL12K", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "224b6b30-c591-44a5-ad23-eb6be3b00f61",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 6,
        activity: {
            id: "cea8b826-7978-4b3b-8156-1677f96b3223",
            activity_type: "multiple_choice",
            statement: "5 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "bea86f84-b075-4a09-97e8-77099732b5a5", content: "C) Posição de Soldagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "33a74401-73e0-4c53-b69d-8be984ec2f78", content: "D) Tipo de Revestimento;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "294a424c-b105-4ac8-b5f2-6daf049557fb", content: "E) Propriedades mecânicas do metal de solda na condição de “como soldado” ou “como envelhecido”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "d18828eb-b9d2-47d2-9757-97e92dbc7eba",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 8",
        content: "Resolva a questão abaixo.",
        position: 7,
        activity: {
            id: "92904016-6f50-44ea-a016-7bac1df857f4",
            activity_type: "multiple_choice",
            statement: "Dos diferentes tipos de revestimentos, assinale aquele que mais introduz hidrogênio no metal de solda. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "ac6e7126-2241-4472-b104-00e62241e742", content: "A) Celulósico;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "bfa90ced-263a-4be3-a1e3-5ef029946aa8", content: "B) Básico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "7073b2d1-df21-4c07-b748-a5c67546876c", content: "C) Ácido;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "baaabb0e-fdb9-4c87-828d-28698583c809", content: "D) Rutílico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "233c8b28-5dd9-4c3a-8650-d696cb23fa9b", content: "E) Ilmenítico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "858dbaa4-0fae-497f-bef4-fbebb967c0d3",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 9",
        content: "Resolva a questão abaixo.",
        position: 8,
        activity: {
            id: "34545a3c-88f4-4631-9d28-ca8ebdba922a",
            activity_type: "multiple_choice",
            statement: "De acordo com uma especificação AWS, o eletrodo revestido com classificação AWS E7018 tem o revestimento do tipo “básico” e pode ser usado com corrente contínua e com corrente alternada. Em qual das alternativas apresentadas a seguir pode-se obter essas informações? ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "af27a0e3-be98-41af-a950-5b76b0417b42", content: "A) E7018", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "3996a8e5-da0d-4246-b296-ec73665b919d", content: "B) E7018", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "92029172-8706-4368-aca3-6941640ab489", content: "C) E7018", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "2d4868e2-040e-47b4-8eb4-86f03ad60002", content: "D) E7018", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "d86cf037-a7b1-4ec2-a83c-5b5ece0bf02e", content: "E) E7018", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "456b1564-29a9-41e6-84b2-1bf801b3dba3",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 10",
        content: "Resolva a questão abaixo.",
        position: 9,
        activity: {
            id: "5548bf1d-1b0f-4c19-9980-cc3fd36ac95a",
            activity_type: "multiple_choice",
            statement: "Indique, das alternativas apresentadas, qual delas não é uma função de um revestimento de um eletrodo revestido. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "19104e65-2f99-43d6-90b5-f8dd48e22000", content: "A) Gerar gás (proteção gasosa);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "20ed53d2-7375-4b53-bed0-947616f152f0", content: "B) Produzir escória;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "57d2dfa4-b943-4b44-ac23-81db4ff5b7a7", content: "C) Desoxidar a poça de fusão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "2dbc7b35-cf36-43a4-bfcb-096687d04732", content: "D) Introduzir elementos de liga no metal de solda;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "b75b1855-dde2-4938-a527-fec82665e4ec", content: "E) Evitar que o eletrodo fique colado na obra em caso de curto circuito.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "99f23afc-c601-4a27-83bd-2ee9ba0d8fb1",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 11",
        content: "Resolva a questão abaixo.",
        position: 10,
        activity: {
            id: "8d37cfeb-2966-4755-aba8-3ce05e6158ab",
            activity_type: "multiple_choice",
            statement: "Em relação ao revestimento do tipo Rutílico, assinale a alternativa correta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "29d6cfa1-7476-434f-9125-869bca4eefe0", content: "A) É o revestimento que mais introduz hidrogênio no metal de solda", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "d0ee7257-8b13-4da5-9a8b-ed240b86e8ec", content: "B) Produz metais de solda com grande tenacidade.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "ea699d2d-de56-4cc8-a944-88189afc0385", content: "C) Tem em sua composição a presença de substâncias à base de cálcio.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "0c81dc50-850a-4423-9b4d-1f769c484b20", content: "D) Em função das características elétricas do TiO2, este revestimento permite abrir e manter o arco elétrico facilmente;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "708762ff-cb3a-4508-8b1f-558d48ac8a09", content: "E) Pela geração de um forte arco elétrico, é o revestimento ideal para a soldagem do passe de raiz de tubos, oleodutos e gasodutos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "83da2383-8f08-424e-8cf0-84b387679f14",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 12",
        content: "Resolva a questão abaixo.",
        position: 11,
        activity: {
            id: "a8c4dddc-5a80-4266-8a31-d36d970d6bcd",
            activity_type: "multiple_choice",
            statement: "Em relação à camada de cobre aplicada na superfície dos arames sólidos, quanto às suas finalidades, marque a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "c66df5dd-a1f1-429d-ac5f-a9cc3abf5fe3", content: "A) Facilita o contato elétrico entre o arame sólido e o bico de contato;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "0cde7e99-3a83-446b-b431-d170d4ebdbfa", content: "B) Protege a superfície do arame contra a corrosão atmosférica;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "30183407-54ab-4925-bc69-87d334004d35", content: "C) Age como lubrificante durante a trefilação do arame;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "809ea4f0-762b-42f1-ab91-ef6864016d9e", content: "D) A fusão do arame faz introduzir grande quantidade de Cobre no metal de solda, tornando-o frágil;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "a16687bd-f20e-46e7-a56d-284a17a28fde", content: "E) Apesar da camada de cobre se encontrar depositada sobre o arame sólido, isto não impede deste arame sólido mesmo assim esta condição satisfaz a definição de “Eletrodo Nu”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "fd49f24c-2892-449d-9ce0-c0e43964f392",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 14",
        content: "Resolva a questão abaixo.",
        position: 12,
        activity: {
            id: "75b07c90-dfda-4b98-815c-1ab67b6588e3",
            activity_type: "multiple_choice",
            statement: "Analisando a classificação AWS do consumível de soldagem E309SiL-16, marque a alternativa correta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "44eef1ec-e5fe-416d-8aa5-4ca831fa0c7f", content: "A) É uma vareta que pode ser usada no processo TIG;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "7e2975c9-1933-4f83-b3ab-ed5374eb71ae", content: "B) O teor de Silício encontrado neste consumível é menor do que aquele encontrado no consumível E309-16;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "513aaf9c-42f3-4802-9446-ab8629f1799d", content: "C) O teor de Carbono encontrado neste consumível é menor do que aquele encontrado no consumível E309-16;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "3646bc6a-8b39-4ef5-ad7f-c956fe68381f", content: "D) Este consumível só pode ser usado nas posições de soldagem plana e horizontal;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "acdde67b-95e5-4a94-ae09-d698c5566b15", content: "E) As informações sobre o tipo de revestimento e os tipos de corrente e polaridade são fornecidas pelo algarismo “1”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "617de0e6-859e-4be4-b3c3-2a87ccc1c5d2",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 15",
        content: "Resolva a questão abaixo.",
        position: 13,
        activity: {
            id: "70f61f4d-ddd5-482e-a4f4-1979bc300933",
            activity_type: "multiple_choice",
            statement: "Analisando as classificações AWS do fluxo e do arame sólido, mostradas a seguir, usados no processo de soldagem a arco submerso, assinale a alternativa correta. F7AZ – EM12K ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "3721698f-ad53-4c23-8e48-18181286ad0a", content: "A) As propriedades mecânicas do metal de solda foram obtidas estando a chapa de teste na condição de “como tratada”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "200e2992-1001-4af3-b386-27601d0a29db", content: "B) O ensaio de impacto foi realizado a 0ºC;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "e6cdfe9f-eab9-4b14-9624-0d14d618eebb", content: "C) O metal de adição é do tipo Médio Manganês;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "6fac732c-c302-4527-91d6-969b8d1cd8c2", content: "D) O arame sólido foi fabricado com o aço fabricado pelo método “efervescente”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "db15d684-7249-45e1-a10c-e9a3ad889968", content: "E) O metal depositado, gerado pela combinação do fluxo e arame pode suportar tensões de tração entre 60.000 e 80.000 psi.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "105d2e9d-4199-488e-96cd-f272d35c31ff",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 14,
        activity: {
            id: "2ee184ba-a730-4bf2-8c91-1bdaedc88995",
            activity_type: "multiple_choice",
            statement: "8 ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "94f5adcc-9747-4e7b-b9a7-2346f10b16e1", content: "A) Os elementos químicos Cromo e Níquel, que deverão ser introduzidos no metal de solda, são provenientes da alma do consumível;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "3480c105-ba08-4989-a5c1-73fd80f2ca30", content: "B) O teor de Carbono encontrado neste consumível é maior do que aquele encontrado no consumível E316-25;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "50aa5e38-da1f-4947-985f-436184290477", content: "C) Este consumível também é conhecido como Eletrodo “sintético”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "61bafc42-d457-4724-9d3d-60c406dcf611", content: "D) As informações sobre o tipo de revestimento e os tipos de corrente e polaridade são fornecidas pelos algarismos “2” e “5” (25).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "78820165-7ac2-418c-8ec7-553ae3e67592", content: "E) Este consumível é indicado especificamente para a soldagem de aços inoxidáveis.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "6334cce6-119a-4439-88ed-b5dfcf8ba66a",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 17",
        content: "Resolva a questão abaixo.",
        position: 15,
        activity: {
            id: "1f07aa47-9e85-412a-bd81-6aebf4c49416",
            activity_type: "multiple_choice",
            statement: "Qual dos fatores abaixo relacionados não serve como parâmetro para a seleção de um consumível de soldagem em uma fábrica? ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "a0f7d8a4-31bb-46e9-92c8-edc1eb74b3b7", content: "A) Habilidade do soldador;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "edcf5c4c-6558-4c49-92fd-67c133e36c27", content: "B) Tipo de fonte de energia;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "21fe4e0f-24b8-4d15-9b5f-8ecbfcc66ce8", content: "C) Tipo de metal de base;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "5e344e11-7841-40fe-b0ae-828e1969fdc1", content: "D) Teor da umidade relativa do ar na região onde a fábrica se encontra;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "f1a82c2b-8df3-4606-812e-31fa8d274c7d", content: "E) Posição de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "99c3cba1-3efa-4c57-8bd8-309c166fdd71",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 18",
        content: "Resolva a questão abaixo.",
        position: 16,
        activity: {
            id: "e11686a4-51a2-43b9-a5da-e49413213c27",
            activity_type: "multiple_choice",
            statement: "Comparando os gases Hélio (He), Argônio (Ar), CO2 e O2, usados na soldagem de metais, assinale a afirmativa verdadeira. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "146ecfea-90f3-4b0e-add0-f99e84157d3a", content: "F) O gás He possui um peso atômico maior do que o do Argônio;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "6697d81d-3c72-4012-a139-8e42796b8796", content: "G) Os gases He, Ar e CO2 são considerados gases ativos;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "8a65820c-701d-4ded-be11-9753be32faa4", content: "H) O gás He, por possuir um baixo potencial de ionização, apresenta uma alta condutibilidade térmica;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "3e9d88e9-8e67-4f27-8462-a324c61d4154", content: "I) Enquanto o gás O2 pode ser usado sozinho como gás de proteção na soldagem, o gás CO2 sempre terá que ser usado acompanhado ou pelo He ou pelo Ar;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "2d3b17e6-9742-4e47-bf1c-d79b79838bf1", content: "J) O gás CO2 passa a ser oxidante apenas quando o mesmo passa pelo arco elétrico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "77ce9d98-8be0-4758-b905-59420c8bd73b",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 17,
        activity: {
            id: "3a60239e-a4b0-4d65-9f1c-40aaa050d841",
            activity_type: "multiple_choice",
            statement: "9 ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "ae8c83ad-83b1-43d5-be53-0977e02cf0f3", content: "A) O consumível é recomendado para a soldagem de aços baixa-liga, alta resistência;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "bd02c9ed-c6b9-4623-bc99-5e6906a75561", content: "B) O revestimento aplicado sobre a alma é do tipo rutílico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "b50e3f6f-dc22-41d7-a230-b6ad44d7e1f2", content: "C) O limite de resistência mínimo deste consumível é de 90 MPa;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "db29c847-90a9-409e-9e1c-63a51f44d2f0", content: "D) O consumível é especialmente recomendado para ser usado na posição: vertical, progressão: descendente;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "9593e461-c960-447a-8901-e219e15e7a6c", content: "E) Por pequenos teores de Cromo e Níquel em seu revestimento, este consumível é recomendado para ser usado em aços inoxidáveis.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "70578fa3-3994-447d-9100-1f5999363aa9",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 20",
        content: "Resolva a questão abaixo.",
        position: 18,
        activity: {
            id: "4de0d28c-9e91-42f6-af18-640c9d22ae8d",
            activity_type: "multiple_choice",
            statement: "Comparando a aplicação dos diferentes tipos de revestimento, assinale a alternativa correta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "d16348de-0ffc-4898-85c9-a517bea854c0", content: "A) O revestimento rutílico, por produzir metais de solda apresentando baixos teores de hidrogênio (≤ 2 ml H2/100 g de metal depositado) e uma alta tenacidade, ele é recomendado para ser usado na soldagem de vasos de pressão, jaquetas e outros equipamentos que apresentam grandes concentrações de tensões;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "d96229aa-962e-48ad-8e32-c57ae824075e", content: "B) O revestimento celulósico, por ter em sua composição grandes quantidades de TiO2, é altamente recomendado para ser usado em membros que apresentem desalinhamentos e cortes mal preparados;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "65bcc109-fedb-4939-a9cd-ecb4324532ec", content: "C) O revestimento ácido é bastante usado no Brasil, visto os altos valores de resistência mecânica e tenacidade que os metais de solda produzidos apresentam;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "c5eb7f10-3912-42cf-9bfc-13df5aceb3b3", content: "D) O revestimento básico consegue produzir metais de solda com baixíssimos teores de S, devido à presença de substâncias à base de Cálcio em sua composição;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "ba8e913e-1865-434a-bf2c-e9b260ac5a26", content: "E) O revestimento celulósico, por ser altamente higroscópico, exige que o consumível seja ressecado antes de ser usado pelo soldador..", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "429e6880-7fd4-4ca5-8c46-06a845f8475d",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 22",
        content: "Resolva a questão abaixo.",
        position: 19,
        activity: {
            id: "bbee771f-91a7-4755-aac2-655e5eaa6e28",
            activity_type: "multiple_choice",
            statement: "Comparando os termos “Especificação AWS” e “Classificação AWS”, assinale a alternativa correta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "15398826-7268-4e78-8f54-bca3020ecd05", content: "A) Todos os consumíveis de soldagem estão cobertos por uma Especificação AWS;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "a3363948-c141-47c9-bb89-7ba3de1a2aa7", content: "B) A Classificação AWS estabelece as condições de teste para os consumíveis a serem realizados pelo fabricante, objetivando verificar se a solda produzida apresenta as propriedades mecânicas mínimas exigidas;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "4d848f04-ae9a-454f-8dc1-957de762f903", content: "C) A Especificação AWS determina de maneira exata as características de um consumível e dá garantias sobre suas propriedades;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "7fb14c9c-0b45-4c8a-8bbf-6de206e9a96a", content: "D) A Classificação AWS determina que os consumíveis atendam a requisitos, como por exemplo, de fabricação, de critérios de aceitação, de embalagem, de identificação, entre outros;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "9e9e6fde-81d9-4c88-b451-fc288459ffef", content: "E) Nenhum requisito específico é necessário para que um consumível se enquadre em alguma Especificação AWS.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "6a3030e0-5403-49c3-b230-ede10e93b180",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 23",
        content: "Resolva a questão abaixo.",
        position: 20,
        activity: {
            id: "cfcdab3d-b73b-4cf3-bda8-0917363e4ef9",
            activity_type: "multiple_choice",
            statement: "Analisando a classificação AWS E100T1-Ni2, marque a alternativa correta, ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "1f0ed328-d3c7-4f25-8c7c-c0b4a4b9f9e2", content: "A) E100T1-Ni2: este algarismo significa que o teste de impacto, realizada para a homologação do consumível, foi realizado a 0ºC;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "4b5c8c6a-74da-4eba-aa23-0216f5e16d4d", content: "B) E100T1-Ni2: este algarismo significa que este consumível pode ser utilizado em todas as posições de soldagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "2dd32d9b-c4d2-40ee-bbe6-2abda3172ad7", content: "C) E100T1-Ni2: estes algarismos significam que este consumível resiste a uma tensão de tração no valor mínimo de 100.000 psi;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "f240cd66-727e-4c85-bce4-f0efd470e8ed", content: "D) E100T1-Ni2: estes algarismos significam que este consumível resiste a uma tensão de tração no valor mínimo de 100.000 psi;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "d794f4ad-fb8f-4163-89eb-d6adbf05e238", content: "E) E100T1-Ni2: este é um consumível do tipo arame tubular desenvolvido para ser empregado na soldagem do aço carbono.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "32b0e82d-010a-4e40-ab4f-41d836649bd6",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 24",
        content: "Resolva a questão abaixo.",
        position: 21,
        activity: {
            id: "c140176f-da5b-4070-ae8f-b45602383d68",
            activity_type: "multiple_choice",
            statement: "Quanto à Especificação AWS A5.18, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "ec4ebfbe-c30e-4cfb-af1f-b11244eff59b", content: "A) Comparando os consumíveis de classificações AWS ER70S-3 e ER70S-6, pode-se afirmar que a presença de teores de Mn e Si, encontrados em maiores quantidades no segundo arame, tem a finalidade principal de aumentar a resistência mecânica do metal de solda produzido por aquele arame;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "11270694-e102-4690-8f9e-9909386c2184", content: "B) ER70S-3: o algarismo 3 na classificação apresentada designa a composição química do metal de adição;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "3ded0caf-bf77-4087-9649-53596e479b38", content: "C) Na passagem do gás de proteção CO2, proveniente do cilindro de gás, pelo interior do arco elétrico, este gás se dissocia em CO (monóxido de carbono) e Oxigênio livre;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "81bc4f33-ed53-4b97-8c23-6adda1694c7a", content: "D) A quantidade de cobre aplicada sobre o metal de adição não compromete as características mecânicas do metal de solda produzido;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "f2696534-562a-41f2-b16d-082fa6b9e333", content: "E) ER70S-3: o número 70 representa o limite de resistência, mínimo, à tração do metal depositado (70.000 psi).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "24f1b284-1be5-417d-9c9f-aa19168babf8",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 25",
        content: "Resolva a questão abaixo.",
        position: 22,
        activity: {
            id: "7e9909ae-ebd2-47a8-8272-1eb901ddd36d",
            activity_type: "multiple_choice",
            statement: "Dentre as afirmativas relacionadas aos Consumíveis de soldagem apresentadas a seguir, uma encontra-se completamente errada. Assinale-a. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "d0b08cd0-b44b-40d2-b55c-e74a1530736c", content: "A) Quando um consumível é do tipo “eletrodo revestido”, “arame tubular (com núcleo fluxado”, “arame tubular (com núcleo metálico [metal cored])”, a análise da composição química é realizada após o seu derretimento sobre uma almofada;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "d5ddcfca-9235-49e0-99bd-a7a80e85ab18", content: "B) Consumível de soldagem, por definição, é todo material empregado na soldagem  com o objetivo de depositar e proteger a poça de fusão;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "2d7823ec-f9c4-417b-991a-1f632f00bbed", content: "C) O gás de proteção (mistura gasosa) tem o objetivo principal de proteger a poça de fusão da ação negativa dos gases que compõem o ar atmosférico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "a7551d02-8b2b-4047-b8d7-18fe42fcf394", content: "D) Os arames tubulares com núcleo fluxado (flux-cored, em inglês) podem ser de dois tipos: autoprotegidos e aqueles que necessitam do uso de um gás externo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "065ac23a-39a1-4eca-ab61-ca264597f15f", content: "E) Apesar do gás Oxigênio (O2) apresentar uma característica deletéria (ação oxidante) no interior do arco elétrico, este gás, em combinação com um gás inerte, pode ser usado como gás de proteção na soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "c11dacd1-53d5-4282-85e4-2a81f80ad459",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 26",
        content: "Resolva a questão abaixo.",
        position: 23,
        activity: {
            id: "170dfa6b-bbe7-4b0c-a130-dcbc71fae34c",
            activity_type: "multiple_choice",
            statement: "Analisando os diferentes tipos de revestimentos dos eletrodos revestidos, marque a alternativa correta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "fe91a2da-d8b4-4b65-8bcd-9b6b72753791", content: "A) Dos diferentes tipos de substâncias encontradas no revestimento celulósico, é correto informar que aquela mais importante deste revestimento é o dióxido de titânio;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "dc53f18d-3401-4101-a1c3-7114a2abe660", content: "B) O óxido RuO2 é a substância mais importante encontrada no revestimento rutílico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "b4186431-1f5b-4123-a8da-3184815827ae", content: "C) Substâncias como CaF2 (Fluorita), CaCO3 (Calcário), Dolomita, entre outras, são aquelas que fazem com o revestimento seja chamado de “Básico”;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "ae96661e-a805-4aaf-aace-1d0261efb65c", content: "D) O revestimento Ácido possui este nome, visto que o mesmo é constituído por ácidos do tipo: Sulfúrico (H2SO4) e Carbônico (H2CO3);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "ed24982d-3f38-4ce7-8db7-aefcb0d39614", content: "E) Observando os elementos químicos que formam a Celulose (C6H10O5), conclui-se que grande parte desta substância é formada por hidrogênio. Desta forma, faz-se necessário fazer uma ressecagem deste eletrodo revestido celulósico, objetivando eliminar todo o hidrogênio nele existente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "8c1c5496-5251-44ac-b1d1-92f1a16fb22e",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 27",
        content: "Resolva a questão abaixo.",
        position: 24,
        activity: {
            id: "74de1415-eb09-4da0-b44b-5b36bd08382e",
            activity_type: "multiple_choice",
            statement: "Analisando os dois Sistemas de Classificação encontrados na Especificação A5.18, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "228850b6-c521-4c89-b468-7c170d3f6bd7", content: "A) O arame tubular com núcleo metálico (metal cored, em inglês) enquadrado nesta Especificação não necessita de proteção gasosa externa para a fabricação de cordões de solda;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "b2576612-135c-4a4b-a30c-9e979dcc87a4", content: "B) O consumível E70C-3M foi homologado usando uma mistura gasosa à base de 75% Argônio + 25% CO2;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "e0ff449a-6838-44da-b8bb-03eca311d755", content: "C) Pelas grandes quantidades de elementos desoxidantes encontrados na composição química do consumível de soldagem, o arame com classificação AWS ER70S-6 é indicado para ser usado com o gás CO2;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "ab5fa677-c5e5-4730-b70c-e2ac5e2d70a7", content: "D) O consumível AWS ER70S-3 é indicado para ser usado com gás Argônio em função de sua composição química;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "7792f0a0-0497-4714-8704-83b4b4199981", content: "E) Todos os consumíveis encontrados nesta Especificação são aptos a serem usados em todas as posições de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "77149e7f-3033-4555-9439-07dad6f512d6",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 25,
        activity: {
            id: "f28f50ae-89d2-4d3b-a16c-bf4eabd3ded1",
            activity_type: "multiple_choice",
            statement: "3 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "f1bef075-3ce5-473f-bb67-171d4bc88934", content: "A) O diâmetro de um eletrodo revestido é medido na região onde há a presença do revestimento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "16ddcef8-0981-44ad-a540-13ca63e4adaf", content: "B) As embalagens do tipo lata devem ser armazenadas em pé, com a pega do eletrodo voltada para a parte inferior da embalagem;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "fae4b314-1ebe-488d-a3d4-0307f396e35c", content: "C) No recebimento dos eletrodos revestidos, os eletrodos básicos precisam ser imediatamente armazenados em estufas, com a temperatura em torno de 150ºC;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "450820cd-4937-4a50-aac6-bbb0d6b3f387", content: "D) As latas, que transportam os eletrodos revestidos, são consideradas completamente estanques, não permitindo a entrada da umidade do ar em seu interior;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "51328fc7-0c77-430a-8988-4700cd3fa543", content: "E) Uma lata de eletrodos revestidos apresenta uma grande resistência, a ponto de, quando completamente fechada, é capaz de suportar, no máximo, o peso de 12 latas, uma sobre as outras, sem se danificar.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "a99b9b3d-6b03-466c-a6b8-95fec267d9e5",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 29",
        content: "Resolva a questão abaixo.",
        position: 26,
        activity: {
            id: "3ab1c308-3bd4-4346-85f4-fe96fbb138d5",
            activity_type: "multiple_choice",
            statement: "Dos diferentes tipos de revestimentos, identifique aquele que produz cordões de solda com as maiores penetrações. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "541b5984-b359-420a-85b8-e196dd02c755", content: "A) Básico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "ffc9701a-1a5b-4011-b5ff-748cac16b232", content: "B) Ácido;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "831dea2f-d0d7-4af0-b84d-d17ff6b01f7d", content: "C) Ilmenítico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "ba44cd57-9cd7-4dea-bde9-d321290c769f", content: "D) Rutílico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "c416c267-3266-42a0-a290-9a0ebf7bbecf", content: "E) Celulósico.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "cf5730b6-6603-4192-a73b-62b068636980",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 31",
        content: "Resolva a questão abaixo.",
        position: 27,
        activity: {
            id: "cf06914f-1d14-442a-8ea8-cdf41473dfa4",
            activity_type: "multiple_choice",
            statement: "Analisando o manuseio, armazenamento, secagem e manutenção da secagem dos consumíveis de soldagem (à exceção dos gases), pode-se afirmar que: ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "1aa7f9d7-c71f-47bf-87b2-201a8823a4c0", content: "A) Caso a temperatura ambiente, no interior da fábrica, esteja ≥ 30ºC, isto torna desnecessário o controle da umidade relativa do ar;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "9c664c14-5dc7-45c5-9e74-467691b6417e", content: "B) Os eletrodos revestidos básicos, por serem altamente higroscópicos, devem ser armazenados em compartimentos separados se comparados com outros tipos de revestimentos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "4a2e0291-efcb-44bf-b7de-1ab25871839a", content: "C) O compartimento, onde serão estocados todos os consumíveis de soldagem, deve ter uma temperatura 10ºC acima da temperatura ambiente (e igual ou superior a 20ºC;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "7bfb13d9-e84b-4587-87dd-b1032e244bb5", content: "D) O compartimento, onde serão estocados todos os consumíveis de soldagem, deve ter uma umidade relativa do ar controlada de, no mínimo, 50%;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "a46b46c3-c016-47d7-bf0d-b5a2f3b75658", content: "E) Como a região sul do Brasil apresenta uma baixa umidade relativa do ar, isto faz que o Inspetor de Soldagem se preocupe apenas no controle da temperatura onde os consumíveis estão armazenados.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "2d6df9ac-408f-4549-8f9b-dee8febb0d45",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 32",
        content: "Resolva a questão abaixo.",
        position: 28,
        activity: {
            id: "8c83efcb-88bc-40cc-b15b-db135cfe5ddd",
            activity_type: "multiple_choice",
            statement: "Analisando os consumíveis de soldagem empregados no processo de soldagem Oxi-gás, indique a seguir qual das alternativas abaixo está incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "47a1ce65-c6ec-4914-b747-419a7855817a", content: "F) Fundente (ou fluxo);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "1879818e-e3a8-43db-b33d-d718adac7da3", content: "G) Propano (gás combustível);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "b44f935e-413e-41d9-9153-0234c2e1a270", content: "H) Vareta;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "d4514e12-97a0-4d5a-a9fc-4ed61c56d98c", content: "I) Argônio (gás inerte);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 4 },
            { id: "b663c664-8081-43b6-8bcc-745de31629cc", content: "J) Oxigênio (gás comburente).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "211aa0fc-9905-4aa2-a79c-9f5cc7f3d810",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 33",
        content: "Resolva a questão abaixo.",
        position: 29,
        activity: {
            id: "d2245979-c7b7-4ff8-8ce3-923105487e10",
            activity_type: "multiple_choice",
            statement: "Existe uma grande similaridade entre os critérios de classificação relativos à Especificação AWS A5.1 e à A5.5. Identifique a seguir qual critério não é comum às duas Especificações. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "c3bb58b5-fd53-4538-bc56-b3c03e188c0c", content: "F) Propriedades mecânicas do metal de solda;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "8dae1d44-2918-4831-af4a-f74a5b5b4672", content: "G) Tipo de corrente elétrica;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "f5c72ef2-5f8a-4c2b-93f7-39f715f4e7a5", content: "H) Posições de soldagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "dbfc4382-c98f-4a00-8696-2f14fa51c6f6", content: "I) Composição química do metal depositado;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 4 },
            { id: "05f9f702-35a3-4669-ac04-513958c98b62", content: "J) Tipo de revestimento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "06677b1a-865b-481e-925a-d9850ec28463",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 34",
        content: "Resolva a questão abaixo.",
        position: 30,
        activity: {
            id: "c06dd728-8ec8-447c-90a0-4de35fa33f53",
            activity_type: "multiple_choice",
            statement: "Analise a seguinte situação: soldagem de um aço carbono (limite de resistência à tração igual a 68 ksi) pelo processo arco submerso (SAW), devendo obrigatoriamente ser tratado termicamente após a soldagem. Utilizar um arame sólido que tenha baixo teor de carbono, um teor mediano de Mn em sua composição química e que tenha sido, durante sua fabricação, acalmado pelo silício. Informa-se que a temperatura adotada no ensaio de impacto, na homologação da combinação arame-fluxo, foi de 0ºC. Com as informações fornecidas anteriormente, identifique quais classificações AWS do fluxo e arame deverão ser usados na soldagem em questão. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "9e35eb1a-8c86-49be-a9aa-8698104f70ee", content: "A) F7A0-EM8K", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "fa91a829-156b-4f72-b693-cf9a84bc9a12", content: "B) F6PZ-EM8", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "3eece48e-a327-4ee5-93ea-320cb6dc9094", content: "C) F6A0-EL12", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "cfefe9f6-46bd-434a-bb04-d3d82461b91e", content: "D) F7PZ-EL12K", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "f266f126-737b-4edd-a3c1-b4a70ebdcdb3", content: "E) F7P0-EM8K", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "567b390d-9dd5-4840-998b-1eb34dd5fb9f",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 36",
        content: "Resolva a questão abaixo.",
        position: 31,
        activity: {
            id: "a69fd948-033b-4fe9-a4ea-4aecac2af948",
            activity_type: "multiple_choice",
            statement: "Quanto ao transporte e armazenamento de Eletrodos Revestidos, identifique a alternativa correta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "892404f7-839e-40d9-a997-1a96154e87af", content: "A) Os cartuchos plásticos (tipo de embalagem de eletrodos) devem ser armazenados no sentido horizontal.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "889dde23-7df6-40f8-b481-597daa280c62", content: "B) As latas devem ser armazenadas na posição vertical, com as pontas de pega voltadas para cima;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "4a5621ff-c0c1-44a3-848a-d45ee73e9ec6", content: "C) Após as latas serem descarregadas do caminhão, proveniente do fabricante do consumível, aquelas devem ser transportadas sobre “pallets” (estrados de madeira) por meio de empilhadeiras.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "3c610743-c14e-4da3-a8b2-7816aefc26f0", content: "D) Sobre cada estrado de madeira do tipo padrão é possível colocar até quatorze camadas de latas;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "54582118-3e7f-436d-85de-e815727eb5db", content: "E) Tendo em vista que as embalagens dos eletrodos revestidos são consideradas estanques, basta que as mesmas sejam acomodadas em locais com baixa umidade relativa do ar  e temperaturas superiores a 50ºC para que a validade de uso daqueles consumíveis seja prolongada por mais 3 anos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "96145aec-146b-4b66-912c-f3b4d31706b7",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 100",
        content: "Resolva a questão abaixo.",
        position: 32,
        activity: {
            id: "395f78ae-930e-4f38-acdd-79c075d64262",
            activity_type: "multiple_choice",
            statement: "m; ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "222dd257-3688-454f-9204-517cd86018cd", content: "C) A estufa destinada a secar os eletrodos e fluxos deve ser capaz de atingir 400ºC;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "0fd1c828-fd7b-49f0-a278-08619a246197", content: "D) A camada de eletrodos, colocados em uma estufa de manutenção da secagem, não deve ter uma altura superior a 150 mm;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "4f6def79-3b98-4688-a293-598468b85bff", content: "E) Deve-se dar prioridade ao uso de estufa de formato retangular, em comparação com aquela de formato cilíndrico, visto que a primeira possui um  espaço interno maior do que a segunda, permitindo que se consiga secar uma maior quantidade de eletrodos durante um turno de trabalho.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 3 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "34fbaa54-bd1a-49ba-85f7-faa03aabe890",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 33,
        activity: {
            id: "5d35c079-beb2-46a3-89f1-f4a8dbe60413",
            activity_type: "multiple_choice",
            statement: "8 ficam sujeitas a não serem usadas, possibilitando a contaminação do revestimento pela umidade do ar; ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "f7c729d3-dcac-48e3-a6b5-923eef50f162", content: "D) O aquecimento existente no interior desta estufa se dá por meio de resistências elétricas;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 1 },
            { id: "bde5288c-1365-42db-bfe1-0c0055c5c839", content: "E) O soldador deve verificar constantemente se a conexão elétrica da estufa com a rede de energia se encontra em bom estado de conservação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "c3e298b2-36bc-44bc-95c5-406f932f7da3",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 40",
        content: "Resolva a questão abaixo.",
        position: 34,
        activity: {
            id: "6bfee3db-3e05-4603-aaed-105332767be1",
            activity_type: "multiple_choice",
            statement: "Quanto às funções do revestimento dos eletrodos revestidos, marque a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "0278fc01-ae9b-4969-be50-db678b64ada6", content: "A) Uma das funções elétricas do revestimento é permitir a abertura e a manutenção do arco elétrico; esta característica é produzida pela presença de substâncias como os silicatos de sódio e potássio;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "8b3c7dea-282c-4ae2-98a5-b7ca15918e33", content: "B) A formação de fumos mais pesados do que ar para proteger tanto as gotas sendo transferidas no interior do arco, assim como a poça de fusão, isto é uma função física do revestimento;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "6230219f-b205-49bd-88fa-7e3b786f2aa7", content: "C) Uma das funções elétricas do revestimento é apresentar uma excelente condutibilidade elétrica;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "f77eb04a-1cb5-46ac-84be-9e0906248d21", content: "D) Introduzir elementos químicos que refinam a estrutura do metal depositado é uma função metalúrgica do revestimento;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "83791e21-4209-4ac6-8445-79a9c6a8d91c", content: "E) Uma função física do revestimento é a produção de escória durante a soldagem, que tem uma ação tanto na fase líquida do metal, quanto na fase quando o metal de solda já se encontra solidificado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "14756d40-6fa9-4cfd-b715-d7523a8d4aff",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 41",
        content: "Resolva a questão abaixo.",
        position: 35,
        activity: {
            id: "f1d4961d-df55-4614-8812-30a5f35dc17a",
            activity_type: "multiple_choice",
            statement: "Dos diferentes tipos de consumíveis de soldagem empregados na soldagem de aços carbono pelo processo a arco submerso (SAW), identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "ea0e99fb-81dc-45fc-b095-f9486d2722a3", content: "F) Arame sólido;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "9f03f6a6-180e-471a-b5c0-84afde59b430", content: "G) Arame tubular com núcleo metálico, do inglês “metal cored”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "cf2c9107-2d09-4f4f-83c9-222b48dbf770", content: "H) Fluxo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "a30a8443-3072-4578-8eb7-f5f1737e3701", content: "I) Fita metálica;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "9cba5779-11c6-4fb9-bbca-f8e45390ccb9", content: "J) Eletrodo composto ou, do inglês, “composite electrode” (similar ao arame tubular, porém desenvolvido especificamente para o processo a arco submerso).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "b6f38064-cfef-4431-a067-acc0a7722ead",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 42",
        content: "Resolva a questão abaixo.",
        position: 36,
        activity: {
            id: "346db8b7-5fe7-4f3f-b495-62f65e0d7780",
            activity_type: "multiple_choice",
            statement: "Em relação aos fluxos empregados no processo de soldagem a arco submerso (SAW), marque a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "36bdbadf-3c40-4c96-8d07-bf59e0b65a95", content: "A) Os fluxos, quanto às suas características químicas, podem ser do tipo “ácidos”, “neutros” ou “básicos”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "36b89f32-f25f-405c-98c0-745a06404057", content: "B) Quanto à sua capacidade de alterar a composição química do metal de solda, os fluxos podem ser classificados como “ativos” ou “neutros”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "46f512ee-bd92-450a-bcf6-a9047878c0cd", content: "C) Independentemente da forma como os diferentes tipos de fluxos são produzidos, ou seja, se são do tipo “fundidos” ou “aglomerados”, os fluxos apresentam a grande vantagem de não absorverem a umidade do ambiente, evitando desta forma a contaminação do metal de solda pelo hidrogênio;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "48749519-5cdf-4d64-9d42-8fdeb03941dd", content: "D) Os fluxos do tipo “básico”, assim como os eletrodos revestidos básicos, são altamente higroscópicos, sendo imprescindível sua ressecagem anteriormente ao seu uso;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "0f2ac287-2f53-433b-a7f4-470c529f5f2c", content: "E) Na composição química de alguns tipos de fluxos, é possível de, além de encontrar elementos químicos, cuja função principal é de aumentar a resistência mecânica e a tenacidade do metal de solda, é possível também encontrar a presença do elemento Ferro, cujo objetivo principal é aumentar a produtividade do trabalho (taxa de deposição).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "047f482c-0150-473c-bfc8-632e683fed1f",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 43",
        content: "Resolva a questão abaixo.",
        position: 37,
        activity: {
            id: "ac7581e3-03f1-4f93-9f55-bb4a63d8a9e6",
            activity_type: "multiple_choice",
            statement: "Os eletrodos revestidos com classificações AWS E7024, E7018 e E7028 possuem uma determinada quantidade de pó de Ferro em seus revestimentos. Esta adição deste material faz aumentar o rendimento desses consumíveis. Através dessas informações, marque a alternativa que melhor define “Rendimento do Eletrodo Revestido” ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "88db3755-c188-4108-b254-fed85b4f0bc1", content: "A) É a relação entre o peso do eletrodo revestido e o peso do metal depositado;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "8445179b-1557-4cb5-b603-2cfdae952703", content: "B) É a relação entre o peso do metal depositado e o peso do eletrodo revestido;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "f571820f-4ed7-4216-a2e7-81945ee48a7e", content: "C) É a relação entre o peso da alma do eletrodo revestido e o peso do metal depositado;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "95dd6978-b051-412b-954b-e65ecdfe0846", content: "D) É a relação entre o peso do metal depositado e o peso do metal de solda;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "fc0f5023-920b-49d4-85f5-eba14700cdc1", content: "E) É a relação entre o peso do metal depositado e o peso da alma do eletrodo revestido.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "52cc51d6-6dfb-424f-87d5-83bb355f7a1e",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 44",
        content: "Resolva a questão abaixo.",
        position: 38,
        activity: {
            id: "5f5444ad-b3e4-4737-80d4-6bcc716da1bc",
            activity_type: "multiple_choice",
            statement: "Foi feita uma comparação entre o valor da perna de uma solda em ângulo informado em um determinado desenho de fabricação e o valor da perna real medida na própria obra. O valor da perna informado no desenho era de 5 mm, enquanto o valor da perna real (medida) foi de 8 mm. Estes valores mostram que houve um grande desperdício na execução desta tarefa. Calcule o percentual de aumento da produção de uma solda em ângulo entre as pernas teórica e real. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "13f348fe-b57c-436f-a7d4-8c0207463fa5", content: "A) 3%", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "284bba09-1028-4369-9f6e-80cdcda63b84", content: "B) 60%", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "7b9792f5-5c5c-411b-8329-99e6561af1ab", content: "C) 30%", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "ce5d6ddd-afeb-4bb1-925e-bf997a59eb5f", content: "D) 100%", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "587e51fd-6828-4819-93b1-93b62602f8a8", content: "E) 256%", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "3df7740f-4b8d-45ae-a136-076af49e5fb5",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 45",
        content: "Resolva a questão abaixo.",
        position: 39,
        activity: {
            id: "aa13d423-be8c-43cb-bd94-834fa83eeb03",
            activity_type: "multiple_choice",
            statement: "O eletrodo revestido é considerado o consumível de menor eficiência de deposição entre todos aqueles utilizados na indústria. A seguir são apresentados os motivos que justificam esta afirmação. Marque a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "7052f5b6-8072-4362-9ef7-8194e2b7390a", content: "F) Queima do revestimento;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "c581cafc-8758-4743-8e79-c3db8e089150", content: "G) Produção de respingos;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "1b26bc91-2a7c-4914-a39c-25e4e95777ef", content: "H) Volatilização de uma parte dos metais encontrados tanto na alma quanto no revestimento;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "a0a73f84-9b9c-4d93-b7ba-38e577b020c9", content: "I) Umidade absorvida pelo revestimento do eletrodo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 4 },
            { id: "ca9c5ca1-f8e5-445a-905c-5f59b36438d4", content: "J) Pega da ponta.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["44699ae9-f5da-45f5-94fe-329e2bc637d2"].push({
        id: "59fe3acd-4997-48c3-a375-5f4562281f1e",
        lesson_id: "44699ae9-f5da-45f5-94fe-329e2bc637d2",
        step_type: "activity",
        title: "Questão 46",
        content: "Resolva a questão abaixo.",
        position: 40,
        activity: {
            id: "270cffac-65c5-472c-9e86-2421b5cadc6f",
            activity_type: "multiple_choice",
            statement: "De onde provém os principais elementos químicos encontrados no metal depositado produzido por um eletrodo revestido pertencente à Especificação AWS A5.5? ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "349bf4b0-6622-42ce-856b-6d5471232796", content: "A) Da alma do eletrodo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "922bd06b-a667-415d-ba21-1e8f0ea887b9", content: "B) Da alma e do revestimento do eletrodo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "c5e35bdb-cf6c-43c0-902d-4db77f25b8e2", content: "C) Do revestimento do eletrodo;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "6ba6c0ca-5f3e-4b23-a919-19934bf028c4", content: "D) Do fluxo depositado sobre o arco elétrico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "fc7d3767-2901-470f-932d-b11693218198", content: "E) Do revestimento do eletrodo e do fluxo depositado sobre o arco elétrico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_MODULES.push({
        id: "92765d58-432b-4836-ad37-ba8afbdf0de6",
        course_id: "c5555555-5555-5555-5555-555555555555",
        title: "Introdução",
        description: "Questões e atividades sobre Introdução",
        position: 2,
        is_published: true
    });

    STATIC_LESSONS.push({
        id: "34268133-9e62-4e32-81bd-90e3d1b43a68",
        module_id: "92765d58-432b-4836-ad37-ba8afbdf0de6",
        title: "Prática - Introdução",
        description: "Exercícios do banco.",
        estimated_minutes: 60,
        position: 1,
        lesson_type: "interactive",
        is_published: true
    });
    
    if (!STATIC_LESSON_STEPS["34268133-9e62-4e32-81bd-90e3d1b43a68"]) {
        STATIC_LESSON_STEPS["34268133-9e62-4e32-81bd-90e3d1b43a68"] = [];
    }

    STATIC_LESSON_STEPS["34268133-9e62-4e32-81bd-90e3d1b43a68"].push({
        id: "1fbb02da-6415-4214-9e6a-0af87ef86275",
        lesson_id: "34268133-9e62-4e32-81bd-90e3d1b43a68",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 1,
        activity: {
            id: "f4597084-4f2f-4297-9a80-27cb6e0ab2b2",
            activity_type: "multiple_choice",
            statement: "Um Inspetor de Soldagem Nível 1 foi indicado para participar de uma qualificação de um procedimento de soldagem. Das alternativas apresentadas abaixo, marque a única que realmente representa a sua atuação. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "348f030f-4a9b-4315-b346-711072e6d24a", content: "A) Interpretar os requisitos da norma técnica, no que se refere à soldagem, que conduzirá a qualificação;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "4db05748-fc9a-48b5-9a70-df9c49180f6b", content: "B) Analisar os resultados dos ensaios não destrutivos realizados durante a qualificação;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "79d50e63-12a6-4a0b-b214-554351b9b79f", content: "C) Acompanhar a execução das peças de teste;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "bbde37eb-399c-4725-b0b5-76576e2763f5", content: "D) Aprovar a qualificação ao final de todo o processo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "f490a672-101c-426e-b9ca-77d0e4ddacc6", content: "E) Testemunhar a execução do ensaio mecânico de tração.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["34268133-9e62-4e32-81bd-90e3d1b43a68"].push({
        id: "62836631-6795-4369-b6ef-c2c7a8335922",
        lesson_id: "34268133-9e62-4e32-81bd-90e3d1b43a68",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 2,
        activity: {
            id: "8d596afa-ebc7-4d22-aeb1-eae2c6d7da4f",
            activity_type: "multiple_choice",
            statement: "Durante a soldagem de uma junta de um determinado equipamento, qual das alternativas abaixo não condiz com a atuação de um Inspetor de Soldagem Nível 2. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "ef40ae3b-65fd-4839-9e08-24120373e943", content: "A) Verificar a atuação dos soldadores na execução dos serviços;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "5c818f57-cf12-48e3-b845-5975bb495338", content: "B) Verificar se a Especificação de Procedimento de Soldagem, que está sendo utilizada, está adequada ao serviço que se encontra em execução;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "0539a07a-6ed1-49e5-91a4-7acf9f6a892d", content: "C) Verificar se o soldador, que está executando a soldagem, está qualificado para a realização do serviço;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "97a150ba-f8a2-4084-a1e2-0f537521e3a3", content: "D) Emitir laudo do ensaio não destrutivo Líquido Penetrante executado na face do chanfro antes do início da soldagem;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "46550ce6-ee17-4671-b206-26e34efffc3a", content: "E) Verificar se os equipamentos de soldagem utilizados estão de acordo com o especificado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["34268133-9e62-4e32-81bd-90e3d1b43a68"].push({
        id: "f6429a64-fe5c-4fd8-8bf1-b2004cd38425",
        lesson_id: "34268133-9e62-4e32-81bd-90e3d1b43a68",
        step_type: "activity",
        title: "Questão 3",
        content: "Resolva a questão abaixo.",
        position: 3,
        activity: {
            id: "9cf59e9b-d39e-4ae2-b02d-37a911f32054",
            activity_type: "multiple_choice",
            statement: "Após a finalização da soldagem de uma junta de topo, um Inspetor de Soldagem Nível 1 foi chamado para acompanhar a realização de um tratamento térmico. Assinale a única atividade que não condiz com a sua atuação. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "295fcfaa-0e6b-4264-8ffd-395c3a642274", content: "A) Verificar se a execução do tratamento térmico está sendo conduzido de acordo com os procedimentos de tratamento térmico e as instruções de fabricação e /ou execução; 2", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "48bce739-1061-4c03-a2b7-4ed3d3457045", content: "B) Permitir que o tratamento térmico seja realizado após a soldagem, independentemente do resultado dos ensaios não destrutivos;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "d121ba0d-6821-482f-8571-65371c87801b", content: "C) Verificar se os ensaios não destrutivos realizados após o tratamento térmico foram realizados por profissionais qualificados.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "b3dd871c-7191-44a4-90d9-ace51d4e21fa", content: "D) O Inspetor de Soldagem Nível 1 não pode verificar se o tratamento térmico está sendo executado de acordo com as normas e especificações técnicas, tendo em vista que esta atividade só pode ser realizada por um Inspetor de Soldagem Nível 2.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "65f2c9fa-a519-46b8-94c9-6e803e5557bf", content: "E) Não é obrigatória a presença do Inspetor de Soldagem Nível 1 durante a realização do tratamento térmico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["34268133-9e62-4e32-81bd-90e3d1b43a68"].push({
        id: "71254fe2-0e6d-4e00-85fd-59ac2b3eab90",
        lesson_id: "34268133-9e62-4e32-81bd-90e3d1b43a68",
        step_type: "activity",
        title: "Questão 4",
        content: "Resolva a questão abaixo.",
        position: 4,
        activity: {
            id: "e8ff0d5b-c3e1-47c7-9512-ad8cf027f638",
            activity_type: "multiple_choice",
            statement: "Dentre as muitas atividades existentes durante a qualificação de um procedimento de soldagem, assinale a única atividade que um Inspetor de Soldagem Nível 2 não pode realizar. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "12d3d91c-9865-4fbe-b6b6-0c6d817a72c7", content: "A) Realizar os dois ensaios de tração transversal;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "865dc64d-1d25-4a4b-89ca-194e19b1b56d", content: "B) Testemunhar a execução do ensaio de impacto;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "ff065f3e-ac82-43ec-b7f2-49de64a01b76", content: "C) Avaliar os resultados de todos os ensaios mecânicos em comparação com os critérios estabelecidos pelas normas técnicas;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "3df3d0c4-ac5e-415d-82d4-88d53d0246df", content: "D) Emitir laudo do ensaio macrográfico realizado;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "56dee7bb-67c6-4c92-b433-35db10d48f62", content: "E) Testemunhar as condições de preparação dos corpos-de-prova.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["34268133-9e62-4e32-81bd-90e3d1b43a68"].push({
        id: "c8e4f47b-e611-41ff-8bee-48a367270b22",
        lesson_id: "34268133-9e62-4e32-81bd-90e3d1b43a68",
        step_type: "activity",
        title: "Questão 5",
        content: "Resolva a questão abaixo.",
        position: 5,
        activity: {
            id: "c639b0ef-1999-45ee-893e-2db56892c92a",
            activity_type: "multiple_choice",
            statement: "Correlacionando a atuação do Inspetor de Soldagem Nível 2 com os ensaios mecânicos que fazem parte da qualificação de um procedimento de soldagem, marque a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "f71b5d04-aaad-4c9b-8b87-843755960464", content: "A) O Nível 2 pode testemunhar a execução do ensaio de dobramento;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "dca76b27-9684-4316-accd-f47a0dc1a78a", content: "B) O Nível 2 está autorizado a determinar o ensaio de dureza por meio de medidores portáteis;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "c4176966-3406-42bb-bac7-521d0e778012", content: "C) O Nível 2 pode emitir laudos dos corpos-de-prova referentes aos ensaios macrográficos;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "58928837-c7b8-4fc5-a1e4-3fd7155de75a", content: "D) O Nível 2 pode testemunhar as condições de preparação de todos os corpos-de-prova confeccionados para a qualificação em questão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "33c68849-66be-47fb-8c05-b5cdcbede0f5", content: "E) O Nível 2 pode testemunhar a execução do ensaio de tração.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["34268133-9e62-4e32-81bd-90e3d1b43a68"].push({
        id: "b7a0ffc2-06f9-47bb-afc1-0c25a63c6ff7",
        lesson_id: "34268133-9e62-4e32-81bd-90e3d1b43a68",
        step_type: "activity",
        title: "Questão 6",
        content: "Resolva a questão abaixo.",
        position: 6,
        activity: {
            id: "5e872dee-6843-4ae5-bc92-6682db00bd46",
            activity_type: "multiple_choice",
            statement: "Quando se refere aos temas “Consumíveis de Soldagem” e “Material de Base”, indique qual das alternativas abaixo é de responsabilidade única do Inspetor de Soldagem Nível 2: ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "08b0e9fd-b014-453f-bd25-b2c2af1c123e", content: "A) Contatar o Setor de Vendas do fabricante do material de base (aço) para solicitar o material de base necessitado;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "a9a7cfd8-0157-4f61-ab29-d77e62f41560", content: "B) Através da comparação entre marcações e documentos aplicáveis, checar se o material de base comprado foi exatamente o especificado;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "2ea213ea-2655-472c-9729-29ff8d7fdfa6", content: "C) Verificar se os consumíveis de soldagem estão sendo corretamente armazenados, conforme recomendação do fabricante ou outros documentos aplicáveis;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "99352997-9b56-4523-8d24-75a1c87224f4", content: "D) Verificar se os consumíveis de soldagem recebidos na fábrica estão corretos, comparando entre os certificados de qualidade dos consumíveis e os requisitos das normas e especificações técnicas dos produtos;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "be7b35bc-3898-486e-b6de-3e805d920cc6", content: "E) Verificar se, dependendo do teor da umidade relativa do ar, haverá a necessidade de aumentar o tempo de ressecagem dos eletrodos revestidos básicos, conforme estabelecido no catálogo do revendedor do consumível.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["34268133-9e62-4e32-81bd-90e3d1b43a68"].push({
        id: "636429e5-7b15-41e0-b776-5c9ebfa17d90",
        lesson_id: "34268133-9e62-4e32-81bd-90e3d1b43a68",
        step_type: "activity",
        title: "Questão 7",
        content: "Resolva a questão abaixo.",
        position: 7,
        activity: {
            id: "bce688a3-895e-4dae-9963-1c657b1b6423",
            activity_type: "multiple_choice",
            statement: "Em relação ao Termo de Conduta e Ética que regem o Sistema Nacional de Qualificação e Certificação de Inspetores de Soldagem, marque a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "2fcd3214-bb6b-4709-99d6-5215e8c81ccd", content: "A) Caso um dos itens que constam no Termo de  Conduto e Ética não seja respeitado, a penalidade que será imposta ao Inspetor de Soldagem é a revogação de sua certificação;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "e160e13f-1796-415a-afef-ccfed116dc83", content: "B) O Certificado obtido pelo Inspetor de Soldagem só será válido se o profissional atender os critérios exigidos pela Norma NBR 14842;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "5666f8d3-11b7-4273-abd4-32832dfc6ef6", content: "C) Em nenhuma hipótese, tanto os Inspetores de Soldagem quanto os Empregadores, não podem se valer de certificados ou do logotipo do sistema, para fins considerados fraudulentos;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "9cceccf9-ea7f-407e-a509-6d6aa09a6316", content: "D) O Inspetor de Soldagem Nível 2 pode assinar e atuar em qualquer Norma(s) Principal(is) de Qualificação, desde que ele comprove, em carteira, que tenha 15 anos, no mínimo, de experiência profissional na área da Soldagem;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "c08e88bc-70b7-445c-aae8-6ae56047836d", content: "E) O certificado atesta que o Inspetor de Soldagem demonstrou nível de competência aceitável através dos exames de qualificação realizados no CEQUAL.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["34268133-9e62-4e32-81bd-90e3d1b43a68"].push({
        id: "3ad474f7-6399-41b5-bb46-41a68054a3f1",
        lesson_id: "34268133-9e62-4e32-81bd-90e3d1b43a68",
        step_type: "activity",
        title: "Questão 8",
        content: "Resolva a questão abaixo.",
        position: 8,
        activity: {
            id: "d4be28e5-5e78-4cb4-b1b7-04d8611e7ef3",
            activity_type: "multiple_choice",
            statement: "Em relação à validade do Certificado obtido pelo Inspetor de Soldagem após sua aprovação, marque a única alternativa incorreta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "9671f5da-bc78-4833-b0cc-de72c5d6d7c4", content: "A) O mesmo só é válido quando todas as taxas tenham sido pagas pelo Inspetor;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "fc9245f7-d343-4f91-ba54-9053549a4578", content: "B) A única assinatura que deve constar no certificado é a do próprio Inspetor;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "bc13eeb0-87ef-4fa9-afce-23ee3d1e20b7", content: "C) O período de validade do certificado se encontra registrado no verso do documento;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "abcd2f0d-9564-4189-87a4-a482ee6def64", content: "D) O papel do certificado deve estar timbrado com o logotipo do sistema;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "66fea638-0b4c-4f59-bfaf-6d701113cede", content: "E) O Inspetor deve comprovar aptidão física e acuidade visual, de acordo com os critérios estabelecidos pela Norma NBR 14842.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_MODULES.push({
        id: "7b224f23-1a47-428e-a687-cc8d6383d05f",
        course_id: "c5555555-5555-5555-5555-555555555555",
        title: "Metalurgia da Soldagem",
        description: "Questões e atividades sobre Metalurgia da Soldagem",
        position: 3,
        is_published: true
    });

    STATIC_LESSONS.push({
        id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        module_id: "7b224f23-1a47-428e-a687-cc8d6383d05f",
        title: "Prática - Metalurgia da Soldagem",
        description: "Exercícios do banco.",
        estimated_minutes: 60,
        position: 1,
        lesson_type: "interactive",
        is_published: true
    });
    
    if (!STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"]) {
        STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"] = [];
    }

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "bcc85389-df6b-4af2-ae6f-846783e01981",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 1,
        activity: {
            id: "2b327ce4-c6a6-4e86-b29f-c24209e61072",
            activity_type: "multiple_choice",
            statement: "Quanto ao aporte térmico (“heat input”) produzido durante a soldagem, pode-se afirmar que: ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "58f8bf5b-b3d3-4290-b75c-62364233a089", content: "K) O aporte térmico que se introduz em uma junta é cada vez maior, quando os valores de corrente e tensão do arco são cada vez menores, se mantendo a velocidade de soldagem constante.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "d4834c88-e9c9-435e-a283-2fbdb5ef2755", content: "L) O aporte térmico é diretamente proporcional aos valores da corrente elétrica e tensão, e inversamente proporcional à velocidade de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "fde07335-1005-486a-ab56-0dfd12e4c306", content: "M) O aporte térmico é diretamente proporcional à velocidade de soldagem, e inversamente proporcional aos valores da corrente elétrica e tensão.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "d77a51f0-95c7-48e6-8c35-10bfa6a8f972", content: "N) O aporte térmico é uma variável que depende diretamente das propriedades física e mecânica do metal de base que será soldado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "23d866c2-5229-4367-919b-9d0dfc9aaefd", content: "O) Quanto maior a velocidade de alimentação de arame nos processos GMAW e FCAW, menor o aporte térmico introduzido na junta durante a soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "30b5099f-259a-498b-98f4-65588ac06a30",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 2,
        activity: {
            id: "431fb893-0444-4934-9298-bcbf29aaf665",
            activity_type: "multiple_choice",
            statement: "Analisando os diferentes tipos de sistema cristalino (“Cúbico de Corpo Centrado” – CCC, “Cúbico de Face Centrada” – CFC e “Hexagonal Compacto” - HC) que podem ser encontrados nos metais sólidos, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "9537f3bc-cb43-491d-93fa-fa5ece79851e", content: "A) A vibração dos átomos em uma estrutura cristalina é função direta da temperatura; ou seja, quanto maior a temperatura, maior a vibração dos átomos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "ce6f057d-735f-4292-b99b-9b9bc7b2fa67", content: "B) O sistema cristalino “Cúbico de Corpo Centrado” (CCC) é representado por um cubo, tendo 8 átomos localizados em seus vértices e um no centro. O Fe, à temperatura ambiente, apresenta este tipo de sistema cristalino.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "9db08e45-e217-4d94-8c72-982aaa21aa71", content: "C) O sistema cristalino “Cúbico de Face Centrada” (CFC) é representado por um cubo, tendo 8 átomos localizados em seus vértices e 6 átomos dispostos no centro das faces. Os metais Níquel e Alumínio são exemplos de materiais metálicos que apresentam este tipo de sistema cristalino.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "6d3228c3-11cc-44d0-89ff-55c1dce1f61b", content: "D) As células unitárias dos metais que apresentam um sistema cristalino do Cúbico de Face Centrada (CFC) possuem maior número de planos de maior densidade atômica do que os metais Cúbicos de Corpo Centrado (CCC) e por esta característica os metais do tipo CFC apresentam menor tenacidade do que os metais do tipo CCC.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "b6998d4f-de41-4c58-bb14-97ce424c4cdb", content: "E) A Martensita é uma microestrutura que apresenta um sistema cristalino do tipo Hexagonal Compacto.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "785ef865-330e-41fc-a7e7-48cf7732de64",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 3",
        content: "Resolva a questão abaixo.",
        position: 3,
        activity: {
            id: "b81624a5-1d8c-436c-8e8b-def1f63b95f2",
            activity_type: "multiple_choice",
            statement: "Quais são os nomes das soluções sólidas de carbono no “ferro delta”, no “ferro gama” e no “ferro alfa”, respectivamente: ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "12188856-3e22-4cf8-909d-18beebe505d0", content: "A) Ferrita delta, austenita e ferrita.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "eeda8926-6c0d-4651-a0fd-3da88d83fa9a", content: "B) Ferrita delta, ferrita e austenita.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "11fb7837-3bbe-4a3d-973e-980531a55893", content: "C) Austenita, ferrita delta e ferrita.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "9459756b-5c8c-416e-a121-8b7437bffacc", content: "D) Austenita, ferrita e ferrita delta.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "1f5bfbef-f1f4-4f31-89fd-6094a6ddf04a", content: "E) Ferrita, austenita e ferrita delta.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "cab9f415-e939-4118-964b-aa7dc50a6727",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 4",
        content: "Resolva a questão abaixo.",
        position: 4,
        activity: {
            id: "e7b35925-dc5e-43b4-84a9-49ae8f018d24",
            activity_type: "multiple_choice",
            statement: "A Difusão dos átomos é um fenômeno extremamente presente e importante na soldagem de metais e suas ligas. Das alternativas a seguir abordando este fenômeno, assinale aquela incorreta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "a2848326-73f0-4d2b-b28c-43b9a0f55a3f", content: "A) Na região cortada de um aço carbono, por exemplo, pelo processo oxi- gás, constata-se ali um enriquecimento de carbono, como conseqüência da difusão dos átomos de C pelo calor produzido pela chama do gás.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "8251af1d-19ac-4913-be79-211b938a2ab4", content: "B) A difusão dos átomos é capaz de modificar as propriedades mecânicas de uma determinada região do material metálico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "1d69b603-5733-4ce4-be09-bdb12e5cb7b0", content: "C) O aumento da temperatura em um metal (ou liga metálica) no estado sólido produz uma menor vibração dos átomos em torno da sua posição de equilíbrio.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "3f433be5-a330-4bed-8691-0df89f3a49b6", content: "D) A difusão de átomos nos contornos de grão ocorre mais rapidamente do que no seu interior, visto que naquelas regiões não há uma ordenação dos átomos, podendo, dessa forma, existir uma certa quantidade de vazios.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "dc8913d3-3cf6-4c16-8f60-c49874926c42", content: "E) A movimentação atômica, ocorrida em metais no estado sólido, pode ser provocada por uma vibração de átomos, que poderá ser tanto maior, quanto maior for a temperatura daquele material metálico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "0d980a90-58d9-42f2-90de-c786177a1199",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 6",
        content: "Resolva a questão abaixo.",
        position: 5,
        activity: {
            id: "d89b10cc-2c87-443c-851f-34ff9a881375",
            activity_type: "multiple_choice",
            statement: "Das faixas de temperatura apresentadas a seguir, assinale aquela que representa a temperatura de fusão do aço carbono (0,10%C). ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "d0931383-b7fa-4504-b607-e0c9bd8ecc0a", content: "A) 1451 ºC - 1500ºC", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "72a9c68c-bc0f-4023-96d8-b07b3404b0c8", content: "B) 1501 ºC - 1550 ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "c276ced8-ba90-455a-8055-1ca5a7403c23", content: "C) 1401 ºC - 1450 ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "a7191f8b-ca8c-4b19-a0b1-f09fde300459", content: "D) 1351 ºC - 1400 ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "2f9891f2-c8fc-4311-94f4-7afead3401a3", content: "E) 1551 ºC - 1600 ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "e384e4dc-2da2-46ff-a283-9f1d5eb87a34",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 7",
        content: "Resolva a questão abaixo.",
        position: 6,
        activity: {
            id: "731437df-4a9d-4a18-a34a-16f1125dee3a",
            activity_type: "multiple_choice",
            statement: "Analisando os diferentes sistemas cristalinos do aço carbono (0,10%C) em função da temperatura, assinale a alternativa a seguir que mostra esses sistemas à proporção que a temperatura decresce. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "d7594c71-6843-4388-8a0a-b630dab19a45", content: "A) Austenita / Ferrita Delta / Ferrita (alfa).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "fe74a8b7-6f7d-463d-b601-671eb860be3d", content: "B) Ferrita Delta / Ferrita (alfa) / Austenita.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "3d1b91c9-045e-4c32-91c0-df06385b522d", content: "C) Ferrita (alfa) / Ferrita Delta / Austenita.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "82a83cc5-0cf6-4ef9-a241-d3527ffb700f", content: "D) Ferrita (alfa) / Austenita / Ferrita Delta.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "9e083f6c-3532-4093-8ff3-2572dce17faa", content: "E) Ferrita Delta / Austenita / Ferrita (alfa).", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "0787b9b7-a171-4b84-ab92-76142df722ec",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 8",
        content: "Resolva a questão abaixo.",
        position: 7,
        activity: {
            id: "01269594-10e2-423b-8f39-6189a511cb1d",
            activity_type: "multiple_choice",
            statement: "Qual a porcentagem de carbono na Cementita (Fe3C)? ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "25d83464-a1d0-40de-9d63-ce21e1020a37", content: "A) 10,2%", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "b2c632f4-091a-4f98-9110-c3b4cb115bb2", content: "B) 3,4%", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "e8acecef-224d-4f33-9380-6f8a139b54dd", content: "C) 5,0%", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "1c1318ad-5ca7-4fa8-98d2-4f6e0e39cf10", content: "D) 6,7%", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "d9b90129-83a7-4def-9ca7-ab51e6583a4a", content: "E) 9,9%", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "877b9746-45dd-47a1-805b-2714aeefdeae",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 9",
        content: "Resolva a questão abaixo.",
        position: 8,
        activity: {
            id: "260766ed-1f48-4c4a-b6d4-d88a896f3047",
            activity_type: "multiple_choice",
            statement: "Por definição, qual a porcentagem máxima de carbono que pode ser encontrada em um aço? ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "782a9ddb-d525-4f94-ae41-42a11eaccf24", content: "A) 1,0%", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "dfe94839-851f-4da6-ae17-07aa6e7eea13", content: "B) 2,0%", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "5360e238-4572-416f-8a07-65f08d38a7e4", content: "C) 3,0%", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "978a78dd-10fb-4746-8217-751ccffb7730", content: "D) 4,0%", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "15105e49-525a-4157-b204-ae61b4461ae3", content: "E) 5,0%", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "fd568c82-583e-44a3-84e1-265bcbc9ddca",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 10",
        content: "Resolva a questão abaixo.",
        position: 9,
        activity: {
            id: "3687d1fa-a796-45e4-b3d6-6c9187e507c2",
            activity_type: "multiple_choice",
            statement: "O aço é uma liga composta basicamente pelos elementos químicos Fe e C que, em função dos minérios utilizados em sua fabricação, acabam agregando outros elementos químicos em sua composição química. Das alternativas a seguir, identifique o elemento químico que não é encontrado usualmente nos aços carbono. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "3dd95cad-1691-47f3-9774-103e900f20f7", content: "A) Mn", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "9b0be939-5a96-4d7c-bd5e-67fbb146a84b", content: "B) Si", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "64bb6caf-110e-4aa4-a1af-8f0ce6b34b91", content: "C) Nb", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "474215f6-fcc8-4933-9284-fb84539c9109", content: "D) S", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "058b6c6f-5621-4e5a-94f9-cb70af344a75", content: "E) P", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "72e8a9d3-a9c0-450f-a728-7d36899d49be",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 11",
        content: "Resolva a questão abaixo.",
        position: 10,
        activity: {
            id: "7f7a0bd1-3343-4730-8d14-b7d1931d20dd",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas a seguir, identifique os sistemas cristalinos da Ferrita (alfa), Austenita e Ferrita Delta, respectivamente, encontrados no aço carbono. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "3bfc5cef-4d9c-4509-a090-4bd2dad5b700", content: "A) Cúbico de Corpo Centrado; Cúbico de Corpo Centrado; Cúbico de Face Centrada", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "c0cfe7e4-ec7e-410b-9389-009cd7f58e4f", content: "B) Cúbico de Corpo Centrado; Hexagonal Compacto; Cúbico de Corpo Centrado", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "c373ca21-b95f-447a-9949-16c51c1f1402", content: "C) Cúbico de Face Centrada; Cúbico de Face Centrada; Cúbico de Corpo Centrado", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "3484c1c4-b23e-4c8f-b01d-3b23fe4cf520", content: "D) Cúbico de Corpo Centrado; Cúbico de Face Centrada; Cúbico de Corpo Centrado", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "8ca6e7aa-34e9-4401-b618-cb43c2bd3aa6", content: "E) Hexagonal Compacto; Cúbico de Corpo Centrado; Cúbico de Face Centrada", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "12a53e31-71eb-4513-84d2-d3236536ffae",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 12",
        content: "Resolva a questão abaixo.",
        position: 11,
        activity: {
            id: "ca9b52c4-19e4-4c23-bba2-7415cedaf554",
            activity_type: "multiple_choice",
            statement: "O deslocamento para a direita das curvas TTT (Temperatura – Transformação – Tempo) é influenciado por alguns fatores metalúrgicos. Identifique a seguir a alternativa que não afeta esse deslocamento. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "c1a62e8c-7d75-4aeb-b1b6-d16188407253", content: "A) O tamanho do grão da austenita.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "7599255f-76b3-43e9-80f0-7d31a9922cfc", content: "B) O aumento do teor de C (até a percentagem de 0,8%).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "7cde2666-71eb-4b2f-93f2-ea01e3028b9e", content: "C) A homogeneidade do grão da austenita.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "7e58e5ac-9333-4de1-9b12-206f3f1cac88", content: "D) O aumento de teores de elementos de liga (à exceção do Co).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "ee35363d-85b1-4300-84e2-89f2e00bfe51", content: "E) A velocidade de resfriamento durante a soldagem.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "98dbbbb7-7191-464b-b713-00d1fd7b0a11",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 12,
        activity: {
            id: "e7bfe422-972e-4a48-96de-5cabf6d40e01",
            activity_type: "multiple_choice",
            statement: "5 \n\n<img src=\"/images/questions/page145_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "8d8377dd-503c-427b-938f-565fc0f63664", content: "A) Tamanho do grão da ferrita.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "7838b535-d5f6-46d6-b67d-6bf1da5587c0", content: "B) Uso de processos de soldagem que produzem grande aporte de calor.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "7b2295cd-c666-4bc9-9fe0-4bb53e6c4333", content: "C) Adoção da soldagem autógena.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "c63a6372-e9e9-4207-945a-ed138af94251", content: "D) Homogeneidade do grão da ferrita.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "3f517a21-f174-4992-a2c7-59d9a9f1bbc3", content: "E) Uso do gás Argônio no processo de soldagem MIG/MAG (GMAW).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "7db0be17-245f-4a3b-a8d8-794db5eabb35",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 14",
        content: "Resolva a questão abaixo.",
        position: 13,
        activity: {
            id: "413fd60a-3aa9-4b4b-a83f-02fe5a8f34f9",
            activity_type: "multiple_choice",
            statement: "Analisando os pontos relativos aos itens A e B, mostrados na junta soldada de topo apresentada a seguir, identifique a alternativa correta. Admitir que a junta foi soldada com um processo de soldagem a arco elétrico, sem pré- aquecimento e pós-aquecimento, e tratamento térmico de alívio de tensões. \n\n<img src=\"/images/questions/page145_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "729508d4-8750-4979-8d4d-25fd5ec344a1", content: "A) O tempo que o ponto A levou para atingir a sua temperatura máxima é menor do que o tempo que o ponto B levou para atingir a sua temperatura máxima.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "a2f548f0-aa5d-44c2-80c4-3386e1813954", content: "B) O valor de dureza do ponto A é menor do que a dureza do ponto B, independentemente se A e B se encontram dentro ou fora da Zona Termicamente Afetada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "d05d0bab-5a8d-4167-9353-1c260ed09bc6", content: "C) A velocidade de resfriamento do ponto A é maior do que a velocidade de resfriamento ponto B.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "befb8edf-18d9-4721-8ce8-0d7e6c5400d8", content: "D) A temperatura máxima que o ponto A pode atingir é menor do que a temperatura máxima do ponto B.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "5abffba5-4894-4407-8264-e6d8cdf07d09", content: "E) Nenhuma análise pode ser feita, visto que a região da Zona Termicamente Afetada não foi mostrada na junta.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "98a5e465-b9ee-4c07-8636-2068a480e02a",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 14,
        activity: {
            id: "4c7da261-dabb-4ece-ae34-53321a86e864",
            activity_type: "multiple_choice",
            statement: "6 ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "6aa9eb96-191d-4804-859c-c40f17441120", content: "B) Processo TIG (GTAW).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 1 },
            { id: "7787b59d-94c6-41f7-8f21-6fd4acdd8844", content: "C) Processo com Arame Tubular (FCAW).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "600922a1-783d-46e4-892e-7646549bad6d", content: "D) Processo Manual com Eletrodo  Revestido.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "45269b64-77d2-4bc3-b307-dc7f152cd74c", content: "E) Processo a Arco Submerso.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "8e9ebe56-f390-47e0-a690-f4198193412c",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 16",
        content: "Resolva a questão abaixo.",
        position: 15,
        activity: {
            id: "25d33aca-06a2-4cff-a9d3-dcb01c05a137",
            activity_type: "multiple_choice",
            statement: "Caso pudéssemos usar 5 (cinco) diferentes processos de soldagem a arco elétrico [hipótese] para soldar um equipamento (espessura igual a 10 mm) na posição de soldagem Plana, empregando uma intensidade de corrente elétrica igual a 300A, uma tensão do arco igual a 22V e uma velocidade de soldagem igual a 20 mm/segundo, qual dos processos listados a seguir introduziria a maior energia de soldagem (aporte térmico) na junta soldada? ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "92bd8ccd-9585-4c03-95fb-cc9e8372f5f9", content: "A) Processo de soldagem TIG (GTAW)", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "8ec90662-a7f9-4061-ae1b-763d08e8e474", content: "B) Processo de soldagem a arco submerso (SAW)", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "05b552ca-41e8-413b-a34c-4eb4b534bbab", content: "C) Processo de soldagem manual com eletrodo revestido (SMAW)", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "97d5ba88-ac43-46bb-b354-8ef32654084e", content: "D) Processo de soldagem MIG/MAG (GMAW)", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "840ff1bf-c870-4fec-b1d7-5e3e4a2b9834", content: "E) Processo de soldagem com arame tubular (FCAW)", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "32e99457-2780-41d4-bde4-3eb4e936fea5",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 17",
        content: "Resolva a questão abaixo.",
        position: 16,
        activity: {
            id: "0d32cc3e-cb52-4441-a838-95c0b12dc56d",
            activity_type: "multiple_choice",
            statement: "Quanto ao Ciclo Térmico produzido pela soldagem em um determinado ponto da junta soldada, identifique a seguir a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "a819c941-e1fc-4d34-96c4-fd6d4cc8d359", content: "A) Do gráfico relativo ao ciclo térmico, conclui-se que o tempo que um determinado ponto da junta passa pela mesma temperatura (no aquecimento e no resfriamento) será sempre maior, quanto mais baixa for esta temperatura.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "c9795591-5a5c-405d-8b6f-4b4114bc1680", content: "B) Do gráfico relativo ao ciclo térmico, pode-se afirmar que o ponto da junta, em análise, sempre passará pela mesma temperatura duas vezes (uma relativa ao aquecimento e outra para o resfriamento), à exceção do momento quando aquele ponto atingir a temperatura máxima.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "6fcd229e-af1a-452d-b829-f14a84866046", content: "C) Do gráfico relativo ao ciclo térmico, conclui-se que o tempo que se leva para que o ponto atinja a sua temperatura máxima é muito mais rápido do que o tempo necessário para que aquele ponto atinja a temperatura ambiente ao final da soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "915f37b9-d2df-4398-b7f7-5171f76d8d5f", content: "D) O ciclo térmico é uma variação da temperatura em função do tempo em um determinado ponto da junta soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "4c823ac5-b714-4160-96a4-0570baf3140b", content: "E) Analisando uma seção transversal de uma junta soldada, é possível afirmar que dois pontos localizados no mesmo lado da junta, no mesmo plano, mas em posições diferentes da junta, apresentarão o mesmo ciclo térmico.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "5e1738db-4c65-4268-9fbd-de9fdb9c2f16",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 200",
        content: "Resolva a questão abaixo.",
        position: 17,
        activity: {
            id: "a73714a6-ba2b-473b-a26b-bf7114ada466",
            activity_type: "multiple_choice",
            statement: "C. \n\n<img src=\"/images/questions/page147_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "fa72cd2e-23c3-47f9-9e13-bb3af4b4d240", content: "B) A taxa de aquecimento no intervalo 400 – 800 ºC foi de 80 ºC/s.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "b61c5a6e-b09d-4bf7-9309-d39ac88862ba", content: "C) A taxa de resfriamento no intervalo 400 – 800 ºC foi de, aproximadamente, 40 ºC/s.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 2 },
            { id: "153373ed-961b-4be8-90bd-e5c96abb2d25", content: "D) Pela temperatura máxima atingida no ponto A, conclui-se que este ponto encontra-se no interior da Zona Termicamente Afetada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 3 },
            { id: "d5dd1a2f-a2c3-4b66-a360-5ee15769e6a9", content: "E) O procedimento de soldagem não solicitava a realização de um pós- aquecimento", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "2ce8329c-02f5-4934-a402-058268198123",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 18,
        activity: {
            id: "4fb27427-a6be-4638-8848-5298d0d950a2",
            activity_type: "multiple_choice",
            statement: "8 \n\n<img src=\"/images/questions/page148_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "88ba8800-5992-46c2-95c7-4eb06c75be4a", content: "D) A temperatura máxima e a velocidade de resfriamento dependem diretamente das propriedades químicas do material que está sendo soldado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 1 },
            { id: "5cad0039-3796-4e88-943f-a8b7327df8c4", content: "E) A temperatura máxima atingida por um determinado ponto da junta varia diretamente com a sua distância até o centro da solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "cc9fa15e-c219-4185-964a-440e8243210c",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 20",
        content: "Resolva a questão abaixo.",
        position: 19,
        activity: {
            id: "374674e7-0c57-49d3-8473-49359b8f3333",
            activity_type: "multiple_choice",
            statement: "Em relação ao fenômeno da Diluição que ocorre durante a soldagem, identifique a alternativa incorreta apresentada a seguir. \n\n<img src=\"/images/questions/page148_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "d97eb90d-f1ae-442e-9333-a50c68159d9a", content: "A) O estudo da diluição é muito importante, quando da necessidade de soldar metais dissimilares.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "a1e0703d-6471-4969-aa34-d4d41da18ee7", content: "B) A diluição é uma função direta do processo que será usado na soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "929bdc95-fae7-49c8-a39d-0b2a1ae8cd14", content: "C) A diluição é uma função direta do procedimento de soldagem que será usado para executar uma determinada soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "d3d3bf3e-98d9-457e-8e36-02c4f470dc0c", content: "D) A diluição é a movimentação de átomos no estado sólido em função da temperatura encontrada na região que está sendo soldada.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "ed5c94e4-f723-4def-b0f4-2acc4e2d3314", content: "E) Não há diluição quando da realização de uma soldagem autógena entre dois componentes.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "f7435166-2d62-4d6e-b360-1dcc7a701208",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 22",
        content: "Resolva a questão abaixo.",
        position: 20,
        activity: {
            id: "5267645b-d160-466f-a4a4-b96eec777d95",
            activity_type: "multiple_choice",
            statement: "O pré-aquecimento é uma técnica muito importante na soldagem de metais e é muito utilizada na indústria. A seguir, são apresentadas alternativas a respeito desta técnica e solicita-se que aquela incorreta seja identificada. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "de6a08dd-13b2-4f7d-aaf5-c981da6534ee", content: "A) O pré-aquecimento evita a formação de martensita.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "9f9a2813-daba-4cd0-88e5-ee0a3b43e52b", content: "B) O pré-aquecimento aumenta a velocidade de difusão do hidrogênio difusível", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "442e6ce7-2f1f-413d-bfdb-5655c05e7d90", content: "C) O pré-aquecimento só é aplicado na soldagem de metais que apresentam excelentes condutibilidades térmicas, como por exemplo, cobre e alumínio.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "2f09b52f-bd61-41af-a82a-b43e4d5b09ef", content: "D) O principal efeito do pré-aquecimento é reduzir a velocidade de resfriamento da junta soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "9c105b22-3c64-47c8-8865-ae35d80141f9", content: "E) O pré-aquecimento reduz a possibilidade de produzir fissuração pelo hidrogênio na ZTA da junta.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "61625144-77ee-4b94-b335-0d135ca5bc85",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 23",
        content: "Resolva a questão abaixo.",
        position: 21,
        activity: {
            id: "0dd8e02c-8442-4076-856b-55e8a874a254",
            activity_type: "multiple_choice",
            statement: "Em algumas situações, o pós-aquecimento é uma técnica de grande importância na soldagem de materiais metálicos. A seguir, são apresentadas alternativas a respeito desta técnica e solicita-se que seja identificada a afirmativa correta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "b20d2db3-4428-4aee-aa7b-4e6bc6753275", content: "A) O pós-aquecimento pode ser realizado imediatamente após o encerramento da soldagem, podendo também, em inúmeras vezes, ser executado até, no máximo, uma hora após o fim da soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "e15c7586-12b2-4c2f-89a1-785350d785a2", content: "B) O pós-aquecimento deve ser feito em uma faixa de temperatura que varia entre 98 ºC e 102 ºC por um período de 48 horas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "36d38257-28e6-4273-a2a6-99c9d6c4e0b3", content: "C) Tendo em vista que o pós-aquecimento, muitas das vezes, pode ser feito em temperaturas acima de 650 ºC, deve-se tomar muito cuidado para que não seja realizado um tratamento térmico de alívio de tensões na região da junta soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "0fbd7ec1-c80f-4df0-9d9f-5b0902ace7ed", content: "D) Uma recomendação prática, adotada por todas as normas técnicas aplicáveis, estabelece que, toda vez que um pré-aquecimento tiver de ser realizado em junta, soldada, um pós-aquecimento também deve ser feito para eliminar a possibilidade do aparecimento de trinca a frio.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "ca12feba-e8d2-40c7-a779-646096cde65c", content: "E) O principal objetivo do pós-aquecimento é aumentar a difusão do hidrogênio encontrado na junta soldada.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "72c693a5-df18-458b-89f3-0a005af09b37",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 800",
        content: "Resolva a questão abaixo.",
        position: 22,
        activity: {
            id: "4ceefcdd-5e17-43d6-b364-b3812ca7af86",
            activity_type: "multiple_choice",
            statement: "Pa), é solicitada a realização de mais de um Tratamento Térmico de Alívio de Tensões após a soldagem, visto que a realização deste confere àquela região uma maior tenacidade. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "da4f648a-d4c2-4490-805e-4d00d90e1f93", content: "D) Para a realização deste tratamento, não é estabelecida uma maneira específica para o aquecimento e o resfriamento da peça. A temperatura máxima do tratamento é a única variável a ser, efetivamente, levada em consideração.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 1 },
            { id: "5e9e6215-3542-46f4-b29d-6027a569d3d1", content: "E) Tendo em vista que este tratamento, mesmo que bem executado, permite a obtenção de martensita na ZTA, é recomendada a realização de um revenimento logo após o término do primeiro tratamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "9e6836e4-c475-4e98-a864-b36081a01e26",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 0",
        content: "Resolva a questão abaixo.",
        position: 23,
        activity: {
            id: "bdd3fb0e-0442-47ab-93eb-3352eeb49d09",
            activity_type: "multiple_choice",
            statement: "10%C apresentem baixa susceptibilidade à formação de trincas, é fundamental que os eletrodos revestidos básicos sejam ressecados e armazenados após ressecagem, conforme instruções do seu fabricante. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "c46871ea-3283-4017-8fff-a8003e09976e", content: "D) Aços carbono, contendo teores de C próximos a 0,10%, com espessuras superiores a 2” nunca necessitam sofrer um tratamento térmico após soldagem.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 1 },
            { id: "83341d6f-14f9-4f60-9476-c969d06c7474", content: "E) Para a soldagem de aços com espessuras superiores a 25 mm, muitas vezes é recomendada a realização de pré-aquecimento, de controle de temperatura interpasse, assim como de tratamento térmico após soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "ad9038e4-6b1c-4593-8f0d-dcc093975acd",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 24,
        activity: {
            id: "c5ecd083-6930-4c66-90d3-4fb5de0f691c",
            activity_type: "multiple_choice",
            statement: "1 \n\n<img src=\"/images/questions/page151_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "c009a9bd-9712-4ff8-a767-ea67192ac6b9", content: "A) As consequências causadas pela presença de descontinuidades do tipo “Abertura de Arco” serão tão piores, quanto maior o teor de elementos de liga na composição química do aço que está sendo soldado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "58c1b257-b3f1-4b91-b2c1-ec79cc83636d", content: "B) Na soldagem de materiais metálicos com pequenas espessuras, cuidados especiais devem ser tomados quanto à sequência de passes, objetivando diminuir o nível de empeno da obra.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "e8fabc59-975e-420c-985d-0d5218453cd7", content: "C) Tendo em vista que as trincas do tipo “interlamelar” são causadas pela presença de grande quantidade de hidrogênio na solda, é recomendado que haja um maior rigor na execução da ressecagem dos eletrodos revestidos básicos que serão usados na soldagem da junta.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "587bf15f-28cb-4e2c-8125-c63e811491be", content: "D) É recomendável o emprego de processos de soldagem com alta energia de soldagem na soldagem de aços com elevados teores de C e Mn, objetivando diminuir o teor de hidrogênio difusível na solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "0c0bab0c-00f3-4206-b0aa-7f94f40cd9eb", content: "E) Não é necessário fazer um pré-aquecimento para realizar a goivagem a arco de uma determinada região de uma peça.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "fd2bf625-15d5-44a8-8436-aad32335ef8b",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 27",
        content: "Resolva a questão abaixo.",
        position: 25,
        activity: {
            id: "c9511858-47e9-46b6-899b-5282126d24a6",
            activity_type: "multiple_choice",
            statement: "Calcule o valor de Diluição da junta soldada mostrada a seguir. Informa-se que o valor da área do Metal Depositado é igual a 30 mm2. Dimensões em mm. \n\n<img src=\"/images/questions/page151_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "a9256a48-746e-4cd3-ada7-819ba70a51f8", content: "A) 60 mm2", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "066d3dfc-ecac-409f-b194-78c9011734e5", content: "B) 60 %", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "e4a7ca57-e58d-4b85-bfb7-f813285df005", content: "C) 40 %", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "307c842e-5661-440c-bc0f-215e4344d996", content: "D) 40 mm2", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "40cd95e8-2d5f-4815-a71b-3f959f2f747f", content: "E) 50 g", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "48ad5ba7-0667-43c6-a36b-cc5ec74ec0b7",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 26,
        activity: {
            id: "622190f7-9848-42e6-a32c-0bc0ed180f89",
            activity_type: "multiple_choice",
            statement: "2 \n\n<img src=\"/images/questions/page152_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "6e51cc2b-9e54-491f-ab1c-f19aad3f33d1", content: "A) 100ºC – 700ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "922210f2-5ec6-4afa-a876-7c5b67cf8df5", content: "B) 500ºC – 1600ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "ea1434f4-920a-478d-8d3c-2e59c40cc084", content: "C) 700ºC – 1500ºC", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "a9a453e9-5ced-4a68-970f-c2724bbe9475", content: "D) 500ºC – 1500ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "2da4aa28-1ac1-4621-bdf1-45d77251b1c2", content: "E) 700ºC – 1300ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc"].push({
        id: "89cfa03a-d171-441e-9ca8-a9e3f68eaf5b",
        lesson_id: "c7eb84c4-7f35-4cd1-bb8b-993172f8d9dc",
        step_type: "activity",
        title: "Questão 30",
        content: "Resolva a questão abaixo.",
        position: 27,
        activity: {
            id: "c1e806b4-5b74-42df-8c03-2282ca502bef",
            activity_type: "multiple_choice",
            statement: "Analisando metalurgicamente a microestrutura denominada “Martensita”, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "f6a98983-f787-4e69-b7d1-85273e4edce2", content: "A) Cristaliza-se no sistema Cúbico de Face Centrada.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "b273dcee-3ec2-418c-a7c7-b55a06f8fc40", content: "B) É produzida quando um material com microestrutura austenítica se resfria rapidamente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "2c29786e-a9b5-485e-a9f1-6d257d74bac1", content: "C) É uma fase supersaturada de carbono.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "0d841d6d-d528-4e1a-8f70-b2539ecb3149", content: "D) Apresenta dureza muito elevada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "8c2e3778-f1af-4ecf-a0c2-e027aaa023b5", content: "E) Apresenta grande fragilidade.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_MODULES.push({
        id: "2b984a4b-6393-4239-92b7-227adf867d2f",
        course_id: "c5555555-5555-5555-5555-555555555555",
        title: "Controle de Deformações",
        description: "Questões e atividades sobre Controle de Deformações",
        position: 4,
        is_published: true
    });

    STATIC_LESSONS.push({
        id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        module_id: "2b984a4b-6393-4239-92b7-227adf867d2f",
        title: "Prática - Controle de Deformações",
        description: "Exercícios do banco.",
        estimated_minutes: 60,
        position: 1,
        lesson_type: "interactive",
        is_published: true
    });
    
    if (!STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"]) {
        STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"] = [];
    }

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "ccf8d4df-72d5-46e0-a4a9-3bc5076486d1",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 1,
        activity: {
            id: "fbf31b6e-bc55-4bf3-b257-737a1e96c62e",
            activity_type: "multiple_choice",
            statement: "Abordando o tema “Deformação na Soldagem”, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "28b6cf8f-ba33-4786-a82f-13198ddb3a30", content: "P) Quando um material metálico encontra-se posicionado livremente (sem restrições), sua estrutura expande-se em todas as direções quando é aquecida.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "c6f2dfb5-cea4-47e7-bf24-540dd042115a", content: "Q) Um material metálico posicionado livremente, encontrando-se já aquecido e dilatado uniformemente, retorna às suas dimensões originais à proporção que o calor em seu corpo é dissipado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "7cc01291-ea19-4832-be75-128f5d26d8f5", content: "R) Na soldagem de um metal, o volume da poça de fusão (metal de solda no estado líquido) é maior do que o volume do metal de solda solidificado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "85785286-4bf9-4dc5-81d7-6cd5a6e0420d", content: "S) Para corrigir a deformação de um material metálico, basta aquecê-lo, uniformemente, a uma temperatura acima da zona crítica e resfriá-lo livremente ao ar.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 4 },
            { id: "4450d7a5-bd1d-41dc-a9c1-74e500e929f5", content: "T) Quando um material metálico é aquecido, tendo uma de suas laterais restringida, a expansão, provocada pela dilatação, não poderá ocorrer, porém o volume deste material não será impedido de aumentar.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "34c9015e-1f6c-4d4d-b317-a2ae2850f97c",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 2,
        activity: {
            id: "8d21f3df-f04f-428f-bc7b-1d18fc1f539c",
            activity_type: "multiple_choice",
            statement: "Analisando as propriedades físicas e mecânicas de um aço carbono em função da temperatura, assinalar a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "5814de65-0b22-42ac-bb29-6b0a5f5b70b5", content: "A) O coeficiente de dilatação térmica do aço diminui, quando a temperatura aumenta.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "9a9f4b7f-cd5f-4255-9b94-8d97483527cf", content: "B) O limite de escoamento do aço diminui, quando a temperatura aumenta.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "b2355500-fa49-4546-8e1c-a34ae85bdaf7", content: "C) A dureza do aço diminui, quando a temperatura aumenta.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "5b0b3e5e-18ed-4e2b-9f58-a984135d769e", content: "D) O módulo de elasticidade do aço diminui, quando a temperatura diminui.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "b2060599-626f-4cda-9cc1-d002ab949e47", content: "E) A tenacidade do aço diminui, quando a temperatura diminui.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "0df6bc87-62e2-41b6-842e-29b978317898",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 3",
        content: "Resolva a questão abaixo.",
        position: 3,
        activity: {
            id: "2bcf6eee-84ad-4db7-a3f2-dddca26a1c54",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas a seguir, assinale aquela que não é um fator que influencia na deformação de uma junta soldada. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "d9f5d1f6-9abf-45f8-8c44-fc5cd9dff45d", content: "A) Propriedades físicas e mecânicas do material.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "042f1b6b-528a-48ef-967c-ccb5dc9e894f", content: "B) Grau de restrição da junta.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "4c88294b-d298-41f9-ac24-32a77f6a2434", content: "C) Tensões internas encontradas na junta", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "d7ad9e15-047d-4116-b570-caa7386413cc", content: "D) Energia de soldagem introduzida na junta durante a soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "bea01b1c-7bbf-4529-a89c-bcfcda691370", content: "E) Aplicação de pré-aquecimento e pós-aquecimento na junta.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "ae2ffc8c-7162-4e17-b9ac-7defc1b93246",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 4",
        content: "Resolva a questão abaixo.",
        position: 4,
        activity: {
            id: "1e745aac-c018-4882-8141-3e74f5ff6698",
            activity_type: "multiple_choice",
            statement: "Analisando as propriedades físicas e mecânicas do metal de solda (feito de aço carbono) em função da temperatura, assinalar a alternativa correta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "d830c25b-9ea8-4c9d-9be7-0dd77b8f430f", content: "A) A condutividade térmica do metal de solda diminui, quando a temperatura diminui.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "67fc5416-1f34-442a-9213-7c25b3ab69d7", content: "B) A dutilidade do metal de solda aumenta, quando a temperatura aumenta.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "4c3b2e81-3276-4dac-82cb-73342876c714", content: "C) O limite de resistência da junta diminui, quando a temperatura aumenta.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "6d42d3d9-7e82-4e00-9558-0bb2d1a48f5e", content: "D) A tenacidade do metal de solda diminui, quando a temperatura diminui.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "453580f4-a49b-4b6b-96dc-3c80fdf1185c", content: "E) A resistência mecânica do metal de solda aumenta, quando a temperatura diminui.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "85d055cb-f5c5-453f-a810-40fc24a8e3bf",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 5",
        content: "Resolva a questão abaixo.",
        position: 5,
        activity: {
            id: "53fcab86-9f11-4269-8a57-04571433c169",
            activity_type: "multiple_choice",
            statement: "Analisando a energia de soldagem introduzida em uma junta durante a soldagem, assinale a alternativa correta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "bad2ee98-891a-40a3-b7a4-415f2a394a44", content: "A) A energia de soldagem introduzida na junta não provoca qualquer tipo de deformação na região que está sendo soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "c316f73b-6a90-467d-a20e-45f7f32976b3", content: "B) Na soldagem de uma junta de ângulo, quanto maior a energia de soldagem, menor será a quantidade de metal de base adjacente à solda afetada por esta energia.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "7b51412b-62c5-4145-b84b-76e71d3701c2", content: "C) A energia de soldagem só irá produzir alguma deformação em uma junta, caso o soldador ou operador de soldagem não usar os valores corretos das variáveis de soldagem, conforme estabelecidos na Especificação de Procedimento de Soldagem aplicável.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "23ca363f-7ac6-4b3b-a71e-7023c6603e54", content: "D) Quanto maior a energia de soldagem em uma junta durante a soldagem, maior será a deformação naquela região.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "e642733f-34bf-4a90-8df4-4f9d1f18bdce", content: "E) A única influência da energia de soldagem é propiciar uma menor ou maior penetração do cordão de solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "f274f79b-71ee-4a45-82b9-ef3c68bd13c2",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 7",
        content: "Resolva a questão abaixo.",
        position: 6,
        activity: {
            id: "74bcba37-361e-453b-9def-3219a67d0241",
            activity_type: "multiple_choice",
            statement: "Quanto à contração transversal que ocorre em uma junta após a soldagem, identifique a alternativa correta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "69633a7e-776b-42d2-a6db-6c5c8a2ff89c", content: "A) Aplicar a técnica de pré-aquecimento, empregar altas energias de soldagem, entre outros, isto faz diminuir a contração transversal do metal de solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "e8004a86-8f04-4d4e-a009-858e0ef47fa9", content: "B) Quanto maior a seção transversal da zona fundida, maior o nível de contração transversal produzido.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "5d6326cd-a450-44b9-9ee3-db3ff08fb99a", content: "C) A contração transversal aumenta, quanto maior for o grau de restrição das peças.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "fa6b3e0b-d53d-41cd-9b28-e2deba46286c", content: "D) Aplicar a técnica “martelamento da solda”, isto aumenta a contração transversal da zona fundida.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "35d0e7c8-2b4f-45b7-a2c3-8db18b688713", content: "E) Metal de solda produzido por muitos cordões de solda, assim como goivagens feitas com grandes profundidades, ambos os casos não afetam o nível de contração transversal da junta soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "0ecbf843-6e40-47ba-8fb2-4c751098f5e9",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 8",
        content: "Resolva a questão abaixo.",
        position: 7,
        activity: {
            id: "72f31359-f91d-4072-9d28-db16858ef2dc",
            activity_type: "multiple_choice",
            statement: "Das juntas apresentadas a seguir, qual dos chanfros gera a maior contração transversal? A B C D E \n\n<img src=\"/images/questions/page157_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page157_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "8614c227-e1e0-4df6-844f-3b3b3204e926", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "e919b6cb-27fa-4cc1-9ece-9cccd309c5d3", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "98682847-cb27-4c4d-b7fa-09eb95d98384", content: "C) C", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "2549cfe7-efdd-435e-b13a-68aab1779236", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "01d40d57-4894-4ab3-b945-64d5f1a3e612", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "0eb2a269-342f-4fcb-9f8f-e893b07e51cc",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 9",
        content: "Resolva a questão abaixo.",
        position: 8,
        activity: {
            id: "8900e707-e0e6-4675-9956-2691803b13a9",
            activity_type: "multiple_choice",
            statement: "Dos diferentes tipos de chanfro apresentados a seguir, identifique aquele que menos contribuirá para que ocorram deformações em uma junta soldada. A B C D E \n\n<img src=\"/images/questions/page158_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page158_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "0f01e237-088d-4b1d-8b09-abd121c3fce1", content: "A) A", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "1903217d-b803-41af-9447-691a5f8847a6", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "5ca76c8b-0dfe-483a-a8a0-f3e7e6fb7b1d", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "40f3f611-ad36-46b4-b254-8c0f9b6c85ea", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "a47b8da2-279d-4467-a307-eb1f7513f66f", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "6b56d94f-6aa2-4f0e-a6c9-c7151ec3fba2",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 9,
        activity: {
            id: "84fd54ca-cf62-449b-a957-408c192f9fcf",
            activity_type: "multiple_choice",
            statement: "9 \n\n<img src=\"/images/questions/page159_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page159_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "d81fe615-9076-42b1-9861-037cacee1083", content: "D) Metal de solda produzido por muitos cordões de solda, assim como goivagens feitas com grandes profundidades, ambos os casos aumentam o nível de contração longitudinal da junta soldada.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 1 },
            { id: "7801376b-ba0e-4e27-97b2-641af0510418", content: "E) Aplicar a técnica “martelamento da solda” não interfere no nível da contração longitudinal produzida na junta soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "5c218382-9314-4494-b90f-0d7ddaa1e380",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 10,
        activity: {
            id: "550f8d96-3191-4475-b455-940c87f7e911",
            activity_type: "multiple_choice",
            statement: "0 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "f85bcff4-6bb2-4123-94a6-9da1af19d4e5", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "593c52ef-37a5-4a79-bdda-8fa889afa89e", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "b3260406-42b7-4a18-9e85-16bd7786a7f5",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 12",
        content: "Resolva a questão abaixo.",
        position: 11,
        activity: {
            id: "e7659972-fed3-4c0e-9f19-2108896d8cf8",
            activity_type: "multiple_choice",
            statement: "Das alternativas listadas a seguir, assinale aquela que não contribui para o controle de deformações de uma junta soldada. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "0e11fb95-ec2b-4562-84d7-aa67a055217f", content: "A) A contração transversal é desprezível em uma junta de ângulo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "f294a18d-b56f-4ee4-80a7-86ae08291f60", content: "B) A contração longitudinal depende da relação entre a seção transversal da zona fundida e a seção restante da peça.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "6fc00036-1654-45b1-a281-0234448bc8cf", content: "C) As contrações longitudinal e transversal estão sujeitas aos mesmos fatores de influência.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "5aa56b0b-9a47-44ec-a06a-9091bf8814c6", content: "D) A disposição irregular da zona plastificada em relação à linha neutra da peça é a principal razão da deformação angular.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "14ee9068-14b4-4e6d-b1d1-71d3537a0b25", content: "E) Durante a elaboração de um projeto, cordões de solda maiores devem ser localizados afastados da linha neutra.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "e51251bf-749a-45a2-acb9-63227b86894a",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 13",
        content: "Resolva a questão abaixo.",
        position: 12,
        activity: {
            id: "290d7911-9a4f-4792-be68-47c5d08bc165",
            activity_type: "multiple_choice",
            statement: "A deformação conhecida como “Empenamento” é causada por qual tipo de contração? ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "8e57dcaf-67a8-480a-91c3-563eef3a872a", content: "A) Contração Transversal.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "c23e7fd2-19e0-432b-ae46-ff4bc2402944", content: "B) Contração por Embicamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "16032f5c-29e3-4989-8f65-f0546ec1326b", content: "C) Contração Longitudinal.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "6bee181f-7b8b-420c-8f11-476d1993f4b0", content: "D) Contração por Deformação Angular.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "2954fd76-9960-436b-bf78-f8ecbf243b37", content: "E) Contração por Desalinhamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "428fd080-0c3f-433b-95be-52d9f3c5998a",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 14",
        content: "Resolva a questão abaixo.",
        position: 13,
        activity: {
            id: "bf58cedf-8fab-4323-9e34-a464ff648514",
            activity_type: "multiple_choice",
            statement: "Quanto ao aparecimento de empenamentos em uma peça durante e após sua soldagem, identifique a alternativa que mostra o melhor método que isto seja evitado ou reduzido. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "6d4d9078-f400-4f11-931d-d7c62380cdb7", content: "A) Adotar uma sequência de passes do tipo “passe à ré” ao longo da junta.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "d3d16132-1d44-4537-a935-f4a7ca8a9523", content: "B) Aumentar o número de passes no interior do chanfro.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "69f3e952-4cd7-4b8c-a22c-13752de66720", content: "C) Aplicar um pré-aquecimento na junta, objetivando diminuir as tensões residuais existentes.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "09266acc-367f-4f21-8bb5-6841e98bbaea", content: "D) Usar metais de solda com os menores diâmetros possíveis.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "b4f5c994-d5a7-44b3-9df0-a82435bd3eb0", content: "E) No caso de empregar o processo de soldagem a arco submerso, usar fonte de energia que gere corrente contínua, estando o metal de adição ligado ao pólo positivo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "374ab1ed-869f-40b9-ba1a-a87be8ec38d8",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 15",
        content: "Resolva a questão abaixo.",
        position: 14,
        activity: {
            id: "4d1bb548-d720-4192-9bd3-b83e7daaa7bb",
            activity_type: "multiple_choice",
            statement: "Dos tipos de juntas apresentadas a seguir, identifique aquele que mais contribui para que haja grandes níveis de deformação. A B C D E \n\n<img src=\"/images/questions/page161_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page161_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "4205337d-dfb0-455f-874c-f269aae6b263", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "3bcb075a-92bc-4b09-8e7f-ff473a1119ac", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "3d613463-712a-4c47-a854-af5d8d796bd9", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "cabbe962-526e-4f2d-94fa-a038b3e906fc", content: "D) D", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "d0b2cdf7-46b2-4df8-8f72-e599756bc0ae", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "e085d4ee-e997-4e73-aa00-1412f3aac723",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 17",
        content: "Resolva a questão abaixo.",
        position: 15,
        activity: {
            id: "f8862376-07f4-4809-a893-426152a7b75a",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas a seguir, identifique a única que pode evitar ou mesmo eliminar as deformações em uma junta durante e após a soldagem. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "7747d507-5025-4f5f-897f-8a0fc31ce8d3", content: "A) Tentar soldar a junta o mais devagar possível. O objetivo desta técnica é fazer com que o escoamento do calor aconteça uniformemente, evitando o risco de produzir empenos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "63ce658e-7ead-45d3-bd09-ff6bb55acb5b", content: "B) Preferir soldas de ângulo contínuas ao invés de soldas de ângulo intermitentes.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "dd55545a-e2e0-429f-9522-ef48d3cdb61d", content: "C) Adotar chanfros simples ao invés de chanfros duplos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "a23184f6-a9d4-4026-bea5-689bf09c839b", content: "D) Evitar o uso da técnica “Pré-deformação”, visto que isto pode aumentar ainda mais a deformação da junta.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "2f0d976c-cd7c-409f-a346-2b47da690531", content: "E) Ao ter que preencher um chanfro em V com muitos passes, distribuí-los de tal forma que se consiga espalhar o calor uniformemente pelos dois lados do chanfro.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "8deaf85f-70d7-4a67-9a3a-9be84ace4445",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 18",
        content: "Resolva a questão abaixo.",
        position: 16,
        activity: {
            id: "d509fcb1-d96a-4de6-80b5-998c1ef2cad5",
            activity_type: "multiple_choice",
            statement: "Dos exemplos apresentados a seguir, indique aquele que contribui para que sejam produzidas deformações durante a soldagem. A B C D E \n\n<img src=\"/images/questions/page163_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page163_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "fceba95e-c179-44e7-8298-8b8be3ba775b", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "a0378ab0-9d9a-4d69-9b0e-873b28e1821f", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "c0cec00a-0489-4fc9-9786-360b1b36def9", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "38f99efb-3d1c-4097-b502-df7f514b048e", content: "D) D", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "148946fc-ed40-4783-a55b-079dae1b8384", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "048640da-e222-4182-a35c-4218c242d7e8",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 17,
        activity: {
            id: "d25b3f2d-86be-4a90-bdfd-986013bd31de",
            activity_type: "multiple_choice",
            statement: "4 cordões mais próximos da linha neutra para evitar que ocorra uma deformação angular na região que está sendo soldada. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "79f24e6c-f35c-4ae6-be34-3acad3335821", content: "B) O empenamento é um tipo de problema que ocorre normalmente na soldagem de chapas finas e perfis leves.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "67ff0578-31f8-47ad-9eeb-2f7c4a622cfe", content: "C) As contrações longitudinal e transversal estão sujeitas a fatores de influência completamente distintos.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 2 },
            { id: "ae11f035-7e41-4578-b203-dbe4ce6167ae", content: "D) As medidas de prevenção e controle de deformações na soldagem devem ser tomadas desde o projeto até a montagem final de uma estrutura.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 3 },
            { id: "6f294e9a-1dfb-4180-9a89-dd0449c907c1", content: "E) A fixação dos dispositivos auxiliares de montagem por meio da soldagem tem que ser considerada como definitiva. Por este motivo, esta soldagem deve ser feita de acordo com uma especificação de procedimento de soldagem (EPS) previamente aprovada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "0b1750c6-327c-482a-b5a5-798d07d823ff",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 20",
        content: "Resolva a questão abaixo.",
        position: 18,
        activity: {
            id: "3954a97c-432d-47c0-9ce6-0c6299784cae",
            activity_type: "multiple_choice",
            statement: "Quanto à técnica conhecida como “Martelamento”, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "1d838b99-df5e-4c65-a95e-0f303c1345b5", content: "A) A técnica do Martelamento pode ser realizada em todos os passes produzidos em uma junta de topo, à exceção do passe de raiz. Nas demais regiões, ela pode ser feita sem qualquer restrição.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "0fa0731d-d8be-4952-b9a7-5beb16240663", content: "B) A técnica do Martelamento é uma maneira de se interagir com as forças de contração de um cordão de solda durante o seu resfriamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "0196144c-de74-491e-94eb-aec0e7b2b964", content: "C) A técnica do Martelamento só pode ser aplicada, quando um procedimento específico tiver sido aprovado anteriormente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "782af5e8-323b-4236-8760-6b2eed3afd7e", content: "D) Em uma junta de topo, dois são os locais onde a técnica de Martelamento não deve ser aplicada: no passe de raiz (nesse local esta técnica nunca pode ser usada) e nos passes de acabamento da solda. Nesses passes, há chances do martelamento encobrir trincas, assim como criar regiões encruadas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "be7d7aae-4834-4b44-a008-6e2f20400579", content: "E) A região do martelo que é usada nesta técnica é parte esférica da ferramenta (“bola”). A região cilíndrica do martelo não pode ser usada nesta técnica, haja vista que ela pode gerar entalhes na superfície da junta no momento do impacto.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "2cde4ceb-4b39-451d-b594-d4843975e5d1",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 19,
        activity: {
            id: "f96592e1-9514-4540-b435-86b8baa33e6e",
            activity_type: "multiple_choice",
            statement: "5 \n\n<img src=\"/images/questions/page165_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page165_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "abd66af8-70a7-4679-9e84-efc13cea4a2d", content: "D) Adoção de processos de soldagem automáticos (arco submerso, GMAW mecanizado, entre outros).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "06baf479-237c-4353-9917-2b3f0c06e1d5", content: "E) Uso simultâneo de dois arames sólidos na mesma torcha (técnica conhecida como “twin arc”, arco gemo, em português).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "269a8582-84bd-49b1-8d74-6d7c09e6dd5d",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 23",
        content: "Resolva a questão abaixo.",
        position: 20,
        activity: {
            id: "ee9b6f9c-0374-4515-a88f-74d1a17c4d72",
            activity_type: "multiple_choice",
            statement: "Quanto aos gabaritos e dispositivos auxiliares de fixação e montagem, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "2c345b80-b39d-4b8d-9365-5c761b2be0a7", content: "A) A solda usada para prender os dispositivos auxiliares de fixação e montagem na obra, além dos ponteamentos e de outras soldas provisórias devem ser realizadas com o mesmo rigor das soldas propriamente ditas, ou seja, devem ser encaradas como soldas definitivas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "83c06256-4795-4f7f-ba7d-6b0a5c6c9cda", content: "B) Os dispositivos auxiliares de fixação e montagem, quando permitidos pela norma de fabricação ou de construção do equipamento, devem atender aos requisitos específicos de materiais do equipamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "17dfe71e-0a41-4c9c-9a39-55ef90d6fbf4", content: "C) A função principal dos dispositivos auxiliares de fixação e montagem é fazer uma resistência às forças de contração/deformação localizadas na região da junta durante o resfriamento da solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "471b1177-b7f2-4b25-9e52-ff5e53bbe20c", content: "D) A retirada dos dispositivos auxiliares de fixação e montagem da obra não está vinculada a nenhuma norma ou documento técnico. Qualquer técnica usada, como por exemplo: uso de disco abrasivo, impacto, goivagem, entre outras, para a realização desta tarefa é passível de ser usada.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "3eb2e6da-fae5-48ad-a4d1-4206b2865f56", content: "E) A solda usada para prender os dispositivos auxiliares de fixação e montagem na obra, os ponteamentos e as outras soldas provisórias devem ser realizadas de acordo com as informações encontradas em uma especificação de procedimento de soldagem própria.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "70067871-e8e8-47a3-8c54-6a74d9873532",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 21,
        activity: {
            id: "19328026-ed2a-4a61-8e01-ee8f18ff0a1b",
            activity_type: "multiple_choice",
            statement: "7 ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "4749eb36-c006-40b8-9a81-eb3d241afdf7", content: "D) A técnica conhecida como “pré-deformação” ou “pré-tensionamento”, utilizadas em peças a serem soldadas, se valem do uso de forças mecânicas opostas para interagir com a deformação produzida pela soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "bcc3ac3d-af8c-43a4-b154-b750ec60c8de", content: "E) Tendo em vista que não há uma fórmula que informe qual o valor da pré- deformação a ser aplicada na junta antes da soldagem, é necessário que as primeiras soldas sejam cuidadosamente preparadas e acompanhadas, para que, a partir de seus resultados, se corrija (ou não) o ângulo de pré-deformação usado inicialmente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "23028230-4993-4a85-8749-79c701ca916e",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 25",
        content: "Resolva a questão abaixo.",
        position: 22,
        activity: {
            id: "cc03bf34-9c32-4d4e-a7ad-d958ebee6336",
            activity_type: "multiple_choice",
            statement: "Na soldagem de uma junta de ângulo, formada por chapas de aço carbono com espessuras iguais a 50 mm, 2”, qual o principal tipo de deformação que irá ser produzido? ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "9e5b0fe5-598a-4681-977e-3cb6a01c3247", content: "A) Embicamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "d18869c1-8c37-411f-9a32-8a76164a7315", content: "B) Deformação angular.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "cc5a1d46-30a6-4ae3-a5c4-c5cfa42fa31d", content: "C) Empenamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "b14a4ae6-ebf3-4974-bccb-77691348d83d", content: "D) Contração transversal.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "16db60ed-81bd-4627-a5bc-e0442b898805", content: "E) Contração longitudinal", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "2e8d47df-b24a-4d8e-aaf2-6dea9f252ad2",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 26",
        content: "Resolva a questão abaixo.",
        position: 23,
        activity: {
            id: "84ff058e-8a42-4c1a-a85a-3dedae34aa52",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas a seguir, indique aquela que não é uma medida de prevenção para controle de deformação. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "2b3777f0-daec-4d85-b7d8-a09421ef19e6", content: "A) Empregar chanfros do tipo “em V”, “em meio V” ou “em J”.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "43c5a34d-7fb5-4a31-af71-8417a8e2ec58", content: "B) Adotar o uso de soldas descontínuas sempre que possível.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "e9f34b3d-ab4a-4a1e-acab-5acb4cf0364d", content: "C) Empregar sequências de soldagem que distribuam melhor o calor produzido durante a soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "8c5f7ea1-08b4-409d-8c9f-7e8b79e0d435", content: "D) Usar baixa energia de soldagem (aporte térmico).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "36d2f829-ce20-43b4-b260-8acef4462047", content: "E) Utilizar a técnica “disposição dorso a dorso”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "489c5761-486b-4b49-921c-63811c4c97e7",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 28",
        content: "Resolva a questão abaixo.",
        position: 24,
        activity: {
            id: "74d40a80-d972-434e-8f90-ab68a3db3fbe",
            activity_type: "multiple_choice",
            statement: "Quanto à correção de deformações por intermédio da técnica conhecida como “aquecimento localizado”, identifique a alternativa correta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "e7ac8c54-0f36-4519-bd65-0ae6a6e425cf", content: "A) A única chama possível a ser usada para esta técnica é aquela formada pela reação entre os gases oxigênio e acetileno. Quaisquer outros gases estão proibidos de serem usados.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "993c5a86-52af-459c-82bb-12eb22fb22f2", content: "B) Tendo em vista que a austenita é a microestrutura que mais solubiliza o hidrogênio em sua matriz, aconselha-se que a temperatura do local a ser trabalhado atinja valores em torno de 915ºC.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "f9ba5278-672c-4cbb-9ccd-6969a0edd3a3", content: "C) Em hipótese alguma é permitido o uso de água durante a aplicação do calor na região que está sendo trabalhada. Isto provocaria um resfriamento instantâneo na região resfriada, gerando martensitas e outras microestruturas indesejáveis.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "22ddbac8-3f65-4900-ace9-906452e6d209", content: "D) Os melhores resultados obtidos com o uso desta técnica são: chapas finas –usar técnica “zona em forma de cunha”; chapas média e grossa – usar técnica “aquecimento em pontos”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "0ac4a7bb-be1d-40fe-b8e7-4cd38c5ab192", content: "E) Aconselha-se a usar temperaturas da região a ser trabalhada na faixa entre 600 e 650ºC. Temperaturas mais elevadas podem provocar problemas metalúrgicos ao material.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "b3f87b30-f19d-4d83-97fb-ff3a6e226ba0",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 29",
        content: "Resolva a questão abaixo.",
        position: 25,
        activity: {
            id: "a1ee0fcf-d547-4b2c-bdc5-0ce48d3281f7",
            activity_type: "multiple_choice",
            statement: "Das juntas apresentadas a seguir, qual dos chanfros gera a maior contração longitudinal? A B C D E \n\n<img src=\"/images/questions/page169_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page169_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "f56bb4a8-a00c-4b48-8569-01b11b613bd5", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "b786dbd6-22d7-4e56-b93d-4603771f4c21", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "b1952926-b7e2-496a-8062-d04a86a77d46", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "1db5c071-c70c-49f7-b494-072e55e80dc3", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "2756b20d-91af-4432-b8b0-f139fc6e8bd6", content: "E) E", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["98dc9b05-19ad-4240-a0d0-56128ef3511c"].push({
        id: "54a35e74-c261-4747-9fc2-af24b8ee21d3",
        lesson_id: "98dc9b05-19ad-4240-a0d0-56128ef3511c",
        step_type: "activity",
        title: "Questão 30",
        content: "Resolva a questão abaixo.",
        position: 26,
        activity: {
            id: "9c3eea38-cb3b-42fc-8ccf-539a69917faa",
            activity_type: "multiple_choice",
            statement: "No que diz respeito às técnicas para o controle de deformações na soldagem de componentes com espessuras superiores a 30 mm, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "6145ffe1-1485-4786-9277-64834f2c2d9d", content: "A) Quando da soldagem de chapas de grandes espessuras, a melhor maneira de diminuir as deformações nas juntas soldadas é adotar o chanfro do tipo “V”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "81de0753-51bc-4935-8ac3-6aca506679de", content: "B) Em uma soldagem de junta de topo, quando é extremamente difícil a aplicação de vários cordões alternados nos dois lados da junta, deve-se adotar o chanfro assimétrico do tipo “em duplo V (1/2- 1/2)”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "d86bdb0f-9b90-4925-9ab0-4405ce117dd7", content: "C) Para se obter um melhor controle sobre a deformação em chanfros do tipo “em duplo V (1/3-2/3)”, soldar sempre por último o lado que tiver o maior volume de metal depositado; isto compensará a restrição imposta pela primeira solda (a de menor volume).", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "242bfb5f-c790-4f32-9c20-ff55e8adb069", content: "D) Para se obter um melhor controle sobre a deformação em chanfros do tipo “em duplo V (1/3-2/3)”, soldar sempre por último o lado que tiver o menor volume de metal depositado. Isto compensará a restrição imposta pela primeira solda (a de maior volume).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "ea611eff-a501-4161-87c4-aef703cc1769", content: "E) Quando da soldagem de chapas de grandes espessuras, a melhor maneira de diminuir as deformações nas juntas soldadas é adotar o chanfro do tipo “em duplo V (1/2- 1/2)”, com cada lado sendo soldado de uma única vez (não alternando os lados).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_MODULES.push({
        id: "e500ac35-9977-4533-a61d-150a6f1daae0",
        course_id: "c5555555-5555-5555-5555-555555555555",
        title: "Ensaios Não Destrutivos",
        description: "Questões e atividades sobre Ensaios Não Destrutivos",
        position: 5,
        is_published: true
    });

    STATIC_LESSONS.push({
        id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        module_id: "e500ac35-9977-4533-a61d-150a6f1daae0",
        title: "Prática - Ensaios Não Destrutivos",
        description: "Exercícios do banco.",
        estimated_minutes: 60,
        position: 1,
        lesson_type: "interactive",
        is_published: true
    });
    
    if (!STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"]) {
        STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"] = [];
    }

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "c0428fa8-45a5-4388-b372-9233222c8fa2",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 1,
        activity: {
            id: "0ef1e9f1-bb50-496a-ad52-3410d9e0a73a",
            activity_type: "multiple_choice",
            statement: "Em qual material o som se propaga com maior velocidade? ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "d1b3d63f-4e44-4160-b4db-7fa2609b790d", content: "K) Madeira", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "a0d82eae-2b2b-4b2f-a565-944de23dcb72", content: "L) Água", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "7e9ee651-bb70-46bd-b4fa-f2e7001041bd", content: "M) Ar", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "e70941b6-2c31-434c-8c9d-fe9f47c08f6c", content: "N) Metal", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 4 },
            { id: "9ae4f321-4222-4ecf-93dd-5c3b2310b76d", content: "O) Vácuo", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "270e3f88-33e5-4e9c-a441-faf33e1de6ee",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 2,
        activity: {
            id: "4511ace8-eb70-499b-9eac-874b9c779768",
            activity_type: "multiple_choice",
            statement: "Como o som é uma energia que se propaga através de ondas mecânicas, qual o valor da velocidade do som no vácuo? ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "0f12a993-450b-48f8-a06b-057fe71387ea", content: "A) 340 m/s.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "83ac1166-bd2a-4214-901b-44eba2e16aee", content: "B) 42,5 m/s", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "f8efb035-6d10-4ab1-9a0b-043de060eb54", content: "C) 0 m/s", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "be29bda2-f549-4a72-a069-181f13a0cee3", content: "D) 170 m/s", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "4f1f2c71-08ae-4f58-87ec-37fff0775c6b", content: "E) 85 m/s", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "71b380fb-f6fd-43ad-83c3-5dc42dc063d4",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 3",
        content: "Resolva a questão abaixo.",
        position: 3,
        activity: {
            id: "1281ba3c-a71f-40ca-9408-66a1cbc58460",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas a seguir, indique aquela que não é uma vantagem do ensaio não destrutivo por Ultra-Som. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "4fcc0c9a-1aa2-4b37-9595-f9c06ed2a003", content: "A) Seus registros, para qualquer tipo de equipamento utilizado, são permanentes, podendo ser arquivados para futuras interpretações.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "34d83715-f08d-4c33-9134-da9100cd2729", content: "B) Oferece risco zero à saúde do profissional que executa o ensaio.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "a2461c01-4e28-4e16-ba91-c6a7fb43dc89", content: "C) Pode ser utilizado em materiais metálicos e não metálicos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "4b4eb288-d63c-4099-8a9d-30ab034f5c99", content: "D) Não necessita de acesso em ambas as superfícies da peça para a realização da inspeção.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "50d0c007-a668-4ba3-a3ea-7ddb0b4ad3be", content: "E) Permite localizar e dimensionar com precisão as descontinuidades.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "c4754eb1-46e5-40a1-99ce-2c8bba934fde",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 4,
        activity: {
            id: "689c7979-b7bc-4d03-acf0-754ed1121547",
            activity_type: "multiple_choice",
            statement: "2 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "fd3edbf1-fc16-40bd-8912-c1fe0ade8c31", content: "C) Ensaio que não precisa de preparação (limpeza) na região onde será inspecionada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "d757953c-a4a8-4783-9bef-365b392ab02b", content: "D) Custo baixo dos equipamentos utilizados neste ensaio.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "9c456f59-428b-4e78-a9d4-fb56d9c09847", content: "E) Ensaio de fácil interpretação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "c5ddab7a-be7b-4d40-ab4f-639abc9cb42a",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 5",
        content: "Resolva a questão abaixo.",
        position: 5,
        activity: {
            id: "22b04d73-78dc-4443-8b63-9edf4f340b5f",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas a seguir, identifique aquela que não está relacionada com a realização do Ensaio Visual. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "d49e3c0b-a47c-4b73-a4e0-b445f6630147", content: "A) Dos ensaios conhecidos como “não destrutivos”, este é considerado o ensaio mais básico entre todos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "7067ceef-353b-4bf3-a120-d4614c4b371a", content: "B) Os demais ensaios não destrutivos só podem ser executados após a realização do ensaio visual.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "1d626a3d-be86-4737-aaef-561a236cb4ff", content: "C) O ensaio visual pode ser realizado à vista desarmada, ou seja, sem auxílio de algum dispositivo ótico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "fcabd57c-1bf0-4d59-adc6-7038a98c1140", content: "D) Por não necessitar que seja realizada uma limpeza na região a ser analisada, este é considerado o ensaio mais rápido dentre todos.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "f58f8fc3-eb26-4758-bc7d-8e7e67542127", content: "E) O ensaio visual pode ser realizado com auxílio de uma lupa ou com aparelhos do tipo endoscópio (inspeção remota).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "1d793fb2-dd7c-402f-8c4e-371e384f857b",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 6",
        content: "Resolva a questão abaixo.",
        position: 6,
        activity: {
            id: "f36eb723-a1ba-4c9e-ac64-5fd810cdf036",
            activity_type: "multiple_choice",
            statement: "Qual, das alternativas apresentadas a seguir, não é uma vantagem do Ensaio Visual? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "f7b7aa16-938f-4845-ac01-802bc56d37bd", content: "A) Permite a correção de descontinuidades antes que a soldagem da junta esteja terminada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "e6378747-e0a5-4e51-b563-93b2a2524bd0", content: "B) Evita com que alguns tipos de descontinuidades só sejam removidos após a inspeção radiográfica ou ultrassônica.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "51be2a6a-b3d8-43a8-9b18-f528c935e781", content: "C) Ensaio que, bem executado, diminui o custo total da fabricação do equipamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "01f9c63a-f37f-4f4b-bd88-053d46d85672", content: "D) Ensaio de mais baixo custo entre todos os ensaios não destrutivos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "219672fa-5e64-4a3f-babd-71f0a752d39a", content: "E) Ensaio que detecta descontinuidades com qualquer dimensão.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "5c6a18b3-bf81-4537-a7c6-c2034bf27ef1",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 7,
        activity: {
            id: "5d64e492-a4a3-4611-be4a-419451512b19",
            activity_type: "multiple_choice",
            statement: "3 ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "030a109f-d3ea-4b75-ab44-0d5b8525dff0", content: "B) Dependendo da iluminação do local, este ensaio é capaz de detectar descontinuidades sub-superficiais.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "129ac3c5-d91c-4295-9139-f13260c4e724", content: "C) Ensaio que detecta as descontinuidades maiores e, geralmente, indica pontos de prováveis descontinuidades para ser posteriormente inspecionados por outros ensaios não destrutivos.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 2 },
            { id: "18dabd78-f40b-4acd-a526-a4b96a7a31f7", content: "D) Não necessita de acesso em ambos os lados da peça para realizar a inspeção.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 3 },
            { id: "5aad84e2-be6c-4d31-b5c1-2b352fe97dbc", content: "E) Ensaio que permite a localização e dimensão precisas das descontinuidades em qualquer região do equipamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "747aa66c-0da6-40d5-a6c2-0b28a176d914",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 8",
        content: "Resolva a questão abaixo.",
        position: 8,
        activity: {
            id: "a6891fde-47f0-467b-9e2c-6a66b82f2854",
            activity_type: "multiple_choice",
            statement: "Identifique, entre as alternativas apresentadas a seguir, a região de uma junta de topo que não pode ser medida (quantificada) antes de iniciar a soldagem? ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "bb3d942c-cc75-48ab-b70f-39baa5fd5633", content: "A) Ângulo do bisel.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "5af691ca-2caf-42b2-af1d-c39a7969f3bf", content: "B) Abertura da raiz.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "2a85e754-e5cc-4359-8b30-0eff84d44a05", content: "C) Face da raiz.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "6aa6be42-0d93-4c00-a37e-6d2d8fef3f92", content: "D) Face de fusão.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "ee48e22c-a8b2-4db7-b7ce-a2c51ff24a2a", content: "E) Desalinhamento dos componentes (caso haja).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "b1eefbda-3733-41f2-9531-599b2af95a99",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 9",
        content: "Resolva a questão abaixo.",
        position: 9,
        activity: {
            id: "83375324-0d72-4d4b-b5c9-e84fd1145643",
            activity_type: "multiple_choice",
            statement: "Qual, das alternativas apresentadas a seguir, é uma desvantagem única e exclusiva do Ensaio Visual? ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "fcefdf96-67ed-4d69-b43c-15fb60f72f35", content: "A) Ensaio limitado à detecção de descontinuidades superficiais.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "2b9c8b64-0730-481f-b962-53a4c0d25109", content: "B) Ensaio lento, o que acarreta no aumento do custo da obra.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "88dc5212-3a7b-47b7-8a12-bb7925916fc8", content: "C) Ensaio que detecta apenas descontinuidades volumétricas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "fcac8a64-9cb2-4dcf-b124-13e74c558223", content: "D) Ensaio que, apesar da precisão dos seus resultados, necessita de profissionais com grande experiência profissional e de um longo período de treinamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "a8e62cf5-e811-432b-8459-d3e07958bdee", content: "E) Ensaio limitado a materiais do tipo “ferrosos”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "ccbebc42-9c18-4a32-abcd-d573a70903bc",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 10,
        activity: {
            id: "6e1d3867-4429-4742-82a0-14f426d55b0b",
            activity_type: "multiple_choice",
            statement: "4 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "c1210c56-7434-425c-93ba-14d108c3e0db", content: "B) Ensaios que não necessitam de um instrumento ou dispositivo para serem realizados.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 1 },
            { id: "a46431f4-7049-4e4e-ad4f-c7d3dddf48af", content: "C) Ensaios fáceis de serem executados.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "3ef0fbba-0050-4d47-b080-2c5d133f2c1d", content: "D) Ensaios rápidos e seguros para a identificação dos metais metálicos e ligas metálicas mais utilizadas na indústria.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "afd5fb03-b440-4fdb-bd6a-16cd1f438acc", content: "E) Pode ser utilizado na identificação de materiais metálicos durante as fases de fabricação e montagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "26b25436-fd3b-4bac-8b03-c16e99546770",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 11",
        content: "Resolva a questão abaixo.",
        position: 11,
        activity: {
            id: "82d55152-0813-4c57-aaab-6c068e16a650",
            activity_type: "multiple_choice",
            statement: "Qual, dos metais apresentados a seguir, não é magnético? ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "e9d7aec3-2435-4166-9730-f43e269b31c2", content: "A) Aço carbono.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "9bf8db60-4bc0-459e-bb22-87fc9f7c90ce", content: "B) Ligas Cu-Ni.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "64cecd63-5d3e-4e4f-b5d2-8f3ffa555fc0", content: "C) Aço inoxidável ferrítico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "efc72cd9-13bb-48c8-8933-8aa3158d59aa", content: "D) Aço inoxidável martensítico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "92cec4e2-255b-4f08-b6e6-d0891ebee150", content: "E) Ferro fundido cinzento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "68d07efe-83bd-4dca-9bf7-b4ed25b8acef",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 12",
        content: "Resolva a questão abaixo.",
        position: 12,
        activity: {
            id: "d4dff288-9475-4007-8d1d-3c64247cdf39",
            activity_type: "multiple_choice",
            statement: "Qual, dos metais apresentados a seguir, é completamente anti- magnético? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "0c18c055-92b9-4097-ab89-fa327543682a", content: "A) Aço liga.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "c613fbd3-8940-49fa-83bf-96fafdbd335c", content: "B) Níquel.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "c823cd8c-ba7d-4128-9557-62818f3aea47", content: "C) Aço C-Mn.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "70eef372-017d-419f-a518-ba6a007d3b52", content: "D) Ferro fundido branco.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "ec745726-c2d0-4757-83d9-94da1d033b84", content: "E) Aço inoxidável austenítico.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "cebe5605-481f-4e62-9e37-f97a4a96afd9",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 14",
        content: "Resolva a questão abaixo.",
        position: 13,
        activity: {
            id: "05bd4f0e-5619-47c2-9315-0f199c2d8074",
            activity_type: "multiple_choice",
            statement: "No Ensaio por Ultra-som, identifique a alternativa que mostra a finalidade do uso de um acoplante. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "02621e74-7477-43df-af2a-0e235fa4b6bb", content: "A) Substância que permite que a maior parcela possível de som seja transmitida do cabeçote à peça, como também no sentido contrário.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "3736952b-9d6c-4c99-9666-e6af292bff91", content: "B) Material empregado entre os dispositivos do cabeçote, funcionando com um aglutinante (cola).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "d3794f7b-9cb3-4f02-ae6b-5e7eb453ec47", content: "C) Permitir que a corrente elétrica, gerada pela fonte de energia, chegue até o cabeçote sem perda de eficiência.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "30c75cca-0bf8-4552-8edc-28e5f78c1041", content: "D) Material que permite que o ultrassonista segure o cabeçote com firmeza durante o ensaio.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "5258e4d3-840a-4603-ba71-fc7f762841c2", content: "E) Cristal piezo-elétrico que age como emissor de som, colocado perpendicularmente à peça que será examinada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "36aa90ef-e49f-4925-9da4-8674127b01e8",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 15",
        content: "Resolva a questão abaixo.",
        position: 14,
        activity: {
            id: "6168d30c-5739-4eb3-bb76-22b259878bfe",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas a seguir, indique aquela que é uma desvantagem específica do ensaio não destrutivo por Ultra-Som. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "33ca344f-ed89-42b7-854f-b3e2d5d4107c", content: "A) Técnica de ensaio não destrutivo não aplicada a peças cuja forma, geometria e rugosidade superficial impeçam o perfeito acoplamento do cabeçote à peça.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "df0bab47-c55e-4a2f-847d-92c246d11da8", content: "B) É um ensaio não destrutivo relativamente demorado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "4a8b895d-3641-4238-abbf-55061fc75226", content: "C) O aparelho de ultra-som é pesado, sendo extremamente difícil de ser carregado pelo operador.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "f755d574-82e9-4e66-987f-048ddb45059b", content: "D) Não proporciona, em hipótese alguma, o registro permanente dos resultados obtidos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "3f1caa8f-127e-451b-afb4-8bb0b3688919", content: "E) Não permite localizar e dimensionar com precisão as descontinuidades encontradas na região ensaiada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "aee5530d-af7b-4e29-a1a0-16e838f44293",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 15,
        activity: {
            id: "e2de9139-0f52-44c1-a139-aaa008c5669a",
            activity_type: "multiple_choice",
            statement: "6 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "4a4b01e3-9ebf-45ef-80b1-832d1e5ce94a", content: "C) O equipamento de ultra-som é caro, comparativamente aos outros ensaios não destrutivos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "81f9b8d9-c718-4a9c-b800-91bf1586512e", content: "D) A identificação do tipo de descontinuidade requer grande treinamento e experiência do operador.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "0dd7dddb-5494-4ba5-bf71-fdddec4125f2", content: "E) A melhor detecção da descontinuidade depende da sua orientação no interior da junta soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "1deee899-eee1-4f51-aed1-799d4d277707",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 17",
        content: "Resolva a questão abaixo.",
        position: 16,
        activity: {
            id: "3dda9b30-4a52-4671-b6c2-f38bee97ba37",
            activity_type: "multiple_choice",
            statement: "Quanto aos diferentes tipos de cabeçotes utilizados no ensaio por Ultra- som, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "d5d14b43-6fec-425a-b18c-b9ce1d8974a3", content: "A) Um cabeçote Normal é composto basicamente de um cristal piezo- elétrico, disposto em um plano paralelo ao plano da peça a ser examinada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "0649251c-ec41-4f9a-8de7-66deb95f1b73", content: "B) Um cabeçote Duplo-Cristal é composto basicamente de dois cristais piezo-elétricos: um agindo como emissor e o segundo como receptor.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "5ea4910c-bc46-4854-8c28-73f43f87917b", content: "C) Um cabeçote Angular é composto basicamente de um cristal piezo- elétrico disposto em ângulo em relação ao plano da peça a ser examinada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "dc891afb-8f4e-4304-8069-d86b0f456df5", content: "D) Os cabeçotes do tipo Angular mais usuais são os 45º, 60º e 70º.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "667950c8-4506-4e46-934a-a6d99a53ca71", content: "E) Um cabeçote Duplo-Cristal tem esses cristais dispostos em um plano aproximadamente ortogonal ao da peça que será examinada.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "891926c1-3931-41b3-99ea-20f4b070f364",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 18",
        content: "Resolva a questão abaixo.",
        position: 17,
        activity: {
            id: "84e38373-7fca-44b8-a684-7fcdfc88969e",
            activity_type: "multiple_choice",
            statement: "Em relação ao Ensaio Radiográfico, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "1c5926e2-92fb-44e9-aa5a-0d792877a5dd", content: "A) Os raios típicos usados neste ensaio são o “X” e o “γ” (gama).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "c0917975-e8a1-4442-ad9e-a2c0f5eedd1e", content: "B) Nem toda a radiação atravessa o material analisado, pois parte dela é absorvida por este material.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "3beba005-b23b-4629-8ce9-e103eb907e21", content: "C) O método baseia-se na capacidade dos raios “X” e o “γ” penetrarem em materiais sólidos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "dd63876b-2380-4dc7-8ce9-b51220b07698", content: "D) O comprimento de onda dos raios “X” e o “γ” são fundamentais neste ensaio; quanto maior este comprimento, maior a capacidade de penetração da radiação.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "2ea759b1-fb67-4380-8fbf-cbdd25d31c49", content: "E) A quantidade de radiação absorvida depende da espessura do material.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "1162aa2f-27dc-48c4-8a03-599e305ee766",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 18,
        activity: {
            id: "b65a6346-e4f7-4ae7-a7d0-526fd05461ba",
            activity_type: "multiple_choice",
            statement: "7 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "d9de59db-884d-44d9-97a3-36059f43930d", content: "A) Porosidade.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "171a4eb8-1f89-487d-8228-d824c050add4", content: "B) Trincas posicionadas paralelamente à espessura do material ensaiado.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "5a59c0bd-21cf-4208-9622-5f52c9f1f9d8", content: "C) Inclusão de escória.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "acfdd974-e258-4102-8ae1-ed436186c858", content: "D) Falta de penetração.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "5b1323a2-9c69-49dc-8ca9-1f3bbd34a582", content: "E) Penetração excessiva.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "4f572577-f1e4-4831-a07e-071a127198e6",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 20",
        content: "Resolva a questão abaixo.",
        position: 19,
        activity: {
            id: "c5f8fb84-09ff-479f-99ea-b7d0a60fa1c8",
            activity_type: "multiple_choice",
            statement: "Qual das descontinuidades apresentadas a seguir é a mais fácil de ser detectada pelo Ensaio Radiográfico? ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "db8d8789-5844-47e8-ac81-4abdd9717933", content: "A) Falta de fusão.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "0a62e709-ade6-435e-97f8-79fb0704b8f2", content: "B) Mordedura.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "9318fd10-1e5a-4a79-95fa-72a1ccdfcabe", content: "C) Inclusão metálica.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "fa75856b-fb12-473a-8735-0c5b9a3fece4", content: "D) Trinca sob cordão.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "2601c620-d0f7-4968-8e27-850ebd2b406b", content: "E) Dupla laminação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "78c4baca-4b1c-4016-b9cb-770c9d271fa0",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 21",
        content: "Resolva a questão abaixo.",
        position: 20,
        activity: {
            id: "9f0290f1-e684-4b1d-b450-be98372dbc3c",
            activity_type: "multiple_choice",
            statement: "Qual das limitações apresentadas a seguir não está relacionada com o Ensaio Radiográfico. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "9e32d06e-ca75-42bd-843f-4b9d462f988f", content: "A) Necessidade de acesso a ambas as superfícies da peça que será radiografada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "05ef0635-ff01-4d96-bf0e-9ac3e6cbd6ee", content: "B) Necessidade de interrupção das atividades que são realizadas próximas ao local onde será realizado o ensaio.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "d48e324c-cc38-4e87-bd8e-eda1a86864b2", content: "C) A análise das radiografias não exige experiência prévia do profissional que irá laudá-las.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "2ec448b0-236d-41f7-9cb1-3d34043db411", content: "D) Ensaio que necessita de grande tempo para ser executado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "67ac085d-67c5-4526-88e1-739e6ee18690", content: "E) Radiografias provenientes de juntas que apresentam uma certa complexidade de sua geometria são consideradas difíceis de serem interpretadas..", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "ef9003bc-82c6-46b3-9a3a-d3a709955924",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 21,
        activity: {
            id: "27950bb5-c269-429f-a7b4-e46b2c0830f5",
            activity_type: "multiple_choice",
            statement: "8 ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "2db2e7c1-e898-40e8-8c25-c53eb00488e0", content: "D) Dificuldade na detecção de descontinuidades planares (bi-dimensionais) localizadas no interior do material.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 1 },
            { id: "5d9af0a6-ab18-4dbb-8141-43dbdf796ed9", content: "E) Não proporciona registro permanente dos resultados obtidos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "f29efbe4-69ec-4e39-bd3d-8435b59c1b10",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 23",
        content: "Resolva a questão abaixo.",
        position: 22,
        activity: {
            id: "6452fbd7-37c0-4fdd-ba99-aafff7f592a0",
            activity_type: "multiple_choice",
            statement: "Em relação ao Ensaio Radiográfico, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "c949fa53-0f2f-43a4-8e1f-5be27ce66147", content: "A) Ensaio que detecta com facilidade descontinuidades volumétricas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "b438fc5c-9f3a-450f-84c5-e40f92d0d682", content: "B) As radiações ionizantes dos raios X e γ têm uma ação nociva sobre o organismo humano.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "3d250e9f-a996-48ff-9052-d25d99d36093", content: "C) Nem só os operadores radiográficos são afetados pelos raios X e γ. Todos aqueles que estiverem próximos à região do ensaio são também afetados pela radiação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "9e899581-6c30-4570-9dc7-4f8df3aed43c", content: "D) O filme radiográfico só é atingido, depois que a radiação atravessar toda a espessura do material.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "e0fe6feb-a273-49d3-abb8-7add7c06e4a6", content: "E) Ensaio que detecta com dificuldade descontinuidades planares.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "d148fad7-2e61-4ce8-9bd1-9c5485fe4e95",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 24",
        content: "Resolva a questão abaixo.",
        position: 23,
        activity: {
            id: "e5a46336-5603-405e-bdff-bdc49ff07c83",
            activity_type: "multiple_choice",
            statement: "Comparando os raios “X” e “γ” (gama), fontes de energia empregadas no Ensaio Radiográfico, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "9f06bf1a-7139-4856-adf1-ab0c30528150", content: "A) O raio-X permite regular a tensão anódica, permitindo sua maior penetração na espessura da peça.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "9c3c7384-40d7-4f0a-bd1f-c174954cc251", content: "B) O raio-γ (gama) não permite, em hipótese alguma, variar o seu comprimento de onde.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "2028cdd1-d3c6-44cf-8f86-6ba42bac9add", content: "C) As instalações para uso do raio-γ (gama) são bem mais baratas do que às do raio-X.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "20383ec9-2f5d-440c-b5b4-865635f6706c", content: "D) Enquanto a emissão de raio-γ (gama) se dá espontaneamente, o raio-X necessita de energia elétrica para a sua geração.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "260e4bbd-dbfc-41bc-a084-8382b0d28ecd", content: "E) Para peças com espessuras acima de 90 mm, o ensaio radiográfico ideal a ser empregado é a técnica com raio-X.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "ab1e740b-2694-41dc-a8f6-5451810f6d4e",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 24,
        activity: {
            id: "53fb8c0a-bff0-44db-b283-816f405cd4ac",
            activity_type: "multiple_choice",
            statement: "9 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "5fa5bdf0-f9c9-49b0-ac53-5ada014971f2", content: "C) Técnica indicada para quando há problemas de acesso à junta soldada ou região da peça a ser ensaiada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "2a6c45d6-9a19-48fb-b782-9f535fe166f2", content: "D) Indicada para efetuar radiografias circunferenciais em uma única exposição, também chamada de “exposição panorâmica”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "90af8700-98d2-4b15-8e48-440d0cef5f99", content: "E) Sua emissão é do tipo “esférica” a partir da fonte.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "de24fb15-4197-483f-b8c9-393c067ee1ac",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 26",
        content: "Resolva a questão abaixo.",
        position: 25,
        activity: {
            id: "92da0af9-309b-4096-b028-88b9426d6dd9",
            activity_type: "multiple_choice",
            statement: "Quanto aos “Indicadores de Qualidade de Imagem”(IQI) relativos ao Ensaio Radiográfico, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "b029f796-1206-4c8a-a00b-aa194d764a81", content: "A) A sensibilidade radiográfica estabelecida pelo código ASME em relação ao seu IQI-padrão está definida em função do furo de maior diâmetro visível na radiografia.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "b26a0190-f9da-49fe-a4da-d9aeec7c4ba8", content: "B) IQI é um dispositivo, cuja imagem registrada na radiografia é usada para determinar o nível de qualidade radiográfica.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "e786f2e6-e78d-42a7-a42e-8a5e84de4a9f", content: "C) As diferentes espessuras encontradas em um IQI não têm a função de julgar o tamanho das descontinuidades detectadas no filme.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "cb20b51e-8124-41d4-b403-49cee9a08ba6", content: "D) A sensibilidade radiográfica estabelecida pela norma DIN (Deutsche Industrie Normen) em relação ao seu IQI-padrão está definida em função do menor arame visível na radiografia.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "058fc31f-d6b6-4569-bc48-196860dc5989", content: "E) As diferentes espessuras encontradas em um IQI não têm a função de estabelecer limites de aceitação das descontinuidades  detectadas no filme.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "360bc75c-b22a-4cff-ae05-b0239038bcd6",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 27",
        content: "Resolva a questão abaixo.",
        position: 26,
        activity: {
            id: "30ee5a35-6715-4d60-8d61-577eebc7bf41",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas a seguir, identifique aquela que não está relacionada com o ensaio “Líquido Penetrante”. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "673dcf6a-4ccd-4498-8c6d-e73bf7b18b3a", content: "A) Ensaio rápido e de fácil execução.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "08a36530-c53d-4c09-87fa-d535247beb20", content: "B) Ensaio que apresenta um custo relativamente baixo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "b23e5834-103b-4399-86eb-7b7830f691be", content: "C) Ensaio que apresenta uma boa sensibilidade em relação a descontinuidades localizadas próximas à superfície da peça.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "9e1b1eca-8742-4eee-90e0-061125e73114", content: "D) Ensaio que pode ser realizado em materiais magnéticos e não magnéticos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "b6162b49-dd95-47de-a093-157efb6991b8", content: "E) Para o treinamento de operadores e inspetores, este ensaio requer menor tempo comparado aos outros tipos de ensaios não destrutivos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "57cb2e36-9642-46cb-88c4-5b95d180ebca",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 28",
        content: "Resolva a questão abaixo.",
        position: 27,
        activity: {
            id: "d0b6a9b5-6c7d-4901-ba30-df40636a8ab0",
            activity_type: "multiple_choice",
            statement: "Em relação às vantagens e desvantagens referentes ao Ensaio por Líquido Penetrante, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "0d8d4505-1757-44e3-905c-ee482bfe8c50", content: "A) Uma vantagem deste ensaio é poder detectar descontinuidades superficiais muito pequenas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "20e77ab0-5c9a-4d83-9f8d-7c16dacf00e6", content: "B) Uma desvantagem deste ensaio é que este só detecta descontinuidades abertas para a superfície e que não estejam obstruídas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "72ed303f-f5ea-41ba-afe9-38024312ad5a", content: "C) Uma vantagem deste ensaio é que a forma da peça, ou da região onde será ensaiada, não é um problema.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "140468ec-930a-4316-bb4f-7bb08c5ed49b", content: "D) Uma desvantagem deste ensaio é que este aplica-se somente a materiais ferromagnéticos.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "7b1ad7c8-6a66-4fe7-b1fc-37ecb0f875de", content: "E) Uma vantagem deste ensaio é que este pode ser realizado em superfícies planas ou curvas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["bf1a6065-d278-4f6b-be6a-c7360e9465bc"].push({
        id: "8c058ccd-4c4d-47c7-9453-86d971db0711",
        lesson_id: "bf1a6065-d278-4f6b-be6a-c7360e9465bc",
        step_type: "activity",
        title: "Questão 29",
        content: "Resolva a questão abaixo.",
        position: 28,
        activity: {
            id: "b86f28d9-1b85-4d29-983e-3347f4b421fe",
            activity_type: "multiple_choice",
            statement: "Em relação ao Ensaio não destrutivo “Partículas Magnéticas”, identifique a única alternativa que não é uma desvantagem ou limitação referente a este ensaio. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "6589513b-f832-480d-a3ed-4f5fd5ad1c84", content: "A) Ensaio destinado apenas a materiais ferromagnéticos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "4e92ba93-c8ad-40cd-9987-c5e73937e891", content: "B) A inspeção de áreas com materiais de características magnéticas muito diferentes dificulta bastante a qualidade da inspeção.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "c9b25137-5ad3-47b9-8cba-9d607dff2e29", content: "C) A geometria da peça pode dificultar, ou mesmo tornar a inspeção não confiável, como também impossibilitar a execução do ensaio.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "a7d8139a-3738-449d-932f-5d7a4356c5bf", content: "D) Ensaio que não permite o registro permanente dos resultados obtidos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "db60bd1a-5af2-4474-a378-4874aeb40b60", content: "E) Ensaio que necessita de acesso a ambas as superfícies da peça que será analisada.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_MODULES.push({
        id: "586b2a80-80b6-432f-aa10-d621c6156c88",
        course_id: "c5555555-5555-5555-5555-555555555555",
        title: "Qualificações",
        description: "Questões e atividades sobre Qualificações",
        position: 6,
        is_published: true
    });

    STATIC_LESSONS.push({
        id: "cc082136-c886-4a60-b28c-568ac20a562e",
        module_id: "586b2a80-80b6-432f-aa10-d621c6156c88",
        title: "Prática - Qualificações",
        description: "Exercícios do banco.",
        estimated_minutes: 60,
        position: 1,
        lesson_type: "interactive",
        is_published: true
    });
    
    if (!STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"]) {
        STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"] = [];
    }

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "1d1bba05-f90c-4abd-8604-4e3f60f60f60",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 1,
        activity: {
            id: "1f7cc6e4-e558-4cee-90f7-ff0dbb327f49",
            activity_type: "multiple_choice",
            statement: "Quanto às qualificações de procedimentos de soldagem e as normas que regem esta atividade, marque a afirmativa incorreta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "27020a3d-ab20-4647-ad15-c66e27dbf454", content: "F) A qualificação do procedimento de soldagem é o método através do qual um procedimento particular é provado ser adequado, para produzir juntas soldadas de qualidade satisfatória.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "696f058d-85bf-4310-9c1f-2032e86b57b5", content: "G) As qualificações de procedimento de soldagem são feitas pela avaliação dos resultados de ensaios efetuados nos corpos de prova extraídos das peças de teste, soldados de acordo com um procedimento previamente estabelecido.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "15faeb7f-66ff-4e2e-b670-4fd3a7446b0e", content: "H) De um modo geral, a necessidade de se qualificar procedimentos de soldagem e qualificar soldadores torna-se totalmente desnecessária, quando o metal a ser soldado é o aço carbono.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 3 },
            { id: "9796749f-767b-4b7e-ba4a-04e4493e4a16", content: "I) A retirada de corpos de prova de uma chapa de teste deve seguir uma orientação estabelecida pela norma de qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "918b995f-033a-40c2-a52a-b8f2520fab06", content: "J) O momento em que os corpos de prova são retirados das peças de teste e identificados deve ser testemunhado por um Inspetor de Soldagem Nível 2.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "29bc101b-9fbd-46a0-92dc-ee933c73f5d2",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 2,
        activity: {
            id: "20fa080a-ca13-4711-917a-1cafddee5718",
            activity_type: "multiple_choice",
            statement: "Quanto às Variáveis conhecidas como: “Não-Essenciais”, “Essenciais” e “Essenciais Suplementares”, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "3e54879d-66c6-45fd-89e3-a187753a2e5a", content: "A) Cada Norma de Qualificação estabelece as suas próprias Variáveis “Não-Essenciais”, “Essenciais” e “Essenciais Suplementares”, de acordo com o tipo de equipamento que a norma de projeto, que está a ela vinculada, abrange.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "8a05c649-2078-4fb4-a422-f0cdcfbdbc1a", content: "B) “Variáveis Essenciais” são variáveis que, se alteradas além do que as normas estabelecem, requerem uma nova qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "08f15719-acdf-41ea-9aca-6fefd0000f8a", content: "C) “Variáveis Essenciais Suplementares” são aquelas que, se alteradas além do que as normas estabelecem, requerem uma nova qualificação; contudo, a sua análise é necessária quando se tem requisito de impacto na junta soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "0fff5f90-bae7-487d-be0c-6b8be5f12e99", content: "D) “Variáveis Não-Essenciais” são variáveis que, se alteradas, não requerem uma nova qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "8653b021-2e6d-4406-bfb3-730e3dec0b8b", content: "E) “Variáveis Essenciais Suplementares” são aquelas que, se alteradas além do que as normas estabelecem, requerem uma nova qualificação.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "ae93cb3c-58ae-4a57-9b2a-5366fa5bc285",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 3",
        content: "Resolva a questão abaixo.",
        position: 3,
        activity: {
            id: "a51cc89f-8588-4eff-8b96-f253cc1665fd",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas apresentadas a seguir não é considerada uma norma (ou código) de projeto? ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "9763f071-dc1f-4ea4-9fa6-5447443457a5", content: "F) ASME Seção VIII – Divisão 1", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "60236c4c-6f7f-4cc8-9996-d75e2accc944", content: "G) API 1104", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "8b79645e-c02d-4456-a34f-becda562f3fe", content: "H) AWS D1,1", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "4411e7ec-1112-49db-9814-25bc77976f07", content: "I) ASME B31.4", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "ecc243c3-a02d-47c4-aa62-9210c8dab31c", content: "J) ASME Seção I", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "0dbc1aa5-116b-4d7a-8106-d96a9f622a76",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 4",
        content: "Resolva a questão abaixo.",
        position: 4,
        activity: {
            id: "ec70ca6a-6d85-429c-bba2-af38d0a64182",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas apresentadas a seguir é considerada uma norma (ou código) de projeto? ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "ba4a08b5-b93b-4344-8956-66db3e2a10f6", content: "A) ASME Seção I", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "57f95f19-01fa-44dd-8e22-00482f33740a", content: "B) ASME Seção IX", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "152556c5-161f-443d-be58-8ac644c64422", content: "C) ASTM A36", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "404abc8e-f7bc-48ff-b392-6a1f84762a8d", content: "D) API 1104", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "607ca5ab-0530-4e3e-b3e3-cc4034925afd", content: "E) AISI 316", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "51f10a52-84d9-48ed-8868-e4351bcd51a3",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 5",
        content: "Resolva a questão abaixo.",
        position: 5,
        activity: {
            id: "0e1101d8-a331-4ea5-bea6-ac473c944bb7",
            activity_type: "multiple_choice",
            statement: "Qual das normas apresentadas a seguir contempla em seu próprio corpo: critérios, regras, recomendações técnicas quanto ao projeto de fabricação de equipamentos, assim como o código para as qualificações de procedimento de soldagem, de soldadores e operadores de soldagem? ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "783a92aa-0aeb-46f3-8766-e087f8c59ed8", content: "A) ASME Seção III", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "eb6ffcb7-3225-46ee-ac00-d9180fe96933", content: "B) ASME Seção IX", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "e422be65-41fb-45b3-93c6-519b9bbfe426", content: "C) API 620", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "aecb8aa2-5c0f-47aa-a0f4-52e4e6f2ce96", content: "D) AWS D1.1", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "cf81a0ab-a099-4dc9-ace5-4165c18b9cc4", content: "E) API 5L", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "cda22bb6-08e8-43ee-9948-a492a6622c2a",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 6,
        activity: {
            id: "ebee4388-c228-4be7-86e0-9cbf1d8dbd4c",
            activity_type: "multiple_choice",
            statement: "4 ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "307d2343-c823-41c4-9ea0-1996d3e11e26", content: "D) Agrupamento dos metais de adição contemplado no código API 1104, baseado nas propriedades mecânicas e composição química do metal depositado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "aeebd17f-4658-42a6-8f0d-3c85617f4e8f", content: "E) Agrupamento dos metais de base contemplado no código ASME, baseado nas propriedades mecânicas, composição química e soldabilidade do material.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "19eaa3fd-047c-402d-bff2-b9bf6307cb66",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 1104",
        content: "Resolva a questão abaixo.",
        position: 7,
        activity: {
            id: "aa138e65-a3cc-4da8-8943-cb974537083a",
            activity_type: "multiple_choice",
            statement: "baseado nas propriedades mecânicas, composição química e soldabilidade do metal depositado. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "40caffe9-aacf-41dd-82d7-d29b9c997bcb", content: "B) Agrupamento dos metais de adição contemplado no código ASME, baseado em suas propriedades mecânicas, composição química e usabilidade.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 1 },
            { id: "ae6f899c-69c2-44ba-901e-8eebfbd9ef04", content: "C) Agrupamento dos consumíveis de soldagem contemplado no código AWS D1.1, baseado nas propriedades mecânicas, composição química e soldabilidade do metal depositado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "360ee7bf-196f-4e55-9ce6-6e8e18f9a1ca", content: "D) Agrupamento dos metais de adição contemplado no código API 1104, baseado em suas propriedades mecânicas, composição química e usabilidade.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "367dba0b-801e-4269-b3c2-e2d976f9c39c", content: "E) Agrupamento dos consumíveis de soldagem contemplado no código ASME, baseado nas propriedades mecânicas, composição química e soldabilidade do metal depositado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "cb259b79-744b-4af2-af4b-419d1bc33aa8",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 9",
        content: "Resolva a questão abaixo.",
        position: 8,
        activity: {
            id: "bfc50f47-0bcc-4e9d-94ea-73489ac37ee2",
            activity_type: "multiple_choice",
            statement: "Quanto ao tema “chapa de teste de produção”, identifique a alternativa correta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "33c01e51-7aaf-4096-a6e1-70cf0be146b0", content: "A) É estabelecido que basta a soldagem de uma única chapa de teste de produção para cada tipo de equipamento, devendo esta chapa estar sempre posicionada na posição plana (posição mais comum encontrada nos equipamentos).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "67f02840-8b83-44fc-9cc7-d057e311e9c0", content: "B) Os parâmetros usados na soldagem da chapa de teste de produção não precisa ser necessariamente os mesmos que aqueles usados na soldagem do equipamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "790f0cd8-a819-43ae-a606-6e3f68a9bb42", content: "C) A norma de qualificação de procedimentos de soldagem (relativa ao tipo de equipamento que está sendo fabricado) é a que contém os requisitos relativos às chapas de teste de produção.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "84d85271-5122-43a5-8677-030cee6c6cb2", content: "D) O uso da chapa de teste de produção é uma prática típica quando da fabricação de equipamentos que usam materiais para baixas temperaturas, quando qualquer alteração nos valores de corrente, tensão e velocidade de soldagem durante a soldagem podem aumentar o risco de fratura frágil deste equipamento.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "5e90d0a2-3cf6-4cb8-8035-6c96d328c004", content: "E) O único ensaio mecânico realizada nas chapas de teste de produção é o de impacto. Os demais ensaios são dispensados de serem solicitados, haja vista que o ensaio de impacto é o mais importante de todos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "a7dbce86-0d41-4a73-85cf-69e36718b2da",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 10",
        content: "Resolva a questão abaixo.",
        position: 9,
        activity: {
            id: "c8433252-3606-4810-89f8-539002f28274",
            activity_type: "multiple_choice",
            statement: "Quanto à validade da qualificação de um procedimento de soldagem, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "bac9e0e4-499b-4d3c-8ca4-51c9b916ccbd", content: "A) Cada norma de qualificação de procedimento de soldagem adota seu próprio critério para impedir o uso de uma determinada especificação e solicitar uma requalificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "1e9c5f81-7930-4661-beb2-4ddb7b47635c", content: "B) Nenhum ponteamento pode ser realizado, na fixação de componentes de uma junta, sem que um procedimento de soldagem adequado tenha sido qualificado previamente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "ff67ecc9-4172-4370-acee-d10988c17e27", content: "C) Todas as normas de qualificação de procedimento de soldagem adotam o mesmo critério, quanto à sua validade.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "ef2d199e-819a-4ad8-bfb1-ec0cb39320ca", content: "D) Cada norma de qualificação de procedimento de soldagem adota os limites de suas variáveis, em função do tipo de equipamento que está sendo construído, que, por sua vez, é em função da norma de projeto.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "07f9bd4c-43a3-4063-a9ed-617a5b20f70e", content: "E) Nenhuma soldagem pode ser executada, na fabricação de um determinado equipamento, sem que um procedimento de soldagem adequado tenha sido qualificado previamente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "70a96bb0-f535-42e1-80c5-d00cea4e71b9",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 11",
        content: "Resolva a questão abaixo.",
        position: 10,
        activity: {
            id: "7eaf0eed-a6cd-4eac-a6a8-4d36fc48d075",
            activity_type: "multiple_choice",
            statement: "Quanto à validade da qualificação de um procedimento de soldagem, assinale a alternativa correta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "1fd97e55-b96c-4d15-b919-18ffa31ebd06", content: "A) Os limites das qualificações de procedimento de soldagem são estabelecidos, principalmente, em função da habilidade do soldador que deverá estar preparado para participar da soldagem de um equipamento, estando este coberto por aquelas qualificações.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "6376990d-0777-4ce9-9243-8d9a2c8ef12b", content: "B) Os limites das qualificações de procedimento de soldagem são estabelecidos em função soldabilidade do metal de base que será soldado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "32b2f257-c59c-41b1-8cdf-77165ef9eaa8", content: "C) Estabelecer que uma variável é do tipo “essencial” e uma outra é do tipo “não essencial”, isto só passa a ter valor, quando o ensaio de impacto é exigido na qualificação de um procedimento de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "7eb0cf18-8b94-4d03-bbe5-4640cbb1699c", content: "D) Tendo em vista que cada processo de soldagem tem as suas particularidades, as principais normas de qualificação fixam, igualmente, os mesmos limites para cada variável em função do processo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "1cf868b2-68e0-4f63-ab5f-c7fbab2f4493", content: "E) Enquanto algumas normas de qualificação estabelecem a mesma importância para todas as variáveis de soldagem, outras normas estabelecem níveis diferentes para essas variáveis, dando para umas um grau de importância maior e para outras um grau de importância menor.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "7ea523ed-507f-44de-8392-15a1c8ddfcc9",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 13",
        content: "Resolva a questão abaixo.",
        position: 11,
        activity: {
            id: "83f04c0d-c2cd-4b68-9966-9111a2cf1447",
            activity_type: "multiple_choice",
            statement: "No que diz respeito a um procedimento de soldagem, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "d2a97659-be87-4804-b2d3-382b858385d7", content: "A) É um documento que informa, quais são as variáveis de soldagem que deverão ser empregadas na união de componentes por soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "b5d81180-1117-48b8-b047-6aa1ef89984a", content: "B) É um documento que estabelece os limites ou faixas de parâmetros, como por exemplo: tipo de corrente, de metal de base, consumíveis de soldagem, valores das intensidades de corrente elétrica, de tensão, entre outras informações.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "f415bd0a-ca5a-4585-a967-17ffb6acb0b9", content: "C) Um procedimento de soldagem só é válido dentro dos limites nele especificados.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "dd5d2fb0-b460-45e9-8d82-986adce7e9c5", content: "D) Os limites ou faixas dos parâmetros de soldagem contemplados em um procedimento de soldagem são estabelecidos pela norma de projeto do equipamento.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "07d76806-adc6-4562-a075-0e5e2321ee26", content: "E) Em uma determinada situação, quando uma determinada variável de soldagem encontra-se fora do limite ou da faixa estabelecida no procedimento de soldagem, um novo procedimento de soldagem deverá ser usado em lugar do primeiro.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "9bf07a16-2143-4b64-80b0-3f571f23085a",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 14",
        content: "Resolva a questão abaixo.",
        position: 12,
        activity: {
            id: "615ee86e-6705-43de-9d75-f50bae7e0c9b",
            activity_type: "multiple_choice",
            statement: "Assinale a alternativa incorreta no tocante aos procedimentos de soldagem pré-qualificados. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "8adbf588-2ce1-4ffb-9d0a-562a84f97150", content: "A) Todas as normas de qualificação disponibilizam um determinado número de procedimentos de soldagem pré-qualificados.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "435a42c3-eff6-4fdb-9636-24029294f5b6", content: "B) O procedimento de soldagem pré-qualificado só é usado quando for permitido pela norma de qualificação de procedimentos, especificações, normas de fabricação, etc.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "a31ee4aa-8e4e-49c1-8bbd-242a852b3bf6", content: "C) Procedimentos de soldagem pré-qualificados são procedimentos de soldagem que podem ser usados quando um fabricante mostra que possui experiência no emprego de certos metais de base e consumíveis de soldagem através de serviços anteriormente executados.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "80927cd0-e521-44f0-a444-085be26e6123", content: "D) Fica totalmente dispensada a realização de ensaios mecânicos, quando da decisão do uso de procedimentos de soldagem pré-qualificados.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "ca4c855b-23c4-45e0-bc2d-cc74e69e8895", content: "E) O impedimento do uso de um procedimento de soldagem pré-qualificado obriga o fabricante a qualificar o procedimento de soldagem por intermédio de ensaios visual, mecânicos, radiográfico, cujos resultados devem ser avaliados, conforme os critérios estabelecidos pela norma de qualificação adotada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "2006507a-a8a1-4f13-87e2-a040047e6119",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 15",
        content: "Resolva a questão abaixo.",
        position: 13,
        activity: {
            id: "f508b363-24a1-4073-b316-c0c73af61329",
            activity_type: "multiple_choice",
            statement: "Em uma caldeiraria, onde esteja sendo prevista a construção de um vaso de pressão segundo as exigências da norma ASME Seção VIII Divisão 2, pergunta-se: qual seria a norma de qualificação de procedimentos de soldagem e de soldadores indicada para conduzir esta atividade? ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "3c7a4d52-28bf-4b08-9e96-5a5376732f6f", content: "A) ASME Seção III", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "7f5c1a26-937a-4d9c-acfa-b6943a18f774", content: "B) ASME Seção VIII Divisão 1", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "127f1eee-2f98-4f82-be26-f2b9a72af7ed", content: "C) ASME Seção IX", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "76bced87-d09a-41ed-bcd4-0ca4dbc6da89", content: "D) API 1104", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "b59d2e72-0407-46c5-ba0c-39674547194e", content: "E) DNV OS-103", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "d2cacf81-d4cd-4290-9ba6-28121daeeb85",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 16",
        content: "Resolva a questão abaixo.",
        position: 14,
        activity: {
            id: "a82f5b03-af0c-4865-85a1-e87504dc46f9",
            activity_type: "multiple_choice",
            statement: "Durante a qualificação de um procedimento de soldagem, qual o único ensaio que não pode ser testemunhado pelo Inspetor de Soldagem Nível 1? ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "7645a076-3a0e-4d44-bd21-d6f45840c14d", content: "A) Ensaio de impacto.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "dd2a2f8d-7f9b-42ef-b7ea-efe723db9bd6", content: "B) Ensaio de dobramento lateral.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "0e37f711-41cd-4d4a-a5f1-2ea5f0543935", content: "C) Ensaio de dureza.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "1e6b9745-a8bc-4821-8340-05e05feccda7", content: "D) Ensaio de tração.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "6bca49a9-dc7f-4c39-86a7-a20cd43afdfc", content: "E) Ensaio de dobramento de face.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "c743aa8a-ccf8-46be-94a6-5cbfaacb22f9",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 17",
        content: "Resolva a questão abaixo.",
        position: 15,
        activity: {
            id: "16be3cb1-c99f-43bf-afc3-c1cf64c95142",
            activity_type: "multiple_choice",
            statement: "Em uma fábrica, onde esteja sendo prevista a construção de um gasoduto com 254 mm de diâmetro e 5 km de comprimento, pergunta-se: qual seria a norma de qualificação (procedimentos de soldagem, e de soldadores e operadores de soldagem) indicada para conduzir esta atividade? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "d75c8f4e-7a3d-47a1-8e92-50c359c71eda", content: "A) API 5L.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "d2b4155a-8509-4cc5-9c84-1a06cc59f7f4", content: "B) API 620.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "0dab1bfc-dd5a-4c84-bfa2-cb63d995afa7", content: "C) API 650.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "cb8bb8d4-c416-414c-ad93-10e413eb8bb5", content: "D) API X60.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "0370a846-2063-4ebb-b51c-de98c783f16f", content: "E) API 1104.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "30da60a4-178c-49ec-a5f5-004658bd5f91",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 19",
        content: "Resolva a questão abaixo.",
        position: 16,
        activity: {
            id: "70b53f53-8d91-4625-ba0f-d9abe1ed6df5",
            activity_type: "multiple_choice",
            statement: "Qual norma de qualificação (de procedimento de soldagem e de soldadores e operadores de soldagem) estabeleceu as letras G (do inglês “groove”) e F (do inglês “fillet”) designando posições de soldagem para as juntas de topo e de ângulo, respectivamente?  (Exemplo: 2G, 5G, 1F, 3F, etc.) ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "40f08e9b-a215-4905-aff0-9f05a388743d", content: "A) DNV OS-103", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "5fd56f12-d57d-4a3c-b364-b1c7af2b3c03", content: "B) ASME Seção VIII Divisão 1", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "fa061676-2f73-4d74-8e76-1b8c44ebc4ce", content: "C) API 1104", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "65f54275-4eda-4b3d-b90d-e252425cef70", content: "D) ASME Seção IX", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "1fadbca1-f1d5-4ca1-9c6d-4fd72062c149", content: "E) AWS D1.1", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "cebb1d42-d670-4eec-8d24-ed714d06a544",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 20",
        content: "Resolva a questão abaixo.",
        position: 17,
        activity: {
            id: "4c9fd282-5f26-45ca-a39a-397780af414a",
            activity_type: "multiple_choice",
            statement: "Em relação à qualificação de soldadores e operadores de soldagem, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "5eb717b0-6761-46ea-8beb-9c617409db51", content: "A) Um soldador ou operador de soldagem só pode participar na soldagem de uma determinada junta, caso ele já esteja qualificado para aquele serviço.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "beb7914a-9dcf-4a80-93ee-d5facc20fb0b", content: "B) O trabalho de um soldador ou operador de soldagem fica restrito apenas ao que esteja registrado em seu Registro de Qualificação de Soldador ou Operador de Soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "6bdfed4f-d453-4d92-a31c-b01346afc2f2", content: "C) Um soldador ou operador de soldagem, estando qualificado em uma determinada norma de qualificação, pode soldar na construção de qualquer equipamento, independentemente da norma de projeto daquele equipamento.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "5744c0a1-9375-43f5-ab01-0043d9c79c30", content: "D) Dependendo da norma de qualificação, o fato do soldador ou operador de soldagem estar qualificado na posição sobre-cabeça, isto não significa que ele também pode soldar nas demais posições de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "9f7329e1-52da-49bf-92ba-5d14d0c6b130", content: "E) A qualificação do soldador ou operador de soldagem fica atrelada a uma norma de qualificação, que, por sua vez, está associada a uma norma de projeto.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "9029f987-6076-4ae0-98b5-4f96e68f9017",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 18,
        activity: {
            id: "137f634f-331f-4ae8-a57a-726dd57a2646",
            activity_type: "multiple_choice",
            statement: "0 aproximadamente o mesmo tempo que levaria para qualificá-lo no processo MIG/MAG (GMAW). ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "7bf26d6c-d319-4fa2-9c13-f792279a90d6", content: "B) A energia de soldagem (aporte térmico) introduzida por um soldador em uma junta soldada na posição plana é aproximadamente a mesma energia, caso a junta estivesse na posição vertical.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "d5f3bf8b-1454-4e68-b671-64a943d3dec9", content: "C) Quanto menor o diâmetro de um tubo, maior deve ser a habilidade do soldador.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 2 },
            { id: "40ff646f-bc4b-457c-a8bb-43e53c087319", content: "D) Quanto maior a diâmetro do metal de adição, menor deve ser a habilidade do soldador.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 3 },
            { id: "612c9df4-e57b-4e75-b7d3-6d055691ce0c", content: "E) A técnica usada por um soldador para soldar uma junta de ângulo na posição vertical com progressão ascendente é a mesma técnica usada para soldar na posição vertical com progressão descendente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "8c527634-bfc2-4a8c-8bec-7a93d77c3f30",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 22",
        content: "Resolva a questão abaixo.",
        position: 19,
        activity: {
            id: "7a6db743-e715-412d-bc82-d612b8770d71",
            activity_type: "multiple_choice",
            statement: "Em relação à qualificação de soldadores e operadores de soldagem, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "bcb5c103-d387-45d2-a799-6392959285ff", content: "A) Em caso de máxima urgência, os soldadores e operadores de soldagem podem ser qualificados utilizando a própria obra para realizarem suas qualificações.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "cccd842d-f996-447e-8b52-ac6475c8d198", content: "B) Um determinado fabricante poder mostrar aos seus clientes um documento contendo o nome de todos os seus soldadores qualificados e suas respectivas qualificações, isto é uma maneira deste fabricante mostrar a qualidade de sua mão-de-obra.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "661b54d3-633f-4d8d-866f-e46f64827ce2", content: "C) A qualificação do soldador ou operador de soldagem demonstra a sua habilidade para produzir soldas aceitáveis de acordo com um procedimento de soldagem previamente aprovado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "eb51d53b-8e2d-4abd-83bb-1742600ccfe5", content: "D) Os soldadores ou operadores de soldagem são qualificados executando suas soldas em peças de teste (em chapas ou tubos de teste) em função de uma norma de qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "7f926233-9fd3-4f15-931d-b30a2a1ff2b9", content: "E) O tipo de metal de base a ser utilizado na qualificação de soldadores e operadores de soldagem, assim como o tipo de peça de teste, de ensaios, o critério de avaliação, entre outros, são determinados pela norma de qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "2e13d00c-f9b3-4767-9caf-97f1bad859a5",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 20,
        activity: {
            id: "4e7bdcbf-5f6b-4a09-8d1f-b8479a7bda9a",
            activity_type: "multiple_choice",
            statement: "1 ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "0e8f1b04-ba4e-4df3-9e91-77c600391760", content: "C) O tempo máximo em que um soldador ou operador de soldagem poderá ficar sem estar soldando, obrigando-o a uma nova qualificação, depende da norma de qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "a8b643dd-f99c-44e3-9667-36875baa9af1", content: "D) É de responsabilidade do fiscal da obra ou do engenheiro de soldagem controlar quais soldadores e operadores de soldagem devem passar por uma nova qualificação.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 2 },
            { id: "032f8ecb-a4e5-4e5d-852b-ff8bc03a7184", content: "E) Normas como a ASME IX e AWS D1.1 fixam em 6 (seis) meses o período máximo em que um soldador ou operador de soldagem pode ficar sem soldar, obrigando-o uma nova qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "920d7f51-f67c-4303-8350-97c8d87193c1",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 24",
        content: "Resolva a questão abaixo.",
        position: 21,
        activity: {
            id: "7a1b8733-6d83-48bf-b1f1-e407831bf664",
            activity_type: "multiple_choice",
            statement: "Quais são os possíveis ensaios que podem ser realizados para uma qualificação de soldador ou operador de soldagem (junta de topo)? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "951aa286-ce09-43a1-baca-64cc7027839a", content: "A) Ensaio visual.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "83fdcdaa-2ffc-4bb1-81b6-f920151ef245", content: "B) Ensaio de dobramento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "5b3a9020-9fa6-4c20-9c41-2b01d0552cb6", content: "C) Ensaio radiográfico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "9549e06b-5351-4a61-872e-8b98682ddb1c", content: "D) Ensaio de impacto.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "10a7ddfd-6140-4278-aac5-29158b792f42", content: "E) As alternativas (a), (b), (c) estão corretas.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "9731c7eb-e60a-4eab-bc5f-df6abb04a40c",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 25",
        content: "Resolva a questão abaixo.",
        position: 22,
        activity: {
            id: "1b46b0e5-1015-4086-ae3b-a0ff70847832",
            activity_type: "multiple_choice",
            statement: "Qual o objetivo principal da realização da qualificação de soldador ou operador de soldagem? ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "c0d987cf-8f8d-4156-8248-98bc9b687f15", content: "A) Determinar as propriedades mecânicas da junta soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "8a219042-0144-4231-9d07-c7f6fe74c5c7", content: "B) Verificar a existência ou não de descontinuidades/defeitos nas juntas soldadas.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "86bcdf78-8256-48b6-8faf-e0a43f59adea", content: "C) Verificar a existência ou não de descontinuidades/defeitos nas juntas soldadas, assim como determinar suas propriedades mecânicas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "5c313e1a-19a0-4272-9fa2-726d7f9f4837", content: "D) Avaliar o estado das fontes de energia encontradas na fábrica.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "6fa81de1-0813-4620-bdb8-83f95de5e2a0", content: "E) Avaliar se a política de treinamento da mão de obra vem operando satisfatoriamente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "1d27e015-ef9f-4985-8dd1-ca1f3dc4437a",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 23,
        activity: {
            id: "40d37a01-c222-4e69-bd6c-30ef974cec7c",
            activity_type: "multiple_choice",
            statement: "2 ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "163c75b0-6977-4ca0-88c7-562c18b97edd", content: "B) O eixo dos corpos de prova referentes aos ensaios de dobramento, tração, impacto, entre outros, é sempre perpendicular ao eixo da junta soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "5e02cca0-0252-4003-ba61-1e50433234e5", content: "C) Os tipos de ensaios a serem realizados em uma qualificação de procedimento de soldagem dependem da norma de qualificação utilizada..", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "e59fa85c-8361-47d9-a621-2ed83e80dc1e", content: "D) Todos os corpos de prova são retirados da peça de teste perpendicularmente ao eixo da junta soldada, à exceção dos corpos de prova referentes ao ensaio de tração que se localizam no mesmo eixo da junta soldada.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 3 },
            { id: "7023e6f2-9ba1-4960-a278-aedf367dae06", content: "E) Caso o ensaio de impacto seja requerido, a quantidade de corpos de prova e as localizações do entalhe devem ser informadas na norma de qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 4 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "63a9cb49-dfab-48f9-8bed-e288d2ad3c5e",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 27",
        content: "Resolva a questão abaixo.",
        position: 24,
        activity: {
            id: "7b3b490d-91cc-46cb-89a2-abb1366b46c0",
            activity_type: "multiple_choice",
            statement: "Quando um soldador ou operador de soldagem deve realizar uma nova qualificação? ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "799d0277-26f8-4c9a-997f-307799f9c590", content: "A) Ao término da obra, quando ocorreu sua primeira qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "69cd0078-798f-4c00-ab7c-825f7fcf8409", content: "B) Ao retornar de suas férias anuais, após permanecer 30 dias afastados de suas atividades diárias.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "afec6814-f56a-4cd3-9ce9-66ddd09b4244", content: "C) Quando um novo equipamento estiver para iniciar sua fabricação, sendo a norma de projeto deste diferente daquela usada em sua qualificação..", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "ac550dae-616a-4f27-9ad8-799b2acfe632", content: "D) Uma vez o soldador ou operador de soldagem estando qualificado, o mesmo não precisa se qualificar novamente, a não ser que o mesmo fique afastado da ferramenta durante 6 (seis) meses.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "db4f62ae-0889-4eb1-92f4-68bb271f0a37", content: "E) Quando este profissional mudar de setor internamente em uma fábrica.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "ef42f768-ac09-4719-a8dc-23e860ae986b",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 0",
        content: "Resolva a questão abaixo.",
        position: 25,
        activity: {
            id: "0b922e87-3cc2-4719-afc1-ef0f19bf2e28",
            activity_type: "multiple_choice",
            statement: "80%Mn, 0,40%Si, apresentando baixa resistência mecânica, quais são os ensaios mecânicos normalmente solicitados? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "85fc02bb-fbdf-41f7-8838-f0c1cf026aa7", content: "A) Ensaios de tração e de dureza.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "2a393079-6ff1-4df4-b28c-df62525272ba", content: "B) Ensaios macrográfico e de tração.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "b69dba8c-85ec-4dd5-8e08-504e62ff35b6", content: "C) Ensaios de impacto e de dobramento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "bf60f1d9-1fc1-4f43-a8a8-597d7e501a97", content: "D) Ensaios de dobramento e de impacto.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "05524845-ffdb-4ad2-9a0a-6d6deefc50e0", content: "E) Ensaios de tração e de dobramento.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "ac8ed9d8-f3f9-404d-ab0d-f2a1bef23d23",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 30",
        content: "Resolva a questão abaixo.",
        position: 26,
        activity: {
            id: "16a5c18e-bab5-4493-a833-636ebaef1c7f",
            activity_type: "multiple_choice",
            statement: "Em uma qualificação de procedimento de soldagem que será empregada na fabricação de um vaso de pressão (temperatura de trabalho: 450oC; pressão de trabalho: 180 bar), qual dos ensaios mecânicos apresentados a seguir não deverá ter sua execução solicitada? ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "1e03d7e5-7021-44f3-a542-18bab757dbac", content: "A) Ensaio de CTOD (Crack Tip Opening Displacement).", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "d60d653f-55dd-4bf9-aeb5-fdda97020f26", content: "B) Ensaio de dobramento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "6ab0ea01-3702-4b29-a31a-850556a4eeef", content: "C) Ensaio de impacto.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "df271cdf-15a5-40b1-82df-d30c96f42c0f", content: "D) Ensaio de dureza.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "36cc92af-a11e-453e-9961-621a7310e79c", content: "E) Ensaio de tração.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "f9135d29-44c4-4894-8b92-f0c928a024d0",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 32",
        content: "Resolva a questão abaixo.",
        position: 27,
        activity: {
            id: "0000b95e-ce9a-4fe2-8ba6-7532a1391b64",
            activity_type: "multiple_choice",
            statement: "Em uma qualificação de procedimento de soldagem, quais são os diferentes tipos de ensaios requeridos? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "022764c4-f085-4e52-883d-33e124bafeb3", content: "A) Visual, dobramento (face e raiz), tração.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "c40cd6b2-be14-43f4-9a5f-85dbb29b223a", content: "B) Dobramento (lateral), tração, impacto.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "be6cf0f3-071d-4af5-b844-12ef2a2fbe7a", content: "C) Fratura, macrografia.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "7594d864-172d-4292-8da4-3001b0513725", content: "D) Nick-break, dobramento (lateral, face e raiz), impacto.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "46646796-112b-40d6-8451-834cb35ec22a", content: "E) Depende da norma de qualificação aplicável e do tipo de junta a ser analisada.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "da48c389-bdf6-4448-8255-1da0e8b188f8",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 28,
        activity: {
            id: "d73ddab7-9cc6-4962-9d00-e141624e4baf",
            activity_type: "multiple_choice",
            statement: "Uma medição realizada com um paquímetro apresentou a leitura representada na figura a seguir. Com base nessa figura, qual foi a medida obtida? \n\n<img src=\"/images/questions/page205_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "20641c92-c35b-4d5e-adb3-d656d81afc71", content: "K) 11,3 cm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "12378f63-8d6f-4c2f-9724-6e131f5ad18b", content: "L) 1,03 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "31e90161-30e7-43cb-8c89-5d62d714ea7c", content: "M) 1,3 cm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "4bc8a72f-b0c4-4ed4-a808-d3c5ea0dc406", content: "N) 11,3 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 4 },
            { id: "f3cc2f39-14a4-418e-898b-fbffc1760e32", content: "O) 10,3 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "c49bc017-2037-44d7-b4ad-e9576e88c071",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 29,
        activity: {
            id: "933a5f0a-5e8d-4cfc-bf24-4a8f46f87929",
            activity_type: "multiple_choice",
            statement: "O diâmetro de uma barra cilíndrica foi medido em 44,54mm. Esta medição convertida para polegada apresenta o seguinte resultado: \n\n<img src=\"/images/questions/page205_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "33ed62f2-6799-47ab-a18e-d8ed42adec77", content: "A) ¾”", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "b488094d-a8e6-4998-9754-4603a4097cd3", content: "B) 1 ¼”", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "79eb6df8-549e-43e1-b431-e3548542cab6", content: "C) 1 ¾”", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "4dccf96d-2853-44fb-b5bf-a4df30f7e1ef", content: "D) 1 ½”", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "071ccbdd-cc4a-4d3e-8a61-1c7fad697f23", content: "E) 2 ¼”", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "dd42483f-0932-4e2f-b8a0-d291aa94943c",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 3",
        content: "Resolva a questão abaixo.",
        position: 30,
        activity: {
            id: "327adfd9-8c4f-4cd6-a18d-aa1ee97777ee",
            activity_type: "multiple_choice",
            statement: "Se 1” (inch = polegada) é igual a 25,4 mm e se 1” é igual a 0,08` (foot = pé), quantos pés equivalem 100 cm (aproximadamente)? \n\n<img src=\"/images/questions/page205_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "f1bcf0e1-de76-4cbe-89a4-07f812af7236", content: "F) 3,15 pés.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 1 },
            { id: "bd791c29-039b-43f5-afdf-713da5df2181", content: "G) 3,00 pés.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "072a0253-7800-410e-995b-65cc80909c4f", content: "H) 2,85pés.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "2c22bf7e-c513-4519-afcd-1fa5237f74cb", content: "I) 3,30 pés.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "113da36e-4e17-4bae-a6b7-14703d27f877", content: "J) 3,50 pés.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "677b7d36-2f3b-4efd-81cd-b080cf8264b2",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 4",
        content: "Resolva a questão abaixo.",
        position: 31,
        activity: {
            id: "6cd6a646-dd93-40a5-8ca7-51033481a285",
            activity_type: "multiple_choice",
            statement: "Um brasileiro ao chegar aos Estados Unidos em um rigoroso inverno, observou que a temperatura ambiente no aeroporto era -40ºF. Qual seria o valor daquela temperatura caso o termômetro marcasse em graus Celsius? Usar a fórmula: ºF = (ºC x 9/5) + 32 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "873c3bff-aca1-46cd-b804-bb8e049a188c", content: "F) -25ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "f850c157-ed0f-43e3-9e58-732535ba66b9", content: "G) -40ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "6ba3a7d3-ef78-45ee-99da-18e8f5daa1e9", content: "H) 0ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "b40f31dd-f6f8-4ea4-9f55-6f97f676c409", content: "I) -30ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "21e8cda7-cd0f-4f02-8310-c4c237f5ddbb", content: "J) -10ºC.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "670cc348-a76c-491c-8c40-dcd4f230174b",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 6",
        content: "Resolva a questão abaixo.",
        position: 32,
        activity: {
            id: "b9dcf465-e0a8-411b-b2d7-2620cde7df98",
            activity_type: "multiple_choice",
            statement: "Necessitando conhecer o diâmetro da alma de um eletrodo revestido, qual dos instrumentos de medida listados a seguir seria o mais correto para realizar a medição? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "0f98e349-e20c-4e3c-927f-7fc08ab22b69", content: "F) Régua.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "27880442-ad5a-42f2-ad92-063b7885142b", content: "G) Trena.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "e031ac12-83d4-4358-a1c5-a210fa15f632", content: "H) Calibre de solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "b665a7ec-a49e-418c-9a3d-444dc354d1ba", content: "I) Goniômetro.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "03765bb5-b7ef-4556-aba3-f214d6efb6b5", content: "J) Paquímetro.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "3db99de9-a681-4f99-9b67-4900618ecc8f",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 7",
        content: "Resolva a questão abaixo.",
        position: 33,
        activity: {
            id: "4f77e161-c710-4337-82f0-4a843d66af21",
            activity_type: "multiple_choice",
            statement: "Qual dos instrumentos de medida apresentados abaixo não é apropriado para fazer a leitura da altura do reforço de uma solda de topo? ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "000890c4-3d72-4509-a392-f0dafb340c71", content: "F) Paquímetro.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "d1b253b1-0228-4048-9492-79aa73491a08", content: "G) Régua esquadro.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "67daa661-d0b2-4d50-b9bf-d470e11e6640", content: "H) Micrômetro.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 3 },
            { id: "facae6db-cc8f-4a45-bb77-c1c0fefe2624", content: "I) Trena.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "8718d66d-3e84-42d6-8691-8b6c4955ecd9", content: "J) Gabarito de solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "4e0f69a2-13b5-45f0-8e6c-fd9a9c2fc48e",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 34,
        activity: {
            id: "5f3b659e-2bc5-4955-b390-dc9ffe985bce",
            activity_type: "multiple_choice",
            statement: "1 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "9bde8352-a761-470c-b96f-7fe4f8e55fde", content: "A) 20º 55` 54”", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "18788531-5068-4407-9f8c-8556318b0059", content: "B) 19º 55` 54”", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "d99199d1-17e5-458b-b9c0-eb1091c5b8d2", content: "C) 29º 54` 55”", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "3a166afb-b224-4e59-8401-a966cedd76de", content: "D) 19º 115` 114”", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "72077298-7461-4601-b07a-98df0f08cb5f", content: "E) 09º 55` 54”", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "22ba8295-ff60-400a-a671-c7f27d27ece1",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 33",
        content: "Resolva a questão abaixo.",
        position: 35,
        activity: {
            id: "b41e244e-36e1-4353-a33d-8877f96cd45a",
            activity_type: "multiple_choice",
            statement: "25` 50” e 56` 54” ? ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "5b73f59c-4495-4b38-8bd4-8352e265c906", content: "A) 90º 19`", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "34c0d823-d32e-4c25-8b09-4e8c27e0dc31", content: "B) 34º 22` 44”", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "a1eb8dbc-12fc-420b-8376-69bb0a7ce1ff", content: "C) 90º 44` 54”", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "27df1f6a-840b-4352-a5a0-5f784b81d959", content: "D) 33º 82` 104”", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "eb484728-6799-4989-acc9-993cc87b95ec", content: "E) 40º 22` 44”", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "bd64f10c-9a03-422b-acd5-bbe13cb9d967",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 12",
        content: "Resolva a questão abaixo.",
        position: 36,
        activity: {
            id: "6d05279d-ea90-4f36-b735-5128d435a938",
            activity_type: "multiple_choice",
            statement: "Converta 0,222” (polegada) em milímetro, empregando a regra de multiplicação com algarismos significativos (arredondamento). Marque a alternativa correta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "eb5cbdad-e3df-47d5-abbc-8f582f18d417", content: "A) 5,6 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "ed878d14-b2ee-4c65-975c-0d69df1a2d2e", content: "B) 5,64 mm", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "14229a6a-58ed-4e8a-b3e1-fd16ce717457", content: "C) 5, 639 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "774f072c-ea62-42cd-a29b-a0eec8f501bd", content: "D) 5, 6388 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "8535a7ce-bbde-441f-a1e2-ffcd9579d5ae", content: "E) 6,0 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "ee07375b-3061-4dcb-97c4-ff41cf4c265f",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 13",
        content: "Resolva a questão abaixo.",
        position: 37,
        activity: {
            id: "4382f68f-70b3-4c26-9e87-00a7ea44446a",
            activity_type: "multiple_choice",
            statement: "As alternativas apresentadas a seguir são operações feitas com algarismos significativos. Marque a operação incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "07377b76-a172-482f-8d19-ac72af95bb8d", content: "A) 55,00 + 10,1111 = 65,11", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "1ce0e775-0d89-4b71-8cfe-371f299c1a9d", content: "B) 7,333 – 0,90 = 6,47", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "c75d7fc9-2b95-4493-90bb-d009ca78569f", content: "C) 100,00 / 50 = 2,0", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "eb3df90b-57af-4dd5-8132-d5aa2e48cdcb", content: "D) 22,0 / 2 = 11", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "6a5a1cb8-6dfd-4ba8-899f-296d47099591", content: "E) 2,50 x 1,5 = 3,75", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "323cf1e7-aaa9-4544-8fe3-1343323773dd",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 38,
        activity: {
            id: "5bee3a82-84cb-42f7-bd07-06fa4555c8ac",
            activity_type: "multiple_choice",
            statement: "2 identifique o lápis térmico a ser utilizado na qualificação, visto que o lápis relativo à temperatura de 150ºC foi perdido? ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "db296119-a19f-479d-b527-b7336188c254", content: "A) 145ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "4fef639c-d903-437a-8be3-1f0bda4434d1", content: "B) 180ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "11c50566-2cdb-4ea6-a354-556e7adfe3b6", content: "C) 160ºC", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "f0657910-6e91-423e-9bd5-d3fe541270d6", content: "D) 170ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "011f0a15-941e-46d2-9f45-413ba96f5508", content: "E) 140ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "466d48ae-72b9-4968-a0de-b3a60a592567",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 15",
        content: "Resolva a questão abaixo.",
        position: 39,
        activity: {
            id: "62f3a25b-c7f6-4ae6-90bf-00fc209da506",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas apresentadas encontra-se incorreta, quando se faz uma relação entre a medida que se quer obter a sua unidade correspondente? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "8f3db0c0-d95c-46af-9656-cecac95871e1", content: "A) Intensidade de corrente elétrica – Ampère (A)", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "e0a16654-a064-4fd5-b613-8c2f2b702166", content: "B) Lápis térmico – Fahrenheit (ºF)", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "84b9a0d1-bfa7-45c2-bfa8-5fcb18cf8a0d", content: "C) Tensão - Volt (V)", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "45f53a9d-dc52-4fc4-a901-aa59a34e066b", content: "D) Ângulo - Grau (º)", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "c9f93ea3-1a59-414e-86e2-184940cac5ba", content: "E) Pressão do gás - kgf/ ºC2", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "93acb8f0-dfdf-483c-8194-2cb70ebdd304",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 16",
        content: "Resolva a questão abaixo.",
        position: 40,
        activity: {
            id: "90bf5f83-c1f2-4aa6-b03e-4afcc9bd7176",
            activity_type: "multiple_choice",
            statement: "Qual dos instrumentos listados a seguir não apresenta valores obtidos diretamente de um mostrador analógico ou digital? ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "a87cb114-7be4-4c4f-837e-da91726bcade", content: "A) Manômetro", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "e8d2d7c8-af3d-424c-8df5-6e048bb9b57a", content: "B) Pirômetro de contato", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "12daa57b-baad-41a6-a1b7-9162e6c5e2be", content: "C) Amperímetro", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "8d7781cd-3edb-4025-8a54-3a28a327c8e2", content: "D) Lápis térmico", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "f252ab5b-0e44-4c1e-a5df-3bab295e255f", content: "E) Trena a laser", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "2f4b365d-6db0-4185-a143-e80f8a04622c",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 17",
        content: "Resolva a questão abaixo.",
        position: 41,
        activity: {
            id: "935ce3c7-9d02-4eed-96f0-df4a3cb8764f",
            activity_type: "multiple_choice",
            statement: "Em relação ao instrumento “Pirômetro de Contato”, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "f0acb7eb-54f3-4ccd-bf64-194deaaa12b4", content: "A) Como vantagem: possui dispositivo de segurança que impede que o instrumento se danifique, caso a temperatura a ser lida seja muito superior à temperatura máxima do aparelho.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "f96a3ab8-4913-41f7-92bc-ef34e40eb2ab", content: "B) Como vantagem: boa precisão na leitura da temperatura.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "c7708896-7cac-4285-b183-5997e0847d1e", content: "C) Como desvantagem: necessidade de ajustar instrumento toda vez que houver mudança na posição de trabalho.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "d46b648b-19d8-47a9-9c09-f420ab89c095", content: "D) Como vantagem: não oferece risco de contaminação na região do equipamento, onde será feita a leitura da temperatura.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "77ef0447-58a0-4aaf-8e7c-10ed36a89b66", content: "E) Como desvantagem, apresenta um custo elevado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "d185bc23-1065-450c-aa06-5a9a18d8615f",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 18",
        content: "Resolva a questão abaixo.",
        position: 42,
        activity: {
            id: "d6fb6fa9-3c10-4c3c-a3ee-9e25841eea8c",
            activity_type: "multiple_choice",
            statement: "Calcule as taxas de aquecimento e de resfriamento baseadas na curva encontrada no registrador de temperatura apresentado a seguir. \n\n<img src=\"/images/questions/page213_img1.jpeg\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "b4022b27-fddb-421b-a3da-3521c64f3145", content: "A) Taxa de Aquecimento: 600ºC/h; Taxa de Resfriamento: 300ºC/h", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "29151fc1-e0ad-41c0-b748-9ae1b8f5e395", content: "B) Taxa de Aquecimento: 400ºC/h; Taxa de Resfriamento: 400ºC/h", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "5ec8ab11-82be-4166-8a54-622c101d50f8", content: "C) Taxa de Aquecimento: 300ºC/h; Taxa de Resfriamento: 400ºC/h", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "8c932db3-4d9c-4f43-9e29-e311b9a014bd", content: "D) Taxa de Aquecimento: 400ºC/h; Taxa de Resfriamento: 300ºC/h", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "a947db44-212d-4787-863e-43a901db9e17", content: "E) Taxa de Aquecimento: 300ºC/h; Taxa de Resfriamento: 300ºC/h", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "df69ba93-34a6-4dca-9db3-a5e6787232ce",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 19",
        content: "Resolva a questão abaixo.",
        position: 43,
        activity: {
            id: "6462acf2-4d29-4578-b6db-b65d63a0b1b7",
            activity_type: "multiple_choice",
            statement: "Em relação ao instrumento “Registrador de Temperatura”, identifique a alternativa incorreta. \n\n<img src=\"/images/questions/page213_img1.jpeg\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "0fe25ee0-ebed-467f-8e66-48beb2525394", content: "A) O Registrador deve ser periodicamente calibrado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "291c562e-fc66-40d2-ac39-44664fa2da79", content: "B) Uma desvantagem deste instrumento é a impossibilidade do registro das condições térmicas a que foi submetida ao equipamento.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "a54f8679-2f5c-4380-af04-8aedd8ef05ac", content: "C) É um instrumento bastante frágil.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "ee33ea9d-ebf3-4bea-bf35-d13ac3a14c20", content: "D) Permite o controle e registro de mais de um termopar simultaneamente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "f6bea21c-0194-4605-8ef7-93467f41103c", content: "E) O Registrador apresenta uma grande desvantagem em função do seu alto preço.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "364fa129-a787-4fb3-aa48-14a8b7893045",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 44,
        activity: {
            id: "f5133614-b06c-4204-a388-ac452a1de8d3",
            activity_type: "multiple_choice",
            statement: "5 \n\n<img src=\"/images/questions/page215_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "26829d2e-7cae-4147-ab75-779e8f465c56", content: "C) É um instrumento de baixíssima precisão.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 1 },
            { id: "eceb689a-ae73-4501-8fe2-0ced034330a2", content: "D) Dependendo do tipo de metal de base, pode haver risco de contaminação na região que será medida a temperatura.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "0d6280b6-fff4-4e24-bb76-a9924087eb98", content: "E) Não se pode usar este instrumento, se a superfície do equipamento estiver coberta por uma camada isolante.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 3 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "1c2259d7-02be-4b24-8006-02ebd0d49b7d",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 22",
        content: "Resolva a questão abaixo.",
        position: 45,
        activity: {
            id: "50bac7f1-e858-4277-a1b6-58ba91a768f1",
            activity_type: "multiple_choice",
            statement: "No caso da soldagem de uma junta de topo, for observado o aparecimento de um embicamento após o término da tarefa, qual dos instrumentos apresentados a seguir deveria ser utilizado para quantificar o problema? \n\n<img src=\"/images/questions/page215_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "a2bb8fea-7ec0-432a-a7dd-96a17601a990", content: "A) Régua-esquadro", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "b478907c-e266-4683-949e-a6b30a0c8025", content: "B) Transferidor", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "b33ae1dc-75ad-4b6e-ac86-1f892ddc484c", content: "C) Paquímetro", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "9eefd197-7cb2-4b30-bf9b-c6bb1e34ffd1", content: "D) Goniômetro", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "ce362f6f-9e1e-4183-ba35-8f291d211da3", content: "E) Trena", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "d3d24a9a-063d-4a17-897e-845faa5274fa",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 23",
        content: "Resolva a questão abaixo.",
        position: 46,
        activity: {
            id: "107cdd98-b5ac-439c-b089-424dec731430",
            activity_type: "multiple_choice",
            statement: "Qual o valor que o paquímetro está medindo? . \n\n<img src=\"/images/questions/page215_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "040f1d22-5b55-4454-8981-82bb607a7ba3", content: "A) 25,85 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "64205c75-5d2e-4d6c-83cd-904902ff020b", content: "B) 24,85 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "ae58447f-e980-4601-962a-3bddd280469a", content: "C) 2,44 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "83aa9f50-2388-420b-a94d-2cd4f022843a", content: "D) 25,40 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "d45ad6b9-9264-4ac6-af12-62354386c3cf", content: "E) 24,40 mm.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "f4db4a58-84ee-4fa5-b599-bb08050c4526",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 24",
        content: "Resolva a questão abaixo.",
        position: 47,
        activity: {
            id: "9352dfeb-cfe6-4877-a453-6cc3a9215358",
            activity_type: "multiple_choice",
            statement: "Qual o valor que o paquímetro está medindo? . \n\n<img src=\"/images/questions/page216_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page216_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "39c7ff8c-c7fd-4de5-ab72-c39956a67edb", content: "A) 20,975 mm", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "00d625fb-ef1b-411f-8334-9ddecba104fc", content: "B) 20,950 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "51b94136-cb49-45ad-880e-5401a66ca287", content: "C) 20,550 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "b2917dd0-5ab5-44a1-9ad7-4fb0b48c84b5", content: "D) 21,150 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "730284cc-b4a3-4484-a59c-cb0c05df6175", content: "E) 20,795 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "7211a36b-745a-42e0-a050-a2c958f8d9ce",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 26",
        content: "Resolva a questão abaixo.",
        position: 48,
        activity: {
            id: "da22005b-5d5c-4988-aa51-30c0a2f2aa1a",
            activity_type: "multiple_choice",
            statement: "Na soldagem de uma junta de topo, foi observada na EPS a necessidade de realizar o controle de temperatura interpasse. Ficou estabelecida a temperatura máxima igual a 250ºC. Das alternativas apresentadas a seguir, identifique o lápis térmico que deverá ser utilizado para controlar esta temperatura, sabendo-se que aquele relativo à temperatura de 250ºC não foi encontrado? \n\n<img src=\"/images/questions/page217_img1.jpeg\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "cefd1eb2-4b09-4f68-9182-d16e88eb3c5d", content: "A) 230ºC", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "84a8d6bd-9459-42dc-acd9-e224f8c99b91", content: "B) 260ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "693c2c31-8861-40e4-985b-d0d8de71596b", content: "C) 270ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "96e7fd3c-5c42-4a95-957c-bfee528c977b", content: "D) 225ºC", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "713ea6c6-03c0-4f38-96ea-d75b51716027", content: "E) 200ºC .", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "87a015e9-5b24-41af-ba9b-9a2558b9c743",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 27",
        content: "Resolva a questão abaixo.",
        position: 49,
        activity: {
            id: "f7f509f5-2762-4a50-b5ec-bdd37bc055d6",
            activity_type: "multiple_choice",
            statement: "Calcule as taxas de aquecimento e de resfriamento baseadas na curva encontrada no registrador de temperatura apresentado a seguir. \n\n<img src=\"/images/questions/page217_img1.jpeg\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "87a0cf74-3826-416d-b8ee-4304d9d8333d", content: "A) Taxa de Aquecimento: 450ºC/h; Taxa de Resfriamento: 450ºC/h", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "86671a8b-3e35-4552-973a-6042a4a7e865", content: "B) Taxa de Aquecimento: 300ºC/h; Taxa de Resfriamento: 450ºC/h", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "624ed39b-f7df-4e49-9946-95609cbf7b0a", content: "C) Taxa de Aquecimento: 300ºC/h; Taxa de Resfriamento: 900ºC/h", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "01793b5d-0996-43d7-b74c-08919bbd37ac", content: "D) Taxa de Aquecimento: 400ºC/h; Taxa de Resfriamento: 450ºC/h", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "96794042-ff01-481a-9a74-2ed0b392b321", content: "E) Taxa de Aquecimento: 900ºC/h; Taxa de Resfriamento: 450ºC/h", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "b9ea2112-1ec6-4bc3-b747-66038e117ef6",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 28",
        content: "Resolva a questão abaixo.",
        position: 50,
        activity: {
            id: "b03ea372-48be-4f49-a894-16ce42975d76",
            activity_type: "multiple_choice",
            statement: "Dentre as alternativas abaixo, assinale a afirmativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "13daae61-4c0c-469c-be1e-8bbf36ea6039", content: "A) Os gabaritos fornecem bons resultados, desde que fabricados corretamente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "397ed838-d149-49d5-a1b1-7d6d15d96fe9", content: "B) Os gabaritos devem ser fabricados com uma boa precisão.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "ead4f2e1-bd2f-41cd-86d2-678cb5aa33dc", content: "C) Os gabaritos devem ser utilizados em verificações repetitivas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "dfdff33f-9012-48eb-8411-6f3aad4dbf93", content: "D) Os gabaritos devem apresentar uma graduação gravada em seu corpo, de forma precisa e legível.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "b0829eb7-da74-473f-a39c-c21faf140b0b", content: "E) Os gabaritos são dispositivos que permitem uma rápida verificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "be6ef0ac-c720-4e84-9d93-e773569f22ae",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 29",
        content: "Resolva a questão abaixo.",
        position: 51,
        activity: {
            id: "d27d7d21-810b-4ecd-b2e6-651c1f849484",
            activity_type: "multiple_choice",
            statement: "Das descontinuidades apresentadas abaixo, assinale aquela que normalmente é observada quando do uso de gabaritos. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "bc7a43f0-d49c-46b7-99d4-c792c0edbfb8", content: "A) Ângulo excessivo de reforço.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "eaa8576b-c092-4cba-ab0e-839fe573b7b7", content: "B) Reforço excessivo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "c61d795b-eb62-45f5-88eb-e6aca9313082", content: "C) Desalinhamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "5e63d8f5-b803-4116-b85b-319a7f8302ae", content: "D) Deformação angular.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "25c45f6f-753d-4746-9d5b-b35a12b40ec8", content: "E) Embicamento.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "f2f1612c-3973-4c1e-84fe-b668eb995f81",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 30",
        content: "Resolva a questão abaixo.",
        position: 52,
        activity: {
            id: "e3fa4531-a913-4ab3-9298-07fd86e4c031",
            activity_type: "multiple_choice",
            statement: "Em relação ao emprego de gabaritos na fabricação de equipamentos metálicos, identifique a afirmativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "8c9769a6-7169-4735-8e31-c7f4ed32aa1d", content: "A) Não necessitam de atenção especial, quando da existência de reforços de solda existentes na região do equipamento que será inspecionada.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "92413f55-8726-45a6-9ef3-c4e00ba69fce", content: "B) Servem também para verificar a ovalização de tubos soldados.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "b3898548-e0ea-4e5b-a207-c00618d1a06c", content: "C) Devem ser fabricados de um material leve para que sejam fáceis de ser manuseados.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "d5ed467d-9220-43eb-8f3b-d4992969e6a3", content: "D) São normalmente usados quando os instrumentos convencionais não atendem às necessidades.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "2293f88d-8571-470f-9602-2d31a222202f", content: "E) Devem ser posicionados perpendicularmente em relação às chapas que serão analisadas, no momento da checagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "5243959e-b883-4a20-b738-74f9b1e6f59a",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 31",
        content: "Resolva a questão abaixo.",
        position: 53,
        activity: {
            id: "b1416bc5-f6bb-4b2a-a077-3837d8b41006",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas abaixo não pode ser medida por um Calibre com Finalidade Múltipla (ver figuras)? \n\n<img src=\"/images/questions/page219_img1.jpeg\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page219_img2.jpeg\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "d0c6b27f-627b-432e-b507-1564a5115547", content: "A) Perna de solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "5b963db0-c28d-4f01-b645-3894777e62b7", content: "B) Ângulo do embicamento.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "06e5c608-44ea-458f-93dc-737642344225", content: "C) Ângulo de bisel.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "4488f06b-cb6e-4197-8d81-fdbf62e994ce", content: "D) Abertura da raiz.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "2d2b7c5c-189a-479e-a0a8-fa06f8ba404c", content: "E) Garganta de solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "e0e7aed6-6c09-4d7b-8e72-84694c6d5699",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 32",
        content: "Resolva a questão abaixo.",
        position: 54,
        activity: {
            id: "5b80e2ea-3b65-4cee-b579-508c4c6d02ab",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas abaixo não pode ser medida por um Calibre com Finalidade Múltipla (ver figuras)? \n\n<img src=\"/images/questions/page219_img1.jpeg\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page219_img2.jpeg\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "6bff371a-8a2f-4f3d-95ac-f8ea8135e102", content: "A) Altura do reforço da solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "87fa848d-9c73-4c1e-a59d-27ddb1f11ecf", content: "B) Altura da face da raiz (anterior à montagem das peças).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "f74fff9a-d993-4115-afcc-171e9badc2fd", content: "C) Espessura da chapa ou do tubo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "6296fdbf-bb7b-45e2-b541-66ef861fdae2", content: "D) Deformação angular.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "1c09577d-9bb5-4224-970c-bd0bb79d80c4", content: "E) Desalinhamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "6ed078b2-7865-40e2-88d8-119ea212fb40",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 33",
        content: "Resolva a questão abaixo.",
        position: 55,
        activity: {
            id: "dae4189f-78a3-45ef-a539-5c1ee82b33bb",
            activity_type: "multiple_choice",
            statement: "Quando se utiliza um paquímetro, várias são as preocupações que o usuário deve ter para que a leitura da medida seja precisa e confiável. Das alternativas apresentadas a seguir, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "0b6ea460-9415-4071-9625-169124802699", content: "A) Guardar o paquímetro sempre sem folga entre os bicos.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "8176b172-dbb8-48f7-aca1-894845566063", content: "B) Manter o paquímetro sempre limpo e acondicionado em estojos próprios.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "8ecc9d8a-ff43-4d91-9b6b-bc1b032fb1e5", content: "C) Fazer a leitura da medida com o paquímetro aplicado à peça.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "9d1b37c6-d38a-4869-9127-742f8695c67e", content: "D) Antes do uso, com o paquímetro totalmente fechado, verificar se não há folga entre os seus encostos ou garras.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "8c7e30e1-95f1-4919-9950-47927e09467b", content: "E) Não pressionar demasiadamente os encostos ou garras do paquímetro contra a superfície da peça que será medida.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "82cac8a1-e251-4ed1-a20d-8f2fa83d0286",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 34",
        content: "Resolva a questão abaixo.",
        position: 56,
        activity: {
            id: "69bd006f-465a-42f0-8ca3-b91974c8c671",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas a seguir não está relacionada com as características do Pirômetro de Contato? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "4b951986-b696-452d-9648-b2a74711f407", content: "A) Instrumento que pode ser analógico ou digital.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "ab37c88a-1d23-48bd-8cf7-51a9c5a02932", content: "B) Registra temperaturas entre -50ºC e 1.400ºC.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "f5b58b33-3682-4221-9c5f-d3947f9f9afb", content: "C) Instrumento destinado a medir temperaturas de superfícies.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "c393c4fb-3b17-4f80-af0e-efc022e2cec7", content: "D) Instrumento que, quando utilizados em soldagem, podem verificar temperaturas de pré-aquecimento, interpasse e de pós-aquecimento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "90a2d06e-d289-4eb2-8d72-e472165e221f", content: "E) Operam mediante contato físico, podendo também medir temperaturas à distância.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "19050907-9ca8-4fd5-b2e0-4567e0821cc6",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 35",
        content: "Resolva a questão abaixo.",
        position: 57,
        activity: {
            id: "70ef3d4f-35a9-42ff-a3d7-5e9d399afce4",
            activity_type: "multiple_choice",
            statement: "Quanto ao uso de instrumentos que medem temperaturas na soldagem (Pirômetro de contato e Lápis térmico), marque a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "431b9020-c680-41dd-b7e7-b19ea9694dcb", content: "A) O pirômetro de contato serve para aferir a temperatura de qualquer material metálico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "42a01741-ca87-4320-a7f8-580af458a76e", content: "B) Anteriormente ao uso do pirômetro de contato ou do lápis térmico, é imprescindível verificar a unidade de temperatura (º C ou ºF) dos instrumentos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "6010e3bb-4b0a-4afe-859e-1ca1d4f8315f", content: "C) A contaminação do material de base é uma das maiores desvantagens ao se utilizar o lápis térmico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "598291cc-9fbd-4a3b-bcf5-76829d343bbc", content: "D) Ambos os instrumentos têm a mesma finalidade quando relacionados à soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "8d13a9dc-98d6-4b99-8fca-2b583d73f8bd", content: "E) É desnecessária a verificação da faixa de temperatura de utilização do sensor de um pirômetro de contato anteriormente ao seu uso.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["cc082136-c886-4a60-b28c-568ac20a562e"].push({
        id: "0b2be0b9-80d0-4fb3-a77a-7fc490a89ffd",
        lesson_id: "cc082136-c886-4a60-b28c-568ac20a562e",
        step_type: "activity",
        title: "Questão 36",
        content: "Resolva a questão abaixo.",
        position: 58,
        activity: {
            id: "543e6d61-ba76-44ac-b9d3-8b24e666eb77",
            activity_type: "multiple_choice",
            statement: "Quanto às características dos Pirômetros de contato, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "e2a6344f-5084-432c-8355-4ff7a2020159", content: "A) Os pirômetros de contato que apresentam indicadores de ponteiros podem ser usados em qualquer posição sem que haja a necessidade de fazer qualquer tipo de ajuste.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "20b6e90d-519d-46c9-ae97-01e4ff75265c", content: "B) Instrumento caro, devendo restringir a sua utilização a situações onde métodos mais baratos são desaconselháveis.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "829ccf80-0405-46a3-bece-131a2e9888b8", content: "C) Por ser eletrônico, são instrumentos delicados, principalmente aqueles com indicação por ponteiro.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "189c5b58-7e15-486e-827d-ca6cbbf0f096", content: "D) Ausência do risco de contaminação da peça a ser soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "f91285ce-69ca-44d3-bb6d-84a8d2059c11", content: "E) Instrumento que apresenta uma precisão muito boa ao fim que se destina.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_MODULES.push({
        id: "2785698f-3260-4d70-aba7-b36dc948a33f",
        course_id: "c5555555-5555-5555-5555-555555555555",
        title: "Proteção da Soldagem",
        description: "Questões e atividades sobre Proteção da Soldagem",
        position: 7,
        is_published: true
    });

    STATIC_LESSONS.push({
        id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        module_id: "2785698f-3260-4d70-aba7-b36dc948a33f",
        title: "Prática - Proteção da Soldagem",
        description: "Exercícios do banco.",
        estimated_minutes: 60,
        position: 1,
        lesson_type: "interactive",
        is_published: true
    });
    
    if (!STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"]) {
        STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"] = [];
    }

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "258d8965-a054-4b5b-b329-52ad3ce09dbd",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 1,
        activity: {
            id: "1ffd1636-d762-4deb-b074-02c49d7b69dc",
            activity_type: "multiple_choice",
            statement: "Em relação à Proteção na Soldagem, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "569ff524-f29f-4fea-ae2b-f106c5864d56", content: "A) Os equipamentos de proteção individual (EPI) são projetados com a única finalidade de evitar lesões ou doenças que possam ocorrer nas operações de solda.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "18f32ea1-01ab-453a-ae42-7a4cb3af4e83", content: "B) Os gases empregados nas operações de soldagem, bem como os fumos, podem provocar danos à saúde do soldador.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "3d70efe3-855c-43dc-b919-8e3c59ec6f13", content: "C) A radiação ultravioleta, muito intensa nos processos GTAW e GMAW é capaz de decompor substâncias desengraxantes usadas na limpeza das peças, além de produzir ozônios e óxidos nítricos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "7487d602-6bf9-4361-879f-95d9cd6fa44e", content: "D) As passagens e vias de fuga, localizadas na área de trabalho, devem ser mantidas totalmente livres e desimpedidas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "903d4b63-7a9f-4122-993a-d03c1a32bc4a", content: "E) O soldador nunca deve enrolar o cabo de soldagem em volta de partes do seu corpo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "c0e74fce-340c-42de-9772-5762564f8b87",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 2,
        activity: {
            id: "898e77a5-8b18-4cdc-b468-647663a15a43",
            activity_type: "multiple_choice",
            statement: "Em relação à Proteção na Soldagem, identifique a única alternativa abaixo que não é verdadeiramente um equipamento de proteção individual (EPI). ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "18f4329a-b68f-419f-8df3-5c3fc96b3c5e", content: "F) Botas (ou botinas)", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "b5875b8e-1f4e-47f8-932b-594b1f62b945", content: "G) Avental", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "db233b0d-16b7-499f-9608-5cd89fe2cedd", content: "H) Luva", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "0815b5ee-6b49-4657-bbb2-c64e25aa0e1d", content: "I) Capuz ou gorro para a cabeça", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "5e0bbb4a-9e21-4bbb-b3af-2cacfe357ed9", content: "J) Meia (anti-térmica)", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "752a27cc-2820-4fe7-89a1-62845bfe221f",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 3",
        content: "Resolva a questão abaixo.",
        position: 3,
        activity: {
            id: "09d5e443-2d7d-4dfd-a942-c257e031334c",
            activity_type: "multiple_choice",
            statement: "Qual dos consumíveis abaixo, quando derretidos, gera uma grande quantidade de fumaça (fumo)?. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "0a167563-bf16-4ff5-841c-ea9a0b88d1c0", content: "A) Arame tubular com proteção gasosa (proteção externa)", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "44cf0504-b8ae-437d-b62b-6866bc0b43aa", content: "B) Eletrodo revestido", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "24491a84-dcff-451d-ad98-c1a84fd87625", content: "C) Arame sólido empregado no processo GMAW", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "a55741ec-f77f-429f-aba7-17ae3ef18c9d", content: "D) Arame tubular auto-protegido", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "c17d0b54-b535-4eef-9d76-df76da782e60", content: "E) Arame sólido empregado no processo SAW", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "6b8ec9e5-cf70-4827-baf3-0348bca5d144",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 4,
        activity: {
            id: "7cdea6c6-a2f8-47f3-b697-e18471f6a7e6",
            activity_type: "multiple_choice",
            statement: "4 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "725f4043-d90a-4ab3-a17f-fec82d36973d", content: "K) Caso uma luva, ou outro equipamento de proteção individual que fique em contato direto com a pele, se rasgue por qualquer motivo, o profissional deverá substituí-la na maior brevidade possível.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "44f55329-98c8-41fa-ad20-424d940ad648", content: "L) Todos os equipamentos de proteção individual (EPIs) são de uso pessoal e intransferível. Se um determinado equipamento não for mais usado por um soldador, aquele deverá ser totalmente descartado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "1e9d77ea-79e7-47b6-8e39-4c696930db6a", content: "M) Roupas pessoais como cuecas e meias não podem ser feitas de nylon ou poliéster.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "b97c2098-9808-4d01-8b04-79a3cf975593", content: "N) A soldagem de metais é uma das mais importantes e usadas técnica utilizada na indústria que, por sua vez, expõe demasiadamente seus profissionais a riscos constantes.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "2f0fee91-19e2-48ba-9178-5de10c44602b", content: "O) Os riscos, aos quais os soldadores são expostos diariamente, podem se apresentar isoladamente ou em conjunto, afetando principalmente a saúde destes profissionais.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "34d40e37-0d3b-4bd0-b866-e0362ebf919d",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 5",
        content: "Resolva a questão abaixo.",
        position: 5,
        activity: {
            id: "329729f7-5cf6-4231-8e76-14d9ae3c0254",
            activity_type: "multiple_choice",
            statement: "Qual a principal função das “Lentes Filtrantes” (ou vidros protetores), quando do emprego de processos de soldagem a arco elétrico? ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "43b9990a-0178-4bc0-aeee-b4a1a8a11061", content: "A) Absorver apenas os raios infravermelhos gerados pelo arco elétrico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "f3a43f20-cca3-4243-b0cb-227fccd3b72f", content: "B) Absorver apenas os raios ultravioletas gerados pelo arco elétrico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "d4c514d2-b403-414f-8e50-e5fc08ccd031", content: "C) Absorver os raios infravermelhos e ultravioletas gerados pelo arco elétrico.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "f7b16b2d-20fa-4842-801d-efc77f115901", content: "D) Absorver os raios solares e invisíveis gerados pelo arco elétrico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "f46d84fa-9622-4ecb-abeb-aa911a423791", content: "E) Absorver principalmente os raios invisíveis gerados pelo arco elétrico, visto a impossibilidade de percebê-lo a olho nu.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "70fe2a1f-14de-48f5-85fa-48a2dd72508f",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 6",
        content: "Resolva a questão abaixo.",
        position: 6,
        activity: {
            id: "79a66cbf-d30d-4e32-9704-2266fc730fee",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas apresentadas a seguir não é uma característica das “Lentes de Cobertura”? ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "01f1feaf-f0a2-471c-bc28-514dd27c4085", content: "K) Protegem as lentes filtrantes, assim como os olhos do soldador, contra salpicos gerados durante a soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "3f0a06d9-5d72-4af5-9f76-63dc7d0d43b0", content: "L) Por questão de segurança, elas devem ser resistentes ao impacto.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "be99a15b-3ee1-43f0-9d91-047726e5a67e", content: "M) Precisam ser transparentes.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "6ee7f14a-893f-4063-9470-a1f66789b095", content: "N) Podem ser feitas de vidro.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "c9f5c3e8-8604-4211-8ebc-56747e754871", content: "O) Podem ser feitas de plástico auto-extinguível.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "309e8b87-1259-4c97-8cbe-d0acf64d85c6",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 7",
        content: "Resolva a questão abaixo.",
        position: 7,
        activity: {
            id: "7c7e1749-b0da-4dc2-bc79-5387e2b098b1",
            activity_type: "multiple_choice",
            statement: "Analisando o processo de soldagem oxi-gás, identifique a alternativa que não representa um risco ao soldador. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "7d47f55e-79dc-4a4a-8b4d-199115b0a056", content: "K) Ruído", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "922bc709-549b-4254-a310-768f0c469f2f", content: "L) Gases", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "80aabfd4-413c-428d-96ec-c64c4883b795", content: "M) Fumos", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "bd37b9e2-73dc-4c90-b049-49fab6c6e74e", content: "N) Queimadura", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "250b29bf-b90a-4489-8902-1c0a60950ece", content: "O) Choque elétrico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "efbb1e03-b3fb-4c5c-8837-61020d1fac8c",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 8",
        content: "Resolva a questão abaixo.",
        position: 8,
        activity: {
            id: "3c308f10-93da-4679-8e33-7ad1fb09881a",
            activity_type: "multiple_choice",
            statement: "Analisando o “processo de soldagem manual a arco com eletrodo revestido” e os cuidados que devem ser tomados ao usá-lo, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "ef9f6c1c-3b30-41fc-9f08-834c5a454468", content: "A) Tendo em vista que o porta-eletrodo é um equipamento de soldagem totalmente protegido contra choques elétricos, isto permite que, quando este equipamento de soldagem atingir altas temperaturas, o soldador mergulhe-o dentro de um recipiente (exemplo: balde) contendo água fria;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "cf38e7b4-91fb-4ee6-9539-60b23e7f0788", content: "B) Todos os equipamentos de soldagem relativos a este processo são adequados a operar em atmosferas contendo gases, poeira e raios provenientes da soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "0fbbbd4e-2f51-44b5-b339-b520ce66ab61", content: "C) Os cabos (cabo-terra e cabo que liga a fonte ao eletrodo) devem ter seus revestimentos sem falhas, pois isto pode resultar em uma má qualidade do isolamento e da condutividade elétrica.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "30598275-ab24-40ac-b2fe-d2a23fcd94b0", content: "D) Uma ventilação adequada é muito importante quando do uso deste processo, haja vista a geração de fumos e gases nocivos à saúde", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "6f30945f-4043-4801-88f4-915bc85fa8c4", content: "E) Todas as vezes que o soldador interromper o trabalho por um tempo apreciável, o mesmo deve desconectar o porta-eletrodo da fonte de energia.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "f88509fa-8ad9-497a-b1b5-f3a4ce67cddf",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 9,
        activity: {
            id: "cfd9974b-3b73-4543-9958-cc0d41183bcd",
            activity_type: "multiple_choice",
            statement: "6 ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "c6e31ff2-fbc9-4a1f-baa1-fc986f65884b", content: "C) O operador de soldagem deve usar máscara de proteção (com filtro número 10), devido aos lampejos e centelhas produzidos pelo arco durante a soldagem.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 1 },
            { id: "bbe0de12-95b0-47d8-a7d9-2feecc1635ea", content: "D) Assim como outros processos de soldagem, o fluxo pertencente ao processo a arco submerso também pode produzir gases nocivos à saúde quando fundido.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "7d8ddd5e-8c14-41ec-a3f4-74d5a88ce8c0", content: "E) O operador deve prestar atenção ao volume de fluxo que é depositado sobre o arco durante a soldagem. Uma diminuição acentuada do volume do fluxo pode permitir que o arco elétrico passe pela camada fina do fluxo e atinja os olhos do profissional.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 3 }
        ]
        }
    });

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "8ec6fd50-d456-4281-9754-502119609e64",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 10",
        content: "Resolva a questão abaixo.",
        position: 10,
        activity: {
            id: "d95d7fb2-3ec8-43b9-9b97-d5b5fef89ead",
            activity_type: "multiple_choice",
            statement: "Em relação ao processo de soldagem GTAW, identifique o maior risco à saúde que este processo pode causar ao soldador. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "84727ce0-8571-4603-af6a-7248b212e920", content: "A) Possibilidade de grande ingestão de fumaça produzida pelo gás (ou mistura gasosa) de proteção.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "5b7354ee-0e98-4a71-a9a0-d68e5f85c8d6", content: "B) Queimadura provocada por respingos (salpicos) produzidos durante a soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "81c077f7-dc18-4975-a912-3ae992c2fb9f", content: "C) Devido à produção de grande volume de escória, isto aumenta a possibilidade de ferimentos na região dos olhos do soldador no momento de sua remoção.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "1cb52a14-4892-49c0-8f9a-022394841978", content: "D) Queimadura da pele provocada pela grande quantidade de raio ultravioleta produzido durante a soldagem.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "69f6250b-77f4-43ef-9912-1d878df5b921", content: "E) Possibilidade de desmaios temporários, quando o trabalho é executado em recinto fechado, devido ao calor gerado pelas altas temperaturas do arco elétrico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "37004d49-27ed-4645-9de1-ba9586fc303f",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 11,
        activity: {
            id: "388224b0-9a55-4148-aadc-9eadd0ba27c3",
            activity_type: "multiple_choice",
            statement: "7 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "a77a8766-3526-4aa3-8c1c-9098ab0850ee", content: "D) Os cilindros feitos de paredes duplas, destinados a armazenar gases liquefeitos, devem ser transportados e manuseados na posição vertical.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "e28f053a-6bd6-4b04-a9a6-cc92a9a42b19", content: "E) Os cilindros de acetileno devem sempre ser usados na posição vertical.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "6a7e3d3a-ed6d-444d-8020-4026f5ffa0b4",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 12",
        content: "Resolva a questão abaixo.",
        position: 12,
        activity: {
            id: "9271789e-07b1-46ec-a140-3db5982ae9ed",
            activity_type: "multiple_choice",
            statement: "Quanto às características de um ambiente de soldagem, no que diz respeito à proteção dos soldadores ou operadores de soldagem, qual das alternativas a seguir está incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "4e94a453-a691-4e81-8b76-35a6f91ded1b", content: "A) O piso da fábrica deve ser de concreto antiderrapante ou com revestimento à prova de fogo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "402f15e8-15a4-4e17-9b09-85eee4ce3af2", content: "B) O uso da iluminação natural ou artificial deve incidir sobre a área de trabalho vinda do alto e por trás dos profissionais, reduzindo a possibilidade de ofuscamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "8d5b8c14-4c44-409a-b290-2babd1720d7c", content: "C) Para as pessoas que circulam por um determinado setor da fábrica e não serem atingidas pelos raios do arco elétrico, fagulhas ou centelhas, é muito importante a instalação de anteparos feitos de madeira ou lona, em forma de biombo ou cortina, em lugares estratégicos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "e73ea509-218f-48f5-843f-5aabb3602ace", content: "D) As operações de soldagem, sempre que possível, devem ser realizadas em ambiente apropriado, projetado para oferecer a máxima condição de segurança.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "2214a385-7598-49f6-93b1-ff625a24f638", content: "E) A pintura das paredes é um item de pouco ou nenhuma importância em uma fábrica. Este detalhe não é relevante, quanto à sua capacidade de pôr em perigo os profissionais que circulam pela fábrica.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "d73ef64e-4a7c-4b88-a6a9-64cc53a720fa",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 14",
        content: "Resolva a questão abaixo.",
        position: 13,
        activity: {
            id: "2ef672e1-6cb1-4084-9f11-11f649c50088",
            activity_type: "multiple_choice",
            statement: "No que diz respeito às “Lentes Filtrantes”, marque a alternativa correta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "103ab0b6-c122-4d61-815e-440da350cfa1", content: "A) O número de identificação (padronizado) estabelecido para as lentes filtrantes é tanto maior, quanto maior for a proteção conferida pelas mesmas.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "bf42383c-498f-4e3b-b0c2-b1585fc75b87", content: "B) Enquanto o processo manual com eletrodo revestido exige o uso de lentes filtrantes com numeração entre 4 e 6, o processo oxi-acetilênico estabelece faixa de 10 a 14.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "dbc03b1f-e56e-40db-b83c-0d7063d0fc42", content: "C) O uso de lente filtrante não é obrigatório, quando da operação de corte de metais pelo processo oxi-gás.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "495acf64-a23f-44c6-9c09-84d34c805f94", content: "D) É totalmente recomendável o uso de lentes filtrantes mais escuros do que o estabelecido pelo código interno de segurança, haja vista que este procedimento protege sobremaneira a os olhos do profissional.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "66ccbd7c-1f17-4bca-abe9-809acafe4808", content: "E) Lentes filtrantes com numeração menor do que aquela que deveria ser usada, conforme a recomendação do fabricante, permitem uma melhor visualização da região que está sendo soldada, diminuindo ou evitando a produção de descontinuidades na junta soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["1e562fe6-4fa4-4bbe-b122-54aee446280e"].push({
        id: "11d667a9-35cb-4706-92d2-e7d47c2fa725",
        lesson_id: "1e562fe6-4fa4-4bbe-b122-54aee446280e",
        step_type: "activity",
        title: "Questão 15",
        content: "Resolva a questão abaixo.",
        position: 14,
        activity: {
            id: "bb4a4783-5152-4484-aeab-521751881dc1",
            activity_type: "multiple_choice",
            statement: "O que significa a letra “H” na designação de uma “Lente Filtrante” (ou filtro)? ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "0ff6a9a1-391a-4e4f-ba50-296236e7a172", content: "A) Lente específica para processos de soldagem manual e semi- automático.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "268cdc9c-dd25-47ff-8e67-7e7609351e3f", content: "B) Lente específica para processos de soldagem automáticos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "06d84f8d-331c-43b9-bf7d-5dda62d4ea12", content: "C) Possibilidade de uso para qualquer valor de intensidade de corrente elétrica.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "4db36d38-e685-47c6-b9ff-fb3f75eb27e9", content: "D) Resistente ao impacto.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "3430fe39-a754-41d7-ba96-038aca92d1b1", content: "E) A letra H significa que a lente filtrante é feita basicamente de hidrocarbonetos (HxCy).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_MODULES.push({
        id: "98275590-ae27-4134-af43-b42ab29a523e",
        course_id: "c5555555-5555-5555-5555-555555555555",
        title: "Simbologia",
        description: "Questões e atividades sobre Simbologia",
        position: 8,
        is_published: true
    });

    STATIC_LESSONS.push({
        id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        module_id: "98275590-ae27-4134-af43-b42ab29a523e",
        title: "Prática - Simbologia",
        description: "Exercícios do banco.",
        estimated_minutes: 60,
        position: 1,
        lesson_type: "interactive",
        is_published: true
    });
    
    if (!STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"]) {
        STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"] = [];
    }

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "55a38b22-b207-41cd-bca5-8a0f71171430",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 1,
        activity: {
            id: "275b981a-d073-4492-afc1-25534280e8c8",
            activity_type: "multiple_choice",
            statement: "Quanto às convenções estabelecidas pela norma AWS A2.4 (Símbolos para Soldagem e END), identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "591b7249-0a55-455d-9465-1acb5a05154c", content: "F) Quando a linha de chamada é “quebrada”, isto significa que a mesma aponta para um membro específico da junta que deve ser chanfrado;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "60ad8c20-121d-4d67-a934-4f80cdd320bd", content: "G) Referências tais como: número da EPS, indicação de processo de soldagem, quando se necessita fazer alguma observação importante, entre outras, todas essas informações devem ficar na cauda da seta;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "700a75bf-38b6-47ec-a1f3-2e9c3b23dc82", content: "H) Todos os símbolos localizados abaixo da linha de referência correspondem a uma solda realizada no mesmo lado que a seta aponta;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "6cb7e2ee-5f23-48a0-8f01-205fbf6b3a2d", content: "I) Todos os símbolos localizados acima da linha de referência correspondem a uma solda realizada no lado oposto ao que a seta aponta;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "0c95fb66-411a-4a67-84f0-9f20867556ed", content: "J) Os símbolos de solda em ângulo, soldas em chanfro “em meio V”, “em V”, “em J”, entre outros, são sempre indicados com uma perna perpendicular à linha de referência à direita do símbolo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "6248f40c-6fb8-422b-a6f2-c66656cbc0f3",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 2,
        activity: {
            id: "61093d8f-5fce-4397-81ef-1252672aba46",
            activity_type: "multiple_choice",
            statement: "De acordo com o croqui apresentado a seguir, identifique a simbologia correta. A B C D E \n\n<img src=\"/images/questions/page25_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page25_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "39015124-970a-4119-8283-d936d9ad2dc2", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "47be1ee7-4b85-4131-9a2a-2a49ab643557", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "f76ee8dd-e1bc-41c9-acb8-2176f7d58aca", content: "C) C 26", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "9b9af7dd-0cd4-41e4-8e9d-09d27829b9e2", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "096f3ea3-ee7e-4d0c-aac8-f4b82a9db633", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "edc9f14d-9a5f-4bb4-ab2e-54e89d38d45c",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 3",
        content: "Resolva a questão abaixo.",
        position: 3,
        activity: {
            id: "2b364579-bc0a-404b-a581-d7e73a6cc07b",
            activity_type: "multiple_choice",
            statement: "De acordo com o croqui apresentado a seguir, identifique a simbologia correta. A B C D E \n\n<img src=\"/images/questions/page27_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page27_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "6a363c14-2574-497a-8521-e23c54b1ac11", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "c06d243f-6b37-469b-a1bd-afca18f9b010", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "59262581-891b-48bb-bf54-4e7a71f9ac45", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "015ed705-27ca-4f78-acfe-40de386b376d", content: "D) D", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "f8d816cf-498e-4ddd-8223-715c5b6c6106", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "7b015764-af74-40cd-94fa-5905180c8d6c",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 4",
        content: "Resolva a questão abaixo.",
        position: 4,
        activity: {
            id: "d4bcbc81-1b24-4384-be40-5d8f790f3524",
            activity_type: "multiple_choice",
            statement: "De acordo com a simbologia apresentada a seguir, identifique o croqui da junta correspondente. A B C D E \n\n<img src=\"/images/questions/page28_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page28_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "dc362255-bd68-4abf-9089-99276b3497bd", content: "A) A", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "7f350503-8b4f-45ff-b8fc-d3db5ebc78e1", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "44632cc4-7d04-4d2a-a3c3-21712ef5ff8a", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "2333e3a3-5ff3-4736-a3fa-4ecb15f08d2c", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "0d4e4e63-537a-4968-9453-8380448ae2d2", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "9095a1b6-2528-419b-8862-a8ea53291ad1",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 5",
        content: "Resolva a questão abaixo.",
        position: 5,
        activity: {
            id: "e76cac7e-c8e9-4ff9-b125-869920785bcc",
            activity_type: "multiple_choice",
            statement: "Dos diferentes tipos de Símbolos Suplementares criados pela norma AWS A2.4, identifique a alternativa incorreta. Símbolo Significado A Solda com perfil conve- xo B Solda em todo contorno C Solda no campo D Espaçador E Cobre-junta \n\n<img src=\"/images/questions/page30_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page30_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "3cb962b2-dfe7-412d-a46f-46c162a9ae9f", content: "A) A", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "c7567ac9-8662-4b5b-ab56-92291c2a38f2", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "1c794c8e-2b94-473d-8c6f-9b9a93690e2e", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "001579dd-c3dc-48e9-b024-ffb1930ed061", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "9349086d-c059-44cf-b5c1-c8aaa2823d1a", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "4271f528-ff3f-46a5-9b6a-86ce617ff91a",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 6",
        content: "Resolva a questão abaixo.",
        position: 6,
        activity: {
            id: "0aaa9c66-cf6a-4d4b-b727-c9692deeae2e",
            activity_type: "multiple_choice",
            statement: "De acordo com o croqui apresentado a seguir, identifique a simbologia correta.. A B C D E \n\n<img src=\"/images/questions/page31_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page31_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "93760219-f99a-4f80-bab9-9ed6449ccef1", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "2aa29650-75b6-4871-b1d3-6009a45c6401", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "4eeee4f3-5768-4d87-8d37-62e2ddb0478b", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "d4d1a37f-c849-4d07-8a3c-5e3b4ba26123", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "cd0331b3-3ec0-46d9-96a6-d07742f09be2", content: "E) E", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "493db259-ddfa-43be-8f6a-83f454554062",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 43",
        content: "Resolva a questão abaixo.",
        position: 7,
        activity: {
            id: "bd36aa29-3099-40a4-b068-f0209e9fe866",
            activity_type: "multiple_choice",
            statement: "09, sabendo-se que a solda em ângulo do lado esquerdo tem uma perna de solda igual a 7 mm e a solda de ângulo do lado direito tem uma perna igual a 5 mm. Os membros devem estar afastados um do outro 4 mm”. A B C D E \n\n<img src=\"/images/questions/page32_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page32_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "38a7012c-fd37-4f09-9f0f-0b5a17d1a205", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "4f5c8386-4036-4bb9-888f-5c434ad89b73", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "2c499516-0aac-43cb-815c-8ddaa1f24058", content: "C) C", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "1390b026-7b0b-418b-b5d4-c2fdcf295984", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "4af975f6-6ec5-4c14-b7d9-79b188040d93", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "045e3f66-096e-4b2e-9fa7-fe50da4f0ebe",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 8",
        content: "Resolva a questão abaixo.",
        position: 8,
        activity: {
            id: "418abeb2-0dc0-484b-9d2a-a358854f4253",
            activity_type: "multiple_choice",
            statement: "De acordo com o croqui apresentado a seguir, identifique a simbologia correta.. A B C D E \n\n<img src=\"/images/questions/page33_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page33_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "bb148841-4db1-47cb-9340-b2a11f15e3bd", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "1af2f6c0-e646-4931-8104-775601c6e665", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "af191f19-e0f9-4347-89c1-1bec657ddaed", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "c4d7deaf-4041-404a-8ac1-16ba5cec191b", content: "D) D", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "e5541ad2-d90b-4e07-b784-adab878e4b2e", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "0cf4360a-1a43-4588-8d7b-ab9d4f07139f",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 9",
        content: "Resolva a questão abaixo.",
        position: 9,
        activity: {
            id: "e841f650-aff2-48f1-bcaf-365eac6936a2",
            activity_type: "multiple_choice",
            statement: "De acordo com a junta de ângulo contendo soldas de pernas desiguais, identifique a simbologia correta. A B C D E \n\n<img src=\"/images/questions/page35_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page35_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "9a164df3-2dfc-4ad4-b93b-d5f19c061954", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "2c965f6f-fe30-4665-9e26-c0106db820ad", content: "B) B", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "d9f6c25b-960e-4d0d-8cd7-195e74115514", content: "C) C 36", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "59588759-a227-4aa3-8625-d89bfacd982a", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "a68b246d-1410-48aa-b80b-f8a38f1da1f6", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "bf19c94b-99ad-4a4b-9cfb-42c42d328836",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 10",
        content: "Resolva a questão abaixo.",
        position: 10,
        activity: {
            id: "b83a7401-cb25-42a9-be6d-1eb93a4154b1",
            activity_type: "multiple_choice",
            statement: "De acordo com a junta de ângulo apresentada a seguir identifique a simbologia correta. A B C D E \n\n<img src=\"/images/questions/page37_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page37_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "756b4918-f52a-4568-853e-b64e8b178816", content: "A) A", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "222b045a-d9b0-4c28-8942-c70ac9ce8feb", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "d4bf83a2-4615-4dad-833e-c0a9f4407df0", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "88d31fbc-6582-4dc4-983e-fcf324291221", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "147324ae-e673-4bf1-a18b-7e6a3290700d", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "de718ff0-f9a8-4307-8529-569f6cc3a1fd",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 11",
        content: "Resolva a questão abaixo.",
        position: 11,
        activity: {
            id: "fc2ea377-ff3e-4da6-9316-0f5e57b784bc",
            activity_type: "multiple_choice",
            statement: "De acordo com a junta de topo apresentada a seguir, identifique a simbologia correta. A B C D E \n\n<img src=\"/images/questions/page38_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page38_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "825542c7-541a-48fa-a97a-760e1a558127", content: "A) A", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "04196f89-9650-4bf0-9c31-4b6e1b6e7a71", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "33acd931-f3cf-4cb8-9881-a8504904130f", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "c0cb04f2-8831-4d26-b813-d843142a714d", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "f39bf895-d9c3-4452-a3d8-61fba00156bc", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "4cdfd8ec-8602-4637-8a35-b7f78241c7f4",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 12",
        content: "Resolva a questão abaixo.",
        position: 12,
        activity: {
            id: "24b20fa1-e448-4961-b779-7298ba5924cf",
            activity_type: "multiple_choice",
            statement: "De acordo com a junta de topo apresentada a seguir, identifique a simbologia correta. A B C D E \n\n<img src=\"/images/questions/page39_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page39_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "21258d10-4bbc-4190-8aa2-91cd8604c12e", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "a65a71c6-c5c9-4986-94d5-5ba24e0dd00a", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "06bb15a2-92ee-468d-a1c1-188073a01df6", content: "C) C", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "09b8297c-ccee-4417-bd40-ec5804b8f8fa", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "520b9193-8f67-4dc6-8d20-2b18bf0c80c4", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "8a37aef2-e6ef-48a1-ad4a-362037218f84",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 13",
        content: "Resolva a questão abaixo.",
        position: 13,
        activity: {
            id: "9517c2e5-d3a1-41c4-9885-2c5065dca299",
            activity_type: "multiple_choice",
            statement: "De acordo com o croqui da junta de ângulo e a simbologia apresentados a seguir, informe o valor da face da raiz do membro chanfrado. \n\n<img src=\"/images/questions/page41_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "e1a38694-e5ec-4197-a0f3-2fa84c0b1d78", content: "A) 2 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "e72bd816-005e-4d8a-b50c-6b72c77b14e4", content: "B) 3 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "8695bcdf-2e6e-4d46-9d47-a3471b918c0b", content: "C) 4 mm", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "8911032f-08b6-4815-88db-987daad10bf8", content: "D) 5 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "342afd63-177e-4097-a8d3-2f443bee86ea", content: "E) 0 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "208e3b5b-73ee-438e-a6c5-60e269ab5039",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 14",
        content: "Resolva a questão abaixo.",
        position: 14,
        activity: {
            id: "26995439-772a-42fa-9b20-5a0e8a679ffa",
            activity_type: "multiple_choice",
            statement: "Qual seria a simbologia correta para a situação descrita a seguir: Necessita-se soldar uma junta de topo, solda em chanfro, chanfro em “V”, ângulo do chanfro igual 60º, abertura de raiz igual a 3 mm, posição de soldagem sobre-cabeça. Após esta soldagem, deve ser realizada uma goivagem pelo lado oposto da solda empregando o processo “eletrodo de carvão”. Solicita-se que, em seguida, seja realizada uma inspeção usando a técnica “Partícula Magnética” para detecção de falhas na região da raiz da solda.. O chanfro, resultante da goivagem, deve ser preenchido, devendo o reforço desta solda ser nivelado com a superfície da chapa. Concluindo a soldagem, um ensaio radiográfico deve ser realizado pelo lado superior da obra, devendo cobrir 75% de toda a junta, empregando o procedimento Rad043/00 para a realização deste ensaio. 43 A B C D E ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "ca6dcc59-4a9e-4bfe-ba29-9b5bdc0c36fb", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "056ab9dc-6d5b-4505-af41-89e88e5c3cf0", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "5d10e538-4ff7-4d0a-8335-18f1c8060165", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "6a04981d-c9e5-4add-b1c7-0d3833eb5589", content: "D) D", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "27c72aa4-28b4-4268-9f8f-7c9aa4b560a6", content: "E) E 44", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "e4288915-46ef-49bb-a537-112c82524c1a",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 15",
        content: "Resolva a questão abaixo.",
        position: 15,
        activity: {
            id: "0d84cb50-1f58-487a-8018-b3626a1cfe65",
            activity_type: "multiple_choice",
            statement: "Analisando as simbologias referentes aos Ensaios Não Destrutivos, identifique a alternativa correta. A B  Ensaio por Partícula Magnética a ser realizado pelo lado da seta;  Ensaio Radiográfico, empregando filme com comprimento igual a 100 mm; C D  Ensaio por Ultrassom a ser realizado pelo lado oposto ao da seta, em todo o contorno da peça;  Ensaio de Líquido Penetrante a ser realizado do lado da seta, em 50% da extensão soldada; E  Ensaio por Partícula Magnética a ser realizado pelo lado oposto ao da seta; em 90% da extensão soldada; \n\n<img src=\"/images/questions/page45_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page45_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "1881f5bb-2a8c-4932-a49b-70c56dc682c9", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "6b204065-65e5-41f5-8ffe-e77e020d51fa", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "9b668e2c-8989-4a14-abfc-1a2aee550ec5", content: "C) C", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "c5caa607-074b-4f91-8779-dfeb93872df0", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "f012a502-eede-4466-8968-9fb13690839c", content: "E) E 46", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "cd0fe529-4ae3-400e-9154-4da3c7ccb986",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 16",
        content: "Resolva a questão abaixo.",
        position: 16,
        activity: {
            id: "c4b6099a-fb66-4b56-9458-372c3b06eb6c",
            activity_type: "multiple_choice",
            statement: "Analisando as simbologias referentes aos Ensaios Não Destrutivos, identifique a alternativa correta. A B - Ensaio por Partícula Magnética em ambos os lados da peça: do lado oposto à seta, deve ser realizado ensaio em 100% da extensão soldada; do lado onde está indicando a seta, deve ser realizado o teste em 100mm da extensão soldada ; - Ensaio por Ultrassom a ser realizado pelo do lado da seta, em 20% da extensão soldada; C D - Ensaio Visual a ser realizado do lado da seta em toda extensão soldada e Ensaio de Partícula Magnética a ser realizado do lado oposta à seta em 50% da extensão soldada ; - Ensaio de Teste por Pontos a ser realizado do lado da seta, devendo ser usado o procedimento de No. 4/00 para a realização da tarefa. E - Ensaio por Ultrassom realizado em 47 ambos os lados da seta. O ensaio tem que ser realizado no interior do Setor de Fabricação. \n\n<img src=\"/images/questions/page46_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page46_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "24f6b877-4310-454c-9963-7fc0c4dacbb0", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "594edd12-6ea5-4fa9-b90f-5b424f728b73", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "c964b229-3b6e-4db9-b29c-914d29b51552", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "ac5350fc-1ba3-49b3-a6c7-502f4824ebf1", content: "D) D", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "3001ca25-19e7-4f9f-834d-ee2a99e56b32", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "185e5dd8-2332-4b69-8fb1-7f4cadc7d8da",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 17",
        content: "Resolva a questão abaixo.",
        position: 17,
        activity: {
            id: "8a5c642f-db23-467d-9bab-ae1ebb579fd1",
            activity_type: "multiple_choice",
            statement: "De acordo com a simbologia apresentada a seguir, informe a espessura \n\n<img src=\"/images/questions/page47_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "b28eef5f-e842-48f8-9be5-df55436065b1", content: "T) da peça localizada no plano vertical.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "ef1029ee-b92e-480c-9862-22c83cd4b3e4", content: "A) T = 10 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "e317a873-6596-4aa7-9dc4-337d37c58f67", content: "B) T = 11 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "6b6b81a3-b3d7-4ca0-8571-e185712c7853", content: "C) T = 12 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 4 },
            { id: "760e4a72-c0b5-4605-a8fd-5ea91f1c911c", content: "D) T = 13 mm", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 5 },
            { id: "b92bca69-4451-4f0f-94b3-90fca6c6fcf3", content: "E) T = 25 mm", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 6 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "2684bb22-d964-4d19-bbd5-90c2c9031e6f",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 18",
        content: "Resolva a questão abaixo.",
        position: 18,
        activity: {
            id: "23a81bc0-5951-4907-9426-30de83d8ccb1",
            activity_type: "multiple_choice",
            statement: "De acordo com a simbologia apresentada a seguir, informe a junta soldada apresentada a seguir. A B C D 49 E \n\n<img src=\"/images/questions/page48_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page48_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "a85543c4-a848-4caf-a585-7406742ce2e2", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "be2585ad-ce18-4f8c-b312-5f36a9159850", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "1a49200a-dce9-44ae-b06b-566d181dbe51", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "db8b9fa4-6772-4754-a99c-9cef4d7d09c5", content: "D) D", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "0512e431-6b23-4b72-9076-606d8d0a02bb", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "e8b94251-262f-4c62-bd10-7eed26c6fdfe",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 19",
        content: "Resolva a questão abaixo.",
        position: 19,
        activity: {
            id: "372530de-66b6-402b-a976-611127a87df2",
            activity_type: "multiple_choice",
            statement: "De acordo com a simbologia apresentada a seguir, informe a junta soldada apresentada a seguir. 51 A B C D E 52 \n\n<img src=\"/images/questions/page50_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "63182b6f-680c-45db-8d21-29b62c1bb1b7", content: "A) A", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "4441d2a4-868f-4fda-8d77-1557ff9847bf", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "23b8377f-3cac-4a2d-8702-a12032599aee", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "a8bd3f06-9408-4290-aa42-f7265760bc7d", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "ef8d1693-6c1a-41c1-ba43-464bf1eade37", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "fb523385-d427-4d7a-b36d-8fb6696e6a23",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 20",
        content: "Resolva a questão abaixo.",
        position: 20,
        activity: {
            id: "05a39a3b-41d2-49de-b647-b799d6907bee",
            activity_type: "multiple_choice",
            statement: "De acordo com a simbologia apresentada a seguir, identifique a junta soldada apresentada a seguir. A B C D E \n\n<img src=\"/images/questions/page53_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page53_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "7495ba2d-c84f-4860-9586-71652a131704", content: "A) A 54", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "59b8db40-d739-4f08-a022-89493d389d9a", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "12a4e44d-62a3-4e85-91f3-a30e9b870073", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "369c0fe3-4f4e-4262-8015-e407ad2c0d1e", content: "D) D", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "685f25aa-fc02-4b1d-925e-28132208d014", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "5c142e79-22bb-4d5e-9825-b825a3b80269",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 22",
        content: "Resolva a questão abaixo.",
        position: 21,
        activity: {
            id: "0be9814a-46fb-4c49-9ef9-3bb424370c78",
            activity_type: "multiple_choice",
            statement: "De acordo com o croqui apresentado a seguir, identifique a simbologia correta. A B C D E 57 \n\n<img src=\"/images/questions/page56_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page56_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "f396eeb8-d2ed-4eb9-b6cf-9adeff736039", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "c8aa13d5-7a50-4590-aa10-154e73ee1ac8", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "6265983e-1b19-4fff-9148-c6f6944fa726", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "2ff0ffb8-bd33-4738-8fda-c5f5ed7ae8f2", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "75eb15b3-c657-4ca4-b975-29cac3c61e4e", content: "E) E", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "b45837fc-5197-46de-b960-5b90be0d90e8",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 23",
        content: "Resolva a questão abaixo.",
        position: 22,
        activity: {
            id: "7cdb4994-3ec6-4773-b70f-49fdedc7cd4f",
            activity_type: "multiple_choice",
            statement: "De acordo com a junta de topo apresentada a seguir, identifique a simbologia correta.. A B C D E 59 \n\n<img src=\"/images/questions/page58_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page58_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "a6231dd1-eb23-425a-8885-4ed9af54ef11", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "6de583a5-52c9-4e30-89a7-87eb343d7a02", content: "B) B", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "750cd6ce-460f-48f9-8d07-99d00e3e9805", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "b4820e17-36ba-4347-a79a-3e1168ff5a51", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "80ae1ecf-ba4b-43a0-a070-bce4e642a441", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "f10164fb-9c01-4889-bef8-71a1f1b2c690",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 24",
        content: "Resolva a questão abaixo.",
        position: 23,
        activity: {
            id: "d1df2ccd-eefb-492c-8b3c-f7813f1ac2ee",
            activity_type: "multiple_choice",
            statement: "Qual seria a simbologia correta para a situação descrita a seguir: Necessita-se soldar uma junta de topo, utilizando a técnica unilateral com backing de cerâmica. Chanfro em “V”, ângulo do bisel igual a 40º, abertura de raiz igual a 7 mm, posição de soldagem plana. Solicita-se que, em seguida à soldagem, seja realizada uma inspeção usando a técnica “Partícula Magnética” em uma extensão equivalente a 50% do comprimento da junta para a detecção de falhas na região da raiz da solda.. Após o envio da peça, onde se encontra esta junta, para o campo, deve-se realizar um ensaio radiográfico, executado pelo lado da raiz da solda, empregando o procedimento no. 10/08. 60 A B C D E ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "634b6247-658e-4cbf-88c9-8e01477a7759", content: "A) A", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "53ce853f-044d-4630-8c05-87d12b779189", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "1640f0ef-d8c7-4480-bf98-b55069865880", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "65081e4d-aa1d-4c4a-b3c1-f72d36ccb3f4", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "3b3a7449-7180-43e3-919d-9710c3c1ed43", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "55b4c316-3aa7-4a21-a32d-b2c32f870aa6",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 50",
        content: "Resolva a questão abaixo.",
        position: 24,
        activity: {
            id: "3afdb46a-7ddc-409d-9aea-aeb6fa82481c",
            activity_type: "multiple_choice",
            statement: "da extensão soldada; E - Ensaio por Ultrassom realizado em ambos os lados da seta. O ensaio deverá ser realizado no campoo. \n\n<img src=\"/images/questions/page61_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page61_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "c9e60dd5-e059-4a28-9e53-484fb6baab68", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "de0d7d6d-4b07-46e3-b65f-227f8cce9dbc", content: "B) B 62", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "6dcb095f-d2eb-4c2b-bc26-0fdea0663f43", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "90f05311-1645-4750-971a-b75c3935f992", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "06edc721-e8f7-4dd3-b95b-92d35826d20d", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "1bd1b3b1-eac4-4240-9e8e-8c051bbe53dc",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 26",
        content: "Resolva a questão abaixo.",
        position: 25,
        activity: {
            id: "947473d3-fe74-486b-b948-1a8d0c08ef04",
            activity_type: "multiple_choice",
            statement: "De acordo com o croqui apresentado a seguir, identifique a simbologia correta. A B C D 63 E \n\n<img src=\"/images/questions/page62_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page62_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "58153f53-f800-441a-8900-df2067530e96", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "3e02c80c-80fd-4e09-a4b0-3de87da2e9fa", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "eb616e80-eb41-489c-8380-d7ef0281f137", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "bb9337db-a72b-4811-8885-3bd5a1234e91", content: "D) D", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "609b3d9a-580d-4abf-8b74-8647b28a1133", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "04170ca2-5d92-497f-b158-8ee00fac53df",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 27",
        content: "Resolva a questão abaixo.",
        position: 26,
        activity: {
            id: "b7aec36c-8bff-4d24-97e8-548bf1527da3",
            activity_type: "multiple_choice",
            statement: "De acordo com a junta de ângulo, identifique a simbologia correta. A B C D E 65 \n\n<img src=\"/images/questions/page64_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page64_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "73e369dc-00bb-4044-be7c-be98b315228b", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "dd0ffb3e-94f9-4de4-91b5-aec06037c134", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "71b7e02c-590e-431f-9aad-4159c4e1c983", content: "C) C", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "3a3f2bee-d9a2-447e-a53a-26ae28017a29", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "3aa1d15d-38eb-49c4-9e0c-caa808dc1521", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "f6ce8a8a-3b82-4983-b76a-31a8f2345dee",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 28",
        content: "Resolva a questão abaixo.",
        position: 27,
        activity: {
            id: "d540ebb0-d7d1-4fad-8b81-0e0a02031228",
            activity_type: "multiple_choice",
            statement: "De acordo com a peça soldada apresentada no croqui abaixo, identifique a simbologia correta. A B C D E 67 \n\n<img src=\"/images/questions/page66_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page66_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "db4ec9c1-12e9-4d33-8f64-4932a7a6d442", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "9999d953-a244-4e55-a24a-621c1c45de5d", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "ec61cec5-c8f7-44de-b5d9-4863df7d573d", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "8e689289-52de-41e7-b447-fa9aa5709e4d", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "7e299d72-216f-422e-87f2-7ac518caa5a8", content: "E) E", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "744f017e-42f0-43a1-98a1-f0d04dd28cfb",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 29",
        content: "Resolva a questão abaixo.",
        position: 28,
        activity: {
            id: "2239530a-400f-4967-9aaf-1ff9792eeea3",
            activity_type: "multiple_choice",
            statement: "De acordo com a peça soldada apresentada no croqui abaixo, identifique a simbologia correta. A B C D E 69 \n\n<img src=\"/images/questions/page68_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page68_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "490778f9-f796-488d-bb94-c04e2026fe08", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "d156f6cb-d044-4b12-ac2f-f24a9b29e866", content: "B) B", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "9a49e48b-cd36-44d8-b7cc-625dafc2b99e", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "c8c15713-323d-4eac-ba7d-c1fc12ed2a6b", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "bec35a9e-f911-4839-a2e1-ad630ae1ec7f", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "0f5ed9a6-7055-4723-93e1-2dc26b096768",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 30",
        content: "Resolva a questão abaixo.",
        position: 29,
        activity: {
            id: "34936c8d-fbd4-430a-9549-d01dee44bfd4",
            activity_type: "multiple_choice",
            statement: "De acordo com a peça soldada apresentada no croqui abaixo (viga do tipo I soldada em uma base metálica), identifique a simbologia correta. 71 A B C D E 72 \n\n<img src=\"/images/questions/page70_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "852377ca-f0d5-4d95-a69a-e1c255692912", content: "A) A", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "199244b1-fab4-440c-b757-edf3d338c588", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "b9edcc77-21e4-4407-8344-80b6a419c467", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "367a06c4-8409-4afb-a45d-c842836cdf25", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "b9708131-4bf7-4af3-a997-ea2c1dea4a4c", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "798494ee-e9b0-44ac-9800-1f83ff27f378",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 31",
        content: "Resolva a questão abaixo.",
        position: 30,
        activity: {
            id: "f4a04be6-1b35-4a79-b8b5-e26d965bcec1",
            activity_type: "multiple_choice",
            statement: "De acordo com a peça soldada apresentada no croqui abaixo (cantoneira posicionada à 45º de uma chapa de aço) e sabendo que a solda de ângulo localizada à esquerda tem uma perna de solda igual a 5 mm e que a solda da direita tem uma perna igual a 6 mm, identifique a simbologia correta. A B C D E 74 \n\n<img src=\"/images/questions/page73_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page73_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "4f7a1ae8-a504-4d57-b6bc-c5998535c7fa", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "aa20aa7f-0e79-46fb-95d5-922838fce555", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "6abb557f-e442-46b2-a79e-d95abd8a116f", content: "C) C", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "7c0656c4-56fe-4953-ae00-3ceb22bac64c", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "551a1c8f-7f5b-4dc6-80bd-c62dec8d3fd5", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "cbcac73d-65b4-4d4f-90e7-702bc756d1b5",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 32",
        content: "Resolva a questão abaixo.",
        position: 31,
        activity: {
            id: "2b8208de-d35b-41bf-8d86-b9495f239fe3",
            activity_type: "multiple_choice",
            statement: "De acordo com a junta de topo apresentada no croqui a seguir, identifique a simbologia correta. A B C D E 76 \n\n<img src=\"/images/questions/page75_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page75_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "39153d45-d592-4bc8-b53e-8e913bbba2dd", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "8ade64b3-db94-4a32-81f2-c58942bd12d2", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "894c92fa-faaf-4eca-836f-3a9edf00dd86", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "48d7a2f5-8e59-49c3-8b84-8dc11f50778e", content: "D) D", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "6d7b3a04-652f-4fc7-9f83-c59876a6a95d", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "ee29a3d1-ba7d-49d9-adf9-bc80d5143f51",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 33",
        content: "Resolva a questão abaixo.",
        position: 32,
        activity: {
            id: "9c973ecc-c1c0-41fa-adfc-98357be6ad16",
            activity_type: "multiple_choice",
            statement: "Dos diferentes tipos de Símbolos Suplementares criados pela norma AWS A2.4, identifique a alternativa incorreta. Símbolo Significado A Solda de revestimento B Solda em todo o contorno C Solda de fechamento ou aresta D Solda de costura E Solda com projeção \n\n<img src=\"/images/questions/page77_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page77_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "9f78dd3a-4c0d-4341-ad05-3816eda81d98", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "507f7edc-989b-47ee-9aa0-246b393c2765", content: "B) B", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "a7ac08cc-ebc2-4722-a961-85ce805c54c6", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "048dcf22-e874-45b0-9cb5-ece57dee27de", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "a62a3495-f11c-4c79-b3de-4fbca86ba56b", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "6bad7ad8-7486-4d13-b356-81dce4d0c384",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 35",
        content: "Resolva a questão abaixo.",
        position: 33,
        activity: {
            id: "e8e0a5d8-570b-453e-87c2-8e48a82f5982",
            activity_type: "multiple_choice",
            statement: "De acordo com a junta de topo apresentada no croqui a seguir, identifique a simbologia correta. A B C D E 81 \n\n<img src=\"/images/questions/page80_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page80_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "9a531240-6676-443c-8899-b756fd251c1b", content: "A) A", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "45951224-d308-4143-ac36-7f12aef8620b", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "7711a1cb-db6f-4cf9-9481-4bc871a474fd", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "4eafb257-105b-4c9c-ace3-fc186d47c537", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "7a825e19-10f5-418e-9bfa-8400a927fb31", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "b4ab7633-55ab-4a52-b093-b1f1369d4436",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 36",
        content: "Resolva a questão abaixo.",
        position: 34,
        activity: {
            id: "48f5a89f-ae58-472d-a422-d75c4fb539db",
            activity_type: "multiple_choice",
            statement: "De acordo com a simbologia apresentada a seguir, identifique a junta soldada apresentada a seguir. 83 A B C D E \n\n<img src=\"/images/questions/page82_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "dbcb8986-04a3-4eb0-879a-6930d36bdb23", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "b66d4b9c-db19-4c57-8fe4-6a5f8cb2c82b", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "859b066c-cceb-4df5-86b9-9ea4cecc3c52", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "65ef9ba1-48d0-46ac-9d78-801ec50f3ca9", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "cb0692fe-edf6-49f6-822c-69eff903acda", content: "E) E 84", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "8ea0b989-f752-4b5d-8d27-ebeda1725057",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 37",
        content: "Resolva a questão abaixo.",
        position: 35,
        activity: {
            id: "a9e80b66-8b44-4525-870f-d7b839398b32",
            activity_type: "multiple_choice",
            statement: "Dos diferentes tipos de Símbolos Suplementares criados pela norma AWS A2.4, identifique a alternativa incorreta. Símbolo Significado A Chanfro em “U” B Solda com perfil côncavo C Solda com faces côncavas D Solda com perfil convexo E Chanfro em “J” \n\n<img src=\"/images/questions/page84_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page84_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "b6ddd63c-473b-402b-9f90-ce3354cf1358", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "e64218ae-cc92-4c5f-b276-d6024d226f3e", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "0dc1ec4b-4e22-449b-9823-576379b27d3f", content: "C) C", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "5c811c28-cd4b-4b33-b5c8-a84867f7aa78", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "3cdad1b9-2817-46ae-8ee3-a23ce2a1b7d0", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "d3fefb29-13ec-40b8-8bdf-c79dd22b743d",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 38",
        content: "Resolva a questão abaixo.",
        position: 36,
        activity: {
            id: "d982cfc3-9cd5-4efb-8808-d1ab98e0fa56",
            activity_type: "multiple_choice",
            statement: "De acordo com a junta apresentada no croqui a seguir, identifique a simbologia correta. A B C D E 86 \n\n<img src=\"/images/questions/page85_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page85_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "e0b9ea90-bebe-4b3f-a4bc-87e6d397b7fe", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "0d3ee297-9a9c-421d-875e-1c4bf3e505ab", content: "B) B", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "3518b613-4626-4d83-87c9-302e453f5ac4", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "50a98d98-8ff7-49b3-9ae9-2a0056a51a50", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "d6e66de8-3aa7-4c53-8b64-9a816a78ba20", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "f3e9a969-478a-49ec-871a-c20e03bba945",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 39",
        content: "Resolva a questão abaixo.",
        position: 37,
        activity: {
            id: "e10875a0-b99a-4d59-a18a-e5bf741a27b6",
            activity_type: "multiple_choice",
            statement: "De acordo com a junta apresentada no croqui a seguir, identifique a simbologia correta. A B C D E 88 \n\n<img src=\"/images/questions/page87_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page87_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "dd5036e6-b13a-40a5-94fd-ee0ff1d4b2fc", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "5baa522d-58bd-40db-8fea-c462e1d594d9", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "415b74c3-ea1a-43b5-ba3d-c66ab3238c72", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "cccdcc22-3764-4dc0-aa06-8ebe0fefc590", content: "D) D", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "c2e1fe2a-50de-411f-b9ac-3875133a3243", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "f07cd2f5-d779-4c28-bf27-2ad59d042d36",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 40",
        content: "Resolva a questão abaixo.",
        position: 38,
        activity: {
            id: "94fbfd9c-e4ad-401b-b044-1c889ca3c213",
            activity_type: "multiple_choice",
            statement: "De acordo com a junta apresentada no croqui a seguir, identifique a simbologia correta. A B C D 90 E \n\n<img src=\"/images/questions/page89_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page89_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "b4f0d343-914f-4c40-8e72-ca919ec0de3f", content: "A) A", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "0526e64e-4dea-448a-b3ae-644551dad73d", content: "B) B", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "48be6ddb-60af-487a-9485-56e5d3cbf3f9", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "28b0b8d0-e610-4544-86ca-7358a16d9d9e", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "b9821593-b64e-4ddb-9ed9-d41fdbc7d128", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "316fa0a6-1e3e-44dc-8944-20579aba3db4",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 39,
        activity: {
            id: "d74f4704-c12a-4e34-91e9-a1fa0d537258",
            activity_type: "multiple_choice",
            statement: "Quanto às características elétricas relativas ao processo de soldagem manual com eletrodo revestido, identifique a alternativa correta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "8d329d0e-c1c2-4e9a-9805-85d41abbdc0d", content: "A) Este processo permite apenas do uso das seguintes fontes de energia: transformador e gerador;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "fa82c79a-d741-4187-9399-d39327b47673", content: "B) Em relação aos tipos de corrente possíveis de serem usadas neste processo, a corrente elétrica do tipo contínua, com o eletrodo ligado no pólo negativo da fonte, não é possível ser utilizada;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "71f9330a-4b2c-4b75-b460-97d2efc3c717", content: "C) É proibido o uso da polaridade direta neste processo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "2973dc28-2d9c-4a87-8c5e-76e3e1b7ac8d", content: "D) Apesar de alguns eletrodos revestidos só poderem ser usados com um determinado tipo de corrente, este processo permite o emprego de qualquer corrente e polaridade;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "1ef2ff4e-3ba1-4143-af33-5483edbcae15", content: "E) Eletrodos revestidos, quando empregados com corrente alternada, produzem os cordões de solda com as maiores penetrações, se comparados com os cordões fabricados com corrente contínua, estando o consumível ligado ao pólo positivo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "c1ed1ebe-fabd-4e8a-bd7c-b09746feb691",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 3",
        content: "Resolva a questão abaixo.",
        position: 40,
        activity: {
            id: "58acbc79-e374-4c13-a6d4-83dbc9271e87",
            activity_type: "multiple_choice",
            statement: "Em relação aos equipamentos de soldagem utilizados no processo de soldagem manual com eletrodo revestido, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "9e54a0a2-cccd-4ad9-ac8f-236839ffd8fc", content: "A) Os cabos de soldagem devem ser mantidos desenrolados durante a soldagem, visto que este fato pode gerar um campo magnético com uma determinada magnitude, que por sua vez poderá defletir o arco elétrico durante a soldagem, produzindo uma grande quantidade de descontinuidades na junta soldada; 92", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "bd1f4603-65c9-439c-a95e-349b5cf411ac", content: "B) A conexão do grampo, tanto com a extremidade do cabo-terra, quanto a sua fixação com a obra, deve estar muito bem firme, visto que qualquer falha numa das partes tornará o arco elétrico instável, podendo gerar diferentes tipos de descontinuidades na junta soldada;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "f93cb727-a525-4420-af16-13a90ede72b7", content: "C) Uma das desvantagens deste processo é a limitação de suas fontes de energia em só poderem ser alimentadas por corrente elétrica e tensão provenientes de uma rede elétrica externa.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "de180b88-09d4-4cae-b6ef-1b0a529e0344", content: "D) Os dispositivos que compõem o porta-eletrodo devem ser muito bem conservados, visto que avarias, além de diminuírem sua vida útil, podem também causar acidentes ao soldador, assim como gerar instabilidades no arco elétrico, que, por sua vez, poderá produzir descontinuidades na junta soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "88cdba05-e953-4781-8478-f888cf9c435b", content: "E) Os cabos devem ser flexíveis para permitir fácil manipulação e consistem de vários fios de cobre enrolados juntos e protegidos por um revestimento isolante e flexível (normalmente borracha sintética).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "7435762e-d41d-44b5-ab2b-b156ae4246e3",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 4",
        content: "Resolva a questão abaixo.",
        position: 41,
        activity: {
            id: "bd71f006-ab54-4506-89fc-abb4cff6a092",
            activity_type: "multiple_choice",
            statement: "Analisando o processo de soldagem manual com eletrodo revestido, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "24e72b09-ad9d-473d-a301-1b8daf43811b", content: "A) Pode ser usado numa ampla variedade de configurações de juntas encontradas na soldagem industrial;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "e0b254a8-996f-4901-8174-6b1d0e54116d", content: "B) Processo que permite o soldador regular os valores de corrente elétrica e tensão do arco (voltagem), de acordo com a espessura do metal de base, do diâmetro do consumível, entre outros fatores;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "ab2200fc-8dff-4d5b-bd9d-408e0e935a1f", content: "C) Processo que permite soldar em todas as posições;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "54416163-1381-484d-9a8f-86781a4f594f", content: "D) Pode ser usado numa ampla variedade de combinações de metal de base e metal de adição;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "024b6c0f-33ed-4d98-b09a-c39e14648d37", content: "E) Este processo é muito usado na indústria, devido à simplicidade de sua fonte de energia, à qualidade das soldas e do baixo custo dos equipamentos de soldagem e dos consumíveis.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "53b3693c-3ed1-45d6-9a40-ab6c3820adc2",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 5",
        content: "Resolva a questão abaixo.",
        position: 42,
        activity: {
            id: "5ad507b8-8291-485a-a8ad-ef45a364e213",
            activity_type: "multiple_choice",
            statement: "Analisando os processos de soldagem listados a seguir, identifique aquele que está fora do conjunto. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "bcd9a161-cc2f-45ab-b591-bf9e0b01e9cc", content: "A) Processo Manual com Eletrodo Revestido (SMAW);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "58121a0c-78af-48c8-9365-91f01fcf813d", content: "B) Processo Oxi-gás (FOW);", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "420ff27e-2c67-48e1-997c-9e6f6408b170", content: "C) Processo MIG/MAG (GMAW);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "8072af42-d7c7-4d4d-9344-d96a88a82c12", content: "D) Processo TIG (GTAW) 93", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "63fff1bf-9869-4c0a-9a68-d11d33c60cf3", content: "E) Processo com Arame Tubular (FCAW).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "593dd2b9-665c-417e-966e-3261cd144d39",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 6",
        content: "Resolva a questão abaixo.",
        position: 43,
        activity: {
            id: "2a9fecce-0114-4f3c-ac4c-f3b8ef9bb605",
            activity_type: "multiple_choice",
            statement: "No que diz respeito ao processo de soldagem manual com eletrodo revestido, quais das alternativas apresentadas, a seguir, não pode ser controlada pelo soldador? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "b13274d7-6a6b-45ee-8324-701c1fb5862a", content: "A) Corrente elétrica;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "1a9e7524-690b-4c39-b2ed-2b6e27f1b9c2", content: "B) Comprimento do arco;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "92035dd0-30f0-45a9-9cb1-8fcbbdab0dc9", content: "C) Ângulos de trabalho e de deslocamento do eletrodo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "93ee82de-452e-4a9c-880d-308c124b52c9", content: "D) Velocidade de deslocamento do eletrodo (velocidade de avanço);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "34957499-fd17-4f4e-86e3-c286848c38cb", content: "E) Impedância", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "4a48b3dc-0c62-47d8-8374-b19762f3a5e2",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 7",
        content: "Resolva a questão abaixo.",
        position: 44,
        activity: {
            id: "9dbaa791-20a2-4a41-ab1b-a6e758d2cf66",
            activity_type: "multiple_choice",
            statement: "Sabendo que, na soldagem dos aços carbono, os consumíveis de soldagem “Arame Tubular com Núcleo Metálico” (MCAW, em inglês) e o arame sólido (eletrodo nu), são enquadrados na mesma Especificação AWS A5.18, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "2f7c924f-be01-47ab-a0cf-fd0f3ea568b7", content: "A) Para proteger a poça de fusão, ambos os consumíveis necessitam de um gás (ou mistura gasosa) externo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "dbc85140-ba35-4765-88fe-e87b884259b0", content: "B) Os critérios de classificação dos dois consumíveis relativos à Especificação AWS A5.18 são distintos para cada um: para se determinar a composição química do arame sólido, basta fazer uma análise retirada diretamente do arame sólido, enquanto que para o arame tubular com núcleo metálico faz-se necessário que o derreta sobre uma placa metálica (almofada) e, deste metal depositado é que se retira uma amostra para se determinar a composição química do consumível;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "231a25c4-3ec6-4adf-9de5-f17001e3d6a9", content: "C) Ambos os consumíveis são empregados utilizando corrente do tipo “contínua”, polaridade inversa.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "b408c7df-a591-4b32-8155-caa6614d2aea", content: "D) Enquanto o arame sólido pode ser utilizado em todas as posições de soldagem, o arame tubular com núcleo metálico é empregado apenas nas posições plana e horizontal;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "ee43ad1c-daa6-4eda-a9a8-3a40c92a1fcf", content: "E) Os dois consumíveis não produzem escória quando derretidos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "b7a7a8c5-c92e-40fa-b040-5069034d4e81",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 8",
        content: "Resolva a questão abaixo.",
        position: 45,
        activity: {
            id: "7c7f4666-9172-4c1e-9bd7-0dfe8b0ef894",
            activity_type: "multiple_choice",
            statement: "No processo de soldagem TIG (GTAW), é sabido que o formato (geometria) da ponta do eletrodo de tungstênio influencia a largura e a penetração do cordão de solda. Na figura a seguir, assinale a combinação correta. \n\n<img src=\"/images/questions/page94_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "28c1c81d-dd6d-4f79-ab26-0eb63d28a2ab", content: "A) A", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "e5628ce6-bb0f-4b08-8608-2f27f467964f", content: "B) B", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "98cdd9d9-c74f-475c-a888-e15bba036ee0", content: "C) C", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "46004266-cabc-4d56-91d4-ccd58edf6a37", content: "D) D", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "8f6738a5-756b-4b4a-8eaa-ff696c66fbac", content: "E) E", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "d9c8a173-1909-4619-8134-16c0fc111f92",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 9",
        content: "Resolva a questão abaixo.",
        position: 46,
        activity: {
            id: "72228f9d-9d6f-4b94-badf-862a52f92370",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas a seguir não é característica do processo a Arco Submerso? \n\n<img src=\"/images/questions/page94_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "445cadd5-4e8b-4962-bf63-9628c90261a5", content: "A) Alta velocidade de soldagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "12c874da-3133-480d-b1df-3e388932c9de", content: "B) Dificuldade da soldagem fora da posição plana;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "c71ed419-c3a0-4df8-b8e1-f8a9c828f49f", content: "C) Baixa penetração dos cordões de solda;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "83c82698-e21e-4dac-99c0-01e5c0b77c34", content: "D) Grande tamanho da Zona Termicamente Afetada (ZTA);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "71b8f7fc-4e9c-4541-87e0-19c9ac6b491a", content: "E) Possibilidade de soldar uma grande faixa de espessura.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "6806657e-0a81-4e15-8618-e1f5b95fe24f",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 10",
        content: "Resolva a questão abaixo.",
        position: 47,
        activity: {
            id: "ab32127e-86c5-4a86-991a-680094f62d88",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas a seguir não é função do gás de proteção utilizado nos processos MIG/MAG (GMAW)? \n\n<img src=\"/images/questions/page94_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "78274c2a-f2a4-4c92-8817-f994d070f5e9", content: "A) Ionizar o arco;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "f1247987-b5e3-4a69-b168-b6692ccb5efc", content: "B) Proteger a poça de fusão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "1d8a334d-48c9-4e2c-87ae-5f691f6e2049", content: "C) Adicionar elementos de liga no metal de solda;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "24f6581d-b5c0-4456-bc39-9954cc6679a4", content: "D) Promover a operacionalidade do processo; 95", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "291d5401-56d3-48ce-bcef-ffe5f94c531c", content: "E) Influenciar o tipo de transferência metálica do consumível para à peça.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "ad5012fb-dea3-4bec-958a-fd998b28b5b2",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 11",
        content: "Resolva a questão abaixo.",
        position: 48,
        activity: {
            id: "80baf073-89be-4bb3-9bdc-009ca8f9c173",
            activity_type: "multiple_choice",
            statement: "Qual variável de soldagem, de modo mais efetivo, a penetração dos cordões de solda no processos a arco elétrico? ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "86980889-b6e2-4773-bc38-9a9d46ab5994", content: "A) Corrente elétrica;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "2c39c6ea-f1e6-4622-948c-e05c601318f9", content: "B) Tensão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "59724875-d615-4598-8e2c-a94238452f38", content: "C) Pré-aquecimento;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "9bd30dd8-2a13-47a4-9495-f1bd8dd14d03", content: "D) Impedância;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "e0306955-eeb9-4b33-b00c-92699df3047f", content: "E) Associação entre valores de tensão e grandes temperaturas de pré- aquecimento", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "6f35a1b6-4fe4-4c5a-958a-5e495d8556e1",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 12",
        content: "Resolva a questão abaixo.",
        position: 49,
        activity: {
            id: "4229f629-c08c-45f4-926e-06a9871b291e",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas abaixo mostra a função principal da adição de uma pequeno teor de Tório no eletrodo de tungstênio empregado no processo TIG (GTAW). ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "dae3ddc2-c924-4225-aec0-5db7db27fea2", content: "A) Elimina a possibilidade de produzir descontinuidade do tipo “falta de fusão” entre os cordões;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "7a0b1fe6-faa5-4ddf-bca9-7e35f3128834", content: "B) Dispensa o uso de uma fonte de alta freqüência, empregada para permitir a abertura do arco elétrico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "45088125-54e6-4f86-9a76-c78c681c9f8d", content: "C) Aumenta a emissividade eletrônica do eletrodo, garantindo maior estabilidade do arco elétrico e durabilidade do eletrodo;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "5d7e6636-ab88-48af-801d-74c2d33b78af", content: "D) Foi desenvolvido especificamente para permitir a soldagem de juntas dissimilares, como por exemplo: alumínio com cobre;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "a3c585c4-3d3c-4f39-b0eb-e573d2f53a95", content: "E) Aumenta em 50% a taxa de deposição do processo TIG (GTAW).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "5a54e9c2-d79b-47d8-81e2-ba8920526e8d",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 13",
        content: "Resolva a questão abaixo.",
        position: 50,
        activity: {
            id: "f5c32372-cbb2-4d61-b182-1d1ad3a4a0b3",
            activity_type: "multiple_choice",
            statement: "Qual das descontinuidades apresentadas a seguir não é produzida pelos processos MIG/MAG, arco submerso, arame tubular e manual com eletrodo revestido? ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "2a3ab3b4-9160-4ef5-80a1-5dc8eca5e3cc", content: "A) Inclusão de escória;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "3991b56b-bd8a-4393-92c2-45b7d96298eb", content: "B) Falta de fusão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "bb7141d3-269c-484c-aebd-987d6277b8bf", content: "C) Inclusão metálica;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "9ba5ef7d-4643-4c96-91e3-b91b43d10c5f", content: "D) Porosidade;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "446ffe0a-fcdb-4cd7-9018-d61a5dacd0ec", content: "E) Trinca sob cordão.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "2bc5fea7-9677-46c7-951d-4b8e380af2a6",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 14",
        content: "Resolva a questão abaixo.",
        position: 51,
        activity: {
            id: "dabe2a0b-154e-45c9-99ee-70d637f8cc93",
            activity_type: "multiple_choice",
            statement: "Quais dos processos de soldagem listados abaixo permitem a produção de soldas conhecidas como “autógenas”? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "6a5c9cf8-83c3-426d-9d2a-ba2f9c5e5e3e", content: "A) Processos a arco submerso e manual com eletrodo revestido;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "ae29e42a-81b9-492d-a87f-4c50f5c233eb", content: "B) Processos manual com eletrodo revestido e MIG/MAG (GMAW);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "2b42c098-66f5-4840-80d3-70ad534896da", content: "C) Processos MIG/MAG (GMAW) e Arame Tubular (FCAW);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "99b40070-6d17-4e89-a49e-94ce7f290e1b", content: "D) Processos TIG (GTAW) e a arco submerso;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "4eabc9e1-d4bd-428a-8b58-d597bafde95b", content: "E) Processos TIG (GTAW) e Oxi-gás (OFW).", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "fcf9a479-cf09-40c9-a3c6-df53f68135d3",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 15",
        content: "Resolva a questão abaixo.",
        position: 52,
        activity: {
            id: "f0511636-6cea-470e-8394-65086e7d3d8c",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas apresentadas a seguir está incorreta quando se analisa o processo de soldagem com Arame Tubular (FCAW)? ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "2de770e6-48c2-47cc-a0f5-1813c1c6a42d", content: "A) Utiliza dois tipos de consumíveis de soldagem: um tipo que necessita da adição de um gás externo e um outro que dispensa o uso de um gás externo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "677fe664-4657-49a3-99e6-ab90d1f26e1a", content: "B) Por não produzir escória, este processo permite uma excelente visualização da poça de fusão durante a soldagem;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "78856fdb-7b99-4806-ba48-2f4120aedfec", content: "C) O processo FCAW foi desenvolvido décadas após do desenvolvimento do processo MIG/MAG (GMAW);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "c87ff494-75ce-43fc-bae1-f23279de0b3a", content: "D) O consumível Arame Tubular produz uma taxa de deposição maior do que a do Eletrodo Revestido;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "0113ea28-25e4-42f6-98c6-a5b4b07c5412", content: "E) Os Arames Tubulares de diâmetros inferiores a 1,6 mm normalmente necessitam de uma proteção gasosa externa, enquanto aqueles que têm diâmetros maiores do que 1,6 mm dispensam o uso do gás externo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "60c80f89-f598-4989-889b-bc15c3c7c934",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 16",
        content: "Resolva a questão abaixo.",
        position: 53,
        activity: {
            id: "420cd159-fceb-4779-ab9a-dce06d2de36e",
            activity_type: "multiple_choice",
            statement: "Dos gases e suas combinações empregados no processo com arame tubular (FCAW) na soldagem de aços carbono apresentadas a seguir, indique qual alternativa está incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "c8fae833-d7d5-4c3c-b249-c623c29f3a88", content: "A) 75% Ar + 25% O2", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "48af7a79-afd1-4ea5-9f28-82020205ad58", content: "B) 100% CO2", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "49f41b9c-8c99-47f9-9a56-6f78fe0ceda3", content: "C) 90% Ar + 10% CO2", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "82011358-5b56-45e8-b1e5-2261126bad22", content: "D) 98% Ar + 2% O2", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "2025d6f1-8057-4ab6-b130-fb336b1bc2e6", content: "E) 82% Ar + 18% CO2", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "f47fbea0-4af6-4875-8440-e27496e2d163",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 17",
        content: "Resolva a questão abaixo.",
        position: 54,
        activity: {
            id: "111af490-f6c5-48f9-a36e-1e98e110605f",
            activity_type: "multiple_choice",
            statement: "Comparando os dois tipos de arames tubulares (auto-protegido [“self- shielded”, em inglês] e aquele que necessita de uma proteção externa de gás [“gas shielded”, em inglês]), marque a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "15b26a20-2e1b-4185-90da-7bc649e50df4", content: "A) Ambos os arames tubulares, embora semelhantes, apresentam características distintas; geralmente os Auto-protegidos têm internamente uma configuração metálica de forma complexa, além do fluxo, diferentemente dos arames que necessitam de proteção externa que, internamente, só possuem fluxo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "cb9439b3-8780-4264-b88d-4ef7e00023fe", content: "B) No fluxo, colocado no interior dos arames, são encontradas substâncias que geram gases de proteção;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "6ab28976-a970-47e7-87e0-5900d846ef42", content: "C) Na fabricação de arames tubulares de grandes diâmetros, é comum que o fabricante use uma fita metálica com uma largura maior do que aquela necessária para a sua fabricação. O excesso de fita, teoricamente desnecessário, é introduzido no interior do arame, permitindo que, quando da fusão do arame, todo o fluxo existente naquele ponto, receba o calor proveniente do efeito Joule produzido pela passagem da corrente elétrica pela massa metálica do arame;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "20f0d973-7d05-449d-9d4c-d94ce62f03c0", content: "D) O arame tubular foi desenvolvido visando unir as vantagens do processo MIG/MAG (GMAW), nos modos semi-automático ou automático, com as do processo com eletrodo revestido (revestimento fusível formador de gases protetores, escória, elementos de liga, etc.).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "f5d28c76-a102-4f73-a094-b109c051d753", content: "E) Os elementos químicos que vão conferir ao metal de solda ótimas propriedades mecânicas (resistência mecânica, tenacidade, dutilidade, etc.) estão incorporados na fita metálica externa.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "46ee2875-2994-4949-bef0-3531b47cd9e7",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 18",
        content: "Resolva a questão abaixo.",
        position: 55,
        activity: {
            id: "163d92bf-e886-4e68-9c25-01425ed4046b",
            activity_type: "multiple_choice",
            statement: "Sabe-se que os diferentes tipos de Transferências Metálicas produzidas no processo MIG/MAG (GMAW) dependem de alguns fatores. Das alternativas apresentadas a seguir, identifique aquela que não influencia nessas transferências. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "39a37f1e-60ab-4e66-b9db-bd43a30cc940", content: "A) Tipo do gás de proteção empregado;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "22367d54-e55c-4999-b9ed-c5c0bd52c145", content: "B) Variações dos valores da velocidade de avanço do consumível;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "63bde009-b411-44c4-bc4e-139007cf793b", content: "C) Variações dos valores de intensidade de corrente elétrica;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "8dd90e05-86c2-4db9-9034-f75d0107f008", content: "D) Natureza do consumível de soldagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "857870b7-8191-4cb9-9ace-70af75319eb3", content: "E) Variações dos valores da tensão do arco elétrico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "c82f078a-8f3e-4a17-9e17-7d92858f0867",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 19",
        content: "Resolva a questão abaixo.",
        position: 56,
        activity: {
            id: "36500c78-1a47-4159-ae79-af844f694931",
            activity_type: "multiple_choice",
            statement: "Comparando o processo de soldagem Oxi-gás (OFW) com os processos manual com eletrodo revestido, MIG/MAG (GMAW), TIG (GTAW) e Arco Submerso, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "6660de0e-fdad-46fd-9b4a-6a8221a0737f", content: "A) A produtividade apresentada pelo processo Oxi-gás é baixa, assemelhando-se apenas com aquela apresentada pelo processo TIG manual;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "318be482-3b4e-4a9c-af43-5ff764124236", content: "B) O processo Oxi-gás apresenta uma chama como fonte de calor, enquanto os demais processos a fonte de calor provém do arco elétrico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "0e0eb03a-9e34-4e8c-9e52-81f60f7185ae", content: "C) Os volumes dos gases combustível e comburente, na mistura que acontecerá dentro do maçarico, devem ser previamente ajustados pelo soldador, em função do metal de base que será soldado e do tipo de chama que se deseja trabalhar;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "be7cf83a-9f85-4743-9f4b-994a28a1296a", content: "D) Assim como o processo TIG (GTAW) manual, no caso do processo Oxi-gás apenas a mistura formada pelos gases combustível e comburente é capaz de impedir a entrada dos gases do ar atmosférico na poça de fusão; nenhum outro consumível de soldagem se faz necessário para remover impurezas encontradas na poça de fusão;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "045b2166-0213-442a-be84-dc6c435df9c4", content: "E) Assim como no processo TIG (GTAW), tanto manual quanto mecanizado, a formação das gotas (na fusão do metal de adição) não acontece na origem da fonte de calor.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "9f2e3c2f-2c7b-4691-8f28-a92069521d82",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 21",
        content: "Resolva a questão abaixo.",
        position: 57,
        activity: {
            id: "67c767df-a410-472b-b7a7-b7cb0984c156",
            activity_type: "multiple_choice",
            statement: "Em relação ao processo a arco submerso (SAW), assinale a alternativa correta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "89618ead-4fe8-4582-b066-c17f4819f07b", content: "A) Caso seja necessário empregar intensidades de correntes elétricas superiores àquelas que a fonte de energia pode suportar, é possível obter altas correntes ligando duas fontes em série;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "a5a2cbc9-b02b-484e-8ab0-baf78b5b19b6", content: "B) Uma das grandes desvantagens deste processo é sua limitação à posição plana;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "5c4e6a8f-f017-4105-81f3-bf63cd605495", content: "C) O transformador é o único tipo de fonte de energia que pode ser utilizada neste processo. Soldagem feita com corrente contínua introduz grandes quantidades de descontinuidades na junta soldada;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "c7a0e7d8-fc61-456b-837c-4124262e430a", content: "D) Este processo é indicado para ser empregado apenas em juntas de topo, preferencialmente para espessuras menores do que 10 mm;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "dff7c87f-6fff-4bf6-90e9-e90baf314a6f", content: "E) Cuidados devem ser tomados quanto à regulagem da tensão do arco, pois altas tensões aumentam o consumo do fluxo empregado, produzindo uma alteração na composição química do metal de solda;", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "37e2d7ba-6171-4c44-b17c-e84d8e971f9e",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 22",
        content: "Resolva a questão abaixo.",
        position: 58,
        activity: {
            id: "7a7f734b-a4f0-4ba2-824b-3fbdbf5f2abd",
            activity_type: "multiple_choice",
            statement: "Analisando especificamente o processo a arco submerso (SAW), marque a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "4eb607dd-5552-4a76-9068-b310d159ba09", content: "A) Quanto maior o stickout (comprimento do arame que sai do bico de contato e vai até à sua extremidade), maior é a taxa de deposição;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "a3768249-bd55-4539-8a06-e43230afb092", content: "B) Se uma mesma intensidade de corrente elétrica percorre ao longo de dois arames com diâmetros diferentes, pode-se afirmar que o arame de menor diâmetro produzirá cordões de solda com uma penetração menor.;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "145d34ae-b35c-44d8-96a9-82a0e9081fdf", content: "C) Quanto maior o valor da tensão, maior será o comprimento do arco elétrico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "60f90ed3-92fa-4bd0-93bb-b3adc9f91bd1", content: "D) Quanto maior a intensidade de corrente elétrica, maior será a penetração dos cordões de solda;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "0914e998-efd6-4a1b-90d6-04bf716f2ee9", content: "E) Quanto menor a velocidade de soldagem, maior será a penetração dos cordões de solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "f892c6a0-13ba-4d1e-9fec-430003e238dc",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 23",
        content: "Resolva a questão abaixo.",
        position: 59,
        activity: {
            id: "b731cea0-208f-4a6e-b1a7-d591c1bcd6bd",
            activity_type: "multiple_choice",
            statement: "Todas as descontinuidades apresentadas abaixo são possíveis de serem produzidas pelo processo a arco submerso (SAW), porém uma delas tem a maior chance de ser produzida. Marque esta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "ac960715-b02e-4fe2-b39f-8786355b614f", content: "A) Falta de penetração;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "24db9d67-f886-4fca-b5bf-7bccc897579f", content: "B) Trinca em estrela;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "b85bffb3-51c1-401c-a231-aae8904a24d6", content: "C) Trinca na margem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "e34ccd72-5e57-4094-91b6-904d01a51e22", content: "D) Perfuração;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "06511b0c-bc50-4d4c-9db5-18c29524b061", content: "E) Falta de fusão.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "4c7118f7-fd06-41dc-a8c2-2f9e2e529058",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 24",
        content: "Resolva a questão abaixo.",
        position: 60,
        activity: {
            id: "a707715d-8b18-4436-b0c3-cd7e02d8d0d8",
            activity_type: "multiple_choice",
            statement: "Na soldagem do Alumínio e suas ligas, utilizando o processo TIG (GTAW), identifique a alternativa correta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "45e06d01-6831-4709-b4e4-13222a167c28", content: "A) Tipo de corrente ideal: Corrente Alternada;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "2825bbce-96b5-45bc-901f-e51410d2c08e", content: "B) Tipo de eletrodo de tungstênio: acrescido de 2,0% de Óxido de Tório (ThO2), classificação AWS EWTh-2;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "e0fd1977-0d9d-490b-86dc-92ddfafb7615", content: "C) Tipos de corrente e polaridade ideais, respectivamente: Corrente Contínua e Polaridade ideal: Direta (eletrodo ligado ao pólo negativo);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "432c0456-8f9c-493c-9437-1eff477fe1e4", content: "D) Para obter um arco elétrico de grande estabilidade, a ponta do eletrodo de tungstênio deve ter um ângulo de 15ºC, se parecendo com a ponta de um lápis apontado;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "a2f62c92-b8eb-4758-bf15-9e3ddde8e325", content: "E) O gás ideal para soldar chapas de alumínio, com espessuras em torno de 50 mm, é o Argônio (gás inerte).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "ea042c87-37ee-47db-ad41-9c64e28521eb",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 26",
        content: "Resolva a questão abaixo.",
        position: 61,
        activity: {
            id: "a06d73ed-a1b3-4781-bbc2-fe9291d0f70e",
            activity_type: "multiple_choice",
            statement: "No que diz respeito às vantagens do processo de soldagem oxi-gás, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "b4f5f28a-415b-449f-ac33-f01e7de45c9b", content: "A) Umas das maiores vantagens do uso deste processo é o grau relativamente baixo da habilidade requerida do soldador.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "17a66433-5b12-44ee-ac65-15a135a19f25", content: "B) É um processo relativamente barato e é altamente portátil;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "f6bca2fa-a309-413b-8e0a-92afb8955d90", content: "C) Assim como o processo manual com eletrodo revestido, o processo oxi-gás pode ser usado em todas as posições de soldagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "645c0959-d2bb-4278-b2a1-6eaf55b1ef6f", content: "D) Os equipamentos de soldagem usados neste processo podem ser usados em outras operações, como por exemplo: brasagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "ee89b993-7441-485c-b96d-3ddfe0a6d63e", content: "E) Este processo pode ser usado para soldar chapas e tubos com espessuras finas e médias.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "da35208c-f1bb-479f-998e-6ccbfb5914d9",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 28",
        content: "Resolva a questão abaixo.",
        position: 62,
        activity: {
            id: "8c40c2e0-e5c6-4b16-87a5-2e231d18e1ce",
            activity_type: "multiple_choice",
            statement: "Das descontinuidades possíveis de serem produzidas na soldagem do aço carbono, quando empregado o processo de soldagem oxi-gás, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "69aa26c5-1a35-4287-90da-3d77cafe6695", content: "A) Quando a chama é do tipo Oxidante, frequentemente são encontradas descontinuidades do tipo Falta de Fusão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "34e53fe9-19eb-486d-97bd-ddb77d78ff51", content: "B) A Falta de Fusão pode ser produzida quando o soldador utiliza a chama normal, porém, manipulando-a incorretamente;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "4a393eeb-e33a-41fc-92ea-e9abd50aeb3e", content: "C) Devido à rápida velocidade de resfriamento da junta soldada por este processo, a trinca a frio é uma das descontinuidades mais produzidas;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "09f0cf07-29d7-4f6e-9b58-c5b2d26e82db", content: "D) Descontinuidades do tipo Inclusão de Escória pode ser produzida quando se utiliza chama do tipo Oxidante;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "f02562be-f42a-4c7c-9d32-a51554f1692c", content: "E) Porosidade, Mordedura e Sobreposição são descontinuidades muito comuns neste tipo de processo. São falhas atribuídas diretamente ao soldador.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "3b239403-2420-40ea-a1ee-9e9f8c9f732a",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 29",
        content: "Resolva a questão abaixo.",
        position: 63,
        activity: {
            id: "3df6121c-f6fe-45c0-be77-d47307a3fec8",
            activity_type: "multiple_choice",
            statement: "Em relação às técnicas conhecidas como “Soldagem à Direita” e “Soldagem à Esquerda” empregadas no processo de soldagem oxi-gás, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "debe88e7-eb0b-4a5d-b194-7574c31d953d", content: "A) Utilizando a técnica “Soldagem à Direita”, a vareta desloca-se atrás da chama, no sentido da soldagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "6106c9c2-1e7f-46c6-a3b7-36a5c355169e", content: "B) Utilizando a técnica “Soldagem à Esquerda”, a vareta desloca-se à frente da chama, no sentido da soldagem", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "03e4e86a-b3d6-451f-ab16-7dfe702cc70a", content: "C) A técnica “Soldagem à Direita” é mais rápida e econômica do que a técnica “Soldagem à Esquerda”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "b1491ae3-6594-4172-bcc6-b3d9b2314ce9", content: "D) A técnica “Soldagem à Esquerda” é mais lenta, consome mais gás, produz soldas com melhor acabamento se comparada à técnica “Soldagem à Esquerda”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "d89ad698-7d5d-4942-b0df-0ac58025666d", content: "E) Esta convenção de técnicas de ”Soldagem à Direita” e “Soldagem à Esquerda” foi estabelecida apenas para os soldadores destros, ou seja, que usam a mão direita para escrever um texto. Para os soldadores canhotos, ou seja, usam a mão esquerda para escrever, o nome das técnicas tem que ser invertido.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "551d96e7-fe09-4394-9ffc-870c9c5aa271",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 64,
        activity: {
            id: "ece9e1d3-b4b1-4435-9097-68723b81ab92",
            activity_type: "multiple_choice",
            statement: "4 Dependendo do volume de cada gás em uma determinada mistura, são obtidos três tipos de chama distintos: Normal, Oxidante e Redutora. Em relação a estas diferentes chamas, marque a alternativa incorreta: ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "9cfb4c69-c1e7-4224-b2d5-375ed614bd5c", content: "A) Uma chama produzida por uma mistura gasosa, contendo um volume de Acetileno maior do que o do Oxigênio, esta é conhecida como “Chama Oxidante”. Uma das características deste tipo de chama é criar uma junta soldada bastante oxidada, com baixa resistência mecânica e baixa tenacidade;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "24a1149d-826c-40a2-9b83-915b37238f46", content: "B) Uma chama, produzida por uma mistura gasosa contendo um volume de Oxigênio maior do que o do Acetileno, esta é conhecida como “Chama Redutora”; este tipo de chama é próprio para soldar latão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "fd5f04f4-e506-4b80-ba2c-fa87da27cc6d", content: "C) A chama do tipo “Oxidante” caracteriza-se em introduzir uma certa quantidade de carbono (proveniente da queima do Acetileno) no metal de solda, tornando-o poroso e quebradiço;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "a55f9602-d1da-4916-87c1-b661debe8d25", content: "D) Enquanto a “Chama Oxidante”, por ser mais turbulenta, apresenta um ruído característico, a “Chama Redutora” produz uma terceira região (além do cone e de um Penacho de cor esverdeada), apresentando uma luminosidade característica e intensa;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "3b768ec8-7299-49be-b0d2-35441ae71509", content: "E) Uma chama produzida por uma mistura gasosa, contendo volumes iguais de Oxigênio e Acetileno, esta é conhecida teoricamente como “Chama Normal”. Na prática, isto é impossível de se obter. As chamas produzidas neste processo são geralmente do tipo “Redutoras” ou “Oxidantes”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "a1190836-bc0c-403e-8f8d-952a89355c72",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 31",
        content: "Resolva a questão abaixo.",
        position: 65,
        activity: {
            id: "48c62123-85dc-40b6-a674-2f7f3b6d7b5c",
            activity_type: "multiple_choice",
            statement: "Das descontinuidades possíveis de serem produzidas na soldagem do aço carbono empregando o processo de soldagem MIG/MAG (GMAW), assinale aquela que é característica deste processo. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "76504067-578e-46be-a232-4d7356358c03", content: "A) Trinca interlamelar;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "a9fb0fec-7a5f-450a-a15c-95149b582af1", content: "B) Inclusão de escória;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "18904c0a-0d52-41d6-a5d0-4e6166cb1522", content: "C) Mordedura na raiz;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "c10aef64-43d5-4bc9-805b-f58dd7c34143", content: "D) Sobreposição;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "5b16482a-e5b8-413f-b6b9-ea9690e6cb9e", content: "E) Falta de fusão.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "58f8e0f9-9ff0-44bc-ad27-76f4ffb559d8",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 66,
        activity: {
            id: "c1085e66-8e78-47ce-9d31-9e80ba9d001d",
            activity_type: "multiple_choice",
            statement: "5 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "9e6db283-8949-4e17-b1b1-ace919a08785", content: "A) Para que o arco elétrico seja aberto instantaneamente neste processo é imprescindível que o soldador toque o metal de base com a ponta do eletrodo de tungstênio;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "f03dfdbf-1cd6-4c05-91b3-509253044c3a", content: "B) Pelo fato da vareta empregada no processo TIG manual ser isenta de revestimentos e fluxos que tenham substâncias que purifiquem a poça de fusão durante a soldagem, isto torna de grande importância a necessidade de realizar uma excelente limpeza no interior da junta que será soldada e adjacências;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "e348d0c8-948f-4ee3-aab5-d538b4a56d35", content: "C) Objetivando evitar um grande desgaste da ponta do eletrodo de tungstênio pelo bombardeamento de elétrons durante a soldagem de aço carbono, é recomendável o emprego da corrente do tipo “contínua”, polaridade invertida;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "ce461999-3567-4b15-a7fb-1ce264062820", content: "D) Na soldagem de metais que, quando oxidados durante a soldagem, geram óxidos do tipo “refratários” (como por exemplo: Magnésio e Alumínio), é fundamental o uso de um transformador, que seja capaz de gerar uma corrente do tipo “contínua”, polaridade direta;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "c86a9a64-d4c5-40fc-ad3f-571004672206", content: "E) O eletrodo de tungstênio puro passou a não ser mais utilizado no processo TIG após a chegada, no mercado, dos eletrodos que possuem em suas superfícies óxidos de Tório, óxidos de Lantano, entre outros.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "7c33d52a-edab-4b46-b2e5-80a75405045f",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 5",
        content: "Resolva a questão abaixo.",
        position: 67,
        activity: {
            id: "61544d60-80ac-4925-ba57-4c4da88b3c34",
            activity_type: "multiple_choice",
            statement: "rames ao mesmo tempo; ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "5fb4ef86-7986-4afd-af50-1d5769e399f5", content: "B) Devido ao uso de fluxos, as soldas produzidas por este processo possuem uma alta qualidade;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "fa2406e2-a522-4c3a-abfe-429831ace4ea", content: "C) Tendo em vista que o arco elétrico encontra-se submerso ao fluxo, isto torna desnecessário que o soldador se preocupe quanto ao volume de fluxo depositado sobre o arco;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 2 },
            { id: "1fc210fa-c4b1-4f97-ad2c-b85a91effcef", content: "D) Analisando as vantagens sobre o ângulo da proteção da soldagem, este processo gera um baixo volume de fumaça;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 3 },
            { id: "b335dcc4-b742-464f-b265-dcef20827480", content: "E) Minimizando os requisitos de proteção, nenhum arco elétrico fica visível durante a soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "2b89d3a4-4fff-4d49-8c3f-dc25d8704804",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 35",
        content: "Resolva a questão abaixo.",
        position: 68,
        activity: {
            id: "a24f09ca-9399-4d98-b961-3e6181fc7377",
            activity_type: "multiple_choice",
            statement: "Quanto aos tipos de correntes, polaridades e outros temas relevantes ligados ao processo a arco submerso (SAW), identifique a alternativa correta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "7d5b63e1-92e4-4272-af11-9ba54efd52d7", content: "A) Para evitar o fenômeno conhecido com “sopro magnético” durante a soldagem, é recomendável o uso de fontes de energia que gerem corrente alternada;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "682fcd3f-1fab-4b4c-9fcf-e7ced7ca6d76", content: "B) A característica estática típica dos retificadores próprios para este processo é conhecida como característica “tombante” ou “corrente constante”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "426483c9-9e62-49b9-835b-5672ce58fb70", content: "C) O uso da corrente alterna permite melhor controle do formato do cordão de solda, assim como a profundidade de penetração;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "22e1ce5e-29b2-45f1-bb45-b2ffeee964f6", content: "D) Umas das desvantagens deste processo é a limitação das fontes de energia no que se refere à faixa de corrente. Normalmente, essas fontes geram corrente elétrica, máxima, de 500A;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "72c19773-e1d4-4b60-8731-24339b4b956e", content: "E) Apesar de pouco utilizada, a corrente do tipo “contínua”, polaridade inversa, produz as maiores taxas de deposição, se comparadas com a polaridade direta.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "3a088a2e-b871-46ab-8e32-5e35b9ee2b1c",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 69,
        activity: {
            id: "9ee077d1-f4aa-4c3d-877b-8b7ecd51d020",
            activity_type: "multiple_choice",
            statement: "7 ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "c5e7d2b4-c6b7-4156-8911-907cfc33faeb", content: "A) Sistema de controle;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "5918a413-1846-4986-a265-b63dec9c00d5", content: "B) Dispositivo de alimentação de fluxo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "9df1e138-761b-4496-b875-96c9145b6822", content: "C) Sistema de movimentação;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "71509341-4747-4abc-8d0f-d2ad926ee59f", content: "D) Alimentador de arame;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "aa974110-4df4-4f46-8863-ef8211ad2179", content: "E) Fonte de alta frequência.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "f62549ad-1845-49f8-aefe-b069860ad1c1",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 39",
        content: "Resolva a questão abaixo.",
        position: 70,
        activity: {
            id: "0cf5ab32-e572-49ef-8b7e-81b89d3a83e8",
            activity_type: "multiple_choice",
            statement: "Quanto às características relativas ao processo de soldagem Arame Tubular (FCAW), identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "54875157-1adc-42d7-8c88-931ce92e3cfe", content: "A) Os modos de transferência metálica (curto-circuito, globular, spray) utilizados neste processo podem ser os mesmos que existem no processo GMAW convencional;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "fdce70cd-12e4-43f6-9231-deb3dcbd2d69", content: "B) As soldagens executadas com este tipo de arame apresentam sempre uma camada de escória que cobre total ou parcialmente o cordão de solda; esta escória deve ser removida antes da deposição de um novo cordão, tal qual no caso da soldagem com eletrodos revestidos;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "8bd285a6-f492-48c2-8f7a-5ef02a868a4f", content: "C) Além da proteção, os fluxos podem desempenhar outras funções, semelhantes às dos revestimentos dos eletrodos, como por exemplo: desoxidar e refinar o metal de solda e fornecer elementos que promovam a estabilização do arco elétrico, entre outras;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "b1e39d88-b177-46d0-a5ad-4615713b6289", content: "D) O arame tubular do tipo “auto-protegido”, pelo fato do fluxo interno ser capaz de gerar sua própria proteção gasosa, ele é altamente indicado para ser empregado em áreas abertas (externas às oficinas);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "4ceb1d5b-2e1f-42ed-8da5-30726fecb9b3", content: "E) É muito comum neste processo usar dos benefícios fornecidos pela variação do stickout (extensão livre do eletrodo); objetivando obter maiores taxas de deposição, usando o arame tubular, aconselha-se o uso de pequenos stickouts.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "13f9e390-f992-4ba6-a29d-6e37fc86f0ed",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 40",
        content: "Resolva a questão abaixo.",
        position: 71,
        activity: {
            id: "c2090231-7e49-400b-b39e-dce88ecc69d9",
            activity_type: "multiple_choice",
            statement: "Como qualquer outro processo de soldagem, o processo com arame tubular também produz descontinuidades na região da junta soldada.  Das descontinuidades apresentadas a seguir, identifique aquelas que são produzidas especificamente pelo processo em questão. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "a47896fc-9b44-4d07-910b-01180dc52aa1", content: "A) Embicamento e Deformação angular;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "fced3fe8-7388-4954-ad0d-487b06626c91", content: "B) Desalinhamento e Penetração excessiva;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "86ccf19e-8ce5-4474-ba34-5268268242dd", content: "C) Rechupe de cratera e Reforço excessivo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "4adf0f2a-d8ff-46d6-a847-98a6307f21df", content: "D) Falta de fusão e inclusão de escória;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "8db50779-b9e0-4d87-b624-b5a95fd75977", content: "E) Sobreposição e respingos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "772e929c-4150-44d7-99ff-0e361374bf65",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 20",
        content: "Resolva a questão abaixo.",
        position: 72,
        activity: {
            id: "a447fcca-079d-446b-9f36-d336e9d08ef7",
            activity_type: "multiple_choice",
            statement: "; ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "17f48ee6-54b3-4896-aa25-53ee01da732e", content: "C) O uso da transferência metálica do tipo “spray” (ou “névoa”) é uma das maneiras adotadas para aumentar a produtividade da construção da obra, porém, este tipo de transferência só poderá ser obtida a possibilidade irá depender do tipo de gás (ou mistura gasosa) utilizada;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 1 },
            { id: "12430ad5-3425-45a7-9618-2bd9dbc73c6d", content: "D) Para permitir a transferência do tipo “pulsada”, basta que se acople uma fonte de alta freqüência junto ao cabeçote do retificador;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "6d602bbf-f70c-4790-95d8-c74516dad189", content: "E) O aumento da produtividade conferido pelo uso da transferência metálica do tipo “spray” pois possibilita a soldagem das juntas de ângulo na posição vertical, progressão descendente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 3 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "51262e10-3964-4b59-85dd-2d36603b1e41",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 42",
        content: "Resolva a questão abaixo.",
        position: 73,
        activity: {
            id: "5a304145-29a3-40d3-b98b-71e0bb1df863",
            activity_type: "multiple_choice",
            statement: "Sabendo-se que as transferências metálicas que ocorrem nos processos MIG/MAG (GMAW) e FCAW podem ser do tipo “spray” (ou “névoa” ou “pulverização axial”), “curto-circuito”, “globular” e “pulsada” (ou “arco pulsante”), marque a alternativa correta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "8455c74c-bb16-49f0-8ed3-e06d54c803a5", content: "A) Tendo em vista que a transferência por “curto-circuito” caracteriza-se no fato do arco elétrico se abrir e fechar 120 vezes por minuto, isto dificulta bastante o uso deste tipo de transferência nas posições vertical e sobre-cabeça;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "0f6f1550-d39d-430f-a468-40e075b5adfe", content: "B) Misturas ricas em Argônio, associadas a altos valores de corrente elétrica e tensão, permitem que seja obtida a transferência metálica do tipo “spray”;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "f8965d76-1d5c-45bc-8d0e-18eec67d57c7", content: "C) As transferências metálicas apresentadas no enunciado da questão podem ser obtidas variando apenas as intensidades de corrente elétrica (A) e os valores de tensão (V). Em uma ordem crescente dessas variáveis (I e V) podem-se obter os modos  “globular”, “spray” (ou “névoa” ou “pulverização axial” e “curto-circuito” (nesta sequência);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "7b21aa3c-c659-44db-9c9a-fa8e266d52d3", content: "D) Na transferência metálica do tipo “globular”, a fusão inicia-se globularmente e a gota vai aumentando de tamanho até tocar a poça de fusão, produzindo um grande clarão, extinguindo o arco logo em seguida;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "2726be2f-a172-4d11-9d04-151e1ac0b405", content: "E) As soldagens realizadas com transferências metálicas por “arco pulsante” e por “curto circuito” são adequadas para soldagem na posição plana.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "38bab0ef-0dfa-460c-8cbc-30eb7daea417",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 43",
        content: "Resolva a questão abaixo.",
        position: 74,
        activity: {
            id: "a060af84-0f65-4ceb-b69f-2f8a553999d4",
            activity_type: "multiple_choice",
            statement: "O processo de soldagem manual com eletrodo revestido é conhecido como aquele que apresenta a maior flexibilidade entre aqueles usados na indústria. Analisando as afirmativas a seguir, indique aquela que não cabe no contexto da questão. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "8932188c-9d8e-4b9d-ae1f-ae7354f768b9", content: "A) Os cabos referentes a este processo são tão flexíveis, que 10 metros de cabo são capazes de ocupar um mínimo espaço no almoxarifado;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "66b846cf-0b56-41f1-941e-a93dab27e314", content: "B) Processo usado na soldagem da maioria dos metais encontrados na indústria;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "3edace25-d2d6-4a58-babc-17660a8e29e6", content: "C) Existem eletrodos revestidos que podem ser usados em todas as posições de soldagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "ee9f0705-f21f-473e-b417-e7000afb3968", content: "D) Permite ser utilizado numa ampla faixa de espessura, assim como em todos os tipos de juntas;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "9973ee08-2fdc-4741-b66d-f10e6aacbc47", content: "E) Permite ser usado em espaços confinados e seus consumíveis de soldagem são facilmente encontrados no mercado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "f7850dae-012e-4219-a144-52700a9c4d7b",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 44",
        content: "Resolva a questão abaixo.",
        position: 75,
        activity: {
            id: "629ad7be-006c-4a39-8f31-8ea203c2a4db",
            activity_type: "multiple_choice",
            statement: "Comparando o processo de soldagem manual com eletrodo revestido (SMAW) com outros processos de soldagem empregados usualmente na indústria, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "045cdaff-70d1-495d-8bec-1778d9ca7ebb", content: "A) O processo com eletrodo revestido (SMAW) apresenta uma taxa de deposição inferior aos processos como MIG/MAG (GMAW), arame tubular (FCAW) e Arco submerso (SAW);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "de17c993-e1bf-4e7c-994c-96516e186f1e", content: "B) O processo com eletrodo revestido (SMAW) apresenta um baixo Fator de Ocupação ou Fator de Trabalho (Relação entre o tempo que o soldador permanece com o arco elétrico aberto e o tempo total de trabalho) em relação aos processos semi-automáticos e automáticos;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "7ef50f9b-518d-49f1-989c-d6636793394e", content: "C) O processo com eletrodo revestido (SMAW) exige um período de treinamento para o soldador maior do que para os processos de soldagem semi-automáticos e automáticos;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "352460c2-d21a-4748-b31e-5f6fa6213400", content: "D) Apesar de ser um processo manual, o processo SMAW é o mais utilizado tanto na indústria brasileira, como nos países mais desenvolvidos;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "d7bb786c-3bd6-4eee-bc2a-5cae54a7d377", content: "E) Como o processo com eletrodo revestido é considerado de baixa produtividade, isto faz com o mesmo não seja indicado para soldar espessuras superiores a 40 mm.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "f4f28a8d-5dd2-4bc7-a624-dc63da405f3d",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 45",
        content: "Resolva a questão abaixo.",
        position: 76,
        activity: {
            id: "66a08e3b-78e3-4501-9a9c-c73d7c9e4ef5",
            activity_type: "multiple_choice",
            statement: "Das descontinuidades possíveis de serem produzidas pelo processo de soldagem manual com eletrodo revestido (SMAW), marque a alternativa a seguir que menos chance tem de ser produzida por este processo. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "48744d3e-7051-439b-914f-387f30bca13c", content: "A) Inclusão de escória;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "c50d054f-1ff2-4ee9-9c22-e6a4d5437c23", content: "B) Falta de fusão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "6a6f62e0-44e4-4fec-a26c-437969c1ea2e", content: "C) Trinca de cratera;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "e82c2110-2494-4ada-80af-94881e3256af", content: "D) Porosidade;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "038182b3-a4d8-42fd-a666-3cbfa4f5912a", content: "E) Desalinhamento.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "41fc15e6-7320-47f7-b6fe-53d59405482f",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 46",
        content: "Resolva a questão abaixo.",
        position: 77,
        activity: {
            id: "74da6fc3-9626-4fac-8439-8602e02986bf",
            activity_type: "multiple_choice",
            statement: "Quais são os consumíveis de soldagem específicos para o processo de soldagem Eletroescória (ESW)? ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "5ef1967c-95cb-40b4-8dbb-7716851ca07a", content: "A) Fluxo, gás e arame sólido;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "23cda7c8-4470-4352-8007-24f32447d800", content: "B) Fluxo, gás e guia-consumível;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "7d699d50-b279-469d-97b8-4765c64729d9", content: "C) Arame sólido ou arame tubular, fluxo e guia-consumível;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "f47c5ac3-18b8-4bcb-a935-091954b9c96b", content: "D) Arame tubular, gás e fluxo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "f03d2e9c-bba5-4a50-b6d7-10ec30b3d7b5", content: "E) Arame sólido ou arame tubular e guia-consumível.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "80519073-b482-47f2-af25-2a355fc18e91",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 48",
        content: "Resolva a questão abaixo.",
        position: 78,
        activity: {
            id: "949b12d3-8e12-49b7-be15-aa24b76909cf",
            activity_type: "multiple_choice",
            statement: "Em relação às características do processo de soldagem por eletroescória (ESW), assinale a alternativa correta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "fbb4d04a-5797-4699-b1c8-4b96333ddbdb", content: "A) O processo de soldagem por eletroescória, assim como os processos: manual com eletrodo revestido, MIG/MAG (GMAW), arco submerso (SAW), entre outros, pertence ao grupo dos processos de soldagem que usam o arco elétrico como fonte de calor;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "2c9d518a-14f2-4774-8f7a-f0ca6d791162", content: "B) A passagem da corrente elétrica pela escória fundida produz uma temperatura, máxima, de 1.400ºC, suficientemente alta para fundir o metal de adição e a peça (feita de aço);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "5f31ca5b-04e5-44f2-bb34-a9f852d2bb75", content: "C) O arco elétrico, gerado inicialmente entre o eletrodo e a peça metálica, tem a função apenas de iniciar a soldagem, fundindo o fluxo. Nesse momento, o arco se extingue e a escória fundida passa a ser aquecida pela passagem da corrente elétrica, o que permitirá fundir o eletrodo e a peça;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "4cf09450-fab1-4f4f-9767-5779356241ba", content: "D) O processo por eletroescória é ideal para ser usado na soldagem de juntas cuja espessura não seja superior a 25 mm;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "6b35985b-d586-4b5c-98d3-fa8ae71214a8", content: "E) O transformador usado neste processo deve gerar intensidades de corrente na faixa 500 – 1000ºC, para um Ciclo de Trabalho a 100%..", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "3d23986e-2b87-4737-91d1-565a77214940",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 49",
        content: "Resolva a questão abaixo.",
        position: 79,
        activity: {
            id: "98715a9a-5764-4f1a-9cf4-0d39505fab32",
            activity_type: "multiple_choice",
            statement: "Das alternativas a seguir, assinale qual delas não é função do fluxo empregado no processo por eletroescória (ESW). ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "19c9cf0d-4ace-44cb-a2cc-570e516fe5fd", content: "A) Conduzir a corrente elétrica de soldagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "08ffdc97-8b81-45e3-8fb1-2f262bfb5792", content: "B) Fornecer calor para fundir o eletrodo e o metal de base;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "ed33efe7-34de-4ab1-aeb7-3fc7c23afb40", content: "C) Possibilitar uma operação estável;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "3c5e91fd-0367-4678-a5ca-53697157bd08", content: "D) Evitar com que a poça de fusão funda as sapatas de cobre;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "13380597-2ed7-4ba8-a3cb-075940ec2c92", content: "E) Proteger o metal fundido do ar atmosférico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "e366f291-1eb3-4b43-8426-9609f4e0857d",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 80,
        activity: {
            id: "56a54c1d-3653-4cae-bb48-e833726dbcef",
            activity_type: "multiple_choice",
            statement: "3 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "504f6856-2636-4740-bbf0-86489d411457", content: "A) Tendo em vista que este processo é limitado ao uso de um único eletrodo, a taxa de deposição (kg/h) produzida assemelha-se àquela produzida pelo processo MIG/MAG (GMAW);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "8fa4c535-f043-4c3e-934b-127b7b9f4ef3", content: "B) Como o deslocamento da fonte de calor durante a soldagem é feito muito lentamente, isto provoca um superaquecimento do metal de base, principalmente em sua ZTA, produzindo, nesta região, grãos extremamente grosseiros;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "8fd2355f-f2da-4fdb-a81d-a21edede12be", content: "C) Cuidados devem ser tomados no que diz respeito à regulagem da corrente elétrica e tensão, visto que, a proporção que a obra vai-se aquecendo durante a soldagem, os valores dessas variáveis precisam ser reajustados continuamente;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "8724015f-53de-43cd-9218-b349bd845b58", content: "D) O emprego do processo por eletroescória (ESW) é limitada à junta de topo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "b2b3ddfa-77e1-4ec2-8dd4-09a7b025651c", content: "E) Como no processo por eletroescória (ESW) não são usados dispositivos auxiliares de montagem ao longo da junta, o índice de reparo causado por distorção (embicamento) é extremamente grande.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "114e3bc1-b80e-4ea2-a538-29730df4e011",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 51",
        content: "Resolva a questão abaixo.",
        position: 81,
        activity: {
            id: "d96e395c-264b-4324-bb25-f5340bc28a38",
            activity_type: "multiple_choice",
            statement: "Das descontinuidades possíveis de serem produzidas pelo processo de soldagem por eletroescória (ESW), marque a alternativa que raramente ocorre neste tipo de processo. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "cf3afa21-7992-4e73-83bc-db895784bf01", content: "A) Trinca interlamelar;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "97328159-aabf-4b40-be8a-e5ed92d56f81", content: "B) Falta de fusão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "bd632722-6c44-4aa5-8ab8-5e27bef68718", content: "C) Inclusão de escória;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "68e01b87-8578-4e44-8040-4fc6052eed18", content: "D) Sobreposição;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "42f9d70d-3a26-43b6-8a49-671820996445", content: "E) Porosidade.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "80fe479c-42b5-444f-98fe-b462d894e5c1",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 52",
        content: "Resolva a questão abaixo.",
        position: 82,
        activity: {
            id: "c2868cf4-316d-4684-8238-17e5510bd5f4",
            activity_type: "multiple_choice",
            statement: "Os processos de soldagem por eletroescória (ESW) e por eletrogás (EGW) são semelhantes em muitos aspectos. Assinale a alternativa que diferencia ambos os processos. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "f8e0cddb-b1ba-44a1-99df-65b1389ae336", content: "A) Uso de sapatas de cobre para retenção da poça de fusão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "345fc7fb-67d2-49b4-aa60-c05c2cab0601", content: "B) Os metais de adição podem ser tanto arame sólido como arame tubular;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "b5da0580-62cd-4ea8-a589-6775adf650dc", content: "C) Mesmos tipos de fontes de calor;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "e11a3a37-6191-435b-b57a-9ff605da8353", content: "D) A soldagem feita em um único passe;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "c15ad1b6-0d31-4773-907c-28e979707baa", content: "E) A ZTA das juntas soldadas por ambos os processos apresentam grãos extremamente grosseiros.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "5b2cbfe4-bd7f-4ec7-bac8-b33783842e7b",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 53",
        content: "Resolva a questão abaixo.",
        position: 83,
        activity: {
            id: "dc697f49-f0b8-4174-8fd1-c24832ea16d7",
            activity_type: "multiple_choice",
            statement: "Em relação às características do processo de soldagem por eletrogás (EGW), marque a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "88d5aaf4-7a49-4251-b144-337c754ae0b9", content: "A) Caso o metal de adição a ser usado na soldagem seja o arame tubular, a atmosfera protetora será realizada pelo gás CO2;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "c384c61a-b571-4363-b20c-3b42955f4181", content: "B) Empregando o arame sólido como metal de adição, usa-se preferencialmente a mistura gasosa 80% Argônio e 20% CO2;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "24b99970-99e6-4855-a4ca-6e970d445f70", content: "C) Os metais de base a serem soldados pelo processo por eletrogás (EGW) são os mesmo que podem ser soldados pelo processo MIG/MAG (GMAW);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "96f47c24-a2a1-4dd3-8672-1e41ef9a895d", content: "D) Para o processo por eletrogás (EGW) usa-se corrente do tipo contínua, polaridade inversa;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "68b0d2ee-aeb2-4ffc-9747-a79e9633e1b1", content: "E) Não se deve usar o arame tubular auto-protegido como metal de adição, visto a obrigatoriedade do uso de um gás (ou mistura gasosa) na execução da solda.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "7cbddacb-b132-43b9-b927-9d258bad5e33",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 54",
        content: "Resolva a questão abaixo.",
        position: 84,
        activity: {
            id: "d23a1662-1899-4190-9a77-4728de25f77c",
            activity_type: "multiple_choice",
            statement: "Das descontinuidades possíveis de serem produzidas pelo processo de soldagem por eletrogás (EGW), marque a alternativa que raramente ocorre neste tipo de processo. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "9dc71a2f-028c-42da-847b-2a6d11f618be", content: "A) A porosidade pode ser produzida neste processo, quando houver algum tipo de vazamento de água, utilizada para resfriar as sapatas;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "bdb68482-1ac9-4b80-b8e2-ad66aaea0e8f", content: "B) O surgimento de trincas a frio são extremamente raros, tanto no metal de solda, quanto na ZTA. tendo em vista que a velocidade de resfriamento da junta soldada por este processo é muito lenta;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "66494995-2e3e-4a95-9e42-67e3be87ce1e", content: "C) Trincas a quente são possíveis de serem produzidas, caso o metal de base tenha em sua composição química altos teores de enxofre;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "eddfb289-c77b-407c-859f-0bb9ea371469", content: "D) Concavidade excessiva é uma descontinuidade típica, quando a velocidade de soldagem adotada é muito superior àquela estabelecida na EPS;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "2f5138f4-9731-4d84-816f-d8bc2808330f", content: "E) Descontinuidade do tipo sobreposição ocorre, quando as sapatas de cobre são mal posicionadas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "ff628e10-44e2-460b-ad1a-f56befa1e691",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 85,
        activity: {
            id: "7f39369e-4ee3-4ec4-a9aa-895fc2f7b970",
            activity_type: "multiple_choice",
            statement: "5 ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "4072309b-7989-4698-9bb3-5282465b8dec", content: "B) O alimentador de arame relativo a este processo é similar ao utilizado no processo MIG/MAG (GMAW) automatizado;;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 1 },
            { id: "4a146deb-1109-4b62-b8c2-09e865a84dc7", content: "C) Há um mecanismo próprio responsável pela oscilação da pistola de soldagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "83f48a17-6474-4afd-864b-d52797e88185", content: "D) Para o caso do uso de arame sólido ou arame tubular com proteção gasosa, é fundamental a presença de equipamento para suprir o gás de proteção", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "a5d7be9d-afa5-46c6-ae5f-b1431c8c7bb5", content: "E) As sapatas utilizadas neste processo são feitas de cobre, apresentando em seu interior canais que permitem a passagem de água para a sua refrigeração.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "64018fe4-d3d9-4390-be7b-6ff04874bd7e",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 56",
        content: "Resolva a questão abaixo.",
        position: 86,
        activity: {
            id: "43fb690f-0267-4550-8948-f5ea8f8fa6b0",
            activity_type: "multiple_choice",
            statement: "Identifique a seguir qual alternativa não corresponde aos consumíveis de soldagem empregados no processo de soldagem por eletrogás (EGW). ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "b2366a36-489b-4f15-a82d-19999c5b225a", content: "A) Guia-consumível, arame sólido, gás (quando necessário) e fluxo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "2f129905-077b-4814-afd7-f7051a39b953", content: "B) Arame tubular (podendo ser tanto o “auto-protegido”, quanto o que necessita de uma proteção externa de gás) ou arame sólido e gás (quando necessário);", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "350455d9-93dd-47a8-971b-3bae9efbe380", content: "C) Fluxo, guia-consumível e, arame sólido;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "b0ca09e5-045c-4f27-ac21-9e82edcdae8f", content: "D) Arame tubular (“auto-protegido”), gás e fluxo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "2dbad05e-a145-4783-a855-0137b5c339ad", content: "E) Arame tubular (que necessita de uma proteção externa de gás), guia- consumível e fluxo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 },
            { id: "45c140fd-e1f1-4ca4-b9c6-0340930b1c3a", content: "F) Fluxo, guia-consumível e arame sólido.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 6 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "55271ab8-a0d5-4166-84d5-295af3574dab",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 58",
        content: "Resolva a questão abaixo.",
        position: 87,
        activity: {
            id: "3d2561d9-af01-4fc8-8774-639e6feff630",
            activity_type: "multiple_choice",
            statement: "Para que um aço possa ser cortado por um processo a gás (oxi-corte, por exemplo), é necessário que umas etapas sejam cumpridas. Assinale a alternativa a seguir que não condiz com o mecanismo. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "0c55d573-6187-48ad-a859-52c57b18e310", content: "A) A temperatura de ignição é atingida pelo pré-aquecimento da região que será cortada através de chamas produzidas pelo gases combustível e comburente;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "83436a45-2d54-49f7-812b-2224f8b19de7", content: "B) O corte, propriamente dito, inicia-se só após a região de peça preaquecida atingir a temperatura de ignição;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "12f539d0-4bb5-4f3e-9a00-ce4139000a4f", content: "C) O fato principal que permite a realização do corte de aços são as baixas temperaturas de fusão dos diferentes tipos de óxidos de ferro (comparadas com a temperatura de fusão do ferro) formados no momento em que o oxigênio reage com o ferro do metal base;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "82a2f143-af73-4040-9b97-f0b0349d0c91", content: "D) Os principais óxidos de ferro, formados na reação entre este metal (no estado puro) e o oxigênio, são: Fe2O3, FeO e Fe3O4;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "4318450c-3518-43a1-923a-0fd09e99787a", content: "E) A temperatura de ignição do ferro é a mesma do que a sua temperatura de fusão. Assim que a chama de pré-aquecimento atingir àquele valor, o jato de oxigênio é acionado, dando início ao processo de corte.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "984eb475-d791-45c4-bb16-6a0126498da0",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 59",
        content: "Resolva a questão abaixo.",
        position: 88,
        activity: {
            id: "4df8db66-446c-4da7-93ae-d22753b30e7b",
            activity_type: "multiple_choice",
            statement: "A seguir, são apresentadas 5 alternativas, entre as quais uma não representa um gás combustível empregado no corte a gás. Assinale-a. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "5538b9a8-4f8d-42ce-91ad-bae1dd844f60", content: "A) Gasolina (sob a forma de vapor);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "6ea63266-a691-4424-83c2-c2dbe74827c7", content: "B) Argônio;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "d3d63472-c698-49f7-98e2-aa1e55a31986", content: "C) Propano;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "d565acb2-8720-465e-81e2-a81fd652ddfd", content: "D) Propileno;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "e4304544-18f0-465b-91d5-d71c382334ba", content: "E) Acetileno.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "155d377e-6fb2-4f5e-b294-34d8a02cbd97",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 89,
        activity: {
            id: "15d53504-b911-4b1f-a042-2b6e5f309ffd",
            activity_type: "multiple_choice",
            statement: "7 ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "9276173d-dbdc-45b1-8ef5-14c0bbd73e9c", content: "C) Entre todos os gases combustíveis, é aquele que, para produzir uma chama de pré-aquecimento, participa com 0,5 volume de gás (exemplo, 0,5 m3) para cada 1 volume (exemplo, 1 m3) de Oxigênio;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 1 },
            { id: "4284c5e8-63b9-4168-8003-faba7a9d5383", content: "D) Grande quantidade de profissionais encontrados no mercado que sabem operar com este gás;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "2b41fef1-7a7f-43c1-a960-dba3824af017", content: "E) A chama produzida, utilizando este gás, atinge a uma temperatura suficientemente alta para cortar materiais ferrosos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 3 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "eb778bfe-4d2f-4cf5-aa3d-ffe2cb1f508e",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 61",
        content: "Resolva a questão abaixo.",
        position: 90,
        activity: {
            id: "6490efc1-6487-44e9-95c9-8b9bd469e4c7",
            activity_type: "multiple_choice",
            statement: "Qual dos metais (ligas metálicas) listados a seguir não necessita do uso de fluxo e pó metálico para ser cortado pelo processo a gás? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "8d7528d5-c597-44b9-a906-49516b1b0c6f", content: "A) Ferro fundido;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "c9db148e-88a9-4ceb-af18-79119eb05c85", content: "B) Bronze;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "1af727be-de4b-4ad9-9ac1-3995b4764765", content: "C) Alumínio;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "6e5f66c7-e1ad-40c4-b29b-4f3426948264", content: "D) Aço, contendo 10%Ni;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "590dc201-8ca0-47c7-a4cf-9eb772fc7a0e", content: "E) Aço, contendo 0,15%C, 0,3%Si e 1,5%Mn.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "ffd725c3-2731-4ad8-a18a-faf281738024",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 62",
        content: "Resolva a questão abaixo.",
        position: 91,
        activity: {
            id: "18bde3e1-b949-4165-85d9-231e2ca80e41",
            activity_type: "multiple_choice",
            statement: "Em relação ao corte, ou remoção, de materiais ferrosos empregando “eletrodo de carvão” ou “grafite”, identifique a alternativa informada incorretamente. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "4a057185-892f-4555-8b0b-c34ac28d813b", content: "A) A única função do revestimento de cobre é facilitar a abertura e a manutenção do arco elétrico;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "97c9dd28-68d7-4575-9de0-a89c4111fbfd", content: "B) Tendo em vista que o carvão (grafite), utilizado como material base do eletrodo, é muito quebradiço, é necessário que seja aplicado um revestimento à base de cobre (externo) para conferir uma resistência ao choque;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "02e29b35-ffe4-4eb7-95ce-1f994588e5a3", content: "C) Dos tipos de eletrodos de grafite, há um tipo específico para fontes de energia que operam com corrente contínua e um outro tipo para fontes que operam com corrente alternada ;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "dbd3091c-9fc0-452a-9d17-f88b0f985097", content: "D) Devido à presença de placas de carbono depositadas na região após uso do eletrodo de carvão, é necessário que se promova uma limpeza da região afetada, objetivando a remoção desse material;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "2704a2ee-fe3e-481b-b9b8-c2a81e56ea13", content: "E) Necessidade do uso de ar comprimido durante a operação para expulsar o metal líquido da região.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "f1f2c02e-dc40-4883-8ee1-5a78d87a6a5c",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 63",
        content: "Resolva a questão abaixo.",
        position: 92,
        activity: {
            id: "465d55db-9f6e-4554-b751-7f285cdb920f",
            activity_type: "multiple_choice",
            statement: "Em relação ao corte, ou remoção, de materiais ferrosos empregando “eletrodo de carvão” ou “grafite”, identifique a alternativa informada incorretamente. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "fa32ec19-0c93-4644-9131-8358ac66b491", content: "A) Processo que pode ser usado em todas as posições;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "16681f91-fd6e-45c7-98b7-53b9bdd56c20", content: "B) Metais do tipo: aço, aço inoxidável, ligas de cobre e de níquel, e alguns tipos de ferro fundidos podem sem cortados pelo eletrodo de carvão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "52b85bd2-8c3c-475d-80be-d5f407e4bdd7", content: "C) De tão simples o seu manuseio, não é exigida habilidade do profissional para a execução do trabalho;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "7ebb150a-240e-434e-a7af-aed69838279b", content: "D) Fundamental o uso de fontes de energia do tipo retificadores (corrente contínua), ligados na polaridade direta;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "a5fc3da3-7ac5-484a-b780-c922361e1a54", content: "E) Todos os tipos de fonte de energia (gerador, transformador e retificador) podem ser usados na execução desta tarefa.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "af4cc634-57b5-440a-a923-069a8ea3597b",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 64",
        content: "Resolva a questão abaixo.",
        position: 93,
        activity: {
            id: "2d9dedac-91b9-44fb-bb43-a6fe064e5338",
            activity_type: "multiple_choice",
            statement: "Comparando os processos de corte com eletrodo de carvão (grafite) e o corte a gás, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "815ceb49-4e10-478f-916a-78dd3a46992c", content: "A) Diferentemente do processo de corte oxi-gás, os metais a serem cortados pelo processo com eletrodo de carvão são fundidos pelo calor gerado de um arco entre o eletrodo e a peça;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "5145ddc5-cb80-4d43-a115-e94d25e47f2a", content: "B) O processo de corte com eletrodo de carvão é uma técnica manual, não podendo ser operada automaticamente;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "9295682a-f60a-4dee-af5f-ab48fa65d612", content: "C) Ambos os processos podem ser usados em todas as posições;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "7b28d1c8-525c-421b-ad07-6a07ca44d5c7", content: "D) Tendo em vista que o aporte térmico introduzido na região do corte feito com o eletrodo de carvão é menor do que o corte feito com chama (mistura dos gases combustível e comburente), a distorção produzida é menor quando usado o eletrodo de carvão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "be3b0c17-8afb-4e78-af3f-e547a195a076", content: "E) A ZTA produzida pelo corte com carvão é menor do que usando a técnica com chama.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "b8f79de1-7eec-463f-ab92-b663405c5bf7",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 94,
        activity: {
            id: "8a46a4b2-cf34-491b-a3fd-4b4fc52ba25e",
            activity_type: "multiple_choice",
            statement: "9 requisitos de energia das fontes para corte com grafite são normalmente maiores, comparando com as fontes utilizadas na soldagem; ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "8155c31a-7475-45bd-a16f-c50c897f031e", content: "D) Os consumíveis usados nesta técnica são o ar comprimido, o eletrodo de carvão e o fluxo necessário para aumentar o rendimento do processo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "d6ecf849-1dc5-49ff-811e-b21beffd11eb", content: "E) Tendo em vista a presença de placas de carbono (resíduo do processo de corte com eletrodo de carvão) na superfície da região goivada ou cortada, a sua remoção deve ser feita pela técnica de esmerilhamento, sendo obrigatório o uso posterior da escova rotativa. A função desta escova é retirar os resíduos não removidos inicialmente pelo disco de esmeril.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "409f7073-0d79-4bdd-8a08-960a1546dbc8",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 66",
        content: "Resolva a questão abaixo.",
        position: 95,
        activity: {
            id: "39c7f74e-7bfd-403e-95d7-a8ffc705b64e",
            activity_type: "multiple_choice",
            statement: "Quanto às alternativas apresentadas a seguir abordando o corte a plasma de materiais metálicos, identifique aquela informada incorretamente. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "4c42ef5a-ca97-4432-a3d2-81da7dff610f", content: "A) A técnica de corte a plasma é indicada para ser empregada no corte de qualquer material metálico (ferroso e não-ferroso), tendo em vista que o arco de plasma atinge a temperaturas em torno de 15.000 ºC;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "a41e673d-216d-4c84-8444-b74c2c65fa26", content: "B) O corte a plasma pode ser feito tanto manual, quanto automaticamente;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "618ab98f-32a8-4c86-9d25-a4e047a3309a", content: "C) A qualidade da superfície cortada com a técnica a plasma é de ótimo padrão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "d45ee72c-5561-465a-ade1-7d7b85bc7439", content: "D) A fonte de energia indicada para esta técnica é o retificador (corrente contínua);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "3c4539e9-f07c-47ff-9000-bca939e901a0", content: "E) Visto as altas temperaturas do arco gerado pelo plasma, associada à alta potência da fonte de energia, esta técnica permite cortar peças com espessuras de até 500 mm.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "f997f6f5-e1ff-4b9f-ba43-5d3e9820b838",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 96,
        activity: {
            id: "ec95e74a-f5e5-48ea-b224-bcc375c42b29",
            activity_type: "multiple_choice",
            statement: "0 ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "6069e444-a844-4c9b-9006-500da8f37a4f", content: "D) Comparando especificamente o corte a plasma com o corte com eletrodo de carvão, o primeiro tem a grande vantagem de poder realizar o corte sem que a peça precise estar energizada, quando é usada uma torcha que produz um arco do tipo “não transferido”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 1 },
            { id: "0a1347cb-0634-432e-b1ef-cfcec1b3ed9b", content: "E) A temperatura do arco elétrico gerada no corte a plasma é bem maior do que a temperatura produzida pela chama proveniente do corte a gás.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "5456b7b1-7012-4639-b585-851f7ee25542",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 68",
        content: "Resolva a questão abaixo.",
        position: 97,
        activity: {
            id: "457f8d84-6e6d-4f6a-885e-747d121aac69",
            activity_type: "multiple_choice",
            statement: "Qual dos equipamentos apresentados a seguir não pertence ao conjunto necessário para realizar cortes com plasma? ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "8a85f87c-e3ac-4214-84eb-a48a3e8801b4", content: "A) Fornecimento de gases (cilindros ou tanques);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "ff249468-0b4e-4f69-bb9f-4a24da43ee88", content: "B) Sistema para refrigeração da torcha à base de água;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "d1b3fe0c-0ed7-4aa0-bde5-16afc70f06b3", content: "C) Torcha de corte;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "ffa7ad66-c75f-4c05-8c54-4d1bd41d952d", content: "D) Fonte de alta frequência;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "fe979d24-4168-4b6d-924c-7219e924a9da", content: "E) Fonte de energia (Retificador/Gerador).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "883c4388-ec48-468b-b7b0-786485684001",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 69",
        content: "Resolva a questão abaixo.",
        position: 98,
        activity: {
            id: "20dc5b95-e299-471a-9c54-4d8463c48eb1",
            activity_type: "multiple_choice",
            statement: "No processo de corte a plasma, há um tipo de gás (ou mistura) usado na formação do plasma e um outro tipo de gás usado como gás de proteção. Identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "074f47d1-3312-48b4-bfe7-664643c5f13c", content: "A) Gás de proteção na soldagem do Alumínio: mistura de Argônio + H2;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "07ed048b-8c6d-4ecd-a625-1507cabf19be", content: "B) Gás de plasma na soldagem do aço inoxidável: CO2; mistura de Argônio + CO2 + O2;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "7de26888-12fc-4bc9-93a8-354fd45ae685", content: "C) Gás de proteção na soldagem de aço carbono: Argônio puro; mistura de Argônio + CO2;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "88737c80-2ef8-45f8-ad02-2f806c503611", content: "D) Gás de plasma na soldagem do Titânio: Argônio puro;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "448e7fc2-eb42-4e94-aa65-23fa74159908", content: "E) Gás de plasma de metais não-ferrosos: mistura de N2 + H2.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "6cf304c1-38a2-45c0-96a1-206bbf6064ce",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 99,
        activity: {
            id: "94217dcb-21e6-4c59-a27b-558ee1fa24b5",
            activity_type: "multiple_choice",
            statement: "1 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "8ce6b780-2a6f-4801-950e-fc6a21b9b8b9", content: "C) Os soldadores podem trabalhar com relativo conforto, enquanto o aquecimento é realizado, não precisando interromper o trabalho para ajustar a temperatura de preaquecimento;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "6c5647d4-4cb8-4d26-9299-1023b04fc319", content: "D) O aquecimento produzido por esta técnica pode ser mantido durante a operação de soldagem.;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "e1d1bf01-137d-4f84-a2bc-1b2b0f298cf2", content: "E) O aquecimento produzido por esta técnica pode ser feito de forma contínua e uniforme.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "2c7a1ac9-e107-49b0-a423-ecbfbd91ea5a",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 71",
        content: "Resolva a questão abaixo.",
        position: 100,
        activity: {
            id: "af70b6cf-28e9-4720-ae81-c188e4470c7a",
            activity_type: "multiple_choice",
            statement: "No que diz respeito à técnica conhecida como “Aquecimento por Chama”, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "809d3f01-63ea-48b0-8b65-38f54812901f", content: "A) É um processo eficiente e econômico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "926af3f7-ae30-46de-ae05-eaaf86b90ec5", content: "B) É adequado para serviços no campo em peças relativamente pequenas;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "e6f602ac-1ce6-4622-a732-d3a974771b4b", content: "C) É uma técnica precisa, com um controle total da temperatura ao longo da seção que está sendo aquecida;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "94ae5317-95ec-4698-9f65-79390220d93e", content: "D) Equipamentos fáceis de serem transportados;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "545170f9-05d7-462d-9c3e-e37292ae28fd", content: "E) É uma técnica que exige cuidados na operação, pois, caso haja algum descontrole no aquecimento, é possível que o trabalho seja inviabilizado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "d12c1ca7-61e0-4be7-9a23-da5e8f1cd697",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 72",
        content: "Resolva a questão abaixo.",
        position: 101,
        activity: {
            id: "2dc50b56-d84b-43d8-a392-47f2eeddad66",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas a seguir, identifique aquela que não é uma vantagem da técnica conhecida como “Aquecimento por Indução”. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "566df502-4c69-4dc6-9bf5-603b5f011de3", content: "A) A fonte de energia usada nesta técnica é pequena, sendo facilmente transportada para lugares de difícil acesso;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "2552368f-bad6-422e-9636-084ca0be704f", content: "B) As bobinas usadas para o aquecimento têm uma vida útil longa;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "109f4ed6-0768-455e-8125-91c70a770d96", content: "C) Atinge-se rapidamente às temperaturas estabelecidas para a realização do tratamento indicado;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "34ef046e-ce44-4dd2-9155-6fdce3c30b14", content: "D) Obtém-se pouca variação de temperatura na seção que está sendo aquecida;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "57a6e458-c654-4443-a55d-132bf78684e1", content: "E) Esta técnica pode produzir um aquecimento em uma grande seção da obra, não se restringindo apenas a uma pequena região da mesma.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["31ccc818-164a-4b6f-a445-231a3addefb9"].push({
        id: "90e944ee-fe54-4fc4-a7dc-79d0dacc85ca",
        lesson_id: "31ccc818-164a-4b6f-a445-231a3addefb9",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 102,
        activity: {
            id: "e2ad51bd-d15a-432c-bafa-fbdde9f822d2",
            activity_type: "multiple_choice",
            statement: "2 ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "eb3adbf4-904e-4e17-8586-14b8994bce58", content: "A) Aquecimento “por chama”: das 3 técnicas apresentadas é a que fornece grande capacidade de mobilização;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "996d1cec-11ee-4602-84ef-481a1e167178", content: "B) Aquecimento “por indução”: pode ocorrer abertura de arco elétrico entre a resistência e a peça tratada;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "e3ad4b47-4260-46e6-a6eb-d914413f2ec1", content: "C) Aquecimento “por resistência elétrica”: tem como maior vantagem produzir altas velocidades de aquecimento;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "5910d5e5-817c-48a7-a10b-cc911cd0a62c", content: "D) Aquecimento “por resistência elétrica”: apresenta como vantagem do processo o uso de bobinas de longa duração;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "6bef46d3-1196-4289-b58a-83e2692734b9", content: "E) Aquecimento “por indução”: esta técnica permite que a soldagem não seja interrompida, quando houver a necessidade de aquecer a peça..", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_MODULES.push({
        id: "55728cf4-b843-408b-89e1-e07f6ee17be6",
        course_id: "c5555555-5555-5555-5555-555555555555",
        title: "Ensaios Mecânicos",
        description: "Questões e atividades sobre Ensaios Mecânicos",
        position: 9,
        is_published: true
    });

    STATIC_LESSONS.push({
        id: "246e5ab8-ad6c-48c1-914e-cf3bb288e354",
        module_id: "55728cf4-b843-408b-89e1-e07f6ee17be6",
        title: "Prática - Ensaios Mecânicos",
        description: "Exercícios do banco.",
        estimated_minutes: 60,
        position: 1,
        lesson_type: "interactive",
        is_published: true
    });
    
    if (!STATIC_LESSON_STEPS["246e5ab8-ad6c-48c1-914e-cf3bb288e354"]) {
        STATIC_LESSON_STEPS["246e5ab8-ad6c-48c1-914e-cf3bb288e354"] = [];
    }

    STATIC_LESSON_STEPS["246e5ab8-ad6c-48c1-914e-cf3bb288e354"].push({
        id: "0301047d-ebba-4a05-9a11-bfd10b320d61",
        lesson_id: "246e5ab8-ad6c-48c1-914e-cf3bb288e354",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 1,
        activity: {
            id: "3fe0528d-3903-4f05-9f63-850b57157e26",
            activity_type: "multiple_choice",
            statement: "Quanto à importância da realização de ensaios mecânicos em materiais metálicos, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "4fc5bc49-b84e-4722-a922-0bbd6116f79e", content: "F) A determinação das propriedades mecânicas é geralmente obtida através de ensaios mecânicos, químicos e metalográficos de corpos de prova.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 1 },
            { id: "054c3df1-ea68-4757-836d-9d88cd07b7d6", content: "G) Os resultados dos ensaios mecânicos de um determinado material metálico servem como referência para futuras qualificações (homologações) de metais de adição, de procedimentos de soldagem, entre outras qualificações.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "e52a9564-60ca-4619-aed0-bc846c7a36d7", content: "H) Os ensaios mecânicos são considerados como ensaios destrutivos, pois, na grande maioria das vezes, provocam a quebra ou inutilizam a peça ensaiada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "f070a8da-f398-48b9-b4da-8702bd8e9e0b", content: "I) Os tipos de corpos de prova, suas dimensões e formas, procedimentos de ensaios são estabelecidos por normas técnicas aplicáveis, podendo ser brasileiras ou estrangeiras.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "ed492703-d742-4af6-8d79-415f6583d08b", content: "J) Uma junta soldada localizada entre dois componentes de um equipamento deve ter suas propriedades mecânicas compatíveis com as propriedades mecânicas do metal de base.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["246e5ab8-ad6c-48c1-914e-cf3bb288e354"].push({
        id: "0ed20d87-d9cc-4397-bfe2-e7d0d9c203cc",
        lesson_id: "246e5ab8-ad6c-48c1-914e-cf3bb288e354",
        step_type: "activity",
        title: "Questão 3",
        content: "Resolva a questão abaixo.",
        position: 2,
        activity: {
            id: "5f22adaf-176b-4d30-b372-172dd200228b",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas apresentadas a seguir não é um objetivo de um ensaio metalográfico? . ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "757ebd8d-c2c9-4b08-9c98-c98e1b568f9d", content: "A) Determinar as diferentes zonas da junta soldada, como também poder levantar o número de passes depositados no interior do chanfro, se foi realizada goivagem, observar a forma original do chanfro, etc.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "0e11c336-a55d-4f45-910d-430a65066b01", content: "B) Verificar se o metal em análise, durante o processo de fabricação, foi laminado, fundido ou forjado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "909d5c4f-c3cd-4e61-abe3-9b394b5d2a8d", content: "C) Determinar o tipo de material que está sendo ensaiado.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "29ec5ca0-b694-45d5-aec4-d486d40a56af", content: "D) Verificar se a junta soldada é formada por componentes de mesmo material ou se a mesma é uma junta dissimilar.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "d540827f-8ade-4f5b-b9d9-f555569315e6", content: "E) Constatar a presença de descontinuidades, tais como: segregações e porosidades..", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["246e5ab8-ad6c-48c1-914e-cf3bb288e354"].push({
        id: "62287b95-a069-4cbc-9530-bbceae2fb088",
        lesson_id: "246e5ab8-ad6c-48c1-914e-cf3bb288e354",
        step_type: "activity",
        title: "Questão 4",
        content: "Resolva a questão abaixo.",
        position: 3,
        activity: {
            id: "f27f300b-7c69-4dad-99d0-4fe370cc37c4",
            activity_type: "multiple_choice",
            statement: "Como pode ser definido o termo “Macrografia”? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "393e9e10-6c58-4aba-b491-b1c8b0f5f158", content: "A) Técnica que permite observar, através de lentes especiais, uma superfície de um corpo de prova ou de uma peça, encontrando-se esta devidamente lixada, sendo posteriormente atacada pela aplicação de um reativo apropriado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "52611375-86c3-4224-9d29-04c16097ebae", content: "B) Técnica que permite observar uma superfície plana de um corpo de prova ou de uma peça, superfície esta que não precisa ser preparada para o ensaio. Basta a aplicação de um reativo apropriado na região de interesse para a realização completa do ensaio.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "9bc96739-bbd8-41ec-91ba-b5333b387e8a", content: "C) Técnica simples que permite observar a superfície de um corpo de prova ou de uma peça, bastando apenas fazer o uso de lixas d`água na região de interesse.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "f008971d-f6ca-4141-86c4-e8470214f3c6", content: "D) Técnica simples que permite observar a superfície de um corpo de prova ou de uma peça, bastando apenas aplicar, sobre a região de interesse, um reativo apropriado durante um período de tempo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "278f3f94-4e80-4312-927e-04c8d47ca27e", content: "E) Técnica que permite observar uma superfície plana de um corpo de prova ou de uma peça, encontrando-se esta devidamente lixada, sendo posteriormente atacada pela aplicação de um reativo apropriado.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["246e5ab8-ad6c-48c1-914e-cf3bb288e354"].push({
        id: "0f12816a-d1f7-4618-b822-c522445dc548",
        lesson_id: "246e5ab8-ad6c-48c1-914e-cf3bb288e354",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 4,
        activity: {
            id: "9ba88953-693d-40fb-a16f-e96612a9f0d5",
            activity_type: "multiple_choice",
            statement: "8 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "75c1d77a-0cad-4c5b-888a-efb098188560", content: "A) Mordedura", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "bc0afdee-8a1f-48cc-8437-003b55a7290e", content: "B) Trinca", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "2c0c5893-df04-4178-9513-288c450550f1", content: "C) Poro", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "ca73008e-2c17-4346-8641-37087327f00d", content: "D) Inclusão de escória", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "3df73c41-4a60-4bfb-bb78-48ca4549c39f", content: "E) Falta de penetração", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["246e5ab8-ad6c-48c1-914e-cf3bb288e354"].push({
        id: "8c470513-1df0-4fc8-9e36-f06738418db2",
        lesson_id: "246e5ab8-ad6c-48c1-914e-cf3bb288e354",
        step_type: "activity",
        title: "Questão 6",
        content: "Resolva a questão abaixo.",
        position: 5,
        activity: {
            id: "a8fa3ea6-277a-419d-9361-b95897f757f1",
            activity_type: "multiple_choice",
            statement: "Dos diferentes tipos de reativos (ou soluções de ataque), que podem ser empregados em um ensaio macrográfico de um corpo de prova feito de aço carbono (doce), assinale a alternativa correta. Desejando realizar um ensaio macrográfico em um corpo de prova feito de aço carbono (do tipo “doce”), pergunta-se: qual o reativo (ou solução de ataque) mais utilizado? ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "b96d4b1a-e587-4165-a18e-42a5b5b005d7", content: "A) Reativo de ácido muriático.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "c09e141a-f471-483c-9c28-a4c77a40cbd3", content: "B) Reativo de iodo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "b5c43f71-89c1-4814-9df5-8c6ee2207c23", content: "C) Reativo de persulfato de amônio.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "83159ca6-4ea4-491a-b9bf-477dfb329995", content: "D) Reativo de ácido nítrico (nital).", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "31719918-b8b6-46b0-9174-4319a56d6bc4", content: "E) Reativo de ácido clorídrico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["246e5ab8-ad6c-48c1-914e-cf3bb288e354"].push({
        id: "3535026f-400f-45f5-944e-194235a6a435",
        lesson_id: "246e5ab8-ad6c-48c1-914e-cf3bb288e354",
        step_type: "activity",
        title: "Questão 7",
        content: "Resolva a questão abaixo.",
        position: 6,
        activity: {
            id: "9e01d645-178f-474b-9c8b-5a9ae80217d9",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas apresentadas a seguir não faz parte da técnica de preparo de um corpo de prova para um ensaio macrográfico? ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "da00a3d5-e29b-47e0-aee8-b2107d929ac2", content: "A) Atacar a superfície, após lixamento completo, com um reativo químico apropriado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "1ddb9fb6-e63d-45d7-8b92-46d89a7668af", content: "B) Polir a superfície, após lixamento completo, utilizando uma pasta de diamante específica.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "d00598be-2b75-4e4b-be10-6573bed41121", content: "C) Escolher e localizar a seção que será analisada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "1028dde9-0e78-4be5-81ad-9b71a5b29437", content: "D) Cortar e lixar a região a ser analisada, antes da aplicação do reativo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "a1ed32de-65ce-45a2-995d-53bc528c0987", content: "E) Lavar e secar a região, após ser corretamente lixada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["246e5ab8-ad6c-48c1-914e-cf3bb288e354"].push({
        id: "f23bb9a7-fd0b-40f2-b4c9-8b1fdc366f72",
        lesson_id: "246e5ab8-ad6c-48c1-914e-cf3bb288e354",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 7,
        activity: {
            id: "92f98b85-2f11-4ff5-b2d3-db37fc84a899",
            activity_type: "multiple_choice",
            statement: "9 ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "384066bb-55d1-47bd-8d20-983f3dea4652", content: "C) A esfera de aço, usada para produzir a impressão na região ensaiada, tem um diâmetro igual a 10,0 mm.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "53ed7305-3642-4551-b6f5-500e9d9a95c9", content: "D) Encontram-se no mercado dois tipos de durômetros portáteis que trabalham com a escala Brinell: o “Poldi” e o “Telebrineller”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "a27acbea-3e33-4fc9-b771-42fb9044c09e", content: "E) Recomenda-se que o diâmetro das impressões produzidas pelo medidor não seja superior a 9,0 mm.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 3 }
        ]
        }
    });

    STATIC_LESSON_STEPS["246e5ab8-ad6c-48c1-914e-cf3bb288e354"].push({
        id: "d1f2186d-2011-4bb6-b11c-877e8c720825",
        lesson_id: "246e5ab8-ad6c-48c1-914e-cf3bb288e354",
        step_type: "activity",
        title: "Questão 9",
        content: "Resolva a questão abaixo.",
        position: 8,
        activity: {
            id: "98a52be8-b9a3-4d36-beea-9141e8f0647c",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas a seguir, identifique aquela que não é importante para o cálculo da dureza de uma superfície metálica, empregando um durômetro portátil do tipo “Brinell”. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "261c3a9b-6247-4523-8ab5-18d571be1762", content: "A) Diâmetro da impressão da barra padrão.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "b7fd2373-e1ab-4db7-9baa-441127769af0", content: "B) Diâmetro do material testado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "8b8b2145-e47e-43ff-bcf0-2fefeffd50f6", content: "C) Dureza da esfera.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "059f7081-9bb3-4eb3-8726-bffb55d87e28", content: "D) Dureza da barra padrão.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "1812113a-6012-42e6-ad38-cd4b61356bbb", content: "E) Dureza do material testado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["246e5ab8-ad6c-48c1-914e-cf3bb288e354"].push({
        id: "475e033a-130a-49b4-be43-f381b769ff50",
        lesson_id: "246e5ab8-ad6c-48c1-914e-cf3bb288e354",
        step_type: "activity",
        title: "Questão 10",
        content: "Resolva a questão abaixo.",
        position: 9,
        activity: {
            id: "2206e929-b296-46a2-9949-e4298cc01ecb",
            activity_type: "multiple_choice",
            statement: "Quanto aos durômetros portáteis que fazem medições pelo método Rockwell C, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "9e065a76-0ac2-4a77-b503-0d211ad1efd5", content: "A) Técnica muita usada na indústria, visto ser totalmente desnecessário fazer uma limpeza na superfície que será ensaiada.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "9632b827-f26e-490c-9f9d-11642ba8fa68", content: "B) Uma vantagem do aparelho é que este permite utilizar mostradores com escalas de dureza Brinell ou Vickers, em lugar da escala Rockwell C.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "41bd044f-ab06-46b0-9acd-ae46f57f1d6e", content: "C) Técnica que se baseia no princípio da medição da profundidade da impressão", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "00dfa337-6bb3-483e-ba59-98940eb475f4", content: "D) Técnica utilizada para medir dureza da zona termicamente afetada de uma junta soldada, devido à pequena impressão produzida pelo aparelho.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "3d9bb057-9133-4238-8389-fcddf008a685", content: "E) Os componentes do aparelho que ficam em contato com a peça devem estar bastante limpos, assim como a superfície que será analisada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["246e5ab8-ad6c-48c1-914e-cf3bb288e354"].push({
        id: "0c78ca93-b205-4d99-adf9-623d69396f59",
        lesson_id: "246e5ab8-ad6c-48c1-914e-cf3bb288e354",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 10,
        activity: {
            id: "c476263e-a500-4cf0-bc71-1b3cd7d342c3",
            activity_type: "multiple_choice",
            statement: "0 ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "6da8b6b8-778d-4cc5-8e5b-68e72f73a16e", content: "A) Mesmo embora os 3 tipos de métodos trabalhem com escalas de dureza diferentes, existem tabelas que possibilitam a conversão dessas escalas, o que permite a comparação dos valores medidos por qualquer método.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "63df2ea4-3144-4ac8-945f-fc5c34a69395", content: "B) A possibilidade de conversão das várias escalas de dureza, apesar de ter uma grande utilidade prática, isto não permite que se possa confiar plenamente nos valores de dureza obtidos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "742feb03-eaf6-49cf-922b-2008385e4f78", content: "C) Com os valores de dureza obtidos usando os durômetros portáteis (especificamente para as escalas Brinell e Rockwell) é possível obter um valor aproximado do limite de resistência para alguns tipos de metais, como o aço carbono, por exemplo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "18de59f7-3dca-4362-b9f7-310909233111", content: "D) Apesar de existirem hoje diferentes métodos que permitem a obtenção de dureza empregando durômetros portáteis, ainda não existe uma norma técnica que estabeleça padrões e critérios que torne esta técnica confiável.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "7828b2f4-ec1b-4c08-8b3e-b3dde9bce8d9", content: "E) Quanto a juntas soldadas, alguns tipos de durômetros portáteis permitem medir durezas da face das soldas, assim como das zonas termicamente afetadas, dependendo do método empregado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["246e5ab8-ad6c-48c1-914e-cf3bb288e354"].push({
        id: "f4ad36bc-7a0c-40cf-86e2-78a0a4038fa9",
        lesson_id: "246e5ab8-ad6c-48c1-914e-cf3bb288e354",
        step_type: "activity",
        title: "Questão 12",
        content: "Resolva a questão abaixo.",
        position: 11,
        activity: {
            id: "de32f084-48a0-479e-87b7-6d96870de6bb",
            activity_type: "multiple_choice",
            statement: "Em que se baseia a técnica de medição de dureza Brinell, quando do uso de um durômetro portátil? ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "ef7bec00-0ee6-4c58-9ff1-f351669cfed8", content: "A) Na comparação dos diâmetros das impressões.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "b42456d2-8e75-4d1c-926d-ef22dafdb4ad", content: "B) Na medição da reação provocada no penetrador após o alívio da pré- carga.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "f6c6bf6d-5b6e-4dea-a834-28b57a1bf94f", content: "C) Na comparação das diagonais das impressões.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "2f1e9385-f738-4b18-9c2b-03c0d30f48b3", content: "D) Na medição da profundidade das impressões.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "3e4a7837-cff9-40bb-a630-e82b1b21a6d5", content: "E) Na medição apenas dos diâmetros das impressões.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_MODULES.push({
        id: "99114e59-1e68-4b65-bb91-475cb14d867d",
        course_id: "c5555555-5555-5555-5555-555555555555",
        title: "Metais de Base",
        description: "Questões e atividades sobre Metais de Base",
        position: 10,
        is_published: true
    });

    STATIC_LESSONS.push({
        id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        module_id: "99114e59-1e68-4b65-bb91-475cb14d867d",
        title: "Prática - Metais de Base",
        description: "Exercícios do banco.",
        estimated_minutes: 60,
        position: 1,
        lesson_type: "interactive",
        is_published: true
    });
    
    if (!STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"]) {
        STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"] = [];
    }

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "1c5468cb-c094-49b8-b2be-0e961a72b929",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 1,
        activity: {
            id: "69723b26-2b90-4738-abcd-f377ef413e6e",
            activity_type: "multiple_choice",
            statement: "Qual especificação (norma ou código) listada a seguir padroniza as características mecânicas e químicas dos metais ferrosos, não ferrosos, materiais não metálicos e outros materiais? ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "88def793-4d29-4d09-94b7-4c3adb52d14c", content: "F) ASM (American Society for Metals)", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "fc42198d-8dba-4467-8bf0-8e92c9a6a609", content: "G) ASME (American Society of Mechanical Engineers).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "132b3326-152f-4a83-9eb5-83bef29b72fb", content: "H) AWS (American Welding Society).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "0c1ef3ba-ba7c-457f-97f8-d4b99672971a", content: "I) ASTM (American Society for Testing and Materials)", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 4 },
            { id: "9cbce5c5-29e8-4fbd-ae56-43b652f07e77", content: "J) AISI (American Iron and Steel Institute).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "2bb7bc09-0325-440d-9873-451212757230",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 2,
        activity: {
            id: "b820452c-7e68-44fc-accf-f0ade93ceccd",
            activity_type: "multiple_choice",
            statement: "Analisando a especificação ASTM E 340-95 (98) b, identifique a alternativa correta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "d1e6041c-dd68-4703-8332-84c0ce9f89df", content: "F) A letra “E” representa um eletrodo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "98433062-d490-4a53-afa6-2ba28f32b26d", content: "G) O número “340” corresponde especificamente a um determinado tipo de material.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "2158fb2c-3314-4a66-9aa9-90db0e1e4c09", content: "H) O número “95” indica o ano de emissão original da especificação ou de adoção como norma.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 3 },
            { id: "a2e23003-a209-4eff-9e21-b3d9b579c4dc", content: "I) O número “98” indica o ano quando foi realizada a primeira revisão da especificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "dddcffed-338d-4378-bba4-f245426592be", content: "J) A letra “b” (minúscula) indica que em 1998 foram realizadas duas revisões referentes ao texto original.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "06dfd559-fba6-46b5-8ae7-a4b86e6d9d9d",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 3",
        content: "Resolva a questão abaixo.",
        position: 3,
        activity: {
            id: "47762f6e-e357-4739-8bf6-5e11397e43e1",
            activity_type: "multiple_choice",
            statement: "Analisando a especificação ASTM A 370-91 (92) T, identifique a alternativa correta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "7864a26f-e170-4dc1-94ad-5f83e0830138", content: "A) A letra “A” representa que o metal de base em questão é o Alumínio.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "5331c4c2-05ce-4f2f-98df-a24673a26c87", content: "B) O número “370” corresponde ao tipo de liga de Alumínio.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "a4e4772f-d6fc-4cde-8047-6addef27e31e", content: "C) O número “91” indica o ano quando foi realizada a primeira revisão da especificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "4ab20026-09fa-40ba-b117-a695ee7ead6c", content: "D) O número “92” indica o ano da última reaprovação, sem alteração, da norma.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "cb4a73c7-89cd-4068-9811-cda0e02547a2", content: "E) A letra “T” significa que o metal em questão trata-se de um tubo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "9662c284-e156-42ad-8461-de2fafed069e",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 4",
        content: "Resolva a questão abaixo.",
        position: 4,
        activity: {
            id: "930fd092-e877-4912-ae08-a7c3eb10d50e",
            activity_type: "multiple_choice",
            statement: "Analisando as classificações dos aços apresentados a seguir, identifique a alternativa correta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "5ebf0d8c-7360-4825-a4f8-62ace56527c1", content: "A) Os aços com classificação AISI “318” e “318Mo” possuem composições químicas muito semelhantes. O que difere ambos é que o segundo apresenta  teores de molibdênio e oxigênio maiores do que o primeiro.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "a468983d-c5de-4bad-9201-35ca6c0da68a", content: "B) Os aços com classificação AISI “317” e “317L” possuem composições químicas muito semelhantes. O que difere ambos é que o segundo apresenta um teor de lantânio maior do que o primeiro.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "615ffa92-5a2e-4341-94a4-b32edab17d13", content: "C) Os aços com classificação AISI “202” e “430FSe” possuem as mesmas composições químicas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "7b0c245f-ac3a-493a-aa87-47e396264663", content: "D) Os aços com classificação AISI “416” e “416Se” possuem composições químicas muito semelhantes. O que difere ambos é que o segundo aço possui um teor de enxofre maior do que o primeiro.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "750bb848-53fd-46df-81fd-f409be918cd9", content: "E) Os aços com classificação AISI “321” e “321H” possuem composições químicas muito semelhantes. O que difere ambos é que o segundo apresenta um teor de carbono maior do que o primeiro.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "7692c9c6-58cd-4b41-82c8-71c33135766b",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 5",
        content: "Resolva a questão abaixo.",
        position: 5,
        activity: {
            id: "47ccb53c-88e6-4b4b-bdaf-4701ea4e9182",
            activity_type: "multiple_choice",
            statement: "Quanto à classificação AISI relativa aos aços inoxidáveis – X YY a – marque a alternativa correta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "58692e3e-f294-4d98-94d7-9a290f7d8910", content: "A) A letra “X” indica a microestrutura do metal de base.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "a4129b88-de64-4df0-a9d9-e4cf5e9dc79f", content: "B) As letras “YY” significam os elementos químicos que se diferenciam dos elementos principais da liga.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "6a1e3ad3-d084-4db8-b9c3-55db44c9b664", content: "C) A letra “X” significa o elemento químico principal da liga.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "d4e7ac87-e567-4be3-8505-a7c1f77e0e5d", content: "D) A letra “a” particulariza uma determinada faixa de composição química para cada tipo de aço.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "dfe36adf-0168-487b-ac90-8cba8c5a2881", content: "E) A letra “X” significa se a forma de fabricação: chapa ou tubo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "7b5c33ba-f5b2-4126-bf76-51f8a528eaf5",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 6,
        activity: {
            id: "8b1e6563-d208-45e9-a6af-0e0e25ae3409",
            activity_type: "multiple_choice",
            statement: "3 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "ff2b56fb-5327-4818-ba9f-58efa8593103", content: "D) Os aços com classificação AISI “304” e “304N” possuem composições químicas muito semelhantes, porém, o segundo aço possui um certo teor de nitrogênio, diferentemente do primeiro que não possui este elemento em sua composição química.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "a81190f7-c094-4141-a166-430fc716234c", content: "E) Os aços com classificação AISI “201” e “446” possuem composições químicas completamente diferentes entre si.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "f43bd86b-989b-4de8-b3e2-a3242203df49",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 7",
        content: "Resolva a questão abaixo.",
        position: 7,
        activity: {
            id: "8866a8d2-e34d-4222-b752-61821eafe3ff",
            activity_type: "multiple_choice",
            statement: "Analisando as classificações AISI dos aços apresentados a seguir, identifique qual a alternativa mostra uma relação correta entre as classificações e a microestrutura dos metais. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "44672d92-ef3e-4414-80b7-72a9fd24c6a5", content: "A) AISI 205 e AISI 430 – Microestrutura austenítica", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "642225ff-3361-4aab-ab4c-d1a3e9e5263b", content: "B) AISI 429 e AISI 316L – Microestrutura austenítica", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "50bc7567-7e8d-4fd9-beb4-59b84c6cc617", content: "C) AISI 202 e AISI 347 – Microestrutura austenítica", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "46d6cdd0-43a1-40a9-b001-afc105012381", content: "D) AISI 201 e AISI 308MoL – Microestrutura martensítica", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "4c78827e-ea3e-4fe5-8ce9-b2140496cbac", content: "E) AISI 309 e AISI 436 – Microestrutura austenítica", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "f30ef71e-0593-4e5a-b761-3dbb4fe09464",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 8",
        content: "Resolva a questão abaixo.",
        position: 8,
        activity: {
            id: "368c3c80-6bc3-4398-85c5-ea1bee3308f0",
            activity_type: "multiple_choice",
            statement: "Quanto ao estudo dos metais de base, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "3efb04d0-358b-4b08-9bec-48ac5d311eeb", content: "A) A especificação AISI estabelece as condições de teste de material, de forma a garantir as propriedades mecânicas mínimas exigidas.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "21b4d654-9b4e-4d74-a393-d5072349f7c1", content: "B) De uma forma generalizada, a Classificação define uma sistemática de arranjo ou divisão dos materiais em grupos, baseada em características similares como a composição química.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "f493ed43-2e24-401a-9e45-32f5569feb4f", content: "C) A especificação ASTM estabelece as condições de teste de material, de forma a garantir as propriedades mecânicas mínimas exigidas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "3dfa4703-7fff-44ee-8bd7-0e2fb5d3b8b8", content: "D) A classificação AISI estabelece apenas uma única maneira de designar seus metais, a saber: através da composição química.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "65a0ed72-616d-4c79-bea5-a283c44f575d", content: "E) De uma maneira generalizada, a Especificação é uma descrição precisa de um conjunto de requisitos a serem satisfeitos por um determinado material.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "b5c7bcbd-18ac-41f2-9993-c96f2e6f2a6b",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 10",
        content: "Resolva a questão abaixo.",
        position: 9,
        activity: {
            id: "30fbbf23-af05-4dee-9ecc-71f6fd21cdec",
            activity_type: "multiple_choice",
            statement: "A designação A do sistema de identificação de materiais da ASTM (exemplo: ASTM A 370), é aplicada para que tipo de material? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "4154a2f6-b47d-4021-97e9-75c790f2835d", content: "F) Metais não ferrosos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "9c46f0e1-8d70-4516-9128-e1203cec6ff3", content: "G) Aglutinantes.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "0ffd58c2-cc78-4fe1-8596-bbc3d9eca559", content: "H) Materiais para sinterização.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "a193d585-d16f-4d6d-8f00-6b7e97c51030", content: "I) Alumínios e suas ligas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "cb70d288-57cf-4713-a65b-e77c80fd2244", content: "J) Metais ferrosos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "f7dbcaee-4463-402c-b065-155887ae2abd",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 11",
        content: "Resolva a questão abaixo.",
        position: 10,
        activity: {
            id: "d702c85a-3360-4460-b6d4-88f0f3f8e33a",
            activity_type: "multiple_choice",
            statement: "A classificação AISI, própria para um determinado tipo de aço, é composta por 3 (três) dígitos. Das alternativas apresentadas a seguir, identifique aquela que identifica o primeiro dígito. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "3a8e27c1-f7ca-419c-b535-2a6fd9f8e39d", content: "A) Se o produto é uma chapa ou um tubo", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "8d238aff-1ca4-4d4d-b877-fe132e2cdbfd", content: "B) Grau de soldabilidade do metal.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "b36200e2-8c66-410a-b045-1482c6883bc7", content: "C) Teores de Cr e Ni.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "a3f44a94-e553-437a-aec2-b1a36c164efe", content: "D) Microestrutura típica do aço.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "f1484029-d89b-447a-8e06-1091b0ce6687", content: "E) Se o tubo é do tipo “com costura” ou “sem costura”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "4cf93647-8e7f-4e47-9079-350f32965db9",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 12",
        content: "Resolva a questão abaixo.",
        position: 11,
        activity: {
            id: "321806e5-9fd3-4fbe-bc9d-537c6bd5ec3b",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas apresentadas a seguir melhor define “Classificação AISI”? ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "5855f1db-ed76-4758-b6cc-04188059e7fb", content: "A) Ela classifica os metais em função de sua composição química.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "5319fd2f-3629-4736-b976-066472772796", content: "B) Estabelece os tipos de análises que devem ser realizados no momento que os metais de base são recebidos na fábrica.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "c3bdf3d9-fa9a-4798-90a3-405bc55156e1", content: "C) Agrupa os metais de base de acordo com as suas propriedades mecânicas e químicas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "b48a9749-1f26-447e-a4ac-60a7bc648505", content: "D) Determina os critérios de aceitação dos materiais, de acordo com a forma dos produtos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "1789fbeb-4925-4a08-b77d-ace5f42136a4", content: "E) Agrupa as ligas de Al e Ni baseada em suas propriedades mecânicas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "c4a98382-f63b-43da-b05f-fa3c3c61f053",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 13",
        content: "Resolva a questão abaixo.",
        position: 12,
        activity: {
            id: "54b811f7-1b33-4a6c-99cb-f4f4778999ee",
            activity_type: "multiple_choice",
            statement: "Quanto ao estudo dos metais de base, sabe-se que o volume da ASTM de identificação 00.01 é um índice geral. Em relação a este volume, identifique a alternativa correta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "9a2bfb35-3d26-46c2-ae21-2791aa9e3afd", content: "A) Listagem identificando todos os volumes das normas ASTM.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "c6dda3eb-d6d3-440f-8677-d3aeb2979008", content: "B) Índice remissivo de todos os assuntos incluídos nos volumes.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "0d054d3e-2d7e-4168-8c3a-1f29c148768a", content: "C) Listagem alfa-numérica das normas incluída nos volumes.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "0406cfa9-ea2e-4d58-9303-a3cbfa980e26", content: "D) As alternativas (a) e (b) estão corretas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "00a6d458-5671-46be-a446-d6dcbf99a958", content: "E) As alternativas (a), (b) e (c) estão corretas.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "638d98a0-0334-41bc-b377-cfc242028075",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 14",
        content: "Resolva a questão abaixo.",
        position: 13,
        activity: {
            id: "868d6bd2-39bd-44af-9924-16ec663ead76",
            activity_type: "multiple_choice",
            statement: "Quanto à classificação AISI 310S, identifique a alternativa correta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "48f49790-cdc8-4af8-9b1d-192ac619f858", content: "A) Apresenta em sua composição química 0,310%C.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "87fa83ba-ac99-433b-9ddf-334f0a60f2ee", content: "B) Apresenta em sua composição química 0,310%S.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "30d85d5d-f2e2-4981-ae07-8cf0174773cf", content: "C) Apresenta em sua composição química 3,10%Cr.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "863643d6-a0cb-40a1-8bf2-6f3cfaf64333", content: "D) Apresenta microestrutura austenítica.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "84bb2e0d-0bf8-43ba-acc8-ff49733eccb8", content: "E) Apresenta em sua composição química 3,10%Ni.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["047746a4-6ae5-4558-baf2-4b0349ce3c6a"].push({
        id: "bc2f7657-99e2-41a2-9ae5-2729db4ba35d",
        lesson_id: "047746a4-6ae5-4558-baf2-4b0349ce3c6a",
        step_type: "activity",
        title: "Questão 15",
        content: "Resolva a questão abaixo.",
        position: 14,
        activity: {
            id: "3f81a301-0985-4550-9b57-784fa3a83665",
            activity_type: "multiple_choice",
            statement: "Em relação às letras empregadas em algumas classificações AISI, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "9d1570b1-3315-49e4-b7ba-dc7e1d377c77", content: "A) A letra “L” significa que o material apresenta baixo teor de C.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "b087086a-a998-4d7a-b309-21e235cbeb55", content: "B) A letra “H” significa que o material apresenta alto teor de C.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "4b31a327-7dbb-460c-8d3c-5ac0e18fded7", content: "C) A letra “M” significa que o material apresenta baixo teor de Manganês.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "63b310e1-f171-480f-8c6a-fb478e245d93", content: "D) A letra “N” significa que o material apresenta um certo teor de Nitrogênio", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "d7e18f5a-8e04-46c6-82a2-99d35baa050f", content: "E) As letras “Se” significam que o material apresenta um determinado teor de Selênio.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_MODULES.push({
        id: "1894cb4a-6e97-411c-9b53-1ec786a777ba",
        course_id: "c5555555-5555-5555-5555-555555555555",
        title: "Documentos Técnicos",
        description: "Questões e atividades sobre Documentos Técnicos",
        position: 11,
        is_published: true
    });

    STATIC_LESSONS.push({
        id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        module_id: "1894cb4a-6e97-411c-9b53-1ec786a777ba",
        title: "Prática - Documentos Técnicos",
        description: "Exercícios do banco.",
        estimated_minutes: 60,
        position: 1,
        lesson_type: "interactive",
        is_published: true
    });
    
    if (!STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"]) {
        STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"] = [];
    }

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "2ad3dc65-4cf2-4763-9487-b8a191f48b1d",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 1",
        content: "Resolva a questão abaixo.",
        position: 1,
        activity: {
            id: "da84ed4b-f45b-431d-8da6-b5c42dd1cd36",
            activity_type: "multiple_choice",
            statement: "Na qualificação de um procedimento de soldagem, indique a alternativa que informa quais são os principais documentos envolvidos nesta atividade. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "21bed2c6-488b-46f8-9edf-196710ed762d", content: "P) Registro de Qualificação de Procedimento de Soldagem e Registro da Qualificação de Soldadores e Operadores de Soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "4b3f6c50-704e-40ba-9eba-8751475a4ead", content: "Q) Especificação de Procedimento de Soldagem e Instruções de Execução e Inspeção de Soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "4150b08a-2c27-4516-b3be-c11ca04444b6", content: "R) Especificação de Procedimento de Soldagem e Relação de Soldadores e Operadores de Soldagem Qualificados.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "fc91ea6e-f7b7-4453-b579-f536cdf7946f", content: "S) Especificação de Procedimento de Soldagem e Registro de Qualificação de Procedimento de Soldagem e Controle de Desempenho de Soldadores e Operadores de Soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 4 },
            { id: "aa4f49c5-b5b8-4a47-861e-18d3bf7a1765", content: "T) Registro de Qualificação de Procedimento de Soldagem e Relatório de Inspeção de Produtos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "63e56845-fdb9-470d-b9c2-e80c437b53fb",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 2,
        activity: {
            id: "dc2b3282-89a1-4ba3-97a5-6a12822a49fa",
            activity_type: "multiple_choice",
            statement: "No que diz respeito ao documento “Especificação de Procedimento de Soldagem” (EPS), identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "2f751581-4681-4775-85ba-adba1f6be429", content: "A) Documento, cuja validade está vinculada à fabricação de um determinado equipamento. Após o término deste, uma nova qualificação deve ser realizada.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "ab88d600-394b-42ed-96f7-94508bec6484", content: "B) Documento preparado para fornecer aos soldadores e operadores de soldagem as diretrizes para a produção de soldas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "a3ecfc85-21ee-4969-b412-ff7ef8ba70cf", content: "C) Documento que determina os limites para o conjunto de variáveis e condições de um procedimento de soldagem que devem ser seguidos na sua execução.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "ba5fe6cf-6dee-479f-b653-5a2db76ef850", content: "D) Documento usado pelo Inspetor de Soldagem para o acompanhamento das qualificações e da soldagem de chapas de produção, objetivando verificar se os parâmetros e condições estabelecidas estão sendo cumpridas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "1d4e20b0-5c07-4535-b556-d7d3ad841685", content: "E) Documento elaborado apenas pelo Inspetor de Soldagem Nível 2.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "9f5f9b19-98a8-4bd7-9103-1ff3117b484f",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 3,
        activity: {
            id: "2a23dce3-b106-4759-8ce1-a6887bb451e7",
            activity_type: "multiple_choice",
            statement: "3 ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "3cf8b68d-ed44-468b-9852-24e776a097c8", content: "D) Controle de Desempenho de Soldadores e Operadores de Soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "3b3316f9-cb6c-4f72-91af-c04a8c38165a", content: "E) Relação de Soldadores e Operadores de Soldagem Qualificados.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "f29025fd-8667-4ed1-83b5-adca093550c8",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 4",
        content: "Resolva a questão abaixo.",
        position: 4,
        activity: {
            id: "904b7dcb-f6cd-48c1-b353-5051abcfeba2",
            activity_type: "multiple_choice",
            statement: "Normalmente os valores das variáveis de soldagem são informados em uma Especificação de Procedimento de Soldagem na forma de “faixas”. Identifique qual parâmetro de soldagem, constado naquele documento, é informado na forma de “limite” (superior ou inferior). ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "24ddbd8f-ea1f-41b9-bb3f-05171f7c25da", content: "A) Intensidade de corrente elétrica.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "d408f929-5018-4971-bdc9-e62f798ed924", content: "B) Temperatura de pré-aquecimento.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "b8b8e106-e6f6-4656-a66b-e2b6d2f8f787", content: "C) Velocidade de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "ad8b82aa-4fb8-46c0-ac7e-5dc67e6f58e7", content: "D) Tensão do arco.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "88bb2f04-e3bb-4ef9-bd99-29f3e1839dc1", content: "E) Espessura da peça de teste.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "5c86e415-453d-4ed0-bb09-de5601ebcb7e",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 5",
        content: "Resolva a questão abaixo.",
        position: 5,
        activity: {
            id: "0fd713ab-8914-4dae-a613-dff7ab04f705",
            activity_type: "multiple_choice",
            statement: "Qual dos parâmetros de soldagem listado a seguir não é obrigatória a sua informação em uma Especificação de Procedimento de Soldagem? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "469810e4-84e6-4079-a827-03517db0750d", content: "A) Tipo de corrente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "b16e7721-ea12-4a64-9f39-39c6971f9848", content: "B) Uso da técnica do “martelamento”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "837fb0a3-346b-4854-a89f-bd3bae57fd97", content: "C) Especificação do metal de base.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "b31dc2cf-03e9-4a59-a940-711536509d49", content: "D) Método de goivagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "722defbd-3c95-442c-a803-62778c3d5a2f", content: "E) Ângulo de inclinação do eletrodo.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "2105db94-fba9-4c0e-bdc4-f16eef909f89",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 6",
        content: "Resolva a questão abaixo.",
        position: 6,
        activity: {
            id: "0f2609d0-3537-4f3e-9582-c740ae787731",
            activity_type: "multiple_choice",
            statement: "No documento “Especificação de Procedimento de Soldagem” (EPS), existe um espaço destinado para informações sobre o gás de proteção (ou mistura) usado nos processos GMAW, GTAW, entre outros. Qual das alternativas apresentadas a seguir não é exigida que conste neste documento? ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "51cfaaf3-4c08-4d76-a348-31f132a6c4c0", content: "A) Gás (ou mistura) usada na proteção.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "a99812a1-c748-45ac-a666-c0dff5a46f33", content: "B) No caso do uso de uma mistura, informar a participação da quantidade de cada gás presente na mistura.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "21ef41fe-7cbe-4a1d-9bc2-e90e87e305c1", content: "C) Informar se o gás (ou mistura) são provenientes de cilindros ou tanques.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "588b2ec3-d696-4d97-8ce1-3990d0398090", content: "D) Informar a faixa de vazão do gás (ou mistura).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "c8964811-1a65-4891-8438-3294233883e6", content: "E) Gás (ou mistura) usada na purga (quando esta for realmente empregada).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "349298c8-9b6d-4b54-8f53-8ad47e26a916",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 7",
        content: "Resolva a questão abaixo.",
        position: 7,
        activity: {
            id: "59b55198-cb01-4309-898d-0c9d836f9be1",
            activity_type: "multiple_choice",
            statement: "No que diz respeito ao documento “Registro da Qualificação de Procedimento de Soldagem” (RQPS), assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "968f80e7-27a9-4a74-b7e2-dfe262103e51", content: "A) Documento onde são informados os registros de todos os parâmetros de soldagem e condições estabelecidos em uma EPS relativa a uma qualificação, assim como os resultados dos ensaios visual, destrutivos e não destrutivos realizados após a soldagem da peça de teste.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "5c76f839-6fc6-462a-b608-986c5027b913", content: "B) As normas de qualificação permitem que vários RQPSs dêem suporte a uma EPS.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "6aedbce7-8f64-49ed-8c1a-19617f7c27d6", content: "C) As normas de qualificação permitem que diversas EPSs possam ser preparadas com base em um RQPS em função das variáveis essenciais.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "0e72a0f3-14ad-42dc-b39b-5f275fda79bd", content: "D) Documento mais importante de uma qualificação de procedimento de soldagem.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "1ac0d2b9-838e-4b35-8830-0cf33bb92b39", content: "E) Uma EPS não tem qualquer valor se não estiver relacionada a pelo menos uma RQPS.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "302905f5-bdf6-4049-98be-f3a32c424e32",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 8",
        content: "Resolva a questão abaixo.",
        position: 8,
        activity: {
            id: "8618fad2-b492-409e-a7c5-059f708c437e",
            activity_type: "multiple_choice",
            statement: "Em relação às informações que são encontradas em um “Registro da Qualificação de Procedimento de Soldagem” (RQPS), assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "e7e27101-ef75-41af-af72-2365f35b6c83", content: "A) Valor do limite de escoamento obtido no ensaio de tração.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "8e72292e-3037-41a2-968b-9c35d3d2b070", content: "B) Registro da disposição dos passes no interior do chanfro.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "06ec9c1e-8f64-4313-9333-b2d51baaac9b", content: "C) Número da EPS correspondente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "3b9efefd-b76e-4f92-9d86-6e0f0ff1b1cb", content: "D) Norma de qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "59414f04-7f84-45ce-945e-2bf21f11eebb", content: "E) Classificação AWS do consumível de soldagem", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "fb9d9412-2e9f-4b99-89a6-1c1eea813a5c",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 9",
        content: "Resolva a questão abaixo.",
        position: 9,
        activity: {
            id: "a7614072-54ab-4594-84c7-22f88108a213",
            activity_type: "multiple_choice",
            statement: "Qual alternativa apresentada a seguir deve ser informada em um “Registro da Qualificação de Procedimento de Soldagem” (RQPS)? ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "6479b5af-5ff2-4cdf-9749-3aaaa2618cb7", content: "A) Nome do fabricante do gás de proteção (ou mistura).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "092509fa-e430-4c81-bda7-5f57f9fe4f81", content: "B) Espessura do metal depositado.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "fcf7c534-97e6-4cd8-a478-81f04e69e670", content: "C) Temperatura do ambiente no momento da qualificação do procedimento de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "ed46dd08-140a-4d42-920f-30b55c2f49a4", content: "D) Nome do equipamento usado para medir a largura do cordão de solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "8b128d87-aca8-4a08-a73c-941f394268db", content: "E) Modelo da fonte de energia usada na qualificação do procedimento de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "05c730bd-2744-42bf-a7ec-4d7d000aa8b2",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 10",
        content: "Resolva a questão abaixo.",
        position: 10,
        activity: {
            id: "f152724f-d924-42ce-a3c6-1ab2407c4317",
            activity_type: "multiple_choice",
            statement: "Quanto ao documento “Registro da Qualificação de Procedimento de Soldagem” (RQPS), assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "5b5fa030-ec56-4f59-b2f0-11d40b759874", content: "A) Importante o registro das faixas dos valores de cada parâmetro de soldagem que estiver envolvida na qualificação de procedimento de soldagem.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "9dfbd341-1d59-4c06-a61e-7959932e5c36", content: "B) Durante a soldagem da peça de teste referente a uma qualificação de procedimento, é fundamental a presença do Inspetor de Soldagem Nível 1.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "81701904-4524-4220-9079-a1eed1ce9b1b", content: "C) Informar o nome do fabricante do metal de base é facultativo neste documento, porém, o mais importante é informar a especificação deste material metálico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "82b8b386-88a9-48f6-ac1a-fc9ac4aa3384", content: "D) Caso um backing (ou cobre-junta) seja utilizado, deve ser registrado no RQPS o tipo de material que este dispositivo é feito.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "73f5872e-fdea-472f-9d59-9f25547a37c4", content: "E) Na qualificação de procedimento de soldagem usando um eletrodo revestido do tipo básico, não se anexa ao RQPS o relatório que comprova que aquele consumível foi ressecado conforme recomendação do seu fabricante.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "37351bb9-6ef7-461b-8804-e579e5b42f17",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 11",
        content: "Resolva a questão abaixo.",
        position: 11,
        activity: {
            id: "2f5f5283-406d-4822-9121-a8c8f9db9006",
            activity_type: "multiple_choice",
            statement: "Quanto ao documento “Registro da Qualificação de Procedimento de Soldagem” (RQPS), assinale a alternativa correta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "7c1b5de7-e226-4c86-b064-58b32df09fb6", content: "A) Independentemente do tipo de qualificação que esteja sendo realizada, o cálculo do aporte térmico introduzido na junta deve ser feito para todos os passes.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "7e9fd547-32c6-4d10-8c24-b1d3ee4b44ad", content: "B) No caso do uso de eletrodo revestido em uma determinada qualificação de procedimento de soldagem, o diâmetro deste consumível a ser informado deve ser medido na região do revestimento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "b0f292ef-3564-49b4-abdf-6a6d0d29a47e", content: "C) O valor da intensidade de corrente elétrica deve ser obtido diretamente da fonte de energia.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "851b89d8-540a-4e0f-bb36-3f226999ce41", content: "D) Caso o ensaio macrográfico seja obrigatório em uma determinada qualificação, é necessário que se guarde aquele corpo de prova, enquanto a qualificação for válida.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "c5c823e7-b295-4101-9e32-8b436b1b66ca", content: "E) Todos os instrumentos de medida empregados em uma determinada qualificação de procedimento de soldagem devem estar calibrados, sendo obrigatória a anexação ao RQPS da cópia de todos os certificados de calibração.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "91276969-66ba-469b-b8e4-d09bd71206f2",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 12",
        content: "Resolva a questão abaixo.",
        position: 12,
        activity: {
            id: "93cebea7-86df-41aa-ab31-c6c1ebf5e036",
            activity_type: "multiple_choice",
            statement: "Analisando os documentos “Especificação de Procedimento de Soldagem” (EPS) e “Registro de Qualificação de Procedimento de Soldagem” (RQPS), assinale a alternativa correta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "4bbb4756-dba6-49ca-89df-98984898b67f", content: "A) No RQPS, é informada a faixa de espessura do metal de base qualificada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "6fa81134-ee57-48ec-818c-7f6c1b4c59c0", content: "B) Na EPS, é informada a posição de soldagem da peça de teste utilizada durante a qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "23486285-d308-49f2-a1db-7d2e53c2beab", content: "C) Caso o eletrodo de tungstênio (processo GTAW) seja do tipo toriado (por exemplo), esta informação deve estar registrada em ambos os documentos.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "5dd9fbed-3c57-4f7e-b757-f7e5bd72e626", content: "D) Enquanto no RQPS registra-se apenas a classificação AWS do consumível de soldagem empregado na qualificação, na EPS registra-se apenas o “F-Number” deste consumível (caso a qualificação esteja sendo feita segundo o código ASME IX).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "064df33e-486e-4c18-bebe-f9d8874d191a", content: "E) Tendo em vista que o eletrodo de tungstênio é fundamental no processo de soldagem GTAW, o modelo da tocha usada na qualificação deve ser informado no RQPS.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "b050e686-3cc1-4899-a7a7-b764cc17a8b3",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 13",
        content: "Resolva a questão abaixo.",
        position: 13,
        activity: {
            id: "94bdef16-c2ab-4b5c-819d-462ebb2271c6",
            activity_type: "multiple_choice",
            statement: "Analisando especificamente o documento “Instruções de Execução e Inspeção de Soldagem” (IEIS), assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "8535eecc-8a71-4904-9102-76280024d83d", content: "A) A fabricação de um determinado equipamento exige a elaboração de uma IEIS própria.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "48331d2c-b6ce-4828-8e71-4520d6992a3a", content: "B) Pelo elevado grau de informação e confidencialidade deste documento (IEIS), cabe ao Inspetor de Soldagem Nível 2 a responsabilidade de guardá-lo, de forma que os soldadores ou operadores de soldagem não tenham acesso às informações ali contidas.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "9fa825cf-c834-4d84-8b31-f5cc710b3a89", content: "C) O desenho do equipamento a ser construído é uma das informações que deve ser apresentada em uma IEIS.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "7c37634b-3eb0-4b5f-bde5-d698f3395a80", content: "D) A relação de ensaios não destrutivos que deverão ser realizados na fabricação de um equipamento, o momento quando deverão ser conduzidos e suas respectivas quantidades são informações que precisam estar contidas em uma IEIS.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "20bd3957-8e55-4e60-a8ce-a27934bca017", content: "E) Em uma IEIS é fundamental que sejam informados os valores dos principais parâmetros de soldagem (limites ou faixas).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "d9f42605-3536-4b91-925f-3bd5514f3264",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 14,
        activity: {
            id: "f5439a5c-72d1-46f3-a609-444ec84d9aae",
            activity_type: "multiple_choice",
            statement: "7 ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "75f5b051-f74f-4866-aaf1-b84795aa8ef5", content: "A) Como este documento é uma das fontes de informações que permite que uma determinada peça seja soldada, nele deverá estar registrado o nome dos soldadores qualificados que poderão participar desta soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "15292606-6530-4e2c-a5f5-63441db7f2f1", content: "B) A IEIS faz parte da relação de documentos indicados pelas normas ASME IX, AWS D1.1 e API 1104 para ser usado durante e após a fabricação de um equipamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "31573875-154b-43d7-b061-9ab4052f83ae", content: "C) Como uma IEIS possui uma numeração própria, isto torna desnecessário que sejam informados neste documento os diferentes números das EPSs (caso haja mais de uma) que irão fazer parte deste documento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "4a435d1a-bf09-4dee-a5b1-7f4e6170719b", content: "D) A IEIS é um documento criado pela PETROBRAS, podendo ser encontrada na norma N-2301.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "b3a9c9ee-d71b-4c0b-bf94-0417994565a2", content: "E) Por suas características, é um documento de uso diário do Inspetor de Soldagem Nível 2 para o controle da execução e inspeção da soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "2baca6f8-ee2e-48b0-9fe5-70e43f72d6a1",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 15",
        content: "Resolva a questão abaixo.",
        position: 15,
        activity: {
            id: "1b22d5b9-8a5a-4235-ba56-1c008e5aa10a",
            activity_type: "multiple_choice",
            statement: "Qual das informações apresentadas a seguir não precisa estar informada em uma IEIS? ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "e9941d75-10ca-4086-a300-f50726766f4a", content: "A) Número do Registro de Qualificação de Procedimento de Soldagem.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "ff4c2d4c-1ded-4095-816d-6c0a511fb342", content: "B) Tipo de corrente, polaridade e faixa de valores da intensidade de corrente elétrica.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "20a4429a-51f2-4853-b1a5-bd91d0df569a", content: "C) Faixas de valores de tensão do arco e velocidade de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "6c5de702-0b34-4919-b4ab-684e9e168bb1", content: "D) Número da Especificação de Procedimento de Soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "92b5397f-3ffa-4840-a7f8-1e13ce37d135", content: "E) Se a norma de projeto de fabricação do equipamento for a norma ASME Seção VIII, deve ser informado o “P-Number” de cada metal base a ser soldado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "42f0aea5-0ac4-4d93-a6c4-94e5157be313",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 16",
        content: "Resolva a questão abaixo.",
        position: 16,
        activity: {
            id: "d5e6bebb-11e5-418a-a6ba-fefdd0dfd0c3",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas apresentadas a seguir não precisa ser informada no documento “Instruções de Execução e Inspeção de Soldagem” (IEIS)? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "514dae70-7305-4893-939e-43f6d24e7779", content: "A) Técnica a ser usada na limpeza inicial da junta antes do início da soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "1687dee0-2335-4afb-9038-95b02b4d653f", content: "B) Técnica a ser usada na limpeza entre passes.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "48c55bbc-0a36-48ab-8f77-87c3c64318f6", content: "C) Técnica a ser usada na goivagem da solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "fa539bf7-f6e0-4d0c-a6f7-d2fabe396179", content: "D) Técnica a ser usada na deposição dos cordões de solda.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "60a961cf-e5e5-458b-b4f4-4eda62ff88a1", content: "E) Técnica a ser usada na medição do valor das temperaturas de pré- aquecimento e interpasse.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "b97cfad3-9e0b-446a-9de9-525af6cfb03d",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 17",
        content: "Resolva a questão abaixo.",
        position: 17,
        activity: {
            id: "8676099a-15ac-45e4-924f-18af224f24fa",
            activity_type: "multiple_choice",
            statement: "No que diz respeito ao documento “Registro da Qualificação de Soldadores e Operadores de Soldagem”, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "9be87413-f891-4994-9f67-e0b7fd235994", content: "A) O soldador ou operador de soldagem que tiver sua qualificação aprovada em relação uma norma de qualificação, este profissional não poderá trabalhar em uma obra que seja conduzida por outra norma de qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "22236ae8-ed29-4f2e-89af-39f265afa0f1", content: "B) O soldador ou operador de soldagem só pode trabalhar fora de suas faixas qualificadas, quando houver uma autorização formal assinada por um Inspetor de Soldagem.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "e00c78ab-6968-497e-b18d-5dd8c9dc181f", content: "C) A qualificação de um soldador ou operador de soldagem é feita observando todos os parâmetros e condições estabelecidos em uma Especificação de Procedimento de Soldagem já qualificada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "2d1b07df-c3c3-4756-9995-66cb40aebe0f", content: "D) Um soldador ou operador de soldagem encontra-se qualificado, quando os resultados dos ensaios de sua peça de teste for considerada aprovada, de acordo com os critérios estabelecidos pela norma de qualificação usada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "c31c1370-102d-438b-8377-1badcdae6bb6", content: "E) O soldador ou operador de soldagem pode estar qualificado em mais de um processo de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "be1a681e-835c-4615-ab59-5d1429a304bb",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 19",
        content: "Resolva a questão abaixo.",
        position: 18,
        activity: {
            id: "184980a3-35b7-439f-bd6d-8d681baa9c52",
            activity_type: "multiple_choice",
            statement: "Em relação ao documento “Registro da Qualificação de Soldadores e Operadores de Soldagem”, identifique a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "ec8a5db0-d26c-45ad-8e56-1c2112b498d1", content: "A) A validade da qualificação de um soldador ou operador de soldagem só é interrompida, quando o mesmo se ausenta de suas funções por um período superior a 6 (seis) meses, como, por exemplo, em caso de acidente de trabalho.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "fa485a1e-2e07-4656-859d-254c88e02a23", content: "B) Um ensaio visual e um radiográfico da peça de teste, dependendo da norma de qualificação, muitas vezes são os únicos testes realizados para qualificar um soldador ou operador de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "17a99700-4ac4-41df-9858-5ff301d3765d", content: "C) Dependendo da norma de qualificação usada para qualificar um soldador ou operador de soldagem, são solicitados os seguintes ensaios em sua peça de teste: visual, radiográfico e dobramento. Este último é solicitado para os profissionais que irão utilizar o processo GMAW (curto-circuito).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "3f077597-0e39-4e19-827c-0da62d337fa0", content: "D) O soldador ou operador de soldagem, qualificado pela norma ASME IX, poderá soldar metais de base com diferentes “P-Number”s, além daquele P-Number da peça de teste usado em sua qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "96c91d84-1660-4e59-9766-ce4d969228e4", content: "E) O soldador ou operador de soldagem, qualificado pela norma ASME IX, poderá utilizar consumíveis com diferentes classificações AWS, além daquela classificação AWS usada em sua qualificação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "39344fdd-bb52-467a-8b78-ac14a9cf156b",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 20",
        content: "Resolva a questão abaixo.",
        position: 19,
        activity: {
            id: "359a486a-1143-4e81-a24c-f9da3fe60da6",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas apresentadas a seguir não precisa constar no documento “Relação de Soldadores e Operadores de Soldagem Qualificados” (norma de qualificação: ASME IX)? ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "18f99f01-107a-4a5c-9b91-09463ee5c3f1", content: "A) Progressão da soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "ee4bddd8-9720-416f-8120-dde610f4a12d", content: "B) Processo de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "56c42037-d2e8-4df5-a756-c6fb90d3144f", content: "C) Nome do Soldador ou Operador de Soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "89e3d46b-bb62-4031-bf8d-57292f020ea1", content: "D) Número do RQPS referência.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "bca087d3-1596-4146-91f9-eaf56c8e4d43", content: "E) Número da EPS referência.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "25a28870-3acd-4b59-be22-ed680f4036a3",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 20,
        activity: {
            id: "df95d203-c662-4ca4-b466-a19e679aac4f",
            activity_type: "multiple_choice",
            statement: "0 ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "cc07f131-691c-4d27-9672-c71316815074", content: "B) Uso de cobre-junta.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 1 },
            { id: "11f0de98-19cd-4a6e-ad07-5201c360faf4", content: "C) F-Number.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 2 },
            { id: "09829b67-a691-4dab-a4ed-ec9f26eb55ac", content: "D) Espessura do metal de base (T).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "c4b4a5dd-7c86-45b3-a842-6b033225072b", content: "E) Espessura do metal depositado (t).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "825b13fe-3798-450d-bad2-3a34e3038ab9",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 22",
        content: "Resolva a questão abaixo.",
        position: 21,
        activity: {
            id: "cbe3bde3-698a-480c-a8d7-d3c2e0f99d59",
            activity_type: "multiple_choice",
            statement: "Em relação ao documento “Controle de Desempenho do Soldador ou Operador de Soldagem”, marque a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "7cebb20c-6432-4504-8c01-5206dba58ceb", content: "A) Documento que auxilia na análise da qualidade da mão de obra dos soldadores e operadores de um determinado setor de uma fábrica ou da fábrica como um todo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "c93ee89c-4e9e-477a-b65a-7a8254ccf31d", content: "B) Documento que permite observar o desempenho dos soldadores ou operadores de soldagem em uma determinada semana ou ao longo de um período maior, a partir do momento em que este documento foi criado.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "8b3e8b2e-f933-4c08-a81d-059c73197c01", content: "C) Documento que analisa o desempenho dos soldadores ou operadores de soldagem a partir dos resultados dos ensaios radiográficos e/ ultrassônicos executados em suas juntas soldadas na fábrica.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "234b6b6b-e64e-435b-8b25-c3133479dd04", content: "D) A elaboração deste documento não está vinculada a uma EPS ou outro documento usado na área da soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "4d6a93b9-c907-4716-9503-0f824f793b90", content: "E) A validade da qualificação de um soldador ou operador de soldagem depende exclusivamente de seus resultados encontrados neste documento.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "fb570aba-a917-400f-aefd-f859f7313ac1",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 24",
        content: "Resolva a questão abaixo.",
        position: 22,
        activity: {
            id: "80ed62ca-4b8b-423f-9c03-7f2fb6801270",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas apresentadas a seguir não precisa ser informada durante o preenchimento do documento “Controle de Desempenho do Soldador ou Operador de Soldagem”, marque a alternativa correta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "669e2c24-7ac8-497d-a5de-e62d2e2e6954", content: "A) Identificação do Soldador ou Operador de Soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "40eef485-9803-49a7-8433-6a078408f5c7", content: "B) Data de realização da avaliação dos resultados dos ensaios radiográficos e/ou ultrassônicos.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "6abd028f-f710-4eef-85fb-603bdb1f7192", content: "C) Número de quantidade de radiografias aprovadas em um determinado período de tempo.", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "4d2904be-a355-4cf5-9780-302fd8580c97", content: "D) Localização do defeito no interior da junta soldada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "abcc6b45-d834-46a0-b8ff-35b9d014a6f7", content: "E) Somatório das extensões de juntas consideradas reprovadas pelo ensaio ultrassônico em um determinado período de tempo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "9a9cfb55-7d48-4dda-ba26-63a743d31e15",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 25",
        content: "Resolva a questão abaixo.",
        position: 23,
        activity: {
            id: "eb26564a-9a77-4ac4-9fbc-c83e5b2e746a",
            activity_type: "multiple_choice",
            statement: "No que diz respeito ao documento “Controle de Desempenho de Soldadores e Operadores de Soldagem”, pode-se afirmar que: ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "367e93f1-0462-4965-9983-fa62651823ef", content: "A) Para um melhor controle da qualidade, o documento deve ser atualizado semanalmente.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "550e2a67-84d2-4f86-9824-7856caa8a31b", content: "B) Documento baseia-se no percentual de radiografias aprovadas.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "ad5d40ab-7e7b-4f21-a601-a61f90d57fb1", content: "C) Tem por objetivo avaliar a produtividade de cada soldador em um determinado período de tempo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "fea6f7ee-d3e1-43c5-89a7-c31ac4c51a9c", content: "D) Documento que permite controlar a assiduidade dos soldadores e operadores de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "c02d2ed2-d01a-42e0-840b-f21eb53dd31c", content: "E) Documento que deve integrar o conjunto de documentos referentes à qualificação do soldador ou operador de soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "93340dea-a902-4b5a-8d7f-2624482f126c",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 26",
        content: "Resolva a questão abaixo.",
        position: 24,
        activity: {
            id: "82862d24-12cc-4f0b-865b-cedfa7b0fbbf",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas a seguir, identifique a informação que não precisa constar no documento “Relatório de Inspeção de Produto”? ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "b9f7434c-bfc3-4782-994f-2b88cacee671", content: "A) Conclusão do relatório.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "e1071ce2-91cf-40cd-b058-b5a5bdc1cf42", content: "B) Descrição do produto ou equipamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "c6e153c1-4825-41f4-b5cd-6898964bbaeb", content: "C) Objetivo da inspeção.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "67c7da64-4641-4f16-b7a9-8c7fd2b54aa3", content: "D) Nome do Inspetor de Soldagem Nível 2, com seu respectivo número de identificação, responsável pela soldagem do produto ou equipamento.", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "c4d0b041-882e-4143-b5f7-eeb442965e86", content: "E) Resultados da inspeção, contendo comentários claros e relevantes.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "9144f34f-376d-4843-9091-f6b7658ab93d",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 27",
        content: "Resolva a questão abaixo.",
        position: 25,
        activity: {
            id: "9b9144f0-8b74-4adf-80aa-98cafc399bc5",
            activity_type: "multiple_choice",
            statement: "Qual das alternativas apresentadas a seguir não necessita ser citada no documento “Relatório de Inspeção de Produto”? ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "300af769-159c-4d4f-b58f-529d53aa3fcf", content: "A) Especificação do metal de base.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "dada9b4a-a9c1-41a3-945f-ff548d914497", content: "B) Localização do equipamento no interior da fábrica, após sua instalação.", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "e1e376ac-cc34-4e21-b5d7-6e681e0b6d4f", content: "C) Norma de projeto de fabricação.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "0c38876f-94f7-483d-b84c-aaf8b5905a35", content: "D) Nome do fabricante do equipamento.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "048ae424-c2a4-4839-960f-5997f3e92c90", content: "E) Tipo de equipamento (exemplo: vaso de pressão, tubulação, etc.).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["26642694-de13-473d-a0ba-c4c83bf0703d"].push({
        id: "41945d22-9704-43c0-bcbe-dbf4920a6f4c",
        lesson_id: "26642694-de13-473d-a0ba-c4c83bf0703d",
        step_type: "activity",
        title: "Questão 28",
        content: "Resolva a questão abaixo.",
        position: 26,
        activity: {
            id: "c9d517ae-e801-42df-949a-80776e9dc1da",
            activity_type: "multiple_choice",
            statement: "Qual dos documentos apresentados a seguir não necessita ser mantido sob a responsabilidade do Inspetor de Soldagem? ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "273897a6-098e-4464-8774-8cdcece1d266", content: "A) Controle de Desempenho de Soldadores ou Operadores de Soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "9b98b1f6-7dab-4b75-ab37-3d904d54bda1", content: "B) Registro da Qualificação de Procedimento de Soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "75da48d2-9f14-4869-9936-55fe7915668f", content: "C) Instruções de Ensaio e Inspeção de Soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "282679d3-1fee-447e-b689-f22c103803be", content: "D) Relação de Soldadores ou Operadores de Soldagem Qualificados.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "c6a7f2ab-e13d-4632-893d-4c6549eef72c", content: "E) Número do lote do material utilizado no ensaio de líquido penetrante.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_MODULES.push({
        id: "673c4cd4-c956-41e7-87a9-3e52378fbb69",
        course_id: "c5555555-5555-5555-5555-555555555555",
        title: "Terminologia",
        description: "Questões e atividades sobre Terminologia",
        position: 12,
        is_published: true
    });

    STATIC_LESSONS.push({
        id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        module_id: "673c4cd4-c956-41e7-87a9-3e52378fbb69",
        title: "Prática - Terminologia",
        description: "Exercícios do banco.",
        estimated_minutes: 60,
        position: 1,
        lesson_type: "interactive",
        is_published: true
    });
    
    if (!STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"]) {
        STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"] = [];
    }

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "a4cec831-ada8-40c5-8044-72204283e0b9",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 2",
        content: "Resolva a questão abaixo.",
        position: 1,
        activity: {
            id: "6336cdb9-8fed-47b7-b190-848a8dacbad6",
            activity_type: "multiple_choice",
            statement: "Analisando a junta de ângulo (solda em ângulo convexa) mostrada a seguir, pode-se observar vários tipos de gargantas de solda. Marque a alternativa  que indique a seguinte sequência: Garganta Teórica, Garganta Efetiva e Garganta Real. \n\n<img src=\"/images/questions/page6_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "d02befc5-f59b-49a1-bf7f-8d356f626c3f", content: "A) 1- Garganta Teórica;  2- Garganta Efetiva;  5- Garganta Real.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "a8763d3e-05ab-4028-9b3e-43741586d386", content: "B) 2- Garganta Teórica;  4- Garganta Efetiva;  5- Garganta Real.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "61c15715-e7ba-4b6d-9975-01b63d60c7d0", content: "C) 1- Garganta Efetiva;  2- Garganta Real;  3- Garganta Teórica.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "91fb7b8a-96b8-4ef0-848f-1094a9a41269", content: "D) 1- Garganta Efetiva;  2- Garganta Teórica;  4- Garganta Real.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "7624d05b-ed06-47ae-b3f1-2a7a74742fec", content: "E) 1- Garganta Teórica; 3- Garganta Efetiva;  4- Garganta Real", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "4aae8388-8691-4dd1-a55e-73bf29ee189c",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 3",
        content: "Resolva a questão abaixo.",
        position: 2,
        activity: {
            id: "96e7c287-94f0-410e-bb3d-e565a24535e6",
            activity_type: "multiple_choice",
            statement: "Das descontinuidades apresentadas abaixo, indique aquela que nunca pode ser encontrada na raiz da solda: \n\n<img src=\"/images/questions/page6_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "01762d46-7c25-4cf6-aa14-d3f9344fb394", content: "A) Sobreposição;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "0e47c7ba-7d6b-4c31-b89e-26e0ed81853e", content: "B) Trinca;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "4ee6084b-31fb-4bf7-93eb-39430149f7fc", content: "C) Falta de fusão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "421f9564-0a0b-4da5-a127-1c886167cbd7", content: "D) Falta de penetração; 7", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "a926a1a1-38fd-4aea-bcd2-e03399659dbb", content: "E) Penetração excessiva;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "5ee49e19-e442-4c43-bb72-05a1bd6c89a7",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 4",
        content: "Resolva a questão abaixo.",
        position: 3,
        activity: {
            id: "10334bb7-d4ee-441a-9034-ade0304840ab",
            activity_type: "multiple_choice",
            statement: "Das descontinuidades apresentadas abaixo, marque aquela que só é encontrada em juntas de topo. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "f2a9a747-f5c5-4b29-86d7-cf9589e94c08", content: "A) Convexidade excessiva;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "b44b8e63-ecdd-4449-9fdd-4b989bdc4678", content: "B) Desalinhamento;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "a3fe023d-8347-446c-a084-e49a87d0d3ce", content: "C) Deformação angular;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "67dc16b6-3f4c-43a5-bd46-f66b6074bc51", content: "D) Solda em ângulo assimétrica;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "72c0657c-5999-469d-9aa9-303bdf087043", content: "E) Concavidade excessiva.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "ec3e85ed-c057-44c3-a89f-426d99f8c6cb",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 5",
        content: "Resolva a questão abaixo.",
        position: 4,
        activity: {
            id: "57fe64a3-f711-44bd-99e0-67136cf13079",
            activity_type: "multiple_choice",
            statement: "Dos tipos de juntas apresentadas abaixo, assinale aquela que não está associada  a uma solda de ângulo. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "17e6a85e-a821-486f-86c7-8030f02bbde5", content: "A) Junta em quina;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "183068c3-6cf3-4029-b20a-350db97c0ee1", content: "B) Junto de ângulo em T;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "03d908f8-7d58-4fce-b9e2-95fe9ce45e88", content: "C) Junta em L;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "ee3c39ba-d074-4848-bbec-74b5a54e7b13", content: "D) Junta sobreposta;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "398e2718-4c68-450b-9f0e-0b8d3d4cd3fb", content: "E) Junta de aresta.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "7a16a80b-884c-4b1b-ac13-d12be339c21a",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 6",
        content: "Resolva a questão abaixo.",
        position: 5,
        activity: {
            id: "11f75e72-d7ec-45fa-a436-c9ceb8fde337",
            activity_type: "multiple_choice",
            statement: "Dos diferentes tipos de juntas formadas entre os componentes a serem soldados, marque a definição correta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "61b81a82-0842-49a4-904c-211d635d2bbf", content: "A) Junta de aresta: junta formada por dois componentes a soldar, de tal maneira que suas superfícies sobrepõem-se.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "eeacc023-ad12-4f65-af3b-08a3743e144d", content: "B) Junta de Ângulo: junta em que, numa seção transversal, os componentes a soldar apresentam-se sob forma de um ângulo;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "493e41b8-ffb9-4768-82ad-9938da4c0c95", content: "C) Junta Dissimilar: junta soldada, cuja composição química do metal de base dos componentes não difere significativamente entre si;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "9a11bb72-a299-4e4d-bb32-a2ddce63f838", content: "D) Junta Sobreposta: Junta entre as extremidades de dois ou mais membros paralelos ou parcialmente paralelos;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "3e89501a-041c-46ad-b6a4-2294298bc867", content: "E) Junta de Topo: junta entre dois ou mais membros, devendo todos eles se encontrarem no mesmo plano. 8", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "c3179823-6eb3-4e79-980d-e36b075302a9",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 9",
        content: "Resolva a questão abaixo.",
        position: 6,
        activity: {
            id: "8cc2f85c-47ff-412c-9416-4250ca0f19d5",
            activity_type: "multiple_choice",
            statement: "Qual o único tipo de trinca que não pode ser encontrada na ZTA (zona termicamente afetada) de uma junta soldada. \n\n<img src=\"/images/questions/page9_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "623f314e-becb-4acb-bb4b-11a796ca9190", content: "A) Trinca de cratera;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "a1c7e470-d8b8-4b1a-8b90-1e259a4fefb8", content: "B) Trinca na margem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "222209f1-e52a-4287-b905-151db4b56974", content: "C) Trinca sob cordão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "be7a17d8-f553-4543-931c-90f23b0c0b95", content: "D) Trinca ramificada;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "539bc3e3-0aa8-4bde-8f31-3ab6d177fd7f", content: "E) Trinca na raiz.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "af4b2543-9fdf-491f-8f90-ec8ffad00623",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 10",
        content: "Resolva a questão abaixo.",
        position: 7,
        activity: {
            id: "325b23f1-e8ad-49c6-a116-e39002e536aa",
            activity_type: "multiple_choice",
            statement: "Dos diferentes tipos de trinca, assinale qual delas só pode ser localizada no metal de base. \n\n<img src=\"/images/questions/page9_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "aaacd2e9-b56c-4349-8d7c-489b1014af88", content: "A) Trinca irradiante;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "82302c2a-9eac-4b15-b011-c8020fd440b5", content: "B) Trinca de cratera;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "387072eb-5ab0-4efc-82b7-00113d0b6cbd", content: "C) Trinca longitudinal; 10", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "551af404-d6e7-4cd2-a35d-4990da026922", content: "D) Trinca estrela;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "487bc9f7-0fa4-418c-a5b6-4d47fb2a4a0b", content: "E) Trinca interlamelar.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "7732011a-da21-405a-b5da-0aea4378c3d4",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 11",
        content: "Resolva a questão abaixo.",
        position: 8,
        activity: {
            id: "50531597-3dfa-4508-b65e-3bc896433ad2",
            activity_type: "multiple_choice",
            statement: "Em relação ao conceito de defeitos e descontinuidades, assinale a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "c0ac0505-5f84-4968-bec5-9a9f2787061e", content: "A) Nem toda descontinuidade pode ser considerada um defeito;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "5a192dc3-1728-4b6b-9405-ea6c809e04e8", content: "B) Cada norma técnica estabelece seus próprios critérios de aceitação em relação a uma determinada descontinuidade;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "5aa321e4-ee6e-4cf3-a2d6-4bf59992cd0b", content: "C) Descontinuidade é a interrupção das estruturas típicas de uma peça no que ser refere à homogeneidade de características metalúrgicas, mecânicas e físicas;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "3092950d-2230-4076-abb8-d84231efb47a", content: "D) Ao se deparar com uma determinada descontinuidade na região da junta soldada, o Inspetor de Soldagem necessita solicitar imediatamente o seu reparo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "e7fa78c2-1ba8-4fdb-befe-a1869dc9efca", content: "E) A descontinuidade só deve ser considerada defeito quando, por sua natureza, dimensão ou efeito acumulativo, tornar a peça inaceitável por não satisfazer os requisitos mínimos da norma técnica aplicável.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "5ef9d8ed-4b26-4fea-a459-6913ec580bb1",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 12",
        content: "Resolva a questão abaixo.",
        position: 9,
        activity: {
            id: "d335ad6b-4e3d-4f5b-b937-b716701cd5cd",
            activity_type: "multiple_choice",
            statement: "Das definições apresentadas abaixo, relativas às descontinuidade encontradas na região de juntas soldadas, assinale a alternativa correta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "4b29d752-9c90-491a-8f25-f440dd4a60de", content: "A) Deformação angular: distorção angular em relação à configuração de projeto, típica das juntas de ângulo.", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "4cac5075-0124-4455-b6e5-25cfacdb2de1", content: "B) Mordedura: reentrância na raiz da solda, podendo se localizar na parte central (situada ao longo do centro do cordão) e lateral (situada nas laterais do cordão);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "7b3a0998-703c-423e-a286-8c583da9c2ec", content: "C) Poro: vazio isolado, não arredondado com a maior dimensão paralela ao eixo da solda;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "4c0c3258-c616-4302-ac03-d50292d4bc7d", content: "D) Deposição insuficiente: solda em ângulo cujas pernas são significativamente desiguais em desacordo com a configuração de projeto;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "fd0d69f2-3f25-4027-b6dc-59691514c211", content: "E) Reforço excessivo: excesso de metal da zona fundida sobreposto ao metal de base, na margem da solda, sem estar fundido ao metal de base. 11", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "97fc8bb0-80b0-4334-b643-710d80809578",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 13",
        content: "Resolva a questão abaixo.",
        position: 10,
        activity: {
            id: "739d36e2-7726-47c9-a8a9-9a7c3f5e3ded",
            activity_type: "multiple_choice",
            statement: "Em relação aos diferentes tipos de consumíveis de soldagem, assinale a alternativa correta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "5a8069ea-8afd-49cb-8b3c-c5b221cdd07d", content: "A) Vareta de solda: tipo de metal de adição utilizado para soldagem ou brasagem, sobre o qual é aplicado um revestimento do tipo “neutro”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "46c94f2b-c43c-4907-9725-43ad05883cc0", content: "B) Eletrodo nu: metal de adição consistindo de um metal não ligado (puro), produzido apenas sob a forma de arame;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "09682cd3-31b8-4707-9a6d-4fa696abd629", content: "C) Eletrodo revestido: consumível consistindo de uma alma de eletrodo, sobre a qual um revestimento é aplicado. Este revestimento tem apenas duas funções: formar uma atmosfera protetora e abrir o arco elétrico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "5f48fb60-c731-44b7-8bbb-156cfd0ab26f", content: "D) Eletrodo tubular: (também chamado de Arame Tubular) é um metal de adição consistindo de um tubo metálico oco, cujo uso de um gás de proteção externo é essencial para a sua aplicação;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "5cda0837-5b28-4907-a3e1-021bbb05730c", content: "E) Fluxo: composto mineral granular, cujo objetivo é proteger a poça de fusão, purificar a zona fundida, modificar a composição química do metal de solda, influenciando suas propriedades mecânicas.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "6cff4c62-7b3e-49c3-b9ec-06ccd7022906",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 14",
        content: "Resolva a questão abaixo.",
        position: 11,
        activity: {
            id: "e52219df-4fe3-441e-905b-203a4d25878c",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas abaixo, assinale a resposta correta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "fde052c1-851b-476d-bc3e-01885a1472a2", content: "A) Eficiência de Deposição: é a relação entre o peso do consumível de soldagem e o peso do metal depositado, expressa em %/g;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "8963b5e8-f2dc-4bd0-b3c3-fa45083f78e4", content: "B) Taxa de Deposição: é o peso do consumível utilizado durante a soldagem por unidade de tempo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "3e2a5499-101b-4b32-ad6a-e61bc27359a8", content: "C) ;Eficiência de Junta: é a relação entre o valor da resistência do metal depositado e a resistência do metal de solda, expressa em %;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "f4100c6d-9675-4c42-977b-2a0617f8360f", content: "D) Velocidade de Avanço: é a velocidade da poça de fusão durante a soldagem;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "a89f5851-4729-40ec-8cb6-6d1cefbdb105", content: "E) Velocidade de Alimentação de Arame: é medida levando em consideração o peso do arame consumido em um determinado tempo, expressa em (kg/h).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "21b65f28-7a81-4ca3-b2bc-4a8028118cac",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 15",
        content: "Resolva a questão abaixo.",
        position: 12,
        activity: {
            id: "95d77532-924e-424e-8d55-0b8ac964876b",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas abaixo, assinale a resposta incorreta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "3a3a7179-be53-4db2-9bcd-53755b1eb436", content: "A) Metal de Base: metal puro ou liga metálica a ser soldada, cortada ou brasada;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "e6ed8ff7-5bfa-4375-b5e2-12934280b73b", content: "B) Metal de Solda: porção do metal de base que foi fundido durante a soldagem; 12", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "4c89c3d7-b052-4476-899e-6e93c7d295b1", content: "C) Metal Depositado: metal de adição que foi depositado durante a operação de soldagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "f0231563-b23f-4540-a545-67c098c14c92", content: "D) Metal de Adição: metal puro ou liga metálica a ser adicionada para a fabricação de uma junta soldada ou brasada;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "e1dfcadd-52e3-46ba-a614-3160b2c4ed1a", content: "E) Metal de Solda: porção da junta soldada que foi completamente fundida durante a soldagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "cc14b719-25b0-4e8c-af97-fb0bf7acdc03",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 16",
        content: "Resolva a questão abaixo.",
        position: 13,
        activity: {
            id: "a05ae58b-3850-4f42-86ef-5200449f9781",
            activity_type: "multiple_choice",
            statement: "Quanto ao furo usado em uma solda do tipo Tampão, cuja função é permitir que duas chapas sobrepostas ou em forma de “T” possam ser soldadas, marque a alternativa incorreta. ",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "a750c1a0-163d-409f-b97e-43f44ad1e470", content: "A) As paredes do furo podem ser paralelas ou não;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "3203bc98-56ad-45f3-864f-7f93bcab33d3", content: "B) O furo pode ser parcialmente ou totalmente preenchido por solda;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "8c0abf7f-e42f-4c11-83e4-860fe0d9b791", content: "C) O furo tem que ser totalmente preenchido por solda;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "137a882e-4997-4ea5-9968-a526690b81a9", content: "D) O furo pode ser do tipo “circular”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "f709de36-21db-46cc-a2d6-0da38e30d7a9", content: "E) O furo pode ser do tipo “alongado”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "ecd67532-db76-4495-920d-23a669f009e0",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 17",
        content: "Resolva a questão abaixo.",
        position: 14,
        activity: {
            id: "a2f563fa-c905-41e2-b3b2-17d68fa48f34",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas abaixo, assinale a resposta correta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "58c7e495-c7d8-4d5c-994e-7b8ee48a9910", content: "A) Solda Autógena: solda produzida por fusão, quando se faz necessária a aplicação de pressão diretamente na junta durante a soldagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "03b36541-a44e-4038-bd9b-1d965e97f4f8", content: "B) Solda de Topo: solda executada em uma junta de topo, à exceção daquelas juntas que apresentam chanfros que necessitam ser confeccionados por usinagem, a saber: chanfro em “J”, em “Duplo J”, em “U”, e em “Duplo U”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "ed7ef1b7-b007-49b7-ac29-42e0452c1d21", content: "C) Solda de Selagem: solda executada exclusivamente em junta de topo, cuja sanidade deve ser avaliada por ensaio radiográfico ou ultra-som;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "eac324f6-9425-4193-8969-2c92a4627a40", content: "D) Solda em Ângulo: solda de seção transversal aproximadamente triangular que une duas superfícies em ângulo, em uma junta em “T”, em junta em quina e em uma junta sobreposta;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "8b2a6755-34f8-4576-addc-93cbe4cd6dff", content: "E) Solda de Aresta: solda executada em uma junta sobreposta;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "a77851b3-5011-4b6a-92e3-5751bde5243d",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 18",
        content: "Resolva a questão abaixo.",
        position: 15,
        activity: {
            id: "00fb211d-1faa-446f-aff3-b388f2e7472f",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas abaixo, assinale a resposta correta. 13 ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "a2633adb-75e5-4eff-ad75-390f03889089", content: "A) Solda Heterogênea: Solda cuja composição química da zona fundida difere significativamente da do(s) metal(is) de base, no que se refere aos elementos de liga;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "6b8321b2-40b0-420f-9f87-776955e94dc1", content: "B) Solda Autógena: solda produzida unicamente pelo calor gerado por um arco elétrico, não sendo necessária a aplicação de pressão diretamente na junta durante a soldagem;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "3b15322b-284e-47c4-ad6f-b57e160bf183", content: "C) Solda Homogênea: solda cuja composição química da Zona Termicamente Afetada é muito próxima a do metal de base ;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "97f0da68-21bc-4527-a525-9d7d5e81d241", content: "D) Solda Provisória: também chamada de “Amanteigamento”, tem a finalidade de fazer uma ponte metalúrgica na soldagem de diferentes metais de base;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "46e6d180-a423-4ccd-9a3a-d48424ec8024", content: "E) Soldagem: processo utilizado para unir apenas materiais metálicos por meio de solda, como também pela técnica de brasagem.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "3f8719d5-c30f-4669-ae42-8d3658cbde36",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 19",
        content: "Resolva a questão abaixo.",
        position: 16,
        activity: {
            id: "71009061-5ad9-4ef4-9f2b-0c9a19db5efd",
            activity_type: "multiple_choice",
            statement: ".Quanto à definição do termo “Solda de Costura”, marque a alternativa incorreta. \n\n<img src=\"/images/questions/page13_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "30c2c796-6b0a-416d-b979-1b8df083ec5a", content: "A) É uma solda contínua executada em cima de membros sobrepostos;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "1a6115c4-0073-4911-9aae-9b210390a54f", content: "B) É uma solda contínua executada entre membros sobrepostos;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "e33568d2-b7be-4597-9c33-c2ff720df1ca", content: "C) A solda pode ser realizada pelo processo manual com eletrodo revestido;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "ff9e4ebb-b693-4523-815f-8aa4f674db28", content: "D) A solda pode ser realizada pelo processo GMAW (MIG/MAG);", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "4b337297-4463-4de3-b28d-7952faccd0d5", content: "E) A solda pode ser realizada pelo processo por pontos (resistência elétrica).", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "03b3bd47-80cd-4ca6-bb0b-3e1b924dbf00",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 20",
        content: "Resolva a questão abaixo.",
        position: 17,
        activity: {
            id: "ec83c7f7-a972-44a9-9c18-e3690b3138bb",
            activity_type: "multiple_choice",
            statement: "No croqui da junta de topo abaixo, indique qual dos números apresentados representa a definição de “Dimensão da solda em chanfro”. \n\n<img src=\"/images/questions/page13_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "1440d468-355d-4b2e-9241-38ab8e0560f8", content: "A) 1;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "0e4df64e-6a10-40af-a70e-a99bf222a5f3", content: "B) 2; 14", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "06c62dee-1efa-423d-9d8b-a06fb13be9dd", content: "C) 3;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "93bdaeae-c658-491a-b395-4e0f1e15e1aa", content: "D) 4;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "14180273-5cea-4693-9130-ccfa670272fe", content: "E) 5.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "cf1c703b-efaf-4ffe-83fb-348ad76d9c88",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 21",
        content: "Resolva a questão abaixo.",
        position: 18,
        activity: {
            id: "42500f04-86d4-455f-893b-f441b086467f",
            activity_type: "multiple_choice",
            statement: "Analisando os diferentes tipos de zonas existentes em uma junta soldada, assinale a alternativa correta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "7b6d78dc-95ee-4288-b53d-fc67ab0d2f8c", content: "A) A região correspondente à Zona Fundida está inscrita dentro do metal depositado;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "4ee0d02e-7fd1-45e5-9e7d-060ea645c2a6", content: "B) A Zona de Ligação separa a Zona Fundida da Zona Termicamente Afetada;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "5302d237-8857-4241-99d4-b9619aa69835", content: "C) Pode-se afirmar que a Zona Termicamente Afetada e a Zona de Fusão são as mesmas regiões;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "68a5e4e0-68d7-45eb-b3ba-633b4e92c5e4", content: "D) Apesar da região da Zona Termicamente Afetada se localizar no metal de base, pode-se afirmar que a sua composição foi significativamente modificada pelas altas temperaturas do arco elétrico;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "b593bd6c-72dc-47eb-8f0b-afb8861d0375", content: "E) A microestrutura encontrada na ZTA é a mesma do que aquela encontrada no metal de base.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "8b5e2f46-d1f3-4fbd-9c05-5c64ff232743",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 22",
        content: "Resolva a questão abaixo.",
        position: 19,
        activity: {
            id: "b3485af2-5b47-48ef-8469-c436d291a420",
            activity_type: "multiple_choice",
            statement: "Dos diferentes tipos de “Faces” existentes na soldagem, indique a alternativa correta. ",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "21ed617e-bed5-4bbc-8d10-1b95878c61a2", content: "A) Face do chanfro: parte da face do chanfro adjacente à raiz da junta;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "49be452b-17fd-4ab9-9d70-c5e7b432478a", content: "B) Face da Solda: superfície exposta da solda, pelo lado oposto por onde a solda foi executada.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "5612e7cf-33d2-4bd9-b349-c20576ae0df6", content: "C) Face de Fusão: superfície de um componente localizado no interior do chanfro;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "04073de1-a235-41f7-ac4d-6f86a319cfd3", content: "D) Face da Raiz: porção da junta a ser soldada onde os membros estão o mais próximo possível entre si;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "47caf438-49d6-457c-8b9d-029f12ff28e5", content: "E) Face da Solda: superfície exposta da solda, pelo lado por onde a solda foi executada.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "c58dafb4-05b0-42a7-8f86-1caaa2859aa1",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 23",
        content: "Resolva a questão abaixo.",
        position: 20,
        activity: {
            id: "fcfa1a1a-b02f-4775-94bc-40eca587e791",
            activity_type: "multiple_choice",
            statement: "Das definições para os termos “Soldagem Manual, Soldagem Semi- automática e Soldagem Automática”, assinale a alternativa incorreta. 15 ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "f09b8536-8465-4c5f-b7a2-30da712e8bc6", content: "A) Soldagem Manual: processo no qual toda a operação é executada e controlada manualmente;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "1e530f9c-021e-47d8-8d15-034949aafa9b", content: "B) Soldagem Semi-automática: soldagem a arco com equipamento que controla somente o avanço do metal de adição. O avanço da soldagem é controlado manualmente;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "6103cbe8-2314-4e5d-91c6-f1c2bb564e5c", content: "C) Soldagem Automática: processo no qual toda a operação é executada e controlada automaticamente sem a interveniência do operador;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "559a00c6-2353-40d5-a5f5-bc61a2e6809d", content: "D) Pode-se afirmar que o processo TIG Mecanizado é um exemplo de soldagem manual e que os processos GMAW (MIG/MAG) e FCAW (Arame tubular) são exemplos de soldagem semi-automática;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "878eafb5-54ca-465a-a370-3ee154c3ca99", content: "E) A Soldagem Manual e a Soldagem Semi-automática são executadas por “Soldadores”, enquanto a Soldagem Automática é executada por “Operadores de Soldagem”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "c2c5293a-44e9-496a-b020-7188efe6db8b",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 24",
        content: "Resolva a questão abaixo.",
        position: 21,
        activity: {
            id: "4adff958-9ed0-44be-8c68-13212dc97207",
            activity_type: "multiple_choice",
            statement: "Em relação aos 6 croquis apresentando diferentes tipos de juntas, indique qual alternativa está correta. I II III IV 16 V VI \n\n<img src=\"/images/questions/page15_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page15_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "2d92b63c-649e-4398-9a9f-9461d79000cf", content: "A) As juntas I, III, IV e V são classificadas como “Juntas de Ângulo”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "2c119358-1f84-455b-8081-626a068d71f5", content: "B) As juntas II e IV são denominadas, respectivamente, “Junta de Aresta” e “Junta Sobreposta”;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "596be85a-95c4-4413-bd83-64e381cb3458", content: "C) A juntas III e V são denominadas, respectivamente, “Junta em Quina” e “Junta em L”;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "50b20957-fbf8-4e42-a049-b8c17f0792d8", content: "D) A juntas I e VI são denominadas, respectivamente, “Junta de Ângulo em T” e “Junta de Ângulo em Ângulo”", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "61819d06-5709-4e64-b88a-90b59914d07a", content: "E) As juntas II e IV são classificadas como “Juntas de Topo”.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "6cfa34d7-154d-4608-8642-7ccf62b228c0",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 25",
        content: "Resolva a questão abaixo.",
        position: 22,
        activity: {
            id: "59ea0509-aff6-4e04-b679-f59b0023f06c",
            activity_type: "multiple_choice",
            statement: "Das definições dos termos “Passe de Revenimento”, “Camada”, “Passes” e “Dimensões”, analise o croqui abaixo e assinale a alternativa correta. \n\n<img src=\"/images/questions/page16_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page16_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "361a5f03-d444-489d-9ceb-b5d0dd07ecda", content: "A) Nº do passe de revenimento: 14 Nº de camadas: 6 Nº total de passes: 17 Dimensão do passe de raiz (mm): 47", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "5c801c0f-c9f9-43a4-8654-3643db799baf", content: "B) Nº do passe de revenimento: 18 Nº de camadas: 5 Nº total de passes: 18 Dimensão do passe de raiz (mm): 3,8 17", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "e2e48148-2c99-4135-850a-b0b4ab70a654", content: "C) Nº do passe de revenimento: 18 Nº de camadas: 6 Nº total de passes: 18 Dimensão do passe de raiz (mm): 3,0", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "9ac30c4c-a5f8-491d-97fa-cc1ad85a8f2d", content: "D) Nº do passe de revenimento: 14 Nº de camadas: 5 Nº total de passes: 17 Dimensão do passe de raiz (mm): 3,0", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "0943dc6b-e320-4f6a-ace8-e91594eb7352", content: "E) Nº do passe de revenimento: 18 Nº de camadas: 6 Nº total de passes: 18 Dimensão do passe de raiz (mm): 3,8", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "7e345e75-3253-498a-914f-3b41ff62149f",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 26",
        content: "Resolva a questão abaixo.",
        position: 23,
        activity: {
            id: "d3aacc0e-e93c-41be-8180-9d659061bbef",
            activity_type: "multiple_choice",
            statement: "Analisando o croqui abaixo, identifique o tipo de solda apresentado. \n\n<img src=\"/images/questions/page17_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "91c50dfe-e918-4d5d-8244-9d937b0b4a31", content: "A) Solda em escalão;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "3c09b57a-608a-4c57-a8ac-0b2315a56514", content: "B) Solda descontínua coincidente;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "dd72e455-1962-4c16-8740-12e5ba79821c", content: "C) Solda em cadeia;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "755a1177-7491-489b-8fdb-7804a7fc8abd", content: "D) Solda contínua intercalada;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "8f78547b-bf07-4b71-a7aa-e1f7c9af4d32", content: "E) Solda contínua coincidente.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "ae29b607-eb01-4533-8ea7-dedfcf4913db",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 27",
        content: "Resolva a questão abaixo.",
        position: 24,
        activity: {
            id: "5d1f690e-7b13-41e5-95aa-cb8f3a52955f",
            activity_type: "multiple_choice",
            statement: "Observando a junta apresentada no croqui a seguir, identifique os diferentes termos técnicos. 18 \n\n<img src=\"/images/questions/page17_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "8070468a-e357-42fc-bca8-3a1a02fda8e1", content: "A) Abertura da raiz:  1 Face da raiz: 2 Ângulo do Bisel: 4 Ângulo do Chanfro: 5", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "bc7c7d3f-4bf3-499c-ab41-c67426def039", content: "B) Abertura da raiz: 1 Face da raiz: 2 Ângulo do Bisel: 3 Ângulo do Chanfro: 4", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "9a85db7b-af34-4ff5-98d6-7e8f43ded2a9", content: "C) Abertura da raiz: 2 Face da raiz: 1 Ângulo do Bisel: 5 Ângulo do Chanfro: 4", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "770aeab0-75ee-4fc5-a19b-8cdf497fa82a", content: "D) Abertura da raiz: 2 Face da raiz: 5 Ângulo do Bisel: 3 Ângulo do Chanfro: 4", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "1d34155f-c76c-4c62-8924-f3ad9e170dd8", content: "E) Abertura da raiz: 1 Face da raiz: 2 Ângulo do Bisel: 5 Ângulo do Chanfro: 3", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "9cf21f30-3864-41b1-82a3-336b40f01529",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 28",
        content: "Resolva a questão abaixo.",
        position: 25,
        activity: {
            id: "4c74e31c-e833-4d59-a44f-8b427eedcefb",
            activity_type: "multiple_choice",
            statement: "Observando os diferentes tipos de trincas encontrados no croqui abaixo, marque qual trinca não está presente. \n\n<img src=\"/images/questions/page19_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "1aafb1e4-15f9-441a-920e-f48d8268bed4", content: "A) Trinca longitudinal;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "623ffd2d-c897-4ce2-adc7-e78484e9db75", content: "B) Trinca interlamelar;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "292e3da1-a966-4eae-985c-b37b1a61d34f", content: "C) Trinca na raiz;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "4acaad71-d2e6-4e42-828f-9650b90f6f61", content: "D) Trinca ramificada", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "283adc18-7e3d-4c78-9156-69a6bff5000d", content: "E) Trinca irradiante.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "35e4c3d5-1489-4e20-a9f5-e48de56599f5",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 29",
        content: "Resolva a questão abaixo.",
        position: 26,
        activity: {
            id: "29c754bd-fb3a-4721-8197-2aa7a3825317",
            activity_type: "multiple_choice",
            statement: "Analisando as definições dos termos “Passe de Solda”, “Passe Estreito”, “Passe Oscilante” e “Passe de Revenimento”, assinale a alternativa correta. \n\n<img src=\"/images/questions/page19_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "81ca616a-9fa4-4c5a-8eb4-37307566423f", content: "A) Passe de solda: produto da fusão de um consumível de soldagem. Desta forma, pode-se afirmar que um cordão de solda em uma junta soldada poderá ter mais de um passe de solda;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "04633a7a-d083-4df5-bbc5-2acde8b0def5", content: "B) Passe estreito: depósito efetuado seguindo o eixo da solda sem qualquer movimento lateral;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "e8093eb6-fea5-439b-a07d-9afad917d277", content: "C) Passe oscilante: depósito efetuado com movimento lateral (oscilação transversal) em relação ao eixo da solda; 20", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "fa2b3e4c-044d-46a4-8b26-48c222286e2d", content: "D) Passe de revenimento: é o passe empregado quando o aço, que está sendo soldado, sofreu um tratamento térmico do tipo “têmpera” durante a sua fabricação;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "4301f5b9-dfcb-41d2-965b-53f42cb9521c", content: "E) Pelas definições de passe estreito e passe oscilante, pode-se concluir que o estreito introduz mais energia térmica na junta que está sendo soldada do que o segundo.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "b37622af-0761-4070-b132-4ef8eec10599",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 30",
        content: "Resolva a questão abaixo.",
        position: 27,
        activity: {
            id: "b6246bba-4b46-47fc-aa0e-bff36f6ad74a",
            activity_type: "multiple_choice",
            statement: "Analisando os diferentes tipos de correntes e polaridades usados na soldagem a arco, marque a alternativa correta. ",
            explanation: "A alternativa correta é a letra A.",
            options: [
            { id: "5c63c478-dad4-4a12-8d08-44e93c92af6f", content: "A) Polaridade Direta: tipo de ligação para soldagem com corrente contínua, onde os elétrons deslocam-se do eletrodo para a peça;", is_correct: true, feedback: "Correto! A alternativa correta é a letra A.", position: 1 },
            { id: "331b44c5-1c56-46ee-854a-cac118d43b07", content: "B) Polaridade Inversa: tipo de ligação para soldagem com corrente alternada, onde os elétrons deslocam-se da peça para o eletrodo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 2 },
            { id: "5261da73-4032-476c-9f5c-9b95b5e393e3", content: "C) Polaridade Direta: tipo de ligação para soldagem com corrente alternada, onde os elétrons deslocam-se da peça para o eletrodo;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 3 },
            { id: "b3cdf305-b02f-4011-87db-a9eac3e2aef7", content: "D) Polaridade Inversa: tipo de ligação para soldagem com corrente contínua, onde os elétrons deslocam-se do eletrodo para a peça;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 4 },
            { id: "b8a08b38-c304-4b57-b9c2-415461ba4ead", content: "E) Polaridade Inversa: é a polaridade ideal a ser adotada na soldagem de aços, quando se emprega um transformador como fonte de energia.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra A.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "cd17ab54-5ef1-4b3e-bcef-ab4e355fad8b",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 31",
        content: "Resolva a questão abaixo.",
        position: 28,
        activity: {
            id: "356e7756-7c92-4b18-8704-68420a906794",
            activity_type: "multiple_choice",
            statement: "Quanto às posições e progressões de soldagem, marque a definição incorreta. ",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "a21c7c43-fe2a-4da5-b003-5e743314e4ad", content: "A) Posição Sobre-cabeça: posição na qual executa-se a soldagem pelo lado inferior da junta;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "d609ca13-d75f-45da-9063-85468fc8c6b6", content: "B) Posição Vertical, progressão Ascendente: posição na qual o eixo da solda encontra-se aproximadamente no plano vertical, sendo a solda executada no sentido: inferior - superior;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "b3843eec-8e5e-4819-a049-c53da268d103", content: "C) Posição Horizontal: posição na qual o eixo da solda está em um plan aproximadamente horizontal e a face da solda está em um plano aproximadamente vertical;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "f5aa4e82-7dbf-43f7-ba2b-4c3855b3d665", content: "D) Posição Plana: posição na qual a face da solda encontra-se em um plano aproximadamente horizontal e o seu eixo encontra-se em um plano aproximadamente vertical;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "fddda97c-cdee-443e-9b52-6b0e176d9079", content: "E) Posição Vertical, progressão Ascendente: posição na qual o eixo da solda encontra-se aproximadamente no plano vertical, sendo a solda executada no sentido: superior - inferior; 21", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "b9429e42-afda-4ce0-bc97-ddd3b7a49cf2",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 32",
        content: "Resolva a questão abaixo.",
        position: 29,
        activity: {
            id: "2f7249fd-0744-4476-a3ac-1ad257893916",
            activity_type: "multiple_choice",
            statement: "Das alternativas apresentadas a seguir, marque aquela que não é um Consumível de Soldagem. \n\n<img src=\"/images/questions/page21_img1.jpeg\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page21_img2.jpeg\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra D.",
            options: [
            { id: "6b4a057f-b48e-4b47-8a8e-46bfbb60d2f2", content: "A) Arame tubular;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 1 },
            { id: "a0a7ad74-e1a8-4a02-92fc-52c9f8bd2abe", content: "B) Gás de proteção;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 2 },
            { id: "fee90692-e783-45e1-8315-22e7240cf8c8", content: "C) Arame sólido;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 3 },
            { id: "322a6609-0d1d-4164-8cf9-9d3028e67c2e", content: "D) Eletrodo de tungstênio;", is_correct: true, feedback: "Correto! A alternativa correta é a letra D.", position: 4 },
            { id: "2f9cad71-6412-4546-b167-90853c508066", content: "E) Fluxo para o processo arco submerso.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra D.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "f52414f3-3b59-40aa-aeba-4a92a5da782d",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 33",
        content: "Resolva a questão abaixo.",
        position: 30,
        activity: {
            id: "b2788793-687f-40a9-b9b6-c6d54e764e53",
            activity_type: "multiple_choice",
            statement: "Dos diferentes tipos de posições de soldagem apresentados nos croquis a seguir, assinale a alternativa incorreta I II III IV V \n\n<img src=\"/images/questions/page21_img1.jpeg\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page21_img2.jpeg\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "600db09d-6706-4c73-afa8-4ae04c7972d5", content: "A) Croqui I – Posição Horizontal;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "99ded236-a4ca-4fd8-9769-26c65f55e9bb", content: "B) Croquis II e V – Posição Vertical, progressões Ascendente e Descendente, respectivamente; 22", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "06786d20-f6e1-4e13-82a2-e560c892cf47", content: "C) Croqui III – Posição Sobre-cabeça;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "bf97c3b1-e564-4598-8ac1-21475a4394ed", content: "D) Croqui IV – Posição Plana;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "3d525fd8-af57-4750-8ce9-b31b3d536233", content: "E) Croquis II e V – Posição Vertical, progressões Descendente e Ascendente, respectivamente;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "da69e46f-42dc-4d50-855e-9c43ebc69b4c",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 34",
        content: "Resolva a questão abaixo.",
        position: 31,
        activity: {
            id: "8feeb10e-f171-4d47-9cc0-ec18b79f5988",
            activity_type: "multiple_choice",
            statement: "Analisando a definição do termo “Dimensão da solda”, em função dos seus diferentes tipos, marque a alternativa incorreta. I II III IV V \n\n<img src=\"/images/questions/page22_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page22_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra E.",
            options: [
            { id: "2c178915-2989-4468-8092-2233a1d3c49a", content: "A) Croqui I;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 1 },
            { id: "d6d03c41-b43e-49de-9935-53176a8bfe90", content: "B) Croqui II;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 2 },
            { id: "f2c01e38-efd7-4ac6-9ea3-5b4cb6712a7e", content: "C) Croqui III;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 3 },
            { id: "c279e3fa-29f0-4f2d-93ea-f16ca3516957", content: "D) Croqui IV;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra E.", position: 4 },
            { id: "5d72f103-0838-47cd-b255-d6c01871bec7", content: "E) Croqui V.", is_correct: true, feedback: "Correto! A alternativa correta é a letra E.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "893331f3-8ee0-4230-951b-4a1bef9ee627",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 35",
        content: "Resolva a questão abaixo.",
        position: 32,
        activity: {
            id: "aa409855-f4be-4ad2-bd90-231e2aee9128",
            activity_type: "multiple_choice",
            statement: "Em relação aos tipos de gases utilizados na soldagem, marque a alternativa incorreta. . 23 \n\n<img src=\"/images/questions/page22_img1.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />\n\n<img src=\"/images/questions/page22_img2.png\" style=\"max-width:100%; border-radius: 8px; margin-top: 10px;\" />",
            explanation: "A alternativa correta é a letra C.",
            options: [
            { id: "5f68803c-c915-422e-8856-437e6b754288", content: "A) Gás inerte é todo aquele que não reage quimicamente com o metal de base ou metal de adição em fusão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 1 },
            { id: "e044829a-0380-44ca-9432-ac26e2c6b757", content: "B) Os gases oxidantes e redutores são tipos de gases ativos;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 2 },
            { id: "1b291dd5-a362-4e40-89ce-214262875398", content: "C) Os gases oxidantes são aqueles gases que reagem quimicamente com o metal de solda ainda no estado líquido, como por exemplo: Argônio e Hélio;", is_correct: true, feedback: "Correto! A alternativa correta é a letra C.", position: 3 },
            { id: "e8f75872-b52b-4474-8880-6193e58b454d", content: "D) Atmosfera Protetora é o envoltório de gás que circunda a parte a ser soldada, com a finalidade de proteger a poça de fusão;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 4 },
            { id: "740fe360-1b74-46cf-bbf8-7eeb2d61ceb8", content: "E) Atmosfera Reativa é uma atmosfera tipicamente ativa, que, em elevadas temperaturas, reduz óxidos ao seu estado metálico.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra C.", position: 5 }
        ]
        }
    });

    STATIC_LESSON_STEPS["0930afb9-1c9f-4a21-ac4e-66f93e7acc62"].push({
        id: "b180fc5f-f307-4335-b4ec-036bb90e5da0",
        lesson_id: "0930afb9-1c9f-4a21-ac4e-66f93e7acc62",
        step_type: "activity",
        title: "Questão 36",
        content: "Resolva a questão abaixo.",
        position: 33,
        activity: {
            id: "50108934-30ca-44be-99b5-eab31d09043a",
            activity_type: "multiple_choice",
            statement: "Das definições apresentadas abaixo, assinale a alternativa correta. ",
            explanation: "A alternativa correta é a letra B.",
            options: [
            { id: "0a9a5561-9399-4593-a7d9-44e95dd5f60e", content: "A) Margem da solda: junção entre a face da solda e o metal de solda;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 1 },
            { id: "d60e560b-5357-44b0-b78f-04c4e0abbaed", content: "B) Corpo de prova: amostra retirada e identificada da chapa ou tubo de teste, quando se objetiva conhecer as propriedades mecânicas, entre outras propriedades da junta soldada;", is_correct: true, feedback: "Correto! A alternativa correta é a letra B.", position: 2 },
            { id: "ef378cdf-7b12-4fd6-a7a4-733951f653bc", content: "C) Escória: resíduo metálico proveniente da fusão do fluxo ou revestimento e também de impurezas provenientes do metal de adição;", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 3 },
            { id: "ec969b48-bc30-4acb-b749-a7f5e5a2f716", content: "D) Abertura da raiz: máxima distância que separa os componentes a serem unidos por soldagem ou processos afins.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 4 },
            { id: "69bfeb9a-2fcf-4794-9884-65aabe9f2d4e", content: "E) Solda: união localizada de metais, produzido pelo aquecimento dos mesmos a uma temperatura adequada, com ou sem aplicação de pressão, havendo a obrigatoriedade de se empregar um metal de adição.", is_correct: false, feedback: "Incorreto. A alternativa correta era a letra B.", position: 5 }
        ]
        }
    });

}
