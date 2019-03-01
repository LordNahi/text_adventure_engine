import BaseEntity from "./baseEntity";
import Location from "./location";
import Item from "./item";
import { Directions } from "../boilerplate/directions";
import { BaseSpace, PlayerStance, Point } from "../types";

class Player extends BaseEntity {
  stance: PlayerStance = PlayerStance.Sitting;
  currentLocation: Location;
  world: Location[][];
  inventory: Item[] = [];
  visited: string[] = [];

  constructor(world: Location[][], x: number, y: number) {
    super(x, y);

    this.world = world;
    this.currentLocation = world[x][y];
  }

  public look = () => {
    return this.currentLocation.describe();
  };

  public move = (direction: string) => {
    if (direction === "") {
      return "Where?";
    }

    switch (direction) {
      case Directions.North:
        return this.step(0, -1) ? "Headed North..." : "I can't go North...";
      case Directions.East:
        return this.step(1, 0) ? "Headed East..." : "I can't go East...";
      case Directions.South:
        return this.step(0, 1) ? "Headed South..." : "I can't go South...";
      case Directions.West:
        return this.step(-1, 0) ? "Headed West..." : "I can't go West...";
      default:
        return direction + " is not a direction.";
    }
  };

  private step = (x: number, y: number, onSuccess?: string) => {
    const xx = this.x + x;
    const yy = this.y + y;
    const potentialLocation = this.world[yy] && this.world[yy][xx];

    if (potentialLocation) {
      this.x += x;
      this.y += y;

      this.trackLocation(this.currentLocation);

      return true;
    } else {
      return false;
    }
  };

  private trackLocation = (location: Location) => {
    this.currentLocation = location;

    if (!this.visited.includes(location.id)) {
      this.visited.push(location.id);

      return location.describe();
    }
  };
}

export default Player;
