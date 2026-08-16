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
    
    // Construir endpoint con la estructura correcta
    const endpoint = `api/withdraw/token_${token}_wallet_${destWallet}_flag_${flag}/index.json`;
    console.log('[WITHDRAW] Endpoint:', endpoint);
    
    // Mostrar pantalla de carga
    document.getElementById('withdrawForm').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    
    try {
        // Simular delay de procesamiento (3 segundos)
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Hacer la petición
        const response = await fetch(endpoint);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        console.log('[WITHDRAW] Respuesta:', data);
        
        // Ocultar loading
        document.getElementById('loading').style.display = 'none';
        
        if (data.status === 'SUCCESS') {
            // Mostrar transacción completada
            document.getElementById('complete').style.display = 'block';
            document.getElementById('txId').textContent = data.tx_id || 'TX_ID_DESCONOCIDO';
            document.getElementById('txAmount').textContent = data.amount || 'CANTIDAD_DESCONOCIDA';
            document.getElementById('txWallet').textContent = destWallet;
            
            // Si hay flag en la respuesta, mostrarla
            if (data.flag) {
                console.log('[WITHDRAW] Flag final encontrada:', data.flag);
                document.getElementById('finalFlag').textContent = '🏁 ' + data.flag;
            }
        } else {
            // Flag incorrecta o error
            showError(data.message || 'Flag incorrecta. El retiro no se ha completado.');
            document.getElementById('withdrawForm').style.display = 'block';
        }
    } catch (error) {
        console.error('[WITHDRAW] Error:', error);
        showError('Error en la transacción. Inténtalo de nuevo.');
        document.getElementById('loading').style.display = 'none';
        document.getElementById('withdrawForm').style.display = 'block';
    }
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
