// Interfaccia per i dati di registrazione dell'utente
interface IUserRegistrazione {
    nome: string;           // Nome dell'utente
    cognome: string;        // Cognome dell'utente
    indirizzo: string;      // Indirizzo di residenza
    codiceFiscale: string;  // Codice fiscale (16 caratteri)
    email: string;          // Email per l'accesso
    password: string;       // Password per l'accesso
}

// Interfaccia per i dati di login
interface IUserLogin {
    email: string;          // Email per il login
    password: string;       // Password per il login
}

// Interfaccia per validazione form
interface IFormValidazione {
    isValid: boolean;       // True se form è valido
    errors: string[];       // Lista degli errori trovati
}