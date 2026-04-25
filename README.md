# Diegu's Fashion

Tienda online administrable para venta de chaquetas por mayor y detal. El proyecto resuelve dos frentes: una experiencia publica enfocada en catalogo y conversion por WhatsApp, y un panel administrativo para gestionar productos, categorias y datos comerciales sin editar codigo.

## Resumen para portafolio

Aplicacion web estatica conectada a Firebase para administrar un catalogo comercial en tiempo real. Incluye storefront responsive, panel admin, CRUD de productos y categorias, configuracion del negocio, flujo de pedido por WhatsApp y despliegue simple en hosting tradicional.

## Alcance funcional

- Catalogo publico con categorias, vista rapida, tallas, colores, precios e imagenes.
- Generacion de pedidos por WhatsApp con datos del producto y metodo de pago.
- Panel administrativo protegido con Firebase Authentication.
- Administracion de productos, categorias y configuracion comercial.
- Persistencia en Firebase Firestore con actualizacion en tiempo real.
- Estructura preparada para publicar en cPanel/Apache.

## Arquitectura

- `index.html`: tienda publica servida como sitio estatico.
- `admin.html`: panel administrativo desacoplado de la vista publica.
- `js/main.js`: logica del catalogo, renderizado y flujo de pedido.
- `js/admin.js`: autenticacion y operaciones CRUD del panel.
- `firebase-config.js`: inicializacion de Firebase.
- `firestore.rules`: reglas de acceso para lectura publica y escritura de administrador.

## Stack tecnico

- HTML5
- CSS3
- JavaScript vanilla
- Bootstrap 5
- Font Awesome
- Firebase Authentication
- Firebase Firestore
- Apache/cPanel

## Ejecucion local

```powershell
cd E:\todo\Proyectos\DiegusFashion
py -3.13 -m http.server 8000 --bind 127.0.0.1
```

URLs locales:

- Publico: `http://127.0.0.1:8000/`
- Admin: `http://127.0.0.1:8000/admin.html`

## Despliegue

El proyecto esta pensado para despliegue estatico en `public_html`. El repositorio incluye:

- `DiegusFashion-HOSTING.zip`
- `.htaccess`
- `SUBIR-A-CPANEL.txt`
- `INFORME-TECNICO-DIEGUSFASHION.md`

## Publicacion

URL publica esperada:
`https://andresito202.github.io/DiegusFashion/`

Pasos de despliegue:
- `Settings -> Pages -> Deploy from branch -> main -> /(root)`

Notas:
- Si mantienes la rama historica `master`, GitHub Pages tambien puede publicarse desde `master -> /(root)`.
- `admin.html` queda disponible por URL directa, pero no se expone como enlace principal del catalogo.
- `firebase-config.js` contiene configuracion publica de cliente. La seguridad real depende de Authentication y reglas de Firestore, no de ocultar ese archivo.

## Estructura principal

```text
DiegusFashion/
|-- index.html
|-- admin.html
|-- firebase-config.js
|-- firestore.rules
|-- .htaccess
|-- README.md
|-- INFORME-TECNICO-DIEGUSFASHION.md
|-- FUNCIONAMIENTO.txt
|-- VERSION-ACTUAL.txt
|-- SUBIR-A-CPANEL.txt
|-- DiegusFashion-HOSTING.zip
|-- css/
|-- js/
|-- img/
```

## Enfoque de ingenieria

- Separacion clara entre experiencia publica y administracion.
- Modelo de datos simple y operativo para negocio pequeno o mediano.
- Dependencias reducidas para facilitar mantenimiento y despliegue.
- Documentacion operativa incluida dentro del repositorio.
