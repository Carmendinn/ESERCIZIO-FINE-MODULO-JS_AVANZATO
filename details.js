
//Listener al caricamento della pagina

document.addEventListener("DOMContentLoaded", async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const url = `https://striveschool-api.herokuapp.com/api/product/${productId}`;
    const token = " Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDc5YTBiM2IyNTAwMTUxYjU0MjAiLCJpYXQiOjE3MTUyNTA5MzQsImV4cCI6MTcxNjQ2MDUzNH0.mqvTlpR7w_4ktxU6DOTWm1DKDi4jLXo27IaUrMMES3s";
    if (!productId) {
        console.error("ID del prodotto non fornito nella query string dell'URL"); //Verifica
        return;
    }


    try {
        const response = await fetch(url, {
            headers: {
                "Authorization": token
            }
        });
        if (!response.ok) {
            console.error("Errore nella richiesta del prodotto:", response.status);
            return;
        }
        const product = await response.json();
        displayProductDetails(product);
    } catch (error) {
        console.error("Errore nella richiesta del prodotto:", error);  //Gestione errore nella richiesta
    }
});

function displayProductDetails(product) {                           //Funzione per mostrare i prodotti
    const productElement = document.createElement("div");
    productElement.innerHTML = `
        <h2>${product.name}</h2>                                    
        <img src="${product.imageUrl}" alt="${product.name}">
        <p>${product.brand}</p>
        <p>${product.description}</p>
        <p>${product.price} €</p>
    `;
    // Inserisco i dettagli del prodotto e aggiungo l'elemento del prodotto al contenitore
    const productsContainer = document.querySelector(".products-detail-container"); 
    productsContainer.appendChild(productElement);
}

