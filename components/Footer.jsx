// components/Footer.jsx
export default function Footer() {
  return (
    <footer style={{borderTop:"1px solid #111", marginTop:40, padding:"20px 0"}}>
      <div className="container" style={{display:"flex", justifyContent:"space-between", alignItems:"center", gap:12, flexWrap:"wrap"}}>
        <div>© {new Date().getFullYear()} Cineva</div>
        <div style={{color:"#9ca3af"}}>
          <a href="mailto:cineva017@gmail.com">cineva017@gmail.com</a> ·
          <a href="https://wa.me/244952356080" target="_blank" style={{marginLeft:8}}>WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
