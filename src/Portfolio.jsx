import { useState, useEffect, useRef } from "react";
import foto from './assets/fotocamisetamerida.jpeg'

const CV_DATA = {
  nombre: "Iván Rubio Murillo",
  titulo: "Técnico Superior en Desarrollo de Aplicaciones Multiplataforma",
  ubicacion: "Mérida, España",
  email: "rubiomurilloivan@gmail.com",
  telefono: "+34 652425974",
  linkedin: "https://www.linkedin.com/in/-ivaanrubio/",
  github: "https://github.com/ivaanrubio47",
  sobreMi: "Desarrollador Junior apasionado por el desarrollo móvil y de software. Buscando integrarme en un equipo técnico experimentado donde aportar valor, mientras sigo aprendiendo y escalando mis conocimientos tecnológicos.",
  experiencia: [
    {
      empresa: "Veyve",
      puesto: "Desarrollador Multiplataforma",
      fechaInicio: "Marzo de 2026",
      fechaFin: "Junio de 2026",
      descripcion: "Prácticas de empresa desarrollando una aplicación de Networking",
      tecnologias: ["JavaScript", "TypeScript", "React JS", "React Native"],
    },
    {
      empresa: "Barocco",
      puesto: "Camarero",
      fechaInicio: "Septiembre 2026",
      descripcion: "Camarero nocturno en ambiente de discoteca, trabajando en equipo y bajo presión",
      tecnologias: ["Trabajo en equipo", "Comunicación efectiva", "Gestión del tiempo"]
    },
  ],
  educacion: [
    {
      centro: "IES Albarregas",
      titulo: "Máster de Formación Profesional en Recursos y Servicios en la Nube (En curso)",
      fechaInicio: "2026",
      fechaFin: "2027",
      descripcion: "Aprendizaje de competencias para desplegar, administrar y securizar infraestructuras en plataformas cloud (computación, bases de datos y redes).",
    },
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
      descripcion: "Programa de monitorización de criptomonedas.",
      tecnologias: ["React Native"],
      destacado: false,
    },
    {
      nombre: "networking",
      descripcion: "Red social entre trabajadores para publicar eventos cercanos sobre tecnología.",
      tecnologias: ["React Native", "React JS", "TypeScript", "JavaScript"],
      destacado: false,
    },
  ],
  habilidades: {
    tecnicas: [
      { nombre: "Spring Boot / Java", nivel: 90 },
      { nombre: "Flutter / Dart", nivel: 65 },
      { nombre: "React Native / JavaScript - TypeScript", nivel: 95 },
      { nombre: "SQL / MySql", nivel: 90 },
    ],
    blandas: ["Trabajo en equipo", "Comunicación efectiva", "Aprendizaje continuo"],
  },
  idiomas: [
    { idioma: "Español", nivel: "Nativo" },
    { idioma: "Inglés", nivel: "B1 - Certified by University of Oxford" },
  ],
  intereses: ["Desarrollo open source", "Diseño UI/UX", "Páginas web", "Videojuegos"],
};

const NAV_ITEMS = [
  { id: "inicio",       label: "Inicio" },
  { id: "sobre-mi",    label: "Sobre mí" },
  { id: "experiencia", label: "Experiencia" },
  { id: "proyectos",   label: "Proyectos" },
  { id: "habilidades", label: "Habilidades" },
  { id: "educacion",   label: "Educación" },
  { id: "contacto",    label: "Contacto" },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useReveal();
  const transforms = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)" };
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : (transforms[direction] || "translateY(40px)"),
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isMobile;
}

function SkillBar({ nombre, nivel, delay }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ marginBottom: "1.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "baseline" }}>
        <span style={{
          fontFamily: "'Playfair Display', serif", fontStyle: "italic",
          fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)",
          letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", fontWeight: 700,
        }}>{nombre}</span>
        <span style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "0.85rem", color: "#555" }}>{nivel}%</span>
      </div>
      <div style={{ height: "1px", background: "#1a1a1a", position: "relative" }}>
        <div style={{
          position: "absolute", left: 0, top: 0, height: "100%",
          width: visible ? `${nivel}%` : "0%",
          background: "#fff",
          transition: `width 1.2s cubic-bezier(0.25,1,0.5,1) ${delay}s`,
        }} />
      </div>
    </div>
  );
}

