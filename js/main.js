document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        offset: 100,
        once: true
    });

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

            const formData = {
                name: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                message: this.querySelector('textarea').value
            };

            try {
                console.log('Envoi des données:', formData); // Debug

                const BACKEND_URL = 'https://votre-app.onrender.com';

                const response = await fetch(`${BACKEND_URL}/send-email`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData),
                    mode: 'cors'
                });

                console.log('Réponse reçue:', response); // Debug

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Erreur serveur');
                }

                const data = await response.json();
                console.log('Données reçues:', data); // Debug

                // Succès
                submitButton.classList.add('success');
                submitButton.innerHTML = '<i class="fas fa-check"></i> Message envoyé!';
                contactForm.reset();
                
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Envoyer';
                    submitButton.classList.remove('success');
                }, 3000);

            } catch (error) {
                console.error('Erreur détaillée:', error);
                submitButton.classList.add('error');
                submitButton.innerHTML = '<i class="fas fa-exclamation-circle"></i> Erreur: ' + error.message;
                
                setTimeout(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = 'Envoyer';
                    submitButton.classList.remove('error');
                }, 3000);
            }
        });
    }

    // Animation smooth scroll pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Menu mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        // Toggle nav
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Animate links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Fermer le menu quand on clique sur un lien
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            links.forEach(link => {
                link.style.animation = '';
            });
        });
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            links.forEach(link => {
                link.style.animation = '';
            });
        }
    });

    // Curseur personnalisé
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .skill-card, .project-card').forEach(element => {
        element.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        element.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    // Animation des nombres
    function animateNumbers() {
        const numbers = document.querySelectorAll('.number-animation');
        numbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const updateNumber = () => {
                if (current < target) {
                    current += increment;
                    number.textContent = Math.ceil(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    number.textContent = target;
                }
            };
            updateNumber();
        });
    }

    // Animation au scroll
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-card, .project-card, .timeline-item').forEach(element => {
        observer.observe(element);
    });

    // Effet de parallaxe
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.skill-card, .project-card');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenterX = rect.left + rect.width / 2;
            const cardCenterY = rect.top + rect.height / 2;
            
            const angleX = (cardCenterY - e.clientY) * 0.01;
            const angleY = (e.clientX - cardCenterX) * 0.01;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });
    });
}); 