/* ============================================
   Diegu's Fashion - Admin Panel Logic
   ============================================ */
(function () {
    'use strict';

    var editingId = null;
    var deleteId = null;
    var editingCatId = null;
    var selectedIcon = 'fas fa-tag';

    // --- Datos iniciales para seed ---
    var DATOS_INICIALES = [
        { nombre: 'Chaqueta Americana Negra', precio: 117000, tallas: 'S,M,L,XL', colores: 'Negro,Negro Mate', descripcion: 'Chaqueta tipo biker en cuero sintético negro con cierre diagonal, solapas con broches metálicos y múltiples cremalleras decorativas. Forro interior suave. Estilo rockero y urbano.', categoria: 'americana', imagenes: ['img/americana-negra.jpg', 'img/americana-negra-2.jpg', 'img/americana-negra-3.jpg'], orden: 1 },
        { nombre: 'Chaqueta Beisbolera Roja', precio: 95000, tallas: 'S,M,L,XL', colores: 'Gris,Gris Jaspe,Negro', descripcion: 'Hoodie deportivo con capucha ajustable y bolsillo canguro frontal. Tela algodón french terry suave y cálida. Corte holgado ideal para el día a día y clima fresco.', categoria: 'beisbolera', imagenes: ['img/beisbolera-roja.jpg', 'img/beisbolera-roja-2.jpg'], orden: 2 },
        { nombre: 'Parka Impermeable Azul', precio: 135000, tallas: 'S,M,L,XL', colores: 'Azul Claro,Azul Medio,Celeste', descripcion: 'Chaqueta de jean desteñida en tono azul claro con botones metálicos cobrizos, bolsillos de parche al pecho y detalle de pin decorativo. Tela denim 100% algodón. Look casual y fresco.', categoria: 'parka', imagenes: ['img/parka-azul.jpg', 'img/parka-azul-2.jpg', 'img/parka-azul-3.jpg'], orden: 3 },
        { nombre: 'Chaqueta Unicolor Gris', precio: 89000, tallas: 'S,M,L,XL,XXL', colores: 'Azul Oscuro,Negro,Gris Oxford', descripcion: 'Blazer formal de corte entallado en azul marino oscuro con solapas de muesca. Tela premium con caída elegante. Ideal para oficina, reuniones y ocasiones especiales. Combina con camisa y corbata.', categoria: 'unicolor', imagenes: ['img/unicolor-gris.jpg', 'img/unicolor-gris-2.jpg', 'img/unicolor-gris-3.jpg'], orden: 4 },
        { nombre: 'Chaqueta Combinada Negro/Blanco', precio: 110000, tallas: 'S,M,L,XL', colores: 'Negro,Negro/Plateado', descripcion: 'Chaqueta biker de cuero con textura natural, cierre diagonal cromado y solapas con broches a presión. Múltiples bolsillos con cremallera. Estilo rebelde y moderno con acabado semi-brillante.', categoria: 'combinada', imagenes: ['img/combinada-negra.jpg', 'img/combinada-negra-2.jpg', 'img/combinada-negra-3.jpg'], orden: 5 },
        { nombre: 'Chaqueta Leñadora Café', precio: 105000, tallas: 'M,L,XL', colores: 'Azul Claro,Azul Desteñido', descripcion: 'Chaqueta de jean estilo oversized en denim claro lavado. Corte relajado con botones frontales y bolsillos funcionales. Perfecta para layering sobre camisas estampadas. Look urbano casual.', categoria: 'lenador', imagenes: ['img/lenadora-cafe.jpg', 'img/lenadora-cafe-2.jpg', 'img/lenadora-cafe-3.jpg'], orden: 6 },
        { nombre: 'Chaqueta Americana Café', precio: 120000, tallas: 'S,M,L,XL', colores: 'Verde Militar,Caqui,Oliva', descripcion: 'Chaqueta militar estilo field jacket en verde oliva con múltiples bolsillos de parche con solapa. Tela resistente tipo canvas. Corte amplio y cómodo con cuello alto. Ideal para looks streetwear.', categoria: 'americana', imagenes: ['img/americana-cafe.jpg', 'img/americana-cafe-2.jpg', 'img/americana-cafe-3.jpg'], orden: 7 },
        { nombre: 'Chaqueta Beisbolera Azul', precio: 98000, tallas: 'S,M,L,XL', colores: 'Café/Crema,Negro/Crema,Marrón/Blanco', descripcion: 'Chaqueta aviador tipo shearling en cuero con forro interior de borrego sintético crema. Cuello de piel voluminoso y cálido. Cierre frontal con cremallera. Estilo vintage clásico para invierno.', categoria: 'beisbolera', imagenes: ['img/beisbolera-azul.jpg', 'img/beisbolera-azul-2.jpg', 'img/beisbolera-azul-3.jpg'], orden: 8 }
    ];

    // =============================================
    //  INIT
    // =============================================
    document.addEventListener('DOMContentLoaded', function () {
        if (!window.db || !window.auth) {
            document.getElementById('loginScreen').innerHTML =
                '<div class="login-card"><h3 style="color:#EF4444;margin-bottom:12px;">Firebase no configurado</h3>' +
                '<p style="font-size:0.85rem;color:#64748B;">Abre el archivo <strong>firebase-config.js</strong> y sigue las instrucciones para conectar tu proyecto Firebase.</p></div>';
            return;
        }

        // Auth state
        auth.onAuthStateChanged(function (user) {
            if (user) {
                document.getElementById('loginScreen').style.display = 'none';
                document.getElementById('adminPanel').style.display = 'flex';
                loadProducts();
                loadCategories();
                loadConfig();
            } else {
                document.getElementById('loginScreen').style.display = 'flex';
                document.getElementById('adminPanel').style.display = 'none';
            }
        });

        // --- Event Listeners ---
        // Login
        document.getElementById('loginForm').addEventListener('submit', function (e) {
            e.preventDefault();
            doLogin();
        });

        // Logout
        document.getElementById('btnLogout').addEventListener('click', function () {
            auth.signOut();
        });

        // Sidebar navigation
        document.querySelectorAll('.nav-item[data-section]').forEach(function (item) {
            item.addEventListener('click', function () {
                showSection(this.dataset.section);
            });
        });

        // Sidebar toggle (mobile)
        document.getElementById('sidebarToggle').addEventListener('click', function () {
            document.getElementById('sidebar').classList.toggle('open');
        });

        // Product modal
        document.getElementById('btnAgregarProducto').addEventListener('click', function () {
            openProductModal(null);
        });
        document.getElementById('btnCerrarModal').addEventListener('click', closeProductModal);
        document.getElementById('btnCancelarModal').addEventListener('click', closeProductModal);
        document.getElementById('modalProducto').addEventListener('click', function (e) {
            if (e.target === this) closeProductModal();
        });

        // Product form submit
        document.getElementById('formProducto').addEventListener('submit', function (e) {
            e.preventDefault();
            saveProduct();
        });

        // Category "otra"
        document.getElementById('prodCategoria').addEventListener('change', function () {
            document.getElementById('categoriaOtraGroup').style.display =
                this.value === 'otra' ? 'block' : 'none';
        });

        // Category modal
        document.getElementById('btnAgregarCategoria').addEventListener('click', function () {
            openCategoryModal(null);
        });
        document.getElementById('btnCerrarCategoria').addEventListener('click', closeCategoryModal);
        document.getElementById('btnCancelarCategoria').addEventListener('click', closeCategoryModal);
        document.getElementById('modalCategoria').addEventListener('click', function (e) {
            if (e.target === this) closeCategoryModal();
        });
        document.getElementById('formCategoria').addEventListener('submit', function (e) {
            e.preventDefault();
            saveCategory();
        });

        // Auto-generate slug from category name
        document.getElementById('catNombre').addEventListener('input', function () {
            if (!editingCatId) {
                document.getElementById('catSlug').value = this.value.trim()
                    .toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '');
            }
        });

        // Icon picker selection
        document.querySelectorAll('.icon-picker-item').forEach(function (item) {
            item.addEventListener('click', function () {
                document.querySelectorAll('.icon-picker-item').forEach(function (i) { i.classList.remove('selected'); });
                this.classList.add('selected');
                selectedIcon = this.dataset.icon;
                document.getElementById('catIcono').value = selectedIcon;
                document.getElementById('iconSelectedPreview').className = selectedIcon;
                document.getElementById('iconSelectedName').textContent = selectedIcon;
            });
        });

        // Config form
        document.getElementById('formConfig').addEventListener('submit', function (e) {
            e.preventDefault();
            saveConfig();
        });

        // Delete confirm
        document.getElementById('btnCancelDelete').addEventListener('click', closeConfirm);
        document.getElementById('btnConfirmDelete').addEventListener('click', doDelete);
        document.getElementById('confirmDelete').addEventListener('click', function (e) {
            if (e.target === this) closeConfirm();
        });

        // Seed
        document.getElementById('btnSeed').addEventListener('click', seedData);
    });

    // =============================================
    //  AUTH
    // =============================================
    function doLogin() {
        var email = document.getElementById('loginEmail').value;
        var password = document.getElementById('loginPassword').value;
        var btn = document.getElementById('loginBtn');
        var err = document.getElementById('loginError');

        btn.classList.add('btn-loading');
        btn.textContent = 'Ingresando...';
        err.style.display = 'none';

        auth.signInWithEmailAndPassword(email, password)
            .catch(function (error) {
                err.textContent = traducirError(error.code);
                err.style.display = 'block';
            })
            .finally(function () {
                btn.classList.remove('btn-loading');
                btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
            });
    }

    function traducirError(code) {
        var errores = {
            'auth/user-not-found': 'No existe una cuenta con ese correo.',
            'auth/wrong-password': 'Contraseña incorrecta.',
            'auth/invalid-email': 'Correo no válido.',
            'auth/too-many-requests': 'Demasiados intentos. Espera un momento.',
            'auth/invalid-credential': 'Credenciales incorrectas.'
        };
        return errores[code] || 'Error al iniciar sesión. Intenta de nuevo.';
    }

    // =============================================
    //  NAVIGATION
    // =============================================
    function showSection(name) {
        document.querySelectorAll('.admin-section').forEach(function (s) {
            s.style.display = 'none';
        });
        var sec = document.getElementById('seccion-' + name);
        if (sec) sec.style.display = 'block';

        document.querySelectorAll('.nav-item').forEach(function (n) {
            n.classList.remove('active');
        });
        var nav = document.querySelector('.nav-item[data-section="' + name + '"]');
        if (nav) nav.classList.add('active');

        // Close sidebar on mobile
        document.getElementById('sidebar').classList.remove('open');
    }

    // =============================================
    //  PRODUCTS - LOAD
    // =============================================
    function loadProducts() {
        db.collection('productos').orderBy('orden', 'asc').get().then(function (snapshot) {
            var container = document.getElementById('productosGrid');
            container.innerHTML = '';

            if (snapshot.empty) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-box-open"></i><p>No hay productos todavía.</p></div>';
                document.getElementById('seedBanner').style.display = 'flex';
                return;
            }

            document.getElementById('seedBanner').style.display = 'none';

            snapshot.forEach(function (doc) {
                var p = doc.data();
                container.innerHTML += renderProductCard(doc.id, p);
            });
        }).catch(function (err) {
            showToast('Error cargando productos: ' + err.message, 'error');
        });
    }

    function renderProductCard(id, p) {
        var img = (p.imagenes && p.imagenes.length > 0) ? p.imagenes[0] : 'img/logo.png';
        var precio = p.precio ? '$' + p.precio.toLocaleString('es-CO') : '$0';
        var cat = p.categoria || '';
        var tallas = p.tallas || '';
        var colores = p.colores || '';

        return '<div class="admin-product-card">' +
            '<div class="admin-product-img"><img src="' + escapeHtml(img) + '" alt="' + escapeHtml(p.nombre) + '"></div>' +
            '<div class="admin-product-info">' +
                '<h6>' + escapeHtml(p.nombre) + '</h6>' +
                '<p class="admin-product-price">' + precio + '</p>' +
                '<p class="admin-product-meta">' + escapeHtml(cat) + ' &middot; ' + escapeHtml(tallas) + '</p>' +
                (colores ? '<p class="admin-product-meta"><i class="fas fa-palette" style="margin-right:4px;font-size:0.65rem;"></i>' + escapeHtml(colores) + '</p>' : '') +
            '</div>' +
            '<div class="admin-product-actions">' +
                '<button class="btn-admin-edit" onclick="window._editarProducto(\'' + id + '\')"><i class="fas fa-pen"></i></button>' +
                '<button class="btn-admin-delete" onclick="window._eliminarProducto(\'' + id + '\', \'' + escapeHtml(p.nombre).replace(/'/g, "\\'") + '\')"><i class="fas fa-trash"></i></button>' +
            '</div>' +
        '</div>';
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // =============================================
    //  PRODUCTS - MODAL
    // =============================================
    function openProductModal(productId) {
        editingId = productId;

        // Reset form
        document.getElementById('formProducto').reset();
        document.getElementById('prodOrden').value = '1';
        document.getElementById('categoriaOtraGroup').style.display = 'none';
        document.getElementById('prodDescripcion').value = '';
        document.getElementById('prodColores').value = '';
        document.getElementById('prodImg1').value = '';
        document.getElementById('prodImg2').value = '';
        document.getElementById('prodImg3').value = '';
        document.getElementById('prodImg4').value = '';

        if (productId) {
            document.getElementById('modalProductoTitulo').textContent = 'Editar Producto';
            db.collection('productos').doc(productId).get().then(function (doc) {
                if (!doc.exists) return;
                var p = doc.data();
                document.getElementById('prodNombre').value = p.nombre || '';
                document.getElementById('prodPrecio').value = p.precio || '';
                document.getElementById('prodTallas').value = p.tallas || '';
                document.getElementById('prodOrden').value = p.orden || 1;
                document.getElementById('prodDescripcion').value = p.descripcion || '';
                document.getElementById('prodColores').value = p.colores || '';

                // Set category
                var catSelect = document.getElementById('prodCategoria');
                var found = false;
                for (var i = 0; i < catSelect.options.length; i++) {
                    if (catSelect.options[i].value === p.categoria) {
                        catSelect.value = p.categoria;
                        found = true;
                        break;
                    }
                }
                if (!found && p.categoria) {
                    catSelect.value = 'otra';
                    document.getElementById('categoriaOtraGroup').style.display = 'block';
                    document.getElementById('prodCategoriaOtra').value = p.categoria;
                }

                // Cargar rutas de imágenes
                if (p.imagenes) {
                    if (p.imagenes[0]) document.getElementById('prodImg1').value = p.imagenes[0];
                    if (p.imagenes[1]) document.getElementById('prodImg2').value = p.imagenes[1];
                    if (p.imagenes[2]) document.getElementById('prodImg3').value = p.imagenes[2];
                    if (p.imagenes[3]) document.getElementById('prodImg4').value = p.imagenes[3];
                }
            });
        } else {
            document.getElementById('modalProductoTitulo').textContent = 'Agregar Producto';
        }

        document.getElementById('modalProducto').classList.add('visible');
    }

    function closeProductModal() {
        document.getElementById('modalProducto').classList.remove('visible');
        editingId = null;
    }

    // =============================================
    //  PRODUCTS - SAVE
    // =============================================
    function saveProduct() {
        var nombre = document.getElementById('prodNombre').value.trim();
        var precio = parseInt(document.getElementById('prodPrecio').value);
        var tallas = document.getElementById('prodTallas').value.trim();
        var colores = document.getElementById('prodColores').value.trim();
        var descripcion = document.getElementById('prodDescripcion').value.trim();
        var orden = parseInt(document.getElementById('prodOrden').value) || 1;
        var categoria = document.getElementById('prodCategoria').value;

        if (categoria === 'otra') {
            categoria = document.getElementById('prodCategoriaOtra').value.trim().toLowerCase();
            if (!categoria) {
                showToast('Ingresa el nombre de la categoría', 'error');
                return;
            }
        }

        if (!nombre || !precio || !tallas || !categoria) {
            showToast('Completa todos los campos requeridos', 'error');
            return;
        }

        var btn = document.getElementById('btnGuardarProducto');
        btn.classList.add('btn-loading');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';

        // Recoger rutas de imágenes
        var imagenes = [];
        var img1 = document.getElementById('prodImg1').value.trim();
        var img2 = document.getElementById('prodImg2').value.trim();
        var img3 = document.getElementById('prodImg3').value.trim();
        var img4 = document.getElementById('prodImg4').value.trim();
        if (img1) imagenes.push(img1);
        if (img2) imagenes.push(img2);
        if (img3) imagenes.push(img3);
        if (img4) imagenes.push(img4);

        var data = {
            nombre: nombre,
            precio: precio,
            tallas: tallas,
            colores: colores,
            descripcion: descripcion,
            categoria: categoria,
            orden: orden,
            imagenes: imagenes,
            actualizado: firebase.firestore.FieldValue.serverTimestamp()
        };

        var docPromise;
        if (editingId) {
            docPromise = db.collection('productos').doc(editingId).update(data);
        } else {
            data.creado = firebase.firestore.FieldValue.serverTimestamp();
            docPromise = db.collection('productos').add(data);
        }

        docPromise.then(function () {
            showToast(editingId ? 'Producto actualizado' : 'Producto creado', 'success');
            closeProductModal();
            loadProducts();
        }).catch(function (err) {
            showToast('Error: ' + err.message, 'error');
        }).finally(function () {
            btn.classList.remove('btn-loading');
            btn.innerHTML = '<i class="fas fa-save"></i> Guardar';
        });
    }

    // =============================================
    //  PRODUCTS - DELETE
    // =============================================
    window._eliminarProducto = function (id, nombre) {
        deleteId = id;
        document.getElementById('confirmMsg').textContent = '¿Eliminar "' + nombre + '"? Esta acción no se puede deshacer.';
        document.getElementById('confirmDelete').classList.add('visible');
        // Restore product delete handler
        document.getElementById('btnConfirmDelete').onclick = function () { doDelete(); };
    };

    window._editarProducto = function (id) {
        openProductModal(id);
    };

    function closeConfirm() {
        document.getElementById('confirmDelete').classList.remove('visible');
        deleteId = null;
    }

    function doDelete() {
        if (!deleteId) return;
        var id = deleteId;
        closeConfirm();

        db.collection('productos').doc(id).delete().then(function () {
            showToast('Producto eliminado', 'success');
            loadProducts();
        }).catch(function (err) {
            showToast('Error al eliminar: ' + err.message, 'error');
        });
    }

    // =============================================
    //  CONFIG
    // =============================================
    function loadConfig() {
        db.collection('config').doc('negocio').get().then(function (doc) {
            if (doc.exists) {
                var data = doc.data();
                document.getElementById('cfgWhatsapp').value = data.whatsapp || '';
                document.getElementById('cfgNequi').value = data.nequi || '';
                document.getElementById('cfgCuenta').value = data.cuenta || '';
            }
        });
    }

    function saveConfig() {
        var data = {
            whatsapp: document.getElementById('cfgWhatsapp').value.trim(),
            nequi: document.getElementById('cfgNequi').value.trim(),
            cuenta: document.getElementById('cfgCuenta').value.trim()
        };

        db.collection('config').doc('negocio').set(data)
            .then(function () {
                showToast('Configuración guardada', 'success');
            })
            .catch(function (err) {
                showToast('Error: ' + err.message, 'error');
            });
    }

    // =============================================
    //  SEED DATA
    // =============================================
    function seedData() {
        var btn = document.getElementById('btnSeed');
        btn.classList.add('btn-loading');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';

        var batch = db.batch();

        DATOS_INICIALES.forEach(function (p) {
            var ref = db.collection('productos').doc();
            batch.set(ref, {
                nombre: p.nombre,
                precio: p.precio,
                tallas: p.tallas,
                colores: p.colores || '',
                descripcion: p.descripcion || '',
                categoria: p.categoria,
                imagenes: p.imagenes,
                orden: p.orden,
                creado: firebase.firestore.FieldValue.serverTimestamp()
            });
        });

        // Config inicial
        var configRef = db.collection('config').doc('negocio');
        batch.set(configRef, {
            whatsapp: '573137439870',
            nequi: '300 123 4567',
            cuenta: 'Bancolombia - Ahorros 123-456789-00'
        });

        // Categorías iniciales
        var categoriasIniciales = [
            { nombre: 'Americana', slug: 'americana', icono: 'fas fa-vest', orden: 1 },
            { nombre: 'Beisbolera', slug: 'beisbolera', icono: 'fas fa-baseball-ball', orden: 2 },
            { nombre: 'Parka', slug: 'parka', icono: 'fas fa-cloud-rain', orden: 3 },
            { nombre: 'Unicolor', slug: 'unicolor', icono: 'fas fa-palette', orden: 4 },
            { nombre: 'Combinada', slug: 'combinada', icono: 'fas fa-swatchbook', orden: 5 },
            { nombre: 'Leñadora', slug: 'lenador', icono: 'fas fa-tree', orden: 6 }
        ];
        categoriasIniciales.forEach(function (c) {
            var ref = db.collection('categorias').doc();
            batch.set(ref, {
                nombre: c.nombre,
                slug: c.slug,
                icono: c.icono,
                orden: c.orden,
                creado: firebase.firestore.FieldValue.serverTimestamp()
            });
        });

        batch.commit().then(function () {
            showToast('Datos iniciales cargados correctamente', 'success');
            loadProducts();
            loadCategories();
            loadConfig();
        }).catch(function (err) {
            showToast('Error: ' + err.message, 'error');
        }).finally(function () {
            btn.classList.remove('btn-loading');
            btn.innerHTML = '<i class="fas fa-upload"></i> Cargar datos iniciales';
        });
    }

    // =============================================
    //  UPDATE EXISTING PRODUCTS (descripcion + colores)
    // =============================================
    window._updateExistingProducts = function () {
        var btn = document.getElementById('btnUpdateProducts');
        if (!btn) return;
        btn.classList.add('btn-loading');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Actualizando...';

        var lookup = {};
        DATOS_INICIALES.forEach(function (p) {
            lookup[p.nombre] = { descripcion: p.descripcion || '', colores: p.colores || '' };
        });

        db.collection('productos').get().then(function (snapshot) {
            var batch = db.batch();
            var count = 0;
            snapshot.forEach(function (doc) {
                var data = doc.data();
                if (lookup[data.nombre]) {
                    batch.update(doc.ref, {
                        descripcion: lookup[data.nombre].descripcion,
                        colores: lookup[data.nombre].colores
                    });
                    count++;
                }
            });
            if (count === 0) {
                showToast('No se encontraron productos para actualizar', 'info');
                return Promise.resolve();
            }
            return batch.commit().then(function () {
                showToast(count + ' productos actualizados con descripción y colores', 'success');
                loadProducts();
            });
        }).catch(function (err) {
            showToast('Error: ' + err.message, 'error');
        }).finally(function () {
            btn.classList.remove('btn-loading');
            btn.innerHTML = '<i class="fas fa-sync-alt"></i> Actualizar descripciones y colores';
        });
    };

    // =============================================
    //  CATEGORIES - LOAD
    // =============================================
    function loadCategories() {
        db.collection('categorias').orderBy('orden', 'asc').get().then(function (snapshot) {
            var container = document.getElementById('categoriasGrid');
            container.innerHTML = '';

            if (snapshot.empty) {
                container.innerHTML = '<div class="empty-state"><i class="fas fa-tags"></i><p>No hay categorías. Agrega la primera.</p></div>';
                updateProductCategorySelect([]);
                return;
            }

            var cats = [];
            snapshot.forEach(function (doc) {
                var c = doc.data();
                c._id = doc.id;
                cats.push(c);
                container.innerHTML += renderCategoryCard(doc.id, c);
            });

            updateProductCategorySelect(cats);
        }).catch(function (err) {
            showToast('Error cargando categorías: ' + err.message, 'error');
        });
    }

    function renderCategoryCard(id, c) {
        var nombreEscaped = escapeHtml(c.nombre).replace(/'/g, "\\'");
        return '<div class="admin-cat-card">' +
            '<div class="admin-cat-icon"><i class="' + escapeHtml(c.icono || 'fas fa-tag') + '"></i></div>' +
            '<div class="admin-cat-info">' +
                '<h6>' + escapeHtml(c.nombre) + '</h6>' +
                '<small>' + escapeHtml(c.slug) + ' &middot; Orden: ' + (c.orden || 0) + '</small>' +
            '</div>' +
            '<div class="admin-cat-actions">' +
                '<button class="btn-admin-edit" onclick="window._editarCategoria(\'' + id + '\')"><i class="fas fa-pen"></i></button>' +
                '<button class="btn-admin-delete" onclick="window._eliminarCategoria(\'' + id + '\', \'' + nombreEscaped + '\')"><i class="fas fa-trash"></i></button>' +
            '</div>' +
        '</div>';
    }

    // Update product form category dropdown
    function updateProductCategorySelect(cats) {
        var select = document.getElementById('prodCategoria');
        // Si no hay categorías en Firebase, mantener las hardcodeadas
        if (!cats || cats.length === 0) return;
        select.innerHTML = '<option value="">Seleccionar...</option>';
        cats.forEach(function (c) {
            select.innerHTML += '<option value="' + escapeHtml(c.slug) + '">' + escapeHtml(c.nombre) + '</option>';
        });
        select.innerHTML += '<option value="otra">+ Nueva categoría</option>';
    }

    // =============================================
    //  CATEGORIES - MODAL
    // =============================================
    function openCategoryModal(catId) {
        editingCatId = catId;
        document.getElementById('formCategoria').reset();
        document.getElementById('catOrden').value = '1';
        selectedIcon = 'fas fa-tag';
        document.getElementById('catIcono').value = selectedIcon;
        document.getElementById('iconSelectedPreview').className = selectedIcon;
        document.getElementById('iconSelectedName').textContent = selectedIcon;
        document.querySelectorAll('.icon-picker-item').forEach(function (i) { i.classList.remove('selected'); });

        if (catId) {
            document.getElementById('modalCategoriaTitulo').textContent = 'Editar Categoría';
            db.collection('categorias').doc(catId).get().then(function (doc) {
                if (!doc.exists) return;
                var c = doc.data();
                document.getElementById('catNombre').value = c.nombre || '';
                document.getElementById('catSlug').value = c.slug || '';
                document.getElementById('catOrden').value = c.orden || 1;
                selectedIcon = c.icono || 'fas fa-tag';
                document.getElementById('catIcono').value = selectedIcon;
                document.getElementById('iconSelectedPreview').className = selectedIcon;
                document.getElementById('iconSelectedName').textContent = selectedIcon;
                // Highlight selected icon in picker
                document.querySelectorAll('.icon-picker-item').forEach(function (item) {
                    if (item.dataset.icon === selectedIcon) item.classList.add('selected');
                });
            });
        } else {
            document.getElementById('modalCategoriaTitulo').textContent = 'Agregar Categoría';
        }

        document.getElementById('modalCategoria').classList.add('visible');
    }

    function closeCategoryModal() {
        document.getElementById('modalCategoria').classList.remove('visible');
        editingCatId = null;
    }

    // =============================================
    //  CATEGORIES - SAVE
    // =============================================
    function saveCategory() {
        var nombre = document.getElementById('catNombre').value.trim();
        var slug = document.getElementById('catSlug').value.trim();
        var orden = parseInt(document.getElementById('catOrden').value) || 1;
        var icono = document.getElementById('catIcono').value || 'fas fa-tag';

        if (!nombre || !slug) {
            showToast('Completa nombre y slug', 'error');
            return;
        }

        var btn = document.getElementById('btnGuardarCategoria');
        btn.classList.add('btn-loading');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';

        var data = {
            nombre: nombre,
            slug: slug,
            icono: icono,
            orden: orden,
            actualizado: firebase.firestore.FieldValue.serverTimestamp()
        };

        var docPromise;
        if (editingCatId) {
            docPromise = db.collection('categorias').doc(editingCatId).update(data);
        } else {
            data.creado = firebase.firestore.FieldValue.serverTimestamp();
            docPromise = db.collection('categorias').add(data);
        }

        docPromise.then(function () {
            showToast(editingCatId ? 'Categoría actualizada' : 'Categoría creada', 'success');
            closeCategoryModal();
            loadCategories();
        }).catch(function (err) {
            showToast('Error: ' + err.message, 'error');
        }).finally(function () {
            btn.classList.remove('btn-loading');
            btn.innerHTML = '<i class="fas fa-save"></i> Guardar';
        });
    }

    // =============================================
    //  CATEGORIES - DELETE
    // =============================================
    window._editarCategoria = function (id) {
        openCategoryModal(id);
    };

    window._eliminarCategoria = function (id, nombre) {
        deleteId = id;
        document.getElementById('confirmMsg').textContent = '¿Eliminar categoría "' + nombre + '"? Los productos con esta categoría no se eliminarán.';
        document.getElementById('confirmDelete').classList.add('visible');
        // Override delete to use categorias collection
        document.getElementById('btnConfirmDelete').onclick = function () {
            closeConfirm();
            db.collection('categorias').doc(id).delete().then(function () {
                showToast('Categoría eliminada', 'success');
                loadCategories();
            }).catch(function (err) {
                showToast('Error: ' + err.message, 'error');
            });
        };
    };

    // =============================================
    //  UI HELPERS
    // =============================================
    function showToast(message, type) {
        var toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'admin-toast ' + (type || 'info');
        // Force reflow
        toast.offsetHeight;
        toast.classList.add('visible');
        setTimeout(function () {
            toast.classList.remove('visible');
        }, 3500);
    }

})();
