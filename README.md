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

---

## Despliegue en Vercel

He añadido funciones serverless en `api/` y un `vercel.json` básico para que puedas desplegar en Vercel con el frontend estático y las funciones disponibles en `/api/*`.

Archivos añadidos por la integración automática que implementé:

- `vercel.json` — configuración de builds y rutas.
- `api/_lib.js` — helper para leer `server/products.json`.
- `api/health.js` — endpoint de salud (`/api/health`).
- `api/products/index.js` — devuelve todos los productos (`/api/products`).
- `api/products/search.js` — búsqueda y filtros (`/api/products/search`).
- `api/products/update.js` — endpoint de update (respuesta, no persistente).

Notas importantes:

- En Vercel las funciones son serverless y el sistema de archivos es efímero. Cualquier intento de escribir en `server/products.json` no persistirá entre invocaciones. Por eso `api/products/update.js` devuelve el objeto actualizado pero no escribe en disco.
- Para persistencia en producción, usa una base de datos (SQLite, Postgres, Supabase, MongoDB, etc.) o un servicio como Supabase/PlanetScale.
- Las imágenes están en `server/public/img`; Vercel servirá archivos estáticos si los incluyes en `client/public` o en la carpeta `public` raíz. Recomiendo mover las imágenes a `client/public/img` para que formen parte del build estático.

Pasos para desplegar en Vercel desde el repo:

1. Asegúrate de que tu código esté en la rama `main` y haz push al repositorio remoto (GitHub/GitLab).

2. En vercel.com, crea un nuevo proyecto y conecta tu repo.

3. Configuración sugerida en Vercel:
   - Framework preset: "Other" (o dejar que Vercel detecte Vite).
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/dist`
   - Root Directory: `/` (raíz del repo). Si Vercel no detecta el monorepo correctamente, indícale la configuración anterior.

4. Despliega. Vercel ejecutará el build del frontend y publicará las funciones bajo `/api/*`.

Comandos locales para verificar antes de push (PowerShell):

```powershell
# desde la raíz
cd server; npm install
cd ..\client; npm install

# Build del cliente (simula lo que hará Vercel)
cd client; npm run build

# Opcional: correr server localmente (express)
cd ..\server; npm run dev
```

Limitaciones y recomendaciones:

- Si quieres que `/api/products/update` persista cambios, adapta la API para usar una base de datos y guarda las imágenes en un bucket (S3/Cloudinary) o usa un servicio como Supabase.
- Si muevo las imágenes a `client/public/img`, actualizaré automáticamente las rutas en `server/products.json`.

¿Quieres que mueva las imágenes a `client/public/img` y actualice las rutas en `products.json` ahora? Puedo hacerlo y probar el build localmente.

## Nota sobre un error frecuente en Vercel: "Permission denied" al correr Vite

Si en el log de Vercel ves un error similar a:

```
sh: line 1: /vercel/path0/client/node_modules/.bin/vite: Permission denied
Error: Command "npm run build" exited with 126
```

Prueba cambiar en la configuración de Vercel el comando de build a una forma que ejecute npm desde la carpeta `client` sin depender de los `builds` en `vercel.json`. Recomendación de comando:

- Install Command: npm ci --prefix client
- Build Command: npm run build --prefix client
- Output Directory: client/dist

Si el error persiste, otra alternativa es forzar el uso de npx al build:

```bash
npx --yes vite build --cwd client
```

O, como workaround inmediato, corre localmente en tu máquina:

```powershell
cd client
npm ci
npm run build
```

Luego empuja los cambios y vuelve a desplegar en Vercel. Si necesitas, puedo cambiar los settings por ti (con Vercel CLI) y redeployar.
