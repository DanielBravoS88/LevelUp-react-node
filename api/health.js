module.exports = (req, res) => {
  res.json({ ok: true, at: new Date().toISOString() });
};
