// ============================================
// CRYPTOPALACE CASINO - WITHDRAW CONTROLLER
// ============================================
// Sistema de retiro BTC
// [SECURITY] Requiere flag de confirmación

// Cargar wallet del jugador al entrar
document.addEventListener('DOMContentLoaded', function() {
    const playerWallet = localStorage.getItem('player_wallet') || 'bc1q_cryptopalace_player_wallet';
    document.getElementById('playerWallet').value = playerWallet;
    
    console.log('[WITHDRAW] Página de retiro cargada');
    console.log('[WITHDRAW] Wallet del jugador:', playerWallet);
});

// Función principal de retiro
async function withdraw() {
    // Obtener datos del formulario
    const destWallet = document.getElementById('destWallet').value.trim();
    const flag = document.getElementById('flagInput').value.trim();
    
    // Ocultar error anterior
    document.getElementById('errorBox').style.display = 'none';
    
    // Validar que los campos no estén vacíos
    if (!destWallet) {
        showError('Introduce la wallet de destino');
        return;
    }
    
    if (!flag) {
        showError('Introduce la flag de confirmación');
        return;
    }
    
    // Obtener token de sesión
    const token = localStorage.getItem('casino_token') || 'ghjkuiopertysdfgtyui';
    
    console.log('[WITHDRAW] Intentando retiro...');
    console.log('[WITHDRAW] Token:', token);
    console.log('[WITHDRAW] Wallet destino:', destWallet);
    console.log('[WITHDRAW] Flag introducida:', flag);
    
    // Mostrar pantalla de carga
    document.getElementById('withdrawForm').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    
    // Simular delay de procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Ocultar loading
    document.getElementById('loading').style.display = 'none';
    
    // Validar token de admin
    if (token !== 'asdfdfghmqweiopanmqwe') {
        showError('No tienes permisos para retirar fondos con este token. Se requiere token de administrador.');
        return;
    }
    
    // Validar flag de confirmación
    if (flag !== 'flag{uwfg8w7egfw87gfwwfge7gfwua7egfw7awfg}') {
        showError('Flag de confirmación incorrecta. El retiro no se ha completado.');
        return;
    }
    
    // Si todo es correcto, mostrar transacción completada
    document.getElementById('complete').style.display = 'block';
    document.getElementById('txId').textContent = '3f8a2b9c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f';
    document.getElementById('txAmount').textContent = '999999$';
    document.getElementById('txWallet').textContent = destWallet;
    
    // Mostrar flag final
    const flagFinal = 'flag{udibciabuefw8eg7wegf8pgfbakpfgñcfspkñ}';
    document.getElementById('finalFlag').textContent = '🏁 ' + flagFinal;
    
    console.log('[WITHDRAW] Transacción completada');
    console.log('[WITHDRAW] Flag final:', flagFinal);
}

// Función para mostrar errores
function showError(message) {
    const errorBox = document.getElementById('errorBox');
    const errorMessage = document.getElementById('errorMessage');
    
    errorMessage.textContent = message;
    errorBox.style.display = 'block';
    
    // Ocultar loading si está visible
    document.getElementById('loading').style.display = 'none';
    
    // Mostrar formulario si está oculto
    document.getElementById('withdrawForm').style.display = 'block';
    
    // Auto-ocultar error después de 5 segundos
    setTimeout(() => {
        errorBox.style.display = 'none';
    }, 5000);
}
