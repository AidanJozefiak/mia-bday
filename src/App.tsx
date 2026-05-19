import { useState, useEffect, useRef } from "react";

const playSound = (src: string) => {
  const audio = new Audio(src);
  audio.volume = 1 / 3;
  audio.play().catch(() => {});
};

const PANELS = [
  { id: 1, outerImage: "/images/reveal1.jpg", innerImage: "/images/panel1.jpg", color: "#FADADD", hint: "Your room", riddle: "A collection of awards, displayed around two meters high. Near the green beaded necklace, is where I reside.", answer: "gooby", word: "gooby" },
  { id: 2, outerImage: "/images/reveal2.jpg", innerImage: "/images/panel2.jpg", color: "#B5D8F7", hint: "Living room", riddle: "Two shelves on the left, and two on the right. Two drawers in the middle, and entertainment for the night.", answer: "gabba", word: "gabba" },
  { id: 3, outerImage: "/images/reveal3.jpg", innerImage: "/images/panel3.jpg", color: "#FFCBA4", hint: "Living room", riddle: "Whithin a table with cables, with ports and plants.", answer: "yoyoo", word: "yoyoo" },
  { id: 4, outerImage: "/images/reveal4.jpg", innerImage: "/images/panel4.jpg", color: "#D4B8E0", hint: "Kitchen", riddle: "A little extra from here, and a little extra from there. I'll hide underneath, she will never know where.", answer: "yabba", word: "yabba" },
  { id: 5, outerImage: "/images/reveal5.jpg", innerImage: "/images/panel5.jpg", color: "#C8E6C9", hint: "Hallway", riddle: "A means of transit from one floor to another. I watch over it all day, and have a great memory, I'd say.", answer: "say", word: "say" },
  { id: 6, outerImage: "/images/reveal6.jpg", innerImage: "/images/panel6.jpg", color: "#E8EAF6", hint: "Hallway", riddle: "A room with no room, a shelf with no light. Q-tips, towels, and a red bag on the right.", answer: "these", word: "these" },
  { id: 7, outerImage: "/images/reveal7.jpg", innerImage: "/images/panel7.jpg", color: "#FFCDD2", hint: "Bathroom", riddle: "This room smells bad, but in here its just right. This small brown tin will be my bed for tonight.", answer: "floobs", word: "floobs" },
  { id: 8, outerImage: "/images/reveal8.jpg", innerImage: "/images/panel8.jpg", color: "#FFF9C4", hint: "Kitchen", riddle: "Cardboard, plastic, and baseball players. Pots, plants, on the second layer.", answer: "reveal the", word: "reveal the" },
  { id: 9, outerImage: "/images/reveal9.jpg", innerImage: "/images/panel9.jpg", color: "#FFF3E0", hint: "Kitchen", riddle: "I fell in in the morning, and they hung me up high. Now all I can see are these bars.", answer: "flabba", word: "flabba" },
];

function HelpButton() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const ping = async () => {
    if (status === "sending" || status === "sent") return;
    setStatus("sending");
    try {
      await fetch("https://ntfy.sh/dalol-bday-ping-x7q2", {
        method: "POST",
        body: "Help requested from Mia!!",
      });
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "1.6rem",
      right: "1.6rem",
      zIndex: 200,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "90px",
      height: "90px",
    }}>
      {/* Curved "Request Help" text above button */}
      <svg
        width="90"
        height="90"
        viewBox="0 0 90 90"
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <defs>
          <path id="helpArc" d="M 10,45 A 35,35 0 1,1 80,45" />
        </defs>
        <text style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "8.5px", fontWeight: 600, fill: "#c47a5a", letterSpacing: "1.5px" }}>
          <textPath href="#helpArc" startOffset="50%" textAnchor="middle">
            Request Help
          </textPath>
        </text>
      </svg>

      {/* Circle button */}
      <button
        onClick={ping}
        title="Request help"
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          border: "none",
          background: status === "sent"
            ? "linear-gradient(135deg, #7dba7d 0%, #4a9e5c 100%)"
            : "linear-gradient(135deg, #e8876a 0%, #c4603c 100%)",
          color: "#fff",
          fontSize: "1.35rem",
          cursor: status === "sent" ? "default" : "pointer",
          boxShadow: "0 4px 20px rgba(196,122,90,0.45)",
          transition: "background 0.3s ease, transform 0.15s ease",
          transform: status === "sending" ? "scale(0.93)" : "scale(1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
        onMouseEnter={e => { if (status === "idle") (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)"; }}
        onMouseLeave={e => { if (status === "idle") (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}
      >
        {status === "sent" ? "✓" : status === "sending" ? "⏳" : "🔔"}
      </button>
    </div>
  );
}

const WAVY_TEXT = "Solve all 9 for your gift.";

function WavyText() {
  return (
    <h1 style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      fontSize: "clamp(1.4rem, 3.5vw, 2.4rem)",
      fontWeight: 700,
      color: "#c47a5a",
      letterSpacing: "0.02em",
      margin: "0 0 1.8rem",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "0 0.05em",
      userSelect: "none",
    }}>
      {WAVY_TEXT.split("").map((char, i) => (
        <span key={i} style={{
          display: "inline-block",
          animation: `wave 2.4s ease-in-out ${i * 0.07}s infinite`,
          whiteSpace: char === " " ? "pre" : "normal",
        }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  );
}

function Panel({ panel, onClick, isExpanded, isCompleted }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={() => onClick(panel.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "16px",
        cursor: "pointer",
        aspectRatio: "1",
        position: "relative",
        overflow: "visible",
        border: isExpanded
          ? "2.5px solid #e07b54"
          : isCompleted
          ? "2px solid rgba(100,160,100,0.4)"
          : "2px solid rgba(196,122,90,0.18)",
        boxShadow: isExpanded
          ? "0 6px 24px rgba(196,122,90,0.3)"
          : hovered
          ? "0 6px 20px rgba(196,122,90,0.2)"
          : "0 2px 8px rgba(196,122,90,0.08)",
        transform: isExpanded ? "scale(1.06)" : hovered ? "scale(1.04)" : "scale(1)",
        transition: "transform 0.25s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease, border 0.18s ease",
        background: panel.color,
      }}
    >
      {/* Clipped inner area — image + search icon stay clipped */}
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: "14px",
        overflow: "hidden",
      }}>
        {/* Outer image — blurred until solved */}
        <img
          src={panel.outerImage}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: isCompleted
              ? "none"
              : "blur(12px) brightness(0.75) saturate(0.8)",
            transform: hovered || isExpanded ? "scale(1.07)" : "scale(1.01)",
            transition: "filter 0.7s ease, transform 0.25s ease",
          }}
        />

        {/* Search icon when not solved */}
        {!isCompleted && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            pointerEvents: "none",
          }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%",
              background: "rgba(255,255,255,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="7" stroke="rgba(255,255,255,0.9)" strokeWidth="2.2"/>
                <path d="M17 17L21 21" stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Modal({ panel, onClose, onCorrect, isCompleted }) {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // If already solved, don't reset to answered state — show solved UI
    if (isCompleted) {
      setSubmitted(true);
      setCorrect(true);
    } else {
      setInput("");
      setSubmitted(false);
      setCorrect(false);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [panel.id, isCompleted]);

  const handleSubmit = () => {
    if (!input.trim()) return;
    const isCorrect = input.trim().toLowerCase() === panel.answer.toLowerCase();
    setCorrect(isCorrect);
    setSubmitted(true);
    if (isCorrect) {
      playSound("/audio/win.mp3");
      onCorrect(panel.id);
      // Do NOT auto-close — let user close manually
    } else {
      playSound("/audio/lose.mp3");
    }
  };

  return (
    <>
      {/* Backdrop doubles as the flex centering wrapper */}
      <div onClick={onClose} style={{
        position: "fixed", inset: 0,
        background: "rgba(80, 30, 10, 0.45)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
        zIndex: 100, animation: "backdropIn 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div
          onClick={e => e.stopPropagation()}
          style={{
            zIndex: 101,
            width: "min(920px, 96vw)",
            background: "rgba(255, 248, 243, 0.97)",
            borderRadius: "28px",
            padding: "2.2rem",
            border: "2px solid rgba(196,122,90,0.25)",
            boxShadow: "0 24px 80px rgba(100,40,10,0.22), 0 4px 16px rgba(196,122,90,0.12)",
            animation: "modalIn 0.38s cubic-bezier(.34,1.3,.64,1)",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "row",
            gap: "2.2rem",
            alignItems: "stretch",
            position: "relative",
          }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position: "absolute", top: "1rem", right: "1rem",
          background: "rgba(196,122,90,0.10)", border: "none", borderRadius: "50%",
          width: "30px", height: "30px", display: "flex", alignItems: "center",
          justifyContent: "center", cursor: "pointer", color: "#c47a5a",
          fontSize: "0.9rem", transition: "background 0.15s, color 0.15s", flexShrink: 0,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(196,122,90,0.22)"; e.currentTarget.style.color = "#8b3e1e"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(196,122,90,0.10)"; e.currentTarget.style.color = "#c47a5a"; }}
        >✕</button>

        {/* Inner image on the left — blurred until solved */}
        <div style={{
          flexShrink: 0,
          width: "420px",
          minHeight: "380px",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(196,122,90,0.25)",
          position: "relative",
        }}>
          <img
            src={panel.innerImage}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              filter: (submitted && correct) || isCompleted
                ? "none"
                : "blur(40px) brightness(0.35) saturate(0.3)",
              transform: (submitted && correct) || isCompleted ? "scale(1)" : "scale(1.15)",
              transition: "filter 0.8s ease, transform 0.8s ease",
            }}
          />
        </div>

        {/* Right side */}
        <div style={{
          flex: 1, minWidth: 0,
          display: "flex", flexDirection: "column",
          paddingRight: "1.8rem",
          paddingTop: "0.4rem",
        }}>
          <p style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "0.88rem", color: "#b86a3e", fontStyle: "italic",
            margin: "0 0 0.5rem", letterSpacing: "0.01em",
          }}>
            Hint: {panel.hint}
          </p>

          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontSize: "1.08rem", color: "#4a2510", lineHeight: 1.8,
            margin: "0", fontWeight: 500,
            flex: 1,
          }}>
            {panel.riddle}
          </p>

          {/* Submit area pinned to bottom */}
          <div style={{ marginTop: "1.6rem" }}>
            {submitted && correct ? (
              <div style={{
                borderRadius: "12px", padding: "0.8rem 1rem",
                background: "rgba(160,220,160,0.3)",
                border: "1.5px solid #7dba7d",
                color: "#1e5e1e",
                fontFamily: "'Lora', Georgia, serif", fontSize: "0.97rem",
                fontWeight: 600, animation: "fadeSlideIn 0.25s ease",
              }}>
                ✓ Solved! 🎉 Word revealed.
              </div>
            ) : submitted && !correct ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <div style={{
                  borderRadius: "12px", padding: "0.8rem 1rem",
                  background: "rgba(255,170,150,0.3)",
                  border: "1.5px solid #e07b6a",
                  color: "#7a1e0e",
                  fontFamily: "'Lora', Georgia, serif", fontSize: "0.97rem",
                  fontWeight: 600, animation: "fadeSlideIn 0.25s ease",
                }}>
                  ✗ Not quite — try again!
                </div>
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSubmit()}
                    placeholder="Your answer..."
                    style={{
                      flex: 1, padding: "0.65rem 0.9rem", borderRadius: "10px",
                      border: "1.5px solid rgba(196,122,90,0.35)",
                      background: "rgba(255,255,255,0.8)",
                      fontFamily: "'Lora', Georgia, serif", fontSize: "0.97rem",
                      color: "#4a2510", outline: "none", transition: "border-color 0.18s",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(196,122,90,0.7)"}
                    onBlur={e => e.target.style.borderColor = "rgba(196,122,90,0.35)"}
                  />
                  <button onClick={handleSubmit} style={{
                    padding: "0.65rem 1.2rem", borderRadius: "10px", border: "none",
                    background: "linear-gradient(135deg, #e8876a 0%, #c4603c 100%)",
                    color: "#fff", fontFamily: "'Playfair Display', serif",
                    fontSize: "0.93rem", fontWeight: 700, cursor: "pointer",
                    letterSpacing: "0.03em", transition: "opacity 0.15s, transform 0.12s", flexShrink: 0,
                  }}
                    onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(0.98)"; }}
                    onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
                  >Try again</button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "0.6rem" }}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  placeholder="Your answer..."
                  style={{
                    flex: 1, padding: "0.65rem 0.9rem", borderRadius: "10px",
                    border: "1.5px solid rgba(196,122,90,0.35)",
                    background: "rgba(255,255,255,0.8)",
                    fontFamily: "'Lora', Georgia, serif", fontSize: "0.97rem",
                    color: "#4a2510", outline: "none", transition: "border-color 0.18s",
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(196,122,90,0.7)"}
                  onBlur={e => e.target.style.borderColor = "rgba(196,122,90,0.35)"}
                />
                <button onClick={handleSubmit} style={{
                  padding: "0.65rem 1.2rem", borderRadius: "10px", border: "none",
                  background: "linear-gradient(135deg, #e8876a 0%, #c4603c 100%)",
                  color: "#fff", fontFamily: "'Playfair Display', serif",
                  fontSize: "0.93rem", fontWeight: 700, cursor: "pointer",
                  letterSpacing: "0.03em", transition: "opacity 0.15s, transform 0.12s", flexShrink: 0,
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(0.98)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
                >Submit</button>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

function WordStrip({ panels, solved }) {
  return (
    <div style={{
      marginTop: "2rem",
      width: "100%",
      maxWidth: "560px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      flexWrap: "wrap",
      overflow: "visible",
    }}>
      {panels.map((panel, i) => {
        const isRevealed = solved.has(panel.id);
        return (
          <div key={panel.id} style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
            <div style={{
              position: "relative",
              padding: "0.3rem 0.65rem",
              borderRadius: "30px",
              background: isRevealed ? "rgba(255,255,255,0.75)" : "rgba(255,220,200,0.3)",
              border: isRevealed
                ? "1.5px solid rgba(196,122,90,0.3)"
                : "1.5px solid rgba(196,122,90,0.12)",
              transition: "background 0.5s ease, border 0.5s ease",
              whiteSpace: "nowrap",
            }}>
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(0.7rem, 1.3vw, 0.92rem)",
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: isRevealed ? "#7a3a18" : "transparent",
                filter: isRevealed ? "none" : "blur(7px)",
                transition: "filter 0.7s ease, color 0.5s ease",
                display: "block",
                userSelect: isRevealed ? "auto" : "none",
              }}>
                {panel.word}
              </span>

              {!isRevealed && (
                <span style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(0.7rem, 1.3vw, 0.92rem)",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  color: "rgba(196,122,90,0.5)",
                  filter: "blur(5px)",
                  pointerEvents: "none",
                  userSelect: "none",
                  whiteSpace: "nowrap",
                }}>
                  {panel.word}
                </span>
              )}
            </div>

            {i < panels.length - 1 && (
              <span style={{
                color: "rgba(196,122,90,0.3)",
                fontSize: "0.45rem",
                flexShrink: 0,
                lineHeight: 1,
              }}>●</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Confetti ──────────────────────────────────────────────────────────────────

const CONFETTI_COLORS = ["#e8876a", "#f5c6b0", "#d4b8e0", "#b5d8f7", "#c8e6c9", "#fff9c4", "#fadadd", "#ffcba4", "#ffffff"];

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  width: number;
  height: number;
  side: "left" | "right";
  opacity: number;
}

function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const spawnedRef = useRef(false);

  useEffect(() => {
    if (!active || spawnedRef.current) return;
    spawnedRef.current = true;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Spawn bursts from left and right sides
    const spawn = (side: "left" | "right") => {
      const x = side === "left" ? 0 : canvas.width;
      for (let i = 0; i < 80; i++) {
        const angle = side === "left"
          ? (Math.random() * 70 - 35) * (Math.PI / 180)   // fan right
          : (Math.PI + (Math.random() * 70 - 35) * (Math.PI / 180)); // fan left
        const speed = 6 + Math.random() * 10;
        particlesRef.current.push({
          id: Math.random(),
          x,
          y: canvas.height * (0.3 + Math.random() * 0.4),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 4,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 8,
          width: 8 + Math.random() * 8,
          height: 4 + Math.random() * 4,
          side,
          opacity: 1,
        });
      }
    };

    spawn("left");
    spawn("right");
    // Second wave
    setTimeout(() => { spawn("left"); spawn("right"); }, 400);
    setTimeout(() => { spawn("left"); spawn("right"); }, 800);

    const gravity = 0.35;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current = particlesRef.current.filter(p => p.opacity > 0.01);

      for (const p of particlesRef.current) {
        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rotation += p.rotationSpeed;
        if (p.y > canvas.height * 0.7) p.opacity -= 0.018;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.width / 2, -p.height / 2, p.width, p.height);
        ctx.restore();
      }

      if (particlesRef.current.length > 0) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", inset: 0,
        pointerEvents: "none",
        zIndex: 999,
      }}
    />
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [solved, setSolved] = useState(new Set<number>());
  const [confetti, setConfetti] = useState(false);
  const activePanel = PANELS.find(p => p.id === expanded);

  const handleCorrect = (id: number) => {
    setSolved(prev => {
      const next = new Set([...prev, id]);
      if (next.size === PANELS.length && !expanded) {
        setTimeout(() => { setConfetti(true); playSound("/audio/yay.mp3"); }, 300);
      }
      return next;
    });
  };

  const handleClose = () => {
    setExpanded(null);
    if (solved.size === PANELS.length) {
      setTimeout(() => { setConfetti(true); playSound("/audio/yay.mp3"); }, 300);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Lora:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body {
          margin: 0; min-height: 100vh;
          background: linear-gradient(160deg, #fff3ec 0%, #ffe0cc 40%, #ffd6e8 100%);
          font-family: 'Lora', Georgia, serif; overflow-x: hidden;
          user-select: none; -webkit-user-select: none;
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          30% { transform: translateY(-8px); }
          60% { transform: translateY(3px); }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          from { transform: scale(0.65); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes backdropIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes floatBg {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-18px) scale(1.04); }
        }
        @keyframes overlayIn {
          from { opacity: 0; } to { opacity: 1; }
        }
        @keyframes checkPop {
          from { transform: scale(0); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", padding: "2.8rem 1.5rem 4rem", position: "relative",
      }}>
        <div style={{
          position: "fixed", top: "-80px", right: "-80px",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "rgba(255,182,148,0.22)",
          animation: "floatBg 7s ease-in-out infinite",
          pointerEvents: "none", zIndex: 0,
        }} />
        <div style={{
          position: "fixed", bottom: "-60px", left: "-60px",
          width: "240px", height: "240px", borderRadius: "50%",
          background: "rgba(255,182,200,0.18)",
          animation: "floatBg 9s ease-in-out 2s infinite",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{
          position: "relative", zIndex: 1, width: "100%", maxWidth: "700px",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}>
          <p style={{
            fontFamily: "'Lora', serif", fontSize: "0.78rem", color: "#d4875f",
            letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 0.5rem",
          }}>
            happy birthday mia!!!
          </p>

          <WavyText />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "clamp(8px, 1.5vw, 14px)",
            width: "100%",
            maxWidth: "500px",
          }}>
            {PANELS.map((panel) => (
              <Panel
                key={panel.id}
                panel={panel}
                onClick={(id) => setExpanded(prev => prev === id ? null : id)}
                isExpanded={expanded === panel.id}
                isCompleted={solved.has(panel.id)}
              />
            ))}
          </div>

          <WordStrip panels={PANELS} solved={solved} />

          {solved.size === PANELS.length && (
            <p style={{
              marginTop: "1.2rem",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1rem", color: "#c47a5a", fontStyle: "italic",
              animation: "fadeSlideIn 0.6s ease", textAlign: "center",
            }}>
              Great job! Tell this code to Aidan for your reward.
            </p>
          )}
        </div>
      </div>

      {activePanel && (
        <Modal
          panel={activePanel}
          onClose={handleClose}
          onCorrect={handleCorrect}
          isCompleted={solved.has(activePanel.id)}
        />
      )}

      <Confetti active={confetti} />
      <HelpButton />
    </>
  );
}