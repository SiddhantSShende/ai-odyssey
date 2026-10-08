import { motion, useTransform, type MotionValue } from "framer-motion";
import { Pinned, SceneTag, useStep } from "./primitives";

type Motif = "chat" | "go" | "fold" | "car" | "lidar" | "art" | "code" | "spark" | "shield";
export type Project = {
  name: string; org: string; year: string; color: string; motif: Motif;
  stats: [string, string][];
  steps: [string, string][];
};

export const PROJECTS: Project[] = [
  { name: "ChatGPT", org: "OpenAI", year: "2022", color: "var(--lime)", motif: "chat",
    stats: [["100M", "users in ~2 months"], ["175B", "params in GPT-3"]],
    steps: [["2017", "Transformer architecture"], ["2018", "GPT-1: pre-train on books"], ["2020", "GPT-3: scale up 100×"], ["2022", "RLHF: humans rank answers"], ["Nov 2022", "Chat interface launches"], ["2023+", "GPT-4, multimodal"]] },
  { name: "AlphaGo", org: "DeepMind", year: "2016", color: "var(--sun)", motif: "go",
    stats: [["4–1", "vs. Lee Sedol"], ["10¹⁷⁰", "board positions"]],
    steps: [["Data", "30M expert human moves"], ["Policy net", "Predicts the next move"], ["Self-play", "Plays itself millions of times"], ["Value net", "Judges who's winning"], ["Search", "Monte-Carlo tree search"], ["2017", "AlphaGo Zero: no human data"]] },
  { name: "AlphaFold", org: "Google DeepMind", year: "2020", color: "var(--electric)", motif: "fold",
    stats: [["200M+", "protein structures"], ["2024", "Nobel Prize"]],
    steps: [["Problem", "50-year protein folding puzzle"], ["Data", "~170k known structures (PDB)"], ["2018", "AlphaFold 1 wins CASP13"], ["Model", "Attention-based Evoformer"], ["2020", "Near-lab accuracy at CASP14"], ["2021+", "Free database for science"]] },
  { name: "Tesla FSD", org: "Tesla", year: "2016→", color: "var(--coral)", motif: "car",
    stats: [["8", "cameras, vision-only"], ["Millions", "cars collecting data"]],
    steps: [["Fleet", "Cars record tricky moments"], ["Labels", "Auto-labeling at scale"], ["Train", "Huge GPU clusters"], ["Shadow", "Test silently on real roads"], ["Ship", "Over-the-air updates"], ["v12", "End-to-end neural network"]] },
  { name: "Waymo", org: "Alphabet", year: "2009→", color: "var(--lime)", motif: "lidar",
    stats: [["2009", "started at Google"], ["0", "drivers in the car"]],
    steps: [["Sensors", "Lidar + radar + cameras"], ["Maps", "HD maps of every street"], ["Simulate", "Billions of virtual miles"], ["Safety", "Test drivers on board"], ["2020", "Fully driverless in Phoenix"], ["Scale", "SF, LA & more cities"]] },
  { name: "Stable Diffusion", org: "Stability AI · LMU", year: "2022", color: "var(--sun)", motif: "art",
    stats: [["5B", "image-text pairs (LAION)"], ["Open", "weights for everyone"]],
    steps: [["Research", "Latent diffusion paper"], ["Data", "Billions of captioned images"], ["Compress", "Work in small latent space"], ["Denoise", "U-Net removes noise step by step"], ["Guide", "Text encoder steers the image"], ["Aug 2022", "Open-source release"]] },
  { name: "GitHub Copilot", org: "GitHub · OpenAI", year: "2021", color: "var(--electric)", motif: "code",
    stats: [["55%", "faster task completion*"], ["Millions", "of developers"]],
    steps: [["Base", "GPT-3 language model"], ["Data", "Public code repositories"], ["Codex", "Fine-tuned for code"], ["IDE", "Lives inside the editor"], ["2021", "Technical preview"], ["Now", "Chat + agent mode"]] },
  { name: "Gemini", org: "Google DeepMind", year: "2023", color: "var(--coral)", motif: "spark",
    stats: [["1M+", "token context window"], ["Native", "text·image·audio·video"]],
    steps: [["Merge", "Brain + DeepMind unite"], ["TPUs", "Custom AI chips"], ["Multimodal", "Trained on all media at once"], ["Dec 2023", "Gemini 1.0 launch"], ["2024", "Long context (1.5)"], ["Everywhere", "Search, Android, Workspace"]] },
  { name: "Claude", org: "Anthropic", year: "2023", color: "var(--sun)", motif: "shield",
    stats: [["2021", "Anthropic founded"], ["CAI", "Constitutional AI"]],
    steps: [["Mission", "Safety-first AI lab"], ["Pre-train", "Large transformer model"], ["Constitution", "Principles guide feedback"], ["RLAIF", "AI-assisted feedback"], ["2023", "Claude launches"], ["Agents", "Coding & computer use"]] },
];

