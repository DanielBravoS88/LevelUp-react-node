const { readProducts } = require('../_lib');

module.exports = (req, res) => {
  const { q = '', category = 'Todos', order = 'popular' } = req.query || {};
  let items = readProducts();

  if (category && category !== 'Todos') {
    items = items.filter(p => p.category === category);
  }

  if (q) {
    const qq = q.toLowerCase();
    items = items.filter(p => (p.name + ' ' + (p.description || '')).toLowerCase().includes(qq));
  }

  if (order === 'price-asc') items.sort((a, b) => a.price - b.price);
  if (order === 'price-desc') items.sort((a, b) => b.price - a.price);
  if (order === 'name-asc') items.sort((a, b) => a.name.localeCompare(b.name));

  res.json(items);
};
