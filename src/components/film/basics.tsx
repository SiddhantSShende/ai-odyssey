import { motion, useTransform, type MotionValue } from "framer-motion";
import { Big, Kicker, Pinned, Reveal, SceneTag, useStep } from "./primitives";

const COLORS = ["var(--electric)", "var(--coral)", "var(--lime)", "var(--sun)"];

/* 01 — Opening title */
export function Intro() {
  const word = "ARTIFICIAL";
  return (
    <Pinned h={220}>
      {(p) => <IntroInner p={p} word={word} />}
    </Pinned>
  );
}
function IntroInner({ p, word }: { p: MotionValue<number>; word: string }) {
  const scale = useTransform(p, [0, 1], [1, 6]);
  const opacity = useTransform(p, [0.6, 1], [1, 0]);
  const sub = useTransform(p, [0, 0.3], [1, 0]);
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-grid">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 10 + (i % 5) * 8,
            height: 10 + (i % 5) * 8,
            background: COLORS[i % 4],
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
          }}
          animate={{ y: [0, -30, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity }}
        />
      ))}
      <motion.div style={{ scale, opacity }} className="relative z-10 text-center">
        <div className="flex justify-center">
          {word.split("").map((c, i) => (
            <motion.span
              key={i}
              className="font-display text-[11vw] font-black leading-none"
              initial={{ y: 120, opacity: 0, rotate: 20 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.2 + i * 0.06, type: "spring", stiffness: 120 }}
            >
              {c}
            </motion.span>
          ))}
        </div>
        <motion.div
          className="font-display text-[9vw] font-black leading-none text-gradient"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          INTELLIGENCE
        </motion.div>
      </motion.div>
      <motion.div style={{ opacity: sub }} className="absolute bottom-12 z-10 flex flex-col items-center gap-3">
        <Kicker>▶ A film in 32 scenes</Kicker>
        <motion.div
          className="h-10 w-6 rounded-full border-2 border-ink"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <motion.div
            className="mx-auto mt-1 h-2 w-1 rounded-full bg-ink"
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* Chapter cards */
export function Chapter({ n, title, sub }: { n: string; title: string; sub: string }) {
  return <Pinned h={200}>{(p) => <ChapterInner p={p} n={n} title={title} sub={sub} />}</Pinned>;
}
function ChapterInner({ p, n, title, sub }: { p: MotionValue<number>; n: string; title: string; sub: string }) {
  const numScale = useTransform(p, [0, 1], [0.6, 2.2]);
  const numOp = useTransform(p, [0, 0.3, 0.8, 1], [0, 0.12, 0.12, 0]);
  const tY = useTransform(p, [0, 0.4], [120, 0]);
  const tOp = useTransform(p, [0.1, 0.4, 0.85, 1], [0, 1, 1, 0]);
  const bar = useTransform(p, [0.2, 0.7], ["0%", "100%"]);
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-ink">
      <motion.div style={{ scale: numScale, opacity: numOp }} className="absolute font-display text-[40vw] font-black text-background">
        {n}
      </motion.div>
      <motion.div style={{ y: tY, opacity: tOp }} className="relative z-10 px-6 text-center text-background">
        <div className="font-mono text-sm uppercase tracking-[0.4em] text-lime">Chapter {n}</div>
        <div className="mt-4 font-display text-6xl font-black md:text-8xl">{title}</div>
        <div className="mx-auto mt-6 h-1 w-64 overflow-hidden rounded bg-background/20">
          <motion.div style={{ width: bar }} className="h-full bg-lime" />
        </div>
        <div className="mt-6 text-lg text-background/70">{sub}</div>
      </motion.div>
    </div>
  );
}

