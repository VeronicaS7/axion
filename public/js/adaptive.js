// ============================================================================
// MOTOR DE APRENDIZAGEM ADAPTATIVA E QUESTÕES AUTÔNOMAS (JS/ADAPTIVE.JS)
// ============================================================================

class AdaptiveEngine {
  constructor() {
    this.version = "1.0.0";
    
    // Camada 1: Currículo e Mapa de Competências
    this.skills = {
      // Álgebra Linear
      "s_vector_rep": {
        name: "Representação Vetorial",
        category: "algebra_linear",
        objective: "Calcular e interpretar a representação gráfica de vetores no plano.",
        prerequisites: ["coordenadas_cartesianas", "numeros_reais"],
        common_mistakes: ["trocar_coordenadas", "confundir_direcao"],
        activity_types: ["multiple_choice", "numeric_input", "ordering"]
      },
      "s_vector_ops": {
        name: "Operações Vetoriais",
        category: "algebra_linear",
        objective: "Realizar somas vetoriais e multiplicação por escalar de demandas ou forças.",
        prerequisites: ["s_vector_rep"],
        common_mistakes: ["somar_magnitudes_diretamente", "ignorar_sinal_negativo"],
        activity_types: ["multiple_choice", "numeric_input", "ordering"]
      },
      "s_matrix_ops": {
        name: "Operações Matriciais",
        category: "algebra_linear",
        objective: "Multiplicar e somar matrizes de custos, insumos e demandas industriais.",
        prerequisites: ["s_vector_ops"],
        common_mistakes: ["multiplicar_elemento_por_elemento", "dimensoes_incompativeis"],
        activity_types: ["multiple_choice", "numeric_input"]
      },
      
      // AMD
      "s_dec_criteria": {
        name: "Alternativas e Critérios no AMD",
        category: "amd",
        objective: "Classificar critérios e estruturar problemas de decisão complexos.",
        prerequisites: ["conceito_decisao"],
        common_mistakes: ["confundir_alternativa_e_criterio", "criterios_redundantes"],
        activity_types: ["multiple_choice", "ordering"]
      },
      "s_weighted_sum": {
        name: "Soma Ponderada no AMD",
        category: "amd",
        objective: "Calcular médias ponderadas e normalizar critérios de avaliação.",
        prerequisites: ["s_dec_criteria"],
        common_mistakes: ["soma_dos_pesos_diferente_de_um", "erro_normalizacao"],
        activity_types: ["multiple_choice", "numeric_input"]
      },
      "s_matrix_dec": {
        name: "Interpretação da Matriz de Decisão",
        category: "amd",
        objective: "Identificar alternativas dominadas e rankings gerais de decisão.",
        prerequisites: ["s_weighted_sum"],
        common_mistakes: ["ignorar_orientacao_de_custo", "erro_leitura_dominancia"],
        activity_types: ["multiple_choice", "ordering"]
      },
      
      // Cálculo Numérico
      "s_num_error": {
        name: "Erros Absolutos e Relativos",
        category: "calculo_numerico",
        objective: "Compreender e estimar erros de truncamento e arredondamento computacional.",
        prerequisites: ["representacao_binaria"],
        common_mistakes: ["esquecer_dividir_pelo_real", "ignorar_modulo"],
        activity_types: ["multiple_choice", "numeric_input"]
      },
      "s_bisection": {
        name: "Método da Bisseção",
        category: "calculo_numerico",
        objective: "Encontrar raízes de equações não-lineares por divisão sucessiva.",
        prerequisites: ["s_num_error", "continuidade_funcoes"],
        common_mistakes: ["chute_inicial_sem_raiz", "erro_atualizacao_intervalo"],
        activity_types: ["multiple_choice", "numeric_input", "ordering"]
      },
      "s_convergence": {
        name: "Análise de Convergência",
        category: "calculo_numerico",
        objective: "Avaliar velocidade de convergência e critérios de parada de iterações.",
        prerequisites: ["s_bisection"],
        common_mistakes: ["parada_precoce", "erro_estabilidade"],
        activity_types: ["multiple_choice", "ordering"]
      },
      
      // Ciência dos Materiais
      "s_mat_bonds": {
        name: "Ligações Atômicas e Propriedades",
        category: "ciencia_materiais",
        objective: "Relacionar a estrutura molecular e ligações químicas ao comportamento mecânico.",
        prerequisites: ["quimica_basica"],
        common_mistakes: ["ligacoes_metalicas_sem_condutividade", "covalente_fragil_confusao"],
        activity_types: ["multiple_choice", "ordering"]
      },
      "s_tensile_test": {
        name: "Ensaios de Tração Mecânica",
        category: "ciencia_materiais",
        objective: "Interpretar curvas tensão-deformação e calcular o módulo de elasticidade.",
        prerequisites: ["s_mat_bonds", "tracao_compressao"],
        common_mistakes: ["confundir_regiao_elastica_e_plastica", "erro_area_transversal"],
        activity_types: ["multiple_choice", "numeric_input"]
      },
      "s_class_materials": {
        name: "Classificação e Seleção de Materiais",
        category: "ciencia_materiais",
        objective: "Selecionar materiais sob restrições industriais de peso, custo e corrosão.",
        prerequisites: ["s_tensile_test"],
        common_mistakes: ["recomendar_polimeros_alta_temperatura", "ceramica_em_impacto"],
        activity_types: ["multiple_choice", "ordering"]
      }
    };
  }

