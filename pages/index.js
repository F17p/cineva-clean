// pages/index.js
import Link from 'next/link'
import videos from '../data/videos.json'
import ImageWithFallback from '../components/ImageWithFallback'

const slugify = (s='') => s.toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')

export default function Home() {
  const grouped = videos.reduce((acc,v) => {
    acc[v.genre] = acc[v.genre] || []
    acc[v.genre].push(v)
    return acc
  }, {})

  return (
    <div className="container">
      <h1 style={{fontSize:28, marginBottom:8}}>🎬 Cineva</h1>
      <p style={{color:"#9ca3af", marginBottom:20}}>Catálogo de teste — clique num card para ver o trailer.</p>

      {Object.keys(grouped).map(cat => (
        <section key={cat} style={{marginBottom:28}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8}}>
            <h2 style={{margin:0}}>{cat}</h2>
            <Link href={`/genres/${slugify(cat)}`}><a style={{color:"#7dd3fc"}}>Ver todos</a></Link>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px,1fr))", gap:12}}>
            {grouped[cat].map(v => (
              <Link key={v.id} href={`/video/${v.id}`}>
                <a className="card">
                  <ImageWithFallback src={v.thumbnail} alt={v.title} className="thumbnail" />
                  <div style={{padding:10}}>
                    <div style={{fontWeight:600}}>{v.title}</div>
                    <div style={{color:"#9ca3af",fontSize:13}}>{v.genre}</div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
