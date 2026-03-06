const registerButton = document.getElementById('register');
const loginButton = document.getElementById('login');
const container = document.getElementById('container');
const password = document.getElementById('contrasena');
const confirmar = document.getElementById('confirmar');
const seguridad = document.getElementById('nivelseguridad');
const formulario = document.querySelector('.register-container form');
const usuario = document.getElementById('nombreusuario');
const correo = document.querySelector('.register-container input[type="email"]');
const loginForm = document.querySelector('.login-container form');
const loginCorreo = document.querySelector('.login-container input[type="email"]');
const loginPass = document.getElementById('loginPass'); 


registerButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

loginButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});


password.addEventListener('input', () => {
    const valor = password.value;
    let fortaleza = 0;

    if (valor.length >= 5) fortaleza += 30;
    if (valor.match(/[A-Z]/)) fortaleza += 30;
    if (valor.match(/[0-9]/)) fortaleza += 40;
    if (valor.match(/[@$!%*?&]/)) fortaleza += 10;

    seguridad.style.width = fortaleza + '%';

    if (fortaleza < 40) seguridad.style.backgroundColor = 'red';
    else if (fortaleza < 70) seguridad.style.backgroundColor = 'orange';
    else seguridad.style.backgroundColor = 'green';
});


formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    
    if (password.value !== confirmar.value) {
        alert('Las contraseñas no coinciden. Por favor, verifica.');
        return; 
    }

    if (formulario.checkValidity()) {
        const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];

        const existe = usuariosRegistrados.find(user => user.correo === correo.value);
        if (existe) {
            alert('Este correo ya está registrado. Intenta iniciar sesión.');
            return;
        }

        const nuevoUsuario = {
            nombreusuario: usuario.value,
            correo: correo.value,
            contraseña: password.value,
            fecha: new Date().toLocaleString()
        };

        usuariosRegistrados.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        formulario.reset();
        seguridad.style.width = '0%';
        container.classList.remove('right-panel-active');
    } else {
        alert('Por favor, completa todos los campos correctamente');
    }   
});


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioEncontrado = usuariosRegistrados.find(user => user.correo === loginCorreo.value);

    if (!usuarioEncontrado) {
        alert('El usuario no está registrado, regístrese primero.');
    } else {
        if (usuarioEncontrado.contraseña === loginPass.value) {
            alert(`¡Bienvenido, ${usuarioEncontrado.nombreusuario}!`);
        } else {
            alert('Credenciales incorrectas. Verifique su contraseña.');
        }
    }
});


function togglePassword(inputId, icon) {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈"; // visible → mostrar mono
    } else {
        input.type = "password";
        icon.textContent = "👁️"; // oculto → mostrar ojo
    }
}