function Tag({ children, inverted = false }) {
  return (
    <span style={{
      display: "inline-block", padding: "3px 12px",
      fontSize: "9px", fontWeight: 700,
      fontFamily: "'Playfair Display', serif", fontStyle: "italic",
      letterSpacing: "0.1em", textTransform: "uppercase",
      border: "1px solid", borderColor: "#1f1f1f",
      color: "#555", background: "transparent",
    }}>
      {children}
    </span>
  );
}

export default function Portfolio() {
  const active = useScrollSpy(NAV_ITEMS.map(n => n.id));
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { if (menuOpen) setMenuOpen(false); }, [scrollY]);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const pad = isMobile ? "0 1.25rem" : "0 4rem";
  const secPad = isMobile ? "5rem 0" : "9rem 0";
  const T = { fontFamily: "'Playfair Display', serif" };

  return (
    <div style={{ background: "#000", color: "#fff", minHeight: "100vh", ...T, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #fff; color: #000; }
        a { color: inherit; text-decoration: none; }
        ::-webkit-scrollbar { width: 2px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #222; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:none} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 40 || menuOpen ? "#000" : "transparent",
        borderBottom: scrollY > 40 ? "1px solid #7F011F" : "none",
        transition: "background 0.4s",
      }}>
        <div style={{
          maxWidth: "1400px", margin: "0 auto", padding: pad,
          height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span onClick={() => scrollTo("inicio")} style={{
            ...T, fontWeight: 900, fontStyle: "italic",
            fontSize: "1.05rem", letterSpacing: "0.05em", cursor: "pointer",
            color: "#fff", textTransform: "uppercase",
          }}>
            Iván Rubio
          </span>

          {!isMobile && (
            <div style={{ display: "flex", gap: "2.5rem" }}>
              {NAV_ITEMS.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  ...T, fontStyle: "italic", fontSize: "10px", letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: active === item.id ? "#fff" : "#7F011F",
                  borderBottom: active === item.id ? "1px solid #fff" : "1px solid transparent",
                  paddingBottom: "2px", transition: "color 0.3s",
                }}>
                  {item.label}
                </button>
              ))}
            </div>
          )}

          {isMobile && (
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px" }}>
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: "block", width: "22px", height: "1px", background: "#fff",
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: menuOpen ? i === 0 ? "rotate(45deg) translate(4px,4px)" : i === 2 ? "rotate(-45deg) translate(4px,-4px)" : "none" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          )}
        </div>

        {isMobile && menuOpen && (
          <div style={{ background: "#000", borderTop: "1px solid #111" }}>
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)} style={{
                display: "block", width: "100%", background: "none", border: "none",
                cursor: "pointer", padding: "1rem 1.25rem", textAlign: "left",
                ...T, fontStyle: "italic", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase",
                color: active === item.id ? "#fff" : "#444",
                borderBottom: "1px solid #111",
              }}>
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="inicio" style={{
        minHeight: "100vh", background: "#000",
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: isMobile ? "100px 1.25rem 5rem" : "0 4rem",
        position: "relative",
      }}>
        {!isMobile && (
          <div style={{ position: "absolute", top: 0, bottom: 0, right: "4rem", width: "1px", background: "#0d0d0d" }} />
        )}

        <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
          <div style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.1s forwards" }}>
            <p style={{ ...T, fontStyle: "italic", fontSize: "10px", letterSpacing: "0.35em", color: "#777777", marginBottom: "2.5rem", textTransform: "uppercase" }}>
              Portfolio & CV — {new Date().getFullYear()}
              <span style={{ animation: "blink 1.2s step-end infinite", marginLeft: "6px" }}>_</span>
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr auto", gap: isMobile ? "2.5rem" : "4rem", alignItems: "flex-end" }}>
            <div>
              <div style={{ opacity: 0, animation: "fadeUp 0.9s ease 0.2s forwards" }}>
                <h1 style={{
                  ...T, fontWeight: 900, fontStyle: "italic",
                  fontSize: "clamp(3.5rem, 13vw, 12rem)",
                  lineHeight: 0.87, letterSpacing: "-0.03em",
                  textTransform: "uppercase", color: "#fff", marginBottom: "2rem",
                }}>
                  {CV_DATA.nombre.split(" ").map((p, i) => (
                    <span key={i} style={{ display: "block" }}>{p}</span>
                  ))}
                </h1>
              </div>

              <div style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.4s forwards" }}>
                <div style={{ height: "1px", background: "#1a1a1a", marginBottom: "1.25rem", maxWidth: "520px" }} />
                <p style={{ ...T, fontStyle: "italic", fontSize: isMobile ? "1rem" : "1.2rem", color: "#666", lineHeight: 1.5, maxWidth: "520px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {CV_DATA.titulo}
                </p>
                <p style={{ ...T, fontStyle: "italic", fontSize: "10px", color: "#777777", marginTop: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {CV_DATA.ubicacion}
                </p>
              </div>

              <div style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.55s forwards", display: "flex", gap: "1rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
                <button onClick={() => scrollTo("proyectos")} style={{
                  background: "#fff", color: "#000", border: "none",
                  padding: "12px 28px", cursor: "pointer",
                  ...T, fontStyle: "italic", fontWeight: 700,
                  fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                  transition: "background 0.2s",
                }}
                  onMouseEnter={e => { e.target.style.background = "#ccc"; }}
                  onMouseLeave={e => { e.target.style.background = "#fff"; }}
                >
                  Ver proyectos
                </button>
                <button onClick={() => scrollTo("contacto")} style={{
                  background: "transparent", color: "#444", border: "1px solid #222",
                  padding: "12px 28px", cursor: "pointer",
                  ...T, fontStyle: "italic",
                  fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                  onMouseEnter={e => { e.target.style.borderColor = "#fff"; e.target.style.color = "#fff"; }}
                  onMouseLeave={e => { e.target.style.borderColor = "#222"; e.target.style.color = "#444"; }}
                >
                  Contactar
                </button>
              </div>
            </div>

            <div style={{ opacity: 0, animation: "fadeUp 0.7s ease 0.5s forwards", display: "flex", justifyContent: isMobile ? "flex-start" : "flex-end" }}>
              <img src={foto} alt="Iván Rubio" style={{
                width: isMobile ? "160px" : "260px",
                height: isMobile ? "200px" : "320px",
                objectFit: "cover", objectPosition: "center top",
                filter: "grayscale(100%) contrast(1.1)",
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ borderTop: "1px solid #7F011F", borderBottom: "1px solid #7F011F", overflow: "hidden", padding: "13px 0" }}>
        <div style={{ display: "flex", animation: "marquee 22s linear infinite", whiteSpace: "nowrap" }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} style={{ ...T, fontStyle: "italic", fontSize: "0.75rem", color: "#7F011F", letterSpacing: "0.25em", marginRight: "4rem", textTransform: "uppercase" }}>
              {CV_DATA.titulo} ◆ {CV_DATA.ubicacion} ◆ Disponible ◆
            </span>
          ))}
        </div>
      </div>

      {/* SOBRE MÍ */}
      <section id="sobre-mi" style={{ padding: secPad }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: pad }}>
          <div style={{ height: "1px", background: "#111", marginBottom: "3rem" }} />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr", gap: isMobile ? "3rem" : "8rem", alignItems: "start" }}>
            <Reveal direction={isMobile ? "up" : "left"}>
              <p style={{ ...T, fontStyle: "italic", fontSize: "10px", letterSpacing: "0.3em", color: "#444", textTransform: "uppercase", marginBottom: "1rem" }}>02 — Sobre mí</p>
              <h2 style={{ ...T, fontWeight: 900, fontStyle: "italic", fontSize: "clamp(2.5rem, 6vw, 5.5rem)", lineHeight: 0.88, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "2.5rem" }}>
                QUIÉN<br />SOY
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {CV_DATA.idiomas.map(l => (
                  <div key={l.idioma} style={{ borderLeft: "1px solid #1f1f1f", paddingLeft: "12px" }}>
                    <p style={{ ...T, fontWeight: 700, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{l.idioma}</p>
                    <p style={{ ...T, fontStyle: "italic", fontSize: "11px", color: "#555" }}>{l.nivel}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <div>
              <Reveal direction={isMobile ? "up" : "right"}>
                <p style={{ ...T, fontWeight: 700, fontStyle: "italic", fontSize: isMobile ? "1.3rem" : "1.9rem", lineHeight: 1.3, textTransform: "uppercase", letterSpacing: "0.02em", color: "#ccc", marginBottom: "3rem" }}>
                  {CV_DATA.sobreMi}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", borderTop: "1px solid #111" }}>
                  {[
                    { label: "Email", value: CV_DATA.email, href: `mailto:${CV_DATA.email}` },
                    { label: "Teléfono", value: CV_DATA.telefono, href: `tel:${CV_DATA.telefono}` },
                    { label: "LinkedIn", value: "Ver perfil ↗", href: CV_DATA.linkedin },
                    { label: "GitHub", value: "Ver repos ↗", href: CV_DATA.github },
                  ].map(({ label, value, href }) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                      display: "block", padding: "1.25rem 0", borderBottom: "1px solid #111",
                      transition: "padding-left 0.2s",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.paddingLeft = "8px"; }}
                      onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; }}
                    >
                      <p style={{ ...T, fontStyle: "italic", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#444", marginBottom: "4px" }}>{label}</p>
                      <p style={{ ...T, fontWeight: 700, fontSize: "13px", color: "#fff", wordBreak: "break-all" }}>{value}</p>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCIA */}
      <section id="experiencia" style={{ padding: secPad }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: pad }}>
          <div style={{ height: "1px", background: "#111", marginBottom: "3rem" }} />
          <Reveal>
            <p style={{ ...T, fontStyle: "italic", fontSize: "10px", letterSpacing: "0.3em", color: "#444", textTransform: "uppercase", marginBottom: "1rem" }}>03 — Experiencia</p>
            <h2 style={{ ...T, fontWeight: 900, fontStyle: "italic", fontSize: "clamp(2.5rem, 8vw, 8rem)", lineHeight: 0.87, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "4rem" }}>
              TRAYECTORIA
            </h2>
          </Reveal>
          {CV_DATA.experiencia.map((exp, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "140px 1fr",
                gap: isMobile ? "1rem" : "4rem",
                padding: "2.5rem 0", borderBottom: "1px solid #111",
              }}>
                <div>
                  <p style={{ ...T, fontStyle: "italic", fontSize: "9px", letterSpacing: "0.15em", color: "#444", textTransform: "uppercase", lineHeight: 1.8 }}>
                    {exp.fechaInicio}<br />{exp.fechaFin}
                  </p>
                  <p style={{ ...T, fontWeight: 700, fontSize: "11px", color: "#fff", marginTop: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    {exp.empresa}
                  </p>
                </div>
                <div>
                  <h3 style={{ ...T, fontWeight: 900, fontStyle: "italic", fontSize: "clamp(1.4rem, 3vw, 2.5rem)", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "1rem" }}>
                    {exp.puesto}
                  </h3>
                  <p style={{ ...T, fontStyle: "italic", fontSize: "1rem", color: "#555", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                    {exp.descripcion}
                  </p>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {exp.tecnologias.map(t => <Tag key={t}>{t}</Tag>)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" style={{ padding: secPad }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: pad }}>
          <div style={{ height: "1px", background: "#111", marginBottom: "3rem" }} />
          <Reveal>
            <p style={{ ...T, fontStyle: "italic", fontSize: "10px", letterSpacing: "0.3em", color: "#444", textTransform: "uppercase", marginBottom: "1rem" }}>04 — Proyectos</p>
            <h2 style={{ ...T, fontWeight: 900, fontStyle: "italic", fontSize: "clamp(2.5rem, 8vw, 8rem)", lineHeight: 0.87, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "4rem" }}>
              TRABAJO
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {CV_DATA.proyectos.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "80px 1fr",
                  gap: isMobile ? "1rem" : "3rem",
                  padding: "2.5rem 0", borderBottom: "1px solid #7F011F",
                  alignItems: "start", transition: "background 0.2s", cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#080808"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ ...T, fontWeight: 900, fontStyle: "italic", fontSize: "2rem", color: "#1a1a1a", lineHeight: 1 }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                      <h3 style={{ ...T, fontWeight: 900, fontStyle: "italic", fontSize: "clamp(1.5rem, 4vw, 3rem)", textTransform: "uppercase", letterSpacing: "-0.02em", lineHeight: 1 }}>
                        {p.nombre}
                      </h3>
                      {p.destacado && (
                        <span style={{ ...T, fontStyle: "italic", fontSize: "9px", letterSpacing: "0.2em", color: "#7F011F", textTransform: "uppercase", border: "1px solid #7F011F", padding: "2px 8px" }}>
                          Destacado
                        </span>
                      )}
                    </div>
                    <p style={{ ...T, fontStyle: "italic", fontSize: "1rem", color: "#555", lineHeight: 1.75, marginBottom: "1rem" }}>
                      {p.descripcion}
                    </p>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {p.tecnologias.map(t => <Tag key={t}>{t}</Tag>)}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HABILIDADES */}
      <section id="habilidades" style={{ padding: secPad }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: pad }}>
          <div style={{ height: "1px", background: "#111", marginBottom: "3rem" }} />
          <Reveal>
            <p style={{ ...T, fontStyle: "italic", fontSize: "10px", letterSpacing: "0.3em", color: "#444", textTransform: "uppercase", marginBottom: "1rem" }}>05 — Habilidades</p>
            <h2 style={{ ...T, fontWeight: 900, fontStyle: "italic", fontSize: "clamp(2.5rem, 8vw, 8rem)", lineHeight: 0.87, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "4rem" }}>
              SKILLS
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "3rem" : "8rem" }}>
            <div>
              <Reveal>
                <p style={{ ...T, fontStyle: "italic", fontSize: "10px", letterSpacing: "0.25em", color: "#333", textTransform: "uppercase", marginBottom: "2rem" }}>— Técnicas</p>
              </Reveal>
              {CV_DATA.habilidades.tecnicas.map((h, i) => (
                <SkillBar key={h.nombre} nombre={h.nombre} nivel={h.nivel} delay={i * 0.08} />
              ))}
            </div>
            <div>
              <Reveal delay={0.1}>
                <p style={{ ...T, fontStyle: "italic", fontSize: "10px", letterSpacing: "0.25em", color: "#333", textTransform: "uppercase", marginBottom: "2rem" }}>— Blandas</p>
                <div style={{ marginBottom: "3.5rem" }}>
                  {CV_DATA.habilidades.blandas.map((h, i) => (
                    <div key={i} style={{ padding: "1.1rem 0", borderBottom: "1px solid #111", display: "flex", alignItems: "center", gap: "1.5rem" }}>
                      <span style={{ ...T, fontWeight: 900, fontStyle: "italic", fontSize: "1.8rem", color: "#111", lineHeight: 1 }}>{String(i + 1).padStart(2, "0")}</span>
                      <span style={{ ...T, fontWeight: 700, fontStyle: "italic", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <p style={{ ...T, fontStyle: "italic", fontSize: "10px", letterSpacing: "0.25em", color: "#333", textTransform: "uppercase", marginBottom: "1.5rem" }}>— Intereses</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {CV_DATA.intereses.map((int, i) => (
                    <span key={i} style={{ ...T, fontStyle: "italic", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid #1a1a1a", color: "#444", padding: "5px 14px" }}>
                      {int}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCACIÓN */}
      <section id="educacion" style={{ padding: secPad }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: pad }}>
          <div style={{ height: "1px", background: "#111", marginBottom: "3rem" }} />
          <Reveal>
            <p style={{ ...T, fontStyle: "italic", fontSize: "10px", letterSpacing: "0.3em", color: "#444", textTransform: "uppercase", marginBottom: "1rem" }}>06 — Educación</p>
            <h2 style={{ ...T, fontWeight: 900, fontStyle: "italic", fontSize: "clamp(2.5rem, 8vw, 8rem)", lineHeight: 0.87, textTransform: "uppercase", letterSpacing: "-0.02em", marginBottom: "4rem" }}>
              FORMACIÓN
            </h2>
          </Reveal>
          {CV_DATA.educacion.map((edu, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "140px 1fr",
                gap: isMobile ? "0.75rem" : "4rem",
                padding: "2.5rem 0", borderBottom: "1px solid #111",
              }}>
                <p style={{ ...T, fontStyle: "italic", fontSize: "9px", letterSpacing: "0.15em", color: "#444", textTransform: "uppercase", lineHeight: 1.8 }}>
                  {edu.fechaInicio}<br />{edu.fechaFin}
                </p>
                <div>
                  <h3 style={{ ...T, fontWeight: 900, fontStyle: "italic", fontSize: "clamp(1.3rem, 3vw, 2.2rem)", textTransform: "uppercase", letterSpacing: "-0.01em", lineHeight: 1, marginBottom: "0.5rem" }}>
                    {edu.titulo}
                  </h3>
                  <p style={{ ...T, fontStyle: "italic", fontSize: "12px", color: "#444", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    {edu.centro}
                  </p>
                  {edu.descripcion && (
                    <p style={{ ...T, fontStyle: "italic", fontSize: "0.95rem", color: "#555", lineHeight: 1.8 }}>
                      {edu.descripcion}
                    </p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" style={{ padding: secPad }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: pad }}>
          <div style={{ height: "1px", background: "#111", marginBottom: "3rem" }} />
          <Reveal>
            <p style={{ ...T, fontStyle: "italic", fontSize: "10px", letterSpacing: "0.3em", color: "#444", textTransform: "uppercase", marginBottom: "1rem" }}>07 — Contacto</p>
            <h2 style={{ ...T, fontWeight: 900, fontStyle: "italic", fontSize: "clamp(3rem, 12vw, 12rem)", lineHeight: 0.87, textTransform: "uppercase", letterSpacing: "-0.03em", marginBottom: "4rem" }}>
              HABLEMOS.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "2.5rem" : "8rem" }}>
            <Reveal direction={isMobile ? "up" : "left"}>
              <p style={{ ...T, fontStyle: "italic", fontSize: isMobile ? "1rem" : "1.3rem", color: "#555", lineHeight: 1.8, textTransform: "uppercase", letterSpacing: "0.02em" }}>
                ¿Tienes una propuesta, proyecto o simplemente quieres hablar? Estoy abierto a nuevas oportunidades.
              </p>
            </Reveal>
            <Reveal direction={isMobile ? "up" : "right"}>
              <div>
                {[
                  { label: "Email", value: CV_DATA.email, href: `mailto:${CV_DATA.email}` },
                  { label: "Teléfono", value: CV_DATA.telefono, href: `tel:${CV_DATA.telefono}` },
                  { label: "LinkedIn", value: "linkedin.com/in/-ivaanrubio", href: CV_DATA.linkedin },
                  { label: "GitHub", value: "github.com/ivaanrubio47", href: CV_DATA.github },
                ].map(({ label, value, href }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "1.25rem 0", borderBottom: "1px solid #111",
                    gap: "1rem", transition: "padding-left 0.2s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.paddingLeft = "10px"; }}
                    onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; }}
                  >
                    <span style={{ ...T, fontStyle: "italic", fontSize: "9px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#444", flexShrink: 0 }}>{label}</span>
                    <span style={{ ...T, fontWeight: 700, fontSize: "12px", color: "#fff", wordBreak: "break-all", textAlign: "right" }}>{value} →</span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #111", padding: "1.5rem 4rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <span style={{ ...T, fontWeight: 900, fontStyle: "italic", fontSize: "0.95rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
          Iván Rubio Murillo
        </span>
        <span style={{ ...T, fontStyle: "italic", fontSize: "10px", letterSpacing: "0.15em", color: "#333", textTransform: "uppercase" }}>
          © {new Date().getFullYear()} — Todos los derechos reservados
        </span>
      </footer>
    </div>
  );
}