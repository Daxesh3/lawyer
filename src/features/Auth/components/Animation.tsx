import { useEffect } from 'react';
import { gsap } from 'gsap';
import { Circle, Point } from '../interface/Auth.interface';

const Animation = () => {
  useEffect(() => {
    let width: number,
      height: number,
      largeHeader: HTMLElement | null,
      canvas: HTMLCanvasElement | null,
      ctx: CanvasRenderingContext2D | null,
      points: Point[] = [],
      target: { x: number; y: number },
      animateHeader = true;

    // Initialize header and animation
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
      width = window.innerWidth;
      height = window.innerHeight;
      target = { x: width / 2, y: height / 2 };

      largeHeader = document.getElementById('large-header');
      if (largeHeader) {
        largeHeader.style.height = `${height}px`;
      }

      canvas = document.getElementById('demo-canvas') as HTMLCanvasElement;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
      }

      // Create points
      points = [];
      for (let x = 0; x < width; x += width / 20) {
        for (let y = 0; y < height; y += height / 20) {
          const px = x + (Math.random() * width) / 20;
          const py = y + (Math.random() * height) / 20;
          const p: Point = { x: px, originX: px, y: py, originY: py, closest: [] };
          points.push(p);
        }
      }

      // Find closest points for each point
      points.forEach((p1: Point) => {
        const closest = points
          .filter((p2: Point) => p1 !== p2)
          .sort((p2: Point, p3: Point) => getDistance(p1, p2) - getDistance(p1, p3))
          .slice(0, 5);
        p1.closest = closest;
      });

      // Assign circles to each point
      points.forEach((point: Point) => {
        const circle = new Circle({ pos: point, radius: 3 + Math.random() * 2, color: 'rgba(#000000)' });
        point.circle = circle;
      });
    }

    // Event listeners
    function addListeners() {
      if (!('ontouchstart' in window)) {
        window.addEventListener('mousemove', mouseMove);
      }
      window.addEventListener('scroll', scrollCheck);
      window.addEventListener('resize', resize);
    }

    function mouseMove(e: MouseEvent) {
      // Update target to be exactly under the cursor
      target.x = e.clientX; // Use clientX for positioning
      target.y = e.clientY; // Use clientY for positioning
    }

    function scrollCheck() {
      animateHeader = document.body.scrollTop <= height;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (largeHeader) {
        largeHeader.style.height = `${height}px`;
      }
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }

    // Initialize animation
    function initAnimation() {
      animate();
      points.forEach((point: Point) => shiftPoint(point));
    }

    function animate() {
      if (animateHeader && ctx) {
        ctx.clearRect(0, 0, width, height);
        points.forEach((point: Point) => {
          const dist = Math.abs(getDistance(target, point));
          if (dist < 4000) {
            point.active = 0.5; // Brightness closer to the cursor
            point.circle!.active = 0.8; // Increase circle brightness
          } else if (dist < 20000) {
            point.active = 0.1;
            point.circle!.active = 0.4;
          } else {
            point.active = 0;
            point.circle!.active = 0;
          }

          drawLines(point);
          if (ctx) {
            point.circle!.draw(ctx); // Pass ctx as an argument
          }
        });
      }
      requestAnimationFrame(animate);
    }

    function shiftPoint(p: Point) {
      gsap.to(p, {
        x: p.originX - 50 + Math.random() * 100,
        y: p.originY - 50 + Math.random() * 100,
        duration: 1 + Math.random(),
        ease: 'power2.inOut',
        onComplete: () => shiftPoint(p),
      });
    }

    function drawLines(p: Point) {
      if (!p.active || !ctx) return;
      p.closest.forEach((closestPoint: Point) => {
        if (ctx) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(closestPoint.x, closestPoint.y);
          ctx.strokeStyle = `rgba(135,206,250, ${p.active})`; // Use sky blue color for lines
          ctx.stroke();
        }
      });
    }

    function getDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
      return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('scroll', scrollCheck);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas id="demo-canvas" className="cursor-animation-canvas"></canvas>;
};

export default Animation;
