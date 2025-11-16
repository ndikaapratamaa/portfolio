/* =========================
   main.js — cleaned & fixed
   ========================= */

/* -------- typewriter -------- */
const typewriterEl = document.querySelector(".typewriter");
const typeWords = ["Student", "Web Developer", "Future Innovator", "Tech Enthusiast", "Digital Learner"]; // renamed to avoid collision
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

/* -------- animated text (per word) -------- */
const animatedText = document.querySelector('.animated-text');
if (animatedText) {
  const fullText = animatedText.textContent.trim();
  animatedText.textContent = "";

  const words = fullText.split(" ");
  words.forEach((w, idx) => {
    const span = document.createElement("span");
    span.textContent = w;
    span.style.opacity = "0";
    span.style.display = "inline-block";
    span.style.transform = "translateY(10px)";
    span.style.transition = "all 0.4s ease";
    span.style.transitionDelay = `${idx * 0.08}s`;
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
}

/* -------- theme toggle (safe guards) -------- */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

// Initialize theme safely
(function initTheme() {
if (!themeToggle) return;
if (savedTheme === "light") {
document.body.classList.add("light-mode");
themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
document.body.classList.remove("light-mode");
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
} else {
// default: dark
document.body.classList.remove("light-mode");
themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}
})();

if (themeToggle) {
themeToggle.addEventListener("click", () => {
// Tambah animasi rotasi
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

/* -------- neon-bg particles (hero canvas) -------- */
(function neonParticleModule() {
  const neonCanvas = document.getElementById("neon-bg");
  if (!neonCanvas) return;

  const neonCtx = neonCanvas.getContext("2d");
  let neonParticles = [];
  let nW = 0, nH = 0;

  function resizeNeon() {
    nW = neonCanvas.width = window.innerWidth;
    // if hero exists use its height, otherwise use viewport height
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

  // recreate when theme changes (optional)
  const neonObserver = new MutationObserver(() => initNeon());
  neonObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
})();

/* -------- project card 3D tilt (safe selection) -------- */
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2, centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  });
});

/* -------- hamburger menu (guarded) -------- */
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

/* -------- scroll reveal -------- */
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

/* -------- parallax movement -------- */
window.addEventListener("scroll", () => {
  document.querySelectorAll(".parallax").forEach((el) => {
    const speed = 0.3; // ubah untuk kecepatan gerak
    const offset = window.scrollY * speed;
    el.style.backgroundPositionY = `${offset}px`;
  });
});

/* -------- particle background (full-page, separate from neon) -------- */
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

  // recreate when theme changes
  const bgObserver = new MutationObserver(() => createBgParticles());
  bgObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
})();



/* -------- FORM KONTAK HANDLER -------- */
const contactForm = document.querySelector('#contact form');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Cegah halaman reload

    // Ambil data dari form
    const formData = new FormData(this);

    // Tampilkan loading state di tombol
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;

    // Kirim data menggunakan fetch API ke file PHP kita
    fetch('api/send.email.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json()) // Baca response dari PHP
    .then(data => {
      // Tampilkan alert berdasarkan hasil
      alert(data.message);
      if (data.success) {
        this.reset(); // Kosongkan form jika berhasil
      }
    })
    .catch(error => {
      // Jika terjadi error (misal koneksi gagal)
      alert('Terjadi kesalahan. Silakan coba lagi.');
      console.error('Error:', error);
    })
    .finally(() => {
      // Kembalikan tombol ke keadaan semula, berhasil atau gagal
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });
}

