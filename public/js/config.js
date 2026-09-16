// ============================================================================
// CONFIGURAÇÕES DA API (banco único: PostgreSQL local solda_inspecao)
// ============================================================================

// Modo Local: quando true, tudo é salvo em localStorage (sem backend/banco).
// Serve de fallback offline caso o backend/Postgres estejam fora do ar.
const isDemoMode = false;

// Backend FastAPI local, que fala com o PostgreSQL solda_inspecao.
const API_URL = `http://${window.location.hostname}:8000`;

console.log(`[Axion Config] API Local: ${API_URL}`);

// Exportar globalmente
window.CONFIG = {
  isDemoMode,
  API_URL
};
