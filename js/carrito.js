mostrarCarrito();

function mostrarCarrito(){
    const carritoHTML = document.querySelector(".carrito");
    console.log(carritoHTML);
    carrito = JSON.parse(localStorage.getItem("carrito"));
    for (let i = 0; i <= carrito.length-1; i++){
        if (carrito[i].cantidad > 0){
            carritoHTML.innerHTML += 
            `
            <div class="producto">
                            <img loading="lazy" src="../${carrito[i].imagenes[0]}" class="card-img-top" alt="Imagen producto">
                            <div class="card-body">
                                <h3 class="card-tittle">${carrito[i].nombre + " " + carrito[i].marca}</h3>
                                <div class= "modificarCantidades">
                                    <button class="btn btn-danger">Eliminar</button>
                                    <input type="number" class="cantidad" id="${i}" min="1" max="999" value="${carrito[i].cantidad}">
                                </div>
                                <div class="preciosFinales">
                                    <p class="card-text" id="precioIndividual">Precio Unitario: <span>$ ${carrito[i].precio}</span></p>
                                    <p class="card-text" id="total">Precio Total: <span>$${carrito[i].precio * carrito[i].cantidad}</span></p>
                                </div>
                            </div>
                    </div>`;

    }
    
}
let cantidadPorProducto = document.querySelectorAll(".cantidad");
}
cantidadPorProducto.onchange = () =>{
    
}
addEventListener("o", );
