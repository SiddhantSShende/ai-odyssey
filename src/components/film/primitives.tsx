import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function Pinned({
  h = 300,
  children,
  className = "",
}: {
  h?: number;
  children: (p: MotionValue<number>) => ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section ref={ref} style={{ height: `${h}vh` }} className={`relative ${className}`}>
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {children(scrollYProgress)}
      </div>
    </section>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.4 }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-card px-4 py-1 font-mono text-xs font-bold uppercase tracking-widest shadow-pop">
      {children}
    </span>
  );
}

export function SceneTag({ n, label }: { n: number; label: string }) {
  return (
    <div className="absolute left-6 top-20 z-10 font-mono text-xs uppercase tracking-widest text-muted-foreground md:left-10">
      Scene {String(n).padStart(2, "0")} · {label}
    </div>
  );
}

export function Big({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`font-display text-5xl font-black leading-[0.95] tracking-tight md:text-7xl ${className}`}>
      {children}
    </h2>
  );
}

/** Opacity/scale ramp for item i of n across progress p */
export function useStep(p: MotionValue<number>, i: number, n: number, start = 0.05, end = 0.9) {
  const a = start + ((end - start) * i) / n;
  const b = a + (end - start) / n;
  const opacity = useTransform(p, [a, b], [0.15, 1]);
  const scale = useTransform(p, [a, b], [0.85, 1]);
  const x = useTransform(p, [a, b], [40, 0]);
  return { opacity, scale, x };
}
