const url = 'https://striveschool-api.herokuapp.com/api/product/';
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNhMDc5YTBiM2IyNTAwMTUxYjU0MjAiLCJpYXQiOjE3MTUyNTA5MzQsImV4cCI6MTcxNjQ2MDUzNH0.mqvTlpR7w_4ktxU6DOTWm1DKDi4jLXo27IaUrMMES3s";
const productForm = document.getElementById("product-form");
const productsContainer = document.getElementById("products-container");


const createPost = async () => {
    const product = {
        name: document.querySelector(".name").value,
        description: document.querySelector(".description").value,
        brand: document.querySelector(".brand").value,
        imageUrl: document.querySelector(".imageUrl").value,
        price: document.querySelector(".price").value
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
    }
}
//funzione per mostrare i prodotti in pagina
const showItems = async () => {
    const res = await fetch(url, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });
    const products = await res.json();
    console.log(products);
    const productsContainer = document.querySelector(".products-container");

    // Pulisci il contenuto del container prima di aggiungere nuovi elementi
    productsContainer.innerHTML = "";

    // Itera su ogni prodotto e crea un elemento HTML per ciascuno
    products.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("product");

        // Costruisci il contenuto HTML per il singolo prodotto
        productElement.innerHTML += `<h2>${product.name}</h2>
             <p>Description: ${product.description}</p>
             <p>Brand: ${product.brand}</p>
             <img src="${product.imageUrl}" alt="${product.name}">
             <p>Price: ${product.price}</p>
             <button class="edit-btn" data-product-id="${product._id}">Modifica</button>
             <button class="delete-btn" data-product-id="${product._id}">Elimina</button>
        `;


        // Aggiungi il prodotto al container
        productsContainer.appendChild(productElement);
    });
}; showItems();


/*funzione per richiamare i dati del prodotto
const getValueForm = async (idInInput) => {
    // Se viene passato un id all'interno della funzione
    const id = idInInput || paramId;
    if (id) {
        // Invia una richiesta GET all'API per recuperare i dati dell'utente richiesto
        // L'uso di await è necessario per attendere che la richiesta venga completata
        const res = await fetch(url + id);
        // Converte la risposta in un oggetto JSON
        const user = await res.json();
        // Aggiorna i valori inseriti nel form con i dati dell'utente
        document.getElementById('name').value = user.name;
        document.getElementById('role').value = user.role;
        document.getElementById('age').value = user.age;
        document.getElementById('id').value = user.id;
    }
}*/

//funzione per editare i prodotti
const editProduct = async (userId) => {
    // Recupera il prodotto dal server usando l'ID del prodotto
    const res = await fetch(`${url}/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    }); 
    const product = await res.json();

    // Popola i campi del form con i dettagli del prodotto
    document.getElementById("edit-user-id").value = user._id;
    document.getElementById("edit-name").value = product.name;
    document.getElementById("edit-description").value = product.description;
    document.getElementById("edit-brand").value = product.brand;
    document.getElementById("edit-imageUrl").value = product.imageUrl;
    document.getElementById("edit-price").value = product.price;

    // Mostra il form di modifica
    document.querySelector(".product-form-edit").style.display = "block";
};

const updateProduct = async () => {
    // Recupera i dati dal form di modifica
    const productId = document.getElementById("edit-user-id").value;
    const product = {
        name: document.getElementById("edit-name").value,
        description: document.getElementById("edit-description").value,
        brand: document.getElementById("edit-brand").value,
        imageUrl: document.getElementById("edit-imageUrl").value,
        price: document.getElementById("edit-price").value
    };

    // Esegui una richiesta PUT per aggiornare il prodotto sul server
    const res = await fetch(`${url}+${userId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(product),
    });

    if (res.ok) {
        alert("Prodotto modificato con successo!");
        // Aggiorna la lista dei prodotti dopo la modifica
        showItems();
        // Nascondi il form di modifica
        document.querySelector(".product-form-container").style.display = "none";
    } else {
        alert("Si è verificato un errore durante la modifica del prodotto.");
    }
};
