document.addEventListener("DOMContentLoaded", function () {
    function loadRecentProducts() {
        const apiUrl = "http://localhost:3000/products/new";

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const container = document.querySelector(".new__arrivals .swiper-wrapper");
                container.innerHTML = '';  // Limpa o conteúdo anterior

                // Inserir produtos dinamicamente
                data.forEach(product => {
                    container.innerHTML += `
                        <div class="swiper-slide">
                            <div class="product__item">
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
                        </div>
                    `;
                });

                // Atualizar Swiper após adicionar produtos
                new Swiper(".new__arrivals .swiper-container", {
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

    // Carregar produtos recentes ao carregar a página
    loadRecentProducts();
});
