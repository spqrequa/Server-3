# Server #3 - CryptoPalace Casino

Servidor de pruebas para bug bounty, robo simulado de fondos y hacking web en un entorno estático.
Un casino online vulnerable donde el jugador debe hackear el sistema para retirar todo el dinero posible.

---



---

## Estructura

| Ruta | Descripción | Acceso |
|------|-------------|--------|
| `casino.html` | Casino principal con juegos | Público |
| `withdraw.html` | Panel de retiro BTC | Público |
| `api/` | API simulada con tokens | 🔒 Oculto |
|` api/balance/` | Saldo de cada token | 🔒 Oculto |
| `api/users/` | Información de usuarios | 🔒 Oculto |
| `api/games/` | Configuración de juegos | 🔒 Oculto |
| `api/withdraw/ `| Respuestas de retiro | 🔒 Oculto |
|` api/auth/` | Tokens y roles | Oculto |
|` core/ `| Lógica del núcleo | 🔒 Oculto |
|` js/ `| Scripts del casino | Interno |
|` assets/` | Recursos estáticos | Público |

---

## Tokens

| Token | Rol |
|-------|-----|
| token_ghjkuiopertysdfgtyui | Guest |
| token_asdfdfghmqweiopanmqwe | Admin |
| token_cvbnopaslñzxlñzxasdfbnmqopasrtyuasdftyuiopasrtyu | Collaborator |
| token_sdfgyuiosdfgtyuiertymqwe | System |
| token_uiopsdfgertyrtyu | User |

---

## 📝 Writeup

Lee el writeup completo en Medium: Server-3: CryptoPalace Casino - Walkthrough

---

> [!NOTE]
> Algunos endpoints contienen información interna.  
Usa F12 para inspeccionar la red y el código fuente.  
Los tokens y flags están ocultos en el sistema.  
Solo para pruebas éticas.  

