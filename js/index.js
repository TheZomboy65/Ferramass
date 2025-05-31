

document.getElementById("clienteNombre").textContent = usuarioActivo.nombre;

const productos = JSON.parse(localStorage.getItem("productos") || "[]");
const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");

function mostrarProductos() {
  const contenedor = document.getElementById("productosContainer");
  if (productos.length === 0) {
    contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
    return;
  }

  function mostrarProductos() {
    const contenedor = document.getElementById("productosContainer");
    contenedor.innerHTML = productos.map((p, i) => `
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="card-text">$${p.precio}</p>
            <button class="btn btn-success" onclick="agregarAlCarrito(${i})">Agregar al carrito</button>
          </div>
        </div>
      </div>
    `).join("");
  }
}

function agregarAlCarrito(index) {
  const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
  carrito.push(productos[index]);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  alert("Producto agregado al carrito");
}
function irAlCarrito() {
  window.location.href = "carrito.html";
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "index.html";
}

mostrarProductos();


