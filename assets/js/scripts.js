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

/* === product-details.html === */
const products = {
    'strawberry_milk': {
        title: "Ягодова млечна напитка",
        ingredients: "UHT краве мляко (≥92%), Ягодово пюре (5–6%), Стевия, Пектин (E440), Натурален аромат ягода (без алкохол).",
        image: "../assets/media/images/SJ_strawberryMilk_card.png",
        tags: ["без оцветители", "без емулгатори"],
        nutrition: [
            ["Енергийна стойност", "62 kcal"],
            ["Мазнини", "1.5 g"],
            ["Въглехидрати", "8.2 g"],
            ["Протеини", "3.4 g"]
        ]
    },
    'banana_milk': {
        title: "Бананова млечна напитка",
        ingredients: "UHT краве мляко (≥93%), Бананово пюре (5–6%), Стевия, Пектин (E440), Натурален аромат банан.",
        image: "../assets/media/images/SJ_bananaMilk_card.png",
        tags: ["естествен цвят", "без E100", "без E160a"],
        nutrition: [
            ["Енергийна стойност", "60 kcal"],
            ["Мазнини", "1.4 g"],
            ["Въглехидрати", "9.0 g"],
            ["Протеини", "3.3 g"]
        ]
    },
    'chocolate_milk': {
        title: "Шоколадова млечна напитка",
        ingredients: "UHT краве мляко (≥90–92%), Какао на прах (2–3%), Стевия, Натурален аромат ванилия (без алкохол).",
        image: "../assets/media/images/SJ_chocolateMilk_card.png",
        tags: ["без стабилизатори", "естествено какао"],
        nutrition: [
            ["Енергийна стойност", "75 kcal"],
            ["Мазнини", "2.1 g"],
            ["Въглехидрати", "10.5 g"],
            ["Протеини", "3.8 g"]
        ]
    }
};

// Вземане на ID от URL адреса
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const data = products[productId];

if (data) {
    document.getElementById('product-title').innerText = data.title;
    document.getElementById('product-ingredients').innerText = data.ingredients;
    document.getElementById('product-img').src = data.image;
    document.getElementById('product-img').alt = data.title;

    // Попълване на тагове
    const tagsContainer = document.getElementById('product-tags');
    data.tags.forEach(tag => {
        tagsContainer.innerHTML += `<span class="ingredient-tag"><i class="bi bi-check2 me-1"></i>${tag}</span>`;
    });

    // Попълване на таблица
    const tableBody = document.getElementById('nutrition-body');
    data.nutrition.forEach(row => {
        tableBody.innerHTML += `<tr><td>${row[0]}</td><td class="text-end text-accent fw-bold">${row[1]}</td></tr>`;
    });
} else {
    document.querySelector('.product-details-section').innerHTML = "<div class='container text-center'><h1>Продуктът не е намерен!</h1><a href='../products.html' class='btn btn-warning mt-4'>Назад</a></div>";
}

// Логика за увеличение
const zoomTrigger = document.getElementById('zoomTrigger');
zoomTrigger.addEventListener('click', function() {
    this.classList.toggle('zoomed');
});