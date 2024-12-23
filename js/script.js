const apiKey = 'live_pdWwk9ENbfmTpslQrZmLI8MSevtPfdepo4ahE8WasQh8jIorg9fJmXncS0vKlq5W';
const url = 'https://api.thecatapi.com/v1/images/search';
const catFactUrl = "https://cat-fact.herokuapp.com/facts/random";

fetch(url, {
    headers: {
        'x-api-key': apiKey
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    const catImageUrl = data[0].url;
    document.getElementById('cat-image').src = catImageUrl;
})
.catch(error => {
    console.error('Error fetching data:', error);
});

////////////////////carrito de compras/////////////////

const carrito = [];

    // Función para cargar productos desde la carpeta "productos"
    async function cargarProductos() {
        try {
            const respuesta = await fetch('productos/productos.json');
            if (!respuesta.ok) {
                throw new Error(`Error al cargar productos: ${respuesta.statusText}`);
            }
            const productos = await respuesta.json();
            mostrarProductos(productos);
        } catch (error) {
            console.error(error);
        }
    }

    // Función para mostrar productos
    function mostrarProductos(productos) {
        const productList = document.getElementById('product-list');
        productos.forEach(producto => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
            `;
            productList.appendChild(productDiv);
        });
    }

  // Función para agregar productos al carrito
  function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    actualizarCarrito();
}

// Función para quitar productos del carrito
function quitarDelCarrito(nombre) {
    const productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad--;
        if (productoExistente.cantidad === 0) {
            const index = carrito.indexOf(productoExistente);
            carrito.splice(index, 1);
        }
    }
    actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
    const cartItems = document.getElementById('cart-items');
    const total = document.getElementById('total');
    cartItems.innerHTML = '';
    let totalPrice = 0;
    carrito.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.nombre} - $${item.precio} x ${item.cantidad}</p>
            <button onclick="quitarDelCarrito('${item.nombre}')">-</button>
            <button onclick="agregarAlCarrito('${item.nombre}', ${item.precio})">+</button>
        `;
        cartItems.appendChild(cartItem);
        totalPrice += item.precio * item.cantidad;
    });
    total.innerHTML = `Total: $${totalPrice}`;
    document.getElementById('cart-details').value = JSON.stringify(carrito);
}

// Cargar productos al inicio
cargarProductos();
