document.addEventListener("DOMContentLoaded", function() {
    // Stock de productos, con su precio unitario
    const productos = [
        { id: 1, nombre: "Producto 1", precio: 10, cantidad: 5 },
        { id: 2, nombre: "Producto 2", precio: 20, cantidad: 3 },
        { id: 3, nombre: "Producto 3", precio: 15, cantidad: 8 }
    ];

    // Mostrar lista de productos y permitir al usuario seleccionar una opción
    function mostrarListaProductos() {
        let mensaje = "Selecciona un producto:\n";
        productos.forEach(producto => {
            mensaje += `${producto.id}. ${producto.nombre} - Stock: ${producto.cantidad}\n`;
        });
        // Como esta opción no es un producto, la pongo acá
        mensaje += "0. Finalizar compra";

        // Se solicita al usuario que seleccione un producto ingresando el número correspondiente
        let seleccion = parseInt(prompt(mensaje));
        // Verifica si la selección es válida (un número entre 0 y la cantidad de productos en stock)
        while (isNaN(seleccion) || seleccion < 0 || seleccion > productos.length) {
            // Si la selección no es válida, vuelve a solicitar al usuario que ingrese un número válido
            seleccion = parseInt(prompt("Opción inválida. Por favor selecciona un número válido."));
        }

        return seleccion; // Devuelve el número del producto seleccionado
    }

    // Para que el código se dispare al hacer click en el botón del html
    document.getElementById("btn-iniciar-compra").addEventListener("click", function() {
        let seleccionados = []; // Almacena los productos seleccionados por el usuario

        // Bucle para que el usuario seleccione productos hasta que finalice la compra
        while (true) {
            let seleccion = mostrarListaProductos(); // Muestra la lista de productos y captura la selección del usuario
            if (seleccion === 0) break; // Si el usuario elige finalizar la compra se sale del bucle

            // Solicita al usuario que ingrese la cantidad deseada del producto seleccionado
            let cantidad = parseInt(prompt(`¿Cuántos ${productos[seleccion - 1].nombre} deseas comprar?`));
            // Verifica si la cantidad ingresada es válida (un número entre 0 y la cantidad en stock)
            while (isNaN(cantidad) || cantidad < 0 || cantidad > productos[seleccion - 1].cantidad) {
                // Si la cantidad no es válida, solicita al usuario que ingrese una cantidad válida
                cantidad = parseInt(prompt(`Cantidad inválida. Ingresa una cantidad entre 0 y ${productos[seleccion - 1].cantidad}.`));
            }
            if (cantidad === 0) continue; // Si el usuario ingresa 0, vuelve al inicio del bucle sin agregar el producto seleccionado

            // Agrega el producto seleccionado y la cantidad al array de productos seleccionados.
            seleccionados.push({ producto: productos[seleccion - 1], cantidad: cantidad });
            // Actualiza el stock del producto seleccionado.
            productos[seleccion - 1].cantidad -= cantidad;
        }

        let detalleCompra = "Detalle de la compra:\n";
        let costoTotal = 0;

        // Calcula detalle de la compra y calcula el costo total
        seleccionados.forEach(item => {
            const precioTotalProducto = item.producto.precio * item.cantidad;
            detalleCompra += `${item.producto.nombre} x ${item.cantidad}: $${item.producto.precio} (Precio unitario) - $${precioTotalProducto} (Precio total)\n`;
            costoTotal += precioTotalProducto;
        });

        // Muestra un alert con el detalle de la compra y el costo total
        alert(`${detalleCompra}\nCosto total de tu compra: $${costoTotal}`);
    });
});
