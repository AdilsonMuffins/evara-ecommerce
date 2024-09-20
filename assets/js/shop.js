const paginationContainer = document.getElementById('pagination');
const productsContainer = document.querySelector('.products__container');
let currentPage = 1;
let totalPages = 0;

// Função para buscar os produtos da API
async function fetchProducts(page = 1) {
    try {
        const response = await fetch(`http://localhost:3000/products?page=${page}&limit=10`);
        const data = await response.json();

        const { products, totalPages: total, count } = data; // Adicione `count` aqui
        totalPages = total;
        currentPage = page;

        // Atualizar o número total de produtos
        document.getElementById('product-count').textContent = count; // Atualize o contador

        // Limpar os produtos existentes
        productsContainer.innerHTML = '';

        // Adicionar os novos produtos
        products.forEach((product) => {
            const productHTML = `
                <div class="product__item">
                    <div class="product__banner">
                        <a href="details.html" class="product__images">
                            <img src="${product.image_url}" alt="" class="product__img default" />
                            <img src="${product.image2_url}" alt="" class="product__img hover" />
                        </a>
                        <div class="product__actions">
                            <a href="#" class="action__btn" aria-label="Quick View">
                                <i class="fi fi-rs-eye"></i>
                            </a>
                            <a href="#" class="action__btn" aria-label="Add to Wishlist">
                                <i class="fi fi-rs-heart"></i>
                            </a>
                            <a href="#" class="action__btn" aria-label="Compare">
                                <i class="fi fi-rs-shuffle"></i>
                            </a>
                        </div>
                        <div class="product__badge light-pink">${product.category}</div>
                    </div>
                    <div class="product__content">
                        <span class="product__category">${product.catalog}</span>
                        <a href="details.html">
                            <h3 class="product__title">${product.title}</h3>
                        </a>
                        <div class="product__rating">
                            ${'★'.repeat(product.star)}
                        </div>
                        <div class="product__price flex">
                            <span class="new__price">$${product.price}</span>
                            <span class="old__price">$${product.price_org}</span>
                        </div>
                        <a href="#" class="action__btn cart__btn" aria-label="Add To Cart">
                            <i class="fi fi-rs-shopping-bag-add"></i>
                        </a>
                    </div>
                </div>
            `;
            productsContainer.innerHTML += productHTML;
        });

        // Atualizar a paginação
        createPagination(totalPages, currentPage);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Função para criar a paginação
function createPagination(totalPages, currentPage) {
    paginationContainer.innerHTML = ''; // Limpar o conteúdo existente

    const paginationList = document.createElement('ul');
    paginationList.className = 'pagination';

    // Adicionar a primeira página
    const firstPage = document.createElement('li');
    firstPage.innerHTML = `<a href="#" class="pagination__link ${currentPage === 1 ? 'active' : ''}" data-page="1">01</a>`;
    paginationList.appendChild(firstPage);

    // Adicionar páginas intermediárias
    for (let i = 2; i < totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.innerHTML = `<a href="#" class="pagination__link ${currentPage === i ? 'active' : ''}" data-page="${i}">${i < 10 ? '0' + i : i}</a>`;
        paginationList.appendChild(pageItem);
    }

    // Adicionar os três pontinhos ("...")
    if (totalPages > 5) {
        const ellipsis = document.createElement('li');
        ellipsis.innerHTML = `<a href="#" class="pagination__link">...</a>`;
        paginationList.appendChild(ellipsis);
    }

    // Adicionar a última página
    const lastPage = document.createElement('li');
    lastPage.innerHTML = `<a href="#" class="pagination__link ${currentPage === totalPages ? 'active' : ''}" data-page="${totalPages}">${totalPages}</a>`;
    paginationList.appendChild(lastPage);

    // Adicionar o botão de próximo (ícone)
    const nextPage = document.createElement('li');
    nextPage.innerHTML = `
        <a href="#" class="pagination__link icon" data-page="${currentPage + 1}">
            <i class="fi-rs-angle-double-small-right"></i>
        </a>`;
    paginationList.appendChild(nextPage);

    // Adicionar a lista à div de paginação
    paginationContainer.appendChild(paginationList);

    // Adicionar evento de clique nas páginas
    const pageLinks = paginationContainer.querySelectorAll('.pagination__link');
    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const selectedPage = Number(e.target.getAttribute('data-page'));
            fetchProducts(selectedPage);
        });
    });
}

// Carregar a página inicial de produtos
fetchProducts(1);
