---
layout: default
title: About
permalink: /about.html
---

<div class="container about-page">

  <!-- ═══ SECTION 1 : INTRO HOOK ═══ -->
  <div class="about-intro">
    <p class="about-intro__text">
      Hey ! Moi c'est <strong>Howl</strong> 👋
    </p>
    <p class="about-intro__sub">
      Bienvenue dans mon coin du web où je documente mon apprentissage de la cybersécurité.<br>
      Ici tu trouveras mes writeups CTF, mes projets de sécurité, et tout ce que j'apprends en cassant (et réparant) des systèmes.
    </p>
    <p class="about-intro__sub">
      Si tu es passionné de cybersec, recruteur curieux, ou juste de passage,<br>
      n'hésite pas à explorer et à me dire bonjour sur Discord !
    </p>
  </div>

  <!-- ═══ SECTION 2 : QUI JE SUIS ═══ -->
  <div class="about-section">
    <h2>Qui je suis</h2>
    <div class="about-identity">
      <div class="about-identity__photo">
        <img
          src="{{ '/assets/images/about-photo.png' | relative_url }}"
          alt="{{ site.author.name }}"
          onerror="this.src='https://ui-avatars.com/api/?name=Howl&background=1b1b1b&color=ffd866&size=300'"
        >
      </div>
      <div class="about-identity__text">
        <p>
          Je m'appelle <strong>OTILA A LOUMA Hamed</strong>, aussi connu sous le pseudo <strong style="color: var(--accent)">Howl</strong>.
          Je suis en dernière année de cycle ingénieur cybersécurité en France.
        </p>
        <p>
          <strong>Mon déclic ?</strong> En première année d'école d'ingénieur, j'ai été victime de phishing et j'ai perdu beaucoup de données personnelles.
          Cette expérience m'a fait réaliser l'importance de la cybersécurité et m'a poussé à choisir cette spécialisation.
        </p>
        <p>
          Depuis, ma passion est de protéger les systèmes en comprenant comment fonctionnent vraiment les attaques.
          Je me suis lancé dans les CTF pour apprendre les techniques offensives et mieux savoir m'en défendre.
        </p>
        <p>
          Actuellement en dernière année de formation, je consolide mes connaissances à travers la pratique.
          Chaque machine pwned, chaque writeup écrit, c'est une étape vers mon objectif : devenir expert
          en cybersécurité et aider à sécuriser les infrastructures.
        </p>
      </div>
    </div>
  </div>

  <!-- ═══ SECTION 3 : COMPÉTENCES ═══ -->
  <div class="about-section">
    <h2>Compétences</h2>

    <div class="about-skill-group">
      <h3 class="about-skill-group__title">🔴 Offensive Security</h3>
      <div class="about-bubbles">
        <span class="skill-bubble">Pentest Web</span>
        <span class="skill-bubble">SQLi / XSS</span>
        <span class="skill-bubble">OWASP Top 10</span>
        <span class="skill-bubble">Reconnaissance</span>
        <span class="skill-bubble">Énumération</span>
        <span class="skill-bubble">Exploitation</span>
        <span class="skill-bubble">Post-exploitation</span>
      </div>
    </div>

    <div class="about-skill-group">
      <h3 class="about-skill-group__title">🔵 SOC Analyst</h3>
      <div class="about-bubbles">
        <span class="skill-bubble">Analyse de logs</span>
        <span class="skill-bubble">Détection d'intrusion</span>
        <span class="skill-bubble">Triage d'alertes</span>
        <span class="skill-bubble">Forensics basique</span>
        <span class="skill-bubble">SIEM (Wazuh)</span>
        <span class="skill-bubble">Threat Intelligence</span>
        <span class="skill-bubble">Incident Response</span>
      </div>
    </div>

    <div class="about-skill-group">
      <h3 class="about-skill-group__title">🛠️ Outils</h3>
      <div class="about-bubbles">
        <span class="skill-bubble">Nmap</span>
        <span class="skill-bubble">Gobuster</span>
        <span class="skill-bubble">Burp Suite</span>
        <span class="skill-bubble">Metasploit</span>
        <span class="skill-bubble">Hydra</span>
        <span class="skill-bubble">LinPEAS / WinPEAS</span>
        <span class="skill-bubble">Wazuh</span>
      </div>
    </div>

    <div class="about-skill-group">
      <h3 class="about-skill-group__title">💻 Développement</h3>
      <div class="about-bubbles">
        <span class="skill-bubble">Python</span>
        <span class="skill-bubble">Bash</span>
        <span class="skill-bubble">Git / GitHub</span>
      </div>
    </div>

    <div class="about-skill-group">
      <h3 class="about-skill-group__title">🐧 Systèmes & Réseaux</h3>
      <div class="about-bubbles">
        <span class="skill-bubble">Linux (Kali / Debian)</span>
        <span class="skill-bubble">Windows</span>
        <span class="skill-bubble">VMware / VirtualBox</span>
        <span class="skill-bubble">pfSense</span>
      </div>
    </div>

    <div class="about-skill-group">
      <h3 class="about-skill-group__title">🤝 Soft Skills</h3>
      <div class="about-bubbles">
        <span class="skill-bubble skill-bubble--soft">Motivation & Persévérance</span>
        <span class="skill-bubble skill-bubble--soft">Curiosité intellectuelle</span>
        <span class="skill-bubble skill-bubble--soft">Autonomie</span>
        <span class="skill-bubble skill-bubble--soft">Esprit d'équipe</span>
        <span class="skill-bubble skill-bubble--soft">Adaptabilité</span>
        <span class="skill-bubble skill-bubble--soft">Rigueur</span>
        <span class="skill-bubble skill-bubble--soft">Communication</span>
        <span class="skill-bubble skill-bubble--soft">Apprentissage rapide</span>
      </div>
    </div>

    <div class="about-skill-group">
      <h3 class="about-skill-group__title">🌐 Langues</h3>
      <div class="about-bubbles">
        <span class="skill-bubble skill-bubble--lang">🇫🇷 Français <span class="lang-level">Natif</span></span>
        <span class="skill-bubble skill-bubble--lang">🇬🇧 Anglais <span class="lang-level">B2</span></span>
        <span class="skill-bubble skill-bubble--lang">🇪🇸 Espagnol <span class="lang-level">A2</span></span>
      </div>
    </div>
  </div>

  <!-- ═══ SECTION 4 : FORMATION ═══ -->
  <div class="about-section">
    <h2>Formation</h2>

    <div class="about-formation">

      <!-- ESAIP — carte principale avec Erasmus dépliable -->
      <div class="formation-card">
        <div class="formation-card__logo">
          <img
            src="{{ '/assets/images/schools/esaip.png' | relative_url }}"
            alt="ESAIP"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
          >
          <span class="formation-logo-fallback"><i class="fas fa-graduation-cap"></i></span>
        </div>
        <div class="formation-card__content">
          <div class="formation-card__period">2023 — 2026</div>
          <h3 class="formation-card__title">ESAIP Angers — École d'ingénieur</h3>
          <p class="formation-card__school">ESAIP · Angers, France</p>
          <p class="formation-card__desc">Formation d'ingénieur spécialisé en cybersécurité et sécurité offensive.</p>
          <span class="formation-badge formation-badge--ingenieur">Ingénieur BAC+5</span>

          <!-- Erasmus dépliable -->
          <details class="erasmus-details">
            <summary class="erasmus-summary">
              <i class="fas fa-globe-europe"></i> Périodes Erasmus+ <span class="erasmus-count">2 échanges</span>
            </summary>
            <div class="erasmus-list">

              <div class="erasmus-item">
                <div class="erasmus-item__logo">
                  <img
                    src="{{ '/assets/images/schools/uclm.png' | relative_url }}"
                    alt="UCLM"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
                  >
                  <span class="formation-logo-fallback" style="font-size:1rem;"><i class="fas fa-university"></i></span>
                </div>
                <div class="erasmus-item__info">
                  <span class="erasmus-item__period">2025 — 2026 · S1</span>
                  <strong>Universidad de Castilla-La Mancha</strong>
                  <span>UCLM · Albacete, Espagne 🇪🇸</span>
                </div>
                <span class="formation-badge formation-badge--erasmus">Erasmus+</span>
              </div>

              <div class="erasmus-item">
                <div class="erasmus-item__logo">
                  <img
                    src="{{ '/assets/images/schools/vtu.png' | relative_url }}"
                    alt="VTU"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
                  >
                  <span class="formation-logo-fallback" style="font-size:1rem;"><i class="fas fa-university"></i></span>
                </div>
                <div class="erasmus-item__info">
                  <span class="erasmus-item__period">2023 — 2024 · S2</span>
                  <strong>Université de Veliko Tarnovo</strong>
                  <span>VTU · Veliko Tarnovo, Bulgarie 🇧🇬</span>
                </div>
                <span class="formation-badge formation-badge--erasmus">Erasmus+</span>
              </div>

            </div>
          </details>
        </div>
      </div>

      <!-- CPGE -->
      <div class="formation-card">
        <div class="formation-card__logo">
          <img
            src="{{ '/assets/images/schools/cpge.png' | relative_url }}"
            alt="CPGE"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
          >
          <span class="formation-logo-fallback"><i class="fas fa-atom"></i></span>
        </div>
        <div class="formation-card__content">
          <div class="formation-card__period">2021 — 2023</div>
          <h3 class="formation-card__title">Classe préparatoire MPSI — CPGE</h3>
          <p class="formation-card__school">CPGE · Libreville, Gabon</p>
          <p class="formation-card__desc">2 ans de classes préparatoires aux grandes écoles, filière Mathématiques, Physique et Sciences de l'Ingénieur.</p>
          <span class="formation-badge formation-badge--prepa">CPGE · 2 ans</span>
        </div>
      </div>

    </div>

    <div class="cv-download">
      <a href="{{ '/assets/cv/cv-hamed-louma.pdf' | relative_url }}" class="cv-download__btn" download>
        <i class="fas fa-file-pdf"></i> Télécharger mon CV
      </a>
    </div>

  </div>

</div>
