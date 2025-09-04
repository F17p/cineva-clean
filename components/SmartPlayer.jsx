// components/SmartPlayer.jsx
import { useEffect, useRef, useState } from 'react'

export default function SmartPlayer({ src, poster, embed, youtubeId, title = 'Player' }) {
  const videoRef = useRef(null)
  const [hlsFailed, setHlsFailed] = useState(false)

  const isHls = typeof src === 'string' && src.endsWith('.m3u8')
  const isMp4 = typeof src === 'string' && src.endsWith('.mp4')

  useEffect(() => {
    let hls
    const el = videoRef.current
    if (!el || !isHls) return

    // Safari iOS/macOS já toca HLS nativamente
    if (el.canPlayType('application/vnd.apple.mpegurl')) {
      el.src = src
      return
    }

    // Chrome/Firefox/Edge: usar hls.js sob demanda
    ;(async () => {
      try {
        const Hls = (await import('hls.js')).default
        if (Hls.isSupported()) {
          hls = new Hls({ enableWorker: true })
          hls.loadSource(src)
          hls.attachMedia(el)
          hls.on(Hls.Events.ERROR, () => {
            setHlsFailed(true)
          })
        } else {
          setHlsFailed(true)
        }
      } catch (e) {
        setHlsFailed(true)
      }
    })()

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [src, isHls])

  // 1) EMBED DIRETO (ex.: Vimeo/Archive iframe)
  if (embed) {
    return (
      <div style={{position:'relative', paddingTop:'56.25%'}}>
        <iframe
          src={embed}
          title={title}
          style={{position:'absolute', inset:0, width:'100%', height:'100%'}}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // 2) YOUTUBE PELO ID
  if (youtubeId) {
    return (
      <div style={{position:'relative', paddingTop:'56.25%'}}>
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          style={{position:'absolute', inset:0, width:'100%', height:'100%'}}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  // 3) HLS (.m3u8) ou MP4
  if (isHls || isMp4) {
    return (
      <video
        ref={videoRef}
        controls
        poster={poster}
        src={isMp4 ? src : undefined}
        style={{width:'100%', height:'auto', background:'#000', borderRadius:12}}
      />
    )
  }

  // 4) Sem fonte
  return (
    <div style={{display:'grid', placeItems:'center', aspectRatio:'16/9', background:'#000', color:'#aaa', borderRadius:12}}>
      Fonte de vídeo não definida.
    </div>
  )
}
