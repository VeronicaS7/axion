// ============================================================================
// COORDENADOR PRINCIPAL DO APP (APP.JS - REFATORADO)
// ============================================================================

function safeText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

function safeSetAttribute(id, attribute, value) {
  const element = document.getElementById(id);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

const LearningEngine = {
  getNextActivity(skill, lastResult) {
    if (!lastResult) {
      return this.generateBasicActivity(skill);
    }
    if (lastResult.correct) {
      return this.generateHarderActivity(skill);
    }
    return this.generateEasierActivity(skill, lastResult.errorType);
  },

  generateBasicActivity(skill) {
    if (skill === "s_vector_ops") {
      return {
        id: `generated_${Date.now()}`,
        activity_type: "multiple_choice",
        statement: "Dados A = (1, 2) e B = (3, 4), qual é A + B?",
        options: [
          { id: "o1", text: "(4, 6)", is_correct: true, feedback: "Correto. Some os componentes correspondentes." },
          { id: "o2", text: "(3, 8)", is_correct: false, feedback: "Você misturou os componentes." },
          { id: "o3", text: "(2, 6)", is_correct: false, feedback: "Revise a soma do eixo x." },
          { id: "o4", text: "(4, -2)", is_correct: false, feedback: "Revise a soma do eixo y." }
        ],
        explanation: "A + B = (1 + 3, 2 + 4) = (4, 6)."
      };
    }
    return null;
  },

  generateHarderActivity(skill) {
    if (skill === "s_vector_ops") {
      return {
        id: `generated_${Date.now()}`,
        activity_type: "multiple_choice",
        statement: "Dados A = (-2, 5) e B = (4, -3), qual é A + B?",
        options: [
          { id: "o1", text: "(2, 2)", is_correct: true, feedback: "Correto. Você somou sinais diferentes corretamente." },
          { id: "o2", text: "(-6, 8)", is_correct: false, feedback: "Você subtraiu onde deveria somar os componentes." },
          { id: "o3", text: "(2, 8)", is_correct: false, feedback: "Revise o segundo componente." },
          { id: "o4", text: "(-2, 2)", is_correct: false, feedback: "Revise o primeiro componente." }
        ],
        explanation: "A + B = (-2 + 4, 5 + -3) = (2, 2)."
      };
    }
    return this.generateBasicActivity(skill);
  },

  generateEasierActivity(skill, errorType) {
    if (skill === "s_vector_ops") {
      return {
        id: `generated_${Date.now()}`,
        activity_type: "multiple_choice",
        statement: "Dados A = (1, 1) e B = (2, 2), qual é A + B?",
        options: [
          { id: "o1", text: "(3, 3)", is_correct: true, feedback: "Correto. Agora tente uma com sinais diferentes." },
          { id: "o2", text: "(2, 2)", is_correct: false, feedback: "Você manteve o segundo vetor, mas precisa somar." },
          { id: "o3", text: "(1, 2)", is_correct: false, feedback: "Some os dois componentes de cada eixo." },
          { id: "o4", text: "(4, 4)", is_correct: false, feedback: "Você somou a mais." }
        ],
        explanation: "A + B = (1 + 2, 1 + 2) = (3, 3)."
      };
    }
    return this.generateBasicActivity(skill);
  }
};

function renderActivity(activity) {
  if (!activity) {
    return `<div class="activity-card empty"><p>Esta atividade ainda não foi carregada.</p></div>`;
  }
  const options = activity.options || activity.activity_options || [];
  const imageHtml = activity.image_path ? `
    <div class="exercise-image-container" style="text-align: center;">
      <img src="${activity.image_path}" alt="Figura da Questão" />
    </div>
  ` : '';
  
  const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
  
  return `
    <div class="activity-card">
      <div class="exercise-statement">${activity.statement}</div>
      ${imageHtml}
      <div class="exercise-options-container">
        ${options.map((option, index) => `
          <div class="alt-card" id="btn-opt-${option.id}" data-activity-id="${activity.id}" data-option-id="${option.id}">
            <span class="alt-letter">${letters[index] || ''}</span>
            <span class="alt-text">${option.text || option.content || option.value}</span>
          </div>
        `).join("")}
      </div>
      <div id="activity-feedback-${activity.id}" class="activity-feedback" style="margin-top: 20px;"></div>
    </div>
  `;
}

function bindActivityOptionEvents() {
  document.querySelectorAll('.alt-card').forEach(btn => {
    if (btn.dataset.bound) return;
    btn.dataset.bound = "true";
    btn.addEventListener('click', (e) => {
      // Allow re-answering or clicking? The user requirement says "NUNCA bloquear a progressão"
      // If we disable clicking after one try, they just click continue. We will disable other options.
      if (btn.parentElement.dataset.answered === "true") return;
      btn.parentElement.dataset.answered = "true";
      
      document.querySelectorAll('.alt-card').forEach(b => b.style.pointerEvents = 'none');
      
      const activityId = e.currentTarget.getAttribute('data-activity-id');
      const optionId = e.currentTarget.getAttribute('data-option-id');
      checkActivityAnswer(activityId, optionId);
    });
  });
}

function checkActivityAnswer(activityId, optionId) {
  const activity = window.currentActivities?.[activityId];
  if (!activity) return;
  const options = activity.options || activity.activity_options || [];
  const option = options.find(item => item.id === optionId);
  const feedbackBox = document.getElementById(`activity-feedback-${activityId}`);
  if (!feedbackBox || !option) return;

  const selectedBtn = document.getElementById(`btn-opt-${optionId}`);
  if (selectedBtn) {
    selectedBtn.classList.add("selected");
    if (option.is_correct) {
      selectedBtn.classList.add("correct");
    } else {
      selectedBtn.classList.add("incorrect");
    }
  }

  // Show Primary Action Button regardless of correctness
  const btnPrimary = document.getElementById("btn-lesson-primary-action");
  if (btnPrimary) {
    btnPrimary.style.display = "inline-flex";
    const textSpan = document.getElementById("btn-lesson-primary-action-text");
    if (textSpan) textSpan.textContent = "Continuar";
    const iconSpan = document.getElementById("btn-lesson-primary-action-icon");
    if (iconSpan) iconSpan.setAttribute("data-lucide", "arrow-right");
  }
  
  // Also show Hint & Professor buttons (if they exist)
  const btnHint = document.getElementById("btn-lesson-hint");
  if (btnHint) {
      btnHint.style.display = "inline-flex";
      // Ensure we bind the question ID to hint and professor
      btnHint.dataset.questionId = activity.id;
  }
  const btnProfessor = document.getElementById("btn-open-lesson-tutor");
  if (btnProfessor) {
      btnProfessor.dataset.questionId = activity.id;
      btnProfessor.dataset.optionId = optionId;
      btnProfessor.style.display = "inline-flex";
  }

  if (option.is_correct) {
    feedbackBox.innerHTML = `
      <div class="feedback-sheet correct">
        <strong style="color: var(--success); font-size: 1.1rem;"><i data-lucide="check-circle"></i> Correto!</strong>
        <div class="feedback-explanation-box">${option.feedback || activity.explanation || "Muito bem, você acertou!"}</div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  } else {
    feedbackBox.innerHTML = `
      <div class="feedback-sheet incorrect">
        <strong style="color: var(--error); font-size: 1.1rem;"><i data-lucide="x-circle"></i> Não é essa.</strong>
        <div class="feedback-explanation-box">
          <p>Vamos revisar o conceito relacionado antes de seguir.</p>
          <p style="margin-top: 8px; font-size: 0.9em; color: var(--text-secondary);">Utilize a Dica ou o Professor acima se precisar de ajuda para entender.</p>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }
  
  if (window.updateLearningState) updateLearningState(activity, option);
}

function updateLearningState(activity, selectedOption) {
  const correct = selectedOption.is_correct;
  window.lastLearningResult = {
    activityId: activity.id,
    skill: activity.skill_id || "s_vector_ops",
    correct,
    errorType: correct ? null : "calculation_error",
    answeredAt: new Date().toISOString()
  };
  const nextBox = document.getElementById("next-activity-box");
  if (nextBox) {
    const nextActivity = LearningEngine.getNextActivity(window.lastLearningResult.skill, window.lastLearningResult);
    if (nextActivity) {
      nextBox.innerHTML = `
        <button id="next-generated-activity" class="btn-primary" style="width: 100%; margin-top: 10px;">
          Praticar questão parecida
        </button>
      `;
      const btn = document.getElementById("next-generated-activity");
      if (btn) {
        btn.addEventListener("click", () => {
          const container = document.getElementById("step-content-render");
          if (container) {
            if (!window.currentActivities) window.currentActivities = {};
            window.currentActivities[nextActivity.id] = nextActivity;
            container.innerHTML = renderActivity(nextActivity);
            bindActivityOptionEvents();
          }
        });
      }
    }
  }
}


class App {
  constructor() {
    this.currentScreen = "onboarding";
    this.activeCourseId = "c1111111-1111-1111-1111-111111111111"; // Curso de Álgebra Linear por padrão
    
    // Estado da Lição Ativa
    this.activeLesson = null;
    this.activeSteps = [];
    this.currentStepIndex = 0;
    this.selectedOptionId = null;
    this.isAnswerChecked = false;
    
    // Estado da IA e Dicas
    this.activeAiSessionId = null;
    this.hintsUsedForCurrentStep = 0;
  }

  async init() {
    console.log("[Axion] Inicializando aplicação...");
    this.setupErrorHandlers();
    lucide.createIcons();
    this.setupGlobalEvents();
    
    try {
      await window.Auth.init((event, session, user) => {
        this.handleAuthEvent(event, session, user);
      });

      let session = null;
      if (localStorage.getItem("axion_admin_bypass") === "true") {
        session = { user: { id: "admin-id", email: "admin@axion.com", name: "Administrador" } };
      } else if (window.CONFIG.isDemoMode) {
        const cached = localStorage.getItem("axion_demo_user");
        if (cached) session = { user: JSON.parse(cached) };
      } else {
        const currentUser = window.Auth.getCurrentUser();
        session = currentUser ? { user: currentUser } : null;
      }

      window.currentSession = session;
      window.currentUser = session?.user || null;

      if (session) {
        console.log("[Axion] Usuário autenticado.");
        this.handleAuthEvent("SIGNED_IN", session, session.user);
        this.setupScrollAnimations();
        return this.navigateTo("home", false);
      }
      
      console.log("[Axion] Usuário visitante.");
      const path = window.location.pathname;
      let initialScreen = "onboarding";
      if (path === "/login") initialScreen = "auth";
      else if (path === "/signup") initialScreen = "signup";
      else if (path !== "/" && path !== "") initialScreen = path.substring(1);
      
      return this.navigateTo(initialScreen, false);

    } catch (error) {
      console.error("[Axion] Falha na inicialização:", error);
      this.renderPageError({
        title: "Erro de Inicialização",
        message: "Não conseguimos iniciar a plataforma corretamente. Tente recarregar a página."
      });
    }
  }

  setupErrorHandlers() {
    window.addEventListener("error", (event) => {
      console.error("[Global Error]", event.error || event.message);
    });

    window.addEventListener("unhandledrejection", (event) => {
      console.error("[Unhandled Promise]", event.reason);
    });
  }

  handleAuthEvent(event, session, user) {
    console.log("[Axion Auth Event]", event, session ? "SESSION_ACTIVE" : "NO_SESSION");
    
    window.currentSession = session;
    window.currentUser = user;

    const header = document.getElementById("global-header");
    if (user) {
      document.body.classList.add("authenticated");
      if(header) { header.style.display = "flex"; header.style.removeProperty("display"); }
      document.body.classList.remove("focused-lesson-mode");
      document.body.classList.remove("focus-mode");
      const nameEl = document.getElementById("user-display-name");
      if(nameEl) nameEl.textContent = user.name;
      this.loadDashboardData();
      this.setupScrollAnimations();
    } else {
      document.body.classList.remove("authenticated");
      if(header) header.style.display = "none";
      document.body.classList.remove("focused-lesson-mode");
      document.body.classList.remove("focus-mode");
    }

    if (event === "INITIAL_SESSION") {
      if (session) {
        this.navigateTo("home");
      } else {
        this.goToLandingSafely();
      }
      return;
    }

    if (event === "SIGNED_IN") {
      this.navigateAfterAuthentication();
      return;
    }

    if (event === "SIGNED_OUT") {
      window.pendingRoute = null;
      window.currentSession = null;
      window.currentUser = null;
      this.goToLandingSafely();
      return;
    }
  }

  navigateAfterAuthentication() {
    console.log("[Axion Router] Entrando na área de aprendizado.");
    if (window.pendingRoute) {
      const destination = window.pendingRoute;
      window.pendingRoute = null;
      return this.navigateTo(destination.route, true);
    }
    return this.navigateTo("home");
  }

  setupScrollAnimations() {
    if (this.scrollObserver) return;
    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("aos-animate");
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const animateElements = document.querySelectorAll('.animate-on-scroll, .glass-card, .shortcut-btn, .lab-tab-btn');
    animateElements.forEach(el => {
      el.classList.add("aos-init");
      this.scrollObserver.observe(el);
    });
  }

  goToLandingSafely() {
    if (window.currentSession) {
      console.warn("[Router] Landing bloqueada: usuário autenticado.");
      return this.navigateTo("home");
    }
    return this.navigateTo("onboarding");
  }

  // Componente de Erro de Página (Prevenção de Tela Branca)
  renderPageError({ title = "Não foi possível abrir esta página.", message = "A rota solicitada não existe ou ocorreu um erro.", actionText = "Voltar ao início", routeFallback = "onboarding" } = {}) {
    const container = document.getElementById("app-container");
    if (!container) return;

    // Se já houver uma tela de erro, remove
    const existingError = document.getElementById("screen-error-dynamic");
    if (existingError) existingError.remove();

    const errorScreen = document.createElement("section");
    errorScreen.className = "screen active";
    errorScreen.id = "screen-error-dynamic";
    errorScreen.style.cssText = "display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; text-align: center; width: 100%; padding: 40px;";
    
    errorScreen.innerHTML = `
      <div style="max-width: 400px;">
        <i data-lucide="triangle" style="width: 48px; height: 48px; transform: rotate(90deg); color: var(--axion-cyan); margin-bottom: 24px;"></i>
        <h1 style="font-size: 24px; font-weight: 800; margin-bottom: 16px;">${title}</h1>
        <p style="color: var(--axion-text-soft); margin-bottom: 32px;">${message}</p>
        <button class="btn-primary" id="btn-dynamic-error-back">${actionText}</button>
      </div>
    `;

    container.appendChild(errorScreen);
    if(typeof lucide !== "undefined") lucide.createIcons();

    // Vincula ação usando AbortController (ouvinte único)
    const btn = document.getElementById("btn-dynamic-error-back");
    if (btn) {
      btn.addEventListener("click", () => {
        errorScreen.remove();
        if (window.Auth && window.Auth.getCurrentUser()) {
           this.navigateTo("home");
        } else {
           this.navigateTo(routeFallback);
        }
      });
    }

    this.currentScreen = "error-dynamic";
  }

  // Roteador de Telas SPA e History API
  navigateTo(screenId, pushState = true) {
    console.log(`[Router] Navegando para: ${screenId}`);
    
    const PUBLIC_ROUTES = new Set(["onboarding", "auth", "signup", "forgot-password"]);
    const PROTECTED_ROUTES = new Set(["home", "explore", "area-production", "track", "lesson", "lab", "tutor", "profile"]);
    
    // 1. Verificação de Acesso (Guards)
    const requiresAuth = PROTECTED_ROUTES.has(screenId);
    
    if (requiresAuth && !window.currentSession) {
      console.warn(`[Router] Rota protegida: ${screenId}. Redirecionando para login.`);
      window.pendingRoute = { route: screenId };
      return this.navigateTo("auth", true);
    }
    
    if (window.currentSession && (screenId === "auth" || screenId === "signup" || screenId === "onboarding")) {
      return this.navigateTo("home", true);
    }

    // 2. Resolve 'signup' internamente para 'auth' com tab específica
    let actualScreenId = screenId;
    if (screenId === "signup") actualScreenId = "auth";
    
    // 3. Atualiza URL se necessário
    if (pushState) {
      let path = "/";
      if (screenId === "onboarding") path = "/";
      else if (screenId === "auth") path = "/login";
      else if (screenId === "signup") path = "/signup";
      else path = "/" + screenId;
      window.history.pushState({ screenId }, "", path);
    }

    // Valida se o contêiner de destino existe antes de ocultar a tela atual
    const targetScreen = document.getElementById(`screen-${actualScreenId}`);
    const currentScreenEl = document.querySelector(".screen.active");

    if (!targetScreen) {
      console.error(`[Router] Tela não encontrada: screen-${actualScreenId}`);
      if (currentScreenEl) currentScreenEl.classList.remove("active");
      this.renderPageError();
      return;
    }

    // 4. Lógica Específica da Tela de Auth
    if (actualScreenId === "auth") {
       localStorage.removeItem("axion_admin_bypass");
       const tabLogin = document.getElementById("tab-login-btn");
       const tabRegister = document.getElementById("tab-register-btn");
       const formLogin = document.getElementById("form-login");
       const formRegister = document.getElementById("form-register");
       const formRecovery = document.getElementById("form-recovery");

       // Resetar views de auth
       if(formRecovery) formRecovery.style.display = "none";
       if(formLogin) formLogin.classList.remove("active");
       if(formRegister) formRegister.classList.remove("active");

       if (screenId === "signup") {
          if(tabRegister) tabRegister.classList.add("active");
          if(tabLogin) tabLogin.classList.remove("active");
          if(formRegister) formRegister.classList.add("active");
       } else {
          if(tabLogin) tabLogin.classList.add("active");
          if(tabRegister) tabRegister.classList.remove("active");
          if(formLogin) formLogin.classList.add("active");
       }
    }

    // Trata fechamento de simulação ao sair da tela correspondente
    if (this.currentScreen === "lab" && actualScreenId !== "lab") {
      if(window.BottleneckSimulation) window.BottleneckSimulation.destroy();
    }

    // Modo Focado da Aula
    if (actualScreenId === "lesson") {
      document.body.classList.add("focused-lesson-mode");
    } else {
      document.body.classList.remove("focused-lesson-mode");
      if (window.currentSession) {
        const header = document.getElementById("global-header");
        if(header) header.style.display = "flex";
      }
      const drawer = document.getElementById("tutor-ia-drawer");
      if(drawer) drawer.classList.remove("open");
    }

    // 5. Transição de Telas
    const applyTarget = () => {
      // Remove componente de erro dinâmico se existir
      const errScreen = document.getElementById("screen-error-dynamic");
      if(errScreen) errScreen.remove();

      if (currentScreenEl) currentScreenEl.classList.remove("active");
      targetScreen.classList.add("active");
      this.currentScreen = actualScreenId;

      if (typeof gsap !== "undefined") {
        gsap.fromTo(targetScreen, 
          { opacity: 0, y: 20 }, 
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      }
    };

    if (currentScreenEl && currentScreenEl !== targetScreen) {
      if (typeof gsap !== "undefined" && currentScreenEl.id !== "screen-error-dynamic") {
        gsap.to(currentScreenEl, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          onComplete: () => {
            currentScreenEl.style.opacity = "";
            currentScreenEl.style.transform = "";
            applyTarget();
          }
        });
      } else {
        applyTarget();
      }
    } else if (!currentScreenEl && targetScreen) {
      applyTarget();
    }

    // Atualizar links ativos do menu de navegação lateral
    document.querySelectorAll(".nav-item").forEach(btn => {
      if (btn.getAttribute("data-screen") === actualScreenId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // 6. Carga de Dados Específicos
    try {
      if (actualScreenId === "home") {
        this.loadDashboardData();
      } else if (actualScreenId === "explore") {
        this.loadExploreCatalog();
      } else if (actualScreenId === "area-production") {
        this.loadAreaProductionData();
      } else if (actualScreenId === "track") {
        this.loadTrackMapData();
      } else if (actualScreenId === "lab") {
        this.initLaboratory();
      } else if (actualScreenId === "tutor") {
        this.initFullScreenProfessorChat();
      } else if (actualScreenId === "profile") {
        this.loadProfileData();
      }
    } catch (e) {
      console.error(`[Router] Erro ao carregar dados da tela ${actualScreenId}:`, e);
      // Não bloqueia a interface, mas pode logar no Sentry/Console
    }
  }

  // Função segura de Scroll (Landing Page)
  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) {
      console.warn(`[Landing] Seção #${sectionId} não encontrada.`);
      return;
    }
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // AbortController para Eventos da Página (Evita duplicação)
  createPageEventScope() {
    if (this.pageEventController) {
      this.pageEventController.abort();
    }
    this.pageEventController = new AbortController();
    return this.pageEventController.signal;
  }

  // Binds Seguros para Landing Page
  bindLandingEvents() {
    const signal = this.createPageEventScope();
    
    const actions = {
      "nav-logo": () => this.scrollToSection("ambient-background"),
      "nav-why": () => this.scrollToSection("why-axion"),
      "nav-how": () => this.scrollToSection("how-it-works"),
      "nav-experience": () => this.scrollToSection("experience"),
      "nav-courses": () => this.scrollToSection("courses"),
      "nav-login": () => this.navigateTo("auth"),
      "nav-signup": () => this.navigateTo("signup"),
      "hero-start": () => window.Auth.getCurrentUser() ? this.navigateTo("track") : this.navigateTo("signup"),
      "hero-learn-more": () => this.scrollToSection("why-axion")
    };

    Object.entries(actions).forEach(([id, handler]) => {
      // Usar a classe equivalente se o ID não existir
      let element = document.getElementById(id);
      
      // Mapeamento dinâmico baseado nos IDs/Classes atuais do index.html
      if (id === 'nav-logo') element = document.querySelector(".logo");
      if (id === 'nav-why') element = document.querySelector(".nav-links-center a[href='#why']");
      if (id === 'nav-how') element = document.querySelector(".nav-links-center a[href='#how']");
      if (id === 'nav-experience') element = document.querySelector(".nav-links-center a[href='#experience']");
      if (id === 'nav-courses') element = document.querySelector(".nav-links-center a[href='#courses']");
      if (id === 'nav-login') element = document.getElementById("btn-nav-login");
      if (id === 'nav-signup') element = document.getElementById("btn-nav-signup");
      if (id === 'hero-start') element = document.getElementById("btn-hero-start");
      if (id === 'hero-learn-more') element = document.querySelector(".hero-buttons .btn-secondary");

      if (!element) {
        // Elementos podem não existir em todas as telas
        return;
      }

      element.addEventListener("click", (e) => {
        e.preventDefault();
        handler();
      }, { signal });
    });
  }

  // Binds de Cliques Globais e Navegação
  setupGlobalEvents() {
    // Escuta eventos popstate do browser (Back/Forward)
    window.addEventListener("popstate", (e) => {
      if (e.state && e.state.screenId) {
        this.navigateTo(e.state.screenId, false);
      } else {
        const path = window.location.pathname;
        let screen = "onboarding";
        if (path === "/login") screen = "auth";
        else if (path === "/signup") screen = "signup";
        else if (path !== "/" && path !== "") screen = path.substring(1);
        this.navigateTo(screen, false);
      }
    });

    // Central de navegação via data attributes (Proteção CSP - Sem scripts inline)
    document.body.addEventListener("click", (e) => {
      // Navegação de rotas
      const navigateBtn = e.target.closest("[data-navigate]");
      if (navigateBtn) {
        e.preventDefault();
        const screen = navigateBtn.getAttribute("data-navigate");
        this.navigateTo(screen);
        return;
      }
      
      // Scroll em âncoras na mesma página
      const scrollBtn = e.target.closest("[data-scroll]");
      if (scrollBtn) {
        e.preventDefault();
        const sectionId = scrollBtn.getAttribute("data-scroll");
        this.scrollToSection(sectionId);
        return;
      }
    });

    // Efeitos GSAP em botões
    document.querySelectorAll(".btn-primary, .btn-secondary, .nav-item").forEach(btn => {
      btn.addEventListener("mouseenter", () => {
        if (typeof gsap !== "undefined") gsap.to(btn, { scale: 1.03, duration: 0.2, ease: "power1.out" });
      });
      btn.addEventListener("mouseleave", () => {
        if (typeof gsap !== "undefined") gsap.to(btn, { scale: 1, duration: 0.2, ease: "power1.out" });
      });
      btn.addEventListener("mousedown", () => {
        if (typeof gsap !== "undefined") gsap.to(btn, { scale: 0.95, duration: 0.1 });
      });
      btn.addEventListener("mouseup", () => {
        if (typeof gsap !== "undefined") gsap.to(btn, { scale: 1.03, duration: 0.1 });
      });
    });

    // Cliques no Menu do Cabeçalho/Sidebar
    document.querySelectorAll(".nav-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const screen = btn.getAttribute("data-screen");
        this.navigateTo(screen);
      });
    });

    // Binds Seguros da Landing Page
    this.bindLandingEvents();

    // Outros bindings...

    // Botão de Logout
    const btnLogout = document.getElementById("btn-logout");
    if (btnLogout) {
      btnLogout.addEventListener("click", async () => {
        if (confirm("Deseja realmente sair da sua conta?")) {
          await window.Auth.signOut();
        }
      });
    }

    // Onboarding -> Auth
    const btnOnboardingStart = document.getElementById("btn-onboarding-start");
    if (btnOnboardingStart) {
      btnOnboardingStart.addEventListener("click", () => {
        this.navigateTo("auth");
      });
    }

    // Troca de Tabs na tela de Auth
    const tabLoginBtn = document.getElementById("tab-login-btn");
    const tabRegisterBtn = document.getElementById("tab-register-btn");
    const formLogin = document.getElementById("form-login");
    const formRegister = document.getElementById("form-register");
    const formRecovery = document.getElementById("form-recovery");

    if (tabLoginBtn && tabRegisterBtn && formLogin && formRegister) {
      tabLoginBtn.addEventListener("click", () => {
        tabLoginBtn.classList.add("active");
        tabRegisterBtn.classList.remove("active");
        formLogin.classList.add("active");
        formRegister.classList.remove("active");
        if(formRecovery) formRecovery.style.display = "none";
      });

      tabRegisterBtn.addEventListener("click", () => {
        tabRegisterBtn.classList.add("active");
        tabLoginBtn.classList.remove("active");
        formRegister.classList.add("active");
        formLogin.classList.remove("active");
        if(formRecovery) formRecovery.style.display = "none";
      });
    }

    // Recuperação de senha links
    const linkForgotPassword = document.getElementById("link-forgot-password");
    if (linkForgotPassword && formLogin && formRecovery) {
      linkForgotPassword.addEventListener("click", (e) => {
        e.preventDefault();
        formLogin.classList.remove("active");
        formRegister.classList.remove("active");
        formRecovery.style.display = "block";
      });
    }

    const linkBackLogin = document.getElementById("link-back-login");
    if (linkBackLogin && formRecovery && formLogin) {
      linkBackLogin.addEventListener("click", (e) => {
        e.preventDefault();
        formRecovery.style.display = "none";
        formLogin.classList.add("active");
      });
    }

    // Submissão do Formulário de Login
    const loginForm = document.getElementById("login-form");
    if(loginForm) {
      loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const emailInput = document.getElementById("login-email");
        const passInput = document.getElementById("login-password");
        const errorDiv = document.getElementById("login-error");
        const submitBtn = document.getElementById("btn-login-submit");

        if(!emailInput || !passInput || !errorDiv) return;

        let email = emailInput.value.trim();
        let pass = passInput.value;
        let isMockAdmin = false;
        
        // Intercept admin credentials for shortcut
        if (email === "admin" && pass === "admin") {
          isMockAdmin = true;
        }
        
        errorDiv.style.display = "none";
        errorDiv.textContent = "";

        if (!email) {
          errorDiv.textContent = "Informe seu e-mail.";
          errorDiv.style.display = "block";
          emailInput.focus();
          return;
        }

        if (!pass) {
          errorDiv.textContent = "Informe sua senha.";
          errorDiv.style.display = "block";
          passInput.focus();
          return;
        }

        if(submitBtn) {
          submitBtn.disabled = true;
          submitBtn.querySelector('span').textContent = "Entrando...";
        }
        
        try {
          if (isMockAdmin) {
            window.currentUser = { id: "admin-id", email: "admin@axion.com", name: "Administrador" };
            window.currentSession = { user: window.currentUser };
            localStorage.setItem("axion_admin_bypass", "true");
          } else {
            const userObj = await window.Auth.signIn(email, pass);

            if (!userObj) {
              throw new Error("Sessão inválida após autenticação.");
            }

            window.currentUser = userObj;
            window.currentSession = { user: userObj };
          }
          
          console.log("[Axion Auth] Login concluído:", window.currentUser?.email);
          this.navigateAfterAuthentication();

        } catch (err) {
          console.error("[Auth] Falha no login:", err);
          if (err?.message?.toLowerCase().includes("invalid login credentials")) {
            errorDiv.textContent = "E-mail ou senha incorretos. Verifique os dados e tente novamente.";
          } else {
            errorDiv.textContent = "Não conseguimos conectar à Axion agora. Tente novamente.";
          }
          errorDiv.style.display = "block";
        } finally {
          if(submitBtn) {
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = "Entrar na Axion";
          }
        }
      });
    }

    // Submissão do Formulário de Registro
    const registerForm = document.getElementById("register-form");
    if(registerForm) {
      registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById("register-name");
        const emailInput = document.getElementById("register-email");
        const passInput = document.getElementById("register-password");
        const passConfirmInput = document.getElementById("register-password-confirm");
        const errorDiv = document.getElementById("register-error");
        const submitBtn = document.getElementById("btn-register-submit");

        if(!nameInput || !emailInput || !passInput || !passConfirmInput || !errorDiv) return;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const pass = passInput.value;
        const passConfirm = passConfirmInput.value;

        errorDiv.style.display = "none";

        if (!name) {
          errorDiv.textContent = "Informe seu nome.";
          errorDiv.style.display = "block";
          nameInput.focus();
          return;
        }

        if (pass.length < 6) {
          errorDiv.textContent = "A senha deve possuir pelo menos 6 caracteres.";
          errorDiv.style.display = "block";
          passInput.focus();
          return;
        }

        if (pass !== passConfirm) {
          errorDiv.textContent = "As senhas não coincidem.";
          errorDiv.style.display = "block";
          return;
        }

        if(submitBtn) {
          submitBtn.disabled = true;
          submitBtn.querySelector('span').textContent = "Criando conta...";
        }

        try {
          await window.Auth.signUp(name, email, pass);
          // Sucesso - Sessão será atualizada pelo listener e navegará para 'home'
        } catch (err) {
          console.error("[Auth] Falha no cadastro:", err);
          errorDiv.textContent = err.message || "Erro desconhecido ao cadastrar.";
          errorDiv.style.display = "block";
        } finally {
          if(submitBtn) {
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = "Criar minha conta";
          }
        }
      });
    }

    // Submissão do Formulário de Recuperação
    document.getElementById("recovery-form").addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("recovery-email").value;
      const errorDiv = document.getElementById("recovery-error");
      const successDiv = document.getElementById("recovery-success");
      errorDiv.style.display = "none";
      successDiv.style.display = "none";

      try {
        await window.Auth.resetPassword(email);
        successDiv.textContent = "Link de recuperação enviado com sucesso!";
        successDiv.style.display = "block";
        { const _el = document.getElementById('recovery-email'); if (_el) _el.value = ""; }
      } catch (err) {
        errorDiv.textContent = err.message || "Erro ao solicitar recuperação.";
        errorDiv.style.display = "block";
      }
    });

    // Atalhos rápidos no Dashboard inicial
    document.getElementById("btn-shortcut-lab").addEventListener("click", () => {
      this.navigateTo("lab");
    });
    
    document.getElementById("btn-shortcut-tutor").addEventListener("click", () => {
      this.navigateTo("tutor");
    });

    // Binds de retorno
    const btnBackToArea = document.getElementById("btn-back-to-area");
    if (btnBackToArea) {
      btnBackToArea.addEventListener("click", (e) => {
        e.preventDefault();
        this.navigateTo("area-production");
      });
    }

    const btnLessonClose = document.getElementById("btn-lesson-close");
    if (btnLessonClose) {
      btnLessonClose.addEventListener("click", () => {
        if (this.currentScreen === "lesson") {
          window.BottleneckSimulation.destroy();
        }
        this.navigateTo("track");
      });
    }

    // Botão de abrir/fechar o painel lateral do Professor IA dentro das aulas
    document.getElementById("btn-open-lesson-tutor").addEventListener("click", () => {
      this.toggleLessonProfessorDrawer();
    });

    document.getElementById("btn-close-lesson-tutor").addEventListener("click", () => {
      document.getElementById("tutor-ia-drawer").classList.remove("open");
    });

    // Enviar mensagem no chat da Aula
    document.getElementById("btn-tutor-lesson-send").addEventListener("click", () => {
      this.submitProfessorLessonMessage();
    });

    document.getElementById("tutor-lesson-input-field").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.submitProfessorLessonMessage();
    });

    // Cliques em chips socráticos do painel lateral da aula
    document.querySelectorAll("#tutor-lesson-quick-actions .quick-action-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const query = chip.getAttribute("data-query");
        this.askProfessorSocratic(query);
      });
    });

    // Enviar mensagem no chat completo do Professor IA (tela cheia)
    document.getElementById("btn-tutor-full-send").addEventListener("click", () => {
      this.submitProfessorFullMessage();
    });

    document.getElementById("tutor-full-input-field").addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.submitProfessorFullMessage();
    });

    document.querySelectorAll("#tutor-full-quick-actions .quick-action-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const query = chip.getAttribute("data-query");
        this.askProfessorFullSocratic(query);
      });
    });
  }

  // ============================================================================
  // CARREGAR PAINEL INICIAL (DASHBOARD) COM RECOMENDAÇÃO INTELIGENTE
  // ============================================================================
  async loadDashboardData() {
    try {
      const progress = await window.Tracker.getStudentProgress();
      
      // Atualizar Header XP
      { const _el = document.getElementById('header-score'); if (_el) _el.textContent = `${progress.score} XP`; }

      // Atualizar Streak e bolinhas visuais no painel
      { const _el = document.getElementById('user-streak'); if (_el) _el.textContent = `${progress.streak} ${progress.streak === 1 ? "dia" : "dias"} de ofensiva`; }
      
      // Atualizar bolinhas da semana
      const daysOfWeekMap = { 0: "dot-dom", 1: "dot-seg", 2: "dot-ter", 3: "dot-qua", 4: "dot-qui", 5: "dot-sex", 6: "dot-sab" };
      Object.values(daysOfWeekMap).forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove("active");
      });
      
      const oneWeekAgo = Date.now() - 7 * 86400000;
      if (progress.studied_dates && Array.isArray(progress.studied_dates)) {
        progress.studied_dates.forEach(dateStr => {
          const d = new Date(dateStr);
          if (d.getTime() > oneWeekAgo) {
            const dotId = daysOfWeekMap[d.getDay()];
            const el = document.getElementById(dotId);
            if (el) el.classList.add("active");
          }
        });
      }

      // 1. RECOMENDAÇÃO BASEADA EM REGRAS
      this.updateRuleBasedRecommendation(progress);

      // 2. AULA RECOMENDADA DO CURSO ATIVO
      let recomId = "l_alg_1_1";
      let title = "Representando informações com vetores";
      let desc = "Entenda o que define um vetor (direção, magnitude e sentido) e manipule suas coordenadas dinamicamente.";
      let recomProgress = 0;

      const order = ["l_alg_1_1", "l_num_1_1", "l_mat_1_1", "l_amd_1_1"];
      const lessonsDetails = {
        "l_alg_1_1": {
          title: "Representando informações com vetores",
          desc: "Entenda o que define um vetor (direção, magnitude e sentido) e manipule suas coordenadas dinamicamente."
        },
        "l_num_1_1": {
          title: "Por que precisamos de aproximações?",
          desc: "Compreenda a necessidade prática de estimar valores e o impacto dos limites de representação binária."
        },
        "l_mat_1_1": {
          title: "Estrutura, propriedades, processamento e desempenho",
          desc: "Analise o comportamento de materiais reais sob carregamento mecânico de tração."
        },
        "l_amd_1_1": {
          title: "Alternativas, critérios e decisões",
          desc: "Descubra a diferença de escopo entre alternativas e critérios conflitantes na engenharia de gestão."
        }
      };

      for (const id of order) {
        const lessonProg = progress.lessons ? progress.lessons[id] : null;
        const status = lessonProg ? lessonProg.status : "available";
        const percentage = lessonProg ? lessonProg.percentage : 0;
        
        if (status !== "completed") {
          recomId = id;
          title = lessonsDetails[id].title;
          desc = lessonsDetails[id].desc;
          recomProgress = percentage;
          break;
        }
      }

      const allCompleted = order.every(id => progress.lessons && progress.lessons[id] && progress.lessons[id].status === "completed");
      if (allCompleted) {
        recomId = "l_alg_1_1";
        title = "Álgebra Linear (Revisar)";
        desc = "Que tal praticar novamente os fundamentos e operações com vetores?";
        recomProgress = 100;
      }

      { const _el = document.getElementById('recom-lesson-title'); if (_el) _el.textContent = title; }
      { const _el = document.getElementById('recom-lesson-desc'); if (_el) _el.textContent = desc; }
      document.getElementById("recom-lesson-progress-bar").style.width = `${recomProgress}%`;
      { const _el = document.getElementById('recom-lesson-progress-text'); if (_el) _el.textContent = `${recomProgress}%`; }

      const btnText = recomProgress === 100 ? "Revisar Aula" : (recomProgress > 0 ? "Continuar Aula" : "Começar Aula");
      { const _el = document.getElementById('btn-continue-text'); if (_el) _el.textContent = btnText; }

      // Click da recomendação primária
      const btnRecom = document.getElementById("btn-continue-learning");
      const newBtnRecom = btnRecom.cloneNode(true);
      btnRecom.parentNode.replaceChild(newBtnRecom, btnRecom);
      newBtnRecom.addEventListener("click", () => {
        this.startLesson(recomId);
      });



      // 4. RENDERIZAR FILA DE REVISÃO
      const reviewEmptyMsg = document.getElementById("review-empty-message");
      const reviewList = document.getElementById("review-items-list");
      
      if (progress.review_items && progress.review_items.length > 0) {
        reviewEmptyMsg.style.display = "none";
        reviewList.style.display = "flex";
        reviewList.innerHTML = "";
        
        progress.review_items.forEach(item => {
          const div = document.createElement("div");
          div.className = "review-item";
          div.innerHTML = `
            <span style="font-size:12px; font-weight:600; color:var(--text-primary);">${item.lesson_title}</span>
            <i data-lucide="rotate-ccw" style="width:14px; height:14px; color:var(--error);"></i>
          `;
          div.addEventListener("click", () => this.startLesson(item.lesson_id));
          reviewList.appendChild(div);
        });
      } else {
        reviewEmptyMsg.style.display = "block";
        reviewList.style.display = "none";
      }

      lucide.createIcons();

      // DAILY COACH IA WIDGET
      try {
        const aiSummaryEl = document.getElementById("ai-progress-summary");
        if (aiSummaryEl) {
          aiSummaryEl.textContent = "Analisando seu histórico e gerando insights de IA...";
          const response = await fetch(`http://${window.location.hostname}:8000/ai-summary/progress`);
          if (response.ok) {
            const data = await response.json();
            aiSummaryEl.textContent = data.summary;
            
            // Create daily coach card if doesn't exist
            let coachCard = document.querySelector('.daily-coach-card');
            if (!coachCard) {
                coachCard = document.createElement('div');
                coachCard.className = 'daily-coach-card';
                coachCard.style.cssText = 'background: linear-gradient(135deg, rgba(121, 206, 210, 0.1), rgba(121, 206, 210, 0.05)); border: 1px solid rgba(121, 206, 210, 0.2); border-radius: var(--radius-lg); padding: 16px; margin-bottom: 24px; display: flex; gap: 16px; align-items: flex-start;';
                
                coachCard.innerHTML = `
                  <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--accent-cyan); color: var(--bg-dark); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <i data-lucide="brain" style="width: 24px; height: 24px;"></i>
                  </div>
                  <div style="flex: 1;">
                    <h3 style="font-size: 16px; color: var(--text-primary); margin-bottom: 4px; display: flex; align-items: center; gap: 8px;">
                      Coach de Estudos Diário <i data-lucide="sparkles" style="width:14px; height:14px; color:var(--accent-cyan);"></i>
                    </h3>
                    <p class="coach-message" style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;"></p>
                  </div>
                `;
                
                const dashboardMain = document.querySelector('.dashboard-main');
                if (dashboardMain) {
                  dashboardMain.insertBefore(coachCard, dashboardMain.firstChild);
                  lucide.createIcons();
                }
            }
            if (coachCard) {
                coachCard.querySelector('.coach-message').textContent = data.summary;
            }
          } else {
            aiSummaryEl.textContent = "Pronto para continuar aprendendo hoje?";
          }
        }
      } catch (err) {
        console.error("Erro ao buscar AI summary:", err);
        const aiSummaryEl = document.getElementById("ai-progress-summary");
        if (aiSummaryEl) aiSummaryEl.textContent = "Vamos continuar evoluindo!";
      }
    } catch (e) {
      console.error("[Dashboard] Falha ao carregar painel:", e);
    }
  }

  // Lógica de recomendação inteligente baseada em regras
  updateRuleBasedRecommendation(progress) {
    const recTitle = document.getElementById("personalized-rec-title");
    const recDesc = document.getElementById("personalized-rec-desc");
    const recCard = document.querySelector(".personalized-rec-card");
    if (!recTitle || !recDesc || !recCard) return;
    
    // Regra 1: Se o usuário tem itens falhos na fila de revisão
    if (progress.review_items && progress.review_items.length > 0) {
      const target = progress.review_items[0];
      recTitle.textContent = `Revisão de Erro: ${target.lesson_title}`;
      
      let justification = "Recomendado porque você teve dificuldades com o cálculo ou hipóteses do exercício nesta aula.";
      if (target.lesson_id === "l_alg_1_1") {
        justification = "Você apresentou dificuldade com vetores e operações algébricas. Revise as operações antes de avançar!";
      } else if (target.lesson_id === "l_amd_1_1") {
        justification = "Você apresentou dificuldade em normalizar os dados ou definir critérios no AMD. Que tal praticar mais?";
      } else if (target.lesson_id === "l_num_1_1") {
        justification = "Revise a diferença entre erro relativo e erro absoluto antes de avançar para Newton-Raphson.";
      } else if (target.lesson_id === "l_mat_1_1") {
        justification = "Reforce a diferença entre tensão e deformação antes de interpretar o ensaio de tração.";
      }
      
      recDesc.textContent = justification;
      recCard.style.cursor = "pointer";
      recCard.onclick = () => this.startLesson(target.lesson_id);
      return;
    }

    // Regra 2: Progressão inteligente recomendada (Álgebra -> Cálculo -> Materiais -> AMD)
    const isAlgCompleted = progress.lessons && progress.lessons["l_alg_1_1"] && progress.lessons["l_alg_1_1"].status === "completed";
    const isNumCompleted = progress.lessons && progress.lessons["l_num_1_1"] && progress.lessons["l_num_1_1"].status === "completed";
    const isMatCompleted = progress.lessons && progress.lessons["l_mat_1_1"] && progress.lessons["l_mat_1_1"].status === "completed";
    const isAmdCompleted = progress.lessons && progress.lessons["l_amd_1_1"] && progress.lessons["l_amd_1_1"].status === "completed";

    if (!isAlgCompleted) {
      recTitle.textContent = "Iniciar: Álgebra Linear";
      recDesc.textContent = "Aprenda a linguagem dos vetores e represente grandezas com magnitude, direção e sentido.";
      recCard.onclick = () => this.startLesson("l_alg_1_1");
    } else if (!isNumCompleted) {
      recTitle.textContent = "Continuar: Cálculo Numérico";
      recDesc.textContent = "Aprenda por que precisamos de aproximações numéricas e como computadores gerenciam erros de truncamento.";
      recCard.onclick = () => this.startLesson("l_num_1_1");
    } else if (!isMatCompleted) {
      recTitle.textContent = "Continuar: Ciência dos Materiais";
      recDesc.textContent = "Explore a estrutura cristalina de materiais e compreenda o ensaio de tração interativo.";
      recCard.onclick = () => this.startLesson("l_mat_1_1");
    } else if (!isAmdCompleted) {
      recTitle.textContent = "Continuar: Tomada de Decisão";
      recDesc.textContent = "Estruture problemas complexos e compare alternativas com múltiplos critérios usando o AMD.";
      recCard.onclick = () => this.startLesson("l_amd_1_1");
    } else {
      recTitle.textContent = "Desafio Prático no Laboratório";
      recDesc.textContent = "Aplique suas competências de balanceamento de linha e otimização em tempo real no laboratório.";
      recCard.onclick = () => this.navigateTo("lab");
    }
    recCard.style.cursor = "pointer";
  }

  // ============================================================================
  // TELA 4: EXPLORAR (CATÁLOGO DINÂMICO)
  // ============================================================================
  loadExploreCatalog() {
    const cardProducao = document.getElementById("area-card-producao");
    if (cardProducao) {
      cardProducao.onclick = () => this.navigateTo("area-production");
    }
    
    const cardSoldagem = document.getElementById("area-card-soldagem");
    if (cardSoldagem) {
      cardSoldagem.onclick = () => {
        // ID real do curso "Inspetor de Soldagem N1" no banco solda_inspecao
        this.activeCourseId = "0c38df0e-c8f2-4144-94c1-904b94c39ded";
        this.navigateTo("track");
      };
    }
  }

  // ============================================================================
  // TELA 4.5: ÁREA DE ENGENHARIA DE PRODUÇÃO
  // ============================================================================
  async loadAreaProductionData() {
    try {
      const progress = await window.Tracker.getStudentProgress();
      const courses = await window.Tracker.getTracks();

      // Atualiza a barra de progresso geral da área
      const areaProgressFill = document.getElementById("area-progress-fill");
      const areaProgressText = document.getElementById("area-progress-text");
      if (areaProgressFill && areaProgressText) {
        areaProgressFill.style.width = `${progress.track_percentage}%`;
        areaProgressText.textContent = `${progress.track_percentage}%`;
      }

      const container = document.getElementById("area-courses-list");
      if (!container) return;
      container.innerHTML = "";

      const courseSvgs = {
        "c1111111-1111-1111-1111-111111111111": `
          <svg viewBox="0 0 100 100" width="80" height="80" style="color: var(--primary);">
             <line x1="10" y1="50" x2="90" y2="50" stroke="var(--border-color)" stroke-dasharray="2 2" stroke-width="0.5" />
             <line x1="50" y1="10" x2="50" y2="90" stroke="var(--border-color)" stroke-dasharray="2 2" stroke-width="0.5" />
             <line x1="5" y1="50" x2="95" y2="50" stroke="var(--text-muted)" stroke-width="1.5" />
             <line x1="50" y1="5" x2="50" y2="95" stroke="var(--text-muted)" stroke-width="1.5" />
             <line x1="50" y1="50" x2="80" y2="20" stroke="var(--success)" stroke-width="2.5" marker-end="url(#arrow-c1)" />
             <line x1="50" y1="50" x2="25" y2="35" stroke="var(--primary)" stroke-width="2" marker-end="url(#arrow-c2)" />
             <line x1="80" y1="20" x2="55" y2="5" stroke="var(--warning)" stroke-width="1.5" stroke-dasharray="3 3" />
             <line x1="25" y1="35" x2="55" y2="5" stroke="var(--warning)" stroke-width="1.5" stroke-dasharray="3 3" />
             <line x1="50" y1="50" x2="55" y2="5" stroke="var(--warning)" stroke-width="2.5" />
             <defs>
               <marker id="arrow-c1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                 <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--success)" />
               </marker>
               <marker id="arrow-c2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                 <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--primary)" />
               </marker>
             </defs>
          </svg>
        `,
        "c2222222-2222-2222-2222-222222222222": `
          <svg viewBox="0 0 100 100" width="80" height="80" style="color: var(--warning);">
             <circle cx="50" cy="18" r="6" fill="var(--warning)" />
             <text x="50" y="22" font-size="8" font-family="Outfit" text-anchor="middle" fill="#000" font-weight="bold">D</text>
             <line x1="50" y1="24" x2="25" y2="45" stroke="var(--border-color)" stroke-width="1.5" />
             <line x1="50" y1="24" x2="50" y2="45" stroke="var(--border-color)" stroke-width="1.5" />
             <line x1="50" y1="24" x2="75" y2="45" stroke="var(--border-color)" stroke-width="1.5" />
             <circle cx="25" cy="45" r="5" fill="var(--primary)" />
             <circle cx="50" cy="45" r="5" fill="var(--primary)" />
             <circle cx="75" cy="45" r="5" fill="var(--primary)" />
             <line x1="25" y1="50" x2="35" y2="75" stroke="var(--border-color)" stroke-width="1" />
             <line x1="50" y1="50" x2="35" y2="75" stroke="var(--border-color)" stroke-width="1" />
             <line x1="75" y1="50" x2="65" y2="75" stroke="var(--border-color)" stroke-width="1" />
             <line x1="25" y1="50" x2="65" y2="75" stroke="var(--border-color)" stroke-width="1" />
             <rect x="23" y="75" width="24" height="12" rx="2" fill="var(--success)" />
             <text x="35" y="83" font-size="6" font-family="Inter" text-anchor="middle" fill="#000" font-weight="bold">Alt A</text>
             <rect x="53" y="75" width="24" height="12" rx="2" fill="var(--success)" />
             <text x="65" y="83" font-size="6" font-family="Inter" text-anchor="middle" fill="#000" font-weight="bold">Alt B</text>
          </svg>
        `,
        "c3333333-3333-3333-3333-333333333333": `
          <svg viewBox="0 0 100 100" width="80" height="80">
             <line x1="10" y1="80" x2="90" y2="80" stroke="var(--text-muted)" stroke-width="1.5" />
             <line x1="20" y1="10" x2="20" y2="90" stroke="var(--text-muted)" stroke-width="1.5" />
             <path d="M 20 70 Q 45 20, 80 30" fill="none" stroke="var(--primary)" stroke-width="2" />
             <line x1="30" y1="80" x2="30" y2="50" stroke="var(--border-color)" stroke-dasharray="2 2" stroke-width="1" />
             <line x1="50" y1="80" x2="50" y2="32" stroke="var(--border-color)" stroke-dasharray="2 2" stroke-width="1" />
             <line x1="70" y1="80" x2="70" y2="28" stroke="var(--border-color)" stroke-dasharray="2 2" stroke-width="1" />
             <line x1="30" y1="50" x2="50" y2="32" stroke="var(--success)" stroke-width="2" />
             <line x1="50" y1="32" x2="70" y2="28" stroke="var(--success)" stroke-width="2" />
             <circle cx="30" cy="50" r="3" fill="var(--warning)" />
             <circle cx="50" cy="32" r="3" fill="var(--warning)" />
             <circle cx="70" cy="28" r="3" fill="var(--warning)" />
          </svg>
        `,
        "c4444444-4444-4444-4444-444444444444": `
          <svg viewBox="0 0 100 100" width="80" height="80">
             <rect x="25" y="25" width="40" height="40" stroke="var(--text-muted)" fill="none" stroke-width="1.5" />
             <rect x="40" y="40" width="40" height="40" stroke="var(--primary)" fill="none" stroke-width="1.5" />
             <line x1="25" y1="25" x2="40" y2="40" stroke="var(--border-color)" stroke-width="1.5" />
             <line x1="65" y1="25" x2="80" y2="40" stroke="var(--border-color)" stroke-width="1.5" />
             <line x1="25" y1="65" x2="40" y2="80" stroke="var(--border-color)" stroke-width="1.5" />
             <line x1="65" y1="65" x2="80" y2="80" stroke="var(--border-color)" stroke-width="1.5" />
             <circle cx="25" cy="25" r="4" fill="var(--success)" />
             <circle cx="65" cy="25" r="4" fill="var(--success)" />
             <circle cx="25" cy="65" r="4" fill="var(--success)" />
             <circle cx="65" cy="65" r="4" fill="var(--success)" />
             <circle cx="40" cy="40" r="4" fill="var(--success)" />
             <circle cx="80" cy="40" r="4" fill="var(--success)" />
             <circle cx="40" cy="80" r="4" fill="var(--success)" />
             <circle cx="80" cy="80" r="4" fill="var(--success)" />
             <circle cx="52.5" cy="52.5" r="5" fill="var(--warning)" />
          </svg>
        `
      };

      const courseMetadata = {
        "c1111111-1111-1111-1111-111111111111": {
          shortDesc: "Organize e transforme informações por meio de vetores, matrizes e sistemas lineares.",
          difficulty: "Iniciante a Intermediário",
          modulesCount: 6,
          lessonsCount: 39,
          estimatedHours: 12
        },
        "c2222222-2222-2222-2222-222222222222": {
          shortDesc: "Estruture decisões complexas, compare alternativas e analise critérios conflitantes.",
          difficulty: "Intermediário",
          modulesCount: 7,
          lessonsCount: 49,
          estimatedHours: 15
        },
        "c3333333-3333-3333-3333-333333333333": {
          shortDesc: "Resolva problemas complexos por aproximações, algoritmos iterativos e métodos computacionais.",
          difficulty: "Intermediário",
          modulesCount: 8,
          lessonsCount: 55,
          estimatedHours: 18
        },
        "c4444444-4444-4444-4444-444444444444": {
          shortDesc: "Compreenda como estrutura, processamento e composição determinam o comportamento dos materiais.",
          difficulty: "Iniciante a Intermediário",
          modulesCount: 8,
          lessonsCount: 56,
          estimatedHours: 14
        }
      };

      let filteredCourses = courses.filter(c => c.id !== "c5555555-5555-5555-5555-555555555555");
      filteredCourses.forEach(course => {
        const meta = courseMetadata[course.id] || {
          shortDesc: course.description,
          difficulty: "Iniciante",
          modulesCount: 1,
          lessonsCount: 1,
          estimatedHours: 10
        };

        const progressPct = course.progress_percentage || 0;

        const card = document.createElement("div");
        card.className = "area-card";
        card.style.cursor = "pointer";
        card.innerHTML = `
          <div class="course-visual-container" style="background: var(--bg-primary); border-radius: var(--radius-md); padding: 12px; margin-bottom: 12px; display: flex; justify-content: center; align-items: center; height: 100px; border: 1px solid var(--border-color);">
             ${courseSvgs[course.id] || ""}
          </div>
          <div>
             <h3 class="area-title">${course.title}</h3>
             <p class="area-desc" style="margin-top: 6px; font-size: 12px; line-height: 1.4;">${meta.shortDesc}</p>
          </div>
          
          <div class="area-meta-row" style="margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px;">
             <span class="badge-status" style="font-size: 10px; padding: 2px 6px; background: rgba(0, 132, 255, 0.1); color: var(--primary); border: 1px solid rgba(0, 132, 255, 0.2);">${meta.difficulty}</span>
             <span style="font-size: 10px; color: var(--text-secondary);"><i data-lucide="clock" style="width: 10px; height:10px; display: inline-block; vertical-align: middle; margin-right: 2px;"></i>${meta.estimatedHours}h</span>
             <span style="font-size: 10px; color: var(--text-secondary);">${meta.modulesCount} Módulos</span>
          </div>

          <div class="course-card-progress" style="margin-top: 14px; width: 100%;">
             <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px;">
                <span style="color: var(--text-secondary);">Progresso</span>
                <strong style="color: var(--text-primary);">${progressPct}%</strong>
             </div>
             <div class="progress-bar-bg" style="width: 100%; height: 6px; background: var(--bg-primary); border-radius: 99px; overflow: hidden; border: 1px solid var(--border-color);">
                <div class="progress-bar-fill" style="width: ${progressPct}%; height: 100%; background: var(--success); transition: width 0.3s ease;"></div>
             </div>
          </div>
        `;

        card.addEventListener("click", () => {
          this.activeCourseId = course.id;
          this.navigateTo("track");
        });

        container.appendChild(card);
      });

      lucide.createIcons();
    } catch (e) {
      console.error("[AreaProduction] Falha ao carregar dados da área:", e);
    }
  }

  // ============================================================================
  // TELA 6: LABORATÓRIO (SISTEMA DE ABAS COM CONTEÚDE REAL)
  // ============================================================================
  initLaboratory() {
    // Configura os dados de conteúdo de cada aba
    const LAB_CONTENT = {
      experiments: {
        title: "Experimentos Interativos",
        desc: "Manipule variáveis reais e observe o comportamento físico e matemático dos sistemas de engenharia.",
        items: [
          { id: "exp_vectors", icon: "move", color: "var(--primary)", title: "Visualizador de Vetores 2D", desc: "Ajuste componentes X e Y de um vetor e observe magnitude e ângulo em tempo real.", course: "Álgebra Linear" },
          { id: "exp_amd_weights", icon: "sliders", color: "var(--warning)", title: "Distribuição de Pesos AMD", desc: "Ajuste os pesos de critérios e veja como as notas de dois fornecedores se alteram dinamicamente.", course: "AMD" },
          { id: "exp_error_precision", icon: "target", color: "var(--error)", title: "Erros de Arredondamento", desc: "Veja como a quantidade de casas decimais afeta o erro absoluto de uma aproximação numérica.", course: "Cálculo Numérico" },
          { id: "exp_stress_strain", icon: "activity", color: "var(--success)", title: "Curva Tensão-Deformação", desc: "Aplique tensão em aço ou cerâmica e observe a resposta elástica e plástica do material.", course: "Ciência dos Materiais" },
          { id: "exp_bisection", icon: "scissors", color: "var(--accent-cyan)", title: "Método da Bisseção Animado", desc: "Visualize o processo iterativo de halvamento do intervalo para encontrar raízes.", course: "Cálculo Numérico" },
          { id: "exp_linear_system", icon: "grid", color: "var(--primary)", title: "Sistemas Lineares (Gauss)", desc: "Monte uma matriz e acompanhe o processo de eliminação gaussiana passo a passo.", course: "Álgebra Linear" }
        ]
      },
      challenges: {
        title: "Desafios Rápidos",
        desc: "Resolva questões cronometradas sobre os 4 cursos. Cada desafio tem recompensa de XP e feedback imediato.",
        items: [
          { id: "chal_vectors", icon: "zap", color: "var(--warning)", title: "Desafio: Soma de Vetores", desc: "Calcule a resultante de 3 vetores de força aplicados a uma peça de solda em 60 segundos.", course: "Álgebra Linear", xp: 15 },
          { id: "chal_amd", icon: "zap", color: "var(--warning)", title: "Desafio: Classificação AHP", desc: "Aplique o método AHP a uma seleção de fornecedores com 3 critérios e 3 alternativas.", course: "AMD", xp: 20 },
          { id: "chal_numerical", icon: "zap", color: "var(--warning)", title: "Desafio: Erro Relativo", desc: "Calcule o erro absoluto e relativo de uma aproximação numérica com 4 casas decimais.", course: "Cálculo Numérico", xp: 15 },
          { id: "chal_materials", icon: "zap", color: "var(--warning)", title: "Desafio: Identifique o Material", desc: "Dado a curva tensão-deformação, determine se o material é dútil, frágil ou viscoelástico.", course: "Ciência dos Materiais", xp: 15 },
          { id: "chal_matrix", icon: "zap", color: "var(--warning)", title: "Desafio: Multiplicação Matricial", desc: "Multiplique duas matrizes 2x2 e use o resultado para calcular a allocação de recursos industriais.", course: "Álgebra Linear", xp: 20 }
        ]
      },
      cases: {
        title: "Casos Reais de Engenharia",
        desc: "Estude decisões reais que engenheiros tiveram que tomar em sistemas produtivos. Analise, questione, decida.",
        items: [
          { id: "case_toyota", icon: "briefcase", color: "var(--success)", title: "Toyota e o Sistema Kanban", desc: "Como a Toyota usou álgebra de filas e balanceamento de linha para criar o sistema mais eficiente do século XX.", course: "Álgebra Linear" },
          { id: "case_bridge", icon: "briefcase", color: "var(--success)", title: "Ponte de Aço e Limiar de Escoamento", desc: "Análise de um caso real de falha estrutural por ultrapasse do limite de escoamento em uma ponte metálica.", course: "Ciência dos Materiais" },
          { id: "case_supplier", icon: "briefcase", color: "var(--success)", title: "Seleção Multicritério de Fornecedor", desc: "Uma empresa aeroespacial precisava escolher entre 5 fornecedores. Como o método TOPSIS foi decisivo.", course: "AMD" },
          { id: "case_weather", icon: "briefcase", color: "var(--success)", title: "Previsão Numérica do Tempo", desc: "Entenda como modelos de equações diferenciais numéricas são usados em modelos de previsão.", course: "Cálculo Numérico" }
        ]
      },
      curiosities: {
        title: "Curiosidades de Engenharia",
        desc: "Fatos surpreendentes, histórias e conexões inesperadas entre matemática e o mundo físico.",
        items: [
          { id: "cur_fourier", icon: "lightbulb", color: "var(--warning)", title: "Por que o seu wi-fi usa Álgebra Linear?", desc: "Transformações lineares estão na base dos algoritmos de compressão de imagem JPEG e codificação de sinal sem fio.", course: "Álgebra Linear" },
          { id: "cur_titanic", icon: "lightbulb", color: "var(--warning)", title: "Ciência dos Materiais e o Titanic", desc: "O aço do Titanic era excessivamente frágil em águas frias. Como a microestrutura falhou na história?", course: "Ciência dos Materiais" },
          { id: "cur_pi", icon: "lightbulb", color: "var(--warning)", title: "Por que nunca calculamos Pi exato?", desc: "Qualquer cálculo numérico de pi termina em truncamento. Descubra os limites computacionais que tornam isso inevitável.", course: "Cálculo Numérico" },
          { id: "cur_amazon", icon: "lightbulb", color: "var(--warning)", title: "Amazon e o AMD na Logística", desc: "A Amazon usa métodos multicritério para decidir qual centro de distribuição atende cada pedido.", course: "AMD" }
        ]
      },
      tests: {
        title: "Testar Conhecimentos",
        desc: "Avalie o quanto você absorveu com mini-quizzes por disciplina. O sistema registra suas lacunas.",
        items: [
          { id: "test_algebra", icon: "help-circle", color: "var(--primary)", title: "Mini-Quiz: Álgebra Linear", desc: "8 questões sobre vetores, matrizes, transformações e sistemas lineares. Tempo estimado: 10 min.", course: "Álgebra Linear", questions: 8 },
          { id: "test_amd", icon: "help-circle", color: "var(--primary)", title: "Mini-Quiz: AMD e MCDM", desc: "8 questões sobre AHP, TOPSIS, ELECTRE, pesos e normalização. Tempo estimado: 12 min.", course: "AMD", questions: 8 },
          { id: "test_numerical", icon: "help-circle", color: "var(--primary)", title: "Mini-Quiz: Cálculo Numérico", desc: "8 questões sobre erros, bisseção, interpolação e regressão. Tempo estimado: 12 min.", course: "Cálculo Numérico", questions: 8 },
          { id: "test_materials", icon: "help-circle", color: "var(--primary)", title: "Mini-Quiz: Ciência dos Materiais", desc: "8 questões sobre ligações, cristais, tensão-deformação e tratamentos térmicos. Tempo estimado: 10 min.", course: "Ciência dos Materiais", questions: 8 }
        ]
      },
      reviews: {
        title: "Revisão Inteligente",
        desc: "Exercícios selecionados com base nos erros do seu histórico. O sistema prioriza suas lacunas de aprendizagem.",
        items: [] // filled dynamically from progress
      }
    };

    // Active tab tracking
    if (!this._labActiveTab) this._labActiveTab = "experiments";

    // Setup tab click events
    const tabBtns = document.querySelectorAll(".lab-tab-btn");
    tabBtns.forEach(btn => {
      const newBtn = btn.cloneNode(true);
      btn.parentNode.replaceChild(newBtn, btn);
      newBtn.addEventListener("click", () => {
        this._labActiveTab = newBtn.getAttribute("data-tab");
        this.renderLabTab(LAB_CONTENT, this._labActiveTab);
        // Update active styles
        document.querySelectorAll(".lab-tab-btn").forEach(b => {
          const isActive = b.getAttribute("data-tab") === this._labActiveTab;
          b.style.background = isActive ? "var(--bg-surface-elevated)" : "var(--bg-secondary)";
          b.style.border = isActive ? "1px solid var(--primary)" : "1px solid var(--border-color)";
          b.style.color = isActive ? "var(--text-primary)" : "var(--text-secondary)";
          b.style.fontWeight = isActive ? "700" : "600";
        });
      });
    });

    // Also setup back button for widget
    const btnBackToList = document.getElementById("btn-back-to-list");
    if (btnBackToList) {
      const newBtn = btnBackToList.cloneNode(true);
      btnBackToList.parentNode.replaceChild(newBtn, btnBackToList);
      newBtn.addEventListener("click", () => {
        document.getElementById("lab-widget-card").style.display = "none";
        document.getElementById("lab-items-grid").style.display = "grid";
        document.getElementById("lab-category-header").style.display = "block";
      });
    }

    // Render initial tab
    this.renderLabTab(LAB_CONTENT, this._labActiveTab);
  }

  // Renders the contents of a lab tab
  async renderLabTab(LAB_CONTENT, tabKey) {
    const data = LAB_CONTENT[tabKey];
    if (!data) return;

    // If reviews tab, load from progress
    if (tabKey === "reviews") {
      const progress = await window.Tracker.getStudentProgress();
      if (progress.review_items && progress.review_items.length > 0) {
        data.items = progress.review_items.map(item => ({
          id: "review_" + item.lesson_id,
          icon: "rotate-ccw",
          color: "var(--error)",
          title: "Revisar: " + item.lesson_title,
          desc: "Exercício com erro registrado na aula anterior. Pratique para eliminar esta lacuna do seu perfil.",
          course: "Revisão",
          lessonId: item.lesson_id
        }));
      } else {
        data.items = [{ id: "review_empty", icon: "check-circle", color: "var(--success)", title: "Parabéns! Nenhuma lacuna pendente.", desc: "Você não tem erros na fila de revisão. Continue praticando para manter esse nível!", course: "" }];
      }
    }

    // Update category header
    { const _el = document.getElementById('lab-category-title'); if (_el) _el.textContent = data.title; }
    { const _el = document.getElementById('lab-category-desc'); if (_el) _el.textContent = data.desc; }

    // Render items grid
    const grid = document.getElementById("lab-items-grid");
    const widgetCard = document.getElementById("lab-widget-card");
    grid.innerHTML = "";
    grid.style.display = "grid";
    widgetCard.style.display = "none";
    document.getElementById("lab-category-header").style.display = "block";

    data.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "area-card";
      card.style.cursor = "pointer";
      card.style.transition = "transform 0.2s, box-shadow 0.2s";
      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
          <div style="width: 40px; height: 40px; border-radius: var(--radius-md); background: ${item.color}22; border: 1px solid ${item.color}44; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
            <i data-lucide="${item.icon}" style="width: 20px; height: 20px; color: ${item.color};"></i>
          </div>
          <div>
            <h3 style="font-family: var(--font-title); font-size: 15px; font-weight: 700; line-height: 1.3;">${item.title}</h3>
            ${item.course ? `<span style="font-size: 10px; font-weight: 600; color: var(--text-secondary); letter-spacing: 0.05em;">${item.course.toUpperCase()}</span>` : ''}
          </div>
        </div>
        <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.5; flex: 1;">${item.desc}</p>
        <div style="margin-top: 14px; display: flex; justify-content: space-between; align-items: center;">
          ${item.xp ? `<span style="font-size: 11px; font-weight: 700; color: var(--warning);">+${item.xp} XP</span>` : (item.questions ? `<span style="font-size: 11px; color: var(--text-secondary);">${item.questions} questões</span>` : '<span></span>')}
          <span style="font-size: 12px; font-weight: 700; color: var(--primary); display: flex; align-items: center; gap: 4px;">
            Abrir <i data-lucide="arrow-right" style="width: 12px; height: 12px;"></i>
          </span>
        </div>
      `;

      card.addEventListener("mouseenter", () => { card.style.transform = "translateY(-2px)"; card.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)"; });
      card.addEventListener("mouseleave", () => { card.style.transform = "none"; card.style.boxShadow = "none"; });

      card.addEventListener("click", () => {
        if (item.lessonId) {
          this.startLesson(item.lessonId);
        } else if (["exp_vectors", "exp_amd_weights", "exp_error_precision", "exp_stress_strain"].includes(item.id)) {
          this.openLabExperiment(item.id);
        } else if (item.id.startsWith("test_")) {
          this.openLabTest(item.id);
        } else if (item.id.startsWith("chal_")) {
          this.openLabChallenge(item.id);
        } else {
          this.openLabInfoCard(item);
        }
      });

      grid.appendChild(card);
    });

    lucide.createIcons();
  }

  // Opens a full experiment inside the widget card area
  openLabExperiment(expId) {
    const grid = document.getElementById("lab-items-grid");
    const widgetCard = document.getElementById("lab-widget-card");
    const viewport = document.getElementById("lab-widget-viewport");
    const titleEl = document.getElementById("lab-widget-title");
    const catHeader = document.getElementById("lab-category-header");

    if (!grid || !widgetCard || !viewport || !titleEl) {
      console.warn("[Lab] Elementos do laboratório ausentes.");
      return;
    }

    const titles = {
      "exp_vectors": "Visualizador de Vetores 2D",
      "exp_amd_weights": "Distribuição de Pesos AMD",
      "exp_error_precision": "Erros de Arredondamento Numérico",
      "exp_stress_strain": "Curva Tensão-Deformação"
    };
    titleEl.textContent = titles[expId] || "Experimento";

    grid.style.display = "none";
    if (catHeader) catHeader.style.display = "none";
    widgetCard.style.display = "block";

    // Reuse the lesson simulation logic for these experiments
    this.initCustomLessonSimulation({
      "exp_vectors": "l_alg_1_1",
      "exp_amd_weights": "l_amd_1_1",
      "exp_error_precision": "l_num_1_1",
      "exp_stress_strain": "l_mat_1_1"
    }[expId], viewport);

    lucide.createIcons();
  }

  // Opens an info/reading card for cases and curiosities
  openLabInfoCard(item) {
    const grid = document.getElementById("lab-items-grid");
    const widgetCard = document.getElementById("lab-widget-card");
    const viewport = document.getElementById("lab-widget-viewport");
    const titleEl = document.getElementById("lab-widget-title");
    const catHeader = document.getElementById("lab-category-header");

    if (!grid || !widgetCard || !viewport || !titleEl) return;

    titleEl.textContent = item.title;
    grid.style.display = "none";
    if (catHeader) catHeader.style.display = "none";
    widgetCard.style.display = "block";

    const INFO_CONTENT = {
      "case_toyota": {
        body: `<p style="margin-bottom:14px;">A <strong>Toyota</strong> revolucionou a manufatura com o <strong>Sistema Toyota de Produção (TPS)</strong> nas décadas de 1950–70. Um dos pilares matemáticos do sistema é o <strong>balanceamento de linha</strong>, que usa condições de igualdade algébrica para garantir que nenhuma estação fique sobrecarregada (gargalo).</p>
        <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; margin-bottom: 14px; font-family: var(--font-mono); font-size: 12px;">
          Taxa_Gargalo = min(1/T₁, 1/T₂, ..., 1/Tₙ)<br>
          Capacidade = Taxa_Gargalo × 60 min/h
        </div>
        <p>Se a estação de Montagem tem tempo de ciclo T=8 min e a de Pintura T=5 min, a taxa limitante é 1/8 peças/min = <strong>7,5 peças/hora</strong>.</p>
        <div style="margin-top:16px; padding: 12px; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); border-radius: var(--radius-md); font-size: 12px;"><strong>Lição:</strong> O sistema é tão rápido quanto sua estação mais lenta. Otimize o gargalo primeiro.</div>`
      },
      "case_bridge": {
        body: `<p style="margin-bottom:14px;">Em 1967, a <strong>Ponte do Ponto Pleasão</strong> nos EUA entrou em colapso due a uma falha metálica. O aço utilizado tinha propriedades de tenacidade frácil (\'brittle fracture\') abaixo de 4°C.</p>
        <p>O engenheiro responsável subestimou a <strong>transição dútil-frágil (DBTT)</strong>, um fenômeno crítico onde metais perdem ductilidade em baixas temperaturas.</p>
        <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; margin: 14px 0; font-family: var(--font-mono); font-size: 12px;">
          σ_escoamento &lt; σ_aplicada → Falha plástica (seguro)<br>
          σ_fratura &lt; σ_aplicada → Fratura frágil (catástrofe)
        </div>
        <div style="margin-top:14px; padding: 12px; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); border-radius: var(--radius-md); font-size: 12px;"><strong>Lição:</strong> Sempre considere o regime térmico de operação ao selecionar materiais estruturais.</div>`
      },
      "case_supplier": {
        body: `<p style="margin-bottom:14px;">Uma empresa aeroespacial precisava selecionar entre <strong>5 fornecedores de compósitos de fibra de carbono</strong> com base em 4 critérios: custo, tempo de entrega, certificação e confiabilidade histórica.</p>
        <p>A equipe de engenharia aplicou o <strong>método TOPSIS</strong>, normalizando os dados por vetor euclidiano, atribuindo pesos estratégicos e calculando a distância de cada fornecedor à solução ideal positiva e negativa.</p>
        <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; margin: 14px 0; font-family: var(--font-mono); font-size: 12px;">
          C_i* = d_i⁻ / (d_i⁺ + d_i⁻)<br>
          Quanto mais próximo de 1, melhor o fornecedor
        </div>
        <div style="margin-top:14px; padding: 12px; background: rgba(0,132,255,0.08); border: 1px solid rgba(0,132,255,0.2); border-radius: var(--radius-md); font-size: 12px;"><strong>Lição:</strong> Métodos multicritério tornam a decisão auditável, rastreável e defensável perante stakeholders.</div>`
      },
      "case_weather": {
        body: `<p style="margin-bottom:14px;">Os modelos modernos de previsão do tempo resolvem o <strong>Sistema de Equações de Navier-Stokes</strong> (equações diferenciais parciais não lineares) para simular a dinâmica atmosférica.</p>
        <p>Como não existe solução analítica geral, supercomputadores como o <strong>ECMWF</strong> usam <strong>métodos de Runge-Kutta de alta ordem</strong> com passos de tempo de 1 minuto para integrar numericamente essas equações.</p>
        <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; margin: 14px 0; font-family: var(--font-mono); font-size: 12px;">
          dy/dt = f(t, y) → y_{n+1} = y_n + h × k_composto<br>
          Passos menores = maior precisão, maior custo
        </div>
        <div style="margin-top:14px; padding: 12px; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.2); border-radius: var(--radius-md); font-size: 12px;"><strong>Lição:</strong> Sem métodos numéricos, a ciência moderna não teria modelos climáticos, nem navegação espacial.</div>`
      },
      "cur_fourier": {
        body: `<p style="margin-bottom:14px;">O formato <strong>JPEG</strong> de imagens comprime fotos usando a <strong>Transformada Discreta do Cosseno (DCT)</strong>, que decompõe a imagem em vetores ortogonais de frequência.</p>
        <p>Redes Wi-Fi usam <strong>OFDM (Orthogonal Frequency Division Multiplexing)</strong>, baseado em subespaços ortogonais de sinais — exatamente o conceito de <strong>independência linear</strong> e <strong>base ortonormal</strong> da Álgebra Linear.</p>
        <div style="margin-top:14px; padding: 12px; background: rgba(0,132,255,0.08); border: 1px solid rgba(0,132,255,0.2); border-radius: var(--radius-md); font-size: 12px;"><strong>Curiosidade:</strong> Autovalores e autovetores são a base do algoritmo PageRank do Google, que classifica bilhões de páginas web.</div>`
      },
      "cur_titanic": {
        body: `<p style="margin-bottom:14px;">A liga de aço usada no casco do Titanic (1912) tinha alto teor de <strong>enxofre e fósforo</strong>, tornando-a altamente susceptível à <strong>fratura frágil em baixas temperaturas</strong>.</p>
        <p>O ocão Ártico estava a -2°C quando o navio afundou. Testes modernos de impacto <strong>Charpy</strong> no aço recuperado do Titanic mostram energia de impacto de apenas <strong>4 Joules</strong>, contra 40+ J de aços modernos.</p>
        <div style="margin-top:14px; padding: 12px; background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); border-radius: var(--radius-md); font-size: 12px;"><strong>Lição:</strong> A Ciência dos Materiais salva vidas. A microestrutura importa mais do que as especificações nominais.</div>`
      },
      "cur_pi": {
        body: `<p style="margin-bottom:14px;">O valor de &pi; = 3.14159265358979... é um número irracional (infinitas casas decimais, sem periódo). Nenhum computador pode armazená-lo com precisão infinita — toda representação é uma <strong>aproximação truncada</strong>.</p>
        <p>O IEEE 754 (padrão de ponto flutuante) reserva 64 bits para números reais, o que limita a precisão a aproximadamente <strong>15–17 dígitos significativos</strong>. Todo cálculo que envolve divisões e funções trigonométricas acumula erros.</p>
        <div style="margin-top:14px; padding: 12px; background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.2); border-radius: var(--radius-md); font-size: 12px;"><strong>Curiosidade:</strong> A NASA usa apenas 15 casas decimais de pi para calcular trajetórias interplanetárias com erro menor que a largura de um átomo.</div>`
      },
      "cur_amazon": {
        body: `<p style="margin-bottom:14px;">A <strong>Amazon</strong> opera mais de 200 centros de distribuição no mundo. Para cada pedido, o sistema decide em milissegundos qual centro deve atender com base em critérios como: distância, estoque disponível, custo de frete e prazo de entrega.</p>
        <p>Esse problema é um <strong>problema de alocação multicritério dinâmico</strong> — essencialmente AMD aplicado em escala industrial em tempo real.</p>
        <div style="margin-top:14px; padding: 12px; background: rgba(0,132,255,0.08); border: 1px solid rgba(0,132,255,0.2); border-radius: var(--radius-md); font-size: 12px;"><strong>Lição:</strong> AMD não é apenas para decisões humanas. Algoritmos baseados em métodos multicritério rodam em produção em larga escala 24/7.</div>`
      }
    };

    const content = INFO_CONTENT[item.id];
    if (content) {
      viewport.innerHTML = `
        <div style="font-size: 14px; line-height: 1.7; color: var(--text-primary);">
          ${content.body}
        </div>
      `;
    } else {
      viewport.innerHTML = `<p style="color: var(--text-secondary);">Conteúdo em desenvolvimento.</p>`;
    }

    lucide.createIcons();
  }

  // Opens a challenge or test card
  openLabChallenge(challengeId) {
    const grid = document.getElementById("lab-items-grid");
    const widgetCard = document.getElementById("lab-widget-card");
    const viewport = document.getElementById("lab-widget-viewport");
    const titleEl = document.getElementById("lab-widget-title");
    
    if (!grid || !widgetCard || !viewport || !titleEl) return;

    const CHALLENGES = {
      "chal_vectors": {
        title: "Desafio: Soma de Vetores",
        statement: "Um robô de solda aplica forças em 3 direções: F₁ = [4, 0], F₂ = [-2, 3], F₃ = [1, -1]. Qual é a componente X da força resultante total?",
        answer: 3, unit: "N (componente X)",
        explanation: "Somamos as componentes X: 4 + (-2) + 1 = 3. Logo, F_X = 3 N."
      },
      "chal_numerical": {
        title: "Desafio: Erro Relativo",
        statement: "O valor real de uma tensão é 350 MPa. Uma medição aproximada registra 343 MPa. Qual o erro relativo percentual (arredonde para 2 casas)?",
        answer: 2.0, unit: "%",
        explanation: "Erro Relativo = |350 - 343| / 350 × 100 = 7/350 × 100 = 2.00%."
      },
      "chal_matrix": {
        title: "Desafio: Produto Matricial",
        statement: "Dadas as matrizes A = [[2,1],[0,3]] e B = [[4],[2]], qual é o elemento A·B na linha 1, coluna 1?",
        answer: 10, unit: "(elemento [1,1]",
        explanation: "Linha 1 de A × Coluna 1 de B: 2×4 + 1×2 = 8 + 2 = 10."
      }
    };

    const challenge = CHALLENGES[challengeId];
    if (!challenge) {
      this.openLabInfoCard({ id: "generic", title: "Desafio", desc: "" });
      return;
    }

    titleEl.textContent = challenge.title;
    grid.style.display = "none";
    const catHeader = document.getElementById("lab-category-header");
    if (catHeader) catHeader.style.display = "none";
    widgetCard.style.display = "block";

    viewport.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 16px; font-size: 14px; line-height: 1.6;">
          <strong>Enunciado:</strong><br>${challenge.statement}
        </div>
        <div style="display: flex; gap: 10px; align-items: stretch;">
          <input type="number" step="any" id="lab-challenge-input" placeholder="Digite o valor calculado..." style="flex: 1; padding: 10px 14px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary); font-size: 14px; font-family: var(--font-mono);">
          <span style="display: flex; align-items: center; font-size: 12px; color: var(--text-secondary); white-space: nowrap; padding: 0 8px;">${challenge.unit}</span>
          <button id="lab-challenge-submit" class="btn-primary" style="padding: 10px 20px;"><span>Verificar</span></button>
        </div>
        <div id="lab-challenge-feedback" style="display: none;"></div>
      </div>
    `;

    document.getElementById("lab-challenge-submit").addEventListener("click", () => {
      const val = parseFloat(document.getElementById("lab-challenge-input").value);
      const feedback = document.getElementById("lab-challenge-feedback");
      const isCorrect = Math.abs(val - challenge.answer) < 0.05;
      
      if (isCorrect) {
        window.Tracker.completeLabExercise();
        this.loadDashboardData();
      }

      feedback.style.display = "block";
      feedback.innerHTML = `
        <div style="padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid ${isCorrect ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}; background: ${isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(239,68,68,0.08)'}; font-size: 13px; line-height: 1.5;">
          <strong style="color: ${isCorrect ? 'var(--success)' : 'var(--error)'}">${isCorrect ? '✓ Correto! Ofensiva do dia ativada!' : '✗ Incorreto. Tente novamente.'}</strong><br>
          ${challenge.explanation}
        </div>
      `;
    });

    lucide.createIcons();
  }

  openLabTest(testId) {
    const MINI_QUIZZES = {
      test_algebra: [
        { q: "Um vetor v = [3, 4] tem magnitude:", a: "5", opts: ["5", "7", "3.5", "12"] },
        { q: "O produto de um vetor [2, 5] pelo escalar k=3 resulta em:", a: "[6, 15]", opts: ["[6, 15]", "[5, 8]", "[2, 15]", "[6, 5]"] },
        { q: "Uma matriz identidade de ordem 3 tem diagonal principal com:", a: "Todos os elementos iguais a 1", opts: ["Todos os elementos iguais a 1", "Zeros na diagonal", "Valores aleatórios", "Apenas um 1 no centro"] },
        { q: "O determinante de uma matriz 2×2 [[a,b],[c,d]] é:", a: "ad - bc", opts: ["ad - bc", "ab - cd", "ac + bd", "a + d"] },
        { q: "Dependência linear de vetores significa que:", a: "Um vetor pode ser escrito como combinação linear dos demais", opts: ["Um vetor pode ser escrito como combinação linear dos demais", "Os vetores são perpendiculares", "A matriz tem determinante 1", "Os vetores têm a mesma direção"] }
      ],
      test_amd: [
        { q: "No AMD, uma 'Alternativa' é:", a: "Uma opção candidata de escolha", opts: ["Uma opção candidata de escolha", "Um critério de avaliação", "Um peso numérico", "Uma restrição do problema"] },
        { q: "O método AHP usa comparações:", a: "Par a par entre alternativas e critérios", opts: ["Par a par entre alternativas e critérios", "Por votação de especialistas", "Por normalização linear mínimo-máximo", "Por percentis estatísticos"] },
        { q: "O TOPSIS classifica as alternativas por:", a: "Proximidade à solução ideal positiva", opts: ["Proximidade à solução ideal positiva", "Menor custo médio", "Maior número de critérios atendidos", "Valor máximo em um critério"] }
      ],
      test_numerical: [
        { q: "O erro absoluto é definido como:", a: "|Valor real - Valor aproximado|", opts: ["|Valor real - Valor aproximado|", "Valor real / Valor aproximado", "(Valor real - Valor aproximado) / Valor real", "Valor aproximado²"] },
        { q: "O método da bisseção divide o intervalo:", a: "Pela metade a cada iteração", opts: ["Pela metade a cada iteração", "Por uma derivada da função", "De forma adaptativa pelo erro", "Por um valor aleatório"] },
        { q: "A interpolação de Lagrange serve para:", a: "Estimar valores entre pontos conhecidos", opts: ["Estimar valores entre pontos conhecidos", "Derivar funções numéricas", "Integrar funções periódicas", "Resolver equações diferenciais"] }
      ],
      test_materials: [
        { q: "A ligação metálica é caracterizada por:", a: "Elétrons deslocalizados compartilhados", opts: ["Elétrons deslocalizados compartilhados", "Transferência de elétrons entre átomos", "Compartilhamento de pares de elétrons", "Forças de van der Waals"] },
        { q: "O limite de escoamento marca:", a: "A transição de deformação elástica para plástica", opts: ["A transição de deformação elástica para plástica", "A ruptura final do material", "O início da elongação linear", "A máxima tensão possível"] },
        { q: "Materiais frágeis se rompem:", a: "Sem deformação plástica significativa", opts: ["Sem deformação plástica significativa", "Após grande estricção", "Apenas a altas temperaturas", "Sempre além do limite elástico"] }
      ]
    };

    const questions = MINI_QUIZZES[testId];
    const titleMap = { test_algebra: "Mini-Quiz: Álgebra Linear", test_amd: "Mini-Quiz: AMD", test_numerical: "Mini-Quiz: Cálculo Numérico", test_materials: "Mini-Quiz: Ciência dos Materiais" };

    const grid = document.getElementById("lab-items-grid");
    const widgetCard = document.getElementById("lab-widget-card");
    const viewport = document.getElementById("lab-widget-viewport");
    const titleEl = document.getElementById("lab-widget-title");
    const catHeader = document.getElementById("lab-category-header");

    if (!grid || !widgetCard || !viewport || !titleEl) return;

    titleEl.textContent = titleMap[testId] || "Mini-Quiz";
    grid.style.display = "none";
    if (catHeader) catHeader.style.display = "none";
    widgetCard.style.display = "block";

    let currentQ = 0;
    let score = 0;
    let answered = false;

    const renderQuestion = () => {
      if (currentQ >= questions.length) {
        window.Tracker.completeLabExercise();
        this.loadDashboardData();
        viewport.innerHTML = `
          <div style="text-align: center; padding: 32px;">
            <div style="font-size: 48px; margin-bottom: 16px;">🎯</div>
            <h3 style="font-family: var(--font-title); font-size: 24px; font-weight: 800; margin-bottom: 8px;">Quiz Concluído!</h3>
            <p style="color: var(--text-secondary); margin-bottom: 8px;">Ofensiva do dia ativada!</p>
            <p style="color: var(--text-secondary); margin-bottom: 20px;">Acertos: <strong style="color: var(--success);">${score}/${questions.length}</strong></p>
            <button class="btn-primary" onclick="document.getElementById('btn-back-to-list').click()"><span>Voltar</span></button>
          </div>`;
        return;
      }

      const q = questions[currentQ];
      answered = false;

      viewport.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 14px;">
          <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); letter-spacing: 0.08em;">QUESTÃO ${currentQ + 1} DE ${questions.length}</div>
          <div style="font-size: 15px; font-weight: 600; line-height: 1.5; padding: 16px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md);">${q.q}</div>
          <div id="quiz-options" style="display: flex; flex-direction: column; gap: 10px;">
            ${q.opts.map((opt, i) => `<button class="option-card" data-opt="${opt}" style="text-align: left; padding: 12px 16px; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: var(--radius-md); cursor: pointer; color: var(--text-primary); font-size: 13px; transition: all 0.2s;">
              <span class="option-bullet" style="display: inline-flex; width: 22px; height: 22px; border-radius: 50%; background: var(--bg-secondary); align-items: center; justify-content: center; font-size: 11px; font-weight: 700; margin-right: 10px;">${String.fromCharCode(65+i)}</span>
              ${opt}
            </button>`).join('')}
          </div>
        </div>`;

      document.querySelectorAll("#quiz-options .option-card").forEach(btn => {
        btn.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          const selected = btn.getAttribute("data-opt");
          const isCorrect = selected === q.a;
          if (isCorrect) {
            score++;
            btn.style.background = "rgba(16,185,129,0.12)";
            btn.style.border = "1.5px solid var(--success)";
          } else {
            btn.style.background = "rgba(239,68,68,0.12)";
            btn.style.border = "1.5px solid var(--error)";
            // Highlight correct
            document.querySelectorAll("#quiz-options .option-card").forEach(b => {
              if (b.getAttribute("data-opt") === q.a) { b.style.background = "rgba(16,185,129,0.12)"; b.style.border = "1.5px solid var(--success)"; }
            });
          }
          setTimeout(() => { currentQ++; renderQuestion(); }, 1200);
        });
      });
    };

    renderQuestion();
    lucide.createIcons();
  }

  // ============================================================================
  // TELA 5: TRILHAS (TIMELINE VERTICAL CONECTADA)
  // ============================================================================
  async loadTrackMapData() {
    try {
      const data = await window.Tracker.getTrackDetails(this.activeCourseId);
      
      // Atualizar títulos do Cabeçalho da Trilha
      { const _el = document.getElementById('track-title-text'); if (_el) _el.textContent = data.track.title; }
      { const _el = document.getElementById('track-desc-text'); if (_el) _el.textContent = data.track.description; }

      // Calcular o progresso do curso
      let totalLessons = 0;
      let completedLessonsCount = 0;
      data.modules.forEach(m => {
        m.lessons.forEach(l => {
          totalLessons++;
          if (l.status === "completed") completedLessonsCount++;
        });
      });
      const progressPct = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
      { const _el = document.getElementById('track-progress-pct-text'); if (_el) _el.textContent = `${progressPct}%`; }
      document.getElementById("track-progress-pct-fill").style.width = `${progressPct}%`;

      // Atualizar metadados da barra lateral
      const courseMetadata = {
        "c1111111-1111-1111-1111-111111111111": {
          level: "Iniciante",
          duration: "12 horas",
          prereqs: "Matemática Básica",
          apps: "Modelagem de fluxos industriais, alocação de recursos físicos, computação gráfica e análise de dados de sensores.",
          skills: ["s_vector_rep", "s_vector_ops", "s_matrix_ops"]
        },
        "c2222222-2222-2222-2222-222222222222": {
          level: "Intermediário",
          duration: "15 horas",
          prereqs: "Álgebra Linear Básica",
          apps: "Seleção de fornecedores estruturada, localização de plantas industriais, priorização de projetos e análise de trade-offs de custo-risco.",
          skills: ["s_dec_criteria", "s_weighted_sum", "s_matrix_dec"]
        },
        "c3333333-3333-3333-3333-333333333333": {
          level: "Intermediário",
          duration: "18 horas",
          prereqs: "Cálculo Diferencial e Integral",
          apps: "Modelagem e aproximação computacional, controle automático de temperatura, simulação de trajetórias e ajuste estatístico de sensores.",
          skills: ["s_num_error", "s_bisection", "s_convergence"]
        },
        "c4444444-4444-4444-4444-444444444444": {
          level: "Iniciante",
          duration: "14 horas",
          prereqs: "Química Geral",
          apps: "Análise de falhas mecânicas por fadiga, seleção de ligas metálicas estruturais, projeto de tratamentos térmicos do aço e previsão de escoamento.",
          skills: ["s_mat_bonds", "s_tensile_test", "s_class_materials"]
        }
      };

      const meta = courseMetadata[this.activeCourseId] || {
        level: "Iniciante",
        duration: "10 horas",
        prereqs: "Nenhum",
        apps: "Aplicações de engenharia em processos de produção e gestão de qualidade.",
        skills: []
      };

      { const _el = document.getElementById('track-meta-level'); if (_el) _el.textContent = meta.level; }
      { const _el = document.getElementById('track-meta-duration'); if (_el) _el.textContent = meta.duration; }
      { const _el = document.getElementById('track-meta-prereqs'); if (_el) _el.textContent = meta.prereqs; }
      { const _el = document.getElementById('track-meta-apps'); if (_el) _el.textContent = meta.apps; }

      // Habilidades
      const skillsContainer = document.getElementById("track-meta-skills");
      skillsContainer.innerHTML = "";
      const skillNames = {
        "s_vector_rep": "Representação Vetorial",
        "s_vector_ops": "Operações Vetoriais",
        "s_matrix_ops": "Operações Matriciais",
        "s_dec_criteria": "Alternativas e Critérios",
        "s_weighted_sum": "Soma Ponderada",
        "s_matrix_dec": "Matriz de Decisão",
        "s_num_error": "Erros Numéricos",
        "s_bisection": "Método da Bisseção",
        "s_convergence": "Convergência Iterativa",
        "s_mat_bonds": "Ligações Atômicas",
        "s_tensile_test": "Ensaios de Tração",
        "s_class_materials": "Seleção de Materiais"
      };
      meta.skills.forEach(skId => {
        const badge = document.createElement("span");
        badge.className = "badge-status";
        badge.style.fontSize = "10px";
        badge.style.padding = "2px 6px";
        badge.style.background = "rgba(0, 132, 255, 0.1)";
        badge.style.color = "var(--primary)";
        badge.style.border = "1px solid rgba(0, 132, 255, 0.2)";
        badge.style.borderRadius = "var(--radius-sm)";
        badge.textContent = skillNames[skId] || skId;
        skillsContainer.appendChild(badge);
      });

      // Botoes do Professor e Lab
      document.getElementById("btn-track-tutor").onclick = () => {
        this.navigateTo("tutor");
      };
      document.getElementById("btn-track-lab").onclick = () => {
        this.navigateTo("lab");
      };

      // Encontrar lição recomendada
      let recommendedLesson = null;
      data.modules.forEach(mod => {
        const rec = mod.lessons.find(l => l.is_recommended);
        if (rec) recommendedLesson = rec;
      });

      const recomBarText = document.getElementById("track-recommended-text");
      if (recomBarText) {
        if (recommendedLesson) {
          recomBarText.innerHTML = `Próxima lição recomendada: <strong>${recommendedLesson.title}</strong> (${recommendedLesson.estimated_minutes} min). <span style="text-decoration: underline; cursor: pointer; color: var(--primary); font-weight: 700;" id="btn-start-recom">Iniciar agora</span>`;
          document.getElementById("btn-start-recom").onclick = () => this.startLesson(recommendedLesson.id);
        } else {
          recomBarText.innerHTML = `Parabéns! Você concluiu todas as lições deste curso. Pratique no <strong>Laboratório Relacionado</strong>!`;
        }
      }

      const container = document.getElementById("track-timeline-container");
      container.innerHTML = "";

      data.modules.forEach((m, mIndex) => {
        const modCard = document.createElement("div");
        modCard.className = `trilhas-module-card module-status-${m.status}`;
        modCard.style.background = "var(--bg-secondary)";
        modCard.style.border = "1px solid var(--border-color)";
        modCard.style.borderRadius = "var(--radius-lg)";
        modCard.style.padding = "20px";
        
        let statusText = "Não Iniciado";
        let statusClass = "badge-soon";
        if (m.status === "concluído") {
          statusText = "Concluído";
          statusClass = "badge-completed";
        } else if (m.status === "em_andamento") {
          statusText = "Em andamento";
          statusClass = "badge-available";
        } else if (m.status === "disponível") {
          statusText = "Recomendado";
          statusClass = "badge-available";
        }

        modCard.innerHTML = `
          <div class="trilhas-module-title-row" style="display: flex; justify-content: space-between; align-items: start;">
            <div style="display: flex; gap: 12px; align-items: start;">
              <div class="trilhas-module-number-badge" style="background: ${m.status === 'concluído' ? 'var(--success)' : 'var(--bg-surface-raised)'}; color: ${m.status === 'concluído' ? '#000' : 'var(--text-primary)'};">${m.position}</div>
              <div>
                <h3 style="font-family: var(--font-title); font-size:16px; font-weight:800;">${m.title}</h3>
                <p style="font-size:12px; color:var(--text-secondary); margin-top:4px;">${m.description}</p>
              </div>
            </div>
            <span class="badge-status ${statusClass}" style="font-size: 10px; margin-top: 2px;">${statusText}</span>
          </div>
          <div class="module-lessons-container" style="margin-top: 16px; display: grid; gap: 12px; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));"></div>
        `;

        const lessonsContainer = modCard.querySelector(".module-lessons-container");

        m.lessons.forEach(l => {
          const card = document.createElement("div");
          card.className = `lesson-path-card ${l.status}`; // locked, available, completed
          card.style.background = "var(--bg-primary)";
          card.style.border = l.is_recommended ? "1.5px solid var(--primary)" : "1px solid var(--border-color)";
          card.style.borderRadius = "var(--radius-md)";
          card.style.padding = "16px";
          card.style.cursor = "pointer";
          card.style.display = "flex";
          card.style.flexDirection = "column";
          card.style.justify = "space-between";
          card.style.minHeight = "110px";
          
          let actionLabel = "Bloqueado";
          let icon = "lock";
          
          if (l.status === "completed") {
            actionLabel = "Revisar";
            icon = "check-circle";
          } else if (l.status === "available" || l.status === "locked") {
            // Não bloqueamos mais lições
            actionLabel = "Começar";
            icon = "play-circle";
            l.status = "available";
          } else if (l.status === "in_progress") {
            actionLabel = "Continuar";
            icon = "play-circle";
          }

          card.innerHTML = `
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="badge-status ${l.status === 'completed' ? 'badge-completed' : 'badge-available'}">
                  ${l.status === 'completed' ? 'Concluída' : 'Disponível'}
                </span>
                ${l.is_recommended ? '<span style="font-size: 9px; font-weight:800; color: var(--primary); background: rgba(0, 132, 255, 0.1); border: 1px solid rgba(0, 132, 255, 0.2); padding: 1px 4px; border-radius: 2px;">RECOMENDADA</span>' : ''}
              </div>
              <h4 style="margin-top:8px; font-size: 13px; font-weight: 700; line-height: 1.3;">${l.title}</h4>
            </div>
            <div class="lesson-path-meta" style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center; font-size: 11px;">
              <span style="color: var(--text-secondary);"><i data-lucide="clock" style="width:10px; height:10px; vertical-align: middle; margin-right: 2px;"></i> ${l.estimated_minutes} min</span>
              <span style="font-weight:700; color: var(--primary); display:flex; align-items:center; gap:4px;">
                ${actionLabel} <i data-lucide="${icon}" style="width:12px; height:12px;"></i>
              </span>
            </div>
          `;

          card.addEventListener("click", () => this.startLesson(l.id));

          lessonsContainer.appendChild(card);
        });

        container.appendChild(modCard);
      });

      lucide.createIcons();
      
      // Animação GSAP Gamificada (Cascata/Stagger)
      if (typeof gsap !== "undefined") {
        gsap.fromTo(".trilhas-module-card", 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)" }
        );
        gsap.fromTo(".lesson-path-card", 
          { opacity: 0, scale: 0.9 }, 
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.05, ease: "back.out(1.5)", delay: 0.3 }
        );
      }
    } catch (e) {
      console.error("[TrackTimeline] Erro ao renderizar:", e);
    }
  }

  // ============================================================================
  // TELA DE AULA (FOCADA)
  // ============================================================================
  async startLesson(lessonId) {
    console.log(`[LessonPlayer] Iniciando aula focada: ${lessonId}`);
    try {
      const details = await window.Tracker.getLessonDetails(lessonId);
      const lesson = details.lesson;
      const steps = details.steps;

      // Validação: aula não encontrada
      if (!lesson) {
        console.error(`[LessonPlayer] Aula não encontrada: ${lessonId}`);
        this.navigateTo("lesson");
        safeText("lesson-mini-title", "Aula não encontrada");
        this._renderLessonErrorState("not_found");
        return;
      }

      // Validação: aula sem etapas
      if (!steps || steps.length === 0) {
        console.error(`[LessonPlayer] Aula sem etapas: ${lessonId}`, lesson);
        this.navigateTo("lesson");
        safeText("lesson-mini-title", lesson.title);
        this._renderLessonErrorState("empty");
        return;
      }

      this.activeLesson = lesson;
      this.activeSteps = steps;
      this.currentStepIndex = 0;
      this.isAnswerChecked = false;
      this.selectedOptionId = null;
      this.hintsUsedForCurrentStep = 0;

      // Navegar para o player de aula
      this.navigateTo("lesson");
      safeText("lesson-mini-title", this.activeLesson.title);

      this.renderCurrentStep();
      this.initLessonProfessorSession();
    } catch (e) {
      console.error("[LessonPlayer] Falha ao iniciar:", e);
      this.navigateTo("lesson");
      safeText("lesson-mini-title", "Erro ao carregar");
      this._renderLessonErrorState("error");
    }
  }

  // Renderiza estado de erro estruturado no player de aula (sem alert, sem conteúdo vazio)
  _renderLessonErrorState(type) {
    const contentRender = document.getElementById("step-content-render");
    const simulationContainer = document.getElementById("step-simulation-container");
    const exerciseContainer = document.getElementById("step-exercise-container");
    const feedbackSheet = document.getElementById("feedback-sheet-container");
    const progressFill = document.getElementById("lesson-steps-progress-fill");
    const stepCounter = document.getElementById("lesson-step-counter-text");

    if (simulationContainer) simulationContainer.style.display = "none";
    if (exerciseContainer) exerciseContainer.style.display = "none";
    if (feedbackSheet) feedbackSheet.style.display = "none";
    if (progressFill) progressFill.style.width = "0%";
    if (stepCounter) stepCounter.textContent = "";

    const btnBack = document.getElementById("btn-lesson-back");
    const btnHint = document.getElementById("btn-lesson-hint");
    const btnPrimary = document.getElementById("btn-lesson-primary-action");
    if (btnBack) btnBack.style.visibility = "hidden";
    if (btnHint) btnHint.style.display = "none";

    const messages = {
      not_found: {
        icon: "search-x",
        title: "Aula não encontrada",
        body: "Não encontramos esta aula. Ela pode ter sido removida ou ainda não foi publicada.",
        color: "var(--error)"
      },
      empty: {
        icon: "file-x",
        title: "Conteúdo não disponível",
        body: "A aula foi encontrada, mas seu conteúdo ainda não foi carregado. Tente novamente em breve.",
        color: "var(--warning)"
      },
      error: {
        icon: "wifi-off",
        title: "Não foi possível carregar a aula",
        body: "Ocorreu um erro ao carregar o conteúdo. Verifique sua conexão e tente novamente.",
        color: "var(--error)"
      }
    };

    const msg = messages[type] || messages.error;

    if (contentRender) {
      contentRender.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px;gap:20px;text-align:center;padding:40px 20px;">
          <div style="width:64px;height:64px;background:rgba(255,77,77,0.1);border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <i data-lucide="${msg.icon}" style="width:32px;height:32px;color:${msg.color};"></i>
          </div>
          <div>
            <h2 style="font-family:var(--font-title);font-size:22px;font-weight:800;margin-bottom:10px;">${msg.title}</h2>
            <p style="font-size:14px;color:var(--text-secondary);max-width:400px;line-height:1.6;">${msg.body}</p>
          </div>
        </div>
      `;
    }

    if (btnPrimary) {
      btnPrimary.disabled = false;
      safeText("btn-lesson-primary-action-text", "Voltar para o Curso");
      safeSetAttribute("btn-lesson-primary-action-icon", "data-lucide", "arrow-left");
      const newBtn = btnPrimary.cloneNode(true);
      btnPrimary.parentNode.replaceChild(newBtn, btnPrimary);
      newBtn.addEventListener("click", () => this.navigateTo("track"));
    }

    safeSetAttribute('lesson-error-container', 'style', 'display: block;');
    safeText('lesson-error-container', 'An error occurred loading the lesson.');

    lucide.createIcons();
  }

  // Renderiza a etapa
  renderCurrentStep() {
    if (!this.activeSteps || this.activeSteps.length === 0) return;
    if (this.currentStepIndex < 0 || this.currentStepIndex >= this.activeSteps.length) return;

    const step = this.activeSteps[this.currentStepIndex];
    if (!step) return;
    this.hintsUsedForCurrentStep = 0; // Reseta dicas gastas no passo

    
    // Atualiza progresso e contadores
    const pct = Math.round((this.currentStepIndex / (this.activeSteps.length - 1)) * 100);
    document.getElementById("lesson-steps-progress-fill").style.width = `${pct}%`;
    { const _el = document.getElementById('lesson-step-counter-text'); if (_el) _el.textContent = `Etapa ${this.currentStepIndex + 1} de ${this.activeSteps.length}`; }

    const btnBack = document.getElementById("btn-lesson-back");
    btnBack.style.visibility = this.currentStepIndex > 0 ? "visible" : "hidden";
    
    // Configura visibilidade do botão de pedir dica gradual
    const btnHint = document.getElementById("btn-lesson-hint");
    if (step.step_type === "activity") {
      btnHint.style.display = "inline-flex";
    } else {
      btnHint.style.display = "none";
    }

    // Resetar feedback sheet e variáveis de resposta
    document.getElementById("feedback-sheet-container").style.display = "none";
    this.isAnswerChecked = false;
    this.selectedOptionId = null;

    // Resetar elementos e containers
    const contentRender = document.getElementById("step-content-render");
    const simulationContainer = document.getElementById("step-simulation-container");
    const exerciseContainer = document.getElementById("step-exercise-container");
    
    contentRender.innerHTML = "";
    simulationContainer.style.display = "none";
    exerciseContainer.style.display = "none";

    const isLastStep = this.currentStepIndex === this.activeSteps.length - 1;
    
    safeText("btn-lesson-primary-action-text", isLastStep ? "Concluir Aula" : "Continuar");
    safeSetAttribute("btn-lesson-primary-action-icon", "data-lucide", isLastStep ? "check-circle" : "arrow-right");

    // 1. Renderizar Título e Texto do passo
    if (step.title) {
      const h2 = document.createElement("h2");
      h2.style.fontFamily = "var(--font-title)";
      h2.style.fontSize = "24px";
      h2.style.fontWeight = "800";
      h2.style.marginBottom = "14px";
      h2.textContent = step.title;
      contentRender.appendChild(h2);
    }

    const bodyText = document.createElement("div");
    bodyText.className = "step-body-text";
    bodyText.innerHTML = this.parseMarkdown(step.content || "");
    contentRender.appendChild(bodyText);


    // 2. Renderizar Fórmulas em Bloco
    if (step.step_type === "formula" && step.formula) {
      const formulaBlock = document.createElement("div");
      formulaBlock.className = "formula-block";
      formulaBlock.innerHTML = `
        <span class="formula-label">Fórmula de Engenharia</span>
        <span class="formula-text-math">${step.formula}</span>
      `;
      contentRender.appendChild(formulaBlock);
    }

    // 3. Se for Exemplo
    if (step.step_type === "example") {
      const example = document.createElement("div");
      example.className = "example-block";
      example.innerHTML = `
        <h4><i data-lucide="info" style="width:16px; height:16px; vertical-align:middle;"></i> CASO INDUSTRIAL</h4>
        <p>${this.parseMarkdown(step.content)}</p>
      `;
      contentRender.appendChild(example);
      bodyText.style.display = "none";
    }

    // 4. Se for Simulador
    if (step.step_type === "simulation") {
      simulationContainer.style.display = "block";
      const customWrapper = document.getElementById("lesson-simulation-custom-wrapper");
      const conveyorWrapper = document.getElementById("lesson-simulation-conveyor-wrapper");

      // Se for um dos 4 novos cursos, ativa a simulação customizada
      const newCourseIds = ["l_alg_1_1", "l_amd_1_1", "l_num_1_1", "l_mat_1_1"];
      if (newCourseIds.includes(this.activeLesson.id)) {
        conveyorWrapper.style.display = "none";
        customWrapper.style.display = "block";
        this.initCustomLessonSimulation(this.activeLesson.id, customWrapper);
      } else {
        conveyorWrapper.style.display = "block";
        customWrapper.style.display = "none";
        window.BottleneckSimulation.init("lesson");
      }
    }

    // 5. Se for Exercício
    if (step.step_type === "activity" && step.activity) {
      exerciseContainer.style.display = "none";
      const act = step.activity;
      if (!window.currentActivities) window.currentActivities = {};
      window.currentActivities[act.id] = act;
      
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = renderActivity(act);
      contentRender.appendChild(tempDiv);
      bindActivityOptionEvents();

      const btnPrimaryId = document.getElementById("btn-lesson-primary-action");
      if (btnPrimaryId) {
        btnPrimaryId.style.display = "none";
      }
    } else {
      const btnPrimaryId = document.getElementById("btn-lesson-primary-action");
      if (btnPrimaryId) {
        btnPrimaryId.style.display = "inline-flex";
      }
    }

    lucide.createIcons();

    // Eventos dos botões inferiores
    const newBtnBack = btnBack.cloneNode(true);
    btnBack.parentNode.replaceChild(newBtnBack, btnBack);
    newBtnBack.style.visibility = this.currentStepIndex > 0 ? "visible" : "hidden";
    newBtnBack.addEventListener("click", () => {
      this.currentStepIndex--;
      this.renderCurrentStep();
    });

    const btnPrimary = document.getElementById("btn-lesson-primary-action");
    if (btnPrimary) {
      const newBtnPrimary = btnPrimary.cloneNode(true);
      btnPrimary.parentNode.replaceChild(newBtnPrimary, btnPrimary);
      newBtnPrimary.addEventListener("click", () => {
        this.handlePrimaryAction();
      });
    }

    // Evento do botão de dica gradual
    const newBtnHint = btnHint.cloneNode(true);
    btnHint.parentNode.replaceChild(newBtnHint, btnHint);
    newBtnHint.addEventListener("click", () => {
      this.hintsUsedForCurrentStep++;
      this.askProfessorSocratic(`Me dê uma dica socrática de nível ${Math.min(6, this.hintsUsedForCurrentStep)}.`);
    });

    // GSAP Gamificado: Animar entrada do conteúdo da etapa
    if (typeof gsap !== "undefined") {
      const contentRender = document.getElementById("step-content-render");
      const exerciseContainer = document.getElementById("step-exercise-container");
      
      gsap.fromTo(contentRender.children, 
        { opacity: 0, y: 15 }, 
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      );
      if (exerciseContainer && exerciseContainer.style.display !== "none") {
        gsap.fromTo(exerciseContainer, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, delay: 0.2, ease: "back.out(1.2)" });
      }
    }
  }

  // Executa correção ou avanço no modo focado
  async handlePrimaryAction() {
    if (!this.activeSteps || this.activeSteps.length === 0) return;
    const isLastStep = this.currentStepIndex === this.activeSteps.length - 1;
    if (isLastStep) {
      if (this.currentScreen === "lesson") {
        if (window.BottleneckSimulation) window.BottleneckSimulation.destroy();
      }
      this.navigateTo("track");
    } else {
      this.currentStepIndex++;
      this.renderCurrentStep();
    }
  }

  // ============================================================================
  // RENDENRIZAR SIMULADORES CUSTOMIZADOS POR LIÇÃO
  // ============================================================================
  initCustomLessonSimulation(lessonId, container) {
    if (lessonId === "l_alg_1_1") {
      container.innerHTML = `
        <div class="custom-sim-widget" id="sim-algebra-linear" style="padding: 16px; background: var(--bg-surface-raised); border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-top: 14px;">
          <div style="display: flex; gap: 16px; flex-direction: column; align-items: center; justify-content: center;">
            <svg id="vector-svg" viewBox="0 0 200 200" width="160" height="160" style="background: var(--bg-primary); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
               <!-- Grid lines -->
               <g stroke="var(--border-color)" stroke-width="0.5" stroke-dasharray="1 3">
                 <line x1="20" y1="100" x2="180" y2="100" />
                 <line x1="40" y1="100" x2="160" y2="100" />
                 <line x1="60" y1="100" x2="140" y2="100" />
                 <line x1="80" y1="100" x2="120" y2="100" />
                 <line x1="100" y1="20" x2="100" y2="180" />
                 <line x1="100" y1="40" x2="100" y2="160" />
                 <line x1="100" y1="60" x2="100" y2="140" />
                 <line x1="100" y1="80" x2="100" y2="120" />
               </g>
               <!-- Axes -->
               <line x1="10" y1="100" x2="190" y2="100" stroke="var(--text-muted)" stroke-width="1.5" />
               <line x1="100" y1="10" x2="100" y2="190" stroke="var(--text-muted)" stroke-width="1.5" />
               <!-- Arrow Marker -->
               <defs>
                 <marker id="vector-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                   <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--success)" />
                 </marker>
               </defs>
               <!-- The Vector -->
               <line id="vector-line" x1="100" y1="100" x2="140" y2="60" stroke="var(--success)" stroke-width="3" marker-end="url(#vector-arrow)" />
            </svg>
            
            <div style="width: 100%;">
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;">
                <span>Componente X (Horizontal):</span>
                <strong id="val-x">5</strong>
              </div>
              <input type="range" class="sim-slider" id="slider-x" min="-10" max="10" step="1" value="5" style="width: 100%; margin-bottom: 12px;">
              
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;">
                <span>Componente Y (Vertical):</span>
                <strong id="val-y">5</strong>
              </div>
              <input type="range" class="sim-slider" id="slider-y" min="-10" max="10" step="1" value="5" style="width: 100%; margin-bottom: 16px;">
              
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 11px;">
                <div style="background: var(--bg-primary); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                  <div style="color: var(--text-secondary);">Magnitude (Comprimento)</div>
                  <div style="font-size: 14px; font-weight: 700; color: var(--success); margin-top: 2px;" id="val-magnitude">7.07</div>
                </div>
                <div style="background: var(--bg-primary); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                  <div style="color: var(--text-secondary);">Direção (Ângulo)</div>
                  <div style="font-size: 14px; font-weight: 700; color: var(--primary); margin-top: 2px;" id="val-angle">45.0°</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      const sliderX = document.getElementById("slider-x");
      const sliderY = document.getElementById("slider-y");
      const valX = document.getElementById("val-x");
      const valY = document.getElementById("val-y");
      const valMag = document.getElementById("val-magnitude");
      const valAng = document.getElementById("val-angle");
      const vectorLine = document.getElementById("vector-line");

      const updateVector = () => {
        const x = parseInt(sliderX.value);
        const y = parseInt(sliderY.value);
        valX.textContent = x;
        valY.textContent = y;

        const mag = Math.sqrt(x * x + y * y);
        let angle = Math.atan2(y, x) * (180 / Math.PI);
        if (angle < 0) angle += 360;

        valMag.textContent = mag.toFixed(2);
        valAng.textContent = angle.toFixed(1) + "°";

        const scale = 8;
        const targetX = 100 + x * scale;
        const targetY = 100 - y * scale;

        vectorLine.setAttribute("x2", targetX);
        vectorLine.setAttribute("y2", targetY);
      };

      sliderX.addEventListener("input", updateVector);
      sliderY.addEventListener("input", updateVector);
      updateVector();
    }
    else if (lessonId === "l_amd_1_1") {
      container.innerHTML = `
        <div class="custom-sim-widget" id="sim-amd" style="padding: 16px; background: var(--bg-surface-raised); border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-top: 14px;">
          <div style="display: flex; gap: 16px; flex-direction: column;">
            <div style="display: flex; gap: 12px; font-size: 11px; margin-bottom: 8px; justify-content: space-around; flex-wrap: wrap;">
              <div style="text-align: center;"><strong>Fornecedor A (Custo):</strong> Preço 9 | Qualidade 6 | Prazo 5</div>
              <div style="text-align: center;"><strong>Fornecedor B (Qualidade):</strong> Preço 4 | Qualidade 9 | Prazo 8</div>
            </div>
            
            <svg id="amd-bars-svg" viewBox="0 0 200 100" width="100%" height="100" style="background: var(--bg-primary); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <text x="50" y="90" font-size="10" font-family="sans-serif" text-anchor="middle" fill="var(--text-primary)" font-weight="bold">Fornecedor A</text>
              <text x="150" y="90" font-size="10" font-family="sans-serif" text-anchor="middle" fill="var(--text-primary)" font-weight="bold">Fornecedor B</text>
              
              <rect x="35" y="15" width="30" height="60" rx="3" fill="var(--border-color)" opacity="0.3" />
              <rect x="135" y="15" width="30" height="60" rx="3" fill="var(--border-color)" opacity="0.3" />
              
              <rect id="bar-a" x="35" y="30" width="30" height="45" rx="3" fill="var(--success)" />
              <rect id="bar-b" x="135" y="40" width="30" height="35" rx="3" fill="var(--primary)" />
              
              <text id="score-a" x="50" y="27" font-size="11" font-family="sans-serif" text-anchor="middle" fill="var(--success)" font-weight="bold">7.2</text>
              <text id="score-b" x="150" y="27" font-size="11" font-family="sans-serif" text-anchor="middle" fill="var(--primary)" font-weight="bold">6.8</text>
            </svg>
            
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                  <span>Peso Preço:</span>
                  <strong id="val-w-price">40%</strong>
                </div>
                <input type="range" class="sim-slider" id="slider-w-price" min="0" max="100" value="40" style="width: 100%;">
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                  <span>Peso Qualidade:</span>
                  <strong id="val-w-quality">40%</strong>
                </div>
                <input type="range" class="sim-slider" id="slider-w-quality" min="0" max="100" value="40" style="width: 100%;">
              </div>
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
                  <span>Peso Prazo:</span>
                  <strong id="val-w-delivery">20%</strong>
                </div>
                <input type="range" class="sim-slider" id="slider-w-delivery" min="0" max="100" value="20" style="width: 100%;">
              </div>
            </div>
          </div>
        </div>
      `;

      const sliderPrice = document.getElementById("slider-w-price");
      const sliderQuality = document.getElementById("slider-w-quality");
      const sliderDelivery = document.getElementById("slider-w-delivery");
      
      const valPrice = document.getElementById("val-w-price");
      const valQuality = document.getElementById("val-w-quality");
      const valDelivery = document.getElementById("val-w-delivery");

      const barA = document.getElementById("bar-a");
      const barB = document.getElementById("bar-b");
      const scoreA = document.getElementById("score-a");
      const scoreB = document.getElementById("score-b");

      const updateAmd = () => {
        const wP = parseInt(sliderPrice.value) / 100;
        const wQ = parseInt(sliderQuality.value) / 100;
        const wD = parseInt(sliderDelivery.value) / 100;

        valPrice.textContent = sliderPrice.value + "%";
        valQuality.textContent = sliderQuality.value + "%";
        valDelivery.textContent = sliderDelivery.value + "%";

        const nA = wP * 9 + wQ * 6 + wD * 5;
        const nB = wP * 4 + wQ * 9 + wD * 8;

        scoreA.textContent = nA.toFixed(1);
        scoreB.textContent = nB.toFixed(1);

        const heightA = nA * 6;
        const heightB = nB * 6;

        barA.setAttribute("height", heightA);
        barA.setAttribute("y", 75 - heightA);

        barB.setAttribute("height", heightB);
        barB.setAttribute("y", 75 - heightB);
      };

      const handleSliderChange = (changed, val) => {
        const ids = ["price", "quality", "delivery"];
        const others = ids.filter(id => id !== changed);
        const slider1 = document.getElementById(`slider-w-${others[0]}`);
        const slider2 = document.getElementById(`slider-w-${others[1]}`);
        
        let w1 = parseInt(slider1.value);
        let w2 = parseInt(slider2.value);
        const remaining = 100 - val;
        const sumOthers = w1 + w2;

        if (sumOthers > 0) {
          w1 = Math.round((w1 / sumOthers) * remaining);
          w2 = remaining - w1;
        } else {
          w1 = Math.round(remaining / 2);
          w2 = remaining - w1;
        }

        slider1.value = Math.max(0, w1);
        slider2.value = Math.max(0, w2);

        updateAmd();
      };

      sliderPrice.addEventListener("input", (e) => handleSliderChange("price", parseInt(e.target.value)));
      sliderQuality.addEventListener("input", (e) => handleSliderChange("quality", parseInt(e.target.value)));
      sliderDelivery.addEventListener("input", (e) => handleSliderChange("delivery", parseInt(e.target.value)));
      updateAmd();
    }
    else if (lessonId === "l_num_1_1") {
      container.innerHTML = `
        <div class="custom-sim-widget" id="sim-calculo-numerico" style="padding: 16px; background: var(--bg-surface-raised); border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-top: 14px;">
          <div style="display: flex; gap: 16px; flex-direction: column; align-items: center;">
            <svg id="num-target-svg" viewBox="0 0 100 100" width="120" height="120" style="background: var(--bg-primary); border-radius: var(--radius-full); border: 1px solid var(--border-color);">
               <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-color)" stroke-width="1" />
               <circle cx="50" cy="50" r="25" fill="none" stroke="var(--border-color)" stroke-width="1" />
               <circle cx="50" cy="50" r="10" fill="none" stroke="var(--border-color)" stroke-width="1" />
               <circle cx="50" cy="50" r="2" fill="var(--success)" />
               <circle id="num-dot" cx="50" cy="50" r="4" fill="var(--warning)" style="transition: all 0.2s ease;" />
            </svg>
            
            <div style="width: 100%;">
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;">
                <span>Casas Decimais (Precisão):</span>
                <strong id="val-decimals">3</strong>
              </div>
              <input type="range" class="sim-slider" id="slider-decimals" min="1" max="10" step="1" value="3" style="width: 100%; margin-bottom: 16px;">
              
              <div style="display: flex; flex-direction: column; gap: 8px; font-size: 11px;">
                <div style="background: var(--bg-primary); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-secondary);">Valor Real (1/3):</span>
                  <span style="font-family: monospace; font-size: 12px;">0.3333333333...</span>
                </div>
                <div style="background: var(--bg-primary); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-secondary);">Aproximação:</span>
                  <span id="val-approx" style="font-family: monospace; font-size: 12px; color: var(--primary);">0.333</span>
                </div>
                <div style="background: var(--bg-primary); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center;">
                  <span style="color: var(--text-secondary);">Erro Absoluto:</span>
                  <span id="val-abs-error" style="font-family: monospace; font-size: 12px; color: var(--warning); font-weight: bold;">0.0003333333</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

      const sliderDecimals = document.getElementById("slider-decimals");
      const valDecimals = document.getElementById("val-decimals");
      const valApprox = document.getElementById("val-approx");
      const valAbsError = document.getElementById("val-abs-error");
      const numDot = document.getElementById("num-dot");

      const updateNumeric = () => {
        const d = parseInt(sliderDecimals.value);
        valDecimals.textContent = d;

        const realVal = 1 / 3;
        const approxVal = Math.round(Math.pow(10, d) / 3) / Math.pow(10, d);
        const err = Math.abs(realVal - approxVal);

        valApprox.textContent = approxVal.toFixed(d);
        valAbsError.textContent = err.toFixed(10);

        const maxDist = 38;
        const distance = Math.min(maxDist, err * 100000);
        
        const cx = 50 + distance * Math.cos(Math.PI / 4);
        const cy = 50 - distance * Math.sin(Math.PI / 4);

        numDot.setAttribute("cx", cx);
        numDot.setAttribute("cy", cy);
      };

      sliderDecimals.addEventListener("input", updateNumeric);
      updateNumeric();
    }
    else if (lessonId === "l_mat_1_1") {
      container.innerHTML = `
        <div class="custom-sim-widget" id="sim-ciencia-materiais" style="padding: 16px; background: var(--bg-surface-raised); border-radius: var(--radius-md); border: 1px solid var(--border-color); margin-top: 14px;">
          <div style="display: flex; gap: 16px; flex-direction: column;">
            
            <div style="display: flex; gap: 8px; justify-content: center;">
              <button class="btn-secondary active" id="btn-mat-steel" style="padding: 4px 12px; font-size: 12px;">Aço (Dúctil)</button>
              <button class="btn-secondary" id="btn-mat-ceramic" style="padding: 4px 12px; font-size: 12px;">Cerâmica (Frágil)</button>
            </div>
            
            <div style="display: flex; gap: 12px; align-items: center; justify-content: center; flex-direction: column;">
              <!-- Specimen SVG -->
              <svg id="specimen-svg" viewBox="0 0 60 100" width="60" height="100" style="background: var(--bg-primary); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                 <rect x="15" y="10" width="30" height="15" fill="var(--text-muted)" />
                 <rect x="15" y="75" width="30" height="15" fill="var(--text-muted)" />
                 <rect id="specimen-bar" x="25" y="25" width="10" height="50" fill="var(--border-color)" />
                 <line id="specimen-crack" x1="20" y1="50" x2="40" y2="50" stroke="var(--bg-primary)" stroke-width="2" style="display: none;" />
              </svg>
              
              <!-- Curve SVG -->
              <svg id="stress-strain-svg" viewBox="0 0 120 100" width="100%" height="100" style="background: var(--bg-primary); border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                 <line x1="15" y1="85" x2="115" y2="85" stroke="var(--text-muted)" stroke-width="1" />
                 <line x1="15" y1="10" x2="15" y2="90" stroke="var(--text-muted)" stroke-width="1" />
                 
                 <path id="steel-curve-path" d="M 15 85 L 40 55 Q 65 30, 90 40 Q 100 45, 105 65" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="2 2" />
                 <path id="ceramic-curve-path" d="M 15 85 L 50 25" fill="none" stroke="var(--text-muted)" stroke-width="1.5" stroke-dasharray="2 2" style="display: none;" />
                 
                 <circle id="curve-dot" cx="15" cy="85" r="3.5" fill="var(--warning)" />
                 
                 <text x="110" y="95" font-size="6" fill="var(--text-muted)" text-anchor="end">Deformação (ε)</text>
                 <text x="5" y="15" font-size="6" fill="var(--text-muted)" transform="rotate(-90 5 15)" text-anchor="end">Tensão (σ)</text>
              </svg>
            </div>
            
            <div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 8px;">
                <span>Tensão Aplicada:</span>
                <strong id="val-tension">0 MPa</strong>
              </div>
              <input type="range" class="sim-slider" id="slider-tension" min="0" max="600" value="0" style="width: 100%;">
            </div>
            
            <div id="mat-status-box" style="font-size: 11px; background: var(--bg-primary); padding: 8px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); text-align: center; font-weight: bold; color: var(--success);">
               Região Elástica (Reversível)
            </div>
          </div>
        </div>
      `;

      const btnSteel = document.getElementById("btn-mat-steel");
      const btnCeramic = document.getElementById("btn-mat-ceramic");
      const sliderTension = document.getElementById("slider-tension");
      const valTension = document.getElementById("val-tension");
      const statusBox = document.getElementById("mat-status-box");

      const specBar = document.getElementById("specimen-bar");
      const specCrack = document.getElementById("specimen-crack");
      const curveDot = document.getElementById("curve-dot");
      const steelCurve = document.getElementById("steel-curve-path");
      const ceramicCurve = document.getElementById("ceramic-curve-path");

      let activeMaterial = "steel";

      const updateMaterialWidget = () => {
        const val = parseInt(sliderTension.value);
        valTension.textContent = val + " MPa";

        if (activeMaterial === "steel") {
          if (val <= 250) {
            const pct = val / 250;
            const cx = 15 + pct * 25;
            const cy = 85 - pct * 30;
            curveDot.setAttribute("cx", cx);
            curveDot.setAttribute("cy", cy);

            specBar.setAttribute("x", 25);
            specBar.setAttribute("width", 10);
            specBar.setAttribute("y", 25);
            specBar.setAttribute("height", 50 + pct * 2);
            specBar.setAttribute("fill", "var(--border-color)");
            specCrack.style.display = "none";
            
            statusBox.textContent = "Região Elástica (Deformação Reversível)";
            statusBox.style.color = "var(--success)";
          } else if (val <= 450) {
            const pct = (val - 250) / 200;
            const cx = 40 + pct * 50;
            const cy = 55 - pct * 15;
            curveDot.setAttribute("cx", cx);
            curveDot.setAttribute("cy", cy);

            const w = 10 - pct * 2;
            specBar.setAttribute("x", 30 - w / 2);
            specBar.setAttribute("width", w);
            specBar.setAttribute("y", 25);
            specBar.setAttribute("height", 52 + pct * 4);
            specBar.setAttribute("fill", "var(--primary)");
            specCrack.style.display = "none";

            statusBox.textContent = "Região Plástica (Deformação Permanente!)";
            statusBox.style.color = "var(--primary)";
          } else if (val < 550) {
            const pct = (val - 450) / 100;
            const cx = 90 + pct * 15;
            const cy = 40 + pct * 25;
            curveDot.setAttribute("cx", cx);
            curveDot.setAttribute("cy", cy);

            const w = 8 - pct * 3;
            specBar.setAttribute("x", 30 - w / 2);
            specBar.setAttribute("width", w);
            specBar.setAttribute("y", 25);
            specBar.setAttribute("height", 56 + pct * 2);
            specBar.setAttribute("fill", "var(--warning)");
            specCrack.style.display = "none";

            statusBox.textContent = "Estricção do Material (Instabilidade Plástica)";
            statusBox.style.color = "var(--warning)";
          } else {
            curveDot.setAttribute("cx", 105);
            curveDot.setAttribute("cy", 65);

            specBar.setAttribute("height", 0);
            specCrack.style.display = "block";
            statusBox.textContent = "Ruptura do Aço! O corpo de prova se rompeu.";
            statusBox.style.color = "var(--error)";
          }
        } else {
          if (val < 150) {
            const pct = val / 150;
            const cx = 15 + pct * 35;
            const cy = 85 - pct * 60;
            curveDot.setAttribute("cx", cx);
            curveDot.setAttribute("cy", cy);

            specBar.setAttribute("x", 25);
            specBar.setAttribute("width", 10);
            specBar.setAttribute("y", 25);
            specBar.setAttribute("height", 50 + pct * 0.5);
            specBar.setAttribute("fill", "var(--border-color)");
            specCrack.style.display = "none";

            statusBox.textContent = "Região Elástica Linear (Alta Rigidez, Frágil)";
            statusBox.style.color = "var(--success)";
          } else {
            curveDot.setAttribute("cx", 50);
            curveDot.setAttribute("cy", 25);

            specBar.setAttribute("height", 0);
            specCrack.style.display = "block";
            statusBox.textContent = "Ruptura Frágil Súbita! Sem escoamento.";
            statusBox.style.color = "var(--error)";
          }
        }
      };

      btnSteel.addEventListener("click", () => {
        btnSteel.classList.add("active");
        btnCeramic.classList.remove("active");
        activeMaterial = "steel";
        steelCurve.style.display = "block";
        ceramicCurve.style.display = "none";
        sliderTension.max = 600;
        sliderTension.value = 0;
        updateMaterialWidget();
      });

      btnCeramic.addEventListener("click", () => {
        btnCeramic.classList.add("active");
        btnSteel.classList.remove("active");
        activeMaterial = "ceramic";
        steelCurve.style.display = "none";
        ceramicCurve.style.display = "block";
        sliderTension.max = 200;
        sliderTension.value = 0;
        updateMaterialWidget();
      });

      sliderTension.addEventListener("input", updateMaterialWidget);
      updateMaterialWidget();
    }
  }

  // ============================================================================
  // COMPORTAMENTO SOCRÁTICO DO TUTOR IA (MOCK REALISTA EM 6 NÍVEIS)
  // ============================================================================
  toggleLessonProfessorDrawer() {
    const drawer = document.getElementById("tutor-ia-drawer");
    drawer.classList.toggle("open");
    
    if (drawer.classList.contains("open")) {
      const messagesContainer = document.getElementById("tutor-lesson-messages");
      
      const btnProfessor = document.getElementById("btn-open-lesson-tutor");
      const questionId = btnProfessor ? btnProfessor.dataset.questionId : null;
      const optionId = btnProfessor ? btnProfessor.dataset.optionId : null;

      // Always clear message container when opening drawer to get fresh explanation for the specific question context
      messagesContainer.innerHTML = "";
      
      if (questionId && optionId) {
          this.addAiMessage(messagesContainer, '<i data-lucide="loader" class="spin"></i> <em>Analisando sua resposta...</em>', "ai");
          if (window.lucide) window.lucide.createIcons();
          
          fetch(`http://${window.location.hostname}:8000/api/lesson/teacher`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ question_id: questionId, selected_option_id: optionId })
          })
          .then(r => r.json())
          .then(data => {
              const msgs = messagesContainer.querySelectorAll('.tutor-mock-msg.ai');
              if (msgs.length > 0) msgs[msgs.length - 1].remove();
              this.addAiMessage(messagesContainer, data.explanation || "Não tenho informação suficiente no material desta aula para explicar isso com segurança.", "ai");
          })
          .catch(err => {
              console.error("Erro ao contatar professor:", err);
              const msgs = messagesContainer.querySelectorAll('.tutor-mock-msg.ai');
              if (msgs.length > 0) msgs[msgs.length - 1].remove();
              this.addAiMessage(messagesContainer, "Professor indisponível no momento.", "ai");
          });
      } else {
          this.addAiMessage(
            messagesContainer,
            "Olá! Sou o seu professor de soldagem. Responda uma questão na aula para que eu possa analisar o seu raciocínio e te ajudar.",
            "ai"
          );
      }
    }
  }

  initLessonProfessorSession() {
    const messagesContainer = document.getElementById("tutor-lesson-messages");
    if (messagesContainer) messagesContainer.innerHTML = "";
  }

  submitProfessorLessonMessage() {
    const input = document.getElementById("tutor-lesson-input-field");
    const text = input.value.trim();
    if (!text) return;

    const messagesContainer = document.getElementById("tutor-lesson-messages");
    this.addAiMessage(messagesContainer, text, "user");
    input.value = "";

    const btnProfessor = document.getElementById("btn-open-lesson-tutor");
    const questionId = btnProfessor ? btnProfessor.dataset.questionId : null;
    const optionId = btnProfessor ? btnProfessor.dataset.optionId : null;

    this.hintsUsedForCurrentStep++;
    this.addAiMessage(messagesContainer, '<i data-lucide="loader" class="spin"></i> <em>Pensando...</em>', "ai");
    if (window.lucide) window.lucide.createIcons();

    if (questionId && optionId) {
        fetch(`http://${window.location.hostname}:8000/api/lesson/teacher`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question_id: questionId, selected_option_id: optionId, user_message: text })
        })
        .then(r => r.json())
        .then(data => {
            const msgs = messagesContainer.querySelectorAll('.tutor-mock-msg.ai');
            if (msgs.length > 0) msgs[msgs.length - 1].remove();
            this.addAiMessage(messagesContainer, data.explanation || "Não tenho informação suficiente no material.", "ai");
        })
        .catch(err => {
            console.error("Erro:", err);
            const msgs = messagesContainer.querySelectorAll('.tutor-mock-msg.ai');
            if (msgs.length > 0) msgs[msgs.length - 1].remove();
            this.addAiMessage(messagesContainer, "Professor indisponível no momento.", "ai");
        });
    } else {
        const msgs = messagesContainer.querySelectorAll('.tutor-mock-msg.ai');
        if (msgs.length > 0) msgs[msgs.length - 1].remove();
        this.addAiMessage(messagesContainer, "Por favor, selecione uma resposta na questão atual primeiro.", "ai");
    }
  }

  askProfessorSocratic(query) {
    const input = document.getElementById("tutor-lesson-input-field");
    input.value = query;
    this.submitProfessorLessonMessage();
  }

  addAiMessage(container, text, sender) {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = this.parseMarkdown(text);
    container.appendChild(bubble);
    
    // GSAP ANIMATIONS FOR AI TECH UI EXPERIENCE
    if (window.gsap) {
      if (text === "<em>Digitando...</em>") {
        bubble.classList.add("tutor-mock-msg", "ai");
        gsap.fromTo(bubble, 
          { opacity: 0.3, backgroundColor: "rgba(121, 206, 210, 0.05)", x: -5, boxShadow: "0px 0px 5px rgba(121,206,210,0)" }, 
          { opacity: 1, x: 0, boxShadow: "0px 0px 15px rgba(121,206,210,0.4)", duration: 0.6, repeat: -1, yoyo: true, ease: "power2.inOut" }
        );
      } else if (sender === "ai") {
         gsap.fromTo(bubble,
           { opacity: 0, y: 15, scale: 0.95, borderLeft: "2px solid transparent" },
           { opacity: 1, y: 0, scale: 1, borderLeft: "2px solid var(--axion-cyan)", duration: 0.5, ease: "back.out(1.2)" }
         );
      } else if (sender === "user") {
         gsap.fromTo(bubble,
           { opacity: 0, y: 10, scale: 0.98 },
           { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" }
         );
      }
    } else {
      if (text === "<em>Digitando...</em>") {
        bubble.classList.add("tutor-mock-msg", "ai");
      }
    }
    
    // Rolagem automática
    container.scrollTop = container.scrollHeight;
  }

  // MOTOR SOCRÁTICO EM 6 NÍVEIS DE AJUDA DIDÁTICA (MOCK REALISTA)
  generateSocraticResponse(userQuery, helpLevel) {
    const step = this.activeSteps[this.currentStepIndex];
    if (!step || step.step_type !== "activity") {
      return "Estou à disposição para te ajudar nas etapas com exercícios e simulações. Prossiga para um desafio técnico!";
    }

    const actId = step.activity.id;

    // Respostas dinâmicas se houver dica cadastrada na atividade (do motor adaptativo)
    if (step.activity.hints && step.activity.hints.length >= 6) {
      return step.activity.hints[Math.min(6, helpLevel) - 1];
    }

    // Respostas focadas em Álgebra Linear - Exercício 1
    if (actId === "a_alg_1") {
      const levels = [
        "**Nível 1 (Pergunta Orientadora):** Dê uma olhada na representação do vetor. O que a seta indica quando ela fica mais longa ou mais curta?",
        "**Nível 2 (Dica):** A magnitude do vetor é a sua intensidade ou valor físico bruto.",
        "**Nível 3 (Conceito):** Em álgebra linear, a magnitude (comprimento) do vetor expressa o módulo da grandeza (ex: Força em Newtons).",
        "**Nível 4 (Analogia):** Se você empurra uma caixa com mais força, a seta que desenha essa força precisa ser maior ou menor?",
        "**Nível 5 (Guia):** A magnitude reflete a força física direta. Logo, se aumentamos o comprimento gráfico da seta...",
        "**Nível 6 (Solução):** A resposta correta é **Aumentamos a intensidade da força aplicada no ponto**."
      ];
      return levels[Math.min(6, helpLevel) - 1];
    }

    // Respostas focadas em Álgebra Linear - Exercício 2
    if (actId === "a_alg_2") {
      const levels = [
        "**Nível 1 (Pergunta Orientadora):** Como somamos dois vetores coordenados: V_A = [3, 4] e V_B = [5, 2]?",
        "**Nível 2 (Dica):** A soma de vetores é feita somando as componentes correspondentes: X_A + X_B para horizontal, e Y_A + Y_B para vertical.",
        "**Nível 3 (Conceito):** A componente horizontal é a coordenada X (o primeiro valor do vetor).",
        "**Nível 4 (Analogia):** Se andamos 3 metros para leste e depois mais 5 metros para leste, qual a distância horizontal total?",
        "**Nível 5 (Guia):** Some a componente X de V_A (3) com a componente X de V_B (5).",
        "**Nível 6 (Solução):** A resposta correta é **8**."
      ];
      return levels[Math.min(6, helpLevel) - 1];
    }

    // Respostas focadas em Álgebra Linear - Exercício 3
    if (actId === "a_alg_3") {
      const levels = [
        "**Nível 1 (Pergunta Orientadora):** Como a multiplicação por um escalar (como k = 0.5) altera as componentes de um vetor?",
        "**Nível 2 (Dica):** Multiplicar por escalar significa multiplicar cada componente (X e Y) individualmente pelo valor.",
        "**Nível 3 (Conceito):** k * [x, y] = [k * x, k * y]. Se k = 0.5, multiplicamos cada valor por 0.5 (ou dividimos por 2).",
        "**Nível 4 (Analogia):** Se você reduzir todas as receitas da fábrica pela metade, a quantidade de farinha e a quantidade de água caem pela metade?",
        "**Nível 5 (Guia):** Multiplique 10 por 0.5 e 20 por 0.5.",
        "**Nível 6 (Solução):** A resposta correta é **O vetor resultante é [5, 10]**."
      ];
      return levels[Math.min(6, helpLevel) - 1];
    }

    // Respostas focadas em AMD - Exercício 1
    if (actId === "a_amd_1") {
      const levels = [
        "**Nível 1 (Pergunta Orientadora):** O que representam as opções de escolha que estamos avaliando no modelo?",
        "**Nível 2 (Dica):** Cidades, fornecedores ou equipamentos candidatos são as opções finais de escolha.",
        "**Nível 3 (Conceito):** No AMD, as opções que concorrem entre si chamam-se Alternativas. Os fatores de julgamento chamam-se Critérios.",
        "**Nível 4 (Analogia):** Ao escolher um celular, iPhone e Galaxy são os candidatos (alternativas). Custo e bateria são os critérios.",
        "**Nível 5 (Guia):** Cidade A e Cidade B são os locais sob escolha final.",
        "**Nível 6 (Solução):** A resposta correta é **Alternativas do problema**."
      ];
      return levels[Math.min(6, helpLevel) - 1];
    }

    // Respostas focadas em AMD - Exercício 2
    if (actId === "a_amd_2") {
      const levels = [
        "**Nível 1 (Pergunta Orientadora):** Como calculamos a nota final ponderada de um fornecedor?",
        "**Nível 2 (Dica):** Multiplicamos cada nota pelo seu peso correspondente e somamos tudo.",
        "**Nível 3 (Conceito):** Nota Ponderada = Nota Preço * Peso Preço + Nota Qualidade * Peso Qualidade.",
        "**Nível 4 (Analogia):** Se uma prova vale peso 4 e outra vale peso 6, e você tirou 10 na primeira e 5 na segunda, qual a sua média final?",
        "**Nível 5 (Guia):** Faça 10 * 0.4 + 5 * 0.6.",
        "**Nível 6 (Solução):** A resposta correta é **7.0**."
      ];
      return levels[Math.min(6, helpLevel) - 1];
    }

    // Respostas focadas em AMD - Exercício 3
    if (actId === "a_amd_3") {
      const levels = [
        "**Nível 1 (Pergunta Orientadora):** Um modelo matemático pode escolher perfeitamente sozinho sem intervenção de preferências?",
        "**Nível 2 (Dica):** Os pesos atribuídos a custo e qualidade são sempre objetivos ou dependem da estratégia do decisor?",
        "**Nível 3 (Conceito):** Decisões multicritério dependem de subjetividades, pesos de valor estratégico e critérios escolhidos pelas partes interessadas.",
        "**Nível 4 (Analogia):** Para quem quer economizar, o mais barato é o melhor. Para quem preza qualidade, o melhor é o durável. Existe um celular ideal absoluto para todo mundo?",
        "**Nível 5 (Guia):** Os pesos e preferências subjetivas moldam os rankings gerados pelos métodos de AMD.",
        "**Nível 6 (Solução):** A resposta correta é **Porque o resultado depende de pesos subjetivos e critérios escolhidos**."
      ];
      return levels[Math.min(6, helpLevel) - 1];
    }

    // Respostas focadas em Cálculo Numérico - Exercício 1
    if (actId === "a_num_1") {
      const levels = [
        "**Nível 1 (Pergunta Orientadora):** O que o erro relativo considera que o erro absoluto ignora?",
        "**Nível 2 (Dica):** O erro absoluto mede apenas o desvio bruto. Como sabemos se esse desvio é insignificante ou catastrófico?",
        "**Nível 3 (Conceito):** O erro relativo normaliza o erro absoluto dividindo-o pelo valor real (frequentemente expresso em percentual).",
        "**Nível 4 (Analogia):** Errar 1 cm ao medir a altura de uma pessoa é aceitável, mas errar 1 cm ao medir o diâmetro de um chip é catastrófico. Por que a escala importa?",
        "**Nível 5 (Guia):** O erro relativo expressa o tamanho do desvio comparado ao tamanho do objeto medido.",
        "**Nível 6 (Solução):** A resposta correta é **O absoluto é o desvio bruto, o relativo é o desvio dividido pelo valor real**."
      ];
      return levels[Math.min(6, helpLevel) - 1];
    }

    // Respostas focadas em Cálculo Numérico - Exercício 2
    if (actId === "a_num_2") {
      const levels = [
        "**Nível 1 (Pergunta Orientadora):** Como definimos matematicamente o erro absoluto?",
        "**Nível 2 (Dica):** O erro absoluto é a diferença absoluta (módulo) entre o valor real e o aproximado.",
        "**Nível 3 (Conceito):** Erro Absoluto = |Valor Real - Valor Aproximado|.",
        "**Nível 4 (Analogia):** Se uma régua marca 10 cm, mas o tamanho real é 9.8 cm, de quanto foi o desvio bruto?",
        "**Nível 5 (Guia):** Subtraia 4.8 de 5.0.",
        "**Nível 6 (Solução):** A resposta correta é **0.2**."
      ];
      return levels[Math.min(6, helpLevel) - 1];
    }

    // Respostas focadas em Cálculo Numérico - Exercício 3
    if (actId === "a_num_3") {
      const levels = [
        "**Nível 1 (Pergunta Orientadora):** Por que interrompemos os cálculos em séries matemáticas ou laços de repetição?",
        "**Nível 2 (Dica):** Um computador pode executar uma soma infinita de termos ou precisa parar em algum momento?",
        "**Nível 3 (Conceito):** Erro de truncamento decorre de aproximar uma série infinita parando após um número finito de iterações.",
        "**Nível 4 (Analogia):** Se para calcular o valor de pi você somar apenas os primeiros 5 termos da série, você truncou o cálculo.",
        "**Nível 5 (Guia):** Interromper laços infinitos gera erro de truncamento.",
        "**Nível 6 (Solução):** A resposta correta é **Parar um processo de cálculo infinito após um número finito de passos**."
      ];
      return levels[Math.min(6, helpLevel) - 1];
    }

    // Respostas focadas em Ciência dos Materiais - Exercício 1
    if (actId === "a_mat_1") {
      const levels = [
        "**Nível 1 (Pergunta Orientadora):** Qual o tipo de ligação atômica onde os elétrons fluem livremente?",
        "**Nível 2 (Dica):** Metais são conhecidos por conduzir eletricidade e calor por conta dos elétrons livres.",
        "**Nível 3 (Conceito):** Na ligação metálica, os elétrons de valência formam uma nuvem deslocalizada compartilhada por todos os átomos.",
        "**Nível 4 (Analogia):** Imagine um 'mar de elétrons' fluindo livremente entre ilhas de núcleos atômicos carregados positivamente.",
        "**Nível 5 (Guia):** Esta nuvem de elétrons livres é característica de qual ligação?",
        "**Nível 6 (Solução):** A resposta correta é **Ligação metálica**."
      ];
      return levels[Math.min(6, helpLevel) - 1];
    }

    // Respostas focadas em Ciência dos Materiais - Exercício 2
    if (actId === "a_mat_2") {
      const levels = [
        "**Nível 1 (Pergunta Orientadora):** Como se calcula a tensão mecânica?",
        "**Nível 2 (Dica):** Tensão é a razão entre a força aplicada e a área da seção transversal: Tensão = Força / Área.",
        "**Nível 3 (Conceito):** 500 N / 10 mm² = 50 N/mm². E 1 N/mm² equivale exatamente a 1 MPa.",
        "**Nível 4 (Analogia):** Se você distribui o peso de um objeto em uma área maior, a pressão sobre cada ponto diminui.",
        "**Nível 5 (Guia):** Divida a força de 500 N pela área de 10 mm².",
        "**Nível 6 (Solução):** A resposta correta é **50**."
      ];
      return levels[Math.min(6, helpLevel) - 1];
    }

    // Respostas focadas em Ciência dos Materiais - Exercício 3
    if (actId === "a_mat_3") {
      const levels = [
        "**Nível 1 (Pergunta Orientadora):** O que acontece quando puxamos uma mola e ela não volta mais ao tamanho original?",
        "**Nível 2 (Dica):** A deformação reversível é elástica. A deformação permanente é plástica. Como se chama a tensão limite?",
        "**Nível 3 (Conceito):** O limite de escoamento é o limiar de transição entre o comportamento elástico e o plástico.",
        "**Nível 4 (Analogia):** Um clipe de papel se dobra um pouco e volta (elástico), mas se puxar muito, ele deforma permanentemente (escoamento).",
        "**Nível 5 (Guia):** A transição de comportamento marca o escoamento.",
        "**Nível 6 (Solução):** A resposta correta é **Limite de escoamento**."
      ];
      return levels[Math.min(6, helpLevel) - 1];
    }

    return "Estou analisando seu progresso. Faça sua pergunta e tentarei guiar seu raciocínio.";
  }

  // ============================================================================
  // GERENCIAR CHAT IA COMPLETO (TELA EXCLUSIVA DO TUTOR IA)
  // ============================================================================
  async initFullScreenProfessorChat() {
    const messagesContainer = document.getElementById("tutor-full-messages");
    messagesContainer.innerHTML = "";

    // Carregar habilidades aprendidas do usuário na lateral esquerda como memória
    const progress = await window.Tracker.getStudentProgress();
    const skillsList = document.getElementById("ai-memory-skills-list");
    skillsList.innerHTML = "";

    if (progress.skills && progress.skills.length > 0) {
      progress.skills.forEach(s => {
        const item = document.createElement("div");
        item.style.backgroundColor = "var(--bg-surface)";
        item.style.border = "1px solid var(--border-color)";
        item.style.padding = "8px 12px";
        item.style.borderRadius = "var(--radius-sm)";
        item.style.fontSize = "11px";
        item.innerHTML = `
          <div style="font-weight:700;">${s.name}</div>
          <div style="color:var(--text-secondary); margin-top:2px;">Domínio: ${s.mastery_score}% | Confiança: ${s.confidence_score}%</div>
        `;
        skillsList.appendChild(item);
      });
    } else {
      skillsList.innerHTML = `<p style="font-size:11px; color:var(--text-muted);">Complete lições para alimentar a memória do Professor.</p>`;
    }

    this.addAiMessage(
      messagesContainer,
      "Olá! Sou o seu Professor de Engenharia. No que posso te guiar hoje? Você pode tirar dúvidas sobre **Álgebra Linear**, **Auxílio Multicritério à Decisão (AMD)**, **Cálculo Numérico** ou **Ciência dos Materiais**.",
      "ai"
    );
  }

  submitProfessorFullMessage() {
    const input = document.getElementById("tutor-full-input-field");
    const text = input.value.trim();
    if (!text) return;

    const messagesContainer = document.getElementById("tutor-full-messages");
    this.addAiMessage(messagesContainer, text, "user");
    input.value = "";

    // Workspace NLP Interpreter
    if (window.AxionWorkspace) {
      const nlpResponse = window.AxionWorkspace.tryHandleCommand(text);
      if (nlpResponse) {
        setTimeout(() => {
          this.addAiMessage(messagesContainer, nlpResponse, "ai");
        }, 500);
        return;
      }
    }

    // IA responde baseada na API real
    this.addAiMessage(messagesContainer, "<em>Digitando...</em>", "ai");
    if (window.sendAIProfessorMessage) {
      window.sendAIProfessorMessage(text, false).then(response => {
        const msgs = messagesContainer.querySelectorAll('.tutor-mock-msg.ai');
        if (msgs.length > 0) msgs[msgs.length - 1].remove(); // remove typing
        this.addAiMessage(messagesContainer, response, "ai");
      });
    }
  }

  askProfessorFullSocratic(query) {
    const messagesContainer = document.getElementById("tutor-full-messages");
    this.addAiMessage(messagesContainer, query, "user");

    this.addAiMessage(messagesContainer, "<em>Digitando...</em>", "ai");
    if (window.sendAIProfessorMessage) {
      window.sendAIProfessorMessage(query, false).then(response => {
        const msgs = messagesContainer.querySelectorAll('.tutor-mock-msg.ai');
        if (msgs.length > 0) msgs[msgs.length - 1].remove(); // remove typing
        this.addAiMessage(messagesContainer, response, "ai");
      });
    }
  }

  // Respostas gerais socráticas baseadas em termos-chave para o Chat principal
  generateGeneralSocraticResponse(query) {
    const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // === ÁLGEBRA LINEAR ===
    if (q.includes("vetor") && (q.includes("o que") || q.includes("explique") || q.includes("como") || q.includes("grandeza"))) {
      return "**Vetor** é uma grandeza matemática que possui magnitude (tamanho), direção e sentido — ao contrário de um escalar, que tem apenas valor.\n\nPense em uma força de vento: ela não é só \"50 km/h\", ela vai para **noroeste** com aquela intensidade. Isso é um vetor.\n\nGraficamente, um vetor **v = [x, y]** é representado por uma seta: o comprimento da seta indica a magnitude, e a seta aponta para a direção.\n\n**Pergunta socrática:** Se você tem dois vetores de produção V_A = [3, 5] (peças/hora em dois turnos) e V_B = [2, 4], o que o vetor resultante V_A + V_B representa fisicamente?";
    }

    if (q.includes("vetor") || q.includes("algebra") || q.includes("matriz") || q.includes("sistema linear") || q.includes("determinante")) {
      return "Na **Álgebra Linear**, estruturamos dados em vetores e matrizes para transformá-los de forma coordenada.\n\nVetores representam grandezas com magnitude e direção. Matrizes representam relações entre múltiplas variáveis simultaneamente.\n\n**Pergunta socrática:** Se a produção da Máquina A gera [10, 20] unidades dos Produtos 1 e 2, e a Máquina B gera [5, 15], como você representaria a produção combinada de um turno completo? Como isso se parece em notação matricial?";
    }

    // === AMD / MULTICRITÉRIO ===
    if (q.includes("ahp") || q.includes("método ahp") || q.includes("comparar alternativas") || q.includes("saaty")) {
      return "**O método AHP (Analytic Hierarchy Process)** de Saaty funciona com comparações par a par.\n\nVocê compara cada critério com cada outro usando a **Escala de Saaty** (1 a 9):\n- 1 = igualmente importante\n- 3 = levemente superior\n- 5 = claramente superior\n- 9 = extremamente superior\n\nDepois normaliza a matriz e calcula os pesos. A **Razão de Consistência (RC)** verifica se suas comparações são coerentes (RC < 0.10 é aceitável).\n\n**Pergunta socrática:** Se você diz que \"qualidade é 3x mais importante que preço\", mas também que \"preço é 2x mais importante que prazo\" e \"qualidade é 6x mais importante que prazo\"... essas três afirmações são matematicamente consistentes entre si?";
    }

    if (q.includes("topsis") || q.includes("solucao ideal") || q.includes("distancia euclidiana")) {
      return "**TOPSIS** (Technique for Order of Preference by Similarity to Ideal Solution) classifica alternativas pela sua **proximidade à solução ideal positiva** e **afastamento da solução anti-ideal**.\n\nO coeficiente C_i* = d_i⁻ / (d_i⁺ + d_i⁻) varia de 0 a 1. Quanto mais próximo de 1, melhor a alternativa.\n\n**Pergunta socrática:** Imagine dois fornecedores onde o Fornecedor A está perto da solução ideal, mas também perto da anti-ideal. O Fornecedor B está equidistante de ambas. Qual você escolheria pelo TOPSIS, e por quê?";
    }

    if (q.includes("decisao") || q.includes("decisão") || q.includes("multicriterio") || q.includes("multicritério") || q.includes("amd") || q.includes("fornecedor") || q.includes("alternativa") || q.includes("criterio") || q.includes("critério")) {
      return "O **Auxílio Multicritério à Decisão (AMD)** lida com compromissos conflitantes (trade-offs). Quando escolhemos um fornecedor, raramente uma única opção é melhor em tudo.\n\nO AMD estrutura o problema em:\n- **Alternativas**: as opções candidatas (ex: Fornecedor A, B, C)\n- **Critérios**: os fatores de avaliação (ex: custo, qualidade, prazo)\n- **Pesos**: a importância relativa de cada critério\n\n**Pergunta socrática:** Se para uma empresa de medicina o critério de \"confiabilidade\" tem peso 50% e \"custo\" apenas 20%, e para uma startup de varejo esses pesos se invertem — o mesmo fornecedor será sempre o escolhido em ambos os casos?";
    }

    // === CÁLCULO NUMÉRICO ===
    if (q.includes("erro absoluto") || q.includes("erro relativo") || q.includes("numericos") || q.includes("numérico") || q.includes("casas decimais") || q.includes("arredondamento") || q.includes("truncamento")) {
      return "**Erro Absoluto** = |Valor Real - Valor Aproximado|\n**Erro Relativo** = Erro Absoluto / |Valor Real| × 100%\n\nO erro relativo é mais informativo porque **contextualiza o erro**. Um erro de 1 cm ao medir o comprimento de um campo de futebol é insignificante. O mesmo erro de 1 cm ao medir o diâmetro de um transistor é catastrófico.\n\nO **truncamento** ocorre quando paramos um processo de cálculo infinito (ex: série de Taylor) antes da convergência total.\n\n**Pergunta socrática:** Um sensor mediu a temperatura de um forno como 482.3°C, mas o valor real é 480.0°C. O erro relativo percentual é aceitável para um processo que tolera variações de ±2%?";
    }

    if (q.includes("bissecao") || q.includes("bisseção") || q.includes("newton") || q.includes("raiz") || q.includes("zeros de funcao")) {
      return "O **Método da Bisseção** encontra raízes de f(x) = 0 dividindo o intervalo [a, b] ao meio iterativamente.\n\nConverge garantidamente (se f(a) e f(b) têm sinais opostos), mas é **lento** — cada iteração reduz o erro pela metade.\n\nO **Newton-Raphson** converge muito mais rápido usando a tangente da curva:\n`x_{n+1} = x_n - f(x_n) / f'(x_n)`\n\nMas pode divergir se a derivada for zero ou o chute inicial for ruim.\n\n**Pergunta socrática:** Se você usa bisseção no intervalo [1, 3] e após 10 iterações o intervalo tem tamanho 2/1024 ≈ 0.002, quantas iterações seriam necessárias para atingir erro < 0.0001?";
    }

    if (q.includes("calculo numerico") || q.includes("cálculo numérico") || q.includes("aproximacao") || q.includes("iterativo") || q.includes("convergencia") || q.includes("convergência")) {
      return "No **Cálculo Numérico**, os erros de arredondamento e truncamento são inevitáveis — computadores trabalham com representação finita de números reais.\n\nO **IEEE 754** (padrão de ponto flutuante 64 bits) oferece ~15-17 dígitos significativos de precisão. O valor de 1/3 = 0.333... nunca pode ser exatamente armazenado.\n\n**Pergunta socrática:** Se calculamos a soma 0.1 + 0.2 em Python, o resultado é 0.30000000000000004 em vez de 0.3. Como isso pode afetar um sistema de controle industrial que atualiza a posição de um robô 1000 vezes por segundo?";
    }

    // === CIÊNCIA DOS MATERIAIS ===
    if (q.includes("limite de escoamento") || q.includes("escoamento") || q.includes("ensaio de tracão") || q.includes("ensaio de tração") || q.includes("tensao") || q.includes("tensão") || q.includes("deformacao") || q.includes("deformação")) {
      return "No **Ensaio de Tração**, medimos a resposta do material a uma força crescente.\n\nA **curva Tensão-Deformação** tem fases:\n1. **Região Elástica**: σ ∝ ε (Lei de Hooke). O material volta ao tamanho original ao retirar a força.\n2. **Limite de Escoamento (σ_y)**: ponto onde a deformação se torna permanente (plástica).\n3. **Região Plástica**: o material \"flui\" e endurece por trabalho mecânico.\n4. **Resistência à Tração (σ_UTS)**: tensão máxima suportada.\n5. **Fratura**: ruptura do corpo de prova.\n\n**Pergunta socrática:** Por que uma viga de aço estrutural usada em uma ponte deve operar **sempre abaixo do limite de escoamento**, mesmo que o material suporte tensões maiores sem romper imediatamente?";
    }

    if (q.includes("ligacao metalica") || q.includes("ligação metálica") || q.includes("ligacao covalente") || q.includes("ligação covalente") || q.includes("ligacao ionica") || q.includes("atomica") || q.includes("atômica") || q.includes("elétron")) {
      return "As **Ligações Atômicas Primárias** determinam as propriedades dos materiais:\n\n- **Metálica**: elétrons de valência deslocalizados (\"mar de elétrons\") → condutividade elétrica/térmica, maleabilidade, opacidade.\n- **Iônica**: transferência de elétrons entre cátion e ânion → alta dureza, frágeis, cerâmicas e óxidos.\n- **Covalente**: compartilhamento de pares de elétrons → muito dura (diamante) ou muito específica (polímeros).\n\n**Pergunta socrática:** Se o cobre (Cu) é excelente condutor elétrico por causa de seus elétrons livres, por que o diamante (carbono covalente) é um dos melhores condutores **térmicos** do mundo, mesmo sem elétrons livres?";
    }

    if (q.includes("material") || q.includes("frágil") || q.includes("fragil") || q.includes("dútil") || q.includes("dutil") || q.includes("ceramica") || q.includes("liga metalica") || q.includes("tratamento termico") || q.includes("cristalino")) {
      return "Na **Ciência dos Materiais**, a estrutura atômica e cristalina determina todas as propriedades macroscópicas.\n\nMateriais **dúcteis** (ex: aço, alumínio) deformam plasticamente antes de romper — são tolerantes a sobrecargas. Materiais **frágeis** (ex: cerâmica, vidro) rompem abruptamente sem escoamento — são perigosos sob tensão.\n\nA escolha do material depende da aplicação: um implante ósseo precisa de biocompatibilidade + resistência à fadiga. Uma hélice de avião precisa de rigidez + leveza.\n\n**Pergunta socrática:** Por que um capacete de ciclismo tem uma casca de policarbonato (duro) por fora e espuma EPS (absorvedora de energia) por dentro, em vez de ser sólido de um único material?";
    }

    // FALLBACK SOCRÁTICO GERAL
    return "**Boa pergunta para um engenheiro!** Na engenharia, antes de resolver, precisamos estruturar o problema:\n\n1. **Quais são as variáveis?** (o que muda, o que é constante)\n2. **Qual a relação matemática** entre elas?\n3. **Quais são as restrições** e o domínio válido?\n\nEsses 4 cursos — Álgebra Linear, AMD, Cálculo Numérico e Ciência dos Materiais — dão ferramentas complementares para responder esse tipo de pergunta com rigor.\n\nPoderia reformular sua dúvida indicando **qual disciplina** ela está mais relacionada? Assim posso guiar seu raciocínio de forma mais direcionada.";
  }

  // ============================================================================
  // CARREGAR TELA DE PERFIL DE PROGRESSO REFATORADA
  // ============================================================================
  async loadProfileData() {
    try {
      const user = window.Auth.getCurrentUser();
      if (!user) return;

      { const _el = document.getElementById('profile-name'); if (_el) _el.textContent = user.name; }
      { const _el = document.getElementById('profile-email'); if (_el) _el.textContent = user.email; }

      const progress = await window.Tracker.getStudentProgress();

      { const _el = document.getElementById('profile-score-val'); if (_el) _el.textContent = `${progress.score} XP`; }
      { const _el = document.getElementById('profile-completed-lessons-val'); if (_el) _el.textContent = progress.completed_lessons_count; }
      { const _el = document.getElementById('profile-track-percentage-val'); if (_el) _el.textContent = `${Math.round(progress.track_percentage)}%`; }
      document.getElementById("profile-track-progress-bar").style.width = `${progress.track_percentage}%`;

      // Renderizar matriz de competências
      const skillsContainer = document.getElementById("profile-skills-list-dom");
      skillsContainer.innerHTML = "";

      progress.skills.forEach(s => {
        const item = document.createElement("div");
        item.className = "subject-item";
        item.innerHTML = `
          <div class="subject-meta">
            <span>${s.name} (${s.category === 'algebra_linear' ? 'Álgebra' : (s.category === 'amd' ? 'AMD' : (s.category === 'calculo_numerico' ? 'Cálculo' : 'Materiais'))})</span>
            <span>Domínio: ${s.mastery_score}%</span>
          </div>
          <div class="subject-bar">
            <div class="subject-fill" style="width: ${s.mastery_score}%; background-color: var(--primary);"></div>
          </div>
        `;
        skillsContainer.appendChild(item);
      });

      // Renderizar tabela de histórico de tentativas
      const rowsContainer = document.getElementById("attempts-history-rows");
      rowsContainer.innerHTML = "";

      if (progress.attempts && progress.attempts.length > 0) {
        progress.attempts.forEach(att => {
          const tr = document.createElement("tr");
          const dateFormatted = new Date(att.created_at).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
          });

          tr.innerHTML = `
            <td>${att.statement.substring(0, 48)}${att.statement.length > 48 ? '...' : ''}</td>
            <td>
              <span class="status-tag ${att.is_correct ? 'tag-correct' : 'tag-incorrect'}">
                ${att.is_correct ? 'Correto' : 'Incorreto'}
              </span>
            </td>
            <td style="font-weight: 700; color: ${att.points_earned > 0 ? 'var(--success)' : 'var(--text-muted)'}">
              +${att.points_earned} XP
            </td>
            <td style="color: var(--text-muted); font-size: 11px;">${dateFormatted}</td>
          `;
          rowsContainer.appendChild(tr);
        });
      } else {
        rowsContainer.innerHTML = `
          <tr>
            <td colspan="4" style="text-align: center; color: var(--text-secondary); padding: 16px;">Complete sua primeira aula para registrar submissões!</td>
          </tr>
        `;
      }

    } catch (e) {
      console.error("[Profile] Erro ao carregar dados:", e);
    }
  }

  // Parser simples de Markdown para HTML
  parseMarkdown(text) {
    if (!text) return "";
    if (typeof marked !== "undefined") {
      return marked.parse(text);
    }
    // Fallback if marked is somehow missing
    let html = text;
    html = html.replace(/\n/g, "<br>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(/### (.*?)($|<br>)/g, "<h3>$1</h3>");
    html = html.replace(/## (.*?)($|<br>)/g, "<h2>$1</h2>");
    html = html.replace(/# (.*?)($|<br>)/g, "<h1>$1</h1>");
    return html;
  }
}

// Inicializa
window.App = new App();
window.addEventListener("DOMContentLoaded", () => {
  if (!window.IS_TEST_ENV) {
    window.App.init();
  }

  // Lógica da Trilha Dinâmica
  const btnGenerateTrack = document.getElementById("btn-generate-track");
  const inputTrack = document.getElementById("input-dynamic-track");
  const resultsContainer = document.getElementById("dynamic-track-results");

  if (btnGenerateTrack && inputTrack && resultsContainer) {
    btnGenerateTrack.addEventListener("click", async () => {
      const topic = inputTrack.value.trim();
      if (!topic) return;

      btnGenerateTrack.textContent = "Gerando...";
      btnGenerateTrack.disabled = true;
      resultsContainer.style.display = "flex";
      resultsContainer.innerHTML = '<div style="font-size:12px; color:var(--text-secondary);">Analisando conhecimentos e estruturando tópicos...</div>';

      try {
        const response = await fetch(`http://${window.location.hostname}:8000/generate-track`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic })
        });

        if (response.ok) {
          const data = await response.json();
          const trackTopics = data.track || [];
          
          resultsContainer.innerHTML = '<h4 style="font-size: 13px; font-weight: 700; color: var(--primary); margin-bottom: 4px;">Tópicos Recomendados:</h4>';
          
          trackTopics.forEach((item, index) => {
            const card = document.createElement('div');
            card.style.cssText = 'background: var(--bg-secondary); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 12px; display: flex; gap: 12px; align-items: flex-start;';
            card.innerHTML = `
              <div style="width: 24px; height: 24px; background: rgba(121, 206, 210, 0.1); color: var(--accent-cyan); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; flex-shrink: 0;">
                ${index + 1}
              </div>
              <div>
                <strong style="font-size: 13px; color: var(--text-primary); display: block; margin-bottom: 2px;">${item.title || "Tópico"}</strong>
                <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.4;">${item.description || ""}</p>
              </div>
            `;
            resultsContainer.appendChild(card);
          });
        } else {
          resultsContainer.innerHTML = '<div style="color:var(--error); font-size:12px;">Falha ao gerar trilha. Tente outro tópico.</div>';
        }
      } catch (err) {
        console.error("Erro na trilha dinâmica:", err);
        resultsContainer.innerHTML = '<div style="color:var(--error); font-size:12px;">Erro de conexão ao gerar a trilha.</div>';
      } finally {
        btnGenerateTrack.textContent = "Gerar";
        btnGenerateTrack.disabled = false;
      }
    });
  }
});

