import React from 'react'

export default function CartPanel({ open, onClose, items, total, money, onInc, onDec, onRemove, onCheckout }){
  return (
    <aside className={open? 'cart-panel open':'cart-panel'} aria-hidden={!open}>
      <header className="container"><strong>Tu carrito</strong></header>
      <div className="cart-items">
        {items.map(i => (
          <div className="cart-item" key={i.name}>
            <img src={i.image} alt={i.name}/>
            <div>
              <div style={{fontWeight:700}}>{i.name}</div>
              <div style={{color:'var(--text-2)'}}>
                {money(i.price)} ·
                <button className="btn" onClick={()=>onDec(i.name)}>-</button>
                {i.qty}
                <button className="btn" onClick={()=>onInc(i.name)}>+</button>
              </div>
            </div>
            <button className="btn" onClick={()=>onRemove(i.name)}>Quitar</button>
          </div>
        ))}
        {!items.length && <p style={{padding:'12px'}}>Tu carrito está vacío.</p>}
      </div>
      <div className="cart-footer">
        <div className="container" style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:10}}>
          <div>
            <small>Total</small>
            <div style={{fontSize:20,fontWeight:800,color:'var(--accent-2)'}}>{money(total)}</div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button className="btn" onClick={onClose}>Cerrar</button>
            <button className="btn primary" onClick={onCheckout}>Pagar</button>
          </div>
        </div>
      </div>
    </aside>
  )
}
