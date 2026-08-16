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

// Función para ir a la página de retiro
function goToWithdraw() {
    console.log('[AUTH] Navegando a retiro BTC...');
    window.location.href = 'withdraw.html';
}

// Función para login estándar
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('errorMsg');
    
    if (username && password) {
        errorMsg.style.display = 'none';
        
        // Guardar sesión como guest (por defecto)
        localStorage.setItem('casino_user', username);
        localStorage.setItem('casino_token', VALID_TOKENS.guest);
        localStorage.setItem('casino_role', 'guest');
        localStorage.setItem('player_wallet', 'bc1q_' + username + '_cryptopalace');
        
        console.log('[AUTH] Sesión iniciada:', {
            user: username,
            token: VALID_TOKENS.guest,
            role: 'guest',
            wallet: localStorage.getItem('player_wallet')
        });
        
        // Redirigir al casino
        window.location.href = 'casino.html';
    } else {
        errorMsg.style.display = 'block';
    }
}

// Función para el modo invitado
function guestLogin() {
    console.log('[AUTH] Accediendo como invitado...');
    
    // Fetch al endpoint con la estructura correcta
    fetch('api/auth/token_' + VALID_TOKENS.guest + '/index.json')
        .then(res => res.json())
        .then(data => {
            if (data.status === 'success') {
                localStorage.setItem('casino_user', data.username);
                localStorage.setItem('casino_token', data.token);
                localStorage.setItem('casino_role', data.role);
                localStorage.setItem('player_wallet', 'bc1q_guest_cryptopalace_wallet');
                
                console.log('[AUTH] Sesión de invitado:', data);
                console.log('[AUTH] Wallet:', localStorage.getItem('player_wallet'));
                
                window.location.href = 'casino.html';
            }
        })
        .catch(err => {
            console.error('[AUTH] Error:', err);
            // Fallback: entrar directamente
            localStorage.setItem('casino_user', 'guest');
            localStorage.setItem('casino_token', VALID_TOKENS.guest);
            localStorage.setItem('casino_role', 'guest');
            localStorage.setItem('player_wallet', 'bc1q_guest_cryptopalace_wallet');
            window.location.href = 'casino.html';
        });
}
