// Capturarr el div del html destinos
const divDestinos = document.querySelector(".divdestinos");
// Capturar card destino que se ingresa mediante js
const cardContainer = document.querySelector(".card-destino");
// capturar boton comprar de cards
const boton = document.getElementById(`agregar$(destino.id)`);
// capturar navbarlist responsive
const menuResponsive = document.querySelector(".navbar-list");
// capturar logo menu hamburguesa
const logoMenuResponsive = document.querySelector(".menu-icon");
// Html colection de los botones de categorias
const btnsCategorias = document.querySelector(".categorias");
// capturar logo del carro
const logoCarro = document.querySelector(".cart-icon");
// capturar div general del carro de compras
const divCarro = document.querySelector(".divcarro");
// capturar div para renderizar cards en el carrito
const cartContainer = document.querySelector(".cart-container");
// capturar burbuja del carrito
const burbujaCart = document.querySelector(".carro-burbuja");
// capturar el total del carrito
const precioTotal = document.querySelector(".total2");
// capturar boton comprar y vaciar del carrito
const btnVaciar = document.querySelector(".btn-delete");
const btnComprar = document.querySelector(".btn-buy");
// capturar modal para msjs del carrito
const modalMsj = document.querySelector(".modalMsj");
//  Overlay para tirar facha abajo del menú hamburguesa y el cart.
const overlay = document.querySelector(".overlay");

const listaCategorias = document.querySelectorAll(".category");

// LocalStorage
// BUSCAR Y GUARDAR EN localStorage(carrito)
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const saveLocalStorage = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
};

// Renderizar destinos por categoria ,si no hay categoria renderizar todos.
const renderizarCards = (category = undefined) => {
  if (!category) {
    divDestinos.innerHTML = destinosTodos.join("");
    return;
  }
  renderFilteredProducts(category);
};

// Productos filtrados
const renderFilteredProducts = (category) => {
  const productsList = destinosList.filter((product) => {
    return product.category === category;
  });
  divDestinos.innerHTML = productsList.map(cardTemplate).join("");
};

// Cambiar de color el boton seleccionado en categorias
const pintarBtnSelec = (categoriaSeleccionada) => {
  const arrayCategorias = [...listaCategorias];
  arrayCategorias.forEach((categoriaBtn) => {
    if (categoriaBtn.dataset.category !== categoriaSeleccionada) {
      categoriaBtn.classList.remove("active");
      return;
    }
    categoriaBtn.classList.add("active");
  });
};

const changeFilterState = (e) => {
  const categoriaSeleccionada = e.target.dataset.category;
  pintarBtnSelec(categoriaSeleccionada);
};

// AplicarFiltro

const aplicarFiltro = (e) => {
  console.log(e.target.dataset.category);
  if (!e.target.classList.contains("category")) {
    return;
  } else {
    changeFilterState(e);
  }
  if (!e.target.dataset.category) {
    divDestinos.innerHTML = "";
    renderizarCards();
  } else {
    renderizarCards(e.target.dataset.category);
  }
};
// Renderizar Carro de compras
const mostrarCarro = () => {
  divCarro.classList.toggle("open-cart");
  if (menuResponsive.classList.contains("open-menu")) {
    menuResponsive.classList.remove("open-menu");
    return;
  }
  overlay.classList.toggle("show-overlay");
};
// Renderizar Menu Hamburguesa
const mostrarMenuResp = () => {
  menuResponsive.classList.toggle("open-menu");
  if (divCarro.classList.contains("open-cart")) {
    divCarro.classList.remove("open-cart");
    return;
  }
  overlay.classList.toggle("show-overlay");
};

// Ocultar Menu si hacemos click en un enlace
const ocultarMenuClickEnlace = (e) => {
  if (!e.target.classList.contains("navbar-a")) {
    return;
  }
  menuResponsive.classList.remove("open-menu");
  overlay.classList.remove("show-overlay");
};

// Ocultar Menu o Carrito si scrolleamos
const ocultarOnScroll = (e) => {
  if (
    menuResponsive.classList.contains("open-menu") ||
    divCarro.classList.contains("open-cart")
  ) {
    menuResponsive.classList.remove("open-menu");
    divCarro.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
  }
};
// Ocultar Menu o Carrito si hacemos click fuera del que estemos

const ocultarOnClickAfuera = () => {
  menuResponsive.classList.remove("open-menu");
  divCarro.classList.remove("open-cart");
  overlay.classList.remove("show-overlay");
};

// Renderizar cards en el carrito(template de las cards)
const templateCardCarro = (cartDestino) => {
  const { id, nombre, imagen, precio, descripcion, quantity } = cartDestino;
  return `
  <div class="cart-item">
  <img
    src=${imagen}
    alt="paisaje"
    class="carro-imgvene"
  />
  <div class="item-info">
    <div class="item-bid-info">
      <h3 class="item-title">${nombre}</h3>
      <p class="item-bid">${descripcion}</p>
      <p class="item-bid">Precio por persona</p>
    </div>
    <div class="item-bid-price">
      <span class="item-price">${precio}</span>
    </div>
  </div>
  <div class="item-handler">
    <span class="quantity-handler down btn-" data-id=${id}>-</span>
    <span class="quantity-handler cant-per">${quantity}</span>
    <span class="quantity-handler up btn" data-id=${id}>+</span>
  </div>
</div>

  `;
};

// renderizar las cards con el template anterior, si el carrito esta vacio mostrar msj
const renderCardCarrito = () => {
  if (!cart.length) {
    cartContainer.innerHTML = `<p class="pCarroVacio"> No hay productos en el carrito.</p>`;
    return;
  }
  cartContainer.innerHTML = cart.map(templateCardCarro).join("");
};

