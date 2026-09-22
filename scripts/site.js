/* ummah.games — all rendered roster markup is derived from scripts/roster.js */
(function () {
  'use strict';

  /* ---------- FAQPage structured data, generated from the live DOM ----------
     Built from the rendered questions and answers so the markup Google reads
     can never drift from what a visitor actually sees on the page. */

  var faqItems = [...document.querySelectorAll('.home-faq-list details')].map(function (d) {
    return {
      '@type': 'Question',
      name: d.querySelector('summary').textContent.trim(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: d.querySelector('p').textContent.trim(),
      },
    };
  });

  if (faqItems.length) {
    var faqLd = document.createElement('script');
    faqLd.type = 'application/ld+json';
    faqLd.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems,
    });
    document.head.appendChild(faqLd);
  }

  /* ---------- registry numbers ---------- */

  document.querySelectorAll('[data-registry]').forEach(function (el) {
    var key = el.getAttribute('data-registry');
    if (key in REGISTRY) el.textContent = REGISTRY[key];
  });

  /* ---------- roster ---------- */

  var AGENT_GLYPHS = ['🤖', '🕹️', '🛰️', '🚀', '📊', '💰', '🎛️', '🧩', '⚡', '🔍', '✨', '🎨'];
  var SKILL_GLYPH = '🛠️';

  var grid = document.getElementById('roster-grid');

  function buildCard(member, index) {
    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'member-card';
    card.setAttribute('aria-expanded', 'false');
    card.dataset.kind = member.kind;

    var art = document.createElement('div');
    art.className = 'card-art';
    art.dataset.kind = member.kind;

    var idx = document.createElement('span');
    idx.className = 'card-index';
    idx.textContent = String(index + 1).padStart(2, '0');

    var tag = document.createElement('span');
    tag.className = 'kind-tag';
    tag.textContent = member.kind;

    var glyph = document.createElement('span');
    glyph.className = 'card-glyph';
    glyph.setAttribute('aria-hidden', 'true');
    glyph.textContent =
      member.kind === 'agent' ? AGENT_GLYPHS[index % AGENT_GLYPHS.length] : SKILL_GLYPH;

    art.append(idx, tag, glyph);

    var label = document.createElement('div');
    label.className = 'card-label';

    var copy = document.createElement('div');
    copy.className = 'card-copy';

    var h3 = document.createElement('h3');
    h3.textContent = member.name;

    var desc = document.createElement('span');
    desc.className = 'card-description';
    desc.textContent = member.blurb;

    copy.append(h3, desc);

    var pill = document.createElement('span');
    pill.className = 'play-pill';
    pill.setAttribute('aria-hidden', 'true');
    pill.textContent = '›';

    label.append(copy, pill);
    card.append(art, label);

    card.addEventListener('click', function () {
      var open = card.getAttribute('aria-expanded') === 'true';
      card.setAttribute('aria-expanded', open ? 'false' : 'true');
    });

    return card;
  }

  function render(filter) {
    grid.textContent = '';
    ROSTER.filter(function (m) {
      return filter === 'all' || m.kind === filter;
    }).forEach(function (m, i) {
      grid.appendChild(buildCard(m, i));
    });
  }

  render('all');

  document.querySelectorAll('.roster-tabs .tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.roster-tabs .tab').forEach(function (t) {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      render(tab.dataset.filter);
    });
  });

  /* ---------- mascot rotator ---------- */

  var MASCOTS = ['🤖', '🕹️', '👾', '🎮', '🧠', '🛠️', '🚀', '🎯', '⚙️', '🏆'];
  var rotator = document.querySelector('[data-avatar-rotator]');
  var face = document.querySelector('[data-avatar-face]');
  var status = document.getElementById('avatar-status');
  var mascotIndex = 0;

  if (rotator && face) {
    face.textContent = MASCOTS[0];
    rotator.addEventListener('click', function () {
      if (rotator.hasAttribute('data-spinning')) return;
      rotator.setAttribute('data-spinning', '');
      mascotIndex = (mascotIndex + 1) % MASCOTS.length;
      face.textContent = MASCOTS[mascotIndex];
      if (status) status.textContent = 'Mascot ' + (mascotIndex + 1) + ' of ' + MASCOTS.length;
      setTimeout(function () {
        rotator.removeAttribute('data-spinning');
      }, 220);
    });
  }

  /* ---------- ad modal ---------- */

  var modal = document.getElementById('adModal');

  if (modal) {
    document.querySelectorAll('.ad-slot').forEach(function (slot) {
      slot.addEventListener('click', function () {
        modal.hidden = false;
      });
    });

    modal.addEventListener('click', function (e) {
      if (e.target === modal || e.target.closest('.ad-modal-close')) modal.hidden = true;
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) modal.hidden = true;
    });
  }
})();
