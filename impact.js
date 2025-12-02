// impact.js — lightweight behavior: parse Spotify track URLs, embed previews, save to localStorage, copy embed code.
// No external libraries. Defer-loaded in HTML.

(function () {
    'use strict';
  
    const CARDS = ['track1', 'track2', 'track3'];
    const STORAGE_PREFIX = 'jazz_spotify_';
  
    function $(sel, ctx = document) { return ctx.querySelector(sel); }
    function $all(sel, ctx = document) { return Array.from(ctx.querySelectorAll(sel)); }
  
    // Extract Spotify track id from multiple URL formats
    function extractSpotifyTrackId(url) {
      if (!url) return null;
      url = url.trim();
      // spotify:track:ID
      let m = url.match(/spotify:track:([A-Za-z0-9]+)/);
      if (m) return m[1];
      // https://open.spotify.com/track/ID?si=...
      m = url.match(/open\.spotify\.com\/track\/([A-Za-z0-9]+)/);
      if (m) return m[1];
      // short.spotify/track/ID or other variants
      m = url.match(/spotify\.com\/track\/([A-Za-z0-9]+)/);
      if (m) return m[1];
      return null;
    }
  
    function embedIframeForId(id) {
      // returns iframe HTML string
      const src = `https://open.spotify.com/embed/track/${id}`;
      return `<iframe src="${src}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media" title="Spotify preview"></iframe>`;
    }
  
    function saveLink(card, url) {
      localStorage.setItem(STORAGE_PREFIX + card, url || '');
    }
  
    function loadSaved(card) {
      return localStorage.getItem(STORAGE_PREFIX + card) || '';
    }
  
    function setPreview(card, url) {
      const id = extractSpotifyTrackId(url);
      const linkEl = document.getElementById(`link-${card}`);
      const embedWrap = document.getElementById(`embed-${card}`);
      const input = document.getElementById(`input-${card}`);
  
      if (id) {
        const spotifyUrl = `https://open.spotify.com/track/${id}`;
        linkEl.href = spotifyUrl;
        linkEl.setAttribute('aria-disabled', 'false');
        linkEl.classList.remove('disabled');
  
        // Insert iframe
        embedWrap.innerHTML = embedIframeForId(id);
        embedWrap.setAttribute('aria-hidden', 'false');
        saveLink(card, spotifyUrl);
        input.classList.remove('invalid');
        input.value = spotifyUrl;
      } else {
        // invalid or empty
        linkEl.href = '#';
        linkEl.setAttribute('aria-disabled', 'true');
        embedWrap.innerHTML = ''; embedWrap.setAttribute('aria-hidden', 'true');
        saveLink(card, '');
      }
    }
  
    // Copy embed code to clipboard
    async function copyEmbed(card) {
      const saved = loadSaved(card);
      const id = extractSpotifyTrackId(saved);
      if (!id) {
        alert('No saved Spotify track for this card. Paste a valid Spotify track URL first.');
        return;
      }
      const code = `<iframe src="https://open.spotify.com/embed/track/${id}" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
      try {
        await navigator.clipboard.writeText(code);
        flashMessage(`Embed copied for ${card}`, 1500);
      } catch (err) {
        // fallback
        const ta = document.createElement('textarea');
        ta.value = code; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); flashMessage('Embed copied', 1200); } catch (e) { alert('Copy failed.'); }
        ta.remove();
      }
    }
  
    // Short toast
    function flashMessage(msg, timeout = 1200) {
      let el = document.getElementById('jazz-toast');
      if (!el) {
        el = document.createElement('div'); el.id = 'jazz-toast';
        el.style.position = 'fixed'; el.style.right = '18px'; el.style.bottom = '18px';
        el.style.background = 'linear-gradient(90deg, rgba(70,150,255,0.14), rgba(40,80,200,0.14))';
        el.style.color = '#eaffff'; el.style.padding = '8px 14px'; el.style.borderRadius = '10px';
        el.style.boxShadow = '0 8px 40px rgba(20,60,120,0.3)'; el.style.zIndex = 9999; document.body.appendChild(el);
      }
      el.textContent = msg; el.style.opacity = '1';
      clearTimeout(el._t); el._t = setTimeout(()=> el.style.opacity = '0', timeout);
    }
  
    // Initialize: load saved links into UI
    function initFromStorage() {
      CARDS.forEach(card => {
        const saved = loadSaved(card);
        if (saved) {
          const input = document.getElementById(`input-${card}`);
          input.value = saved;
          setPreview(card, saved);
        }
      });
    }
  
    // Attach events
    function attachEvents() {
      // inputs: pressing Enter will embed
      CARDS.forEach(card => {
        const input = document.getElementById(`input-${card}`);
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            setPreview(card, input.value);
          }
        });
        input.addEventListener('blur', () => {
          // subtle save on blur if valid
          const id = extractSpotifyTrackId(input.value);
          if (id) setPreview(card, input.value);
        });
      });
  
      // buttons
      document.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;
        const action = btn.getAttribute('data-action');
        const card = btn.getAttribute('data-target');
        if (action === 'embed') {
          const input = document.getElementById(`input-${card}`);
          setPreview(card, input.value);
        } else if (action === 'copy') {
          copyEmbed(card);
        } else if (action === 'clear') {
          // clear UI + storage
          saveLink(card, '');
          const input = document.getElementById(`input-${card}`);
          const linkEl = document.getElementById(`link-${card}`);
          const embedWrap = document.getElementById(`embed-${card}`);
          input.value = '';
          linkEl.href = '#';
          linkEl.setAttribute('aria-disabled', 'true');
          embedWrap.innerHTML = ''; embedWrap.setAttribute('aria-hidden', 'true');
          flashMessage('Cleared');
        }
      });
    }
  
    // On DOM ready
    document.addEventListener('DOMContentLoaded', () => {
      initFromStorage();
      attachEvents();
      // small accessibility enhancement: focus first input after short delay
      setTimeout(()=> { const f = document.getElementById('input-track1'); if (f) f.setAttribute('aria-describedby','t1-title'); }, 500);
    });
  
  })();