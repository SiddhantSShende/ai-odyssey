import { createFileRoute } from "@tanstack/react-router";
import { Film } from "@/components/film/Film";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI: The Film — Fundamentals, Legends & Roadmaps" },
      { name: "description", content: "A cinematic, scroll-animated journey through AI basics and the world's top AI projects — ChatGPT, AlphaGo, AlphaFold and more." },
      { property: "og:title", content: "AI: The Film" },
      { property: "og:description", content: "32 animated scenes on AI fundamentals and how legendary AI projects were built." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Film,
});
