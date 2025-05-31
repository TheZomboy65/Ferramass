const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
const productos = JSON.parse(localStorage.getItem("productos") || "[]");

function mostrarUsuarios() {
  const cont = document.getElementById("usuariosContainer");
  cont.innerHTML = usuarios.map(u =>
    `<div><strong>${u.nombre} ${u.apellido}</strong> (${u.usuario}) - ${u.rol}</div>`
  ).join("");
}

function mostrarPedidos() {
  const cont = document.getElementById("pedidosContainer");
  if (pedidos.length === 0) {
    cont.innerHTML = "<p>No hay pedidos registrados.</p>";
    return;
  }
  cont.innerHTML = pedidos.map(p =>
    `<div><strong>${p.usuario}</strong>: ${p.items.length} producto(s)</div>`
  ).join("");
}

function mostrarProductos() {
  const cont = document.getElementById("productosContainer");
  if (productos.length === 0) {
    cont.innerHTML = "<p>No hay productos registrados.</p>";
    return;
  }
  cont.innerHTML = productos.map((prod, i) =>
    `<div class="d-flex justify-content-between align-items-center border-bottom py-2">
      <div>${prod.nombre} - $${prod.precio}</div>
      <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${i})">Eliminar</button>
    </div>`
  ).join("");
}

function mostrarFormularioProducto() {
  const modal = new bootstrap.Modal(document.getElementById('modalProducto'));
  modal.show();
}

document.getElementById("formProducto").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombreProducto").value;
  const precio = parseFloat(document.getElementById("precioProducto").value);
  const imagen = document.getElementById("imagenProducto").value;

  productos.push({ nombre, precio, imagen });
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();

  bootstrap.Modal.getInstance(document.getElementById("modalProducto")).hide();
  e.target.reset();
});

function eliminarProducto(index) {
  productos.splice(index, 1);
  localStorage.setItem("productos", JSON.stringify(productos));
  mostrarProductos();
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "login.html";
}

// Iniciar
mostrarUsuarios();
mostrarPedidos();
mostrarProductos();

