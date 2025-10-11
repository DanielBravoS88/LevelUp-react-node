import React, { useEffect, useRef, useState } from 'react'

const slides = [
  { src: '/img/banner_ps5_fc24.jpg', alt: 'EA SPORTS FC 24' },
  { src: '/img/banner_ps5_cod_wwii.webp', alt: 'Call of Duty WWII' },
  { src: '/img/banner_ps5_ufc5.jpg', alt: 'UFC 5' },
]

export default function Billboard(){
  const [i, setI] = useState(0)
  const t = useRef(null)

  useEffect(() => {
    const prefersReduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduce) return
    t.current = setInterval(() => setI(prev => (prev+1)%slides.length), 3500)
    return () => clearInterval(t.current)
  }, [])

  return (
    <section className="billboard" aria-label="Promociones">
      <div className="bb-dots">
        {slides.map((_, idx) => (
          <button key={idx} className={idx===i? 'active' : ''} onClick={()=>setI(idx)} aria-label={`Ir al banner ${idx+1}`} />
        ))}
      </div>
      {slides.map((s, idx)=>(
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          className={idx===i? 'bb-slide active' : 'bb-slide'}
          loading={idx===0?'eager':'lazy'}
        />
      ))}
    </section>
  )
}
