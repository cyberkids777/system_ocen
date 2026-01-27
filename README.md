# Teacher Panel - Panel Nauczyciela

System zarządzania ocenami i przedmiotami dla szkół.

## 📋 Wymagania

Przed rozpoczęciem upewnij się, że masz zainstalowane:

- **Node.js** 18.x lub nowszy ([pobierz tutaj](https://nodejs.org/))
- **MySQL** 8.0 lub nowszy ([pobierz tutaj](https://dev.mysql.com/downloads/mysql/))
- **npm** (instaluje się automatycznie z Node.js)
- **Git** ([pobierz tutaj](https://git-scm.com/downloads))

### Sprawdź wersje:
```bash
node --version    # powinno być v18.0.0+
npm --version     # powinno być 8.0.0+
mysql --version   # powinno być 8.0+
```

---

## 🚀 Szybki Start

### 1. Sklonuj repozytorium

```bash
git clone https://github.com/TwojeKonto/teacher-panel.git
cd teacher-panel
```

### 2. Konfiguracja Bazy Danych

#### Windows:
Otwórz MySQL Command Line Client lub:
```powershell
mysql -u root -p
```

#### Mac/Linux:
```bash
sudo mysql -u root -p
```

#### Utwórz bazę danych:
```sql
CREATE DATABASE teacher_panel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'teacher_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON teacher_panel.* TO 'teacher_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Konfiguracja Backend

```bash
cd server
```

#### Stwórz plik `.env`:

**Windows PowerShell:**
```powershell
Copy-Item .env.example .env
notepad .env
```

**Mac/Linux:**
```bash
cp .env.example .env
nano .env
```

#### Edytuj `.env` (jeśli użyłeś innych danych w kroku 2):
```env
DB_HOST=localhost
DB_USER=teacher_user
DB_PASSWORD=password123
DB_NAME=teacher_panel
DB_PORT=3306
JWT_SECRET=my-super-secret-jwt-key-change-in-production
PORT=3000
NODE_ENV=development
```

#### Zainstaluj zależności:
```bash
npm install
```

#### Zainicjuj strukturę bazy danych:
```bash
node scripts/syncDb.js
```

Powinieneś zobaczyć: `✅ Database synchronized successfully.`

#### Wypełnij bazę danymi testowymi:
```bash
node scripts/seedDb.js
```

Powinieneś zobaczyć: `✅ Database seeded successfully.`

### 4. Konfiguracja Frontend

Otwórz **nowe okno terminala** i wróć do głównego folderu:

```bash
cd ..  # jeśli jesteś w folderze server
```

#### Zainstaluj zależności:
```bash
npm install
```

---

## 🎮 Uruchamianie Aplikacji

### Metoda 1: Dwa osobne terminale (Zalecane)

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Powinno wyświetlić:
```
Server running on port 3000
✅ Connection to MySQL database established successfully.
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Powinno wyświetlić:
```
  VITE v5.4.21  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

### Metoda 2: Jeden terminal (opcjonalna)

Możesz użyć narzędzia jak `concurrently` (już zainstalowane w dev dependencies):
```bash
npm run dev:all
```

---

## 🔐 Dane Testowe

Po seedowaniu bazy danych możesz się zalogować:

### Nauczyciel:
- **Email:** `teacher@example.com`
- **Hasło:** `password123`
- **Typ:** Teacher

### Uczeń:
- **Email:** `student@example.com`
- **Hasło:** `password123`
- **Typ:** Student

---

## 📁 Struktura Projektu

```
teacher-panel/
├── src/                      # Frontend (React + Vite)
│   ├── api/                  # API clients (axios)
│   ├── components/           # React components
│   │   ├── auth/            # Login
│   │   ├── teacher/         # Komponenty nauczyciela
│   │   ├── student/         # Komponenty ucznia
│   │   └── shared/          # Współdzielone (Header, Sidebar)
│   ├── context/             # React Context (Auth)
│   └── styles/              # CSS
├── server/                   # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/          # Konfiguracja DB
│   │   ├── controllers/     # Logika biznesowa
│   │   ├── middleware/      # Auth middleware
│   │   ├── models/          # Sequelize models
│   │   └── routes/          # API routes
│   ├── scripts/             # Skrypty DB (sync, seed)
│   └── server.js            # Entry point
├── tests/                    # Testy (Playwright, Vitest)
└── package.json
```

---

## 🧪 Uruchamianie Testów

### Unit Tests (Vitest):
```bash
npm run test
```

### E2E Tests (Playwright):
```bash
# Upewnij się że backend i frontend działają!
npm run test:e2e
```

### E2E Tests UI mode:
```bash
npm run test:e2e:ui
```

---

## 🛠️ Dostępne Komendy

### Frontend:
```bash
npm run dev          # Uruchom dev server (Vite)
npm run build        # Zbuduj produkcyjnie
npm run preview      # Podgląd buildu produkcyjnego
npm run test         # Unit tests
npm run test:e2e     # E2E tests
```

### Backend:
```bash
cd server
npm run dev          # Uruchom dev server (nodemon)
node server.js       # Uruchom normalnie
node scripts/syncDb.js    # Synchronizuj strukturę DB
node scripts/seedDb.js    # Wypełnij danymi testowymi
```

---

## 🔧 Troubleshooting

### Problem: `Error: connect ECONNREFUSED`
**Rozwiązanie:** Backend nie działa. Upewnij się, że uruchomiłeś:
```bash
cd server
npm run dev
```

### Problem: `ER_ACCESS_DENIED_ERROR`
**Rozwiązanie:** Błędne dane do MySQL w `.env`. Sprawdź:
- `DB_USER`
- `DB_PASSWORD`
- Czy użytkownik ma uprawnienia do bazy

### Problem: `Unknown database 'teacher_panel'`
**Rozwiązanie:** Nie utworzyłeś bazy. Wykonaj krok 2 (Konfiguracja Bazy).

### Problem: `Port 3000 is already in use`
**Rozwiązanie:** Zmień port w `server/.env`:
```env
PORT=3001
```
I zaktualizuj frontend API URL w `src/api/client.js`.

### Problem: Frontend nie łączy się z Backend
**Rozwiązanie:** Sprawdź czy w `src/api/client.js` jest:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

---

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - Logowanie
- `POST /api/auth/register` - Rejestracja
- `GET /api/auth/me` - Pobierz zalogowanego użytkownika

### Subjects (wymagana autoryzacja)
- `GET /api/subjects` - Lista przedmiotów
- `POST /api/subjects` - Dodaj przedmiot
- `PUT /api/subjects/:id` - Edytuj przedmiot
- `DELETE /api/subjects/:id` - Usuń przedmiot

### Grades (wymagana autoryzacja)
- `GET /api/grades/student/:id` - Oceny ucznia
- `POST /api/grades` - Dodaj ocenę

### Data (wymagana autoryzacja)
- `GET /api/students` - Lista uczniów
- `GET /api/classes` - Lista klas

---

## 📦 Stack Technologiczny

### Frontend:
- React 18
- Vite
- React Router
- Axios
- Tailwind CSS

### Backend:
- Node.js + Express
- MySQL + Sequelize ORM
- JWT Authentication
- bcrypt
- CORS

### Testing:
- Playwright (E2E)
- Vitest (Unit)

---

## 📝 Notatki dla Developerów

### Zmienne Środowiskowe

**Frontend** - tworzy plik `.env` w głównym folderze:
```env
VITE_API_URL=http://localhost:3000/api
```

**Backend** - edytuj `server/.env`:
```env
DB_HOST=localhost
DB_USER=teacher_user
DB_PASSWORD=password123
DB_NAME=teacher_panel
DB_PORT=3306
JWT_SECRET=zmien-w-produkcji
PORT=3000
NODE_ENV=development
```

### Hot Reload

- **Frontend**: Vite automatycznie odświeża przy zmianach w `src/`
- **Backend**: Nodemon automatycznie restartuje przy zmianach w `server/src/`

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📄 License

MIT License - see LICENSE file for details

---

## 👨‍💻 Autor

Projekt zrealizowany jako panel nauczyciela do zarządzania ocenami.

---

## ❓ Pomoc

Jeśli masz problemy:
1. Sprawdź sekcję **Troubleshooting** powyżej
2. Upewnij się że wszystkie wymagania są spełnione
3. Sprawdź logi w konsoli (backend i frontend)
4. Otwórz issue na GitHub

---

**Powodzenia! 🚀**
