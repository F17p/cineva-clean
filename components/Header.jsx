// components/Header.jsx
import Link from "next/link";

export default function Header() {
  return (
    <header style={{borderBottom:"1px solid #111", background:"#000"}}>
      <div className="container header">
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <Link href="/"><strong style={{color:"#ff3b3b", fontSize:20}}>🎬 Cineva</strong></Link>
        </div>
        <nav className="nav">
          <Link href="/">Início</Link>
          <Link href="/genres" style={{marginLeft:12}}>Categorias</Link>
          <Link href="/about" style={{marginLeft:12}}>Sobre</Link>
          <Link href="/contact" style={{marginLeft:12}}>Contato</Link>
        </nav>
      </div>
    </header>
  );
}
