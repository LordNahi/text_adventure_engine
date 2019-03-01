import uuid from "uuid/v4";

abstract class BaseEntity {
  public readonly id: string;
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.id = uuid();
    this.x = x;
    this.y = y;
  }
}

export default BaseEntity;
