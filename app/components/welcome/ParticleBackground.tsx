import { useCallback, useEffect, useState, type ReactNode } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

const ParticleBackground = ({ children }: { children: ReactNode }) => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container: any): void => {
    console.log(container);
  };

  return (
    <div className="">
      {init && (
        <>
          <Particles
            id="tsparticles"
            options={{
              fullScreen: {
                enable: true,
              },
              background: {
                // color: "#0f172a",
              },
              interactivity: {
                modes: {
                  bubble: {
                    distance: 400,
                    duration: 2,
                    opacity: 0.8,
                    size: 6,
                    speed: 3,
                    color: "#0f172a",
                  },
                  grab: { distance: 400, links: { opacity: 1 } },
                  push: { quantity: 4 },
                  remove: { quantity: 2 },
                  repulse: { distance: 200, duration: 0.4 },
                },
              },
              particles: {
                color: { value: "#ffffff" },
                links: {
                  color: "#ffffff",
                  distance: 150,
                  enable: true,
                  opacity: 0.1,
                  width: 1,
                },
                move: {
                  attract: { enable: false, rotate: { x: 600, y: 1200 } },
                  direction: "none",
                  enable: true,
                  outModes: "out",
                  random: false,
                  speed: 2,
                  straight: false,
                },
                number: {
                  density: { enable: true, height: 800, width: 800 },
                  value: 80,
                },
                opacity: {
                  value: 0.5,
                },
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 5 },
                },
              },
            }}
          />
          {children}
        </>
      )}
    </div>
  );
};

export default ParticleBackground;