  // Camada 2 & 3: Templates, Geradores Determinísticos & IA Decoradora (Offline)
  generateActivity(skillId, difficulty, seed = Math.random()) {
    const random = this._seededRandom(seed);
    const skill = this.skills[skillId];
    if (!skill) return null;

    // Seleciona tipo de exercício (calculo direto, lacunas, identificação erro, aplicado)
    const types = ["direct", "blanks", "error", "applied"];
    const type = types[Math.floor(random() * types.length)];
    
    let act = {
      id: "gen_" + skillId + "_" + type + "_" + Math.floor(random() * 10000),
      skill_id: skillId,
      difficulty: difficulty,
      activity_type: "",
      statement: "",
      correct_answer_json: null,
      options_json: null,
      explanation: "",
      hints_json: [],
      context_json: {}
    };

    // Fatores de dificuldade
    const scale = difficulty * 2.5;

    // Geradores determinísticos
    switch (skillId) {
      case "s_vector_rep": {
        const x = Math.round((random() * 8 + 2) * (random() > 0.5 ? 1 : -1));
        const y = Math.round((random() * 8 + 2) * (random() > 0.5 ? 1 : -1));
        act.activity_type = "multiple_choice";
        
        if (type === "direct" || type === "blanks") {
          act.statement = `Identifique as componentes cartesianas do vetor com ponto de aplicação na origem (0,0) e terminação nas coordenadas (${x}, ${y}) na grade de controle de braço robótico.`;
          act.correct_answer_json = `[${x}, ${y}]`;
          act.options_json = [
            { id: "o1", content: `[${x}, ${y}]`, is_correct: true, feedback: "Correto! As componentes X e Y correspondem aos pontos finais correspondentes." },
            { id: "o2", content: `[${y}, ${x}]`, is_correct: false, feedback: "Incorreto. Você trocou o eixo horizontal X pelo eixo vertical Y." },
            { id: "o3", content: `[${-x}, ${y}]`, is_correct: false, feedback: "Incorreto. Verifique o sinal da componente horizontal X." }
          ];
        } else if (type === "error") {
          act.statement = `Um operador de calibração declarou que a coordenada final (${x}, ${y}) representa um vetor de velocidade horizontal de ${y} m/s e vertical de ${x} m/s. Qual foi o erro de interpretação?`;
          act.correct_answer_json = "Inverter os eixos coordenados X e Y";
          act.options_json = [
            { id: "o1", content: "Inverter os eixos coordenados X e Y", is_correct: true, feedback: "Correto! O operador associou a componente Y à velocidade horizontal." },
            { id: "o2", content: "Trocar o sentido dos sinais", is_correct: false, feedback: "Incorreto. Os sinais numéricos não foram alterados." },
            { id: "o3", content: "Confundir velocidade com torque", is_correct: false, feedback: "Incorreto. O erro é puramente geométrico de inversão de coordenadas." }
          ];
        } else {
          act.statement = `Na célula robotizada de montagem de cabines, a garra move-se de (0,0) até (${x}, ${y}) mm para soldar. Qual é a componente vertical de deslocamento?`;
          act.activity_type = "numeric_input";
          act.correct_answer_json = y;
        }
        
        act.explanation = `A componente horizontal de um vetor cartesiano representa a projeção no eixo X (primeira coordenada: ${x}) e a vertical representa a projeção no eixo Y (segunda coordenada: ${y}).`;
        act.hints_json = [
          "**Nível 1 (Pergunta Orientadora):** Onde estão localizadas as componentes X e Y no plano?",
          "**Nível 2 (Dica):** Lembre-se que X representa a coordenada horizontal (esquerda/direita) e Y a vertical (cima/baixo).",
          "**Nível 3 (Conceito):** Coordenadas cartesianas são sempre escritas no formato (X, Y).",
          `**Nível 4 (Analogia):** Pense em andar em uma grade: você anda ${x} passos para os lados e ${y} passos para cima/baixo.`,
          `**Nível 5 (Guia):** O ponto inicial é (0,0) e o ponto final é (${x}, ${y}).`,
          `**Nível 6 (Solução):** A resposta correta é baseada na componente pedida, sendo X = ${x} e Y = ${y}.`
        ];
        break;
      }
      
      case "s_vector_ops": {
        const x1 = Math.round(random() * 6 + 1);
        const y1 = Math.round(random() * 6 + 1);
        const x2 = Math.round((random() * 6 + 1) * (random() > 0.5 ? 1 : -1));
        const y2 = Math.round((random() * 6 + 1) * (random() > 0.5 ? 1 : -1));
        
        const sumX = x1 + x2;
        const sumY = y1 + y2;
        
        if (type === "direct" || type === "blanks") {
          act.activity_type = "multiple_choice";
          act.statement = `Dados dois vetores de força em Newtons aplicados em um painel: F1 = [${x1}, ${y1}] e F2 = [${x2}, ${y2}]. Calcule o vetor resultante F_Result = F1 + F2.`;
          act.correct_answer_json = `[${sumX}, ${sumY}]`;
          act.options_json = [
            { id: "o1", content: `[${sumX}, ${sumY}]`, is_correct: true, feedback: "Correto! Somamos as componentes X entre si e as Y entre si." },
            { id: "o2", content: `[${x1 + x2}, ${y1 - y2}]`, is_correct: false, feedback: "Incorreto. Verifique a soma e o sinal da segunda componente." },
            { id: "o3", content: `[${Math.abs(x1) + Math.abs(x2)}, ${Math.abs(y1) + Math.abs(y2)}]`, is_correct: false, feedback: "Incorreto. Você somou as magnitudes brutas ignorando os sinais negativos." }
          ];
        } else if (type === "error") {
          act.activity_type = "multiple_choice";
          act.statement = `Um engenheiro Júnior declarou que a força resultante dos vetores [${x1}, ${y1}] e [${x2}, ${y2}] é obtida somando as magnitudes diretamente: ||F_Result|| = ||F1|| + ||F2||. Qual o erro?`;
          act.correct_answer_json = "Vetores em direções diferentes não podem ter suas magnitudes somadas de forma escalar simples";
          act.options_json = [
            { id: "o1", content: "Vetores em direções diferentes não podem ter suas magnitudes somadas de forma escalar simples", is_correct: true, feedback: "Correto! A magnitude da soma só é igual à soma das magnitudes se os vetores forem colineares e no mesmo sentido." },
            { id: "o2", content: "A soma deve ser feita por multiplicação cruzada", is_correct: false, feedback: "Incorreto. Não há multiplicação na soma de forças." },
            { id: "o3", content: "O sinal do escalar deve ser invertido", is_correct: false, feedback: "Incorreto. O problema é conceitual sobre álgebra de vetores." }
          ];
        } else {
          act.activity_type = "numeric_input";
          act.statement = `Se o vetor de fluxo de material 1 é V1 = [${x1}, ${y1}] kg/s e o fluxo 2 é V2 = [${x2}, ${y2}] kg/s, qual a componente horizontal X do fluxo total resultante?`;
          act.correct_answer_json = sumX;
        }

        act.explanation = `A soma de vetores é efetuada somando as componentes de mesma dimensão: X_Result = X1 + X2 = ${x1} + (${x2}) = ${sumX}, Y_Result = Y1 + Y2 = ${y1} + (${y2}) = ${sumY}.`;
        act.hints_json = [
          "**Nível 1 (Pergunta Orientadora):** Como somamos as componentes correspondentes dos dois vetores?",
          "**Nível 2 (Dica):** Somamos componente X com X, e componente Y com Y de forma direta.",
          "**Nível 3 (Conceito):** A soma de vetores é efetuada somando as coordenadas de mesma direção: X1 + X2 e Y1 + Y2.",
          `**Nível 4 (Analogia):** If one force pulls [${x1}, ${y1}] and another pulls [${x2}, ${y2}], we sum horizontal and vertical effects separately.`,
          `**Nível 5 (Guia):** A soma horizontal é ${x1} + (${x2}) = ${sumX}, e a vertical é ${y1} + (${y2}) = ${sumY}.`,
          `**Nível 6 (Solução):** A resposta final resultante calculada é [${sumX}, ${sumY}] ou a componente X = ${sumX}.`
        ];
        break;
      }
      
      case "s_matrix_ops": {
        const val = Math.round(random() * 4 + 1);
        const k = Math.round(random() * 3 + 2);
        
        act.activity_type = "multiple_choice";
        if (type === "direct" || type === "blanks") {
          act.statement = `Dada a matriz de demanda diária D = [[${val}, 3], [1, 2]] e o multiplicador de escala k = ${k} (expansão do mercado). Determine a nova matriz de demandas resultantes k * D.`;
          act.correct_answer_json = `[[${val * k}, ${3 * k}], [${1 * k}, ${2 * k}]]`;
          act.options_json = [
            { id: "o1", content: `[[${val * k}, ${3 * k}], [${1 * k}, ${2 * k}]]`, is_correct: true, feedback: "Correto! Multiplicamos cada elemento da matriz pelo escalar k." },
            { id: "o2", content: `[[${val * k}, 3], [1, 2]]`, is_correct: false, feedback: "Incorreto. Você multiplicou apenas a primeira linha/coluna pelo escalar." },
            { id: "o3", content: `[[${val + k}, ${3 + k}], [${1 + k}, ${2 + k}]]`, is_correct: false, feedback: "Incorreto. Você somou o escalar em vez de multiplicá-lo." }
          ];
        } else if (type === "error") {
          act.statement = `Se tentarmos multiplicar uma matriz de insumos A (dimensão 3x2) por uma matriz de custos B (dimensão 3x2), o que acontece computacionalmente?`;
          act.correct_answer_json = "Incompatibilidade de dimensões: o número de colunas de A deve ser igual ao de linhas de B";
          act.options_json = [
            { id: "o1", content: "Incompatibilidade de dimensões: o número de colunas de A deve ser igual ao de linhas de B", is_correct: true, feedback: "Correto! Para multiplicação matricial A x B, as dimensões internas devem coincidir (ex: 3x2 e 2x3)." },
            { id: "o2", content: "A matriz resultante terá dimensões 3x3", is_correct: false, feedback: "Incorreto. A operação nem é permitida." },
            { id: "o3", content: "O determinante é recalculado para 0", is_correct: false, feedback: "Incorreto. O determinante só existe para matrizes quadradas." }
          ];
        } else {
          act.activity_type = "numeric_input";
          act.statement = `Dada a matriz de custos C = [[${val}, 5], [2, 4]] e escala k = 2. Qual é o valor do elemento na primeira linha e primeira coluna (C_11) na nova matriz k * C?`;
          act.correct_answer_json = val * 2;
        }

        act.explanation = `A multiplicação de uma matriz por um escalar multiplica cada entrada individual da matriz por esse valor. E para o produto de matrizes, o número de colunas da primeira deve ser igual ao número de linhas da segunda.`;
        act.hints_json = [
          "**Nível 1 (Pergunta Orientadora):** O que acontece com cada entrada da matriz ao multiplicar por um escalar?",
          "**Nível 2 (Dica):** Multiplicar por um escalar k significa multiplicar todas as entradas individuais da matriz por k.",
          "**Nível 3 (Conceito):** k * [[a, b], [c, d]] = [[k*a, k*b], [k*c, k*d]].",
          `**Nível 4 (Analogia):** Se a demanda duplicar (k=2), a quantidade necessária de todos os produtos duplica na matriz.`,
          `**Nível 5 (Guia):** Multiplique o elemento na posição solicitada por ${k === 2 ? 2 : k}.`,
          `**Nível 6 (Solução):** A resposta correta multiplicada pelo escalar é: ${act.correct_answer_json}.`
        ];
        break;
      }
      
      case "s_dec_criteria": {
        act.activity_type = "multiple_choice";
        if (type === "direct" || type === "blanks" || type === "applied") {
          act.statement = "No processo de aquisição de um robô articulado para pintura, identificamos 'Preço', 'Prazo de entrega' e 'Consumo elétrico'. Em modelos de decisão multicritério, o que esses fatores representam?";
          act.correct_answer_json = "Critérios de avaliação";
          act.options_json = [
            { id: "o1", content: "Critérios de avaliação", is_correct: true, feedback: "Correto! Os fatores sob os quais julgamos os robôs são os critérios." },
            { id: "o2", content: "Alternativas do problema", is_correct: false, feedback: "Incorreto. As alternativas seriam os modelos/marcas dos robôs." },
            { id: "o3", content: "Escala qualitativa de Saaty", is_correct: false, feedback: "Incorreto. A escala é a régua de notas, não o fator de avaliação." }
          ];
        } else {
          act.statement = "Ao estruturar uma matriz de decisão de fornecedores de aço, um analista catalogou a 'Transportadora X' e 'Transportadora Y' como critérios de avaliação. Qual foi o erro?";
          act.correct_answer_json = "Classificar alternativas (opções de escolha) como critérios de julgamento";
          act.options_json = [
            { id: "o1", content: "Classificar alternativas (opções de escolha) como critérios de julgamento", is_correct: true, feedback: "Correto! As transportadoras são as opções finais, ou seja, as alternativas." },
            { id: "o2", content: "Ignorar custos ambientais", is_correct: false, feedback: "Incorreto. Esse erro não é metodológico do modelo AMD." },
            { id: "o3", content: "Erro de arredondamento de pesos", is_correct: false, feedback: "Incorreto. Não há pesos definidos ainda." }
          ];
        }

        act.explanation = "As Alternativas representam as opções candidatas disponíveis para escolha (ex: marcas, cidades). Os Critérios representam as regras e métricas para avaliá-las (ex: custos, confiabilidade).";
        act.hints_json = [
          "**Nível 1 (Pergunta Orientadora):** Qual a diferença fundamental entre o que podemos escolher (Alternativas) e como avaliamos (Critérios)?",
          "**Nível 2 (Dica):** Alternativas são as opções candidatas finais. Critérios são as réguas sob as quais julgamos essas opções.",
          "**Nível 3 (Conceito):** Em AMD, opções como 'Cidade A' ou 'Fornecedor X' são alternativas; Preço e Prazo são critérios.",
          "**Nível 4 (Analogia):** Ao escolher um celular, as marcas são as alternativas. O preço e a bateria são os critérios de julgamento.",
          "**Nível 5 (Guia):** Avalie se o termo refere-se à opção final de escolha ou ao parâmetro de medição.",
          `**Nível 6 (Solução):** A resposta correta é: ${act.correct_answer_json}.`
        ];
        break;
      }
      
      case "s_weighted_sum": {
        const score = Math.round(random() * 4 + 5); // 5 a 9
        const weight = Math.round(random() * 3 + 2) / 10; // 0.2 a 0.5
        
        if (type === "direct" || type === "blanks" || type === "applied") {
          act.activity_type = "numeric_input";
          act.statement = `Um fornecedor recebeu nota ${score} em Preço (que possui peso de importância de ${weight}). Supondo que os outros critérios ponderados somem uma nota acumulada de 4.0, qual a nota global final ponderada desse fornecedor?`;
          act.correct_answer_json = parseFloat((score * weight + 4.0).toFixed(2));
        } else {
          act.activity_type = "multiple_choice";
          act.statement = "Por que os pesos de todos os critérios no modelo AHP ou TOPSIS devem obrigatoriamente ser normalizados para somar 1.0 (ou 100%)?";
          act.correct_answer_json = "Para garantir que a nota geral ponderada final mantenha-se na mesma escala das notas originais";
          act.options_json = [
            { id: "o1", content: "Para garantir que a nota geral ponderada final mantenha-se na mesma escala das notas originais", is_correct: true, feedback: "Correto! A soma unitária dos pesos conserva a média ponderada na escala original de 0 a 10." },
            { id: "o2", content: "Para eliminar critérios de custos", is_correct: false, feedback: "Incorreto. A normalização serve para escala, não para eliminar critérios." },
            { id: "o3", content: "Para anular as alternativas ruins", is_correct: false, feedback: "Incorreto. A nota baixa continuará refletindo o desempenho." }
          ];
        }

        act.explanation = "A nota global por média ponderada é obtida somando a multiplicação de cada nota por seu respectivo peso normalizado. Se os pesos somam 1.0, o resultado se mantém na escala das notas base.";
        act.hints_json = [
          "**Nível 1 (Pergunta Orientadora):** Como calculamos a média ponderada para obter a nota global?",
          "**Nível 2 (Dica):** Multiplicamos cada nota pelo seu peso normalizado correspondente e somamos tudo.",
          "**Nível 3 (Conceito):** Nota global = (Nota Preço * Peso Preço) + Nota Acumulada.",
          `**Nível 4 (Analogia):** Se uma prova de peso ${weight} vale nota ${score} e as outras somam 4.0, a média final é calculada somando os pesos das notas.`,
          `**Nível 5 (Guia):** Faça a conta: (${score} * ${weight}) + 4.0.`,
          `**Nível 6 (Solução):** A resposta global ponderada calculada é: ${act.correct_answer_json}.`
        ];
        break;
      }
      
      case "s_matrix_dec": {
        act.activity_type = "multiple_choice";
        act.statement = "Dada a matriz de decisão com duas alternativas:\n* Alt A: Preço R$ 100k, Qualidade Alta, Prazo 5 dias.\n* Alt B: Preço R$ 120k, Qualidade Média, Prazo 8 dias.\nEm AMD, qual relação lógica se estabelece entre elas?";
        act.correct_answer_json = "A alternativa A domina completamente a alternativa B";
        act.options_json = [
          { id: "o1", content: "A alternativa A domina completamente a alternativa B", is_correct: true, feedback: "Correto! A alternativa A é melhor ou igual em todos os critérios comparada a B." },
          { id: "o2", content: "A alternativa B domina a alternativa A", is_correct: false, feedback: "Incorreto. B é pior em todos os critérios." },
          { id: "o3", content: "Não há dominância direta, exigindo ponderação", is_correct: false, feedback: "Incorreto. A é estritamente melhor em todos, caracterizando dominância." }
        ];

        act.explanation = "Uma alternativa A domina outra B se A for melhor ou igual em todos os critérios avaliados e estritamente melhor em pelo menos um critério. Alternativas dominadas podem ser eliminadas logo no início.";
        act.hints_json = [
          "**Nível 1 (Pergunta Orientadora):** Quando podemos dizer que uma alternativa domina completamente outra?",
          "**Nível 2 (Dica):** Uma alternativa domina outra se ela for melhor ou igual em todos os critérios e estritamente melhor em pelo menos um.",
          "**Nível 3 (Conceito):** Se Alt A tem menor Preço, maior Qualidade e menor Prazo que Alt B, Alt A domina Alt B.",
          "**Nível 4 (Analogia):** Você escolheria uma máquina mais cara, mais lenta e pior que outra? Não, porque a outra a domina.",
          "**Nível 5 (Guia):** Compare a alternativa A e B em cada critério individualmente.",
          `**Nível 6 (Solução):** A resposta correta é: ${act.correct_answer_json}.`
        ];
        break;
      }
      
      case "s_num_error": {
        const real = Math.round(random() * 4 + 10); // 10 a 14
        const approx = (real - 0.2).toFixed(1);
        const errAbs = 0.2;
        const errRel = 0.2 / real;

        if (type === "direct" || type === "blanks") {
          act.activity_type = "multiple_choice";
          act.statement = `Se a velocidade real medida de uma turbina é de ${real} m/s, mas o sensor reporta o valor aproximado de ${approx} m/s, qual é a principal diferença entre erro absoluto e relativo?`;
          act.correct_answer_json = "O erro absoluto é a diferença bruta, enquanto o relativo divide o absoluto pelo valor real";
          act.options_json = [
            { id: "o1", content: "O erro absoluto é a diferença bruta, enquanto o relativo divide o absoluto pelo valor real", is_correct: true, feedback: "Correto! O erro relativo é adimensional e normaliza o desvio." },
            { id: "o2", content: "O erro relativo é expresso em metros", is_correct: false, feedback: "Incorreto. Erro relativo é percentual ou adimensional." },
            { id: "o3", content: "O erro absoluto só existe em divisões por zero", is_correct: false, feedback: "Incorreto. O erro absoluto existe em qualquer aproximação." }
          ];
        } else if (type === "error") {
          act.activity_type = "multiple_choice";
          act.statement = `Um algoritmo reportou erro relativo negativo de -0.05 para um cálculo de massa. Qual a premissa conceitual que foi ignorada?`;
          act.correct_answer_json = "Os erros de aproximação (absoluto e relativo) são expressos em módulo (valores absolutos)";
          act.options_json = [
            { id: "o1", content: "Os erros de aproximação (absoluto e relativo) são expressos em módulo (valores absolutos)", is_correct: true, feedback: "Correto! O módulo garante que a falha seja sempre positiva." },
            { id: "o2", content: "O sinal deveria indicar ganho de massa", is_correct: false, feedback: "Incorreto. Massa não surge de arredondamento." },
            { id: "o3", content: "O divisor foi invertido", is_correct: false, feedback: "Incorreto. É uma questão conceitual de módulo." }
          ];
        } else {
          act.activity_type = "numeric_input";
          act.statement = `Se o valor de referência é ${real} e a aproximação é ${approx}, calcule o erro absoluto resultante da leitura.`;
          act.correct_answer_json = errAbs;
        }

        act.explanation = `Erro Absoluto é o módulo do desvio: |Real - Aprox| = |${real} - ${approx}| = 0.2. O erro relativo divide esse módulo pelo real: 0.2 / ${real} = ${errRel.toFixed(4)}.`;
        act.hints_json = [
          "**Nível 1 (Pergunta Orientadora):** Qual a diferença na fórmula entre o erro absoluto e o erro relativo?",
          "**Nível 2 (Dica):** O erro absoluto é a diferença absoluta bruta. O erro relativo divide esse absoluto pelo valor real.",
          "**Nível 3 (Conceito):** Erro Absoluto = |Real - Aproximado|. Erro Relativo = Erro Absoluto / Real.",
          `**Nível 4 (Analogia):** Errar 0.2 m/s em uma turbina de ${real} m/s representa uma falha percentual normalizada.`,
          `**Nível 5 (Guia):** Calcule o módulo do desvio: |${real} - ${approx}|.`,
          `**Nível 6 (Solução):** A resposta correta calculada é: ${act.correct_answer_json}.`
        ];
        break;
      }
      
      case "s_bisection": {
        const a = Math.round(random() * 2); // 0 a 2
        const b = a + 2; // a + 2
        const mid = (a + b) / 2;

        act.activity_type = "numeric_input";
        if (type === "direct" || type === "blanks" || type === "applied") {
          act.statement = `No método da bisseção para encontrar a raiz de f(x) = 0 no intervalo inicial [${a}, ${b}], qual será o valor do ponto médio (chute inicial iterativo) calculado para a primeira iteração?`;
          act.correct_answer_json = mid;
        } else {
          act.activity_type = "multiple_choice";
          act.statement = `Qual a condição necessária do teorema de Bolzano para assegurar que existe pelo menos uma raiz real de f(x) no intervalo de bisseção [a, b]?`;
          act.correct_answer_json = "A função f(x) deve ser contínua e apresentar sinais opostos nos extremos do intervalo (f(a) * f(b) < 0)";
          act.options_json = [
            { id: "o1", content: "A função f(x) deve ser contínua e apresentar sinais opostos nos extremos do intervalo (f(a) * f(b) < 0)", is_correct: true, feedback: "Correto! O sinal oposto garante que a curva cruza o eixo zero." },
            { id: "o2", content: "A função f(x) deve ser quadrática ou cúbica", is_correct: false, feedback: "Incorreto. O método serve para qualquer função contínua." },
            { id: "o3", content: "O determinante de f(x) deve ser maior que zero", is_correct: false, feedback: "Incorreto. Matrizes possuem determinantes, não funções reais simples." }
          ];
        }

        act.explanation = "O ponto médio da bisseção é a média aritmética dos limites do intervalo ativo: x_m = (a + b) / 2. E a garantia de raiz exige sinais opostos f(a) * f(b) < 0.";
        act.hints_json = [
          "**Nível 1 (Pergunta Orientadora):** Como calculamos o ponto médio de um intervalo no método da bisseção?",
          "**Nível 2 (Dica):** O ponto médio é a média aritmética dos extremos: (a + b) / 2.",
          "**Nível 3 (Conceito):** No intervalo [a, b], a aproximação da raiz na iteração é dada por x_m = (a + b) / 2.",
          `**Nível 4 (Analogia):** Se você quer achar uma página de livro entre ${a} e ${b}, você abre exatamente no meio para testar.`,
          `**Nível 5 (Guia):** Calcule a média aritmética dos limites: (${a} + ${b}) / 2.`,
          `**Nível 6 (Solução):** A resposta do ponto médio inicial calculada é: ${act.correct_answer_json}.`
        ];
        break;
      }
      
      case "s_convergence": {
        act.activity_type = "multiple_choice";
        act.statement = "Comparando o método da Bisseção e o método de Newton-Raphson para convergência de raízes, qual a principal diferença de comportamento?";
        act.correct_answer_json = "Bisseção tem convergência linear e lenta, mas garantida; Newton-Raphson tem convergência quadrática rápida, mas pode divergir";
        act.options_json = [
          { id: "o1", content: "Bisseção tem convergência linear e lenta, mas garantida; Newton-Raphson tem convergência quadrática rápida, mas pode divergir", is_correct: true, feedback: "Correto! Newton usa derivadas e converge rapidamente perto da raiz, mas falha se o chute inicial for ruim." },
          { id: "o2", content: "Bisseção converge muito mais rápido que Newton-Raphson", is_correct: false, feedback: "Incorreto. A bisseção é conceitualmente mais lenta." },
          { id: "o3", content: "Ambos os métodos falham se a função cruzar o eixo zero", is_correct: false, feedback: "Incorreto. É o oposto: ambos exigem que a função cruze o zero." }
        ];

        act.explanation = "O método da Bisseção reduz o intervalo pela metade a cada passo (linear). Newton-Raphson usa a reta tangente (quadrática) aproximando-se extremamente rápido se o chute for estável.";
        act.hints_json = [
          "**Nível 1 (Pergunta Orientadora):** Qual método converge mais rápido e qual garante convergência?",
          "**Nível 2 (Dica):** A bisseção divide o intervalo pela metade a cada passo (lenta). Newton-Raphson usa derivadas e converge rapidamente.",
          "**Nível 3 (Conceito):** Bisseção tem convergência linear lenta e estável; Newton-Raphson tem convergência quadrática rápida, mas pode divergir se o chute for ruim.",
          "**Nível 4 (Analogia):** Bisseção é um trator estável e lento; Newton é um carro de corrida rápido mas que pode capotar fora da pista.",
          "**Nível 5 (Guia):** Avalie as propriedades de estabilidade e velocidade linear vs quadrática de ambos.",
          `**Nível 6 (Solução):** A resposta correta é: ${act.correct_answer_json}.`
        ];
        break;
      }
      
      case "s_mat_bonds": {
        act.activity_type = "multiple_choice";
        act.statement = "Os materiais metálicos caracterizam-se por excelente ductilidade e alta condutividade térmica e elétrica. Qual estrutura de ligação atômica explica esse fenômeno?";
        act.correct_answer_json = "Mar de elétrons livres e deslocalizados (ligação metálica)";
        act.options_json = [
          { id: "o1", content: "Mar de elétrons livres e deslocalizados (ligação metálica)", is_correct: true, feedback: "Correto! A mobilidade dos elétrons livres facilita a condução elétrica." },
          { id: "o2", content: "Compartilhamento direcionado de elétrons (ligação covalente)", is_correct: false, feedback: "Incorreto. Covalentes são altamente direcionais, gerando rigidez e isolamento." },
          { id: "o3", content: "Atração eletrostática entre íons de cargas opostas (ligação iônica)", is_correct: false, feedback: "Incorreto. Ligações iônicas seguram os elétrons rigidamente, isolando eletricidade." }
        ];

        act.explanation = "Nas ligações metálicas, os elétrons de valência abandonam os átomos criando um mar de elétrons livres que fluem livremente, permitindo altíssima condutividade e deformação plástica sem fratura.";
        act.hints_json = [
          "**Nível 1 (Pergunta Orientadora):** Qual estrutura atômica permite que elétrons se desloquem facilmente e conduzam eletricidade?",
          "**Nível 2 (Dica):** Ligações metálicas formam uma nuvem ou mar de elétrons deslocalizados que se movem livremente.",
          "**Nível 3 (Conceito):** A alta ductilidade e condutividade dos metais é devido à mobilidade dos elétrons livres.",
          "**Nível 4 (Analogia):** Imagine elétrons livres fluindo como água entre núcleos carregados positivamente.",
          "**Nível 5 (Guia):** Verifique qual tipo de ligação cria essa nuvem deslocalizada.",
          `**Nível 6 (Solução):** A resposta correta é: ${act.correct_answer_json}.`
        ];
        break;
      }
      
      case "s_tensile_test": {
        const force = Math.round(random() * 300 + 300); // 300 a 600 N
        const area = 10; // 10 mm2
        const stress = force / area;
        
        if (type === "direct" || type === "blanks" || type === "applied") {
          act.activity_type = "numeric_input";
          act.statement = `Um corpo de prova cilíndrico de alumínio com área de seção transversal original de ${area} mm² é submetido a uma carga de tração de ${force} N. Qual é a tensão de engenharia aplicada em megapascais (MPa)?`;
          act.correct_answer_json = stress;
        } else {
          act.activity_type = "multiple_choice";
          act.statement = "Durante um ensaio de tração de um aço AISI 1020, o que acontece fisicamente com as ligações atômicas quando a força aplicada ultrapassa o Limite de Escoamento?";
          act.correct_answer_json = "Ocorre deslizamento de planos cristalinos por discordâncias, causando deformação plástica permanente";
          act.options_json = [
            { id: "o1", content: "Ocorre deslizamento de planos cristalinos por discordâncias, causando deformação plástica permanente", is_correct: true, feedback: "Correto! O escoamento é o limiar onde as ligações atômicas começam a escorregar permanentemente." },
            { id: "o2", content: "As ligações retornam perfeitamente ao seu estado de equilíbrio", is_correct: false, feedback: "Incorreto. Isso ocorre na região elástica, não após o escoamento." },
            { id: "o3", content: "O material sofre ruptura súbita sem alongamento", is_correct: false, feedback: "Incorreto. O aço 1020 é dúctil e deforma muito antes de quebrar." }
          ];
        }

        act.explanation = `A tensão de engenharia é dada por Tensão = Força / Área = ${force} N / ${area} mm² = ${stress} MPa. Passar o escoamento introduz deformações plásticas por deslocamento de discordâncias.`;
        act.hints_json = [
          "**Nível 1 (Pergunta Orientadora):** Qual a fórmula para calcular a tensão mecânica de engenharia?",
          "**Nível 2 (Dica):** Tensão é dada pela força aplicada dividida pela área da seção transversal: Tensão = Força / Área.",
          "**Nível 3 (Conceito):** Tensão (MPa) = Força (N) / Área (mm²). Observe que 1 N/mm² = 1 MPa.",
          `**Nível 4 (Analogia):** Pense na pressão: quanto menor a área para a mesma força, maior será a tensão concentrada no material.`,
          `**Nível 5 (Guia):** Divida a força aplicada de ${force} N pela área transversal de ${area} mm².`,
          `**Nível 6 (Solução):** A resposta final de tensão calculada é: ${act.correct_answer_json} MPa.`
        ];
        break;
      }
      
      case "s_class_materials": {
        act.activity_type = "multiple_choice";
        act.statement = "Deseja-se selecionar o material para revestir as paredes de uma câmara de combustão industrial operando a 1200°C com baixo estresse mecânico direto. Qual classe é a mais recomendada?";
        act.correct_answer_json = "Cerâmicas refratárias";
        act.options_json = [
          { id: "o1", content: "Cerâmicas refratárias", is_correct: true, feedback: "Correto! Cerâmicas possuem altíssimo ponto de fusão, resistência térmica e química a altas temperaturas." },
          { id: "o2", content: "Ligas de alumínio leve", is_correct: false, feedback: "Incorreto. O alumínio derrete a aproximadamente 660°C." },
          { id: "o3", content: "Polímeros de alta densidade", is_correct: false, feedback: "Incorreto. Polímeros decompõem-se bem abaixo dessa temperatura (geralmente < 300°C)." }
        ];

        act.explanation = "As cerâmicas refratárias contêm ligações iônicas/covalentes extremamente fortes, garantindo estabilidade a altíssimas temperaturas, isolamento térmico e imunidade química a gases de combustão.";
        act.hints_json = [
          "**Nível 1 (Pergunta Orientadora):** Qual classe de material suporta temperaturas extremamente altas sem derreter ou degradar?",
          "**Nível 2 (Dica):** Cerâmicas refratárias possuem alto ponto de fusão e estabilidade térmica devido a fortes ligações iônicas/covalentes.",
          "**Nível 3 (Conceito):** Metais como alumínio derretem a 660°C e polímeros se degradam em baixas temperaturas (<300°C).",
          "**Nível 4 (Analogia):** Pense em um forno industrial de 1200°C: os tijolos que revestem as paredes precisam ser cerâmicos.",
          "**Nível 5 (Guia):** Selecione a classe com a maior estabilidade térmica para suportar 1200°C.",
          `**Nível 6 (Solução):** A resposta correta é: ${act.correct_answer_json}.`
        ];
        break;
      }
      
      default:
        return null;
    }

    // Camada 4: Validação Automática
    const valResult = this.validateActivity(act);
    if (!valResult.is_valid) {
      console.warn("[Validador] Atividade rejeitada:", valResult.errors);
      return this.generateActivity(skillId, difficulty, seed + 1); // regenera
    }

    return act;
  }

