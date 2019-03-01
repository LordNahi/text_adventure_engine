export interface Point {
  x: number;
  y: number;
}

export const enum BaseSpace {
  EmptySpace = -1,
  wall = 0
}

export const enum PlayerStance {
  Standing = "standing",
  Sitting = "sitting"
}
