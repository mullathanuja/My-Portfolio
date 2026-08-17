document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle logic
  const lightBtn = document.getElementById('theme-toggle-light');
  const darkBtn = document.getElementById('theme-toggle-dark');
  const htmlElement = document.documentElement;

  // Check initial theme from localStorage or system preference
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }

  lightBtn.addEventListener('click', () => {
    htmlElement.classList.remove('dark');
    localStorage.theme = 'light';
  });

  darkBtn.addEventListener('click', () => {
    htmlElement.classList.add('dark');
    localStorage.theme = 'dark';
  });

  // Custom Cursor
  const cursorOuter = document.querySelector('.fixed.pointer-events-none.z-\\[9999\\]');
  let lastTrailTime = 0;
  
  if (cursorOuter) {
    document.addEventListener('mousemove', (e) => {
      cursorOuter.style.transform = `translateX(${e.clientX - 12}px) translateY(${e.clientY - 12}px)`;
      
      const now = Date.now();
      if (now - lastTrailTime > 30) {
        lastTrailTime = now;
        const dot = document.createElement('div');
        dot.className = 'trail-dot';
        dot.style.left = (e.clientX - 4) + 'px';
        dot.style.top = (e.clientY - 4) + 'px';
        document.body.appendChild(dot);
        
        setTimeout(() => {
          dot.remove();
        }, 800);
      }
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Dynamic date
  const dateEl = document.getElementById('current-date');
  if (dateEl) {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('en-US', options);
  }
});
