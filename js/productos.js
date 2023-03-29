//Se declaran los productos
//Filtro de productos
//Tarjetas de productos
//Carrito de compras

//Declaración de objeto "productos" como constante para evitar que se modifique la estructura del mismo 
const productos = [];
let carrito = [];

let iva = 0.21;
let costoEnvio = 2500;

class Producto {
    constructor(nombre, tipo, categoria, marca, precio, stock, descripcion, cantImagenes) {
        this.nombre = nombre;
        this.tipo = tipo //0 = Producto /1 = Servicio
        this.categoria = categoria;
        this.precio = parseInt(precio);
        this.marca = marca;
        this.descripcion = descripcion;
        this.stock = parseInt(stock);
        this.cantImagenes = parseInt(cantImagenes); //cantidad de imagenes que tiene el producto

        //arrays que se pasan como parámetros
        this.imagenes = []; //array de imagenes (va a contener la ubicación de las imagenes)
        
        // this.id = parseInt(id); //Si no se ingresa un id, se genera uno en base al largo del array
    }
    
    asignarUbicacionImagenes(tipo, categoria, id, cantImagenes, imagenes){
        /*la primera imagen del array imágenes va a ser tomada como la portada del producto
        Las imágenes del producto se cargarán en una carpeta con el mismo id del objeto (assets/img/"tipo"/"categoria"/"id-nimg".webp)
        */
        for(let x = 0; x < cantImagenes; x++) {
            let sp;
            if(tipo === 0){
                sp = "productos"
            }
            else if(tipo === 1){
                sp = "servicios"
            }
            imagenes.push(`assets/img/${sp}/${categoria}/${id}-${x}.webp`);
        }
        
    }

    //src="../assets/img/0/Auriculares/0-0.webp"

    //Asignar el id de forma autoincremental
    asignarId(array) {
        this.id = array.length;
    }
    //Cambiar el precio después de creado el objeto
    asignarPrecio(precio) {
        this.precio = precio;
    }
    
    //Cambiar el stock después de creado el objeto
    reposicionStock(stock) {
        this.stock += stock;
    }
    venta(stock) {
        this.stock -= stock;
    }
};


    let a = new Producto("Zeus", 0, "Auriculares", "Redragon", 5800, 430,  "", 3);
    a.asignarId(productos); 
    a.asignarUbicacionImagenes(a.tipo, a.categoria, a.id, a.cantImagenes, a.imagenes);
    productos.push(a);

    let b = new Producto("Pendrive 8Gb", 0, "Almacenamiento externo", "Sandisk", 2500, 573, "", 3);
    b.asignarId(productos); 
    b.asignarUbicacionImagenes(b.tipo, b.categoria, b.id, b.cantImagenes, b.imagenes);
    productos.push(b);

    let c = new Producto("Silla Gamer", 0, "Sillas", "Corsair", 65000, 254, "", 3);
    c.asignarId(productos);
    c.asignarUbicacionImagenes(c.tipo, c.categoria, c.id, c.cantImagenes, c.imagenes);
    productos.push(c);

    let d = new Producto("Geforce RTX 3080", 0, "Placas de video", "Gigabyte Aorus", 89500, 329, "", 3);
    d.asignarId(productos);
    d.asignarUbicacionImagenes(d.tipo, d.categoria, d.id, d.cantImagenes, d.imagenes);
    productos.push(d);

    let e = new Producto("Router Wr820N", 0, "Redes y conectividad", "Tp-Link", 4800, 49, "", 3);
    e.asignarId(productos);
    e.asignarUbicacionImagenes(e.tipo, e.categoria, e.id, e.cantImagenes, e.imagenes);
    productos.push(e);

    let f = new Producto("Mini Pc i3", 0, "Mini computadoras", "Intel", 65000, 17, "", 3);
    f.asignarId(productos);
    f.asignarUbicacionImagenes(f.tipo, f.categoria, f.id, f.cantImagenes, f.imagenes);
    productos.push(f);


function cargaProducto() {
    let nombre = prompt("Ingresa el nombre del producto");
    let precio = prompt("Ingresa el precio del producto");
    if (isNan(precio)){
        ("No ha ingresado un precio válido, ¿desea cargar nuevamente el producto?")
    }
    let categoria = prompt("Ingresa la categoria del producto");
    let marca = prompt("Ingresa la marca del producto");
    let descripcion = prompt("Ingresa la descripcion del producto");
    let stock = prompt("Ingresa el stock del producto");

    if (isNan(stock)){
        ("No ha ingresado un stock válido, ¿desea cargar nuevamente el producto?")
    }
    let producto = new Producto(nombre, precio, id, categoria, marca, descripcion, stock);
    productos.push(producto);

    let verificacion = confirm("¿Desea agregar otro producto? (S/N)");
    if (verificacion == true) {
        cargaProducto();
    }
}

//Productos con precios y cantidad

