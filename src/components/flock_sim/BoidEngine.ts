export interface Vec2 {
  x: number;
  y: number;
}

export interface BoidState {
  position: Vec2;
  velocity: Vec2;
  acceleration: Vec2;
}

export interface BoidConfig {
  perceptionRadius: number;
  separationRadius: number;
  alignRadius: number;
  maxSpeed: number;
  maxForce: number;
  separationWeight: number;
  alignWeight: number;
  cohesionWeight: number;
}

export const DEFAULT_CONFIG: BoidConfig = {
  perceptionRadius: 50,
  separationRadius: 24,
  alignRadius: 25,
  maxSpeed: 2.1,
  maxForce: 0.1,
  separationWeight: 1.5,
  alignWeight: 1.0,
  cohesionWeight: 1.0,
};

function vec2(x: number, y: number): Vec2 {
  return { x, y };
}

function add(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x + b.x, y: a.y + b.y };
}

function sub(a: Vec2, b: Vec2): Vec2 {
  return { x: a.x - b.x, y: a.y - b.y };
}

function mul(v: Vec2, s: number): Vec2 {
  return { x: v.x * s, y: v.y * s };
}

function div(v: Vec2, s: number): Vec2 {
  return { x: v.x / s, y: v.y / s };
}

function mag(v: Vec2): number {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

function setMag(v: Vec2, m: number): Vec2 {
  const len = mag(v);
  if (len === 0) return { x: 0, y: 0 };
  return mul(div(v, len), m);
}

function limit(v: Vec2, max: number): Vec2 {
  const len = mag(v);
  if (len > max) return setMag(v, max);
  return v;
}

function dist(a: Vec2, b: Vec2): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function heading(v: Vec2): number {
  return Math.atan2(v.y, v.x);
}

export function createBoid(width: number, height: number): BoidState {
  return {
    position: vec2(Math.random() * width, Math.random() * height),
    velocity: vec2(Math.random(), Math.random()),
    acceleration: vec2(
      (Math.random() - 0.5) * 0.2,
      (Math.random() - 0.5) * 0.2,
    ),
  };
}

function cohesion(
  boid: BoidState,
  boids: BoidState[],
  config: BoidConfig,
): Vec2 {
  let steering = vec2(0, 0);
  let count = 0;

  for (const other of boids) {
    if (other === boid) continue;
    const d = dist(boid.position, other.position);
    if (d < config.perceptionRadius) {
      steering = add(steering, other.position);
      count++;
    }
  }

  if (count > 0) {
    steering = div(steering, count);
    steering = sub(steering, boid.position);
    steering = setMag(steering, config.maxSpeed);
    steering = sub(steering, boid.velocity);
    steering = limit(steering, config.maxForce);
  }
  return steering;
}

function separation(
  boid: BoidState,
  boids: BoidState[],
  config: BoidConfig,
): Vec2 {
  let steering = vec2(0, 0);
  let count = 0;

  for (const other of boids) {
    if (other === boid) continue;
    const d = dist(boid.position, other.position);
    if (d < config.separationRadius && d > 0) {
      const diff = div(sub(boid.position, other.position), d * d);
      steering = add(steering, diff);
      count++;
    }
  }

  if (count > 0) {
    steering = div(steering, count);
    steering = setMag(steering, config.maxSpeed);
    steering = sub(steering, boid.velocity);
    steering = limit(steering, config.maxForce);
  }
  return steering;
}

function align(boid: BoidState, boids: BoidState[], config: BoidConfig): Vec2 {
  let steering = vec2(0, 0);
  let count = 0;

  for (const other of boids) {
    if (other === boid) continue;
    const d = dist(boid.position, other.position);
    if (d < config.alignRadius) {
      steering = add(steering, other.velocity);
      count++;
    }
  }

  if (count > 0) {
    steering = div(steering, count);
    steering = setMag(steering, config.maxSpeed);
    steering = sub(steering, boid.velocity);
    steering = limit(steering, config.maxForce);
  }
  return steering;
}

function edges(boid: BoidState, width: number, height: number): Vec2 {
  let { x, y } = boid.position;
  if (x > width) x = 0;
  if (x < 0) x = width;
  if (y > height) y = 0;
  if (y < 0) y = height;
  return vec2(x, y);
}

export function updateBoid(
  boid: BoidState,
  boids: BoidState[],
  width: number,
  height: number,
  config: BoidConfig = DEFAULT_CONFIG,
): BoidState {
  const alignForce = align(boid, boids, config);
  const cohesionForce = cohesion(boid, boids, config);
  const separationForce = separation(boid, boids, config);

  const acc = add(
    add(
      mul(alignForce, config.alignWeight),
      mul(cohesionForce, config.cohesionWeight),
    ),
    mul(separationForce, config.separationWeight),
  );

  const vel = limit(add(boid.velocity, acc), config.maxSpeed);
  const pos = add(boid.position, vel);
  const wrappedPos = edges(
    { position: pos, velocity: vel, acceleration: acc },
    width,
    height,
  );

  return {
    position: wrappedPos,
    velocity: vel,
    acceleration: vec2(0, 0),
  };
}

export function getBoidAngle(boid: BoidState): number {
  return heading(boid.velocity) + Math.PI / 2;
}
