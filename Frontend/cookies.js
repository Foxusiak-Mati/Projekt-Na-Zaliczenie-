// Funkcja do generowania JWT
function createJWT(payload, secret, expiresIn) {
    // Użyj funkcji sign z biblioteki jsonwebtoken
    return jwt.sign(payload, secret, { expiresIn: expiresIn });
}

// Funkcja do weryfikacji JWT
function verifyJWT(token, secret) {
    try {
        // Użyj funkcji verify z biblioteki jsonwebtoken
        const decoded = jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        // Obsłuż błędy weryfikacji JWT
        console.error('Weryfikacja JWT nie powiodła się:', err);
        return null;
    }
}

// Ustawienie tokena JWT w localStorage
function setJWTToken(token) {
    localStorage.setItem('jwtToken', token);
}

// Pobranie tokena JWT z localStorage
function getJWTToken() {
    return localStorage.getItem('jwtToken');
}

// Funkcja do zmiany obrazka
function changeImage() {
    var select = document.getElementById("imageSelect");
    var selectedValue = select.options[select.selectedIndex].value;
    var imgId = selectedValue.substring(3);

    showImage(imgId);

    // Przykładowe dane do umieszczenia w tokenie JWT
    const payload = {
        imgId: imgId,
        role: 'user' // Załóżmy, że domyślna rola to 'user'
    };

    // Sekret używany do podpisywania tokena JWT (powinien być bezpieczny, nie umieszczaj go w kodzie)
    const secret = 'superSecureSecret';

    // Czas ważności tokena JWT (np. '1h', '7d', '30d', itp.)
    const expiresIn = '7d';

    // Utwórz token JWT
    var token = createJWT(payload, secret, expiresIn);

    // Ustaw token JWT w localStorage
    setJWTToken(token);
}

// Funkcja do wczytania wybranego obrazka
function loadSelectedImage() {
    // Pobierz JWT z localStorage
    var jwtToken = getJWTToken();
    if (jwtToken) {
        // Sekret używany do weryfikacji tokena JWT
        const secret = 'superSecureSecret';

        // Zweryfikuj JWT
        var payload = verifyJWT(jwtToken, secret);
        if (payload) {
            // Pobierz id obrazka z JWT i pokaż obrazek
            var imgId = payload.imgId;
            showImage(imgId);
            
            // Sprawdź autoryzację użytkownika
            if (payload.role === 'admin') {
                console.log('Użytkownik ma uprawnienia administratora.');
                // Tutaj możesz wykonać dodatkowe działania, które wymagają uprawnień administratora
            } else {
                console.log('Użytkownik nie ma wymaganych uprawnień.');
                // Tutaj możesz wykonać odpowiednie działania, gdy użytkownik nie ma wymaganych uprawnień
            }
        } else {
            // JWT nieprawidłowy lub wygasły, zastosuj odpowiednie działania
            // np. wylogowanie użytkownika
        }
    }
}

// Funkcja do obsługi kliknięcia przycisku "Accept" w banerze z informacją o plikach cookie
function handleAcceptCookies() {
    // Ustawienie pliku cookie
    document.cookie = "acceptedCookies=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";

    // Dodatkowo, zmień obrazek (jeśli to wymagane)
    changeImage();
}

// Funkcja do automatycznego akceptowania plików cookie po załadowaniu strony
function autoAcceptCookies() {
    // Ustawienie pliku cookie
    document.cookie = "acceptedCookies=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}

// Wywołaj funkcję automatycznego akceptowania plików cookie po załadowaniu strony
window.onload = function () {
    autoAcceptCookies();
    loadSelectedImage();
};

// Dodanie obsługi zdarzenia kliknięcia przycisku "Accept" w banerze z informacją o plikach cookie
document.querySelector('.cookie-accept').addEventListener('click', handleAcceptCookies);

// Pobranie wszystkich zdjęć na stronie
var images = document.getElementsByTagName('img');

// Dodanie obsługi zdarzenia kliknięcia dla każdego zdjęcia
for (var i = 0; i < images.length; i++) {
    images[i].addEventListener('click', handleImageClick);
}