// Precio del total en el carrito
const totalCarrito = () => {
  return cart.reduce((acc, cur) => {
    return acc + Number(cur.precio) * cur.quantity;
  }, 0);
};

// Mostrar el total en el carrito
const showTotal = () => {
  precioTotal.innerHTML = `$${totalCarrito().toFixed(2)}`;
};

// Renderizar cantidad en la burbuja

const renderBurbuja = () => {
  burbujaCart.textContent = cart.reduce((acc, cur) => {
    return acc + cur.quantity;
  }, 0);
};
// habilitar / deabilitar botones del carrito
const desabilitarBtn = (btn) => {
  if (!cart.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

// checkear y actualizar el carrito
const checkEstadoCarrito = () => {
  saveLocalStorage(cart);
  renderCardCarrito();
  showTotal();
  desabilitarBtn(btnComprar);
  desabilitarBtn(btnVaciar);
  renderBurbuja();
};
// agregar productos al carrito
const agregarAlCarrito = (e) => {
  if (!e.target.classList.contains("btn-add")) {
    return;
  }
  const { id, nombre, precio, imagen, descripcion } = e.target.dataset;
  const product = productData(id, nombre, precio, imagen, descripcion);
  if (existeEnCarrito(product)) {
    agregarCantidad(product);
    msjModalCarrito("La cantidad se aumento con exito al carrito");
  } else {
    crearCardCarrito(product);
    msjModalCarrito("Se agrego el destino al carrito");
  }
  checkEstadoCarrito();
};

// pasar el producto a objeto
const productData = (id, nombre, precio, imagen, descripcion) => {
  return { id, nombre, precio, imagen, descripcion };
};
// verificar si existe el producto en el carrito
const existeEnCarrito = (product) => {
  return cart.find((item) => {
    return item.id === product.id;
  });
};

// si existe = aumentarle la cantidad
const agregarCantidad = (product) => {
  cart = cart.map((cartProduct) => {
    return cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};

// mostrar msj del carrito
const msjModalCarrito = (msj) => {
  modalMsj.classList.add("activeModal");
  modalMsj.textContent = msj;
  setTimeout(() => {
    modalMsj.classList.remove("activeModal");
  }, 1500);
};

// agregar card al carrito

const crearCardCarrito = (product) => {
  cart = [
    ...cart,
    {
      ...product,
      quantity: 1,
    },
  ];
};

const btnMenosCarrito = (id) => {
  const yaExisteEnCarrito = cart.find((item) => {
    return item.id === id;
  });

  if (yaExisteEnCarrito.quantity === 1) {
    if (window.confirm("¿Desea eliminar el producto del carrito?")) {
      eliminarProductoCarrito(yaExisteEnCarrito);
    }
    return;
  }
  disminuirCantidad(yaExisteEnCarrito);
};

// eliminar del carrito por confirmacion del usuario
const eliminarProductoCarrito = (yaExisteEnCarrito) => {
  cart = cart.filter((product) => product.id !== yaExisteEnCarrito.id);
  checkEstadoCarrito();
};

// disminuir la cantidad del producto, si en el carrito es mayor a 1
const disminuirCantidad = (yaExisteEnCarrito) => {
  cart = cart.map((product) => {
    return product.id === yaExisteEnCarrito.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};

// Para el boton de agregar cantidad en el carrito
const btnMasCarrito = (id) => {
  const yaExisteEnCarrito = cart.find((item) => {
    return item.id === id;
  });
  agregarCantidad(yaExisteEnCarrito);
};

// funcion para cantidades en el carrito
const cantidadesCarrito = (e) => {
  if (e.target.classList.contains("btn-")) {
    btnMenosCarrito(e.target.dataset.id);
  } else if (e.target.classList.contains("up")) {
    btnMasCarrito(e.target.dataset.id);
  }
  checkEstadoCarrito();
};

const resetearCarrito = () => {
  cart = [];
  checkEstadoCarrito();
};

const confirmarOvaciarCarro = (msjAntes, msjDespues) => {
  if (!cart.length) return;
  if (window.confirm(msjAntes)) {
    resetearCarrito();
    alert(msjDespues);
  }
};

const confirmarCompra = () => {
  confirmarOvaciarCarro(
    "¿Desea confirmar su compra?",
    "¡ Gracias por su compra !"
  );
};

const vaciarCarrito = () => {
  confirmarOvaciarCarro("¿Desea vaciar el carrito?", "Su carrito esta vacio");
};

const init = () => {
  renderizarCards();
  btnsCategorias.addEventListener("click", aplicarFiltro);
  logoMenuResponsive.addEventListener("click", mostrarMenuResp);
  logoCarro.addEventListener("click", mostrarCarro);
  menuResponsive.addEventListener("click", ocultarMenuClickEnlace);
  window.addEventListener("scroll", ocultarOnScroll);
  overlay.addEventListener("click", ocultarOnClickAfuera);
  document.addEventListener("DOMContentLoaded", renderCardCarrito);
  document.addEventListener("DOMContentLoaded", showTotal);
  document.addEventListener("DOMContentLoaded", renderBurbuja);
  divDestinos.addEventListener("click", agregarAlCarrito);
  cartContainer.addEventListener("click", cantidadesCarrito);
  btnComprar.addEventListener("click", confirmarCompra);
  btnVaciar.addEventListener("click", vaciarCarrito);
  desabilitarBtn(btnVaciar);
  desabilitarBtn(btnComprar);
};
// inicializando
init();
