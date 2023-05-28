import Item from "./item";
import BaseEntity from "./baseEntity";

import { Parser } from "../types";

class Tile extends BaseEntity {
  public readonly id: string;
  public readonly locationName: string;
  public readonly description: string;
  public readonly northDescription: string;
  public readonly eastDescription: string;
  public readonly southDescription: string;
  public readonly westDescription: string;
  public readonly items: Item[];

  constructor(tile: Omit<Parser.Tile, "items">, items: Item[]) {
    super();

    const {
      id,
      name,
      description,
      descriptionNorth,
      descriptionEast,
      descriptionSouth,
      descriptionWest,
      descriptionDistant,
      descriptionVisited,
    } = tile;

    this.id = id;
    this.locationName = name;
    this.description = description;
    this.northDescription = descriptionNorth || "";
    this.eastDescription = descriptionEast || "";
    this.southDescription = descriptionSouth || "";
    this.westDescription = descriptionWest || "";

    this.items = items;
  }

  public describe = () => {
    const itemDescriptions = this.items.map((item: Item) => {
      return !item.hasMoved && item.initialPlacementDescription
        ? item.initialPlacementDescription
        : `A ${item.name} is here.`;
    });

    return [
      this.description,
      this.northDescription,
      this.eastDescription,
      this.southDescription,
      this.westDescription,
      ...itemDescriptions,
    ];
  };

  public onArrive = (hasVisited?: boolean) => {
    if (!hasVisited) {
      return this.describe();
    } else {
      return "";
    }
  };

  public addItem = (item: Item) => {
    this.items.push(item);
  };
}

export default Tile;
