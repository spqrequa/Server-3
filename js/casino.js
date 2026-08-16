// ============================================
// CRYPTOPALACE CASINO - CASINO CONTROLLER
// ============================================
// Lógica de la ruleta y apuestas
// [VULN] El sistema de apuestas tiene un backdoor

// Tokens válidos (se cargan desde main.js o se definen aquí)
const TOKENS = {
    guest: "ghjkuiopertysdfgtyui",
    user: "uiopsdfgertyrtyu",
    admin: "asdfdfghmqweiopanmqwe",
    collaborator: "cvbnopaslñzxlñzxasdfbnmqopasrtyuasdftyuiopasrtyu",
    system: "sdfgyuiosdfgtyuiertymqwe"
};

let currentToken = null;
let currentUser = null;
let currentRole = null;

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos de sesión
    currentToken = localStorage.getItem('casino_token');
    currentUser = localStorage.getItem('casino_user');
    currentRole = localStorage.getItem('casino_role');
    
    console.log('[CASINO] Sesión cargada:', {
        user: currentUser,
        token: currentToken,
        role: currentRole
    });
    
    // Actualizar interfaz
    document.getElementById('username').textContent = currentUser || 'invitado';
    
    // Cargar balance
    loadBalance();
});

// Cargar balance del usuario
async function loadBalance() {
    if (!currentToken) {
        console.error('[CASINO] No hay token');
        return;
    }
    
    console.log('[CASINO] Cargando balance...');
    
    try {
        const response = await fetch('api/balance/?token=' + currentToken + '/index.json');
        const data = await response.json();
        
        console.log('[CASINO] Balance:', data);
        
        // Actualizar interfaz
        document.getElementById('balance').textContent = data.balance || '0$';
        
        // Actualizar rol
        if (data.role === 'admin') {
            document.getElementById('userRole').textContent = '👑 Admin';
            document.getElementById('userRole').className = 'badge admin';
        } else if (data.role === 'guest') {
            document.getElementById('userRole').textContent = '🎲 Guest';
            document.getElementById('userRole').className = 'badge guest';
        }
    } catch (error) {
        console.error('[CASINO] Error cargando balance:', error);
    }
}

// Realizar apuesta
async function placeBet(betType) {
    const amount = document.getElementById('betAmount').value;
    
    if (!amount || amount < 1) {
        alert('Introduce una cantidad válida');
        return;
    }
    
    console.log(`[CASINO] Apostando ${amount} a ${betType}`);
    
    // Construir la ruta con el token y la apuesta
    const betEndpoint = `api/games/roulette/?token=${currentToken}&bet=${betType}&amount=${amount}/index.json`;
    
    console.log('[CASINO] Endpoint:', betEndpoint);
    
    try {
        const response = await fetch(betEndpoint);
        const data = await response.json();
        
        console.log('[CASINO] Resultado apuesta:', data);
        
        // Mostrar resultado
        showResult(data);
        
        // Actualizar balance
        if (data.new_balance) {
            document.getElementById('balance').textContent = data.new_balance;
        }
    } catch (error) {
        console.error('[CASINO] Error en la apuesta:', error);
        
        // Fallback: resultado aleatorio
        const fakeResult = {
            status: Math.random() > 0.5 ? 'WIN' : 'LOSE',
            bet: betType,
            amount: amount,
            payout: Math.random() > 0.5 ? amount * 2 : 0
        };
        showResult(fakeResult);
    }
}

// Girar la ruleta (usando el backdoor si es admin)
async function spinRoulette() {
    console.log('[CASINO] Girando ruleta...');
    
    // Si el token es de admin, usar backdoor
    if (currentToken === TOKENS.admin) {
        console.log('[CASINO] Token admin detectado. Usando backdoor...');
        
        const backdoorEndpoint = `api/games/roulette/?token=${currentToken}&bet=admin&amount=1/index.json`;
        
        try {
            const response = await fetch(backdoorEndpoint);
            const data = await response.json();
            
            console.log('[CASINO] Backdoor resultado:', data);
            showResult(data);
            
            if (data.flag) {
                document.getElementById('resultMessage').textContent += ' 🏁 Flag encontrada!';
            }
        } catch (error) {
            console.error('[CASINO] Error backdoor:', error);
        }
        
        return;
    }
    
    // Apuesta normal
    placeBet('red');
}

// Mostrar resultado
function showResult(data) {
    const resultPanel = document.getElementById('resultPanel');
    const resultMessage = document.getElementById('resultMessage');
    const resultAmount = document.getElementById('resultAmount');
    
    resultPanel.style.display = 'block';
    
    if (data.status === 'WIN') {
        resultMessage.textContent = '🎉 ¡Has ganado!';
        resultMessage.style.color = '#3fb950';
    } else if (data.status === 'LOSE') {
        resultMessage.textContent = '😢 Has perdido';
        resultMessage.style.color = '#f85149';
    } else {
        resultMessage.textContent = data.message || 'Resultado desconocido';
        resultMessage.style.color = '#8b949e';
    }
    
    resultAmount.textContent = `Payout: ${data.payout || 0}$`;
    
    // Si hay flag en la respuesta
    if (data.flag) {
        resultAmount.textContent += ` | FLAG: ${data.flag}`;
    }
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('casino_user');
    localStorage.removeItem('casino_token');
    localStorage.removeItem('casino_role');
    window.location.href = 'index.html';
}
