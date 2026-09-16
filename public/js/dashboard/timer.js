// public/js/dashboard/timer.js
class AnalogTimer {
  constructor() {
    this.digitalDisplay = document.getElementById('digital-timer');
    this.progressCircle = document.getElementById('pomodoro-progress-circle');
    
    this.btnStart = document.getElementById('btn-timer-start');
    this.btnPause = document.getElementById('btn-timer-pause');
    this.btnReset = document.getElementById('btn-timer-reset');
    
    // Config do timer
    this.studyMin = 25;
    this.pauseMin = 5;
    this.autoStart = false;
    this.dailyGoalHours = 2;

    this.totalSeconds = this.studyMin * 60;
    this.elapsedSeconds = 0;
    
    this.timerInterval = null;
    this.isRunning = false;

    // SVG Circle Math
    this.circumference = 2 * Math.PI * 80; // r=80

    this.init();
  }

  init() {
    if (!this.digitalDisplay) return;
    
    if (this.progressCircle) {
      this.progressCircle.style.strokeDasharray = this.circumference;
      this.progressCircle.style.strokeDashoffset = 0;
    }

    this.updateDisplay();
    
    this.btnStart.addEventListener('click', () => this.start());
    this.btnPause.addEventListener('click', () => this.pause());
    this.btnReset.addEventListener('click', () => this.reset());

    // Config de Pomodoro
    const btnSave = document.getElementById('btn-save-pomodoro');
    const settingsIcon = document.getElementById('btn-open-pomodoro-settings');
    const modalSettings = document.getElementById('modal-pomodoro-settings');

    if (settingsIcon && modalSettings) {
      settingsIcon.addEventListener('click', () => {
        modalSettings.classList.add('active');
      });
    }

    if (btnSave) {
      btnSave.addEventListener('click', () => {
        this.studyMin = parseInt(document.getElementById('pomodoro-study-time').value) || 25;
        this.pauseMin = parseInt(document.getElementById('pomodoro-pause-time').value) || 5;
        // Mocking additional settings toggle logic
        this.autoStart = true; 
        if (modalSettings) modalSettings.classList.remove('active');
        this.reset();
      });
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    
    this.timerInterval = setInterval(() => {
      this.elapsedSeconds++;
      if (this.elapsedSeconds >= this.totalSeconds) {
        this.pause();
        this.playSound();
        this.elapsedSeconds = this.totalSeconds;
        this.updateDisplay();
        
        // Registrar atividade no calendário (mock)
        if (window.AxionWorkspace && window.AxionWorkspace.aiAddEvent) {
          window.AxionWorkspace.aiAddEvent(new Date().getDate(), `⏱️ Pomodoro concluído: ${this.studyMin}m`, {tipo: 'auto'});
        }

        if (this.autoStart) {
          setTimeout(() => this.reset(), 3000); // Wait 3s then reset
        }
      } else {
        this.updateDisplay();
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    clearInterval(this.timerInterval);
  }

  reset() {
    this.pause();
    this.elapsedSeconds = 0;
    this.totalSeconds = this.studyMin * 60;
    this.updateDisplay();
  }

  updateDisplay() {
    const remaining = this.totalSeconds - this.elapsedSeconds;
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;

    this.digitalDisplay.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    
    // SVG Progress
    if (this.progressCircle) {
      const offset = this.circumference - ((this.elapsedSeconds / this.totalSeconds) * this.circumference);
      this.progressCircle.style.strokeDashoffset = offset;
    }
  }

  playSound() {
    // Beep simples
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }
}

window.AnalogTimer = AnalogTimer;
