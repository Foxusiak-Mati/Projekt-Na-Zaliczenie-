document.addEventListener("DOMContentLoaded", function () {
    var imgElements = document.querySelectorAll('.img');

    // Ustawienie obsługi kliknięcia dla każdego obrazu
    imgElements.forEach(function (img) {
        img.addEventListener('click', function () {
            // Sprawdź czy obraz jest już powiększony
            var isEnlarged = img.classList.contains('enlarged');

            // Jeśli nie jest powiększony, usuń klasę enlarged z innych obrazów
            if (!isEnlarged) {
                imgElements.forEach(function (otherImg) {
                    if (otherImg !== img && otherImg.classList.contains('enlarged')) {
                        otherImg.classList.remove('enlarged');
                    }
                });
            }

            // Zmiana stanu powiększenia obrazu
            img.classList.toggle('enlarged', !isEnlarged);
        });
    });

    // Wyświetlenie wszystkich zdjęć po załadowaniu strony
    imgElements.forEach(function (img) {
        img.classList.add('enlarged');
    });

    // Funkcja pobierająca wszystkie obrazy
    function downloadAllImages() {
        var images = document.querySelectorAll('.img');
        var index = 0;
    
        function downloadNextImage() {
            if (index < images.length) {
                var img = images[index];
                var link = document.createElement('a');
                link.href = img.src;
                link.download = `Zdjecie${index + 1}.jpg`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                index++;
                setTimeout(downloadNextImage, 100); // Opóźnienie kolejnego pobierania o 100ms
            }
        }
        downloadNextImage();
    }
    var downloadButton = document.createElement('button');
    downloadButton.textContent = 'Pobierz wszystkie zdjęcia';
    downloadButton.addEventListener('click', downloadAllImages);
    document.body.appendChild(downloadButton);
});


