// ============================================================================
// GERENCIADOR DE AUTENTICAÇÃO (AUTH.JS)
// Fala com o backend FastAPI local (API_URL), que por sua vez fala com o
// PostgreSQL solda_inspecao. Sem Supabase: sessão = token JWT em localStorage.
// ============================================================================

const AXION_TOKEN_KEY = "axion_token";

async function axionApiRequest(path, options = {}) {
  const token = localStorage.getItem(AXION_TOKEN_KEY);
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(`${window.CONFIG.API_URL}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || "Não conseguimos conectar à Axion agora.");
  }
  return data;
}

class AuthManager {
  constructor() {
    this.currentUser = null;
    this.onSessionChangedCallback = null;
  }

  // Inicializa a escuta de sessão
  async init(onSessionChanged) {
    this.onSessionChangedCallback = onSessionChanged;

    if (window.CONFIG.isDemoMode) {
      // Carrega sessão emulada do localStorage
      const cached = localStorage.getItem("axion_demo_user");
      if (cached) {
        try {
          this.currentUser = JSON.parse(cached);
          console.log("[Auth] Sessão demo recuperada para:", this.currentUser.email);
        } catch (e) {
          localStorage.removeItem("axion_demo_user");
        }
      }
      if (this.onSessionChangedCallback) {
        this.onSessionChangedCallback("INITIAL_SESSION", this.currentUser ? { user: this.currentUser } : null, this.currentUser);
      }
    } else {
      // Restaura sessão a partir do token JWT salvo (se ainda for válido)
      const token = localStorage.getItem(AXION_TOKEN_KEY);
      if (token) {
        try {
          this.currentUser = await axionApiRequest("/api/auth/me");
        } catch (err) {
          console.warn("[Auth] Token inválido/expirado, encerrando sessão local.", err);
          localStorage.removeItem(AXION_TOKEN_KEY);
          this.currentUser = null;
        }
      }
      if (this.onSessionChangedCallback) {
        this.onSessionChangedCallback(
          "INITIAL_SESSION",
          this.currentUser ? { user: this.currentUser } : null,
          this.currentUser
        );
      }
    }
  }

  // Cadastro de Novo Usuário
  async signUp(name, email, password) {
    if (window.CONFIG.isDemoMode) {
      // Simulando cadastro no localStorage
      const usersKey = "axion_demo_registered_users";
      let users = JSON.parse(localStorage.getItem(usersKey) || "[]");

      if (users.find(u => u.email === email)) {
        throw new Error("Este e-mail já está cadastrado.");
      }

      const newId = this._generateUUID();
      const newUser = { id: newId, name, email, password, avatar_url: null };
      users.push(newUser);
      localStorage.setItem(usersKey, JSON.stringify(users));

      // Efetua login automático
      this.currentUser = { id: newId, name, email, avatar_url: null };
      localStorage.setItem("axion_demo_user", JSON.stringify(this.currentUser));

      // Inicializar progresso demo padrão para este usuário
      this._initializeDemoProgress(newId);

      if (this.onSessionChangedCallback) {
        this.onSessionChangedCallback("SIGNED_IN", { user: this.currentUser }, this.currentUser);
      }
      return this.currentUser;
    } else {
      const data = await axionApiRequest("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
      });
      localStorage.setItem(AXION_TOKEN_KEY, data.token);
      this.currentUser = data.user;
      if (this.onSessionChangedCallback) {
        this.onSessionChangedCallback("SIGNED_IN", { user: this.currentUser }, this.currentUser);
      }
      return this.currentUser;
    }
  }

  // Login
  async signIn(email, password) {
    if (window.CONFIG.isDemoMode) {
      const usersKey = "axion_demo_registered_users";
      const users = JSON.parse(localStorage.getItem(usersKey) || "[]");

      let user = users.find(u => u.email === email && u.password === password);
      if (!user) {
        console.warn("Usuário não encontrado, criando conta demo automaticamente para acesso.");
        user = {
          id: this._generateUUID(),
          name: "Estudante Visitante",
          email: email,
          password: password,
          avatar_url: null
        };
        users.push(user);
        localStorage.setItem(usersKey, JSON.stringify(users));
      }

      this.currentUser = { id: user.id, name: user.name, email: user.email, avatar_url: user.avatar_url };
      localStorage.setItem("axion_demo_user", JSON.stringify(this.currentUser));

      this._initializeDemoProgress(user.id);

      if (this.onSessionChangedCallback) {
        this.onSessionChangedCallback("SIGNED_IN", { user: this.currentUser }, this.currentUser);
      }
      return this.currentUser;
    } else {
      const data = await axionApiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem(AXION_TOKEN_KEY, data.token);
      this.currentUser = data.user;
      if (this.onSessionChangedCallback) {
        this.onSessionChangedCallback("SIGNED_IN", { user: this.currentUser }, this.currentUser);
      }
      return this.currentUser;
    }
  }

  // Logout
  async signOut() {
    if (window.CONFIG.isDemoMode) {
      this.currentUser = null;
      localStorage.removeItem("axion_demo_user");
      if (this.onSessionChangedCallback) {
        this.onSessionChangedCallback("SIGNED_OUT", null, null);
      }
    } else {
      try {
        await axionApiRequest("/api/auth/logout", { method: "POST" });
      } catch (err) {
        console.warn("[Auth] Logout falhou no backend, encerrando sessão local mesmo assim.", err);
      }
      localStorage.removeItem(AXION_TOKEN_KEY);
      this.currentUser = null;
      if (this.onSessionChangedCallback) {
        this.onSessionChangedCallback("SIGNED_OUT", null, null);
      }
    }
  }

  // Recuperação de Senha
  async resetPassword(email) {
    if (window.CONFIG.isDemoMode) {
      const usersKey = "axion_demo_registered_users";
      const users = JSON.parse(localStorage.getItem(usersKey) || "[]");
      const user = users.find(u => u.email === email);
      if (!user) {
        throw new Error("Este e-mail não está cadastrado em nosso sistema.");
      }
      // Apenas simula sucesso
      return true;
    } else {
      await axionApiRequest("/api/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
      });
      return true;
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  // Token JWT atual (para tracker.js montar o header Authorization)
  getToken() {
    return localStorage.getItem(AXION_TOKEN_KEY);
  }

  // Helpers auxiliares para Modo Demo
  _generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  _initializeDemoProgress(userId) {
    const progressKey = `axion_demo_progress_${userId}`;
    if (!localStorage.getItem(progressKey)) {
      // Inicia progresso zerado
      const defaultProgress = {
        score: 0,
        streak: 1,
        attempts: [], // Array de tentativas [{activity_id, is_correct, date}]
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
        track_percentage: 0
      };
      localStorage.setItem(progressKey, JSON.stringify(defaultProgress));
    }
  }
}

window.Auth = new AuthManager();
