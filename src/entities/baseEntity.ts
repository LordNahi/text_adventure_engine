import uuid from "uuid/v1";

abstract class BaseEntity {
  public readonly id: string = uuid();
  public x: number;
  public y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
}

export default BaseEntity;
