document.addEventListener('DOMContentLoaded', function() { 
    const navbar = document.getElementById('navbar'); 
    const navLinks = document.querySelectorAll('.nav-link'); 
 
    window.addEventListener('scroll', function() { 
        if (window.scrollY > 50) { 
            navbar.style.padding = '0.5rem 0'; 
        } else { 
            navbar.style.padding = '1rem 0'; 
        } 
    }); 
 
    navLinks.forEach(link => { 
        link.addEventListener('click', function(e) { 
            e.preventDefault(); 
            const targetId = this.getAttribute('href'); 
            const targetSection = document.querySelector(targetId); 
 
            if (targetSection) { 
                targetSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                }); 
            } 
        }); 
    }); 
 
    const observerOptions = { 
        threshold: 0.1, 
        rootMargin: '0px 0px -100px 0px' 
    }; 
 
    const observer = new IntersectionObserver(function(entries) { 
        entries.forEach(entry => { 
            if (entry.isIntersecting) { 
                entry.target.style.opacity = '1'; 
                entry.target.style.transform = 'translateY(0)'; 
            } 
        }); 
    }, observerOptions); 
 
    const sections = document.querySelectorAll('.section'); 
    sections.forEach(section => { 
        section.style.opacity = '0'; 
        section.style.transform = 'translateY(20px)'; 
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; 
        observer.observe(section); 
    }); 
});
