// Live local time — a small honest detail. Shown in Jakarta time (WIB).
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

// Reveal sections on scroll — subtle, and only once.
const revealTargets = document.querySelectorAll(
    '.intro, .section-head, .project, .aside, .prose, .contact-lede, .contact-list'
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
