# Informe tecnico - DiegusFashion

Fecha de revision local: 24 de abril de 2026  
Ruta del proyecto: `E:\todo\Proyectos\DiegusFashion`  
URL local levantada: `http://127.0.0.1:8000/`  
Panel administrador: `http://127.0.0.1:8000/admin.html`

## 1. Resumen ejecutivo

DiegusFashion es una tienda online tipo catalogo para una marca de chaquetas llamada **Diegu's Fashion**, orientada a ventas por mayor y detal en Ciudad Demo, especificamente asociada al sector de Sector Demo / Centro Comercial Demo.

El proyecto no usa un backend tradicional propio. Esta construido como un sitio web estatico con HTML, CSS y JavaScript, conectado a Firebase para datos dinamicos, autenticacion del administrador y actualizacion en tiempo real. El cliente ve el catalogo publico en `index.html`, mientras que el propietario administra productos, categorias y datos comerciales desde `admin.html`.

La compra no se finaliza dentro de una pasarela de pagos integrada. El flujo principal consiste en que el cliente selecciona producto, talla, color, cantidad y metodo de pago, y luego el sistema arma un mensaje para WhatsApp. El negocio termina la venta por conversacion directa.

## 2. Estado local

El proyecto fue levantado localmente con un servidor estatico de Python:

```powershell
py -3.13 -m http.server 8000 --bind 127.0.0.1
```

El proceso activo escucha en `127.0.0.1:8000` con PID `11040`.

Para detenerlo:

```powershell
Stop-Process -Id 11040
```

La URL principal responde correctamente:

```text
http://127.0.0.1:8000/
```

El titulo detectado del sitio es:

```text
Diegu's Fashion - Chaquetas por Mayor y Detal en Ciudad Demo
```

## 3. Proposito del sistema

El sistema resuelve estas necesidades:

- Mostrar un catalogo publico de chaquetas.
- Filtrar productos por categorias.
- Ver detalle de cada producto con imagenes, tallas, colores y precio.
- Recibir pedidos por WhatsApp.
- Permitir pagos por Nequi, cuenta bancaria o contra entrega.
- Permitir que el administrador actualice productos sin editar codigo.
- Centralizar configuracion de contacto, redes sociales y datos de pago.
- Reflejar cambios en la pagina publica en tiempo real usando Firebase Firestore.

## 4. Arquitectura general

La arquitectura esta dividida en tres capas:

### 4.1 Pagina publica

Archivo principal:

```text
index.html
```

Logica:

```text
js/main.js
```

Estilos:

```text
css/styles.css
```

Responsabilidad:

- Presentar marca, banner, categorias y productos.
- Leer productos, categorias y configuracion desde Firestore.
- Renderizar la interfaz dinamicamente.
- Mostrar detalle de producto en un panel lateral.
- Construir y abrir mensajes de pedido en WhatsApp.
- Actualizar contacto y redes sociales segun la configuracion guardada.

### 4.2 Panel administrativo

Archivo principal:

```text
admin.html
```

Logica:

```text
js/admin.js
```

Estilos:

```text
css/admin.css
```

Responsabilidad:

- Autenticar al administrador con Firebase Authentication.
- Listar, crear, editar y eliminar productos.
- Listar, crear, editar y eliminar categorias.
- Guardar datos de contacto, pago, redes y direccion.
- Cargar datos iniciales al proyecto Firebase.
- Actualizar descripciones, colores y categorias existentes.
- Mostrar vistas previas antes de guardar productos.

### 4.3 Firebase

Configuracion:

```text
firebase-config.js
```

Reglas:

```text
firestore.rules
```

Responsabilidad:

- Firestore guarda productos, categorias y configuracion del negocio.
- Firebase Authentication protege el acceso al panel administrativo.
- Las lecturas son publicas para que el catalogo cargue.
- Las escrituras estan restringidas al UID administrador definido en reglas.

## 5. Estructura de archivos

```text
DiegusFashion/
|-- index.html
|-- admin.html
|-- firebase-config.js
|-- firestore.rules
|-- .htaccess
|-- .gitignore
|-- VERSION-ACTUAL.txt
|-- FUNCIONAMIENTO.txt
|-- SUBIR-A-CPANEL.txt
|-- DiegusFashion-HOSTING.zip
|-- colored-logo.png
|-- transparent-logo.png
|-- transparent-logo.svg
|
|-- css/
|   |-- styles.css
|   |-- admin.css
|
|-- js/
|   |-- main.js
|   |-- admin.js
|
|-- img/
|   |-- logo.png
|   |-- banner.png
|   |-- fotos de productos
```

