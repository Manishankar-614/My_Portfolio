/**
 * Manishankar Portfolio - Igloo.inc Inspired Interactions
 * Featuring Interactive 3D Three.js Cyber Hologram & Synthesized Audio FX
 */

document.addEventListener('DOMContentLoaded', () => {
  initCursorSpotlight();
  initBackgroundCanvas();
  initScrollSpy();
  init3DTilt();
  initProjectFilters();
  initProjectModal();
  initCopyEmail();
  initMobileMenu();
  initHeroThreeJS();
  initAudioFX();
  handleInitialAnchorOrModal();
});

/* --------------------------------------------------------------------------
   1. Interactive Mouse Spotlight Glow
   -------------------------------------------------------------------------- */
function initCursorSpotlight() {
  const spotlight = document.querySelector('.cursor-spotlight');
  if (!spotlight) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.body.classList.add('user-active');
  });

  function renderSpotlight() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    spotlight.style.transform = `translate(${currentX}px, ${currentY}px)`;
    requestAnimationFrame(renderSpotlight);
  }
  renderSpotlight();
}

/* --------------------------------------------------------------------------
   2. Subtle Cosmic Background Particles Canvas
   -------------------------------------------------------------------------- */
function initBackgroundCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const count = Math.min(width > 768 ? 45 : 20, 60);

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.5 + 0.2,
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(render);
  }
  render();
}

/* --------------------------------------------------------------------------
   3. Interactive 3D Three.js Holographic Cyber Core
   -------------------------------------------------------------------------- */
function initHeroThreeJS() {
  const canvas = document.getElementById('hero-three-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const container = document.getElementById('three-container');
  const width = container.clientWidth || 400;
  const height = container.clientHeight || 400;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 6.5;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // 1. Holographic Cyber Force Field Aura (Geodesic Wireframe)
  const coreGeo = new THREE.IcosahedronGeometry(2.3, 1);
  const coreMat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const coreMesh = new THREE.Mesh(coreGeo, coreMat);
  scene.add(coreMesh);

  // 2. Floating Anime Character Sprite (Crystal Clear, Face Fully Visible)
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load('/static/images/my_anime.png', (texture) => {
    const spriteMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 1.0,
      depthTest: false,
    });
    const sprite = new THREE.Sprite(spriteMat);
    sprite.scale.set(3.4, 3.4, 1);
    sprite.position.set(0, 0, 0);
    sprite.renderOrder = 999;
    scene.add(sprite);
  });

  // 3. Outer Orbital Cyber Rings
  const ringGeo1 = new THREE.TorusGeometry(2.7, 0.02, 16, 100);
  const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.65,
  });
  const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  ring1.rotation.x = Math.PI / 3;
  scene.add(ring1);

  const ringGeo2 = new THREE.TorusGeometry(3.0, 0.015, 16, 100);
  const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0xa855f7,
    transparent: true,
    opacity: 0.55,
  });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.y = Math.PI / 4;
  scene.add(ring2);

  // 4. Particle Dust Nebula
  const particleGeo = new THREE.BufferGeometry();
  const particleCount = 180;
  const posArray = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 8;
  }
  particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  const particleMat = new THREE.PointsMaterial({
    size: 0.04,
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.8,
  });
  const particleMesh = new THREE.Points(particleGeo, particleMat);
  scene.add(particleMesh);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x00f0ff, 2, 50);
  pointLight1.position.set(5, 5, 5);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xa855f7, 2, 50);
  pointLight2.position.set(-5, -5, 5);
  scene.add(pointLight2);

  // Mouse / Touch Drag Physics
  let isDragging = false;
  let prevMousePos = { x: 0, y: 0 };
  let targetRotation = { x: 0, y: 0 };
  let currentRotation = { x: 0, y: 0 };

  canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    prevMousePos = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      targetRotation.y += deltaX * 0.008;
      targetRotation.x += deltaY * 0.008;
      prevMousePos = { x: e.clientX, y: e.clientY };
    } else {
      // Gentle parallax follow
      const normX = (e.clientX / window.innerWidth - 0.5) * 0.4;
      const normY = (e.clientY / window.innerHeight - 0.5) * 0.4;
      camera.position.x += (normX - camera.position.x) * 0.05;
      camera.position.y += (-normY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
    }
  });

  // Touch support
  canvas.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      isDragging = true;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;
      targetRotation.y += deltaX * 0.008;
      targetRotation.x += deltaY * 0.008;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  }, { passive: true });

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Constant cinematic spin
    if (!isDragging) {
      targetRotation.y += 0.004;
      targetRotation.x += 0.001;
    }

    // Smooth inertia interpolation
    currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
    currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;

    coreMesh.rotation.x = currentRotation.x;
    coreMesh.rotation.y = currentRotation.y;

    ring1.rotation.z = elapsedTime * 0.3;
    ring1.rotation.x = currentRotation.x + Math.PI / 3;

    ring2.rotation.z = -elapsedTime * 0.25;
    ring2.rotation.y = currentRotation.y + Math.PI / 4;

    particleMesh.rotation.y = elapsedTime * 0.05;

    // Subtle breathing scale
    const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
    coreMesh.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
  }
  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth || 400;
    const newHeight = container.clientHeight || 400;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });
}

