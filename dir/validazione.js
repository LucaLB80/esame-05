/// <reference path="interfaceDati.ts" />
import Utility from './Utility.js';
// Script TypeScript
window.onload = function () {
    const UT = Utility;
    const form = document.getElementById("registrationForm");
    const bott = document.getElementById("registrati");
    // ✅ TOGGLE PASSWORD 
    const toggleBtn = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
    if (toggleBtn && passwordInput) {
        toggleBtn.onclick = function () {
            if (passwordInput.type === "password") {
                // Password è nascosta → la rendo visibile
                passwordInput.type = "text";
                console.log("Password ora VISIBILE");
                const icon = this.querySelector("i");
                if (icon) {
                    icon.className = "bi bi-eye"; // Password VISIBILE → Occhio aperto
                }
            }
            else {
                // Password è visibile → la nascondo
                passwordInput.type = "password";
                console.log("Password ora NASCOSTA");
                const icon = this.querySelector("i");
                if (icon) {
                    icon.className = "bi bi-eye-slash"; // Password NASCOSTA → Occhio barrato 
                }
            }
        };
    }
    bott.onclick = function (e) {
        e.preventDefault();
        console.log("submit");
        // Reset errori precedenti
        document.querySelectorAll('.form-control').forEach((input) => {
            input.classList.remove('is-invalid');
        });
        let valido = 0;
        // VALIDAZIONE NOME
        const nome = document.getElementById("nome").value;
        const nomeValido = nome != null && nome != "" && UT.controllaRangeStringa(nome, 2, 25);
        if (!nomeValido) {
            valido++;
            document.getElementById("nome").classList.add("is-invalid");
            console.log("Nome non valido:", nome);
        }
        // VALIDAZIONE COGNOME
        const cognome = document.getElementById("cognome").value;
        const cognomeValido = cognome != null && cognome != "" && UT.controllaRangeStringa(cognome, 2, 25);
        if (!cognomeValido) {
            valido++;
            document.getElementById("cognome").classList.add("is-invalid");
            console.log("Cognome non valido:", cognome);
        }
        // VALIDAZIONE INDIRIZZO
        const indirizzo = document.getElementById("indirizzo").value;
        const indirizzoValido = indirizzo != null && indirizzo != "" && UT.controllaRangeStringa(indirizzo, 5, 100);
        if (!indirizzoValido) {
            valido++;
            document.getElementById("indirizzo").classList.add("is-invalid");
            console.log("Indirizzo non valido:", indirizzo);
        }
        // VALIDAZIONE CODICE FISCALE
        const codiceFiscale = document.getElementById("codiceFiscale").value;
        const cfValido = codiceFiscale != null && codiceFiscale != "" && UT.validaCodiceFiscale(codiceFiscale);
        if (!cfValido) {
            valido++;
            document.getElementById("codiceFiscale").classList.add("is-invalid");
            console.log("Codice fiscale non valido:", codiceFiscale);
        }
        // VALIDAZIONE EMAIL
        const email = document.getElementById("email").value;
        const emailValido = email != null && email != "" && UT.controllaRangeStringa(email, 10, 40) && UT.validaEMail(email);
        if (!emailValido) {
            valido++;
            document.getElementById("email").classList.add("is-invalid");
            console.log("Email non valida:", email);
        }
        // VALIDAZIONE PASSWORD
        const password = document.getElementById("password").value;
        const passwordError = document.getElementById("passwordError");
        if (!password || password === "") {
            valido++;
            document.getElementById("password").classList.add("is-invalid");
            passwordError.textContent = "La password è obbligatoria";
            passwordError.classList.add("show"); // ✅ CAMBIA: da style.display = "block"
            console.log("Password vuota");
        }
        else {
            const passwordResult = UT.validaPassword(password, 8, true, true, false);
            if (!passwordResult.isValid) {
                valido++;
                document.getElementById("password").classList.add("is-invalid");
                // Controlli più specifici con regex
                if (password.length < 8) {
                    passwordError.textContent = "La password deve essere di almeno 8 caratteri";
                }
                else if (!/[A-Z]/.test(password)) {
                    passwordError.textContent = "La password deve contenere almeno una lettera maiuscola";
                }
                else if (!/[0-9]/.test(password)) {
                    passwordError.textContent = "La password deve contenere almeno un numero";
                }
                else {
                    passwordError.textContent = "La password non rispetta i criteri richiesti";
                }
                passwordError.classList.add("show"); // ✅ CAMBIA: da style.display = "block"
                console.log("Password non valida:", password, passwordResult.message);
            }
            else {
                passwordError.classList.remove("show"); // ✅ CAMBIA: da style.display = "none"
            }
        }
        console.log("VALIDAZIONE COMPLETATA - Errori totali:", valido);
        // Se tutto è valido
        if (valido === 0) {
            // Creo oggetto dati usando l'interfaccia
            const datiUtente = {
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
        }
        else {
            console.log("Form non valido - ci sono", valido, "errori");
        }
    };
    // Forza maiuscolo per codice fiscale
    document.getElementById('codiceFiscale').addEventListener('input', function (e) {
        const target = e.target;
        target.value = target.value.toUpperCase();
    });
    // Rimuovi errori quando l'utente inizia a digitare
    document.querySelectorAll('input[required]').forEach((input) => {
        const htmlInput = input;
        htmlInput.addEventListener('input', function () {
            if (this.classList.contains('is-invalid') && this.value.trim() !== '') {
                this.classList.remove('is-invalid');
            }
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhemlvbmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi92YWxpZGF6aW9uZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5Q0FBeUM7QUFFekMsT0FBTyxPQUFPLE1BQU0sY0FBYyxDQUFDO0FBRW5DLG9CQUFvQjtBQUNwQixNQUFNLENBQUMsTUFBTSxHQUFHO0lBQ1osTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRW5CLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQW9CLENBQUM7SUFDNUUsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQXNCLENBQUM7SUFFeEUscUJBQXFCO0lBQ3JCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQXNCLENBQUM7SUFDakYsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQXFCLENBQUM7SUFFOUUsSUFBSSxTQUFTLElBQUksYUFBYSxFQUFFLENBQUM7UUFDN0IsU0FBUyxDQUFDLE9BQU8sR0FBRztZQUNoQixJQUFJLGFBQWEsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFLENBQUM7Z0JBQ3BDLDBDQUEwQztnQkFDMUMsYUFBYSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7Z0JBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztnQkFFckMsTUFBTSxJQUFJLEdBQUksSUFBb0IsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RELElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ1AsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsQ0FBRSxvQ0FBb0M7Z0JBQ3ZFLENBQUM7WUFDTCxDQUFDO2lCQUFNLENBQUM7Z0JBQ0osb0NBQW9DO2dCQUNwQyxhQUFhLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztnQkFDaEMsT0FBTyxDQUFD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