export function ProjectScene({ proj, n, idx }: { proj: Project; n: number; idx: number }) {
  return <Pinned h={320}>{(p) => <Inner p={p} proj={proj} n={n} idx={idx} />}</Pinned>;
}

function Inner({ p, proj, n, idx }: { p: MotionValue<number>; proj: Project; n: number; idx: number }) {
  const titleX = useTransform(p, [0, 0.2], [-120, 0]);
  const titleOp = useTransform(p, [0, 0.15, 0.92, 1], [0, 1, 1, 0]);
  const rail = useTransform(p, [0.05, 0.9], ["0%", "100%"]);
  const bgScale = useTransform(p, [0, 1], [0.6, 1.3]);
  const bgRot = useTransform(p, [0, 1], [0, 90]);
  return (
    <div className="relative grid h-full w-full items-center gap-8 overflow-hidden px-6 md:grid-cols-[1.1fr_1fr] md:px-16">
      <SceneTag n={n} label={`Legend ${idx}/9`} />
      <motion.div
        style={{ scale: bgScale, rotate: bgRot, background: proj.color }}
        className="absolute -right-[20vw] -top-[20vw] h-[60vw] w-[60vw] rounded-[30%] opacity-15"
      />
      <motion.div style={{ x: titleX, opacity: titleOp }} className="relative z-10">
        <div className="flex items-center gap-3 font-mono text-sm uppercase tracking-widest">
          <span className="rounded-md border-2 border-ink px-2 py-0.5" style={{ background: proj.color }}>{proj.org}</span>
          <span>{proj.year}</span>
        </div>
        <h3 className="mt-4 font-display text-6xl font-black leading-none md:text-8xl">{proj.name}</h3>
        <div className="mt-8 h-56 w-full max-w-md"><MotifArt m={proj.motif} c={proj.color} /></div>
        <div className="mt-6 flex gap-4">
          {proj.stats.map(([v, l]) => (
            <div key={l} className="rounded-2xl border-2 border-ink bg-card px-4 py-3 shadow-pop">
              <div className="font-display text-2xl font-black">{v}</div>
              <div className="text-xs text-muted-foreground">{l}</div>
            </div>
          ))}
        </div>
      </motion.div>
      <div className="relative z-10 pl-8">
        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">How it was built ↓</div>
        <div className="absolute bottom-0 left-[18px] top-10 w-1 rounded bg-border">
          <motion.div style={{ height: rail, background: proj.color }} className="w-full rounded" />
        </div>
        <div className="flex flex-col gap-4">
          {proj.steps.map(([k, t], i) => <Step key={k} i={i} n={proj.steps.length} k={k} t={t} c={proj.color} p={p} />)}
        </div>
      </div>
    </div>
  );
}

function Step({ i, n, k, t, c, p }: { i: number; n: number; k: string; t: string; c: string; p: MotionValue<number> }) {
  const s = useStep(p, i, n);
  return (
    <motion.div style={{ opacity: s.opacity, x: s.x }} className="relative flex items-center gap-4">
      <motion.div style={{ scale: s.scale, background: c }} className="z-10 flex h-10 w-10 shrink-0 -translate-x-8 items-center justify-center rounded-full border-2 border-ink font-display font-black">
        {i + 1}
      </motion.div>
      <div className="-ml-8 flex-1 rounded-xl border-2 border-ink bg-card px-4 py-2">
        <div className="font-mono text-xs font-bold uppercase">{k}</div>
        <div className="font-semibold">{t}</div>
      </div>
    </motion.div>
  );
}

