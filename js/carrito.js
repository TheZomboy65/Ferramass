const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");

  
    function mostrarCarrito() {
      const contenedor = document.getElementById("carritoContainer");
      if (carrito.length === 0) {
        contenedor.innerHTML = "<p>No hay productos en el carrito.</p>";
        document.getElementById("total").textContent = "";
        return;
      }

      let total = 0;
      contenedor.innerHTML = carrito.map((p, i) => {
        total += parseFloat(p.precio);
        return `
          <div class="carrito-item d-flex justify-content-between align-items-center">
            <div>
              <strong>${p.nombre}</strong><br>
              $${p.precio}
            </div>
            <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${i})">Eliminar</button>
          </div>
        `;
      }).join("");

      document.getElementById("total").textContent = "Total: $" + total.toFixed(2);
    }

    function eliminarProducto(index) {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarrito();
    }

    function confirmarPedido() {
      if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
      }

      const nuevoPedido = {
        usuario: usuario.nombre,
        items: carrito,
        estado: "pendiente"
      };

      pedidos.push(nuevoPedido);
      localStorage.setItem("pedidos", JSON.stringify(pedidos));
      localStorage.removeItem("carrito");

      alert("Pedido confirmado. Gracias por tu compra.");
      window.location.href = "index.html";
    }

    function volverAProductos() {
      window.location.href = "index.html";
    }

    mostrarCarrito();