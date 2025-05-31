const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));


    

    const productos = JSON.parse(localStorage.getItem("productos") || "[]");
    const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");

    function mostrarProductos() {
      const cont = document.getElementById("productosContainer");
      if (productos.length === 0) {
        cont.innerHTML = "<p>No hay productos registrados.</p>";
        return;
      }

      cont.innerHTML = productos.map((p, i) => `
        <div class="d-flex align-items-center justify-content-between border-bottom py-2">
          <span><strong>${p.nombre}</strong> - $${p.precio}</span>
          <input type="number" min="0" class="form-control w-25 me-2" value="${p.stock || 0}" onchange="actualizarStock(${i}, this.value)">
        </div>
      `).join("");
    }

    function actualizarStock(index, nuevoStock) {
      productos[index].stock = parseInt(nuevoStock);
      localStorage.setItem("productos", JSON.stringify(productos));
      alert("Stock actualizado");
    }

    function mostrarPedidos() {
      const cont = document.getElementById("pedidosContainer");
      if (pedidos.length === 0) {
        cont.innerHTML = "<p>No hay pedidos registrados.</p>";
        return;
      }

      cont.innerHTML = pedidos.map(p => `
        <div class="border-bottom py-2">
          <strong>${p.usuario}</strong> - ${p.items.length} producto(s)
        </div>
      `).join("");
    }

    function cerrarSesion() {
      localStorage.removeItem("usuarioActivo");
      window.location.href = "login.html";
    }

    
    mostrarProductos();
    mostrarPedidos();

    for (let pedido of pedidos) {
        if (!pedido.estado) {
          pedido.estado = "pendiente";
        }
      }
      localStorage.setItem("pedidos", JSON.stringify(pedidos));
    
      function mostrarPedidos() {
        const cont = document.getElementById("pedidosContainer");
        if (pedidos.length === 0) {
          cont.innerHTML = "<p>No hay pedidos registrados.</p>";
          return;
        }
      
        cont.innerHTML = pedidos.map((p, index) => `
          <div class="border-bottom py-3">
            <div><strong>Cliente:</strong> ${p.usuario}</div>
            <div><strong>Productos:</strong> ${p.items.length}</div>
            <div><strong>Estado:</strong> 
              <span class="badge ${p.estado === 'despachado' ? 'bg-success' : 'bg-warning text-dark'}">
                ${p.estado}
              </span>
            </div>
            ${p.estado === 'pendiente' ? `
              <button class="btn btn-sm btn-primary mt-2" onclick="marcarDespachado(${index})">
                Marcar como despachado
              </button>
            ` : ''}
          </div>
        `).join("");
      }
      
      function marcarDespachado(index) {
        pedidos[index].estado = "despachado";
        localStorage.setItem("pedidos", JSON.stringify(pedidos));
        mostrarPedidos();
      }
      