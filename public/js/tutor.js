window.chatMessages = [];
window.lessonChatMessages = [];

window.sendAITutorMessage = async function(text, isContextual = false) {
    const history = isContextual ? window.lessonChatMessages : window.chatMessages;
    
    // Add user message to history
    history.push({ role: "user", content: text });
    
    try {
        let endpoint = `${window.CONFIG.API_URL}/chat`;
        let body = { messages: history };
        
        if (isContextual) {
            endpoint = `${window.CONFIG.API_URL}/chat/contextual`;
            body.lesson_context = "Aula de Cálculo Numérico: Erro Absoluto e Relativo.";
        }
        
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        
        if (response.ok) {
            const data = await response.json();
            const aiResponse = data.response;
            history.push({ role: "assistant", content: aiResponse });
            return aiResponse;
        } else {
            throw new Error("API Error");
        }
    } catch (error) {
        console.error(error);
        return "Desculpe, ocorreu um erro na comunicação. O backend está rodando?";
    }
};

window.fetchAiSummaryProgress = async function() {
    try {
        // Utiliza a API_URL global configurada no config.js
        const response = await fetch(`${window.CONFIG.API_URL}/ai-summary/progress`);
        if (response.ok) {
            const data = await response.json();
            return data.summary;
        }
    } catch (e) {
        console.error(e);
    }
    return "Continue estudando e praticando engenharia!";
};

document.addEventListener("DOMContentLoaded", async () => {
    // Carrega o progresso de summary na tela
    const summaryEl = document.getElementById("ai-progress-summary");
    if (summaryEl) {
        summaryEl.innerHTML = await window.fetchAiSummaryProgress();
    }
});