/* --------------------------------------------------------------------------
   4. Synthesized Futuristic Web Audio Sound FX Engine
   -------------------------------------------------------------------------- */
function initAudioFX() {
  let audioCtx = null;
  let isMuted = localStorage.getItem('sound_fx_enabled') === 'false';

  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = document.getElementById('sound-icon');

  function updateSoundUI() {
    if (soundBtn && soundIcon) {
      if (isMuted) {
        soundBtn.classList.add('sound-muted');
        soundIcon.className = 'fas fa-volume-mute';
      } else {
        soundBtn.classList.remove('sound-muted');
        soundIcon.className = 'fas fa-volume-up';
      }
    }
  }
  updateSoundUI();

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      isMuted = !isMuted;
      localStorage.setItem('sound_fx_enabled', (!isMuted).toString());
      updateSoundUI();
      if (!isMuted) playChirp(600, 0.08);
    });
  }

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioCtx = new AudioContextClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playPop(freq = 480, duration = 0.05) {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  function playChirp(freq = 700, duration = 0.08) {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.6, ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  }

  function playWhoosh() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(250, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  }

  function playConquerorsHaki() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // 1. Deep Haoshoku Sub-Bass Pressure Pulse
      const oscSub = ctx.createOscillator();
      const gainSub = ctx.createGain();
      oscSub.type = 'sine';
      oscSub.frequency.setValueAtTime(150, now);
      oscSub.frequency.exponentialRampToValueAtTime(36, now + 0.85);
      gainSub.gain.setValueAtTime(0.28, now);
      gainSub.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      oscSub.connect(gainSub);
      gainSub.connect(ctx.destination);
      oscSub.start(now);
      oscSub.stop(now + 1.4);

      // 2. Heavy Resonant Distortion Hum
      const oscSaw = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gainSaw = ctx.createGain();
      oscSaw.type = 'sawtooth';
      oscSaw.frequency.setValueAtTime(85, now);
      oscSaw.frequency.exponentialRampToValueAtTime(42, now + 1.0);
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, now);
      filter.frequency.exponentialRampToValueAtTime(75, now + 1.0);
      filter.Q.setValueAtTime(10, now);
      gainSaw.gain.setValueAtTime(0.2, now);
      gainSaw.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      oscSaw.connect(filter);
      filter.connect(gainSaw);
      gainSaw.connect(ctx.destination);
      oscSaw.start(now);
      oscSaw.stop(now + 1.2);

      // 3. Lightning Crackle Sparks
      const bufferSize = Math.floor(ctx.sampleRate * 0.6);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12)) * (Math.random() > 0.82 ? 1.0 : 0.05);
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(2200, now);
      noiseFilter.Q.setValueAtTime(3, now);
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.22, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(now + 0.03);
    } catch (e) {}

    triggerHakiVisualShockwave();
  }

  function triggerHakiVisualShockwave() {
    const overlay = document.getElementById('haki-overlay');
    document.body.classList.remove('haki-active');
    void document.body.offsetWidth;
    document.body.classList.add('haki-active');

    if (overlay) {
      overlay.classList.remove('active');
      void overlay.offsetWidth;
      overlay.classList.add('active');
      setTimeout(() => {
        overlay.classList.remove('active');
      }, 1000);
    }

    setTimeout(() => {
      document.body.classList.remove('haki-active');
    }, 700);
  }

  // Attach sound triggers to interactive elements
  document.querySelectorAll('.nav-link, .filter-btn, .skill-chip, .icon-circle-btn, .btn-igloo-primary, .btn-igloo-secondary, .quick-contact-box, .social-pill-card, .haki-trigger-btn').forEach((el) => {
    el.addEventListener('mouseenter', () => playPop(440, 0.04));
  });

  document.querySelectorAll('.filter-btn, .btn-open-modal, [data-copy-email]').forEach((el) => {
    el.addEventListener('click', () => playChirp(800, 0.06));
  });

  const hakiBtn = document.getElementById('haki-btn');
  if (hakiBtn) {
    hakiBtn.addEventListener('click', () => {
      playConquerorsHaki();
    });
  }

  const threeCanvas = document.getElementById('hero-three-canvas');
  if (threeCanvas) {
    threeCanvas.addEventListener('click', () => {
      playConquerorsHaki();
    });
  }

  window.playWhoosh = playWhoosh;
  window.playConquerorsHaki = playConquerorsHaki;
}