// === PROJECT MODAL FUNCTIONALITY ===
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('project-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalCloseBtn = document.querySelector('.modal-close-btn');

// Fungsi untuk membuka modal
function openModal(card) {
  const title = card.dataset.title;
  const description = card.dataset.description;
  const techArray = card.dataset.tech.split(',');
  const githubLink = card.dataset.github;
  const liveLink = card.dataset.live;
  const iconElement = card.querySelector('.project-image i');

  // --- LOGIKA CERDASNYA DIMULAI DI SINI ---
  if (liveLink === '#') {
    // JIKA LINK LIVE DEMO MASIH '#', TAMPILKAN PESAN "SEDANG DIKERJAKAN"
    document.getElementById('modal-title').textContent = 'Sedang Dalam Tahap Pengembangan';
    document.getElementById('modal-description').textContent = 'Proyek ini sedang dalam tahap pengerjaan. Terima kasih atas minat Anda, silakan cek kembali lain kali untuk melihat versi live-nya!';

    // Ganti ikon jadi ikon 'tools' (perkakas)
    const modalImageContainer = document.getElementById('modal-image');
    modalImageContainer.innerHTML = '<i class="fas fa-tools"></i>';

    // Sembunyikan bagian teknologi dan footer (karena belum relevan)
    document.querySelector('.modal-tech').style.display = 'none';
    document.querySelector('.modal-footer').style.display = 'none';

    // Buat overlay transparan agar background tidak gelap
    modalOverlay.style.backgroundColor = 'transparent';
  } else {
    // JIKA SUDAH ADA LINK LIVE, TAMPILKAN DETAIL PROYEK SEPERTI BIASA
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').textContent = description;
    document.getElementById('modal-github-link').href = githubLink;
    document.getElementById('modal-live-link').href = liveLink;

    // Tampilkan ikon asli dari kartu
    const modalImageContainer = document.getElementById('modal-image');
    modalImageContainer.innerHTML = ''; // Kosongkan dulu
    if (iconElement) {
      modalImageContainer.appendChild(iconElement.cloneNode(true));
    }

    // Isi daftar teknologi
    const techListContainer = document.getElementById('modal-tech-list');
    techListContainer.innerHTML = ''; // Kosongkan dulu
    techArray.forEach(tech => {
      const span = document.createElement('span');
      span.textContent = tech.trim();
      techListContainer.appendChild(span);
    });

    // Pastikan bagian teknologi dan footer terlihat
    document.querySelector('.modal-tech').style.display = 'block';
    document.querySelector('.modal-footer').style.display = 'flex';

    // Kembalikan overlay gelap untuk proyek selesai
    modalOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  }
  // --- AKHIR LOGIKA CERDAS ---

  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// Fungsi untuk menutup modal
function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Event Listener untuk setiap kartu proyek
projectCards.forEach(card => {
  card.addEventListener('click', () => {
    // CEK KHUSUS UNTUK PORTFOLIO WEBSITE
    if (card.dataset.title === "Portfolio Website") {
      // Scroll langsung ke atas dengan halus
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return; // Hentikan fungsi di sini, jangan buka modal
    }

    // Untuk proyek lainnya (kalau ada), buka modal seperti biasa
    openModal(card);
  });
});

// Event Listener untuk tombol close dan overlay
modalCloseBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Event Listener untuk ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// === PROJECT FILTER FUNCTIONALITY ===
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

// Note: projectCards is already declared in the modal section above

// Tambahkan event listener ke setiap tombol filter
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // 1. Update tombol yang aktif
    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
      activeBtn.classList.remove('active');
    }
    button.classList.add('active');

    // 2. Ambil kategori filter yang dipilih
    const filter = button.getAttribute('data-filter');

    // 3. Loop melalui semua kartu proyek
    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');

      // 4. Tampilkan atau sembunyikan kartu
      if (filter === 'all' || category === filter) {
        // Tampilkan kartu dengan animasi
        card.style.display = 'block';
        // Refresh animasi AOS agar muncul lagi
        setTimeout(() => {
          card.classList.add('reveal');
          card.classList.add('active');
        }, 10);
      } else {
        // Sembunyikan kartu
        card.style.display = 'none';
      }
    });

    // 5. Filter juga project-simple-list items
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

