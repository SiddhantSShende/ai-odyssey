import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import * as B from "./basics";
import { PROJECTS, ProjectScene } from "./projects";
import { Future, GameBoard, Outro, SkillTree } from "./roadmap";

function HUD() {
  const { scrollYProgress } = useScroll();
  const w = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [v, setV] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", setV);
  const scene = Math.min(32, Math.floor(v * 32) + 1);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <motion.div style={{ scaleX: w }} className="h-1.5 origin-left bg-gradient-to-r from-electric via-coral to-lime" />
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <div className="rounded-full border-2 border-ink bg-card px-3 py-1 font-display text-sm font-black shadow-pop">AI<span className="text-coral">·</span>FILM</div>
        <div className="flex gap-2 font-mono text-xs font-bold">
          <span className="rounded-full border-2 border-ink bg-sun px-3 py-1">SCENE {String(scene).padStart(2, "0")}/32</span>
          <span className="hidden rounded-full border-2 border-ink bg-lime px-3 py-1 sm:inline">XP {Math.round(v * 3200)}</span>
        </div>
      </div>
    </div>
  );
}

export function Film() {
  return (
    <main className="relative">
      <HUD />
      <B.Intro />
      <B.WhatIsAI />
      <B.Family />
      <B.History />
      <B.Chapter n="01" title="Fundamentals" sub="How machines actually learn" />
      <B.DataFuel />
      <B.Neuron />
      <B.Network />
      <B.TrainingLoop />
      <B.Gradient />
      <B.LearningTypes />
      <B.Vision />
      <B.Tokens />
      <B.Attention />
      <B.Diffusion />
      <B.Compute />
      <B.Challenges />
      <B.Chapter n="02" title="The Legends" sub="9 AI projects that changed the world" />
      {PROJECTS.map((p, i) => <ProjectScene key={p.name} proj={p} n={19 + i} idx={i + 1} />)}
      <B.Chapter n="03" title="The Roadmap" sub="How to build one yourself" />
      <GameBoard />
      <SkillTree />
      <Future />
      <Outro />
    </main>
  );
}
