// Live local time, shown in the rail in Jakarta time (WIB).
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

// Scroll progress as a segmented installer-style bar across the top.
const progress = document.getElementById('progress');

if (progress) {
    let ticking = false;
    const updateProgress = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        ticking = false;
    };
    window.addEventListener(
        'scroll',
        () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(updateProgress);
            }
        },
        { passive: true }
    );
    updateProgress();
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

// Fill the checkbox of the nav item whose section is in view.
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
