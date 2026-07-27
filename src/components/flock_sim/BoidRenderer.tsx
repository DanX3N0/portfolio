import { Application, extend, useTick } from "@pixi/react";
import { Assets, Container, Sprite, type Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import {
  type BoidState,
  createBoid,
  getBoidAngle,
  updateBoid,
} from "./BoidEngine";

extend({ Container, Sprite });

const BOID_COUNT = 50;
const BOID_SCALE = 0.4;

interface BoidRendererProps {
  width: number;
  height: number;
}

function Boids({
  width,
  height,
  texture,
}: BoidRendererProps & { texture: Texture }) {
  const [boids, setBoids] = useState<BoidState[]>([]);
  const boidsRef = useRef<BoidState[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      const initial = Array.from({ length: BOID_COUNT }, () =>
        createBoid(width, height),
      );
      boidsRef.current = initial;
      setBoids(initial);
      initialized.current = true;
    }
  }, [width, height]);

  useTick(() => {
    const updated = boidsRef.current.map((boid) =>
      updateBoid(boid, boidsRef.current, width, height),
    );
    boidsRef.current = updated;
    setBoids(updated);
  });

  return (
    <pixiContainer>
      {boids.map((boid, i) => (
        <pixiSprite
          key={`boid-${i}`}
          texture={texture}
          x={boid.position.x}
          y={boid.position.y}
          anchor={0.5}
          scale={BOID_SCALE}
          rotation={getBoidAngle(boid)}
        />
      ))}
    </pixiContainer>
  );
}

export function BoidRenderer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    Assets.load("/icons/BirdIcon.svg").then((tex: Texture) => {
      setTexture(tex);
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSize({
          width: Math.floor(entry.contentRect.width),
          height: Math.floor(entry.contentRect.height),
        });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      {size.width > 0 && size.height > 0 && texture && (
        <Application
          width={size.width}
          height={size.height}
          backgroundColor={0x0c0a09}
          antialias={true}
          resolution={Math.min(window.devicePixelRatio, 2)}
          autoDensity={true}
        >
          <Boids width={size.width} height={size.height} texture={texture} />
        </Application>
      )}
    </div>
  );
}
