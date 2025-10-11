# LevelUp Gamer — React + Node (Proyecto base)

Este proyecto replica, en **React + Node**, la idea de tu sitio anterior (catálogo, filtros, carrito, reseñas) pero con código limpio y fácil de extender.

## Estructura
```
levelup-react-node/
├─ server/           # API con Express
│  ├─ server.js
│  ├─ products.json  # catálogo de ejemplo
│  └─ public/img/    # (opcional) pon aquí tus imágenes reales
└─ client/           # Frontend con React (Vite)
   ├─ index.html
   ├─ vite.config.js
   ├─ package.json
   └─ src/
      ├─ App.jsx
      ├─ styles.css
      ├─ utils/currency.js
      ├─ hooks/useLocalStorage.js
      └─ components/
         ├─ Billboard.jsx
         ├─ Filters.jsx
         ├─ ProductCard.jsx
         ├─ CartPanel.jsx
         └─ Reviews.jsx
```

## Requisitos
- Node.js 18 o superior
- npm

## Instalación y ejecución
En **dos terminales** (o pestañas) diferentes:

### 1) API (backend)
```bash
cd server
npm install
npm run dev   # o: npm start
```
La API quedará en: **http://localhost:5000**  
Rutas útiles: `/api/health`, `/api/products`, `/api/products/search`

> Puedes colocar imágenes en `server/public/img` y referenciarlas en `products.json` como `"/img/archivo.jpg"`.

### 2) Frontend (React)
```bash
cd client
npm install
npm run dev
```
El frontend quedará en: **http://localhost:5173** (con proxy a `:5000/api`).

## Personaliza tu catálogo
Edita `server/products.json` (nombre, precio, categoría, descripción e imagen). Las **categorías son dinámicas** y se generan desde esos datos.

## Qué incluye
- **Búsqueda**, **filtros por categorías**, **orden (precio y nombre)**.
- **Carrito persistente** (localStorage): sumar, restar, quitar, total y “Pagar” (boleta simple).
- **Reseñas editables** (demo): edita tu nombre, texto y estrellas.
- **Billboard** (carrusel) accesible y liviano.
- **Estilos** con variables CSS y layout responsive.

## Consejos de VS Code
- Extensiones: *ESLint*, *Prettier*, *Error Lens*.
- Formateo: `Alt+Shift+F` (Windows) o `Option+Shift+F` (macOS).

¡Listo! Cambia textos, colores e imágenes a tu gusto y tendrás tu tienda lista para mostrar.
