/**
 * Interfaccia per il risultato della validazione della password
 */
interface PasswordValidationResult {
    isValid: boolean;
    message: string;
}

/**
 * Mappa per i caratteri del codice fiscale
 */
type CharacterMap = Record<string, number>;

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
    public static controllaRangeStringa(stringa: string, min: number | null = null, max: number | null = null): boolean {
        let rit: number = 0;
        const n: number = stringa.length;

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
    public static validaEMail(mail: string): boolean {
        const emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        return emailRegex.test(mail);
    }

    /**
     * Valida il codice fiscale italiano
     * 
     * @param codiceFiscale Codice fiscale da validare
     * @returns true se il codice fiscale è valido
     */
    public static validaCodiceFiscale(codiceFiscale: string): boolean {
        // Rimuove spazi e converte in maiuscolo
        const cf: string = codiceFiscale.replace(/\s/g, '').toUpperCase();

        // Controlla lunghezza
        if (cf.length !== 16) {
            return false;
        }

        // Pattern per codice fiscale italiano: 6 lettere + 2 numeri + 1 lettera + 2 numeri + 1 lettera + 3 numeri + 1 lettera
        const pattern: RegExp = /^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/;
        if (!pattern.test(cf)) {
            return false;
        }

        // Calcolo carattere di controllo
        const controlChars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        // Mappa per caratteri in posizione dispari (1, 3, 5, 7, 9, 11, 13, 15)
        const oddMap: CharacterMap = {
            '0': 1, '1': 0, '2': 5, '3': 7, '4': 9, '5': 13, '6': 15, '7': 17, '8': 19, '9': 21,
            'A': 1, 'B': 0, 'C': 5, 'D': 7, 'E': 9, 'F': 13, 'G': 15, 'H': 17, 'I': 19, 'J': 21,
            'K': 2, 'L': 4, 'M': 18, 'N': 20, 'O': 11, 'P': 3, 'Q': 6, 'R': 8, 'S': 12, 'T': 14,
            'U': 16, 'V': 10, 'W': 22, 'X': 25, 'Y': 24, 'Z': 23
        };

        // Mappa per caratteri in posizione pari (2, 4, 6, 8, 10, 12, 14)
        const evenMap: CharacterMap = {
            '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
            'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9,
            'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19,
            'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25
        };

        let sum: number = 0;

        // Calcola la somma dei primi 15 caratteri
        for (let i = 0; i < 15; i++) {
            const char: string = cf[i];
            if (i % 2 === 0) {
                // Posizione dispari (1°, 3°, 5°, ecc.)
                sum += oddMap[char];
            } else {
                // Posizione pari (2°, 4°, 6°, ecc.)
                sum += evenMap[char];
            }
        }

        // Calcola il carattere di controllo atteso
        const expectedControl: string = controlChars[sum % 26];

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
    public static validaPassword(
        password: string,
        minLength: number = 8,
        requireUppercase: boolean = true,
        requireNumber: boolean = true,
        requireSpecialChar: boolean = false
    ): PasswordValidationResult {
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