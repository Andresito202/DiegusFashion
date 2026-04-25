/*
 * =============================================
 *  Diegu's Fashion - ConfiguraciÃ³n Firebase
 * =============================================
 *
 * INSTRUCCIONES (solo se hace UNA vez):
 *
 * 1. Ve a https://console.firebase.google.com/
 * 2. Clic en "Agregar proyecto" â†’ nombre: DiegusFashion â†’ Crear
 * 3. En el panel izquierdo configura estos 3 servicios:
 *
 *    a) Authentication â†’ Comenzar â†’ Email/Password â†’ Habilitar â†’ Guardar
 *       Luego ve a la pestaÃ±a "Usuarios" â†’ "Agregar usuario"
 *       â†’ pon TU email y una contraseÃ±a segura (este serÃ¡ tu login de admin)
 *
 *    b) Firestore Database â†’ Crear base de datos â†’ Modo de prueba â†’ Crear
 *
 *    c) Storage â†’ Comenzar â†’ Modo de prueba â†’ Listo
 *
 * 4. Ve a âš™ ConfiguraciÃ³n del proyecto â†’ General
 *    â†’ baja hasta "Tus apps" â†’ clic en el Ã­cono web (</>)
 *    â†’ nombre: "DiegusFashion" â†’ Registrar app
 *    â†’ Copia los valores y pÃ©galos aquÃ­ abajo
 *
 * 5. Abre admin.html en el navegador â†’ inicia sesiÃ³n â†’ clic en "Cargar datos iniciales"
 *    Eso sube los 8 productos actuales a Firebase y ya puedes agregar mÃ¡s desde el panel.
 */

var FIREBASE_CONFIG = {
    apiKey: "PEGA_TU_API_KEY",
    authDomain: "demo-proyecto.firebaseapp.com",
    projectId: "demo-proyecto",
    storageBucket: "demo-proyecto.firebasestorage.app",
    messagingSenderId: "000000000000",
    appId: "1:000000000000:web:0000000000000000000000"
};

// --- Inicializar Firebase (solo si estÃ¡ configurado) ---
var db = null;
var auth = null;

if (typeof firebase !== 'undefined' && FIREBASE_CONFIG.apiKey !== "PEGA_TU_API_KEY") {
    firebase.initializeApp(FIREBASE_CONFIG);
    db = firebase.firestore();
    auth = firebase.auth();
}

