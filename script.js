document.addEventListener("DOMContentLoaded", function () {
    const url = 'https://striveschool-api.herokuapp.com/api/product/';
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDc5YTBiM2IyNTAwMTUxYjU0MjAiLCJpYXQiOjE3MTUyNTA5MzQsImV4cCI6MTcxNjQ2MDUzNH0.mqvTlpR7w_4ktxU6DOTWm1DKDi4jLXo27IaUrMMES3s";
    const productsContainer = document.getElementById("products-container");
const id= 'https://striveschool-api.herokuapp.com/api/product/${productId}'
    // Funzione per ottenere le card in pagina al caricamento
    async function fetchProducts() {
        const response = await fetch(url, {
            headers: {
                "Authorization": token
            }
        });
        const products = await response.json();
        displayProducts(products);
        console.log(products);
    }

    function displayProducts(products) {
        productsContainer.innerHTML = ""; // Pulisco il contenitore delle card
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "product-card";

            const productName = document.createElement("h3");
            productName.className = "product-name";
            productName.textContent = product.name; // Dichiaro il nome del prodotto

            const productInfo = document.createElement("div");
            productInfo.className = "product-info";

            const productImg = document.createElement("img");
            productImg.src = product.imageUrl;
            productImg.alt = product.name;
            productImg.className = "product-img";

            const productDes = document.createElement("p");
            productDes.className = "product-des";
            productDes.textContent = product.description; // Dichiaro la descrizione del prodotto

            const productBrand = document.createElement("p");
            productBrand.className = "product-brand";
            productBrand.textContent = product.brand; // Dichiaro il marchio del prodotto

            const productPrice = document.createElement("p");
            productPrice.className = "product-price";
            productPrice.textContent = product.price + " " + "€"; // Dichiaro il prezzo del prodotto

            // Aggiungo gli elementi al prodottoCard
            productsContainer.appendChild(productCard); // Aggiungo la scheda del prodotto al contenitore delle card
            productCard.appendChild(productImg);
            productCard.appendChild(productName);
            productCard.appendChild(productDes);
            productCard.appendChild(productBrand);
            productCard.appendChild(productPrice);
            productCard.appendChild(productInfo);
        });
    }

    // Chiamata alla funzione fetchProducts al caricamento della pagina
    fetchProducts();

}); 
