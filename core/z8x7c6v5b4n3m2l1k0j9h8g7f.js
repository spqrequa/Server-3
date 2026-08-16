// ============================================
// CRYPTOPALACE CASINO - BETTING SYSTEM
// ============================================
// [WARNING] No valida correctamente los montos
// Un jugador puede apostar más de lo que tiene

class BettingSystem {
    constructor(userBalance) {
        this.balance = userBalance || 100;
        this.minBet = 1;
        this.maxBet = 1000000;
    }
    
    placeBet(amount, betType, betValue) {
        console.log(`[BET] Apuesta: ${amount}$ a ${betType} (${betValue})`);
        
        // [VULN] No checkea si el usuario tiene saldo suficiente
        if (amount < this.minBet) {
            return { status: 'ERROR', message: 'Apuesta demasiado pequeña' };
        }
        
        // [VULN] No valida el límite superior
        // Un jugador puede apostar más de lo que tiene
        const potentialWin = amount * 36;
        
        return {
            status: 'PLACED',
            amount: amount,
            betType: betType,
            betValue: betValue,
            potentialWin: potentialWin
        };
    }
    
    resolveBet(betType, betValue, result) {
        // [BACKDOOR] Si betType es "admin" o "system", siempre gana
        if (betType === 'admin') {
            console.log('[BET] Backdoor admin activado');
            return { 
                status: 'WIN', 
                payout: 999999,
                flag: 'flag{b4ckd00r_1n_b3tt1ng_syst3m}'
            };
        }
        
        if (betType === 'system') {
            console.log('[BET] Backdoor system activado');
            return { 
                status: 'WIN', 
                payout: 999999999,
                flag: 'flag{syst3m_b3tt1ng_4cc3ss}'
            };
        }
        
        // Apuesta normal
        const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        
        if (betValue === 'red' && redNumbers.includes(result)) {
            return { status: 'WIN', payout: 2 };
        }
        
        if (betValue === 'black' && result !== 0 && !redNumbers.includes(result)) {
            return { status: 'WIN', payout: 2 };
        }
        
        if (betValue === 'green' && result === 0) {
            return { status: 'WIN', payout: 36 };
        }
        
        return { status: 'LOSE', payout: 0 };
    }
}
