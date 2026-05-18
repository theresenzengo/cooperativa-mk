# Guide pour mettre le site en ligne

Bonjour ! Voici comment publier le site **Cooperativa Agrícola do Mbanza Kongo** sur Internet,
sans aucune connaissance technique. Trois options sont décrites, de la plus simple à la plus complète.

---

## 📁 Structure du site

```
site/
├── index.html              ← Page d'accueil bilingue (choix de la langue)
├── assets/
│   ├── style.css           ← Mise en forme commune
│   └── script.js           ← Comportement (menu, formulaire)
├── fr/                     ← Version française
│   ├── index.html          ← Accueil FR
│   ├── a-propos.html
│   ├── cultures.html
│   ├── elevage.html
│   ├── faq.html
│   └── contact.html
└── pt/                     ← Version portugaise
    ├── index.html          ← Accueil PT
    ├── sobre.html
    ├── culturas.html
    ├── criacao.html
    ├── faq.html
    └── contacto.html
```

---

## 🚀 OPTION 1 — Netlify (RECOMMANDÉE, gratuite, sans code)

**Temps : 5 minutes. Coût : 0 €.**

1. Rendez-vous sur [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Créez un compte (avec votre e-mail ou Google).
3. Glissez-déposez le **dossier entier** `site/` sur la page.
4. ✅ Le site est en ligne, avec une URL du type `https://cooperative-mbanza-kongo-12345.netlify.app`
5. Dans les paramètres du site, vous pouvez :
   - Choisir un nom d'URL personnalisé (ex. `cooperativa-mbanzakongo.netlify.app`)
   - Connecter un nom de domaine acheté ailleurs (ex. `cooperativambanzakongo.org`)

**Mises à jour :** chaque fois que vous modifiez le site, vous re-glissez-déposez le dossier.

---

## 🚀 OPTION 2 — Cloudflare Pages (gratuite, très rapide en Afrique)

**Temps : 10 minutes. Coût : 0 €.**

Avantage par rapport à Netlify : les serveurs Cloudflare sont plus rapides depuis l'Afrique.

1. Allez sur [https://pages.cloudflare.com](https://pages.cloudflare.com)
2. Créez un compte gratuit.
3. Cliquez sur « Create a project » → « Upload assets »
4. Glissez-déposez le dossier `site/`.
5. ✅ Le site est en ligne sur une URL du type `https://cooperativa-mbanzakongo.pages.dev`

---

## 🚀 OPTION 3 — Hébergement classique avec nom de domaine personnalisé

**Temps : 1 heure. Coût : ~30-50 € par an.**

Pour avoir une adresse comme `www.cooperativambanzakongo.org` :

### Étape A — Acheter le nom de domaine
- **OVH** (français, bonne réputation) : ovhcloud.com
- **Gandi** (français) : gandi.net
- **Namecheap** (international, pas cher) : namecheap.com

Un `.org` coûte environ **12-15 € par an**. Un `.com`, environ **10-12 €**.

### Étape B — Choisir un hébergeur
Options gratuites avec domaine personnalisé :
- **Netlify** (gratuit) + votre domaine ← le plus simple
- **Cloudflare Pages** (gratuit) + votre domaine

Options payantes (utiles si vous voulez aussi une boîte mail @cooperativambanzakongo.org) :
- **Hostinger** : ~3 €/mois, e-mail inclus
- **o2switch** (français) : ~7 €/mois, illimité
- **OVH** : ~3-6 €/mois

### Étape C — Connecter le domaine
Chaque hébergeur fournit une procédure pas à pas. En gros :
1. Vous achetez le domaine chez OVH/Gandi.
2. Vous indiquez à OVH/Gandi de pointer vers Netlify (ou autre).
3. Vous chargez le dossier `site/` sur l'hébergeur.
4. ✅ Le site est accessible à votre adresse personnalisée.

---

## 📨 Important : le formulaire de contact

**En l'état actuel, le formulaire affiche un message de confirmation mais n'envoie pas vraiment d'e-mail.**

Pour qu'il fonctionne réellement, deux solutions simples :

### Solution A — Formspree (gratuit jusqu'à 50 envois/mois)
1. Inscrivez-vous sur [https://formspree.io](https://formspree.io)
2. Récupérez votre URL de formulaire (ex. `https://formspree.io/f/abcdefgh`)
3. Dans `fr/contact.html` et `pt/contacto.html`, modifiez la balise `<form>` :
   ```html
   <form data-contact-form class="form-grid"
         action="https://formspree.io/f/abcdefgh"
         method="POST">
   ```
4. Les messages arriveront sur votre boîte e-mail.

### Solution B — Formulaire Netlify (gratuit, intégré)
Si vous hébergez sur Netlify, ajoutez juste `netlify` à la balise form :
```html
<form data-contact-form class="form-grid" netlify>
```
Netlify gérera les envois automatiquement.

---

## 🎨 Personnalisations à prévoir

Avant le lancement définitif, mettez à jour :

- [ ] **Numéro de téléphone réel** dans `fr/contact.html` et `pt/contacto.html`
  (cherchez `+244 XXX XXX XXX`)
- [ ] **Adresse e-mail réelle** dans les mêmes fichiers
  (cherchez `contact@cooperativambanzakongo.org`)
- [ ] **Adresse postale complète** si vous l'avez
- [ ] **Statistiques réelles** sur la page d'accueil (200+ agriculteurs, 15 villages, etc.)
  → fichiers `fr/index.html` et `pt/index.html`, section `<div class="stats">`
- [ ] **Photos** : actuellement le site n'utilise pas de photos pour rester rapide à charger.
  Vous pouvez en ajouter plus tard dans les sections appropriées.

---

## ❓ Besoin d'aide ?

Si vous bloquez à une étape, revenez vers moi avec :
- L'option choisie (Netlify, Cloudflare, hébergeur classique...)
- L'étape précise qui pose problème
- Une capture d'écran si possible

Je pourrai vous guider pas à pas.

Bonne mise en ligne ! 🌾
