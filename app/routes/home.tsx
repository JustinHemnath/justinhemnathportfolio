import ParticleBackground from "~/components/welcome/ParticleBackground";
import type { Route } from "./+types/home";
import Welcome from "~/components/welcome/Welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="bg-slate-900">
      <ParticleBackground>
        <Welcome />
      </ParticleBackground>
    </div>
  );
}
