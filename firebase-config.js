/*
 * =============================================
 *  Diegu's Fashion - Configuración Firebase
 * =============================================
 *
 * INSTRUCCIONES (solo se hace UNA vez):
 *
 * 1. Ve a https://console.firebase.google.com/
 * 2. Clic en "Agregar proyecto" → nombre: DiegusFashion → Crear
 * 3. En el panel izquierdo configura estos 3 servicios:
 *
 *    a) Authentication → Comenzar → Email/Password → Habilitar → Guardar
 *       Luego ve a la pestaña "Usuarios" → "Agregar usuario"
 *       → pon TU email y una contraseña segura (este será tu login de admin)
 *
 *    b) Firestore Database → Crear base de datos → Modo de prueba → Crear
 *
 *    c) Storage → Comenzar → Modo de prueba → Listo
 *
 * 4. Ve a ⚙ Configuración del proyecto → General
 *    → baja hasta "Tus apps" → clic en el ícono web (</>)
 *    → nombre: "DiegusFashion" → Registrar app
 *    → Copia los valores y pégalos aquí abajo
 *
 * 5. Abre admin.html en el navegador → inicia sesión → clic en "Cargar datos iniciales"
 *    Eso sube los 8 productos actuales a Firebase y ya puedes agregar más desde el panel.
 */

var FIREBASE_CONFIG = {
    apiKey: "AIzaSyB53ky6tnYhJFg_YdMkVur-2OXeF53lM8c",
    authDomain: "diegusfashion-98961.firebaseapp.com",
    projectId: "diegusfashion-98961",
    storageBucket: "diegusfashion-98961.firebasestorage.app",
    messagingSenderId: "202712436202",
    appId: "1:202712436202:web:c467bd2d9a1efa57553693"
};

// --- Inicializar Firebase (solo si está configurado) ---
var db = null;
var auth = null;

if (typeof firebase !== 'undefined' && FIREBASE_CONFIG.apiKey !== "PEGA_TU_API_KEY") {
    firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore();
    auth = firebase.auth();
}
