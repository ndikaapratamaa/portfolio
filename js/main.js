
const typewriterEl = document.querySelector(".typewriter");
const typeWords = ["Student", "Web Developer", "Future Innovator", "Tech Enthusiast", "Digital Learner"];
let t_i = 0, t_j = 0, t_deleting = false;

function typewriterLoop() {
  if (!typewriterEl) return;
  if (t_i < typeWords.length) {
    if (!t_deleting && t_j < typeWords[t_i].length) {
      typewriterEl.textContent = typeWords[t_i].substring(0, t_j + 1);
      t_j++;
    } else if (t_deleting && t_j > 0) {
      typewriterEl.textContent = typeWords[t_i].substring(0, t_j - 1);
      t_j--;
    }

    if (t_j === typeWords[t_i].length && !t_deleting) {
      t_deleting = true;
      setTimeout(typewriterLoop, 1000);
    } else if (t_j === 0 && t_deleting) {
      t_deleting = false;
      t_i = (t_i + 1) % typeWords.length;
      setTimeout(typewriterLoop, 500);
    } else {
      setTimeout(typewriterLoop, t_deleting ? 50 : 100);
    }
  }
}
typewriterLoop();

const animatedTexts = document.querySelectorAll('.animated-text');
const MAX_STAGGER_SECONDS = 0.6;

animatedTexts.forEach((animatedText) => {
  const fullText = animatedText.textContent.trim();
  animatedText.textContent = "";

  const words = fullText.split(/\s+/);
  const stepDelay = Math.min(0.08, MAX_STAGGER_SECONDS / Math.max(words.length - 1, 1));

  words.forEach((w, idx) => {
    const span = document.createElement("span");
    span.textContent = w;
    span.style.opacity = "0";
    span.style.display = "inline-block";
    span.style.transform = "translateY(10px)";
    span.style.transition = "all 0.4s ease";
    span.style.transitionDelay = `${idx * stepDelay}s`;
    animatedText.appendChild(span);

    if (idx < words.length - 1) {
      animatedText.appendChild(document.createTextNode(" "));
    }
  });

  function revealWords() {
    animatedText.querySelectorAll("span").forEach(s => {
      s.style.opacity = "1";
      s.style.transform = "translateY(0)";
    });
  }

  const aboutObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        revealWords();
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });

  aboutObserver.observe(animatedText);
});

const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

(function initTheme() {
if (!themeToggle) return;
if (savedTheme === "light") {
document.body.classList.add("light-mode");
themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
document.body.classList.remove("light-mode");
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
} else {

document.body.classList.remove("light-mode");
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}
})();

if (themeToggle) {
themeToggle.addEventListener("click", () => {

themeToggle.style.transform = 'rotate(360deg)';
setTimeout(() => {
themeToggle.style.transform = 'rotate(0deg)';
}, 300);

document.body.classList.toggle("light-mode");
const isLight = document.body.classList.contains("light-mode");
themeToggle.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
localStorage.setItem("theme", isLight ? "light" : "dark");
});
}

(function neonParticleModule() {
  const neonCanvas = document.getElementById("neon-bg");
  if (!neonCanvas) return;

  const neonCtx = neonCanvas.getContext("2d");
  let neonParticles = [];
  let nW = 0, nH = 0;

  function resizeNeon() {
    nW = neonCanvas.width = window.innerWidth;

    const hero = document.querySelector(".hero");
    nH = neonCanvas.height = hero ? hero.offsetHeight : window.innerHeight;
  }
  window.addEventListener("resize", resizeNeon);
  resizeNeon();

  class NeonParticle {
    constructor() {
      this.x = Math.random() * nW;
      this.y = Math.random() * nH;
      this.radius = Math.random() * 2 + 1;
      this.dx = (Math.random() - 0.5) * 0.5;
      this.dy = (Math.random() - 0.5) * 0.5;
    }
    move() {
      this.x += this.dx; this.y += this.dy;
      if (this.x < 0 || this.x > nW) this.dx *= -1;
      if (this.y < 0 || this.y > nH) this.dy *= -1;
    }
    draw() {
      neonCtx.beginPath();
      neonCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      neonCtx.fillStyle = "rgba(0, 123, 255, 0.7)";
      neonCtx.shadowBlur = 15;
      neonCtx.shadowColor = "rgb(0, 123, 255)";
      neonCtx.fill();
    }
  }

  function initNeon(num = 80) {
    neonParticles = [];
    for (let i = 0; i < num; i++) neonParticles.push(new NeonParticle());
  }

  function neonAnimate() {
    neonCtx.clearRect(0, 0, nW, nH);
    neonParticles.forEach(p => { p.move(); p.draw(); });
    requestAnimationFrame(neonAnimate);
  }

  initNeon();
  neonAnimate();

  const neonObserver = new MutationObserver(() => initNeon());
  neonObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
})();

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("show");
  });
  document.querySelectorAll("#nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("show");
    });
  });
}

function scrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  const triggerBottom = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add("active");
    } else if (rect.top > window.innerHeight) {
      el.classList.remove("active");
    }
  });
}
window.addEventListener("scroll", scrollReveal);
window.addEventListener("load", scrollReveal);

window.addEventListener("scroll", () => {
  document.querySelectorAll(".parallax").forEach((el) => {
    const speed = 0.3;
    const offset = window.scrollY * speed;
    el.style.backgroundPositionY = `${offset}px`;
  });
});

(function bgParticleModule() {
  const bgCanvas = document.getElementById("particleCanvas");
  if (!bgCanvas) return;
  const bgCtx = bgCanvas.getContext("2d");
  let bgParticles = [];

  function resizeBg() {
    bgCanvas.width = window.innerWidth;
    bgCanvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeBg);
  resizeBg();

  function createBgParticles() {
    bgParticles = [];
    const count = Math.floor(window.innerWidth / 20);
    for (let i = 0; i < count; i++) {
      bgParticles.push({
        x: Math.random() * bgCanvas.width,
        y: Math.random() * bgCanvas.height,
        radius: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
      });
    }
  }
  createBgParticles();

  function getBgColor() {
    return document.body.classList.contains("light-mode")
      ? "rgba(99,102,241,0.4)"
      : "rgba(255,255,255,0.6)";
  }

  function animateBg() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    const color = getBgColor();
    bgCtx.fillStyle = color;
    bgParticles.forEach(p => {
      p.x += p.speedX; p.y += p.speedY;
      if (p.x < 0 || p.x > bgCanvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > bgCanvas.height) p.speedY *= -1;
      bgCtx.beginPath();
      bgCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      bgCtx.fill();
    });
    requestAnimationFrame(animateBg);
  }
  animateBg();

  const bgObserver = new MutationObserver(() => createBgParticles());
  bgObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
})();

const contactForm = document.querySelector('#contact form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    formData.append('access_key', 'dc4997a3-02b4-44ac-ad4a-f3fb372487c5');
    formData.append('subject', 'Ada Pesan Baru dari Portfolio Website');
    formData.append('from_name', 'Portfolio Website');

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;

    const responseBox = document.getElementById('responseMessage');
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (responseBox) {
        responseBox.textContent = data.success ? 'Pesan berhasil terkirim! Saya akan segera balas.' : 'Maaf, pesan gagal terkirim. Coba lagi nanti ya.';
        responseBox.className = data.success ? 'show success' : 'show error';
      }
      if (data.success) {
        this.reset();
      }
    })
    .catch(error => {

      if (responseBox) {
        responseBox.textContent = 'Terjadi kesalahan. Silakan coba lagi.';
        responseBox.className = 'show error';
      }
      console.error('Error:', error);
    })
    .finally(() => {

      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });
}

const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalCloseBtn = document.querySelector('.modal-close-btn');

function openModal(card) {
const title = card.dataset.title;
const description = card.dataset.description;
const techArray = card.dataset.tech.split(',');
const githubLink = card.dataset.github;
const liveLink = card.dataset.live;
const iconElement = card.querySelector('.project-image i');

document.getElementById('modal-title').textContent = title;
document.getElementById('modal-description').textContent = description;
document.getElementById('modal-github-link').href = githubLink;
document.getElementById('modal-live-link').href = liveLink;

const modalImageContainer = document.getElementById('modal-image');
modalImageContainer.innerHTML = '';
if (iconElement) {
modalImageContainer.appendChild(iconElement.cloneNode(true));
}

const techListContainer = document.getElementById('modal-tech-list');
techListContainer.innerHTML = '';
techArray.forEach(tech => {
const span = document.createElement('span');
span.textContent = tech.trim();
techListContainer.appendChild(span);
});

if (title === "Sedang Dikerjakan") {

document.querySelector('.modal-tech').style.display = 'none';
document.querySelector('.modal-footer').style.display = 'flex';

modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
} else {

document.querySelector('.modal-tech').style.display = 'block';
document.querySelector('.modal-footer').style.display = 'flex';

modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
}

modal.style.display = 'block';
document.body.style.overflow = 'hidden';
}

function closeModal() {
modal.style.display = 'none';
document.body.style.overflow = 'auto';
}

projectCards.forEach(card => {
card.addEventListener('click', () => {
const liveLink = card.dataset.live;

if (card.dataset.title === "Portfolio V1") {
window.scrollTo({ top: 0, behavior: 'smooth' });
return;
}

if (liveLink && liveLink !== "#") {
window.open(liveLink, '_blank');
return;
}

openModal(card);
});
});

modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') closeModal();
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {

    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
      activeBtn.classList.remove('active');
    }
    button.classList.add('active');

    const filter = button.getAttribute('data-filter');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');

      if (filter === 'all' || category === filter) {

        card.style.display = 'block';

        setTimeout(() => {
          card.classList.add('reveal');
          card.classList.add('active');
        }, 10);
      } else {

        card.style.display = 'none';
      }
    });

    projectItems.forEach(item => {
      const category = item.getAttribute('data-category');

      if (filter === 'all' || category === filter) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

