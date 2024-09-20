document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".tab__btn");
    const containers = document.querySelectorAll(".products__container");

    function loadProducts(category, target) {
        let apiUrl;

        // Definir a URL da API com base na categoria
        if (category === "Destaque") {
            apiUrl = "http://localhost:3000/products/featured";
        } else if (category === "Popular") {
            apiUrl = "http://localhost:3000/products/popular";
        } else if (category === "Recentes") {
            apiUrl = "http://localhost:3000/products/new";
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Limitar o número de produtos a 6
                const limitedData = data.slice(0, 6);

                // Encontre o contêiner correto com base no data-target
                const container = document.querySelector(`${target} .products__container`);
                container.innerHTML = '';  // Limpa o conteúdo anterior

                // Inserir produtos dinamicamente
                limitedData.forEach(product => {
                    container.innerHTML += `
                        <div class="product__item swiper-slide">
                            <div class="product__banner">
                                <a href="details.html" class="product__images">
                                    <img src="${product.image_url}" alt="${product.title}" class="product__img default" />
                                    <img src="${product.image2_url}" alt="${product.title}" class="product__img hover" />
                                </a>
                                <div class="product__actions">
                                    <a href="#" class="action__btn" aria-label="Quick View"><i class="fi fi-rs-eye"></i></a>
                                    <a href="#" class="action__btn" aria-label="Add to Wishlist"><i class="fi fi-rs-heart"></i></a>
                                    <a href="#" class="action__btn" aria-label="Compare"><i class="fi fi-rs-shuffle"></i></a>
                                </div>
                                <div class="product__badge light-pink">Hot</div>
                            </div>
                            <div class="product__content">
                                <span class="product__category">${product.catalog}</span>
                                <a href="details.html">
                                    <h3 class="product__title">${product.title}</h3>
                                </a>
                                <div class="product__rating">
                                    ${renderStars(product.star)}
                                </div>
                                <div class="product__price flex">
                                    <span class="new__price">${product.price} MZN</span>
                                    <span class="old__price">${product.price_org} MZN</span>
                                </div>
                                <a href="#" class="action__btn cart__btn" aria-label="Add To Cart"><i class="fi fi-rs-shopping-bag-add"></i></a>
                            </div>
                        </div>
                    `;
                });

                // Atualizar Swiper após adicionar produtos
                updateSwiper(target);
            })
            .catch(err => console.error('Failed to fetch products', err));
    }

    function renderStars(stars) {
        let starHTML = '';
        for (let i = 0; i < 5; i++) {
            if (i < stars) {
                starHTML += '<i class="fi fi-rs-star"></i>';
            } else {
                starHTML += '<i class="fi fi-rs-star-o"></i>';
            }
        }
        return starHTML;
    }

    function updateSwiper(target) {
        const swiper = new Swiper(`${target} .products__container`, {
            spaceBetween: 24,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                992: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
                1400: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
            },
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", function() {
            tabs.forEach(t => t.classList.remove("active-tab"));
            containers.forEach(c => c.parentElement.classList.remove("active-tab"));

            this.classList.add("active-tab");
            const target = this.getAttribute("data-target");
            document.querySelector(target).classList.add("active-tab");

            const category = this.getAttribute("data-category");
            loadProducts(category, target);
        });
    });

    // Carregar "Destaque" por padrão ao carregar a página
    loadProducts("Destaque", "#featured");
});