/* What is AI — dots assemble into a brain-like cluster */
export function WhatIsAI() {
  return <Pinned h={250}>{(p) => <WhatInner p={p} />}</Pinned>;
}
function WhatInner({ p }: { p: MotionValue<number> }) {
  const dots = Array.from({ length: 60 });
  return (
    <div className="relative grid h-full w-full items-center gap-8 px-8 md:grid-cols-2 md:px-20">
      <SceneTag n={2} label="Definition" />
      <div>
        <Reveal><Kicker>What is AI?</Kicker></Reveal>
        <Reveal delay={0.1}>
          <Big className="mt-6">Machines that <span className="text-gradient">learn</span>, reason & create.</Big>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">Not programmed rule by rule — trained on examples.</p>
        </Reveal>
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-md">
        {dots.map((_, i) => <Dot key={i} i={i} p={p} />)}
      </div>
    </div>
  );
}
function Dot({ i, p }: { i: number; p: MotionValue<number> }) {
  const angle = (i / 60) * Math.PI * 2 * 3;
  const r = 30 + (i % 12) * 3.5;
  const tx = 50 + Math.cos(angle) * r * 0.9;
  const ty = 50 + Math.sin(angle) * r * 0.7;
  const sx = (i * 71) % 100;
  const sy = (i * 43) % 100;
  const left = useTransform(p, [0, 0.6], [`${sx}%`, `${tx}%`]);
  const top = useTransform(p, [0, 0.6], [`${sy}%`, `${ty}%`]);
  return (
    <motion.div
      style={{ left, top, background: COLORS[i % 4] }}
      className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
      animate={{ scale: [1, 1.6, 1] }}
      transition={{ duration: 2, delay: i * 0.05, repeat: Infinity }}
    />
  );
}

/* AI family — nested circles zoom */
export function Family() {
  return <Pinned h={300}>{(p) => <FamilyInner p={p} />}</Pinned>;
}
function FamilyInner({ p }: { p: MotionValue<number> }) {
  const rings = [
    { t: "Artificial Intelligence", c: "var(--electric)", s: 1 },
    { t: "Machine Learning", c: "var(--coral)", s: 0.74 },
    { t: "Deep Learning", c: "var(--sun)", s: 0.5 },
    { t: "Generative AI", c: "var(--lime)", s: 0.28 },
  ];
  const zoom = useTransform(p, [0, 1], [0.8, 2.4]);
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <SceneTag n={3} label="The family tree" />
      <motion.div style={{ scale: zoom }} className="relative aspect-square w-[70vmin]">
        {rings.map((r, i) => <Ring key={i} i={i} r={r} p={p} />)}
      </motion.div>
    </div>
  );
}
function Ring({ i, r, p }: { i: number; r: { t: string; c: string; s: number }; p: MotionValue<number> }) {
  const op = useTransform(p, [i * 0.18, i * 0.18 + 0.12], [0, 1]);
  return (
    <motion.div
      style={{ opacity: op, width: `${r.s * 100}%`, height: `${r.s * 100}%`, background: r.c }}
      className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-start justify-center rounded-full border-2 border-ink pt-[4%]"
    >
      <span className="rounded-full bg-card px-3 py-1 font-display text-[1.6vmin] font-bold">{r.t}</span>
    </motion.div>
  );
}

