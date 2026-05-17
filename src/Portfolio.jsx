import { useState, useEffect, useRef } from "react";
import foto from './assets/foto.jpg'



const CV_DATA = {
  nombre: "Iván Rubio Murillo",
  titulo: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
  ubicacion: "Mérida, España",
  email: "rubiomurilloivan@gmail.com",
  telefono: "+34 652425974",
  linkedin: "https://www.linkedin.com/in/-ivaanrubio/",
  github: "https://github.com/ivaanrubio47",
  sobreMi: "Desarrollador junior apasionado por el desarrollo multiplataforma, con experiencia práctica en Flutter, React Native y Spring Boot. Busco seguir creciendo en entornos profesionales donde pueda aportar y aprender a partes iguales.",

  experiencia: [
    {
      empresa: "Veyve",
      puesto: "Desarrollador Multiplataforma",
      fechaInicio: "Marzo de 2026",
      fechaFin: "Junio de 2026",
      descripcion: "Prácticas de empresa desarrollando una aplicación de Networking",
      tecnologias: ["JavaScript", "TypeScript", "React JS", "React Native"],
    },
  ],

  educacion: [
    {
      centro: "IES Albarregas",
      titulo: "Técnico Superior de DAM",
      fechaInicio: "2024",
      fechaFin: "2026",
      descripcion: "Aprendizaje de diversas tecnologías y realización de una aplicación funcional como Trabajo de Fin de Grado.",
    },
    {
      centro: "Colegio Salesianos María Auxiliadora de Mérida",
      titulo: "Bachillerato",
      fechaInicio: "2022",
      fechaFin: "2024",
      descripcion: "Realización de estudios post-obligatorios",
    },
  ],

  proyectos: [
    {
      nombre: "Book&Cut",
      descripcion: "Aplicación de gestión de citas para barberías.",
      tecnologias: ["Spring Boot", "Flutter", "Java", "Dart"],
      destacado: true,
    },
    {
      nombre: "flash-entry-crypto-alert",
      descripcion: "Programa de monitorización de criptomonedas",
      tecnologias: ["Java"],
      destacado: false,
    },
  ],

  habilidades: {
    tecnicas: [
      { nombre: "Spring Boot / Java", nivel: 70 },
      { nombre: "Flutter / Dart", nivel: 65 },
      { nombre: "React Native / JavaScript - TypeScript", nivel: 60 },
      { nombre: "SQL / MySql", nivel: 65 },
    ],
    blandas: [
      "Trabajo en equipo",
      "Comunicación efectiva",
      "Aprendizaje continuo",
    ],
  },

  idiomas: [
    { idioma: "Español", nivel: "Nativo" },
    { idioma: "Inglés", nivel: "B1" },
  ],

  intereses: [
    "Desarrollo open source",
    "Diseño UI/UX",
    "Videojuegos",
    "Música",
  ],
};

const NAV_ITEMS = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "experiencia", label: "Experiencia" },
  { id: "proyectos", label: "Proyectos" },
  { id: "habilidades", label: "Habilidades" },
  { id: "educacion", label: "Educación" },
  { id: "contacto", label: "Contacto" },
];

/* ─── SCROLL REVEAL ─── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useReveal();
  const transforms = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    none: "scale(0.96)",
  };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ─── SCROLL SPY ─── */
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

