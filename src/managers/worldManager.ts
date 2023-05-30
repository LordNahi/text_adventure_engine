import path from "path";
import fs from "fs";

import Tile from "../entities/tile";
import { MX2 } from "../helper/matrix";
import { Parser, Point } from "../types";
import ItemManager from "./itemManager";

const enum ErrorMessage {
  WORLD_NOT_LOADED = "No loaded world",
}

const handleError = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error("Something went wrong");
  }
};

/**
 * Responsible for loading JSON world files.
 *
 * It will parse out location and tile data and load into appropirate classes.
 */
class WorldManager {
  private itemManager: ItemManager;
  private pathToWorlds: string;
  private loadedWorldData?: Parser.Map;

  constructor(itemManager: ItemManager) {
    this.itemManager = itemManager;
    this.pathToWorlds = path.resolve("./worlds");
  }

  public getStart(): number {
    if (!this.loadedWorldData) throw new Error(ErrorMessage.WORLD_NOT_LOADED);

    return this.loadedWorldData.world[0].start;
  }

  public getGrid(): MX2<Tile> {
    if (!this.loadedWorldData) throw new Error(ErrorMessage.WORLD_NOT_LOADED);

    const { width, height, world, items } = this.loadedWorldData;

    /**
     * TODO:
     *
     * You have semi-introduced the concept of "Locations" which is
     * essentially a different grid to navigate within the same world.
     *
     * eg.
     *
     * You may be in the overworld, and could come across a building,
     * choosing to enter the building would take you to a new "Location",
     * for now, finish single location setup and once that is functional,
     * add in functionality for multiple locations ...
     */

    // Create world items ...

    items.forEach((itemData) => this.itemManager.addItem(itemData));

    // Create world tiles ...

    const location = world[0]; // For now, we assume one location...
    const grid = new MX2<Tile>(width, height);

    location.places.forEach((tileData) => {
      const tile = new Tile(
        tileData,
        tileData.items.map((itemId) => this.itemManager.makeItem(itemId))
      );

      grid.set(tile, tileData.location.x, tileData.location.y);
    });

    console.log("World loaded!");

    return grid;
  }

  public loadWorld(name: string): void {
    const dirs = fs.readdirSync(this.pathToWorlds);
    const hasWorld = dirs.includes(`${name}.json`);

    if (!hasWorld) throw new Error(`World "${name}" does not exist`);

    const pathToWorld = `${this.pathToWorlds}/${name}.json`;

    try {
      console.log("Building world ...");

      const data = fs.readFileSync(pathToWorld, "utf8");
      const worldData = JSON.parse(data);

      this.loadedWorldData = worldData;
    } catch (error) {
      handleError(error);
    }
  }
}

export default WorldManager;
