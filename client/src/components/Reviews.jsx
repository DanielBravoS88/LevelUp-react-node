import React, { useState } from 'react'

const initial = [
  {id:1, name:'Felipe Retamal', text:'Funciona perfecto. Primera compra y repetiré ✨', score:5, editing:false},
  {id:2, name:'Ronaldo Soto', text:'Confiables y rápidos. Feliz con la compra 😍', score:5, editing:false},
  {id:3, name:'Dgo', text:'Tercera vez comprando y plus todos los meses 🙌', score:5, editing:false},
]

export default function Reviews(){
  const [reviews, setReviews] = useState(initial)

  const setStars = (id, score) => setReviews(rs => rs.map(r => r.id === id && r.editing ? ({...r, score}) : r))
  const editReview = (id) => setReviews(rs => rs.map(r => ({...r, editing: r.id === id})))
  const cancelEdit = (id) => setReviews(rs => rs.map(r => r.id === id ? ({...r, editing:false}) : r))
  const del = (id) => setReviews(rs => rs.filter(r => r.id !== id))
  const save = (e, id) => {
    e.preventDefault()
    const fd = new FormData(e.target)
    setReviews(rs => rs.map(r => r.id===id ? ({...r, name: fd.get('name'), text: fd.get('text'), editing:false}) : r))
  }

  const Stars = ({score, id, editable}) => (
    <span className="stars">
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{cursor: editable? 'pointer':'default', color: s<=score? 'gold':'#888'}}
          onClick={()=>editable && setStars(id, s)}>&#9733;</span>
      ))}
    </span>
  )

  return (
    <div className="reviews">
      {reviews.map(r => (
        <div className="review" key={r.id}>
          {r.editing ? (
            <form onSubmit={(e)=>save(e, r.id)} className="review-edit-form">
              <input defaultValue={r.name} name="name" required style={{marginBottom:6, width:'100%'}}/>
              <div className="stars" style={{marginBottom:6}}><Stars score={r.score} id={r.id} editable /></div>
              <textarea defaultValue={r.text} name="text" required style={{width:'100%', marginBottom:6}}/>
              <button className="btn primary" type="submit">Guardar</button>
              <button className="btn" type="button" onClick={()=>cancelEdit(r.id)}>Cancelar</button>
            </form>
          ) : (
            <>
              <strong>{r.name}</strong>
              <div className="stars"><Stars score={r.score} id={r.id} /></div>
              <p className="desc">{r.text}</p>
              <div style={{marginTop:8}}>
                <button className="btn" onClick={()=>editReview(r.id)}>Editar</button>
                <button className="btn" onClick={()=>del(r.id)}>Borrar</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