function MotifArt({ m, c }: { m: Motif; c: string }) {
  const loop = { repeat: Infinity, duration: 2.4 };
  if (m === "chat")
    return (
      <div className="flex h-full flex-col justify-center gap-3">
        {["Explain AI like I'm 5", "Imagine a robot that learns from examples…", "Now write a poem"].map((t, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -10] }}
            transition={{ ...loop, duration: 6, delay: i * 1.2 }}
            className={`max-w-[80%] rounded-2xl border-2 border-ink px-4 py-2 ${i % 2 ? "self-start" : "self-end"}`}
            style={{ background: i % 2 ? c : "var(--card)" }}>{t}</motion.div>
        ))}
      </div>
    );
  if (m === "go")
    return (
      <div className="grid aspect-square h-full grid-cols-7 gap-0 rounded-xl border-4 border-ink bg-sun/40 p-2">
        {Array.from({ length: 49 }).map((_, i) => (
          <div key={i} className="flex items-center justify-center border border-ink/30">
            {(i * 7) % 5 === 0 && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (i % 13) * 0.2, repeat: Infinity, repeatDelay: 3 }}
              className={`h-4/5 w-4/5 rounded-full ${i % 2 ? "bg-ink" : "border-2 border-ink bg-card"}`} />}
          </div>
        ))}
      </div>
    );
  if (m === "fold")
    return (
      <svg viewBox="0 0 300 200" className="h-full w-full">
        <motion.path d="M10 100 C 60 10, 90 190, 140 100 S 220 10, 290 100" fill="none" stroke={c} strokeWidth="12" strokeLinecap="round"
          animate={{ d: ["M10 100 C 60 10, 90 190, 140 100 S 220 10, 290 100", "M60 60 C 250 0, 250 200, 150 140 S 40 200, 120 100", "M10 100 C 60 10, 90 190, 140 100 S 220 10, 290 100"] }}
          transition={{ repeat: Infinity, duration: 5 }} />
      </svg>
    );
  if (m === "car" || m === "lidar")
    return (
      <div className="relative h-full overflow-hidden rounded-2xl border-4 border-ink bg-muted">
        {[0, 1, 2].map((i) => (
          <motion.div key={i} className="absolute left-1/2 h-10 w-2 -translate-x-1/2 bg-ink" animate={{ top: ["-20%", "120%"] }} transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.4, ease: "linear" }} />
        ))}
        {m === "lidar" && <motion.div className="absolute bottom-6 left-1/2 h-48 w-48 -translate-x-1/2 translate-y-1/2 rounded-full border-4" style={{ borderColor: c }} animate={{ scale: [0.3, 1.6], opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} />}
        <div className="absolute bottom-4 left-1/2 h-16 w-10 -translate-x-1/2 rounded-lg border-2 border-ink" style={{ background: c }} />
        <motion.div className="absolute left-[15%] top-[20%] rounded border-2 border-coral px-1 font-mono text-[10px]" animate={{ opacity: [0, 1, 0] }} transition={loop}>car</motion.div>
        <motion.div className="absolute right-[12%] top-[45%] rounded border-2 border-electric px-1 font-mono text-[10px]" animate={{ opacity: [0, 1, 0] }} transition={{ ...loop, delay: 1 }}>person</motion.div>
      </div>
    );
  if (m === "art")
    return (
      <div className="flex h-full gap-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div key={i} className="flex-1 rounded-xl border-2 border-ink"
            style={{ background: i === 3 ? `linear-gradient(160deg, var(--electric), ${c}, var(--coral))` : `repeating-conic-gradient(var(--ink) 0 ${25 - i * 7}%, var(--card) 0 ${50 - i * 14}%)`, opacity: 0.3 + i * 0.23 }}
            animate={{ y: [0, -8, 0] }} transition={{ ...loop, delay: i * 0.2 }} />
        ))}
      </div>
    );
  if (m === "code")
    return (
      <div className="h-full rounded-2xl border-4 border-ink bg-ink p-4 font-mono text-sm text-background">
        <div>function <span className="text-lime">fib</span>(n) {"{"}</div>
        <motion.div className="pl-4 text-background/50" animate={{ opacity: [0, 1] }} transition={{ ...loop, repeatType: "reverse" }}>
          return n {"<"} 2 ? n : fib(n-1) + fib(n-2);
        </motion.div>
        <div>{"}"}</div>
        <motion.span className="inline-block h-4 w-2 bg-lime" animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} />
      </div>
    );
  if (m === "spark")
    return (
      <div className="relative flex h-full items-center justify-center">
        {["📝", "🖼️", "🎵", "🎬"].map((e, i) => (
          <motion.div key={e} className="absolute text-4xl" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            style={{ width: 200, height: 200, transformOrigin: "center" }}>
            <span className="absolute" style={{ left: `${50 + 45 * Math.cos((i * Math.PI) / 2)}%`, top: `${50 + 45 * Math.sin((i * Math.PI) / 2)}%` }}>{e}</span>
          </motion.div>
        ))}
        <motion.div className="h-20 w-20 rotate-45 rounded-2xl border-4 border-ink" style={{ background: c }} animate={{ rotate: [45, 225] }} transition={{ repeat: Infinity, duration: 4 }} />
      </div>
    );
  return (
    <div className="flex h-full items-center justify-center">
      <motion.div className="flex h-44 w-36 items-center justify-center rounded-b-[50%] rounded-t-2xl border-4 border-ink text-5xl" style={{ background: c }}
        animate={{ scale: [1, 1.06, 1] }} transition={loop}>✳</motion.div>
    </div>
  );
}
