// ============================================
// CRYPTOPALACE CASINO - ROT13 HANDLER
// ============================================
// [NOTE] El casino usa ROT13 para "proteger" datos
// Esto es ofuscación, no seguridad real.

const ROT13Handler = {
    encrypt(text) {
        return text.replace(/[a-zA-Z]/g, function(c) {
            return String.fromCharCode(
                (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) 
                    ? c 
                    : c - 26
            );
        });
    },
    
    decrypt(text) {
        // ROT13 es simétrico
        return this.encrypt(text);
    },
    
    decodeJSON(jsonData) {
        const decoded = {};
        for (let key in jsonData) {
            const decodedKey = this.decrypt(key);
            const decodedValue = this.decrypt(jsonData[key]);
            decoded[decodedKey] = decodedValue;
        }
        return decoded;
    }
};

// Datos cifrados de ejemplo
// "nqzva" = "admin"
// "onyrapr" = "balance"
// "ynt" = "flag"

// Flag escondida
// flag{doifhw9e8hfw9è8fhwi`9fe8hwg8`9ehg89fg98fgi}
