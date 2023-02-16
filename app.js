const stockProductos = [
    {
        id: 1,
        nombre: "Crash Bandicoot",
        cantidad: 1,
        desc: "Juego plataformero, niveles dificiles",
        precio: 1200,
        img: "img/Crash.jpg",
    },
    {
        id: 2,
        nombre: "Mortal Kombat X",
        cantidad: 1,
        desc: "Luchas con los mejores graficos",
        precio: 1500,
        img: "img/mortal.jpg",
    },
    {
        id: 3,
        nombre: "Pac Man",
        cantidad: 1,
        desc: "Juego plataformero, niveles basicos",
        precio: 1570,
        img: "img/pacman.jpg",
    },
    {
        id: 4,
        nombre: "Dragon Ball Xenoverse",
        cantidad: 1,
        desc: "Vive la experiencia dragon ball",
        precio: 1000,
        img: "img/dragonball.jpg",
    },
    {
        id: 5,
        nombre: "Naruto Ninja Storm 4",
        cantidad: 1,
        desc: "La historia de Naruto",
        precio: 1200,
        img: "img/naruto.jpg",
    },
    {
        id: 6,
        nombre: "Shingeki Final Attack",
        cantidad: 1,
        desc: "Eren Jeager vuelve en formato gamer...",
        precio: 1200,
        img: "img/shingeki.jpg",
    },
    {
        id: 7,
        nombre: "League of Legends",
        cantidad: 1,
        desc: "No compres esto por tu bien",
        precio: 1400,
        img: "img/league.jpg",
    },
    {
        id: 8,
        nombre: "Call Of Duty Warzone",
        cantidad: 1,
        desc: "Dispara como nunca",
        precio: 1200,
        img: "img/callduty.jpg",
    },
    {
        id: 9,
        nombre: "Fifa 2019",
        cantidad: 1,
        desc: "Juego de futbol",
        precio: 1400,
        img: "img/fifa.jpg",
    },
    {
        id: 10,
        nombre: "Fornite",
        cantidad: 1,
        desc: "Battle Royale",
        precio: 1200,
        img: "img/fornite.jpg",
    },
];

let carrito = [];

const contenedor = document.querySelector('#contenedor');
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");


//guardar datos en el LocalStorage
document.addEventListener("DOMContentLoaded", () => {
    carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    mostrarCarrito()
})


stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 18rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: ${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `
});

//vaciar el carrito
vaciarCarrito.addEventListener('click', () => {
    carrito.length = []
    mostrarCarrito()
})

function agregarProducto(id) {
    const item = stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
    mostrarCarrito()
}

//mostrar los productos en el carrito
const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body")

    modalBody.innerHTML = ''
    carrito.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;

        modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: ${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      `
    });
    //hacer un conteo de los productos agregados en el icono del carrito
    if (carrito.length === 0) {
        console.log("Nada");
        modalBody.innerHTML = `
        <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
        `;
    } else {
        console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length

    guardarStorage();
}

function eliminarProducto(id) {
    const productoId = id
    carrito = carrito.filter((producto) => producto.id !== productoId)
    mostrarCarrito()
}

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}