/* --------------------------------------------------------------------------
   5. ScrollSpy & Dock Navigation
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  function onScroll() {
    const scrollY = window.pageYOffset + 180;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   6. 3D Perspective Tilt on Project & Showcase Cards
   -------------------------------------------------------------------------- */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-element');
  if (window.innerWidth < 768) return; // Disable tilt on mobile for performance

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   7. Projects Category Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card-3d');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   8. Project Modal Controller (Igloo Drawer)
   -------------------------------------------------------------------------- */
function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  if (!modalOverlay) return;

  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalCategory = document.getElementById('modal-category');
  const modalTags = document.getElementById('modal-tags');
  const modalDesc = document.getElementById('modal-desc');
  const modalChallenges = document.getElementById('modal-challenges');
  const modalGithub = document.getElementById('modal-github');
  const modalLive = document.getElementById('modal-live');

  function openProject(projectId) {
    if (!window.PROJECT_DATA) {
      const dataEl = document.getElementById('projects-data');
      if (dataEl) {
        try {
          window.PROJECT_DATA = JSON.parse(dataEl.textContent);
        } catch (e) {
          window.PROJECT_DATA = [];
        }
      }
    }
    if (!window.PROJECT_DATA) return;
    const project = window.PROJECT_DATA.find((p) => p.id === parseInt(projectId));
    if (!project) return;

    modalTitle.textContent = project.title;
    modalImage.src = `/static/${project.image}`;
    modalImage.alt = project.title;
    modalCategory.textContent = project.category_label || project.stack[0];

    // Tags
    modalTags.innerHTML = '';
    project.stack.forEach((tech) => {
      const span = document.createElement('span');
      span.className = 'tech-tag';
      span.textContent = tech;
      modalTags.appendChild(span);
    });

    modalDesc.innerHTML = project.description.replace(/\n/g, '<br>');

    if (project.challenges) {
      document.getElementById('modal-challenges-container').style.display = 'block';
      modalChallenges.innerHTML = project.challenges.replace(/\n/g, '<br>');
    } else {
      document.getElementById('modal-challenges-container').style.display = 'none';
    }

    if (modalGithub) modalGithub.href = project.github;
    if (modalLive) {
      modalLive.href = project.live;
      modalLive.style.display = project.live && project.live !== '#' ? 'inline-flex' : 'none';
    }

    if (window.playWhoosh) window.playWhoosh();
    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Open buttons
  document.querySelectorAll('[data-open-project]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.dataset.openProject;
      openProject(id);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  window.openProjectModal = openProject;
}

/* --------------------------------------------------------------------------
   9. Copy Email with Toast Notification
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBoxes = document.querySelectorAll('[data-copy-email]');
  const toast = document.getElementById('toast');

  copyBoxes.forEach((box) => {
    box.addEventListener('click', () => {
      const email = box.dataset.copyEmail || 'manibhat2005@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Copied ${email} to clipboard!`);
      });
    });
  });

  function showToast(msg) {
    if (!toast) return;
    toast.querySelector('.toast-msg').textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

/* --------------------------------------------------------------------------
   10. Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* --------------------------------------------------------------------------
   11. Initial Anchor or Modal Navigation Handler
   -------------------------------------------------------------------------- */
function handleInitialAnchorOrModal() {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    }
  }

  const initialId = document.body.dataset.openProjectId || window.INITIAL_PROJECT_ID;
  if (initialId && window.openProjectModal) {
    setTimeout(() => {
      window.openProjectModal(parseInt(initialId));
    }, 300);
  }
}
