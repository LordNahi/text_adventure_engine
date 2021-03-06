import BaseEntity from "./baseEntity";
import Location from "./location";
import Item from "./item";
import { Directions } from "../boilerplate/directions";

class Player extends BaseEntity {
  currentLocation: Location;
  world: Location[][];
  inventory: Item[] = [];
  visitedLocations: Location[] = [];

  constructor(world: Location[][], x: number, y: number) {
    super(x, y);

    this.world = world;
    this.currentLocation = world[x][y];
    this.visitedLocations.push(this.currentLocation);
    this.trackLocation(this.currentLocation);
  }

  public look = () => {
    return this.currentLocation.describe();
  };

  public move = (direction: string) => {
    if (direction === "") {
      return "What direction?";
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
        return `"${direction}" is not a direction.`;
    }
  };

  public pickup = (item: Item) => {
    item.hasMoved = true;
    this.inventory.push(item);
  };

  private step = (x: number, y: number) => {
    const xx = this.x + x;
    const yy = this.y + y;
    const potentialLocation = this.world[yy] && this.world[yy][xx];

    if (potentialLocation) {
      this.x += x;
      this.y += y;

      this.trackLocation(potentialLocation);

      return true;
    } else {
      return false;
    }
  };

  private trackLocation = (location: Location) => {
    this.currentLocation = location;

    for (const visitedLocation of this.visitedLocations) {
      if (location.id === visitedLocation.id) {
        return;
      }
    }
    this.visitedLocations.push(location);
  };
}

export default Player;
