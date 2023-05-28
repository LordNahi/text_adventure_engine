import path from "path";
import fs from "fs";

import Tile from "../entities/tile";
import { MX2 } from "../helper/matrix";
import { Parser } from "../types";

/**
 * Responsible for loading JSON world files.
 *
 * It will parse out location and tile data and load into appropirate classes.
 */
class WorldManager {
  private static PATH_TO_WORLDS = path.resolve("./worlds");

  constructor() {}

  public static loadWorld(name: string): Tile[][] {
    const dirs = fs.readdirSync(this.PATH_TO_WORLDS);

    for (const dir of dirs) {
      const worldName = dir.split(".")[0];

      if (!worldName || worldName !== name) continue;

      try {
        const data = fs.readFileSync(dir, "utf8");
        const jsonData = JSON.parse(data);

        console.log("Building world ...");

        const { name, width, height, world } = jsonData as Parser.Map;

        /**
         * TODO:
         *
         * You have semi-introduced the concept of "Locations" which is
         * essentially a different grid to navigate, within the same world.
         * For example, you may be in the overworld, and could come across
         * a building, choosing to enter the building would take you to a new
         * "Location", for now, finish migrating so a single location setup,
         * once you have the data loading working, go back and build out the
         * location mechanic ...
         */

        const location = world[0]; // For now, we assume one location...
        const grid = new MX2<Tile>(width, height);

        location.places.forEach((tileData) => {
          const tile = new Tile(tileData, []); // IMPLEMENT ITEM STUFF YO YO

          grid.set(tile, tileData.location.x, tileData.location.y);
        });
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error("Something went wrong.");
        }
      }
    }
  }
}

export default WorldManager;
