/* ==========================================================================
   SAMSTORE.ID JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Navigation Scroll Effect
       ========================================================================== */
    const header = document.getElementById('site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       2. Mobile Menu Toggle
       ========================================================================== */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const menuBtnIcon = document.getElementById('menu-btn-icon');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Toggle Icon
        if (navMenu.classList.contains('active')) {
            menuBtnIcon.className = 'ri-close-line';
        } else {
            menuBtnIcon.className = 'ri-menu-3-line';
        }
    });

    // Close mobile menu when nav link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuBtnIcon.className = 'ri-menu-3-line';
            
            // Set active class
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Active link based on scroll position
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       3. Theme Toggler (Dark / Light Mode)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.className = savedTheme;
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateThemeIcon('light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateThemeIcon('dark-theme');
        }
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark-theme') {
            themeIcon.className = 'ri-moon-line';
            themeToggleBtn.style.color = 'var(--text-primary)';
        } else {
            themeIcon.className = 'ri-sun-line';
            themeToggleBtn.style.color = 'var(--accent-purple)';
        }
    }

    /* ==========================================================================
       4. Stats Counter Animation
       ========================================================================== */
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.about-section');
    let animated = false;

    const countUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'), 10);
        let count = 0;
        const duration = 2000; // 2 seconds
        const stepTime = Math.max(Math.floor(duration / target), 15);
        
        const timer = setInterval(() => {
            count += Math.ceil(target / (duration / stepTime));
            if (count >= target) {
                element.innerText = target + '+';
                clearInterval(timer);
            } else {
                element.innerText = count + '+';
            }
        }, stepTime);
    };

    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                statNumbers.forEach(num => countUp(num));
                animated = true;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    /* ==========================================================================
       5. Portfolio Filtering Logic
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                // Hide with transition
                item.style.transform = 'scale(0.8)';
                item.style.opacity = '0';
                
                setTimeout(() => {
                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.transform = 'scale(1)';
                            item.style.opacity = '1';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    /* ==========================================================================
       6. Lightbox Modal for Portfolio Details
       ========================================================================== */
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close-btn');
    const lightboxMedia = document.getElementById('lightbox-media');
    const lightboxCat = document.getElementById('lightbox-cat');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');

    const portfolioData = {
        'portfolio-item-1': {
            category: 'GFX Thumbnail',
            title: 'Battle of Floating Island',
            desc: 'Thumbnail khusus game Roblox bertema pertempuran fantasi di pulau melayang. Dilengkapi dengan rendering 3D super detail untuk 2 avatar, efek lighting dinamis neon biru-merah, dan manipulasi background awan pastel yang estetik.',
            mediaHTML: '<img src="assets/portfolio_thumbnail.png" alt="GFX Thumbnail Detail">'
        },
        'portfolio-item-2': {
            category: 'Video Cinematic',
            title: 'Roblox City Lights Trailer',
            desc: 'Draf visual video trailer sinematik game bergenre Roleplay/Showcase. Menggunakan modifikasi shader neon di dalam Roblox Studio, pergerakan kamera halus ala drone (smooth tracking), sound design imersif, dan filter warna ungu-cyan modern. Durasi 20 detik yang ramah TikTok.',
            mediaHTML: `
                <div class="mock-video-player" style="position:relative; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#110D26;">
                    <img src="assets/portfolio_cinematic.png" alt="Video Preview" style="width:100%; height:100%; object-fit:cover; opacity:0.4; position:absolute; top:0; left:0;">
                    <div class="video-play-overlay" style="z-index:2; text-align:center; padding: 20px;">
                        <i class="ri-play-fill" style="font-size:4rem; color:var(--accent-cyan); cursor:pointer; background:rgba(20,14,45,0.8); width:80px; height:80px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; border:2px solid var(--accent-cyan); box-shadow:0 0 20px rgba(0,180,216,0.4); margin-bottom:15px; transition:0.3s;" onmouseover="this.style.transform='scale(1.1)'; this.style.boxShadow='0 0 30px rgba(0,180,216,0.6)'" onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 0 20px rgba(0,180,216,0.4)'"></i>
                        <h4 style="font-family:var(--font-heading); font-size:1.2rem; color:#fff; text-shadow:0 2px 4px rgba(0,0,0,0.8);">[Simulasi Pemutar Video]</h4>
                        <p style="font-size:0.85rem; color:var(--text-secondary); max-width:320px; margin-top:5px;">Video full resolusi akan langsung dikirimkan ke klien setelah pengerjaan selesai.</p>
                    </div>
                </div>
            `
        },
        'portfolio-item-3': {
            category: 'Profile & Avatar',
            title: 'Streetwear Boy GFX',
            desc: 'Avatar render (GFX) berkualitas tinggi untuk profil media sosial. Karakter dipose secara kustom menggunakan Blender, memakai streetwear hoodie yang modis, dengan pencahayaan studio lembut (soft box) bermodel sunset glow di latar belakang pastel pink.',
            mediaHTML: '<img src="assets/portfolio_avatar.png" alt="Aesthetic Avatar Detail">'
        }
    };

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const itemId = item.getAttribute('id');
            const data = portfolioData[itemId];
            
            if (data) {
                lightboxMedia.innerHTML = data.mediaHTML;
                lightboxCat.innerText = data.category;
                lightboxTitle.innerText = data.title;
                lightboxDesc.innerText = data.desc;
                
                lightboxModal.classList.add('active');
                lightboxModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Lock background scroll
            }
        });
    });

    const closeLightbox = () => {
        lightboxModal.classList.remove('active');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto'; // Unlock scroll
        setTimeout(() => {
            lightboxMedia.innerHTML = '';
        }, 300);
    };

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close lightbox on click outside the content card
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightbox();
        }
    });

    // Close on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            closeLightbox();
        }
    });

    /* ==========================================================================
       7. Testimonials Slider Logic (Carousel)
       ========================================================================== */
    const sliderWrapper = document.getElementById('testimonial-slider-wrapper');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('slider-prev-btn');
    const nextBtn = document.getElementById('slider-next-btn');
    const dotsContainer = document.getElementById('slider-dots-container');

    let currentSlide = 0;
    const slideCount = slides.length;
    let autoSlideInterval;

    // Generate dots dynamically
    for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.className = `dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('data-index', i);
        dot.setAttribute('aria-label', `Lihat Ulasan ${i + 1}`);
        dotsContainer.appendChild(dot);
        
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetAutoSlide();
        });
    }

    const dots = document.querySelectorAll('.dot');

    const updateSlider = () => {
        sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update dots state
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    };

    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    };

    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    };

    const goToSlide = (index) => {
        currentSlide = index;
        updateSlider();
    };

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    // Auto rotate slides
    const startAutoSlide = () => {
        autoSlideInterval = setInterval(nextSlide, 5000);
    };

    const resetAutoSlide = () => {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    };

    startAutoSlide();

    /* ==========================================================================
       8. FAQ Accordion Dropdowns
       ========================================================================== */
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                if (faqItem !== item) {
                    faqItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    /* ==========================================================================
       9. Form Visual File Upload Indicator
       ========================================================================== */
    const fileInput = document.getElementById('order-file');
    const uploadBox = document.getElementById('file-upload-box');
    const uploadStatus = document.getElementById('upload-status-text');

    fileInput.addEventListener('change', (e) => {
        if (fileInput.files.length > 0) {
            const fileName = fileInput.files[0].name;
            uploadStatus.innerHTML = `<i class="ri-checkbox-circle-fill" style="color:var(--accent-cyan)"></i> <strong>Terpilih:</strong> ${fileName}`;
            uploadBox.style.borderColor = 'var(--accent-cyan)';
        } else {
            uploadStatus.innerHTML = `Pilih atau Drag file referensi di sini (Gambar)`;
            uploadBox.style.borderColor = 'var(--input-border)';
        }
    });

    /* ==========================================================================
       10. Form Order Submission to WhatsApp
       ========================================================================== */
    const orderForm = document.getElementById('whatsapp-order-form');
    const orderSelect = document.getElementById('order-service');
    
    // Automatically select service if user clicks a CTA button from the Pricing cards
    const serviceButtons = document.querySelectorAll('.service-btn');
    serviceButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceName = btn.getAttribute('data-service');
            
            // Set service dropdown value
            if (serviceName.includes('Starter')) {
                orderSelect.value = 'Foto Profil (Starter GFX)';
            } else if (serviceName.includes('Pro')) {
                orderSelect.value = 'GFX Thumbnail (Pro)';
            } else if (serviceName.includes('Cinematic')) {
                orderSelect.value = 'Video Cinematic';
            }
            
            // Set package dropdown value matches
            const packageSelect = document.getElementById('order-package');
            if (serviceName.includes('Starter')) {
                packageSelect.value = 'Starter (Rp 45.000)';
            } else if (serviceName.includes('Pro')) {
                packageSelect.value = 'Pro (Rp 85.000)';
            } else if (serviceName.includes('Cinematic')) {
                packageSelect.value = 'Cinematic (Rp 150.000)';
            }
        });
    });

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('order-name').value;
        const service = document.getElementById('order-service').value;
        const pack = document.getElementById('order-package').value;
        const desc = document.getElementById('order-desc').value;
        const contact = document.getElementById('order-contact').value;
        
        // Target WhatsApp: 6282100887766 (clean number)
        const waNumber = '6282100887766';
        
        // Format WA message template with emoji styling
        const message = `*HALO SAMSTORE.ID! SAYA INGIN MEMESAN JASA VISUAL* 🎮✨
        
