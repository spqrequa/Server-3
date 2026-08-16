// ============================================
// CRYPTOPALACE CASINO - BALANCE MANAGER
// ============================================
// [SECURITY] Los balances se guardan en /api/balance/
// Cada usuario tiene su archivo JSON con el balance
// [VULN] IDOR: No verifica que el usuario sea quien dice ser

class BalanceManager {
    constructor(token) {
        this.token = token;
        this.balanceFile = null;
    }
    
    async getBalance() {
        console.log(`[BALANCE] Obteniendo balance para token: ${this.token}`);
        
        // Construir la ruta al archivo de balance
        this.balanceFile = `/api/balance/?token=${this.token}/index.json`;
        
        try {
            const response = await fetch(this.balanceFile);
            const data = await response.json();
            
            console.log('[BALANCE] Respuesta:', data);
            
            // [IDOR] Cualquier token puede ver el balance de cualquier usuario
            // No hay verificación de que el token corresponda al usuario
            return data;
        } catch (error) {
            console.error('[BALANCE] Error:', error);
            return null;
        }
    }
    
    // [IDOR VULN] Cualquier usuario puede "modificar" el balance de otro
    async updateBalance(newBalance, targetToken) {
        const target = targetToken || this.token;
        console.log(`[BALANCE] Actualizando balance de ${target} a ${newBalance}`);
        
        // En un entorno real, esto haría un POST/PUT
        // Aquí solo simulamos la vulnerabilidad
        return {
            status: 'UPDATED',
            token: target,
            new_balance: newBalance,
        };
    }
}
