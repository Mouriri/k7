// Force HTTPS
if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}

document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = burger.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = burger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Close language dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.lang-dropdown')) {
            document.querySelectorAll('.lang-dropdown').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });

    // Cookie Banner Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    if (cookieBanner && acceptCookiesBtn) {
        if (!localStorage.getItem('cookiesAccepted')) {
            setTimeout(() => {
                cookieBanner.style.display = 'block';
            }, 1000);
        }

        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }

    // ==========================================
    // Interactive Calculator - Offre Beauvais 25€
    // ==========================================
    const passengerButtons = document.querySelectorAll('.passenger-btn');
    const calcCountElem = document.getElementById('calc-passengers-count');
    const calcTotalElem = document.getElementById('calc-total-price');
    const whatsappPromoBtn = document.getElementById('btn-whatsapp-promo');

    if (passengerButtons.length > 0) {
        const lang = document.documentElement.lang || 'fr';

        const updateBookingLink = (passengers, total) => {
            let message = '';
            if (lang === 'en') {
                message = `Hello K-7 VTC, I would like to book the special offer Beauvais Airport - Paris for ${passengers} passengers (€${total} total, €25/person).`;
            } else if (lang === 'es') {
                message = `Hola K-7 VTC, me gustaría reservar la oferta especial Aeropuerto Beauvais - París para ${passengers} personas (${total}€ en total, 25€/persona).`;
            } else if (lang === 'de') {
                message = `Hallo K-7 VTC, ich möchte das Sonderangebot Flughafen Beauvais - Paris für ${passengers} Personen buchen (${total}€ gesamt, 25€/Person).`;
            } else {
                message = `Bonjour K-7 VTC, je souhaite réserver l'offre spéciale Aéroport Beauvais - Paris pour ${passengers} personnes (${total}€ au total soit 25€/pers).`;
            }

            if (whatsappPromoBtn) {
                whatsappPromoBtn.href = `https://wa.me/33636396606?text=${encodeURIComponent(message)}`;
            }
        };

        passengerButtons.forEach(button => {
            button.addEventListener('click', function() {
                passengerButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const count = parseInt(this.getAttribute('data-passengers'), 10) || 5;
                const total = count * 25;

                if (calcCountElem) calcCountElem.textContent = count;
                if (calcTotalElem) calcTotalElem.textContent = total;

                updateBookingLink(count, total);
            });
        });
    }
});

