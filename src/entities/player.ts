import BaseEntity from "./baseEntity";
import Tile from "./tile";
import Item from "./item";
import { Directions } from "../boilerplate/directions";
import { MX2 } from "../helper/matrix";

class Player extends BaseEntity {
  currentLocation: Tile;
  world: MX2<Tile>;
  inventory: Item[] = [];
  visitedLocations: Tile[] = [];

  constructor(world: MX2<Tile>, startX: number, startY: number) {
    super(startX, startY);

    const start = world.get(startX, startY);

    if (!start) throw new Error("Failed to establish player start location");

    this.world = world;
    this.currentLocation = start;
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
    const potentialLocation = this.world.get(yy, xx);

    if (potentialLocation) {
      this.x += x;
      this.y += y;

      this.trackLocation(potentialLocation);

      return true;
    } else {
      return false;
    }
  };

  private trackLocation = (location: Tile) => {
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
