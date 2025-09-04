// pages/video/[id].js
import SmartPlayer from '../../components/SmartPlayer'
import movies from '../../data/movies.json'

export async function getStaticPaths() {
  const paths = movies.map(v => ({ params: { id: v.id } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const video = movies.find(v => v.id === params.id) || null
  return { props: { video } }
}

export default function VideoPage({ video }) {
  if (!video) return <div className="container"><p>Vídeo não encontrado</p></div>

  const { title, description, thumbnail, src, embed, youtubeId, genre, year } = video

  return (
    <div className="container">
      <h1 style={{marginBottom:4}}>{title}</h1>
      <p style={{color:'#9ca3af', marginTop:0}}>{genre} • {year}</p>

      <div style={{marginTop:12}}>
        <SmartPlayer
          src={src}
          embed={embed}
          youtubeId={youtubeId}
          poster={thumbnail}
          title={title}
        />
      </div>

      {description && <p style={{marginTop:12}}>{description}</p>}
    </div>
  )
}
