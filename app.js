
const productos = []

fetch("./dataBase.json").then((respuesta) => respuesta.json()).then((data) => {
    data.forEach((producto) =>  productos.push(producto))
    setTimeout(()=> {renderizarProductos(productos)}, 3000)
})

const carrito = []
const actualizarCarrito = () => localStorage.setItem("carrito", JSON.stringify(carrito))

if (localStorage.getItem("carrito")) {
    JSON.parse(localStorage.getItem("carrito")).forEach((producto) => carrito.push(producto))
} else {
    actualizarCarrito()
}

const agregarProducto = (productoAgregar) => {
    if (carrito.some((producto) => producto.id == productoAgregar.id)) {
        const indice = carrito.findIndex((producto) => producto.id == productoAgregar.id)
        carrito[indice].cantidad++
    } else {
        carrito.push({...productoAgregar, cantidad:1})
    }
    actualizarCarrito()
    Toastify({

        text: "Se ha agregado un producto al carrito de compras",
        
        duration: 3000,

        style: {
            background: "pink", 
            color: "black"
          },
        }).showToast();
}

const conteiner = document.getElementById("conteiner")
const renderizarProductos = (listaDeProductos) => {
    if (listaDeProductos.length >0)  {
        conteiner.innerHTML = ""
        listaDeProductos.forEach((producto) => conteiner.innerHTML +=
        `<div class="card">
        <h1 class="h1">${producto.nombre}<h1/>
        <p class="precio">${producto.precio}</p>
        <img class="img" src="${producto.imagen}">
        <button class="btnBuy" value="${producto.id}">Agregar al carrito</button>
        </div>
        `
        )
    } else {
        conteiner.innerHTML =
        ` <h3 class="prodCargando"> Cargando los productos.. </h3> `
    }
        
        
    
 
    
    
    const botones = document.getElementsByClassName("btnBuy")
    for (let boton of botones) {
        boton.addEventListener("click", (e) => { 
            console.log(e.target.value)
            agregarProducto(productos.find((producto) => e.target.value == producto.id))    
        }
        )}}

renderizarProductos(productos)
    
const filterCategory = (categoria) => {
    renderizarProductos(productos.filter((producto) => producto.categoria == categoria
    ))
}

const filtrador = document.getElementById("filtrador")


const categorias = ["ninios", "bikini", "hombre", "lenceria"]
for (let categoria of categorias) {
    document.getElementById("btn-"+categoria).addEventListener("click", (e) => filterCategory(e.target.value))    
}



    