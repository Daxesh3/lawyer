export interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  closest: Point[];
  active?: number;
  circle?: Circle;
}

export interface CircleProps {
  pos: Point;
  radius: number;
  color: string;
}

export class Circle {
  pos: Point;
  radius: number;
  color: string;
  active: number;

  constructor({ pos, radius, color }: CircleProps) {
    this.pos = pos;
    this.radius = radius;
    this.color = color;
    this.active = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.active) return;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = `rgba(0, 165, 203, ${this.active})`; // Use white for the circles
    ctx.fill();
  }
}
