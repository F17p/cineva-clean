// pages/video/[id].js
import ImageWithFallback from '../../components/ImageWithFallback'
import videos from '../../data/videos.json'

export async function getStaticPaths() {
  const paths = videos.map(v => ({ params: { id: v.id } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const video = videos.find(v => v.id === params.id) || null
  return { props: { video } }
}

export default function VideoPage({ video }) {
  if (!video) return <div className="container"><p>Vídeo não encontrado</p></div>

  const trailer = video.trailer || null

  return (
    <div className="container">
      <h1>{video.title}</h1>
      <p style={{color:"#9ca3af"}}>{video.genre}</p>

      <div style={{marginTop:12, borderRadius:8, overflow:"hidden", background:"#000", aspectRatio:"16/9"}}>
        {trailer ? (
          <iframe
            src={trailer}
            title={video.title}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video controls src={video.src || ""} style={{width:"100%", height:"100%", objectFit:"cover"}} />
        )}
      </div>

      <div style={{marginTop:12}}>
        <p>{video.description}</p>
      </div>
    </div>
  )
}
