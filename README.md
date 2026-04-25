# Diegu's Fashion - Tienda online de chaquetas por mayor y detal

Sitio web tipo catalogo para Diegu's Fashion, una tienda de chaquetas por mayor y detal en Ciudad Demo. El proyecto incluye pagina publica, panel administrativo, catalogo dinamico, configuracion del negocio y pedidos por WhatsApp.

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

## Que incluye

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
demo-proyecto
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


