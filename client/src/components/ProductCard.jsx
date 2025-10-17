import React from 'react'
import { moneyCLP } from '../utils/currency.js'

export default function ProductCard({ p, onAdd, admin=false, onUpdated }){
  return (
    <article className="card" data-cat={p.category}>
      <div className="media media--cover">
        <span className="tag">{p.category}</span>
        <img
          className="card-img"
          src={p.image}
          alt={p.name}
          loading="lazy"
          onError={(e)=>{ e.currentTarget.onerror = null; e.currentTarget.src = '/img/pagos_tarjetas.png' }}
        />
      </div>
      <div className="body">
        <h3 className="title">{p.name}</h3>
        <div className="price">{moneyCLP(p.price)}</div>
        <p className="desc">{(p.description || '').slice(0, 120)}...</p>
        <div className="row">{admin && (
  <button
    className="btn"
    onClick={async ()=>{
      const np = window.prompt('Nuevo precio CLP para '+p.name, p.price)
      if (np===null) return
      const nc = window.prompt('Categoría (PS5, Switch, Accesorios, etc.)', p.category) || p.category
      try{
        const res = await fetch('/api/products/update', {
          method:'PUT',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ name: p.name, price: Number(np), category: nc })
        })
        const js = await res.json()
        if(js.ok){
          onUpdated && onUpdated(js.product)
          alert('Actualizado ✅')
        }else{
          alert('Error: '+(js.error||'desconocido'))
        }
      }catch(e){ alert('Error de red') }
    }}
  >Editar</button>
)}

          <button className="btn" onClick={()=>onAdd(false)}>Agregar</button>
          <button className="btn primary" onClick={()=>onAdd(true)}>Comprar</button>
        </div>
      </div>
    </article>
  )
}
