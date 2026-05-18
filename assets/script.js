// ============================================
// Cooperativa Mbanza Kongo — Script principal
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Menu mobile ----------
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // ---------- Animations au scroll (Intersection Observer) ----------
  // Sélectionne tous les éléments à animer
  const revealSelectors = [
    '.section-header',
    '.card',
    '.prose',
    '.stats > div',
    '.gallery-category',
    '.contact-info-item',
    '.faq-item',
    '.hero-text'
  ];

  const elementsToReveal = document.querySelectorAll(revealSelectors.join(', '));

  // Ajouter la classe "reveal" + délais en cascade pour les groupes
  elementsToReveal.forEach((el) => {
    el.classList.add('reveal');
  });

  // Pour les groupes (cartes, stats), ajouter un délai progressif aux frères/sœurs
  document.querySelectorAll('.cards, .stats').forEach((group) => {
    const children = group.children;
    for (let i = 0; i < children.length; i++) {
      const delay = Math.min(i + 1, 5);
      children[i].classList.add(`reveal-delay-${delay}`);
    }
  });

  // Observer qui détecte quand les éléments entrent dans le viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        // Si c'est un stat-number, lancer le compteur
        const counter = entry.target.querySelector('.stat-number');
        if (counter && !counter.dataset.counted) {
          animateCounter(counter);
          counter.dataset.counted = 'true';
        }

        // On arrête d'observer une fois animé
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  elementsToReveal.forEach((el) => observer.observe(el));

  // ---------- Compteurs animés ----------
  function animateCounter(el) {
    const text = el.textContent.trim();
    // Récupérer le nombre et le suffixe (+ ou %)
    const match = text.match(/^(\d+)(.*)$/);
    if (!match) return;

    const targetNumber = parseInt(match[1], 10);
    const suffix = match[2];
    const duration = 1500; // 1,5s — rythme solennel
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing : démarre vite, ralentit à la fin (sensation d'arrivée précise)
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(eased * targetNumber);

      el.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = targetNumber + suffix;
      }
    }

    // Démarrer à 0
    el.textContent = '0' + suffix;
    requestAnimationFrame(update);
  }

  // ---------- Formulaire de contact (Formspree) ----------
  const form = document.querySelector('form[data-contact-form]');
  if (form) {
    const isPT = document.documentElement.lang === 'pt';
    const txt = {
      sending: '...',
      success: isPT
        ? '✓ Obrigado pela sua mensagem ! Responder-lhe-emos em poucos dias.'
        : '✓ Merci pour votre message ! Nous vous répondrons sous quelques jours.',
      errorServer: isPT
        ? '⚠ Ocorreu um erro. Por favor tente novamente ou escreva-nos diretamente por e-mail.'
        : '⚠ Une erreur s\'est produite. Merci de réessayer ou de nous écrire directement par e-mail.',
      errorNetwork: isPT
        ? '⚠ Sem ligação. Verifique a sua rede e tente novamente.'
        : '⚠ Pas de connexion. Merci de vérifier votre réseau et de réessayer.'
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const message = form.querySelector('.form-message');
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = txt.sending;

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          if (message) {
            message.textContent = txt.success;
            message.classList.remove('error');
            message.classList.add('show');
          }
          form.reset();
        } else {
          if (message) {
            message.textContent = txt.errorServer;
            message.classList.add('show', 'error');
          }
        }
      } catch (err) {
        if (message) {
          message.textContent = txt.errorNetwork;
          message.classList.add('show', 'error');
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
    });
  }

});
