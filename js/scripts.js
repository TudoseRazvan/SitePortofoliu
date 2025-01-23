document.addEventListener("DOMContentLoaded", function () {
    const projectCards = document.querySelectorAll(".project-card");
    const prevBtn = document.getElementById("prev-project");
    const nextBtn = document.getElementById("next-project");
    let currentIndex = 0;
    const cardsPerPage = 3;
    let isAnimating = false;

    function updateProjects(direction) {
        if (isAnimating) return;
        isAnimating = true;

        const oldIndex = currentIndex;
        if (direction === 'next' && currentIndex + cardsPerPage < projectCards.length) {
            currentIndex += 1;
        } else if (direction === 'prev' && currentIndex > 0) {
            currentIndex -= 1;
        }

        projectCards.forEach((card, index) => {
            card.classList.remove("enter-right", "enter-left", "enter-active", "leave-right", "leave-left", "show");
            if (index >= oldIndex && index < oldIndex + cardsPerPage) {
                card.classList.add(direction === 'next' ? "leave-left" : "leave-right");
            }
            if (index >= currentIndex && index < currentIndex + cardsPerPage) {
                card.classList.add("show", direction === 'next' ? "enter-right" : "enter-left");
                setTimeout(() => {
                    card.classList.add("enter-active");
                }, 20); // Timeout pentru a permite browserului sa aplice tranzitia
            }
        });

        setTimeout(() => {
            isAnimating = false;
        }, 500); // Durata animatiei
    }

    prevBtn.addEventListener("click", function () {
        updateProjects('prev');
    });

    nextBtn.addEventListener("click", function () {
        updateProjects('next');
    });

    // Afiseaza primele trei carduri initial
    updateProjects();

    const typeText = (elementId, text, delay = 100) => {
        const element = document.getElementById(elementId);
        let i = 0;
    
        const interval = setInterval(() => {
            element.textContent += text.charAt(i); // Adauga cate o litera
            i++;
            if (i === text.length) clearInterval(interval); // Opreste animatia cand textul e complet
        }, delay);
    };
    

    //MODFICARI EFECTUATE ---- > COD VECHI
    // Determinam limba pe baza URL-ului (sau altceva daca ai nevoie)
    const currentLanguage = window.location.pathname.includes('index-en.html') ? 'en' : 'ro';
    
    // Textul pentru fiecare limba
    /*const texts = {
        ro: {
            heroTitle: "Bine ai venit pe pagina mea!",
            portofolioDescription: "Acesta este un portofoliu unde iti pot arata cateva dintre proiectele si abilitatile mele!",
            aboutDescription: "Ma numesc Tudose Razvan si sunt student in anul 3 la Facultatea de Cibernetica, Statistica si Informatica Economica din cadrul ASE Bucuresti.",
            extraDescription: ""
        },
        en: {
            heroTitle: "Welcome to my page!",
            portofolioDescription: "This is a portfolio where I can show you some of my projects and skills!",
            aboutDescription: "My name is Tudose Razvan and I am a third-year student at the Faculty of Cybernetics, Statistics, and Economic Informatics at ASE Bucharest.",
            extraDescription: "I am an ambitious person and I enjoy creating efficient and optimal solutions for complex problems."
        }
    };
    
    // Preluam textul in functie de limba
    const heroTitle = texts[currentLanguage].heroTitle;
    const portofolioDescription = texts[currentLanguage].portofolioDescription;
    const aboutDescription = texts[currentLanguage].aboutDescription;
    const extraDescription = texts[currentLanguage].extraDescription;
    
    // Afiseaza mesajul de bun venit sau de salut litera cu litera
    typeText("hero-desc", heroTitle, 100);
    
    // Afisam descrierea portofoliului dupa titlu
    setTimeout(() => {
        typeText("portfolio-description", portofolioDescription, 50); // Animatia pentru portofoliu
        
        // Dupa incheierea animatiei pentru titlu, afiseaza descrierea sectiunii Despre mine
        setTimeout(() => {
            // Afisam descrierea
            typeText("description", aboutDescription, 50);
    
            // Afisam descrierea suplimentara
            setTimeout(() => {
                typeText("extra-description", extraDescription, 50);
            }, aboutDescription.length * 50 + 200); // Asteapta sa termine animatia pentru descriere
    
        }, portofolioDescription.length * 50 + 200); // Asteapta sa termine animatia pentru portofoliu
    
    }, heroTitle.length * 100 + 200); // Asteapta sa termine animatia de tastare pentru titlu*/
    
    
    
  
    const sections = document.querySelectorAll('.hero, #about, #projects, #project-details-new, #skills, #reviews, #contact, #footer');

    // Select the relevant sections
    const projectSections = document.querySelectorAll('#projects, #project-details-new');
    const skillCategories = document.querySelectorAll('.skill-category');
    const reviewCards = document.querySelectorAll('.review-card');
    const experienceSection = document.querySelector('#experience');
    const experienceItems = document.querySelectorAll('.timeline-item');

    // Options for IntersectionObserver (10% visibility to trigger animation)
    const options = {
        root: null,  // viewport
        threshold: 0.1  // Trigger the animation when 10% of the section is visible
    };

    // Function to handle visibility and animation
    function handleVisibility(entries, observer, animationType, stagger = 0) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Apply staggered animation if necessary
                element.style.animation = `${animationType} 1.2s ease-out forwards ${index * stagger}s`;
                element.classList.remove('section-hidden');
                element.classList.add('section-visible');

                // Stop observing once the element is visible
                observer.unobserve(element);
            }
        });
    }

    const projectObserver = new IntersectionObserver((entries) => {
        handleVisibility(entries, projectObserver, 'fadeInUp');
    }, options);

    projectSections.forEach(section => {
        section.classList.add('section-hidden');
        projectObserver.observe(section);
    });

    const projectCardsObserver = new IntersectionObserver((entries) => {
        handleVisibility(entries, projectCardsObserver, 'fadeInUp', 0.3); 
    }, options);

    projectCards.forEach(projectCard => {
        projectCard.classList.add('section-hidden');
        projectCardsObserver.observe(projectCard);
    });

    const skillsObserver = new IntersectionObserver((entries) => {
        handleVisibility(entries, skillsObserver, 'fadeInUp', 0.3); 
    }, options);

    skillCategories.forEach(skillCategory => {
        skillCategory.classList.add('section-hidden');
        skillsObserver.observe(skillCategory);
    });

    const reviewsObserver = new IntersectionObserver((entries) => {
        handleVisibility(entries, reviewsObserver, 'fadeInUp', 0.3); 
    }, options);

    reviewCards.forEach(reviewCard => {
        reviewCard.classList.add('section-hidden');
        reviewsObserver.observe(reviewCard);
    });

    const experienceObserver = new IntersectionObserver((entries) => {
        handleVisibility(entries, experienceObserver, 'fadeInUp');
    }, options);
    
    if (experienceSection) {
        experienceSection.classList.add('section-hidden');
        experienceObserver.observe(experienceSection);
    }
    
    const experienceItemsObserver = new IntersectionObserver((entries) => {
        handleVisibility(entries, experienceItemsObserver, 'fadeInUp', 0.3); // Apply stagger effect for timeline items
    }, options);

    experienceItems.forEach(item => {
        item.classList.add('section-hidden'); 
        experienceItemsObserver.observe(item);
    });

    const projectDetailsSection = document.querySelector('#project-details-new');
    const projectItems = projectDetailsSection.querySelectorAll('.project-item');

    // Optiuni pentru IntersectionObserver (10% vizibilitate)
    const observerOptions = {
        root: null,  // Viewport
        threshold: 0.3  // Declanseaza cand 10% este vizibil
    };


    // Functia de animatie pentru fiecare proiect
    function handleAnimation(entries, observer) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const element = entry.target;

                // Aplica animatia cu efect de intarziere (staggered effect)
                element.style.animation = `fadeInUp 1.5s ease-out forwards ${index * 0.3}s`;
                element.classList.remove('hidden-section');
                element.classList.add('visible-section');

                // Nu mai observa elementele care au fost deja vizibile
                observer.unobserve(element);
            }
        });
    }

    const sectionObserver = new IntersectionObserver(handleAnimation, observerOptions);

    projectItems.forEach((item) => {
        item.classList.add('hidden-section'); // Ascunde initial
        sectionObserver.observe(item);
    });
});