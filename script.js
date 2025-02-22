document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const header = document.querySelector('header');
    const faqItems = document.querySelectorAll('.faq-item');
    const scrollElements = document.querySelectorAll('.fade-in');
  
    // Menü Toggle İşlevi
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
  
    // Sayfa Kaydırma İşlevi
    window.addEventListener('scroll', function() {
        // Header stilini değiştir
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Scroll animasyonları
        scrollElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    });
    
    // Sayfa yüklendiğinde görünür elementleri ayarla
    setTimeout(() => {
        handleScrollAnimation();
    }, 100);
  
    // SSS Accordion İşlevi
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Aktif item'ı kapat
            const currentActive = document.querySelector('.faq-item.active');
            if (currentActive && currentActive !== item) {
                currentActive.classList.remove('active');
            }
            
            // Tıklanan item'ı toggle et
            item.classList.toggle('active');
        });
    });
  
    // Tüm bağlantıları seç ve sayfa içi kaydırma ekle
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Mobil menüyü kapat
                navMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
                
                // Hedefe kaydır
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
  
    // İletişim Formu Gönderimi
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form doğrulama
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (isValid) {
                const successMessage = document.createElement('div');
                successMessage.classList.add('success-message');
                successMessage.innerHTML = '<p>Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.</p>';
                successMessage.style.cssText = 'background-color: #2ecc71; color: white; padding: 15px; border-radius: 5px; margin-top: 20px;';
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }
  
    // Bülten Aboneliği
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput.value.trim()) {
                const successText = document.createElement('p');
                successText.textContent = 'Bültenimize başarıyla abone oldunuz!';
                successText.style.cssText = 'color: #2ecc71; margin-top: 10px;';
                
                this.appendChild(successText);
                this.reset();
                
                setTimeout(() => {
                    successText.remove();
                }, 3000);
            }
        });
    }
  
    // Scroll Animasyonu
    function handleScrollAnimation() {
        scrollElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
  
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8;
    }
  
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation();
  
    // Aktif Menü Öğesini Ayarlama
    function setActiveNavItem() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('nav ul li a');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 100)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + currentSection) {
                item.classList.add('active');
            }
        });
    }
  
    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem();
    
    // Referanslar Slider
    const references = document.querySelectorAll('.reference-item');
    references.forEach((reference, index) => {
        reference.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
        if (index >= 5) { // Mobil görünümde daha az referans göster
            reference.style.display = 'none';
        }
    });
    
    function checkViewport() {
        if (window.innerWidth < 768) {
            references.forEach((reference, index) => {
                reference.style.display = (index < 3) ? 'block' : 'none';
            });
        } else {
            references.forEach((reference, index) => {
                reference.style.display = (index < 5) ? 'block' : 'none';
            });
        }
    }
    
    checkViewport();
    window.addEventListener('resize', checkViewport);

    // --- Hero Slider Kodu ---
    const slides = document.querySelectorAll('.hero-slider .slide');
    let currentSlide = 0;
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 3000); // Her 3 saniyede bir geçiş
});
