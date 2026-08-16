// ============================================
// CRYPTOPALACE CASINO - ROULETTE ENGINE
// ============================================
// [BUG] El RNG usa timestamp como semilla
// Esto hace que sea predecible

class RouletteEngine {
    constructor() {
        this.numbers = [
            0, 32, 15, 19, 4, 21, 2, 25, 17, 34,
            6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
            24, 16, 33, 1, 20, 14, 31, 9, 22, 18,
            29, 7, 28, 12, 35, 3, 26
        ];
        this.lastResult = null;
        this.spinCount = 0;
    }
    
    spin() {
        // [VULN] Semilla basada en timestamp
        // Un atacante puede predecir el resultado
        const seed = Math.floor(Date.now() / 1000);
        const pseudoRandom = (seed * 9301 + 49297) % 233280;
        const result = this.numbers[pseudoRandom % this.numbers.length];
        
        this.lastResult = result;
        this.spinCount++;
        
        console.log(`[RNG] Giro #${this.spinCount}: ${result} (seed: ${seed})`);
        
        return result;
    }
    
    checkWin(bet, result) {
        const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        
        if (bet === 'red' && redNumbers.includes(result)) {
            return { win: true, payout: 2 };
        }
        
        if (bet === 'black' && result !== 0 && !redNumbers.includes(result)) {
            return { win: true, payout: 2 };
        }
        
        if (bet === 'green' && result === 0) {
            return { win: true, payout: 36 };
        }
        
        return { win: false, payout: 0 };
    }
    
    // [BACKDOOR] Para debugging: si bet es "admin", siempre gana
    resolveBet(betType, betValue, result) {
        if (betType === 'admin') {
            console.log('[RNG] Backdoor admin activado. Siempre gana.');
            return { status: 'WIN', payout: 999999 };
        }
        
        if (betType === 'system') {
            console.log('[RNG] Backdoor system activado. Siempre gana.');
            return { status: 'WIN', payout: 999999999 };
        }
        
        const result = this.checkWin(betValue, result);
        return {
            status: result.win ? 'WIN' : 'LOSE',
            payout: result.payout
        };
    }
}
