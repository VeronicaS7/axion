import psycopg2, json

conn = psycopg2.connect('postgresql://postgres:postgre@localhost:5432/axion_recovery')
cur = conn.cursor()

# Get SENAI document ID
cur.execute("SELECT id FROM source_documents WHERE filename ILIKE '%senai%'")
senai_doc_id = cur.fetchone()[0]

lessons_data = {
    'Terminologia de Soldagem': {
        'title': 'Terminologia de Soldagem e Geometria da Junta',
        'introduction': 'A terminologia de soldagem estabelece a linguagem padronizada fundamental para todo o trabalho do Inspetor de Soldagem N1, conforme as normas Petrobras N-133, ABNT NBR e AWS A3.0. O domínio desses termos evita interpretações incorretas de projetos e relatórios de inspeção.',
        'objectives': 'Compreender os conceitos de metal de base, metal de adição, poça de fusão, zona fundida e ZTA. Dominar a nomenclatura das partes do chanfro e das juntas soldadas. Diferenciar solda autógena, heterogênea e homogênea.',
        'explanation': '''A soldagem é a união de materiais obtida por coalescência localizada. Os principais conceitos estruturais são:
1. **Nomenclatura do Chanfro**:
   - **Ângulo de bisel**: ângulo formado entre a borda preparada do componente e um plano perpendicular à superfície da peça.
   - **Ângulo do chanfro**: ângulo total formado entre as bordas preparadas dos componentes a serem unidos.
   - **Abertura da raiz (gap)**: distância mínima que separa as peças a serem soldadas.
   - **Face da raiz (nariz)**: porção da face do chanfro adjacente à raiz da junta.
   - **Raio do chanfro**: raio utilizado em chanfros dos tipos J e U.
2. **Regiões da Junta Soldada**:
   - **Zona Fundida (ZF)**: região que sofreu fusão e solidificação durante a soldagem.
   - **Zona Termicamente Afetada (ZTA)**: região do metal de base que não se fundiu, mas cujas propriedades mecânicas e microestrutura foram alteradas pelo calor da soldagem.
   - **Metal de Base (MB)**: material metálico a ser soldado, cortado ou brasado.
3. **Classificação Metalúrgica das Soldas**:
   - **Solda Autógena**: solda por fusão executada sem adição de metal suplementar.
   - **Solda Homogênea**: solda em que a composição do metal de adição e do metal de base são similares.
   - **Solda Heterogênea**: solda em que a composição do metal de adição difere significativamente do metal de base.
4. **Posições de Soldagem**:
   - Plana (1G / 1F), Horizontal (2G / 2F), Vertical (3G / 3F - progressão ascendente ou descendente) e Sobre-cabeça (4G / 4F). Em tubos: 5G (eixo fixo horizontal) e 6G (eixo fixo inclinado a 45°).''',
        'key_concepts': [
            {'term': 'Abertura da Raiz', 'definition': 'Separação mínima entre as peças a soldar para garantir penetração completa.'},
            {'term': 'Face da Raiz', 'definition': 'Superfície não chanfrada na raiz da junta que suporta o arco elétrico.'},
            {'term': 'ZTA', 'definition': 'Zona Termicamente Afetada, região crítica não fundida que sofreu alterações microestruturais pelo calor.'},
            {'term': 'Passe de Solda', 'definition': 'Progressão única de soldagem ao longo de uma junta, resultando em um cordão.'}
        ],
        'inspector_notes': 'O Inspetor de Soldagem N1 deve verificar dimensionalmente a abertura da raiz e o ângulo de bisel antes de autorizar o início da soldagem. Variações fora de tolerância da abertura da raiz geram falta de penetração ou queima excessiva.',
        'summary': 'A geometria do chanfro e o entendimento exato da nomenclatura de juntas são a base para a correta inspeção de montagem e controle do processo de soldagem.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 1, p. 1-57; Villani, p. 30-46'
    },
    'Tipos de Junta e Solda': {
        'title': 'Classificação de Juntas e Tipos de Solda',
        'introduction': 'A integridade estrutural de qualquer equipamento soldado depende da correta escolha e execução dos tipos de junta e dos tipos de solda previstos pelo projeto de engenharia.',
        'objectives': 'Identificar as 5 configurações fundamentais de juntas. Compreender a diferença funcional entre solda em chanfro e solda em ângulo. Calcular perna e garganta teórica/real de soldas em ângulo.',
        'explanation': '''Existem cinco configurações fundamentais de juntas na tecnologia da soldagem:
1. **Junta de Topo (Butt Joint)**: junta entre dois membros alinhados aproximadamente no mesmo plano.
2. **Junta em T (Tee Joint)**: junta entre dois membros situados em ângulos de aproximadamente 90° entre si em forma de T.
3. **Junta de Canto (Corner Joint)**: junta entre dois membros situados aproximadamente em ângulo reto nas bordas.
4. **Junta Sobreposta (Lap Joint)**: junta entre dois membros que se sobrepõem.
5. **Junta de Aresta (Edge Joint)**: junta entre as bordas de dois ou mais membros paralelos ou quase paralelos.

**Tipos Fundamentais de Solda**:
- **Solda em Chanfro (Ranhura)**: executada em chanfros (I, V, X, U, K, J) para penetração parcial ou total.
- **Solda em Ângulo (Filete)**: de seção transversal aproximadamente triangular, unindo superfícies em ângulo (juntas em T, sobrepostas ou de canto).
- **Garganta Teórica e Efetiva**: a distância mínima entre a raiz da solda e a face da solda em ângulo (ou hipotenusa do triângulo inscrito).
- **Solda de Tampão (Plug Weld)** e **Solda de Fenda (Slot Weld)**: soldas circulares ou oblongas executadas através de furos em chapas sobrepostas.''',
        'key_concepts': [
            {'term': 'Junta de Topo', 'definition': 'União entre peças alinhadas no mesmo plano.'},
            {'term': 'Solda em Ângulo', 'definition': 'Solda de seção transversal triangular unindo peças em ângulo.'},
            {'term': 'Garganta Efetiva', 'definition': 'Distância mínima da raiz da solda à sua face, descontado o reforço.'},
            {'term': 'Perna da Solda', 'definition': 'Comprimento do cateto do triângulo da solda em ângulo medida a partir da raiz.'}
        ],
        'inspector_notes': 'A medição da perna e da garganta efetiva de soldas em ângulo deve ser realizada com gabaritos devidamente calibrados. Garganta inferior à do projeto reduz a capacidade de carga da junta.',
        'summary': 'O tipo de junta define o acesso, a preparação do chanfro e o grau de restrição durante a contração térmica.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 1, p. 15-40'
    },
    'Simbologia de Soldagem': {
        'title': 'Simbologia de Soldagem e Normas AWS A2.4',
        'introduction': 'Os símbolos de soldagem constituem a linguagem gráfica padronizada internacional que transmite todas as exigências do projetista ao fabricante e ao inspetor, regulada pela AWS A2.4 e ABNT NBR 5874.',
        'objectives': 'Interpretar a linha de referência e linha de seta (lado da seta vs. outro lado). Reconhecer símbolos elementares de solda em chanfro e em ângulo. Identificar símbolos suplementares.',
        'explanation': '''A simbologia de soldagem segue uma estrutura normalizada rigorosa:
1. **Estrutura Básica do Símbolo**:
   - **Linha de Referência (sempre horizontal)**: base onde todos os símbolos e cotas são inseridos.
   - **Linha de Seta**: aponta para a junta a ser soldada.
   - **Cauda**: local onde são indicados processos de soldagem, especificações de EPS ou outras notas.
2. **Posicionamento dos Símbolos**:
   - **Abaixo da Linha de Referência**: significa solda no **LADO DA SETA**.
   - **Acima da Linha de Referência**: significa solda no **OUTRO LADO**.
   - **Em ambos os lados**: solda em ambos os lados da junta.
3. **Símbolos Suplementares Críticos**:
   - **Círculo na junção entre seta e referência**: solda em todo o contorno (all-around).
   - **Bandeira na junção**: solda a ser executada no campo (obra/montagem).
   - **Perfil**: reto/nivelado, convexo ou côncavo.''',
        'key_concepts': [
            {'term': 'Lado da Seta', 'definition': 'Símbolo colocado abaixo da linha de referência; aplica-se ao lado indicado pela seta.'},
            {'term': 'Outro Lado', 'definition': 'Símbolo colocado acima da linha de referência; aplica-se ao lado oposto.'},
            {'term': 'Solda em Todo o Contorno', 'definition': 'Representada por um círculo na intersecção da linha de referência com a linha de seta.'},
            {'term': 'Solda de Campo', 'definition': 'Representada por uma bandeira na intersecção da linha de referência com a linha de seta.'}
        ],
        'inspector_notes': 'A cauda do símbolo é de leitura obrigatória pelo Inspetor N1 para verificar se o processo ou EPS indicado no desenho corresponde ao procedimento qualificado em execução na fábrica.',
        'summary': 'Dominar o posicionamento acima ou abaixo da linha de referência é indispensável para evitar inversão na montagem e execução da solda.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 2, p. 58-105'
    },
    'Processos de Soldagem': {
        'title': 'Processos Convencionais e Especiais de Soldagem',
        'introduction': 'A seleção do processo de soldagem determina a produtividade, a energia de soldagem introduzida e as descontinuidades potenciais. O Inspetor N1 atua diretamente no acompanhamento e controle das variáveis essenciais de cada processo.',
        'objectives': 'Dominar o funcionamento dos processos SMAW (Eletrodo Revestido), GTAW (TIG), GMAW/FCAW (MIG/MAG e Arame Tubular), SAW (Arco Submerso) e OFW (Oxi-gás). Identificar equipamentos e limitações.',
        'explanation': '''Os processos a arco elétrico representam a espinha dorsal da indústria de fabricação soldada:
1. **Soldagem com Eletrodo Revestido (SMAW)**:
   - Proteção gasosa e formação de escória obtidas pela decomposição do revestimento.
   - Equipamento simples e alta versatilidade, adequado para campo e oficina.
2. **Soldagem TIG (GTAW)**:
   - Arco elétrico estabelecido entre um eletrodo não consumível de tungstênio e a poça de fusão.
   - Proteção por gás inerte puro (Argônio ou Hélio). Excelente qualidade para passes de raiz.
3. **Soldagem MIG/MAG (GMAW) e Arame Tubular (FCAW)**:
   - Alimentação contínua e automática de arame eletrodo consumível.
   - MIG utiliza gases inertes (Ar, He); MAG utiliza gases ativos (CO2 ou misturas Ar + O2 / CO2).
   - Modos de transferência: Curto-circuito (baixa energia), Globular, Aerossol/Spray (alta energia) e Pulsado.
4. **Soldagem a Arco Submerso (SAW)**:
   - O arco elétrico queima sob uma camada de fluxo granular protetor, sem clarão visível.
   - Altíssima taxa de deposição e elevada penetração, restrito às posições plana e horizontal.''',
        'key_concepts': [
            {'term': 'SMAW', 'definition': 'Processo manual com eletrodo revestido consumível e escória protetora.'},
            {'term': 'GTAW (TIG)', 'definition': 'Processo com eletrodo não consumível de tungstênio e proteção por gás inerte.'},
            {'term': 'GMAW (MIG/MAG)', 'definition': 'Processo semiautomático com alimentação contínua de arame e gás de proteção.'},
            {'term': 'SAW', 'definition': 'Soldagem a arco submerso em fluxo granular para alta produtividade em oficina.'}
        ],
        'inspector_notes': 'No processo TIG, o contato acidental do eletrodo de tungstênio com a poça de fusão gera inclusão de tungstênio, defeito inaceitável que requer goivagem e refazimento. No MIG/MAG, o controle da vazão do gás de proteção evita porosidades.',
        'summary': 'Cada processo de soldagem possui janela operacional específica de corrente, tensão, velocidade e proteção gasosa que devem obedecer à EPS aprovada.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 3, p. 106-180; Villani, p. 1-136'
    },
    'Consumíveis de Soldagem': {
        'title': 'Classificação AWS, Armazenamento e Secagem de Consumíveis',
        'introduction': 'Os consumíveis de soldagem (eletrodos revestidos, varetas, arames, fluxos e gases) devem atender a rigorosos critérios de recebimento, identificação, manuseio e tratamento térmico para evitar trincas por hidrogênio.',
        'objectives': 'Decodificar a classificação AWS A5 para eletrodos de aço-carbono (ex: E7018, E6010) e aços inoxidáveis. Controlar os ciclos de ressecagem, manutenção e estufas portáteis (cochichos).',
        'explanation': '''A especificação AWS estabelece os critérios de composição e propriedades dos consumíveis:
1. **Classificação AWS A5.1 (Aços ao Carbono)**:
   - Exemplo **E7018**:
     - **E**: Eletrodo para soldagem a arco elétrico.
     - **70**: Limite de resistência à tração mínimo de 70 ksi (aprox. 485 MPa).
     - **1**: Indica que pode ser soldado em todas as posições (0 = plana e horizontal; 1 = todas; 2 = plana e horizontal para filete; 4 = todas, incluindo vertical descendente).
     - **8**: Tipo de revestimento (Básico de baixo hidrogênio com pó de ferro, corrente CC+ ou CA).
2. **Tipos de Revestimento**:
   - **Celulósico (ex: E6010, E6011)**: alto teor de hidrogênio, arco penetrante e enérgico, ideal para passe de raiz em dutos. Não pode sofrer ressecagem em alta temperatura.
   - **Rutílico (ex: E6013)**: fácil reignição, arco suave, escória facilmente destacável, resistência moderada.
   - **Básico (ex: E7018)**: baixo teor de hidrogênio difusível, altíssima tenacidade ao impacto e resistência a trincas a frio.
3. **Tratamento Térmico de Eletrodos Básicos**:
   - **Estufa de Ressecagem**: 300°C a 350°C por 1 a 2 horas.
   - **Estufa de Manutenção/Armazenamento**: 100°C a 150°C.
   - **Estufa Portátil (Cochicho)**: 80°C a 110°C para uso imediato pelo soldador na frente de trabalho.''',
        'key_concepts': [
            {'term': 'E7018', 'definition': 'Eletrodo básico de baixo hidrogênio com pó de ferro, 70 ksi de resistência, todas as posições.'},
            {'term': 'Revestimento Básico', 'definition': 'Revestimento à base de carbonato de cálcio e fluorita que produz metal de solda com baixíssimo hidrogênio.'},
            {'term': 'Ressecagem', 'definition': 'Ciclo térmico em estufa a alta temperatura (300-350°C) para eliminar umidade adsorvida.'},
            {'term': 'Estufa Portátil', 'definition': 'Recipiente aquecido (80-110°C) mantido junto ao soldador para preservar eletrodos básicos secos.'}
        ],
        'inspector_notes': 'Eletrodos básicos E7018 retirados da estufa portátil e expostos à umidade atmosférica por mais de 4 horas devem ser recolhidos e submetidos a novo ciclo de ressecagem conforme procedimento.',
        'summary': 'O controle da umidade nos consumíveis básicos é a salvaguarda primária contra o surgimento de trincas a frio induzidas por hidrogênio.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 4, p. 181-220'
    },
    'Metalurgia da Soldagem': {
        'title': 'Metalurgia da Soldagem, Transformações de Fase e Diluição',
        'introduction': 'A soldagem submete a junta a ciclos térmicos de rápido aquecimento e resfriamento, gerando alterações microestruturais profundas na Zona Fundida (ZF) e na Zona Termicamente Afetada (ZTA).',
        'objectives': 'Compreender o diagrama de equilíbrio Ferro-Carbono (Fe-C) e as fases austenita, ferrita, perlita e martensita. Analisar curvas TTT e CCT e calcular Carbono Equivalente (CE) e diluição.',
        'explanation': '''A metalurgia da soldagem analisa as transformações no estado sólido provocadas pelo aporte térmico:
1. **Estruturas Cristalinas**:
   - **CCC (Cúbica de Corpo Centrado)**: Ferrita alfa (estável a baixas temperaturas) e ferrita delta. Menor solubilidade de carbono.
   - **CFC (Cúbica de Face Centrada)**: Austenita gama (estável em altas temperaturas). Maior solubilidade intersticial de carbono.
   - **TCC (Tetragonal de Corpo Centrado)**: Martensita, fase de não-equilíbrio resultante do resfriamento rápido da austenita, de elevadíssima dureza e fragilidade.
2. **Ciclo Térmico e ZTA**:
   - **Temperatura de Pico e Velocidade de Resfriamento (dT/dt)** determinam a microestrutura final.
   - A região da ZTA adjacente à linha de fusão atinge temperaturas muito elevadas, provocando crescimento exagerado de grão austenítico (ZTA de grãos grosseiros), tornando-se a área mais suscetível à fragilização.
3. **Carbono Equivalente (CE)**:
   - Fórmula internacional IIW: CE = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15.
   - Se CE > 0,40%, o aço apresenta temperabilidade elevada e requer pré-aquecimento para prevenir a formação de martensita.
4. **Cálculo da Diluição**:
   - Diluição (%) = [Área do Metal de Base Fundido / Área Total da Zona Fundida] * 100.''',
        'key_concepts': [
            {'term': 'Austenita', 'definition': 'Fase sólida de ferro gama com reticulado CFC, estável em alta temperatura.'},
            {'term': 'Martensita', 'definition': 'Fase tetragonal supersaturada de carbono, extremamente dura e frágil formada por resfriamento brusco.'},
            {'term': 'Carbono Equivalente', 'definition': 'Índice empírico que pondera a influência dos elementos de liga na temperabilidade e soldabilidade do aço.'},
            {'term': 'Diluição', 'definition': 'Percentual de metal de base que se funde e se mistura ao metal de adição para formar a poça de solda.'}
        ],
        'inspector_notes': 'O Inspetor de Soldagem N1 deve verificar e registrar a temperatura de pré-aquecimento e a temperatura interpasse com lápis térmico ou pirômetro para assegurar que a taxa de resfriamento não gere martensita dura na ZTA.',
        'summary': 'Controlar a velocidade de resfriamento através do aporte térmico e do pré-aquecimento é o princípio básico da integridade metalúrgica.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 5, p. 221-255; Villani, p. 82-136'
    },
    'Tensões e Deformações': {
        'title': 'Tensões Residuais, Deformações e Tratamentos Térmicos',
        'introduction': 'A dilatação térmica heterogênea durante o aquecimento e a contração restrita durante o resfriamento produzem tensões residuais de tração na solda e deformações geométricas nas estruturas.',
        'objectives': 'Identificar os tipos de deformação (longitudinal, transversal, angular e flambagem). Aplicar técnicas operacionais para minimizar deformações. Compreender os procedimentos de Tratamento Térmico de Alívio de Tensões (TTAT).',
        'explanation': '''As tensões residuais e as deformações são inevitáveis na soldagem por fusão, mas podem ser controladas:
1. **Tipos de Deformação**:
   - **Contração Transversal**: encurtamento no sentido perpendicular ao cordão de solda.
   - **Contração Longitudinal**: encurtamento no sentido paralelo ao eixo da solda.
   - **Distorção Angular**: rotação das abas da junta em torno do cordão, comum em chanfros em V simples devido à assimetria da poça.
2. **Métodos de Controle e Minimização**:
   - Emprego de chanfros simétricos em X em vez de V simples em chapas espessas.
   - Sequência de passes balanceada em torno do eixo neutro.
   - Técnica do passo peregrino (soldagem em trechos curtos no sentido oposto ao avanço geral).
   - Pré-deformação mecânica (disposição dorsal das peças antes de soldar).
3. **Tratamento Térmico de Alívio de Tensões (TTAT)**:
   - Aquecimento controlado em forno ou resistências elétricas até uma temperatura abaixo da linha A1 (tipicamente 580°C a 620°C para aços-carbono).
   - Promove o escoamento plástico a quente reduzindo as tensões residuais de pico para níveis seguros.''',
        'key_concepts': [
            {'term': 'Tensões Residuais', 'definition': 'Tensões internas que permanecem na estrutura soldada na ausência de cargas externas.'},
            {'term': 'Passo Peregrino', 'definition': 'Técnica de soldagem em passes curtos no sentido inverso da progressão geral para reduzir contração acumulada.'},
            {'term': 'TTAT', 'definition': 'Tratamento térmico de alívio de tensões abaixo da temperatura de transformação para reduzir picos de tensão interna.'},
            {'term': 'Pré-Deformação', 'definition': 'Montagem das peças com desvio proposital para que a contração da solda as traga para a posição correta.'}
        ],
        'inspector_notes': 'O martelamento mecânico para alívio de tensões intermediárias é estritamente proibido no passe de raiz e no passe final de acabamento para não provocar trincamento e encruamento prejudicial.',
        'summary': 'A geometria do chanfro e a sequência de deposição dos passes são os fatores operacionais mais eficazes no controle das deformações.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 6, p. 256-285'
    },
    'Descontinuidades e Defeitos de Soldagem': {
        'title': 'Classificação de Descontinuidades e Critérios de Aceitação',
        'introduction': 'Nem toda descontinuidade é um defeito. Uma descontinuidade só se torna defeito quando ultrapassa os limites de aceitação da norma técnica aplicável (ASME, AWS ou API), comprometendo a integridade da junta.',
        'objectives': 'Diferenciar descontinuidades planares e volumétricas. Identificar causas e prevenções para trincas, porosidades, inclusões de escória, falta de fusão e falta de penetração.',
        'explanation': '''As descontinuidades são divididas em conformidade com sua geometria e severidade:
1. **Descontinuidades Planares (Críticas - Concentradoras de Tensão)**:
   - **Trincas**: a quente (solidificação), a frio (induzida por hidrogênio na ZTA) ou interlamelar. Inaceitáveis por praticamente todas as normas.
   - **Falta de Fusão**: ausência de união entre o metal de solda e o metal de base ou entre passes adjacentes.
   - **Falta de Penetração**: falha do metal de solda em atingir e preencher completamente a raiz da junta.
2. **Descontinuidades Volumétricas**:
   - **Porosidades**: vazios formados por gás retido durante a solidificação (esferoidais, agrupadas, alinhadas ou vermiculares).
   - **Inclusões de Escória**: óxidos e resíduos não-metálicos retidos na poça de fusão.
   - **Inclusão de Tungstênio**: partículas de tungstênio desprendidas no processo TIG.
3. **Descontinuidades Geométricas de Superfície**:
   - **Mordedura**: depressão na margem da solda no metal de base não preenchida pelo metal de solda.
   - **Reforço Excessivo**: convexidade além do limite permitido pela norma.
   - **Desalinhamento (Hi-Lo)**: desnível entre as faces das peças na junta de topo.''',
        'key_concepts': [
            {'term': 'Descontinuidade', 'definition': 'Qualquer interrupção na estrutura típica de uma junta soldada.'},
            {'term': 'Defeito', 'definition': 'Descontinuidade que ultrapassa os critérios de aceitação da norma e exige rejeição ou reparo.'},
            {'term': 'Trinca a Frio', 'definition': 'Fissuração retardada provocada pela ação conjunta de hidrogênio, tensões residuais e microestrutura martensítica.'},
            {'term': 'Falta de Fusão', 'definition': 'Ausência de ligação metalúrgica íntima entre o cordão e as paredes do chanfro.'}
        ],
        'inspector_notes': 'Trincas e falta de fusão são consideradas inaceitáveis por todos os códigos de fabricação. Ao identificar uma trinca, o Inspetor N1 deve solicitar abertura de relatório de não conformidade e remoção completa por goivagem antes de autorizar a ressoldagem.',
        'summary': 'O julgamento da aceitabilidade de uma descontinuidade é estritamente normativo e nunca pessoal.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 1, p. 35-57; Cap. 9, p. 323-358'
    },
    'Ensaios Não Destrutivos': {
        'title': 'Métodos de Ensaios Não Destrutivos (END)',
        'introduction': 'Os Ensaios Não Destrutivos (END) avaliam a sanidade interna e superficial de juntas soldadas sem danificar a peça ou prejudicar sua futura vida útil.',
        'objectives': 'Compreender os princípios físicos e aplicações dos ensaios: Líquido Penetrante (LP), Partículas Magnéticas (PM), Ultrassom (US) e Radiografia (RX/Gama).',
        'explanation': '''A inspeção não destrutiva complementa o ensaio visual:
1. **Ensaio por Líquido Penetrante (LP)**:
   - Baseado no fenômeno da capilaridade.
   - Detecta exclusivamente descontinuidades abertas para a superfície em materiais não-porosos.
   - Roteiro: limpeza inicial, aplicação do penetrante, tempo de permanência, remoção do excesso, secagem, aplicação do revelador e avaliação sob iluminação adequada.
2. **Ensaio por Partículas Magnéticas (PM)**:
   - Baseado no desvio e vazamento de linhas de fluxo magnético em descontinuidades superficiais e subsuperficiais.
   - Aplicável unicamente em materiais ferromagnéticos (aços-carbono e baixa-liga; inaplicável em aços inoxidáveis austeníticos).
3. **Ensaio Radiográfico (RT)**:
   - Baseado na absorção diferencial de radiação ionizante (Raios X ou Raios Gama como Irídio-192 e Selênio-75).
   - Produz imagem permanente em filme radiográfico. Excelente para descontinuidades volumétricas (poros e escórias).
4. **Ensaio por Ultrassom (UT)**:
   - Baseado na reflexão e refração de feixes de ondas acústicas de alta frequência (megahertz).
   - Excelente sensibilidade para detecção de descontinuidades planares (trincas e faltas de fusão) em qualquer profundidade.''',
        'key_concepts': [
            {'term': 'Capilaridade', 'definition': 'Princípio físico que permite ao líquido penetrante entrar em trincas submicroscópicas abertas à superfície.'},
            {'term': 'Vazamento de Fluxo', 'definition': 'Campo magnético desviado para o ar na presença de descontinuidade em material magnetizado.'},
            {'term': 'Radiografia Industrial', 'definition': 'Método volumétrico com registro permanente em filme fotográfico através de radiação ionizante.'},
            {'term': 'Ultrassom', 'definition': 'Método volumétrico de alta precisão para localização de descontinuidades bidimensionais por eco-pulsado.'}
        ],
        'inspector_notes': 'O ensaio por Líquido Penetrante jamais detecta descontinuidades internas que não aflorem à superfície externa. Em juntas de aços inoxidáveis austeníticos, o ensaio de Partículas Magnéticas não funciona devido ao caráter não magnético da austenita.',
        'summary': 'A combinação de métodos superficiais (LP/PM) com métodos volumétricos (US/RT) garante a cobertura integral da junta.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 9, p. 323-358'
    },
    'Ensaio Visual e Dimensional': {
        'title': 'Ensaio Visual e Dimensional de Soldas',
        'introduction': 'O Ensaio Visual e Dimensional (EVD) é o método de controle de qualidade mais utilizado, econômico e mandatório em 100% das juntas soldadas antes, durante e após a execução da soldagem.',
        'objectives': 'Conhecer as exigências de acuidade visual do inspetor. Executar inspeção visual antes da soldagem, durante a passagem dos cordões e após a conclusão da junta soldada.',
        'explanation': '''O Ensaio Visual é a primeira linha de defesa da qualidade:
1. **Requisitos de Execução e Acuidade Visual**:
   - Acuidade visual para perto comprovada pelo teste de Jaeger J-1 e diferenciação de cores pelo teste de Ishihara.
   - Intensidade de iluminação mínima recomendada de 1000 lux na superfície de inspeção.
   - Ângulo de visualização não inferior a 30° em relação à superfície, com os olhos a uma distância máxima de 600 mm.
2. **Fases da Inspeção Visual**:
   - **Antes da Soldagem**: verificação de limpeza, ângulo de chanfro, abertura de raiz, alinhamento, ponteamento e temperatura de pré-aquecimento.
   - **Durante a Soldagem**: controle de variáveis elétricas, remoção de escória entre passes, temperatura interpasse e aspecto do passe de raiz.
   - **Após a Soldagem**: verificação do perfil do cordão, reforço, mordeduras, porosidades superficiais e dimensões finais de perna e garganta.''',
        'key_concepts': [
            {'term': 'EVD', 'definition': 'Ensaio visual e dimensional mandatório antes, durante e após a soldagem.'},
            {'term': 'Acuidade Visual', 'definition': 'Capacidade óptica de resolução de detalhes do inspetor avaliada por cartão Jaeger.'},
            {'term': 'Iluminação de Inspeção', 'definition': 'Nível de luminosidade na peça que deve atingir no mínimo 1000 lux para exame visual confiável.'}
        ],
        'inspector_notes': 'Nenhum outro ensaio não destrutivo (LP, PM, US ou RX) deve ser iniciado antes que o ensaio visual e dimensional tenha sido concluído e aprovado.',
        'summary': 'O exame visual contínuo previne o sepultamento de defeitos sob passes subsequentes.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 9, p. 324-340; Cap. 11, p. 385-407'
    },
    'Instrumentos de Medição': {
        'title': 'Instrumentos de Medição e Calibração para Soldagem',
        'introduction': 'A verificação dimensional rigorosa exige instrumentos de alta precisão devidamente calibrados com rastreabilidade metrológica RBC/INMETRO.',
        'objectives': 'Utilizar paquímetro, micrômetro, goniômetro e calibradores de solda (Cambridge, Hi-Lo, calibre de solda multi-uso). Efetuar leituras no nônio e avaliar incerteza de medição.',
        'explanation': '''A medição dimensional correta evita o retrabalho e a rejeição de juntas:
1. **Paquímetro**:
   - Leitura de dimensões externas, internas e de profundidade. Resolução típica de 0,05 mm ou 0,02 mm no nônio.
2. **Micrômetro**:
   - Instrumento de precisão milesimal (0,01 mm ou 0,001 mm) baseado no passo de um fuso micrométrico, utilizado para espessuras finas e diâmetros de arames consumíveis.
3. **Calibradores Específicos de Solda**:
   - **Gabarito Cambridge**: mede ângulo de bisel, desalinhamento (hi-lo), altura de reforço de solda de topo e comprimento de perna e garganta de solda em ângulo.
   - **Calibre Hi-Lo**: projeta hastes internas para medir com exatidão o desalinhamento interno da raiz em juntas tubulares.
4. **Termopares, Pirômetros de Contato e Lápis Térmicos**:
   - Instrumentos para medição da temperatura de pré-aquecimento e interpasse.''',
        'key_concepts': [
            {'term': 'Paquímetro', 'definition': 'Instrumento com escala principal e nônio para medição dimensional rápida de folgas e peças.'},
            {'term': 'Gabarito Cambridge', 'definition': 'Calibre multifuncional de aço inoxidável para medição de reforço, perna, garganta e ângulo de chanfro.'},
            {'term': 'Calibre Hi-Lo', 'definition': 'Instrumento de medição de desalinhamento interno de tubulações antes da soldagem de raiz.'},
            {'term': 'Lápis Térmico', 'definition': 'Bastão com ponto de fusão calibrado que funde instantaneamente ao atingir a temperatura determinada.'}
        ],
        'inspector_notes': 'O Inspetor N1 deve verificar sempre a etiqueta de calibração do instrumento. Instrumentos com calibração vencida não podem ser utilizados em medições de aceitação de produto.',
        'summary': 'A correta leitura do nônio e a calibração metrológica válida asseguram a credibilidade técnica do laudo dimensional.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 11, p. 385-407'
    },
    'Qualificação de Procedimentos (EPS/RQPS)': {
        'title': 'Qualificação de Procedimentos de Soldagem (EPS e RQPS)',
        'introduction': 'Uma Especificação de Procedimento de Soldagem (EPS) documenta todas as variáveis para assegurar que a junta atenda aos requisitos de projeto. O Registro de Qualificação de Procedimento de Soldagem (RQPS) comprova os resultados dos testes mecânicos.',
        'objectives': 'Diferenciar EPS de RQPS. Identificar variáveis essenciais, não-essenciais e suplementares essenciais conforme códigos ASME Seção IX e AWS D1.1.',
        'explanation': '''O sistema de qualificação de procedimentos é a garantia de repetibilidade da qualidade:
1. **Especificação de Procedimento de Soldagem (EPS)**:
   - Documento que descreve detalhadamente as variáveis operacionais para guiar o soldador (processo, chanfro, consumível, corrente, tensão, pré-aquecimento, gás, etc.).
2. **Registro de Qualificação de Procedimento de Soldagem (RQPS)**:
   - Documento que registra os dados reais medidos durante a soldagem de uma chapa ou tubo de teste e os resultados dos ensaios mecânicos obrigatórios (tração, dobramento, impacto).
3. **Classificação das Variáveis (ASME IX / AWS D1.1)**:
   - **Variáveis Essenciais**: alterações afetam significativamente as propriedades mecânicas da junta (ex: mudança de processo, mudança de P-Number do metal de base, mudança de F-Number do eletrodo, diminuição do pré-aquecimento). Exigem novo RQPS.
   - **Variáveis Não-Essenciais**: podem ser revisadas na EPS sem necessidade de novo teste (ex: pequena alteração no ângulo do chanfro, tipo de limpeza).
   - **Variáveis Suplementares Essenciais**: tornam-se essenciais quando o projeto exige teste de impacto Charpy (tenacidade a baixas temperaturas).''',
        'key_concepts': [
            {'term': 'EPS', 'definition': 'Especificação de Procedimento de Soldagem contendo todas as variáveis requeridas para a produção.'},
            {'term': 'RQPS', 'definition': 'Registro de Qualificação de Procedimento contendo os testes mecânicos laboratoriais que validam a EPS.'},
            {'term': 'Variável Essencial', 'definition': 'Condição de soldagem cuja alteração obriga a realização de nova qualificação com teste mecânico.'},
            {'term': 'P-Number', 'definition': 'Código ASME de agrupamento de metais de base com soldabilidade e composição comparáveis.'}
        ],
        'inspector_notes': 'Durante a fabricação, o Inspetor N1 deve confrontar os parâmetros reais praticados pelo soldador com os limites mínimos e máximos estabelecidos na EPS qualificada.',
        'summary': 'A conformidade com a EPS qualificada assegura que a estrutura soldada apresentará o mesmo desempenho obtido no corpo de prova aprovado.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 10, p. 359-384'
    },
    'Qualificação de Soldadores': {
        'title': 'Qualificação de Soldadores e Operadores (RQS e IEIS)',
        'introduction': 'A habilidade operacional do soldador é atestada por meio do Registro de Qualificação de Soldador (RQS) e orientada pelas Instruções de Execução e Inspeção de Soldagem (IEIS).',
        'objectives': 'Definir faixas de qualificação de posições, processos e consumíveis. Controlar a validade da qualificação do soldador e os critérios de renovação periódica.',
        'explanation': '''A qualificação de pessoal avalia a habilidade de depositar metal de solda são:
1. **Registro de Qualificação de Soldador (RQS)**:
   - Documento que certifica a aprovação do soldador após testes em corpos de prova inspecionados por ensaio visual e ensaios de dobramento guiado ou radiografia.
2. **Extensão da Qualificação**:
   - Posições: soldador qualificado em 6G em tubo está qualificado para todas as posições em chapas e tubos.
   - P-Numbers e F-Numbers: a qualificação com eletrodo de maior F-Number (ex: F4 / E7018) geralmente qualifica os de menor F-Number (F1 a F3).
3. **Manutenção da Validade**:
   - Pelo código ASME IX, a qualificação permanece válida desde que o soldador utilize o processo pelo qual foi qualificado dentro de um período contínuo de até 6 meses.
   - Caso passe mais de 6 meses sem soldar no processo, sua qualificação expira.''',
        'key_concepts': [
            {'term': 'RQS', 'definition': 'Registro de Qualificação de Soldador documentando as faixas de espessura, diâmetro e posições autorizadas.'},
            {'term': 'IEIS', 'definition': 'Instrução de Execução e Inspeção de Soldagem que sintetiza os parâmetros da EPS para o posto de trabalho.'},
            {'term': 'Posição 6G', 'definition': 'Tubo inclinado a 45° sem rotação durante a soldagem; qualifica para todas as posições de produção.'}
        ],
        'inspector_notes': 'O Inspetor N1 é o responsável por verificar se o soldador que está executando a junta possui RQS ativo e compatível com o processo, espessura, diâmetro e posição da junta em fabricação.',
        'summary': 'Soldador qualificado e certificado é condição sine qua non para o início da execução de soldas industriais.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 10, p. 364-375'
    },
    'Inspeção e Qualidade': {
        'title': 'Sistema de Gestão da Qualidade e Atribuições do Inspetor N1',
        'introduction': 'O Inspetor de Soldagem N1 atua como garantidor da conformidade técnica, seguindo o Código de Ética e Conduta do Sistema Nacional de Qualificação e Certificação (SNQC/FBTS).',
        'objectives': 'Conhecer as atribuições normativas do Inspetor N1. Compreender os ensaios mecânicos destrutivos de controle de qualidade (Tração, Dobramento, Charpy, Dureza e Macrografia).',
        'explanation': '''A qualidade assegurada na soldagem combina inspeções em processo e ensaios laboratoriais:
1. **Atribuições do Inspetor de Soldagem Nível 1 (N1)**:
   - Atuação direta nas etapas de preparação, execução e acabamento da soldagem.
   - Verificação de consumíveis, EPS, soldadores, temperaturas, dimensões e controle de descontinuidades superficiais.
   - Emissão de relatórios diários de inspeção e marcação de peças aprovadas ou reprovadas.
2. **Ensaios Mecânicos e Metalográficos**:
   - **Ensaio de Tração**: mede limite de escoamento, limite de resistência à tração e alongamento.
   - **Ensaio de Dobramento Guiado**: avalia a ductilidade da junta e detecta descontinuidades abertas na face, raiz ou lateral.
   - **Ensaio de Impacto Charpy V**: avalia a energia absorvida (em Joules) e a tenacidade em temperaturas de serviço sub-zero.
   - **Ensaio de Macrografia (ASTM E 340)**: ataque químico para visualização a olho nu da penetração, número de passes, perfil do cordão e descontinuidades macroscópicas.''',
        'key_concepts': [
            {'term': 'SNQC/FBTS', 'definition': 'Sistema Nacional de Qualificação e Certificação de Pessoal de Soldagem.'},
            {'term': 'Macrografia', 'definition': 'Exame visual da seção transversal polida e atacada quimicamente de uma junta soldada.'},
            {'term': 'Impacto Charpy', 'definition': 'Ensaio dinâmico com pêndulo para medir a tenacidade e temperatura de transição dúctil-frágil.'}
        ],
        'inspector_notes': 'O Inspetor de Soldagem N1 não tem atribuição para elaborar ou aprovar EPS (atribuição do N2), mas tem a responsabilidade indelegável de paralisar qualquer soldagem executada em desacordo com a EPS aprovada.',
        'summary': 'A atuação ética e técnica do Inspetor N1 é a espinha dorsal do Sistema de Garantia da Qualidade na indústria da soldagem.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 12, p. 408-422'
    },
    'Normas e Documentos Técnicos': {
        'title': 'Normas Técnicas, Códigos de Construção e Rastreabilidade',
        'introduction': 'A fabricação soldada obedece a códigos de projeto consagrados mundialmente (ASME Seções VIII e IX, AWS D1.1, API 1104, ABNT NBR e Petrobras).',
        'objectives': 'Navegar na estrutura dos principais códigos e normas técnicas. Garantir a rastreabilidade integral entre materiais, juntas, soldadores e relatórios de inspeção.',
        'explanation': '''A padronização normativa garante segurança de vidas e instalações:
1. **Principais Códigos e Normas de Soldagem**:
   - **ASME Seção VIII**: Vasos de pressão.
   - **ASME Seção IX**: Qualificação de procedimentos de soldagem e soldadores para caldeiras e vasos de pressão.
   - **AWS D1.1**: Código de soldagem estrutural para aço carbono.
   - **API 1104**: Soldagem de tubulações terrestres e marítimas para condução de petróleo e gás.
   - **Petrobras N-133**: Requisitos de soldagem para equipamentos e tubulações da indústria petrolífera.
2. **Rastreabilidade**:
   - Sistema documental que permite reconstituir todo o histórico de fabricação de uma junta: corrida do metal de base, lote do consumível, soldador responsável, EPS utilizada e resultados dos relatórios de END.''',
        'key_concepts': [
            {'term': 'Código de Construção', 'definition': 'Conjunto de regras de engenharia legalmente obrigatórias para projeto, fabricação e inspeção de equipamentos.'},
            {'term': 'Rastreabilidade', 'definition': 'Capacidade de recuperar o histórico, aplicação ou localização de um item por meio de registros gravados.'}
        ],
        'inspector_notes': 'Todas as anotações do Inspetor N1 em relatórios e no mapa de soldas devem ser legíveis, precisas e imediatamente arquivadas no prontuário do equipamento (Data Book).',
        'summary': 'Sem rastreabilidade documental integral, uma estrutura soldada não pode receber liberação operacional pelas autoridades e seguradoras.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 10 e 12, p. 359-363, 408-422'
    },
    'Segurança do Trabalho': {
        'title': 'Segurança e Proteção na Soldagem e Corte',
        'introduction': 'As operações de soldagem envolvem riscos ocupacionais severos: radiação não ionizante (UV e IV), fumos metálicos tóxicos, queimaduras por respingos, incêndios e choque elétrico.',
        'objectives': 'Especificar EPIs adequados (máscara de solda com lente de tonalidade correta conforme amperagem, avental de raspa, luvas, perneiras). Prevenir acidentes em espaços confinados.',
        'explanation': '''A preservação da vida e saúde do soldador é prioridade absoluta:
1. **Radiação Não-Ionizante**:
   - O arco elétrico emite intensa radiação ultravioleta (UV) e infravermelha (IV).
   - A radiação UV pode causar queimadura ocular dolorosa conhecida como arco voltaico ou fotoqueratite.
   - Uso de máscara com filtro de proteção ocular cuja tonalidade deve ser escolhida em função da corrente de soldagem.
2. **Fumos e Gases**:
   - A queima do consumível gera partículas microscópicas de óxidos de ferro, manganês, cromo hexavalente e níquel.
   - Exige sistema de exaustão localizada ou respiradores com filtro especial contra fumos metálicos PFF2/N95.
3. **Choque Elétrico e Espaço Confinado**:
   - A tensão em vazio da fonte de soldagem (50V a 80V) pode ser fatal em locais úmidos ou confinados.
   - Obrigatório aterramento seguro, luvas secas e ventilação contínua em espaços confinados.''',
        'key_concepts': [
            {'term': 'Fotoqueratite', 'definition': 'Queimadura aguda da córnea causada pela exposição aos raios ultravioleta do arco elétrico.'},
            {'term': 'Fumos Metálicos', 'definition': 'Vapores de metal condensados em partículas ultrafinas inaláveis provenientes da poça de fusão.'},
            {'term': 'Tensão em Vazio', 'definition': 'Diferença de potencial entre os terminais da fonte quando ligada sem estabelecimento de arco.'}
        ],
        'inspector_notes': 'O Inspetor N1 deve verificar se a área de soldagem possui biombos de proteção para preservar outros trabalhadores da radiação do arco e se os equipamentos elétricos possuem cabos intactos e aterramento eficaz.',
        'summary': 'Nenhum trabalho de soldagem tem justificativa para ser executado sem os EPIs adequados e medidas preventivas de segurança.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 13, p. 423-439'
    },
    'Desenho Técnico Aplicado': {
        'title': 'Leitura e Interpretação de Desenho Técnico e Metrologia',
        'introduction': 'A capacidade de ler e interpretar desenhos mecânicos, vistas ortográficas, cortes e detalhes de juntas é pré-requisito indispensável para a localização e inspeção das soldas em campo.',
        'objectives': 'Interpretar vistas ortográficas no 1º e 3º diedros. Efetuar cálculos de conversão de unidades (polegadas para milímetros, minutos e segundos em graus). Identificar cotas e escalas.',
        'explanation': '''O desenho técnico é a linguagem gráfica universal da fabricação:
1. **Projeções Ortogonais**:
   - Representação tridimensional em planos bidimensionais (vista frontal, superior e lateral esquerda no 1º diedro).
2. **Cortes e Seções**:
   - Planos imaginários de corte que revelam o interior de peças, chanfros e detalhes construtivos.
3. **Cálculos e Conversões de Medidas**:
   - 1 polegada (") = 25,4 mm.
   - Cálculos angulares: 1 grau (°) = 60 minutos (\'), 1 minuto (\') = 60 segundos (\").''',
        'key_concepts': [
            {'term': 'Projeção Ortogonal', 'definition': 'Método de representação de objetos tridimensionais em planos ortogonais.'},
            {'term': 'Corte', 'definition': 'Representação da peça após a remoção imaginária de uma de suas partes para visualizar o interior.'}
        ],
        'inspector_notes': 'Antes de inspecionar uma peça, o Inspetor N1 deve conferir a revisão do desenho na fábrica para assegurar que a montagem foi feita de acordo com a última versão emitida pela engenharia.',
        'summary': 'A leitura precisa do desenho técnico garante a conformidade geométrica e dimensional da estrutura.',
        'source_pages_ref': 'Villani, p. 162-233'
    },
    'Estanqueidade': {
        'title': 'Ensaio de Estanqueidade e Detecção de Vazamentos',
        'introduction': 'O ensaio de estanqueidade verifica se recipientes, tubulações e reservatórios soldados contêm vazamentos em juntas submetidas a fluidos pressurizados ou sob vácuo.',
        'objectives': 'Compreender os métodos de ensaio por pressão hidrostática, pneumática com bolhas de sabão e caixa de vácuo (vacuum box) para fundos de tanques.',
        'explanation': '''A contenção segura de fluidos é comprovada por testes de estanqueidade:
1. **Caixa de Vácuo (Vacuum Box)**:
   - Utilizada para testar juntas de fundo de tanques de armazenamento de petróleo e derivados.
   - Aplica-se uma solução formadora de bolhas na solda, posiciona-se a caixa com visor transparente e cria-se vácuo (depressão). Vazamentos revelam-se por borbulhamento contínuo.
2. **Teste Hidrostático**:
   - Pressurização com água a uma pressão superior à pressão de projeto para verificação estrutural e estanqueidade simultâneas.
3. **Teste Pneumático com Solução Formadora de Bolhas**:
   - Pressurização moderada com ar comprimido ou gás inerte com inspeção visual das juntas tratadas com solução de bolhas.''',
        'key_concepts': [
            {'term': 'Caixa de Vácuo', 'definition': 'Dispositivo com visor acrílico e vedação de borracha para teste de vazamento em soldas planas de tanques.'},
            {'term': 'Teste Hidrostático', 'definition': 'Pressurização com água para validação de resistência mecânica e ausência de vazamento.'}
        ],
        'inspector_notes': 'Durante testes com caixa de vácuo, a pressão manométrica deve ser mantida conforme especificado na norma (tipicamente vácuo parcial de pelo menos 0,5 bar) por tempo suficiente para detecção de qualquer bolha.',
        'summary': 'O teste de estanqueidade é a prova conclusiva de vedação para componentes pressurizados e tanques.',
        'source_pages_ref': 'Livro SENAI - Inspetor de Soldagem, Cap. 9, p. 332-344; ESTANQUEIDADE.pdf'
    }
}

