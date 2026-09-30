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

    // ==========================================
    // AJAX Contact / Reservation Form (Netlify Forms)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('form-submit-btn');
            const statusDiv = document.getElementById('form-status');
            const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
            const btnLoader = submitBtn ? submitBtn.querySelector('.btn-loader') : null;
            const lang = document.documentElement.lang || 'fr';

            // Loading state
            if (submitBtn) submitBtn.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnLoader) btnLoader.style.display = 'inline-flex';
            if (statusDiv) {
                statusDiv.style.display = 'none';
                statusDiv.className = 'form-status';
                statusDiv.innerHTML = '';
            }

            const formData = new FormData(contactForm);
            
            // Ensure form-name is explicitly set for Netlify Forms processing
            if (!formData.get('form-name')) {
                formData.append('form-name', contactForm.getAttribute('name') || 'contact');
            }

            try {
                // Submit to Netlify Forms (native, zero-failure endpoint)
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(formData).toString()
                });

                if (response.ok) {
                    let successMessage = '';
                    if (lang === 'en') {
                        successMessage = '<i class="fas fa-check-circle"></i> <div><strong>Thank you!</strong> Your request has been sent successfully. We will get back to you shortly.</div>';
                    } else if (lang === 'es') {
                        successMessage = '<i class="fas fa-check-circle"></i> <div><strong>¡Muchas gracias!</strong> Su solicitud ha sido enviada con éxito. Nos pondremos en contacto con usted a la brevedad.</div>';
                    } else if (lang === 'de') {
                        successMessage = '<i class="fas fa-check-circle"></i> <div><strong>Vielen Dank!</strong> Ihre Anfrage wurde erfolgreich gesendet. Wir werden uns in Kürze bei Ihnen melden.</div>';
                    } else {
                        successMessage = '<i class="fas fa-check-circle"></i> <div><strong>Merci !</strong> Votre demande a bien été envoyée. Notre équipe vous répondra dans les plus brefs délais.</div>';
                    }

                    if (statusDiv) {
                        statusDiv.className = 'form-status success';
                        statusDiv.innerHTML = successMessage;
                        statusDiv.style.display = 'flex';
                    }

                    contactForm.reset();
                } else {
                    throw new Error('Server returned ' + response.status);
                }
            } catch (err) {
                console.error('Form submission error:', err);
                let errorMessage = '';
                if (lang === 'en') {
                    errorMessage = '<i class="fas fa-exclamation-triangle"></i> <div>An error occurred while sending. You can contact us directly by email at <a href="mailto:contact.transportkhaled@gmail.com" style="text-decoration:underline;color:inherit;font-weight:bold;">contact.transportkhaled@gmail.com</a> or via WhatsApp.</div>';
                } else if (lang === 'es') {
                    errorMessage = '<i class="fas fa-exclamation-triangle"></i> <div>Ocurrió un error al enviar el formulario. Puede contactarnos directamente por email en <a href="mailto:contact.transportkhaled@gmail.com" style="text-decoration:underline;color:inherit;font-weight:bold;">contact.transportkhaled@gmail.com</a> o por WhatsApp.</div>';
                } else if (lang === 'de') {
                    errorMessage = '<i class="fas fa-exclamation-triangle"></i> <div>Beim Senden ist ein Fehler aufgetreten. Sie können uns direkt per E-Mail unter <a href="mailto:contact.transportkhaled@gmail.com" style="text-decoration:underline;color:inherit;font-weight:bold;">contact.transportkhaled@gmail.com</a> oder per WhatsApp kontaktieren.</div>';
                } else {
                    errorMessage = '<i class="fas fa-exclamation-triangle"></i> <div>Une erreur est survenue lors de l\'envoi. Vous pouvez nous contacter directement par email à <a href="mailto:contact.transportkhaled@gmail.com" style="text-decoration:underline;color:inherit;font-weight:bold;">contact.transportkhaled@gmail.com</a> ou par WhatsApp.</div>';
                }

                if (statusDiv) {
                    statusDiv.className = 'form-status error';
                    statusDiv.innerHTML = errorMessage;
                    statusDiv.style.display = 'flex';
                }
            } finally {
                if (submitBtn) submitBtn.disabled = false;
                if (btnText) btnText.style.display = 'inline-flex';
                if (btnLoader) btnLoader.style.display = 'none';
            }
        });
    }
});