-----------------------------------------
👤 *Nama / Username Roblox:*
${name}

💼 *Layanan Utama:*
${service}

🏷️ *Pilihan Paket:*
${pack}

📝 *Detail & Konsep Pesanan:*
${desc}

📱 *Kontak Penghubung:*
${contact}
-----------------------------------------

_Mohon info detail metode pembayaran dan langkah selanjutnya, terima kasih!_`;

        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodedMessage}`;
        
        // Open WhatsApp link in new tab
        window.open(waLink, '_blank');
    });

    /* ==========================================================================
       11. Scroll Reveal Animations (Intersection Observer)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .fade-in');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // Trigger reveal for hero elements immediately on load
    setTimeout(() => {
        const heroBadge = document.getElementById('hero-badge');
        const heroTitle = document.getElementById('hero-title');
        const heroSubtitle = document.getElementById('hero-subtitle');
        const heroActions = document.getElementById('hero-actions-container');
        const heroImage = document.getElementById('hero-image-container');
        
        if(heroBadge) heroBadge.classList.add('active');
        if(heroTitle) heroTitle.classList.add('active');
        if(heroSubtitle) heroSubtitle.classList.add('active');
        if(heroActions) heroActions.classList.add('active');
        if(heroImage) heroImage.classList.add('active');
    }, 100);
});
