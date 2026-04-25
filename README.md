# Diegu's Fashion - Tienda online de chaquetas por mayor y detal

Diegu's Fashion es una tienda online tipo catalogo para venta de chaquetas por mayor y detal. El proyecto combina una pagina publica responsive, un panel administrativo protegido, gestion dinamica de productos y categorias, configuracion comercial editable y generacion de pedidos por WhatsApp.

## Descripcion para portafolio

Aplicacion web estatica conectada a Firebase para administrar un catalogo comercial en tiempo real. Incluye tienda publica, panel de administracion, CRUD de productos y categorias, configuracion de contacto/pagos, flujo de pedido por WhatsApp, estructura lista para hosting en cPanel y documentacion tecnica del proyecto.

## URL local

```text
http://127.0.0.1:8000/
```

Panel administrativo:

```text
http://127.0.0.1:8000/admin.html
```

## Como levantar en local

Desde la carpeta del proyecto:

```powershell
cd E:\todo\Proyectos\DiegusFashion
py -3.13 -m http.server 8000 --bind 127.0.0.1
```

No requiere instalacion de dependencias para ejecutarse localmente como sitio estatico.

## Caracteristicas principales

- Catalogo publico de productos.
- Categorias dinamicas.
- Vista rapida de producto con imagenes, precio, descripcion, tallas y colores.
- Seleccion de cantidad y metodo de pago.
- Pedido por WhatsApp.
- Panel de administracion protegido con Firebase Authentication.
- Administracion de productos.
- Administracion de categorias.
- Configuracion de WhatsApp, Nequi, cuenta bancaria, email, redes y direccion.
- Datos en tiempo real con Firebase Firestore.
- Archivos preparados para despliegue en cPanel/Apache.

## Valor del proyecto

- Centraliza la gestion de catalogo sin depender de un backend propio.
- Permite actualizar productos y categorias desde un panel visual.
- Reduce friccion de compra al generar pedidos directos por WhatsApp.
- Esta preparado para despliegue rapido en hosting tradicional.
- Incluye documentacion tecnica, guia de funcionamiento y paquete comprimido para produccion.

## Estructura principal

```text
DiegusFashion/
|-- index.html                         Pagina publica
|-- admin.html                         Panel administrativo
|-- firebase-config.js                 Conexion a Firebase
|-- firestore.rules                    Reglas de seguridad Firestore
|-- .htaccess                          Configuracion Apache/cPanel
|-- README.md                          Resumen del proyecto
|-- INFORME-TECNICO-DIEGUSFASHION.md   Informe tecnico detallado
|-- VERSION-ACTUAL.txt                 Documento de version
|-- FUNCIONAMIENTO.txt                 Manual funcional
|-- SUBIR-A-CPANEL.txt                 Guia de despliegue
|-- DiegusFashion-HOSTING.zip          Paquete listo para hosting
|
|-- css/
|   |-- styles.css                     Estilos de la tienda
|   |-- admin.css                      Estilos del panel
|
|-- js/
|   |-- main.js                        Logica publica
|   |-- admin.js                       Logica administrativa
|
|-- img/
|   |-- logo.png
|   |-- banner.png
|   |-- fotos de productos
```

## Tecnologias

- HTML5
- CSS3
- JavaScript vanilla
- Bootstrap 5.3
- Font Awesome 6.4
- Google Fonts
- Firebase Firestore
- Firebase Authentication
- Apache/cPanel mediante `.htaccess`

## Firebase

Proyecto configurado:

```text
diegusfashion-98961
```

Colecciones esperadas:

- `productos`
- `categorias`
- `config/negocio`

Las reglas de `firestore.rules` permiten lectura publica para el catalogo y escritura solo para el UID administrador configurado.

## Flujo de compra

1. El cliente abre el catalogo.
2. Filtra por categoria o revisa productos.
3. Abre la vista rapida.
4. Selecciona color, talla, cantidad y metodo de pago.
5. El sistema genera un mensaje de pedido.
6. Se abre WhatsApp con el mensaje listo para enviar.

## Despliegue

El proyecto esta pensado para subirse como sitio estatico a `public_html` en cPanel.

Pasos resumidos:

1. Subir `DiegusFashion-HOSTING.zip`.
2. Extraer directamente en `public_html`.
3. Verificar que `index.html` quede en la raiz.
4. Publicar `firestore.rules` en Firebase Console.
5. Probar la pagina publica y `admin.html`.
6. Configurar datos reales desde el panel.

Ver detalles en:

```text
SUBIR-A-CPANEL.txt
```

## Documentacion

El informe tecnico completo esta en:

```text
INFORME-TECNICO-DIEGUSFASHION.md
```

Tambien se incluyen:

- `FUNCIONAMIENTO.txt`
- `VERSION-ACTUAL.txt`
- `SUBIR-A-CPANEL.txt`