  // Camada 4: Validador de Consistência e Unicidade
  validateActivity(act) {
    let errors = [];
    let warnings = [];

    if (!act.id) errors.push("ID da atividade ausente.");
    if (!act.statement) errors.push("Enunciado da atividade ausente.");
    if (act.correct_answer_json === undefined || act.correct_answer_json === null) errors.push("Resposta correta ausente.");

    if (act.activity_type === "multiple_choice") {
      if (!act.options_json || act.options_json.length < 2) {
        errors.push("Múltipla escolha deve possuir pelo menos 2 alternativas.");
      } else {
        // Verificar alternativas duplicadas
        const contents = act.options_json.map(o => o.content);
        const dupes = contents.filter((item, index) => contents.indexOf(item) !== index);
        if (dupes.length > 0) {
          errors.push(`Alternativas duplicadas detectadas: ${dupes.join(", ")}`);
        }

        // Verificar se exatamente uma alternativa é marcada como correta
        const correctOnes = act.options_json.filter(o => o.is_correct);
        if (correctOnes.length !== 1) {
          errors.push(`Deve haver exatamente 1 alternativa correta. Encontradas: ${correctOnes.length}`);
        }
      }
    } else if (act.activity_type === "numeric_input") {
      const ans = parseFloat(act.correct_answer_json);
      if (isNaN(ans) || !isFinite(ans)) {
        errors.push(`Resposta numérica inválida: ${act.correct_answer_json}`);
      }
    }

    // Validação matemática específica por categoria de skill
    if (act.skill_id === "s_vector_ops" && act.activity_type === "numeric_input") {
      // Garantir que a resposta não é zero (pode ser degenerado)
      if (Math.abs(act.correct_answer_json) === 0) {
        warnings.push("Deslocamento resultante de 0. Pode causar simplificação excessiva.");
      }
    }

    return {
      is_valid: errors.length === 0,
      confidence_score: errors.length === 0 ? 1.0 : 0.0,
      errors: errors,
      warnings: warnings
    };
  }

