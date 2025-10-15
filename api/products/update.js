const { readProducts } = require('../_lib');

module.exports = (req, res) => {
  // Vercel serverless instances have ephemeral filesystem. We can respond with
  // the updated product object, but changes won't persist across invocations.
  const data = readProducts();
  const { name, price, category, description, image } = req.body || {};
  if (!name) return res.status(400).json({ ok:false, error:'name requerido' });
  const idx = data.findIndex(p => p.name === name);
  if (idx === -1) return res.status(404).json({ ok:false, error:'producto no encontrado' });
  if (price !== undefined) data[idx].price = Number(price);
  if (category) data[idx].category = category;
  if (description) data[idx].description = description;
  if (image) data[idx].image = image;

  // NOTE: not writing to disk intentionally
  return res.json({ ok:true, note: 'actualización no persistida en serverless', product: data[idx] });
};
