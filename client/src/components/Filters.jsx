import React from 'react'

export default function Filters({ categories, current, setCurrent, order, setOrder }){
  return (
    <div className="toolbar">
      <div className="filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={['chip', current===cat && 'active'].filter(Boolean).join(' ')}
            onClick={()=>setCurrent(cat)}
          >{cat}</button>
        ))}
      </div>
      <select value={order} onChange={e=>setOrder(e.target.value)}>
        <option value="popular">Ordenar por popularidad</option>
        <option value="price-asc">Precio: menor a mayor</option>
        <option value="price-desc">Precio: mayor a menor</option>
        <option value="name-asc">Nombre A–Z</option>
      </select>
    </div>
  )
}
