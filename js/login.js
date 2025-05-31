const usuariosDemo = [
    { usuario: "admin", password: "admin123", rol: "administrador", nombre: "Admin" },
    { usuario: "bodeguero", password: "bodega123", rol: "bodeguero", nombre: "Bodeguero" },
    { usuario: "cliente", password: "cliente123", rol: "cliente", nombre: "Cliente" }
  ];

  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const usuarioInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    const usuarioEncontrado = usuariosDemo.find(u => u.usuario === usuarioInput && u.password === passwordInput);

    if (usuarioEncontrado) {
      localStorage.setItem("usuario", JSON.stringify(usuarioEncontrado));

      
      switch (usuarioEncontrado.rol) {
        case "administrador":
          window.location.href = "admin.html";
          break;
        case "bodeguero":
          window.location.href = "bodeguero.html";
          break;
        case "cliente":
          window.location.href = "index.html";
          break;
      }
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });