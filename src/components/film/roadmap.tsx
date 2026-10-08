import { motion, useTransform, type MotionValue } from "framer-motion";
import { Big, Kicker, Pinned, Reveal, SceneTag } from "./primitives";

const STAGES = [
  ["🎯", "Problem", "Pick a real pain"],
  ["📦", "Data", "Collect & clean"],
  ["🧠", "Model", "Choose architecture"],
  ["🔥", "Train", "GPUs go brrr"],
  ["🧪", "Evaluate", "Test & red-team"],
  ["🚀", "Deploy", "Ship to users"],
  ["🔁", "Iterate", "Feedback loop"],
];
const C = ["var(--electric)", "var(--coral)", "var(--sun)", "var(--lime)"];

export function GameBoard() {
  return <Pinned h={380}>{(p) => <BoardInner p={p} />}</Pinned>;
}
function BoardInner({ p }: { p: MotionValue<number> }) {
  const path = "M60 80 H740 V240 H60 V400 H740";
  const len = useTransform(p, [0.05, 0.9], [0, 1]);
  const pts: [number, number][] = [[60, 80], [400, 80], [740, 80], [740, 240], [60, 240], [60, 400], [740, 400]];
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-4 bg-grid">
      <SceneTag n={29} label="The universal roadmap" />
      <Big className="mb-6 text-center">Every legend followed <span className="text-gradient">this board.</span></Big>
      <svg viewBox="0 0 800 480" className="w-full max-w-5xl overflow-visible">
        <path d={path} fill="none" stroke="var(--border)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
        <motion.path d={path} fill="none" stroke="var(--ink)" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: len }} />
        {pts.map(([x, y], i) => <Tile key={i} i={i} x={x} y={y} p={p} />)}
      </svg>
    </div>
  );
}
function Tile({ i, x, y, p }: { i: number; x: number; y: number; p: MotionValue<number> }) {
  const t = 0.05 + (i / 6) * 0.85;
  const s = useTransform(p, [t - 0.06, t], [0.4, 1]);
  const o = useTransform(p, [t - 0.06, t], [0.25, 1]);
  const [e, name, d] = STAGES[i];
  return (
    <motion.g style={{ scale: s, opacity: o, transformOrigin: `${x}px ${y}px` }}>
      <circle cx={x} cy={y} r="44" fill={C[i % 4]} stroke="var(--ink)" strokeWidth="4" />
      <text x={x} y={y + 12} textAnchor="middle" fontSize="34">{e}</text>
      <text x={x} y={y + 68} textAnchor="middle" fontSize="18" fontWeight="900" className="font-display">{name}</text>
      <text x={x} y={y - 54} textAnchor="middle" fontSize="13" className="font-mono" fill="var(--muted-foreground)">{d}</text>
    </motion.g>
  );
}

export function SkillTree() {
  const tiers = [
    ["Python", "Math basics", "Statistics"],
    ["NumPy · Pandas", "Classic ML", "Visualization"],
    ["PyTorch", "Neural nets", "Transformers"],
    ["LLM apps", "RAG", "Agents"],
  ];
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <SceneTag n={30} label="Your skill tree" />
      <Reveal><Kicker>🕹 Player 1</Kicker></Reveal>
      <Reveal delay={0.1}><Big className="mt-6 text-center">Your path to building AI.</Big></Reveal>
      <div className="mt-14 flex w-full max-w-4xl flex-col-reverse gap-6">
        {tiers.map((row, r) => (
          <div key={r} className="flex items-center gap-4">
            <span className="w-16 font-mono text-xs uppercase text-muted-foreground">LVL {r + 1}</span>
            <div className="grid flex-1 grid-cols-3 gap-4">
              {row.map((s, i) => (
                <motion.div key={s}
                  initial={{ opacity: 0, scale: 0.5, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.06 }}
                  viewport={{ amount: 0.6 }}
                  transition={{ delay: r * 0.15 + i * 0.07, type: "spring" }}
                  className="rounded-2xl border-2 border-ink px-3 py-4 text-center font-display text-sm font-bold shadow-pop md:text-base"
                  style={{ background: C[r] }}>{s}</motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Future() {
  return <Pinned h={250}>{(p) => <FutureInner p={p} />}</Pinned>;
}
function FutureInner({ p }: { p: MotionValue<number> }) {
  const rot = useTransform(p, [0, 1], [0, 360]);
  const sc = useTransform(p, [0, 0.5], [0.5, 1]);
  const items = ["🤖 Agents", "🧬 Medicine", "🌍 Climate", "🎓 Tutors", "🔬 Science", "🦾 Robotics"];
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <SceneTag n={31} label="What's next" />
      <motion.div style={{ rotate: rot, scale: sc }} className="absolute h-[80vmin] w-[80vmin] rounded-full border-2 border-dashed border-ink">
        {items.map((t, i) => {
          const a = (i / items.length) * Math.PI * 2;
          return (
            <motion.div key={t} style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%`, rotate: useTransform(rot, (v) => -v), background: C[i % 4] }}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border-2 border-ink px-4 py-2 font-display font-bold shadow-pop">{t}</motion.div>
          );
        })}
      </motion.div>
      <motion.div style={{ scale: sc }} className="relative text-center">
        <div className="font-mono text-sm uppercase tracking-widest text-muted-foreground">The next decade</div>
        <div className="font-display text-6xl font-black md:text-8xl">Future<span className="text-coral">.</span></div>
      </motion.div>
    </div>
  );
}

export function Outro() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-6 text-center text-background">
      <SceneTag n={32} label="Credits" />
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div key={i} className="absolute h-3 w-2 rounded-sm" style={{ background: C[i % 4], left: `${(i * 33) % 100}%` }}
          animate={{ y: ["-10vh", "110vh"], rotate: [0, 720] }} transition={{ repeat: Infinity, duration: 3 + (i % 4), delay: i * 0.15, ease: "linear" }} />
      ))}
      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ type: "spring", stiffness: 80 }} className="relative">
        <div className="font-mono text-sm uppercase tracking-[0.4em] text-lime">★ ★ ★</div>
        <div className="mt-4 font-display text-6xl font-black md:text-9xl">LEVEL<br />COMPLETE</div>
        <div className="mt-6 text-xl text-background/70">You now speak AI. Go build something.</div>
        <button onClick={() => window.scrollTo({ top: 0 })} className="mt-10 rounded-full border-2 border-background bg-lime px-8 py-3 font-display font-bold text-ink transition-transform hover:scale-105">
          ↺ Replay the film
        </button>
      </motion.div>
    </section>
  );
}