function agregarProducto(id){
    carrito = JSON.parse(localStorage.getItem("carrito"));
    
    let cantidad = prompt("Ingrese la cantidad del producto que desea agregar al carrito");
    let encontrado = false;
    id = parseInt(id);
    if (isNaN(cantidad)){
        alert("Ingrese un número");
    }else{
        cantidad = parseInt(cantidad);
        if (cantidad > 0){
            productos.forEach(producto => {
                if (id > productos.length){
                    //verifica si el producto existe en el array de productos
                    alert("El producto no existe");
                }
                ///////////////////////////////////////////////// el problema está por acá
                else if (producto.id === id){
                    if (producto.stock >= cantidad){ //si el stock del producto es mayor o igual a la cantidad ingresada
                        if(carrito == null){
                            carrito = [];
                            carrito.push({
                                id: id,
                                tipo: producto.tipo,
                                categoria: producto.categoria,
                                nombre: producto.nombre,
                                marca: producto.marca,
                                precio: producto.precio,
                                cantidad: cantidad,
                                descripcion: producto.descripcion,
                                stock: producto.stock,
                                imagenes: producto.imagenes
                                
                            });
                            localStorage.setItem("carrito", JSON.stringify(carrito));
                            producto.stock -= cantidad;  
                            alert("Producto agregado al carrito");
                            encontrado = true;
                        }
                        else if (carrito.length == 0){ //si el carrito está vacío
                            carrito.push({
                                id: id,
                                tipo: producto.tipo,
                                categoria: producto.categoria,
                                nombre: producto.nombre,
                                marca: producto.marca,
                                precio: producto.precio,
                                cantidad: cantidad,
                                descripcion: producto.descripcion,
                                stock: producto.stock,
                                imagenes: producto.imagenes
                                
                            });
                            localStorage.setItem("carrito", JSON.stringify(carrito));
                            producto.stock -= cantidad;  
                            alert("Producto agregado al carrito");
                            encontrado = true;
                        }
                        else{
                            carrito.forEach(elemento => {
                                if(elemento.id === id){ //si el producto ya existe en el carrito
                                    elemento.cantidad += cantidad;
                                    productos[id].stock -= cantidad;
                                    encontrado = true;
                                    alert("Producto agregado al carrito");
                                    localStorage.setItem("carrito", JSON.stringify(carrito));
                                }
                            })
                            
                        }
                        if (!encontrado){
                            carrito.push({
                                id: id,
                                tipo: producto.tipo,
                                categoria: producto.categoria,
                                nombre: producto.nombre,
                                marca: producto.marca,
                                precio: producto.precio,
                                cantidad: cantidad,
                                descripcion: producto.descripcion,
                                stock: producto.stock,
                                imagenes: producto.imagenes
                                
                            });
                            localStorage.setItem("carrito", JSON.stringify(carrito));
                            productos[id].stock -= cantidad;
                            alert("Producto agregado al carrito");
                            encontrado = true;
                        }
                        
                    }
                    else{
                        alert("No hay suficiente stock");
                    }
                }
            
                console.log(carrito)
            })
            
            
        }
        else{
            alert("Ingrese una cantidad válida");
        }
    
    }
    
}


function quitarProducto(){
    mostrarCarrito();
    let encontrado = false;
    let id = parseInt(prompt(`Ingrese el id del producto que desea quitar del carrito`));
    carrito.forEach(elemento => {
        if (elemento.id === id){
            encontrado = true;
}
});
    if (encontrado === false){
        alert(`No hay ningún producto con el id ${id} en el carrito`);
    }

    
    
    else{
        let cantidadQuitar = parseInt(prompt(`Ingrese la cantidad del producto que desea quitar del carrito`));
        for (let i = 0; i < carrito.length; i++) {
            if(carrito[i].id === id){
                encontrado = true;
                if(cantidadQuitar <= carrito[i].cantidad){
                    carrito[i].cantidad -= cantidadQuitar;
                    productos[id-1].stock += cantidadQuitar;
                }
                else if(carrito[i].cantidad == 0){
                    alert(`No hay más productos con el id ${carrito[i].cantidad} en el carrito`);
                }
                else if(cantidadQuitar > carrito[i].cantidad){
                    alert(`Trató de quitar ${cantidadQuitar} productos, hay ${carrito[i].cantidad} productos con el id ${carrito[i].id} en el carrito`);
                }
                }
                if(carrito[i].cantidad == 0){
                    carrito.splice(i, 1);
                }
                
    
        }
    }
    
    let verificacion = prompt(`¿Desea ver el carrito actualizado? (S/N)`);
    if(verificacion == 'S' || verificacion == 's'){
        mostrarCarrito();
    }
    let verificacion2 = prompt(`¿Desea quitar otro producto? (S/N)`);
    if(verificacion2 == 'S' || verificacion2 == 's'){
        quitarProducto();
    }

};

let agregarCarrito = document.querySelectorAll(".agregarCarrito");

agregarCarrito.forEach(function(producto){
    producto.addEventListener("click", () => {
    let id = parseInt(producto.getAttribute("id"));
    agregarProducto(id);
})});