/* ─── SKILL BAR ─── */
function SkillBar({ nombre, nivel, delay, index }) {
  const [ref, visible] = useReveal();
  const isEven = index % 2 === 0;
  return (
    <div ref={ref} style={{ marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "baseline" }}>
        <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{nombre}</span>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#020202" }}>{nivel}</span>
      </div>
      <div style={{ height: "2px", background: "#ffffff", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: visible ? `${nivel}%` : "0%",
          background: isEven ? "#111" : "#d7e60a",
          transition: `width 1.1s cubic-bezier(0.25,1,0.5,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
}

/* ─── GEOMETRIC DECORATION ─── */
function Geo({ type, style = {} }) {
  if (type === "circle") return (
    <div style={{ borderRadius: "50%", border: "2px solid currentColor", ...style }} />
  );
  if (type === "square") return (
    <div style={{ ...style }} />
  );
  if (type === "line") return (
    <div style={{ height: "2px", background: "currentColor", ...style }} />
  );
  if (type === "dot") return (
    <div style={{ borderRadius: "50%", background: "currentColor", ...style }} />
  );
  return null;
}

/* ─── TAG ─── */
function Tag({ children, inverted = false }) {
  const [hover, setHover] = useState(false);
  return (
    <span
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-block",
        padding: "4px 12px",
        fontSize: "10px",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        border: "1px solid",
        borderColor: inverted ? "#fff" : "#111",
        color: hover ? (inverted ? "#111" : "#fff") : (inverted ? "#fff" : "#111"),
        background: hover ? (inverted ? "#fff" : "#111") : "transparent",
        transition: "background 0.2s, color 0.2s",
        cursor: "default",
      }}
    >
      {children}
    </span>
  );
}

/* ─── MAIN ─── */
export default function Portfolio() {
  const active = useScrollSpy(NAV_ITEMS.map(n => n.id));
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const nombre = CV_DATA.nombre.includes("[") ? "TU NOMBRE" : CV_DATA.nombre.toUpperCase();
  const nombrePartes = nombre.split(" ");

  return (
    <div style={{ background: "#F5F2ED", color: "#111", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;700&family=Anton&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #E63312; color: #fff; }
        a { color: inherit; text-decoration: none; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #F5F2ED; }
        ::-webkit-scrollbar-thumb { background: #E63312; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 40 ? "#111" : "transparent",
        borderBottom: scrollY > 40 ? "none" : "none",
        transition: "background 0.4s",
      }}>
        <div style={{
          maxWidth: "1400px", margin: "0 auto", padding: "0 3rem",
          height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span onClick={() => scrollTo("inicio")} style={{
            fontFamily: "'Anton', sans-serif", fontSize: "1rem",
            color: scrollY > 40 ? "#fff" : "#111", cursor: "pointer",
            letterSpacing: "0.1em", transition: "color 0.4s",
          }}>
            {nombrePartes.slice(0, 2).join(" ")}
          </span>
          <div style={{ display: "flex", gap: "2rem" }}>
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase",
                color: active === item.id
                  ? "#E63312"
                  : scrollY > 40 ? "#fff" : "#111",
                transition: "color 0.3s",
                padding: "4px 0",
                borderBottom: active === item.id ? "2px solid #E63312" : "2px solid transparent",
              }}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section id="inicio" style={{ minHeight: "100vh", background: "#111", color: "#F5F2ED", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 0 5rem" }}>

        {/* Geometric background elements */}
        <Geo type="circle" style={{ position: "absolute", top: "10%", right: "8%", width: "320px", height: "320px", color: "#E63312", opacity: 0.15 }} />
        <Geo type="circle" style={{ position: "absolute", top: "12%", right: "9.5%", width: "260px", height: "260px", color: "#F5F2ED", opacity: 0.06 }} />
        <Geo type="square" style={{ position: "absolute", bottom: "15%", right: "20%", width: "180px", height: "180px", background: "#E63312", opacity: 0.12 }} />
        <Geo type="square" style={{ position: "absolute", top: "20%", left: "5%", width: "60px", height: "60px", background: "#E63312" }} />

        {/* Spinning circle top right */}
        <div style={{
          position: "absolute", top: "8%", right: "6%",
          width: "140px", height: "140px",
          animation: "spin 18s linear infinite",
          opacity: 0.5,
        }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute", top: "50%", left: "50%",
              width: "60px", height: "1px",
              background: "#E63312",
              transformOrigin: "0 0",
              transform: `rotate(${i * 30}deg)`,
            }} />
          ))}
        </div>


        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem", width: "100%", paddingTop: "120px" }}>
          {/* Index label */}
          <div style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.1s forwards" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "3rem" }}>
              <Geo type="dot" style={{ width: "8px", height: "8px", color: "#E63312" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "#E63312" }}>
                Portfolio & CV — {new Date().getFullYear()}
              </span>
            </div>
          </div>

          {/* Giant name */}
          <div style={{ opacity: 0, animation: "fadeUp 0.9s ease 0.2s forwards" }}>
            <h1 style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: "clamp(4rem, 12vw, 11rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
              color: "#F5F2ED",
              marginBottom: "3rem",
            }}>
              {nombrePartes.map((p, i) => (
                <span key={i} style={{ display: "block", color: i === nombrePartes.length - 1 ? "#E63312" : "#F5F2ED" }}>
                  {p}
                </span>
              ))}
            </h1>
          </div>


          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "flex-end" }}>
            <div style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.4s forwards" }}>
              <div style={{ width: "48px", height: "2px", background: "#E63312", marginBottom: "1.5rem" }} />
              <p style={{ fontSize: "1.1rem", color: "#F5F2ED", fontWeight: 300, lineHeight: 1.6, letterSpacing: "0.01em" }}>
                {CV_DATA.titulo}
              </p>
              <p style={{ fontSize: "12px", color: "#ffffff66", marginTop: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                {CV_DATA.ubicacion}
              </p>
            </div>
            <div style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.55s forwards", display: "flex", justifyContent: "flex-end", gap: "16px" }}>
              <button onClick={() => scrollTo("proyectos")} style={{
                background: "#E63312", color: "#fff", border: "none",
                padding: "14px 32px", fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
                transition: "background 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.target.style.background = "#c4280e"; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.background = "#E63312"; e.target.style.transform = "none"; }}
              >
                Ver proyectos
              </button>
              <button onClick={() => scrollTo("contacto")} style={{
                background: "transparent", color: "#F5F2ED", border: "1px solid #F5F2ED44",
                padding: "14px 32px", fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer",
                transition: "border-color 0.2s, transform 0.2s",
              }}
                onMouseEnter={e => { e.target.style.borderColor = "#F5F2ED"; e.target.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.target.style.borderColor = "#F5F2ED44"; e.target.style.transform = "none"; }}
              >
                Contactar
              </button>
              <img
                src={foto}
                alt="Iván Rubio"
                style={{
                  width: "280px",
                  height: "280px",
                  objectFit: "cover",
                  objectPosition: "center top",  // para que centre en la cara
                  filter: "grayscale(100%)",     // queda muy Bauhaus en blanco y negro
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom rule */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "#ffffff11" }} />
      </section>

      {/* ── MARQUEE ── */}
      <div style={{ background: "#E63312", overflow: "hidden", padding: "14px 0", borderTop: "none" }}>
        <div style={{ display: "flex", animation: "marquee 18s linear infinite", whiteSpace: "nowrap" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ fontFamily: "'Anton', sans-serif", fontSize: "0.85rem", color: "#fff", letterSpacing: "0.2em", marginRight: "4rem", textTransform: "uppercase" }}>
              {CV_DATA.titulo} ◆ {CV_DATA.ubicacion} ◆ Disponible ◆
            </span>
          ))}
        </div>
      </div>

      {/* ── SOBRE MÍ ── */}
      <section id="sobre-mi" style={{ padding: "7rem 0", background: "#F5F2ED" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "6rem", alignItems: "start" }}>
            <Reveal direction="left">
              <div>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", color: "#E63312", marginBottom: "1rem" }}>02 — Sobre mí</p>
                <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1, letterSpacing: "-0.01em", marginBottom: "2rem" }}>
                  QUIÉN<br />SOY
                </h2>
                <Geo type="square" style={{ width: "48px", height: "48px", background: "#E63312", marginBottom: "2rem" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {CV_DATA.idiomas.map(l => (
                    <div key={l.idioma} style={{ borderLeft: "2px solid #E63312", paddingLeft: "12px" }}>
                      <p style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.05em" }}>{l.idioma}</p>
                      <p style={{ fontSize: "11px", color: "#666" }}>{l.nivel}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal direction="right">
                <p style={{ fontSize: "1.15rem", lineHeight: 1.9, color: "#333", fontWeight: 300, marginBottom: "3rem" }}>
                  {CV_DATA.sobreMi}
                </p>
              </Reveal>
              <Reveal direction="up" delay={0.15}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", borderTop: "1px solid #ddd" }}>
                  {[
                    { label: "Email", value: CV_DATA.email, href: `mailto:${CV_DATA.email}` },
                    { label: "Teléfono", value: CV_DATA.telefono, href: `tel:${CV_DATA.telefono}` },
                    { label: "LinkedIn", value: "Ver perfil ↗", href: CV_DATA.linkedin },
                    { label: "GitHub", value: "Ver repos ↗", href: CV_DATA.github },
                  ].map(({ label, value, href }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                      display: "block", padding: "1.25rem 0", borderBottom: "1px solid #ddd",
                      textDecoration: "none", transition: "padding-left 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.paddingLeft = "8px"; }}
                      onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; }}
                    >
                      <p style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#999", marginBottom: "4px" }}>{label}</p>
                      <p style={{ fontSize: "13px", fontWeight: 700, color: "#111" }}>{value}</p>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCIA ── */}
      <section id="experiencia" style={{ padding: "7rem 0", background: "#111", color: "#F5F2ED" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2rem", marginBottom: "5rem", borderBottom: "1px solid #333", paddingBottom: "2rem" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", color: "#E63312", textTransform: "uppercase" }}>03 — Experiencia</p>
              <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.01em" }}>TRAYECTORIA</h2>
            </div>
          </Reveal>
          {CV_DATA.experiencia.map((exp, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                display: "grid", gridTemplateColumns: "60px 180px 1fr",
                gap: "2rem", padding: "2.5rem 0", borderBottom: "1px solid #222",
                alignItems: "start",
              }}>
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.5rem", color: "#E63312", lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p style={{ fontSize: "10px", color: "#666", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
                    {exp.fechaInicio} — {exp.fechaFin}
                  </p>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#E63312", letterSpacing: "0.04em" }}>{exp.empresa}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "0.02em" }}>{exp.puesto}</h3>
                  <p style={{ fontSize: "14px", color: "#888", lineHeight: 1.8, marginBottom: "1.25rem", fontWeight: 300 }}>{exp.descripcion}</p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {exp.tecnologias.map(t => <Tag key={t} inverted>{t}</Tag>)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── PROYECTOS ── */}
      <section id="proyectos" style={{ padding: "7rem 0", background: "#F5F2ED" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2rem", marginBottom: "5rem", borderBottom: "1px solid #ddd", paddingBottom: "2rem" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", color: "#E63312", textTransform: "uppercase" }}>04 — Proyectos</p>
              <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.01em" }}>TRABAJO</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0" }}>
            {CV_DATA.proyectos.map((p, i) => {
              const isFirst = i === 0;
              return (
                <Reveal key={i} delay={i * 0.1} direction="up">
                  <div style={{
                    padding: "2.5rem",
                    background: isFirst ? "#111" : "#F5F2ED",
                    color: isFirst ? "#F5F2ED" : "#111",
                    border: "1px solid",
                    borderColor: isFirst ? "#111" : "#ddd",
                    minHeight: "320px",
                    display: "flex", flexDirection: "column",
                    transition: "transform 0.25s",
                    cursor: "default",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
                      <span style={{ fontFamily: "'Anton', sans-serif", fontSize: "3rem", color: "#E63312", lineHeight: 1 }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {p.destacado && (
                        <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", background: "#E63312", color: "#fff", padding: "4px 10px" }}>
                          Destacado
                        </span>
                      )}
                    </div>
                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.75rem", letterSpacing: "0.02em", flex: 1 }}>{p.nombre}</h3>
                    <p style={{ fontSize: "13px", lineHeight: 1.75, color: isFirst ? "#aaa" : "#555", marginBottom: "1.5rem", fontWeight: 300 }}>{p.descripcion}</p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: p.enlace && !p.enlace.includes("[") ? "1rem" : "0" }}>
                      {p.tecnologias.map(t => <Tag key={t} inverted={isFirst}>{t}</Tag>)}
                    </div>
                    {p.enlace && !p.enlace.includes("[") && (
                      <a href={p.enlace} target="_blank" rel="noreferrer" style={{
                        fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                        color: "#E63312", display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "0.75rem",
                      }}>
                        Ver proyecto →
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HABILIDADES ── */}
      <section id="habilidades" style={{ padding: "7rem 0", background: "#E63312", color: "#fff" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2rem", marginBottom: "5rem", borderBottom: "1px solid #ffffff33", paddingBottom: "2rem" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", color: "#ffffff99", textTransform: "uppercase" }}>05 — Habilidades</p>
              <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.01em" }}>SKILLS</h2>
            </div>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem" }}>
            <div>
              <Reveal>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "2rem", color: "#ffffff99" }}>
                  Técnicas
                </p>
              </Reveal>
              {CV_DATA.habilidades.tecnicas.map((h, i) => (
                <SkillBar key={h.nombre} nombre={h.nombre} nivel={h.nivel} delay={i * 0.08} index={i} />
              ))}
            </div>
            <div>
              <Reveal delay={0.1}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "2rem", color: "#ffffff99" }}>
                  Blandas
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "3rem" }}>
                  {CV_DATA.habilidades.blandas.map((h, i) => (
                    <div key={i} style={{
                      padding: "1rem 0", borderBottom: "1px solid #ffffff33",
                      display: "flex", alignItems: "center", gap: "16px",
                      fontSize: "14px", fontWeight: 400,
                    }}>
                      <span style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.2rem", color: "#fff", opacity: 0.3 }}>{String(i + 1).padStart(2, "0")}</span>
                      {h}
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "1.5rem", color: "#ffffff99" }}>
                  Intereses
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {CV_DATA.intereses.map((int, i) => (
                    <span key={i} style={{
                      padding: "6px 16px", fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      border: "1px solid #ffffff66", color: "#fff",
                    }}>{int}</span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCACIÓN ── */}
      <section id="educacion" style={{ padding: "7rem 0", background: "#F5F2ED" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2rem", marginBottom: "5rem", borderBottom: "1px solid #ddd", paddingBottom: "2rem" }}>
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", color: "#E63312", textTransform: "uppercase" }}>06 — Educación</p>
              <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.01em" }}>FORMACIÓN</h2>
            </div>
          </Reveal>
          {CV_DATA.educacion.map((edu, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                display: "grid", gridTemplateColumns: "60px 180px 1fr",
                gap: "2rem", padding: "2.5rem 0", borderBottom: "1px solid #ddd", alignItems: "start",
              }}>
                <span style={{ fontFamily: "'Anton', sans-serif", fontSize: "1.5rem", color: "#E63312", lineHeight: 1 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p style={{ fontSize: "10px", color: "#999", letterSpacing: "0.08em", textTransform: "uppercase", paddingTop: "4px" }}>
                  {edu.fechaInicio} — {edu.fechaFin}
                </p>
                <div>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "4px", letterSpacing: "0.02em" }}>{edu.titulo}</h3>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#E63312", marginBottom: "0.5rem", letterSpacing: "0.04em" }}>{edu.centro}</p>
                  {edu.descripcion && (
                    <p style={{ fontSize: "13px", color: "#666", lineHeight: 1.8, fontWeight: 300 }}>{edu.descripcion}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" style={{ padding: "7rem 0", background: "#111", color: "#F5F2ED" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 3rem" }}>
          <Reveal>
            <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.3em", color: "#E63312", textTransform: "uppercase", marginBottom: "1rem" }}>07 — Contacto</p>
            <h2 style={{ fontFamily: "'Anton', sans-serif", fontSize: "clamp(3rem, 8vw, 8rem)", lineHeight: 0.9, letterSpacing: "-0.02em", marginBottom: "4rem" }}>
              HABLEMOS<span style={{ color: "#E63312" }}>.</span>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem" }}>
            <Reveal direction="left">
              <p style={{ fontSize: "1.1rem", color: "#888", lineHeight: 1.9, fontWeight: 300 }}>
                ¿Tienes una propuesta, proyecto o simplemente quieres hablar? Estoy abierto a nuevas oportunidades.
              </p>
            </Reveal>
            <Reveal direction="right">
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { label: "Email", value: CV_DATA.email, href: `mailto:${CV_DATA.email}` },
                  { label: "Teléfono", value: CV_DATA.telefono, href: `tel:${CV_DATA.telefono}` },
                  { label: "LinkedIn", value: "linkedin.com/in/...", href: CV_DATA.linkedin },
                  { label: "GitHub", value: "github.com/...", href: CV_DATA.github },
                ].map(({ label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "1.25rem 0", borderBottom: "1px solid #222",
                    textDecoration: "none", transition: "padding-left 0.25s, color 0.25s",
                    color: "#F5F2ED",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.paddingLeft = "12px"; e.currentTarget.style.color = "#E63312"; }}
                    onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.color = "#F5F2ED"; }}
                  >
                    <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#555" }}>{label}</span>
                    <span style={{ fontSize: "13px", fontWeight: 700 }}>{value} →</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#E63312", padding: "1.5rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Anton', sans-serif", fontSize: "0.9rem", color: "#fff", letterSpacing: "0.1em" }}>
          {CV_DATA.nombre.toUpperCase()}
        </span>
        <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", color: "#ffffff99", textTransform: "uppercase" }}>
          © {new Date().getFullYear()} — Todos los derechos reservados
        </span>
      </footer>
    </div>
  );
}