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

export namespace Parser {
  export interface Item {
    id: number;
    name: string;
    description: string;
    descriptionUntouched?: string;
  }

  export interface Key extends Item {
    opens: number;
  }

  export interface Weapon extends Item {}

  export interface Tile {
    id: number;
    name: string;
    items: number[];
    location: Point;
    description: string;
    descriptionVisited: string;
    descriptionDistant: string;
    descriptionNorth?: string;
    descriptionEast?: string;
    descriptionSouth?: string;
    descriptionWest?: string;
  }

  export interface Location {
    name: string;
    start: number;
    description: string;
    places: Tile[];
  }

  export interface Map {
    name: string;
    width: number;
    height: number;
    world: Location[];
    items: Item[];
  }
}
