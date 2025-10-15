const fs = require('fs');
const path = require('path');

function readProducts() {
  const file = path.join(__dirname, '..', 'server', 'products.json');
  const raw = fs.readFileSync(file, 'utf-8');
  return JSON.parse(raw);
}

module.exports = { readProducts };