/* History — horizontal pinned timeline */
const HISTORY = [
  ["1950", "Turing Test", "Can machines think?"],
  ["1956", "Dartmouth", "“AI” is born"],
  ["1997", "Deep Blue", "Beats Kasparov at chess"],
  ["2012", "AlexNet", "Deep learning wins vision"],
  ["2016", "AlphaGo", "Masters Go"],
  ["2017", "Transformer", "“Attention is all you need”"],
  ["2022", "ChatGPT", "AI goes mainstream"],
  ["2024+", "Agents", "AI that acts"],
];
export function History() {
  return <Pinned h={400}>{(p) => <HistoryInner p={p} />}</Pinned>;
}
function HistoryInner({ p }: { p: MotionValue<number> }) {
  const x = useTransform(p, [0, 1], ["0%", "-78%"]);
  const line = useTransform(p, [0, 1], ["0%", "100%"]);
  return (
    <div className="relative h-full w-full bg-grid">
      <SceneTag n={4} label="70 years in 8 frames" />
      <div className="absolute left-0 right-0 top-1/2 h-1 bg-border">
        <motion.div style={{ width: line }} className="h-full bg-ink" />
      </div>
      <motion.div style={{ x }} className="absolute top-1/2 flex -translate-y-1/2 gap-16 pl-[10vw]">
        {HISTORY.map(([y, t, d], i) => (
          <div key={y} className={`flex w-72 shrink-0 flex-col ${i % 2 ? "translate-y-40" : "-translate-y-40"}`}>
            <div className="font-display text-7xl font-black" style={{ color: COLORS[i % 4] }}>{y}</div>
            <div className="mt-3 rounded-2xl border-2 border-ink bg-card p-5 shadow-pop">
              <div className="font-display text-xl font-bold">{t}</div>
              <div className="text-muted-foreground">{d}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/* Data is fuel */
export function DataFuel() {
  return <Pinned h={250}>{(p) => <DataInner p={p} />}</Pinned>;
}
function DataInner({ p }: { p: MotionValue<number> }) {
  const fill = useTransform(p, [0.1, 0.9], ["0%", "100%"]);
  const pct = useTransform(p, (v) => `${Math.min(100, Math.round(v * 110))}%`);
  return (
    <div className="relative grid h-full w-full items-center gap-10 px-8 md:grid-cols-2 md:px-20">
      <SceneTag n={6} label="Fuel" />
      <div>
        <Kicker>Data</Kicker>
        <Big className="mt-6">Data is the <span className="text-coral">fuel.</span></Big>
        <p className="mt-4 text-lg text-muted-foreground">Text, images, audio, clicks — billions of examples.</p>
      </div>
      <div className="relative mx-auto h-[60vh] w-full max-w-sm">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-0 rounded-md border-2 border-ink px-2 font-mono text-xs"
            style={{ background: COLORS[i % 4] }}
            animate={{ y: ["-10vh", "40vh"], x: [((i * 37) % 200) - 100, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, delay: i * 0.2, repeat: Infinity, ease: "easeIn" }}
          >
            {["01", "img", "txt", "♪", "{ }", "px"][i % 6]}
          </motion.div>
        ))}
        <div className="absolute bottom-0 left-1/2 h-1/2 w-48 -translate-x-1/2 overflow-hidden rounded-3xl border-4 border-ink bg-card">
          <motion.div style={{ height: fill }} className="absolute bottom-0 w-full bg-electric" />
          <motion.div className="absolute inset-0 flex items-center justify-center font-display text-4xl font-black mix-blend-difference text-background">
            {pct as unknown as string}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* Neuron */
export function Neuron() {
  return <Pinned h={260}>{(p) => <NeuronInner p={p} />}</Pinned>;
}
function NeuronInner({ p }: { p: MotionValue<number> }) {
  const inputs = [0.2, 0.4, 0.6, 0.8];
  const glow = useTransform(p, [0.5, 0.75], [0, 1]);
  const out = useTransform(p, [0.75, 0.95], [0, 1]);
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6">
      <SceneTag n={7} label="The artificial neuron" />
      <Big className="mb-8 text-center">One neuron = <span className="text-gradient">weigh, sum, fire.</span></Big>
      <svg viewBox="0 0 600 300" className="w-full max-w-3xl">
        {inputs.map((y, i) => <NeuronLine key={i} i={i} y={y} p={p} />)}
        <motion.circle cx="330" cy="150" r="55" fill="var(--sun)" stroke="var(--ink)" strokeWidth="4" style={{ scale: useTransform(glow, [0, 1], [1, 1.15]) }} />
        <text x="330" y="160" textAnchor="middle" className="font-display" fontSize="30" fontWeight="900">Σ</text>
        <motion.path d="M385 150 L560 150" stroke="var(--coral)" strokeWidth="6" style={{ pathLength: out }} />
        <motion.circle cx="565" cy="150" r="18" fill="var(--coral)" style={{ opacity: out }} />
      </svg>
      <div className="mt-6 flex gap-6 font-mono text-sm">
        {["inputs", "× weights", "Σ sum", "→ activate"].map((t, i) => <StepPill key={t} t={t} i={i} p={p} />)}
      </div>
    </div>
  );
}
function NeuronLine({ i, y, p }: { i: number; y: number; p: MotionValue<number> }) {
  const len = useTransform(p, [i * 0.1, i * 0.1 + 0.3], [0, 1]);
  return (
    <g>
      <circle cx="40" cy={y * 300} r="20" fill={COLORS[i]} stroke="var(--ink)" strokeWidth="3" />
      <motion.path d={`M60 ${y * 300} L275 150`} stroke="var(--ink)" strokeWidth={2 + i * 2} style={{ pathLength: len }} fill="none" />
    </g>
  );
}
function StepPill({ t, i, p }: { t: string; i: number; p: MotionValue<number> }) {
  const s = useStep(p, i, 4);
  return <motion.span style={{ opacity: s.opacity, scale: s.scale }} className="rounded-full border-2 border-ink bg-card px-3 py-1">{t}</motion.span>;
}

/* Neural network */
export function Network() {
  return <Pinned h={300}>{(p) => <NetInner p={p} />}</Pinned>;
}
const LAYERS = [4, 6, 6, 3];
function NetInner({ p }: { p: MotionValue<number> }) {
  const W = 800, H = 460;
  const pos = LAYERS.map((n, l) => Array.from({ length: n }, (_, k) => [80 + l * ((W - 160) / 3), ((k + 1) * H) / (n + 1)]));
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6">
      <SceneTag n={8} label="Neural network" />
      <Big className="mb-4 text-center">Stack neurons → <span className="text-electric">deep</span> learning.</Big>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-4xl">
        {pos.slice(0, -1).map((layer, l) =>
          layer.map(([x1, y1], a) =>
            pos[l + 1].map(([x2, y2], b) => <Edge key={`${l}-${a}-${b}`} l={l} d={`M${x1} ${y1} L${x2} ${y2}`} p={p} />),
          ),
        )}
        {pos.map((layer, l) => layer.map(([x, y], k) => <Node key={`${l}-${k}`} l={l} x={x} y={y} p={p} />))}
      </svg>
      <div className="mt-2 flex w-full max-w-4xl justify-between font-mono text-xs uppercase">
        <span>Input</span><span>Hidden</span><span>Hidden</span><span>Output</span>
      </div>
    </div>
  );
}
function Edge({ l, d, p }: { l: number; d: string; p: MotionValue<number> }) {
  const len = useTransform(p, [l * 0.25, l * 0.25 + 0.25], [0, 1]);
  return <motion.path d={d} stroke="var(--electric)" strokeOpacity="0.35" strokeWidth="1.5" fill="none" style={{ pathLength: len }} />;
}
function Node({ l, x, y, p }: { l: number; x: number; y: number; p: MotionValue<number> }) {
  const on = useTransform(p, [l * 0.25, l * 0.25 + 0.1], [0, 1]);
  const fill = useTransform(on, [0, 1], ["#ffffff", l === 3 ? "#ff7a59" : "#3b7bff"]);
  return <motion.circle cx={x} cy={y} r="16" stroke="var(--ink)" strokeWidth="3" style={{ fill }} />;
}

/* Training loop */
export function TrainingLoop() {
  const steps = ["Predict", "Measure error", "Backprop", "Update weights"];
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <SceneTag n={9} label="Training loop" />
      <Reveal><Big className="text-center">Repeat a <span className="text-coral">million</span> times.</Big></Reveal>
      <div className="relative mt-16 h-[420px] w-[420px] max-w-full">
        <motion.div
          className="absolute inset-8 rounded-full border-4 border-dashed border-ink"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ink bg-lime"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="flex h-full items-center justify-center font-display text-xl font-black">LOOP</div>
        </motion.div>
        {steps.map((s, i) => {
          const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
          return (
            <motion.div
              key={s}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.2, type: "spring" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-2xl border-2 border-ink px-4 py-2 font-display font-bold shadow-pop"
              style={{ left: `${50 + Math.cos(a) * 42}%`, top: `${50 + Math.sin(a) * 42}%`, background: COLORS[i] }}
            >
              {i + 1}. {s}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* Gradient descent */
export function Gradient() {
  return <Pinned h={260}>{(p) => <GradInner p={p} />}</Pinned>;
}
function GradInner({ p }: { p: MotionValue<number> }) {
  const f = (t: number) => 60 + 260 * Math.pow((t - 0.62) * 1.6, 2) + 30 * Math.sin(t * 12);
  const pts = Array.from({ length: 101 }, (_, i) => `${i * 8},${f(i / 100)}`).join(" ");
  const cx = useTransform(p, [0, 0.9], [0.05, 0.62]);
  const x = useTransform(cx, (t) => t * 800);
  const y = useTransform(cx, (t) => f(t) - 22);
  const loss = useTransform(cx, (t) => Math.round(f(t)).toString());
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6">
      <SceneTag n={10} label="Gradient descent" />
      <Big className="mb-6 text-center">Learning = rolling <span className="text-electric">downhill</span>.</Big>
      <svg viewBox="0 0 800 420" className="w-full max-w-4xl overflow-visible">
        <polyline points={pts} fill="none" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
        <motion.circle r="22" fill="var(--coral)" stroke="var(--ink)" strokeWidth="4" style={{ cx: x, cy: y }} />
      </svg>
      <div className="mt-4 rounded-xl border-2 border-ink bg-card px-5 py-2 font-mono shadow-pop">
        LOSS: <motion.span className="font-bold text-coral">{loss}</motion.span>
      </div>
    </div>
  );
}

/* Learning types */
export function LearningTypes() {
  const cards = [
    { t: "Supervised", e: "🏷️", d: "Learn from labeled answers", c: "var(--electric)" },
    { t: "Unsupervised", e: "🧩", d: "Find hidden patterns", c: "var(--sun)" },
    { t: "Reinforcement", e: "🎮", d: "Trial, error, reward", c: "var(--coral)" },
  ];
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <SceneTag n={11} label="3 ways to learn" />
      <Reveal><Big className="text-center">Choose your <span className="text-gradient">learning mode</span></Big></Reveal>
      <div className="mt-14 grid w-full max-w-5xl gap-8 md:grid-cols-3">
        {cards.map((c, i) => (
          <motion.div
            key={c.t}
            initial={{ rotateY: 90, opacity: 0 }}
            whileInView={{ rotateY: 0, opacity: 1 }}
            whileHover={{ y: -12, rotate: -2 }}
            viewport={{ amount: 0.5 }}
            transition={{ delay: i * 0.2, duration: 0.7 }}
            className="rounded-3xl border-4 border-ink bg-card p-8 shadow-pop"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-ink text-5xl" style={{ background: c.c }}>{c.e}</div>
            <div className="mt-6 font-display text-2xl font-black">{c.t}</div>
            <div className="mt-2 text-muted-foreground">{c.d}</div>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-muted">
              <motion.div className="h-full" style={{ background: c.c }} initial={{ width: 0 }} whileInView={{ width: `${60 + i * 15}%` }} transition={{ delay: 0.5 + i * 0.2, duration: 1 }} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* Computer vision */
export function Vision() {
  return <Pinned h={260}>{(p) => <VisionInner p={p} />}</Pinned>;
}
function VisionInner({ p }: { p: MotionValue<number> }) {
  const scan = useTransform(p, [0, 0.6], ["0%", "100%"]);
  const box = useTransform(p, [0.6, 0.75], [0, 1]);
  return (
    <div className="relative grid h-full w-full items-center gap-10 px-8 md:grid-cols-2 md:px-20">
      <SceneTag n={12} label="Computer vision" />
      <div>
        <Kicker>👁 Vision</Kicker>
        <Big className="mt-6">Pixels → <span className="text-electric">meaning.</span></Big>
      </div>
      <div className="relative mx-auto grid aspect-square w-full max-w-md grid-cols-12 overflow-hidden rounded-3xl border-4 border-ink">
        {Array.from({ length: 144 }).map((_, i) => {
          const r = Math.floor(i / 12), c = i % 12;
          const inCat = (r - 6) ** 2 + (c - 6) ** 2 < 14;
          return <div key={i} style={{ background: inCat ? "var(--sun)" : (r + c) % 3 ? "var(--muted)" : "var(--grid)" }} />;
        })}
        <motion.div style={{ top: scan }} className="absolute left-0 h-1 w-full bg-coral shadow-[0_0_20px_var(--coral)]" />
        <motion.div style={{ opacity: box, scale: box }} className="absolute left-[22%] top-[22%] h-[56%] w-[56%] rounded-lg border-4 border-electric">
          <span className="absolute -top-8 left-0 rounded bg-electric px-2 font-mono text-sm font-bold text-primary-foreground">cat · 98%</span>
        </motion.div>
      </div>
    </div>
  );
}

/* NLP tokens */
export function Tokens() {
  const words = ["AI", " learns", " from", " every", " word", " you", " type", "."];
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <SceneTag n={13} label="Language" />
      <Reveal><Big className="text-center">Words become <span className="text-coral">tokens</span>, tokens become numbers.</Big></Reveal>
      <div className="mt-16 flex flex-wrap justify-center gap-3">
        {words.map((w, i) => (
          <motion.div
            key={i}
            initial={{ y: -80, opacity: 0, rotate: -15 }}
            whileInView={{ y: 0, opacity: 1, rotate: 0 }}
            viewport={{ amount: 0.8 }}
            transition={{ delay: i * 0.12, type: "spring" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="rounded-xl border-2 border-ink px-4 py-3 font-mono text-2xl font-bold shadow-pop" style={{ background: COLORS[i % 4] }}>{w}</span>
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 + i * 0.1 }} className="font-mono text-sm text-muted-foreground">
              {[15836, 22520, 422, 1475, 1573, 499, 2099, 13][i]}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* Attention */
export function Attention() {
  return <Pinned h={260}>{(p) => <AttnInner p={p} />}</Pinned>;
}
function AttnInner({ p }: { p: MotionValue<number> }) {
  const words = ["The", "cat", "sat", "because", "it", "was", "tired"];
  const links = [[4, 1, 6], [4, 0, 2], [6, 1, 4], [2, 1, 3], [3, 6, 2]];
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6">
      <SceneTag n={14} label="Transformers" />
      <Big className="mb-4 text-center">Attention: every word <span className="text-electric">looks</span> at every other.</Big>
      <svg viewBox="0 0 840 300" className="w-full max-w-4xl">
        {links.map(([a, b, w], i) => <Arc key={i} a={a} b={b} w={w} i={i} p={p} />)}
        {words.map((w, i) => (
          <g key={w}>
            <rect x={i * 120 + 10} y="220" width="100" height="50" rx="12" fill={i === 4 ? "var(--sun)" : "var(--card)"} stroke="var(--ink)" strokeWidth="3" />
            <text x={i * 120 + 60} y="252" textAnchor="middle" fontWeight="800" fontSize="20" className="font-mono">{w}</text>
          </g>
        ))}
      </svg>
      <p className="mt-4 font-mono text-sm text-muted-foreground">“it” → “cat” · strongest link</p>
    </div>
  );
}
function Arc({ a, b, w, i, p }: { a: number; b: number; w: number; i: number; p: MotionValue<number> }) {
  const x1 = a * 120 + 60, x2 = b * 120 + 60;
  const h = 200 - Math.abs(x1 - x2) * 0.35;
  const len = useTransform(p, [i * 0.15, i * 0.15 + 0.25], [0, 1]);
  return <motion.path d={`M${x1} 215 Q${(x1 + x2) / 2} ${h - 80} ${x2} 215`} fill="none" stroke={COLORS[i % 4]} strokeWidth={w} strokeLinecap="round" style={{ pathLength: len }} />;
}

/* Diffusion */
export function Diffusion() {
  return <Pinned h={260}>{(p) => <DiffInner p={p} />}</Pinned>;
}
function DiffInner({ p }: { p: MotionValue<number> }) {
  const step = useTransform(p, [0.05, 0.9], [0, 1]);
  const label = useTransform(step, (v) => `step ${Math.round(v * 50)}/50`);
  return (
    <div className="relative grid h-full w-full items-center gap-10 px-8 md:grid-cols-2 md:px-20">
      <SceneTag n={15} label="Generative AI" />
      <div>
        <Kicker>✨ Generate</Kicker>
        <Big className="mt-6">From <span className="text-muted-foreground">noise</span> to <span className="text-gradient">art.</span></Big>
        <motion.p className="mt-6 font-mono text-lg">{label}</motion.p>
      </div>
      <div className="relative mx-auto grid aspect-square w-full max-w-md grid-cols-10 overflow-hidden rounded-3xl border-4 border-ink">
        {Array.from({ length: 100 }).map((_, i) => <Pix key={i} i={i} s={step} />)}
      </div>
    </div>
  );
}
function Pix({ i, s }: { i: number; s: MotionValue<number> }) {
  const r = Math.floor(i / 10), c = i % 10;
  const sun = (r - 3) ** 2 + (c - 6) ** 2 < 4;
  const hill = r > 6 - Math.sin(c / 2) * 1.5;
  const target = sun ? "#ffcf4a" : hill ? "#7ddc3a" : "#5b9bff";
  const noise = ["#222", "#888", "#ddd", "#555", "#bbb"][(i * 7) % 5];
  const t0 = ((i * 37) % 100) / 140;
  const bg = useTransform(s, [t0, t0 + 0.3], [noise, target]);
  return <motion.div style={{ background: bg }} />;
}

/* Compute */
export function Compute() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <SceneTag n={16} label="Compute" />
      <Reveal><Big className="text-center">Power-up: <span className="text-electric">GPUs</span></Big></Reveal>
      <div className="mt-12 flex items-end gap-3">
        {[1, 2, 4, 8, 16, 32, 64].map((v, i) => (
          <motion.div
            key={v}
            initial={{ height: 0 }}
            whileInView={{ height: v * 5 + 20 }}
            viewport={{ amount: 0.5 }}
            transition={{ delay: i * 0.12, type: "spring", stiffness: 60 }}
            className="w-12 rounded-t-xl border-2 border-ink md:w-16"
            style={{ background: COLORS[i % 4] }}
          />
        ))}
      </div>
      <Reveal delay={0.4}><p className="mt-8 font-mono text-muted-foreground">Training compute has grown ~4× per year since 2010</p></Reveal>
    </section>
  );
}

/* Challenges */
export function Challenges() {
  const items = [["⚖️", "Bias"], ["🌀", "Hallucination"], ["🔒", "Privacy"], ["⚡", "Energy"], ["🧭", "Alignment"], ["💼", "Jobs"]];
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <SceneTag n={17} label="Boss level" />
      <Reveal><Kicker>⚠ Boss level</Kicker></Reveal>
      <Reveal delay={0.1}><Big className="mt-6 text-center">The hard problems.</Big></Reveal>
      <div className="mt-14 grid grid-cols-2 gap-6 md:grid-cols-3">
        {items.map(([e, t], i) => (
          <motion.div
            key={t}
            initial={{ scale: 0, rotate: -30 }}
            whileInView={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.08, rotate: 3 }}
            transition={{ delay: i * 0.08, type: "spring" }}
            className="flex h-36 w-44 flex-col items-center justify-center gap-2 rounded-3xl border-4 border-ink bg-card shadow-pop"
          >
            <span className="text-5xl">{e}</span>
            <span className="font-display font-bold">{t}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
