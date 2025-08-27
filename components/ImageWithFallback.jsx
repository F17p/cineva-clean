// components/ImageWithFallback.jsx
export default function ImageWithFallback({ src, alt, className }) {
  const fallback = "https://placehold.co/800x450?text=Cineva";
  const onError = (e) => { if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback; };
  return <img src={src} alt={alt||""} className={className} onError={onError} />;
}
