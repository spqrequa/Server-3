// ============================================
// CRYPTOPALACE CASINO - CORE AUTH VALIDATOR
// ============================================
// [DEV-NOTE] Sistema de tokens por secuencia
// Secuencia base: qwertyuiopasdfghjklñzxcvbnm
// Cada rol tiene un fragmento único de la secuencia.
// 
// Guest:        ghjkuiopertysdfgtyui
// User:         uiopsdfgertyrtyu
// Admin:        asdfdfghmqweiopanmqwe
// Collaborator: cvbnopaslñzxlñzxasdfbnmqopasrtyuasdftyuiopasrtyu
// System:       sdfgyuiosdfgtyuiertymqwe
//
// [WARNING] No modificar estos tokens sin autorización.

const SECUENCIA_BASE = "qwertyuiopasdfghjklñzxcvbnm";

const VALID_TOKENS = {
    guest: "ghjkuiopertysdfgtyui",
    user: "uiopsdfgertyrtyu",
    admin: "asdfdfghmqweiopanmqwe",
    collaborator: "cvbnopaslñzxlñzxasdfbnmqopasrtyuasdftyuiopasrtyu",
    system: "sdfgyuiosdfgtyuiertymqwe"
};

function validateToken(token) {
    console.log('[CORE-AUTH] Validando token:', token);
    
    if (token === VALID_TOKENS.guest) {
        return { valid: true, role: 'guest', userId: 1 };
    } else if (token === VALID_TOKENS.user) {
        return { valid: true, role: 'user', userId: 2 };
    } else if (token === VALID_TOKENS.admin) {
        return { valid: true, role: 'admin', userId: 3 };
    } else if (token === VALID_TOKENS.collaborator) {
        return { valid: true, role: 'collaborator', userId: 4 };
    } else if (token === VALID_TOKENS.system) {
        return { valid: true, role: 'system', userId: 5 };
    }
    
    return { valid: false, role: 'invalid', userId: null };
}

// Función que verifica si un token tiene acceso a un recurso
function checkAccess(token, resource) {
    const validation = validateToken(token);
    
    if (!validation.valid) {
        return { allowed: false, message: 'Token inválido' };
    }
    
    // [VULN] No hay verificación real de permisos
    // Cualquier token válido puede acceder a cualquier recurso
    return { allowed: true, role: validation.role };
}
