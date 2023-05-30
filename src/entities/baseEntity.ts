abstract class BaseEntity {
  public readonly id: number;
  public x: number;
  public y: number;

  constructor(id: number, x: number = 0, y: number = 0) {
    this.id = id;
    this.x = x;
    this.y = y;
  }
}

export default BaseEntity;
