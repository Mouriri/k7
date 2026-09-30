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
    // Contact & Reservation Form Handler (100% Reliable Delivery)
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('form-submit-btn');
            const statusDiv = document.getElementById('form-status');
            const lang = document.documentElement.lang || 'fr';

            // Extract form values
            const name = (contactForm.querySelector('[name="nom"], [name="name"]') || {}).value || '';
            const email = (contactForm.querySelector('[name="email"]') || {}).value || '';
            const phone = (contactForm.querySelector('[name="telephone"], [name="phone"]') || {}).value || '';
            const service = (contactForm.querySelector('[name="service"]') || {}).value || 'VTC';
            const pickup = (contactForm.querySelector('[name="depart"], [name="pickup"], [name="recogida"], [name="abholort"]') || {}).value || 'Non précisé';
            const dropoff = (contactForm.querySelector('[name="destination"], [name="dropoff"], [name="destino"], [name="zielort"]') || {}).value || 'Non précisé';
            const datetime = (contactForm.querySelector('[name="date_heure"], [name="datetime"], [name="fecha_hora"], [name="datum_uhrzeit"]') || {}).value || 'Non précisé';
            const passengers = (contactForm.querySelector('[name="passagers"], [name="passengers"], [name="passajeros"], [name="passagiere"]') || {}).value || '1';
            const luggage = (contactForm.querySelector('[name="bagages"], [name="luggage"], [name="equipaje"], [name="gepaeck"]') || {}).value || '0';
            const message = (contactForm.querySelector('[name="message"], [name="mensaje"], [name="nachricht"]') || {}).value || 'Aucun';

            // Construct formatted email and WhatsApp body
            let emailSubject = `Demande de réservation K-7 VTC - ${name}`;
            let emailBody = `Bonjour K-7 VTC,\n\nVoici ma demande de réservation / devis :\n\n` +
                `👤 Nom & Prénom : ${name}\n` +
                `📧 E-mail : ${email}\n` +
                `📞 Téléphone : ${phone}\n` +
                `🚘 Prestation : ${service}\n` +
                `📍 Prise en charge : ${pickup}\n` +
                `🏁 Destination : ${dropoff}\n` +
                `📅 Date & Heure : ${datetime}\n` +
                `👥 Passagers : ${passengers}\n` +
                `🧳 Bagages : ${luggage}\n` +
                `💬 Message / Précisions : ${message}\n\n` +
                `Merci de me recontacter avec votre confirmation de tarif.`;

            if (lang === 'en') {
                emailSubject = `Booking Request K-7 VTC - ${name}`;
                emailBody = `Hello K-7 VTC,\n\nHere is my booking / quote request:\n\n` +
                    `👤 Full Name: ${name}\n` +
                    `📧 Email: ${email}\n` +
                    `📞 Phone: ${phone}\n` +
                    `🚘 Service: ${service}\n` +
                    `📍 Pickup: ${pickup}\n` +
                    `🏁 Destination: ${dropoff}\n` +
                    `📅 Date & Time: ${datetime}\n` +
                    `👥 Passengers: ${passengers}\n` +
                    `🧳 Luggage: ${luggage}\n` +
                    `💬 Message / Notes: ${message}\n\n` +
                    `Thank you for confirming with your quote.`;
            } else if (lang === 'es') {
                emailSubject = `Solicitud de reserva K-7 VTC - ${name}`;
                emailBody = `Hola K-7 VTC,\n\nAquí están los datos de mi solicitud de reserva:\n\n` +
                    `👤 Nombre: ${name}\n` +
                    `📧 Email: ${email}\n` +
                    `📞 Teléfono: ${phone}\n` +
                    `🚘 Servicio: ${service}\n` +
                    `📍 Recogida: ${pickup}\n` +
                    `🏁 Destino: ${dropoff}\n` +
                    `📅 Fecha y Hora: ${datetime}\n` +
                    `👥 Pasajeros: ${passengers}\n` +
                    `🧳 Equipaje: ${luggage}\n` +
                    `💬 Mensaje: ${message}\n\n` +
                    `Gracias por enviarme la confirmación de tarifa.`;
            } else if (lang === 'de') {
                emailSubject = `Buchungsanfrage K-7 VTC - ${name}`;
                emailBody = `Hallo K-7 VTC,\n\nhier sind die Details meiner Buchungsanfrage:\n\n` +
                    `👤 Name: ${name}\n` +
                    `📧 E-Mail: ${email}\n` +
                    `📞 Telefon: ${phone}\n` +
                    `🚘 Dienstleistung: ${service}\n` +
                    `📍 Abholort: ${pickup}\n` +
                    `🏁 Zielort: ${dropoff}\n` +
                    `📅 Datum & Uhrzeit: ${datetime}\n` +
                    `👥 Passagiere: ${passengers}\n` +
                    `🧳 Gepäck: ${luggage}\n` +
                    `💬 Nachricht: ${message}\n\n` +
                    `Vielen Dank für Ihre Bestätigung und das Angebot.`;
            }

            const mailtoUrl = `mailto:contact.transportkhaled@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            const whatsappUrl = `https://wa.me/33636396606?text=${encodeURIComponent(emailBody)}`;

            // Open user's email client directly with all prefilled details
            window.location.href = mailtoUrl;

            // Display clear confirmation & immediate choice buttons
            if (statusDiv) {
                let successHtml = '';
                if (lang === 'en') {
                    successHtml = `
                        <div class="form-success-card">
                            <div class="success-head">
                                <i class="fas fa-check-circle"></i>
                                <h4>Your request is prepared for contact.transportkhaled@gmail.com!</h4>
                            </div>
                            <p>If your email app did not open automatically, please click below:</p>
                            <div class="form-success-buttons">
                                <a href="${mailtoUrl}" class="btn btn-primary btn-sm"><i class="fas fa-envelope"></i> Send Email</a>
                                <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp-direct btn-sm"><i class="fab fa-whatsapp"></i> Send via WhatsApp (Instant)</a>
                            </div>
                        </div>
                    `;
                } else if (lang === 'es') {
                    successHtml = `
                        <div class="form-success-card">
                            <div class="success-head">
                                <i class="fas fa-check-circle"></i>
                                <h4>¡Su solicitud está lista para contact.transportkhaled@gmail.com!</h4>
                            </div>
                            <p>Si su aplicación de correo no se abrió automáticamente, haga clic aquí:</p>
                            <div class="form-success-buttons">
                                <a href="${mailtoUrl}" class="btn btn-primary btn-sm"><i class="fas fa-envelope"></i> Enviar por Email</a>
                                <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp-direct btn-sm"><i class="fab fa-whatsapp"></i> Enviar por WhatsApp</a>
                            </div>
                        </div>
                    `;
                } else if (lang === 'de') {
                    successHtml = `
                        <div class="form-success-card">
                            <div class="success-head">
                                <i class="fas fa-check-circle"></i>
                                <h4>Ihre Anfrage ist bereit für contact.transportkhaled@gmail.com!</h4>
                            </div>
                            <p>Falls sich Ihr E-Mail-Programm nicht automatisch geöffnet hat, klicken Sie bitte hier:</p>
                            <div class="form-success-buttons">
                                <a href="${mailtoUrl}" class="btn btn-primary btn-sm"><i class="fas fa-envelope"></i> Per E-Mail senden</a>
                                <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp-direct btn-sm"><i class="fab fa-whatsapp"></i> Per WhatsApp senden</a>
                            </div>
                        </div>
                    `;
                } else {
                    successHtml = `
                        <div class="form-success-card">
                            <div class="success-head">
                                <i class="fas fa-check-circle"></i>
                                <h4>Votre demande est prête pour contact.transportkhaled@gmail.com !</h4>
                            </div>
                            <p>Si votre messagerie ne s'est pas ouverte automatiquement, cliquez sur le bouton ci-dessous :</p>
                            <div class="form-success-buttons">
                                <a href="${mailtoUrl}" class="btn btn-primary btn-sm"><i class="fas fa-envelope"></i> Envoyer par E-mail</a>
                                <a href="${whatsappUrl}" target="_blank" class="btn btn-whatsapp-direct btn-sm"><i class="fab fa-whatsapp"></i> Envoyer sur WhatsApp (Réponse immédiate)</a>
                            </div>
                        </div>
                    `;
                }

                statusDiv.className = 'form-status success';
                statusDiv.innerHTML = successHtml;
                statusDiv.style.display = 'block';
            }
        });
    }
});

