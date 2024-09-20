document.addEventListener("DOMContentLoaded", function () {
    function loadProducts(category, target) {
        let apiUrl;

        // Definir a URL da API com base na categoria
        switch (category) {
            case "Lançamentos Quentes":
                apiUrl = "http://localhost:3000/products/hot-releases";
                break;
            case "Ofertas":
                apiUrl = "http://localhost:3000/products/offers";
                break;
            case "Mais Comprados":
                apiUrl = "http://localhost:3000/products/best-sellers";
                break;
            case "Tendências":
                apiUrl = "http://localhost:3000/products/trends";
                break;
            default:
                return;
        }

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const container = document.querySelector(`#${target}`);
                container.innerHTML = '';  // Limpa o conteúdo anterior

                // Criar um novo contêiner para cada linha de produtos
                let rowHtml = '';
data.forEach((product, index) => {
    if (index >= 10) {
        return; // Parar de adicionar produtos quando atingir o limite de 10
    }
                    rowHtml += `
                        <div class="showcase__item">
                            <a href="details.html" class="showcase__img-box">
                                <img src="${product.image_url}" alt="${product.title}" class="showcase__img" />
                            </a>
                            <div class="showcase__content">
                                <a href="details.html">
                                    <h4 class="showcase__title">${product.title}</h4>
                                </a>
                                <div class="showcase__price flex">
                                    <span class="new__price">${product.price} MZN</span>
                                    <span class="old__price">${product.price_org} MZN</span>
                                </div>
                            </div>
                        </div>
                    `;
                });

                // Adicionar a última linha restante ao contêiner
                if (rowHtml) {
                    container.innerHTML += `<div class="showcase__row">${rowHtml}</div>`;
                }
            })
            .catch(err => console.error('Failed to fetch products', err));
    }

    // Carregar as novas seções
    loadProducts("Lançamentos Quentes", "hot-releases-container");
    loadProducts("Ofertas", "offers-container");
    loadProducts("Mais Comprados", "best-sellers-container");
    loadProducts("Tendências", "trends-container");
});
