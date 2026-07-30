/* ── Febin Lawrance Portfolio — Main Script ── */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Page Loader ─── */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 2000);
  });

  /* ─── Custom Cursor ─── */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    setTimeout(() => {
      follower.style.left = e.clientX + 'px';
      follower.style.top = e.clientY + 'px';
    }, 80);
  });

  document.querySelectorAll('a, button, .work-card, .upload-thumb').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2)';
      follower.style.opacity = '0';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.opacity = '0.6';
    });
  });

  /* ─── Navbar ─── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('solid', window.scrollY > 60);
    document.getElementById('goTop').classList.toggle('visible', window.scrollY > 600);
  });

  /* ─── Mobile menu ─── */
  const burger = document.getElementById('burger');
  const mobileNav = document.getElementById('mobileNav');
  let menuOpen = false;

  burger.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileNav.classList.toggle('open', menuOpen);
    burger.querySelectorAll('span')[0].style.transform = menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '';
    burger.querySelectorAll('span')[1].style.transform = menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  document.querySelectorAll('.mn-link').forEach(l => {
    l.addEventListener('click', () => {
      menuOpen = false;
      mobileNav.classList.remove('open');
      burger.querySelectorAll('span')[0].style.transform = '';
      burger.querySelectorAll('span')[1].style.transform = '';
    });
  });

  /* ─── Scroll to top ─── */
  document.getElementById('goTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── AOS (Animate On Scroll) ─── */
  const aosElements = document.querySelectorAll('[data-aos]');
  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, parseInt(delay));
        aosObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  aosElements.forEach(el => aosObserver.observe(el));

  /* ─── Skill bars ─── */
  const skillFills = document.querySelectorAll('.skill-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const w = entry.target.dataset.w;
        entry.target.style.width = w + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  skillFills.forEach(b => skillObserver.observe(b));

  /* ─── Counter animation ─── */
  const counters = document.querySelectorAll('.counter');
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const dur = 1800;
        const start = performance.now();
        const run = (now) => {
          const p = Math.min((now - start) / dur, 1);
          el.textContent = Math.floor(p * p * target);
          if (p < 1) requestAnimationFrame(run);
          else el.textContent = target;
        };
        requestAnimationFrame(run);
        countObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObserver.observe(c));

  /* ─── Hero Video Sound Toggle ─── */
  const heroVideo = document.getElementById('heroVideo');
  const soundBtn = document.getElementById('soundBtn');
  const iconMuted = document.getElementById('iconMuted');
  const iconSound = document.getElementById('iconSound');

  // Start muted (browser autoplay policy requirement)
  heroVideo.muted = true;

  soundBtn.addEventListener('click', () => {
    if (heroVideo.muted) {
      heroVideo.muted = false;
      heroVideo.volume = 0.8;
      iconMuted.style.display = 'none';
      iconSound.style.display = 'block';
    } else {
      heroVideo.muted = true;
      iconMuted.style.display = 'block';
      iconSound.style.display = 'none';
    }
  });

  /* ─── Local Video Upload ─── */
  document.querySelectorAll('.upload-thumb').forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumb.querySelector('.upload-input').click();
    });

    thumb.querySelector('.upload-input').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      const preview = thumb.querySelector('.upload-preview');
      const prompt = thumb.querySelector('.upload-prompt');
      preview.src = url;
      preview.style.display = 'block';
      preview.muted = false;
      preview.volume = 0.9;
      preview.play();
      prompt.style.display = 'none';
    });
  });

  /* ─── FAQ Accordion ─── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const answer = item.querySelector('.faq-a');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(fi => {
        fi.classList.remove('open');
        fi.querySelector('.faq-a').style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ─── 3D Card Tilt Effect ─── */
  document.querySelectorAll('.work-card, .testi-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── Marquee pause on hover ─── */
  const track = document.querySelector('.marquee-track');
  if (track) {
    track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
    track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
  }

});
