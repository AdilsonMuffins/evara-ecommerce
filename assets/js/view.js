document.addEventListener("DOMContentLoaded", function () {
    // Recupera os dados do produto do localStorage
    const selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    // Verifica se há dados do produto no localStorage
    if (!selectedProduct) {
        console.error('Nenhum produto selecionado encontrado.');
        return;
    }

    console.log('Produto recuperado:', selectedProduct); // Verifique os dados no console

    // Atualiza a imagem do produto
    const productImage = document.querySelector('.details__img');
    if (productImage) {
        productImage.src = selectedProduct.image;
        productImage.alt = selectedProduct.title;
    }

    const productImage1 = document.querySelector('.details__small-img');
    if (productImage1) {
        productImage1.src = selectedProduct.image2;
        productImage1.alt = selectedProduct.title;
    }

    // Atualiza as imagens adicionais (image3_url e image4_url) no img1 e img2
    const productImage3 = document.querySelector('#img1');
    if (productImage3) {
        productImage3.src = selectedProduct.image3;
        productImage3.alt = selectedProduct.title;
    }

    const productImage4 = document.querySelector('#img2');
    if (productImage4) {
        productImage4.src = selectedProduct.image4;
        productImage4.alt = selectedProduct.title;
    }

    // Atualiza o título do produto
    const productTitle = document.querySelector('.details__title');
    if (productTitle) {
        productTitle.innerText = selectedProduct.title;
    }

    // Atualiza o name do produto
    const productmx = document.querySelector('#mark');
    if (productmx) {
        productmx.innerText = selectedProduct.title;
    }

    // Atualiza a marca do produto
    const productCatalog = document.querySelector('#catalog');
    if (productCatalog) {
        productCatalog.innerText = selectedProduct.catalog;
    }

    // Atualiza o preço do produto
    const productPrice = document.querySelector('.new__price');
    if (productPrice) {
        productPrice.innerText = selectedProduct.price;
    }

    // Atualiza o preço antigo do produto
    const productPrice2 = document.querySelector('.old__price');
    if (productPrice2) {
        productPrice2.innerText = selectedProduct.price2;
    }

    // Atualiza a descrição curta do produto
    const productDescription = document.querySelector('.short__description');
    if (productDescription) {
        productDescription.innerText = selectedProduct.description;
    }

    // Atualiza a marca do produto
    const productMarca = document.querySelector('.short__marca');
    if (productMarca) {
        productMarca.innerText = selectedProduct.marca;
    }

    // Atualiza as tags do produto
    const producttags = document.querySelector('.short__tags');
    if (producttags) {
        producttags.innerText = selectedProduct.marca; // Certifique-se de que isso é o que deseja
    }

    // Atualiza a disponibilidade do produto
    const productStock = document.querySelector('.details__meta .stock__quantity');
    if (productStock) {
        productStock.innerText = `${selectedProduct.stock} Itens em Estoque`; // Exibe a quantidade de itens em estoque
    }

    // Atualiza as cores do produto
    const productColorsContainer = document.querySelector('.color__list');
    if (productColorsContainer) {
        productColorsContainer.innerHTML = ''; // Limpa a lista existente
        if (selectedProduct.colors && selectedProduct.colors.length > 0) {
            selectedProduct.colors.forEach(color => {
                productColorsContainer.innerHTML += `
                    <li>
                        <a href="#" class="color__link" style="background-color: ${color};" aria-label="Cor: ${color}"></a>
                    </li>
                `;
            });
        } else {
            console.warn('Nenhuma cor disponível para este produto.');
        }
    }
    // Você pode adicionar mais atualizações aqui, como desconto, etc.
});
