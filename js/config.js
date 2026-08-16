// ============================================
// CRYPTOPALACE CASINO - CONFIGURACIÓN
// ============================================
// [DEV-NOTE] Sistema de tokens basado en la secuencia:
// "qwertyuiopasdfghjklñzxcvbnm"
// Los tokens son fragmentos de esta secuencia.
// No compartir estos tokens con nadie.

const CASINO_CONFIG = {
    name: "CryptoPalace",
    version: "3.2.1",
    
    // Pista para los jugadores
    keyboardSequence: "qwertyuiopasdfghjklñzxcvbnm",
    
    // Endpoints de la API
    apiBase: "/Server-3/api/",
    
    endpoints: {
        auth: "auth/",
        users: "users/",
        balance: "balance/",
        games: "games/roulette/",
        withdraw: "withdraw/"
    },
    
    // Rutas ocultas (no accesibles directamente)
    hiddenRoutes: [
        "/core/",
        "/assets/",
        "/api/"
    ],
    
    // [DEV-NOTE] Los tokens siguen el patrón de la secuencia
    // Cada rol tiene un fragmento diferente
    // 
    // Guest:        ghjkuiopertysdfgtyui
    // User:         uiopsdfgertyrtyu
    // Admin:        asdfdfghmqweiopanmqwe
    // Collaborator: cvbnopaslñzxlñzxasdfbnmqopasrtyuasdftyuiopasrtyu
    // System:       sdfgyuiosdfgtyuiertymqwe
    //
    // [WARNING] No compartir estos tokens
    tokenHints: {
        guest: "Comienza con ghjk...",
        user: "Comienza con uiop...",
        admin: "Comienza con asdf...",
        collaborator: "Comienza con cvbn...",
        system: "Comienza con sdfg..."
    }
};

// Exportar configuración
window.CASINO_CONFIG = CASINO_CONFIG;
