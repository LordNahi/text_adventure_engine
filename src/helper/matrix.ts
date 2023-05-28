/**
 * A 2D matrix, when instantiated, cells are initialised to null ...
 */
class MX2<T> {
  private width;
  private height;
  private grid: (T | null)[][] = [];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    for (let my = 0; my < height; my++) {
      this.grid[my] = Array(width).map((_) => null);
    }
  }

  public get(x: number, y: number): T | null {
    if (y < 0 || y > this.height) throw new Error("X is out of range");
    if (x < 0 || x > this.width) throw new Error("Y is out of range");

    return this.grid[y][x];
  }

  public set(item: T, x: number, y: number) {
    this.grid[y][x] = item;
  }

  public forEach(callback: (item: T | null, x: number, y: number) => void) {
    for (let my = 0; my < this.height; my++) {
      for (let mx = 0; mx < this.width; mx++) {
        callback(this.grid[mx][my], mx, my);
      }
    }
  }
}

export { MX2 };