updated_lessons = 0
for mod_title, ldata in lessons_data.items():
    # Find module and primary lesson
    cur.execute('''
        SELECT l.id 
        FROM lessons l
        JOIN modules m ON l.module_id = m.id
        WHERE m.title = %s
        ORDER BY l.position ASC
        LIMIT 1
    ''', (mod_title,))
    row = cur.fetchone()
    if row:
        lid = row[0]
        cur.execute('''
            UPDATE lessons
            SET title = %s,
                introduction = %s,
                objectives = %s,
                explanation = %s,
                key_concepts = %s,
                inspector_notes = %s,
                summary = %s,
                source_pages_ref = %s,
                source_document_id = %s
            WHERE id = %s
        ''', (
            ldata['title'],
            ldata['introduction'],
            ldata['objectives'],
            ldata['explanation'],
            json.dumps(ldata['key_concepts']),
            ldata['inspector_notes'],
            ldata['summary'],
            ldata['source_pages_ref'],
            senai_doc_id,
            lid
        ))
        updated_lessons += 1

conn.commit()
print(f'Successfully updated {updated_lessons} lessons with rich pedagogical content.')

# Now populate lesson_questions table
cur.execute('DELETE FROM lesson_questions')

# For each module, link published questions to the primary lesson
cur.execute('''
    SELECT m.title, l.id as lesson_id, s.id as subject_id
    FROM modules m
    JOIN subjects s ON s.name = m.title
    JOIN lessons l ON l.module_id = m.id AND l.position = 0
''')
mod_targets = cur.fetchall()

