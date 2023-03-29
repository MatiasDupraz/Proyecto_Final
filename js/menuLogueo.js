console.log(JSON.parse(localStorage.getItem("cuentas")));
//Se declara un objeto que contiene la información básica del usuario
//Función Menú de Logueo
let cuentas = [];
class Cuenta {
    constructor (nombre, apellido, correo, contrasena, altura, direccion, ciudad, pais, telefono) {
        this.nombre = nombre.toLowerCase();
        this.apellido = apellido.toLowerCase();
        this.correo = correo.toLowerCase();
        this.contrasena = contrasena;
        this.altura = parseInt(altura);
        this.direccion = direccion.toLowerCase();
        this.ciudad = ciudad.toLowerCase();
        this.pais = pais.toLowerCase();
        this.telefono = parseInt(telefono);
    }
    asignarId(array) {
        this.id = array.length;
    }
}
let error = document.getElementById("error");

//Error 1: Usuario / Contraseña incorrectos
//Error 2: Cuenta === ""
//Error 3: Contraseña === ""
        
const erroresLogueo = [];
erroresLogueo.push("Usuario y/o Contraseña incorrecta", "Ingrese una cuenta", "Ingrese la contraseña", "Aún no hay cuentas registradas");

//Error 1: Las contraseñas no coinciden //
//Error 2: Hay uno o más campos vacíos //
//Error 3: El correo ingresado ya se encuentra registrado
//Error 4: El correo ingresado no es válido //
//Error 5: Las casillas marcadas sólo aceptan datos numéricos //

const erroresRegistro = [];
erroresRegistro.push("Las contraseñas no coinciden", "Hay uno o más campos vacíos", "El correo ingresado ya está registrado", "El correo ingresado no es válido", "Las casillas teléfono y altura sólo admiten datos numéricos");

//Función para mostrar errores de logueo / registro
function displayErrors(tipo,x){
    error.innerHTML = tipo[x];
}

function loguearse(){
    let correo = (document.getElementById('correoInput').value).toLowerCase();
    let contrasena = document.getElementById('contrasenaInput').value;
    let encontrado = false;
    if(correo === ""){
        displayErrors(erroresLogueo,1);
    }
    else if(contrasena === ""){
        displayErrors(erroresLogueo,2);
    }
    else{
        cuentas = JSON.parse(localStorage.getItem("cuentas"));
        if (cuentas != null){
            cuentas.forEach(cuenta => {
                if(correo === cuenta.correo){
                    encontrado = true;
                    if(contrasena !== cuenta.contrasena){
                        displayErrors(erroresLogueo,0);
                    }
                    else{
                        //Contraseña válida
                        error.style.display = 'none';
                        alert(`Bienvenido ${cuenta.nombre}!`)
                    }
                }
                if(encontrado === false){
                    displayErrors(erroresLogueo,0);
                }
            });
        
        }
        else{
            displayErrors(erroresLogueo,3);
        }
        
    }
}

function registrarse(){
    function registrarCuenta(cuenta, cuentas){
        //Se asigna id a la cuenta nueva
        cuenta.asignarId(cuentas);
        //Se agrega la cuenta al array
        cuentas.push(cuenta);
        //Se vuelve a cargar el array al local storage
        localStorage.setItem("cuentas", JSON.stringify(cuentas));

        error.style.display = 'none';
        document.getElementById('nombreInput').value = '';
        document.getElementById('apellidoInput').value = '';
        document.getElementById('correoInput').value = '';
        document.getElementById('contrasenaInput').value = '';
        document.getElementById('repContrasenaInput').value = '';
        document.getElementById('alturaInput').value = '';
        document.getElementById('direccionInput').value = '';
        document.getElementById('ciudadInput').value = '';
        document.getElementById('paisInput').value = '';
        document.getElementById('telefonoInput').value = '';
        alert('Cuenta registrada');
        //Redirecciona a la página principal
        location.replace('../index.html');
    }

    let nombre = document.getElementById('nombreInput').value;
    let apellido = document.getElementById('apellidoInput').value;
    let correo = document.getElementById('correoInput').value;
    let contrasena = document.getElementById('contrasenaInput').value;
    let contrasena2 = document.getElementById('repContrasenaInput').value;
    let altura = document.getElementById('alturaInput').value;
    let direccion = document.getElementById('direccionInput').value;
    let ciudad = document.getElementById('ciudadInput').value;
    let pais = document.getElementById('paisInput').value;
    let telefono = document.getElementById('telefonoInput').value;
    
    if (!(correo.includes("@")) || !(correo.includes(".")) || (correo.includes(" "))){
        displayErrors(erroresRegistro,3);
        
    }
    else if(nombre == '' || apellido == '' || correo == '' || contrasena == '' || altura == '' || direccion == '' || ciudad == '' || pais == '' || telefono == 0){
        displayErrors(erroresRegistro,1);
    }
    else if(contrasena != contrasena2){
        displayErrors(erroresRegistro,0);
        
    }
    else if(isNaN(telefono) || isNaN(altura)){
        displayErrors(erroresRegistro,4);
    }
    else{
        let cuenta = new Cuenta(nombre, apellido, correo, contrasena, altura, direccion, ciudad, pais, telefono);
        //Se comprueba si hay cuentas cargadas en local storage
        if (localStorage.getItem("cuentas")) {
            let encontrado = false;
            //Si es correcto, se cargan las cuentas en el array
            cuentas = JSON.parse(localStorage.getItem("cuentas"));
            cuentas.forEach(acc => {
                if (cuenta.correo === acc.correo) {
                    displayErrors(erroresRegistro,2);
                    encontrado = true;
                }
                
            })
            if(encontrado === false){
                registrarCuenta(cuenta, cuentas);
            }
        }
        else{
            registrarCuenta(cuenta, cuentas)
        }
    
    }
}

//En base al título que muestra la página en h1, se ejecuta la función de login o la función de registro
let titulo = document.getElementById('tituloLogin').innerHTML;

if(titulo === "INICIAR SESIÓN"){
    let botonLogueo = document.getElementById('botonLogueo');
    botonLogueo.addEventListener('click', loguearse);

}
else{
    let botonLogueo = document.getElementById('botonRegistro');
    botonLogueo.addEventListener('click', registrarse);
}
