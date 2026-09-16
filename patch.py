import re

with open('public/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. replace submitTutorLessonMessage content
old_submit_lesson = """    // IA responde socraticamente baseada no contexto
    this.hintsUsedForCurrentStep++;
    const socraticAnswer = this.generateSocraticResponse(text, this.hintsUsedForCurrentStep);
    
    setTimeout(() => {
      this.addAiMessage(messagesContainer, socraticAnswer, "ai");
    }, 800);"""
    
new_submit_lesson = """    // IA responde baseada na API
    this.hintsUsedForCurrentStep++;
    this.addAiMessage(messagesContainer, "<em>Digitando...</em>", "ai");
    if (window.sendAITutorMessage) {
      window.sendAITutorMessage(text, true).then(response => {
        const msgs = messagesContainer.querySelectorAll('.tutor-mock-msg.ai');
        if (msgs.length > 0) msgs[msgs.length - 1].remove(); // remove typing
        this.addAiMessage(messagesContainer, response, "ai");
      });
    }"""
content = content.replace(old_submit_lesson, new_submit_lesson)

# 2. replace askTutorSocratic content
old_ask_lesson = """    this.hintsUsedForCurrentStep++;
    const response = this.generateSocraticResponse(query, this.hintsUsedForCurrentStep);

    setTimeout(() => {
      this.addAiMessage(messagesContainer, response, "ai");
    }, 700);"""

new_ask_lesson = """    this.hintsUsedForCurrentStep++;
    this.addAiMessage(messagesContainer, "<em>Digitando...</em>", "ai");
    if (window.sendAITutorMessage) {
      window.sendAITutorMessage(query, true).then(response => {
        const msgs = messagesContainer.querySelectorAll('.tutor-mock-msg.ai');
        if (msgs.length > 0) msgs[msgs.length - 1].remove(); // remove typing
        this.addAiMessage(messagesContainer, response, "ai");
      });
    }"""
content = content.replace(old_ask_lesson, new_ask_lesson)

# 3. replace submitTutorFullMessage
old_submit_full = """    // IA responde baseada em termos chaves para o chat geral
    const response = this.generateGeneralSocraticResponse(text);

    setTimeout(() => {
      this.addAiMessage(messagesContainer, response, "ai");
    }, 800);"""

new_submit_full = """    // IA responde baseada na API real
    this.addAiMessage(messagesContainer, "<em>Digitando...</em>", "ai");
    if (window.sendAITutorMessage) {
      window.sendAITutorMessage(text, false).then(response => {
        const msgs = messagesContainer.querySelectorAll('.tutor-mock-msg.ai');
        if (msgs.length > 0) msgs[msgs.length - 1].remove(); // remove typing
        this.addAiMessage(messagesContainer, response, "ai");
      });
    }"""
content = content.replace(old_submit_full, new_submit_full)

# 4. replace askTutorFullSocratic
old_ask_full = """    const response = this.generateGeneralSocraticResponse(query);

    setTimeout(() => {
      this.addAiMessage(messagesContainer, response, "ai");
    }, 700);"""

new_ask_full = """    this.addAiMessage(messagesContainer, "<em>Digitando...</em>", "ai");
    if (window.sendAITutorMessage) {
      window.sendAITutorMessage(query, false).then(response => {
        const msgs = messagesContainer.querySelectorAll('.tutor-mock-msg.ai');
        if (msgs.length > 0) msgs[msgs.length - 1].remove(); // remove typing
        this.addAiMessage(messagesContainer, response, "ai");
      });
    }"""
content = content.replace(old_ask_full, new_ask_full)

with open('public/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("done")
