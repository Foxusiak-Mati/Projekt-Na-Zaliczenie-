// Funkcja do walidacji formularza
function validateForm() {
    // Pobranie referencji do elementu select o id "imageSelect"
    var select = document.getElementById("imageSelect");
    // Pobranie wartości wybranej opcji
    var selectedValue = select.options[select.selectedIndex].value;

    // Sprawdzenie, czy nie została wybrana pusta wartość
    if (selectedValue === "") {
        // Wyświetlenie alertu informującego o konieczności wyboru zdjęcia
        alert("Proszę wybrać zdjęcie.");
        // Zwrócenie false, co oznacza, że formularz nie jest poprawny
        return false;
    }

    // Pobranie wartości z pola o id "innePole"
    var innePoleValue = document.getElementById("innePole").value;
    // Sprawdzenie, czy pole "innePole" nie jest puste
    if (innePoleValue === "") {
        // Wyświetlenie alertu informującego o konieczności wypełnienia pola "innePole"
        alert("Proszę wypełnić pole 'innePole'.");
        // Zwrócenie false, co oznacza, że formularz nie jest poprawny
        return false;
    }

    // Zwrócenie true, jeśli walidacja przebiegła pomyślnie, czyli formularz jest poprawny
    return true; 
}
