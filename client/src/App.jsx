import React, { useEffect, useMemo, useState } from 'react'
import Billboard from './components/Billboard.jsx'
import Filters from './components/Filters.jsx'
import ProductCard from './components/ProductCard.jsx'
import CartPanel from './components/CartPanel.jsx'
import Reviews from './components/Reviews.jsx'
import { moneyCLP } from './utils/currency.js'
import useLocalStorage from './hooks/useLocalStorage.js'

export default function App() {
  const [products, setProducts] = useState([])
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('Todos')
  const [order, setOrder] = useState('popular')
  const [cart, setCart] = useLocalStorage('cart', [])
  const [cartOpen, setCartOpen] = useState(false)
  const [receiptOpen, setReceiptOpen] = useState(false)
  const [receiptHtml, setReceiptHtml] = useState('')
    const [admin, setAdmin] = useState(false)

  // Carga inicial desde la API Node
  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(setProducts)
      .catch(() => setProducts([]))
  }, [])

  // Categorías dinámicas + 'Todos'
  const categories = useMemo(() => {
    const set = new Set(products.map(p => p.category))
    return ['Todos', ...Array.from(set)]
  }, [products])

  // Derivados: productos filtrados/ordenados/buscados
  const shown = useMemo(() => {
    let items = [...products]
    if (filter !== 'Todos') items = items.filter(p => p.category === filter)
    if (q) {
      const qq = q.toLowerCase()
      items = items.filter(p => (p.name + ' ' + (p.description || '')).toLowerCase().includes(qq))
    }
    if (order === 'price-asc') items.sort((a, b) => a.price - b.price)
    if (order === 'price-desc') items.sort((a, b) => b.price - a.price)
    if (order === 'name-asc') items.sort((a, b) => a.name.localeCompare(b.name))
    return items
  }, [products, q, filter, order])

  // Carrito: helpers
  const add = (p, openAfter=false) => {
    setCart(prev => {
      const found = prev.find(i => i.name === p.name)
      if (found) return prev.map(i => i.name === p.name ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { ...p, qty: 1 }]
    })
    if (openAfter) setCartOpen(true)
  }
  const changeQty = (name, d) => setCart(prev => prev.map(i => i.name === name ? { ...i, qty: Math.max(1, i.qty + d) } : i))
  const remove = (name) => setCart(prev => prev.filter(i => i.name !== name))
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const checkout = () => {
    if (!cart.length) return alert('El carrito está vacío')
    const nro = Math.floor(Math.random()*900000+100000)
    const dateStr = new Date().toLocaleString()

    const rows = cart.map(i => `\n      <tr>\n        <td style="padding:8px 12px; text-align:center">${i.qty}</td>\n        <td style="padding:8px 12px">${i.name}</td>\n        <td style="padding:8px 12px; text-align:right">${moneyCLP(i.price)}</td>\n        <td style="padding:8px 12px; text-align:right">${moneyCLP(i.price * i.qty)}</td>\n      </tr>\n    `).join('')

    const receipt = `
      <div class="receipt">
        <div class="head">
          <div>
            <div class="brand">LevelUp Gamer</div>
            <div class="meta">Pedro Aguirre Cerda 5254, Huechuraba</div>
          </div>
          <div style="text-align:right">
            <h2>Boleta #${nro}</h2>
            <div class="meta">${dateStr}</div>
          </div>
        </div>
        <div>
          <table aria-label="Detalle de compra">
            <thead>
              <tr>
                <th style="width:8%">Cant.</th>
                <th>Producto</th>
                <th style="width:18%;text-align:right">Precio</th>
                <th style="width:18%;text-align:right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
              <tr class="total-row">
                <td></td>
                <td style="padding:8px 12px;text-align:right">TOTAL</td>
                <td></td>
                <td style="text-align:right;padding:8px 12px">${moneyCLP(total)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="foot">Gracias por tu compra — visítanos en <strong>LevelUp Gamer</strong></div>
      </div>
    `

    setReceiptHtml(receipt)
    setReceiptOpen(true)
    setCart([])
    setCartOpen(false)
  }

  return (
    <div className="wrap">
      <header className="topbar">
        <div className="brand">
          <div className="logo">LU</div>
          <h1>LevelUp Gamer</h1>
        </div>
        <div className="spacer" />
        <div className="search">
          <input
            value={q}
            onChange={e=>setQ(e.target.value)}
            placeholder="Buscar juegos, consolas, accesorios…"
          />
          <button onClick={()=>{}}>Buscar</button>
        </div>
        <button className="btn" onClick={()=>setCartOpen(true)}>
          Carrito <span className="badge">{cart.reduce((a,b)=>a+b.qty,0)}</span>
        </button>
      </header>

      <Billboard />

      <main className="container">
        <section className="headline">
          <h2>Juegos PS5 y Nintendo Switch en Chile</h2>
          <p className="text">Entrega rápida, precios exclusivos y 100% originales.</p>
        </section>

        <Filters
          categories={categories}
          current={filter}
          setCurrent={setFilter}
          order={order}
          setOrder={setOrder}
        />

        <section className="grid">
          {shown.map(p => (
            <ProductCard key={p.name} p={p} onAdd={(open)=>add(p, open)} admin={admin} onUpdated={(np)=>{
              setProducts(prev=>prev.map(x=>x.name===np.name? np : x))
            }}/>
          ))}
          {!shown.length && <p>No hay resultados.</p>}
        </section>

        <section className="section">
          <h3>Lo que dicen nuestros clientes</h3>
          <Reviews />
        </section>
        
        {/* Mapa de la tienda */}
        <section className="section">
          <h3>Nuestra tienda</h3>
          <p className="text">Pedro Aguirre Cerda 5254, Huechuraba</p>
          <div className="map">
            <iframe
              title="Mapa de LevelUp Gamer"
              src="https://www.google.com/maps?q=Pedro+Aguirre+Cerda+5254+Huechuraba&output=embed"
              style={{ width: '100%', height: 320, border: 0, borderRadius: 12, display: 'block' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
  <div className="container" style={{padding:'12px 0'}}>
    <img src="/img/pagos_tarjetas.png" alt="Medios de pago" style={{maxWidth:'420px', width:'100%', display:'block', margin:'0 auto 8px'}}/>
  </div>
  <div className="lp-footer__copy">© {new Date().getFullYear()} LevelUp Gamer</div>
</footer>


      <CartPanel
        open={cartOpen}
        onClose={()=>setCartOpen(false)}
        items={cart}
        total={total}
        money={moneyCLP}
        onInc={(name)=>changeQty(name, +1)}
        onDec={(name)=>changeQty(name, -1)}
        onRemove={remove}
        onCheckout={checkout}
      />

      {/* Boleta en modal (estilo mejorado) */}
      {receiptOpen && (
        <div className="receipt-modal" role="dialog" aria-modal="true">
          <div className="receipt-wrap">
            <div className="receipt-close">
              <button className="btn" onClick={()=>setReceiptOpen(false)}>Cerrar</button>
              <button className="btn primary" onClick={()=>window.print()}>Imprimir</button>
            </div>
            <div className="receipt-body" dangerouslySetInnerHTML={{ __html: receiptHtml }} />
          </div>
        </div>
      )}
    </div>
  )
}
