/* =========================================================
   CENTRAL PROJECTS LIST: Add new .html project pages here!
   ========================================================= */
const PROJECTS_DATA = [
  {
    file: 'project-zion.html',
    title: 'PROJECT_ZION',
    summary: 'Full-stack web application built with dark UI principles and high-contrast monospace typography.',
    tags: ['HTML5', 'CSS3', 'VANILLA_JS']
  },  {
    file: 'neural-net.html',
    title: 'NEURAL_NET_V4',
    summary: 'Data dashboard utilizing glowing grid containers and real-time status indicators.',
    tags: ['CANVAS_API', 'TELEMETRY', 'DARK_UI']
  },
  {
    file: 'project-airport.html',
    title: 'AIRPORT_BOARD',
    summary: 'Airport arrival and departure display. Demo or real-time status indicators.',
    tags: ['AIRLABS_API', 'SPLITSCREEN', 'BOARD']
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  const isProjectSubpage = PROJECTS_DATA.some((p) => p.file === currentFile);
  const isProjectsSection = currentFile === 'projects.html' || isProjectSubpage;

  /* 1. INJECT SHARED HEADER & SUBMENU ON EVERY .HTML PAGE */
  const headerSlot = document.getElementById('site-header');
  if (headerSlot) {
    const submenuLinks = PROJECTS_DATA.map((project) => {
      const activeClass = currentFile === project.file ? 'active' : '';
      return `<a href="${project.file}" class="sub-tab-btn ${activeClass}">&gt; ${project.title}</a>`;
    }).join('');

    headerSlot.innerHTML = `
      <h1><a href="index.html"><span class="blink-prompt">&gt;</span> SYSTEM_NODE_01</a></h1>
      <nav>
        <a href="index.html" class="tab-btn ${currentFile === 'index.html' ? 'active' : ''}">Home</a>

        <div class="dropdown">
          <a href="projects.html" class="tab-btn dropdown-toggle ${isProjectsSection ? 'active' : ''}">Projects ▾</a>
          <div class="dropdown-menu">
            <a href="projects.html" class="sub-tab-btn ${currentFile === 'projects.html' ? 'active' : ''}">&gt; ALL_PROJECTS</a>
            ${submenuLinks}
          </div>
        </div>

        <a href="about.html" class="tab-btn ${currentFile === 'about.html' ? 'active' : ''}">About</a>
        <a href="contact.html" class="tab-btn ${currentFile === 'contact.html' ? 'active' : ''}">Contact</a>
      </nav>
    `;

    // Touch/mobile toggle for dropdown menu
    const dropdownToggle = headerSlot.querySelector('.dropdown-toggle');
    const dropdown = headerSlot.querySelector('.dropdown');
    if (dropdownToggle && dropdown) {
      dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && !dropdown.classList.contains('open')) {
          e.preventDefault();
          e.stopPropagation();
          dropdown.classList.add('open');
        }
      });
    }

    document.addEventListener('click', () => {
      headerSlot.querySelectorAll('.dropdown').forEach((d) => d.classList.remove('open'));
    });
  }

  /* 2. INJECT SHARED FOOTER ON EVERY .HTML PAGE */
  const footerSlot = document.getElementById('site-footer');
  if (footerSlot) {
    const currentYear = new Date().getFullYear();
    footerSlot.innerHTML = `
      <div>&gt; SYSTEM_NODE_01 // STATUS: <span class="blink-prompt">ONLINE</span> // &copy; ${currentYear}</div>
      <div class="footer-links">
        <a href="index.html">[HOME]</a>
        <a href="projects.html">[PROJECTS]</a>
        <a href="about.html">[ABOUT]</a>
        <a href="contact.html">[CONTACT]</a>
      </div>
    `;
  }

  /* 3. POPULATE PROJECTS OVERVIEW GRID (Only runs on projects.html) */
  const projectsGrid = document.getElementById('projects-grid');
  const cardTemplate = document.getElementById('tpl-project-card');
  if (projectsGrid && cardTemplate) {
    PROJECTS_DATA.forEach((project) => {
      const clone = cardTemplate.content.cloneNode(true);
      clone.querySelector('.card-title').textContent = `> ${project.title}`;
      clone.querySelector('.card-summary').textContent = project.summary;
      clone.querySelector('.card-open-link').href = project.file;

      const tagContainer = clone.querySelector('.tag-list');
      project.tags.forEach((tag) => {
        const span = document.createElement('span');
        span.className = 'matrix-tag';
        span.textContent = `[${tag}]`;
        tagContainer.appendChild(span);
      });

      projectsGrid.appendChild(clone);
    });
  }

  /* 4. CONTACT FORM TRANSMISSION HANDLER (Only runs on contact.html) */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('sender-name').value.trim();
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.textContent = '[ ENCRYPTING_PACKET... ]';
      formStatus.classList.remove('hidden');
      formStatus.textContent = '> ESTABLISHING SECURE UPLINK...';

      setTimeout(() => {
        formStatus.textContent = `> TRANSMISSION_COMPLETE // PACKET RECEIVED FROM [${senderName.toUpperCase()}].`;
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = '[ TRANSMIT_DATA ]';
      }, 900);
    });
  }

  /* 5. MATRIX LANDING OVERLAY (Only runs on index.html) */
  const landingScreen = document.getElementById('landing-screen');
  if (!landingScreen) return;

  // Skip landing intro if user has already seen it in this tab session
  if (sessionStorage.getItem('matrixIntroSeen') === 'true') {
    landingScreen.style.display = 'none';
    return;
  }

  // Mark intro as seen immediately so clicking Home later skips it
  sessionStorage.setItem('matrixIntroSeen', 'true');

  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const glyphSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=-<>?';
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  const rainInterval = setInterval(() => {
    ctx.fillStyle = 'rgba(3, 5, 3, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = `${fontSize}px Courier New`;

    for (let i = 0; i < drops.length; i++) {
      const char = glyphSet[Math.floor(Math.random() * glyphSet.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }, 45);

  const messageText = 'WELCOME TO MY PAGE';
  const messageContainer = document.getElementById('falling-message');
  const enterBtn = document.getElementById('enter-btn');
  const countdownText = document.getElementById('countdown-text');

  const charElements = [];
  let countdownInterval = null;
  let hasEntered = false;

  function enterMainSite() {
    if (hasEntered) return;
    hasEntered = true;

    clearInterval(countdownInterval);
    landingScreen.classList.add('fade-out');
    setTimeout(() => {
      clearInterval(rainInterval);
    }, 800);
  }

  function startCountdown() {
    let secondsRemaining = 10;
    countdownText.textContent = `AUTO_ENTRY IN ${secondsRemaining}s...`;
    countdownText.classList.remove('hidden');

    countdownInterval = setInterval(() => {
      secondsRemaining--;
      if (secondsRemaining > 0) {
        countdownText.textContent = `AUTO_ENTRY IN ${secondsRemaining}s...`;
      } else {
        countdownText.textContent = 'ENTERING SYSTEM...';
        clearInterval(countdownInterval);
        enterMainSite();
      }
    }, 1000);
  }

  messageText.split('').forEach((letter) => {
    if (letter === ' ') {
      const space = document.createElement('span');
      space.className = 'matrix-space';
      messageContainer.appendChild(space);
    } else {
      const span = document.createElement('span');
      span.className = 'matrix-char';
      span.dataset.target = letter;
      span.textContent = glyphSet[Math.floor(Math.random() * glyphSet.length)];
      messageContainer.appendChild(span);
      charElements.push(span);
    }
  });

  charElements.forEach((span, index) => {
    const delay = 200 + index * 110;
    setTimeout(() => {
      span.classList.add('landed');

      let scrambleCount = 0;
      const scrambleTimer = setInterval(() => {
        span.textContent = glyphSet[Math.floor(Math.random() * glyphSet.length)];
        scrambleCount++;

        if (scrambleCount > 6) {
          clearInterval(scrambleTimer);
          span.textContent = span.dataset.target;

          if (index === charElements.length - 1) {
            setTimeout(() => {
              enterBtn.classList.remove('hidden');
              startCountdown();
            }, 300);
          }
        }
      }, 45);
    }, delay);
  });

  enterBtn.addEventListener('click', enterMainSite);
});
