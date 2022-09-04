const cards = document.getElementById("cards");
const items = document.getElementById("items");
const footer = document.getElementById("footer");
const templateCard = document.getElementById("template-card").content;
const templateFooter = document.getElementById("template-footer").content;
const templateCarrito = document.getElementById("template-carrito").content;
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    pintarCarrito();
  }
});

cards.addEventListener("click", (e) => {
  addCarrito(e);
});

items.addEventListener("click", (e) => {
  btnAccion(e);
});

const fetchData = async () => {
  try {
    const res = await fetch("/productos.json");
    const data = await res.json();
    pintarCards(data);
  } catch (error) {
    console.error(error);
  }
};

const pintarCards = (data) => {
  data.forEach((producto) => {
    templateCard.querySelector("h5").textContent = producto.marca;
    templateCard.querySelector("p").textContent = producto.precio;
    //AGREGAR IMAGEN
    templateCard.querySelector("img").setAttribute("src", producto.img);
    templateCard.querySelector(".btn-dark").dataset.id = producto.id;

    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone);
  });
  cards.appendChild(fragment);
};

// AÑADIR AL CARRITO
const addCarrito = (e) => {
  if (e.target.classList.contains("btn-dark")) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation();
};
//PONER LOS OBJETOS EN EL CARRITO
const setCarrito = (objeto) => {
  //console.log(objeto)
  const producto = {
    id: objeto.querySelector(".btn-dark").dataset.id,
    marca: objeto.querySelector("h5").textContent,
    precio: objeto.querySelector("p").textContent,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1;
  }
  carrito[producto.id] = { ...producto };
  pintarCarrito();
};
const pintarCarrito = () => {
  //console.log(carrito)
  Object.values(carrito).forEach((producto) => {
    items.innerHTML = " ";
    templateCarrito.querySelector("th").textContent = producto.id;
    templateCarrito.querySelectorAll("td")[0].textContent = producto.marca;
    templateCarrito.querySelectorAll("td")[1].textContent = producto.cantidad;
    templateCarrito.querySelector(".btn-info").dataset.id = producto.id;
    templateCarrito.querySelector(".btn-danger").dataset.id = producto.id;
    templateCarrito.querySelector("span").textContent =
      producto.cantidad * producto.precio;
    const clone = templateCarrito.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  pintarFooter();
  //GUARDO EN EL LOCAL STORAGE PARA Q NO SE PIERDA CUANDO REINICIO LA PAGINA
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

const pintarFooter = () => {
  footer.innerHTML = "";
  if (Object.keys(carrito).length === 0) {
    footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío,  ¡comience a comprar!</th>
        `;
    return;
  }

  const nCantidad = Object.values(carrito).reduce(
    (acc, { cantidad }) => acc + cantidad,
    0
  );
  const nPrecio = Object.values(carrito).reduce(
    (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
  );

  templateFooter.querySelectorAll("td")[0].textContent = nCantidad;
  templateFooter.querySelector("span").textContent = nPrecio;

  const clone = templateFooter.cloneNode(true);
  fragment.appendChild(clone);
  footer.appendChild(fragment);

  
};

const btnAccion = (e) => {
  //Accion de aumentar productos
  if (e.target.classList.contains("btn-info")) {
    //carrito[e.target.dataset.id]
    const producto = carrito[e.target.dataset.id];
    producto.cantidad++;
    carrito[e.target.dataset.id] = { ...producto };
    pintarCarrito();
  }
  //Accion de disminuir productos
  if (e.target.classList.contains("btn-danger")) {
    const producto = carrito[e.target.dataset.id];
    producto.cantidad--;
    if (producto.cantidad === 0) {
      delete carrito[e.target.dataset.id];
    }
    pintarCarrito();
  }
  e.stopPropagation();
};

//SweetAlert.................................................................................

/* const btnAlert = document.querySelector("#btn")
    btnAlert.addEventListener("click", alerta)  */

function alerta() {
  const Toast = Swal.fire({
    title: "¡Producto agregado correctamente!",
    showConfirmButton: false,
    position: "top-end",
    icon: "success",
    toast: true,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
}

function VaciarCarrito() {
  carrito = {}

  localStorage.removeItem("carrito");

  const Toast = Swal.fire({
    title: "¡Carrito vaciado correctamente!",
    timer: 2500,
    timerProgressBar: true,
    showConfirmButton: false,
    icon: "success",
    
  
  });

  setTimeout(() => {
    window.location.reload()
  }, 2500);

}

function finalizarCompra() {
  if (
    Object.keys(carrito).length > 0
  ) {
    carrito = {}

    localStorage.removeItem("carrito");

    const Toast = Swal.fire({
      title: "¡Pedido realizado Correctamente!",
      timer: 2500,
      timerProgressBar: true,
      showConfirmButton: false,
      icon: "success",
      
    });

    setTimeout(() => {
      window.location.reload()
    }, 2500);
  } else {
    Swal.fire({
      title: "Aun no tienes productos en tu carrito",
      showConfirmButton: true,
      icon: "error",
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
  }
}
  
