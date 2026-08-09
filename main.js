const menuBtn = document.getElementById('menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });

        /* ─────────────────────────────────────
           FAQ (accordion — clique para abrir/fechar)
        ───────────────────────────────────── */
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach((item) => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                faqItems.forEach((other) => other.classList.remove('open'));
                if (!isOpen) item.classList.add('open');
            });
        });
        /* ─────────────────────────────────────
           PROJECT SHOWCASE (carrossel de projetos)
        ───────────────────────────────────── */
        const projectTrack = document.getElementById('projectTrack');
        const projectSlides = projectTrack ? projectTrack.querySelectorAll('article') : [];
        const prevProjectBtn = document.getElementById('prevProject');
        const nextProjectBtn = document.getElementById('nextProject');
        const projectDots = document.getElementById('projectDots');
        const projectCurrentEl = document.getElementById('projectCurrent');
        const projectTotalEl = document.getElementById('projectTotal');

        if (projectTrack && projectSlides.length) {
            let currentProject = 0;
            const totalProjects = projectSlides.length;

            if (projectTotalEl) projectTotalEl.textContent = totalProjects;

            if (projectDots) {
                projectSlides.forEach((_, i) => {
                    const dot = document.createElement('button');
                    dot.className = 'project-dot' + (i === 0 ? ' active' : '');
                    dot.setAttribute('aria-label', `Ir para o projeto ${i + 1}`);
                    dot.addEventListener('click', () => goToProject(i));
                    projectDots.appendChild(dot);
                });
            }
            const dotEls = projectDots ? projectDots.querySelectorAll('.project-dot') : [];

            function goToProject(index) {
                currentProject = (index + totalProjects) % totalProjects;
                projectTrack.style.transform = `translateX(-${currentProject * 100}%)`;
                dotEls.forEach((d, i) => d.classList.toggle('active', i === currentProject));
                if (projectCurrentEl) projectCurrentEl.textContent = currentProject + 1;
            }

            if (prevProjectBtn) prevProjectBtn.addEventListener('click', () => goToProject(currentProject - 1));
            if (nextProjectBtn) nextProjectBtn.addEventListener('click', () => goToProject(currentProject + 1));

            // Swipe no celular
            let touchStartX = 0;
            projectTrack.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, { passive: true });
            projectTrack.addEventListener('touchend', (e) => {
                const diff = e.changedTouches[0].clientX - touchStartX;
                if (Math.abs(diff) > 40) {
                    diff < 0 ? goToProject(currentProject + 1) : goToProject(currentProject - 1);
                }
            }, { passive: true });
        }