  // Camada 5: Motor Adaptativo - Ajuste de Dificuldade, Classificação de Erros e Spaced Repetition
  classifyError(act, studentResponse, selectedOptionId) {
    // 1. Identificar tipo de erro de forma determinística
    if (act.activity_type === "multiple_choice") {
      const opt = act.options_json.find(o => o.id === selectedOptionId);
      if (opt && opt.is_correct) return null; // Sem erro
      
      // Classificação baseada no feedback/alternativa
      if (selectedOptionId === "o2" && act.skill_id === "s_vector_rep") {
        return {
          type: "sign_error",
          description: "Troca e inversão de eixos de coordenadas cartesianas X e Y."
        };
      }
      if (selectedOptionId === "o3" && act.skill_id === "s_vector_ops") {
        return {
          type: "conceptual_error",
          description: "Somou as magnitudes das forças diretamente de forma escalar simples, ignorando o sentido vetorial."
        };
      }
    } else if (act.activity_type === "numeric_input") {
      const correct = parseFloat(act.correct_answer_json);
      const resp = parseFloat(studentResponse);
      
      if (Math.abs(resp - correct) < 0.01) return null; // correto

      // Se inverteu o sinal
      if (Math.abs(resp + correct) < 0.01) {
        return {
          type: "sign_error",
          description: "Erro de sinal: inverteu a polaridade positiva/negativa do resultado."
        };
      }
      // Se errou por arredondamento
      if (Math.abs(Math.round(resp) - Math.round(correct)) === 0) {
        return {
          type: "rounding_error",
          description: "Erro de arredondamento ou precisão de casas decimais."
        };
      }
    }

    return {
      type: "calculation_error",
      description: "Erro de cálculo aritmético ou digitação imprópria."
    };
  }