## 6. Tecnologias usadas

### Frontend

- HTML5.
- CSS3 con variables, media queries y estilos responsive.
- JavaScript vanilla, sin React, Vue, Angular ni build step.
- Bootstrap 5.3 desde CDN.
- Font Awesome 6.4 desde CDN.
- Google Fonts, familia Poppins.

### Datos y autenticacion

- Firebase Firestore para base de datos en la nube.
- Firebase Authentication para login del administrador.
- SDK Firebase compat v10.7.0 desde CDN.

### Hosting previsto

- Apache/cPanel.
- Archivo `.htaccess` para reglas de seguridad, compresion, cache y 404.
- Archivo ZIP `DiegusFashion-HOSTING.zip` preparado para subir a hosting.

## 7. Modelo de datos en Firestore

### Coleccion `productos`

Campos esperados:

- `nombre`: nombre comercial del producto.
- `precio`: precio numerico.
- `tallas`: tallas separadas por coma.
- `colores`: colores separados por coma.
- `descripcion`: descripcion visible en detalle.
- `categoria`: slug de categoria.
- `imagenes`: arreglo de URLs o rutas locales.
- `orden`: posicion en el catalogo.
- `creado`: timestamp de creacion.
- `actualizado`: timestamp de ultima modificacion.

### Coleccion `categorias`

Campos esperados:

- `nombre`: nombre visible.
- `slug`: identificador sin espacios.
- `icono`: clase Font Awesome.
- `orden`: posicion en la barra.
- `creado`: timestamp.
- `actualizado`: timestamp.

### Coleccion `config`

Documento principal:

```text
config/negocio
```

Campos esperados:

- `whatsapp`
- `whatsapp2`
- `nequi`
- `cuenta`
- `email`
- `instagram`
- `facebook`
- `direccion`

## 8. Funcionamiento de la pagina publica

Al abrir `index.html`, el navegador carga:

- Bootstrap.
- Font Awesome.
- CSS propio.
- Firebase.
- `firebase-config.js`.
- `js/main.js`.

`main.js` inicializa listeners sobre Firestore:

- `config/negocio` con `onSnapshot`.
- `categorias` ordenadas por `orden`.
- `productos` ordenados por `orden`.

Cuando Firebase devuelve datos, el sitio renderiza:

- Barra de categorias.
- Grid de productos.
- Tarjetas del catalogo.
- Informacion de contacto.
- WhatsApp flotante.
- Footer.

El detalle de producto funciona con un drawer lateral. Alli se seleccionan:

- Color.
- Talla.
- Cantidad.
- Metodo de pago.
- Datos de entrega si aplica.
- Comprobante si aplica.

Luego se genera un enlace:

```text
https://wa.me/{numero}?text={mensaje}
```

Ese enlace abre WhatsApp con el pedido ya armado.

## 9. Funcionamiento del administrador

Al abrir `admin.html`, el sistema muestra una pantalla de login. La autenticacion se realiza con Firebase Authentication usando email y contrasena.

Cuando el usuario inicia sesion, `admin.js` muestra el panel y carga:

- Productos desde Firestore.
- Categorias desde Firestore.
- Configuracion del negocio en tiempo real.

El panel tiene tres secciones principales:

- Productos.
- Categorias.
- Configuracion.

En productos permite:

- Agregar producto.
- Editar producto.
- Eliminar producto.
- Ver vista previa antes de guardar.
- Cargar datos iniciales.
- Actualizar productos existentes con informacion mejorada.

En categorias permite:

- Crear categoria.
- Editar categoria.
- Eliminar categoria.
- Sincronizar categorias base.
- Configurar nombre, slug, icono y orden.

En configuracion permite actualizar:

- Numero Nequi.
- Cuenta bancaria.
- WhatsApp principal.
- WhatsApp secundario.
- Email.
- Instagram.
- Facebook.
- Direccion.

## 10. Productos y categorias actuales documentados

Segun `VERSION-ACTUAL.txt`, el catalogo inicial contiene 8 productos:

