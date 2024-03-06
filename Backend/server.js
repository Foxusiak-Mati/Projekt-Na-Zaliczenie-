import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer'; // Importujemy moduł multer tylko raz
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Konfiguracja multer do przesyłania plików
const upload = multer({ dest: 'img/' });

let data = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

//("CRUD") READ: Pobieranie wszystkich elementów z tablicy 'data'
app.get('/api/data', (req, res) => {
    res.json(data); // Zwracanie wszystkich danych
});


//("CRUD") READ: Pobieranie konkretnego elementu na podstawie ID
app.get('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = data.find(item => item.id === id); // Szukanie elementu po ID

    if (item) {
        res.json(item); // Zwracanie znalezionego elementu
    } else {
        res.status(404).json({ error: 'Item not found' }); // Obsługa przypadku, gdy nie znaleziono elementu
    }
});

//("CRUD") CREATE: Dodawanie nowego elementu do tablicy 'data'
app.post('/api/data', (req, res) => {
    const newItem = req.body;
    newItem.id = data.length + 1; // Automatyczne nadawanie ID
    data.push(newItem); // Dodanie nowego elementu do tablicy
    res.status(201).json(newItem); // Zwracanie odpowiedzi z nowym elementem
});

//("CRUD") UPDATE: Aktualizacja istniejącego elementu na podstawie ID
app.put('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedItem = req.body;
    const index = data.findIndex(item => item.id === id); // Znalezienie indeksu elementu do aktualizacji

    if (index !== -1) {
        data[index] = { ...data[index], ...updatedItem }; // Aktualizacja elementu w tablicy danych
        res.json(data[index]); // Zwracanie zaktualizowanego elementu
    } else {
        res.status(404).json({ error: 'Item not found' }); // Obsługa przypadku, gdy nie znaleziono elementu
    }
});

//("CRUD") DELETE: Usunięcie elementu na podstawie ID
app.delete('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    data = data.filter(item => item.id !== id); // Usunięcie elementu z tablicy danych
    res.json({ message: 'Item deleted successfully' }); // Potwierdzenie usunięcia
});

// Endpoint dla zdjęć
app.get('/api/photos/:photoName', (req, res) => {
    const photoName = req.params.photoName;
    const photoPath = path.join(__dirname, 'Zdjecia', photoName);

    // Sprawdzanie czy plik istnieje
    fs.access(photoPath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).json({ error: 'Photo not found' });
            return;
        }

        // Jeśli plik istnieje, wysyłamy go jako odpowiedź
        res.sendFile(photoPath);
    });
});

// Endpoint do przesyłania zdjęć
app.post('/api/upload', upload.single('photo'), (req, res) => {
    res.json({ message: 'Photo uploaded successfully' });
});

// Serwowanie pliku HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/server.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript'); // Ustawienie typu MIME na application/javascript
    res.sendFile(path.join(__dirname, 'server.js'));
});

app.listen(port, () => {
    console.log(`Server is running at http://127.0.0.1:5500/Tutaj%20Strona/Frontend/index.html`);
});
 