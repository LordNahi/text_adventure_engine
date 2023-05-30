import Item from "./item";
import BaseEntity from "./baseEntity";

import { Parser } from "../types";

class Tile extends BaseEntity {
  public readonly locationName: string;
  public readonly description: string;
  public readonly northDescription: string;
  public readonly eastDescription: string;
  public readonly southDescription: string;
  public readonly westDescription: string;
  public readonly items: Item[];

  constructor(tile: Parser.Tile, items: Item[]) {
    super(tile.id, tile.location.x, tile.location.y);

    const {
      name,
      description,
      descriptionNorth,
      descriptionEast,
      descriptionSouth,
      descriptionWest,
      descriptionDistant,
      descriptionVisited,
    } = tile;

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
      return !item.hasMoved && item.descriptionUntouched
        ? item.descriptionUntouched
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

  public takeItem = (itemName: string): Item | null => {
    const item = this.items.find((item) => {
      // Check for item alias match first ...

      if (item.alias.length) {
        for (let alias of item.alias) {
          const lowAlias = alias.toLowerCase();
          const lowNoun = itemName.toLowerCase();

          if (lowAlias === lowNoun) return true;
        }
      }

      // Finally, check for direct noun match ...

      const lowNoun = itemName.toLowerCase();
      const lowItem = item.name.toLowerCase();

      return lowNoun === lowItem;
    });

    if (item) {
      this.items.splice(this.items.indexOf(item), 1);

      return item;
    } else {
      return null;
    }
  };
}

export default Tile;
