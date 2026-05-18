// Menu mobile
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
  }

  // Formulaire de contact — envoi via Formspree en AJAX
  const form = document.querySelector('form[data-contact-form]');
  if (form) {
    // Détection langue depuis l'attribut lang du html
    const isPT = document.documentElement.lang === 'pt';
    const txt = {
      sending: isPT ? '...' : '...',
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
