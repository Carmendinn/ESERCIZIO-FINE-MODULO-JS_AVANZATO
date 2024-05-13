const url = 'https://striveschool-api.herokuapp.com/api/product/';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDc5YTBiM2IyNTAwMTUxYjU0MjAiLCJpYXQiOjE3MTUyNTA5MzQsImV4cCI6MTcxNjQ2MDUzNH0.mqvTlpR7w_4ktxU6DOTWm1DKDi4jLXo27IaUrMMES3s";
const productForm = document.getElementById("product-form");
const productsContainer = document.getElementById("#products-container");

// Funzione per creare un nuovo prodotto
const createPost = async (event) => {
    event.preventDefault();
    document.getElementById('product-form').addEventListener('submit', createPost);
    const product = {
        name: document.querySelector(".name").value,
        description: document.querySelector(".description").value,
        brand: document.querySelector(".brand").value,
        imageUrl: document.querySelector(".imageUrl").value,
        price: document.querySelector(".price").value,
     
        
    }; 

    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product),
    });

    if (res.ok) {
        alert("Prodotto creato con successo!");
        showItems();
    } else {
        const errorText = await res.text(); // Gestione errore come testo se non JSON
        alert(`Errore nella creazione del prodotto: ${errorText}`);
    }
};

// Funzione per mostrare i prodotti nella pagina
const showItems = async () => {
    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });

    if (!res.ok) {
        const errorText = await res.text();
        console.error('Failed to fetch products:', errorText);
        return;
    }

    const products = await res.json();
    const productsContainer = document.querySelector(".products-container");

    // Pulisci il contenuto del contenitore prima di aggiungere nuovi elementi
    productsContainer.innerHTML = "";

    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");
        productElement.innerHTML += `<h2>${product.name}</h2>
             <img src="${product.imageUrl}" alt="${product.name}">
             <p>${product.brand}</p>
             <p> ${product.description}</p>
             <p> ${product.price} €</p>
             <button class="edit-btn" data-product-id="${product._id}">Modifica</button>
             <button class="delete-btn" data-product-id="${product._id}">Elimina</button>
        `;

        productsContainer.appendChild(productElement);
    });
};  showItems();


// Aggiungo event listener globale per gestire i click su "Modifica"
document.addEventListener('DOMContentLoaded', function () {
    // Imposto un event listener sul contenitore dei prodotti per catturare i click sui pulsanti "Modifica"
    document.querySelector('.products-container').addEventListener('click', function (e) {
        if (e.target.classList.contains('edit-btn')) {
            const productId = e.target.getAttribute('data-product-id'); // Ottiene l'ID del prodotto da modificare
            editProduct(productId); // Chiama la funzione per modifica dettagli prodotto
        }
    });
    showItems(); // Mostra i prodotti appena il DOM è pronto
});

// Funzione per ottenere i dettagli di un prodotto e popolare il form di modifica
const editProduct = async (productId) => {
    // Eseguo una richiesta GET per recuperare i dettagli di un prodotto specifico
    const res = await fetch(`${url}${productId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });

    // Controlla se la richiesta ha avuto successo, altrimenti mostra un messaggio di errore
    if (!res.ok) {
        const errorText = await res.text();
        alert(`Errore nel recupero del prodotto: ${errorText}`);
        return;
    }

    // Se la richiesta è riuscita, popola i campi del form di modifica con i dati del prodotto
    const product = await res.json();

    document.getElementById("edit-product-id").value = product._id;
    document.getElementById("edit-name").value = product.name;
    document.getElementById("edit-imageUrl").value = product.imageUrl;
    document.getElementById("edit-description").value = product.description;
    document.getElementById("edit-brand").value = product.brand;
    document.getElementById("edit-price").value = product.price;
    document.querySelector(".product-form-edit").style.display = "block";
};

// Funzione per aggiornare un prodotto esistente
const updateProduct = async () => {
    // Recupero i dati aggiornati dal form di modifica
    const productId = document.getElementById("edit-product-id").value;
    const product = {
        name: document.getElementById("edit-name").value,
        imageUrl: document.getElementById("edit-imageUrl").value,
        description: document.getElementById("edit-description").value,
        brand: document.getElementById("edit-brand").value,
        price: document.getElementById("edit-price").value
    };

    const res = await fetch(`${url}${productId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product),
    });

    if (res.ok) {
        alert("Prodotto modificato con successo!");
        showItems();
        document.querySelector(".product-form-edit").style.display = "none";
    } else {
        const errorText = await res.text();
        alert(`Errore nella modifica del prodotto: ${errorText}`);
    }
};

// Aggiungo event listener globale per gestire i click su "Elimina"

document.addEventListener('DOMContentLoaded', function () {
    // Imposta un event listener sul contenitore dei prodotti per catturare i click sui pulsanti "Elimina"
    document.querySelector('.products-container').addEventListener('click', async function (e) {
        if (e.target.classList.contains('delete-btn')) {
            const productId = e.target.getAttribute('data-product-id'); // Ottiene l'ID del prodotto da eliminare
            await deleteProduct(productId); // Chiama la funzione per eliminare il prodotto
        }
    });
    showItems(); // Richiamo la funzione per visualizzare i prodotti
});

// Funzione per eliminare un prodotto
const deleteProduct = async (productId) => {
    const res = await fetch(`${url}${productId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });

    if (res.ok) {
        alert("Prodotto eliminato con successo!");
        showItems(); // Aggiorno l'elenco dei prodotti dopo l'eliminazione
    } else {
        const errorText = await res.text();
        alert(`Errore durante l'eliminazione del prodotto: ${errorText}`);
    }
};
//funzione per pulire i form
function clearForm(){
    document.getElementById('edit-name').value = '';
    document.getElementById('edit-description').value = '';
    document.getElementById('edit-imageUrl').value = '';
    document.getElementById('edit-price').value = '';
    document.getElementById('edit-brand').value = '';
    document.getElementById('edit-imageUrl').value = '';
    document.getElementById('edit-imageUrl').value = '';
}
