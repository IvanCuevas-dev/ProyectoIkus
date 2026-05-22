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
| Base de datos | MySQL |
 
## Requisitos previos
 
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8+

## Instalación
 
### Backend
 
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
```
 
Crea la base de datos desde tu gestor de MySQL o desde la terminal:
 
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
 
Ejecuta las migraciones y los seeders (se generan usuarios de prueba automáticamente):
 
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
 
## Endpoints principales de la API REST
 
| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/api/register` | Registro de usuario |
| POST | `/api/login` | Inicio de sesión (devuelve token Bearer) |
| POST | `/api/logout` | Cierre de sesión |
| GET | `/api/character` | Obtener datos del personaje |
| POST | `/api/work` | Enviar al personaje a trabajar |
| GET | `/api/work/status` | Consultar estado del trabajo en curso |
| POST | `/api/work/collect` | Recoger recompensas del trabajo |
| GET | `/api/inventory` | Obtener inventario del personaje |
| POST | `/api/equipment` | Equipar / desequipar un ítem |
| GET | `/api/admin/users` | Listar usuarios (solo admin) |
| POST | `/api/admin/ban/{id}` | Banear / desbanear usuario (solo admin) |
 
> Los endpoints protegidos requieren el header `Authorization: Bearer {token}`.
 
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
 
Iván Cuevas Salguero — Proyecto final Desarrollo de Aplicaciones Web
[GitHub](https://github.com/IvanCuevas-dev)