  // Atualiza domínio de maestria (maestria aumenta com acertos sem dicas, cai com erros)
  updateStudentMastery(currentMastery, isCorrect, hintsUsed) {
    let mScore = currentMastery.mastery_score || 0;
    let cScore = currentMastery.confidence_score || 0;
    let correct = currentMastery.correct_attempts || 0;
    let incorrect = currentMastery.incorrect_attempts || 0;

    if (isCorrect) {
      correct++;
      // Reduz ganho se usou muitas dicas
      const penalty = Math.max(0.2, 1 - (hintsUsed * 0.15));
      mScore = Math.min(100, mScore + (30 * penalty));
      cScore = Math.min(100, cScore + (20 * penalty));
    } else {
      incorrect++;
      mScore = Math.max(0, mScore - 10);
      cScore = Math.max(0, cScore - 15);
    }

    return {
      mastery_score: Math.round(mScore),
      confidence_score: Math.round(cScore),
      correct_attempts: correct,
      incorrect_attempts: incorrect,
      hints_used: (currentMastery.hints_used || 0) + hintsUsed,
      last_practiced_at: new Date().toISOString()
    };
  }

  // Agenda próxima revisão com base na curva de esquecimento (Spaced Repetition)
  calculateNextReview(isCorrect, currentIntervalDays = 1) {
    let interval = currentIntervalDays;
    
    if (isCorrect) {
      // Dobra o intervalo se acertou
      interval = interval * 2;
      if (interval > 30) interval = 30; // teto de 30 dias
    } else {
      // Reduz para 1 dia se errou
      interval = 1;
    }

    const scheduled = new Date();
    scheduled.setDate(scheduled.getDate() + interval);

    return {
      interval_days: interval,
      next_review_at: scheduled.toISOString()
    };
  }

