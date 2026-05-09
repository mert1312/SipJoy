/* === index.html === */
// Функция за промяна на навигацията при скролване
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

document.addEventListener("DOMContentLoaded", function() {
    // Вземаме "hash" частта от линка (напр. #dairy)
    const hash = window.location.hash;

    if (hash) {
        // 1. Скриваме всички категории първоначално
        const allCategories = document.querySelectorAll('.product-category');
        allCategories.forEach(cat => cat.style.display = 'none');

        // 2. Показваме само избраната категория
        const targetCategory = document.querySelector(hash);
        if (targetCategory) {
            targetCategory.style.display = 'block';
            
            // Опционално: Плавна анимация при появяване
            targetCategory.style.opacity = '0';
            setTimeout(() => {
                targetCategory.style.transition = 'opacity 0.5s ease';
                targetCategory.style.opacity = '1';
            }, 10);
        }
    }
});

/* === products.html === */
document.addEventListener("DOMContentLoaded", function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categories = document.querySelectorAll('.product-category');

    function filterProducts(filterValue) {
        console.log("Филтрираме по:", filterValue);

        categories.forEach(cat => {
            if (filterValue === 'all' || cat.id === filterValue) {
                // Показваме
                cat.style.setProperty('display', 'block', 'important');
                setTimeout(() => cat.style.opacity = '1', 10);
            } else {
                // Скриваме
                cat.style.setProperty('display', 'none', 'important');
                cat.style.opacity = '0';
            }
        });

        // Активен клас за бутона
        filterBtns.forEach(btn => {
            if (btn.getAttribute('data-filter') === filterValue) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    // Слушател за клик
    filterBtns.forEach(btn => {
        btn.onclick = function(e) {
            e.preventDefault();
            const filter = this.getAttribute('data-filter');
            filterProducts(filter);
            window.history.pushState(null, null, `#${filter}`);
        };
    });

    // Автоматично при зареждане
    const currentHash = window.location.hash.replace('#', '');
    if (currentHash && document.getElementById(currentHash)) {
        filterProducts(currentHash);
    } else {
        filterProducts('all');
    }
});

/* === about.html === */
const video = document.getElementById('aboutVideo');
const muteBtn = document.getElementById('muteBtn');

// Автоматичен старт при зареждане
window.addEventListener('load', () => {
    video.play().catch(error => {
        console.log("Автоматичното пускане е блокирано от браузъра, докато потребителят не взаимодейства със страницата.");
    });
});
