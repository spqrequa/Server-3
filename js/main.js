// ============================================
// CRYPTOPALACE CASINO - AUTH CONTROLLER
// ============================================
// [DEV-NOTE] Sistema de tokens basado en la secuencia:
// "qwertyuiopasdfghjklñzxcvbnm"
// Los tokens son fragmentos de esta secuencia.
// No compartir estos tokens con nadie.

// Tokens de los roles (se descubren poco a poco)
const VALID_TOKENS = {
    guest: "ghjkuiopertysdfgtyui",
    user: "uiopsdfgertyrtyu",
    admin: "asdfdfghmqweiopanmqwe",
    collaborator: "cvbnopaslñzxlñzxasdfbnmqopasrtyuasdftyuiopasrtyu",
    system: "sdfgyuiosdfgtyuiertymqwe"
};

// Función para login estándar
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    
    if (username && password) {
        // Simulación de login exitoso
        errorMsg.style.display = 'none';
        
        // Guardar sesión como guest (por defecto)
        localStorage.setItem('casino_user', username);
        localStorage.setItem('casino_token', VALID_TOKENS.guest);
        localStorage.setItem('casino_role', 'guest');
        
        // Redirigir al casino
        window.location.href = 'casino.html';
    } else {
        errorMsg.style.display = 'block';
    }
}

// Función para el modo invitado
function guestLogin() {
    console.log('[AUTH] Accediendo como invitado...');
    
    // Simular petición a la API
    fetch('api/auth/?token=' + VALID_TOKENS.guest + '/index.json')
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                localStorage.setItem('casino_user', data.username);
                localStorage.setItem('casino_token', data.token);
                localStorage.setItem('casino_role', data.role);
                
                console.log('[AUTH] Sesión de invitado:', data);
                
                window.location.href = 'casino.html';
            }
        })
        .catch(err => {
            console.error('[AUTH] Error:', err);
            // Fallback: entrar directamente
            localStorage.setItem('casino_user', 'guest');
            localStorage.setItem('casino_token', VALID_TOKENS.guest);
            localStorage.setItem('casino_role', 'guest');
            window.location.href = 'casino.html';
        });
}

// Función para validar token contra la API
async function validateToken(token) {
    console.log('[AUTH] Validando token:', token);
    
    try {
        const response = await fetch('api/auth/?token=' + token + '/index.json');
        const data = await response.json();
        console.log('[AUTH] Respuesta:', data);
        return data;
    } catch (error) {
        console.error('[AUTH] Error validando token:', error);
        return null;
    }
}
