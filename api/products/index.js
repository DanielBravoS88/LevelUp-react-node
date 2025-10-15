const { readProducts } = require('../_lib');

module.exports = (req, res) => {
  const data = readProducts();
  res.json(data);
};
