import { useEffect, useRef } from "react";

type TreeConfig = {
  x: number;
  y: number;
  length: number;
  angle: number;
  depth: number;
  width: number;
  spread: number;
  lean: number;
  color: string;
};

type NodeConfig = {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  emphasis: "tip" | "junction";
  phase: number;
};

type Point = {
  x: number;
  y: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function mix(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const amount = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return amount * amount * (3 - 2 * amount);
}

function branchColor(base: string, alpha: number) {
  return `${base}${Math.round(clamp(alpha, 0, 1) * 255)
    .toString(16)
    .padStart(2, "0")}`;
}

function cubicBezierPoint(a: Point, b: Point, c: Point, d: Point, time: number): Point {
  const inverse = 1 - time;
  const inverseSquared = inverse * inverse;
  const inverseCubed = inverseSquared * inverse;
  const timeSquared = time * time;
  const timeCubed = timeSquared * time;

  return {
    x:
      inverseCubed * a.x +
      3 * inverseSquared * time * b.x +
      3 * inverse * timeSquared * c.x +
      timeCubed * d.x,
    y:
      inverseCubed * a.y +
      3 * inverseSquared * time * b.y +
      3 * inverse * timeSquared * c.y +
      timeCubed * d.y,
  };
}

export default function AmbientCanopy() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) {
      return undefined;
    }

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = media.matches;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let progress = 0;
    let targetProgress = 0;
    let rafId = 0;
    let lastPaint = 0;

    const trees: TreeConfig[] = [
      {
        x: 0.84,
        y: 1.08,
        length: 0.24,
        angle: -Math.PI / 2 - 0.22,
        depth: 8,
        width: 2.45,
        spread: 0.4,
        lean: -0.08,
        color: "#a30f2d",
      },
      {
        x: 0.16,
        y: 1.04,
        length: 0.21,
        angle: -Math.PI / 2 + 0.17,
        depth: 7,
        width: 1.95,
        spread: 0.36,
        lean: 0.06,
        color: "#1f1f22",
      },
      {
        x: 0.52,
        y: 1.1,
        length: 0.16,
        angle: -Math.PI / 2,
        depth: 6,
        width: 1.5,
        spread: 0.33,
        lean: 0.01,
        color: "#5c111f",
      },
    ];

    let scrollHost: HTMLElement | null = null;

    const resolveScrollHost = () => {
      const candidate = document.querySelector<HTMLElement>(".page-main");

      if (!candidate) {
        return null;
      }

      return candidate.scrollHeight > candidate.clientHeight + 1 ? candidate : null;
    };

    const syncScrollHost = () => {
      const nextHost = resolveScrollHost();

      if (scrollHost === nextHost) {
        return;
      }

      if (scrollHost) {
        scrollHost.removeEventListener("scroll", updateTargetProgress);
      }

      scrollHost = nextHost;

      if (scrollHost) {
        scrollHost.addEventListener("scroll", updateTargetProgress, { passive: true });
      }
    };

    const updateTargetProgress = () => {
      syncScrollHost();

      if (scrollHost) {
        const scrollable = scrollHost.scrollHeight - scrollHost.clientHeight;
        targetProgress = scrollable > 0 ? clamp(scrollHost.scrollTop / scrollable, 0, 1) : 0;
        return;
      }

      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = scrollable > 0 ? clamp(window.scrollY / scrollable, 0, 1) : 0;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 1.4);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      syncScrollHost();
      updateTargetProgress();
    };

    const drawNode = (node: NodeConfig, time: number) => {
      const pulse = reducedMotion ? 0.56 : 0.56 + Math.sin(time * 0.0016 + node.phase) * 0.18;
      const outerRadius = node.radius * (node.emphasis === "tip" ? 2.9 : 2.15);
      const gradient = context.createRadialGradient(node.x, node.y, 0, node.x, node.y, outerRadius);

      gradient.addColorStop(0, branchColor(node.color, node.alpha * 0.42 + pulse * 0.06));
      gradient.addColorStop(0.44, branchColor(node.color, node.alpha * 0.16));
      gradient.addColorStop(1, branchColor(node.color, 0));

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(node.x, node.y, outerRadius, 0, Math.PI * 2);
      context.fill();

      context.strokeStyle = branchColor(
        node.color,
        node.alpha * (node.emphasis === "tip" ? 0.54 : 0.32),
      );
      context.lineWidth = node.emphasis === "tip" ? 1.3 : 0.9;
      context.beginPath();
      context.arc(node.x, node.y, node.radius * (node.emphasis === "tip" ? 1.26 : 1.08), 0, Math.PI * 2);
      context.stroke();

      context.fillStyle = branchColor(node.color, node.alpha * 0.8 + 0.12);
      context.beginPath();
      context.arc(node.x, node.y, node.radius * (node.emphasis === "tip" ? 0.62 : 0.52), 0, Math.PI * 2);
      context.fill();
    };

    const drawConnector = (
      start: Point,
      controlA: Point,
      controlB: Point,
      end: Point,
      color: string,
      alpha: number,
      tracer: number,
      time: number,
    ) => {
      context.strokeStyle = branchColor(color, alpha);
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.bezierCurveTo(controlA.x, controlA.y, controlB.x, controlB.y, end.x, end.y);
      context.stroke();

      const point = cubicBezierPoint(start, controlA, controlB, end, tracer);
      drawNode(
        {
          x: point.x,
          y: point.y,
          radius: 3.3,
          color,
          alpha: alpha + 0.16,
          emphasis: "tip",
          phase: tracer * Math.PI * 2,
        },
        time,
      );
    };

    const render = (time: number) => {
      const frameInterval = reducedMotion ? 1000 / 12 : 1000 / 28;

      if (time - lastPaint < frameInterval) {
        rafId = window.requestAnimationFrame(render);
        return;
      }

      lastPaint = time;
      progress += (targetProgress - progress) * (reducedMotion ? 1 : 0.065);

      context.clearRect(0, 0, width, height);

      const easedProgress = smoothstep(0, 1, progress);
      const cinematicDrift = reducedMotion ? 0 : Math.sin(time * 0.00011) * width * 0.008;
      const sway = reducedMotion
        ? 0
        : Math.sin(time * 0.00042) * 0.034 + Math.sin(time * 0.00018 + 1.2) * 0.014;
      const growthThreshold = 0.72 + easedProgress * 7.2;
      const nodes: NodeConfig[] = [];

      const addNode = (node: NodeConfig) => {
        if (node.x < -28 || node.x > width + 28 || node.y < -28 || node.y > height + 28) {
          return;
        }

        nodes.push(node);
      };

      const drawBranch = (
        x: number,
        y: number,
        length: number,
        angle: number,
        depth: number,
        maxDepth: number,
        widthScale: number,
        spread: number,
        threshold: number,
        treeLean: number,
        color: string,
        phase: number,
      ) => {
        const depthThreshold = threshold - depth;

        if (depthThreshold <= 0) {
          return;
        }

        const rawProgress = clamp(depthThreshold, 0, 1);
        const segmentProgress = reducedMotion ? rawProgress : easeInOutCubic(rawProgress);
        const localBend = reducedMotion
          ? 0
          : Math.sin(time * 0.00062 + phase + depth * 0.46) * 0.016 * (0.5 + depth / maxDepth);
        const nextAngle = angle + localBend;
        const nextX = x + Math.cos(nextAngle) * length * segmentProgress;
        const nextY = y + Math.sin(nextAngle) * length * segmentProgress;
        const depthRatio = depth / maxDepth;
        const alpha = mix(0.48, 0.16, depthRatio) + easedProgress * 0.05;

        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(nextX, nextY);
        context.lineWidth = Math.max(0.48, widthScale - depth * 0.15);
        context.strokeStyle = branchColor(color, alpha);
        context.stroke();

        if (segmentProgress < 1) {
          if (rawProgress > 0.42) {
            addNode({
              x: nextX,
              y: nextY,
              radius: mix(2.1, 3.6, 1 - depthRatio),
              color,
              alpha: 0.34 + rawProgress * 0.24 + easedProgress * 0.08,
              emphasis: "tip",
              phase: phase + depth * 0.31,
            });
          }

          return;
        }

        if (depth >= maxDepth) {
          addNode({
            x: nextX,
            y: nextY,
            radius: mix(2.6, 4.2, 1 - depthRatio),
            color,
            alpha: 0.56 + easedProgress * 0.18,
            emphasis: "tip",
            phase: phase + depth * 0.34,
          });
          return;
        }

        if (depth > 1 && depth < maxDepth - 1 && depth % 2 === 0) {
          addNode({
            x: nextX,
            y: nextY,
            radius: mix(1.8, 2.5, 1 - depthRatio),
            color,
            alpha: 0.22 + easedProgress * 0.08,
            emphasis: "junction",
            phase: phase + depth * 0.22,
          });
        }

        const nextLength = length * mix(0.79, 0.68, depthRatio);
        const nextWidth = widthScale * 0.82;
        const spreadLift = spread + depth * 0.011;
        const swayOffset = reducedMotion ? 0 : sway * (0.34 + depth * 0.07);
        const leanOffset = treeLean * (0.26 + depth * 0.05);
        const forkPulse = reducedMotion ? 0 : Math.sin(time * 0.00028 + phase + depth * 0.4) * 0.012;

        drawBranch(
          nextX,
          nextY,
          nextLength,
          nextAngle - spreadLift + swayOffset + leanOffset + forkPulse,
          depth + 1,
          maxDepth,
          nextWidth,
          spread,
          threshold,
          treeLean,
          color,
          phase + 0.7,
        );

        drawBranch(
          nextX,
          nextY,
          nextLength,
          nextAngle + spreadLift + swayOffset + leanOffset - forkPulse,
          depth + 1,
          maxDepth,
          nextWidth,
          spread,
          threshold,
          treeLean,
          color,
          phase + 1.2,
        );

        if (depth > 1 && depth % 3 === 0) {
          drawBranch(
            nextX,
            nextY,
            nextLength * 0.72,
            nextAngle + leanOffset * 0.75 + swayOffset * 0.45,
            depth + 1,
            maxDepth,
            nextWidth * 0.76,
            spread * 0.82,
            threshold - 0.18,
            treeLean,
            color,
            phase + 1.8,
          );
        }
      };

      const vignette = context.createRadialGradient(
        width * 0.72,
        height * 0.24,
        40,
        width * 0.72,
        height * 0.34,
        height * 0.92,
      );
      vignette.addColorStop(0, "rgba(255,255,255,0.02)");
      vignette.addColorStop(1, "rgba(255,252,252,0)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);

      trees.forEach((tree, index) => {
        const phase = index * 1.37;
        const rootX = width * tree.x + cinematicDrift * (index === 1 ? -0.5 : 0.7 - index * 0.2);
        const rootY = height * tree.y;

        drawBranch(
          rootX,
          rootY,
          height * tree.length,
          tree.angle + sway * (0.22 + index * 0.14),
          0,
          tree.depth,
          tree.width,
          tree.spread,
          growthThreshold + index * 0.18,
          tree.lean,
          tree.color,
          phase,
        );

        addNode({
          x: rootX,
          y: rootY,
          radius: 2.4 + index * 0.25,
          color: tree.color,
          alpha: 0.18 + easedProgress * 0.06,
          emphasis: "junction",
          phase: phase + 0.24,
        });
      });

      const connectorAlpha = 0.08 + easedProgress * 0.16;
      const tracerBase = reducedMotion ? easedProgress : (time * 0.00006 + easedProgress * 0.46) % 1;

      drawConnector(
        { x: width * 0.12, y: height * 0.24 },
        { x: width * 0.32, y: height * 0.18 },
        { x: width * 0.58, y: height * 0.28 },
        { x: width * 0.88, y: height * 0.18 },
        "#2e2a30",
        connectorAlpha,
        (tracerBase + 0.08) % 1,
        time,
      );

      drawConnector(
        { x: width * 0.1, y: height * 0.62 },
        { x: width * 0.28, y: height * 0.56 },
        { x: width * 0.54, y: height * 0.7 },
        { x: width * 0.84, y: height * 0.56 },
        "#6b1224",
        connectorAlpha * 0.92,
        (tracerBase + 0.44) % 1,
        time,
      );

      nodes
        .sort((left, right) => left.radius - right.radius)
        .forEach((node) => {
          drawNode(node, time);
        });

      if (!reducedMotion || Math.abs(targetProgress - progress) > 0.001) {
        rafId = window.requestAnimationFrame(render);
      }
    };

    const mediaHandler = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      updateTargetProgress();
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(render);
    };

    resize();
    updateTargetProgress();
    rafId = window.requestAnimationFrame(render);

    window.addEventListener("scroll", updateTargetProgress, { passive: true });
    window.addEventListener("resize", resize);
    media.addEventListener("change", mediaHandler);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateTargetProgress);
      window.removeEventListener("resize", resize);
      media.removeEventListener("change", mediaHandler);
      scrollHost?.removeEventListener("scroll", updateTargetProgress);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="ambient-canopy"
      aria-hidden="true"
    />
  );
}
