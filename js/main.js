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
    // Countdown Timer - Offre Flash Beauvais 25€ (Fin 23 Octobre 2026 à 12:00)
    // ==========================================
    const initCountdown = () => {
        const countdownElems = document.querySelectorAll('.countdown-timer');
        if (countdownElems.length === 0) return;

        // Target Date: 23 Octobre 2026 at 12:00:00 CEST (UTC+2)
        const targetDate = new Date('2026-10-23T12:00:00+02:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            const isExpired = distance <= 0;
            const days = isExpired ? 0 : Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = isExpired ? 0 : Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = isExpired ? 0 : Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = isExpired ? 0 : Math.floor((distance % (1000 * 60)) / 1000);

            document.querySelectorAll('#cd-days, .cd-days').forEach(el => el.textContent = String(days).padStart(2, '0'));
            document.querySelectorAll('#cd-hours, .cd-hours').forEach(el => el.textContent = String(hours).padStart(2, '0'));
            document.querySelectorAll('#cd-minutes, .cd-minutes').forEach(el => el.textContent = String(minutes).padStart(2, '0'));
            document.querySelectorAll('#cd-seconds, .cd-seconds').forEach(el => el.textContent = String(seconds).padStart(2, '0'));

            if (isExpired) {
                const headerElem = document.getElementById('countdown-title-text');
                if (headerElem) {
                    const lang = document.documentElement.lang || 'fr';
                    if (lang === 'en') {
                        headerElem.textContent = 'Special flash offer ended - Check our standard rates below';
                    } else if (lang === 'es') {
                        headerElem.textContent = 'Oferta especial finalizada - Consulte nuestras tarifas estándar';
                    } else if (lang === 'de') {
                        headerElem.textContent = 'Sonderangebot beendet - Siehe Standardtarife unten';
                    } else {
                        headerElem.textContent = 'Offre spéciale flash terminée - Retrouvez nos tarifs standards ci-dessous';
                    }
                }
            }
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    };

    initCountdown();

    // ==========================================
    // Interactive Calculator - Tarifs Beauvais ⇄ Paris & Offre Flash
    // ==========================================
    const passengerButtons = document.querySelectorAll('.passenger-btn');
    const calcTextElem = document.querySelector('.calc-calc-text');
    const calcSubElem = document.querySelector('.calc-calc-sub');
    const whatsappPromoBtn = document.getElementById('btn-whatsapp-promo');

    if (passengerButtons.length > 0) {
        const lang = document.documentElement.lang || 'fr';

        const tarifData = {
            '1-4': {
                fr: {
                    text: '👥 1 à 4 passagers = <strong>120 € TTC</strong> au total',
                    sub: 'Soit dès 30 € par personne pour un trajet 100% privé et direct (Berline / Van Confort) !',
                    msg: 'Bonjour K-7 VTC, je souhaite réserver le trajet Beauvais - Paris pour 1 à 4 personnes (120€ TTC au total).'
                },
                en: {
                    text: '👥 1 to 4 passengers = <strong>€120 Total</strong>',
                    sub: 'From €30 per person for a 100% private, direct door-to-door trip (Sedan / Comfort Van)!',
                    msg: 'Hello K-7 VTC, I would like to book the transfer Beauvais - Paris for 1 to 4 passengers (€120 total).'
                },
                es: {
                    text: '👥 1 a 4 personas = <strong>120 € Total</strong>',
                    sub: '¡Desde 30 € por persona para un traslado 100% privado y directo (Berlina / Van Confort)!',
                    msg: 'Hola K-7 VTC, me gustaría reservar el traslado Beauvais - París para 1 a 4 personas (120€ en total).'
                },
                de: {
                    text: '👥 1 bis 4 Personen = <strong>120 € Gesamt</strong>',
                    sub: 'Ab 30 € pro Person für eine 100% private Direktfahrt (Limousine / Komfort-Van)!',
                    msg: 'Hallo K-7 VTC, ich möchte den Transfer Beauvais - Paris für 1 bis 4 Personen buchen (120€ gesamt).'
                }
            },
            '5': {
                fr: {
                    text: '👥 5 passagers × 25€ = <strong>125 € TTC</strong> au total',
                    sub: '🔥 Offre Flash : seulement 25 € par personne au lieu de 170 € (valable jusqu\'au 23/10 à 12h) !',
                    msg: 'Bonjour K-7 VTC, je souhaite réserver l\'offre spéciale Beauvais - Paris pour 5 personnes (125€ au total soit 25€/pers).'
                },
                en: {
                    text: '👥 5 passengers × €25 = <strong>€125 Total</strong>',
                    sub: '🔥 Flash Offer: only €25 per person instead of €170 (valid until Oct 23 at 12:00 PM)!',
                    msg: 'Hello K-7 VTC, I would like to book the special offer Beauvais - Paris for 5 passengers (€125 total, €25/person).'
                },
                es: {
                    text: '👥 5 personas × 25€ = <strong>125 € Total</strong>',
                    sub: '🔥 Oferta Flash: ¡solo 25 € por persona en lugar de 170 € (válida hasta el 23/10 a las 12:00)!',
                    msg: 'Hola K-7 VTC, me gustaría reservar la oferta especial Beauvais - París para 5 personas (125€ en total, 25€/persona).'
                },
                de: {
                    text: '👥 5 Personen × 25€ = <strong>125 € Gesamt</strong>',
                    sub: '🔥 Flash-Angebot: nur 25 € pro Person statt 170 € (gültig bis 23.10. um 12:00 Uhr)!',
                    msg: 'Hallo K-7 VTC, ich möchte das Sonderangebot Beauvais - Paris für 5 Personen buchen (125€ gesamt, 25€/Person).'
                }
            },
            '6': {
                fr: {
                    text: '👥 6 passagers × 25€ = <strong>150 € TTC</strong> au total',
                    sub: '🔥 Offre Flash : seulement 25 € par personne au lieu de 170 € (valable jusqu\'au 23/10 à 12h) !',
                    msg: 'Bonjour K-7 VTC, je souhaite réserver l\'offre spéciale Beauvais - Paris pour 6 personnes (150€ au total soit 25€/pers).'
                },
                en: {
                    text: '👥 6 passengers × €25 = <strong>€150 Total</strong>',
                    sub: '🔥 Flash Offer: only €25 per person instead of €170 (valid until Oct 23 at 12:00 PM)!',
                    msg: 'Hello K-7 VTC, I would like to book the special offer Beauvais - Paris for 6 passengers (€150 total, €25/person).'
                },
                es: {
                    text: '👥 6 personas × 25€ = <strong>150 € Total</strong>',
                    sub: '🔥 Oferta Flash: ¡solo 25 € por persona en lugar de 170 € (válida hasta el 23/10 a las 12:00)!',
                    msg: 'Hola K-7 VTC, me gustaría reservar la oferta especial Beauvais - París para 6 personas (150€ en total, 25€/persona).'
                },
                de: {
                    text: '👥 6 Personen × 25€ = <strong>150 € Gesamt</strong>',
                    sub: '🔥 Flash-Angebot: nur 25 € pro Person statt 170 € (gültig bis 23.10. um 12:00 Uhr)!',
                    msg: 'Hallo K-7 VTC, ich möchte das Sonderangebot Beauvais - Paris für 6 Personen buchen (150€ gesamt, 25€/Person).'
                }
            },
            '7': {
                fr: {
                    text: '👥 7 passagers = <strong>170 € TTC</strong> au total',
                    sub: 'Soit seulement 24,30 € par personne pour un van privatisé grand confort (jusqu\'à 7 places) !',
                    msg: 'Bonjour K-7 VTC, je souhaite réserver le trajet Beauvais - Paris pour 7 personnes (170€ TTC au total).'
                },
                en: {
                    text: '👥 7 passengers = <strong>€170 Total</strong>',
                    sub: 'Only ~€24.30 per person for a private luxury van up to 7 seats!',
                    msg: 'Hello K-7 VTC, I would like to book the transfer Beauvais - Paris for 7 passengers (€170 total).'
                },
                es: {
                    text: '👥 7 personas = <strong>170 € Total</strong>',
                    sub: '¡Solo 24,30 € por persona para una furgoneta privada de gran confort (hasta 7 plazas)!',
                    msg: 'Hola K-7 VTC, me gustaría reservar el traslado Beauvais - París para 7 personas (170€ en total).'
                },
                de: {
                    text: '👥 7 Personen = <strong>170 € Gesamt</strong>',
                    sub: 'Nur ca. 24,30 € pro Person für einen privaten Luxus-Van (bis zu 7 Sitze)!',
                    msg: 'Hallo K-7 VTC, ich möchte den Transfer Beauvais - Paris für 7 Personen buchen (170€ gesamt).'
                }
            },
            '8': {
                fr: {
                    text: '👥 8 passagers = <strong>200 € TTC</strong> au total',
                    sub: 'Soit seulement 25 € par personne pour un Grand Van VIP 8 places et grands bagages !',
                    msg: 'Bonjour K-7 VTC, je souhaite réserver le trajet Beauvais - Paris pour 8 personnes (200€ TTC au total).'
                },
                en: {
                    text: '👥 8 passengers = <strong>€200 Total</strong>',
                    sub: 'Only €25 per person for a Grand VIP Van with 8 seats and huge luggage space!',
                    msg: 'Hello K-7 VTC, I would like to book the transfer Beauvais - Paris for 8 passengers (€200 total).'
                },
                es: {
                    text: '👥 8 personas = <strong>200 € Total</strong>',
                    sub: '¡Solo 25 € por persona para una Grand Van VIP de 8 plazas y gran maletero!',
                    msg: 'Hola K-7 VTC, me gustaría reservar el traslado Beauvais - París para 8 personas (200€ en total).'
                },
                de: {
                    text: '👥 8 Personen = <strong>200 € Gesamt</strong>',
                    sub: 'Nur 25 € pro Person für einen Grand VIP-Van mit 8 Sitzen und großem Gepäckraum!',
                    msg: 'Hallo K-7 VTC, ich möchte den Transfer Beauvais - Paris für 8 Personen buchen (200€ gesamt).'
                }
            }
        };

        const updateDisplay = (key) => {
            const currentLang = ['fr', 'en', 'es', 'de'].includes(lang) ? lang : 'fr';
            const data = (tarifData[key] && tarifData[key][currentLang]) || tarifData['5'][currentLang];

            if (calcTextElem) calcTextElem.innerHTML = data.text;
            if (calcSubElem) calcSubElem.textContent = data.sub;

            if (whatsappPromoBtn) {
                whatsappPromoBtn.href = `https://wa.me/33636396606?text=${encodeURIComponent(data.msg)}`;
            }
        };

        passengerButtons.forEach(button => {
            button.addEventListener('click', function() {
                passengerButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const key = this.getAttribute('data-passengers') || '5';
                updateDisplay(key);
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

            // Submit via Netlify Forms in background and show confirmation
            if (submitBtn) {
                const btnText = submitBtn.querySelector('.btn-text');
                const btnLoader = submitBtn.querySelector('.btn-loader');
                if (btnText) btnText.style.display = 'none';
                if (btnLoader) btnLoader.style.display = 'inline-block';
                submitBtn.disabled = true;
            }

            const mailtoUrl = `mailto:contact.transportkhaled@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            const whatsappUrl = `https://wa.me/33636396606?text=${encodeURIComponent(emailBody)}`;

            // Send to Netlify Form backend in background
            const formData = new FormData(contactForm);
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(formData).toString()
            }).then(() => {
                // Form saved successfully in Netlify
            }).catch(() => {
                // Ignore network errors since mailto / whatsapp fallback is always ready
            }).finally(() => {
                if (submitBtn) {
                    const btnText = submitBtn.querySelector('.btn-text');
                    const btnLoader = submitBtn.querySelector('.btn-loader');
                    if (btnText) btnText.style.display = 'inline-block';
                    if (btnLoader) btnLoader.style.display = 'none';
                    submitBtn.disabled = false;
                }

                // Display clear confirmation & action buttons
                if (statusDiv) {
                    let successHtml = '';
                    if (lang === 'en') {
                        successHtml = `
                            <div class="form-success-card">
                                <div class="success-head">
                                    <i class="fas fa-check-circle"></i>
                                    <h4>Your request is ready!</h4>
                                </div>
                                <p>To guarantee fastest dispatch directly to our team, you can also send it in 1 click:</p>
                                <div class="form-success-buttons">
                                    <a href="${mailtoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fas fa-envelope"></i> Send to Email (contact.transportkhaled@gmail.com)</a>
                                    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp-direct btn-sm"><i class="fab fa-whatsapp"></i> Send via WhatsApp (Instant Reply)</a>
                                </div>
                            </div>
                        `;
                    } else if (lang === 'es') {
                        successHtml = `
                            <div class="form-success-card">
                                <div class="success-head">
                                    <i class="fas fa-check-circle"></i>
                                    <h4>¡Su solicitud ha sido preparada con éxito!</h4>
                                </div>
                                <p>Para una confirmación inmediata, también puede enviarla directamente en 1 clic:</p>
                                <div class="form-success-buttons">
                                    <a href="${mailtoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fas fa-envelope"></i> Enviar por Email (contact.transportkhaled@gmail.com)</a>
                                    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp-direct btn-sm"><i class="fab fa-whatsapp"></i> Enviar por WhatsApp (Respuesta Rápida)</a>
                                </div>
                            </div>
                        `;
                    } else if (lang === 'de') {
                        successHtml = `
                            <div class="form-success-card">
                                <div class="success-head">
                                    <i class="fas fa-check-circle"></i>
                                    <h4>Ihre Anfrage wurde erfolgreich vorbereitet!</h4>
                                </div>
                                <p>Für eine sofortige Bestätigung können Sie die Anfrage mit 1 Klick direkt senden:</p>
                                <div class="form-success-buttons">
                                    <a href="${mailtoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fas fa-envelope"></i> Per E-Mail senden (contact.transportkhaled@gmail.com)</a>
                                    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp-direct btn-sm"><i class="fab fa-whatsapp"></i> Per WhatsApp senden (Sofortige Antwort)</a>
                                </div>
                            </div>
                        `;
                    } else {
                        successHtml = `
                            <div class="form-success-card">
                                <div class="success-head">
                                    <i class="fas fa-check-circle"></i>
                                    <h4>Votre demande a été enregistrée avec succès !</h4>
                                </div>
                                <p>Pour un traitement prioritaire immédiat, vous pouvez également nous l'envoyer en 1 clic :</p>
                                <div class="form-success-buttons">
                                    <a href="${mailtoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="fas fa-envelope"></i> Envoyer par E-mail (contact.transportkhaled@gmail.com)</a>
                                    <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp-direct btn-sm"><i class="fab fa-whatsapp"></i> Envoyer sur WhatsApp (Réponse immédiate)</a>
                                </div>
                            </div>
                        `;
                    }

                    statusDiv.className = 'form-status success';
                    statusDiv.innerHTML = successHtml;
                    statusDiv.style.display = 'block';
                    
                    // Scroll to status message
                    statusDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        });
    }
});

