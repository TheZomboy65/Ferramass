
document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const nuevoUsuario = {
      nombre: document.getElementById("nombre").value.trim(),
      apellido: document.getElementById("apellido").value.trim(),
      rut: document.getElementById("rut").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      usuario: document.getElementById("usuario").value.trim(),
      password: document.getElementById("password").value,
      rol: "cliente"
    };

    let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const usuarioExiste = usuarios.some(u =>
      u.usuario.toLowerCase() === nuevoUsuario.usuario.toLowerCase()
    );

    const rutExiste = usuarios.some(u =>
      u.rut.replace(/\./g, '').toLowerCase() === nuevoUsuario.rut.replace(/\./g, '').toLowerCase()
    );

    if (usuarioExiste) {
      alert("Este nombre de usuario ya está registrado. Elige otro.");
      return;
    }

    if (rutExiste) {
      alert("Este RUT ya está registrado. Verifica si ya tienes una cuenta.");
      return;
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Registro exitoso. Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
  });