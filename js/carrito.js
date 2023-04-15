mostrarCarrito();

function mostrarCarrito(){
    const carritoHTML = document.querySelector(".carrito");
    console.log(carritoHTML);
    carrito = JSON.parse(localStorage.getItem("carrito"));
    carritoHTML.innerHTML = "";
    for (let i = 0; i <= carrito.length-1; i++){
        if (carrito[i].cantidad > 0){
            carritoHTML.innerHTML += 
            `
            <div class="producto" id=${i}>
                            <img loading="lazy" src="../${carrito[i].imagenes[0]}" class="card-img-top" alt="Imagen producto">
                            <div class="card-body">
                                <h3 class="card-tittle">${carrito[i].titulo}</h3>
                                <div class= "modificarCantidades">
                                    <button class="btn btn-danger eliminar">Eliminar</button>
                                    <input type="number" class="cantidad" id="${i}" min="0" max="999" value="${carrito[i].cantidad}">
                                </div>
                                <div class="preciosFinales">
                                    <p class="card-text" id="precioIndividual">Precio Unitario: <span>$ ${carrito[i].precio}</span></p>
                                    <p class="card-text" id="total">Precio Total: <span>$${carrito[i].precio * carrito[i].cantidad}</span></p>
                                </div>
                            </div>
                    </div>`;

        }
    
    }

    let selectorCantidadProducto = document.querySelectorAll(".cantidad");
    let eliminar = document.querySelectorAll(".eliminar");

    for(let i = 0; i <= selectorCantidadProducto.length-1; i++){
        selectorCantidadProducto[i].addEventListener("change", () =>{
            carrito[i].cantidad = selectorCantidadProducto[i].value;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        })
        eliminar[i].addEventListener("click", () =>{
            carrito.splice(i,1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
        })
    }

}

let confirmarCompra = document.getElementById("confirmarCompra");

confirmarCompra.addEventListener("click", () =>{
    alertify.success("Compra exitosa!");
    carrito = "";
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
}) 