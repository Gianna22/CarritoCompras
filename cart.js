console.log(JSON.parse(localStorage.getItem("carrito")));
const carrito = [];
const totalHtml = document.getElementById("total")
const renderizarTotal = () => {
  let total = 0
  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad
  })
  totalHtml.innerHTML = `<h3 class="totalProd">Total de la compra $${total} </h3>`
}
const renderizarCarritoHtml = document.getElementById("renderizar");
const eliminarProductoDelCarrito = (idAEliminar) => {
  const indice = carrito.findIndex((producto) => producto.id === idAEliminar);
    carrito.splice(indice, 1);
};
const restarProductoDelCarrito = (idARestar) => {
    const indice = carrito.findIndex((producto) => producto.id === parseInt(idARestar))
  if (carrito[indice].cantidad != 1) {
    carrito[indice].cantidad--
  }
}

const sumarProductoDelCarrito = (idASumar) => {
  const indice = carrito.findIndex((producto) => producto.id === parseInt(idASumar))
  carrito[indice].cantidad++
}
const renderizarCarrito = (listaDeCarrito) => {
  renderizarCarritoHtml.innerHTML = "";
  if (carrito.length > 0) {
    listaDeCarrito.forEach((producto) => {
      renderizarCarritoHtml.innerHTML += `<div class="item-cart">
            <h3 class="nameProd">${producto.nombre}</h3>
            <p class="totalCompra">${producto.precio}</p>
            <p class="cantidad">cantidad seleccionada: ${producto.cantidad}</p>
            <div class="btns">
            <button class="btnDelete" id="${producto.id}">Eliminar producto</button>
            <button class="btnRestar" id="btn-restar-${producto.id}">-</button>
            <button class="btnSumar" id="btn-sumar-${producto.id}">+</button>
            </btns>
        </div>  `;
    });

    const btnsEliminar = document.getElementsByClassName("btnDelete");
    const btnsRestar = document.getElementsByClassName("btnRestar");
    const btnsSumar = document.getElementsByClassName("btnSumar");

    for (let btnRestar of btnsRestar) {
      btnRestar.addEventListener("click", (e) => {
        restarProductoDelCarrito(e.target.id.split("-").pop());
        actualizarCarrito();
        renderizarCarrito(carrito);
      });
    }

    for (let btnEliminar of btnsEliminar) {
      btnEliminar.addEventListener("click", (e) => {
        eliminarProductoDelCarrito(e.target.id);
        actualizarCarrito();
        renderizarCarrito(carrito);
      });
    }

    for (let btnSumar of btnsSumar) {
      btnSumar.addEventListener("click", (e) => {
        sumarProductoDelCarrito(e.target.id.split("-").pop());
        actualizarCarrito();
        renderizarCarrito(carrito);
      });
    }
    
    renderizarTotal()
  } else {
    renderizarCarritoHtml.innerHTML += ` <h2 class="h2"> Aun no tienes productos agregados </h2> `;
  }
};

const actualizarCarrito = () =>
  localStorage.setItem("carrito", JSON.stringify(carrito));

if (localStorage.getItem("carrito")) {
  JSON.parse(localStorage.getItem("carrito")).forEach((producto) =>
    carrito.push(producto)
  );
  renderizarCarrito(carrito);
} else {
  actualizarCarrito();
}