total_linked = 0
for mtitle, lid, sid in mod_targets:
    # Get published questions for this subject
    cur.execute('''
        SELECT q.id, q.source_page, q.source_question_number
        FROM questions q
        WHERE q.subject_id = %s AND q.status = 'published'
        ORDER BY 
            COALESCE(NULLIF(regexp_replace(q.source_question_number, '\\D', '', 'g'), '')::integer, 9999),
            q.created_at ASC
    ''', (sid,))
    subj_questions = cur.fetchall()
    
    for pos, (qid, spage, snum) in enumerate(subj_questions, start=1):
        cur.execute('''
            INSERT INTO lesson_questions (lesson_id, question_id, position, source_page, source_question_number)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (lesson_id, question_id) DO UPDATE SET position = EXCLUDED.position
        ''', (lid, qid, pos, spage, snum))
        total_linked += 1

conn.commit()
print(f'Successfully linked {total_linked} published questions to their pedagogical lessons.')

# Check verification query
cur.execute('''
    SELECT m.title, l.title as lesson_title, count(lq.question_id) as questions_count
    FROM lesson_questions lq
    JOIN lessons l ON lq.lesson_id = l.id
    JOIN modules m ON l.module_id = m.id
    GROUP BY m.title, l.title, m.position
    ORDER BY m.position ASC
''')
print('\nQuestions per Pedagogical Lesson:')
for row in cur.fetchall():
    print(f'  [{row[0]}] {row[1]}: {row[2]} questoes')

conn.close()