  // Mapeamento de aulas para skills
  getSkillForLesson(lessonId) {
    const lessonSkillMap = {
      "l_alg_1_1": "s_vector_rep",
      "l_alg_2_1": "s_matrix_ops",
      "l_alg_3_1": "s_matrix_ops",
      "l_alg_4_1": "s_vector_rep",
      "l_alg_5_1": "s_vector_ops",
      "l_alg_6_1": "s_vector_ops",
      "l_amd_1_1": "s_dec_criteria",
      "l_amd_2_1": "s_dec_criteria",
      "l_amd_3_1": "s_weighted_sum",
      "l_amd_4_1": "s_weighted_sum",
      "l_amd_5_1": "s_matrix_dec",
      "l_amd_6_1": "s_matrix_dec",
      "l_amd_7_1": "s_weighted_sum",
      "l_num_1_1": "s_num_error",
      "l_num_2_1": "s_bisection",
      "l_num_3_1": "s_convergence",
      "l_num_4_1": "s_num_error",
      "l_num_5_1": "s_num_error",
      "l_num_6_1": "s_num_error",
      "l_num_7_1": "s_num_error",
      "l_num_8_1": "s_convergence",
      "l_mat_1_1": "s_mat_bonds",
      "l_mat_2_1": "s_mat_bonds",
      "l_mat_3_1": "s_mat_bonds",
      "l_mat_4_1": "s_tensile_test",
      "l_mat_5_1": "s_tensile_test",
      "l_mat_6_1": "s_tensile_test",
      "l_mat_7_1": "s_class_materials"
    };
    return lessonSkillMap[lessonId] || null;
  }

