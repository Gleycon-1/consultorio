document.addEventListener('DOMContentLoaded', () => {
    // Menu Hamburguer
    const hamburger = document.querySelector('.hamburger-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const overlayNavList = document.querySelector('.overlay-nav-list');

    hamburger.addEventListener('click', () => {
        menuOverlay.classList.toggle('open');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('no-scroll'); // Previne scroll do corpo quando menu aberto
    });

    // Fechar menu ao clicar em um link ou fora do menu (para acessibilidade)
    overlayNavList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuOverlay.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Função para configurar carrosséis
    function setupCarousel(carouselContainer) {
        const slides = carouselContainer.querySelectorAll('.carousel-slide');
        if (slides.length === 0) return; // Não faz nada se não houver slides

        const prevButton = carouselContainer.querySelector('.carousel-prev');
        const nextButton = carouselContainer.querySelector('.carousel-next');
        const dotsContainer = carouselContainer.querySelector('.carousel-dots');
        let currentSlide = 0;
        let slideInterval;

        // Cria os "dots" de navegação
        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    showSlide(index);
                    resetInterval();
                });
                dotsContainer.appendChild(dot);
            });
        }
        const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
            // Atualiza os dots ativos
            dots.forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
            });
            currentSlide = index;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        function startInterval() {
            slideInterval = setInterval(nextSlide, 5000); // Troca de slide a cada 5 segundos
        }

        function resetInterval() {
            clearInterval(slideInterval);
            startInterval();
        }

        // Inicializa o primeiro slide e o intervalo
        showSlide(currentSlide);
        startInterval();

        // Adiciona eventos aos botões
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                prevSlide();
                resetInterval(); // Reseta o timer ao clicar
            });
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                resetInterval(); // Reseta o timer ao clicar
            });
        }
    }

    // Inicializa todos os carrosséis na página
    document.querySelectorAll('.carousel-container').forEach(container => {
        setupCarousel(container);
    });

    // Atualizar ano no footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Lidar com o formulário de contato (exemplo básico)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            const name = contactForm.querySelector('input[name="name"]').value;
            const email = contactForm.querySelector('input[name="email"]').value;
            const message = contactForm.querySelector('textarea[name="message"]').value;

            // Para um formulário funcional sem backend próprio, considere usar Formspree.io
            // No HTML do formulário, adicione:
            // action="https://formspree.io/f/YOUR_UNIQUE_FORM_ID" method="POST"
            // Você precisará se registrar no Formspree para obter o YOUR_UNIQUE_FORM_ID.
            // Para este exemplo, apenas um alerta:

            alert(`Obrigado, ${name}! Sua mensagem foi enviada. Entraremos em contato em breve.`);
            contactForm.reset(); // Limpa o formulário
        });
    }

    // Rolagem suave para os links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});