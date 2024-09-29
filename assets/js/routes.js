document.addEventListener("DOMContentLoaded", function () { 
    const tabs = document.querySelectorAll(".tab__btn");
    const containers = document.querySelectorAll(".products__container");

    function loadProducts(category, target, marca) {
        let apiUrl;

        // Definindo a URL da API com base na categoria ou marca
        if (category === "Destaque") {
            apiUrl = "http://localhost:3000/products/featured";
        } else if (category === "Popular") {
            apiUrl = "http://localhost:3000/products/popular";
        } else if (category === "Recentes") {
            apiUrl = "http://localhost:3000/products/new";
        } else if (marca) {  // Se uma marca foi passada, use essa lógica
            apiUrl = `http://localhost:3000/products/brand/${marca}`; // URL da API para produtos por marca
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const limitedData = data.slice(0, 6); // Limita a quantidade de produtos exibidos
                const container = document.querySelector(`${target} .products__container`);

                // Verificar se o container existe
                if (!container) {
                    console.error(`Container não encontrado para o alvo ${target}`);
                    return;
                }

                container.innerHTML = ''; // Limpar o container

                // Verificar se há produtos retornados
                if (limitedData.length === 0) {
                    console.warn('Nenhum produto encontrado.');
                    return;
                }

                limitedData.forEach(product => {
                    container.innerHTML += `
                        <div class="product__item swiper-slide" data-id="${product.productId}">
                            <div class="product__banner">
                                <div class="product__images">
                                    <img src="${product.image_url}" alt="${product.title}" class="product__img default" />
                                    <img src="${product.image2_url}" alt="${product.title}" class="product__img hover" />
                                </div>
                                <div class="product__actions">
                                    <a href="#" class="action__btn" aria-label="Quick View"><i class="fi fi-rs-eye"></i></a>
                                    <a href="#" class="action__btn" aria-label="Add to Wishlist"><i class="fi fi-rs-heart"></i></a>
                                    <a href="#" class="action__btn" aria-label="Compare"><i class="fi fi-rs-shuffle"></i></a>
                                </div>
                                <div class="product__badge light-pink">Hot</div>
                            </div>
                            <div class="product__content">
                                <span class="product__category">${product.catalog}</span>
                                <div class="product__link">
                                    <h3 class="product__title">${product.title}</h3>
                                </div>
                                <div class="product__rating">${renderStars(product.star)}</div>
                                <div class="product__price flex">
                                    <span class="new__price">${product.price} MZN</span>
                                    <span class="old__price">${product.price_org} MZN</span>
                                </div>
                                <div class="short__description" style="display: none;">${product.description}</div>
                                <div class="short__marca" style="display: none;">${product.marca}</div>
                                <div class="catalog" style="display: none;">${product.catalog}</div>
                                <div class="hidden-image-urls" style="display: none;">
                                    <span class="image3_url">${product.image3_url}</span>
                                    <span class="image4_url">${product.image4_url}</span>
                                </div>
                                <div style="display: none;">
                                    <span class="stock">${product.stock}</span>
                                    <span class="colors">${product.colors.join(', ')}</span>
                                </div>
                            </div>
                        </div>
                    `;
                });

                console.log(`Produtos carregados para ${target}:`, limitedData);

                updateSwiper(target);
                addProductClickEvent();
            })
            .catch(err => console.error('Falha ao buscar produtos:', err));
    }

    function addProductClickEvent() {
        const productLinks = document.querySelectorAll('.product__item');

        if (productLinks.length === 0) {
            console.error('Nenhum link de produto encontrado.');
            return;
        }

        productLinks.forEach(productItem => {
            productItem.addEventListener('click', function(event) {
                event.preventDefault();
                console.log('Produto clicado');

                const productData = {
                    id: this.getAttribute('data-id'),
                    title: this.querySelector('.product__title').innerText,
                    price: this.querySelector('.new__price').innerText,
                    price2: this.querySelector('.old__price').innerText,
                    image: this.querySelector('.product__img.default').src,
                    image2: this.querySelector('.product__img.hover').src,
                    description: this.querySelector('.short__description').innerText,
                    image3: this.querySelector('.hidden-image-urls .image3_url').innerText,
                    image4: this.querySelector('.hidden-image-urls .image4_url').innerText,
                    marca: this.querySelector('.short__marca').innerText,
                    catalog: this.querySelector('.catalog').innerText,
                    stock: this.querySelector('.stock').innerText,
                    colors: this.querySelector('.colors').innerText.split(', ')
                };

                localStorage.setItem('selectedProduct', JSON.stringify(productData));
                console.log('Produto salvo:', productData);

                // Carregar produtos da mesma marca
                loadProducts(null, "#brand", productData.marca);

                // Redirecionar para a página de detalhes
                window.location.href = 'details.html';
            });
        });
    }

    function renderStars(stars) {
        let starHTML = '';
        for (let i = 0; i < 5; i++) {
            starHTML += i < stars ? '<i class="fi fi-rs-star"></i>' : '<i class="fi fi-rs-star-o"></i>';
        }
        return starHTML;
    }

    function updateSwiper(target) {
        const container = document.querySelector(`${target} .products__container`);
        
        if (!container) {
            console.error(`Container de Swiper não encontrado para ${target}`);
            return;
        }
    
        try {
            const swiper = new Swiper(container, {
                spaceBetween: 24,
                loop: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                breakpoints: {
                    768: { slidesPerView: 2, spaceBetween: 24 },
                    992: { slidesPerView: 4, spaceBetween: 24 },
                    1400: { slidesPerView: 4, spaceBetween: 24 },
                },
            });
    
            console.log('Swiper inicializado corretamente para:', target);
        } catch (error) {
            console.error('Erro ao inicializar o Swiper:', error);
        }
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
