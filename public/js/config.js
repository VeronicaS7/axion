// ============================================================================
// CONFIGURAÇÕES DA API (banco único: PostgreSQL local solda_inspecao)
// ============================================================================

// Modo Local: quando true, tudo é salvo em localStorage (sem backend/banco).
// Serve de fallback offline caso o backend/Postgres estejam fora do ar.
let isDemoMode = false;

// Configuração dinâmica da API
let API_URL = `http://${window.location.hostname}:8000`;

// Se não estiver rodando localmente (ex: na Vercel), aponta para o backend do Render
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
  // ATENÇÃO: Substitua a URL abaixo pela URL real do seu backend no Render
  // ou pela URL do seu túnel ngrok (se for hospedar localmente temporariamente).
  API_URL = `https://axion-api-s9ia.onrender.com`;
}

console.log(`[Axion Config] API Local: ${API_URL}`);

// Exportar globalmente
window.CONFIG = {
  isDemoMode,
  API_URL
};
