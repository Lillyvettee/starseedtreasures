import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: [number, number, number];
};

type ShootingStar = {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
};

type FloatingOrb = {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  phase: number;
  speed: number;
  color: [number, number, number];
  driftX: number;
  driftY: number;
};

const STAR_COLORS: [number, number, number][] = [
  [157, 125, 255],
  [200, 180, 255],
  [255, 200, 230],
  [180, 220, 255],
  [255, 215, 140],
  [220, 200, 255],
];

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    const orbs: FloatingOrb[] = [];
    let lastShootingStar = 0;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createStars() {
      stars.length = 0;
      const count = Math.min(120, Math.floor((canvas!.width * canvas!.height) / 8000));
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          size: Math.random() * 2.5 + 0.3,
          opacity: Math.random() * 0.6 + 0.15,
          speed: Math.random() * 0.12 + 0.02,
          twinkleSpeed: Math.random() * 0.03 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        });
      }
    }

    function createOrbs() {
      orbs.length = 0;
      const orbColors: [number, number, number][] = [
        [157, 125, 255],
        [120, 80, 200],
        [200, 150, 255],
        [100, 150, 255],
      ];
      for (let i = 0; i < 5; i++) {
        orbs.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          radius: Math.random() * 80 + 40,
          opacity: Math.random() * 0.04 + 0.01,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.003 + 0.001,
          color: orbColors[Math.floor(Math.random() * orbColors.length)],
          driftX: (Math.random() - 0.5) * 0.3,
          driftY: (Math.random() - 0.5) * 0.15,
        });
      }
    }

    function spawnShootingStar() {
      if (!canvas) return;
      shootingStars.push({
        x: Math.random() * canvas.width * 0.8,
        y: Math.random() * canvas.height * 0.4,
        length: Math.random() * 80 + 40,
        speed: Math.random() * 6 + 4,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 40 + 30,
      });
    }

    function drawStar(star: Star) {
      if (!ctx) return;
      star.twinklePhase += star.twinkleSpeed;
      const twinkle = Math.sin(star.twinklePhase) * 0.4 + 0.6;
      const currentOpacity = star.opacity * twinkle;
      const [r, g, b] = star.color;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
      ctx.fill();

      if (star.size > 1.2) {
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 4
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      star.y -= star.speed;
      star.x += Math.sin(star.twinklePhase * 0.3) * 0.08;

      if (star.y < -10) {
        star.y = canvas!.height + 10;
        star.x = Math.random() * canvas!.width;
      }
    }

    function drawShootingStar(ss: ShootingStar): boolean {
      if (!ctx) return false;
      ss.life++;
      ss.x += Math.cos(ss.angle) * ss.speed;
      ss.y += Math.sin(ss.angle) * ss.speed;

      const fadeIn = Math.min(ss.life / 8, 1);
      const fadeOut = Math.max(0, 1 - (ss.life - ss.maxLife * 0.6) / (ss.maxLife * 0.4));
      ss.opacity = fadeIn * fadeOut;

      if (ss.life > ss.maxLife) return false;

      const tailX = ss.x - Math.cos(ss.angle) * ss.length;
      const tailY = ss.y - Math.sin(ss.angle) * ss.length;

      const gradient = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
      gradient.addColorStop(0, `rgba(157, 125, 255, 0)`);
      gradient.addColorStop(0.6, `rgba(200, 180, 255, ${ss.opacity * 0.3})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, ${ss.opacity * 0.9})`);

      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(ss.x, ss.y);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      const headGlow = ctx.createRadialGradient(ss.x, ss.y, 0, ss.x, ss.y, 6);
      headGlow.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity * 0.8})`);
      headGlow.addColorStop(1, `rgba(157, 125, 255, 0)`);
      ctx.beginPath();
      ctx.arc(ss.x, ss.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = headGlow;
      ctx.fill();

      return true;
    }

    function drawOrb(orb: FloatingOrb) {
      if (!ctx) return;
      orb.phase += orb.speed;
      const breathe = Math.sin(orb.phase) * 0.3 + 0.7;
      const [r, g, b] = orb.color;

      orb.x += orb.driftX;
      orb.y += orb.driftY;

      if (orb.x < -orb.radius * 2) orb.x = canvas!.width + orb.radius;
      if (orb.x > canvas!.width + orb.radius * 2) orb.x = -orb.radius;
      if (orb.y < -orb.radius * 2) orb.y = canvas!.height + orb.radius;
      if (orb.y > canvas!.height + orb.radius * 2) orb.y = -orb.radius;

      const gradient = ctx.createRadialGradient(
        orb.x, orb.y, 0,
        orb.x, orb.y, orb.radius
      );
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${orb.opacity * breathe})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      ctx.beginPath();
      ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    function animate(time: number) {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach(drawOrb);
      stars.forEach(drawStar);

      if (time - lastShootingStar > 4000 + Math.random() * 6000) {
        spawnShootingStar();
        lastShootingStar = time;
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        if (!drawShootingStar(shootingStars[i])) {
          shootingStars.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    }

    resize();
    createStars();
    createOrbs();
    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      resize();
      createStars();
      createOrbs();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
      data-testid="star-background"
    />
  );
}
