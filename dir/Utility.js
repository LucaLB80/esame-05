/**
 * Classe di utilità per validazioni
 * @author Basta luca
 * @copyright 2024
 * @license LGPL
 * @version 1.0.0
 */
class Utility {
    /**
     * Verifica lunghezza stringa
     *
     * @param stringa Stringa da controllare
     * @param min Lunghezza minima
     * @param max Lunghezza massima
     * @returns true se la stringa rispetta i parametri di lunghezza
     */
    static controllaRangeStringa(stringa, min = null, max = null) {
        let rit = 0;
        const n = stringa.length;
        if (min !== null && n < min) {
            rit++;
        }
        if (max !== null && n > max) {
            rit++;
        }
        return (rit === 0);
    }
    /**
     * Controlla se è una mail valida
     *
     * @param mail Email da controllare
     * @returns true se l'email è valida
     */
    static validaEMail(mail) {
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        return emailRegex.test(mail);
    }
    /**
     * Valida il codice fiscale italiano
     *
     * @param codiceFiscale Codice fiscale da validare
     * @returns true se il codice fiscale è valido
     */
    static validaCodiceFiscale(codiceFiscale) {
        // Rimuove spazi e converte in maiuscolo
        const cf = codiceFiscale.replace(/\s/g, '').toUpperCase();
        // Controlla lunghezza
        if (cf.length !== 16) {
            return false;
        }
        // Pattern per codice fiscale italiano: 6 lettere + 2 numeri + 1 lettera + 2 numeri + 1 lettera + 3 numeri + 1 lettera
        const pattern = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/;
        if (!pattern.test(cf)) {
            return false;
        }
        // Calcolo carattere di controllo
        const controlChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // Mappa per caratteri in posizione dispari (1, 3, 5, 7, 9, 11, 13, 15)
        const oddMap = {
            '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
            'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
            'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
            'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
        };
        // Mappa per caratteri in posizione pari (2, 4, 6, 8, 10, 12, 14)
        const evenMap = {
            '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
            'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
            'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19,
            'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
        };
        let sum = 0;
        // Calcola la somma dei primi 15 caratteri
        for (let i = 0; i < 15; i++) {
            const char = cf[i];
            if (i % 2 === 0) {
                // Posizione dispari (1°, 3°, 5°, ecc.)
                sum += oddMap[char];
            }
            else {
                // Posizione pari (2°, 4°, 6°, ecc.)
                sum += evenMap[char];
            }
        }
        // Calcola il carattere di controllo atteso
        const expectedControl = controlChars[sum % 26];
        // Verifica se il carattere di controllo corrisponde
        return cf[15] === expectedControl;
    }
    /**
     * Valida la password secondo criteri di sicurezza
     *
     * @param password Password da validare
     * @param minLength Lunghezza minima (default: 8)
     * @param requireUppercase Richiede almeno una maiuscola (default: true)
     * @param requireNumber Richiede almeno un numero (default: true)
     * @param requireSpecialChar Richiede almeno un carattere speciale (default: false)
     * @returns Oggetto con isValid (boolean) e message (string)
     */
    static validaPassword(password, minLength = 8, requireUppercase = true, requireNumber = true, requireSpecialChar = false) {
        // Controllo se la password è vuota
        if (!password || password.trim() === '') {
            return {
                isValid: false,
                message: "La password è obbligatoria"
            };
        }
        // Controllo lunghezza minima
        if (password.length < minLength) {
            return {
                isValid: false,
                message: `La password deve essere di almeno ${minLength} caratteri`
            };
        }
        // Controllo presenza di maiuscole
        if (requireUppercase && !/[A-Z]/.test(password)) {
            return {
                isValid: false,
                message: "La password deve contenere almeno una lettera maiuscola"
            };
        }
        // Controllo presenza di numeri
        if (requireNumber && !/[0-9]/.test(password)) {
            return {
                isValid: false,
                message: "La password deve contenere almeno un numero"
            };
        }
        // Controllo presenza di caratteri speciali
        if (requireSpecialChar && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            return {
                isValid: false,
                message: "La password deve contenere almeno un carattere speciale (!@#$%^&*...)"
            };
        }
        return {
            isValid: true,
            message: "Password valida"
        };
    }
}
export default Utility;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXRpbGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL1V0aWxpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYUE7Ozs7OztHQU1HO0FBQ0gsTUFBTSxPQUFPO0lBRVQ7Ozs7Ozs7T0FPRztJQUNJLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxPQUFlLEVBQUUsTUFBcUIsSUFBSSxFQUFFLE1BQXFCLElBQUk7UUFDckcsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxHQUFXLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFFakMsSUFBSSxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUMxQixHQUFHLEVBQUUsQ0FBQztRQUNWLENBQUM7UUFDRCxJQUFJLEdBQUcsS0FBSyxJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQzFCLEdBQUcsRUFBRSxDQUFDO1FBQ1YsQ0FBQztRQUVELE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFZO1FBQ2xDLE1BQU0sVUFBVSxHQUFXLCtDQUErQyxDQUFDO1FBQzNFLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsbUJBQW1CLENBQUMsYUFBcUI7UUFDbkQsd0NBQXdDO1FBQ3hDLE1BQU0sRUFBRSxHQUFXLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRWxFLHNCQUFzQjtRQUN0QixJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDbkIsT0FBTyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVELHNIQUFzSDtRQUN0SCxNQUFNLE9BQU8sR0FBVyxtREFBbUQsQ0FBQztRQUM1RSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFFRCxpQ0FBaUM7UUFDakMsTUFBTSxZQUFZLEdBQVcsNEJBQTRCLENBQUM7UUFFMUQsdUVBQXVFO1FBQ3ZFLE1BQU0sTUFBTSxHQUFpQjtZQUN6QixHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNuRixHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNuRixHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUNuRixHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7U0FDdkQsQ0FBQztRQUVGLGlFQUFpRTtRQUNqRSxNQUFNLE9BQU8sR0FBaUI7WUFDMUIsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDOUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFDOUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUU7WUFDeEYsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxFQUFFO1NBQ3ZELENBQUM7UUFFRixJQUFJLEdBQUcsR0FBVyxDQUFDLENBQUM7UUFFcEIsMENBQTBDO1FBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMxQixNQUFNLElBQUksR0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2dCQUNkLHVDQUF1QztnQkFDdkMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QixDQUFDO2lCQUFNLENBQUM7Z0JBQ0osb0NBQW9DO2dCQUNwQyxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pCLENBQUM7UUFDTCxDQUFDO1FBRUQsMkNBQTJDO1FBQzNDLE1BQU0sZUFBZSxHQUFXLFlBQVksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFdkQsb0RBQW9EO1FBQ3BELE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLGVBQWUsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0ksTUFBTSxDQUFDLGNBQWMsQ0FDeEIsUUFBZ0IsRUFDaEIsWUFBb0IsQ0FBQyxFQUNyQixtQkFBNEIsSUFBSSxFQUNoQyxnQkFBeUIsSUFBSSxFQUM3QixxQkFBOEIsS0FBSztRQUVuQyxtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDdEMsT0FBTztnQkFDSCxPQUFPLEVBQUUsS0FBSztnQkFDZCxPQUFPLEVBQUUsNEJBQTRCO2FBQ3hDLENBQUM7UUFDTixDQUFDO1FBRUQsNkJBQTZCO1FBQzdCLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxTQUFTLEVBQUUsQ0FBQztZQUM5QixPQUFPO2dCQUNILE9BQU8sRUFBRSxLQUFLO2dCQUNkLE9BQU8sRUFBRSxxQ0FBcUMsU0FBUyxZQUFZO2FBQ3RFLENBQUM7UUFDTixDQUFDO1FBRUQsa0NBQWtDO1FBQ2xDLElBQUksZ0JBQWdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDOUMsT0FBTztnQkFDSCxPQUFPLEVBQUUsS0FBSztnQkFDZCxPQUFPLEVBQUUseURBQXlEO2FBQ3JFLENBQUM7UUFDTixDQUFDO1FBRUQsK0JBQStCO1FBQy9CLElBQUksYUFBYSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO1lBQzNDLE9BQU87Z0JBQ0gsT0FBTyxFQUFFLEtBQUs7Z0JBQ2QsT0FBTyxFQUFFLDZDQUE2QzthQUN6RCxDQUFDO1FBQ04sQ0FBQztRQUVELDJDQUEyQztRQUMzQyxJQUFJLGtCQUFrQixJQUFJLENBQUMsdUNBQXVDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDaEYsT0FBTztnQkFDSCxPQUFPLEVBQUUsS0FBSztnQkFDZCxPQUFPLEVBQUUsdUVBQXVFO2FBQ25GLENBQUM7UUFDTixDQUFDO1FBRUQsT0FBTztZQUNILE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLGlCQUFpQjtTQUM3QixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBRUQsZUFBZSxPQUFPLENBQUMifQ==