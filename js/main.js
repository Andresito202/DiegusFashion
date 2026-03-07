/* ============================================
   Diegu's Fashion - JavaScript
   ============================================ */
(function () {
    'use strict';

    // Escape para cerrar drawer
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && window.cerrarDrawer) { window.cerrarDrawer(); }
    });

    // --- Datos del negocio (se actualizan desde Firebase si está configurado) ---
    var CONFIG = {
        whatsapp: '573137439870',
        nequi: '300 123 4567',
        cuenta: 'Bancolombia - Ahorros 123-456789-00'
    };

    // --- Catálogo (se actualiza desde Firebase si está configurado) ---
    var CATALOGO = {
        'Chaqueta Americana Negra': { precio: 117000, tallas: 'S,M,L,XL', colores: 'Negro,Negro Mate', descripcion: 'Chaqueta tipo biker en cuero sintético negro con cierre diagonal, solapas con broches metálicos y múltiples cremalleras decorativas. Forro interior suave. Estilo rockero y urbano.', categoria: 'americana' },
        'Chaqueta Beisbolera Roja': { precio: 95000, tallas: 'S,M,L,XL', colores: 'Gris,Gris Jaspe,Negro', descripcion: 'Hoodie deportivo con capucha ajustable y bolsillo canguro frontal. Tela algodón french terry suave y cálida. Corte holgado ideal para el día a día y clima fresco.', categoria: 'beisbolera' },
        'Parka Impermeable Azul': { precio: 135000, tallas: 'S,M,L,XL', colores: 'Azul Claro,Azul Medio,Celeste', descripcion: 'Chaqueta de jean desteñida en tono azul claro con botones metálicos cobrizos, bolsillos de parche al pecho y detalle de pin decorativo. Tela denim 100% algodón. Look casual y fresco.', categoria: 'parka' },
        'Chaqueta Unicolor Gris': { precio: 89000, tallas: 'S,M,L,XL,XXL', colores: 'Azul Oscuro,Negro,Gris Oxford', descripcion: 'Blazer formal de corte entallado en azul marino oscuro con solapas de muesca. Tela premium con caída elegante. Ideal para oficina, reuniones y ocasiones especiales. Combina con camisa y corbata.', categoria: 'unicolor' },
        'Chaqueta Combinada Negro/Blanco': { precio: 110000, tallas: 'S,M,L,XL', colores: 'Negro,Negro/Plateado', descripcion: 'Chaqueta biker de cuero con textura natural, cierre diagonal cromado y solapas con broches a presión. Múltiples bolsillos con cremallera. Estilo rebelde y moderno con acabado semi-brillante.', categoria: 'combinada' },
        'Chaqueta Leñadora Café': { precio: 105000, tallas: 'M,L,XL', colores: 'Azul Claro,Azul Desteñido', descripcion: 'Chaqueta de jean estilo oversized en denim claro lavado. Corte relajado con botones frontales y bolsillos funcionales. Perfecta para layering sobre camisas estampadas. Look urbano casual.', categoria: 'lenador' },
        'Chaqueta Americana Café': { precio: 120000, tallas: 'S,M,L,XL', colores: 'Verde Militar,Caqui,Oliva', descripcion: 'Chaqueta militar estilo field jacket en verde oliva con múltiples bolsillos de parche con solapa. Tela resistente tipo canvas. Corte amplio y cómodo con cuello alto. Ideal para looks streetwear.', categoria: 'americana' },
        'Chaqueta Beisbolera Azul': { precio: 98000, tallas: 'S,M,L,XL', colores: 'Café/Crema,Negro/Crema,Marrón/Blanco', descripcion: 'Chaqueta aviador tipo shearling en cuero con forro interior de borrego sintético crema. Cuello de piel voluminoso y cálido. Cierre frontal con cremallera. Estilo vintage clásico para invierno.', categoria: 'beisbolera' }
    };

    // --- Mapa de íconos por categoría ---
    var ICONOS_CATEGORIAS = {
        'todas': 'fas fa-th-large',
        'americana': 'fas fa-vest',
        'beisbolera': 'fas fa-baseball-ball',
        'parka': 'fas fa-cloud-rain',
        'unicolor': 'fas fa-palette',
        'combinada': 'fas fa-swatchbook',
        'lenador': 'fas fa-tree'
    };

    // --- Estado interno (no accesible desde consola) ---
    let _productoActual = {
        nombre: '',
        talla: '',
        color: '',
        cantidad: 1
    };

    // --- Filtrar por categoría ---
    window.filtrarCategoria = function (categoria, evt) {
        var cards = document.querySelectorAll('.producto-card');
        var items = document.querySelectorAll('.categoria-item');

        items.forEach(function (item) { item.classList.remove('activa'); });
        var e = evt || window.event;
        if (e && e.currentTarget) e.currentTarget.classList.add('activa');

        cards.forEach(function (card) {
            if (categoria === 'todas' || card.dataset.categoria === categoria) {
                card.style.display = '';
                card.style.opacity = '0';
                setTimeout(function () { card.style.opacity = '1'; }, 50);
            } else {
                card.style.display = 'none';
            }
        });
    };

    // --- Mapa de imágenes multi-ángulo (fallback, se reemplaza con datos de Firebase) ---
    var IMAGENES = {
        'Chaqueta Americana Negra': ['img/americana-negra.jpg', 'img/americana-negra-2.jpg', 'img/americana-negra-3.jpg'],
        'Chaqueta Beisbolera Roja': ['img/beisbolera-roja.jpg', 'img/beisbolera-roja-2.jpg'],
        'Parka Impermeable Azul': ['img/parka-azul.jpg', 'img/parka-azul-2.jpg', 'img/parka-azul-3.jpg'],
        'Chaqueta Unicolor Gris': ['img/unicolor-gris.jpg', 'img/unicolor-gris-2.jpg', 'img/unicolor-gris-3.jpg'],
        'Chaqueta Combinada Negro/Blanco': ['img/combinada-negra.jpg', 'img/combinada-negra-2.jpg', 'img/combinada-negra-3.jpg'],
        'Chaqueta Leñadora Café': ['img/lenadora-cafe.jpg', 'img/lenadora-cafe-2.jpg', 'img/lenadora-cafe-3.jpg'],
        'Chaqueta Americana Café': ['img/americana-cafe.jpg', 'img/americana-cafe-2.jpg', 'img/americana-cafe-3.jpg'],
        'Chaqueta Beisbolera Azul': ['img/beisbolera-azul.jpg', 'img/beisbolera-azul-2.jpg', 'img/beisbolera-azul-3.jpg']
    };

    // --- Mapa de iconos desde Firebase ---
    var ICONOS_FIREBASE = {};

    // --- Cargar datos desde Firebase (si está configurado) ---
    function cargarDesdeFirebase() {
        if (!window.db) return;

        // Cargar config del negocio
        db.collection('config').doc('negocio').get().then(function (doc) {
            if (doc.exists) {
                var data = doc.data();
                if (data.whatsapp) CONFIG.whatsapp = data.whatsapp;
                if (data.nequi) CONFIG.nequi = data.nequi;
                if (data.cuenta) CONFIG.cuenta = data.cuenta;
            }
        });

        // Cargar categorías desde Firebase
        db.collection('categorias').orderBy('orden', 'asc').get().then(function (snapshot) {
            if (!snapshot.empty) {
                snapshot.forEach(function (doc) {
                    var c = doc.data();
                    ICONOS_FIREBASE[c.slug] = c.icono || 'fas fa-tag';
                    ICONOS_CATEGORIAS[c.slug] = c.icono || 'fas fa-tag';
                });
            }
        }).then(function () {
            // Cargar productos después de tener las categorías
            return db.collection('productos').orderBy('orden', 'asc').get();
        }).then(function (snapshot) {
            if (snapshot.empty) return;

            var nuevoCatalogo = {};
            var nuevasImagenes = {};
            var productos = [];

            snapshot.forEach(function (doc) {
                var p = doc.data();
                nuevoCatalogo[p.nombre] = {
                    precio: p.precio,
                    tallas: p.tallas,
                    colores: p.colores || '',
                    descripcion: p.descripcion || '',
                    categoria: p.categoria
                };
                nuevasImagenes[p.nombre] = p.imagenes || [];
                productos.push(p);
            });

            CATALOGO = nuevoCatalogo;
            IMAGENES = nuevasImagenes;

            renderizarProductos(productos);
            renderizarCategorias(productos);
        });
    }

    // --- Renderizar tarjetas de productos dinámicamente ---
    function renderizarProductos(productos) {
        var grid = document.getElementById('productos-grid');
        if (!grid) return;
        grid.innerHTML = '';

        productos.forEach(function (p, index) {
            var img = (p.imagenes && p.imagenes.length > 0) ? p.imagenes[0] : 'img/logo.png';
            var precio = p.precio ? '$' + p.precio.toLocaleString('es-CO') : '';
            var tallas = p.tallas ? p.tallas.replace(/,/g, ' - ') : '';
            var nombreEscaped = p.nombre.replace(/'/g, "\\'");

            var html = '<div class="col-6 col-md-4 col-lg-3 producto-card" data-categoria="' + (p.categoria || '') + '">' +
                '<div class="card h-100">' +
                    '<div class="card-img-wrapper">' +
                        '<img src="' + img + '" class="card-img-top" alt="' + p.nombre + '">' +
                        '<span class="badge-disponible">Disponible</span>' +
                        '<button class="btn-vista-rapida" onclick="verDetalle(\'' + nombreEscaped + '\')">Vista Rápida</button>' +
                    '</div>' +
                    '<div class="card-body">' +
                        '<h6 class="card-title">' + p.nombre + '</h6>' +
                        '<p class="card-price">' + precio + '</p>' +
                        '<p class="text-muted small mb-0">Tallas: ' + tallas + '</p>' +
                    '</div>' +
                '</div>' +
            '</div>';

            grid.innerHTML += html;
        });

        // Animación de entrada
        var cards = grid.querySelectorAll('.producto-card');
        cards.forEach(function (card, index) {
            card.style.opacity = '0';
            card.style.transition = 'opacity 0.5s ease ' + (index * 0.08) + 's';
            setTimeout(function () { card.style.opacity = '1'; }, 50);
        });
    }

    // --- Renderizar categorías dinámicamente ---
    function renderizarCategorias(productos) {
        var scroll = document.querySelector('.categorias-scroll');
        if (!scroll) return;

        // Extraer categorías únicas
        var categoriasMap = {};
        productos.forEach(function (p) {
            if (p.categoria && !categoriasMap[p.categoria]) {
                categoriasMap[p.categoria] = true;
            }
        });

        scroll.innerHTML = '';

        // Botón "Todas" siempre primero
        scroll.innerHTML += crearBotonCategoria('todas', 'Todas', ICONOS_CATEGORIAS['todas'] || 'fas fa-th-large');

        Object.keys(categoriasMap).forEach(function (slug) {
            var nombre = capitalizarCategoria(slug);
            var icono = ICONOS_CATEGORIAS[slug] || 'fas fa-tag';
            scroll.innerHTML += crearBotonCategoria(slug, nombre, icono);
        });

        // Activar "Todas"
        var primero = scroll.querySelector('.categoria-item');
        if (primero) primero.classList.add('activa');
    }

    function crearBotonCategoria(slug, nombre, icono) {
        return '<div class="categoria-item" onclick="filtrarCategoria(\'' + slug + '\', event)">' +
            '<div class="categoria-icon"><i class="' + icono + '"></i></div>' +
            '<span>' + nombre + '</span>' +
        '</div>';
    }

    // --- Abrir / Cerrar drawer ---
    function abrirDrawer() {
        document.getElementById('drawerOverlay').classList.add('activo');
        document.getElementById('drawerDetalle').classList.add('activo');
        document.body.style.overflow = 'hidden';
    }

    window.cerrarDrawer = function () {
        document.getElementById('drawerOverlay').classList.remove('activo');
        document.getElementById('drawerDetalle').classList.remove('activo');
        document.body.style.overflow = '';
    };

    // --- Ver detalle del producto ---
    window.verDetalle = function (nombre) {
        var producto = CATALOGO[nombre];
        if (!producto) {
            mostrarAlerta('error', 'Error', 'Producto no encontrado.');
            return;
        }

        _productoActual.nombre = nombre;
        _productoActual.talla = '';
        _productoActual.color = '';
        _productoActual.cantidad = 1;

        var precioFormateado = producto.precio.toLocaleString('es-CO');

        document.getElementById('modalProductoNombre').textContent = nombre;
        document.getElementById('modalProductoPrecio').textContent = '$' + precioFormateado;
        document.getElementById('modalProductoCategoria').textContent = capitalizarCategoria(producto.categoria);
        document.getElementById('cantidad').value = 1;

        // Descripción
        var descEl = document.getElementById('modalProductoDescripcion');
        if (producto.descripcion) {
            descEl.textContent = producto.descripcion;
            descEl.style.display = 'block';
        } else {
            descEl.textContent = '';
            descEl.style.display = 'none';
        }

        // Colores
        var coloresSection = document.getElementById('coloresSection');
        var coloresContainer = document.getElementById('modalColores');
        coloresContainer.innerHTML = '';
        if (producto.colores && producto.colores.trim()) {
            coloresSection.style.display = 'block';
            producto.colores.split(',').forEach(function (color) {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'color-btn';
                btn.textContent = color.trim();
                btn.onclick = function () {
                    document.querySelectorAll('.color-btn').forEach(function (b) { b.classList.remove('seleccionado'); });
                    this.classList.add('seleccionado');
                    _productoActual.color = color.trim();
                };
                coloresContainer.appendChild(btn);
            });
        } else {
            coloresSection.style.display = 'none';
        }

        // Galería de imágenes apiladas verticalmente
        var imagenes = IMAGENES[nombre] || [];
        var galeriaContainer = document.getElementById('drawerGaleria');
        var vistas = ['Frontal', 'Trasera', 'Lateral', 'Detalle'];

        galeriaContainer.innerHTML = '';
        imagenes.forEach(function (src, index) {
            var item = document.createElement('div');
            item.className = 'drawer-img-item';
            var img = document.createElement('img');
            img.src = src;
            img.alt = nombre + ' - Vista ' + (vistas[index] || (index + 1));
            item.appendChild(img);
            galeriaContainer.appendChild(item);
        });

        // Generar botones de talla desde el catálogo
        var tallasContainer = document.getElementById('modalTallas');
        tallasContainer.innerHTML = '';
        producto.tallas.split(',').forEach(function (talla) {
            var btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'talla-btn';
            btn.textContent = talla.trim();
            btn.onclick = function () {
                document.querySelectorAll('.talla-btn').forEach(function (b) { b.classList.remove('seleccionada'); });
                this.classList.add('seleccionada');
                _productoActual.talla = talla.trim();
            };
            tallasContainer.appendChild(btn);
        });

        document.getElementById('pagoNequi').checked = true;
        var camposEntrega = document.getElementById('camposEntrega');
        if (camposEntrega) camposEntrega.style.display = 'none';
        var camposComprobante = document.getElementById('camposComprobante');
        if (camposComprobante) camposComprobante.style.display = 'none';
        var comprobantePreview = document.getElementById('comprobantePreview');
        if (comprobantePreview) comprobantePreview.style.display = 'none';
        var ids = ['direccionEntrega', 'nombreRecibe', 'horarioEntrega', 'comprobanteArchivo', 'nombreConsignante'];
        ids.forEach(function (id) { var el = document.getElementById(id); if (el) el.value = ''; });
        var sel = document.getElementById('formaPagoEntrega');
        if (sel) sel.selectedIndex = 0;

        // Scroll al inicio de ambas columnas
        var colImgs = document.getElementById('drawerColImgs');
        if (colImgs) colImgs.scrollTop = 0;
        var colInfo = document.querySelector('.drawer-col-info');
        if (colInfo) colInfo.scrollTop = 0;

        abrirDrawer();
    };

    // --- Toggle campos según método de pago ---
    window.togglePagoOpciones = function () {
        var camposEntrega = document.getElementById('camposEntrega');
        var camposComprobante = document.getElementById('camposComprobante');
        var btnNequi = document.getElementById('btnAbrirNequi');
        var esContraEntrega = document.getElementById('pagoContraEntrega').checked;
        var esNequi = document.getElementById('pagoNequi').checked;
        var esCuenta = document.getElementById('pagoCuenta').checked;

        camposEntrega.style.display = esContraEntrega ? 'block' : 'none';
        camposComprobante.style.display = (esNequi || esCuenta) ? 'block' : 'none';
        // Botón abrir Nequi solo si es Nequi
        btnNequi.style.display = esNequi ? 'grid' : 'none';
    };

    // --- Abrir app Nequi ---
    window.abrirNequi = function () {
        // Intenta abrir la app Nequi en el celular, si no puede abre la web oficial
        var nequiApp = 'nequi://';
        var nequiWeb = 'https://www.nequi.com.co';
        var inicio = Date.now();
        window.location = nequiApp;
        setTimeout(function () {
            // Si pasó más de 2s sin salir, es que no tiene la app → abrir web
            if (Date.now() - inicio < 2500) {
                window.open(nequiWeb, '_blank');
            }
        }, 2000);
    };

    // --- Previsualizar comprobante ---
    window.previsualizarComprobante = function () {
        var input = document.getElementById('comprobanteArchivo');
        var preview = document.getElementById('comprobantePreview');
        var img = document.getElementById('comprobanteImg');
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                img.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            preview.style.display = 'none';
        }
    };

    // --- Cambiar cantidad ---
    window.cambiarCantidad = function (delta) {
        var input = document.getElementById('cantidad');
        var val = parseInt(input.value) + delta;
        if (val < 1) val = 1;
        if (val > 50) val = 50;
        input.value = val;
        _productoActual.cantidad = val;
    };

    // --- Enviar pedido por WhatsApp ---
    window.enviarWhatsApp = function () {
        // Obtener producto del catálogo
        var producto = CATALOGO[_productoActual.nombre];
        if (!producto) {
            mostrarAlerta('error', 'Error', 'Producto no válido.');
            return;
        }

        // Validar color si hay colores disponibles
        if (producto.colores && producto.colores.trim() && !_productoActual.color) {
            mostrarAlerta('warning', 'Selecciona color', 'Por favor selecciona un color antes de continuar.');
            return;
        }
        if (!_productoActual.talla) {
            mostrarAlerta('warning', 'Selecciona talla', 'Por favor selecciona una talla antes de continuar.');
            return;
        }

        var cantidad = parseInt(document.getElementById('cantidad').value);
        if (isNaN(cantidad) || cantidad < 1) cantidad = 1;
        if (cantidad > 50) cantidad = 50;

        var precioReal = producto.precio;
        var totalReal = precioReal * cantidad;

        // Obtener método de pago
        var metodoPago = '';
        var infoPago = '';
        var esContraEntrega = document.getElementById('pagoContraEntrega').checked;
        var esNequi = document.getElementById('pagoNequi').checked;
        var esCuenta = document.getElementById('pagoCuenta').checked;

        if (esNequi) {
            metodoPago = 'Nequi';
            infoPago = CONFIG.nequi;
        } else if (esCuenta) {
            metodoPago = 'Cuenta de Ahorros';
            infoPago = CONFIG.cuenta;
        } else {
            metodoPago = 'Pago Contra Entrega';
        }

        // Validar comprobante y nombre para Nequi o Cuenta
        if (esNequi || esCuenta) {
            var nombreConsignante = document.getElementById('nombreConsignante').value.trim();
            if (!nombreConsignante) {
                mostrarAlerta('warning', 'Dato requerido', 'Por favor ingresa a nombre de quién llega la consignación.');
                return;
            }
            var archivoInput = document.getElementById('comprobanteArchivo');
            if (!archivoInput.files || !archivoInput.files[0]) {
                mostrarAlerta('warning', 'Comprobante requerido', 'Por favor adjunta el comprobante de pago antes de hacer el pedido.');
                return;
            }
        }

        // Validar campos de contra entrega
        if (esContraEntrega) {
            var direccion = document.getElementById('direccionEntrega').value.trim();
            var recibe = document.getElementById('nombreRecibe').value.trim();
            var formaPago = document.getElementById('formaPagoEntrega').value;
            var horario = document.getElementById('horarioEntrega').value.trim();

            if (!direccion) { mostrarAlerta('warning', 'Dato requerido', 'Por favor ingresa la dirección de entrega.'); return; }
            if (!recibe) { mostrarAlerta('warning', 'Dato requerido', 'Por favor ingresa quién recibe el pedido.'); return; }
            if (!formaPago) { mostrarAlerta('warning', 'Dato requerido', 'Por favor selecciona cómo pagarás al recibir.'); return; }
            if (!horario) { mostrarAlerta('warning', 'Dato requerido', 'Por favor ingresa un horario de entrega.'); return; }
        }

        // Timestamp de pedido (no editable por el cliente)
        var ahora = new Date();
        var timestamp = ahora.toLocaleDateString('es-CO') + ' ' + ahora.toLocaleTimeString('es-CO');

        // Construir mensaje
        var mensaje = '\uD83E\uDDE5 *PEDIDO - Diegu\'s Fashion*\n';
        mensaje += '\uD83D\uDCC5 *Fecha:* ' + timestamp + '\n\n';
        mensaje += '\uD83D\uDCE6 *Producto:* ' + _productoActual.nombre + '\n';
        if (_productoActual.color) {
            mensaje += '\uD83C\uDFA8 *Color:* ' + _productoActual.color + '\n';
        }
        mensaje += '\uD83D\uDCCF *Talla:* ' + _productoActual.talla + '\n';
        mensaje += '\uD83D\uDD22 *Cantidad:* ' + cantidad + '\n';
        mensaje += '\uD83D\uDCB0 *Precio unitario:* $' + precioReal.toLocaleString('es-CO') + '\n';
        mensaje += '\uD83D\uDCB5 *Total:* $' + totalReal.toLocaleString('es-CO') + '\n\n';
        mensaje += '\uD83D\uDCB3 *M\u00e9todo de pago:* ' + metodoPago + '\n';

        if (esNequi || esCuenta) {
            var consignante = document.getElementById('nombreConsignante').value.trim();
            if (esNequi) {
                mensaje += '\uD83D\uDCF1 *Nequi:* ' + infoPago + '\n';
            } else {
                mensaje += '\uD83C\uDFE6 *' + infoPago + '*\n';
            }
            mensaje += '\uD83D\uDC64 *Consignaci\u00f3n a nombre de:* ' + consignante + '\n';
            mensaje += '\n\uD83D\uDCCE *COMPROBANTE:* _Adjunto en el siguiente mensaje de este chat_\n';
            mensaje += '\u26A0\uFE0F *NOTA:* _Este pago ser\u00e1 VERIFICADO por el vendedor antes de procesar el pedido. No se despacha sin confirmaci\u00f3n._';
        }

        // Datos de entrega (contra entrega)
        if (esContraEntrega) {
            mensaje += '\n\uD83D\uDE9A *--- DATOS DE ENTREGA ---*\n';
            mensaje += '\uD83D\uDCCD *Direcci\u00f3n:* ' + document.getElementById('direccionEntrega').value.trim() + '\n';
            mensaje += '\uD83D\uDC64 *Recibe:* ' + document.getElementById('nombreRecibe').value.trim() + '\n';
            mensaje += '\uD83D\uDCB0 *Paga con:* ' + document.getElementById('formaPagoEntrega').value + '\n';
            mensaje += '\uD83D\uDD50 *Horario de entrega:* ' + document.getElementById('horarioEntrega').value.trim() + '\n';
            mensaje += '\n\u26A0\uFE0F _En transferencia o consignaci\u00f3n, se verificar\u00e1 el pago antes de entregar._';
        }

        mensaje += '\n\n_Quedo atento para confirmar mi pedido._';

        // Abrir WhatsApp
        var url = 'https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(mensaje);
        window.open(url, '_blank');

        // Si pagó con Nequi o Cuenta, mostrar alerta para que envíe el comprobante
        if (esNequi || esCuenta) {
            setTimeout(function () {
                mostrarAlerta('info', 'Envía tu comprobante', 'Ahora envía la foto del comprobante de pago en el chat de WhatsApp que se acaba de abrir. Tu pedido NO será procesado hasta que el vendedor verifique el pago.');
            }, 1500);
        }
    };

    // --- Utilidades internas ---
    function capitalizarCategoria(cat) {
        var nombres = {
            'americana': 'Americana',
            'beisbolera': 'Beisbolera',
            'parka': 'Parka',
            'unicolor': 'Unicolor',
            'combinada': 'Combinada',
            'lenador': 'Le\u00f1adora'
        };
        return nombres[cat] || cat;
    }

    // --- Modal de alerta profesional ---
    function mostrarAlerta(tipo, titulo, mensaje) {
        var icono = document.getElementById('alertaIcono');
        var btn = document.getElementById('alertaBtn');
        var iconos = {
            error:   { clase: 'alerta-icono-error',   html: '<i class="fas fa-times"></i>',       btnClass: 'btn-danger' },
            warning: { clase: 'alerta-icono-warning',  html: '<i class="fas fa-exclamation"></i>', btnClass: 'btn-warning' },
            success: { clase: 'alerta-icono-success',  html: '<i class="fas fa-check"></i>',      btnClass: 'btn-success' },
            info:    { clase: 'alerta-icono-info',      html: '<i class="fas fa-info"></i>',       btnClass: 'btn-primary' }
        };
        var config = iconos[tipo] || iconos.info;
        icono.className = config.clase + ' mx-auto mb-3';
        icono.innerHTML = config.html;
        btn.className = 'btn btn-sm fw-bold px-4 ' + config.btnClass;
        btn.style.borderRadius = '20px';
        document.getElementById('alertaTitulo').textContent = titulo;
        document.getElementById('alertaMensaje').textContent = mensaje;
        var modal = new bootstrap.Modal(document.getElementById('modalAlerta'));
        modal.show();
    }

    // --- Navbar efecto al hacer scroll ---
    window.addEventListener('scroll', function () {
        var navbar = document.querySelector('.nav-pro');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        // Activar categoría "Todas"
        var primerCategoria = document.querySelector('.categoria-item');
        if (primerCategoria) primerCategoria.classList.add('activa');

        // Animación de entrada
        var cards = document.querySelectorAll('.producto-card');
        cards.forEach(function (card, index) {
            card.style.opacity = '0';
            card.style.transition = 'opacity 0.5s ease ' + (index * 0.1) + 's';
            setTimeout(function () { card.style.opacity = '1'; }, 100);
        });

        // Validar cantidad manual
        var cantidadInput = document.getElementById('cantidad');
        if (cantidadInput) {
            cantidadInput.addEventListener('change', function () {
                var val = parseInt(this.value);
                if (isNaN(val) || val < 1) val = 1;
                if (val > 50) val = 50;
                this.value = val;
                _productoActual.cantidad = val;
            });
        }

        // Cargar desde Firebase (si está configurado, reemplaza los datos hardcoded)
        cargarDesdeFirebase();
    });

})();
