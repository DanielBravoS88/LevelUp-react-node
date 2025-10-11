const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Servir imágenes estáticas si las agregas en server/public/img
app.use('/img', express.static(path.join(__dirname, 'public', 'img')));

// Endpoint de salud
app.get('/api/health', (req, res) => res.json({ ok: true, at: new Date().toISOString() }));

// Devuelve todos los productos
app.get('/api/products', (req, res) => {
  const file = path.join(__dirname, 'products.json');
  const raw = fs.readFileSync(file, 'utf-8');
  const data = JSON.parse(raw);
  res.json(data);
});

// (Opcional) Endpoint para filtrar/ordenar en el servidor
// GET /api/products/search?q=...&category=PS5&order=price-asc
app.get('/api/products/search', (req, res) => {
  const { q = '', category = 'Todos', order = 'popular' } = req.query;
  const file = path.join(__dirname, 'products.json');
  const raw = fs.readFileSync(file, 'utf-8');
  let items = JSON.parse(raw);

  // Filtro por categoría
  if (category && category !== 'Todos') {
    items = items.filter(p => p.category === category);
  }

  // Búsqueda de texto (nombre + descripción)
  if (q) {
    const qq = q.toLowerCase();
    items = items.filter(p => (p.name + ' ' + (p.description || '')).toLowerCase().includes(qq));
  }

  // Orden
  if (order === 'price-asc') items.sort((a, b) => a.price - b.price);
  if (order === 'price-desc') items.sort((a, b) => b.price - a.price);
  if (order === 'name-asc') items.sort((a, b) => a.name.localeCompare(b.name));
  // "popular" = sin orden adicional

  res.json(items);
});

// Actualiza (price, category, description, image) de un producto por nombre
app.put('/api/products/update', (req, res) => {
  const file = path.join(__dirname, 'products.json');
  const raw = fs.readFileSync(file, 'utf-8');
  const data = JSON.parse(raw);
  const { name, price, category, description, image } = req.body || {};
  if (!name) return res.status(400).json({ ok:false, error:'name requerido' });
  const idx = data.findIndex(p => p.name === name);
  if (idx === -1) return res.status(404).json({ ok:false, error:'producto no encontrado' });
  if (price !== undefined) data[idx].price = Number(price);
  if (category) data[idx].category = category;
  if (description) data[idx].description = description;
  if (image) data[idx].image = image;
  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  res.json({ ok:true, product: data[idx] });
});

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});