  // Gera o conjunto adaptativo de etapas de uma aula (usado no Tracker.getLessonDetails)
  generateAdaptiveLessonSteps(lessonId, masteryList = {}) {
    const steps = [];
    const targetSkill = this.getSkillForLesson(lessonId);
    if (!targetSkill) return null;

    // 1. Etapa de Introdução Teórica
    steps.push({
      id: "step_intro_" + lessonId,
      step_type: "text",
      title: "Introdução Adaptativa",
      content: this._getTeaserContent(targetSkill),
      position: 1
    });

    // 2. Etapa de Simulação Customizada ( SVG )
    steps.push({
      id: "step_sim_" + lessonId,
      step_type: "simulation",
      title: "Simulação Conceitual",
      content: "Utilize o controle interativo para visualizar a variação dos fatores de engenharia.",
      position: 2
    });

    // 3. Etapas de Atividades Geradas Dinamicamente
    // Gera 3 exercícios adaptados à maestria atual do estudante (Dificuldades 1, 2, 3)
    const mastery = masteryList[targetSkill] || { mastery_score: 0 };
    const baseDifficulty = mastery.mastery_score > 70 ? 3 : (mastery.mastery_score > 40 ? 2 : 1);

    for (let i = 1; i <= 3; i++) {
      const diff = Math.min(4, baseDifficulty + i - 1);
      const activity = this.generateActivity(targetSkill, diff, Math.random());
      
      steps.push({
        id: "step_act_" + lessonId + "_" + i,
        step_type: "activity",
        title: `Desafio Adaptativo ${i}`,
        content: "Analise o cenário industrial e resolva a questão proposta.",
        position: 2 + i,
        activity: {
          id: activity.id,
          skill_id: activity.skill_id,
          activity_type: activity.activity_type,
          statement: activity.statement,
          explanation: activity.explanation,
          points: diff * 10,
          configuration: activity.activity_type === "numeric_input" ? { correct_answer: activity.correct_answer_json, tolerance: 0.05 } : {},
          options: activity.options_json,
          hints: activity.hints_json
        }
      });
    }

    // 4. Etapa de Resumo
    steps.push({
      id: "step_summary_" + lessonId,
      step_type: "summary",
      title: "Revisão Concluída",
      content: `Parabéns! Você concluiu a trilha de atividades adaptativas para **${this.skills[targetSkill].name}**. Seu progresso e domínio de competências foram atualizados no seu perfil.`,
      position: 6
    });

    return steps;
  }

