//Se declaran los productos
//Filtro de productos
//Tarjetas de productos
//Carrito de compras

//Declaración de objeto "productos" como constante para evitar que se modifique la estructura del mismo 
const productos = [];
let carrito = [];

let iva = 0.21;
let costoEnvio = 2500;

console.log(productos)

//Método fetch para cargar los productos desde un archivo .json
fetch('js/productos.json')
.then(response => response.json())
.then(data => {
    data.forEach(producto =>{
        productos.push(producto);
    })
console.log(productos);
});

class Producto {
    constructor(titulo, modelo, categoria, subcategorias, marca, precio, stock, descripcion, cantImagenes) {
        this.titulo = titulo;
        this.modelo = modelo;
        this.categoria = categoria;
        this.precio = parseInt(precio);
        this.marca = marca;
        this.descripcion = descripcion;
        this.stock = parseInt(stock);
        this.cantImagenes = parseInt(cantImagenes); //cantidad de imagenes que tiene el producto
        
        //arrays que se pasan como parámetros
        this.subcategorias = subcategorias; //array de subcategorias
        this.imagenes = []; //array de imagenes (va a contener la ubicación de las imagenes)
    }
    asignarUbicacionImagenes(categoria, id, cantImagenes, imagenes){
        /*la primera imagen del array imágenes va a ser tomada como la portada del producto
        Las imágenes del producto se cargarán en una carpeta con el mismo id del objeto (assets/img/"tipo"/"categoria"/"id-nimg".webp)
        */
        for(let x = 0; x < cantImagenes; x++) {
            imagenes.push(`assets/img/productos/${categoria}/${id}-${x}.webp`);
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

    console.log(productos)

//Productos con precios y cantidad

function agregarProducto(id){
    console.log(productos)
    carrito = JSON.parse(localStorage.getItem("carrito"));
    alertify.prompt('Agregar producto','Ingrese la cantidad del producto que desea agregar','', function(evt, cantidad) {
        let encontrado = false;
        id = parseInt(id);
        if (isNaN(cantidad)){
            alertify.error("Ingrese un número");
        }else{
            cantidad = parseInt(cantidad);
            if (cantidad > 0){
                productos.forEach(producto => {
                    console.log(producto)
                    if (id > productos.length){
                        //verifica si el producto existe en el array de productos
                        alertify.error("El producto no existe");
                    }
                    else if (producto.id === id){
                        if (producto.stock >= cantidad){ //si el stock del producto es mayor o igual a la cantidad ingresada
                            if(carrito == null){
                                carrito = [];
                                carrito.push({
                                    id: id,
                                    titulo: producto.titulo,
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
                                alertify.success("Producto agregado al carrito");
                                encontrado = true;
                            }
                            else if (carrito.length == 0){ //si el carrito está vacío
                                carrito.push({
                                    id: id,
                                    titulo: producto.titulo,
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
                                alertify.success("Producto agregado al carrito");
                                encontrado = true;
                            }
                            else{
                                carrito.forEach(elemento => {
                                    if(elemento.id === id){ //si el producto ya existe en el carrito
                                        elemento.cantidad += cantidad;
                                        productos[id].stock -= cantidad;
                                        encontrado = true;
                                        alertify.success("Producto agregado al carrito");
                                        localStorage.setItem("carrito", JSON.stringify(carrito));
                                    }
                                })
                                
                            }
                            if (!encontrado){
                                carrito.push({
                                    id: id,
                                    titulo: producto.titulo,
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
                                alertify.success("Producto agregado al carrito");
                                encontrado = true;
                            }
                            
                        }
                        else{
                            alertify.error("No hay suficiente stock");
                        }
                    }
                
                    console.log(carrito)
                })
                
                
            }
            else{
                alertify.error("Ingrese una cantidad válida");
            }
        
        }
    }
    , function() { alertify.error('Cancelado') });
    
}

//Asignando función a los botones
let agregarCarrito = document.querySelectorAll(".agregarCarrito");

agregarCarrito.forEach(function(producto){
    producto.addEventListener("click", () => {
    let id = parseInt(producto.getAttribute("id"));
    agregarProducto(id);
})});

