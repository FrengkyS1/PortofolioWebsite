// Live local time, shown as a player-style timecode in Jakarta time (WIB).
const clock = document.getElementById('clock');

function tickClock() {
    if (!clock) return;
    const now = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
    });
    clock.textContent = `Jakarta · ${now} WIB`;
}
tickClock();
setInterval(tickClock, 30_000);

// Scroll progress as a 2px amber seek line across the top of the viewport.
const seekbar = document.getElementById('seekbar');

if (seekbar) {
    let ticking = false;
    const updateSeek = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        seekbar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        ticking = false;
    };
    window.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateSeek);
            }
        },
        { passive: true }
    );
    updateSeek();
}

// Decorative waveform in the intro: amber bars with a slow sweeping
// playhead. Deterministic heights so it looks the same on every load.
const wave = document.getElementById('wave');

if (wave) {
    const W = 520;
    const H = 52;
    const BARS = 52;
    const step = W / BARS;
    let bars = '';
    for (let i = 0; i < BARS; i++) {
        // layered sines give a plausible audio envelope without randomness
        const t = i / BARS;
        const env =
            0.35 +
            0.65 *
                Math.abs(
                    Math.sin(t * Math.PI * 2.3) * 0.6 +
                    Math.sin(t * Math.PI * 7.1) * 0.3 +
                    Math.sin(t * Math.PI * 13.7) * 0.1
                );
        const h = Math.max(3, Math.round(env * H * 0.9));
        const y = Math.round((H - h) / 2);
        const opacity = (0.25 + env * 0.6).toFixed(2);
        bars += `<rect x="${(i * step).toFixed(1)}" y="${y}" width="3" height="${h}" rx="1.5" fill="var(--amber)" opacity="${opacity}"/>`;
    }
    wave.innerHTML =
        `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" focusable="false">` +
        bars +
        `<rect class="playhead" x="0" y="0" width="1.5" height="${H}" fill="var(--text)" opacity="0.8"/>` +
        `</svg>`;
}

// Reveal sections on scroll: subtle, and only once.
const revealTargets = document.querySelectorAll(
    '.intro, .section h2, .project, .aside, .prose, .contact-lede, .contact-list'
);

if ('IntersectionObserver' in window) {
    revealTargets.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    revealTargets.forEach((el) => observer.observe(el));
}

// Highlight the nav link for the section currently in view.
const navLinks = Array.from(document.querySelectorAll('.nav a'));
const watched = navLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

if (watched.length) {
    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach((link) =>
                        link.classList.toggle(
                            'is-active',
                            link.getAttribute('href') === `#${id}`
                        )
                    );
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );

    watched.forEach((section) => navObserver.observe(section));
}
