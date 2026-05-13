# IKUS

Juego web de rol y estrategia con mecánicas de progresión basadas en el tiempo real.
El jugador crea un personaje, lo envía a trabajar durante periodos predefinidos y obtiene
experiencia, oro e ítems de forma proporcional al tiempo transcurrido.

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Backend | Laravel 12 + Sanctum |
| Frontend | React 19 + Vite |
| Estilos | Tailwind CSS 4 |
| HTTP client | Axios |
| Base de datos | MySQL (XAMPP) |

## Requisitos previos

- PHP 8.2+
- Composer
- Node.js 18+
- XAMPP (MySQL)

## Instalación

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```

Abre XAMPP y arranca el servicio **MySQL**. Luego crea la base de datos desde **phpMyAdmin** (`http://localhost/phpmyadmin`) o desde la terminal:

```bash
mysql -u root -p
CREATE DATABASE ikus;
exit;
```

Configura el archivo `.env` con tus credenciales:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ikus
DB_USERNAME=root
DB_PASSWORD=
```

Ejecuta las migraciones y los seeders:

```bash
php artisan migrate --seed
php artisan serve
```

El servidor queda disponible en `http://localhost:8000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El servidor queda disponible en `http://localhost:5174`.

## Usuarios de prueba

> Credenciales válidas únicamente en el entorno de desarrollo local.

| Usuario | Email | Contraseña | Rol |
|---|---|---|---|
| Admin | admin@admin.com | admin1234 | admin |
| Usuario | usuario@usuario.com | usuario1234 | user |

## Funcionalidades

- Registro e inicio de sesión con token Bearer (Sanctum)
- Gestión del personaje — nivel, XP, oro y estadísticas
- Sistema de trabajo — periodos de 1 hora a 1 semana con recompensas proporcionales
- Drops de ítems con rareza ponderada (común, rara, épica, legendaria)
- Inventario con tooltips interactivos
- Sistema de equipamiento con slots (arma, yelmo, armadura, botas, anillo)
- Panel de administración — ban/unban de usuarios (solo rol admin)

## Estructura del proyecto

```
IKUS/
├── backend/
│   ├── app/
│   │   ├── Http/Controllers/    # AuthController, WorkController, etc.
│   │   ├── Http/Requests/       # RegisterRequest, LoginRequest
│   │   └── Models/              # User, Character, Item, Inventory, Equipment
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   └── routes/api.php           # Definición de rutas de la API REST
└── frontend/
    └── src/
        ├── components/          # Navbar, ItemTooltip, PrivateRoute, etc.
        ├── context/             # AuthContext (gestión global de sesión)
        ├── hooks/               # useLongPress (interacción táctil)
        └── pages/               # Login, Register, Profile, Work, Inventory, Admin
```

## Autor

Iván Cuevas Salguero — TFG Desarrollo de Aplicaciones Web

