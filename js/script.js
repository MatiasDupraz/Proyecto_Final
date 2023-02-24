//Función slider que el proyecto ya tenía
const imgs = document.querySelectorAll('.leftside a');
const imgBtns = [...imgs];
let imgId = 1;

imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
    });
});

function slideImage(){
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;

    document.querySelector('.img-showcase').style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
}

window.addEventListener('resize', slideImage);
//

//Función Menú de Logueo

let cuentas = [{
    correo: 'matias.juarez@gmail.com',
    contrasena: '1234'
},
{
    correo: 'martha.estevanez@gmail.com',
    contrasena: 'abecede'
},
{
    correo: 'monicagiraudo23@gmail.com',
    contrasena: 'moras23'
},
{
    correo: 'admin',
    contrasena: 'admin'
}
];

function loguearse(){
    correo = document.getElementById('correoInput').value;
    contrasena = document.getElementById('contrasenaInput').value;
    for(let i = 0; i < cuentas.length; i++){
        if(correo == cuentas[i].correo){

            if(contrasena == cuentas[i].contrasena){
                alert('Bienvenido!');
                break;
            }
            else{
                alert('Contraseña incorrecta');
                break;
            }
        }
        if(i == cuentas.length - 1){
            alert('Usuario no encontrado');
        }
    }
}

