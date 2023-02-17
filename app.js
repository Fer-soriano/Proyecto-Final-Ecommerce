const stockProductos = [
    {
        id: 1,
        nombre: "Miss Dior Perfume",
        cantidad: 1,
        desc: " esencia floral y frutal que se compone de notas de iris, peonías, chabacano, rosa, durazno y efluvios más dulces como la vainilla y el sándalo. ",
        precio: 1200,
        img: "img/img5.jpg",
    },
    {
        id: 2,
        nombre: "Chanel 5 Perfume",
        cantidad: 1,
        desc: "Entre sus características prioritarias, destaca el aroma más parecido al que emana de un bouquet floral.",
        precio: 1500,
        img: "img/descarga.jpg",
    },
    {
        id: 3,
        nombre: "Chance Chanel Perfume",
        cantidad: 1,
        desc: "Entre sus ingredientes principales, encontramos pimienta rosa, jazmín, iris, pachulí, almizcle y vainilla",
        precio: 1570,
        img: "img/chance.jpg",
    },
    {
        id: 4,
        nombre: "Dolce Gabbana Light Blue",
        cantidad: 1,
        desc: "Se trata de una fragancia Floral Frutal y fue creada por el perfumero Olivier Cresp. Sus Notas de Salida son limón siciliano",
        precio: 1000,
        img: "img/img4.jpg",
    },
    {
        id: 5,
        nombre: "La vie est belle perfume Lancôme",
        cantidad: 1,
        desc: "combina frutas exóticas como las grosellas negras, la pera, y otras notas dulces como praliné, vainilla, pachulí y haba tonka",
        precio: 1200,
        img: "img/img5.jpg",
    },
    {
        id: 6,
        nombre: "Tom Ford perfume Lost Cherry",
        cantidad: 1,
        desc: "Pertenece a la familia olfativa Ámbar Floral y fue producido por Louise Turner y lanzado en 2018",
        precio: 1200,
        img: "img/img6.jpg",
    },
    {
        id: 7,
        nombre: "Irresistible Givenchy perfume",
        cantidad: 1,
        desc: "Su deliciosa esencia floral y amaderada hace que olerlo se convierta en un verdadero deleite",
        precio: 1400,
        img: "img/nv.jpg",
    },
    {
        id: 8,
        nombre: "Flowerbomb Viktor & Rolf",
        cantidad: 1,
        desc: "Pertenece a la familia olfativa Ámbar Floral para Mujeres y exhala una bomba floral, como bien indica su nombre.",
        precio: 1200,
        img: "img/img3.jpg",
    },
    {
        id: 9,
        nombre: "Perfume Gucci Guilty",
        cantidad: 1,
        desc: "La mandora, una fruta originaria de la isla mediterránea de Chipre, es uno de los aromas",
        precio: 1400,
        img: "img/images.jpg",
    },

];

let carrito = [];

const contenedor = document.querySelector('#contenedor');
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");

//guardar datos en el LocalStorage
document.addEventListener('DOMContentLoaded', () => {
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
    /*contabilizar 2 productos iguales */
    const existe = carrito.some(prod => prod.id === id)

    if (existe) {
        const prod = carrito.map(prod => {
            if (prod.id === id) {
                prod.cantidad++;
            }
        })
    } else {

        const item = stockProductos.find((prod) => prod.id === id)
        carrito.push(item)

    }

    mostrarCarrito();
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
    })

    //hacer un conteo de los productos agregados en el icono del carrito
    /*   if (carrito.length === 0) {
           console.log("Nada");
           modalBody.innerHTML = `
           <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
           `;
       } else {
           console.log("Algo");
       }*/
    carritoContenedor.textContent = carrito.length

    //precio total de los productos
    precioTotal.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0);

    guardarStorage();
};

function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
    const productoId = id
    carrito = carrito.filter((producto) => producto.id !== productoId)
    mostrarCarrito()
}

