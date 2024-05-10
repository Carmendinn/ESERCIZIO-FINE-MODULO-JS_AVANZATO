const url = 'https://striveschool-api.herokuapp.com/api/product/';
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDc5YTBiM2IyNTAwMTUxYjU0MjAiLCJpYXQiOjE3MTUyNTA5MzQsImV4cCI6MTcxNjQ2MDUzNH0.mqvTlpR7w_4ktxU6DOTWm1DKDi4jLXo27IaUrMMES3s";
const productForm = document.getElementById("product-form");
const productsContainer = document.getElementById("products-container");

const createProduct = async () => {
  // Recupera i valori inseriti dall'utente nel form
  const product = {
    name: document.querySelector(".name").value,
    description: document.querySelector(".description").value,
    brand: document.querySelector(".brand").value,
    imageUrl: document.querySelector(".imageUrl").value,
    price: document.querySelector(".price").value
  };

  // Invia una richiesta POST all'API con il nuovo prodotto
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(product),
      imageUrl:"https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-finish-select-202212-11inch-space-gray-wifi_FMT_WHH?wid=1280&hei=720&fmt=p-jpg&qlt=95&.v=1670865949101",
      name: "iPear Pro",
      description: "Nuovo design pro. Portabilità assoluta. L’invenzione Pear più sottile di sempre.",
      brand: "Pear",
      price: "1220",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json" 
      }
    });

    if (!res.ok) {
      throw new Error('Errore nella richiesta POST');
    }

    const newProduct = await res.json();
    
    // Aggiungi il nuovo prodotto alla pagina HTML
    productsContainer.innerHTML += `
      <div>
        <img src="${newProduct.imageUrl}" alt="${newProduct.name}">
        <h2>${newProduct.name}</h2>
        <h4>${newProduct.description}</h4>
        <h2>${newProduct.brand}</h2>
        <h2>${newProduct.price}</h2>
        <div>${newProduct._id}</div>
      </div>`;
  } catch (error) {
    console.error('Si è verificato un errore:', error);
  }
}

// Ascolta l'evento di invio del form e chiama la funzione createProduct
productForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Impedisce il comportamento predefinito del form
  createProduct();
});