1. Chaqueta Americana Negra, $117.000.
2. Chaqueta Beisbolera Roja, $95.000.
3. Parka Impermeable Azul, $135.000.
4. Chaqueta Unicolor Gris, $89.000.
5. Chaqueta Combinada Negro/Blanco, $110.000.
6. Chaqueta Lenadora Cafe, $105.000.
7. Chaqueta Americana Cafe, $120.000.
8. Chaqueta Beisbolera Azul, $98.000.

Categorias documentadas:

1. Americana.
2. Beisbolera.
3. Parka.
4. Unicolor.
5. Combinada.
6. Lenadora.

## 11. Seguridad implementada

### Firestore

El archivo `firestore.rules` define:

- Lectura publica para productos, categorias y configuracion.
- Escritura solo para el UID administrador definido.
- Bloqueo total para cualquier otra coleccion o documento.

Esto permite que el catalogo funcione publicamente, pero evita que usuarios anonimos modifiquen informacion.

### Admin

El panel depende de Firebase Authentication. Solo un usuario autenticado y permitido por reglas puede escribir en Firestore.

### Servidor Apache

`.htaccess` incluye:

- Bloqueo a archivos `.env`, `.gitignore`, `.md`, `.txt`, `.json`.
- Headers de seguridad.
- Compresion GZIP.
- Cache para CSS, JS e imagenes.
- 404 redirigido a `index.html`.

## 12. Observaciones tecnicas importantes

- Es un proyecto estatico: no hay `package.json`, no hay servidor Node propio, no hay API backend local.
- No requiere compilacion ni instalacion de dependencias para funcionar como sitio estatico.
- Depende de internet para cargar CDNs y Firebase.
- Si Firebase no esta disponible, el catalogo dinamico no podra actualizarse desde la nube.
- La clave `apiKey` de Firebase esta en frontend. Esto es normal en Firebase Web, pero la seguridad real debe estar en las reglas de Firestore.
- El archivo `.htaccess` intenta restringir archivos sensibles, pero esto solo aplica en Apache/cPanel, no en el servidor local de Python.
- La proteccion por referer para `firebase-config.js` no debe considerarse una medida fuerte de seguridad.
- El login administrativo no esta en un backend propio, depende completamente de Firebase Authentication.

## 13. Despliegue previsto

El proyecto incluye una guia `SUBIR-A-CPANEL.txt`. El flujo previsto es:

1. Subir `DiegusFashion-HOSTING.zip` a `public_html`.
2. Extraer el ZIP.
3. Verificar que `index.html`, `admin.html`, carpetas `css`, `js` e `img` queden directamente en `public_html`.
4. Eliminar el ZIP del servidor.
5. Publicar las reglas de Firestore en Firebase Console.
6. Probar pagina publica y panel admin.
7. Configurar datos reales desde el panel.

## 14. Fortalezas del proyecto

- Arquitectura simple y facil de hospedar.
- No requiere servidor backend propio.
- Panel administrativo incluido.
- Actualizacion en tiempo real con Firestore.
- Flujo de compra practico por WhatsApp.
- Buen soporte para catalogo movil.
- Documentacion interna existente.
- ZIP listo para hosting.
- Reglas de Firestore preparadas.

## 15. Riesgos y mejoras recomendadas

1. Revisar que las reglas de Firestore esten publicadas en Firebase Console.
2. Confirmar que el UID administrador corresponda al usuario real actual.
3. Comprimir `logo.png` y otras imagenes pesadas para mejorar carga.
4. Reemplazar imagenes placeholder por fotos finales de producto.
5. Validar el sitio en celular real.
6. Agregar dominio definitivo en configuraciones y `.htaccess`.
7. Configurar SSL/HTTPS en hosting.
8. Revisar acentos y codificacion UTF-8, porque algunos archivos muestran caracteres mal codificados al leerse desde terminal.
9. Evitar confiar en la regla de referer para proteger `firebase-config.js`.
10. Si el negocio crece, considerar un backend para pedidos, inventario y trazabilidad.

## 16. Conclusion

DiegusFashion es una tienda online estatica con administracion en Firebase. Esta bien orientada para un negocio pequeno o mediano que necesita publicar un catalogo, actualizar productos facilmente y cerrar ventas por WhatsApp sin mantener infraestructura backend.

El proyecto esta listo para pruebas locales y tiene una ruta clara de despliegue a cPanel. La parte mas critica para produccion es asegurar que Firebase Authentication y las reglas de Firestore esten correctamente configuradas, porque ahi se concentra la seguridad real del sistema.

