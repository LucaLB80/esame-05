/// <reference path="interfaceDati.ts" />  
// import { IUserRegistrazione } from './interfaceDati.js';  // ← Import normale
import Utility from './Utility.js';

// Script TypeScript
window.onload = function (): void {
    const UT = Utility;

    const form = document.getElementById("registrationForm") as HTMLFormElement;
    const bott = document.getElementById("registrati") as HTMLButtonElement;

    // ✅ TOGGLE PASSWORD 
    const toggleBtn = document.getElementById("togglePassword") as HTMLButtonElement;
    const passwordInput = document.getElementById("password") as HTMLInputElement;

    if (toggleBtn && passwordInput) {
        toggleBtn.onclick = function (): void {
            if (passwordInput.type === "password") {
                // Password è nascosta → la rendo visibile
                passwordInput.type = "text";
                console.log("Password ora VISIBILE");

                const icon = (this as HTMLElement).querySelector("i");
                if (icon) {
                    icon.className = "bi bi-eye";  // Password VISIBILE → Occhio aperto
                }
            } else {
                // Password è visibile → la nascondo
                passwordInput.type = "password";
                console.log("Password ora NASCOSTA");

                const icon = (this as HTMLElement).querySelector("i");
                if (icon) {
                    icon.className = "bi bi-eye-slash"; // Password NASCOSTA → Occhio barrato 
                }
            }
        };
    }
    bott.onclick = function (e: Event): void {
        e.preventDefault();
        console.log("submit");

        // Reset errori precedenti
        document.querySelectorAll('.form-control').forEach((input: Element) => {
            input.classList.remove('is-invalid');
        });


        let valido: number = 0;

        // VALIDAZIONE NOME
        const nome: string = (document.getElementById("nome") as HTMLInputElement).value;
        const nomeValido: boolean = nome != null && nome != "" && UT.controllaRangeStringa(nome, 2, 25);

        if (!nomeValido) {
            valido++;
            document.getElementById("nome")!.classList.add("is-invalid");
            console.log("Nome non valido:", nome);
        }

        // VALIDAZIONE COGNOME
        const cognome: string = (document.getElementById("cognome") as HTMLInputElement).value;
        const cognomeValido: boolean = cognome != null && cognome != "" && UT.controllaRangeStringa(cognome, 2, 25);

        if (!cognomeValido) {
            valido++;
            document.getElementById("cognome")!.classList.add("is-invalid");
            console.log("Cognome non valido:", cognome);
        }

        // VALIDAZIONE INDIRIZZO
        const indirizzo: string = (document.getElementById("indirizzo") as HTMLInputElement).value;
        const indirizzoValido: boolean = indirizzo != null && indirizzo != "" && UT.controllaRangeStringa(indirizzo, 5, 100);

        if (!indirizzoValido) {
            valido++;
            document.getElementById("indirizzo")!.classList.add("is-invalid");
            console.log("Indirizzo non valido:", indirizzo);
        }

        // VALIDAZIONE CODICE FISCALE
        const codiceFiscale: string = (document.getElementById("codiceFiscale") as HTMLInputElement).value;
        const cfValido: boolean = codiceFiscale != null && codiceFiscale != "" && UT.validaCodiceFiscale(codiceFiscale);

        if (!cfValido) {
            valido++;
            document.getElementById("codiceFiscale")!.classList.add("is-invalid");
            console.log("Codice fiscale non valido:", codiceFiscale);
        }

        // VALIDAZIONE EMAIL
        const email: string = (document.getElementById("email") as HTMLInputElement).value;
        const emailValido: boolean = email != null && email != "" && UT.controllaRangeStringa(email, 10, 40) && UT.validaEMail(email);

        if (!emailValido) {
            valido++;
            document.getElementById("email")!.classList.add("is-invalid");
            console.log("Email non valida:", email);
        }

        // VALIDAZIONE PASSWORD
        const password: string = (document.getElementById("password") as HTMLInputElement).value;
        const passwordError = document.getElementById("passwordError") as HTMLElement;

        if (!password || password === "") {
            valido++;
            document.getElementById("password")!.classList.add("is-invalid");
            passwordError.textContent = "La password è obbligatoria";
            passwordError.classList.add("show"); // CAMBIA: da style.display = "block"
            console.log("Password vuota");
        } else {
            const passwordResult = UT.validaPassword(password, 8, true, true, false);
            if (!passwordResult.isValid) {
                valido++;
                document.getElementById("password")!.classList.add("is-invalid");

                // Controlli più specifici con regex
                if (password.length < 8) {
                    passwordError.textContent = "La password deve essere di almeno 8 caratteri";
                } else if (!/[A-Z]/.test(password)) {
                    passwordError.textContent = "La password deve contenere almeno una lettera maiuscola";
                } else if (!/[0-9]/.test(password)) {
                    passwordError.textContent = "La password deve contenere almeno un numero";
                } else {
                    passwordError.textContent = "La password non rispetta i criteri richiesti";
                }

                passwordError.classList.add("show"); // CAMBIA: da style.display = "block"
                console.log("Password non valida:", password, passwordResult.message);

            } else {
                passwordError.classList.remove("show"); // CAMBIA: da style.display = "none"
            }
        }


        console.log("VALIDAZIONE COMPLETATA - Errori totali:", valido);

        // Se tutto è valido
        if (valido === 0) {
            // Creo oggetto dati usando l'interfaccia
            const datiUtente: IUserRegistrazione = {
                nome: nome,
                cognome: cognome,
                indirizzo: indirizzo,
                codiceFiscale: codiceFiscale,
                email: email,
                password: password
            };

            // Mostra i dati raccolti
            console.log("✅ DATI RACCOLTI:", datiUtente);
            console.log("📤 Invio dati al server...");
            console.log("Nome completo:", datiUtente.nome + " " + datiUtente.cognome);
            console.log("Contatto:", datiUtente.email);

            alert('Registrazione completata con successo!');
            form.reset();
        } else {
            console.log("Form non valido - ci sono", valido, "errori");
        }
    }

    // Forza maiuscolo per codice fiscale
    document.getElementById('codiceFiscale')!.addEventListener('input', function (e: Event): void {
        const target = e.target as HTMLInputElement;
        target.value = target.value.toUpperCase();
    });

    // Rimuovi errori quando l'utente inizia a digitare
    document.querySelectorAll('input[required]').forEach((input: Element) => {
        const htmlInput = input as HTMLInputElement;
        htmlInput.addEventListener('input', function (): void {
            if (this.classList.contains('is-invalid') && this.value.trim() !== '') {
                this.classList.remove('is-invalid');
            }
        });
    });
}