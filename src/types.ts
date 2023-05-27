export interface Point {
  x: number;
  y: number;
}

export const enum BaseSpace {
  EmptySpace = -1,
  wall = 0,
}

export const enum PlayerStance {
  Standing = "standing",
  Sitting = "sitting",
}

export interface Item {
  id: string;
  name: string;
  description: string;
}

export interface Location {
  id: string;
  name: string;
  description: string;
  descriptionDistant: string;
  descriptionNorth?: string;
  descriptionEast?: string;
  descriptionSouth?: string;
  descriptionWest?: string;
  itemsInitial: string[];
}
