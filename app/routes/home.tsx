import ParticleBackground from "~/components/welcome/ParticleBackground";
import type { Route } from "./+types/home";
import Welcome from "~/components/welcome/Welcome";
import { HeroUIProvider } from "@heroui/react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hemnath Balasubramanian" },
    { name: "Hemnath Balasubramanian", content: "Hemnath Balasubramanian" },
  ];
}

export default function Home() {
  return (
    <div className="bg-slate-900">
      <HeroUIProvider>
        <ParticleBackground>
          <Welcome />
        </ParticleBackground>
      </HeroUIProvider>
    </div>
  );
}
