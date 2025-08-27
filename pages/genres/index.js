// pages/genres/index.js
import Link from 'next/link'
import videos from '../../data/videos.json'

const slugify = (s='') => s.toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')

export default function GenresPage() {
  const genres = [...new Set(videos.map(v => v.genre || 'Outros'))]
  return (
    <div className="container">
      <h1>🎭 Categorias</h1>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:12, marginTop:12}}>
        {genres.map(g => (
          <Link key={g} href={`/genres/${slugify(g)}`}>
            <a className="card" style={{padding:18, textAlign:"center"}}>
              <div style={{fontWeight:600}}>{g}</div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