  // Teasers informativos baseados na Skill ativa
  _getTeaserContent(skillId) {
    const teasers = {
      "s_vector_rep": "Os vetores são as engrenagens da representação de forças físicas e fluxos produtivos. Nesta aula adaptativa, você aprenderá a visualizar e ler coordenadas de deslocamentos e forças industriais diretamente.",
      "s_vector_ops": "Aprenda a somar demandas de produção e vetores de força e prever seus efeitos acumulados.",
      "s_matrix_ops": "Organize dados industriais em tabelas (matrizes) e multiplique custos por insumos de forma sistemática.",
      "s_dec_criteria": "Problemas de decisão complexos exigem estruturação clara. Aqui você aprenderá a separar os candidatos de escolha (Alternativas) das regras de medição (Critérios de custo e de benefício).",
      "s_weighted_sum": "Calcule a média ponderada das alternativas sob múltiplos critérios conflitantes e chegue a uma escolha ideal.",
      "s_matrix_dec": "Aprenda a mapear alternativas que são dominadas por outras e reduza seu espaço de decisão eficientemente.",
      "s_num_error": "Computadores trabalham de forma binária e finita, o que induz pequenos desvios de arredondamento. Compreender a falha absoluta e relativa é vital para evitar erros catastróficos de calibração.",
      "s_bisection": "Aprenda a encontrar raízes de equações não-lineares dividindo sucessivamente o intervalo pelo método da bisseção.",
      "s_convergence": "Entenda quando os métodos iterativos convergem para a solução real e analise as condições de parada.",
      "s_mat_bonds": "As ligações metálicas, iônicas e covalentes definem a rigidez, ductilidade e condutividade dos materiais. Vamos aprender a ligar o arranjo atômico às propriedades mecânicas do produto.",
      "s_tensile_test": "Interprete graficamente curvas de tensão-deformação e compreenda o limite elástico e plástico sob tração.",
      "s_class_materials": "Escolha o material ideal para revestimentos e estruturas baseado em resistência mecânica, térmica e custos."
    };
    return teasers[skillId] || "Bem-vindo a mais uma etapa prática da engenharia.";
  }

  // Helper de aleatoriedade reproduzível via Seed
  _seededRandom(seed) {
    let s = seed;
    return function() {
      s = Math.sin(s) * 10000;
      return s - Math.floor(s);
    };
  }
}

window.AdaptiveEngine = new AdaptiveEngine();
