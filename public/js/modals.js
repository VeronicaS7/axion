document.addEventListener("DOMContentLoaded", () => {
    
    const hintModal = document.getElementById("hint-modal");
    const teacherModal = document.getElementById("teacher-modal");
    const hintText = document.getElementById("hint-modal-text");
    const teacherText = document.getElementById("teacher-modal-text");
    
    // Close Modals
    document.getElementById("btn-close-hint")?.addEventListener("click", () => {
        hintModal.classList.remove("active");
    });
    document.getElementById("btn-close-teacher")?.addEventListener("click", () => {
        teacherModal.classList.remove("active");
    });
    
    // Close on overlay click
    window.addEventListener("click", (e) => {
        if (e.target === hintModal) hintModal.classList.remove("active");
        if (e.target === teacherModal) teacherModal.classList.remove("active");
    });

    // We need to attach event listeners to the dynamic buttons (Dica / Professor)
    // Using event delegation on the document body since they might be recreated
    document.body.addEventListener("click", (e) => {
        // Hint Button
        const btnHint = e.target.closest("#btn-lesson-hint");
        if (btnHint) {
            hintModal.classList.add("active");
            hintText.innerHTML = '<i data-lucide="loader" class="spin"></i> Gerando dica...';
            if (window.lucide) window.lucide.createIcons();
            
            const questionId = btnHint.dataset.questionId;
            if (!questionId) {
                hintText.innerHTML = "Revise o conceito apresentado nesta etapa da aula antes de responder novamente.";
                return;
            }
            
            fetch(`http://${window.location.hostname}:8000/api/lesson/hint`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question_id: questionId })
            })
            .then(r => r.json())
            .then(data => {
                hintText.innerHTML = data.hint || "Revise o conceito apresentado nesta etapa da aula antes de responder novamente.";
            })
            .catch(err => {
                console.error("Erro ao pedir dica:", err);
                hintText.innerHTML = "Revise o conceito apresentado nesta etapa da aula antes de responder novamente.";
            });
        }
        
        // Professor Button
        const btnTeacher = e.target.closest("#btn-open-lesson-tutor");
        if (btnTeacher) {
            teacherModal.classList.add("active");
            teacherText.innerHTML = '<i data-lucide="loader" class="spin"></i> O Professor está analisando sua resposta...';
            if (window.lucide) window.lucide.createIcons();
            
            const questionId = btnTeacher.dataset.questionId;
            const optionId = btnTeacher.dataset.optionId;
            
            if (!questionId || !optionId) {
                teacherText.innerHTML = "Por favor, responda a questão primeiro para que eu possa ajudá-lo com a explicação.";
                return;
            }
            
            fetch(`http://${window.location.hostname}:8000/api/lesson/teacher`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question_id: questionId, selected_option_id: optionId })
            })
            .then(r => r.json())
            .then(data => {
                teacherText.innerHTML = data.explanation || "Não tenho informação suficiente no material desta aula para explicar isso com segurança.";
            })
            .catch(err => {
                console.error("Erro ao contatar professor:", err);
                teacherText.innerHTML = "Não tenho informação suficiente no material desta aula para explicar isso com segurança.";
            });
        }
    });

});
