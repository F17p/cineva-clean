// pages/genres/[slug].js
import Link from 'next/link'
import ImageWithFallback from '../../components/ImageWithFallback'
import videos from '../../data/videos.json'

const slugify = (s='') => s.toString().normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')

export async function getStaticPaths() {
  const genres = [...new Set(videos.map(v => slugify(v.genre || 'Outros')))]
  const paths = genres.map(g => ({ params: { slug: g } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const list = videos.filter(v => slugify(v.genre || 'Outros') === params.slug)
  return { props: { list } }
}

export default function GenrePage({ list }) {
  if (!list || !list.length) return <div className="container"><p>Categoria vazia</p></div>
  return (
    <div className="container">
      <h1>{list[0].genre}</h1>
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:12, marginTop:12}}>
        {list.map(v => (
          <Link key={v.id} href={`/video/${v.id}`}>
            <a className="card">
              <ImageWithFallback src={v.thumbnail} alt={v.title} className="thumbnail" />
              <div style={{padding:10}}><strong>{v.title}</strong></div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  )
}
